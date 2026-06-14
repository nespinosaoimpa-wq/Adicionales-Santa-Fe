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
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-end justify-center animate-fade-in';
    overlay.innerHTML = `
        <div class="bg-slate-950 w-full max-w-md rounded-t-[2.5rem] border-t-4 border-[#74ACDF] p-8 pb-12 animate-slide-up shadow-2xl relative overflow-hidden">
            <!-- Decorative Flag Background Elements -->
            <div class="absolute -right-12 -top-12 size-36 bg-[#74ACDF]/10 rounded-full blur-2xl"></div>
            <div class="absolute -left-12 -bottom-12 size-36 bg-[#F6B426]/10 rounded-full blur-2xl"></div>
            
            <div class="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6"></div>
            
            <!-- World Cup Header -->
            <div class="flex items-center gap-4 mb-6 relative z-10">
                <div class="size-14 rounded-2xl bg-gradient-to-br from-[#74ACDF] to-[#F6B426] flex items-center justify-center text-white shadow-lg shadow-[#74ACDF]/20 relative">
                    <span class="material-symbols-outlined text-3xl animate-bounce">emoji_events</span>
                    <!-- Small soccer ball badge -->
                    <span class="absolute -bottom-1.5 -right-1.5 bg-slate-950 text-[10px] p-0.5 rounded-full border border-[#74ACDF]">⚽</span>
                </div>
                <div>
                    <h3 class="font-extrabold text-white text-lg tracking-tight flex items-center gap-1.5">
                        ¡Apoyá la App! <span class="text-sm">🇦🇷</span>
                    </h3>
                    <p class="text-[9px] text-[#F6B426] font-black uppercase tracking-[0.2em]">Colaboración · Modo Mundial 🏆</p>
                </div>
            </div>
            
            <p class="text-[12.5px] text-slate-300 leading-relaxed mb-6 relative z-10">
                Desarrollar y mejorar esta herramienta sin publicidad invasiva es posible gracias al apoyo voluntario de los oficiales. Si te resulta valiosa en tu día a día, tu colaboración nos ayuda a seguir sumando mejoras y mantener la infraestructura activa. ¡Cada granito de arena cuenta!
                <br><br>
                <strong class="text-white">Tocá cada dato para copiarlo:</strong>
            </p>
            
            <!-- Donation Info Box -->
            <div class="space-y-3 mb-8 relative z-10">
                <div onclick="copyToClipboard('SmartFlow.Digital', 'Alias')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-[#74ACDF]/10 hover:border-[#74ACDF]/30 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Alias Mercado Pago</p>
                        <p class="text-base font-mono font-black text-white group-hover:text-[#74ACDF] transition-colors">SmartFlow.Digital</p>
                    </div>
                    <div class="size-8 rounded-full bg-[#74ACDF]/10 flex items-center justify-center text-[#74ACDF] group-hover:bg-[#74ACDF] group-hover:text-slate-950 transition-colors">
                        <span class="material-symbols-outlined text-base">content_copy</span>
                    </div>
                </div>
                
                <div onclick="copyToClipboard('0000003100001906497190', 'CVU')" class="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-[#74ACDF]/10 hover:border-[#74ACDF]/30 transition-all active:scale-[0.98] group">
                    <div>
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">CVU</p>
                        <p class="text-xs font-mono font-bold text-white group-hover:text-[#74ACDF] transition-colors">0000003100001906497190</p>
                    </div>
                    <div class="size-8 rounded-full bg-[#74ACDF]/10 flex items-center justify-center text-[#74ACDF] group-hover:bg-[#74ACDF] group-hover:text-slate-950 transition-colors">
                        <span class="material-symbols-outlined text-base">content_copy</span>
                    </div>
                </div>
            </div>
            
            <button onclick="this.closest('.fixed').remove()" class="w-full py-2 text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
                Volver
            </button>
        </div>
    `;
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
};
