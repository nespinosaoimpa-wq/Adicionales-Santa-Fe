/**

 * Adicionales Santa Fe - Simulador de Examen ISEP 2026

 * Reemplazo total del Aula Virtual / NotebookLM Studio PRO

 * 

 * Módulos:

 * 1. Pantalla de inicio: Elegir jerarquía + Dificultad (Fácil, Media, Difícil) + Cantidad (25 o 50)

 * 2. Control de monetización: 3 intentos de examen gratuitos, luego suscripción única ISEP PRO ($5.000)

 * 3. Pantalla de examen: Timer, preguntas, dificultad visible, navegación

 * 4. Pantalla de resultados: Puntaje, corrección, citas exactas de manuales y leyes

 * 5. Biblioteca de PDFs: Descarga directa de manuales ISEP 2026

 * 6. Historial de intentos y estadísticas

 */



// ══════════════════════════════════════════════════════════════

// STATE

// ══════════════════════════════════════════════════════════════

const SAVED_HIERARCHY_KEY = 'isep_selected_hierarchy_v1';
const SAVED_DIFFICULTY_KEY = 'isep_difficulty_v1';
const SAVED_COUNT_KEY = 'isep_question_count_v1';

const _savedHier = (() => {
    try {
        const s = localStorage.getItem(SAVED_HIERARCHY_KEY);
        if (s) return s;
    } catch(e){}
    return 'suboficial-oficial';
})();

const _savedDiff = (() => {
    try {
        const d = localStorage.getItem(SAVED_DIFFICULTY_KEY);
        if (['facil', 'media', 'dificil'].includes(d)) return d;
    } catch(e){}
    return 'media';
})();

const _savedCount = (() => {
    try {
        const c = parseInt(localStorage.getItem(SAVED_COUNT_KEY), 10);
        if ([10, 25, 50].includes(c)) return c;
    } catch(e){}
    return 25;
})();

window._quizState = window._quizState || {
    activeTab: 'simulador',       // 'simulador' | 'novedades' | 'biblioteca' | 'historial'
    selectedHierarchy: _savedHier,
    difficulty: _savedDiff,       // 'facil' | 'media' | 'dificil'
    questionCount: _savedCount,   // 10 | 25 | 50
    currentExam: null,           // { hierarchy, difficulty, questions, answers, startTime, timeLimit }
    currentIndex: 0,
    examFinished: false,
    examResults: null
};



// ══════════════════════════════════════════════════════════════

// MONETIZATION & FREE TRIAL HELPERS (2 gratis → desde el 3° pago ISEP PRO $5.000 suscripción única)

// ══════════════════════════════════════════════════════════════

const ISEP_FREE_LIMIT = 2;

const ISEP_PRO_REGULAR_PRICE = "$10.000";
const ISEP_PRO_PRICE = "$5.000";
const ISEP_PRO_DISCOUNT = "50% OFF";

const ISEP_WHATSAPP_PHONE = "5493425162372";



// ══════════════════════════════════════════════════════════════

// ANTI-REPETITION ROTATION RING BUFFER (Deduplicación de Exámenes)

// ══════════════════════════════════════════════════════════════

const SEEN_QUESTIONS_KEY = 'asf_quiz_seen_history_v1';

function _getSeenQuestionIds() {

    try { return JSON.parse(localStorage.getItem(SEEN_QUESTIONS_KEY) || '[]'); } catch { return []; }

}

function _markQuestionsAsSeen(ids) {

    if (!ids || !ids.length) return;

    try {

        let seen = _getSeenQuestionIds();

        seen = [...ids, ...seen.filter(x => !ids.includes(x))].slice(0, 500);

        localStorage.setItem(SEEN_QUESTIONS_KEY, JSON.stringify(seen));

    } catch {}

}



// ══════════════════════════════════════════════════════════════

// SMART FAILED QUESTIONS (CUADERNO DE ERRORES) & SOURCE CLASSIFIER

// ══════════════════════════════════════════════════════════════

const FAILED_QUESTIONS_KEY = 'isep_failed_questions_v1';



function _isManualSource(source) {

    if (!source) return false;

    const s = source.toLowerCase();

    return s.includes('manual') || s.includes('isep') || s.includes('miraf') || s.includes('protocolo') || s.includes('guía') || s.includes('guia') || s.includes('reglamento');

}



function _getFailedQuestions() {

    try {

        return JSON.parse(localStorage.getItem(FAILED_QUESTIONS_KEY) || '[]');

    } catch {

        return [];

    }

}



function _recordFailedQuestion(q) {

    if (!q || !q.id) return;

    try {

        let list = _getFailedQuestions();

        const existingIdx = list.findIndex(item => item.id === q.id);

        if (existingIdx >= 0) {

            list[existingIdx].failCount = (list[existingIdx].failCount || 1) + 1;

            list[existingIdx].lastFailedAt = Date.now();

            if (q.source) list[existingIdx].source = q.source;

            if (q.explanation) list[existingIdx].explanation = q.explanation;

        } else {

            list.unshift({

                id: q.id,

                question: q.question,

                difficulty: q.difficulty || 'media',

                options: q.options,

                correctIndex: q.correctIndex,

                source: q.source || 'Manual ISEP 2026',

                explanation: q.explanation || '',

                failCount: 1,

                lastFailedAt: Date.now()

            });

        }

        localStorage.setItem(FAILED_QUESTIONS_KEY, JSON.stringify(list.slice(0, 150)));

    } catch (e) {

        console.error('Error recording failed question', e);

    }

}



function _removeFailedQuestion(id) {

    if (!id) return;

    try {

        let list = _getFailedQuestions().filter(item => item.id !== id);

        localStorage.setItem(FAILED_QUESTIONS_KEY, JSON.stringify(list));

    } catch (e) {}

}



window._startFailedQuestionsQuiz = function() {

    const failedList = _getFailedQuestions();

    if (!failedList || failedList.length === 0) {

        if (typeof showToast === 'function') showToast('¡No tenés preguntas falladas pendientes de repaso!');

        return;

    }



    const count = Math.min(failedList.length, 25);

    const picked = _shuffleArray([...failedList]).slice(0, count);



    // Mezclar opciones internamente para no memorizar la letra

    const questions = picked.map(q => {

        const indexMap = q.options.map((_, i) => i);

        for (let i = indexMap.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [indexMap[i], indexMap[j]] = [indexMap[j], indexMap[i]];

        }

        return {

            ...q,

            options: indexMap.map(i => q.options[i]),

            correctIndex: indexMap.indexOf(q.correctIndex)

        };

    });



    const state = window._quizState;

    state.currentExam = {

        hierarchy: 'cuaderno-falladas',

        difficulty: 'media',

        questions: questions,

        answers: new Array(questions.length).fill(null),

        startTime: Date.now(),

        timeLimit: count <= 10 ? 10 * 60 : 25 * 60,

        isFailedReview: true,

        adaptiveNotice: {

            count: count,

            topics: ['Cuaderno Inteligente: Repaso de Errores']

        }

    };

    state.currentIndex = 0;

    state.examFinished = false;

    state.examResults = null;



    renderAcademia();

};





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
    // 1. Super Administrador exclusivo siempre tiene acceso
    if (typeof store !== 'undefined' && store.isAdmin && store.isAdmin()) return true;

    // 2. Suscripción verificada en base de datos (Firestore / Supabase)
    if (typeof store !== 'undefined' && store.user) {
        if (store.user.pro_member === true) return true;
        if (store.user.isep_pro === true) return true;
        if (store.user.is_pro === true) return true;
        if (store.user.plan === 'pro') return true;
    }

    // 3. Código oficial de activación validado en este dispositivo
    if (localStorage.getItem('isep_pro_code_active') === 'true') return true;

    return false;
}

