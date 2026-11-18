/**
 * Adicionales Santa Fe - Repositorio de Cursos Oficiales con Puntaje para Ascenso
 * Conforme Decreto Reglamentario N.° 1166/18 (Santa Fe) y Ley del Personal Policial 12.521
 * Cursos 100% Gratuitos y Asincrónicos de Plataformas Oficiales (Capacitar, Accenture, CAME, INAP)
 */

(function() {
    'use strict';

    window.academyCourses = [
        {
            id: 'capacitar-forense-accenture',
            title: 'Análisis forense',
            fullTitle: 'Análisis forense digital y preservación de evidencia',
            partner: 'En alianza con Accenture',
            provider: 'Ministerio de Economía de la Nación (Capacitar) & Accenture',
            topic: 'Ciberseguridad',
            category: 'ciberseguridad',
            level: 'Intermedio',
            duration: '3 hs y 18 min',
            cost: 'Curso y certificado sin costo',
            programTag: 'Aplica a Programa Insertar',
            tags: ['Sin costo', 'Certificado Oficial', 'Ciberseguridad', 'Puntaje Ascenso D-1'],
            featured: true,
            description: 'Aprendé en qué consiste la actividad de análisis forense y su importancia para analizar lo ocurrido, permitiendo llegar al origen del problema y actuando en consecuencia para evitar daños futuros. Conocé también las metodologías y herramientas más comunes para llevar a cabo esta labor.',
            syllabus: [
                'Concepto e importancia del análisis forense informático.',
                'Identificación del origen del problema e incidentes digitales.',
                'Metodologías estandarizadas de investigación pericial.',
                'Herramientas más comunes para llevar a cabo la labor forense.',
                'Preservación de la cadena de custodia y prevención de daños futuros.'
            ],
            ascensoImpact: {
                rubro: 'Capacitación y Perfeccionamiento Adicional (Decreto 1166/18)',
                points: '0.25 a 0.50 pts en el Legajo de Concurso',
                recommendation: 'Clave para personal de Seguridad, PDI / AIC y oficiales que buscan sumar antecedentes en delitos complejos.'
            },
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/formulario-de-registro-cursos-de-capacitar?id_curso=C48040',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-accenture#C48040'
        },
        {
            id: 'capacitar-problemas-accenture',
            title: 'Análisis y resolución de problemas Inicial',
            fullTitle: 'Análisis y resolución metodológica de problemas operativos',
            partner: 'En alianza con Accenture',
            provider: 'Ministerio de Economía de la Nación (Capacitar) & Accenture',
            topic: 'Habilidades blandas',
            category: 'liderazgo',
            level: 'Inicial',
            duration: '1 h',
            cost: 'Curso y certificado sin costo',
            programTag: 'Aplica a Programa Insertar',
            tags: ['Sin costo', 'Certificado Oficial', 'Habilidades de Mando', 'Puntaje Ascenso'],
            featured: false,
            description: 'Ser eficaz y autónomo en el análisis y resolución de problemas es una competencia altamente demandada hoy en día, en el mercado laboral y la función de conducción. Aprendé metodologías para desglosar contingencias, priorizar alternativas y resolver incidentes bajo presión.',
            syllabus: [
                'Definición y encuadre operativo de un problema.',
                'Técnicas de análisis causa-raíz y diagnóstico de situación.',
                'Generación de alternativas y toma de decisiones tácticas.',
                'Monitoreo de resultados e implementación de correcciones.'
            ],
            ascensoImpact: {
                rubro: 'Capacitación en Conducción y Habilidades Operativas (Decreto 1166/18)',
                points: '0.25 pts en el Legajo de Concurso',
                recommendation: 'Ideal para Suboficiales que concursan para Oficial y oficiales a cargo de guardias.'
            },
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/formulario-de-registro-cursos-de-capacitar?id_curso=C48099',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-accenture#C48099'
        },
        {
            id: 'came-ciberseguridad-datos',
            title: 'Ciberseguridad y Protección de Datos Personales',
            fullTitle: 'Gestión de la Ciberseguridad, Privacidad y Cadena de Custodia',
            partner: 'CAME Educativa',
            provider: 'Confederación Argentina de la Mediana Empresa (CAME)',
            topic: 'Ciberseguridad',
            category: 'ciberseguridad',
            level: 'Intermedio',
            duration: '4 semanas (30 hs cátedra)',
            cost: 'Curso y certificado sin costo',
            programTag: 'Plataforma CAME Educativa',
            tags: ['30 Hs Cátedra', 'Puntaje Máximo', 'Sin costo', 'Certificado Homologable'],
            featured: true,
            description: 'Capacitación integral sobre ciberseguridad, normativas de privacidad (Ley 25.326), protección de activos de información, detección de malware y protocolos de respuesta ante fuga o alteración de datos.',
            syllabus: [
                'Marco regulatorio de protección de datos personales y privacidad.',
                'Vulnerabilidades informáticas habituales y vectores de ataque.',
                'Políticas de seguridad de la información y buenas prácticas operativas.',
                'Preservación de evidencia digital y protocolos de actuación.'
            ],
            ascensoImpact: {
                rubro: 'Cursos con Carga Horaria Mayor a 30 Horas (Decreto 1166/18)',
                points: '0.50 a 1.00 pt en el Legajo de Concurso',
                recommendation: 'Por superar las 30 horas cátedra acreditadas, otorga el puntaje más alto del baremo de antecedentes.'
            },
            registrationUrl: 'https://came-educativa.com.ar/'
        },
        {
            id: 'salud-rcp-primer-respondiente',
            title: 'Soporte Vital Básico y RCP para Primer Respondiente',
            fullTitle: 'Primeros Socorros Tácticos, RCP y Manejo del Desfibrilador (DEA)',
            partner: 'Ministerio de Salud & Cruz Roja',
            provider: 'Programa Nacional de Capacitación Continua en Salud',
            topic: 'Emergentología Operativa',
            category: 'operativo',
            level: 'Operativo',
            duration: '6 hs (Asincrónico)',
            cost: 'Curso y certificado sin costo',
            programTag: 'Ministerio de Salud',
            tags: ['Aptitud Operativa', 'Sin costo', 'RCP Oficial', 'Primer Respondiente'],
            featured: false,
            description: 'Protocolos de actuación inmediata para policías en calle como primeros respondientes ante paros cardiorrespiratorios, asfixias y traumatismos severos, garantizando la cadena de supervivencia hasta el arribo del SIES 107.',
            syllabus: [
                'Evaluación rápida de la escena y bioseguridad del efectivo.',
                'Maniobras de RCP para adultos, niños y lactantes.',
                'Uso correcto del Desfibrilador Externo Automático (DEA).',
                'Desobstrucción de vía aérea (Heimlich) y contención de hemorragias.'
            ],
            ascensoImpact: {
                rubro: 'Aptitud Operativa y Auxilio a la Comunidad (Decreto 1166/18)',
                points: '0.25 a 0.50 pts en el Legajo de Concurso',
                recommendation: 'Indispensable para numerarios de Comando Radioeléctrico, Policía de Acción Táctica y Comisarías.'
            },
            registrationUrl: 'https://www.argentina.gob.ar/salud/primeros-auxilios'
        },
        {
            id: 'inap-redaccion-actas-sumarios',
            title: 'Redacción Administrativa Policial y Actas Procesales',
            fullTitle: 'Técnicas de Redacción Normativa, Informes y Sumarios Preventivos',
            partner: 'INAP (Instituto Nacional de la Administración Pública)',
            provider: 'Instituto Nacional de la Administración Pública',
            topic: 'Procedimientos Administrativos',
            category: 'procedimientos',
            level: 'Intermedio',
            duration: '15 hs certificadas',
            cost: 'Curso y certificado sin costo',
            programTag: 'INAP - Gobierno Nacional',
            tags: ['Subescalafón Judicial', 'Sin costo', '15 Hs Certificadas', 'Actas y Sumarios'],
            featured: false,
            description: 'Dominá las técnicas de redacción técnico-administrativa para la confección de sumarios, elevaciones y actas de secuestro o aprehensión con estricto valor probatorio conforme al Código Procesal Penal de Santa Fe.',
            syllabus: [
                'Claridad y precisión expositiva en documentos oficiales.',
                'Estructura legal del acta de procedimiento y garantías procesales.',
                'Confección de informes circunstanciados e inicios sumarios.',
                'Evitación de nulidades procesales por vicios de forma o redacción.'
            ],
            ascensoImpact: {
                rubro: 'Capacitación Técnico-Jurídica y Sumarial (Decreto 1166/18)',
                points: '0.25 a 0.50 pts en el Legajo de Concurso',
                recommendation: 'Recomendado para Oficiales de Guardia, Sumariantes de Comisaría e Investigadores Judiciales.'
            },
            registrationUrl: 'https://capacitacion.inap.gob.ar/'
        }
    ];

    /**
     * Resuelve el enlace de inscripción oficial ÚNICAMENTE si el usuario cuenta con Pase PRO.
     * Si no es PRO, retorna null para evitar que el enlace esté disponible en el DOM.
     */
    window._resolveCourseOfficialLink = function(courseId) {
        var isProFn = null;
        if (typeof window !== 'undefined' && typeof window._isIsepPro === 'function') {
            isProFn = window._isIsepPro;
        } else if (typeof _isIsepPro === 'function') {
            isProFn = _isIsepPro;
        }

        if (isProFn && !isProFn()) {
            return null;
        }
        var course = window.academyCourses.find(function(c) { return c.id === courseId; });
        return course ? course.registrationUrl : null;
    };

})();
