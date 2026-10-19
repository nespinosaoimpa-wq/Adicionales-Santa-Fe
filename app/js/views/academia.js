/**
 * Adicionales Santa Fe - Simulador de Examen ISEP 2026
 * Reemplazo total del Aula Virtual / NotebookLM Studio PRO
 * 
 * Módulos:
 * 1. Pantalla de inicio: Elegir jerarquía + Dificultad (Fácil, Media, Difícil) + Cantidad (25 o 50)
 * 2. Control de monetización: 3 intentos de examen gratuitos, luego suscripción ISEP PRO ($2.000/mes)
 * 3. Pantalla de examen: Timer, preguntas, dificultad visible, navegación
 * 4. Pantalla de resultados: Puntaje, corrección, citas exactas de manuales y leyes
 * 5. Biblioteca de PDFs: Descarga directa de manuales ISEP 2026
 * 6. Historial de intentos y estadísticas
 */

// ══════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════
window._quizState = window._quizState || {
    activeTab: 'simulador',       // 'simulador' | 'biblioteca' | 'historial'
    selectedHierarchy: 'simulacro-integral',
    difficulty: 'media',         // 'facil' | 'media' | 'dificil'
    questionCount: 25,           // 25 | 50
    currentExam: null,           // { hierarchy, difficulty, questions, answers, startTime, timeLimit }
    currentIndex: 0,
    examFinished: false,
    examResults: null
};

// ══════════════════════════════════════════════════════════════
// MONETIZATION & FREE TRIAL HELPERS (3 intentos gratis -> $2.000/mes)
// ══════════════════════════════════════════════════════════════
const ISEP_FREE_LIMIT = 3;
const ISEP_PRO_PRICE = "$2.000 / mes";
const ISEP_WHATSAPP_PHONE = "5493425162372";

function _getFreeAttemptsUsed() {
    try {
        const val = localStorage.getItem('isep_free_attempts_used');
        if (val !== null) return parseInt(val, 10) || 0;
        // Fallback: si ya tenía historial de antes, respetar los exámenes ya hechos
        const hist = _getQuizHistory();
        return hist.length;
    } catch {
        return 0;
    }
}

function _incrementFreeAttempts() {
    try {
        const current = _getFreeAttemptsUsed();
        const next = current + 1;
        localStorage.setItem('isep_free_attempts_used', next.toString());
        return next;
    } catch {
        return 1;
    }
}

function _isIsepPro() {
    // 1. Administrador siempre tiene acceso ilimitado
    if (typeof store !== 'undefined' && store.isAdmin && store.isAdmin()) return true;

    // 2. Suscripción local o en perfil de usuario
    if (localStorage.getItem('isep_pro_subscriber') === 'true') return true;
    if (typeof store !== 'undefined' && store.user && (store.user.isep_pro || store.user.is_pro || store.user.plan === 'pro')) return true;

    return false;
}

function _activateIsepProWithCode(code) {
    const clean = (code || '').trim().toUpperCase();
    const validCodes = ['ISEP2026', 'ASCENSO2026', 'PRO2000', 'SANTAFE2026', 'ADMINISEP'];
    if (validCodes.includes(clean)) {
        localStorage.setItem('isep_pro_subscriber', 'true');
        return true;
    }
    return false;
}

// ══════════════════════════════════════════════════════════════
// GENERAL HELPERS
// ══════════════════════════════════════════════════════════════
function _shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function _formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function _getQuizHistory() {
    try { return JSON.parse(localStorage.getItem('quiz_history') || '[]'); } catch { return []; }
}

function _saveQuizResult(result) {
    const history = _getQuizHistory();
    history.unshift(result);
    if (history.length > 50) history.length = 50; // Guardar últimos 50
    localStorage.setItem('quiz_history', JSON.stringify(history));
}

