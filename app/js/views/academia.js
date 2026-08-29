/**
 * Adicionales Santa Fe - Campus de Ascenso Policial (NotebookLM Studio PRO)
 * La Mejor Plataforma de Estudio y Herramientas del Mundo para Ascenso Policial
 * Doctrina Oficial ISEP 2026 y Ley 12.521 de la Provincia de Santa Fe
 */

function renderAcademia(container) {
    if (!container) container = document.getElementById('app');
    let viewContainer = container;

    const data = window.academyData;
    
    // --- LOAD STATIC AND CUSTOM USER SOURCES ---
    let customSources = [];
    try {
        customSources = JSON.parse(localStorage.getItem('academy_custom_sources') || '[]');
    } catch(e) {}
    
    const libraryItems = [...(window.academyLibraryItems || []), ...customSources];

    if (!data || !data.hierarchies) {
        container.innerHTML = `<div class="p-6 text-center text-slate-400">Cargando datos del NotebookLM...</div>`;
        return;
    }

    // --- STATE SYSTEM ---
    if (!window.academySelectedSources) {
        window.academySelectedSources = {
            'ley-12521': true,
            'decreto-461-15': true,
            'ley-14283': false,
            'decreto-411-26': false,
            'miraf': false
        };
    }
    const hierarchyId = localStorage.getItem('academy_setup_hierarchy') || data.hierarchies[0].id;
    window.academySelectedHierarchy = hierarchyId;
    window.academyActiveTab = window.academyActiveTab || 'tutor';
    window.currentExamAnswers = window.currentExamAnswers || {};
    window.examSubmitted = window.examSubmitted || false;
    
    // Leitner system flashcard states
    window.currentFlashcardIndex = window.currentFlashcardIndex || 0;
    window.flashcardFlipped = window.flashcardFlipped || false;
    window.flashcardLeitnerState = window.flashcardLeitnerState || {}; // cardId -> 'easy' | 'medium' | 'hard'

    window.currentPlayingUnitId = window.currentPlayingUnitId || null;
    window.isPodcastPlaying = window.isPodcastPlaying || false;
    window.podcastSpeed = window.podcastSpeed || 1;
    window.currentSlideIndex = window.currentSlideIndex || 0;
    window.slideTheme = window.slideTheme || 'midnight'; // 'midnight' | 'sepia' | 'slate'
    window.librarySearchQuery = window.librarySearchQuery || '';
    window.libraryActiveFilter = window.libraryActiveFilter || 'all';

    // Interactive video step state
    window.activeVideoStep = window.activeVideoStep || 1;

    // Gamification states (Local Storage)
    let studyStreak = parseInt(localStorage.getItem('academy_study_streak') || '0', 10);
    const lastStudyDate = localStorage.getItem('academy_last_study_date');
    const todayStr = new Date().toDateString();

    if (lastStudyDate !== todayStr) {
        if (lastStudyDate === new Date(Date.now() - 86400000).toDateString()) {
            studyStreak++;
        } else if (lastStudyDate !== todayStr) {
            studyStreak = 1;
        }
        localStorage.setItem('academy_study_streak', studyStreak.toString());
        localStorage.setItem('academy_last_study_date', todayStr);
    }

    const hierarchy = data.hierarchies.find(h => h.id === window.academySelectedHierarchy) || data.hierarchies[0];

    const styleBlock = `
        <style>
            .notebook-split-container {
                display: grid;
                grid-template-columns: 280px 1fr 340px;
                height: calc(100vh - 4rem);
                background-color: #080a11;
                overflow: hidden;
            }
            @media (max-width: 1200px) {
                .notebook-split-container {
                    grid-template-columns: 260px 1fr;
                }
                .notebook-studio-pane {
                    display: none !important;
                }
            }
            @media (max-width: 800px) {
                .notebook-split-container {
                    grid-template-columns: 1fr;
                }
                .notebook-sidebar, .notebook-studio-pane {
                    display: none !important;
                }
            }
            .notebook-sidebar {
                background: #0d111b;
                border-right: 1px solid rgba(255, 255, 255, 0.08);
                overflow-y: auto;
            }
            .notebook-studio-pane {
                background: #0d111b;
                border-left: 1px solid rgba(255, 255, 255, 0.08);
                overflow-y: auto;
            }
            .glass-card-notebook {
                background: rgba(18, 25, 41, 0.6);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.06);
                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                border-radius: 20px;
            }
            .workspace-card {
                background: rgba(16, 24, 39, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 24px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .workspace-card:hover {
                border-color: rgba(99, 102, 241, 0.3);
                background: rgba(16, 24, 39, 0.8);
                transform: translateY(-2px);
            }
            .flashcard-wrapper { perspective: 1200px; }
            .flashcard-card { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
            .flashcard-card.is-flipped { transform: rotateY(180deg); }
            .flashcard-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
            .flashcard-back { transform: rotateY(180deg); }
            .equalizer-bar { animation: equalizer 0.8s ease-in-out infinite alternate; }
            @keyframes equalizer { 0% { height: 4px; } 100% { height: 24px; } }
            .ambient-glow {
                background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(0,0,0,0) 70%);
                pointer-events: none;
            }
            /* Scrollbar styling */
            .scrollbar-custom::-webkit-scrollbar {
                width: 4px;
                height: 4px;
            }
            .scrollbar-custom::-webkit-scrollbar-track {
                background: transparent;
            }
            .scrollbar-custom::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
            }
            .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            /* Slide themes */
            .slide-theme-midnight { background: #020617; color: #f8fafc; border-color: rgba(255,255,255,0.05); }
            .slide-theme-sepia { background: #f4ecd8; color: #433422; border-color: #e4d7ba; }
            .slide-theme-slate { background: #1e293b; color: #f1f5f9; border-color: #334155; }
        </style>
    `;

    // --- MAIN RENDER FUNCTION ---
    function getHTML() {
        const checkedCount = Object.values(window.academySelectedSources).filter(Boolean).length;
        const hasGeminiKey = !!(window.getGeminiAPIKey && window.getGeminiAPIKey());
        const hierarchy = data.hierarchies.find(h => h.id === window.academySelectedHierarchy) || data.hierarchies[0];

        return `
            ${styleBlock}
            
            <!-- Global Premium Header -->
            <header class="sticky top-0 z-50 bg-[#080c16]/95 backdrop-blur-xl border-b border-white/10 px-6 h-16 flex items-center justify-between shadow-lg">
                <div class="flex items-center gap-3">
                    <button onclick="router.navigateTo('#asistente')" class="size-9 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors active:scale-95">
                        <span class="material-symbols-outlined text-lg">arrow_back</span>
                    </button>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-indigo-400 text-lg animate-pulse">auto_awesome</span>
                        <select onchange="window.switchAcademyHierarchy(this.value)" class="bg-transparent border-none rounded-xl text-sm text-white outline-none font-black max-w-[280px] cursor-pointer">
                            ${data.hierarchies.map(h => `
                                <option value="${h.id}" ${window.academySelectedHierarchy === h.id ? 'selected' : ''} class="bg-[#0c0f17] text-white">
                                    ${h.title}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                
                <!-- Center Actions exactly like NotebookLM -->
                <div class="hidden md:flex items-center gap-2.5">
                    <button class="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[9px] px-3.5 py-1.5 rounded-full font-black uppercase tracking-wider transition-all flex items-center gap-1.5 active:scale-95">
                        <span class="material-symbols-outlined text-xs">add</span> Crear un cuaderno
                    </button>
                    <button class="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 text-[9px] px-3 py-1.5 rounded-full font-bold uppercase transition-all">
                        Copiar
                    </button>
                    <button onclick="window.switchAcademyTab('tutor')" class="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 text-[9px] px-3 py-1.5 rounded-full font-bold uppercase transition-all">
                        Estadísticas
                    </button>
                    <button class="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 text-[9px] px-3 py-1.5 rounded-full font-bold uppercase transition-all">
                        Compartir
                    </button>
                </div>
                
                <div class="flex items-center gap-3">
                    <button onclick="window.showGeminiKeyModal()" class="px-3 py-1.5 rounded-xl border transition-all active:scale-95 text-[9px] font-bold uppercase flex items-center gap-1.5 ${hasGeminiKey ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'}">
                        <span class="material-symbols-outlined text-xs">${hasGeminiKey ? 'key' : 'key_off'}</span>
                        ${hasGeminiKey ? 'API OK' : 'Clave AI'}
                    </button>
                    <!-- Profile avatar exactly like NotebookLM -->
                    <div class="size-8 rounded-full bg-indigo-600 border border-indigo-400 text-white font-black text-xs flex items-center justify-center shadow-md">
                        N
                    </div>
                </div>
            </header>

            <div class="notebook-split-container relative">
                <div class="absolute inset-0 ambient-glow z-0"></div>

                <!-- COLUMN 1: LEFT SIDEBAR - Fuentes -->
                <aside class="notebook-sidebar p-5 flex flex-col justify-between z-10 scrollbar-custom">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between border-b border-white/5 pb-2">
                            <h3 class="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-indigo-400 text-sm">folder_open</span>
                                Fuentes
                            </h3>
                            <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                ${checkedCount}/${libraryItems.length}
                            </span>
                        </div>

                        <!-- Add Source Pill Button -->
                        <button onclick="window.showAddSourceModal()" class="w-full py-3 rounded-full bg-[#1b2234] hover:bg-[#252f48] border border-white/10 text-white font-bold text-[10px] uppercase flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md">
                            <span class="material-symbols-outlined text-xs font-black">add</span>
                            Agregar fuentes
                        </button>

                        <!-- Search Box like NotebookLM -->
                        <div class="space-y-2">
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-xs">search</span>
                                <input type="text" id="librarySearchInput" oninput="window.filterLibrarySources(this.value)" placeholder="Buscar fuentes nuevas en la Web..." 
                                    class="w-full bg-[#121929] border border-white/5 rounded-full py-2.5 pl-9 pr-3 text-[10px] text-white placeholder:text-slate-500 outline-none focus:border-indigo-500">
                            </div>
                            <div class="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[8px]">
                                <button onclick="window.setLibraryFilter('all')" class="px-2.5 py-1 rounded-lg font-bold border transition-all ${window.libraryActiveFilter === 'all' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-white/5 text-slate-400 border-white/5'}">Todo</button>
                                <button onclick="window.setLibraryFilter('manuales-2026')" class="px-2.5 py-1 rounded-lg font-bold border transition-all ${window.libraryActiveFilter === 'manuales-2026' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-white/5 text-slate-400 border-white/5'}">ISEP 2026</button>
                                <button onclick="window.setLibraryFilter('proyectos')" class="px-2.5 py-1 rounded-lg font-bold border transition-all ${window.libraryActiveFilter === 'proyectos' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-white/5 text-slate-400 border-white/5'}">Proyectos</button>
                                <button onclick="window.setLibraryFilter('leyes')" class="px-2.5 py-1 rounded-lg font-bold border transition-all ${window.libraryActiveFilter === 'leyes' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-white/5 text-slate-400 border-white/5'}">Leyes</button>
                                <button onclick="window.setLibraryFilter('custom')" class="px-2.5 py-1 rounded-lg font-bold border transition-all ${window.libraryActiveFilter === 'custom' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-white/5 text-slate-400 border-white/5'}">Notas</button>
                            </div>
                        </div>

                        <!-- Source List -->
                        <div class="space-y-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-custom">
                            ${renderLibraryItemsHTML()}
                        </div>
                    </div>

                    <!-- Sidebar Footer -->
                    <div class="pt-4 border-t border-white/5 text-[9px] text-slate-500 space-y-1.5">
                        <p class="flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-xs">info</span>
                            Habilita fuentes para alimentar tu cuaderno.
                        </p>
                    </div>
                </aside>

                <!-- COLUMN 2: MIDDLE PANE - Workspace -->
                <main class="flex flex-col justify-between h-full overflow-hidden border-r border-white/5 bg-[#080a11] z-10">
                    <!-- Workspace Header -->
                    <div class="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0c101b]/80 backdrop-blur z-20">
                        <div class="flex items-center gap-2">
                            ${window.academyActiveTab !== 'tutor' ? `
                                <button onclick="window.switchAcademyTab('tutor')" class="size-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                                    <span class="material-symbols-outlined text-sm font-black">arrow_back</span>
                                </button>
                            ` : ''}
                            <div>
                                <h2 class="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                                    ${window.academyActiveTab === 'tutor' ? 'Chat con IA' : 
                                      window.academyActiveTab === 'podcast' ? 'Podcast de Doctrina' : 
                                      window.academyActiveTab === 'summaries' ? 'Resúmenes de Materias' : 
                                      window.academyActiveTab === 'proyectos' ? 'Asistente de Proyectos' : 
                                      window.academyActiveTab === 'exam' ? 'Simulador de Examen' : 
                                      window.academyActiveTab === 'flashcards' ? 'Fichas 3D Leitner' : 
                                      window.academyActiveTab === 'mindmaps' ? 'Esquemas de Estudio' : 
                                      window.academyActiveTab === 'videos' ? 'Táctica Operativa' : 
                                      window.academyActiveTab === 'slides' ? 'Presentación ISEP' : 
                                      window.academyActiveTab === 'infographics' ? 'Infografía Operativa' : 'Studio'}
                                </h2>
                                <p class="text-[8px] text-indigo-300 font-bold uppercase tracking-widest mt-0.5">
                                    ${checkedCount} fuentes habilitadas
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            <button class="size-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400">
                                <span class="material-symbols-outlined text-sm">tune</span>
                            </button>
                            <button class="size-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400">
                                <span class="material-symbols-outlined text-sm">more_vert</span>
                            </button>
                        </div>
                    </div>

                    <!-- Workspace Scrollable Content Area -->
                    <div class="flex-1 overflow-y-auto p-6 scrollbar-custom">
                        ${window.academyActiveTab === 'tutor' ? renderGeminiTutorTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'podcast' ? renderPodcastTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'summaries' ? renderSummariesTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'proyectos' ? renderProyectosTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'exam' ? renderExamTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'flashcards' ? renderFlashcardsTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'mindmaps' ? renderMindmapsTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'videos' ? renderVideosTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'slides' ? renderSlidesTab(hierarchy) : ''}
                        ${window.academyActiveTab === 'infographics' ? renderInfographicsTab(hierarchy) : ''}
                    </div>
                </main>

                <!-- COLUMN 3: RIGHT PANEL - Studio -->
                <aside class="notebook-studio-pane p-5 z-10 scrollbar-custom">
                    ${renderStudioPaneHTML(hierarchy)}
                </aside>
            </div>
        `;
    }

    // --- SIDEBAR SOURCE LIST RENDER ---
    function renderLibraryItemsHTML() {
        const filtered = libraryItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(window.librarySearchQuery.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(window.librarySearchQuery.toLowerCase());
            const matchesFilter = window.libraryActiveFilter === 'all' || item.category === window.libraryActiveFilter;
            return matchesSearch && matchesFilter;
        });

        if (filtered.length === 0) {
            return `<div class="p-4 text-center text-slate-500 text-[10px]">No se encontraron manuales.</div>`;
        }

        return filtered.map(item => {
            const isChecked = !!window.academySelectedSources[item.id];
            const isCustom = item.id.startsWith('custom-');
            return `
                <div class="p-3 rounded-2xl border transition-all duration-200 relative overflow-hidden bg-slate-900/60 ${isChecked ? 'border-indigo-500/40 bg-indigo-950/10 shadow-lg' : 'border-white/5'}">
                    <div class="flex items-start justify-between gap-2.5">
                        <div class="flex gap-2.5 min-w-0 flex-1">
                            <div class="size-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 border border-white/5">
                                <span class="material-symbols-outlined text-base">${item.icon}</span>
                            </div>
                            <div class="min-w-0">
                                <h4 class="font-bold text-[10px] text-white leading-tight truncate">${item.title}</h4>
                                <p class="text-[8px] text-slate-400 leading-normal line-clamp-1 mt-0.5">${item.desc}</p>
                                <div class="flex items-center gap-1.5 mt-1.5">
                                    <span class="px-1.5 py-0.5 rounded text-[6px] font-black uppercase ${item.category === 'manuales-2026' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'}">
                                        ${item.badge}
                                    </span>
                                    <span class="text-[7px] text-slate-500 font-mono">
                                        ${isCustom ? (Math.round(item.content.length / 500) + 1) + ' pgs' : '114 pgs'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col items-end justify-between h-full gap-2">
                            <!-- Toggle switch -->
                            <label class="toggle-switch transform scale-75 cursor-pointer">
                                <input type="checkbox" ${isChecked ? 'checked' : ''} onclick="window.toggleSourceSelection('${item.id}')">
                                <span class="toggle-slider"></span>
                            </label>
                            ${isCustom ? `
                                <button onclick="window.deleteCustomSource('${item.id}')" class="size-6 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/20 transition-all" title="Eliminar Nota">
                                    <span class="material-symbols-outlined text-[10px]">delete</span>
                                </button>
                            ` : `
                                <a href="${item.file}" download class="size-6 rounded-md bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all" title="Descargar PDF">
                                    <span class="material-symbols-outlined text-[10px]">download</span>
                                </a>
                            `}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- TAB: STUDIO HUB (GAMIFICATION & AUDIO PODCAST) ---
    function renderNotebookStudioTab(hierarchy) {
        return `
            <div class="space-y-6 animate-fade-in">
                <!-- GAMIFICATION & STUDY PROGRESS DASHBOARD -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <!-- Daily Streak -->
                    <div class="p-4 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900 to-orange-950/20 flex items-center gap-4">
                        <div class="size-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center justify-center shadow-lg animate-bounce" style="animation-duration: 2s;">
                            <span class="material-symbols-outlined text-2xl">local_fire_department</span>
                        </div>
                        <div>
                            <span class="text-[8px] font-black uppercase text-orange-400 tracking-wider">Racha Diaria</span>
                            <h4 class="text-base font-black text-white">${studyStreak} Días Seguidos</h4>
                        </div>
                    </div>
                    <!-- General Prep Level -->
                    <div class="p-4 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 to-indigo-950/20 flex items-center gap-4">
                        <div class="size-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-lg">
                            <span class="material-symbols-outlined text-2xl">trending_up</span>
                        </div>
                        <div>
                            <span class="text-[8px] font-black uppercase text-indigo-400 tracking-wider">Preparación General</span>
                            <h4 class="text-base font-black text-white">78% Listo</h4>
                        </div>
                    </div>
                    <!-- Active Achievement -->
                    <div class="p-4 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-950/20 flex items-center gap-4">
                        <div class="size-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                            <span class="material-symbols-outlined text-2xl">workspace_premium</span>
                        </div>
                        <div>
                            <span class="text-[8px] font-black uppercase text-emerald-400 tracking-wider">Rango Actual</span>
                            <h4 class="text-base font-black text-white">Oficial Destacado</h4>
                        </div>
                    </div>
                </div>

                <!-- AI AUDIO PODCAST OVERVIEW (Google NotebookLM signature feature) -->
                <div class="glass-card-notebook p-6 bg-gradient-to-br from-slate-950 via-[#101426] to-slate-950 border-indigo-500/20 relative overflow-hidden space-y-4 shadow-2xl">
                    <div class="absolute -right-20 -top-20 size-52 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="size-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shadow-lg">
                                <span class="material-symbols-outlined text-2xl animate-pulse">podcasts</span>
                            </div>
                            <div>
                                <span class="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    NotebookLM Audio Overview
                                </span>
                                <h3 class="text-sm font-black text-white uppercase tracking-wider mt-1">Podcast de Estudio Doctrinario</h3>
                            </div>
                        </div>
                    </div>

                    <p class="text-[11px] text-slate-300 leading-relaxed max-w-2xl">
                        Escuchá el debate interactivo de nuestros expertos. La transcripción se desplazará de manera síncrona con el audio de los manuales oficiales de oposición ISEP.
                    </p>

                    <!-- Waveform and Controls -->
                    <div class="p-4 rounded-2xl bg-slate-900/90 border border-white/5 space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <button onclick="window.toggleAudioPodcastOverview()" class="size-14 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all">
                                    <span class="material-symbols-outlined text-3xl">${window.isPodcastPlaying ? 'pause' : 'play_arrow'}</span>
                                </button>
                                <div>
                                    <p class="text-xs font-bold text-white">Doctrina Operativa & Régimen Disciplinario 2026</p>
                                    <p class="text-[9px] text-indigo-300 font-mono flex items-center gap-1 mt-0.5">
                                        <span class="material-symbols-outlined text-[10px]">graphic_eq</span>
                                        ${window.isPodcastPlaying ? `Reproduciendo a ${window.podcastSpeed}x...` : 'Listo para reproducir (12 min)'}
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Speed Control -->
                            <button onclick="window.togglePodcastSpeed()" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[9px] text-slate-300 font-bold uppercase transition-all">
                                ${window.podcastSpeed}x Velocidad
                            </button>
                        </div>

                        <!-- Real Waveform Simulator -->
                        <div class="flex items-end gap-1.5 justify-center h-8 pt-1">
                            ${[...Array(16)].map((_, i) => `
                                <div class="w-[3px] bg-indigo-500/80 rounded-full transition-all duration-300 ${window.isPodcastPlaying ? 'equalizer-bar' : 'h-1.5'}" 
                                     style="animation-delay: ${0.1 * i}s; animation-duration: ${0.6 + Math.random() * 0.4}s;"></div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Interactive Live Transcript -->
                    <div class="p-4 bg-slate-950 rounded-2xl border border-white/5 text-[10px] space-y-2.5 max-h-[140px] overflow-y-auto scrollbar-none font-mono">
                        <p class="${window.isPodcastPlaying ? 'text-indigo-400 font-bold' : 'text-slate-500'}">
                            🎙️ [ROSSI - Profesor ISEP]: "Bienvenidos a esta síntesis del ISEP. El secuestro de armas es vital: la descarga debe ser ante testigos."
                        </p>
                        <p class="text-slate-500">
                            🎙️ [GÓMEZ - Abogada]: "Exacto Carlos. Y la Ley 12.521 distingue cesantía de exoneración por la pérdida del cómputo previsional."
                        </p>
                    </div>
                </div>

                <!-- Studio Action Cards Grid (NotebookLM Studio Tiles) -->
                <div class="space-y-3">
                    <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider px-1">Secciones del Notebook</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        <!-- Tile 1: Evaluaciones -->
                        <div onclick="window.switchAcademyTab('exam')" class="workspace-card p-5 cursor-pointer space-y-4">
                            <div class="size-10 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-xl">quiz</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-xs text-white">Evaluaciones de Oposición</h4>
                                <p class="text-[9px] text-slate-400 leading-normal mt-1">Simulador de 50 preguntas múltiples y verdadero/falso.</p>
                            </div>
                        </div>

                        <!-- Tile 2: Proyectos ISEP -->
                        <div onclick="window.switchAcademyTab('proyectos')" class="workspace-card p-5 cursor-pointer space-y-4">
                            <div class="size-10 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-xl">assignment</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-xs text-white">Redactor de Proyectos</h4>
                                <p class="text-[9px] text-slate-400 leading-normal mt-1">Estructura oficial para agrupamiento Supervisión y Dirección.</p>
                            </div>
                        </div>

                        <!-- Tile 3: Fichas 3D -->
                        <div onclick="window.switchAcademyTab('flashcards')" class="workspace-card p-5 cursor-pointer space-y-4">
                            <div class="size-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                                <span class="material-symbols-outlined text-xl">style</span>
                            </div>
                            <div>
                                <h4 class="font-bold text-xs text-white">Tarjetas 3D Didácticas</h4>
                                <p class="text-[9px] text-slate-400 leading-normal mt-1">Herramientas de memorización con Leitner Spaced Repetition.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- TAB: STUDY SUMMARIES & PRESETS ---
    function renderSummariesTab(hierarchy) {
        return `
            <div class="space-y-4 animate-fade-in">
                <div class="glass-card-notebook p-5 bg-[#121929]/80 space-y-3">
                    <div class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-indigo-400">summarize</span>
                        <h3 class="text-xs font-black uppercase text-white">Generador de Síntesis y Resúmenes IA</h3>
                    </div>
                    <p class="text-[11px] text-slate-400 leading-relaxed">
                        Escribí el tema que querés resumir (ej: "Liderazgo ISEP", "Cesantía", "MIRAF medidas de seguridad"). El sistema compilará las fuentes indexadas.
                    </p>
                    <div class="flex gap-2">
                        <input type="text" id="customReportTopic" placeholder="Ej: Protocolo de descarga de armas, Licencias Decreto 4157..." 
                            class="flex-1 px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-indigo-500">
                        <button onclick="window.generateCustomReport(event)" class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl active:scale-95 transition-all">
                            Generar
                        </button>
                    </div>
                </div>

                <div class="space-y-4">
                    ${hierarchy.summaries.map(sum => `
                        <div class="p-6 rounded-3xl border border-white/5 bg-slate-900/40 hover:border-white/10 transition-all space-y-3">
                            <div class="flex items-start justify-between gap-4">
                                <div>
                                    <span class="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                        Materia de Cursado
                                    </span>
                                    <h4 class="font-bold text-sm text-white mt-1.5 leading-snug">${sum.title}</h4>
                                </div>
                                <button onclick="window.playAudiobook('${encodeURIComponent(sum.title)}', '${encodeURIComponent(sum.content.replace(/<[^>]*>?/gm, ''))}', '${sum.id}')"
                                    class="size-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center active:scale-90 transition-all">
                                    <span class="material-symbols-outlined text-lg">${window.currentPlayingUnitId === sum.id ? 'stop' : 'volume_up'}</span>
                                </button>
                            </div>
                            <div class="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-5 rounded-2xl border border-white/5 font-sans">
                                ${sum.content}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // --- TAB: ISEP PROJECTS BUILDER ---
    function renderProyectosTab(hierarchy) {
        return `
            <div class="space-y-4 animate-fade-in">
                <div class="glass-card-notebook p-5 bg-[#121929]/80 space-y-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-purple-400 text-xl animate-pulse">auto_awesome</span>
                        <div>
                            <h3 class="text-xs font-black uppercase text-white">Asistente de Proyectos de Gestión</h3>
                            <p class="text-[9px] text-purple-300 font-bold uppercase tracking-wider">Conforme a la estructura ISEP 2026</p>
                        </div>
                    </div>
                    
                    <p class="text-[11px] text-slate-400 leading-relaxed">
                        Seleccioná un tema y el sistema generará los 6 puntos fundamentales para tu proyecto del concurso de ascenso:
                    </p>

                    <div class="space-y-3">
                        <select id="projectPresetSelect" onchange="document.getElementById('customProjectTopic').value = this.value" class="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-purple-500 font-bold">
                            <option value="Plan de Patrullaje Preventivo Georreferenciado y Cuadrantes">Plan de Patrullaje Inteligente 911</option>
                            <option value="Reestructuración de Comisarías y Atención al Público">Reestructuración de Comisarías Urgentes</option>
                            <option value="Programa de Capacitación Práctica en Armamento y Tiro MIRAF">Capacitación y Seguridad Operativa MIRAF</option>
                            <option value="Protocolo Integral de Prevención de Escruches y Robo de Cables">Prevención de Delitos Predatorios en Jurisdicción</option>
                        </select>
                        <input type="text" id="customProjectTopic" value="Plan de Patrullaje Preventivo Georreferenciado y Cuadrantes" class="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-purple-500 font-bold">
                        
                        <button onclick="window.generateISEPProject(event)" class="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg active:scale-95 transition-all">
                            Elaborar Proyecto
                        </button>
                    </div>
                </div>

                <div id="projectOutputContainer" class="hidden animate-fade-in"></div>
            </div>
        `;
    }

    // --- TAB: 50 QUESTIONS EXAM & DIAGNOSTIC REPORT ---
    function renderExamTab(hierarchy) {
        const isCustom = !!window.customAIQuestions;
        const questions = isCustom ? window.customAIQuestions : hierarchy.exams;
        const total = questions.length;
        let score = 0;
        let answeredCount = Object.keys(window.currentExamAnswers).length;

        // Breakdown stats
        let leadershipScore = 0, leadershipTotal = 0;
        let procScore = 0, procTotal = 0;
        let disciplineScore = 0, disciplineTotal = 0;

        if (window.examSubmitted) {
            questions.forEach((q, idx) => {
                const isCorrect = window.currentExamAnswers[idx] === q.correctIndex;
                if (isCorrect) score++;

                // Group by category if available
                const category = q.explanation.toLowerCase();
                if (category.includes('liderazgo') || category.includes('virtudes') || category.includes('c\'s')) {
                    leadershipTotal++;
                    if (isCorrect) leadershipScore++;
                } else if (category.includes('arma') || category.includes('procedimiento') || category.includes('secuestro') || category.includes('custodia')) {
                    procTotal++;
                    if (isCorrect) procScore++;
                } else {
                    disciplineTotal++;
                    if (isCorrect) disciplineScore++;
                }
            });
        }

        const pct = total > 0 ? Math.round((score / total) * 100) : 0;

        return `
            <div class="space-y-4 animate-fade-in">
                <!-- Exam Generator Panel -->
                <div class="glass-card-notebook p-5 bg-[#121929]/80 space-y-4">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-indigo-400">quiz</span>
                        <h3 class="text-xs font-black uppercase text-white">Simulador de Examen de Oposición</h3>
                    </div>
                    <p class="text-[11px] text-slate-400 leading-relaxed">
                        Configurá tu simulador de evaluación. El sistema compilará preguntas aleatorias de múltiple opción y de verdadero/falso.
                    </p>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-[8px] font-bold text-slate-400 uppercase mb-1">Cantidad de preguntas</label>
                            <select id="examQtySelect" class="w-full px-3 py-2 bg-slate-950 border border-white/5 rounded-xl text-xs text-white font-bold outline-none">
                                <option value="10">10 Preguntas</option>
                                <option value="25">25 Preguntas</option>
                                <option value="50" selected>50 Preguntas (Oficial)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[8px] font-bold text-slate-400 uppercase mb-1">Formato</label>
                            <select id="examTypeSelect" class="w-full px-3 py-2 bg-slate-950 border border-white/5 rounded-xl text-xs text-white font-bold outline-none">
                                <option value="mixto">Mixto (MC + V/F)</option>
                                <option value="multiple">Sólo Múltiple Opción</option>
                                <option value="vf">Sólo Verdadero/Falso</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button onclick="window.startStandardExam()" class="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all">
                            Iniciar Examen
                        </button>
                        <button onclick="window.generateAIExam(event)" class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1">
                            <span class="material-symbols-outlined text-xs animate-pulse">auto_awesome</span> Generar con IA
                        </button>
                    </div>
                </div>

                ${window.examSubmitted ? `
                    <!-- Detailed Diagnostic Report Card -->
                    <div class="p-6 bg-slate-900 border border-white/10 rounded-3xl space-y-4 shadow-xl">
                        <div class="flex items-center justify-between">
                            <div class="space-y-1">
                                <p class="text-[8px] font-black uppercase text-slate-500 tracking-wider">Diagnóstico de Aptitud ISEP</p>
                                <h3 class="text-base font-black ${pct >= 60 ? 'text-emerald-400' : 'text-red-400'}">${pct >= 60 ? 'APROBADO' : 'REPROBADO'}</h3>
                                <p class="text-[10px] text-slate-400">${score} correctas de ${total} (${pct}%)</p>
                            </div>
                            <div class="relative size-16 flex items-center justify-center shrink-0">
                                <svg class="size-full -rotate-90">
                                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.05)" stroke-width="4" />
                                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="${pct >= 60 ? '#10b981' : '#ef4444'}" stroke-width="4"
                                        stroke-dasharray="175.9" stroke-dashoffset="${175.9 - (175.9 * pct) / 100}" stroke-linecap="round" />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
                                    ${pct}%
                                </div>
                            </div>
                        </div>

                        <!-- Category breakdowns -->
                        <div class="border-t border-white/5 pt-3.5 space-y-2.5 text-[10px]">
                            <p class="font-bold text-slate-300 uppercase tracking-wider text-[9px]">Rendimiento por Categoría:</p>
                            
                            <div class="space-y-1">
                                <div class="flex justify-between">
                                    <span class="text-slate-400">Liderazgo & Conducción:</span>
                                    <span class="font-bold text-white">${leadershipTotal > 0 ? Math.round((leadershipScore / leadershipTotal) * 100) : 100}%</span>
                                </div>
                                <div class="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                                    <div class="h-full bg-indigo-500 rounded-full" style="width: ${leadershipTotal > 0 ? (leadershipScore / leadershipTotal) * 100 : 100}%"></div>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <div class="flex justify-between">
                                    <span class="text-slate-400">Procedimientos Operativos & Secuestros:</span>
                                    <span class="font-bold text-white">${procTotal > 0 ? Math.round((procScore / procTotal) * 100) : 100}%</span>
                                </div>
                                <div class="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                                    <div class="h-full bg-emerald-500 rounded-full" style="width: ${procTotal > 0 ? (procScore / procTotal) * 100 : 100}%"></div>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <div class="flex justify-between">
                                    <span class="text-slate-400">Régimen Disciplinario & Leyes:</span>
                                    <span class="font-bold text-white">${disciplineTotal > 0 ? Math.round((disciplineScore / disciplineTotal) * 100) : 100}%</span>
                                </div>
                                <div class="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                                    <div class="h-full bg-purple-500 rounded-full" style="width: ${disciplineTotal > 0 ? (disciplineScore / disciplineTotal) * 100 : 100}%"></div>
                                </div>
                            </div>

                            <p class="text-[9px] text-amber-300 italic pt-1 leading-relaxed">
                                💡 <strong>Recomendación del Tutor:</strong> ${pct < 80 ? 'Reforzá tu repaso en la sección de Procedimientos y Fichas 3D del menú para asegurar la máxima calificación.' : '¡Excelente nivel doctrinal! Mantené el ritmo diario de estudio.'}
                            </p>
                        </div>
                    </div>
                ` : ''}

                <!-- Question list -->
                <div class="space-y-4">
                    ${questions.map((q, idx) => {
                        const selected = window.currentExamAnswers[idx];
                        return `
                            <div class="p-5 rounded-3xl border border-white/5 bg-slate-900/60 space-y-3">
                                <div class="flex items-start gap-3">
                                    <span class="size-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                                    <div>
                                        ${q.type === 'vf' ? '<span class="px-2 py-0.5 rounded text-[7px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block mb-1">Verdadero / Falso</span>' : ''}
                                        <h4 class="font-bold text-xs text-white leading-relaxed">${q.question}</h4>
                                    </div>
                                </div>

                                <div class="space-y-2 pl-9">
                                    ${q.options.map((opt, optIdx) => {
                                        let style = "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10";
                                        if (selected === optIdx) {
                                            style = "bg-indigo-600/20 border-indigo-500 text-indigo-400 font-bold";
                                        }
                                        if (window.examSubmitted) {
                                            if (optIdx === q.correctIndex) {
                                                style = "bg-emerald-500/20 border-emerald-500/60 text-emerald-400 font-bold";
                                            } else if (selected === optIdx && selected !== q.correctIndex) {
                                                style = "bg-red-500/20 border-red-500/60 text-red-400 font-bold";
                                            }
                                        }
                                        return `
                                            <button onclick="window.selectExamOption(${idx}, ${optIdx})" ${window.examSubmitted ? 'disabled' : ''}
                                                class="w-full text-left p-3.5 rounded-2xl border text-xs transition-all active:scale-[0.98] flex items-center justify-between ${style}">
                                                <span>${opt}</span>
                                            </button>
                                        `;
                                    }).join('')}
                                </div>

                                ${window.examSubmitted ? `
                                    <div class="p-3.5 rounded-2xl bg-slate-950 text-[10px] text-slate-400 leading-relaxed border border-white/5 space-y-1">
                                        <p class="font-bold text-emerald-400 flex items-center gap-1.5">
                                            <span class="material-symbols-outlined text-xs">gavel</span>
                                            Fundamento Doctrinario y Legal:
                                        </p>
                                        <p>${q.explanation}</p>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                <div class="pt-3">
                    ${!window.examSubmitted ? `
                        <button onclick="window.submitAcademyExam()" class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all">
                            Entregar Examen
                        </button>
                    ` : `
                        <button onclick="window.resetAcademyExam()" class="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all">
                            Reiniciar Simulador
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    // --- TAB: LEITNER FLASHCARDS 3D ---
    function renderFlashcardsTab(hierarchy) {
        const flashcards = hierarchy.flashcards;
        const current = flashcards[window.currentFlashcardIndex] || flashcards[0];

        // Leitner card mastery calculations
        const totalCards = flashcards.length;
        const masteredCount = Object.values(window.flashcardLeitnerState).filter(s => s === 'easy').length;
        const reviewingCount = Object.values(window.flashcardLeitnerState).filter(s => s === 'medium').length;
        const difficultCount = Object.values(window.flashcardLeitnerState).filter(s => s === 'hard').length;

        return `
            <div class="space-y-5 max-w-lg mx-auto animate-fade-in">
                <!-- Leitner Card Tracker Deck -->
                <div class="glass-card-notebook p-4 bg-slate-950/80 border border-white/5 flex items-center justify-between text-[9px] gap-2">
                    <span class="font-bold text-slate-400 uppercase tracking-wider">Leitner Tracker:</span>
                    <div class="flex gap-3">
                        <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">🟢 Dominadas: ${masteredCount}</span>
                        <span class="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">🟡 Repaso: ${reviewingCount}</span>
                        <span class="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 font-bold border border-red-500/20">🔴 Difíciles: ${difficultCount}</span>
                    </div>
                </div>

                <div onclick="window.flipFlashcard()" class="flashcard-wrapper w-full min-h-[240px] cursor-pointer">
                    <div class="flashcard-card relative w-full h-[240px] ${window.flashcardFlipped ? 'is-flipped' : ''}">
                        <!-- Front Face -->
                        <div class="flashcard-face absolute inset-0 p-6 rounded-[2.5rem] border border-indigo-500/20 bg-gradient-to-br from-[#121626] to-slate-950 text-white shadow-2xl flex flex-col justify-between">
                            <div class="flex items-center justify-between">
                                <span class="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    Pregunta de Examen
                                </span>
                                <span class="text-[9px] text-slate-500 font-mono">${current.category}</span>
                            </div>
                            <p class="text-xs font-bold leading-relaxed text-slate-100 text-center max-w-sm mx-auto">
                                ${current.front}
                            </p>
                            <p class="text-[8px] text-center text-slate-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                                <span class="material-symbols-outlined text-[10px] animate-pulse">touch_app</span> Tocar para revelar
                            </p>
                        </div>

                        <!-- Back Face -->
                        <div class="flashcard-face flashcard-back absolute inset-0 p-6 rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white shadow-2xl flex flex-col justify-between">
                            <div class="flex items-center justify-between">
                                <span class="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    Fundamento Doctrinario
                                </span>
                                <span class="text-[9px] text-emerald-400 font-bold">✓ Respuesta Oficial</span>
                            </div>
                            <p class="text-xs font-bold leading-relaxed text-slate-100 text-center max-w-sm mx-auto">
                                ${current.back}
                            </p>
                            <p class="text-[8px] text-center text-slate-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                                <span class="material-symbols-outlined text-[10px]">touch_app</span> Tocar para volver
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Spaced Repetition Leitner Rating System -->
                <div class="grid grid-cols-3 gap-2">
                    <button onclick="window.rateFlashcard('${current.id}', 'hard', ${totalCards})" class="py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-wider transition-all active:scale-95">
                        🔴 Difícil
                    </button>
                    <button onclick="window.rateFlashcard('${current.id}', 'medium', ${totalCards})" class="py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-wider transition-all active:scale-95">
                        🟡 Regular
                    </button>
                    <button onclick="window.rateFlashcard('${current.id}', 'easy', ${totalCards})" class="py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-emerald-500/5">
                        🟢 Lo sé / Fácil
                    </button>
                </div>
            </div>
        `;
    }

    // --- TAB: SCHEMAS & FLOWCHARTS (Mermaid.js) ---
    function renderMindmapsTab(hierarchy) {
        const mindmaps = hierarchy.mindmaps;

        if (typeof mermaid === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
            script.onload = () => {
                try {
                    mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
                    setTimeout(() => { try { mermaid.run(); } catch(e){} }, 100);
                } catch(e){}
            };
            document.head.appendChild(script);
        } else {
            setTimeout(() => { try { mermaid.run(); } catch(e){} }, 100);
        }

        return `
            <div class="space-y-5 animate-fade-in">
                <div class="px-1">
                    <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider">Flujogramas Doctrinarios</h3>
                    <p class="text-[10px] text-slate-500 mt-0.5">Visualización estructurada de procedimientos legales obligatorios.</p>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    ${mindmaps.map(mm => `
                        <div class="p-5 rounded-3xl border border-white/5 bg-slate-900/60 space-y-3">
                            <h4 class="font-bold text-xs text-white flex items-center gap-2">
                                <span class="material-symbols-outlined text-indigo-400 text-sm">account_tree</span>
                                ${mm.title}
                            </h4>
                            <div class="mermaid bg-slate-950 p-4 rounded-2xl border border-white/5 flex justify-center overflow-x-auto text-[10px]">
                                ${mm.mermaid.trim()}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // --- TAB: INTERACTIVE TACTICAL PROCEDURES SIMULATOR (SVG Animated Video Lesson) ---
    function renderVideosTab(hierarchy) {
        return `
            <div class="space-y-5 animate-fade-in">
                <div class="px-1 flex items-center justify-between">
                    <div>
                        <h3 class="text-xs font-black uppercase text-slate-400 tracking-wider">Lecciones Tácticas 3D Interactivas</h3>
                        <p class="text-[10px] text-slate-500 mt-0.5">Simulador gráfico paso a paso de procedimientos policiales.</p>
                    </div>
                </div>

                <div class="glass-card-notebook p-5 border-rose-500/20 bg-gradient-to-br from-slate-950 via-[#13111f] to-slate-950 space-y-4">
                    <!-- Interactive Visual Canvas (Tactical Map) -->
                    <div class="relative w-full h-56 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                        
                        <!-- Tactical Simulator Grid Map -->
                        <div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                        
                        <!-- Visual animated indicators according to current step -->
                        <div class="absolute inset-0 flex items-center justify-center z-10">
                            ${window.activeVideoStep === 1 ? `
                                <!-- Step 1: Perimeter layout drawing -->
                                <svg class="size-48 animate-pulse text-rose-500" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2" />
                                    <rect x="42" y="42" width="16" height="16" fill="rgba(239, 68, 68, 0.2)" stroke="currentColor" stroke-width="1.5" rx="3" />
                                    <text x="50" y="52" font-size="6" font-family="monospace" fill="white" text-anchor="middle" font-weight="bold">ARMA</text>
                                    <text x="50" y="25" font-size="5" fill="currentColor" text-anchor="middle">PERÍMETRO DE SEGURIDAD</text>
                                </svg>
                            ` : ''}

                            ${window.activeVideoStep === 2 ? `
                                <!-- Step 2: Witness / Camera recording -->
                                <div class="text-center space-y-2 animate-fade-in">
                                    <div class="flex justify-center gap-6">
                                        <div class="flex flex-col items-center">
                                            <span class="material-symbols-outlined text-4xl text-amber-400 animate-pulse">videocam</span>
                                            <span class="text-[8px] font-mono text-slate-400 mt-1">CÁMARA BODYCAM</span>
                                        </div>
                                        <div class="flex flex-col items-center">
                                            <span class="material-symbols-outlined text-4xl text-blue-400">groups</span>
                                            <span class="text-[8px] font-mono text-slate-400 mt-1">TESTIGOS</span>
                                        </div>
                                    </div>
                                    <p class="text-[9px] font-mono text-white bg-slate-900/90 px-3 py-1 rounded-xl border border-white/5">DESCARGA ANTE TESTIGOS</p>
                                </div>
                            ` : ''}

                            ${window.activeVideoStep === 3 ? `
                                <!-- Step 3: Evidencia & Chain of custody packaging -->
                                <div class="text-center space-y-3 animate-fade-in">
                                    <span class="material-symbols-outlined text-5xl text-emerald-400 animate-bounce">inventory_2</span>
                                    <div class="space-y-1">
                                        <p class="text-[10px] font-bold text-white">SOBRE DE EVIDENCIA N° 4821</p>
                                        <p class="text-[8px] text-slate-400 font-mono">FORMULARIO DE CUSTODIA ELEVADO AL MPA</p>
                                    </div>
                                </div>
                            ` : ''}
                        </div>

                        <!-- Top layout HUD -->
                        <div class="flex justify-between items-center relative z-20">
                            <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[8px] font-mono border border-rose-500/30 tracking-wider">
                                SIMULACIÓN INTERACTIVA
                            </span>
                            <span class="text-[9px] font-mono text-slate-400">PASO ${window.activeVideoStep} DE 3</span>
                        </div>

                        <!-- Bottom layout context text -->
                        <div class="relative z-20 bg-slate-900/90 p-2.5 rounded-xl border border-white/5 text-[9px] leading-relaxed text-slate-300">
                            ${window.activeVideoStep === 1 ? '<strong>Paso 1: Delimitación de Escena.</strong> Se asegura el área con doble encintado antes de procesar el arma.' : ''}
                            ${window.activeVideoStep === 2 ? '<strong>Paso 2: Descarga y Despeje.</strong> La recámara debe vaciarse con registro fílmico ininterrumpido o dos testigos.' : ''}
                            ${window.activeVideoStep === 3 ? '<strong>Paso 3: Rotulado.</strong> Se embala la evidencia física en bolsa sellada y se eleva la cadena de custodia al Fiscal.' : ''}
                        </div>
                    </div>

                    <!-- Step control pills -->
                    <div class="grid grid-cols-3 gap-2">
                        <button onclick="window.setVideoStep(1)" class="py-3 rounded-xl text-[9px] font-black uppercase border transition-all ${window.activeVideoStep === 1 ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md' : 'bg-white/5 border-white/5 text-slate-400'}">
                            Paso 1: Perímetro
                        </button>
                        <button onclick="window.setVideoStep(2)" class="py-3 rounded-xl text-[9px] font-black uppercase border transition-all ${window.activeVideoStep === 2 ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md' : 'bg-white/5 border-white/5 text-slate-400'}">
                            Paso 2: Descarga
                        </button>
                        <button onclick="window.setVideoStep(3)" class="py-3 rounded-xl text-[9px] font-black uppercase border transition-all ${window.activeVideoStep === 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md' : 'bg-white/5 border-white/5 text-slate-400'}">
                            Paso 3: Custodia
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // --- TAB: TUTOR CENTINELA IA (Google NotebookLM Style) ---
    function renderGeminiTutorTab(hierarchy) {
        const checkedCount = Object.values(window.academySelectedSources).filter(Boolean).length;
        return `
            <div class="space-y-5 animate-fade-in flex flex-col justify-between h-full min-h-[500px]">
                
                <!-- Chat Welcome Banner -->
                <div class="space-y-4">
                    <div class="flex items-start gap-4">
                        <div class="size-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl shadow-xl shrink-0">
                            👮
                        </div>
                        <div class="space-y-1">
                            <h1 class="text-xl font-bold text-white tracking-tight leading-snug">
                                ${hierarchy.title.split(' ➔ ')[0]} Specialization Manual:<br>
                                <span class="text-indigo-400">General Officer Training 2027</span>
                            </h1>
                            <p class="text-[9px] text-slate-400 font-mono">
                                5 fuentes • ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        Este manual de formación policial del Instituto de Seguridad Pública de Santa Fe funciona como una guía integral para el perfeccionamiento de los oficiales del Agrupamiento Ejecución durante el ciclo 2027. El documento establece las directrices normativas, leyes locales y protocolos procedimentales de Santa Fe.
                    </p>

                    <!-- Alert message -->
                    <div class="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-2.5 text-[10px] text-indigo-300">
                        <span class="material-symbols-outlined text-sm shrink-0">info</span>
                        <span>Gemini Notebook ahora es más inteligente. Prueba pedirle que busque nuevas fuentes en la Web.</span>
                    </div>

                    <!-- Suggestion Chips -->
                    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-[9px] pt-2">
                        <button onclick="window.askGeminiTutor('¿Cuáles son las 4 virtudes cardinales del mando según el manual ISEP?')" 
                            class="shrink-0 px-3 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 transition-all font-medium">
                            🔑 Virtudes del mando
                        </button>
                        <button onclick="window.askGeminiTutor('¿Qué protocolo establece el manual ISEP para la descarga de armas secuestradas?')" 
                            class="shrink-0 px-3 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 transition-all font-medium">
                            🔫 Descarga de armas
                        </button>
                        <button onclick="window.askGeminiTutor('Explicar la diferencia legal entre Cesantía y Exoneración de la Ley 12.521')" 
                            class="shrink-0 px-3 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 transition-all font-medium">
                            ⚖️ Cesantía vs Exoneración
                        </button>
                    </div>
                </div>

                <!-- Chat history output -->
                <div id="gemini-tutor-output" class="space-y-4 overflow-y-auto pr-1 max-h-[300px] empty:hidden"></div>

                <!-- Chat Prompt Bar at the bottom -->
                <form onsubmit="window.submitGeminiTutorForm(event)" class="relative flex items-center gap-2 mt-4">
                    <input type="text" id="gemini-tutor-input" placeholder="Haz una pregunta o crea algo..." 
                        class="w-full pl-4 pr-24 py-4 bg-[#111625] border border-white/10 rounded-full text-xs text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 shadow-xl font-medium">
                    <div class="absolute right-2.5 flex items-center gap-2">
                        <span class="text-[8px] font-bold text-slate-500 font-mono uppercase tracking-wider hidden sm:inline bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                            ${checkedCount} fuentes
                        </span>
                        <button type="submit" class="size-9 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center active:scale-90 transition-all shadow-md">
                            <span class="material-symbols-outlined text-sm">arrow_upward</span>
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    // --- TAB: PODCAST DE ESTUDIO DOCTRINARIO ---
    function renderPodcastTab(hierarchy) {
        return `
            <div class="space-y-4 animate-fade-in">
                <div class="glass-card-notebook p-6 bg-gradient-to-br from-slate-950 via-[#101426] to-slate-950 border-indigo-500/20 relative overflow-hidden space-y-4 shadow-2xl">
                    <div class="absolute -right-20 -top-20 size-52 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="size-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shadow-lg">
                                <span class="material-symbols-outlined text-2xl animate-pulse">podcasts</span>
                            </div>
                            <div>
                                <span class="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    NotebookLM Audio Overview
                                </span>
                                <h3 class="text-sm font-black text-white uppercase tracking-wider mt-1">Podcast de Estudio Doctrinario</h3>
                            </div>
                        </div>
                    </div>

                    <p class="text-[11px] text-slate-300 leading-relaxed max-w-2xl">
                        Escuchá el debate interactivo de nuestros expertos. La transcripción se desplazará de manera síncrona con el audio de los manuales oficiales de oposición ISEP.
                    </p>

                    <!-- Waveform and Controls -->
                    <div class="p-4 rounded-2xl bg-slate-900/90 border border-white/5 space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <button onclick="window.toggleAudioPodcastOverview()" class="size-14 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all">
                                    <span class="material-symbols-outlined text-3xl">${window.isPodcastPlaying ? 'pause' : 'play_arrow'}</span>
                                </button>
                                <div>
                                    <p class="text-xs font-bold text-white">Doctrina Operativa & Régimen Disciplinario 2026</p>
                                    <p class="text-[9px] text-indigo-300 font-mono flex items-center gap-1 mt-0.5">
                                        <span class="material-symbols-outlined text-[10px]">graphic_eq</span>
                                        ${window.isPodcastPlaying ? `Reproduciendo a ${window.podcastSpeed}x...` : 'Listo para reproducir (12 min)'}
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Speed Control -->
                            <button onclick="window.togglePodcastSpeed()" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[9px] text-slate-300 font-bold uppercase transition-all">
                                ${window.podcastSpeed}x Velocidad
                            </button>
                        </div>

                        <!-- Real Waveform Simulator -->
                        <div class="flex items-end gap-1.5 justify-center h-8 pt-1">
                            ${[...Array(16)].map((_, i) => `
                                <div class="w-[3px] bg-indigo-500/80 rounded-full transition-all duration-300 ${window.isPodcastPlaying ? 'equalizer-bar' : 'h-1.5'}" 
                                     style="animation-delay: ${0.1 * i}s; animation-duration: ${0.6 + Math.random() * 0.4}s;"></div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Interactive Live Transcript -->
                    <div class="p-4 bg-slate-950 rounded-2xl border border-white/5 text-[10px] space-y-2.5 max-h-[140px] overflow-y-auto scrollbar-none font-mono">
                        <p class="${window.isPodcastPlaying ? 'text-indigo-400 font-bold' : 'text-slate-500'}">
                            🎙️ [ROSSI - Profesor ISEP]: "Bienvenidos a esta síntesis del ISEP. El secuestro de armas es vital: la descarga debe ser ante testigos."
                        </p>
                        <p class="text-slate-500">
                            🎙️ [GÓMEZ - Abogada]: "Exacto Carlos. Y la Ley 12.521 distingue cesantía de exoneración por la pérdida del cómputo previsional."
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    // --- TAB: PRESENTACION / SLIDES DE ESTUDIO ---
    function renderSlidesTab(hierarchy) {
        const slidesData = [
            { title: "Diapositiva 1: Mando y Liderazgo Policial", content: "El liderazgo en la Policía de Santa Fe no es meramente formal o coercitivo. Se sustenta en el liderazgo moral y técnico (autoridad real), guiado por las Virtudes Cardinales: Prudencia, Justicia, Fortaleza y Templanza. La conducción exige el dominio de las 3 'C': Competencia, Confianza y Compromiso." },
            { title: "Diapositiva 2: Estatuto y Derechos (Ley 12.521)", content: "La Ley 12.521 rige al personal de Santa Fe. Define deberes (obediencia, portación, neutralidad) y el catálogo de faltas administrativas. Es clave comprender que la destitución por Cesantía mantiene los aportes acumulados del agente, mientras que la Exoneración extingue todo derecho de la fuerza." },
            { title: "Diapositiva 3: Actas y Preservación de Escenas", content: "El acta de procedimiento es un instrumento público crucial del CPP. Debe tener lugar, hora de inicio/cierre, firma de al menos dos testigos. Para preservar la escena se aplica el Cordón Doble: Zona de Exclusión (solo peritos) y Zona de Seguridad (apoyos y patrulleros)." },
            { title: "Diapositiva 4: Armamento y MIRAF Operativo", content: "El manual MIRAF fija las 4 reglas ineludibles: tratar el arma siempre como cargada, no apuntar a quien no se deba, mantener el dedo fuera del disparador hasta decidir tirar, y verificar el blanco. El uso de la fuerza es progresivo: Presencia ➔ Verbalización ➔ Control Físico ➔ Menos Letal ➔ Letal." },
            { title: "Diapositiva 5: Derechos Humanos del Aprehendido", content: "Todo detenido tiene derecho a trato digno. Prohibición absoluta de tortura o incomunicación indebida. Debe ser notificado inmediatamente de sus derechos procesales y se debe dar comunicación inmediata al Fiscal del MPA de turno y al Defensor Oficial." }
        ];

        const slide = slidesData[window.currentSlideIndex || 0];

        return `
            <div class="space-y-4 animate-fade-in">
                <div class="glass-card-notebook p-6 bg-slate-900/80 border border-indigo-500/20 space-y-4 shadow-2xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-indigo-400">presentation_to_cat</span>
                            <h3 class="text-xs font-black uppercase text-white">Presentación: Guía ISEP 2026</h3>
                        </div>
                        
                        <!-- Slide Theme select -->
                        <div class="flex gap-1.5 text-[8px]">
                            <button onclick="window.changeSlideTheme('midnight')" class="px-2.5 py-1 rounded font-bold border ${window.slideTheme === 'midnight' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-[#0f172a] text-slate-400 border-white/5'}">Midnight</button>
                            <button onclick="window.changeSlideTheme('sepia')" class="px-2.5 py-1 rounded font-bold border ${window.slideTheme === 'sepia' ? 'bg-amber-500/20 text-amber-800 border-amber-500/30' : 'bg-[#0f172a] text-slate-400 border-white/5'}">Sepia</button>
                            <button onclick="window.changeSlideTheme('slate')" class="px-2.5 py-1 rounded font-bold border ${window.slideTheme === 'slate' ? 'bg-slate-700 text-white border-slate-600' : 'bg-[#0f172a] text-slate-400 border-white/5'}">Slate</button>
                        </div>
                    </div>

                    <!-- Slide Screen -->
                    <div class="p-8 rounded-2xl border text-center space-y-4 min-h-[180px] flex flex-col justify-center items-center transition-all ${
                        window.slideTheme === 'sepia' ? 'slide-theme-sepia' : 
                        window.slideTheme === 'slate' ? 'slide-theme-slate' : 'slide-theme-midnight bg-slate-950/80 border-white/5'
                    }">
                        <h4 class="font-bold text-sm leading-snug uppercase tracking-wider">${slide.title}</h4>
                        <p class="text-xs max-w-xl leading-relaxed font-serif">${slide.content}</p>
                    </div>

                    <!-- Slide Navigation -->
                    <div class="flex items-center justify-between pt-2">
                        <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Diapositiva ${(window.currentSlideIndex || 0) + 1} de 5</span>
                        <div class="flex gap-2">
                            <button onclick="window.navigateSlides(-1)" class="size-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 active:scale-90 transition-all">
                                <span class="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button onclick="window.navigateSlides(1)" class="size-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 active:scale-90 transition-all">
                                <span class="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- TAB: INFOGRAFIAS / CRONOGRAMAS ---
    function renderInfographicsTab(hierarchy) {
        return `
            <div class="space-y-4 animate-fade-in">
                <div class="glass-card-notebook p-6 bg-slate-900/80 border border-indigo-500/20 space-y-5 shadow-2xl">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-indigo-400">infographic</span>
                        <h3 class="text-xs font-black uppercase text-white">Infografía: Mapa de Hitos del Concurso</h3>
                    </div>

                    <p class="text-[11px] text-slate-300 leading-relaxed">
                        Esquema visual y cronológico de los hitos normativos y procedimentales obligatorios para rendir oposición en el ISEP:
                    </p>

                    <!-- Timeline Infographic -->
                    <div class="relative pl-6 border-l-2 border-indigo-500/30 space-y-6 text-xs text-slate-300">
                        <div class="relative">
                            <div class="absolute -left-[31px] top-0 size-4 rounded-full bg-indigo-600 border-4 border-[#0c101b] flex items-center justify-center"></div>
                            <h4 class="font-bold text-white uppercase text-[10px] tracking-wider">Hito 1: Inscripción y Acreditación de Servicios</h4>
                            <p class="text-[10px] text-slate-400 mt-1">Cumplimentar requisitos del Estatuto Policial (Decreto N° 461/15) y confirmación de apto médico/psicológico.</p>
                        </div>
                        <div class="relative">
                            <div class="absolute -left-[31px] top-0 size-4 rounded-full bg-purple-600 border-4 border-[#0c101b] flex items-center justify-center"></div>
                            <h4 class="font-bold text-white uppercase text-[10px] tracking-wider">Hito 2: Cursado Virtual y Entrega de Proyectos</h4>
                            <p class="text-[10px] text-slate-400 mt-1">Elaboración de Proyectos de Gestión y examen de contenidos teóricos en plataforma virtual.</p>
                        </div>
                        <div class="relative">
                            <div class="absolute -left-[31px] top-0 size-4 rounded-full bg-emerald-600 border-4 border-[#0c101b] flex items-center justify-center"></div>
                            <h4 class="font-bold text-white uppercase text-[10px] tracking-wider">Hito 3: Examen de Oposición Práctica (MIRAF/Táctica)</h4>
                            <p class="text-[10px] text-slate-400 mt-1">Demostración técnica en polígono de tiro y simulación táctica de incidentes bajo reglamento MIRAF.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- RIGHT SIDEBAR: STUDIO GRID RENDERING ---
    function renderStudioPaneHTML(hierarchy) {
        const activeTab = window.academyActiveTab;
        const cards = [
            { id: 'tutor', title: 'Tutor IA', subtitle: 'Chat Conversacional', icon: 'psychology', color: 'border-blue-500/30 text-blue-400 bg-blue-500/5 hover:bg-blue-500/10' },
            { id: 'podcast', title: 'Podcast Doctrina', subtitle: 'Resumen de Audio', icon: 'podcasts', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10' },
            { id: 'summaries', title: 'Resúmenes', subtitle: 'Síntesis de Materias', icon: 'menu_book', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10' },
            { id: 'mindmaps', title: 'Mapas Mentales', subtitle: 'Esquemas Mermaid', icon: 'account_tree', color: 'border-pink-500/30 text-pink-400 bg-pink-500/5 hover:bg-pink-500/10' },
            { id: 'proyectos', title: 'Proyectos', subtitle: 'Redactor ISEP', icon: 'assignment', color: 'border-purple-500/30 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10' },
            { id: 'exam', title: 'Cuestionario', subtitle: 'Simulador ISEP (50)', icon: 'quiz', color: 'border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10' },
            { id: 'flashcards', title: 'Tarjetas 3D', subtitle: 'Memorización Leitner', icon: 'style', color: 'border-amber-500/30 text-amber-400 bg-amber-500/5 hover:bg-amber-500/10' },
            { id: 'videos', title: 'Táctica 3D', subtitle: 'Simulador de Caso', icon: 'videocam', color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10' },
            { id: 'slides', title: 'Presentaciones', subtitle: 'Láminas de Hitos', icon: 'presentation_to_cat', color: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5 hover:bg-yellow-500/10' },
            { id: 'infographics', title: 'Infografías', subtitle: 'Hitos del Concurso', icon: 'infographic', color: 'border-teal-500/30 text-teal-400 bg-teal-500/5 hover:bg-teal-500/10' }
        ];

        return `
            <div class="space-y-5 flex flex-col justify-between h-full">
                <div class="space-y-4">
                    <div class="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 class="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-indigo-400 text-sm">dashboard</span>
                            Studio
                        </h3>
                        <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Estudio Activo
                        </span>
                    </div>

                    <!-- Cards Grid (2 Columns) -->
                    <div class="grid grid-cols-2 gap-2">
                        ${cards.map(card => {
                            const isActive = activeTab === card.id;
                            return `
                                <button onclick="window.switchAcademyTab('${card.id}')" 
                                    class="p-3 text-left rounded-xl border flex flex-col justify-between gap-1.5 transition-all duration-200 active:scale-95 text-xs ${card.color} ${isActive ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#080c16]' : ''}">
                                    <div class="flex items-center justify-between w-full">
                                        <span class="material-symbols-outlined text-lg">${card.icon}</span>
                                        ${isActive ? '<span class="size-1.5 rounded-full bg-indigo-400 animate-ping"></span>' : ''}
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-[10px] text-white leading-tight">${card.title}</h4>
                                        <p class="text-[8px] text-slate-400 leading-normal line-clamp-1 mt-0.5">${card.subtitle}</p>
                                    </div>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Studio Output files / Generated Notes -->
                <div class="space-y-3 pt-4 border-t border-white/5">
                    <h4 class="text-[9px] font-black uppercase tracking-widest text-slate-500">Documentos Generados</h4>
                    <div class="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-none text-[10px]">
                        <button onclick="window.switchAcademyTab('summaries')" class="w-full text-left p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 flex items-center gap-2 transition-all">
                            <span class="material-symbols-outlined text-xs text-emerald-400">description</span>
                            <span class="truncate">📋 Manual de Procedimiento Penal</span>
                        </button>
                        <button onclick="window.switchAcademyTab('summaries')" class="w-full text-left p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 flex items-center gap-2 transition-all">
                            <span class="material-symbols-outlined text-xs text-emerald-400">description</span>
                            <span class="truncate">📝 Guía de Responsabilidad Adm.</span>
                        </button>
                        <button onclick="window.switchAcademyTab('exam')" class="w-full text-left p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 flex items-center gap-2 transition-all">
                            <span class="material-symbols-outlined text-xs text-purple-400">analytics</span>
                            <span class="truncate">📊 Diagnóstico: Evaluación ISEP</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // --- EVENT CONTROLLERS ---
    window.changeSlideTheme = (theme) => {
        window.slideTheme = theme;
        renderAcademia(viewContainer);
    };

    window.navigateSlides = (direction) => {
        window.currentSlideIndex = (window.currentSlideIndex || 0);
        window.currentSlideIndex = (window.currentSlideIndex + direction + 5) % 5;
        renderAcademia(viewContainer);
    };

    window.setVideoStep = (step) => {
        window.activeVideoStep = step;
        renderAcademia(viewContainer);
    };

    window.rateFlashcard = (cardId, rating, total) => {
        window.flashcardLeitnerState[cardId] = rating;
        window.flashcardFlipped = false;
        window.currentFlashcardIndex = (window.currentFlashcardIndex + 1) % total;
        renderAcademia(viewContainer);
        showToast(`Tarjeta marcada como ${rating === 'easy' ? 'Dominada 🟢' : rating === 'medium' ? 'Repaso 🟡' : 'Difícil 🔴'}`);
    };

    window.toggleAudioPodcastOverview = () => {
        window.isPodcastPlaying = !window.isPodcastPlaying;
        if (window.isPodcastPlaying) {
            window.playAudiobook(
                "Podcast ISEP 2026: Resumen de Doctrina y Procedimientos",
                "Bienvenidos a la Guía de Audio ISEP. Hoy analizamos los temas centrales. El protocolo de secuestro de armas en vía pública exige de manera obligatoria la descarga de cartuchos únicamente ante testigos presenciales o filmación ininterrumpida (Manual Pág. 69). Además, la Ley de Personal Policial 12.521 regula las sanciones graves. La Cesantía separa al agente pero guarda sus aportes previsionales acumulados, mientras que la Exoneración extingue por completo todo derecho y cómputo de la fuerza policial.",
                "podcast-overview"
            );
        } else {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            showToast("Podcast pausado");
        }
        renderAcademia(viewContainer);
    };

    window.togglePodcastSpeed = () => {
        const speeds = [1, 1.25, 1.5];
        const nextIdx = (speeds.indexOf(window.podcastSpeed) + 1) % speeds.length;
        window.podcastSpeed = speeds[nextIdx];
        if (window.isPodcastPlaying) {
            window.isPodcastPlaying = false;
            window.toggleAudioPodcastOverview();
        }
        renderAcademia(viewContainer);
        showToast(`Velocidad configurada en ${window.podcastSpeed}x`);
    };

    window.toggleSourceSelection = (sourceId) => {
        window.academySelectedSources = window.academySelectedSources || {};
        window.academySelectedSources[sourceId] = !window.academySelectedSources[sourceId];
        renderAcademia(viewContainer);
    };

    window.filterLibrarySources = (query) => {
        window.librarySearchQuery = query;
        const listEl = document.querySelector('.notebook-sidebar .space-y-2.5');
        if (listEl) listEl.innerHTML = renderLibraryItemsHTML();
    };

    window.setLibraryFilter = (filter) => {
        window.libraryActiveFilter = filter;
        const listEl = document.querySelector('.notebook-sidebar .space-y-2.5');
        if (listEl) listEl.innerHTML = renderLibraryItemsHTML();
        renderAcademia(viewContainer);
    };

    window.switchAcademyHierarchy = (val) => {
        localStorage.setItem('academy_setup_hierarchy', val);
        window.academySelectedHierarchy = val;
        window.currentExamAnswers = {};
        window.examSubmitted = false;
        renderAcademia(viewContainer);
        showToast("✨ Jerarquía objetivo actualizada");
    };

    window.showAddSourceModal = () => {
        window.activeModalTab = 'file'; // 'file' | 'note'
        window.tempUploadedFileContent = '';
        window.tempUploadedFileName = '';

        const modal = document.createElement('div');
        modal.id = 'add-source-modal-overlay';
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-4';
        
        window.renderModalInner = () => {
            modal.innerHTML = `
                <div class="glass-card-notebook p-6 max-w-sm w-full bg-slate-900 border border-white/10 rounded-3xl shadow-2xl space-y-4 animate-fade-in text-left">
                    <!-- Modal Header -->
                    <div class="flex justify-between items-center">
                        <h3 class="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-sm text-indigo-400">library_add</span>
                            Nueva Fuente de Estudio
                        </h3>
                        <button onclick="this.closest('.fixed').remove()" class="size-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                            <span class="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>

                    <!-- Modal Navigation Tabs -->
                    <div class="flex p-1 bg-slate-950/80 rounded-xl border border-white/5 gap-1 text-[9px] font-black uppercase tracking-wider">
                        <button onclick="window.switchModalTab('file')" class="flex-1 py-2 text-center rounded-lg transition-all ${window.activeModalTab === 'file' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                            📂 Subir Archivo
                        </button>
                        <button onclick="window.switchModalTab('note')" class="flex-1 py-2 text-center rounded-lg transition-all ${window.activeModalTab === 'note' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                            ✍️ Nota Manual
                        </button>
                    </div>

                    <!-- Tab Content Container -->
                    <div class="space-y-4 pt-1">
                        ${window.activeModalTab === 'file' ? `
                            <!-- Tab File Upload -->
                            <div class="space-y-3">
                                <p class="text-[9px] text-slate-400 leading-relaxed">Subí una circular, decreto o apunte en PDF o TXT. El sistema extraerá el texto automáticamente para que la IA pueda leerlo.</p>
                                
                                ${window.tempUploadedFileName ? `
                                    <!-- File Details Card (Visible after upload) -->
                                    <div class="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between animate-scale-in">
                                        <div class="flex items-center gap-3 min-w-0">
                                            <span class="material-symbols-outlined text-2xl text-emerald-400 shrink-0">check_circle</span>
                                            <div class="min-w-0">
                                                <p class="text-[10px] font-bold text-white truncate max-w-[160px]">${window.tempUploadedFileName}</p>
                                                <p class="text-[8px] text-emerald-400 font-bold uppercase tracking-wider">Archivo cargado e indexado</p>
                                            </div>
                                        </div>
                                        <button onclick="window.clearUploadedFile()" class="size-6 text-slate-500 hover:text-white flex items-center justify-center rounded-full hover:bg-white/5 shrink-0">
                                            <span class="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ` : `
                                    <!-- Drag & Drop Zone -->
                                    <div class="border-2 border-dashed border-white/10 hover:border-indigo-500/40 rounded-2xl p-6 text-center cursor-pointer transition-all relative group bg-slate-950/40">
                                        <input type="file" id="newSourceFile" accept=".txt,.pdf,.md" onchange="window.handleSourceFileUpload(event)" class="absolute inset-0 opacity-0 cursor-pointer">
                                        <span class="material-symbols-outlined text-3xl text-indigo-400 mb-1 group-hover:scale-110 transition-transform">upload_file</span>
                                        <p class="text-[10px] text-slate-300 font-bold">Seleccioná un archivo de tu equipo</p>
                                        <p class="text-[8px] text-slate-500 mt-0.5">Soporta PDF, TXT y Markdown (.md)</p>
                                    </div>
                                `}
                                
                                <button onclick="window.saveCustomFileSource()" ${!window.tempUploadedFileName ? 'disabled' : ''} class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                                    Indexar Archivo en IA
                                </button>
                            </div>
                        ` : `
                            <!-- Tab Manual Note -->
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-[8px] font-bold text-slate-400 uppercase mb-1">Título de la nota o circular</label>
                                    <input type="text" id="newSourceTitle" placeholder="Ej: Circular 01/26 - Recargo de Servicios" class="w-full px-3.5 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-indigo-500 font-bold">
                                </div>
                                <div>
                                    <label class="block text-[8px] font-bold text-slate-400 uppercase mb-1">Contenido doctrinal o reglamentario</label>
                                    <textarea id="newSourceContent" placeholder="Pegá o redactá las disposiciones oficiales de la fuerza aquí..." class="w-full h-28 px-3.5 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-indigo-500 resize-none font-sans"></textarea>
                                </div>
                                <button onclick="window.saveCustomNoteSource()" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                                    Indexar Nota en IA
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            `;
        };

        window.switchModalTab = (tab) => {
            window.activeModalTab = tab;
            window.renderModalInner();
        };

        window.clearUploadedFile = () => {
            window.tempUploadedFileContent = '';
            window.tempUploadedFileName = '';
            window.renderModalInner();
            showToast("Archivo removido");
        };

        window.renderModalInner();
        document.body.appendChild(modal);
    };

    window.handleSourceFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                window.tempUploadedFileName = file.name;
                window.tempUploadedFileContent = e.target.result;
                window.renderModalInner();
                showToast("✓ Archivo de texto cargado");
            };
            reader.readAsText(file);
        } else if (file.name.endsWith('.pdf')) {
            showToast("Procesando PDF doctrinal...");
            if (typeof pdfjsLib === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
                script.onload = () => {
                    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
                    window.parsePDFFile(file);
                };
                document.head.appendChild(script);
            } else {
                window.parsePDFFile(file);
            }
        } else {
            showToast("Formato de archivo no soportado.");
        }
    };

    window.parsePDFFile = (file) => {
        const reader = new FileReader();
        reader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                let textPromises = [];
                const pagesToRead = Math.min(pdf.numPages, 10);
                for (let i = 1; i <= pagesToRead; i++) {
                    textPromises.push(
                        pdf.getPage(i).then(page => {
                            return page.getTextContent().then(textContent => {
                                return textContent.items.map(item => item.str).join(' ');
                            });
                        })
                    );
                }
                Promise.all(textPromises).then(texts => {
                    window.tempUploadedFileName = file.name;
                    window.tempUploadedFileContent = texts.join('\n\n');
                    window.renderModalInner();
                    showToast(`✓ PDF procesado (${pagesToRead} pgs)`);
                });
            }).catch(err => {
                showToast("Error al decodificar el archivo PDF.");
            });
        };
        reader.readAsArrayBuffer(file);
    };

    window.saveCustomFileSource = () => {
        if (!window.tempUploadedFileName || !window.tempUploadedFileContent) {
            showToast("Por favor carga un archivo válido.");
            return;
        }

        let custom = [];
        try {
            custom = JSON.parse(localStorage.getItem('academy_custom_sources') || '[]');
        } catch(e) {}

        const newSource = {
            id: 'custom-' + Date.now(),
            title: window.tempUploadedFileName.replace(/\.[^/.]+$/, ""),
            desc: window.tempUploadedFileContent.slice(0, 80) + '...',
            content: window.tempUploadedFileContent,
            file: '#',
            icon: 'upload_file',
            color: 'from-emerald-600/20 to-teal-600/20 text-emerald-400 border-emerald-500/30',
            badge: 'Archivo Subido',
            category: 'custom'
        };

        custom.push(newSource);
        localStorage.setItem('academy_custom_sources', JSON.stringify(custom));
        window.academySelectedSources[newSource.id] = true;
        
        document.getElementById('add-source-modal-overlay')?.remove();
        showToast("✓ Archivo indexado en RAG");
        renderAcademia(viewContainer);
    };

    window.saveCustomNoteSource = () => {
        const title = document.getElementById('newSourceTitle')?.value.trim();
        const content = document.getElementById('newSourceContent')?.value.trim();
        if (!title || !content) {
            showToast("Por favor completa el título y el contenido.");
            return;
        }

        let custom = [];
        try {
            custom = JSON.parse(localStorage.getItem('academy_custom_sources') || '[]');
        } catch(e) {}

        const newSource = {
            id: 'custom-' + Date.now(),
            title: title,
            desc: content.slice(0, 80) + '...',
            content: content,
            file: '#',
            icon: 'note_add',
            color: 'from-purple-600/20 to-indigo-600/20 text-purple-400 border-purple-500/30',
            badge: 'Nota Manual',
            category: 'custom'
        };

        custom.push(newSource);
        localStorage.setItem('academy_custom_sources', JSON.stringify(custom));
        window.academySelectedSources[newSource.id] = true;
        
        document.getElementById('add-source-modal-overlay')?.remove();
        showToast("✓ Nota indexada en RAG");
        renderAcademia(viewContainer);
    };

    window.saveCustomSource = (btn) => {
        const title = document.getElementById('newSourceTitle')?.value.trim();
        const content = document.getElementById('newSourceContent')?.value.trim();
        if (!title || !content) {
            showToast("Por favor completá título y contenido.");
            return;
        }

        let custom = [];
        try {
            custom = JSON.parse(localStorage.getItem('academy_custom_sources') || '[]');
        } catch(e) {}

        const newSource = {
            id: 'custom-' + Date.now(),
            title: title,
            desc: content.slice(0, 80) + '...',
            content: content,
            file: '#',
            icon: 'note_add',
            color: 'from-purple-600/20 to-indigo-600/20 text-purple-400 border-purple-500/30',
            badge: 'Nota Manual',
            category: 'custom'
        };

        custom.push(newSource);
        localStorage.setItem('academy_custom_sources', JSON.stringify(custom));
        window.academySelectedSources[newSource.id] = true;
        btn.closest('.fixed').remove();
        showToast("✓ Nota indexada en tu RAG local");
        renderAcademia(viewContainer);
    };

    window.deleteCustomSource = (id) => {
        if (!confirm("¿Seguro que querés eliminar esta nota de estudio?")) return;
        let custom = [];
        try {
            custom = JSON.parse(localStorage.getItem('academy_custom_sources') || '[]');
        } catch(e) {}

        custom = custom.filter(item => item.id !== id);
        localStorage.setItem('academy_custom_sources', JSON.stringify(custom));
        delete window.academySelectedSources[id];
        showToast("Fuente eliminada");
        renderAcademia(viewContainer);
    };

    window.generateCustomReport = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const topic = document.getElementById('customReportTopic')?.value.trim();
        if (!topic) {
            showToast("Escribí un tema para sintetizar");
            return;
        }

        showToast("Sintetizando con Gemini IA...");
        const prompt = `Generá un Resumen de Estudio extremadamente completo y estructurado sobre: "${topic}". Citá artículos o manuales de la Policía de Santa Fe (ej: Ley 12.521, Decreto 461/15, MIRAF, etc.) aplicables.`;
        
        let reportText = "";
        try {
            reportText = await window.callGeminiAPI(prompt);
        } catch(err) {
            reportText = `### Resumen Ejecutivo de: ${topic}\n\n*   **Fundamento Legal Principal**: Ley de Personal Policial N° 12.521.\n*   **Procedimientos de Actuación**: Rigor formal en actas policiales de constatación, requerimiento obligatorio de dos testigos presenciales y preservación estricta de indicios mediante doble encintado.\n*   **Consecuencias Administrativas**: Sanciones aplicables según sumario bajo Decreto 461/15 ante incumplimiento de deberes policiales esenciales.`;
        }

        // Show in a premium modal
        const modal = document.createElement('div');
        modal.id = 'premium-report-modal';
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="glass-card-notebook p-6 max-w-lg w-full bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[80vh] animate-fade-in text-left">
                <div class="flex justify-between items-center pb-3 border-b border-white/5">
                    <h3 class="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-indigo-400">summarize</span>
                        Resumen Ejecutivo IA: ${topic}
                    </h3>
                    <button onclick="this.closest('.fixed').remove()" class="size-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>
                <div id="modal-report-content" class="flex-1 overflow-y-auto py-4 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap select-text">
${reportText}
                </div>
                <div class="pt-3 border-t border-white/5 flex gap-2">
                    <button onclick="window.copyToClipboard(document.getElementById('modal-report-content').innerText, 'Resumen IA')" class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20">
                        <span class="material-symbols-outlined text-xs">content_copy</span>
                        Copiar Resumen
                    </button>
                    <button onclick="document.getElementById('premium-report-modal').remove()" class="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95">
                        Cerrar
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    window.generateISEPProject = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const topic = document.getElementById('customProjectTopic')?.value.trim() || "Plan de Patrullaje Inteligente 911";
        const out = document.getElementById('projectOutputContainer');
        if (!out) return;

        out.classList.remove('hidden');
        out.innerHTML = `
            <div class="p-6 rounded-3xl border border-purple-500/20 bg-slate-950 animate-pulse text-xs text-slate-400">
                Elaborando proyecto formal con Gemini RAG...
            </div>
        `;

        const prompt = `Redactá un Proyecto Institucional de Gestión Policial (ISEP 2026) sobre: "${topic}". Incluí Diagnóstico, Objetivos, Plan de Acción, KPIs, Presupuesto e Impacto en Markdown.`;
        let text = "";
        try {
            text = await window.callGeminiAPI(prompt);
        } catch(err) {
            text = `### PROYECTO INSTITUCIONAL ISEP 2026: ${topic}

#### 1. DIAGNÓSTICO
Falta de respuesta operativa inmediata en puntos calientes.

#### 2. OBJETIVOS
* Disminuir un 20% los ilícitos contra la propiedad.

#### 3. PLAN DE ACCIÓN
* Cuadrículas orientadas con apoyo de móviles y patrulla táctica.

#### 4. KPIs
* Tiempo de respuesta de móviles del 911 (< 10 minutos).

#### 5. PRESUPUESTO
* Recursos asignados por la Jefatura de Unidad Regional.

#### 6. IMPACTO
* Reducción verificada en el mapa del delito de la provincia.`;
        }

        out.innerHTML = `
            <div class="p-5 rounded-3xl border border-purple-500/30 bg-slate-900/90 text-xs text-white space-y-4">
                <div class="flex justify-between items-center border-b border-white/5 pb-2">
                    <span class="font-bold text-purple-300">Proyecto de Gestión redactado</span>
                    <button onclick="copyToClipboard(\`${escapeHTML(text)}\`, 'Proyecto ISEP')" class="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-[9px] font-bold uppercase">Copiar</button>
                </div>
                <div class="whitespace-pre-wrap font-sans leading-relaxed text-slate-200">${text}</div>
            </div>
        `;
    };

    window.startStandardExam = () => {
        window.customAIQuestions = null;
        window.currentExamAnswers = {};
        window.examSubmitted = false;
        renderAcademia(viewContainer);
        showToast("Examen estándar cargado");
    };

    window.generateAIExam = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        showToast("Generando 50 preguntas con Gemini RAG...");
        const prompt = `Generá un examen en JSON de 10 preguntas sobre el temario oficial policial de Santa Fe (Ley 12521 y manual de ascenso). Formato:
[{"type":"multiple","question":"P?","options":["A","B","C","D"],"correctIndex":1,"explanation":"F"}]`;
        try {
            const ans = await window.callGeminiAPI(prompt);
            let clean = ans.trim();
            if (clean.startsWith('```')) clean = clean.replace(/^```json|^```|```$/g, '').trim();
            const questions = JSON.parse(clean);
            if (Array.isArray(questions) && questions.length > 0) {
                window.customAIQuestions = questions;
                window.currentExamAnswers = {};
                window.examSubmitted = false;
                renderAcademia(viewContainer);
                showToast("Simulador IA activado");
            } else { throw new Error(); }
        } catch(err) {
            window.customAIQuestions = hierarchy.exams;
            window.currentExamAnswers = {};
            window.examSubmitted = false;
            renderAcademia(viewContainer);
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

        output.innerHTML += `
            <div class="flex justify-end p-3 bg-indigo-600 text-white rounded-2xl rounded-tr-none text-xs max-w-[80%] ml-auto font-medium">
                ${escapeHTML(query)}
            </div>
        `;

        const loadingId = 'tutor-load-' + Date.now();
        output.innerHTML += `
            <div id="${loadingId}" class="p-3 bg-slate-900 border border-white/5 rounded-2xl rounded-tl-none text-xs text-slate-400">
                Procesando con Gemini RAG...
            </div>
        `;
        input.value = '';
        output.scrollTop = output.scrollHeight;

        // Build context from active default AND custom sources
        const activeSourceTitles = libraryItems
            .filter(item => window.academySelectedSources[item.id])
            .map(item => item.title);

        let preIndexedContent = "";
        const hierarchies = window.academyData?.hierarchies || [];
        hierarchies.forEach(h => {
            h.summaries.forEach(sum => {
                preIndexedContent += `\n\n--- FUENTE OFICIAL ISEP [Jerarquía: ${h.title}] ---\nTema: ${sum.title}\nContenido:\n${sum.content.replace(/<[^>]*>/g, '').trim()}`;
            });
        });

        const activeCustomContents = customSources
            .filter(item => window.academySelectedSources[item.id] && item.content)
            .map(item => `Documento subido por usuario: ${item.title}\nContenido:\n${item.content}`)
            .join('\n\n');

        const system = `Sos el Tutor Centinela IA de la Academia Policial (ISEP) de la Provincia de Santa Fe. Respondés basándote en las fuentes oficiales activas: ${activeSourceTitles.join(', ')}.
A continuación tenés el contenido de referencia oficial que debés priorizar para dar respuestas precisas y apegadas a la doctrina de Santa Fe:
${preIndexedContent}

A continuación tenés el texto de documentos/notas adicionales subidos por el usuario que también debés considerar si están activos:
${activeCustomContents}

Reglas obligatorias de respuesta:
1. Sé extremadamente profesional, preciso y descriptivo.
2. Cita leyes (Ley 12.521, Decreto 461/15, Ley 14.283) y secciones específicas cuando corresponda.
3. Si el usuario te hace una pregunta, utiliza la doctrina oficial del ISEP suministrada arriba para justificar y dar la respuesta exacta con terminología rioplatense y formal.`;

        try {
            const answer = await window.callGeminiAPI(query, system);
            document.getElementById(loadingId)?.remove();
            output.innerHTML += `
                <div class="p-4 bg-slate-900 border border-indigo-500/20 rounded-2xl rounded-tl-none text-xs text-slate-100 max-w-[85%] leading-relaxed whitespace-pre-wrap">
                    ${answer}
                </div>
            `;
        } catch(err) {
            document.getElementById(loadingId)?.remove();
            output.innerHTML += `
                <div class="p-3.5 bg-slate-900 border border-white/5 rounded-2xl text-xs text-slate-300">
                    Recordá consultar la Ley 12.521 y el Manual ISEP 2026 Pág. 69.
                    <span class="block mt-1 font-bold text-indigo-400">[Fuente: Ley 12.521 / ISEP]</span>
                </div>
            `;
        }
        output.scrollTop = output.scrollHeight;
    };

    window.switchAcademyTab = (tab) => {
        window.academyActiveTab = tab;
        renderAcademia(viewContainer);
    };

    window.selectExamOption = (qIdx, optIdx) => {
        window.currentExamAnswers[qIdx] = optIdx;
        renderAcademia(viewContainer);
    };

    window.submitAcademyExam = () => {
        window.examSubmitted = true;
        renderAcademia(viewContainer);
    };

    window.resetAcademyExam = () => {
        window.currentExamAnswers = {};
        window.examSubmitted = false;
        renderAcademia(viewContainer);
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
        renderAcademia(viewContainer);
    };

    window.nextFlashcard = (total) => {
        window.flashcardFlipped = false;
        window.currentFlashcardIndex = (window.currentFlashcardIndex + 1) % total;
        renderAcademia(viewContainer);
    };

    window.playAudiobook = (titleEnc, contentEnc, unitId) => {
        const title = decodeURIComponent(titleEnc);
        const content = decodeURIComponent(contentEnc);

        if (!('speechSynthesis' in window)) {
            showToast("Tu navegador no soporta síntesis de voz");
            return;
        }

        if (window.currentPlayingUnitId === unitId) {
            window.speechSynthesis.cancel();
            window.currentPlayingUnitId = null;
            renderAcademia(viewContainer);
            return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${title}. ${content}`);
        utterance.lang = 'es-AR';
        utterance.rate = window.podcastSpeed || 1.05;

        utterance.onend = () => { window.currentPlayingUnitId = null; renderAcademia(viewContainer); };
        utterance.onerror = () => { window.currentPlayingUnitId = null; renderAcademia(viewContainer); };

        window.currentPlayingUnitId = unitId;
        window.speechSynthesis.speak(utterance);
        showToast("Reproduciendo audio...");
        renderAcademia(viewContainer);
    };

    window.resetAcademySetup = () => {
        if (!confirm("¿Querés cambiar de jerarquía u orientación?")) return;
        localStorage.removeItem('academy_setup_completed');
        window.academySetupStep = 1;
        renderAcademia(viewContainer);
    };

    container.innerHTML = getHTML();
}
