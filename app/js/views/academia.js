/**
 * Adicionales Santa Fe - Campus de Ascenso Policial (Academia PRO + Gemini AI)
 * Inspirado en Google NotebookLM
 */

const academyLibraryItems = [
    {
        id: "manual-isep",
        title: "Manual Oficial ISEP 2026",
        desc: "344 páginas de doctrina policial para Oficiales (Esc. General).",
        file: "docs/3- Oficial de Policía - Escalafón General.pdf",
        icon: "menu_book",
        color: "from-blue-600/20 to-indigo-600/20 text-indigo-400 border-indigo-500/30",
        badge: "Doctrina Oficial"
    },
    {
        id: "ley-12521",
        title: "Ley de Personal Policial N° 12.521",
        desc: "Estatuto, deberes, derechos, ascensos y régimen disciplinario de Santa Fe.",
        file: "docs/marco_legal_policial_2026.md",
        icon: "gavel",
        color: "from-amber-600/20 to-orange-600/20 text-amber-400 border-amber-500/30",
        badge: "Régimen Disciplinario"
    },
    {
        id: "ley-14283",
        title: "Ley de Adicionales & Jubilaciones N° 14.283",
        desc: "Reforma previsional de Santa Fe y escalas de servicios adicionales.",
        file: "docs/Ley 14283.pdf",
        icon: "shield_person",
        color: "from-emerald-600/20 to-teal-600/20 text-emerald-400 border-emerald-500/30",
        badge: "Servicios Adicionales"
    },
    {
        id: "miraf",
        title: "Manual de Armamento y Tiro MIRAF",
        desc: "Normativa oficial para el uso seguro y portación de armas reglamentarias.",
        file: "docs/2012MIRAF.pdf",
        icon: "explosion",
        color: "from-red-600/20 to-rose-600/20 text-red-400 border-rose-500/30",
        badge: "Seguridad Operativa"
    },
    {
        id: "decreto-411",
        title: "Escala Salarial Decreto N° 411/26",
        desc: "Planilla de sueldos básicos y adicionales vigentes a partir de 2026.",
        file: "docs/DEC-2026-00000411-APPSF-PE (1).pdf",
        icon: "payments",
        color: "from-cyan-600/20 to-blue-600/20 text-cyan-400 border-cyan-500/30",
        badge: "Sueldos y Tarifas"
    }
];