// ══════════════════════════════════════════════════════════════
// MAIN RENDER
// ══════════════════════════════════════════════════════════════
function renderAcademia(container) {
    if (!container) container = document.getElementById('app');
    const state = window._quizState;

    // If exam is in progress, render exam view
    if (state.currentExam && !state.examFinished) {
        return _renderExamView(container);
    }

    // If exam just finished, render results
    if (state.examFinished && state.examResults) {
        return _renderResultsView(container);
    }

    // Otherwise, render the hub with tabs
    const meta = window.quizBankMeta;
    if (!meta) {
        container.innerHTML = `<div class="p-6 text-center text-slate-400">Cargando datos del Simulador...</div>`;
        return;
    }

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <button onclick="router.navigateTo('#agenda')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="flex flex-col">
                    <h1 class="text-lg font-black text-white leading-none">Simulador ISEP 2026</h1>
                    <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Examen de Ascenso Policial</span>
                </div>
            </div>

            <!-- PRO BADGE / TRIGGER -->
            <div>
                ${_isIsepPro() ? `
                    <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <span class="material-symbols-outlined text-xs">verified</span> ISEP PRO
                    </span>
                ` : `
                    <button onclick="window._showIsepProModal()" class="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-xs">workspace_premium</span> PRO $2.000
                    </button>
                `}
            </div>
        </header>

        <!-- TABS -->
        <div class="flex border-b border-white/5 bg-background-dark/50">
            <button onclick="window._quizState.activeTab='simulador'; renderAcademia()" 
                class="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-all ${state.activeTab === 'simulador' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}">
                <span class="material-symbols-outlined text-base align-middle mr-1">quiz</span>Simulador
            </button>
            <button onclick="window._quizState.activeTab='biblioteca'; renderAcademia()" 
                class="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-all ${state.activeTab === 'biblioteca' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}">
                <span class="material-symbols-outlined text-base align-middle mr-1">library_books</span>Biblioteca
            </button>
            <button onclick="window._quizState.activeTab='historial'; renderAcademia()" 
                class="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-all ${state.activeTab === 'historial' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}">
                <span class="material-symbols-outlined text-base align-middle mr-1">history</span>Historial
            </button>
        </div>

        <main id="quiz-tab-content" class="pb-56">
        </main>

        ${typeof renderBottomNav === 'function' ? renderBottomNav('academia') : ''}
    `;

    const tabContent = document.getElementById('quiz-tab-content');
    if (state.activeTab === 'simulador') _renderSimuladorTab(tabContent);
    else if (state.activeTab === 'biblioteca') _renderBibliotecaTab(tabContent);
    else if (state.activeTab === 'historial') _renderHistorialTab(tabContent);
}

// ══════════════════════════════════════════════════════════════
// TAB: SIMULADOR (Elegir Jerarquía, Dificultad y Cantidad)
// ══════════════════════════════════════════════════════════════
function _renderSimuladorTab(container) {
    const meta = window.quizBankMeta;
    const state = window._quizState;
    const isPro = _isIsepPro();
    const usedAttempts = _getFreeAttemptsUsed();
    const remainingAttempts = Math.max(0, ISEP_FREE_LIMIT - usedAttempts);

    container.innerHTML = `
        <div class="p-5 space-y-5 max-w-lg mx-auto">

            <!-- FREE TRIAL / PRO BANNER -->
            ${!isPro ? `
                <div class="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 flex items-center justify-between gap-3 shadow-lg shadow-amber-500/5">
                    <div class="flex items-center gap-3">
                        <div class="size-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-xl">timer</span>
                        </div>
                        <div>
                            <p class="text-xs font-black text-amber-200">Prueba Gratuita</p>
                            <p class="text-[11px] text-amber-300/80">
                                ${remainingAttempts > 0 
                                    ? `Te quedan <strong class="text-white">${remainingAttempts} de ${ISEP_FREE_LIMIT}</strong> exámenes libres` 
                                    : `<span class="text-red-400 font-bold">Límite alcanzado (${ISEP_FREE_LIMIT}/${ISEP_FREE_LIMIT})</span>`}
                            </p>
                        </div>
                    </div>
                    <button onclick="window._showIsepProModal()" class="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider shrink-0 shadow-md shadow-amber-500/20 active:scale-95 transition-all">
                        Activar PRO
                    </button>
                </div>
            ` : `
                <div class="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                    <span class="material-symbols-outlined text-emerald-400 text-xl">stars</span>
                    <div>
                        <p class="text-xs font-bold text-emerald-300">Suscripción ISEP PRO Activa</p>
                        <p class="text-[10px] text-emerald-400/80">Acceso ilimitado a todos los exámenes, modalidades y manuales</p>
                    </div>
                </div>
            `}

            <!-- HERO -->
            <div class="text-center py-2">
                <div class="inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/20 border border-primary/30 mb-2">
                    <span class="material-symbols-outlined text-3xl text-primary">school</span>
                </div>
                <h2 class="text-xl font-black text-white">Simulador de Ascenso</h2>
                <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Preguntas técnicas basadas estrictamente en la bibliografía oficial ISEP 2026. Con citas directas de leyes y manuales.</p>
            </div>

            <!-- ISEP SYLLABUS NOTICE -->
            <div class="p-3 rounded-2xl bg-blue-500/5 border border-blue-500/15 flex items-start gap-2.5">
                <span class="material-symbols-outlined text-blue-400 text-lg shrink-0 mt-0.5">menu_book</span>
                <p class="text-[11px] text-slate-300 leading-relaxed">
                    <strong class="text-white">Programas ISEP Diferenciados:</strong> Cada jerarquía concursa con su propio manual específico. Las materias y normativas cambian sustancialmente entre grados.
                </p>
            </div>

            <!-- 1. ELEGIR JERARQUÍA -->
            <div class="space-y-2">
                <div class="flex items-center justify-between ml-1">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">1. Jerarquía de concurso</h3>
                    <span class="text-[10px] text-slate-500">${meta.hierarchies.length} opciones</span>
                </div>
                <div class="grid gap-2">
                    ${meta.hierarchies.map(h => {
                        const isSelected = state.selectedHierarchy === h.id;
                        return `
                        <button onclick="window._quizState.selectedHierarchy='${h.id}'; renderAcademia()" 
                            class="group w-full text-left p-3.5 rounded-2xl border transition-all active:scale-[0.98] ${isSelected 
                                ? 'bg-gradient-to-r ' + h.color + ' border-primary/50 shadow-lg shadow-primary/10' 
                                : 'glass-card border-white/5 hover:border-white/20'}">
                            <div class="flex items-start gap-3">
                                <div class="size-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span class="material-symbols-outlined text-lg ${isSelected ? 'text-white' : 'text-slate-400'}">${h.icon}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-2">
                                        <p class="text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'} truncate">${h.title}</p>
                                        ${isSelected ? '<span class="material-symbols-outlined text-white text-base shrink-0">check_circle</span>' : ''}
                                    </div>
                                    <p class="text-[11px] ${isSelected ? 'text-white/80' : 'text-slate-400'} mt-0.5 line-clamp-2">${h.desc}</p>
                                </div>
                            </div>
                        </button>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- 2. ELEGIR MODALIDAD DE DIFICULTAD -->
            <div class="space-y-2" style="animation: fadeIn 0.3s ease-out">
                <div class="flex items-center justify-between ml-1">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2. Nivel de Dificultad</h3>
                    <span class="text-[10px] text-primary font-bold">Exigencia adaptada</span>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <!-- Fácil -->
                    <button onclick="window._quizState.difficulty='facil'; renderAcademia()" 
                        class="p-3 rounded-2xl text-center border transition-all active:scale-95 ${state.difficulty === 'facil' 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10' 
                            : 'glass-card border-white/5 text-slate-400 hover:border-white/20'}">
                        <span class="text-xl block">🟢</span>
                        <span class="text-xs font-black block mt-1">Fácil</span>
                        <span class="text-[9px] text-slate-500 block leading-tight mt-0.5">Repaso inicial</span>
                    </button>
                    <!-- Media -->
                    <button onclick="window._quizState.difficulty='media'; renderAcademia()" 
                        class="p-3 rounded-2xl text-center border transition-all active:scale-95 ${state.difficulty === 'media' 
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10' 
                            : 'glass-card border-white/5 text-slate-400 hover:border-white/20'}">
                        <span class="text-xl block">🟡</span>
                        <span class="text-xs font-black block mt-1">Media</span>
                        <span class="text-[9px] text-slate-500 block leading-tight mt-0.5">Operativo</span>
                    </button>
                    <!-- Difícil -->
                    <button onclick="window._quizState.difficulty='dificil'; renderAcademia()" 
                        class="p-3 rounded-2xl text-center border transition-all active:scale-95 ${state.difficulty === 'dificil' 
                            ? 'bg-red-500/20 border-red-500 text-red-300 shadow-lg shadow-red-500/10' 
                            : 'glass-card border-white/5 text-slate-400 hover:border-white/20'}">
                        <span class="text-xl block">🔴</span>
                        <span class="text-xs font-black block mt-1">Difícil</span>
                        <span class="text-[9px] text-slate-500 block leading-tight mt-0.5">Nivel Concurso</span>
                    </button>
                </div>
                <div class="px-1 text-[10px] text-slate-500">
                    ${state.difficulty === 'facil' 
                        ? '🟢 <strong>Fácil:</strong> Conceptos fundamentales, definiciones y principios rectores del manual.'
                        : state.difficulty === 'media'
                        ? '🟡 <strong>Media:</strong> Actuaciones de calle, guardia, L.C.A.T., menores y narcomenudeo operativo.'
                        : '🔴 <strong>Difícil (Concurso ISEP):</strong> Plazos procesales estrictos, artículos específicos, causales y distractores jurídicos.'}
                </div>
            </div>

            <!-- 3. ELEGIR CANTIDAD -->
            <div class="space-y-2" style="animation: fadeIn 0.3s ease-out">
                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">3. Cantidad de preguntas</h3>
                <div class="flex gap-2">
                    <button onclick="window._quizState.questionCount=25; renderAcademia()" 
                        class="flex-1 py-3.5 rounded-2xl text-center font-bold transition-all active:scale-95 ${state.questionCount === 25 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'glass-card text-slate-400 border border-white/5 hover:border-white/20'}">
                        <span class="text-2xl font-black block">25</span>
                        <span class="text-[10px] uppercase tracking-wider">preguntas (30 min)</span>
                    </button>
                    <button onclick="window._quizState.questionCount=50; renderAcademia()" 
                        class="flex-1 py-3.5 rounded-2xl text-center font-bold transition-all active:scale-95 ${state.questionCount === 50 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'glass-card text-slate-400 border border-white/5 hover:border-white/20'}">
                        <span class="text-2xl font-black block">50</span>
                        <span class="text-[10px] uppercase tracking-wider">preguntas (60 min)</span>
                    </button>
                </div>
            </div>

            <!-- INICIAR EXAMEN -->
            <button id="btn-iniciar-simulacro" onclick="window._startQuiz()" 
                class="w-full py-4 mb-12 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-2 active:scale-95 transition-all hover:shadow-2xl hover:shadow-primary/35">
                <span class="material-symbols-outlined">rocket_launch</span>
                INICIAR SIMULACRO · ${state.difficulty.toUpperCase()}
            </button>
        </div>
    `;

    // Handler para iniciar examen
    window._startQuiz = () => {
        // 1. Verificar límite freemium
        if (!isPro && _getFreeAttemptsUsed() >= ISEP_FREE_LIMIT) {
            window._showIsepProModal();
            return;
        }

        let bank;
        if (state.selectedHierarchy === 'simulacro-integral') {
            bank = Object.values(window.quizBank).flat();
        } else {
            bank = window.quizBank[state.selectedHierarchy] || [];
        }

        if (!bank || bank.length === 0) {
            showToast('No hay preguntas disponibles para esta jerarquía');
            return;
        }

        // 2. Filtrar preguntas priorizando la dificultad seleccionada
        const exactDifficultyQuestions = bank.filter(q => q.difficulty === state.difficulty);
        let questionPool = [...exactDifficultyQuestions];

        // 3. Si faltan preguntas para la jerarquía y dificultad elegidas:
        // a) Complementar con preguntas de la MISMA dificultad de las demás jerarquías
        if (questionPool.length < state.questionCount) {
            const othersSameDiff = Object.entries(window.quizBank)
                .filter(([k]) => k !== state.selectedHierarchy)
                .flatMap(([_, list]) => list)
                .filter(q => q.difficulty === state.difficulty && !questionPool.some(p => p.id === q.id));
            
            const needed = state.questionCount - questionPool.length;
            questionPool = questionPool.concat(_shuffleArray(othersSameDiff).slice(0, needed));
        }

        // b) Si aún faltan preguntas, sumar de la misma jerarquía en otras dificultades
        if (questionPool.length < state.questionCount) {
            const otherDiffSameHier = bank.filter(q => !questionPool.some(p => p.id === q.id));
            const needed = state.questionCount - questionPool.length;
            questionPool = questionPool.concat(_shuffleArray(otherDiffSameHier).slice(0, needed));
        }

        // c) Si aún faltara alguna (para alcanzar 50), complementar con el banco general
        if (questionPool.length < state.questionCount) {
            const allRemaining = Object.values(window.quizBank).flat().filter(q => !questionPool.some(p => p.id === q.id));
            const needed = state.questionCount - questionPool.length;
            questionPool = questionPool.concat(_shuffleArray(allRemaining).slice(0, needed));
        }

        const shuffled = _shuffleArray(questionPool);
        const count = Math.min(state.questionCount, shuffled.length);
        const questions = shuffled.slice(0, count);

        state.currentExam = {
            hierarchy: state.selectedHierarchy,
            difficulty: state.difficulty,
            questions: questions,
            answers: new Array(questions.length).fill(null),
            startTime: Date.now(),
            timeLimit: count === 25 ? 30 * 60 : 60 * 60 // 30min para 25 preguntas, 60min para 50 preguntas
        };
        state.currentIndex = 0;
        state.examFinished = false;
        state.examResults = null;

        renderAcademia();
    };
}

// ══════════════════════════════════════════════════════════════
// MODAL ISEP PRO ($2.000 / mes)
// ══════════════════════════════════════════════════════════════
window._showIsepProModal = function() {
    const existing = document.getElementById('isep-pro-modal');
    if (existing) existing.remove();

    const used = _getFreeAttemptsUsed();
    const modal = document.createElement('div');
    modal.id = 'isep-pro-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';
    
    modal.innerHTML = `
        <div class="glass-card w-full max-w-md p-6 rounded-3xl border border-amber-500/30 bg-background-dark/95 shadow-2xl shadow-amber-500/20 text-center relative overflow-hidden" style="animation: scaleUp 0.3s ease-out">
            <!-- GLOW BACKGROUND -->
            <div class="absolute -top-24 -left-24 size-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -right-24 size-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>

            <button onclick="document.getElementById('isep-pro-modal').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>

            <!-- ICON & HEADER -->
            <div class="inline-flex items-center justify-center size-16 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/30 mb-3">
                <span class="material-symbols-outlined text-3xl">workspace_premium</span>
            </div>
            <h2 class="text-xl font-black text-white">ISEP PRO 2026</h2>
            <p class="text-xs text-amber-300 font-bold uppercase tracking-wider mt-0.5">Suscripción Exclusiva para Ascenso</p>

            ${used >= ISEP_FREE_LIMIT ? `
                <div class="mt-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                    Completaste tus <strong>${ISEP_FREE_LIMIT} simulacros de prueba gratuitos</strong>. Suscribite para continuar practicando sin límites.
                </div>
            ` : `
                <p class="text-xs text-slate-400 mt-2">Acceso completo e ilimitado para preparar tu examen de jerarquía con la máxima exigencia.</p>
            `}

            <!-- PRICE TAG -->
            <div class="my-4 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 border border-amber-500/30">
                <div class="flex items-baseline justify-center gap-1">
                    <span class="text-3xl font-black text-amber-300">${ISEP_PRO_PRICE}</span>
                </div>
                <p class="text-[10px] text-amber-400/80 mt-0.5 uppercase tracking-wider font-semibold">Cancela cuando quieras · Sin permanencia</p>
            </div>

            <!-- BENEFITS LIST -->
            <div class="text-left space-y-2 mb-5 text-xs text-slate-300">
                <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0">check_circle</span>
                    <span>Simulacros <strong>ilimitados</strong> en Fácil, Media y Difícil</span>
                </div>
                <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0">check_circle</span>
                    <span>Preguntas técnicas basadas en los manuales de <strong>cada jerarquía</strong></span>
                </div>
                <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0">check_circle</span>
                    <span>Cita exacta de artículos (CPP Ley 12.734, Narcomenudeo Ley 14.239)</span>
                </div>
                <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0">check_circle</span>
                    <span>Descarga directa de todos los <strong>manuales en PDF</strong></span>
                </div>
                <div class="flex items-center gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0">check_circle</span>
                    <span>Exámenes completos de 25 y 50 preguntas con cronómetro real</span>
                </div>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="space-y-2.5">
                <a href="https://wa.me/${ISEP_WHATSAPP_PHONE}?text=${encodeURIComponent('Hola! Quiero activar mi suscripción a ISEP PRO ($2.000 / mes) para el Simulador de Ascenso en Adicionales Santa Fe. Mi email registrado es: ' + (typeof store !== 'undefined' && store.user ? store.user.email : ''))}" 
                    target="_blank" rel="noopener noreferrer"
                    class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-lg">chat</span>
                    Activar por WhatsApp ($2.000)
                </a>

                <button onclick="window._promptActivationCode()" class="w-full py-3 bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs rounded-2xl transition-all">
                    Tengo un Código de Activación
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

window._promptActivationCode = function() {
    const code = prompt("Ingresá tu código de activación o comprobante ISEP PRO:");
    if (!code) return;
    if (_activateIsepProWithCode(code)) {
        alert("🎉 ¡Suscripción ISEP PRO Activada con éxito! Ya tenés acceso ilimitado a todos los simuladores.");
        const modal = document.getElementById('isep-pro-modal');
        if (modal) modal.remove();
        renderAcademia();
    } else {
        alert("❌ Código inválido. Por favor comunicate por WhatsApp para verificar tu pago.");
    }
};

// ══════════════════════════════════════════════════════════════
// VIEW: EXAMEN EN PROGRESO
// ══════════════════════════════════════════════════════════════
function _renderExamView(container) {
    const state = window._quizState;
    const exam = state.currentExam;
    const q = exam.questions[state.currentIndex];
    const totalQ = exam.questions.length;
    const answered = exam.answers.filter(a => a !== null).length;

    // Timer
    const elapsed = Math.floor((Date.now() - exam.startTime) / 1000);
    const remaining = Math.max(0, exam.timeLimit - elapsed);

    // Auto-finish if time's up
    if (remaining <= 0) {
        window._finishExam();
        return;
    }

    const timerColor = remaining < 120 ? 'text-red-400' : remaining < 300 ? 'text-amber-400' : 'text-emerald-400';
    const diffBadge = q.difficulty === 'facil' 
        ? '<span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase">🟢 Fácil</span>'
        : q.difficulty === 'media'
        ? '<span class="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase">🟡 Media</span>'
        : '<span class="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[9px] font-black uppercase">🔴 Difícil</span>';

    container.innerHTML = `
        <style>
            .quiz-option { transition: all 0.2s ease; }
            .quiz-option:hover { transform: translateX(4px); }
            .quiz-option.selected { background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.15); border-color: rgba(var(--color-primary-rgb, 59, 130, 246), 0.5); }
            .quiz-progress-fill { transition: width 0.3s ease; }
        </style>

        <!-- EXAM HEADER -->
        <header class="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5 px-4 py-3">
            <div class="flex items-center justify-between mb-2">
                <button onclick="window._exitExam()" class="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 text-xs">
                    <span class="material-symbols-outlined text-sm">close</span> Salir
                </button>
                <div class="flex items-center gap-1.5 ${timerColor}">
                    <span class="material-symbols-outlined text-sm">timer</span>
                    <span class="text-sm font-mono font-bold" id="quiz-timer">${_formatTime(remaining)}</span>
                </div>
                <span class="text-xs font-bold text-slate-400">${answered}/${totalQ} respondidas</span>
            </div>
            <!-- Progress bar -->
            <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div class="quiz-progress-fill h-full bg-gradient-to-r from-primary to-blue-500 rounded-full" style="width: ${((state.currentIndex + 1) / totalQ) * 100}%"></div>
            </div>
        </header>

        <main class="p-5 pb-40 max-w-lg mx-auto">
            <!-- QUESTION HEADER -->
            <div class="flex items-center justify-between gap-2 mb-4">
                <span class="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    Pregunta ${state.currentIndex + 1} de ${totalQ}
                </span>
                ${diffBadge}
            </div>

            <!-- QUESTION TEXT -->
            <h2 class="text-base font-bold text-white leading-relaxed mb-5">${q.question}</h2>

            <!-- OPTIONS -->
            <div class="space-y-2.5 mb-6">
                ${q.options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const isSelected = exam.answers[state.currentIndex] === i;
                    return `
                        <button onclick="window._selectAnswer(${i})" 
                            class="quiz-option w-full text-left p-4 rounded-2xl border transition-all active:scale-[0.98] flex items-start gap-3
                            ${isSelected ? 'selected bg-primary/10 border-primary/40' : 'glass-card border-white/5 hover:border-white/20'}">
                            <span class="size-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold mt-0.5
                                ${isSelected ? 'bg-primary text-white' : 'bg-white/10 text-slate-400'}">
                                ${letter}
                            </span>
                            <span class="text-sm ${isSelected ? 'text-white font-semibold' : 'text-slate-300'}">${opt}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        </main>

        <!-- NAVIGATION BAR -->
        <div class="fixed bottom-0 left-0 right-0 z-40 bg-background-dark/95 backdrop-blur-md border-t border-white/5 p-4 safe-bottom">
            <div class="max-w-lg mx-auto flex items-center gap-3">
                <button onclick="window._prevQuestion()" 
                    class="px-5 py-3 rounded-xl text-sm font-bold transition-all active:scale-95
                    ${state.currentIndex > 0 ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-white/5 text-slate-600 cursor-not-allowed'}"
                    ${state.currentIndex === 0 ? 'disabled' : ''}>
                    <span class="material-symbols-outlined text-sm align-middle">chevron_left</span> Anterior
                </button>
                
                <div class="flex-1"></div>

                ${state.currentIndex < totalQ - 1 ? `
                    <button onclick="window._nextQuestion()" 
                        class="px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 hover:shadow-xl">
                        Siguiente <span class="material-symbols-outlined text-sm align-middle">chevron_right</span>
                    </button>
                ` : `
                    <button onclick="window._finishExam()" 
                        class="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 hover:shadow-xl">
                        <span class="material-symbols-outlined text-sm align-middle">done_all</span> Finalizar
                    </button>
                `}
            </div>
        </div>
    `;

    // Timer update
    if (window._quizTimerInterval) clearInterval(window._quizTimerInterval);
    window._quizTimerInterval = setInterval(() => {
        const el = document.getElementById('quiz-timer');
        if (!el) { clearInterval(window._quizTimerInterval); return; }
        const elapsed2 = Math.floor((Date.now() - exam.startTime) / 1000);
        const rem = Math.max(0, exam.timeLimit - elapsed2);
        el.textContent = _formatTime(rem);
        if (rem <= 0) {
            clearInterval(window._quizTimerInterval);
            window._finishExam();
        }
    }, 1000);

    // Handlers
    window._selectAnswer = (index) => {
        exam.answers[state.currentIndex] = index;
        renderAcademia();
    };

    window._prevQuestion = () => {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            renderAcademia();
        }
    };

    window._nextQuestion = () => {
        if (state.currentIndex < totalQ - 1) {
            state.currentIndex++;
            renderAcademia();
        }
    };

    window._exitExam = () => {
        if (confirm('¿Seguro que querés abandonar el simulacro? Se perderá tu progreso.')) {
            if (window._quizTimerInterval) clearInterval(window._quizTimerInterval);
            state.currentExam = null;
            state.examFinished = false;
            state.examResults = null;
            renderAcademia();
        }
    };

    window._finishExam = () => {
        if (window._quizTimerInterval) clearInterval(window._quizTimerInterval);

        const unanswered = exam.answers.filter(a => a === null).length;
        if (unanswered > 0 && !confirm(`Tenés ${unanswered} pregunta(s) sin responder. ¿Finalizar igual?`)) {
            return;
        }

        // Calculate results
        let correct = 0;
        const details = exam.questions.map((q, i) => {
            const userAnswer = exam.answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            if (isCorrect) correct++;
            return {
                question: q.question,
                difficulty: q.difficulty,
                options: q.options,
                userAnswer: userAnswer,
                correctIndex: q.correctIndex,
                isCorrect: isCorrect,
                source: q.source,
                explanation: q.explanation
            };
        });

        const totalTime = Math.floor((Date.now() - exam.startTime) / 1000);
        const percentage = Math.round((correct / exam.questions.length) * 100);

        state.examResults = {
            correct: correct,
            total: exam.questions.length,
            percentage: percentage,
            totalTime: totalTime,
            hierarchy: exam.hierarchy,
            difficulty: exam.difficulty,
            details: details
        };
        state.examFinished = true;

        // Save to history
        const hierMeta = window.quizBankMeta.hierarchies.find(h => h.id === exam.hierarchy);
        _saveQuizResult({
            hierarchy: exam.hierarchy,
            hierarchyTitle: hierMeta?.title || exam.hierarchy,
            difficulty: exam.difficulty,
            correct: correct,
            total: exam.questions.length,
            percentage: percentage,
            totalTime: totalTime,
            date: new Date().toISOString()
        });

        // Contabilizar intento gratuito si no es PRO
        if (!_isIsepPro()) {
            const used = _incrementFreeAttempts();
            const left = Math.max(0, ISEP_FREE_LIMIT - used);
            if (left > 0) {
                showToast(`Simulacro finalizado. Te quedan ${left} intento(s) gratuitos.`);
            } else {
                showToast(`¡Has utilizado tus ${ISEP_FREE_LIMIT} intentos gratuitos! Para continuar suscribite a ISEP PRO.`);
            }
        }

        renderAcademia();
    };
}

// ══════════════════════════════════════════════════════════════
// VIEW: RESULTADOS DEL EXAMEN
// ══════════════════════════════════════════════════════════════
function _renderResultsView(container) {
    const state = window._quizState;
    const results = state.examResults;
    const exam = state.currentExam;
    const isPro = _isIsepPro();
    const used = _getFreeAttemptsUsed();

    const scoreColor = results.percentage >= 80 ? 'text-emerald-400' : results.percentage >= 60 ? 'text-amber-400' : 'text-red-400';
    const scoreBg = results.percentage >= 80 ? 'from-emerald-500/10 to-green-500/10 border-emerald-500/20' : results.percentage >= 60 ? 'from-amber-500/10 to-orange-500/10 border-amber-500/20' : 'from-red-500/10 to-rose-500/10 border-red-500/20';
    const emoji = results.percentage >= 80 ? '🎖️' : results.percentage >= 60 ? '📝' : '📖';
    const message = results.percentage >= 80 ? '¡Excelente! Nivel óptimo para el concurso de ascenso' : results.percentage >= 60 ? 'Buen puntaje, reforzá los temas con errores' : 'Necesitás repasar. Revisá las fuentes y artículos citados abajo';

    const diffBadge = results.difficulty === 'facil' 
        ? '<span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">🟢 Dificultad Fácil</span>'
        : results.difficulty === 'media'
        ? '<span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">🟡 Dificultad Media</span>'
        : '<span class="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">🔴 Nivel Concurso ISEP (Difícil)</span>';

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="window._backToHub()" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Resultados del Examen</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Simulador ISEP 2026</span>
            </div>
        </header>

        <main class="p-5 pb-32 max-w-lg mx-auto space-y-5">
            <!-- SCORE CARD -->
            <div class="text-center py-6 rounded-3xl bg-gradient-to-br ${scoreBg} border" style="animation: fadeIn 0.5s ease-out">
                <div class="text-5xl mb-2">${emoji}</div>
                <div class="text-5xl font-black ${scoreColor}">${results.percentage}%</div>
                <p class="text-sm text-slate-300 mt-1 font-semibold">${results.correct} de ${results.total} correctas</p>
                <div class="mt-2">${diffBadge}</div>
                <p class="text-xs text-slate-400 mt-2">${message}</p>
                <p class="text-[10px] text-slate-500 mt-1">Tiempo empleado: ${_formatTime(results.totalTime)}</p>
            </div>

            <!-- PRO UPSELL NOTICE IF FREE LIMIT REACHED -->
            ${!isPro && used >= ISEP_FREE_LIMIT ? `
                <div class="p-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 border border-amber-500/40 text-center space-y-3">
                    <div class="inline-flex items-center justify-center size-10 rounded-xl bg-amber-500/20 text-amber-300 mx-auto">
                        <span class="material-symbols-outlined text-2xl">workspace_premium</span>
                    </div>
                    <div>
                        <h4 class="text-sm font-black text-white">¡Completaste tus ${ISEP_FREE_LIMIT} simulacros de prueba!</h4>
                        <p class="text-xs text-amber-200/90 mt-1">Para seguir rindiendo en todas las dificultades y jerarquías, activá ISEP PRO.</p>
                    </div>
                    <button onclick="window._showIsepProModal()" class="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/25 active:scale-95 transition-all">
                        Activar ISEP PRO · $2.000 / mes
                    </button>
                </div>
            ` : ''}

            <!-- QUICK STATS -->
            <div class="grid grid-cols-3 gap-2">
                <div class="glass-card p-3 rounded-2xl border border-white/5 text-center">
                    <p class="text-lg font-black text-emerald-400">${results.correct}</p>
                    <p class="text-[9px] text-slate-500 uppercase font-bold">Correctas</p>
                </div>
                <div class="glass-card p-3 rounded-2xl border border-white/5 text-center">
                    <p class="text-lg font-black text-red-400">${results.total - results.correct}</p>
                    <p class="text-[9px] text-slate-500 uppercase font-bold">Incorrectas</p>
                </div>
                <div class="glass-card p-3 rounded-2xl border border-white/5 text-center">
                    <p class="text-lg font-black text-slate-300">${_formatTime(results.totalTime)}</p>
                    <p class="text-[9px] text-slate-500 uppercase font-bold">Tiempo</p>
                </div>
            </div>

            <!-- ACTIONS -->
            <div class="flex gap-2">
                <button onclick="window._retryExam()" class="flex-1 py-3.5 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20">
                    <span class="material-symbols-outlined text-sm">replay</span> Reintentar
                </button>
                <button onclick="window._backToHub()" class="flex-1 py-3.5 bg-white/10 text-white text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 hover:bg-white/15">
                    <span class="material-symbols-outlined text-sm">home</span> Inicio
                </button>
            </div>

            <!-- DETAILED REVIEW -->
            <div class="space-y-2">
                <div class="flex items-center justify-between ml-1">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revisión y Fundamentación</h3>
                    <span class="text-[10px] text-slate-500">${results.details.length} preguntas</span>
                </div>

                ${results.details.map((d, i) => `
                    <div class="glass-card rounded-2xl border ${d.isCorrect ? 'border-emerald-500/20' : 'border-red-500/20'} overflow-hidden"
                        style="animation: fadeIn 0.3s ease-out ${i * 30}ms both">
                        <!-- Question header -->
                        <div class="p-4 flex items-start gap-3">
                            <span class="size-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold mt-0.5
                                ${d.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}">
                                ${d.isCorrect ? '✓' : '✗'}
                            </span>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-semibold text-slate-200 leading-relaxed">${i + 1}. ${d.question}</p>
                            </div>
                        </div>

                        ${!d.isCorrect ? `
                        <!-- Error detail -->
                        <div class="px-4 pb-4 space-y-2">
                            ${d.userAnswer !== null ? `
                            <div class="flex items-start gap-2 p-2.5 rounded-xl bg-red-500/5 border border-red-500/10">
                                <span class="text-red-400 text-[10px] font-bold shrink-0 mt-0.5">TU RESP:</span>
                                <span class="text-xs text-red-300">${d.options[d.userAnswer]}</span>
                            </div>
                            ` : `
                            <div class="flex items-start gap-2 p-2.5 rounded-xl bg-slate-500/5 border border-slate-500/10">
                                <span class="text-slate-400 text-[10px] font-bold shrink-0">SIN RESPUESTA</span>
                            </div>
                            `}
                            <div class="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                <span class="text-emerald-400 text-[10px] font-bold shrink-0 mt-0.5">CORRECTA:</span>
                                <span class="text-xs text-emerald-300 font-medium">${d.options[d.correctIndex]}</span>
                            </div>
                            <div class="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                <p class="text-[10px] text-blue-300 leading-relaxed">${d.explanation}</p>
                            </div>
                            <div class="flex items-center gap-1.5 p-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
                                <span class="material-symbols-outlined text-xs text-amber-400">menu_book</span>
                                <span class="text-[10px] text-amber-300 font-medium">${d.source}</span>
                            </div>
                        </div>
                        ` : `
                        <!-- Correct - show source -->
                        <div class="px-4 pb-3 space-y-1.5">
                            <div class="p-2 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                <p class="text-[10px] text-blue-300 leading-relaxed">${d.explanation}</p>
                            </div>
                            <div class="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                <span class="material-symbols-outlined text-xs text-emerald-400">menu_book</span>
                                <span class="text-[10px] text-emerald-300 font-medium">${d.source}</span>
                            </div>
                        </div>
                        `}
                    </div>
                `).join('')}
            </div>
        </main>

        ${typeof renderBottomNav === 'function' ? renderBottomNav('academia') : ''}
    `;

    // Handlers
    window._backToHub = () => {
        if (window._quizTimerInterval) clearInterval(window._quizTimerInterval);
        state.currentExam = null;
        state.examFinished = false;
        state.examResults = null;
        renderAcademia();
    };

    window._retryExam = () => {
        const hierarchy = results.hierarchy;
        const count = results.total;
        const diff = results.difficulty;
        state.currentExam = null;
        state.examFinished = false;
        state.examResults = null;
        state.selectedHierarchy = hierarchy;
        state.questionCount = count;
        state.difficulty = diff;
        
        renderAcademia();
        setTimeout(() => {
            if (window._startQuiz) window._startQuiz();
        }, 100);
    };
}

// ══════════════════════════════════════════════════════════════
// TAB: BIBLIOTECA (Descarga directa de PDFs)
// ══════════════════════════════════════════════════════════════
function _renderBibliotecaTab(container) {
    const libraryItems = window.academyLibraryItems || [];
    
    // Group by category
    const categories = {
        'manuales-2026': { title: '📚 Manuales de Ascenso ISEP 2026', items: [] },
        'leyes': { title: '⚖️ Leyes y Decretos Santafesinos', items: [] },
        'proyectos': { title: '📋 Guías de Proyectos Institucionales', items: [] },
        'manuales': { title: '📖 Armamento y Material Complementario', items: [] }
    };

    libraryItems.forEach(item => {
        const cat = categories[item.category] || categories['manuales'];
        cat.items.push(item);
    });

    container.innerHTML = `
        <div class="p-5 space-y-5 max-w-lg mx-auto">
            <div class="text-center py-3">
                <h2 class="text-lg font-black text-white">Biblioteca ISEP 2026</h2>
                <p class="text-xs text-slate-400 mt-1">Descargá los manuales oficiales de cada jerarquía directamente a tu celular</p>
            </div>

            ${Object.values(categories).map(cat => cat.items.length > 0 ? `
                <div class="space-y-2">
                    <h3 class="text-xs font-bold text-slate-400 px-1">${cat.title}</h3>
                    <div class="grid gap-2">
                        ${cat.items.map((item, i) => `
                            <a href="${item.file}" target="_blank" download
                                class="group glass-card p-3.5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all flex items-center gap-3 active:scale-[0.98]"
                                style="animation: fadeIn 0.3s ease-out ${i * 40}ms both">
                                <div class="size-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined text-lg">${item.icon}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs font-bold text-slate-200 line-clamp-2">${item.title}</p>
                                    <p class="text-[10px] text-slate-500 mt-0.5 line-clamp-1">${item.desc}</p>
                                </div>
                                <span class="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors shrink-0">download</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            ` : '').join('')}
        </div>
    `;
}

// ══════════════════════════════════════════════════════════════
// TAB: HISTORIAL
// ══════════════════════════════════════════════════════════════
function _renderHistorialTab(container) {
    const history = _getQuizHistory();
    const meta = window.quizBankMeta;

    if (history.length === 0) {
        container.innerHTML = `
            <div class="p-8 text-center">
                <span class="material-symbols-outlined text-5xl text-slate-600 mb-3 block">history_edu</span>
                <h3 class="text-sm font-bold text-slate-400">Sin historial</h3>
                <p class="text-xs text-slate-500 mt-1">Completá tu primer simulacro y aparecerá aquí.</p>
            </div>
        `;
        return;
    }

    // Stats
    const totalExams = history.length;
    const avgScore = Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / totalExams);
    const bestScore = Math.max(...history.map(h => h.percentage));

    container.innerHTML = `
        <div class="p-5 space-y-5 max-w-lg mx-auto">
            <!-- STATS CARDS -->
            <div class="grid grid-cols-3 gap-2">
                <div class="glass-card p-3 rounded-2xl border border-white/5 text-center">
                    <p class="text-xl font-black text-primary">${totalExams}</p>
                    <p class="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Exámenes</p>
                </div>
                <div class="glass-card p-3 rounded-2xl border border-white/5 text-center">
                    <p class="text-xl font-black text-emerald-400">${avgScore}%</p>
                    <p class="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Promedio</p>
                </div>
                <div class="glass-card p-3 rounded-2xl border border-white/5 text-center">
                    <p class="text-xl font-black text-amber-400">${bestScore}%</p>
                    <p class="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Mejor</p>
                </div>
            </div>

            <!-- HISTORY LIST -->
            <div class="space-y-2">
                <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Últimos simulacros</h3>
                ${history.map((h, i) => {
                    const hierMeta = meta.hierarchies.find(m => m.id === h.hierarchy);
                    const scoreColor = h.percentage >= 80 ? 'text-emerald-400' : h.percentage >= 60 ? 'text-amber-400' : 'text-red-400';
                    const diffText = h.difficulty ? h.difficulty.toUpperCase() : 'ESTÁNDAR';
                    const date = new Date(h.date);
                    return `
                        <div class="glass-card p-3.5 rounded-2xl border border-white/5 flex items-center gap-3"
                            style="animation: fadeIn 0.3s ease-out ${i * 50}ms both">
                            <div class="size-10 rounded-xl bg-gradient-to-br ${hierMeta?.color || 'from-slate-600 to-slate-700'} flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-white text-lg">${hierMeta?.icon || 'quiz'}</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-bold text-slate-200 truncate">${hierMeta?.title || h.hierarchyTitle || h.hierarchy}</p>
                                <p class="text-[10px] text-slate-500">${date.toLocaleDateString('es-AR')} · ${h.correct}/${h.total} correctas · <span class="text-primary font-semibold">${diffText}</span></p>
                            </div>
                            <div class="text-right">
                                <p class="text-lg font-black ${scoreColor}">${h.percentage}%</p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- CLEAR HISTORY -->
            <button onclick="if(confirm('¿Borrar todo el historial?')){localStorage.removeItem('quiz_history');renderAcademia();}" 
                class="w-full py-3 text-xs text-slate-500 hover:text-red-400 transition-colors underline">
                Borrar historial
            </button>
        </div>
    `;
}
