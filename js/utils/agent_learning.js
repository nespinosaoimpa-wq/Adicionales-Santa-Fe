/**
 * Adicionales Santa Fe - Motor de Aprendizaje y Memoria Local del Agente IA (Centinela Learning Engine)
 * 
 * Privacidad estricta: Aprende del uso, consultas, vocabulario y correcciones del oficial
 * almacenándose exclusivamente en el dispositivo local (localStorage).
 * Retroalimenta dinámicamente las respuestas de Gemini y redacción de actas sin enviar datos a servidores centrales.
 */

window.AgentLearningService = {
    STORAGE_KEY: 'centinela_agent_memory_v1',

    // Estructura por defecto de la memoria local del oficial
    getDefaultMemory() {
        return {
            enabled: true,
            topics: {}, // { 'aprehension': 5, 'microtrafico': 3, ... }
            preferredFormulas: [
                'En cumplimiento del deber funcional y bajo directiva judicial',
                'Se procede al resguardo preventivo bajo debida constancia',
                'Consulta fiscal inmediata con Fiscal de turno'
            ],
            localities: {}, // { 'Santa Fe': 12, 'Santo Tomé': 4 }
            units: {}, // { 'Comando Radioeléctrico': 8, 'Comisaría 1ra': 4 }
            customDirectives: [], // Reglas o criterios fijados por el oficial
            corrections: [], // Correcciones aprendidas de respuestas anteriores
            feedback: { positive: 0, negative: 0 },
            lastUpdated: new Date().toISOString()
        };
    },

    getMemory() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) return this.getDefaultMemory();
            const parsed = JSON.parse(raw);
            return { ...this.getDefaultMemory(), ...parsed };
        } catch (e) {
            console.warn('Error reading agent memory:', e);
            return this.getDefaultMemory();
        }
    },

    saveMemory(mem) {
        try {
            mem.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mem));
        } catch (e) {
            console.warn('Error saving agent memory:', e);
        }
    },

    // ── APRENDIZAJE AUTOMÁTICO A PARTIR DE CONSULTAS DEL OFICIAL ──
    learnFromQuery(queryText, category = 'general') {
        if (!queryText || typeof queryText !== 'string') return;
        const mem = this.getMemory();
        if (!mem.enabled) return;

        const clean = queryText.toLowerCase().trim();
        
        // 1. Detectar temas recurrentes
        const topicRules = [
            { id: 'flagrancia_aprehension', words: ['aprehension', 'flagrancia', 'art 268', 'aprehender', 'reducido'] },
            { id: 'microtrafico_estupefacientes', words: ['droga', 'estupefaciente', 'cocaina', 'marihuana', 'bunker', '23737', '14239', 'narcomenudeo'] },
            { id: 'violencia_genero_familia', words: ['genero', 'medida de distancia', 'perimetral', 'exclusion', 'femenina', 'victima'] },
            { id: 'requisa_vehicular_personal', words: ['requisa', 'inspeccion', 'art 212', 'baul', 'guantera', 'palpado'] },
            { id: 'menores_en_conflicto', words: ['menor', 'ninez', 'subsecretaria', 'juez de menores', 'edad'] },
            { id: 'transito_alcoholemia', words: ['alcoholemia', 'licencia', 'retencion', 'moto', 'siniestro', 'choque'] },
            { id: 'disciplinario_decreto_461', words: ['falta leve', 'falta grave', 'sancion', 'arresto', 'suspension', 'descargo', '461'] },
            { id: 'beneficios_tap_iapos', words: ['iapos', 'tarjeta alimentar', 'tap', 'psicologo', 'salud mental', 'reintegro'] }
        ];

        topicRules.forEach(rule => {
            if (rule.words.some(w => clean.includes(w))) {
                mem.topics[rule.id] = (mem.topics[rule.id] || 0) + 1;
            }
        });

        if (category && category !== 'general' && category !== 'desconocido') {
            mem.topics[category] = (mem.topics[category] || 0) + 1;
        }

        this.saveMemory(mem);
    },

    // ── APRENDIZAJE A PARTIR DE REDACCIÓN Y DATOS DE ACTAS ──
    learnFromActa(tipo, data) {
        if (!data) return;
        const mem = this.getMemory();
        if (!mem.enabled) return;

        // Aprender localidad habitual
        if (data.localidad) {
            const loc = data.localidad.trim();
            if (loc) mem.localities[loc] = (mem.localities[loc] || 0) + 1;
        }

        // Aprender dependencia y unidad regional
        const settings = typeof getActaSettings === 'function' ? getActaSettings() : null;
        if (settings && settings.dependencia) {
            const dep = settings.dependencia.trim();
            if (dep) mem.units[dep] = (mem.units[dep] || 0) + 1;
        }

        // Extraer fórmulas o giros lingüísticos frecuentes de los relatos
        const textSample = (data.descripcion || '') + ' ' + (data.resultado || '') + ' ' + (data.hechos || '');
        if (textSample.length > 30) {
            const formalPatterns = [
                /se procede a la (?:inmediata |formal )?([a-záéíóúñ\s]{10,40})/gi,
                /bajo (?:estricta |debida )?cadena de custodia/gi,
                /haciéndosele saber los derechos que le asisten/gi,
                /se entabló comunicación con el fiscal/gi
            ];

            formalPatterns.forEach(pattern => {
                const match = textSample.match(pattern);
                if (match) {
                    match.forEach(phrase => {
                        const cleanPhrase = phrase.trim();
                        if (cleanPhrase.length > 15 && !mem.preferredFormulas.includes(cleanPhrase)) {
                            mem.preferredFormulas.unshift(cleanPhrase);
                            if (mem.preferredFormulas.length > 8) mem.preferredFormulas.pop();
                        }
                    });
                }
            });
        }

        mem.topics['actas_' + tipo] = (mem.topics['actas_' + tipo] || 0) + 1;
        this.saveMemory(mem);
    },

    // ── APRENDIZAJE DE CORRECCIÓN EXPLÍCITA DEL OFICIAL ──
    learnCorrection(originalQuery, aiAnswer, correctionNote) {
        const mem = this.getMemory();
        mem.corrections.unshift({
            id: 'corr_' + Date.now(),
            date: new Date().toLocaleDateString('es-AR'),
            query: originalQuery.substring(0, 150),
            aiSnippet: (aiAnswer || '').substring(0, 100),
            note: correctionNote.trim()
        });
        if (mem.corrections.length > 15) mem.corrections.pop();
        mem.feedback.negative = (mem.feedback.negative || 0) + 1;
        this.saveMemory(mem);
    },

    // ── REGISTRO DE FEEDBACK POSITIVO ──
    recordPositiveFeedback(query) {
        const mem = this.getMemory();
        mem.feedback.positive = (mem.feedback.positive || 0) + 1;
        this.saveMemory(mem);
    },

    // ── DIRECTIVA O CRITERIO PERSONALIZADO MANUAL ──
    addCustomDirective(directiveText) {
        if (!directiveText || !directiveText.trim()) return;
        const mem = this.getMemory();
        mem.customDirectives.unshift({
            id: 'dir_' + Date.now(),
            text: directiveText.trim(),
            date: new Date().toLocaleDateString('es-AR')
        });
        if (mem.customDirectives.length > 10) mem.customDirectives.pop();
        this.saveMemory(mem);
    },

    removeCustomDirective(id) {
        const mem = this.getMemory();
        mem.customDirectives = mem.customDirectives.filter(d => d.id !== id);
        this.saveMemory(mem);
    },

    removeCorrection(id) {
        const mem = this.getMemory();
        mem.corrections = mem.corrections.filter(c => c.id !== id);
        this.saveMemory(mem);
    },

    toggleLearning() {
        const mem = this.getMemory();
        mem.enabled = !mem.enabled;
        this.saveMemory(mem);
        return mem.enabled;
    },

    clearMemory() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    // ── GENERACIÓN DEL CONTEXTO DINÁMICO INYECTABLE EN GEMINI ──
    getPromptContext() {
        const mem = this.getMemory();
        if (!mem.enabled) return '';

        const topTopics = Object.entries(mem.topics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([t]) => t.replace(/_/g, ' '));

        const topLoc = Object.entries(mem.localities)
            .sort((a, b) => b[1] - a[1])[0]?.[0];

        const topUnit = Object.entries(mem.units)
            .sort((a, b) => b[1] - a[1])[0]?.[0];

        let parts = [];
        parts.push('\n\n--- MEMORIA ADAPTATIVA APRENDIDA DEL OFICIAL (100% LOCAL Y PRIVADA) ---');
        parts.push('• Adaptá tus explicaciones al perfil del oficial.');
        
        if (topLoc || topUnit) {
            parts.push(`• Jurisdicción y Unidad Habitual del oficial: ${topLoc || 'Santa Fe'} ${topUnit ? '(' + topUnit + ')' : ''}.`);
        }

        if (topTopics.length > 0) {
            parts.push(`• Áreas de mayor intervención y consulta del oficial: ${topTopics.join(', ')}.`);
        }

        if (mem.preferredFormulas.length > 0) {
            parts.push(`• Giros y fórmulas de redacción preferidas: "${mem.preferredFormulas.slice(0, 3).join('", "')}".`);
        }

        if (mem.customDirectives.length > 0) {
            parts.push('• Criterios u órdenes operativas fijadas por el oficial que SIEMPRE debes respetar:');
            mem.customDirectives.slice(0, 4).forEach(d => parts.push(`  - ${d.text}`));
        }

        if (mem.corrections.length > 0) {
            parts.push('• Correcciones previas hechas por el oficial a respuestas pasadas:');
            mem.corrections.slice(0, 3).forEach(c => parts.push(`  - Sobre "${c.query}": ${c.note}`));
        }

        parts.push('----------------------------------------------------------------------\n');
        return parts.join('\n');
    },

    // ── MODAL INTERACTIVO DE ADMINISTRACIÓN DE MEMORIA LOCAL ──
    renderMemoryModal() {
        const mem = this.getMemory();
        const overlay = document.createElement('div');
        overlay.id = 'agent-memory-modal';
        overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in';

        const topTopics = Object.entries(mem.topics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        overlay.innerHTML = `
            <div class="bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl space-y-5 text-white my-auto relative">
                <!-- Header -->
                <div class="flex items-start justify-between border-b border-white/10 pb-4">
                    <div class="flex items-center gap-3">
                        <div class="size-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <span class="material-symbols-outlined text-xl">neurology</span>
                        </div>
                        <div>
                            <h3 class="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                                Memoria de mi Agente IA
                                <span class="size-2 rounded-full ${mem.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}"></span>
                            </h3>
                            <p class="text-[10px] text-slate-400 font-mono">Retroalimentación adaptativa en tu dispositivo</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('agent-memory-modal').remove()" class="size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all text-slate-400 hover:text-white">
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>

                <!-- Privacy Badge -->
                <div class="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2.5 text-emerald-300 text-xs">
                    <span class="material-symbols-outlined text-base shrink-0">lock</span>
                    <span class="leading-tight text-[11px]">
                        <strong>Privacidad Total:</strong> Lo que escribís y redactás se procesa y aprende únicamente en la memoria de este teléfono. Ninguna de tus actas ni notas se sube a un servidor central.
                    </span>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-3 gap-2 text-center">
                    <div class="p-2.5 bg-white/5 rounded-2xl border border-white/5">
                        <p class="text-[9px] text-slate-400 uppercase font-bold">Temas Frecuentes</p>
                        <p class="text-base font-black text-indigo-400 mt-0.5">${Object.keys(mem.topics).length}</p>
                    </div>
                    <div class="p-2.5 bg-white/5 rounded-2xl border border-white/5">
                        <p class="text-[9px] text-slate-400 uppercase font-bold">Fórmulas Estilo</p>
                        <p class="text-base font-black text-cyan-400 mt-0.5">${mem.preferredFormulas.length}</p>
                    </div>
                    <div class="p-2.5 bg-white/5 rounded-2xl border border-white/5">
                        <p class="text-[9px] text-slate-400 uppercase font-bold">Criterios Fijados</p>
                        <p class="text-base font-black text-emerald-400 mt-0.5">${mem.customDirectives.length}</p>
                    </div>
                </div>

                <!-- Temas más consultados -->
                ${topTopics.length > 0 ? `
                <div class="space-y-2">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lo que más consultás y trabajás:</p>
                    <div class="flex flex-wrap gap-1.5">
                        ${topTopics.map(([t, count]) => `
                            <span class="px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-[11px]">check</span>
                                ${t.replace(/_/g, ' ')} (${count})
                            </span>
                        `).join('')}
                    </div>
                </div>` : ''}

                <!-- Agregar Criterio u Orden Operativa Manual -->
                <div class="space-y-2 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <div class="flex items-center justify-between">
                        <label class="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">edit_note</span>
                            Enseñarle una regla o criterio propio a tu agente:
                        </label>
                    </div>
                    <div class="flex gap-2">
                        <input type="text" id="new-agent-directive-input" placeholder="Ej: Siempre citar el fiscal de flagrancia Dr. Zoppegni..." class="flex-1 px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-primary transition-all">
                        <button onclick="window._saveAgentDirective()" class="px-3 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl active:scale-95 transition-all shrink-0">
                            Guardar
                        </button>
                    </div>
                </div>

                <!-- Lista de Criterios y Correcciones Personalizadas -->
                <div class="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reglas memorizadas:</p>
                    ${mem.customDirectives.length === 0 && mem.corrections.length === 0 ? `
                        <p class="text-[11px] text-slate-500 italic text-center py-3">Tu agente está aprendiendo de tu uso diario. Aún no registraste reglas manuales.</p>
                    ` : `
                        ${mem.customDirectives.map(d => `
                            <div class="p-2.5 bg-slate-950/60 border border-emerald-500/20 rounded-xl flex items-start justify-between gap-2 text-xs">
                                <div class="min-w-0">
                                    <span class="text-[9px] font-bold text-emerald-400 uppercase">Regla de trabajo</span>
                                    <p class="text-[11px] text-slate-200 mt-0.5">${escapeHTML(d.text)}</p>
                                </div>
                                <button onclick="window._removeAgentDirective('${d.id}')" class="text-slate-500 hover:text-red-400 p-1" title="Eliminar">
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        `).join('')}

                        ${mem.corrections.map(c => `
                            <div class="p-2.5 bg-slate-950/60 border border-amber-500/20 rounded-xl flex items-start justify-between gap-2 text-xs">
                                <div class="min-w-0">
                                    <span class="text-[9px] font-bold text-amber-400 uppercase">Corrección aprendida (${c.date})</span>
                                    <p class="text-[10px] text-slate-400 italic truncate">Pregunta: "${escapeHTML(c.query)}"</p>
                                    <p class="text-[11px] text-amber-200 mt-0.5">Nota: ${escapeHTML(c.note)}</p>
                                </div>
                                <button onclick="window._removeAgentCorrection('${c.id}')" class="text-slate-500 hover:text-red-400 p-1" title="Eliminar">
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        `).join('')}
                    `}
                </div>

                <!-- Footer Actions -->
                <div class="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <button onclick="window._toggleAgentLearningState()" class="px-3 py-2 rounded-xl text-[11px] font-bold ${mem.enabled ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'} transition-all">
                        ${mem.enabled ? 'Pausar Aprendizaje' : 'Reanudar Aprendizaje'}
                    </button>
                    <button onclick="window._clearAgentMemoryAction()" class="text-slate-500 hover:text-red-400 text-[11px] font-bold transition-all">
                        Restablecer Memoria
                    </button>
                </div>
            </div>
        `;

        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    },

    // ── MODAL PARA CORREGIR UNA RESPUESTA Y RETROALIMENTAR AL AGENTE ──
    renderCorrectionModal(query, currentAnswer) {
        const overlay = document.createElement('div');
        overlay.id = 'agent-correction-modal';
        overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[210] flex items-center justify-center p-4 animate-fade-in';

        overlay.innerHTML = `
            <div class="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 text-white">
                <div class="flex items-start justify-between border-b border-white/10 pb-3">
                    <div class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-amber-400 text-xl">auto_fix_high</span>
                        <h3 class="text-xs font-black uppercase text-white">Retroalimentar al Agente IA</h3>
                    </div>
                    <button onclick="document.getElementById('agent-correction-modal').remove()" class="text-slate-400 hover:text-white">
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>

                <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-300">
                    <p class="text-[9px] text-slate-500 font-bold uppercase">Pregunta efectuada:</p>
                    <p class="font-medium text-slate-200 mt-0.5 truncate">"${escapeHTML(query)}"</p>
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        ¿Cómo debería haber respondido o qué criterio debe aprender?
                    </label>
                    <textarea id="correction-note-text" rows="3" placeholder="Ej: En esta seccional el fiscal exige que el acta de secuestro se firme por duplicado..." class="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-amber-400 transition-all resize-none"></textarea>
                </div>

                <div class="flex justify-end gap-2 pt-2">
                    <button onclick="document.getElementById('agent-correction-modal').remove()" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all">
                        Cancelar
                    </button>
                    <button onclick="window._submitAgentCorrection('${escapeHTML(query).replace(/'/g, "\\'")}', '${escapeHTML(currentAnswer || '').replace(/'/g, "\\'")}')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                        Guardar Aprendizaje
                    </button>
                </div>
            </div>
        `;

        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    }
};

