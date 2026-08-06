/**
 * Adicionales Santa Fe - Campus de Ascenso Policial (Academia PRO)
 */

function renderAcademia(container) {
    if (!container) container = document.getElementById('app');

    const data = window.academyData;
    if (!data) {
        container.innerHTML = `<div class="p-6 text-center text-slate-400">Cargando datos de la Academia...</div>`;
        return;
    }

    // State
    window.academySelectedHierarchy = window.academySelectedHierarchy || data.hierarchies[0].id;
    window.academyActiveTab = window.academyActiveTab || 'summaries'; // 'summaries', 'exam', 'flashcards', 'mindmaps'
    window.currentExamAnswers = window.currentExamAnswers || {};
    window.examSubmitted = window.examSubmitted || false;
    window.currentFlashcardIndex = window.currentFlashcardIndex || 0;
    window.flashcardFlipped = window.flashcardFlipped || false;

    const hierarchy = data.hierarchies.find(h => h.id === window.academySelectedHierarchy) || data.hierarchies[0];
    const isPro = store.user?.pro_member || store.user?.role === 'admin';

    function getHTML() {
        return `
            <!-- Sticky Header -->
            <header class="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button onclick="router.navigateTo('#asistente')" class="size-9 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors active:scale-95">
                        <span class="material-symbols-outlined text-lg">arrow_back</span>
                    </button>
                    <div>
                        <h1 class="text-sm font-black text-slate-900 dark:text-white tracking-wide uppercase italic flex items-center gap-2">
                            Campus Ascenso
                            <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${isPro ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}">
                                ${isPro ? 'ACCESO PRO' : 'DEMO GRATUITA'}
                            </span>
                        </h1>
                        <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Materiales ISEP 2026</p>
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

            <main class="p-4 space-y-6 pb-32 max-w-md mx-auto animate-fade-in">

                <!-- Hierarchy Carousel Selector -->
                <section>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Seleccionar Concurso ISEP</p>
                    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        ${data.hierarchies.map(h => `
                            <button onclick="window.selectAcademyHierarchy('${h.id}')" 
                                class="shrink-0 p-3 rounded-2xl border text-left transition-all active:scale-95 min-w-[170px] ${h.id === hierarchy.id ? 'bg-gradient-to-br ' + h.color + ' text-white border-white/20 shadow-xl' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'}">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="material-symbols-outlined text-xl">${h.icon}</span>
                                    <span class="text-[8px] font-bold uppercase opacity-80">${h.badge}</span>
                                </div>
                                <p class="text-xs font-black leading-snug truncate">${h.title}</p>
                            </button>
                        `).join('')}
                    </div>
                </section>

                <!-- Active Hierarchy Banner -->
                <div class="bg-gradient-to-r ${hierarchy.color} p-4 rounded-3xl text-white shadow-xl flex items-center justify-between relative overflow-hidden">
                    <div class="absolute -right-6 -bottom-6 size-28 bg-white/10 blur-2xl rounded-full"></div>
                    <div class="relative z-10">
                        <span class="text-[8px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">Programa ISEP</span>
                        <h2 class="text-base font-black leading-tight mt-1">${hierarchy.title}</h2>
                        <p class="text-[10px] opacity-90 mt-0.5">${hierarchy.subtitle}</p>
                    </div>
                    <div class="size-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white relative z-10">
                        <span class="material-symbols-outlined text-2xl">${hierarchy.icon}</span>
                    </div>
                </div>

                <!-- Tabs Switcher -->
                <div class="flex p-1 bg-slate-200 dark:bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                    <button onclick="window.switchAcademyTab('summaries')" class="flex-1 py-2.5 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all ${window.academyActiveTab === 'summaries' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        📚 Resúmenes
                    </button>
                    <button onclick="window.switchAcademyTab('exam')" class="flex-1 py-2.5 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all ${window.academyActiveTab === 'exam' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        📝 Examen
                    </button>
                    <button onclick="window.switchAcademyTab('flashcards')" class="flex-1 py-2.5 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all ${window.academyActiveTab === 'flashcards' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        🎴 Tarjetas
                    </button>
                    <button onclick="window.switchAcademyTab('mindmaps')" class="flex-1 py-2.5 rounded-xl text-[9px] uppercase tracking-wider font-black transition-all ${window.academyActiveTab === 'mindmaps' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'}">
                        🗺️ Esquemas
                    </button>
                </div>

                <!-- Tab Content -->
                <div id="academy-tab-content" class="animate-fade-in">
                    ${window.academyActiveTab === 'summaries' ? renderSummariesTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'exam' ? renderExamTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'flashcards' ? renderFlashcardsTab(hierarchy, isPro) : ''}
                    ${window.academyActiveTab === 'mindmaps' ? renderMindmapsTab(hierarchy, isPro) : ''}
                </div>

                ${renderAdBannerSmall()}
            </main>
            ${renderBottomNav('asistente')}
        `;
    }

    // --- TAB 1: RESÚMENES & AUDIOBOOK ---
    function renderSummariesTab(hierarchy, isPro) {
        return `
            <div class="space-y-4">
                <div class="flex items-center justify-between px-1">
                    <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider">Unidades de Estudio Oficial</h3>
                    <span class="text-[10px] text-slate-500 font-bold">${hierarchy.summaries.length} Unidades</span>
                </div>

                ${hierarchy.summaries.map((sum, index) => {
                    const isLocked = !isPro && index > 0;
                    return `
                        <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-3 relative overflow-hidden">
                            ${isLocked ? `
                                <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
                                    <span class="material-symbols-outlined text-amber-400 text-3xl mb-1">lock</span>
                                    <p class="text-xs font-black text-white uppercase">Unidad Exclusiva PRO</p>
                                    <p class="text-[10px] text-slate-400 mt-0.5 mb-3">Activá tu acceso ($10.000) por Alias para desbloquear todo el programa ISEP</p>
                                    <button onclick="window.showAcademyPaymentModal()" class="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                                        Activar Acceso ISEP
                                    </button>
                                </div>
                            ` : ''}

                            <div class="flex items-start justify-between">
                                <div>
                                    <span class="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">${sum.readTime} de lectura</span>
                                    <h4 class="font-bold text-sm text-slate-900 dark:text-white mt-1 leading-snug">${sum.title}</h4>
                                </div>
                                <button onclick="window.playAudiobook('${encodeURIComponent(sum.title)}', '${encodeURIComponent(sum.content.replace(/<[^>]*>?/gm, ''))}')" 
                                    class="size-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all active:scale-90 shrink-0" title="Escuchar Audiolibro TTS">
                                    <span class="material-symbols-outlined text-xl">volume_up</span>
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

    // --- TAB 2: SIMULADOR DE EXAMEN MULTIPLE CHOICE ---
    function renderExamTab(hierarchy, isPro) {
        const questions = hierarchy.exams;
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
                <!-- Exam Header Banner -->
                <div class="glass-card p-4 rounded-3xl border border-white/5 flex items-center justify-between">
                    <div>
                        <p class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Simulador Concurso ISEP</p>
                        <p class="text-xs font-bold text-slate-900 dark:text-white">${total} Preguntas Oficiales</p>
                    </div>
                    ${window.examSubmitted ? `
                        <div class="text-right">
                            <span class="text-lg font-black ${pct >= 60 ? 'text-emerald-400' : 'text-red-400'}">${pct}%</span>
                            <p class="text-[8px] font-bold uppercase text-slate-400">${pct >= 60 ? 'APROBADO' : 'REPROBADO'}</p>
                        </div>
                    ` : `
                        <span class="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">${answeredCount}/${total} Respondidas</span>
                    `}
                </div>

                ${questions.map((q, idx) => {
                    const isLocked = !isPro && idx > 0;
                    const selectedOpt = window.currentExamAnswers[idx];
                    return `
                        <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-3 relative overflow-hidden">
                            ${isLocked ? `
                                <div class="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
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
                                        btnStyle = "bg-primary/20 border-primary text-primary font-bold";
                                    }
                                    if (window.examSubmitted) {
                                        if (optIdx === q.correctIndex) {
                                            btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold";
                                        } else if (selectedOpt === optIdx && selectedOpt !== q.correctIndex) {
                                            btnStyle = "bg-red-500/20 border-red-500 text-red-400 font-bold";
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
                                <div class="p-3 rounded-2xl bg-slate-900 border border-white/10 text-[11px] text-slate-300 leading-relaxed space-y-1">
                                    <p class="font-bold text-emerald-400 flex items-center gap-1">
                                        <span class="material-symbols-outlined text-sm">menu_book</span> Justificación ISEP:
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
                        <button onclick="window.resetAcademyExam()" class="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-sm">restart_alt</span> Reiniciar Simulador
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    // --- TAB 3: FLASHCARDS INTERACTIVAS ---
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

                <div onclick="window.flipFlashcard()" class="glass-card min-h-[220px] p-6 rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-2xl flex flex-col items-center justify-center relative cursor-pointer group active:scale-95 transition-all">
                    ${isLocked ? `
                        <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-[2.5rem] z-20 flex flex-col items-center justify-center p-4 text-center">
                            <span class="material-symbols-outlined text-amber-400 text-3xl mb-1">lock</span>
                            <p class="text-xs font-black text-white uppercase">Tarjetas Exclusivas PRO</p>
                            <p class="text-[10px] text-slate-400 mt-0.5 mb-3">Activa tu pase ($10.000) por Alias para practicar con todo el mazo</p>
                            <button onclick="window.showAcademyPaymentModal()" class="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                                Desbloquear Mazo completo
                            </button>
                        </div>
                    ` : ''}

                    <span class="text-[8px] font-black uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 mb-4">
                        ${current.category} • ${window.flashcardFlipped ? 'RESPUESTA / ARTÍCULO' : 'PREGUNTA (Tocá para girar)'}
                    </span>

                    <p class="text-sm md:text-base font-bold leading-snug px-2 text-slate-100">
                        ${window.flashcardFlipped ? current.back : current.front}
                    </p>

                    <p class="text-[9px] text-slate-500 mt-6 font-mono flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">touch_app</span> Tocar para dar vuelta
                    </p>
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

    // --- TAB 4: MAPAS MENTALES Y ESQUEMAS ---
    function renderMindmapsTab(hierarchy, isPro) {
        const mindmaps = hierarchy.mindmaps;
        return `
            <div class="space-y-4">
                <div class="px-1">
                    <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider">Esquemas de Procedimientos Policiales</h3>
                </div>

                ${mindmaps.map(mm => `
                    <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-3">
                        <h4 class="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-sm">account_tree</span>
                            ${mm.title}
                        </h4>
                        <div class="p-4 bg-slate-950 rounded-2xl border border-white/5 text-xs text-slate-300 font-mono overflow-x-auto">
                            <pre class="whitespace-pre-wrap leading-relaxed">${mm.mermaid.trim()}</pre>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // --- ACTION HANDLERS ---
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
        container.innerHTML = getHTML();
        initAds();
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

    window.playAudiobook = (titleEnc, contentEnc) => {
        const title = decodeURIComponent(titleEnc);
        const content = decodeURIComponent(contentEnc);

        if (!('speechSynthesis' in window)) {
            showToast("Tu navegador no soporta lectura de audio sintético TTS");
            return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${title}. ${content}`);
        utterance.lang = 'es-AR';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
        showToast("🔊 Reproduciendo audiolibro ISEP...");
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
