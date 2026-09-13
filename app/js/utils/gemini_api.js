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
        return `Sos Centinela AI, el Asistente Jurídico y Tutor de Ascenso de la Policía de la Provincia de Santa Fe (Argentina).
Tus respuestas deben ser certeras, precisas, profesionales y fundamentadas estrictamente en la normativa oficial:
- Manual Oficial ISEP 2026 (344 páginas, Escalafón General - Oficial de Policía).
- Ley 12.521 de Personal Policial de Santa Fe.
- Decreto 461/15 (Régimen Disciplinario Policial: Faltas leves, graves y procedimiento).
- Código Procesal Penal (CPP) de la Provincia de Santa Fe.
- Decreto 411/26 (Escalas salariales y haberes vigentes 2026).
- Ley 14.283 (Reforma Previsional).
- Ley 14.239 (Desfederalización del Microtráfico).
- Resolución Ministerial 2237/25 (Protocolo de Uso Progresivo de la Fuerza).
- Código Penal Argentino (Ley 11.179).
- Decreto 0075/25 (Tarifas SPA y OSESP vigentes).

REGLAS DE RESPUESTA:
1. Citá siempre el artículo, decreto o capítulo correspondiente si aplica.
2. Usá formato markdown claro con viñetas y negritas para facilitar la lectura rápida en servicio.
3. Sé profesional, directo y alentador con el personal policial.
4. Si no estás seguro de un dato, indicalo claramente. No inventes artículos ni cifras.
5. Respondé siempre en español rioplatense (vos, tuteá al oficial).`;
    },

    /**
     * Query Gemini with optional conversation history for multi-turn context.
     * @param {string} userPrompt - The current user message.
     * @param {Object} options - Optional configuration.
     * @param {Array<{role: string, text: string}>} options.history - Previous conversation turns [{role: 'user'|'model', text: '...'}].
     * @param {string} options.systemPrompt - Override the default system instruction.
     * @returns {Promise<{success: boolean, text?: string, error?: string, source: string}>}
     */
    async query(userPrompt, options = {}) {
        const apiKey = this.getApiKey();
        
        // If no API key is set yet, notify user
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
                temperature: options.temperature || 0.2,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: options.maxTokens || 1024
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
                    error: errData.error?.message || `HTTP Error ${response.status}`
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