// ── HOOKS GLOBALES PARA UI ──
window.openAgentMemoryModal = () => window.AgentLearningService.renderMemoryModal();
window.openCorrectionFeedbackModal = (q, a) => window.AgentLearningService.renderCorrectionModal(q, a);

window._saveAgentDirective = () => {
    const input = document.getElementById('new-agent-directive-input');
    const val = input ? input.value.trim() : '';
    if (!val) return;
    window.AgentLearningService.addCustomDirective(val);
    showToast('🧠 Criterio aprendido por tu agente');
    document.getElementById('agent-memory-modal')?.remove();
    window.AgentLearningService.renderMemoryModal();
};

window._removeAgentDirective = (id) => {
    window.AgentLearningService.removeCustomDirective(id);
    showToast('Regla eliminada');
    document.getElementById('agent-memory-modal')?.remove();
    window.AgentLearningService.renderMemoryModal();
};

window._removeAgentCorrection = (id) => {
    window.AgentLearningService.removeCorrection(id);
    showToast('Corrección eliminada');
    document.getElementById('agent-memory-modal')?.remove();
    window.AgentLearningService.renderMemoryModal();
};

window._toggleAgentLearningState = () => {
    const state = window.AgentLearningService.toggleLearning();
    showToast(state ? '🧠 Aprendizaje activado' : '⏸️ Aprendizaje pausado');
    document.getElementById('agent-memory-modal')?.remove();
    window.AgentLearningService.renderMemoryModal();
};

window._clearAgentMemoryAction = () => {
    if (!confirm('¿Seguro que querés restablecer la memoria local de tu agente?')) return;
    window.AgentLearningService.clearMemory();
    showToast('Memoria restablecida');
    document.getElementById('agent-memory-modal')?.remove();
};

window._submitAgentCorrection = (query, ans) => {
    const note = document.getElementById('correction-note-text')?.value.trim();
    if (!note) {
        alert('Por favor escribí la corrección o criterio a aprender.');
        return;
    }
    window.AgentLearningService.learnCorrection(query, ans, note);
    showToast('🧠 Tu agente aprendió esta corrección para futuras consultas');
    document.getElementById('agent-correction-modal')?.remove();
};

console.log("✅ AgentLearningService cargado: Aprendizaje local por dispositivo activo.");
