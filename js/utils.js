/**
 * Adicionales Santa Fe - Utilities
 */

// --- Security: XSS Sanitizer ---
window.escapeHTML = function (str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};


const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium z-[100] transition-opacity duration-300 opacity-0';
    toast.innerText = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.remove('opacity-0'));

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
};

const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`✅ ${label} copiado`);
    }).catch(err => {
        console.error('Error copying:', err);
        showToast("❌ Error al copiar");
    });
};

// Global Debug Logger
const debugLog = (msg) => {
    const consoleEl = document.getElementById('debug-console');
    if (consoleEl) {
        const time = new Date().toLocaleTimeString();
        consoleEl.innerHTML += `<div>[${time}] ${msg}</div>`;
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }
    console.log('[DEBUG]', msg);
};

const isIOS = () => {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};

const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone) || window.matchMedia('(display-mode: standalone)').matches;

// Global Formatting Utility
window.formatMoney = function (amount) {
    if (typeof amount !== 'number') amount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

// --- AI: Police Narrative Improver ---
window.improvePoliceNarrative = function (text, returnDetails = false) {
    if (!text) {
        return returnDetails ? { refinedText: "", changes: [] } : "";
    }

    let refined = text;
    const changes = [];

    // Diccionario enriquecido de mejoras (términos comunes -> términos profesionales con fundamento)
    const rules = [
        {
            regex: /vi a un (tipo|sujeto|hombre)/gi,
            replace: "se observa a un masculino",
            category: "Terminología Policial",
            explanation: "Sustituye términos coloquiales por la terminología formal de identificación policial ('masculino')."
        },
        {
            regex: /vi a una (mujer|chica|sujeta)/gi,
            replace: "se observa a una femenina",
            category: "Terminología Policial",
            explanation: "Sustituye términos informales por la denominación técnica policial ('femenina')."
        },
        {
            regex: /estaba robando/gi,
            replace: "se encontraba cometiendo un ilícito",
            category: "Precisión Legal",
            explanation: "Utiliza una fórmula jurídica neutral previo a la calificación definitiva del hecho por la fiscalía."
        },
        {
            regex: /le pegó a/gi,
            replace: "propinó golpes a",
            category: "Terminología Policial",
            explanation: "Describe la agresión física de manera formal y objetiva en el sumario."
        },
        {
            regex: /corrió por/gi,
            replace: "emprendió veloz huida por",
            category: "Terminología Policial",
            explanation: "Describe el escape utilizando la fraseología estandarizada de actas de procedimiento."
        },
        {
            regex: /lo agarramos/gi,
            replace: "se procedió a la aprehensión del mismo",
            category: "Precisión Legal",
            explanation: "Sustituye expresiones vulgares por la figura procesal correcta de 'aprehensión' (Art. 212 CPP SF)."
        },
        {
            regex: /llame al/gi,
            replace: "se entabló comunicación con",
            category: "Terminología Policial",
            explanation: "Formaliza la comunicación con la Central de Emergencias o Fiscalías de turno."
        },
        {
            regex: /me dijo que/gi,
            replace: "manifestando el mismo que",
            category: "Terminología Policial",
            explanation: "Registra de manera forense los dichos espontáneos del compareciente o imputado."
        },
        {
            regex: /tenía un arma/gi,
            replace: "portaba un elemento similar a un arma de fuego",
            category: "Precisión Legal",
            explanation: "Evita prejuzgar sobre la aptitud del disparo hasta que se concrete la pericia balística oficial."
        },
        {
            regex: /tenia un arma/gi,
            replace: "portaba un elemento similar a un arma de fuego",
            category: "Precisión Legal",
            explanation: "Evita prejuzgar sobre la aptitud del disparo hasta que se concrete la pericia balística oficial."
        },
        {
            regex: /entramos a la casa/gi,
            replace: "se procedió al ingreso a la morada",
            category: "Precisión Legal",
            explanation: "Establece el ingreso de forma técnica y respetuosa de las formalidades constitucionales de allanamiento."
        },
        {
            regex: /en el medio de la calle/gi,
            replace: "en la vía pública",
            category: "Terminología Policial",
            explanation: "Utiliza la locución técnica oficial para espacios públicos exteriores de actuación."
        },
        {
            regex: /mirando para todos lados/gi,
            replace: "en actitud sospechosa, observando hacia diferentes puntos",
            category: "Terminología Policial",
            explanation: "Justifica el accionar preventivo describiendo de manera objetiva la conducta observada."
        },
        {
            regex: /salio de/gi,
            replace: "egresó de",
            category: "Ortografía y Gramática",
            explanation: "Corrige ortografía (salio -> salió) y formaliza la acción usando 'egresó'."
        },
        {
            regex: /entro a/gi,
            replace: "ingresó a",
            category: "Ortografía y Gramática",
            explanation: "Corrige ortografía (entro -> entró) y formaliza la acción usando 'ingresó'."
        },
        {
            regex: /me acerque/gi,
            replace: "procedí a acercarme",
            category: "Ortografía y Gramática",
            explanation: "Corrige la falta de tilde en primera persona del pretérito (acerqué)."
        },
        {
            regex: /lo pare/gi,
            replace: "procedí a interceptar al mismo",
            category: "Terminología Policial",
            explanation: "Utiliza el término operativo correcto de interceptación para control preventivo."
        },
        {
            regex: /robando cables/gi,
            replace: "sustrayendo cableado del tendido público",
            category: "Precisión Legal",
            explanation: "Describe formalmente el objeto y el tipo de delito contra el erario público."
        },
        {
            regex: /tirado en el piso/gi,
            replace: "tendido sobre la cinta asfáltica",
            category: "Terminología Policial",
            explanation: "Usa descripción forense formal para detallar el estado físico de personas o cosas."
        },
        {
            regex: /estaba roto/gi,
            replace: "presentaba daños visibles",
            category: "Terminología Policial",
            explanation: "Registra el estado material de forma objetiva sin prejuzgar causas o intencionalidades."
        },
        {
            regex: /no tenia documentos/gi,
            replace: "carecía de documentación que acredite su identidad",
            category: "Precisión Legal",
            explanation: "Formaliza técnicamente la falta de credenciales identificatorias (D.N.I.)."
        },
        {
            regex: /no tenía documentos/gi,
            replace: "carecía de documentación que acredite su identidad",
            category: "Precisión Legal",
            explanation: "Formaliza técnicamente la falta de credenciales identificatorias (D.N.I.)."
        },
        {
            regex: /\bvi\b/gi,
            replace: "se observa",
            category: "Terminología Policial",
            explanation: "Redacta en tercera persona del impersonal, regla fundamental en la confección de sumarios policiales."
        },
        {
            regex: /\bvimos\b/gi,
            replace: "se observa",
            category: "Terminología Policial",
            explanation: "Redacta en tercera persona del impersonal, estándar obligatorio para actas policiales."
        },
        {
            regex: /\bfui\b/gi,
            replace: "me comisioné",
            category: "Terminología Policial",
            explanation: "Usa la denominación operativa 'comisionarse' al responder a un llamado del despacho o superior."
        },
        {
            regex: /\bfuimos\b/gi,
            replace: "nos comisionamos",
            category: "Terminología Policial",
            explanation: "Usa la denominación operativa 'comisionarse' para traslados ordenados de personal en servicio."
        },
        {
            regex: /\bllegue\b/gi,
            replace: "arribé",
            category: "Ortografía y Gramática",
            explanation: "Corrige ortografía (llegue -> llegué) e introduce el verbo de arribo operativo formal."
        },
        {
            regex: /\bllegamos\b/gi,
            replace: "arribamos",
            category: "Terminología Policial",
            explanation: "Sustituye 'llegamos' por el verbo técnico 'arribamos' para dejar constancia de llegada al destino."
        },
        {
            regex: /\bhice\b/gi,
            replace: "procedí a realizar",
            category: "Terminología Policial",
            explanation: "Evita el uso informal y egocéntrico de la primera persona simple en la enumeración de tareas."
        },
        {
            regex: /\bhicimos\b/gi,
            replace: "se procedió a realizar",
            category: "Terminología Policial",
            explanation: "Redacta en impersonal las actuaciones y tareas conjuntas de la dotación policial."
        },
        {
            regex: /\btenia\b/gi,
            replace: "poseía",
            category: "Ortografía y Gramática",
            explanation: "Corrige ortografía (tenia -> tenía) y formaliza la posesión o pertenencia."
        },
        {
            regex: /\btenía\b/gi,
            replace: "poseía",
            category: "Terminología Policial",
            explanation: "Utiliza un verbo más profesional ('poseía') para registrar la tenencia de bienes u objetos."
        },
        {
            regex: /\bestaba\b/gi,
            replace: "se encontraba",
            category: "Terminología Policial",
            explanation: "Sustituye por la fórmula técnica descriptiva de estado o ubicación de interés forense."
        },
        {
            regex: /\bestaban\b/gi,
            replace: "se encontraban",
            category: "Terminología Policial",
            explanation: "Sustituye por la fórmula técnica descriptiva de estado o ubicación colectiva."
        },
        {
            regex: /\bcomisaria\b/gi,
            replace: "comisaría",
            category: "Ortografía y Gramática",
            explanation: "Corrige la falta de tilde en la palabra esdrújula 'comisaría'."
        },
        {
            regex: /\bpolicia\b/gi,
            replace: "policía",
            category: "Ortografía y Gramática",
            explanation: "Corrige la falta de tilde en la palabra grave 'policía'."
        },
        {
            regex: /\bprocedio\b/gi,
            replace: "procedió",
            category: "Ortografía y Gramática",
            explanation: "Corrige la tilde en el pretérito perfecto simple de tercera persona 'procedió'."
        },
        {
            regex: /\bactuo\b/gi,
            replace: "actuó",
            category: "Ortografía y Gramática",
            explanation: "Corrige la tilde en el pretérito perfecto simple de tercera persona 'actuó'."
        },
        {
            regex: /\bfiscalia\b/gi,
            replace: "fiscalía",
            category: "Ortografía y Gramática",
            explanation: "Corrige la falta de tilde en la palabra grave con hiato 'fiscalía'."
        },
        {
            regex: /\bbunker\b/gi,
            replace: "búnker",
            category: "Ortografía y Gramática",
            explanation: "Corrige la tilde en la palabra 'búnker'."
        },
        {
            regex: /estaba vendiendo droga/gi,
            replace: "se encontraba presuntamente comercializando material estupefaciente",
            category: "Precisión Legal",
            explanation: "Respeta el principio de presunción de inocencia y encuadra la conducta bajo la terminología de la Ley 23.737."
        },
        {
            regex: /tenia fasos/gi,
            replace: "poseía envoltorios de sustancia vegetal similar a marihuana",
            category: "Precisión Legal",
            explanation: "Registra objetivamente la morfología y sospecha de la sustancia sin calificarla químicamente antes de los tests de reactivos."
        },
        {
            regex: /tenia merca/gi,
            replace: "poseía envoltorios de sustancia polvorienta blanquecina similar a cocaína",
            category: "Precisión Legal",
            explanation: "Describe el estupefaciente de manera científica y formal, evitando modismos callejeros."
        },
        {
            regex: /ladron/gi,
            replace: "presunto autor del hecho",
            category: "Precisión Legal",
            explanation: "Sustituye la imputación directa por 'presunto autor' resguardando las garantías constitucionales del proceso."
        },
        {
            regex: /chapa patente/gi,
            replace: "dominio vehicular",
            category: "Terminología Policial",
            explanation: "Utiliza el término correcto correspondiente al Registro Nacional de la Propiedad del Automotor."
        }
    ];

    rules.forEach(rule => {
        const textBefore = refined;
        refined = refined.replace(rule.regex, rule.replace);
        if (refined !== textBefore) {
            // Extraer el texto original que emparejó
            const matches = textBefore.match(rule.regex);
            const originalMatch = matches ? matches[0] : "...";
            changes.push({
                original: originalMatch,
                replacement: rule.replace,
                category: rule.category,
                explanation: rule.explanation
            });
        }
    });

    // Mejoras de estructura (Mayúscula al inicio, punto al final)
    let finalRefined = refined.trim();
    if (finalRefined.length > 0) {
        const firstChar = finalRefined.charAt(0);
        if (firstChar !== firstChar.toUpperCase()) {
            finalRefined = firstChar.toUpperCase() + finalRefined.slice(1);
            changes.push({
                original: firstChar,
                replacement: firstChar.toUpperCase(),
                category: "Ortografía y Gramática",
                explanation: "Las oraciones y párrafos en actas e informes policiales deben comenzar con letra mayúscula."
            });
        }
        if (!finalRefined.endsWith(".")) {
            finalRefined += ".";
            changes.push({
                original: "(Sin punto al final)",
                replacement: ".",
                category: "Ortografía y Gramática",
                explanation: "Toda acta de constatación, notificación o informativa requiere finalizar con un punto ortográfico de cierre."
            });
        }
    }

    return returnDetails ? { refinedText: finalRefined, changes } : finalRefined;
};

window.compressImage = function (dataUrl, maxWidth = 800, maxHeight = 800, quality = 0.6) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.height > 0 ? canvas.getContext('2d') : null;
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            } else {
                resolve(dataUrl); // Fallback
            }
        };
        img.onerror = () => resolve(dataUrl);
    });
};

