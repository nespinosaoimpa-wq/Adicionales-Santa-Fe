/**
 * Adicionales Santa Fe - Google Gemini API Integration Service v2.0
 * Provides exact, precise, and grounded responses using Gemini 2.0 Flash
 * Supports: Multi-turn conversation history, text enhancement for Actas, global API key fallback
 */

window.GeminiService = {
    // API Key storage fallback hierarchy: Local User Storage -> Global Supabase Config -> App Storage
    getApiKey() {
        return localStorage.getItem('gemini_api_key')
            || (window.globalSystemConfig && window.globalSystemConfig.geminiApiKey)
            || (window.store && window.store.geminiApiKey)
            || '';
    },

    setApiKey(key) {
        if (key) {
            localStorage.setItem('gemini_api_key', key.trim());
        } else {
            localStorage.removeItem('gemini_api_key');
        }
    },

    // Strict System Prompt grounding for precision on Santa Fe Police Law & ISEP Manual
    getSystemInstruction() {
        return `Sos Centinela AI v10, el Asistente Jurídico, Operativo y Tutor de Ascenso de la Policía de la Provincia de Santa Fe (PSF), Argentina.
Tus respuestas deben ser certeras, precisas, profesionales, empáticas y fundamentadas estrictamente en la normativa oficial vigente en 2026:

1. MARCO LEGAL PRINCIPAL:
- Ley 12.521 (Ley del Personal Policial de Santa Fe): Grados (Art. 3), Agrupamientos (Art. 4), Escalafones (Art. 12: General, Profesional, Técnico, Servicios), Autoridad Policial (Art. 25), Deberes Obligatorios (Art. 46) y Derechos (Art. 47).
- Decreto 461/15 (Régimen Disciplinario Policial): Faltas Leves (apercibimiento o arresto 1 a 10 días, p.ej. descuido de uniforme/gorra, uso indebido de celular en servicio, fumar, impuntualidad), Faltas Graves (11 a 30 días de suspensión con descuento o destitución, p.ej. engaño al superior, uso arbitrario del arma, drogas, deshonestidad). Plazo estricto de descargo escrito: 5 días hábiles desde la notificación. Tribunal de Conducta Policial.
- Código Procesal Penal de Santa Fe (Ley 12.734) y Reforma 2025/2026 (Ley 14.258): IPP, actuación bajo órdenes del MPA. Flagrancia (Art. 268) y Flagrancia Virtual por videovigilancia/IA hasta 1 hora post-hecho. Allanamiento (07:00 a 21:00 hs salvo urgencia o riesgo). CUIJ (Clave Única de Identificación Judicial).
- Ley 23.737 vs Ley 14.239: Desfederalización del Microtráfico en Santa Fe. Competencia Provincial en narcomenudeo/búnkeres (MPA) con aviso obligatorio dentro de las 2 horas de secuestro. Tráfico mayor y precursores en Justicia Federal.
- Resolución Ministerial 2237/25 (Protocolo de Uso Progresivo de la Fuerza): Principios de Legalidad, Necesidad y Proporcionalidad. Empleo protocolizado de armas no letales / impacto controlado (Taser, Byrna) y arma de fuego como último recurso ante peligro inminente de muerte.

2. SALUD, BIENESTAR Y BENEFICIOS:
- Obra Social IAPOS: Plan Integral de Salud Mental Policial 2026 (100% cobertura en psicofármacos sin coseguro ni auditoría previa, atención psicológica gratuita). Alojamiento y transporte gratuito para efectivos en Rosario y Santa Fe.
- Tarjeta Alimentar Policial (T.A.P): Monto mensual $175.682 (acumulable). Válida exclusivamente en rubros de alimentación / supermercados / rotiserías. No pasa en combustibles (nafta en surtidor) ni locales registrados como revistería / entretenimiento. Reintegros MODO en COTO, Kilbel, Alvear, La Anónima.

3. TARIFAS Y SERVICIOS (Decreto 0075/2025):
- SPA (Servicio Policial Adicional - Bloque de 4hs): Organismos Públicos ($20.205 ordinario), Entidades Privadas ($27.927 ordinario).
- OSESP (Orden de Servicio Excepcional): Compensación base $5.508/hora (Chofer/Supervisión $6.000/hs). Horario extraordinario inicia a las 22:00hs días de semana y 12:00hs sábados/domingos.

4. ISEP Y ACADEMIA DE ASCENSO 2026:
- Cursos de Perfeccionamiento Obligatorios 2026 iniciados en marzo (Recreo, Rosario, Reconquista). Habilitación vigente por 5 años. Manual de Tecnicatura Superior en Seguridad Pública y Ciudadana 2026.

REGLAS DE RESPUESTA:
1. Citá siempre los artículos, decretos o números de ley específicos.
2. Usá formato Markdown muy legible: negritas, viñetas, íconos tácticos o listas numeradas para consulta rápida en servicio.
3. Tratá al usuario con camaradería institucional ("Oficial", "Camarada").
4. Si no estás seguro de una cifra, aclaralo. Sé siempre alientador, profesional y preciso.`;
    },

    /**
     * Query Gemini with optional conversation history for multi-turn context.
     * @param {string} userPrompt - The current user message.
     * @param {Object} options - Optional configuration.
     * @param {Array<{role: string, text: string}>} options.history - Previous conversation turns [{role: 'user'|'model', text: '...'}].
     * @param {string} options.systemPrompt - Override the default system instruction.
     * @returns {Promise<{success: boolean, text?: string, error?: string, source: string, needApiKey?: boolean}>}
     */
    async query(userPrompt, options = {}) {
        const apiKey = this.getApiKey();
        
        // If no API key is set yet, notify caller
        if (!apiKey) {
            return {
                success: false,
                needApiKey: true,
                source: 'none',
                message: "🔑 Se requiere configurar la API Key gratuita de Google Gemini para habilitar la respuesta generativa en vivo."
            };
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // Build contents array with conversation history
        const contents = [];

        // Add previous conversation turns if provided
        if (options.history && Array.isArray(options.history)) {
            options.history.forEach(turn => {
                if (turn.role && turn.text) {
                    contents.push({
                        role: turn.role === 'bot' || turn.role === 'model' ? 'model' : 'user',
                        parts: [{ text: turn.text }]
                    });
                }
            });
        }

        // Add current user message
        contents.push({
            role: "user",
            parts: [{ text: userPrompt }]
        });

        const systemPromptText = options.systemPrompt || this.getSystemInstruction();

        const payload = {
            contents: contents,
            systemInstruction: {
                parts: [{ text: systemPromptText }]
            },
            generationConfig: {
                temperature: options.temperature || 0.3,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: options.maxTokens || 1200
            }
        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                console.error("Gemini API Error:", errData);
                return {
                    success: false,
                    source: 'gemini_error',
                    error: errData.error?.message || `Error HTTP ${response.status}`
                };
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (textResponse) {
                return {
                    success: true,
                    source: 'gemini_api',
                    text: textResponse
                };
            } else {
                return {
                    success: false,
                    source: 'gemini_empty',
                    error: "La API no devolvió contenido válido."
                };
            }
        } catch (err) {
            console.error("Gemini Fetch Exception:", err);
            return {
                success: false,
                source: 'gemini_network_error',
                error: "Error de red al conectar con Google Gemini: " + err.message
            };
        }
    },

    /**
     * Enhance/formalize text using Gemini (used for Actas police documents).
     * @param {string} rawText - The draft text to formalize.
     * @param {string} actaType - The type of acta (e.g., 'procedimiento', 'allanamiento').
     * @returns {Promise<{success: boolean, text?: string, error?: string}>}
     */
    async enhanceText(rawText, actaType = 'procedimiento') {
        const systemPrompt = `Sos un redactor oficial de la Policía de la Provincia de Santa Fe. 
Tu tarea es formalizar y mejorar la redacción de actas policiales manteniendo los datos exactos proporcionados.

REGLAS ESTRICTAS:
1. NO inventar datos, nombres, DNIs, direcciones ni hechos que no estén en el texto original.
2. Mantener TODOS los datos fácticos del original (nombres, fechas, horarios, lugares).
3. Mejorar la estructura gramatical, la puntuación y el vocabulario técnico-jurídico policial.
4. Usar tercera persona del singular y lenguaje formal institucional.
5. Mantener el formato narrativo propio de un acta de ${actaType}.
6. Agregar conectores formales donde corresponda (seguidamente, acto seguido, a posterior de ello, etc.).
7. El resultado debe estar listo para imprimir sin modificaciones adicionales.`;

        return this.query(
            `Formalizá y mejorá la redacción del siguiente texto de acta policial de tipo "${actaType}", manteniendo todos los datos exactos:\n\n${rawText}`,
            { 
                systemPrompt: systemPrompt,
                temperature: 0.15,
                maxTokens: 2048
            }
        );
    }
};

// Also expose getGeminiAPIKey globally for Academia and other modules
window.getGeminiAPIKey = function() {
    return window.GeminiService.getApiKey();
};

console.log("✅ GeminiService v2.0 (Gemini 2.0 Flash + Multi-turn + Actas Enhancement) loaded.");
