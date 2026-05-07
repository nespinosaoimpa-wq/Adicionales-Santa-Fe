/**
 * Adicionales Santa Fe - Generador de Actas Policiales
 * Módulo de creación de documentos formales policiales
 */

// ── AJUSTES DE FORMATO ──
function getActaSettings() {
    const defaults = {
        header: `POLICÍA DE LA PROVINCIA DE SANTA FE\nADICIONALES SANTA FE - ASISTENTE VIRTUAL`,
        footer: `Con lo que no siendo para más, se da por finalizada la presente actuación, previa lectura y ratificación de su contenido, firmando los intervinientes de plena conformidad por ante mí y testigos de actuación que certifican lo actuado.`,
        signature: `${store.user?.name || 'FUNCIONARIO POLICIAL'}\nLegajo: ${store.user?.badge || '________'}`
    };
    try {
        const saved = JSON.parse(localStorage.getItem('acta_format_settings') || 'null');
        return saved ? { ...defaults, ...saved } : defaults;
    } catch (e) {
        return defaults;
    }
}

function renderActasSettings(container) {
    if (!container) container = document.getElementById('app');
    const settings = getActaSettings();

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente/actas')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-sm font-black text-white leading-none">Ajustes de Formato</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Membretes y Firmas</span>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="px-1 space-y-1">
                <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Personalizar Acta</h2>
                <p class="text-[11px] text-slate-400 leading-relaxed">Configurá el membrete de tu brigada y tu firma para que aparezcan en todos los documentos.</p>
            </div>

            <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-6">
                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Encabezado / Membrete</label>
                    <textarea id="set-acta-header" class="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="Ej: BRIGADA MOTORIZADA - UR I">${settings.header}</textarea>
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Cierre de Acta (Pie)</label>
                    <textarea id="set-acta-footer" class="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none">${settings.footer}</textarea>
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Firma / Legajo</label>
                    <textarea id="set-acta-signature" class="w-full h-20 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder="Nombre y Legajo">${settings.signature}</textarea>
                </div>

                <button onclick="window._saveActaSettings()" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span class="material-symbols-outlined">save</span>Guardar Cambios
                </button>
            </div>
        </main>
        ${renderBottomNav('asistente')}
    `;

    window._saveActaSettings = () => {
        const header = document.getElementById('set-acta-header').value.trim();
        const footer = document.getElementById('set-acta-footer').value.trim();
        const signature = document.getElementById('set-acta-signature').value.trim();

        localStorage.setItem('acta_format_settings', JSON.stringify({ header, footer, signature }));
        showToast('✅ Formato actualizado');
        router.navigateTo('#asistente/actas');
    };
}


// ── PLANTILLAS DE ACTAS ──
const ACTA_TEMPLATES = {
    allanamiento: {
        title: 'Acta de Allanamiento',
        icon: 'home_work',
        color: 'from-red-500 to-rose-600',
        fields: [
            { id: 'juzgado', label: 'Juzgado Interviniente', type: 'text', required: true },
            { id: 'nro_causa', label: 'N° de Causa', type: 'text', required: true },
            { id: 'fiscal', label: 'Fiscal Actuante', type: 'text', required: true },
            { id: 'direccion', label: 'Dirección del Domicilio', type: 'text', required: true },
            { id: 'localidad', label: 'Localidad', type: 'text', required: true },
            { id: 'fecha_orden', label: 'Fecha de la Orden', type: 'date', required: true },
            { id: 'testigo1', label: 'Testigo 1 (Nombre y DNI)', type: 'text', required: true },
            { id: 'testigo2', label: 'Testigo 2 (Nombre y DNI)', type: 'text', required: false },
            { id: 'inventario', label: 'Inventario de Elementos Secuestrados', type: 'textarea', required: true },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', required: false }
        ]
    },
    custodia: {
        title: 'Cadena de Custodia (Rótulo)',
        icon: 'inventory',
        color: 'from-amber-500 to-orange-600',
        fields: [
            { id: 'imputado', label: 'Imputado', type: 'text', required: true },
            { id: 'cuij', label: 'CUIJ', type: 'text', required: true },
            { id: 'victima', label: 'Víctima', type: 'text', required: true },
            { id: 'fiscal', label: 'Fiscal Interviniente', type: 'text', required: true },
            { id: 'procedimiento', label: 'Procedimiento (Allanamiento, Requisa, etc)', type: 'text', required: true },
            { id: 'elementos', label: 'Detalle de Elementos (N°, Descrip, Lugar, Cant)', type: 'textarea', required: true },
            { id: 'embalaje', label: 'Embalaje (Bolsa plástica/papel, Frasco, etc)', type: 'text', required: true },
            { id: 'recolector', label: 'Funcionario que Recolecta', type: 'text', required: true },
            { id: 'recolector_cargo', label: 'Cargo y Dependencia', type: 'text', required: true },
            { id: 'testigos', label: 'Testigos (Nombre, DNI, Tel)', type: 'textarea', required: false },
            { id: 'observaciones', label: 'Observaciones / Estado', type: 'textarea', required: false }
        ]
    },
    procedimiento: {
        title: 'Acta de Procedimiento',
        icon: 'assignment',
        color: 'from-blue-500 to-indigo-600',
        fields: [
            { id: 'tipo_procedimiento', label: 'Tipo de Procedimiento', type: 'select', options: ['Flagrancia', 'Requisa Personal', 'Control Vehicular', 'Prevención', 'Operativo Cerrojo', 'Otro'], required: true },
            { id: 'lugar', label: 'Lugar del Hecho', type: 'text', required: true },
            { id: 'localidad', label: 'Localidad', type: 'text', required: true },
            { id: 'involucrados', label: 'Personas Involucradas (nombre, DNI)', type: 'textarea', required: true },
            { id: 'descripcion', label: 'Descripción de los Hechos', type: 'textarea', required: true },
            { id: 'resultado', label: 'Resultado del Procedimiento', type: 'textarea', required: true },
            { id: 'testigos', label: 'Testigos (nombre, DNI)', type: 'textarea', required: false },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', required: false }
        ]
    },
    secuestro: {
        title: 'Acta de Secuestro',
        icon: 'inventory_2',
        color: 'from-purple-500 to-violet-600',
        fields: [
            { id: 'nro_causa', label: 'N° de Causa / Actuación', type: 'text', required: true },
            { id: 'lugar', label: 'Lugar del Secuestro', type: 'text', required: true },
            { id: 'elementos', label: 'Elementos Secuestrados (detalle)', type: 'textarea', required: true },
            { id: 'depositario', label: 'Depositario Judicial', type: 'text', required: true },
            { id: 'testigo1', label: 'Testigo 1 (Nombre y DNI)', type: 'text', required: true },
            { id: 'testigo2', label: 'Testigo 2 (Nombre y DNI)', type: 'text', required: false },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', required: false }
        ]
    },
    notificacion: {
        title: 'Acta de Notificación',
        icon: 'mark_email_read',
        color: 'from-teal-500 to-cyan-600',
        fields: [
            { id: 'notificado_nombre', label: 'Nombre del Notificado', type: 'text', required: true },
            { id: 'notificado_dni', label: 'DNI del Notificado', type: 'text', required: true },
            { id: 'domicilio', label: 'Domicilio del Notificado', type: 'text', required: true },
            { id: 'contenido', label: 'Contenido de la Notificación', type: 'textarea', required: true },
            { id: 'autoridad', label: 'Autoridad que Ordena', type: 'text', required: true },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', required: false }
        ]
    },
    campo: {
        title: 'Informe de Tareas de Campo',
        icon: 'explore',
        color: 'from-emerald-500 to-green-600',
        fields: [
            { id: 'objetivo', label: 'Objetivo de la Tarea', type: 'text', required: true },
            { id: 'zona', label: 'Zona / Sector Asignado', type: 'text', required: true },
            { id: 'horario', label: 'Horario de Cobertura', type: 'text', required: true },
            { id: 'personal', label: 'Personal Interviniente', type: 'textarea', required: true },
            { id: 'novedades', label: 'Novedades Registradas', type: 'textarea', required: true },
            { id: 'resultado', label: 'Resultado', type: 'textarea', required: true },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', required: false }
        ]
    },
    denuncia: {
        title: 'Acta de Recepción de Denuncia',
        icon: 'report',
        color: 'from-rose-500 to-red-600',
        fields: [
            { id: 'denunciante_nombre', label: 'Nombre del Denunciante', type: 'text', required: true },
            { id: 'denunciante_dni', label: 'DNI del Denunciante', type: 'text', required: true },
            { id: 'denunciante_domicilio', label: 'Domicilio', type: 'text', required: true },
            { id: 'denunciante_telefono', label: 'Teléfono de Contacto', type: 'text', required: false },
            { id: 'hechos', label: 'Relato Circunstanciado de los Hechos', type: 'textarea', required: true },
            { id: 'lugar_hecho', label: 'Lugar del Hecho', type: 'text', required: true },
            { id: 'fecha_hecho', label: 'Fecha y Hora del Hecho', type: 'text', required: true },
            { id: 'testigos', label: 'Testigos (si los hubiere)', type: 'textarea', required: false },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', required: false }
        ]
    },
    oficio: {
        title: 'Oficio Judicial / Comunicación',
        icon: 'mail',
        color: 'from-slate-600 to-slate-800',
        fields: [
            { id: 'destinatario', label: 'Destinatario (Autoridad/Cargo)', type: 'text', required: true },
            { id: 'dependencia', label: 'Dependencia / Organismo', type: 'text', required: true },
            { id: 'referencia', label: 'Referencia (CUIJ / Nro. Causa)', type: 'text', required: true },
            { id: 'objeto', label: 'Objeto de la Comunicación', type: 'text', required: true },
            { id: 'cuerpo', label: 'Cuerpo del Mensaje (Narrativa)', type: 'textarea', required: true },
            { id: 'anexos', label: 'Documentación Anexa', type: 'text', required: false }
        ]
    }
};

// ── GENERADOR DE TEXTO FORMAL ──
function generateActaText(tipo, data) {
    const settings = getActaSettings();
    const now = new Date();
    const fecha = now.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const hora = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const userName = store.user?.name || 'FUNCIONARIO POLICIAL';

    const header = `═══════════════════════════════════════\n` +
        `${settings.header.toUpperCase()}\n` +
        `${ACTA_TEMPLATES[tipo].title.toUpperCase()}\n` +
        `═══════════════════════════════════════\n\n` +
        `En la ciudad de ${data.localidad || data.zona || '________'}, Provincia de Santa Fe, ` +
        `a los ${now.getDate()} días del mes de ${now.toLocaleDateString('es-AR', { month: 'long' })} ` +
        `del año ${now.getFullYear()}, siendo las ${hora} horas, ` +
        `el/la suscripto/a ${userName}, en ejercicio de sus funciones, ` +
        `HACE CONSTAR:\n\n`;

    let body = '';

    switch (tipo) {
        case 'allanamiento':
            body = `Que en cumplimiento de la Orden de Allanamiento emanada del ${data.juzgado}, ` +
                `en el marco de la Causa N° ${data.nro_causa}, a cargo del/la Sr/a. Fiscal ${data.fiscal}, ` +
                `se procede al allanamiento del domicilio sito en ${data.direccion}, ${data.localidad}.\n\n` +
                `ORDEN JUDICIAL: Fecha ${data.fecha_orden}\n\n` +
                `TESTIGOS DE ACTUACIÓN:\n` +
                `1) ${data.testigo1}\n` +
                `${data.testigo2 ? '2) ' + data.testigo2 + '\n' : ''}\n` +
                `INVENTARIO DE ELEMENTOS SECUESTRADOS:\n${data.inventario}\n\n` +
                `${data.observaciones ? 'OBSERVACIONES: ' + data.observaciones + '\n\n' : ''}`;
            break;
        case 'custodia':
            body = `RÓTULO DE ELEMENTOS SECUESTRADOS\n` +
                `IMPUTADO: ${data.imputado}\t\tCUIJ: ${data.cuij}\n` +
                `VÍCTIMA: ${data.victima}\t\tFISCAL: ${data.fiscal}\n` +
                `PROCEDIMIENTO: ${data.procedimiento}\n\n` +
                `DETALLE DE ELEMENTOS:\n${data.elementos}\n\n` +
                `EMBALAJE: ${data.embalaje}\n\n` +
                `FUNCIONARIO QUE EFECTUÓ LA RECOLECCIÓN:\n` +
                `${data.recolector} - ${data.recolector_cargo}\n\n` +
                `TESTIGOS CIVILES:\n${data.testigos || 'Sin testigos registrados'}\n\n` +
                `${data.observaciones ? 'OBSERVACIONES: ' + data.observaciones + '\n\n' : ''}`;
            break;
        case 'procedimiento':
            body = `Que encontrándose en funciones de prevención en ${data.lugar}, ${data.localidad}, ` +
                `se lleva a cabo procedimiento de tipo: ${data.tipo_procedimiento}.\n\n` +
                `PERSONAS INVOLUCRADAS:\n${data.involucrados}\n\n` +
                `DESCRIPCIÓN DE LOS HECHOS:\n${data.descripcion}\n\n` +
                `RESULTADO DEL PROCEDIMIENTO:\n${data.resultado}\n\n` +
                `${data.testigos ? 'TESTIGOS:\n' + data.testigos + '\n\n' : ''}` +
                `${data.observaciones ? 'OBSERVACIONES: ' + data.observaciones + '\n\n' : ''}`;
            break;
        case 'secuestro':
            body = `Se labra la presente en el marco de la actuación N° ${data.nro_causa}, ` +
                `a efectos de dejar constancia del secuestro de elementos en ${data.lugar}.\n\n` +
                `ELEMENTOS SECUESTRADOS:\n${data.elementos}\n\n` +
                `DEPOSITARIO JUDICIAL: ${data.depositario}\n\n` +
                `TESTIGOS:\n1) ${data.testigo1}\n` +
                `${data.testigo2 ? '2) ' + data.testigo2 + '\n' : ''}\n` +
                `${data.observaciones ? 'OBSERVACIONES: ' + data.observaciones + '\n\n' : ''}`;
            break;
        case 'notificacion':
            body = `Se procede a notificar al/la ciudadano/a ${data.notificado_nombre}, ` +
                `D.N.I. N° ${data.notificado_dni}, con domicilio en ${data.domicilio}, ` +
                `de lo dispuesto por ${data.autoridad}.\n\n` +
                `CONTENIDO DE LA NOTIFICACIÓN:\n${data.contenido}\n\n` +
                `${data.observaciones ? 'OBSERVACIONES: ' + data.observaciones + '\n\n' : ''}` +
                `Queda debidamente notificado/a, firmando al pie en señal de conformidad.\n\n`;
            break;
        case 'campo':
            body = `OBJETIVO: ${data.objetivo}\n` +
                `ZONA / SECTOR: ${data.zona}\n` +
                `HORARIO DE COBERTURA: ${data.horario}\n\n` +
                `PERSONAL INTERVINIENTE:\n${data.personal}\n\n` +
                `NOVEDADES REGISTRADAS:\n${data.novedades}\n\n` +
                `RESULTADO:\n${data.resultado}\n\n` +
                `${data.observaciones ? 'OBSERVACIONES: ' + data.observaciones + '\n\n' : ''}`;
            break;
        case 'denuncia':
            body = `Comparece ante esta dependencia policial el/la ciudadano/a ${data.denunciante_nombre}, ` +
                `D.N.I. N° ${data.denunciante_dni}, con domicilio real en ${data.denunciante_domicilio}` +
                `${data.denunciante_telefono ? ', teléfono de contacto: ' + data.denunciante_telefono : ''}, ` +
                `quien previa lectura de sus derechos y garantías legales, MANIFIESTA:\n\n` +
                `RELATO CIRCUNSTANCIADO DE LOS HECHOS:\n${data.hechos}\n\n` +
                `LUGAR DEL HECHO: ${data.lugar_hecho}\n` +
                `FECHA Y HORA: ${data.fecha_hecho}\n\n` +
                `${data.testigos ? 'TESTIGOS:\n' + data.testigos + '\n\n' : ''}` +
                `${data.observaciones ? 'OBSERVACIONES: ' + data.observaciones + '\n\n' : ''}`;
            break;
        case 'oficio':
            body = `A: ${data.destinatario}\n` +
                `DEPENDENCIA: ${data.dependencia}\n` +
                `REF: ${data.referencia}\n` +
                `OBJETO: ${data.objeto}\n\n` +
                `Tengo el agrado de dirigirme a Usted, en el marco de la actuación de referencia, ` +
                `a efectos de elevar a su conocimiento lo siguiente:\n\n` +
                `${data.cuerpo}\n\n` +
                `${data.anexos ? 'DOCUMENTACIÓN ANEXA: ' + data.anexos + '\n\n' : ''}` +
                `Sin otro particular, saludo a Usted muy atentamente.\n\n`;
            break;
    }

    const footer = `\n${settings.footer}\n\n` +
        `───────────────────────────────\n` +
        `Firma Funcionario Actuante\n` +
        `${settings.signature}\n` +
        `───────────────────────────────\n` +
        `Firma Interviniente/Notificado\n\n` +
        `───────────────────────────────\n` +
        `Firma Testigo 1\n\n` +
        `───────────────────────────────\n` +
        `Firma Testigo 2\n\n` +
        `Generado por Adicionales Santa Fe - ${fecha} ${hora}`;

    return header + body + footer;
}

// ── VISTA: HUB DE ACTAS ──
function renderActasHub(container) {
    if (!container) container = document.getElementById('app');

    const actaTypes = Object.entries(ACTA_TEMPLATES);

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="flex flex-col">
                    <h1 class="text-lg font-black text-white leading-none">Actas Policiales</h1>
                    <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Generador de Documentos Formales</span>
                </div>
            </div>
            <button onclick="router.navigateTo('#asistente/actas/settings')" class="size-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                <span class="material-symbols-outlined">settings</span>
            </button>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="px-1 space-y-1">
                <p class="text-xs text-slate-400 leading-relaxed">Seleccioná el tipo de acta que necesitás. El sistema generará un documento formal con todos los requisitos legales.</p>
            </div>

            <div class="grid gap-3">
                ${actaTypes.map(([key, tmpl], i) => `
                    <div onclick="router.navigateTo('#asistente/actas/${key}')"
                        class="group relative overflow-hidden glass-card p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all active:scale-[0.98] cursor-pointer"
                        style="animation: fadeIn 0.3s ease-out ${i * 60}ms both">
                        <div class="absolute -right-4 -top-4 size-20 bg-gradient-to-br ${tmpl.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        <div class="flex gap-4 items-center relative z-10">
                            <div class="size-11 rounded-xl bg-gradient-to-br ${tmpl.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                                <span class="material-symbols-outlined text-xl">${tmpl.icon}</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-bold text-white text-sm group-hover:text-primary transition-colors">${tmpl.title}</h3>
                                <p class="text-[10px] text-slate-500">${tmpl.fields.length} campos · Formato legal completo</p>
                            </div>
                            <span class="material-symbols-outlined text-slate-700">chevron_right</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div class="flex gap-3 items-start">
                    <span class="material-symbols-outlined text-amber-500 text-lg mt-0.5">info</span>
                    <p class="text-[11px] text-amber-200/80 leading-relaxed">
                        Los documentos generados son <strong>modelos orientativos</strong>. Verificá siempre con tu superior jerárquico antes de presentar cualquier acta oficial.
                    </p>
                </div>
            </div>

            ${typeof renderAdBanner === 'function' ? renderAdBanner() : ''}
        </main>
        ${renderBottomNav('asistente')}
    `;
}

// ── VISTA: FORMULARIO DE ACTA ──
function renderActaForm(container, tipo) {
    if (!container) container = document.getElementById('app');
    const tmpl = ACTA_TEMPLATES[tipo];
    if (!tmpl) { router.navigateTo('#asistente/actas'); return; }

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente/actas')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-sm font-black text-white leading-none">${tmpl.title}</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Completar Datos</span>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <form id="acta-form" class="space-y-4">
                <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-4">
                    ${tmpl.fields.map(f => {
                        if (f.type === 'textarea') {
                            return `<div class="space-y-1.5">
                                <div class="flex justify-between items-center px-1">
                                    <label class="text-[10px] font-bold text-primary uppercase">${f.label} ${f.required ? '*' : ''}</label>
                                    <button type="button" onclick="window._improveField('acta-${f.id}')" class="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-primary/20 transition-all">
                                        <span class="material-symbols-outlined text-[10px]">auto_awesome</span>Pulir Narrativa
                                    </button>
                                </div>
                                <textarea id="acta-${f.id}" ${f.required ? 'required' : ''} placeholder="${f.label}..."
                                    class="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
                            </div>`;
                        } else if (f.type === 'select') {
                            return `<div class="space-y-1.5">
                                <label class="text-[10px] font-bold text-primary uppercase ml-1">${f.label} ${f.required ? '*' : ''}</label>
                                <select id="acta-${f.id}" ${f.required ? 'required' : ''}
                                    class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                                    <option value="">Seleccionar...</option>
                                    ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                                </select>
                            </div>`;
                        } else {
                            return `<div class="space-y-1.5">
                                <label class="text-[10px] font-bold text-primary uppercase ml-1">${f.label} ${f.required ? '*' : ''}</label>
                                <input type="${f.type}" id="acta-${f.id}" ${f.required ? 'required' : ''} placeholder="${f.label}..."
                                    class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all">
                            </div>`;
                        }
                    }).join('')}
                </div>

                <button type="submit" id="btn-gen-acta"
                    class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span class="material-symbols-outlined">description</span>Generar ${tmpl.title}
                </button>
            </form>

            <div id="acta-result" class="hidden space-y-4">
                <div class="glass-card p-5 rounded-3xl border border-primary/20 bg-primary/5 relative">
                    <pre id="acta-output" class="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed"></pre>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <button onclick="window._downloadPDF()" class="py-3 rounded-xl bg-red-600/20 text-red-400 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all border border-red-500/30">
                        <span class="material-symbols-outlined text-sm">picture_as_pdf</span>PDF
                    </button>
                    <button onclick="window._downloadWord()" class="py-3 rounded-xl bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all border border-blue-500/30">
                        <span class="material-symbols-outlined text-sm">description</span>Word (.doc)
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <button onclick="window._copyActa()" class="py-3 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm">content_copy</span>Copiar
                    </button>
                    <button onclick="window._shareActaWA()" class="py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-sm">share</span>WhatsApp
                    </button>
                </div>

                <button onclick="window._newActa()" class="w-full py-3 rounded-xl bg-white/5 text-slate-400 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all border border-white/5">
                    <span class="material-symbols-outlined text-sm">add</span>Nueva Acta
                </button>
            </div>
        </main>
        ${renderBottomNav('asistente')}
    `;

    const form = document.getElementById('acta-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const data = {};
        tmpl.fields.forEach(f => {
            const el = document.getElementById('acta-' + f.id);
            data[f.id] = el ? el.value.trim() : '';
        });

        const text = generateActaText(tipo, data);
        document.getElementById('acta-output').innerText = text;
        document.getElementById('acta-result').classList.remove('hidden');
        document.getElementById('btn-gen-acta').innerHTML = '<span class="material-symbols-outlined">check_circle</span>Acta Generada';
        showToast('✅ Acta generada correctamente');

        // Save to localStorage for digital archive
        const saved = JSON.parse(localStorage.getItem('police_actas') || '[]');
        saved.unshift({ tipo, data, text, date: new Date().toISOString(), user: store.user?.email });
        if (saved.length > 50) saved.pop();
        localStorage.setItem('police_actas', JSON.stringify(saved));
    };

    window._copyActa = () => {
        const text = document.getElementById('acta-output').innerText;
        navigator.clipboard.writeText(text).then(() => showToast('✅ Acta copiada al portapapeles'));
    };

    window._shareActaWA = () => {
        const text = document.getElementById('acta-output').innerText;
        window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
    };

    window._downloadPDF = () => {
        const text = document.getElementById('acta-output').innerText;
        const filename = `Acta_${tipo}_${new Date().getTime()}.pdf`;
        
        // Crear elemento temporal para renderizado PDF con formato profesional
        const temp = document.createElement('div');
        temp.style.padding = '40px';
        temp.style.fontFamily = 'serif';
        temp.style.color = '#000';
        temp.style.backgroundColor = '#fff';
        temp.innerHTML = `<pre style="white-space: pre-wrap; font-size: 11pt; line-height: 1.5; color: #000;">${text}</pre>`;
        
        showToast('⏳ Generando PDF...');
        html2pdf().from(temp).set({
            margin: 1,
            filename: filename,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }).save().then(() => showToast('✅ PDF Descargado'));
    };

    window._downloadWord = () => {
        const text = document.getElementById('acta-output').innerText;
        const filename = `Acta_${tipo}_${new Date().getTime()}.doc`;
        
        // HTML wrapper compatible con Word
        const html = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>Acta</title></head>
            <body style="font-family: 'Times New Roman', Times, serif;">
                <pre style="white-space: pre-wrap; font-size: 12pt;">${text}</pre>
            </body>
            </html>
        `;

        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        showToast('✅ Archivo Word (.doc) generado');
    };

    window._newActa = () => {
        renderActaForm(container, tipo);
    };

    window._improveField = (fieldId) => {
        const el = document.getElementById(fieldId);
        if (!el || !el.value.trim()) return showToast("Escribí algo primero");
        
        const original = el.value;
        const improved = window.improvePoliceNarrative(original);
        
        if (original === improved) {
            showToast("ℹ️ El texto ya es profesional");
        } else {
            el.value = improved;
            showToast("✨ Narrativa profesionalizada");
            el.classList.add('ring-2', 'ring-emerald-500/50');
            setTimeout(() => el.classList.remove('ring-2', 'ring-emerald-500/50'), 2000);
        }
    };
}

// ── EXPORTS ──
window.renderActasHub = renderActasHub;
window.renderActasSettings = renderActasSettings;
window.renderActaForm = renderActaForm;
window.ACTA_TEMPLATES = ACTA_TEMPLATES;