// Export to window for global access (backward compatibility)
window.showToast = showToast;
window.copyToClipboard = copyToClipboard;
window.debugLog = debugLog;
window.isIOS = isIOS;
window.isInStandaloneMode = isInStandaloneMode;
window.improvePoliceNarrative = improvePoliceNarrative;
// Donation Modal (Global)
window.showDonationModal = () => {
    const existing = document.getElementById('donation-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'donation-modal-overlay';
    overlay.className = 'fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-fade-in';
    overlay.innerHTML = `
        <div class="glass-card w-full max-w-md p-6 rounded-3xl border border-amber-500/30 bg-slate-950/95 shadow-2xl shadow-amber-500/20 text-center relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar" style="animation: scaleUp 0.3s ease-out">
            <!-- Decorative Glow Elements -->
            <div class="absolute -top-24 -left-24 size-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -right-24 size-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <button onclick="document.getElementById('donation-modal-overlay').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full transition-colors">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>

            <!-- Police Community Header -->
            <div class="inline-flex items-center justify-center size-16 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/30 mb-3">
                <span class="material-symbols-outlined text-3xl">volunteer_activism</span>
            </div>
            
            <h2 class="text-xl font-black text-white">Apoyá el Desarrollo</h2>
            <p class="text-xs text-amber-300 font-bold uppercase tracking-wider mt-0.5">Proyecto Independiente · Policía de Santa Fe</p>

            <p class="text-xs text-slate-300 leading-relaxed mt-3 mb-4 text-left">
                <strong>Adicionales Santa Fe</strong> es una herramienta creada a pulmón por y para la Policía provincial, sin subsidios ni publicidad invasiva. Tu colaboración voluntaria nos permite costear los servidores en la nube de Google, el motor de Inteligencia Artificial Centinela y el soporte técnico continuo.
            </p>

            <!-- SUGGESTED TIERS -->
            <div class="text-left mb-4">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Montos Sugeridos de Colaboración:</p>
                <div class="grid grid-cols-3 gap-2">
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-amber-500/40 transition-all cursor-pointer" onclick="copyToClipboard('SmartFlow.Digital', 'Alias'); showToast('☕ Alias copiado para $1.000');">
                        <p class="text-base mb-0.5">☕</p>
                        <p class="text-xs font-black text-white">$1.000</p>
                        <p class="text-[9px] text-slate-400">Un café</p>
                    </div>
                    <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center hover:border-amber-500/60 transition-all cursor-pointer relative" onclick="copyToClipboard('SmartFlow.Digital', 'Alias'); showToast('🛡️ Alias copiado para $2.500');">
                        <span class="absolute -top-1.5 right-2 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[7px] font-black uppercase">Popular</span>
                        <p class="text-base mb-0.5">🛡️</p>
                        <p class="text-xs font-black text-amber-300">$2.500</p>
                        <p class="text-[9px] text-slate-300">Servidores</p>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-amber-500/40 transition-all cursor-pointer" onclick="copyToClipboard('SmartFlow.Digital', 'Alias'); showToast('🚀 Alias copiado para $5.000');">
                        <p class="text-base mb-0.5">🚀</p>
                        <p class="text-xs font-black text-white">$5.000</p>
                        <p class="text-[9px] text-slate-400">Destacado</p>
                    </div>
                </div>
            </div>

            <!-- TRANSFER DATA -->
            <div class="space-y-2 mb-4 text-left">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1">Datos oficiales de transferencia:</p>
                
                <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias')" class="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-amber-500/20 cursor-pointer hover:bg-amber-500/10 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-0.5">Alias Mercado Pago</p>
                        <p class="text-xs font-mono font-black text-amber-300 group-hover:text-amber-200 transition-colors">SmartFlow.Digital</p>
                    </div>
                    <div class="size-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <span class="material-symbols-outlined text-sm">content_copy</span>
                    </div>
                </div>

                <div onclick="copyToClipboard('0000003100001906497190', 'CVU')" class="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98] group">
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
                <a href="https://wa.me/5493425162372?text=Hola%20Nico!%20Te%20acabo%20de%20enviar%20un%20aporte%20voluntario%20para%20apoyar%20el%20desarrollo%20de%20Adicionales%20Santa%20Fe.%20%C2%A1Muchas%20gracias%20por%20la%20app!" target="_blank"
                    class="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-lg">chat</span>
                    Avisar Aporte por WhatsApp
                </a>

                <button onclick="document.getElementById('donation-modal-overlay').remove()" class="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-bold text-xs rounded-2xl border border-white/5 transition-all">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
};
window._showDonationModal = window.showDonationModal;

// --- Google Gemini AI API Integration ---
window.getGeminiAPIKey = function () {
    if (window.GeminiService) return window.GeminiService.getApiKey();
    return localStorage.getItem('gemini_api_key') || window.store?.user?.geminiApiKey || window.globalSystemConfig?.geminiApiKey || "";
};

window.showGeminiKeyModal = function () {
    const existing = document.getElementById('gemini-key-modal-overlay');
    if (existing) existing.remove();

    const rawKey = window.getGeminiAPIKey();
    const hasKey = !!rawKey;

    const modal = document.createElement('div');
    modal.id = 'gemini-key-modal-overlay';
    modal.className = 'fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-fade-in';

    modal.innerHTML = `
        <div class="glass-card-notebook p-6 max-w-md w-full bg-slate-950 border border-white/10 rounded-3xl shadow-2xl space-y-5 text-left relative overflow-hidden">
            <div class="absolute -top-12 -right-12 size-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div class="flex justify-between items-center relative z-10">
                <div class="flex items-center gap-2.5">
                    <div class="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <span class="material-symbols-outlined text-xl">key</span>
                    </div>
                    <div>
                        <h3 class="text-sm font-black text-white uppercase tracking-wider">Configurar API Key de Gemini</h3>
                        <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Google Generative AI 2.0</p>
                    </div>
                </div>
                <button onclick="document.getElementById('gemini-key-modal-overlay').remove()" class="size-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
            </div>

            <div class="p-3.5 rounded-2xl border ${hasKey ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'} flex items-center justify-between text-xs font-semibold">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">${hasKey ? 'lock' : 'key_off'}</span>
                    <span>${hasKey ? 'Estado: API Key Configurada' : 'Estado: Sin API Key Configurada'}</span>
                </div>
                ${hasKey ? '<span class="text-[9px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Encriptado</span>' : ''}
            </div>

            <div class="space-y-3 relative z-10">
                <label class="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Ingresar / Actualizar Clave de API
                </label>
                <div class="relative flex items-center">
                    <input type="password" id="secureGeminiKeyInput" placeholder="${hasKey ? '••••••••••••••••••••••••••••••••' : 'AIzaSy...'}" 
                        class="w-full bg-slate-900/90 border border-white/15 rounded-xl pl-4 pr-11 py-3 text-xs text-white placeholder-slate-500 font-mono outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all">
                    <button type="button" onclick="window.toggleKeyVisibility()" class="absolute right-3 text-slate-400 hover:text-white p-1 transition-colors">
                        <span id="keyVisibilityIcon" class="material-symbols-outlined text-lg">visibility</span>
                    </button>
                </div>
                <p class="text-[10px] text-slate-400 leading-relaxed">
                    Obtené tu clave gratuita de Google Gemini en 10 segundos en <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" class="text-indigo-400 hover:underline font-bold">Google AI Studio <span class="material-symbols-outlined text-[10px]">open_in_new</span></a>. Tu clave se almacena localmente de forma segura.
                </p>
            </div>

            <div class="space-y-2 pt-2 relative z-10">
                <button onclick="window.saveSecureGeminiKey()" class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-sm">save</span>
                    Guardar Clave
                </button>
                ${hasKey ? `
                    <button onclick="window.removeSecureGeminiKey()" class="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5">
                        <span class="material-symbols-outlined text-sm">delete</span>
                        Eliminar Clave del Dispositivo
                    </button>
                ` : ''}
            </div>
        </div>
    `;

    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
};

window.toggleKeyVisibility = function () {
    const input = document.getElementById('secureGeminiKeyInput');
    const icon = document.getElementById('keyVisibilityIcon');
    if (!input || !icon) return;
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerText = 'visibility_off';
    } else {
        input.type = 'password';
        icon.innerText = 'visibility';
    }
};

window.saveSecureGeminiKey = function () {
    const input = document.getElementById('secureGeminiKeyInput');
    const val = input ? input.value.trim() : '';
    if (!val) {
        showToast("⚠️ Ingresá una clave válida de Gemini");
        return;
    }
    if (window.GeminiService) {
        window.GeminiService.setApiKey(val);
    } else {
        localStorage.setItem('gemini_api_key', val);
    }
    document.getElementById('gemini-key-modal-overlay')?.remove();
    showToast("🔒 Clave Gemini API guardada de forma segura");
    if (typeof renderAcademia === 'function') {
        const app = document.getElementById('app');
        if (app && window.location.hash.includes('academia')) renderAcademia(app);
    }
};

window.removeSecureGeminiKey = function () {
    if (window.GeminiService) {
        window.GeminiService.setApiKey('');
    }
    localStorage.removeItem('gemini_api_key');
    document.getElementById('gemini-key-modal-overlay')?.remove();
    showToast("ℹ️ Clave eliminada del dispositivo");
    if (typeof renderAcademia === 'function') {
        const app = document.getElementById('app');
        if (app && window.location.hash.includes('academia')) renderAcademia(app);
    }
};

window.callGeminiAPI = async function (userPrompt, systemInstruction = "") {
    if (window.GeminiService) {
        const result = await window.GeminiService.query(userPrompt, { systemPrompt: systemInstruction });
        if (result.success && result.text) {
            return result.text;
        } else if (result.needApiKey) {
            window.showGeminiKeyModal();
            throw new Error(result.message);
        } else {
            throw new Error(result.error || "Error al conectar con Gemini AI.");
        }
    }

    let apiKey = window.getGeminiAPIKey();
    if (!apiKey) {
        window.showGeminiKeyModal();
        apiKey = window.getGeminiAPIKey();
        if (!apiKey) {
            throw new Error("Se requiere una API Key de Google Gemini para usar esta función.");
        }
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const defaultSystem = `Sos Centinela AI y Tutor de la Academia PRO ISEP de la Policía de la Provincia de Santa Fe (Argentina). Conocés a fondo el Manual Oficial ISEP 2026 de 344 páginas (Oficial de Policía - Escalafón General), Ley 12.521, Decreto 461/15, CPP Ley 12.734, Ley 14.283 de adicionales y reforma previsional. Respondés en español rioplatense, de forma precisa, clara, citando los artículos y leyes aplicables.`;

    const payload = {
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction || defaultSystem }] }
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error?.message || `Error HTTP ${res.status}`);
        }

        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("Respuesta vacía recibida de Gemini AI.");
        return text;
    } catch (err) {
        console.error("Gemini API Error:", err);
        throw err;
    }
};