function _activateIsepProWithCode(code) {
    const clean = (code || '').trim().toUpperCase();
    const validCodes = ['ISEP2026', 'ASCENSO2026', 'PRO5000', 'PRO2000', 'SANTAFE2026', 'ADMINISEP'];
    if (validCodes.includes(clean)) {
        localStorage.setItem('isep_pro_code_active', 'true');
        if (typeof store !== 'undefined' && store.user && store.user.email) {
            store.user.pro_member = true;
            store.user.isep_pro = true;
            store.user.pro_status = 'approved';
            if (typeof DB !== 'undefined' && DB.saveUser) {
                DB.saveUser(store.user).catch(() => {});
            }
        }
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

// FEEDBACK AGENT - RETROALIMENTACIÓN INTELIGENTE

// Recopila estadísticas de cada examen para mejorar la experiencia:

// - Temas débiles/fuertes del usuario

// - Curva de aprendizaje temporal

// - Dificultad sugerida adaptativa

// ══════════════════════════════════════════════════════════════

function _getFeedbackData() {

    try { return JSON.parse(localStorage.getItem('isep_feedback_data') || '{}'); } catch { return {}; }

}

function _saveFeedbackData(d) {

    try { localStorage.setItem('isep_feedback_data', JSON.stringify(d)); } catch {}

}

function _extractTopic(src) {

    if (!src) return 'General';

    const c = src.lastIndexOf(':');

    if (c > -1) { const a = src.substring(c + 1).trim(); if (a.length > 3) return a; }

    const d = src.indexOf(' - ');

    if (d > -1) return src.substring(0, d).trim();

    return src.substring(0, 40).trim();

}

function _updateFeedbackAgent(res) {

    const fb = _getFeedbackData();

    if (!fb.topicStats) fb.topicStats = {};

    if (!fb.scoreHistory) fb.scoreHistory = [];

    if (!fb.examCount) fb.examCount = 0;

    fb.examCount++;

    fb.scoreHistory.push({ date: new Date().toISOString(), score: res.percentage, difficulty: res.difficulty });

    if (fb.scoreHistory.length > 30) fb.scoreHistory = fb.scoreHistory.slice(-30);

    res.details.forEach(d => {

        const t = _extractTopic(d.source);

        if (!fb.topicStats[t]) fb.topicStats[t] = { correct: 0, total: 0, label: t };

        fb.topicStats[t].total++;

        if (d.isCorrect) fb.topicStats[t].correct++;

    });

    _saveFeedbackData(fb);

}

function _getWeakTopics() {

    const fb = _getFeedbackData();

    if (!fb.topicStats) return [];

    return Object.values(fb.topicStats).filter(t => t.total >= 2)

        .map(t => ({ ...t, rate: Math.round((t.correct / t.total) * 100) }))

        .sort((a, b) => a.rate - b.rate).slice(0, 5);

}

function _getStrongTopics() {

    const fb = _getFeedbackData();

    if (!fb.topicStats) return [];

    return Object.values(fb.topicStats).filter(t => t.total >= 2)

        .map(t => ({ ...t, rate: Math.round((t.correct / t.total) * 100) }))

        .sort((a, b) => b.rate - a.rate).slice(0, 3);

}

function _getSuggestedDifficulty() {

    const fb = _getFeedbackData();

    if (!fb.scoreHistory || fb.scoreHistory.length < 2) return null;

    const last = fb.scoreHistory.slice(-3);

    const avg = Math.round(last.reduce((s, e) => s + e.score, 0) / last.length);

    if (avg >= 85) return { suggestion: 'dificil', reason: 'Tu promedio reciente es excelente (≥85%). Estás listo para el nivel Concurso ISEP.' };

    if (avg >= 65) return { suggestion: 'media', reason: 'Tu rendimiento es sólido. El nivel Media te ayuda a consolidar antes de subir.' };

    return { suggestion: 'facil', reason: 'Recomendamos reforzar los conceptos fundamentales antes de subir de nivel.' };

}

function _getLearningCurve() {

    const fb = _getFeedbackData();

    if (!fb.scoreHistory || fb.scoreHistory.length < 2) return null;

    const sc = fb.scoreHistory.map(s => s.score);

    const h = Math.ceil(sc.length / 2);

    const a1 = Math.round(sc.slice(0, h).reduce((s, v) => s + v, 0) / h);

    const a2 = Math.round(sc.slice(h).reduce((s, v) => s + v, 0) / (sc.length - h));

    return { avgFirst: a1, avgSecond: a2, trend: a2 - a1, total: sc.length };

}

function _getTopicAnalysisFromDetails(details) {

    const topics = {};

    details.forEach(d => {

        const t = _extractTopic(d.source);

        if (!topics[t]) topics[t] = { label: t, correct: 0, total: 0 };

        topics[t].total++;

        if (d.isCorrect) topics[t].correct++;

    });

    return Object.values(topics).map(t => ({ ...t, rate: Math.round((t.correct / t.total) * 100) })).sort((a, b) => a.rate - b.rate);

}



// ══════════════════════════════════════════════════════════════

// MAIN RENDER

// ══════════════════════════════════════════════════════════════

function renderAcademia(container) {

    if (!container) container = document.getElementById('app');
    try { localStorage.removeItem('isep_pro_subscriber'); } catch(e){}

    // Proactive sync: verify with database in background if user was approved
    if (!_isIsepPro() && typeof store !== 'undefined' && store.user && store.user.email && typeof DB !== 'undefined' && DB.getUser) {
        DB.getUser(store.user.email).then(freshUser => {
            if (freshUser && (freshUser.pro_member === true || freshUser.isep_pro === true || freshUser.plan === 'pro')) {
                store.user = { ...store.user, ...freshUser };
                if (typeof showToast === 'function' && !window._proWelcomeToastShown) {
                    window._proWelcomeToastShown = true;
                    showToast("🎉 ¡Tu suscripción ISEP PRO está aprobada! Acceso ilimitado.");
                }
                const existingModal = document.getElementById('isep-pro-modal');
                if (existingModal) existingModal.remove();
                renderAcademia(container);
            }
        }).catch(() => {});
    }

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

                        <span class="material-symbols-outlined text-xs">workspace_premium</span> PRO 50% OFF ($5.000)

                    </button>

                `}

            </div>

        </header>



                <!-- TABS (Simulador | Novedades ISEP | Biblioteca | Historial) -->

        <div class="flex border-b border-white/5 bg-background-dark/50 overflow-x-auto no-scrollbar">

            <button onclick="window._quizState.activeTab='simulador'; renderAcademia()"

                class="flex-1 min-w-[75px] py-3 text-xs font-bold uppercase tracking-wider text-center transition-all ${state.activeTab === 'simulador' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}">

                <span class="material-symbols-outlined text-base align-middle mr-1">quiz</span>Simulador

            </button>

            <button onclick="window._quizState.activeTab='novedades'; renderAcademia()"

                class="flex-1 min-w-[95px] py-3 text-xs font-bold uppercase tracking-wider text-center transition-all relative ${state.activeTab === 'novedades' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}">

                <span class="material-symbols-outlined text-base align-middle mr-1 text-red-400">campaign</span>Novedades

                <span class="inline-block px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[8px] font-black leading-tight animate-pulse ml-0.5">2026</span>

            </button>

            <button onclick="window._quizState.activeTab='biblioteca'; renderAcademia()"

                class="flex-1 min-w-[75px] py-3 text-xs font-bold uppercase tracking-wider text-center transition-all ${state.activeTab === 'biblioteca' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}">

                <span class="material-symbols-outlined text-base align-middle mr-1">library_books</span>Biblioteca

            </button>

            <button onclick="window._quizState.activeTab='historial'; renderAcademia()"

                class="flex-1 min-w-[75px] py-3 text-xs font-bold uppercase tracking-wider text-center transition-all ${state.activeTab === 'historial' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}">

                <span class="material-symbols-outlined text-base align-middle mr-1">history</span>Historial

            </button>

        </div>



        <main id="quiz-tab-content" class="pb-56">

        </main>



        ${typeof renderBottomNav === 'function' ? renderBottomNav('academia') : ''}

    `;



    const tabContent = document.getElementById('quiz-tab-content');

    if (state.activeTab === 'simulador') _renderSimuladorTab(tabContent);

    else if (state.activeTab === 'novedades') _renderNovedadesTab(tabContent);

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

    const failedQuestions = _getFailedQuestions();

    const failedCount = failedQuestions.length;



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



                        <!-- EJE CENTRAL: MANUAL DE POLICÍA ISEP -->

            <div class="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-primary/10 border border-blue-500/30 flex items-start gap-3 shadow-lg shadow-blue-500/5">

                <div class="size-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">

                    <span class="material-symbols-outlined text-lg">verified</span>

                </div>

                <div>

                    <div class="flex items-center gap-2">

                        <h4 class="text-xs font-black text-blue-200">Eje de Examen: Manual de Policía ISEP</h4>

                        <span class="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-black uppercase">Prioridad 80%+</span>

                    </div>

                    <p class="text-[11px] text-slate-300 mt-1 leading-relaxed">

                        En los concursos del ISEP, el examen en PC evalúa con máxima exigencia los <strong>Manuales Oficiales por Jerarquía</strong>. El Código Procesal y leyes son <em>material complementario</em> de consulta.

                    </p>

                </div>

            </div>



            <!-- CUADERNO INTELIGENTE DE ERRORES (SMART RETEST) -->

            ${failedCount > 0 ? `

                <div class="p-4 rounded-2xl bg-gradient-to-r from-red-500/15 via-rose-500/10 to-amber-500/10 border border-red-500/30 shadow-lg shadow-red-500/5" style="animation: fadeIn 0.3s ease-out">

                    <div class="flex items-start justify-between gap-3">

                        <div class="flex items-center gap-2.5">

                            <div class="size-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">

                                <span class="material-symbols-outlined text-lg">auto_fix_high</span>

                            </div>

                            <div>

                                <div class="flex items-center gap-2">

                                    <h4 class="text-xs font-black text-white">Cuaderno Inteligente de Errores</h4>

                                    <span class="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-mono font-bold">${failedCount} por repasar</span>

                                </div>

                                <p class="text-[11px] text-slate-300 mt-0.5 leading-tight">Repasá exclusivamente las preguntas que fallaste hasta dominarlas al 100%.</p>

                            </div>

                        </div>

                    </div>

                    <div class="mt-3 flex gap-2">

                        <button onclick="window._startFailedQuestionsQuiz()" class="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30 active:scale-95 transition-all">

                            <span class="material-symbols-outlined text-sm">replay</span> Repasar mis falladas (${failedCount})

                        </button>

                        <button onclick="if(confirm('¿Vaciar tu cuaderno de preguntas falladas?')){localStorage.removeItem('isep_failed_questions_v1');renderAcademia();}" class="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-red-400 text-xs transition-colors" title="Limpiar cuaderno">

                            <span class="material-symbols-outlined text-sm">delete_sweep</span>

                        </button>

                    </div>

                </div>

            ` : ''}



            <!-- 1. ELEGIR JERARQUÍA -->

            <div class="space-y-2">

                <!-- Orientación de concurso -->
                <div class="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-start gap-3 shadow-sm">
                    <span class="material-symbols-outlined text-blue-400 text-xl shrink-0 mt-0.5">school</span>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        <strong class="text-white">¿Para qué jerarquía concursás?</strong> Seleccioná el grado al que <span class="text-blue-300 font-semibold underline decoration-blue-500/40 underline-offset-2">aspirás ascender</span> (no tu jerarquía actual). Todo el banco y los ejes temáticos se calibran automáticamente según los manuales oficiales ISEP 2026.
                    </p>
                </div>

                <div class="flex items-center justify-between ml-1">

                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">1. Jerarquía de concurso</h3>

                    <span class="text-[10px] text-slate-500">${meta.hierarchies.length} opciones</span>

                </div>

                <div class="grid gap-2">

                    ${meta.hierarchies.map(h => {

                        const isSelected = state.selectedHierarchy === h.id;

                        return `

                        <button onclick="window._selectHierarchy('${h.id}')" 

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

                    <button onclick="window._selectDifficulty('facil')" 

                        class="p-3 rounded-2xl text-center border transition-all active:scale-95 ${state.difficulty === 'facil' 

                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10' 

                            : 'glass-card border-white/5 text-slate-400 hover:border-white/20'}">

                        <span class="text-xl block">🟢</span>

                        <span class="text-xs font-black block mt-1">Fácil</span>

                        <span class="text-[9px] text-slate-500 block leading-tight mt-0.5">Repaso inicial</span>

                    </button>

                    <!-- Media -->

                    <button onclick="window._selectDifficulty('media')" 

                        class="p-3 rounded-2xl text-center border transition-all active:scale-95 ${state.difficulty === 'media' 

                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10' 

                            : 'glass-card border-white/5 text-slate-400 hover:border-white/20'}">

                        <span class="text-xl block">🟡</span>

                        <span class="text-xs font-black block mt-1">Media</span>

                        <span class="text-[9px] text-slate-500 block leading-tight mt-0.5">Operativo</span>

                    </button>

                    <!-- Difícil -->

                    <button onclick="window._selectDifficulty('dificil')" 

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



                        <!-- 3. ELEGIR CANTIDAD (10 Flash Guardia | 25 Estándar | 50 Concurso Real) -->

            <div class="space-y-2" style="animation: fadeIn 0.3s ease-out">

                <div class="flex items-center justify-between ml-1">

                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3. Modalidad y Cantidad</h3>

                    <span class="text-[10px] text-primary font-bold">Tiempo Oficial</span>

                </div>

                <div class="grid grid-cols-3 gap-2">

                    <button onclick="window._selectQuestionCount(10)"

                        class="p-3 rounded-2xl text-center font-bold transition-all active:scale-95 ${state.questionCount === 10

                            ? 'bg-primary text-white shadow-lg shadow-primary/25 border-primary ring-2 ring-primary/40'

                            : 'glass-card text-slate-400 border border-white/5 hover:border-white/20'}">

                        <span class="text-xl font-black block">⚡ 10</span>

                        <span class="text-[9px] uppercase tracking-wider block mt-0.5 font-bold">Flash Guardia</span>

                        <span class="text-[8px] ${state.questionCount === 10 ? 'text-blue-100' : 'text-slate-500'} block">10 min</span>

                    </button>

                    <button onclick="window._selectQuestionCount(25)"

                        class="p-3 rounded-2xl text-center font-bold transition-all active:scale-95 ${state.questionCount === 25

                            ? 'bg-primary text-white shadow-lg shadow-primary/25 border-primary ring-2 ring-primary/40'

                            : 'glass-card text-slate-400 border border-white/5 hover:border-white/20'}">

                        <span class="text-xl font-black block">📝 25</span>

                        <span class="text-[9px] uppercase tracking-wider block mt-0.5 font-bold">Estándar</span>

                        <span class="text-[8px] ${state.questionCount === 25 ? 'text-blue-100' : 'text-slate-500'} block">30 min</span>

                    </button>

                    <button onclick="window._selectQuestionCount(50)"

                        class="p-3 rounded-2xl text-center font-bold transition-all active:scale-95 ${state.questionCount === 50

                            ? 'bg-primary text-white shadow-lg shadow-primary/25 border-primary ring-2 ring-primary/40'

                            : 'glass-card text-slate-400 border border-white/5 hover:border-white/20'}">

                        <span class="text-xl font-black block">🏆 50</span>

                        <span class="text-[9px] uppercase tracking-wider block mt-0.5 font-bold">Concurso Real</span>

                        <span class="text-[8px] ${state.questionCount === 50 ? 'text-blue-100' : 'text-slate-500'} block">60 min</span>

                    </button>

                </div>

            </div>



            <!-- INICIAR EXAMEN -->

            <button id="btn-iniciar-simulacro" onclick="window._startQuiz()" 

                class="w-full py-4 mb-12 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/25 flex items-center justify-center gap-2 active:scale-95 transition-all hover:shadow-2xl hover:shadow-primary/35">

                <span class="material-symbols-outlined">rocket_launch</span>

                INICIAR SIMULACRO · ${state.difficulty.toUpperCase()}

            </button>

            <!-- 🔒 Sello de Sitio Seguro y Verificado -->
            <div onclick="window._showSecurityCertModal()" class="cursor-pointer p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/25 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3 text-left mb-3">
                <div class="flex items-center gap-3">
                    <div class="size-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-emerald-400 text-lg">verified_user</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="text-xs font-bold text-white">Plataforma Verificada y Segura</p>
                            <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-black">SSL 256-BIT</span>
                        </div>
                        <p class="text-[10px] text-slate-400">Conexión cifrada de extremo a extremo · Protección Ley 25.326</p>
                    </div>
                </div>
                <span class="material-symbols-outlined text-slate-500 text-sm">chevron_right</span>
            </div>

            <!-- ☕ Comunidad Policial: Aporte al Desarrollo -->
            <div onclick="window.showDonationModal()" class="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 text-left">
                <div class="flex items-center gap-3">
                    <span class="text-xl">☕</span>
                    <div>
                        <p class="text-xs font-bold text-white">¿Te sirve la plataforma para preparar tu ascenso?</p>
                        <p class="text-[10px] text-amber-300/80">Herramienta independiente · Podés apoyar con un café o servidores</p>
                    </div>
                </div>
                <span class="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider shrink-0">Apoyar</span>
            </div>

        </div>

    `;



    // Handler para iniciar examen

        window._selectHierarchy = (hId) => {
        state.selectedHierarchy = hId;
        try { localStorage.setItem(SAVED_HIERARCHY_KEY, hId); } catch(e){}
        renderAcademia();
    };

    window._selectDifficulty = (diff) => {
        state.difficulty = diff;
        try { localStorage.setItem(SAVED_DIFFICULTY_KEY, diff); } catch(e){}
        renderAcademia();
    };

    window._selectQuestionCount = (cnt) => {
        state.questionCount = cnt;
        try { localStorage.setItem(SAVED_COUNT_KEY, cnt.toString()); } catch(e){}
        renderAcademia();
    };

    window._startQuiz = () => {
        // 1. Verificar límite freemium
        if (!isPro && _getFreeAttemptsUsed() >= ISEP_FREE_LIMIT) {
            window._showIsepProModal();
            return;
        }

        let bank;
        const isIntegral = state.selectedHierarchy === 'simulacro-integral';

        if (isIntegral) {
            bank = Object.values(window.quizBank).flat();
        } else {
            bank = window.quizBank[state.selectedHierarchy] || [];
        }

        if (!bank || bank.length === 0) {
            showToast('No hay preguntas disponibles para esta jerarquía');
            return;
        }

        // 2. Selección multimodular equilibrada y proporcional
        let seenIds = new Set(_getSeenQuestionIds());
        // Si el usuario ya recorrió más del 85% del banco total, reiniciar el ciclo de vistas
        if (seenIds.size >= bank.length * 0.85) {
            seenIds.clear();
            try { localStorage.removeItem(SEEN_QUESTIONS_KEY); } catch(e){}
            if (typeof showToast === 'function') {
                showToast("🔄 ¡Completaste el banco oficial! Iniciando un nuevo ciclo aleatorio.");
            }
        }

        let selectedQuestions = [];

        // Agrupar preguntas por módulo temático
        const moduleMap = {};
        bank.forEach(q => {
            const modKey = q.module || _extractTopic(q.source) || 'General';
            if (!moduleMap[modKey]) moduleMap[modKey] = [];
            moduleMap[modKey].push(q);
        });

        const modKeys = Object.keys(moduleMap);

        if (modKeys.length > 1) {
            // Repartir equitativamente las preguntas entre todos los módulos
            const basePerMod = Math.floor(state.questionCount / modKeys.length);
            const remainder = state.questionCount % modKeys.length;
            const shuffledMods = _shuffleArray([...modKeys]);
            const selectedIds = new Set();

            shuffledMods.forEach((modKey, idx) => {
                const quota = basePerMod + (idx < remainder ? 1 : 0);
                const pool = moduleMap[modKey];

                // Prioridad 1: dificultad elegida
                const exactDiff = pool.filter(q => q.difficulty === state.difficulty);
                const otherDiff = pool.filter(q => q.difficulty !== state.difficulty);

                // Priorizar SIEMPRE preguntas NO VISTAS (incluso de otra dificultad antes de repetir una ya vista)
                const unseenExact = exactDiff.filter(q => !seenIds.has(q.id));
                const unseenOther = otherDiff.filter(q => !seenIds.has(q.id));
                const seenExact = exactDiff.filter(q => seenIds.has(q.id));
                const seenOther = otherDiff.filter(q => seenIds.has(q.id));

                const candidates = [
                    ..._shuffleArray(unseenExact),
                    ..._shuffleArray(unseenOther),
                    ..._shuffleArray(seenExact),
                    ..._shuffleArray(seenOther)
                ];

                const picked = candidates.slice(0, quota);
                picked.forEach(p => {
                    selectedQuestions.push(p);
                    selectedIds.add(p.id);
                });
            });

            // Si algún módulo tuvo menos preguntas que la cuota, completar con el resto del banco sin repetir IDs
            if (selectedQuestions.length < state.questionCount) {
                const remainingBank = bank.filter(q => !selectedIds.has(q.id));
                const unseenRem = remainingBank.filter(q => !seenIds.has(q.id));
                const seenRem = remainingBank.filter(q => seenIds.has(q.id));
                const fillerCandidates = [..._shuffleArray(unseenRem), ..._shuffleArray(seenRem)];
                const needed = state.questionCount - selectedQuestions.length;
                const filler = fillerCandidates.slice(0, needed);
                filler.forEach(p => {
                    selectedQuestions.push(p);
                    selectedIds.add(p.id);
                });
            }
        } else {
            // Fallback para bancos con un único módulo
            const exactDiff = bank.filter(q => q.difficulty === state.difficulty);
            const otherDiff = bank.filter(q => q.difficulty !== state.difficulty);
            const unseenExact = exactDiff.filter(q => !seenIds.has(q.id));
            const unseenOther = otherDiff.filter(q => !seenIds.has(q.id));
            const seenExact = exactDiff.filter(q => seenIds.has(q.id));
            const seenOther = otherDiff.filter(q => seenIds.has(q.id));
            const pool = [
                ..._shuffleArray(unseenExact),
                ..._shuffleArray(unseenOther),
                ..._shuffleArray(seenExact),
                ..._shuffleArray(seenOther)
            ];
            selectedQuestions = pool.slice(0, state.questionCount);
        }

        // 3. Mezclar preguntas entre sí para intercalar temas de todos los módulos
        selectedQuestions = _shuffleArray(selectedQuestions).slice(0, state.questionCount);

        // 4. Soporte adaptativo para temas débiles (si aplica)
        const weakTopics = _getWeakTopics();
        let adaptiveNotice = null;
        if (weakTopics.length > 0 && selectedQuestions.length > 0) {
            adaptiveNotice = {
                count: Math.min(3, selectedQuestions.length),
                topics: weakTopics.slice(0, 2).map(w => w.label)
            };
        }

        const count = selectedQuestions.length;

        // Registrar preguntas como vistas para evitar repeticiones consecutivas
        _markQuestionsAsSeen(selectedQuestions.map(q => q.id));

        // 5. Mezclar aleatoriamente las opciones (respuestas) de cada pregunta y recalcular correctIndex
        const questions = selectedQuestions.map(q => {
            const indexMap = q.options.map((_, i) => i);
            // Fisher-Yates shuffle the index map
            for (let i = indexMap.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indexMap[i], indexMap[j]] = [indexMap[j], indexMap[i]];
            }
            return {
                ...q,
                options: indexMap.map(i => q.options[i]),
                correctIndex: indexMap.indexOf(q.correctIndex)
            };
        });

        // 6. Verificación estricta de concordancia final
        if (!isIntegral) {
            const invalidIdx = questions.findIndex(q => !bank.some(b => b.id === q.id));
            if (invalidIdx !== -1) {
                const fallback = bank.find(b => !questions.some(sq => sq.id === b.id));
                if (fallback) questions[invalidIdx] = fallback;
            }
        }

        const hierMeta = window.quizBankMeta?.hierarchies?.find(h => h.id === state.selectedHierarchy);
        state.currentExam = {
            hierarchy: state.selectedHierarchy,
            hierarchyTitle: hierMeta?.title || (isIntegral ? 'Simulacro General ISEP' : state.selectedHierarchy),
            difficulty: state.difficulty,
            questions: questions,
            answers: new Array(questions.length).fill(null),
            startTime: Date.now(),
            timeLimit: count <= 10 ? 10 * 60 : count <= 25 ? 30 * 60 : 60 * 60, // 10m (10Q), 30m (25Q), 60m (50Q)
            adaptiveNotice: adaptiveNotice
        };

        state.currentIndex = 0;
        state.examFinished = false;
        state.examResults = null;

        renderAcademia();
    };

}



// ══════════════════════════════════════════════════════════════

// MODAL ISEP PRO ($5.000 Suscripción Única)

// ══════════════════════════════════════════════════════════════

window._toggleSourceSnippet = function() {
    const box = document.getElementById('source-snippet-box');
    const txt = document.getElementById('btn-toggle-source-text');
    if (!box) return;
    const isHidden = box.classList.toggle('hidden');
    if (txt) txt.textContent = isHidden ? 'Consultar fragmento fuente del Manual' : 'Ocultar fragmento del Manual';
};

window._showSecurityCertModal = function() {
    const existing = document.getElementById('security-cert-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'security-cert-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 text-center shadow-2xl overflow-hidden">
            <div class="absolute -top-16 -right-16 size-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div class="size-14 mx-auto mb-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <span class="material-symbols-outlined text-3xl">verified_user</span>
            </div>

            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-2">
                <span class="material-symbols-outlined text-xs">lock</span> Sitio Seguro y Verificado
            </div>

            <h3 class="text-lg font-black text-white mb-1">Verificación de Seguridad Activa</h3>
            <p class="text-xs text-slate-400 mb-4">Adicionales Santa Fe · Conexión Cifrada SSL / TLS 1.3</p>

            <div class="space-y-2.5 text-left mb-5">
                <div class="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0 mt-0.5">lock_clock</span>
                    <div>
                        <p class="text-xs font-bold text-white">Cifrado SSL 256-Bit de Extremo a Extremo</p>
                        <p class="text-[10px] text-slate-400 leading-relaxed">Emitido por entidad certificadora de confianza (Let's Encrypt). La navegación entre tu dispositivo y el servidor está 100% blindada contra intercepciones.</p>
                    </div>
                </div>

                <div class="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0 mt-0.5">policy</span>
                    <div>
                        <p class="text-xs font-bold text-white">Protección de Datos Personales (Ley 25.326)</p>
                        <p class="text-[10px] text-slate-400 leading-relaxed">Cumplimiento estricto de la legislación argentina. No recopilamos información bancaria confidencial ni cedemos datos a terceros.</p>
                    </div>
                </div>

                <div class="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-sm shrink-0 mt-0.5">gavel</span>
                    <div>
                        <p class="text-xs font-bold text-white">Transparencia e Independencia</p>
                        <p class="text-[10px] text-slate-400 leading-relaxed">Herramienta técnica y pedagógica independiente desarrollada para la Policía de Santa Fe, con protocolos anti-phishing y auditoría de integridad.</p>
                    </div>
                </div>
            </div>

            <button onclick="document.getElementById('security-cert-modal').remove()" 
                class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                Entendido · Continuar de Forma Segura
            </button>
        </div>
    `;
    document.body.appendChild(modal);
};

window._showIsepProModal = function() {
    if (_isIsepPro()) {
        if (typeof showToast === 'function') showToast("✅ Ya contás con acceso ISEP PRO ilimitado.");
        renderAcademia();
        return;
    }

    const existing = document.getElementById('isep-pro-modal');
    if (existing) existing.remove();

    const used = _getFreeAttemptsUsed();
    const modal = document.createElement('div');
    modal.id = 'isep-pro-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';
    
    modal.innerHTML = `
        <div class="glass-card w-full max-w-md p-6 rounded-3xl border border-amber-500/40 bg-background-dark/95 shadow-2xl shadow-amber-500/20 text-center relative overflow-hidden max-h-[92vh] overflow-y-auto custom-scrollbar" style="animation: scaleUp 0.3s ease-out">
            <!-- GLOW BACKGROUND -->
            <div class="absolute -top-24 -left-24 size-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -right-24 size-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>

            <button onclick="document.getElementById('isep-pro-modal').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>

            <!-- ICON & HEADER -->
            <div class="inline-flex items-center justify-center size-16 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/30 mb-2">
                <span class="material-symbols-outlined text-3xl">workspace_premium</span>
            </div>

            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-2 animate-pulse">
                <span>🔥 50% OFF · OFERTA CONCURSO 2026</span>
            </div>

            <h2 class="text-xl font-black text-white">ISEP PRO 2026: Tu Ascenso Seguro</h2>
            <p class="text-xs text-amber-300 font-bold uppercase tracking-wider mt-0.5">Suscripción Única Concurso Policial</p>

            ${used >= ISEP_FREE_LIMIT ? `
                <div class="mt-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                    Completaste tus <strong>${ISEP_FREE_LIMIT} simulacros de prueba gratuitos</strong>. Obtené tu suscripción única para desbloquear el banco completo sin límites.
                </div>
            ` : `
                <p class="text-xs text-slate-400 mt-2">La única herramienta pedagógica diseñada estrictamente para el examen de ascenso en Santa Fe.</p>
            `}

            <!-- PRICE TAG CON ANCLAJE (50% OFF) -->
            <div class="my-3 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border border-amber-500/40">
                <div class="flex items-center justify-center gap-2 mb-0.5">
                    <span class="text-xs text-slate-400 line-through font-bold">${ISEP_PRO_REGULAR_PRICE}</span>
                    <span class="px-2 py-0.2 rounded-full bg-red-500 text-white font-black text-[9px] uppercase tracking-wider">Ahorrás $5.000</span>
                </div>
                <div class="flex items-baseline justify-center gap-1">
                    <span class="text-3xl font-black text-amber-300">${ISEP_PRO_PRICE}</span>
                    <span class="text-xs text-amber-300 font-bold uppercase tracking-wider ml-1">Suscripción Única</span>
                </div>
                <p class="text-[10px] text-amber-400/90 mt-0.5 uppercase tracking-wider font-semibold">Menos de media hora de adicional ordinario · Suscripción única hasta rendir</p>
            </div>

            <!-- UNBEATABLE BENEFITS LIST -->
            <div class="text-left space-y-2 mb-4 text-xs text-slate-300">
                <div class="flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">verified</span>
                    <span><strong>180+ Preguntas Oficiales 2026:</strong> con citas exactas de artículos (CPP Ley 12.734, Narcomenudeo Ley 14.239, Ley 12.521).</span>
                </div>
                <div class="flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-amber-400 text-base shrink-0 mt-0.5">psychology</span>
                    <span><strong>Cuaderno Inteligente de Errores:</strong> repetición espaciada que te entrena exclusivamente en tus fallas hasta el 100%.</span>
                </div>
                <div class="flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-cyan-400 text-base shrink-0 mt-0.5">smart_toy</span>
                    <span><strong>Tutor Centinela IA:</strong> explicaciones pedagógicas y jurídicas instantáneas en cada pregunta dudosa.</span>
                </div>
                <div class="flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-blue-400 text-base shrink-0 mt-0.5">timer</span>
                    <span><strong>Simulador Modo Sede ISEP:</strong> 50 preguntas aleatorias en 60 minutos con cronómetro real de examen.</span>
                </div>
                <div class="flex items-start gap-2.5">
                    <span class="material-symbols-outlined text-purple-400 text-base shrink-0 mt-0.5">menu_book</span>
                    <span><strong>Biblioteca Oficial en PDF:</strong> descarga directa de manuales de todas las jerarquías en tu celular.</span>
                </div>
            </div>

            <!-- DATOS DE TRANSFERENCIA MERCADO PAGO / BANCO -->
            <div class="space-y-2 mb-4 text-left">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1">Transferí a nuestra cuenta oficial:</p>
                
                <div onclick="if(typeof copyToClipboard==='function') copyToClipboard('SmartFlow.Digital', 'Alias')" class="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-amber-500/20 cursor-pointer hover:bg-amber-500/10 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Alias Mercado Pago</p>
                        <p class="text-xs font-mono font-black text-amber-300 group-hover:text-amber-200 transition-colors">SmartFlow.Digital</p>
                    </div>
                    <div class="size-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <span class="material-symbols-outlined text-sm">content_copy</span>
                    </div>
                </div>

                <div onclick="if(typeof copyToClipboard==='function') copyToClipboard('0000003100001906497190', 'CVU')" class="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-0.5">CVU (Mercado Pago)</p>
                        <p class="text-[11px] font-mono font-bold text-slate-300 group-hover:text-white transition-colors">0000003100001906497190</p>
                    </div>
                    <div class="size-7 rounded-full bg-white/10 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-950 transition-colors">
                        <span class="material-symbols-outlined text-sm">content_copy</span>
                    </div>
                </div>
                <p class="text-[9px] text-slate-500 italic ml-1">Titular: Nicolás Espinosa · SmartFlow Digital</p>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="space-y-2">
                <button onclick="window._handleNotifyIsepProPayment()"
                    class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-lg">send</span>
                    Notificar Pago ($5.000) y Enviar Comprobante
                </button>

                <div class="flex gap-2">
                    <button onclick="window._promptActivationCode()" class="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-bold text-[11px] rounded-2xl border border-white/5 transition-all">
                        Tengo un Código
                    </button>
                    <button onclick="if(window.showDonationModal) showDonationModal();" class="flex-1 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-[11px] rounded-2xl border border-amber-500/20 transition-all flex items-center justify-center gap-1">
                        <span class="material-symbols-outlined text-xs">volunteer_activism</span> Donar al Proyecto
                    </button>
                </div>
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

    const isManual = _isManualSource(q.source);

    const diffBadge = q.difficulty === 'facil'

        ? '<span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase">🟢 Fácil</span>'

        : q.difficulty === 'media'

        ? '<span class="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase">🟡 Media</span>'

        : '<span class="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[9px] font-black uppercase">🔴 Difícil</span>';



    const sourceBadge = isManual

        ? '<span class="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[9px] font-black uppercase flex items-center gap-1"><span class="material-symbols-outlined text-[11px]">menu_book</span> MANUAL DE POLICÍA ISEP</span>'

        : '<span class="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-400 text-[9px] font-bold uppercase flex items-center gap-1"><span class="material-symbols-outlined text-[11px]">gavel</span> Normativa Complementaria</span>';



    container.innerHTML = `

        <style>

            .quiz-option { transition: all 0.2s ease; }

            .quiz-option:hover { transform: translateX(4px); }

            .quiz-option.selected { background: rgba(var(--color-primary-rgb, 59, 130, 246), 0.15); border-color: rgba(var(--color-primary-rgb, 59, 130, 246), 0.5); }

            .quiz-progress-fill { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

            @keyframes questionSlideIn {

                from { opacity: 0; transform: translateY(6px); }

                to { opacity: 1; transform: translateY(0); }

            }

            .question-anim { animation: questionSlideIn 0.2s ease-out; }

        </style>



        <!-- EXAM HEADER -->

        <header class="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5 px-4 py-3">

            <div class="flex items-center justify-between mb-2">

                <button onclick="window._exitExam()" class="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 text-xs">
                    <span class="material-symbols-outlined text-sm">close</span> Salir
                </button>

                <div class="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase truncate max-w-[170px]" title="${exam.hierarchyTitle || exam.hierarchy}">
                    <span class="material-symbols-outlined text-xs">military_tech</span>
                    <span class="truncate">${exam.hierarchyTitle || exam.hierarchy}</span>
                </div>

                <div class="flex items-center gap-1.5 ${timerColor}">

                    <span class="material-symbols-outlined text-sm">timer</span>

                    <span class="text-sm font-mono font-bold" id="quiz-timer">${_formatTime(remaining)}</span>

                </div>

                <!-- QUESTION MAP BUTTON -->

                <button onclick="window._showQuestionGrid()" class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-300 hover:text-white transition-all active:scale-95">

                    <span class="material-symbols-outlined text-sm text-primary">grid_view</span>

                    <span>${answered}/${totalQ}</span>

                </button>

            </div>

            <!-- Progress bar -->

            <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">

                <div class="quiz-progress-fill h-full bg-gradient-to-r from-primary to-blue-500 rounded-full" style="width: ${((state.currentIndex + 1) / totalQ) * 100}%"></div>

            </div>

        </header>



        <main class="p-5 pb-40 max-w-lg mx-auto question-anim">

            <!-- AGENT ADAPTIVE BANNER -->

            ${exam.adaptiveNotice ? `

                <div class="mb-3.5 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-2 text-[10px] text-blue-300">

                    <span class="material-symbols-outlined text-sm text-blue-400 shrink-0">psychology</span>

                    <span><strong>Agente Activo:</strong> Reforzando <em>${exam.adaptiveNotice.topics.join(', ')}</em> (${exam.adaptiveNotice.count} preguntas seleccionadas)</span>

                </div>

            ` : ''}



                        <!-- QUESTION HEADER -->

            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">

                <div class="flex items-center gap-2 flex-wrap">
                    <span class="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        Pregunta ${state.currentIndex + 1} de ${totalQ}
                    </span>
                    <span class="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[9px] font-black uppercase flex items-center gap-1">
                        <span class="material-symbols-outlined text-[11px]">shield</span>
                        ${exam.hierarchyTitle || exam.hierarchy}
                    </span>
                    ${q.module ? `
                    <span class="px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/35 text-indigo-300 text-[9px] font-black uppercase flex items-center gap-1">
                        <span class="material-symbols-outlined text-[11px]">category</span>
                        ${q.module}
                    </span>` : ''}
                    ${sourceBadge}
                </div>

                <div class="flex items-center gap-2">

                    <span class="text-[10px] text-slate-500 hidden sm:inline">Teclas: 1-4</span>

                    ${diffBadge}

                </div>

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

                            ${isSelected ? 'selected bg-primary/15 border-primary shadow-lg shadow-primary/10' : 'glass-card border-white/5 hover:border-white/20'}">

                            <span class="size-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-black mt-0.5 transition-colors

                                ${isSelected ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-white/10 text-slate-400'}">

                                ${letter}

                            </span>

                            <span class="text-sm leading-relaxed ${isSelected ? 'text-white font-semibold' : 'text-slate-300'}">${opt}</span>

                        </button>

                    `;

                }).join('')}

            </div>

            <!-- BOTÓN DESPLEGABLE DE PÁRRAFO FUENTE (Modelo Concurso 2026) -->
            <div class="mt-4 pt-3 border-t border-white/5">
                <button type="button" onclick="window._toggleSourceSnippet()" 
                    class="w-full py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-xs font-bold text-blue-300 flex items-center justify-between transition-all active:scale-[0.99]">
                    <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-blue-400">menu_book</span>
                        <span id="btn-toggle-source-text">Consultar fragmento fuente del Manual</span>
                    </span>
                    <span class="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Párrafo oficial</span>
                </button>
                <div id="source-snippet-box" class="hidden mt-2.5 p-3.5 rounded-2xl bg-slate-900/90 border border-blue-500/30 text-xs text-slate-300 leading-relaxed font-sans shadow-xl">
                    <div class="text-[10px] font-black text-blue-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-xs">local_library</span>
                        ${q.source || 'Manual Oficial ISEP'}
                    </div>
                    <p class="text-slate-200 text-xs leading-relaxed italic border-l-2 border-blue-400 pl-2.5 my-1.5">
                        "${q.explanation}"
                    </p>
                    <span class="text-[10px] text-slate-400">Podés ocultar este fragmento para practicar en condiciones de examen real.</span>
                </div>
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



    // Keyboard navigation (1-4 / A-D to answer, Arrows to navigate)

    if (window._quizKeyHandler) document.removeEventListener('keydown', window._quizKeyHandler);

    window._quizKeyHandler = (e) => {

        if (!state.currentExam || state.examFinished) return;

        if (['1', '2', '3', '4'].includes(e.key)) {

            const idx = parseInt(e.key, 10) - 1;

            if (idx < q.options.length) window._selectAnswer(idx);

        } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {

            const idx = e.key.toLowerCase().charCodeAt(0) - 97;

            if (idx < q.options.length) window._selectAnswer(idx);

        } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {

            window._nextQuestion();

        } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {

            window._prevQuestion();

        }

    };

    document.addEventListener('keydown', window._quizKeyHandler);



    // Question grid map modal

    window._showQuestionGrid = () => {

        const existing = document.getElementById('quiz-grid-modal');

        if (existing) existing.remove();



        const modal = document.createElement('div');

        modal.id = 'quiz-grid-modal';

        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';

        modal.innerHTML = `

            <div class="glass-card w-full max-w-md p-5 rounded-3xl border border-white/10 bg-background-dark/95 shadow-2xl flex flex-col max-h-[85vh]">

                <div class="flex items-center justify-between pb-3 border-b border-white/10">

                    <div class="flex items-center gap-2">

                        <span class="material-symbols-outlined text-primary text-lg">grid_view</span>

                        <h3 class="text-xs font-bold text-white uppercase tracking-wider">Mapa de Preguntas</h3>

                    </div>

                    <button onclick="document.getElementById('quiz-grid-modal').remove()" class="text-slate-400 hover:text-white p-1 rounded-full">

                        <span class="material-symbols-outlined text-lg">close</span>

                    </button>

                </div>

                <p class="text-[11px] text-slate-400 my-2.5">Elegí cualquier pregunta para responderla o revisarla directamente:</p>

                <div class="grid grid-cols-5 gap-2 overflow-y-auto p-1 flex-1 max-h-[50vh]">

                    ${exam.questions.map((_, i) => {

                        const isAns = exam.answers[i] !== null;

                        const isCurr = state.currentIndex === i;

                        return `

                            <button onclick="window._jumpToQuestion(${i})" class="h-11 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all active:scale-90

                                ${isCurr ? 'ring-2 ring-primary bg-primary text-white shadow-lg shadow-primary/30' : 

                                  isAns ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 

                                  'bg-white/5 text-slate-400 border border-white/5 hover:border-white/20'}">

                                ${i + 1}

                            </button>

                        `;

                    }).join('')}

                </div>

                <div class="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-slate-400">

                    <span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-emerald-400 inline-block"></span> Respondida</span>

                    <span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-white/20 inline-block"></span> Pendiente</span>

                    <span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-primary inline-block"></span> Actual</span>

                </div>

            </div>

        `;

        document.body.appendChild(modal);

    };



    window._jumpToQuestion = (i) => {

        const m = document.getElementById('quiz-grid-modal');

        if (m) m.remove();

        state.currentIndex = i;

        renderAcademia();

    };



    // Handlers

    window._selectAnswer = (index) => {

        exam.answers[state.currentIndex] = index;

        if (navigator.vibrate) try { navigator.vibrate(15); } catch {}

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

            if (window._quizKeyHandler) document.removeEventListener('keydown', window._quizKeyHandler);

            state.currentExam = null;

            state.examFinished = false;

            state.examResults = null;

            renderAcademia();

        }

    };



    window._finishExam = () => {

        if (window._quizTimerInterval) clearInterval(window._quizTimerInterval);

        if (window._quizKeyHandler) document.removeEventListener('keydown', window._quizKeyHandler);



        const unanswered = exam.answers.filter(a => a === null).length;

        if (unanswered > 0 && !confirm(`Tenés ${unanswered} pregunta(s) sin responder. ¿Finalizar igual?`)) {

            return;

        }



                // Calculate results

        let correct = 0;

        const details = exam.questions.map((q, i) => {

            const userAnswer = exam.answers[i];

            const isCorrect = userAnswer === q.correctIndex;

            if (isCorrect) {

                correct++;

                _removeFailedQuestion(q.id); // ¡Pregunta dominada! Se elimina del cuaderno de errores

            } else {

                _recordFailedQuestion(q); // Se guarda en el cuaderno inteligente de errores para repaso

            }

            return {

                id: q.id,

                module: q.module,

                question: q.question,

                difficulty: q.difficulty,

                options: q.options,

                userAnswer: userAnswer,

                correctIndex: q.correctIndex,

                isCorrect: isCorrect,

                source: q.source,

                isManual: _isManualSource(q.source),

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



        // Actualizar agente de retroalimentación inteligente

        _updateFeedbackAgent(state.examResults);



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

// VIRAL LOOP: COMPARTIR RESULTADO EN WHATSAPP

// ══════════════════════════════════════════════════════════════

window._shareExamResultWhatsApp = function() {

    const state = window._quizState;

    const r = state.examResults;

    if (!r) return;

    const diffMap = { facil: 'Fácil', media: 'Media', dificil: 'Difícil (Concurso ISEP)' };

    const diff = diffMap[r.difficulty] || r.difficulty;

    const emoji = r.percentage >= 80 ? '🎖️' : r.percentage >= 60 ? '📝' : '📖';

    const text = `👮‍♂️ *Simulador de Ascenso Policial ISeP 2026*\n\n${emoji} Obtuve *${r.percentage}%* (${r.correct}/${r.total} correctas) en nivel *${diff}*.\n\n¿Te animás a superarme en el examen? Hacé tu simulacro gratis en *Adicionales Santa Fe*:\n👉 https://adicionales-santafe.web.app/#academia`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');

};



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



    // Feedback Agent: análisis por tema del examen actual

    const topicBreakdown = _getTopicAnalysisFromDetails(results.details);

    const suggestedDiff = _getSuggestedDifficulty();



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



            <!-- BOTÓN VIRAL: DESAFIAR EN WHATSAPP -->

            <button onclick="window._shareExamResultWhatsApp()" class="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all">

                <span class="material-symbols-outlined text-lg">share</span>

                Desafiar a un Colega en WhatsApp

            </button>



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

                        Activar ISEP PRO · 50% OFF ($5.000 Suscripción Única)

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



            <!-- DESGLOSE: MANUAL DE POLICÍA ISEP VS NORMATIVA COMPLEMENTARIA -->

            ${(() => {

                const manualList = results.details.filter(d => _isManualSource(d.source));

                const compList = results.details.filter(d => !_isManualSource(d.source));

                const manualCorrect = manualList.filter(d => d.isCorrect).length;

                const compCorrect = compList.filter(d => d.isCorrect).length;

                const mPct = manualList.length ? Math.round((manualCorrect / manualList.length) * 100) : 0;

                const cPct = compList.length ? Math.round((compCorrect / compList.length) * 100) : 0;

                return `

                <div class="grid grid-cols-2 gap-2 text-center">

                    <div class="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/25">

                        <div class="flex items-center justify-center gap-1 text-[10px] font-black text-blue-300 uppercase tracking-wider">

                            <span class="material-symbols-outlined text-xs">menu_book</span> Manual ISEP

                        </div>

                        <p class="text-lg font-black text-white mt-1">${manualCorrect} <span class="text-xs text-slate-400 font-normal">/ ${manualList.length}</span></p>

                        <p class="text-[10px] text-blue-400 font-bold mt-0.5">${mPct}% efectividad</p>

                    </div>

                    <div class="p-3 rounded-2xl bg-slate-800/60 border border-white/10">

                        <div class="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">

                            <span class="material-symbols-outlined text-xs">gavel</span> Normativa Compl.

                        </div>

                        <p class="text-lg font-black text-white mt-1">${compCorrect} <span class="text-xs text-slate-400 font-normal">/ ${compList.length}</span></p>

                        <p class="text-[10px] text-slate-400 font-bold mt-0.5">${cPct}% efectividad</p>

                    </div>

                </div>

                `;

            })()}



            <!-- FEEDBACK AGENT: ANÁLISIS POR TEMA -->

            ${topicBreakdown.length > 0 ? `

                <div class="space-y-2">

                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">

                        <span class="material-symbols-outlined text-xs text-blue-400">insights</span> Rendimiento por Tema

                    </h3>

                    <div class="glass-card rounded-2xl border border-white/5 p-3.5 space-y-2.5">

                        ${topicBreakdown.map(t => `

                            <div>

                                <div class="flex items-center justify-between mb-1">

                                    <span class="text-[10px] text-slate-300 font-medium truncate max-w-[70%]">${t.label}</span>

                                    <span class="text-[10px] font-bold ${t.rate >= 80 ? 'text-emerald-400' : t.rate >= 50 ? 'text-amber-400' : 'text-red-400'}">${t.rate}% (${t.correct}/${t.total})</span>

                                </div>

                                <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">

                                    <div class="h-full rounded-full ${t.rate >= 80 ? 'bg-emerald-500' : t.rate >= 50 ? 'bg-amber-500' : 'bg-red-500'}" style="width: ${t.rate}%; transition: width 0.5s ease"></div>

                                </div>

                            </div>

                        `).join('')}

                    </div>

                </div>

            ` : ''}



            ${suggestedDiff ? `

                <div class="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/15 flex items-start gap-2.5" style="animation: fadeIn 0.5s ease-out">

                    <span class="material-symbols-outlined text-blue-400 text-lg shrink-0 mt-0.5">psychology</span>

                    <div>

                        <p class="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-0.5">Recomendación del Agente</p>

                        <p class="text-[11px] text-slate-300 leading-relaxed">${suggestedDiff.reason}</p>

                    </div>

                </div>

            ` : ''}



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

                                <p class="text-xs font-semibold text-slate-200 leading-relaxed">
                                    ${i + 1}. ${d.question}
                                    ${d.module ? `<span class="inline-block ml-1.5 px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[9px] font-black uppercase tracking-wider">${d.module}</span>` : ''}
                                </p>

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

                                <div class="space-y-1.5">
                                    <div>
                                        <span class="text-[9px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                                            <span class="material-symbols-outlined text-[11px]">verified</span> Fundamento Oficial ISEP:
                                        </span>
                                        <p class="text-[10px] text-blue-200/90 leading-relaxed mt-0.5">${d.explanation}</p>
                                    </div>
                                    <div class="pt-1.5 border-t border-white/5">
                                        <span class="text-[9px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                                            <span class="material-symbols-outlined text-[11px]">warning</span> Clave sobre distractores:
                                        </span>
                                        <p class="text-[9px] text-amber-200/80 leading-relaxed mt-0.5">
                                            Los distractores del concurso suelen alterar plazos procesales o inventar excepciones no contempladas en la normativa. Prestá atención a las palabras taxativas de la ley.
                                        </p>
                                    </div>
                                </div>
                                ${d.source ? `<p class="mt-1.5 text-[9px] text-slate-400 font-mono flex items-center gap-1"><span class="material-symbols-outlined text-[11px]">menu_book</span> ${d.source}</p>` : ''}

                            </div>

                                                        <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-amber-500/5 border border-amber-500/10">

                                <div class="flex items-center gap-1.5 min-w-0">

                                    <span class="material-symbols-outlined text-xs text-amber-400 shrink-0">menu_book</span>

                                    <span class="text-[10px] text-amber-300 font-medium truncate">${d.source}</span>

                                </div>

                                <span class="px-1.5 py-0.5 rounded text-[8px] font-black uppercase shrink-0 ${d.isManual ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-700 text-slate-300'}">

                                    ${d.isManual ? 'Manual ISEP' : 'Normativa'}

                                </span>

                            </div>

                            <div class="px-1 text-[9px] text-slate-400 flex items-center gap-1">

                                <span class="material-symbols-outlined text-[11px] text-red-400">auto_fix_high</span>

                                <span>Guardada en tu <strong>Cuaderno de Errores</strong> para repasar.</span>

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

            <!-- ☕ Comunidad Policial: Aporte al Desarrollo -->
            <div onclick="window.showDonationModal()" class="mt-4 cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 text-left shadow-lg">
                <div class="flex items-center gap-3">
                    <span class="text-2xl">☕</span>
                    <div>
                        <p class="text-xs font-bold text-white">¿Te sirvió la explicación de Centinela IA?</p>
                        <p class="text-[10px] text-amber-300/80">Desarrollo 100% independiente de Santa Fe · Apoyá los servidores</p>
                    </div>
                </div>
                <span class="px-2.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shrink-0 shadow-sm">Apoyar</span>
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



    // Feedback Agent: insights para el historial

    const _fbWeak = _getWeakTopics();

    const _fbStrong = _getStrongTopics();

    const _fbCurve = _getLearningCurve();

    const _fbSuggested = _getSuggestedDifficulty();

    const _fbHasInsights = _fbWeak.length > 0 || _fbCurve;



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



            <!-- FEEDBACK AGENT: INSIGHTS -->

            ${_fbHasInsights ? `

                <div class="space-y-3 p-4 rounded-3xl bg-gradient-to-br from-blue-900/20 to-indigo-900/10 border border-blue-500/15" style="animation: fadeIn 0.4s ease-out">

                    <div class="flex items-center gap-2 mb-1">

                        <span class="material-symbols-outlined text-blue-400 text-base">psychology</span>

                        <h3 class="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Agente de Retroalimentación</h3>

                    </div>

                    ${_fbCurve ? `

                        <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5">

                            <span class="material-symbols-outlined text-base ${_fbCurve.trend > 0 ? 'text-emerald-400' : _fbCurve.trend < 0 ? 'text-red-400' : 'text-slate-400'}">${_fbCurve.trend > 0 ? 'trending_up' : _fbCurve.trend < 0 ? 'trending_down' : 'trending_flat'}</span>

                            <div>

                                <p class="text-[11px] text-slate-200 font-medium">Curva de Aprendizaje</p>

                                <p class="text-[10px] text-slate-400">${_fbCurve.trend > 0 ? 'Mejoraste +' + _fbCurve.trend + '% (de ' + _fbCurve.avgFirst + '% a ' + _fbCurve.avgSecond + '%)' : _fbCurve.trend < 0 ? 'Bajaste ' + _fbCurve.trend + '% — repasá los temas débiles' : 'Rendimiento estable en ' + _fbCurve.avgSecond + '%'}</p>

                            </div>

                        </div>

                    ` : ''}

                    ${_fbWeak.length > 0 ? `

                        <div class="space-y-1.5">

                            <p class="text-[10px] font-bold text-red-400 uppercase tracking-wider ml-0.5">⚠ Temas a Reforzar</p>

                            ${_fbWeak.slice(0, 3).map(t => '<div class="flex items-center justify-between p-2 rounded-xl bg-red-500/5 border border-red-500/10"><span class="text-[10px] text-slate-300 truncate flex-1">' + t.label + '</span><span class="text-[10px] font-bold text-red-400 ml-2">' + t.rate + '% (' + t.correct + '/' + t.total + ')</span></div>').join('')}

                        </div>

                    ` : ''}

                    ${_fbStrong.length > 0 ? `

                        <div class="space-y-1.5">

                            <p class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider ml-0.5">✓ Temas Dominados</p>

                            ${_fbStrong.slice(0, 2).map(t => '<div class="flex items-center justify-between p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10"><span class="text-[10px] text-slate-300 truncate flex-1">' + t.label + '</span><span class="text-[10px] font-bold text-emerald-400 ml-2">' + t.rate + '% (' + t.correct + '/' + t.total + ')</span></div>').join('')}

                        </div>

                    ` : ''}

                    ${_fbSuggested ? `

                        <div class="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-2">

                            <span class="material-symbols-outlined text-blue-400 text-sm mt-0.5">school</span>

                            <p class="text-[10px] text-blue-300 leading-relaxed">${_fbSuggested.reason}</p>

                        </div>

                    ` : ''}

                </div>

            ` : ''}



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





// ══════════════════════════════════════════════════════════════

// TAB: NOVEDADES ISEP 2026 (Resolución 0803/2026 & Cronograma)

// ══════════════════════════════════════════════════════════════

function _renderNovedadesTab(container) {

    const failedList = _getFailedQuestions();

    const weakTopics = _getWeakTopics();

    const fbData = _getFeedbackData();

    const history = _getQuizHistory();



    container.innerHTML = `

        <div class="p-5 space-y-5 max-w-lg mx-auto">

            <!-- HERO HEADER -->

            <div class="p-4 rounded-3xl bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-slate-900/60 border border-blue-500/30 shadow-xl relative overflow-hidden">

                <div class="absolute -right-6 -bottom-6 size-28 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>

                <div class="flex items-start gap-3">

                    <div class="size-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">

                        <span class="material-symbols-outlined text-2xl">campaign</span>

                    </div>

                    <div class="flex-1 min-w-0">

                        <div class="flex items-center gap-2">

                            <span class="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-black uppercase tracking-wider">Resolución Ministerial</span>

                            <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-black uppercase">Vigente 2026</span>

                        </div>

                        <h2 class="text-base font-black text-white mt-1">Concurso de Ascenso Policial 2025/2026</h2>

                        <p class="text-[11px] text-slate-300 mt-0.5">Res. N° 0803/2026 · Min. de Justicia y Seguridad de Santa Fe</p>

                    </div>

                </div>

            </div>



            <!-- CRONOGRAMA OFICIAL DEL CONCURSO -->

            <div class="space-y-2.5">

                <div class="flex items-center justify-between ml-1">

                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">

                        <span class="material-symbols-outlined text-sm text-primary">calendar_month</span>

                        Cronograma Oficial de Etapas

                    </h3>

                    <span class="text-[10px] text-slate-500">Res. 0803/26 Art. 1°</span>

                </div>



                <div class="space-y-2">

                    <!-- 1. Inscripción -->

                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3 opacity-75">

                        <div class="size-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">

                            <span class="material-symbols-outlined text-base">check</span>

                        </div>

                        <div class="flex-1 min-w-0">

                            <div class="flex items-center justify-between gap-1">

                                <p class="text-xs font-bold text-slate-200">1. Inscripción y Entrega de Antecedentes</p>

                                <span class="text-[9px] font-black text-emerald-400 uppercase">Completado</span>

                            </div>

                            <p class="text-[10px] text-slate-400 mt-0.5">Carga de antecedentes y proyectos hasta el 06/04/2026 a las 12:00 hs en Plataforma Timbó.</p>

                        </div>

                    </div>



                    <!-- 2. Publicación de Antecedentes -->

                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3 opacity-80">

                        <div class="size-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">

                            <span class="material-symbols-outlined text-base">fact_check</span>

                        </div>

                        <div class="flex-1 min-w-0">

                            <div class="flex items-center justify-between gap-1">

                                <p class="text-xs font-bold text-slate-200">2. Resultados de Antecedentes</p>

                                <span class="text-[9px] font-black text-blue-300">28/04/2026</span>

                            </div>

                            <p class="text-[10px] text-slate-400 mt-0.5">Publicación de notas de antecedentes y convocatoria oficial a la etapa de Oposición.</p>

                        </div>

                    </div>



                    <!-- 3. EXAMEN EN COMPUTADORA (PC) - PRÓXIMA INSTANCIA CLAVE -->

                    <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-primary/10 border-2 border-amber-500/50 shadow-xl shadow-amber-500/10 relative overflow-hidden">

                        <div class="flex items-start gap-3">

                            <div class="size-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">

                                <span class="material-symbols-outlined text-xl">computer</span>

                            </div>

                            <div class="flex-1 min-w-0">

                                <div class="flex items-center justify-between gap-1">

                                    <span class="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black uppercase">¡Próxima Instancia!</span>

                                    <span class="text-[10px] font-black text-amber-300">04 al 13 de Mayo 2026</span>

                                </div>

                                <h4 class="text-sm font-black text-white mt-1">Examen de Oposición en PC</h4>

                                <p class="text-[11px] text-amber-200/90 mt-1 leading-relaxed">

                                    Para <strong>todos los agrupamientos y jerarquías</strong> (excepto Dir. General). Examen opción múltiple en PC con tiempo cronometrado.

                                </p>

                                <div class="mt-2.5 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px]">

                                    <span class="text-amber-300 font-bold">Mínimo para aprobar: 60 puntos</span>

                                    <button onclick="window._quizState.activeTab='simulador'; renderAcademia();" class="text-white bg-amber-500 hover:bg-amber-400 font-black px-2.5 py-1 rounded-lg transition-all active:scale-95">

                                        Practicar Ahora →

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>



                    <!-- 4. Defensa Oral de Proyecto -->

                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">

                        <div class="size-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">

                            <span class="material-symbols-outlined text-base">record_voice_over</span>

                        </div>

                        <div class="flex-1 min-w-0">

                            <div class="flex items-center justify-between gap-1">

                                <p class="text-xs font-bold text-slate-200">4. Defensa Oral de Proyectos</p>

                                <span class="text-[9px] font-bold text-slate-400">14/05 al 05/06/2026</span>

                            </div>

                            <p class="text-[10px] text-slate-400 mt-0.5">Exclusivo para Agrupamientos Supervisión y Dirección ante los jurados evaluadores.</p>

                        </div>

                    </div>



                    <!-- 5. Acta Final -->

                    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">

                        <div class="size-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">

                            <span class="material-symbols-outlined text-base">emoji_events</span>

                        </div>

                        <div class="flex-1 min-w-0">

                            <div class="flex items-center justify-between gap-1">

                                <p class="text-xs font-bold text-slate-200">5. Publicación de Acta Final</p>

                                <span class="text-[9px] font-black text-purple-300">09/06/2026</span>

                            </div>

                            <p class="text-[10px] text-slate-400 mt-0.5">Orden de mérito definitivo y adjudicación de ascensos según cupo de vacantes por Decreto 0263/26.</p>

                        </div>

                    </div>

                </div>

            </div>



            <!-- REQUISITOS EXCLUYENTES PARA RENDIR EN PC (RES. 0803/26 ANEXO ÚNICO) -->

            <div class="p-4 rounded-3xl bg-red-500/10 border border-red-500/25 space-y-3">

                <div class="flex items-center gap-2">

                    <span class="material-symbols-outlined text-red-400 text-lg">warning</span>

                    <h3 class="text-xs font-black text-red-200 uppercase tracking-wider">Requisitos Excluyentes para Rendir</h3>

                </div>

                <div class="space-y-2 text-xs text-slate-300">

                    <div class="flex items-start gap-2.5">

                        <span class="material-symbols-outlined text-red-400 text-sm shrink-0 mt-0.5">badge</span>

                        <p><strong class="text-white">ID Ciudadana Activa:</strong> Requisito informático excluyente para acceder a la PC asignada. Verificar contraseña antes del día de examen.</p>

                    </div>

                    <div class="flex items-start gap-2.5">

                        <span class="material-symbols-outlined text-red-400 text-sm shrink-0 mt-0.5">checkroom</span>

                        <p><strong class="text-white">Uniforme Reglamentario Completo:</strong> El desaliño o falta de prendas inscribe inhabilitación inmediata sin derecho a reclamo.</p>

                    </div>

                    <div class="flex items-start gap-2.5">

                        <span class="material-symbols-outlined text-red-400 text-sm shrink-0 mt-0.5">id_card</span>

                        <p><strong class="text-white">DNI y Credencial Policial:</strong> Documentación física en mano y en fecha de vigencia.</p>

                    </div>

                </div>

            </div>



            <!-- ORIENTADOR INTELIGENTE DE ESTUDIO SEGÚN TU RENDIMIENTO -->

            <div class="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/25 space-y-3">

                <div class="flex items-center gap-2">

                    <span class="material-symbols-outlined text-blue-400 text-lg">psychology</span>

                    <h3 class="text-xs font-black text-blue-200 uppercase tracking-wider">Asistente de Estudio Inteligente</h3>

                </div>



                ${failedList.length > 0 ? `

                    <div class="p-3 rounded-2xl bg-white/5 border border-white/5">

                        <p class="text-xs text-slate-200 font-bold">🎯 Tenés ${failedList.length} preguntas en tu Cuaderno de Errores</p>

                        <p class="text-[11px] text-slate-400 mt-1">Repasar tus errores es la técnica con mayor tasa de aprobación comprobada en el concurso.</p>

                        <button onclick="window._startFailedQuestionsQuiz()" class="mt-2.5 w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5 active:scale-95">

                            <span class="material-symbols-outlined text-sm">replay</span> Repasar Cuaderno de Errores (${failedList.length})

                        </button>

                    </div>

                ` : weakTopics.length > 0 ? `

                    <div class="p-3 rounded-2xl bg-white/5 border border-white/5">

                        <p class="text-xs text-slate-200 font-bold">⚠️ Tu punto más débil detectado: <span class="text-red-400">${weakTopics[0].label}</span></p>

                        <p class="text-[11px] text-slate-400 mt-1">Efectividad actual: ${weakTopics[0].rate}% (${weakTopics[0].correct}/${weakTopics[0].total}). Te recomendamos repasar ese módulo en el manual de tu jerarquía.</p>

                        <button onclick="window._quizState.activeTab='simulador'; window._selectQuestionCount(10);" class="mt-2.5 w-full py-2.5 bg-primary hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 active:scale-95">

                            <span class="material-symbols-outlined text-sm">bolt</span> Lanzar Flash Guardia (10 preguntas)

                        </button>

                    </div>

                ` : `

                    <div class="p-3 rounded-2xl bg-white/5 border border-white/5">

                        <p class="text-xs text-slate-200 font-bold">🚀 Diagnóstico inicial disponible</p>

                        <p class="text-[11px] text-slate-400 mt-1">Rendí un simulacro de 10 o 25 preguntas para que el sistema analice tus temas a reforzar con el Manual ISEP.</p>

                        <button onclick="window._quizState.activeTab='simulador'; renderAcademia();" class="mt-2.5 w-full py-2.5 bg-primary hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 active:scale-95">

                            <span class="material-symbols-outlined text-sm">rocket_launch</span> Iniciar Simulacro de Diagnóstico

                        </button>

                    </div>

                `}

            </div>



            <!-- DESCARGAS OFICIALES DEL CONCURSO -->

            <div class="space-y-2">

                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Documentación Oficial para Descargar</h3>

                <div class="grid gap-2">

                    <a href="Material_de_Ascenso_ISEP/Resolucion_0803-2026_Cronograma_Jurado_Reglamento.pdf" target="_blank" download

                        class="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between gap-3 transition-all active:scale-95">

                        <div class="flex items-center gap-3">

                            <div class="size-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">

                                <span class="material-symbols-outlined text-lg">description</span>

                            </div>

                            <div>

                                <p class="text-xs font-bold text-white">Resolución N° 0803/2026 (PDF Oficial)</p>

                                <p class="text-[10px] text-slate-400">16 páginas · Jurados, cronograma y anexo reglamentario</p>

                            </div>

                        </div>

                        <span class="material-symbols-outlined text-slate-400">download</span>

                    </a>



                    <button onclick="window._quizState.activeTab='biblioteca'; renderAcademia();"

                        class="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between gap-3 transition-all active:scale-95 text-left">

                        <div class="flex items-center gap-3">

                            <div class="size-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">

                                <span class="material-symbols-outlined text-lg">menu_book</span>

                            </div>

                            <div>

                                <p class="text-xs font-bold text-white">Manuales de Estudio por Jerarquía (16 PDFs)</p>

                                <p class="text-[10px] text-slate-400">Acceso a la biblioteca completa de manuales oficiales</p>

                            </div>

                        </div>

                        <span class="material-symbols-outlined text-slate-400">chevron_right</span>

                    </button>

                </div>

            </div>

        </div>

    `;

}



window._handleNotifyIsepProPayment = async function() {
    const userEmail = typeof store !== 'undefined' && store.user ? (store.user.email || '') : '';
    const userName = typeof store !== 'undefined' && store.user ? (store.user.name || store.user.displayName || 'Oficial') : 'Oficial';
    const hierarchy = (window._quizState && window._quizState.selectedHierarchy) || 'ISEP PRO 2026';

    // 1. Notificar a Firestore y Supabase para que aparezca en el panel #admin
    if (typeof DB !== 'undefined' && DB.notifyAcademyPayment) {
        try {
            await DB.notifyAcademyPayment({
                email: userEmail,
                name: userName,
                amount: 5000,
                hierarchy: hierarchy
            });
        } catch(e) {
            console.warn("Error notifying academy payment:", e);
        }
    }

    // 2. Abrir WhatsApp oficial con comprobante
    const msg = `Hola! Quiero activar mi suscripción única a ISEP PRO ($5.000 - Promo 50% OFF) para el Simulador de Ascenso en Adicionales Santa Fe.\n\n👤 Oficial: ${userName}\n📧 Email registrado: ${userEmail}\n\nAdjunto comprobante de transferencia a SmartFlow.Digital.`;
    const waUrl = `https://wa.me/5493425162372?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    // 3. Informar al usuario - NO se habilita en local; requiere aprobación del admin
    if (typeof showToast === 'function') {
        showToast("✅ Solicitud registrada. Al verificar tu comprobante por WhatsApp se habilitará tu cuenta.");
    }
    const modalEl = document.getElementById('isep-pro-modal');
    if (modalEl) modalEl.remove();
};
