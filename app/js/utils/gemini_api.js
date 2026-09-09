/**
 * Adicionales Santa Fe - Google Gemini API Integration Service
 * Provides exact, precise, and grounded responses using Gemini 1.5/2.0 Flash
 */

window.GeminiService = {
    // API Key storage fallback hierarchy: Local User Storage -> App Storage -> Default Key
    getApiKey() {
        return localStorage.getItem('gemini_api_key') || (window.store && window.store.geminiApiKey) || '';
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

REGLAS DE RESPUESTA:
1. Citá siempre el artículo, decreto o capítulo correspondiente si aplica.
2. Usá formato markdown claro con viñetas y negritas para facilitar la lectura rápida en servicio.
3. Sé profesional, directo y alentador con el personal policial.`;
    },

    async query(userPrompt, options = {}) {
        const apiKey = this.getApiKey();
        
        // If no API key is set yet, notify user with step-by-step setup
        if (!apiKey) {
            return {
                success: false,
                needApiKey: true,
                message: "🔑 Se requiere configurar la API Key gratuita de Google Gemini para habilitar la respuesta generativa en vivo."
            };
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: userPrompt }
                    ]
                }
            ],
            systemInstruction: {
                parts: [
                    { text: this.getSystemInstruction() }
                ]
            },
            generationConfig: {
                temperature: 0.2, // Low temperature for high precision & accuracy
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024
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
                    error: errData.error?.message || `HTTP Error ${response.status}`
                };
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (textResponse) {
                return {
                    success: true,
                    text: textResponse
                };
            } else {
                return {
                    success: false,
                    error: "La API no devolvió contenido válido."
                };
            }
        } catch (err) {
            console.error("Gemini Fetch Exception:", err);
            return {
                success: false,
                error: "Error de red al conectar con Google Gemini: " + err.message
            };
        }
    }
};

console.log("✅ GeminiService (Google Gemini 1.5 Flash API) loaded.");
