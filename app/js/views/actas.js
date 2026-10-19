/**
 * Adicionales Santa Fe - Generador de Actas Policiales Oficiales
 * Módulo de creación y exportación de documentos jurídicos-policiales formales
 * Adaptado a la legislación de la Provincia de Santa Fe (CPP Ley 12.734 y Ley 12.521)
 */

// ══════════════════════════════════════════════════════════════
// 1. AJUSTES DE FORMATO Y MEMBRETE
// ══════════════════════════════════════════════════════════════
function getActaSettings() {
    const user = (typeof store !== 'undefined' && store.user) ? store.user : {};
    const defaults = {
        ur: 'UNIDAD REGIONAL I - DEPTO. LA CAPITAL',
        dependencia: 'COMISARÍA DE DISTRITO / COMANDO RADIOELÉCTRICO',
        header: 'POLICÍA DE LA PROVINCIA DE SANTA FE\nMINISTERIO DE JUSTICIA Y SEGURIDAD',
        footer: 'Con lo que no siendo para más, se da por finalizado el presente acto, previa lectura y ratificación de su contenido por los intervinientes, firmando al pie de plena conformidad por ante mí y los testigos de actuación que certifican lo actuado.',
        signature: `${user.name || 'OFICIAL DE POLICÍA'}\nJerarquía: ${user.rank || 'Oficial de Policía'}\nLegajo Personal: ${user.badge || '________'}\nPolicía de la Provincia de Santa Fe`
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
                <h1 class="text-sm font-black text-white leading-none">Membrete y Firmas</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Personalización de Actas</span>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="px-1 space-y-1">
                <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Datos Institucionales</h2>
                <p class="text-[11px] text-slate-400 leading-relaxed">Configurá tu destino y datos personales para que aparezcan automáticamente en el encabezado y firma de todas tus actas.</p>
            </div>

            <div class="glass-card p-5 rounded-3xl border border-white/5 space-y-5">
                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Unidad Regional</label>
                    <input type="text" id="set-acta-ur" value="${escapeHTML(settings.ur)}" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none" placeholder="Ej: UNIDAD REGIONAL II - ROSARIO">
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Dependencia / Destino</label>
                    <input type="text" id="set-acta-dependencia" value="${escapeHTML(settings.dependencia)}" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none" placeholder="Ej: COMISARÍA 2DA / BRIGADA MOTORIZADA">
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Membrete Superior</label>
                    <textarea id="set-acta-header" class="w-full h-20 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none resize-none">${escapeHTML(settings.header)}</textarea>
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Firma / Legajo / Jerarquía</label>
                    <textarea id="set-acta-signature" class="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none resize-none" placeholder="Nombre, Jerarquía y Legajo">${escapeHTML(settings.signature)}</textarea>
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Clausura / Cierre Legal</label>
                    <textarea id="set-acta-footer" class="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none resize-none">${escapeHTML(settings.footer)}</textarea>
                </div>

                <button onclick="window._saveActaSettings()" class="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <span class="material-symbols-outlined">save</span> Guardar Configuración
                </button>
            </div>
        </main>
        ${typeof renderBottomNav === 'function' ? renderBottomNav('asistente') : ''}
    `;

    window._saveActaSettings = () => {
        const ur = document.getElementById('set-acta-ur').value.trim();
        const dependencia = document.getElementById('set-acta-dependencia').value.trim();
        const header = document.getElementById('set-acta-header').value.trim();
        const signature = document.getElementById('set-acta-signature').value.trim();
        const footer = document.getElementById('set-acta-footer').value.trim();

        localStorage.setItem('acta_format_settings', JSON.stringify({ ur, dependencia, header, signature, footer }));
        showToast('✅ Membrete y firmas guardados');
        router.navigateTo('#asistente/actas');
    };
}


// ══════════════════════════════════════════════════════════════
// 2. CATÁLOGO DE PLANTILLAS DE ACTAS (12 MODELOS OFICIALES)
// ══════════════════════════════════════════════════════════════
const ACTA_TEMPLATES = {
    procedimiento: {
        title: 'Acta de Procedimiento en Vía Pública',
        subtitle: 'Flagrancia, Aprehensión o Art. 10 bis L.O.P.',
        icon: 'local_police',
        color: 'from-blue-600 to-indigo-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Santa Fe', required: true },
            { id: 'lugar', label: 'Lugar Exacto (Calle, Altura, Intersección)', type: 'text', placeholder: 'Ej: Av. Facundo Zuviría y Gorriti', required: true },
            { id: 'motivo_intervencion', label: 'Motivo de la Intervención', type: 'select', options: ['Comisión de Delito en Flagrancia', 'Llamado Central de Emergencias 911', 'Patrullaje Preventivo / Actitud Sospechosa', 'Traslado Preventivo Art. 10 Bis LOP', 'Operativo de Control Vehicular', 'Desorden en la Vía Pública'], required: true },
            { id: 'involucrados', label: 'Identificación de Causante/s (Nombre, DNI, Domicilio, Edad)', type: 'textarea', placeholder: 'Nombre y apellido, DNI, domicilio real y edad...', required: true },
            { id: 'descripcion', label: 'Relato Circunstanciado de los Hechos (Qué observó el personal)', type: 'textarea', placeholder: 'Circunstancias de tiempo, modo y lugar. Accionar del personal...', required: true },
            { id: 'resultado', label: 'Resultado y Medidas Adoptadas (Aprehensión, Traslado, Resguardo)', type: 'textarea', placeholder: 'Aprehensión del causante, traslado a sede policial...', required: true },
            { id: 'elementos_secuestrados', label: 'Elementos Secuestrados (si los hubiere)', type: 'textarea', placeholder: 'Detalle de armas, herramientas, bienes o estupefacientes secuestrados...' },
            { id: 'fiscal', label: 'Fiscal de Turno Notificado (Nombre y Unidad Fiscal)', type: 'text', placeholder: 'Ej: Dr. Ignacio Orio - MPA Unidad Flagrancia' },
            { id: 'testigo1', label: 'Testigo 1 de Actuación (Nombre, DNI, Domicilio, Teléfono)', type: 'text', placeholder: 'Nombre completo, DNI y domicilio...', required: true },
            { id: 'testigo2', label: 'Testigo 2 de Actuación (Nombre, DNI, Domicilio, Teléfono)', type: 'text', placeholder: 'Segundo testigo civil hábil...' },
            { id: 'observaciones', label: 'Observaciones / Estado Físico / Atención Médica', type: 'textarea', placeholder: 'Lesiones visibles, negativa a firmar, examen médico...' }
        ]
    },

    aprehension: {
        title: 'Acta de Aprehensión e Información de Derechos',
        subtitle: 'Art. 268 Código Procesal Penal de Santa Fe',
        icon: 'person_pin',
        color: 'from-red-600 to-rose-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Rosario', required: true },
            { id: 'lugar_aprehension', label: 'Lugar de Aprehensión', type: 'text', placeholder: 'Ej: Pellegrini y Corrientes', required: true },
            { id: 'aprehendido_nombre', label: 'Nombre Completo del Aprehendido/a', type: 'text', placeholder: 'Apellido y Nombres', required: true },
            { id: 'aprehendido_dni', label: 'DNI / Identificación', type: 'text', placeholder: 'DNI o N° de Pasaporte', required: true },
            { id: 'aprehendido_nacionalidad', label: 'Nacionalidad y Estado Civil', type: 'text', placeholder: 'Ej: Argentina, Soltero/a' },
            { id: 'aprehendido_domicilio', label: 'Domicilio Real', type: 'text', placeholder: 'Calle, número, barrio, localidad', required: true },
            { id: 'delito_atribuido', label: 'Delito Provisoriamente Atribuido', type: 'text', placeholder: 'Ej: Robo Calificado en Grado de Tentativa', required: true },
            { id: 'causa_aprehension', label: 'Motivo y Circunstancias de la Aprehensión', type: 'textarea', placeholder: 'Detalle de cómo y por qué se procede a la privación de la libertad...', required: true },
            { id: 'abogado_designado', label: 'Abogado Defensor (Particular o de Oficio/SPPDP)', type: 'text', placeholder: 'Defensor Público Oficial / Dr. Particular' },
            { id: 'llamada_familiar', label: 'Comunicación Telefónica Otorgada (Nombre y Teléfono)', type: 'text', placeholder: 'Ej: Comunicado a su madre al teléfono 341-...' },
            { id: 'fiscal', label: 'Fiscalía Interviniente y Disposiciones', type: 'text', placeholder: 'Fiscal de turno notificado y directivas impartidas', required: true },
            { id: 'testigo1', label: 'Testigo 1 (Nombre y DNI)', type: 'text', placeholder: 'Testigo presencial hábil...', required: true },
            { id: 'testigo2', label: 'Testigo 2 (Nombre y DNI)', type: 'text', placeholder: 'Segundo testigo de actuación...' },
            { id: 'observaciones', label: 'Observaciones Médicas y Constancias', type: 'textarea', placeholder: 'Constancia de examen por médico policial...' }
        ]
    },

    requisa: {
        title: 'Acta de Requisa Personal y/o Vehicular',
        subtitle: 'Art. 212 y 213 Código Procesal Penal de Santa Fe',
        icon: 'manage_search',
        color: 'from-cyan-600 to-blue-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Rafaela', required: true },
            { id: 'lugar', label: 'Lugar del Procedimiento', type: 'text', placeholder: 'Calle y altura...', required: true },
            { id: 'tipo_requisa', label: 'Tipo de Requisa', type: 'select', options: ['Requisa Personal', 'Requisa Vehicular', 'Requisa Personal y Vehicular Simultánea'], required: true },
            { id: 'persona_requisada', label: 'Persona Requisada (Nombre, Apellido, DNI, Domicilio)', type: 'text', placeholder: 'Datos del causante...', required: true },
            { id: 'vehiculo_datos', label: 'Datos del Vehículo (Marca, Modelo, Dominio, Color, N° Chasis/Motor)', type: 'text', placeholder: 'Ej: Moto Honda Wave color rojo, Dominio A123BCD' },
            { id: 'motivo_fundado', label: 'Motivo Fundado Previo (Art. 212 / 213 CPP)', type: 'textarea', placeholder: 'Indicios vehementes, bulto sospechoso, denuncia previa o actitud de evasión...', required: true },
            { id: 'intimacion_previa', label: 'Intimación Previa a Exhibir Efectos', type: 'select', options: ['Se le intimó previamente a exhibir los efectos y accedió', 'Se le intimó y se negó / omitió, procediéndose a la requisa', 'Por razones de urgencia y seguridad del personal actuante'], required: true },
            { id: 'resultado', label: 'Resultado Detallado y Elementos Hallados', type: 'textarea', placeholder: 'Detalle exacto de lo hallado entre las prendas o compartimientos del rodado...', required: true },
            { id: 'testigo1', label: 'Testigo 1 (Nombre, DNI, Domicilio)', type: 'text', placeholder: 'Testigo presencial hábil...', required: true },
            { id: 'testigo2', label: 'Testigo 2 (Nombre, DNI, Domicilio)', type: 'text', placeholder: 'Segundo testigo civil...' },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', placeholder: 'Constancia de precintado, estado de los elementos secuestrados...' }
        ]
    },

    siniestro: {
        title: 'Acta de Choque / Siniestro Vial',
        subtitle: 'Accidentología, Vehículos, Seguros y Lesionados',
        icon: 'car_crash',
        color: 'from-amber-600 to-orange-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Santa Fe', required: true },
            { id: 'lugar', label: 'Lugar del Siniestro (Intersección, Sentido de Circulación, Asfalto)', type: 'text', placeholder: 'Ej: Bv. Pellegrini y San Martín, calzada seca, buena iluminación...', required: true },
            { id: 'vehiculo_a', label: 'Vehículo A: Tipo, Marca, Modelo y Dominio', type: 'text', placeholder: 'Ej: Automóvil Peugeot 208, Dominio AF-123-CD', required: true },
            { id: 'conductor_a', label: 'Conductor Vehículo A (Nombre, DNI, Domicilio, Licencia N°)', type: 'text', placeholder: 'Nombre, DNI, domicilio y número de licencia...', required: true },
            { id: 'seguro_a', label: 'Seguro Vehículo A (Compañía y N° de Póliza)', type: 'text', placeholder: 'Ej: La Segunda Seguros, Póliza N° 8492019', required: true },
            { id: 'vehiculo_b', label: 'Vehículo B: Tipo, Marca, Modelo y Dominio', type: 'text', placeholder: 'Ej: Motocicleta Yamaha YBR 125cc, Dominio 492-JKL', required: true },
            { id: 'conductor_b', label: 'Conductor Vehículo B (Nombre, DNI, Domicilio, Licencia N°)', type: 'text', placeholder: 'Nombre, DNI, domicilio y número de licencia...', required: true },
            { id: 'seguro_b', label: 'Seguro Vehículo B (Compañía y N° de Póliza)', type: 'text', placeholder: 'Ej: Federación Patronal, Póliza N° 391024', required: true },
            { id: 'lesionados', label: 'Lesionados y Asistencia Médica (Móvil 107, Médico, Traslado)', type: 'textarea', placeholder: 'Ej: El conductor B manifiesta dolor en miembro inferior. Asiste Unidad SIES 107 Móvil 12 a cargo del Dr. Gómez. Traslado al Hospital Cullen...', required: true },
            { id: 'danos_materiales', label: 'Daños Materiales Visibles en Ambos Rodados', type: 'textarea', placeholder: 'Vehículo A: rotura de paragolpes delantero y óptica derecha. Vehículo B: torcedura de horquilla...', required: true },
            { id: 'mecanica', label: 'Mecánica Estimada y Croquis Descriptivo', type: 'textarea', placeholder: 'Vehículo A circulaba por Bv. Pellegrini hacia el este cuando colisionó...', required: true },
            { id: 'intervencion_peritos', label: 'Peritos Criminalísticos / AIC / Policía Científica', type: 'text', placeholder: 'Ej: Se comisiona Perito de Criminalística para tomas fotográficas y planimetría' },
            { id: 'fiscal', label: 'Fiscalía Interviniente', type: 'text', placeholder: 'Ej: Unidad Fiscal de Accidentes de Tránsito - MPA' }
        ]
    },

    secuestro: {
        title: 'Acta de Secuestro de Efectos',
        subtitle: 'Art. 217 Código Procesal Penal de Santa Fe',
        icon: 'inventory_2',
        color: 'from-purple-600 to-violet-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Venado Tuerto', required: true },
            { id: 'lugar', label: 'Lugar del Secuestro', type: 'text', placeholder: 'Lugar físico exacto del hallazgo/secuestro...', required: true },
            { id: 'nro_causa', label: 'CUIJ / N° de Causa / Actuación Sumarial', type: 'text', placeholder: 'CUIJ N° 21-0849201-9', required: true },
            { id: 'imputado_victima', label: 'Imputado / Damnificado (si se conocen)', type: 'text', placeholder: 'Imputado: ... / Damnificado: ...' },
            { id: 'elementos_detalle', label: 'Inventario Pormenorizado de Elementos Secuestrados', type: 'textarea', placeholder: '1) Arma de fuego tipo revólver cal. 38 N° serie...\n2) Seis cartuchos intactos calibre...\n3) Teléfono celular marca Samsung...', required: true },
            { id: 'embalaje_precinto', label: 'Tipo de Embalaje y N° de Precinto de Seguridad', type: 'text', placeholder: 'Bolsa plástica sellada térmicamente, precinto numerado N° 004921...', required: true },
            { id: 'depositario', label: 'Destino o Depositario Judicial', type: 'text', placeholder: 'Depósito de Secuestros Judiciales / Sección Balística AIC', required: true },
            { id: 'testigo1', label: 'Testigo 1 (Nombre, DNI, Domicilio)', type: 'text', placeholder: 'Testigo civil hábil...', required: true },
            { id: 'testigo2', label: 'Testigo 2 (Nombre, DNI, Domicilio)', type: 'text', placeholder: 'Segundo testigo civil...' },
            { id: 'observaciones', label: 'Observaciones / Estado de Conservación', type: 'textarea', placeholder: 'Se deja constancia del perfecto estado de resguardo...' }
        ]
    },

    custodia: {
        title: 'Rótulo Oficial de Cadena de Custodia',
        subtitle: 'Protocolo de Evidencias e Indicios del MPA',
        icon: 'inventory',
        color: 'from-amber-500 to-amber-700',
        fields: [
            { id: 'cuij', label: 'CUIJ / N° de Investigación Fiscal', type: 'text', placeholder: 'CUIJ 21-0941829-1', required: true },
            { id: 'fiscal', label: 'Fiscalía Interviniente / Fiscal a Cargo', type: 'text', placeholder: 'Dra. María Laura Urquiza', required: true },
            { id: 'imputado', label: 'Imputado / Sospechoso', type: 'text', placeholder: 'Nombre y DNI del causante...' },
            { id: 'victima', label: 'Víctima / Damnificado / Denunciante', type: 'text', placeholder: 'Víctima individualizada o La Sociedad' },
            { id: 'procedimiento', label: 'Procedimiento de Origen', type: 'text', placeholder: 'Allanamiento / Inspección Ocular / Flagrancia', required: true },
            { id: 'lugar_recoleccion', label: 'Lugar Exacto de Recolección del Indicio', type: 'text', placeholder: 'Habitación principal, debajo de la cama...', required: true },
            { id: 'descripcion_indicio', label: 'Descripción Física Exhaustiva del Indicio', type: 'textarea', placeholder: 'Dimensiones, peso aproximado, numeración visible, manchas o deformaciones...', required: true },
            { id: 'embalaje', label: 'Tipo de Embalaje Primario y Secundario', type: 'text', placeholder: 'Caja de cartón sellada / Bolsa hermética para ADN', required: true },
            { id: 'precinto', label: 'Número de Precinto Inviolable de Seguridad', type: 'text', placeholder: 'Precinto rojo N° MPA-049182', required: true },
            { id: 'recolector', label: 'Funcionario que Recolecta (Jerarquía, Nombre, Legajo)', type: 'text', placeholder: 'Of. Subinspector Juan Pérez - Legajo 89.201', required: true },
            { id: 'dependencia_recolector', label: 'Dependencia / Brigada Policial', type: 'text', placeholder: 'PDI / AIC / Comando Radioeléctrico', required: true },
            { id: 'destino', label: 'Destino de la Evidencia (Laboratorio / Depósito)', type: 'text', placeholder: 'Laboratorio Químico Forense / Balística', required: true }
        ]
    },

    allanamiento: {
        title: 'Acta de Allanamiento y Registro Domiciliario',
        subtitle: 'Art. 209 y conc. Código Procesal Penal de Santa Fe',
        icon: 'home_work',
        color: 'from-red-600 to-pink-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Santo Tomé', required: true },
            { id: 'juzgado', label: 'Juez / Colegio de Jueces de 1ra Instancia', type: 'text', placeholder: 'Dr. Jorge Patrizi - Colegio de Jueces Penales Santa Fe', required: true },
            { id: 'nro_causa', label: 'CUIJ / N° de Legajo Fiscal', type: 'text', placeholder: 'CUIJ 21-0812948-2', required: true },
            { id: 'fiscal', label: 'Fiscal requirente', type: 'text', placeholder: 'Dr. Roberto Apullán', required: true },
            { id: 'fecha_orden', label: 'Fecha y Número de la Orden Judicial de Allanamiento', type: 'text', placeholder: 'Oficio Judicial N° 402/26 de fecha...', required: true },
            { id: 'direccion', label: 'Domicilio Objeto de Allanamiento (Calle, Altura, Descripción Fachada)', type: 'text', placeholder: 'Calle Belgrano 2341, casa de mampostería, rejas negras...', required: true },
            { id: 'morador', label: 'Morador / Persona que Atiende (Nombre, DNI, Vínculo con el lugar)', type: 'text', placeholder: 'Persona presente a quien se notifica la orden...', required: true },
            { id: 'notificacion_orden', label: 'Constancia de Exhibición de la Orden', type: 'select', options: ['Se exhibió la orden judicial original y se entregó copia íntegra al morador', 'No habiendo moradores, se procedió al uso de la fuerza pública indispensable'], required: true },
            { id: 'testigo1', label: 'Testigo 1 (Nombre, DNI, Domicilio, Ocupación)', type: 'text', placeholder: 'Primer testigo civil hábil convocado...', required: true },
            { id: 'testigo2', label: 'Testigo 2 (Nombre, DNI, Domicilio, Ocupación)', type: 'text', placeholder: 'Segundo testigo civil...', required: true },
            { id: 'inventario', label: 'Resultado del Registro e Inventario de Secuestros', type: 'textarea', placeholder: 'Ambiente por ambiente: living, dormitorios, patio. Elementos secuestrados...', required: true },
            { id: 'observaciones', label: 'Observaciones / Cierre y Copia Entregada', type: 'textarea', placeholder: 'Se dejó constancia y copia del acta al morador...' }
        ]
    },

    constatacion: {
        title: 'Acta de Constatación de Estado de Cosas y Lugar',
        subtitle: 'Art. 207 Código Procesal Penal de Santa Fe',
        icon: 'search_check',
        color: 'from-emerald-600 to-teal-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Esperanza', required: true },
            { id: 'lugar', label: 'Lugar Exacto de la Constatación', type: 'text', placeholder: 'Domicilio o espacio público verificado...', required: true },
            { id: 'motivo_constatacion', label: 'Motivo de la Constatación', type: 'select', options: ['Daños Materiales a la Propiedad', 'Rotura de Aberturas / Intrusión', 'Usurpación de Inmueble', 'Estado Edilicio y Seguridad', 'Conflicto Vecinal / Ocupación Ilegítima', 'Constatación Ordenada por Fiscalía'], required: true },
            { id: 'requirente', label: 'Persona Presente o Solicitante (Nombre, DNI, Condición)', type: 'text', placeholder: 'Propietario / Inquilino / Funcionario solicitante...', required: true },
            { id: 'estado_observado', label: 'Descripción Detallada y Pormenorizada de lo Observado', type: 'textarea', placeholder: 'Estado de rejas, aberturas, cerraduras violentadas, objetos esparcidos, etc...', required: true },
            { id: 'tomas_fotograficas', label: 'Fijación Fotográfica y Planimétrica', type: 'select', options: ['Se efectuaron tomas fotográficas del estado del lugar', 'Se comisionó a personal de Criminalística', 'No fue posible fijación por falta de medios técnicos'], required: true },
            { id: 'testigo1', label: 'Testigo Presencial (Nombre, DNI, Domicilio)', type: 'text', placeholder: 'Testigo hábil...', required: true },
            { id: 'observaciones', label: 'Observaciones / Manifestaciones de Partes', type: 'textarea', placeholder: 'Manifestaciones de las partes interesadas...' }
        ]
    },

    entrega_menor: {
        title: 'Acta de Entrega de Menor de Edad no Punible',
        subtitle: 'Intervención de Niñez y Entrega Bajo Recibo a Progenitores',
        icon: 'family_restroom',
        color: 'from-blue-500 to-teal-600',
        fields: [
            { id: 'localidad', label: 'Localidad / Dependencia Policial', type: 'text', placeholder: 'Ej: San Lorenzo', required: true },
            { id: 'menor_nombre', label: 'Nombre Completo del Menor de Edad', type: 'text', placeholder: 'Apellido y Nombres del menor', required: true },
            { id: 'menor_dni', label: 'DNI y Fecha de Nacimiento', type: 'text', placeholder: 'DNI y fecha (Edad: ... años)', required: true },
            { id: 'motivo_intervencion', label: 'Motivo de la Intervención Policial Previa', type: 'textarea', placeholder: 'Circunstancias en las que el menor fue resguardado...', required: true },
            { id: 'examen_medico', label: 'Examen Médico Previo (Constancia Médica)', type: 'text', placeholder: 'Examinado por Dr. ..., Constancia N° ..., sin lesiones visibles', required: true },
            { id: 'organismo_ninez', label: 'Intervención del Servicio Local de Niñez', type: 'text', placeholder: 'Subsecretaría de los Derechos de la Niñez - Notificado/a: ...', required: true },
            { id: 'progenitor_nombre', label: 'Persona a Quien se Entrega (Nombre y Apellido)', type: 'text', placeholder: 'Madre / Padre / Tutor legal', required: true },
            { id: 'progenitor_dni', label: 'DNI y Domicilio de Quien Retira', type: 'text', placeholder: 'DNI N° ... con domicilio en...', required: true },
            { id: 'parentesco_acreditado', label: 'Acreditación del Vínculo (DNI, Partida, Libreta de Familia)', type: 'text', placeholder: 'Acredita mediante Libreta de Familia / Partida de Nacimiento', required: true },
            { id: 'compromiso_guarda', label: 'Compromiso Formal de Guarda', type: 'select', options: ['Se compromete a la guarda, custodia, cuidado y presentación ante la autoridad competente'], required: true },
            { id: 'observaciones', label: 'Observaciones', type: 'textarea', placeholder: 'Se hace entrega de pertenencias del menor...' }
        ]
    },

    notificacion: {
        title: 'Acta / Cédula de Notificación Formal',
        subtitle: 'Medidas Cautelares de Distancia o Mandamientos Judiciales',
        icon: 'mark_email_read',
        color: 'from-teal-600 to-cyan-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad', type: 'text', placeholder: 'Ej: Santa Fe', required: true },
            { id: 'notificado_nombre', label: 'Nombre Completo del Notificado', type: 'text', placeholder: 'Apellido y Nombres', required: true },
            { id: 'notificado_dni', label: 'DNI del Notificado', type: 'text', placeholder: 'DNI N°...', required: true },
            { id: 'domicilio', label: 'Domicilio Donde se Notifica', type: 'text', placeholder: 'Calle, número, piso, localidad...', required: true },
            { id: 'autoridad_ordenante', label: 'Juzgado / Tribunal / Fiscalía que Ordena', type: 'text', placeholder: 'Tribunal Colegiado de Familia N° 2 / MPA', required: true },
            { id: 'expediente', label: 'N° de Expediente / CUIJ', type: 'text', placeholder: 'CUIJ / Expte. N° ...', required: true },
            { id: 'contenido_medida', label: 'Contenido Exacto de la Medida Notificada', type: 'textarea', placeholder: '1) Exclusión del hogar sito en...\n2) Prohibición de acercamiento y contacto a menos de 200 metros respecto de...', required: true },
            { id: 'apercibimiento_art239', label: 'Apercibimiento Legal por Desobediencia', type: 'select', options: ['Se le notifica expresamente que su incumplimiento configurará el delito de Desobediencia a una Orden Judicial (Art. 239 del Código Penal)'], required: true },
            { id: 'actitud_notificado', label: 'Recepción de la Cédula / Firma', type: 'select', options: ['Firma en plena conformidad y recibe duplicado de la cédula', 'Se niega a firmar, dejándose constancia fehaciente en presencia de testigos'], required: true },
            { id: 'testigo1', label: 'Testigo de Actuación (si el notificado se negare)', type: 'text', placeholder: 'Nombre y DNI del testigo civil...' }
        ]
    },

    denuncia: {
        title: 'Acta de Recepción de Denuncia Penal',
        subtitle: 'Art. 267 y conc. CPP - Advertencia Art. 245 C. Penal',
        icon: 'report',
        color: 'from-rose-600 to-red-700',
        fields: [
            { id: 'localidad', label: 'Localidad / Dependencia Policial', type: 'text', placeholder: 'Ej: Comisaría 1ra - Santa Fe', required: true },
            { id: 'denunciante_nombre', label: 'Nombre Completo del Denunciante', type: 'text', placeholder: 'Apellido y Nombres', required: true },
            { id: 'denunciante_dni', label: 'DNI / Identificación', type: 'text', placeholder: 'DNI N°...', required: true },
            { id: 'denunciante_nacionalidad_edad', label: 'Nacionalidad, Edad y Estado Civil', type: 'text', placeholder: 'Argentina, 34 años, casada...', required: true },
            { id: 'denunciante_domicilio', label: 'Domicilio Real y Teléfono de Contacto', type: 'text', placeholder: 'Calle, número, localidad y celular...', required: true },
            { id: 'denunciante_ocupacion', label: 'Profesión u Ocupación', type: 'text', placeholder: 'Ej: Empleada de comercio' },
            { id: 'lugar_hecho', label: 'Lugar Exacto del Hecho Denunciado', type: 'text', placeholder: 'Calle y altura o intersección...', required: true },
            { id: 'fecha_hora_hecho', label: 'Fecha y Hora Estimada del Hecho', type: 'text', placeholder: 'Ej: El día de ayer 18/10/2026 siendo las 21:00 hs', required: true },
            { id: 'hechos', label: 'Relato Circunstanciado en Primera Persona de los Hechos', type: 'textarea', placeholder: 'Que comparece a denunciar formalmente que en fecha y hora indicadas...', required: true },
            { id: 'elementos_sustraidos', label: 'Detalle de Bienes Sustraídos / Daños', type: 'textarea', placeholder: 'Marca, modelo, número de serie, valor estimado...' },
            { id: 'autores_sospechosos', label: 'Datos o Rasgos de los Autores / Sospechosos', type: 'textarea', placeholder: 'Filiación, vestimenta, tatuajes, vehículos utilizados...' },
            { id: 'testigos_pruebas', label: 'Testigos del Hecho o Cámaras de Seguridad', type: 'text', placeholder: 'Cámaras de seguridad particulares o del 911 en la cuadra...' },
            { id: 'instancia_penal', label: 'Instancia Penal y Entrega de Copia', type: 'select', options: ['Insta formalmente la acción penal y solicita copia de la presente denuncia'], required: true }
        ]
    },

    oficio: {
        title: 'Oficio de Elevación Policial al MPA / Juzgado',
        subtitle: 'Elevación de Actuaciones y Elementos Secuestrados',
        icon: 'mail',
        color: 'from-slate-600 to-slate-800',
        fields: [
            { id: 'localidad', label: 'Localidad / Ciudad de Emisión', type: 'text', placeholder: 'Ej: Santa Fe', required: true },
            { id: 'destinatario', label: 'Autoridad Destinataria (Nombre y Cargo)', type: 'text', placeholder: 'Sr. Fiscal del MPA / Sr. Juez Penal Dr. ...', required: true },
            { id: 'organismo', label: 'Organismo o Unidad Fiscal', type: 'text', placeholder: 'Unidad Fiscal Especial de Delitos Complejos / Flagrancia', required: true },
            { id: 'referencia', label: 'CUIJ / N° de Actuación Sumarial de Referencia', type: 'text', placeholder: 'CUIJ N° 21-0849201-9 / Sumario N° 402/26', required: true },
            { id: 'objeto', label: 'Objeto de la Presentación', type: 'text', placeholder: 'Eleva actuaciones complementarias y cadena de custodia', required: true },
            { id: 'cuerpo', label: 'Texto Circunstanciado de la Elevación', type: 'textarea', placeholder: 'Tengo el agrado de dirigirme a Ud. en el marco de la actuación de referencia, a fin de elevar para su conocimiento y prosecución procesal...', required: true },
            { id: 'anexos_fojas', label: 'Documentación Anexa y Cantidad de Fojas Útiles', type: 'text', placeholder: 'Acta de procedimiento (fs. 1), Acta de requisa (fs. 2), Rótulo de secuestro (fs. 3), total 10 fojas útiles', required: true }
        ]
    }
};


// ══════════════════════════════════════════════════════════════
// 3. GENERADOR DE TEXTO JURÍDICO-POLICIAL FORMAL
// ══════════════════════════════════════════════════════════════
function generateActaText(tipo, data) {
    const settings = getActaSettings();
    const now = new Date();
    
    // Números en letras para fecha formal
    const dias = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiún', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve', 'treinta', 'treinta y un'];
    const diaLetras = dias[now.getDate()] || `${now.getDate()}`;
    const mesNombre = now.toLocaleDateString('es-AR', { month: 'long' });
    const anio = now.getFullYear();
    const hora = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const fechaCompleta = `${now.toLocaleDateString('es-AR')} - ${hora} hs`;

    const ur = settings.ur.toUpperCase();
    const dependencia = settings.dependencia.toUpperCase();
    const tmpl = ACTA_TEMPLATES[tipo];
    const titulo = tmpl ? tmpl.title.toUpperCase() : 'ACTA POLICIAL';

    let header = `======================================================================\n` +
                 `${settings.header.toUpperCase()}\n` +
                 `${ur}\n` +
                 `${dependencia}\n` +
                 `======================================================================\n\n` +
                 `                              ${titulo}\n\n` +
                 `En la ciudad de ${data.localidad || 'Santa Fe'}, Provincia de Santa Fe, a los ${diaLetras} (${now.getDate()}) días del mes de ${mesNombre} del año ${anio}, siendo las ${hora} horas, en cumplimiento de los deberes funcionales conferidos por la Ley del Personal Policial N° 12.521 y las prescripciones del Código Procesal Penal de la Provincia de Santa Fe (Ley N° 12.734), el/la suscrito/a Oficial actuante, procediendo formalmente, HACE CONSTAR:\n\n`;

    let body = '';

    switch (tipo) {
        case 'procedimiento':
            body = `PRIMERO (LUGAR Y CIRCUNSTANCIAS): Que hallándose el personal policial preventor en cumplimiento de servicios de prevención en ${data.lugar}, en el marco de: ${data.motivo_intervencion}.\n\n` +
                   `SEGUNDO (IDENTIFICACIÓN DEL/LOS CAUSANTE/S): En el lugar se individualiza formalmente a:\n${data.involucrados}\n\n` +
                   `TERCERO (DESCRIPCIÓN CIRCUNSTANCIADA): ${data.descripcion}\n\n` +
                   `CUARTO (MEDIDAS ADOPTADAS Y RESULTADO): ${data.resultado}\n\n` +
                   (data.elementos_secuestrados ? `QUINTO (ELEMENTOS SECUESTRADOS PREVENTIVAMENTE):\n${data.elementos_secuestrados}\n\n` : '') +
                   (data.fiscal ? `SEXTO (COMUNICACIÓN AL MINISTERIO PÚBLICO DE LA ACUSACIÓN): Se estableció inmediata comunicación con el/la Fiscal de turno ${data.fiscal}, quien enterado de los pormenores, dispuso las directivas procesales pertinentes.\n\n` : '') +
                   `SÉPTIMO (TESTIGOS HÁBILES DE ACTUACIÓN - ART. 138 CPP):\n` +
                   `1) Testigo: ${data.testigo1}\n` +
                   (data.testigo2 ? `2) Testigo: ${data.testigo2}\n\n` : '\n') +
                   (data.observaciones ? `OCTAVO (OBSERVACIONES Y EXAMEN MÉDICO):\n${data.observaciones}\n\n` : '');
            break;

        case 'aprehension':
            body = `PRIMERO (LUGAR Y FECHA): Que siendo la hora precedentemente indicada, en calle ${data.lugar_aprehension}, de la localidad de ${data.localidad}, se procede formalmente a la APREHENSIÓN del/la ciudadano/a ${data.aprehendido_nombre}, D.N.I. N° ${data.aprehendido_dni}, de nacionalidad ${data.aprehendido_nacionalidad || 'Argentina'}, con domicilio real en ${data.aprehendido_domicilio}, en estricto cumplimiento del Artículo 268 del Código Procesal Penal de la Provincia de Santa Fe.\n\n` +
                   `SEGUNDO (MOTIVO Y HECHO ATRIBUIDO): La presente privación de la libertad se funda en la presunta comisión del delito de: ${data.delito_atribuido}.\nCircunstancias fácticas: ${data.causa_aprehension}\n\n` +
                   `TERCERO (INFORMACIÓN DE DERECHOS CONSTITUCIONALES - ART. 268 CPP):\n` +
                   `En presencia de los testigos de actuación, se le hace saber expresamente al aprehendido los derechos que le asisten por mandato constitucional y procesal:\n` +
                   `a) A que se le informe en forma comprensible el motivo de su privación de la libertad.\n` +
                   `b) A guardar silencio, no estando obligado a declarar contra sí mismo, sin que su negativa constituya presunción de culpabilidad.\n` +
                   `c) A designar de inmediato abogado defensor de su confianza o, en su defecto, ser asistido por el Servicio Público Provincial de Defensa Penal (SPPDP).\n` +
                   `d) A comunicarse telefónicamente de inmediato con una persona de su elección para anoticiarla de su situación procesal.\n` +
                   `e) A ser examinado a la brevedad por el médico policial legista para acreditar su estado psicofísico.\n\n` +
                   `CUARTO (COMUNICACIÓN Y DEFENSA):\n` +
                   `Defensa técnica manifestada: ${data.abogado_designado || 'SPPDP (Defensor Público Oficial)'}.\n` +
                   `Comunicación telefónica otorgada: ${data.llamada_familiar || 'Realizada de conformidad'}.\n\n` +
                   `QUINTO (COMUNICACIÓN FISCAL): ${data.fiscal}\n\n` +
                   `SEXTO (TESTIGOS DE ACTUACIÓN):\n` +
                   `1) Testigo: ${data.testigo1}\n` +
                   (data.testigo2 ? `2) Testigo: ${data.testigo2}\n\n` : '\n') +
                   (data.observaciones ? `SÉPTIMO (ESTADO DE SALUD Y OBSERVACIONES):\n${data.observaciones}\n\n` : '');
            break;

        case 'requisa':
            body = `PRIMERO (LUGAR Y TIPO DE PROCEDIMIENTO): Que encontrándose el personal policial actuante en ${data.lugar}, de la localidad de ${data.localidad}, se procede a la ejecución de ${data.tipo_requisa.toUpperCase()}, con sujeción estricta a los Artículos 212 y 213 del Código Procesal Penal de Santa Fe.\n\n` +
                   `SEGUNDO (PERSONA Y/O VEHÍCULO INTERVENIDO):\n` +
                   `Persona identificada: ${data.persona_requisada}\n` +
                   (data.vehiculo_datos ? `Vehículo involucrado: ${data.vehiculo_datos}\n\n` : '\n') +
                   `TERCERO (MOTIVO FUNDADO PREVIO - ART. 212 CPP): ${data.motivo_fundado}\n\n` +
                   `CUARTO (INTIMACIÓN PREVIA): De conformidad con la ley de rito, ${data.intimacion_previa.toLowerCase()}.\n\n` +
                   `QUINTO (RESULTADO DE LA INSPECCIÓN Y ELEMENTOS HABIDOS):\n${data.resultado}\n\n` +
                   `SEXTO (TESTIGOS DE ACTUACIÓN):\n` +
                   `1) Testigo: ${data.testigo1}\n` +
                   (data.testigo2 ? `2) Testigo: ${data.testigo2}\n\n` : '\n') +
                   (data.observaciones ? `SÉPTIMO (OBSERVACIONES):\n${data.observaciones}\n\n` : '');
            break;

        case 'siniestro':
            body = `PRIMERO (LUGAR Y CARACTERÍSTICAS DE LA CALZADA): Que el personal policial es comisionado a ${data.lugar}, ${data.localidad}, donde se constata la producción de un siniestro vial.\n\n` +
                   `SEGUNDO (PARTE A - VEHÍCULO Y CONDUCTOR):\n` +
                   `Vehículo A: ${data.vehiculo_a}\n` +
                   `Conductor A: ${data.conductor_a}\n` +
                   `Seguro Obligatorio A: ${data.seguro_a}\n\n` +
                   `TERCERO (PARTE B - VEHÍCULO Y CONDUCTOR):\n` +
                   `Vehículo B: ${data.vehiculo_b}\n` +
                   `Conductor B: ${data.conductor_b}\n` +
                   `Seguro Obligatorio B: ${data.seguro_b}\n\n` +
                   `CUARTO (LESIONADOS Y ATENCIÓN MÉDICA DE URGENCIA):\n${data.lesionados}\n\n` +
                   `QUINTO (DAÑOS MATERIALES VISIBLES):\n${data.danos_materiales}\n\n` +
                   `SEXTO (MECÁNICA PRELIMINAR DEL HECHO):\n${data.mecanica}\n\n` +
                   (data.intervencion_peritos ? `SÉPTIMO (PERITAJES Y CIENTÍFICA): ${data.intervencion_peritos}\n\n` : '') +
                   (data.fiscal ? `OCTAVO (COMUNICACIÓN FISCAL): Interviene ${data.fiscal}.\n\n` : '');
            break;

        case 'secuestro':
            body = `PRIMERO (CAUSA Y ACTUACIÓN): Que en el marco del CUIJ / Legajo de Investigación N° ${data.nro_causa}, en ${data.lugar}, localidad de ${data.localidad}, se procede al formal SECUESTRO (Art. 217 CPP) de los efectos que a continuación se discriminan:\n\n` +
                   (data.imputado_victima ? `Partes vinculadas: ${data.imputado_victima}\n\n` : '') +
                   `SEGUNDO (INVENTARIO DETALLADO DE ELEMENTOS SECUESTRADOS):\n${data.elementos_detalle}\n\n` +
                   `TERCERO (EMBALAJE, ROTULADO Y PRECINTO):\n` +
                   `Los efectos descriptos han sido embalados conforme protocolo técnico: ${data.embalaje_precinto}, garantizando su inalterabilidad y custodia.\n\n` +
                   `CUARTO (DEPOSITARIO / DESTINO JUDICIAL): ${data.depositario}\n\n` +
                   `QUINTO (TESTIGOS DE ACTUACIÓN):\n` +
                   `1) Testigo: ${data.testigo1}\n` +
                   (data.testigo2 ? `2) Testigo: ${data.testigo2}\n\n` : '\n') +
                   (data.observaciones ? `SEXTO (OBSERVACIONES):\n${data.observaciones}\n\n` : '');
            break;

        case 'custodia':
            body = `RÓTULO OFICIAL DE CADENA DE CUSTODIA (PROTOCOLO MPA SANTA FE)\n\n` +
                   `1. DATOS DE LA CAUSA:\n` +
                   `   CUIJ: ${data.cuij}\n` +
                   `   FISCALÍA: ${data.fiscal}\n` +
                   `   IMPUTADO: ${data.imputado || 'A DETERMINAR'}\n` +
                   `   VÍCTIMA: ${data.victima || 'LA SOCIEDAD'}\n` +
                   `   PROCEDIMIENTO ORIGEN: ${data.procedimiento}\n\n` +
                   `2. RECOLECCIÓN DEL INDICIO:\n` +
                   `   LUGAR EXACTO: ${data.lugar_recoleccion}\n` +
                   `   FECHA Y HORA: ${fechaCompleta}\n` +
                   `   FUNCIONARIO RECOLECTOR: ${data.recolector}\n` +
                   `   DEPENDENCIA: ${data.dependencia_recolector}\n\n` +
                   `3. DESCRIPCIÓN TÉCNICA DEL INDICIO:\n${data.descripcion_indicio}\n\n` +
                   `4. SEGURIDAD DEL EMBALAJE:\n` +
                   `   TIPO DE EMBALAJE: ${data.embalaje}\n` +
                   `   N° DE PRECINTO DE SEGURIDAD: ${data.precinto}\n\n` +
                   `5. DESTINO / DERIVACIÓN: ${data.destino}\n\n` +
                   `REGISTRO DE TRAZABILIDAD (ENTREGA Y RECEPCIÓN):\n` +
                   `Entregado por: ${data.recolector}  - Firma: _______________\n` +
                   `Recibido por: ____________________________  - Firma: _______________\n` +
                   `Fecha/Hora de Recepción: ____/____/2026 a las ____:____ hs.\n\n`;
            break;

        case 'allanamiento':
            body = `PRIMERO (MANDATO JUDICIAL): Que en cumplimiento estricto de la Orden de Allanamiento y Registro dispuesta por el ${data.juzgado}, con intervención de la Unidad Fiscal a cargo de ${data.fiscal}, librada en fecha ${data.fecha_orden}, dentro del CUIJ N° ${data.nro_causa}, el personal policial actuante se constituye en el domicilio sito en calle ${data.direccion}, de la localidad de ${data.localidad}.\n\n` +
                   `SEGUNDO (NOTIFICACIÓN Y MORADOR): En el lugar atiende el/la llamado/a ${data.morador}, a quien en presencia de los testigos hábiles se le impone del mandato judicial que motiva la diligencia: ${data.notificacion_orden}.\n\n` +
                   `TERCERO (TESTIGOS CIVILES DE ACTUACIÓN):\n` +
                   `1) Testigo: ${data.testigo1}\n` +
                   `2) Testigo: ${data.testigo2}\n\n` +
                   `CUARTO (REGISTRO DEL INMUEBLE E INVENTARIO DE LO HALLADO):\n${data.inventario}\n\n` +
                   (data.observaciones ? `QUINTO (OBSERVACIONES Y CIERRE):\n${data.observaciones}\n\n` : '');
            break;

        case 'constatacion':
            body = `PRIMERO (LUGAR Y OBJETO): Que en fecha y hora indicadas, el suscrito se hace presente en ${data.lugar}, de la localidad de ${data.localidad}, a los fines de labrar formal constatación por motivo de: ${data.motivo_constatacion}.\n\n` +
                   `SEGUNDO (REQUIRENTE / COMPARECIENTE): Se encuentra presente en el lugar ${data.requirente}.\n\n` +
                   `TERCERO (ESTADO FÍSICO OBSERVADO Y COMPROBADO):\n${data.estado_observado}\n\n` +
                   `CUARTO (REGISTRO TÉCNICO Y FOTOGRÁFICO): ${data.tomas_fotograficas}.\n\n` +
                   `QUINTO (TESTIGO DE ACTUACIÓN):\nTestigo: ${data.testigo1}\n\n` +
                   (data.observaciones ? `SEXTO (OBSERVACIONES):\n${data.observaciones}\n\n` : '');
            break;

        case 'entrega_menor':
            body = `PRIMERO (INDIVIDUALIZACIÓN DEL MENOR): Que en sede de esta dependencia policial, se encuentra resguardado/a el/la menor ${data.menor_nombre}, D.N.I. N° ${data.menor_dni}, quien fuera trasladado en razón de: ${data.motivo_intervencion}.\n\n` +
                   `SEGUNDO (ESTADO DE SALUD Y CONTROL MÉDICO): Previo a la entrega, el menor fue examinado conforme protocolo: ${data.examen_medico}.\n\n` +
                   `TERCERO (INTERVENCIÓN DEL SERVICIO DE NIÑEZ): ${data.organismo_ninez}.\n\n` +
                   `CUARTO (ENTREGA FORMAL BAJO RECIBO): Se hace presente el/la ciudadano/a ${data.progenitor_nombre}, D.N.I. N° ${data.progenitor_dni}, con domicilio en ${data.progenitor_domicilio}, quien acredita fehacientemente su carácter mediante: ${data.parentesco_acreditado}.\n\n` +
                   `QUINTO (COMPROMISO DE GUARDA): El compareciente se notifica formalmente y asume: ${data.compromiso_guarda}.\n\n` +
                   (data.observaciones ? `SEXTO (OBSERVACIONES):\n${data.observaciones}\n\n` : '');
            break;

        case 'notificacion':
            body = `PRIMERO (MANDAMIENTO Y DESTINATARIO): Que en la fecha y hora indicadas, en calle ${data.domicilio}, de la localidad de ${data.localidad}, se procede a notificar de forma fehaciente y personal al ciudadano ${data.notificado_nombre}, D.N.I. N° ${data.notificado_dni}, de lo ordenado por: ${data.autoridad_ordenante}, en autos caratulados con el Expediente/CUIJ N° ${data.expediente}.\n\n` +
                   `SEGUNDO (MEDIDAS NOTIFICADAS):\n${data.contenido_medida}\n\n` +
                   `TERCERO (APERCIBIMIENTO PENAL): ${data.apercibimiento_art239}.\n\n` +
                   `CUARTO (CONSTANCIA DE NOTIFICACIÓN): ${data.actitud_notificado}.\n\n` +
                   (data.testigo1 ? `QUINTO (TESTIGO DE ACTUACIÓN):\n${data.testigo1}\n\n` : '');
            break;

        case 'denuncia':
            body = `PRIMERO (COMPARECENCIA DEL DENUNCIANTE): Comparece espontáneamente ante esta oficina de guardia policial el/la ciudadano/a ${data.denunciante_nombre}, titular del D.N.I. N° ${data.denunciante_dni}, de nacionalidad y estado civil: ${data.denunciante_nacionalidad_edad}, con domicilio real en ${data.denunciante_domicilio}, de ocupación ${data.denunciante_ocupacion || 'Empleado/a'}.\n\n` +
                   `SEGUNDO (ADVERTENCIA LEGAL DEL ART. 245 DEL CÓDIGO PENAL): Previo a serle tomada la manifestación, se le informa formalmente de las penalidades previstas en el Artículo 245 del Código Penal para quienes dieren falsas denuncias o acusaren falsamente a inocentes, enterado de lo cual presta juramento de decir verdad de cuanto supiere y le fuere preguntado.\n\n` +
                   `TERCERO (LUGAR, FECHA Y HORA DEL HECHO):\n` +
                   `Lugar: ${data.lugar_hecho}\n` +
                   `Fecha y Hora: ${data.fecha_hora_hecho}\n\n` +
                   `CUARTO (RELATO CIRCUNSTANCIADO DE LOS HECHOS):\n${data.hechos}\n\n` +
                   (data.elementos_sustraidos ? `QUINTO (BIENES SUSTRAÍDOS / DAÑOS RECLAMADOS):\n${data.elementos_sustraidos}\n\n` : '') +
                   (data.autores_sospechosos ? `SEXTO (DATOS DE SOSPECHOSOS / PARTÍCIPES):\n${data.autores_sospechosos}\n\n` : '') +
                   (data.testigos_pruebas ? `SÉPTIMO (TESTIGOS O CÁMARAS DISPONIBLES):\n${data.testigos_pruebas}\n\n` : '') +
                   `OCTAVO (PETITORIO Y COPIA): ${data.instancia_penal}.\n\n`;
            break;

        case 'oficio':
            body = `A: ${data.destinatario.toUpperCase()}\n` +
                   `ORGANISMO: ${data.organismo.toUpperCase()}\n` +
                   `REF: ${data.referencia}\n` +
                   `OBJETO: ${data.objeto}\n\n` +
                   `Tengo el agrado de dirigirme a Usted, en el marco de la actuación sumarial de referencia, a efectos de elevar para su conocimiento y demás fines legales que estime corresponder lo siguiente:\n\n` +
                   `${data.cuerpo}\n\n` +
                   `DOCUMENTACIÓN ANEXA Y FOJAS:\n${data.anexos_fojas}\n\n` +
                   `Sin otro particular, saludo a Usted con mi más distinguida consideración funcional.\n\n`;
            break;
    }

    const footer = `${settings.footer}\n\n\n` +
                   `---------------------------------------             ---------------------------------------\n` +
                   `      FIRMA FUNCIONARIO ACTUANTE                         FIRMA TESTIGO 1 DE ACTUACIÓN\n` +
                   `${settings.signature}\n\n\n` +
                   `---------------------------------------             ---------------------------------------\n` +
                   `     FIRMA INTERVINIENTE / CAUSANTE                      FIRMA TESTIGO 2 DE ACTUACIÓN\n\n\n` +
                   `======================================================================\n` +
                   `Documento formal emitido el ${fechaCompleta} - Adicionales Santa Fe v2.0\n` +
                   `======================================================================\n`;

    return header + body + footer;
}


// ══════════════════════════════════════════════════════════════
// 4. VISTA: HUB DE ACTAS POLICIALES (CATÁLOGO)
// ══════════════════════════════════════════════════════════════
function renderActasHub(container) {
    if (!container) container = document.getElementById('app');
    const actaList = Object.entries(ACTA_TEMPLATES);

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="flex flex-col">
                    <h1 class="text-base font-black text-white leading-none">Actas Policiales</h1>
                    <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Modelos Jurídicos Oficiales</span>
                </div>
            </div>
            <button onclick="router.navigateTo('#asistente/actas/settings')" class="size-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-all border border-white/5" title="Ajustes de Membrete">
                <span class="material-symbols-outlined text-lg">badge</span>
            </button>
        </header>

        <main class="p-5 space-y-5 pb-32 max-w-lg mx-auto view-transition">
            <!-- HERO BANNER -->
            <div class="p-4 rounded-3xl bg-gradient-to-br from-blue-900/30 via-slate-900 to-primary/10 border border-primary/20 space-y-2">
                <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-black uppercase tracking-wider">C.P.P. Ley 12.734</span>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-wider">Santa Fe</span>
                </div>
                <h2 class="text-base font-black text-white leading-tight">Generador de Documentos Formales</h2>
                <p class="text-xs text-slate-400 leading-relaxed">Seleccioná un tipo de acta. Podés autocompletar con un <strong>ejemplo real con 1 toque</strong>, editar y descargar en PDF, Word o compartir por WhatsApp.</p>
            </div>

            <!-- CATÁLOGO DE ACTAS -->
            <div class="space-y-2">
                <div class="flex items-center justify-between px-1">
                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">12 Plantillas Oficiales</h3>
                    <span class="text-[10px] text-primary font-bold">100% Personalizables</span>
                </div>

                <div class="grid gap-2.5">
                    ${actaList.map(([key, tmpl], i) => `
                        <div onclick="router.navigateTo('#asistente/actas/${key}')"
                            class="group relative overflow-hidden glass-card p-3.5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all active:scale-[0.98] cursor-pointer"
                            style="animation: fadeIn 0.3s ease-out ${i * 35}ms both">
                            <div class="flex items-center gap-3.5 relative z-10">
                                <div class="size-11 rounded-xl bg-gradient-to-br ${tmpl.color} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                                    <span class="material-symbols-outlined text-xl">${tmpl.icon}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-white text-xs leading-snug group-hover:text-primary transition-colors truncate">${tmpl.title}</h4>
                                    <p class="text-[10px] text-slate-400 truncate mt-0.5">${tmpl.subtitle}</p>
                                </div>
                                <span class="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors text-lg">chevron_right</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- DIGITAL ARCHIVE SHORTCUT -->
            <div onclick="router.navigateTo('#asistente/archivos')" class="p-3.5 rounded-2xl glass-card border border-white/5 flex items-center justify-between cursor-pointer hover:border-amber-500/30 transition-all active:scale-95">
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-amber-400 text-xl">folder_open</span>
                    <div>
                        <p class="text-xs font-bold text-slate-200">Mis Actas Guardadas</p>
                        <p class="text-[10px] text-slate-500">Historial local de actas generadas</p>
                    </div>
                </div>
                <span class="material-symbols-outlined text-slate-600 text-sm">arrow_forward</span>
            </div>
        </main>
        ${typeof renderBottomNav === 'function' ? renderBottomNav('asistente') : ''}
    `;
}


// ══════════════════════════════════════════════════════════════
// 5. VISTA: FORMULARIO Y EDITOR DE ACTA
// ══════════════════════════════════════════════════════════════
function renderActaForm(container, tipo) {
    if (!container) container = document.getElementById('app');
    const tmpl = ACTA_TEMPLATES[tipo];
    if (!tmpl) { router.navigateTo('#asistente/actas'); return; }

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <button onclick="router.navigateTo('#asistente/actas')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <div class="flex flex-col">
                    <h1 class="text-xs font-black text-white leading-tight truncate max-w-[200px] sm:max-w-xs">${tmpl.title}</h1>
                    <span class="text-[9px] text-primary font-bold uppercase tracking-widest">${tmpl.subtitle}</span>
                </div>
            </div>
            <button type="button" onclick="window._fillDemoActaData('${tipo}')" class="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-[10px] border border-amber-500/20 flex items-center gap-1 transition-all active:scale-95 shadow-sm">
                <span class="material-symbols-outlined text-xs">auto_awesome</span> Cargar Ejemplo
            </button>
        </header>

        <main class="p-5 space-y-5 pb-56 max-w-lg mx-auto view-transition">
            <!-- INSTRUCTIONS -->
            <div class="px-1 flex items-center justify-between">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Completá los campos requeridos</span>
                <span class="text-[10px] text-slate-500">${tmpl.fields.length} campos</span>
            </div>

            <!-- FORM -->
            <form id="acta-form" class="space-y-4">
                ${tmpl.fields.map(f => {
                    const reqStar = f.required ? '<span class="text-red-400 ml-0.5">*</span>' : '';
                    if (f.type === 'select') {
                        return `
                            <div class="space-y-1">
                                <label class="text-[10px] font-bold text-slate-300 uppercase ml-1 flex items-center justify-between">
                                    <span>${f.label} ${reqStar}</span>
                                </label>
                                <select id="acta-${f.id}" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all">
                                    ${f.options.map(o => `<option value="${escapeHTML(o)}" class="bg-slate-900 text-white">${escapeHTML(o)}</option>`).join('')}
                                </select>
                            </div>
                        `;
                    } else if (f.type === 'textarea') {
                        return `
                            <div class="space-y-1">
                                <label class="text-[10px] font-bold text-slate-300 uppercase ml-1 flex items-center justify-between">
                                    <span>${f.label} ${reqStar}</span>
                                </label>
                                <textarea id="acta-${f.id}" rows="3" ${f.required ? 'required' : ''} placeholder="${escapeHTML(f.placeholder || '')}"
                                    class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all resize-y"></textarea>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="space-y-1">
                                <label class="text-[10px] font-bold text-slate-300 uppercase ml-1 flex items-center justify-between">
                                    <span>${f.label} ${reqStar}</span>
                                </label>
                                <input type="${f.type || 'text'}" id="acta-${f.id}" ${f.required ? 'required' : ''} placeholder="${escapeHTML(f.placeholder || '')}"
                                    class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-primary outline-none transition-all">
                            </div>
                        `;
                    }
                }).join('')}

                <!-- SUBMIT BUTTON -->
                <button type="submit" id="btn-gen-acta" class="w-full py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all hover:shadow-2xl hover:shadow-primary/30 mt-6">
                    <span class="material-symbols-outlined text-base">description</span>
                    Generar Acta Oficial
                </button>
            </form>

            <!-- RESULT CARD -->
            <div id="acta-result" class="hidden space-y-4 pt-4 border-t border-white/10">
                <div class="flex items-center justify-between px-1">
                    <h3 class="text-[11px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm">verified</span> Documento Oficial Generado
                    </h3>
                    <span class="text-[10px] text-slate-500">Hoja A4 Legal</span>
                </div>

                <!-- OFFICIAL PREVIEW SHEET (White background for realistic feel) -->
                <div class="p-6 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-300 max-h-96 overflow-y-auto selection:bg-blue-200">
                    <pre id="acta-output" class="text-[11px] font-mono leading-relaxed whitespace-pre-wrap select-text font-serif text-justify text-slate-900"></pre>
                </div>

                <!-- EXPORT ACTIONS GRID -->
                <div class="grid grid-cols-2 gap-2.5">
                    <button onclick="window._downloadPDF()" class="py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-red-600/20">
                        <span class="material-symbols-outlined text-base">picture_as_pdf</span> Descargar PDF
                    </button>
                    <button onclick="window._downloadWord()" class="py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-600/20">
                        <span class="material-symbols-outlined text-base">description</span> Descargar Word (.doc)
                    </button>
                </div>

                <div class="grid grid-cols-3 gap-2">
                    <button onclick="window._copyActa()" class="py-3 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-white/15">
                        <span class="material-symbols-outlined text-sm">content_copy</span> Copiar
                    </button>
                    <button onclick="window._shareActaWA()" class="py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-600/20">
                        <span class="material-symbols-outlined text-sm">share</span> WhatsApp
                    </button>
                    <button onclick="window._printActa()" class="py-3 rounded-xl bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-slate-600">
                        <span class="material-symbols-outlined text-sm">print</span> Imprimir
                    </button>
                </div>

                <button onclick="window._newActa()" class="w-full py-3 rounded-xl bg-white/5 text-slate-400 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:text-white">
                    <span class="material-symbols-outlined text-sm">refresh</span> Limpiar y Nueva Acta
                </button>
            </div>
        </main>
        ${typeof renderBottomNav === 'function' ? renderBottomNav('asistente') : ''}
    `;

    // ── GESTIÓN DE ENVÍO DEL FORMULARIO ──
    const form = document.getElementById('acta-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const data = {};
        tmpl.fields.forEach(f => {
            const el = document.getElementById('acta-' + f.id);
            data[f.id] = el ? el.value.trim() : '';
        });

        const text = generateActaText(tipo, data);
        const outputEl = document.getElementById('acta-output');
        outputEl.textContent = text;
        
        const resultCard = document.getElementById('acta-result');
        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const btnGen = document.getElementById('btn-gen-acta');
        btnGen.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Acta Generada con Éxito';
        btnGen.classList.remove('from-primary', 'to-blue-600');
        btnGen.classList.add('from-emerald-600', 'to-teal-700');

        showToast('✅ Acta generada correctamente');

        // Guardar en archivo digital local
        try {
            const saved = JSON.parse(localStorage.getItem('police_actas') || '[]');
            saved.unshift({
                id: 'acta_' + Date.now(),
                tipo: tipo,
                titulo: tmpl.title,
                data: data,
                text: text,
                date: new Date().toISOString()
            });
            if (saved.length > 50) saved.pop();
            localStorage.setItem('police_actas', JSON.stringify(saved));
        } catch (err) {
            console.warn('LocalStorage notice:', err);
        }
    };

    // ── FUNCIONES DE EXPORTACIÓN ──

    // 1. Copiar al Portapapeles
    window._copyActa = () => {
        const text = document.getElementById('acta-output')?.textContent || '';
        if (!text) return showToast('⚠️ No hay texto generado');
        navigator.clipboard.writeText(text)
            .then(() => showToast('📋 Acta copiada al portapapeles'))
            .catch(() => showToast('⚠️ No se pudo copiar'));
    };

    // 2. Compartir por WhatsApp con formato limpio
    window._shareActaWA = () => {
        const text = document.getElementById('acta-output')?.textContent || '';
        if (!text) return showToast('⚠️ No hay texto generado');
        // Truncar si excede límite de URL
        const encoded = encodeURIComponent(text.substring(0, 4500));
        window.open('https://wa.me/?text=' + encoded, '_blank');
    };

    // 3. Descargar Word (.doc editable nativo)
    window._downloadWord = () => {
        const text = document.getElementById('acta-output')?.textContent || '';
        if (!text) return showToast('⚠️ No hay acta para exportar');

        const filename = `Acta_${tipo}_${Date.now()}.doc`;
        const lines = text.split('\n');
        let formattedBody = '';

        lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('===')) {
                formattedBody += `<hr style="border: 0; border-top: 1px solid #999; margin: 10px 0;">`;
            } else if (trimmed === '') {
                formattedBody += `<p style="margin: 0; min-height: 12pt;">&nbsp;</p>`;
            } else if (trimmed === trimmed.toUpperCase() && trimmed.length < 80 && !trimmed.includes(':')) {
                formattedBody += `<p style="text-align: center; font-weight: bold; margin: 6pt 0;">${escapeHTML(trimmed)}</p>`;
            } else {
                formattedBody += `<p style="text-align: justify; margin: 4pt 0; text-indent: 20pt; line-height: 1.5;">${escapeHTML(trimmed)}</p>`;
            }
        });

        const wordHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>${tmpl.title}</title>
                <!--[if gte mso 9]>
                <xml>
                    <w:WordDocument>
                        <w:View>Print</w:View>
                        <w:Zoom>100</w:Zoom>
                    </w:WordDocument>
                </xml>
                <![endif]-->
                <style>
                    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; padding: 2.5cm; }
                    p { margin: 0; font-size: 12pt; }
                </style>
            </head>
            <body>
                ${formattedBody}
            </body>
            </html>
        `;

        const blob = new Blob(['\ufeff', wordHtml], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
        showToast('📄 Documento Word (.doc) descargado');
    };

    // 4. Descargar PDF Profesional con html2pdf
    window._downloadPDF = () => {
        const text = document.getElementById('acta-output')?.textContent || '';
        if (!text) return showToast('⚠️ No hay acta para exportar');

        const filename = `Acta_${tipo}_${Date.now()}.pdf`;

        // Crear elemento fuera de pantalla para renderizar
        const containerDiv = document.createElement('div');
        containerDiv.id = 'temp-pdf-render';
        containerDiv.style.position = 'fixed';
        containerDiv.style.left = '-9999px';
        containerDiv.style.top = '0';
        containerDiv.style.width = '794px'; // Ancho exacto A4 a 96 DPI
        containerDiv.style.backgroundColor = '#ffffff';
        containerDiv.style.color = '#000000';
        containerDiv.style.padding = '40px 50px';
        containerDiv.style.fontFamily = '"Times New Roman", Times, serif';
        containerDiv.style.fontSize = '11pt';
        containerDiv.style.lineHeight = '1.5';
        containerDiv.style.textAlign = 'justify';

        const lines = text.split('\n');
        let htmlContent = '';
        lines.forEach(l => {
            const trimmed = l.trim();
            if (trimmed.startsWith('===')) {
                htmlContent += '<hr style="border:0;border-top:1px solid #666;margin:8px 0;">';
            } else if (trimmed === '') {
                htmlContent += '<div style="height:8px;"></div>';
            } else if (trimmed === trimmed.toUpperCase() && trimmed.length < 80 && !trimmed.includes(':')) {
                htmlContent += `<div style="text-align:center;font-weight:bold;margin:4px 0;">${escapeHTML(trimmed)}</div>`;
            } else {
                htmlContent += `<div style="text-align:justify;margin:3px 0;text-indent:15px;">${escapeHTML(trimmed)}</div>`;
            }
        });

        containerDiv.innerHTML = htmlContent;
        document.body.appendChild(containerDiv);

        showToast('⏳ Compilando PDF oficial...');

        if (typeof html2pdf !== 'undefined') {
            html2pdf().from(containerDiv).set({
                margin: [0.6, 0.6, 0.6, 0.6],
                filename: filename,
                html2canvas: { scale: 2, logging: false, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            }).save().then(() => {
                showToast('✅ PDF Oficial Descargado');
                containerDiv.remove();
            }).catch(err => {
                console.warn('PDF export fallback:', err);
                containerDiv.remove();
                window._downloadWord();
            });
        } else {
            containerDiv.remove();
            window._printActa();
        }
    };

    // 5. Imprimir nativo (diálogo del navegador con @media print)
    window._printActa = () => {
        const text = document.getElementById('acta-output')?.textContent || '';
        if (!text) return showToast('⚠️ No hay acta para imprimir');

        const printWin = window.open('', '_blank');
        if (!printWin) {
            return window._downloadWord();
        }

        printWin.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>${tmpl.title}</title>
                <style>
                    @page { size: A4; margin: 2.5cm; }
                    body {
                        font-family: 'Times New Roman', Times, serif;
                        font-size: 12pt;
                        line-height: 1.6;
                        color: #000;
                        background: #fff;
                        padding: 20px;
                        text-align: justify;
                    }
                    pre {
                        white-space: pre-wrap;
                        font-family: inherit;
                        text-align: justify;
                    }
                </style>
            </head>
            <body>
                <pre>${escapeHTML(text)}</pre>
            </body>
            </html>
        `);
        printWin.document.close();
        printWin.focus();
        setTimeout(() => {
            printWin.print();
        }, 300);
    };

    // 6. Limpiar y nueva acta
    window._newActa = () => {
        renderActaForm(container, tipo);
    };

    // ══════════════════════════════════════════════════════════════
    // 6. DATOS DE EJEMPLO REALES PARA TODAS LAS 12 ACTAS
    // ══════════════════════════════════════════════════════════════
    window._fillDemoActaData = (tipoActa) => {
        const now = new Date();
        const fechaHoy = now.toISOString().split('T')[0];

        const demos = {
            procedimiento: {
                localidad: "Santa Fe",
                lugar: "Av. Peñaloza e intersección con calle Gorriti",
                motivo_intervencion: "Comisión de Delito en Flagrancia",
                involucrados: "PÉREZ, Martín Gabriel, D.N.I. N° 38.192.401, de 29 años, con domicilio real en calle Chaco 5420 de esta ciudad.",
                descripcion: "En circunstancias que la dotación policial recorría la cuadrícula en móvil 8912, se observa al causante intentando violentar la traba de seguridad de un motovehículo marca Honda Wave 110cc estacionado frente al comercio. Al notar la presencia del móvil policial, emprende fuga a la carrera siendo alcanzado y reducido a los pocos metros mediante la utilización mínima y racional de la fuerza.",
                resultado: "Aprehensión del causante en flagrancia y aseguramiento del motovehículo damnificado en calidad de resguardo preventivo.",
                elementos_secuestrados: "1) Un elemento punzante tipo 'chupete' de hierro confeccionado de forma casera de 12 cm de longitud con empuñadura encintada.",
                fiscal: "Dr. Carlos Zoppegni - Fiscal del MPA Unidad de Flagrancia",
                testigo1: "LÓPEZ, Esteban Carlos, D.N.I. N° 29.401.592, domiciliado en Peñaloza 6720, Tel: 342-4910291",
                testigo2: "GÓMEZ, Andrea Soledad, D.N.I. N° 34.192.059, domiciliada en Gorriti 3910, Tel: 342-5819201",
                observaciones: "El causante no presenta lesiones visibles. Fue examinado en medicina legal previo a su ingreso en dependencia policial."
            },

            aprehension: {
                localidad: "Rosario",
                lugar_aprehension: "Av. Pellegrini y calle Corrientes",
                aprehendido_nombre: "TORRES, Gabriel Matías",
                aprehendido_dni: "40.192.831",
                aprehendido_nacionalidad: "Argentina, soltero, de 26 años",
                aprehendido_domicilio: "Pasaje Los Hornos 5400, Rosario",
                delito_atribuido: "Robo en Grado de Tentativa y Resistencia a la Autoridad (Arts. 164, 42 y 239 del Código Penal)",
                causa_aprehension: "Aprehensión en flagrancia tras sustraer pertenencias mediante amenazas a una transeúnte e intentar agredir al personal policial durante la reducción.",
                abogado_designado: "Servicio Público Provincial de Defensa Penal (SPPDP)",
                llamada_familiar: "Madre: Torres Juana al teléfono 341-4829102",
                fiscal: "Dra. Luciana Escobar - MPA Fiscalía de Flagrancia Rosario. Directiva: Mantiene la aprehensión, remisión de antecedentes y citación a audiencia imputativa.",
                testigo1: "PAZ, Mariano Andrés, D.N.I. N° 33.192.401, con domicilio en San Juan 1420, Rosario",
                testigo2: "RÍOS, Valeria Noemí, D.N.I. N° 37.902.114, con domicilio en Corrientes 1840, Rosario",
                observaciones: "Constancia médica librada por médico policial de guardia en Hospital Provincial."
            },

            requisa: {
                localidad: "Rafaela",
                lugar: "Ruta Nacional 34 km 224 y Av. Santa Fe",
                tipo_requisa: "Requisa Personal y Vehicular Simultánea",
                persona_requisada: "ROMERO, Javier Alberto, D.N.I. N° 39.102.941, domiciliado en B° Italia de Rafaela",
                vehiculo_datos: "Automóvil Volkswagen Gol Trend, color gris plata, Dominio AD-912-KL",
                motivo_fundado: "Maniobras evasivas ante el puesto de control policial, observándose a simple vista desde el exterior del rodado un bulto compatible con arma blanca en el sector de la consola central.",
                intimacion_previa: "Se le intimó previamente a exhibir los efectos y accedió",
                resultado: "Del interior del rodado se secuestra un arma blanca tipo cuchillo de monte con hoja de acero de 22 cm con vaina de cuero. Entre sus prendas se constata la suma de $185.000 en billetes de curso legal de los cuales no acredita origen.",
                testigo1: "PERALTA, Jorge Daniel, D.N.I. N° 28.401.924, con domicilio en Bv. Lehmann 450",
                testigo2: "CASTILLO, Lucas, D.N.I. N° 35.102.948, con domicilio en Lavalle 820",
                observaciones: "El elemento secuestrado quedó debidamente precintado y rotulado con cadena de custodia N° 00491."
            },

            siniestro: {
                localidad: "Santa Fe",
                lugar: "Intersección de Bv. Pellegrini y calle 9 de Julio, calzada de asfalto seca, visibilidad óptima, semáforos en correcto funcionamiento.",
                vehiculo_a: "Automóvil Ford Focus 2.0, color blanco, Dominio AB-402-TR",
                conductor_a: "GONZÁLEZ, Roberto Daniel, D.N.I. N° 27.410.892, con domicilio en Urquiza 3120, Licencia N° 27410892 habilitada categoría B1.",
                seguro_a: "La Segunda Cooperativa de Seguros, Póliza N° 8492019 vigente.",
                vehiculo_b: "Motocicleta Motomel S2 150cc, color azul, Dominio A049FKL",
                conductor_b: "SÁNCHEZ, Rodrigo Nicolás, D.N.I. N° 34.192.059, con domicilio en San Martín 1820, Licencia N° 34192059 categoría A2.",
                seguro_b: "Federación Patronal Seguros, Póliza N° 391024 vigente.",
                lesionados: "El conductor del motovehículo manifiesta fuerte dolor en cadera y extremidad inferior derecha. Se hace presente Unidad de Emergencias 107 Móvil 14 a cargo de la Dra. Rossi Romina (Mat. 9410), quien tras inmovilización dispone traslado preventivo al Hospital José María Cullen para placas radiográficas.",
                danos_materiales: "Vehículo A: Hundimiento de guardabarros delantero izquierdo y rotura de óptica. Vehículo B: Deformación de manillar, rotura de plásticos laterales y desprendimiento de espejo retrovisor izquierdo.",
                mecanica: "El rodado Ford Focus circulaba por Bv. Pellegrini en sentido oeste-este cuando al llegar a la bocacalle de 9 de Julio se produce el impacto por causas que serán materia de peritaje.",
                intervencion_peritos: "Se dio intervención a peritos de la Policía Científica (AIC) para toma de fotografías y croquis planimétrico de rigor.",
                fiscal: "Fiscalía de Accidentes de Tránsito en Turno del MPA Santa Fe"
            },

            secuestro: {
                localidad: "Venado Tuerto",
                lugar: "Calle Brown N° 1240, en el patio trasero de la finca",
                nro_causa: "CUIJ 21-0849201-9",
                imputado_victima: "Imputado: BENÍTEZ, Carlos / Damnificada: ROLDÁN, Elena",
                elementos_detalle: "1) Un arma de fuego tipo revólver calibre 38 Largo, marca Smith & Wesson, número de serie 40291 visible en empuñadura, con cachas de madera color marrón en buen estado de conservación.\n2) Seis (06) cartuchos intactos calibre 38 marca FLB alojados en el tambor del arma.\n3) Un teléfono celular táctil marca Samsung Galaxy A32 color negro con pantalla trizada.",
                embalaje_precinto: "Bolsa de polietileno transparente termosellada, precinto de seguridad inviolable N° MPA-004921",
                depositario: "Sección Balística Forense de la Agencia de Investigación Criminal (AIC)",
                testigo1: "MARTÍNEZ, Facundo, D.N.I. N° 32.410.892, con domicilio en Brown 1210",
                testigo2: "FERRERO, Claudia, D.N.I. N° 29.840.119, con domicilio en San Martín 420",
                observaciones: "El arma no se encontraba montada al momento de la intervención y fue descargada por personal especializado."
            },

            custodia: {
                cuij: "21-0849201-9",
                fiscal: "Dr. Horacio Puyrredón - MPA Unidad Fiscal Venado Tuerto",
                imputado: "BENÍTEZ, Carlos Alberto - DNI 36.192.401",
                victima: "ROLDÁN, Elena Beatriz - DNI 28.401.992",
                procedimiento: "Allanamiento Domiciliario y Secuestro Judicial",
                lugar_recoleccion: "Habitación principal, debajo del colchón en extremo derecho",
                descripcion_indicio: "Un revólver calibre 38 Largo, marca Smith & Wesson serie N° 40291 con 6 cartuchos intactos. Peso total con cartuchos: 920 gramos.",
                embalaje: "Caja de cartón rígido con orificios precintados con faja de evidencia MPA y bolsa hermética secundaria.",
                precinto: "Faja de Seguridad y Precinto Rojo N° MPA-SF-084912",
                recolector: "Oficial Subinspector PÉREZ, Juan Manuel - Legajo 89.201",
                dependencia_recolector: "Comisaría 2da - Unidad Regional VIII",
                destino: "Gabinete Balístico Pericial - MPA Venado Tuerto"
            },

            allanamiento: {
                localidad: "Santo Tomé",
                juzgado: "Colegio de Jueces de Primera Instancia en lo Penal de Santa Fe - Dr. Jorge Patrizi",
                nro_causa: "CUIJ 21-0941829-3",
                fiscal: "Dr. Roberto Apullán - MPA Delitos Complejos",
                fecha_orden: "Oficio N° 402/26 librado con fecha " + fechaHoy,
                direccion: "Calle 3 de Febrero N° 2840, casa de mampostería color blanco con rejas negras al frente",
                morador: "GIMÉNEZ, Andrea Soledad, D.N.I. N° 33.910.492, moradora responsable",
                notificacion_orden: "Se exhibió la orden judicial original y se entregó copia íntegra al morador",
                testigo1: "FERNÁNDEZ, Marcos, D.N.I. N° 31.902.114, domicilio en 3 de Febrero 2810",
                testigo2: "SUÁREZ, Liliana, D.N.I. N° 35.129.401, domicilio en Av. 7 de Marzo 1920",
                inventario: "En el dormitorio matrimonial se constata sobre el placard:\n1) Una balanza digital de precisión marca Pocket Scale color gris.\n2) La suma de $450.000 en billetes de $1.000 y $2.000.\n3) Dos teléfonos celulares marca Motorola y Samsung.\nEn el patio posterior no se hallaron elementos de interés para la presente causa.",
                observaciones: "Se dejó copia certificada del acta y de la orden judicial a la moradora de plena conformidad."
            },

            constatacion: {
                localidad: "Esperanza",
                lugar: "Calle Belgrano N° 1820, local comercial rubro electrónica",
                motivo_constatacion: "Rotura de Aberturas / Intrusión",
                requirente: "KAUFMANN, Rodolfo Ernesto, D.N.I. N° 24.192.059, propietario del local",
                estado_observado: "Se constata la vidriera principal de cristal templado de 2 x 3 metros completamente destrozada con restos esparcidos sobre la vereda y el interior del salón de ventas. En el interior se observa la gaveta de la caja registradora abierta y vacía con cables cortados. En el suelo se halló una piedra de grandes dimensiones utilizada presuntamente para el impacto.",
                tomas_fotograficas: "Se efectuaron tomas fotográficas del estado del lugar",
                testigo1: "WEBER, Marcelo Luis, D.N.I. N° 28.910.441, vecino colindante de Belgrano 1824",
                observaciones: "Se resguarda la escena a la espera de personal pericial de Criminalística de la UR XI."
            },

            entrega_menor: {
                localidad: "San Lorenzo",
                menor_nombre: "G., L. M.",
                menor_dni: "54.192.831 (Nacimiento: 12/04/2011 - 15 años de edad)",
                motivo_intervencion: "Hallado desorientado en la vía pública en horas de la madrugada sin documentación habilitante.",
                examen_medico: "Dr. Alassia Fernando (Mat. 8192), Constancia Médica N° 402/26: 'Lúcido, orientado en tiempo y espacio, sin lesiones corporales traumáticas visibles'.",
                organismo_ninez: "Subsecretaría de los Derechos de la Niñez, Adolescencia y Familia - Notificada Lic. María Laura Blanco quien avaló la restitución familiar.",
                progenitor_nombre: "GÓMEZ, Mirta Graciela",
                progenitor_dni: "30.419.820, con domicilio en calle San Juan 420 de San Lorenzo",
                parentesco_acreditado: "Acredita mediante Libreta de Familia N° 849.201 del Registro Civil de Santa Fe y partida de nacimiento.",
                compromiso_guarda: "Se compromete a la guarda, custodia, cuidado y presentación ante la autoridad competente",
                observaciones: "Se hace entrega de la mochila escolar con pertenencias personales del menor en perfecto estado."
            },

            notificacion: {
                localidad: "Santa Fe",
                notificado_nombre: "SÁNCHEZ, Rodrigo Nicolás",
                notificado_dni: "34.192.059",
                domicilio: "Calle San Martín N° 1820, Piso 2 Dpto B, Santa Fe",
                autoridad_ordenante: "Tribunal Colegiado de Familia N° 2 de la Primera Circunscripción Judicial",
                expediente: "CUIJ 21-0941029-4 - 'L. M. c/ SÁNCHEZ s/ Medidas Autosatisfactivas de Protección'",
                contenido_medida: "1) Cese inmediato de todo acto de perturbación, intimidación o violencia física, verbal o telemática respecto de la víctima.\n2) Prohibición de acercamiento en un radio de doscientos (200) metros respecto del domicilio de la víctima y de su lugar de trabajo.\n3) Prohibición de contacto directo o interpósita persona por redes sociales o telefonía.",
                apercibimiento_art239: "Se le notifica expresamente que su incumplimiento configurará el delito de Desobediencia a una Orden Judicial (Art. 239 del Código Penal)",
                actitud_notificado: "Firma en plena conformidad y recibe duplicado de la cédula",
                testigo1: "Of. Subinspector DÍAZ, Pablo - Legajo 84.102 (Comisaría 1ra)"
            },

            denuncia: {
                localidad: "Comisaría 1ra - Santa Fe Capital",
                denunciante_nombre: "GIMÉNEZ, Andrea Soledad",
                denunciante_dni: "33.910.492",
                denunciante_nacionalidad_edad: "Argentina, 35 años, soltera",
                denunciante_domicilio: "Calle Urquiza N° 3120, Santa Fe - Celular: 342-4910291",
                denunciante_ocupacion: "Docente de nivel secundario",
                lugar_hecho: "Calle Urquiza esquina Suipacha, en la vereda sur",
                fecha_hora_hecho: "En fecha " + fechaHoy + " siendo aproximadamente las 20:15 hs",
                hechos: "Que en fecha y hora indicadas, la denunciante circulaba a pie por la intersección mencionada transportando al hombro su cartera de cuero color marrón. En un momento dado, se le aproxima por detrás una motocicleta tipo 110cc tripulada por dos masculinos con cascos oscuros colocados, descendiendo el acompañante quien de un fuerte tirón le arrebata la cartera, provocando que la dicente caiga sobre la vereda. Acto seguido los agresores se dieron a la fuga por calle Suipacha en contramano hacia el este.",
                elementos_sustraidos: "1) Cartera de cuero marrón marca Prüne.\n2) Teléfono celular iPhone 12 color azul con funda transparente.\n3) Billetera con DNI, licencia de conducir y dos tarjetas de débito del Nuevo Banco de Santa Fe.\n4) Llaves de su domicilio particular.",
                autores_sospechosos: "Dos sujetos jóvenes, delgados, vestidos con camperas oscuras y cascos de moto negros sin visera transparente, a bordo de motovehículo tipo Honda Wave o similar.",
                testigos_pruebas: "Un transeúnte de la zona que la auxilió tras el hecho. En la esquina del comercio de enfrente (farmacia) existen cámaras de seguridad orientadas a la calzada.",
                instancia_penal: "Insta formalmente la acción penal y solicita copia de la presente denuncia"
            },

            oficio: {
                localidad: "Santa Fe",
                destinatario: "Dr. Carlos Zoppegni - Fiscal del MPA",
                organismo: "Unidad Fiscal Especial de Delitos Contra la Propiedad - MPA Santa Fe",
                referencia: "CUIJ N° 21-0849201-9 - Sumario Preventivo N° 402/26",
                objeto: "Eleva actuaciones sumariales prevenidas, acta de aprehensión y rótulo de custodia",
                cuerpo: "Tengo el agrado de dirigirme a Usted, en el marco de la investigación penal preparatoria individualizada en la referencia, a los fines de elevar para su conocimiento y demás efectos legales pertinentes las actuaciones sumariales labradas con motivo de la aprehensión del causante PÉREZ Martín Gabriel (DNI 38.192.401) por el presunto delito de Robo en Flagrancia. Se adjuntan declaraciones testimoniales tomadas en sede de guardia y ficha de antecedentes.",
                anexos_fojas: "Acta de procedimiento (fs. 1), Acta de aprehensión y lectura de derechos (fs. 2), Acta de secuestro (fs. 3), Rótulo de cadena de custodia N° 004921 (fs. 4), Ficha médica legista (fs. 5). Total: siete (07) fojas útiles."
            }
        };

        const d = demos[tipoActa];
        if (!d) return showToast('⚠️ Sin ejemplo disponible');

        Object.keys(d).forEach(k => {
            const el = document.getElementById('acta-' + k);
            if (el) {
                el.value = d[k];
                el.classList.add('ring-1', 'ring-amber-400/50');
                setTimeout(() => el.classList.remove('ring-1', 'ring-amber-400/50'), 1500);
            }
        });

        showToast('✨ Datos de ejemplo cargados con éxito');
    };
}

// ══════════════════════════════════════════════════════════════
// 7. EXPORTS GLOBALES
// ══════════════════════════════════════════════════════════════
window.renderActasHub = renderActasHub;
window.renderActasSettings = renderActasSettings;
window.renderActaForm = renderActaForm;
window.ACTA_TEMPLATES = ACTA_TEMPLATES;