function renderAcademia(container) {
    if (!container) container = document.getElementById('app');
    let viewContainer = container;

    const data = window.academyData;
    if (!data) {
        container.innerHTML = `<div class="p-6 text-center text-slate-400">Cargando datos de la Academia...</div>`;
        return;
    }

    // State Initialization
    window.academySelectedHierarchy = window.academySelectedHierarchy || data.hierarchies[0].id;
    window.academyActiveTab = window.academyActiveTab || 'library'; // 'library' (Fuentes) as default for NotebookLM
    window.currentExamAnswers = window.currentExamAnswers || {};
    window.examSubmitted = window.examSubmitted || false;
    window.currentFlashcardIndex = window.currentFlashcardIndex || 0;
    window.flashcardFlipped = window.flashcardFlipped || false;
    window.currentPlayingUnitId = window.currentPlayingUnitId || null;

    // Source Selection (Default first 2 checked)
    if (!window.academySelectedSources) {
        window.academySelectedSources = {
            'manual-isep': true,
            'ley-12521': true,
            'ley-14283': false,
            'miraf': false,
            'decreto-411': false
        };
    }

    const hierarchy = data.hierarchies.find(h => h.id === window.academySelectedHierarchy) || data.hierarchies[0];
    const isPro = store.user?.pro_member || store.user?.role === 'admin';

    // CSS Styles injected inline for 3D Flashcards and animations
    const styleBlock = `
        <style>
            .flashcard-wrapper {
                perspective: 1200px;
            }
            .flashcard-card {
                transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                transform-style: preserve-3d;
            }
            .flashcard-card.is-flipped {
                transform: rotateY(180deg);
            }
            .flashcard-face {
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
            }
            .flashcard-back {
                transform: rotateY(180deg);
            }
            .equalizer-bar {
                animation: equalizer 0.8s ease-in-out infinite alternate;
            }
            @keyframes equalizer {
                0% { height: 4px; }
                100% { height: 16px; }
            }
        </style>
    `;

    function getHTML() {
        // Count active sources
        const checkedCount = Object.values(window.academySelectedSources).filter(Boolean).length;

        return `
            ${styleBlock}
            <!-- Sticky Header -->
            <header class="sticky top-0 z-50 bg-background-light/95 dark:bg-[#0c101b]/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="router.navigateTo('#asistente')" class="size-9 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors active:scale-95">
                        <span class="material-symbols-outlined text-lg">arrow_back</span>
                    </button>
                    <div>
                        <h1 class="text-xs font-black text-slate-900 dark:text-white tracking-wide uppercase italic flex items-center gap-2">
                            Notebook IA
                            <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${isPro ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}">
                                ${isPro ? 'ACCESO PRO' : 'DEMO GRATUITA'}
                            </span>
                        </h1>
                        <p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <span class="size-1.5 rounded-full bg-indigo-500"></span> ${checkedCount} Fuentes seleccionadas
                        </p>
                    </div>
                </div>
                <div>
                    ${!isPro ? `
                        <button onclick="window.showAcademyPaymentModal()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-sm">workspace_premium</span>
                            Activar PRO ($10.000)
                        </button>
                    ` : `
                        <div class="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                            <span class="material-symbols-outlined text-sm">verified</span>
                            Pase ISEP Activo
                        </div>
                    `}
                </div>
            </header>

            <main class="p-4 space-y-5 pb-32 max-w-md mx-auto animate-fade-in">

                <!-- Concurso Selector -->
                <section>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 px-1">Concurso de Ascenso ISEP</p>
                    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        ${data.hierarchies.map(h => `
                            <button onclick="window.selectAcademyHierarchy('${h.id}')" 
                                class="shrink-0 p-3.5 rounded-2xl border text-left transition-all active:scale-95 min-w-[170px] ${h.id === hierarchy.id ? 'bg-gradient-to-br ' + h.color + ' text-white border-white/20 shadow-xl' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'}">
                                <div class="flex items-center justify-between mb-1.5">
                                    <span class="material-symbols-outlined text-xl">${h.icon}</span>
                                    <span class="text-[8px] font-bold uppercase opacity-85">${h.badge}</span>
                                </div>
                                <p class="text-[11px] font-black leading-snug truncate">${h.title}</p>
                            </button>
                        `).join('')}
                    </div>
                </section>

                <!-- Premium Segmented Tabs Switcher (watchOS/iOS style) -->
                <div class="flex p-1 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/5 shadow-inner overflow-x-auto scrollbar-none gap-1">
                    <button onclick="window.switchAcademyTab('library')" class="shrink-0 px-3 py-2 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${window.academyActiveTab === 'library' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        <span class="material-symbols-outlined text-[13px]">folder_open</span> Fuentes
                    </button>
                    <button onclick="window.switchAcademyTab('summaries')" class="shrink-0 px-3 py-2 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${window.academyActiveTab === 'summaries' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        <span class="material-symbols-outlined text-[13px]">menu_book</span> Resúmenes
                    </button>
                    <button onclick="window.switchAcademyTab('exam')" class="shrink-0 px-3 py-2 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${window.academyActiveTab === 'exam' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        <span class="material-symbols-outlined text-[13px]">quiz</span> Evaluación
                    </button>
                    <button onclick="window.switchAcademyTab('flashcards')" class="shrink-0 px-3 py-2 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${window.academyActiveTab === 'flashcards' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        <span class="material-symbols-outlined text-[13px]">style</span> Tarjetas
                    </button>
                    <button onclick="window.switchAcademyTab('mindmaps')" class="shrink-0 px-3 py-2 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${window.academyActiveTab === 'mindmaps' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        <span class="material-symbols-outlined text-[13px]">account_tree</span> Esquemas
                    </button>
                    <button onclick="window.switchAcademyTab('tutor')" class="shrink-0 px-3 py-2 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all flex items-center gap-1.5 ${window.academyActiveTab === 'tutor' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-purple-400 hover:text-white'}">
                        <span class="material-symbols-outlined text-[13px] animate-pulse">psychology</span> Tutor IA
                    </button>
                </div>

                <!-- Tab Content area -->
                <div id="academy-tab-content" class="animate-fade-in min-h-[300px]">
                    ${window.academyActiveTab === 'library' ? renderLibraryTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'summaries' ? renderSummariesTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'exam' ? renderExamTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'flashcards' ? renderFlashcardsTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'mindmaps' ? renderMindmapsTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'tutor' ? renderGeminiTutorTab(hierarchy, isPro) : ''}
                </div>

                ${renderAdBannerSmall()}
            </main>
            ${renderBottomNav('asistente')}
        `;
    }

    // --- TAB 1: FUENTES DE ESTUDIO (NotebookLM Sources) ---
    function renderLibraryTab(hierarchy, isPro) {
        return `
            <div class="space-y-4">
                <div class="glass-card p-4 rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-indigo-950/20 to-slate-900 text-white shadow-xl space-y-1.5">
                    <h3 class="text-xs font-black uppercase text-indigo-400 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm">folder_managed</span> Fuentes del Notebook
                    </h3>
                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        Selecciona qué manuales y leyes oficiales activarán las preguntas del evaluador y el Tutor IA.
                    </p>
                </div>

                <div class="space-y-2.5">
                    ${academyLibraryItems.map((item, index) => {
                        const isLocked = !isPro && index > 1; // Free tier locks index > 1
                        const isChecked = !!window.academySelectedSources[item.id];
                        return `
                            <div class="glass-card p-4 rounded-2xl border border-white/5 flex items-center justify-between relative overflow-hidden transition-all hover:border-indigo-500/30">
                                ${isLocked ? `
                                    <div class="absolute inset-0 bg-[#0a0c12]/90 backdrop-blur-sm z-20 flex items-center justify-between px-4">
                                        <div class="flex items-center gap-2">
                                            <span class="material-symbols-outlined text-amber-400 text-lg">lock</span>
                                            <span class="text-[9px] font-black text-white uppercase tracking-wider">Manual PRO</span>
                                        </div>
                                        <button onclick="window.showAcademyPaymentModal()" class="px-2.5 py-1.5 rounded-lg bg-amber-500 text-white font-bold text-[9px] uppercase tracking-wider active:scale-95 transition-all shadow-md shadow-amber-500/10">
                                            Desbloquear
                                        </button>
                                    </div>
                                ` : ''}

                                <div class="flex items-center gap-3.5 flex-1 pr-2">
                                    <label class="relative flex items-center justify-center size-5 shrink-0 cursor-pointer">
                                        <input type="checkbox" ${isChecked ? 'checked' : ''} 
                                            onclick="window.toggleSourceSelection('${item.id}')"
                                            class="sr-only peer">
                                        <div class="absolute inset-0 rounded-md border-2 border-slate-500 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-all flex items-center justify-center">
                                            <span class="material-symbols-outlined text-white text-[12px] font-black scale-0 peer-checked:scale-100 transition-transform">check</span>
                                        </div>
                                    </label>
                                    <div class="flex items-center gap-3">
                                        <div class="size-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center border shrink-0">
                                            <span class="material-symbols-outlined text-lg">${item.icon}</span>
                                        </div>
                                        <div>
                                            <h4 class="font-bold text-xs text-slate-900 dark:text-white leading-snug">${item.title}</h4>
                                            <p class="text-[9px] text-slate-400 leading-relaxed mt-0.5">${item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <a href="${item.file}" download class="size-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10 active:scale-90 transition-all ml-1" title="Descargar PDF">
                                    <span class="material-symbols-outlined text-sm">download</span>
                                </a>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // --- TAB 2: RESÚMENES & AUDIOBOOK ---
    function renderSummariesTab(hierarchy, isPro) {
        return `
            <div class="space-y-4">
                <div class="flex items-center justify-between px-1">
                    <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider">Unidades de Estudio</h3>
                    <span class="text-[10px] text-slate-500 font-bold">${hierarchy.summaries.length} Unidades</span>
                </div>

                ${hierarchy.summaries.map((sum, index) => {
                    const isLocked = !isPro && index > 0;
                    const isPlaying = window.currentPlayingUnitId === sum.id;
                    return `
                        <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-3 relative overflow-hidden transition-all hover:border-primary/20">
                            ${isLocked ? `
                                <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
                                    <span class="material-symbols-outlined text-amber-400 text-3xl mb-1">lock</span>
                                    <p class="text-xs font-black text-white uppercase">Unidad Exclusiva PRO</p>
                                    <p class="text-[10px] text-slate-400 mt-0.5 mb-3">Activa tu acceso ($10.000) por Alias para desbloquear todo el programa ISEP</p>
                                    <button onclick="window.showAcademyPaymentModal()" class="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                                        Activar Acceso ISEP
                                    </button>
                                </div>
                            ` : ''}

                            <div class="flex items-start justify-between gap-3">
                                <div>
                                    <span class="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">${sum.readTime} de lectura</span>
                                    <h4 class="font-bold text-sm text-slate-900 dark:text-white mt-1 leading-snug">${sum.title}</h4>
                                </div>
                                <button onclick="window.playAudiobook('${encodeURIComponent(sum.title)}', '${encodeURIComponent(sum.content.replace(/<[^>]*>?/gm, ''))}', '${sum.id}')" 
                                    class="size-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 shrink-0 ${isPlaying ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white'}" 
                                    title="Escuchar Audiolibro TTS">
                                    ${isPlaying ? `
                                        <div class="flex items-center gap-0.5 h-3">
                                            <div class="w-[2px] bg-white rounded-full equalizer-bar" style="animation-delay: 0.1s;"></div>
                                            <div class="w-[2px] bg-white rounded-full equalizer-bar" style="animation-delay: 0.3s;"></div>
                                            <div class="w-[2px] bg-white rounded-full equalizer-bar" style="animation-delay: 0.5s;"></div>
                                        </div>
                                    ` : `
                                        <span class="material-symbols-outlined text-xl">volume_up</span>
                                    `}
                                </button>
                            </div>

                            <div class="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                                ${sum.content}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // --- TAB 3: EVALUACIÓN / SIMULADOR ---
    function renderExamTab(hierarchy, isPro) {
        const isCustom = !!window.customAIQuestions;
        const questions = isCustom ? window.customAIQuestions : hierarchy.exams;
        const total = questions.length;
        let score = 0;
        let answeredCount = Object.keys(window.currentExamAnswers).length;

        if (window.examSubmitted) {
            questions.forEach((q, idx) => {
                if (window.currentExamAnswers[idx] === q.correctIndex) score++;
            });
        }

        const pct = total > 0 ? Math.round((score / total) * 100) : 0;

        return `
            <div class="space-y-4">
                ${!isCustom ? `
                    <!-- Generador de Examen IA (NotebookLM Style) -->
                    <div class="glass-card p-5 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="size-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                                <span class="material-symbols-outlined text-base">psychology</span>
                            </div>
                            <div>
                                <h3 class="text-xs font-black text-white uppercase tracking-wider">Evaluador Dinámico IA</h3>
                                <p class="text-[9px] text-purple-300 font-bold uppercase tracking-widest">Estilo Google NotebookLM 🧠</p>
                            </div>
                        </div>
                        <p class="text-[11px] text-slate-300 leading-relaxed">
                            Generá un examen interactivo único a partir de las fuentes que marcaste en la pestaña anterior.
                        </p>
                        <div class="space-y-3 pt-1 text-xs">
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Preguntas</label>
                                    <select id="iaExamQty" class="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500">
                                        <option value="5">5 Preguntas</option>
                                        <option value="10">10 Preguntas</option>
                                        <option value="15">15 Preguntas</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Dificultad</label>
                                    <select id="iaExamDiff" class="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500">
                                        <option value="Intermedia (Nivel estándar concurso)">Intermedio</option>
                                        <option value="Avanzada (Examen de Ascenso Oficial ISEP)">Avanzado</option>
                                        <option value="Facilitada (Estudio inicial)">Inicial</option>
                                    </select>
                                </div>
                            </div>
                            <button onclick="window.generateAIExam(event)" class="w-full py-3 mt-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5">
                                <span class="material-symbols-outlined text-sm animate-pulse">psychology</span>
                                Generar Examen con IA
                            </button>
                        </div>
                    </div>
                ` : `
                    <!-- IA Exam Active Banner -->
                    <div class="p-4 rounded-3xl border border-purple-500/30 bg-purple-950/20 text-purple-300 flex items-center justify-between shadow-xl">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-purple-400">psychology</span>
                            <div>
                                <p class="text-[9px] font-black uppercase tracking-wider">Modo Evaluador Dinámico</p>
                                <p class="text-xs font-bold text-white">Examen IA Activo</p>
                            </div>
                        </div>
                        <button onclick="window.resetToOfficialExam()" class="px-3 py-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl text-[9px] font-bold uppercase transition-all">
                            Volver al Programa
                        </button>
                    </div>
                `}

                <!-- SVG Circular Score Gauge Header -->
                ${window.examSubmitted ? `
                    <div class="flex items-center justify-between p-4 bg-slate-900 border border-white/10 rounded-3xl shadow-xl">
                        <div class="space-y-1">
                            <p class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Resultado del Examen</p>
                            <h4 class="text-sm font-bold text-white">${pct >= 60 ? 'Aprobado' : 'Reprobado'}</h4>
                            <p class="text-[10px] text-slate-400">Calificación mínima: 60%</p>
                        </div>
                        <div class="relative size-16 flex items-center justify-center shrink-0">
                            <svg class="size-full -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.05)" stroke-width="5" />
                                <circle cx="32" cy="32" r="28" fill="transparent" stroke="${pct >= 60 ? '#10b981' : '#ef4444'}" stroke-width="5"
                                    stroke-dasharray="175.9" stroke-dashoffset="${175.9 - (175.9 * pct) / 100}" stroke-linecap="round" />
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center text-xs font-black text-white">
                                ${pct}%
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="glass-card p-4 rounded-3xl border border-white/5 flex items-center justify-between">
                        <div>
                            <p class="text-[9px] font-black uppercase text-slate-400 tracking-wider">${isCustom ? 'Autoevaluación con IA' : 'Simulador Concurso ISEP'}</p>
                            <p class="text-xs font-bold text-slate-900 dark:text-white">${total} Preguntas</p>
                        </div>
                        <span class="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">${answeredCount}/${total} Respondidas</span>
                    </div>
                `}

                ${questions.map((q, idx) => {
                    const isLocked = !isPro && idx > 0;
                    const selectedOpt = window.currentExamAnswers[idx];
                    return `
                        <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-3 relative overflow-hidden transition-all">
                            ${isLocked ? `
                                <div class="absolute inset-0 bg-[#0c101b]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
                                    <span class="material-symbols-outlined text-amber-400 text-3xl mb-1">lock</span>
                                    <p class="text-xs font-black text-white uppercase">Pregunta Exclusiva PRO</p>
                                    <p class="text-[10px] text-slate-400 mt-0.5 mb-3">Desbloqueá el simulador completo de 50 preguntas con justificación ISEP</p>
                                    <button onclick="window.showAcademyPaymentModal()" class="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                                        Desbloquear Simulador ($10.000)
                                    </button>
                                </div>
                            ` : ''}

                            <div class="flex items-start gap-3">
                                <span class="size-6 rounded-full bg-primary/20 text-primary font-black text-xs flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                                <h4 class="font-bold text-xs text-slate-900 dark:text-white leading-snug">${q.question}</h4>
                            </div>

                            <div class="space-y-2 pt-1">
                                ${q.options.map((opt, optIdx) => {
                                    let btnStyle = "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10";
                                    if (selectedOpt === optIdx) {
                                        btnStyle = "bg-primary/20 border-primary text-primary font-bold shadow-lg shadow-primary/5";
                                    }
                                    if (window.examSubmitted) {
                                        if (optIdx === q.correctIndex) {
                                            btnStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-400 font-bold";
                                        } else if (selectedOpt === optIdx && selectedOpt !== q.correctIndex) {
                                            btnStyle = "bg-red-500/20 border-red-500/60 text-red-400 font-bold";
                                        }
                                    }
                                    return `
                                        <button onclick="window.selectExamOption(${idx}, ${optIdx})" ${window.examSubmitted ? 'disabled' : ''}
                                            class="w-full text-left p-3 rounded-2xl border text-xs transition-all active:scale-[0.98] flex items-center justify-between ${btnStyle}">
                                            <span>${opt}</span>
                                            ${window.examSubmitted && optIdx === q.correctIndex ? '<span class="material-symbols-outlined text-sm text-emerald-400">check_circle</span>' : ''}
                                        </button>
                                    `;
                                }).join('')}
                            </div>

                            ${window.examSubmitted ? `
                                <div class="p-3 rounded-2xl bg-slate-950 border border-white/5 text-[11px] text-slate-300 leading-relaxed space-y-1">
                                    <p class="font-bold text-emerald-400 flex items-center gap-1">
                                        <span class="material-symbols-outlined text-sm">menu_book</span> Fundamentación de la Fuente:
                                    </p>
                                    <p>${q.explanation}</p>
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}

                <div class="pt-2">
                    ${!window.examSubmitted ? `
                        <button onclick="window.submitAcademyExam()" class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                            Entregar y Calificar Examen
                        </button>
                    ` : `
                        <div class="space-y-2">
                            <button onclick="window.resetAcademyExam()" class="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-sm">restart_alt</span> Reiniciar Simulador
                            </button>
                            ${isCustom ? `
                                <button onclick="window.resetToOfficialExam()" class="w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all">
                                    Volver al Programa del Concurso
                                </button>
                            ` : ''}
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    // --- TAB 4: FLASHCARDS INTERACTIVAS (3D Flip Effect) ---
    function renderFlashcardsTab(hierarchy, isPro) {
        const flashcards = hierarchy.flashcards;
        const current = flashcards[window.currentFlashcardIndex] || flashcards[0];
        const isLocked = !isPro && window.currentFlashcardIndex > 0;

        return `
            <div class="space-y-6 text-center">
                <div class="flex items-center justify-between px-1">
                    <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider">Tarjetas Didácticas de Memorización</h3>
                    <span class="text-[10px] text-slate-500 font-bold">${window.currentFlashcardIndex + 1} de ${flashcards.length}</span>
                </div>

                <div onclick="${isLocked ? '' : 'window.flipFlashcard()'}" class="flashcard-wrapper w-full min-h-[240px] cursor-pointer">
                    <div class="flashcard-card relative w-full h-[240px] ${window.flashcardFlipped ? 'is-flipped' : ''}">
                        
                        <!-- FRONT FACE -->
                        <div class="flashcard-face absolute inset-0 p-6 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-2xl flex flex-col items-center justify-center">
                            ${isLocked ? `
                                <div class="absolute inset-0 bg-[#0a0c12]/95 backdrop-blur-md rounded-[2.5rem] z-20 flex flex-col items-center justify-center p-4 text-center">
                                    <span class="material-symbols-outlined text-amber-400 text-3xl mb-1">lock</span>
                                    <p class="text-xs font-black text-white uppercase">Tarjetas Exclusivas PRO</p>
                                    <p class="text-[10px] text-slate-400 mt-0.5 mb-3">Activa tu pase ($10.000) por Alias para practicar con todo el mazo</p>
                                    <button onclick="window.showAcademyPaymentModal()" class="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                                        Desbloquear Mazo completo
                                    </button>
                                </div>
                            ` : ''}

                            <span class="text-[8px] font-black uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 mb-5">
                                ${current.category} • PREGUNTA
                            </span>
                            <p class="text-sm font-bold leading-snug px-2 text-slate-100 max-w-xs">
                                ${current.front}
                            </p>
                            <p class="text-[9px] text-slate-500 mt-6 font-mono flex items-center gap-1">
                                <span class="material-symbols-outlined text-xs">touch_app</span> Tocar para revelar respuesta
                            </p>
                        </div>

                        <!-- BACK FACE -->
                        <div class="flashcard-face flashcard-back absolute inset-0 p-6 rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-2xl flex flex-col items-center justify-center">
                            <span class="text-[8px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 mb-5">
                                RESPUESTA OFICIAL
                            </span>
                            <p class="text-xs font-bold leading-relaxed px-2 text-slate-100 max-w-xs">
                                ${current.back}
                            </p>
                            <p class="text-[9px] text-slate-500 mt-6 font-mono flex items-center gap-1">
                                <span class="material-symbols-outlined text-xs">touch_app</span> Tocar para volver a la pregunta
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between gap-4">
                    <button onclick="window.prevFlashcard(${flashcards.length})" class="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-1">
                        <span class="material-symbols-outlined text-sm">arrow_back</span> Anterior
                    </button>
                    <button onclick="window.nextFlashcard(${flashcards.length})" class="flex-1 py-3 rounded-2xl bg-primary text-white font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-1 shadow-lg shadow-primary/20">
                        Siguiente <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        `;
    }

    // --- TAB 5: MAPAS MENTALES Y ESQUEMAS (Dynamic Mermaid.js Rendering) ---
    function renderMindmapsTab(hierarchy, isPro) {
        const mindmaps = hierarchy.mindmaps;

        // Load Mermaid dynamically from CDN
        if (typeof mermaid === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
            script.onload = () => {
                mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
                setTimeout(() => {
                    try { mermaid.run(); } catch(e) { console.warn("Mermaid execution warning:", e); }
                }, 100);
            };
            document.head.appendChild(script);
        } else {
            setTimeout(() => {
                try { mermaid.run(); } catch(e) { console.warn("Mermaid execution warning:", e); }
            }, 100);
        }

        return `
            <div class="space-y-4">
                <div class="px-1 flex items-center justify-between">
                    <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider">Esquemas de Procedimiento</h3>
                    <span class="text-[9px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded-md">Vectorial</span>
                </div>

                ${mindmaps.map(mm => `
                    <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-4">
                        <h4 class="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-sm">account_tree</span>
                            ${mm.title}
                        </h4>
                        <div class="mermaid bg-slate-950 p-4 rounded-2xl border border-white/5 flex justify-center overflow-x-auto text-[10px] leading-relaxed select-none">
                            ${mm.mermaid.trim()}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // --- TAB 6: TUTOR IA (Google NotebookLM Conversational Chat Room) ---
    function renderGeminiTutorTab(hierarchy, isPro) {
        // Collect checked sources to display inside Chat Companion
        const activeSourceTitles = academyLibraryItems
            .filter(item => window.academySelectedSources[item.id])
            .map(item => item.title);

        return `
            <div class="space-y-4">
                <!-- Chat Header companion -->
                <div class="glass-card p-4 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-slate-900 to-indigo-950/80 text-white shadow-xl space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2.5">
                            <div class="relative">
                                <div class="absolute inset-0 rounded-full bg-purple-500/30 blur-sm animate-pulse"></div>
                                <span class="relative size-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                                    <span class="material-symbols-outlined text-lg animate-pulse">psychology</span>
                                </span>
                            </div>
                            <div>
                                <h3 class="text-xs font-black text-white uppercase tracking-wider">Tutor Centinela IA</h3>
                                <p class="text-[9px] text-purple-300 font-bold uppercase tracking-wider">Conectado a tus fuentes 🧠</p>
                            </div>
                        </div>
                    </div>

                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        Pregunta cualquier duda. Gemini responderá analizando tus fuentes seleccionadas:
                        <span class="text-purple-300 font-bold font-mono text-[10px] break-words">
                            (${activeSourceTitles.join(', ')})
                        </span>.
                    </p>

                    <!-- Pre-built question chips -->
                    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-[10px]">
                        <button onclick="window.askGeminiTutor('¿Cuáles son las 4 virtudes de la Autoridad según el ISEP 2026?')" class="shrink-0 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all active:scale-95 font-bold">
                            💡 Virtudes del Liderazgo
                        </button>
                        <button onclick="window.askGeminiTutor('¿Cómo debe realizarse la descarga de un arma secuestrada según ISEP Pág. 69?')" class="shrink-0 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all active:scale-95 font-bold">
                            🔫 Descarga de Armas
                        </button>
                        <button onclick="window.askGeminiTutor('Diferencia entre Cesantía y Exoneración en el Régimen Disciplinario')" class="shrink-0 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all active:scale-95 font-bold">
                            ⚖️ Faltas y Sanciones
                        </button>
                    </div>
                </div>

                <!-- Live Chat Message Area -->
                <div id="gemini-tutor-output" class="space-y-3.5 min-h-[100px] max-h-[350px] overflow-y-auto pr-1"></div>

                <!-- Chat Form Input -->
                <form onsubmit="window.submitGeminiTutorForm(event)" class="relative flex items-center gap-2">
                    <input type="text" id="gemini-tutor-input" placeholder="Pregunta a la IA sobre las fuentes..." 
                        class="w-full px-4 py-3.5 bg-slate-900 border border-purple-500/20 rounded-2xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-purple-500 transition-all pr-12 shadow-inner">
                    <button type="submit" class="absolute right-1.5 size-9 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 active:scale-90 transition-all">
                        <span class="material-symbols-outlined text-sm">send</span>
                    </button>
                </form>
            </div>
        `;
    }

    // --- VIEW INTERACTION EVENT HANDLERS ---

    window.toggleSourceSelection = (sourceId) => {
        window.academySelectedSources = window.academySelectedSources || {};
        window.academySelectedSources[sourceId] = !window.academySelectedSources[sourceId];
        // Ensure at least one source is checked
        const anyChecked = Object.values(window.academySelectedSources).some(v => v);
        if (!anyChecked) {
            window.academySelectedSources[sourceId] = true;
            showToast("⚠️ Debes seleccionar al menos una fuente");
            return;
        }
        renderAcademia(viewContainer);
        showToast("📂 Fuentes actualizadas");
    };

    window.resetToOfficialExam = () => {
        window.customAIQuestions = null;
        window.currentExamAnswers = {};
        window.examSubmitted = false;
        container.innerHTML = getHTML();
        initAds();
    };

    window.generateAIExam = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        
        // Find checked sources titles
        const activeSourceTitles = academyLibraryItems
            .filter(item => window.academySelectedSources[item.id])
            .map(item => item.title);

        const qty = parseInt(document.getElementById('iaExamQty')?.value || "5", 10);
        const difficulty = document.getElementById('iaExamDiff')?.value || "Intermedia";

        // Show premium full screen loader
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-[#07090e]/96 z-[9999] flex flex-col items-center justify-center p-6 text-center animate-fade-in';
        overlay.innerHTML = `
            <div class="relative w-24 h-24 mb-6">
                <div class="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping"></div>
                <div class="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" style="animation-duration: 0.8s;"></div>
                <div class="absolute inset-2 rounded-full border-4 border-purple-400/10"></div>
                <div class="absolute inset-2 rounded-full border-4 border-b-purple-400 border-t-transparent border-r-transparent border-l-transparent animate-spin" style="animation-direction: reverse; animation-duration: 1.2s;"></div>
                <div class="absolute inset-0 flex items-center justify-center text-purple-400 font-black text-xs tracking-widest animate-pulse">
                    AI
                </div>
            </div>
            <h3 class="text-lg font-black text-white leading-tight mb-2">Evaluador Inteligente Notebook IA</h3>
            <p class="text-xs text-slate-400 max-w-xs leading-relaxed animate-pulse">
                Analizando doctrina de: <br><strong class="text-purple-300">${activeSourceTitles.join(', ')}</strong>...
            </p>
        `;
        document.body.appendChild(overlay);

        const systemInstruction = `Sos un software evaluador de exámenes académicos del ISEP (Instituto de Seguridad Pública de Santa Fe, Argentina). Tu tarea es generar exámenes de opción múltiple con 4 opciones. Debes responder EXCLUSIVAMENTE con un array JSON válido, sin textos introductorios, sin explicaciones externas, y sin bloques de código markdown (NO uses \`\`\`json ni \`\`\`). El formato debe ser estrictamente un array de objetos con esta estructura de ejemplo:
[
  {
    "id": "ai-q-1",
    "question": "Texto de la pregunta...",
    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
    "correctIndex": 1,
    "explanation": "Fundamentación legal con artículos o páginas de los manuales oficiales..."
  }
]`;

        const userPrompt = `Generá un examen de exactamente ${qty} preguntas sobre las siguientes fuentes de estudio seleccionadas: ${activeSourceTitles.join(', ')}.
Dificultad requerida: ${difficulty}.
Las preguntas deben ser realistas, basadas estrictamente en la doctrina legal de la policía de Santa Fe. Asegúrate de retornar un JSON válido estructurado.`;

        try {
            const answer = await window.callGeminiAPI(userPrompt, systemInstruction);
            overlay.remove();

            let cleanJSON = answer.trim();
            if (cleanJSON.startsWith('```')) {
                cleanJSON = cleanJSON.replace(/^```json|^```|```$/g, '').trim();
            }

            const questions = JSON.parse(cleanJSON);
            if (!Array.isArray(questions) || questions.length === 0) {
                throw new Error("El formato devuelto no es un array válido.");
            }

            window.customAIQuestions = questions;
            window.currentExamAnswers = {};
            window.examSubmitted = false;
            
            showToast("✨ Examen dinámico con IA generado");
            container.innerHTML = getHTML();
            initAds();
        } catch(err) {
            overlay.remove();
            console.error("Failed to generate AI exam:", err);
            alert("Hubo un problema al generar el examen con Gemini IA. Por favor, verifica tu clave de API y reintenta.\n\nError: " + err.message);
        }
    };

    window.askGeminiTutor = (query) => {
        const input = document.getElementById('gemini-tutor-input');
        if (input) {
            input.value = query;
            window.submitGeminiTutorForm(new Event('submit'));
        }
    };

    window.submitGeminiTutorForm = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const input = document.getElementById('gemini-tutor-input');
        const output = document.getElementById('gemini-tutor-output');
        if (!input || !output) return;

        const query = input.value.trim();
        if (!query) return;

        // Append User Message bubble
        output.innerHTML += `
            <div class="flex gap-2.5 justify-end items-start animate-fade-in">
                <div class="p-3 bg-indigo-600 border border-indigo-500/20 rounded-2xl rounded-tr-none text-xs text-white max-w-[80%] leading-relaxed">
                    <p class="font-black text-[8px] opacity-80 uppercase tracking-widest mb-0.5">Tú</p>
                    <p class="font-medium">${escapeHTML(query)}</p>
                </div>
                <div class="size-7 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shrink-0 text-white border border-indigo-400/20">
                    <span class="material-symbols-outlined text-xs">person</span>
                </div>
            </div>
        `;

        const loadingId = 'tutor-load-' + Date.now();
        output.innerHTML += `
            <div id="${loadingId}" class="flex gap-2.5 items-start animate-fade-in">
                <div class="size-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 text-white border border-purple-400/20">
                    <span class="material-symbols-outlined text-xs animate-spin">sync</span>
                </div>
                <div class="p-3 bg-slate-900 border border-white/5 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-1.5">
                    <span>Gemini IA consultando fuentes...</span>
                </div>
            </div>
        `;

        input.value = '';
        output.scrollTop = output.scrollHeight;

        const activeSourceTitles = academyLibraryItems
            .filter(item => window.academySelectedSources[item.id])
            .map(item => item.title);

        const systemInstruction = `Sos Centinela AI y Tutor de la Academia PRO ISEP de la Policía de Santa Fe (Argentina). Tus respuestas deben basarse estrictamente en las fuentes de estudio seleccionadas por el oficial: ${activeSourceTitles.join(', ')}. Cita los artículos o páginas correspondientes cuando fundamentes legalmente tus respuestas. Responde en español rioplatense.`;

        try {
            const answer = await window.callGeminiAPI(query, systemInstruction);
            const loadEl = document.getElementById(loadingId);
            if (loadEl) loadEl.remove();

            output.innerHTML += `
                <div class="flex gap-2.5 items-start animate-fade-in">
                    <div class="size-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 text-white border border-purple-400/20 shadow-md">
                        <span class="material-symbols-outlined text-xs">psychology</span>
                    </div>
                    <div class="p-4.5 bg-slate-900 border border-purple-500/20 rounded-2xl rounded-tl-none text-xs text-slate-100 max-w-[80%] leading-relaxed space-y-1.5 shadow-lg">
                        <p class="font-black text-[8px] text-purple-400 uppercase tracking-widest">Tutor Centinela IA</p>
                        <div class="whitespace-pre-wrap">${answer}</div>
                    </div>
                </div>
            `;
            output.scrollTop = output.scrollHeight;
        } catch(err) {
            const loadEl = document.getElementById(loadingId);
            if (loadEl) loadEl.remove();

            output.innerHTML += `
                <div class="flex gap-2.5 items-start animate-fade-in">
                    <div class="size-7 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-xs">warning</span>
                    </div>
                    <div class="p-3 bg-red-950/40 border border-red-500/20 rounded-2xl rounded-tl-none text-xs text-red-300">
                        ❌ ${err.message || 'Error de conexión con la IA'}
                    </div>
                </div>
            `;
            output.scrollTop = output.scrollHeight;
        }
    };

    window.selectAcademyHierarchy = (id) => {
        window.academySelectedHierarchy = id;
        window.currentExamAnswers = {};
        window.examSubmitted = false;
        window.currentFlashcardIndex = 0;
        window.flashcardFlipped = false;
        container.innerHTML = getHTML();
        initAds();
    };

    window.switchAcademyTab = (tab) => {
        window.academyActiveTab = tab;
        container.innerHTML = getHTML();
        initAds();
    };

    window.selectExamOption = (qIdx, optIdx) => {
        window.currentExamAnswers[qIdx] = optIdx;
        container.innerHTML = getHTML();
        initAds();
    };

    window.submitAcademyExam = () => {
        window.examSubmitted = true;
        container.innerHTML = getHTML();
        initAds();
    };

    window.resetAcademyExam = () => {
        window.currentExamAnswers = {};
        window.examSubmitted = false;
        container.innerHTML = getHTML();
        initAds();
    };

    window.flipFlashcard = () => {
        window.flashcardFlipped = !window.flashcardFlipped;
        const cardEl = document.querySelector('.flashcard-card');
        if (cardEl) {
            if (window.flashcardFlipped) cardEl.classList.add('is-flipped');
            else cardEl.classList.remove('is-flipped');
        }
    };

    window.prevFlashcard = (total) => {
        window.flashcardFlipped = false;
        window.currentFlashcardIndex = (window.currentFlashcardIndex - 1 + total) % total;
        container.innerHTML = getHTML();
        initAds();
    };

    window.nextFlashcard = (total) => {
        window.flashcardFlipped = false;
        window.currentFlashcardIndex = (window.currentFlashcardIndex + 1) % total;
        container.innerHTML = getHTML();
        initAds();
    };

    window.playAudiobook = (titleEnc, contentEnc, unitId) => {
        const title = decodeURIComponent(titleEnc);
        const content = decodeURIComponent(contentEnc);

        if (!('speechSynthesis' in window)) {
            showToast("Tu navegador no soporta lectura de audio sintético TTS");
            return;
        }

        if (window.currentPlayingUnitId === unitId) {
            window.speechSynthesis.cancel();
            window.currentPlayingUnitId = null;
            showToast("🛑 Audio pausado");
            renderAcademia(viewContainer);
            return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${title}. ${content}`);
        utterance.lang = 'es-AR';
        utterance.rate = 1.05;

        utterance.onend = () => {
            window.currentPlayingUnitId = null;
            renderAcademia(viewContainer);
        };

        utterance.onerror = () => {
            window.currentPlayingUnitId = null;
            renderAcademia(viewContainer);
        };

        window.currentPlayingUnitId = unitId;
        window.speechSynthesis.speak(utterance);
        showToast("🔊 Reproduciendo audiolibro ISEP...");
        renderAcademia(viewContainer);
    };

    // --- MODAL DE PAGO ALIAS $10.000 & APROBACIÓN ---
    window.showAcademyPaymentModal = () => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-4';
        overlay.innerHTML = `
            <div class="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 relative animate-fade-in">
                <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 size-8 rounded-full bg-white/5 text-slate-400 hover:text-white flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>

                <div class="text-center space-y-1">
                    <span class="size-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
                        <span class="material-symbols-outlined text-2xl">workspace_premium</span>
                    </span>
                    <h3 class="text-lg font-black text-white">Activar Pase Academia PRO</h3>
                    <p class="text-xs text-slate-400">Acceso ilimitado al Concurso ISEP ($10.000 ARS)</p>
                </div>

                <!-- Datos de Transferencia Alias -->
                <div class="bg-slate-800/80 p-4 rounded-2xl border border-white/5 space-y-2 text-xs">
                    <p class="font-bold text-amber-400 uppercase text-[10px] tracking-wider">Datos para Transferir:</p>
                    <div class="flex justify-between items-center py-1 border-b border-white/5">
                        <span class="text-slate-400">Alias MP:</span>
                        <span class="font-mono font-bold text-white select-all">adicionales.santafe.mp</span>
                    </div>
                    <div class="flex justify-between items-center py-1 border-b border-white/5">
                        <span class="text-slate-400">Titular:</span>
                        <span class="font-bold text-white">Adicionales Santa Fe</span>
                    </div>
                    <div class="flex justify-between items-center py-1">
                        <span class="text-slate-400">Monto:</span>
                        <span class="font-black text-emerald-400 text-sm">$10.000 ARS</span>
                    </div>
                </div>

                <!-- Formulario de Notificación de Pago -->
                <form onsubmit="window.submitAcademyPaymentNotify(event)" class="space-y-3 pt-1">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Número de Comprobante / CPO (Transacción)</label>
                        <input type="text" id="paymentCpoInput" required placeholder="Ej: 8492048201" class="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs outline-none focus:border-amber-500 transition-all">
                    </div>
                    <button type="submit" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                        Notificar Pago a Administración
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(overlay);
    };

    window.submitAcademyPaymentNotify = async (e) => {
        e.preventDefault();
        const cpoNumber = document.getElementById('paymentCpoInput')?.value.trim();
        if (!cpoNumber) return;

        try {
            await DB.notifyAcademyPayment({
                email: store.user?.email,
                name: store.user?.name,
                hierarchy: window.academySelectedHierarchy,
                amount: 10000,
                cpoNumber: cpoNumber
            });
            document.querySelector('.fixed')?.remove();
            showToast("✅ Comprobante enviado. Tu acceso PRO se activará apenas el Admin valide la transferencia.");
        } catch(err) {
            showToast("Error al notificar pago");
        }
    };

    container.innerHTML = getHTML();
    initAds();
}
