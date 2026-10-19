/**
 * Adicionales Santa Fe - Simulador de Examen ISEP 2026
 * Reemplazo total del Aula Virtual / NotebookLM Studio PRO
 * 
 * Módulos:
 * 1. Pantalla de inicio: Elegir jerarquía + cantidad de preguntas
 * 2. Pantalla de examen: Timer, preguntas, navegación
 * 3. Pantalla de resultados: Puntaje, corrección, fuentes
 * 4. Biblioteca de PDFs: Descarga directa de manuales ISEP
 * 5. Historial de intentos
 */

// ══════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════
window._quizState = window._quizState || {
    activeTab: 'simulador',  // 'simulador' | 'biblioteca' | 'historial'
    selectedHierarchy: null,
    questionCount: 25,
    currentExam: null,       // { questions, answers, startTime, timeLimit }
    currentIndex: 0,
    examFinished: false,
    examResults: null
};

// ══════════════════════════════════════════════════════════════
// HELPERS
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
    if (history.length > 50) history.length = 50; // Keep last 50
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
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#agenda')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Simulador ISEP 2026</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Examen de Ascenso Policial</span>
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
// TAB: SIMULADOR (Elegir jerarquía y cantidad)
// ══════════════════════════════════════════════════════════════
function _renderSimuladorTab(container) {
    const meta = window.quizBankMeta;
    const state = window._quizState;

    container.innerHTML = `
        <div class="p-5 space-y-5 max-w-lg mx-auto">
            <!-- HERO -->
            <div class="text-center py-4">
                <div class="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/20 border border-primary/30 mb-3">
                    <span class="material-symbols-outlined text-3xl text-primary">school</span>
                </div>
                <h2 class="text-xl font-black text-white">Simulador de Examen</h2>
                <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Practicá con preguntas reales basadas en los manuales ISEP 2026. Cada respuesta cita la fuente exacta para que vayas al manual.</p>
                <div class="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <span class="material-symbols-outlined text-sm text-primary">database</span>
                    <span class="text-[10px] font-bold text-primary">${meta.totalQuestions} PREGUNTAS DISPONIBLES</span>
                </div>
            </div>

            <!-- ELEGIR JERARQUÍA -->
            <div class="space-y-2">
                <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">1. Elegí tu jerarquía de concurso</h3>
                <div class="grid gap-2">
                    ${meta.hierarchies.map(h => `
                        <button onclick="window._quizState.selectedHierarchy='${h.id}'; renderAcademia()" 
                            class="group w-full text-left p-3.5 rounded-2xl border transition-all active:scale-[0.98] ${state.selectedHierarchy === h.id 
                                ? 'bg-gradient-to-r ' + h.color + ' border-primary/50 shadow-lg shadow-primary/10' 
                                : 'glass-card border-white/5 hover:border-white/20'}">
                            <div class="flex items-center gap-3">
                                <div class="size-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined text-lg ${state.selectedHierarchy === h.id ? 'text-white' : 'text-slate-400'}">${h.icon}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-bold ${state.selectedHierarchy === h.id ? 'text-white' : 'text-slate-200'} truncate">${h.title}</p>
                                    <p class="text-[10px] ${state.selectedHierarchy === h.id ? 'text-white/70' : 'text-slate-500'}">${h.questionCount} preguntas disponibles</p>
                                </div>
                                ${state.selectedHierarchy === h.id ? '<span class="material-symbols-outlined text-white text-lg">check_circle</span>' : ''}
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- ELEGIR CANTIDAD -->
            ${state.selectedHierarchy ? `
            <div class="space-y-2" style="animation: fadeIn 0.3s ease-out">
                <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">2. Cantidad de preguntas</h3>
                <div class="flex gap-2">
                    <button onclick="window._quizState.questionCount=25; renderAcademia()" 
                        class="flex-1 py-4 rounded-2xl text-center font-bold transition-all active:scale-95 ${state.questionCount === 25 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'glass-card text-slate-400 border border-white/5 hover:border-white/20'}">
                        <span class="text-2xl block">25</span>
                        <span class="text-[10px] uppercase tracking-wider">preguntas</span>
                    </button>
                    <button onclick="window._quizState.questionCount=50; renderAcademia()" 
                        class="flex-1 py-4 rounded-2xl text-center font-bold transition-all active:scale-95 ${state.questionCount === 50 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'glass-card text-slate-400 border border-white/5 hover:border-white/20'}">
                        <span class="text-2xl block">50</span>
                        <span class="text-[10px] uppercase tracking-wider">preguntas</span>
                    </button>
                </div>
            </div>

            <!-- INICIAR EXAMEN -->
            <button id="btn-iniciar-simulacro" onclick="window._startQuiz()" 
                class="w-full py-4 mb-12 bg-gradient-to-r from-primary to-blue-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all hover:shadow-2xl hover:shadow-primary/30"
                style="animation: fadeIn 0.3s ease-out 0.1s both">
                <span class="material-symbols-outlined">rocket_launch</span>
                INICIAR SIMULACRO
            </button>
            ` : ''}
        </div>
    `;

    // Start Quiz handler
    window._startQuiz = () => {
        let bank;
        if (state.selectedHierarchy === 'simulacro-integral') {
            bank = Object.values(window.quizBank).flat();
        } else {
            bank = window.quizBank[state.selectedHierarchy];
        }

        if (!bank || bank.length === 0) {
            showToast('No hay preguntas disponibles para esta jerarquía');
            return;
        }

        let questionPool = [...bank];
        // Si el banco específico tiene menos preguntas que las solicitadas (ej. pide 50 y hay 15 o 35),
        // complementar con preguntas de los demás módulos para garantizar las 25 o 50 preguntas completas
        if (questionPool.length < state.questionCount) {
            const others = Object.entries(window.quizBank)
                .filter(([k]) => k !== state.selectedHierarchy)
                .flatMap(([_, list]) => list);
            const needed = state.questionCount - questionPool.length;
            const extra = _shuffleArray(others).slice(0, needed);
            questionPool = questionPool.concat(extra);
        }

        const shuffled = _shuffleArray(questionPool);
        const count = Math.min(state.questionCount, shuffled.length);
        const questions = shuffled.slice(0, count);

        state.currentExam = {
            hierarchy: state.selectedHierarchy,
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
// TAB: BIBLIOTECA (Descarga directa de PDFs)
// ══════════════════════════════════════════════════════════════
function _renderBibliotecaTab(container) {
    const libraryItems = window.academyLibraryItems || [];
    
    // Group by category
    const categories = {
        'manuales-2026': { title: '📚 Manuales de Ascenso ISEP 2026', items: [] },
        'leyes': { title: '⚖️ Leyes y Decretos', items: [] },
        'proyectos': { title: '📋 Guías de Proyectos', items: [] },
        'manuales': { title: '📖 Material Complementario', items: [] }
    };

    libraryItems.forEach(item => {
        const cat = categories[item.category] || categories['manuales'];
        cat.items.push(item);
    });

    container.innerHTML = `
        <div class="p-5 space-y-5 max-w-lg mx-auto">
            <div class="text-center py-3">
                <h2 class="text-lg font-black text-white">Biblioteca ISEP 2026</h2>
                <p class="text-xs text-slate-400 mt-1">Descargá los manuales oficiales directamente a tu celular</p>
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
                    const date = new Date(h.date);
                    return `
                        <div class="glass-card p-3.5 rounded-2xl border border-white/5 flex items-center gap-3"
                            style="animation: fadeIn 0.3s ease-out ${i * 50}ms both">
                            <div class="size-10 rounded-xl bg-gradient-to-br ${hierMeta?.color || 'from-slate-600 to-slate-700'} flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-white text-lg">${hierMeta?.icon || 'quiz'}</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-xs font-bold text-slate-200">${hierMeta?.title || h.hierarchy}</p>
                                <p class="text-[10px] text-slate-500">${date.toLocaleDateString('es-AR')} · ${h.correct}/${h.total} correctas</p>
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
            <!-- QUESTION NUMBER -->
            <div class="flex items-center gap-2 mb-4">
                <span class="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    Pregunta ${state.currentIndex + 1} de ${totalQ}
                </span>
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
            details: details
        };
        state.examFinished = true;

        // Save to history
        const hierMeta = window.quizBankMeta.hierarchies.find(h => h.id === exam.hierarchy);
        _saveQuizResult({
            hierarchy: exam.hierarchy,
            hierarchyTitle: hierMeta?.title || exam.hierarchy,
            correct: correct,
            total: exam.questions.length,
            percentage: percentage,
            totalTime: totalTime,
            date: new Date().toISOString()
        });

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
    
    const scoreColor = results.percentage >= 80 ? 'text-emerald-400' : results.percentage >= 60 ? 'text-amber-400' : 'text-red-400';
    const scoreBg = results.percentage >= 80 ? 'from-emerald-500/10 to-green-500/10 border-emerald-500/20' : results.percentage >= 60 ? 'from-amber-500/10 to-orange-500/10 border-amber-500/20' : 'from-red-500/10 to-rose-500/10 border-red-500/20';
    const emoji = results.percentage >= 80 ? '🎖️' : results.percentage >= 60 ? '📝' : '📖';
    const message = results.percentage >= 80 ? '¡Excelente! Estás listo para el concurso' : results.percentage >= 60 ? 'Buen resultado, seguí practicando' : 'Necesitás repasar. Revisá las fuentes de cada error';

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="window._backToHub()" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Resultados</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Simulador ISEP 2026</span>
            </div>
        </header>

        <main class="p-5 pb-32 max-w-lg mx-auto space-y-5">
            <!-- SCORE CARD -->
            <div class="text-center py-6 rounded-3xl bg-gradient-to-br ${scoreBg} border" style="animation: fadeIn 0.5s ease-out">
                <div class="text-5xl mb-2">${emoji}</div>
                <div class="text-5xl font-black ${scoreColor}">${results.percentage}%</div>
                <p class="text-sm text-slate-300 mt-1 font-semibold">${results.correct} de ${results.total} correctas</p>
                <p class="text-xs text-slate-400 mt-2">${message}</p>
                <p class="text-[10px] text-slate-500 mt-1">Tiempo: ${_formatTime(results.totalTime)}</p>
            </div>

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
                <button onclick="window._retryExam()" class="flex-1 py-3.5 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5">
                    <span class="material-symbols-outlined text-sm">replay</span> Reintentar
                </button>
                <button onclick="window._backToHub()" class="flex-1 py-3.5 bg-white/10 text-white text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5">
                    <span class="material-symbols-outlined text-sm">home</span> Inicio
                </button>
            </div>

            <!-- DETAILED REVIEW -->
            <div class="space-y-2">
                <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Revisión detallada</h3>

                ${results.details.map((d, i) => `
                    <div class="glass-card rounded-2xl border ${d.isCorrect ? 'border-emerald-500/20' : 'border-red-500/20'} overflow-hidden"
                        style="animation: fadeIn 0.3s ease-out ${i * 40}ms both">
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
                                <span class="text-xs text-emerald-300">${d.options[d.correctIndex]}</span>
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
                        <div class="px-4 pb-3">
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
        const hierarchy = exam.hierarchy;
        const count = exam.questions.length;
        state.currentExam = null;
        state.examFinished = false;
        state.examResults = null;
        state.selectedHierarchy = hierarchy;
        state.questionCount = count;
        // Trigger new quiz
        window._startQuiz = window._startQuiz || (() => {});
        renderAcademia();
        // Wait for render then start
        setTimeout(() => {
            if (window._startQuiz) window._startQuiz();
        }, 100);
    };
}
