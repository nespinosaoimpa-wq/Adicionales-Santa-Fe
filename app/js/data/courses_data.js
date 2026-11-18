/**
 * Adicionales Santa Fe - Repositorio de Cursos Oficiales Gratuitos con Certificado
 * Plataforma Capacitar (Secretaría de Industria y Comercio / Ministerio de Economía de la Nación)
 * Trayectos con Mayor Carga Horaria (62 hs y 86 hs) y Alianzas con Accenture, Microsoft, AWS y Oracle.
 * Cursos 100% Gratuitos, Asincrónicos y Virtuales con Certificación Oficial para Sumar Puntos al Legajo.
 */

(function() {
    'use strict';

    window.academyCourses = [
        {
            id: 'capacitar-ruta-ciberseguridad-62h',
            code: 'RUTA-CIBER-62H',
            title: 'Ruta Ciberseguridad (Trayecto Oficial Completo)',
            partner: 'Plataforma Capacitar · Nación',
            provider: 'Ministerio de Economía de la Nación (Capacitar)',
            topic: 'Ciberseguridad',
            category: 'ciberseguridad',
            level: 'Avanzado',
            duration: '62 hs cátedra',
            hours: 62,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Ruta Oficial Capacitar · Mayor Carga Horaria',
            tags: ['62 Hs Cátedra', 'Máximo Puntaje', 'Sin costo', 'Certificado Oficial', 'Ciberseguridad'],
            featured: true,
            description: 'Trayecto formativo integral de 62 horas sobre el panorama actual de amenazas informáticas, procedimientos y herramientas de defensa digital para resguardar la información y sistemas. Por su extensa carga horaria certificada, es una de las capacitaciones con mayor impacto para sumar puntos de antecedentes en tu legajo policial.',
            syllabus: [
                'Fundamentos y arquitectura de la seguridad informática.',
                'Procedimientos y protocolos para la protección de activos de información.',
                'Detección y prevención de malware, ransomware y ataques dirigidos.',
                'Respuesta operativa ante incidentes y preservación de registros.',
                'Evaluación final integradora con certificación oficial de 62 hs.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar'
        },
        {
            id: 'capacitar-forense-accenture',
            code: 'C48040',
            title: 'Análisis forense',
            partner: 'En alianza con Accenture',
            provider: 'Plataforma Capacitar · Ministerio de Economía de la Nación',
            topic: 'Ciberseguridad y Pericias',
            category: 'ciberseguridad',
            level: 'Intermedio',
            duration: '3 hs y 18 min',
            hours: 4,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Aplica a Programa Insertar',
            tags: ['Sin costo', 'Certificado Oficial', 'Pericia Digital', 'Accenture'],
            featured: true,
            description: 'Aprendé en qué consiste la actividad de análisis forense y su importancia para analizar lo ocurrido, permitiendo llegar al origen del problema y actuando en consecuencia para evitar daños futuros. Conocé también las metodologías y herramientas más comunes para llevar a cabo esta labor pericial.',
            syllabus: [
                'Concepto e importancia del análisis forense informático.',
                'Identificación del origen del problema e incidentes digitales.',
                'Metodologías estandarizadas de investigación pericial.',
                'Herramientas más comunes para la labor pericial y análisis de causa-raíz.',
                'Preservación de la cadena de custodia y prevención de incidentes.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/formulario-de-registro-cursos-de-capacitar?id_curso=C48040',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-accenture#C48040'
        },
        {
            id: 'capacitar-ruta-sistemas-86h',
            code: 'RUTA-DEV-86H',
            title: 'Ruta Sistemas y Desarrollo Web (Trayecto Completo)',
            partner: 'Plataforma Capacitar · Nación',
            provider: 'Ministerio de Economía de la Nación (Capacitar)',
            topic: 'Tecnología y Sistemas',
            category: 'tecnologia',
            level: 'Avanzado',
            duration: '86 hs cátedra',
            hours: 86,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Ruta Oficial Capacitar · Máxima Carga Horaria',
            tags: ['86 Hs Cátedra', 'Máximo Puntaje', 'Sin costo', 'Sistemas y Datos'],
            featured: false,
            description: 'El trayecto con mayor carga horaria de la plataforma estatal: 86 horas de formación estructurada en lógica de programación, bases de datos y desarrollo de sistemas. Acreditación de alto valor curricular para el personal técnico e informático de la institución.',
            syllabus: [
                'Lógica de programación y diseño de interfaces.',
                'Administración y consulta de bases de datos relacionales.',
                'Comunicación entre servidores y protocolos de red.',
                'Desarrollo de proyectos y evaluación final con certificado de 86 hs.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar'
        },
        {
            id: 'capacitar-ciberseguridad-microsoft',
            code: 'MS-SEC',
            title: 'Fundamentos Profesionales de Ciberseguridad',
            partner: 'En alianza con Microsoft',
            provider: 'Plataforma Capacitar · Ministerio de Economía de la Nación',
            topic: 'Ciberseguridad',
            category: 'ciberseguridad',
            level: 'Inicial / Intermedio',
            duration: 'Autogestionado (Asincrónico)',
            hours: 20,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Ruta de Aprendizaje Microsoft',
            tags: ['Microsoft', 'Sin costo', 'Certificado Oficial', 'Ciberseguridad'],
            featured: true,
            description: 'Certificado profesional avalado por Microsoft enfocado en conceptos fundamentales de ciberseguridad, gestión de identidades y accesos, protección de infraestructura de redes y defensa ante amenazas informáticas y ransomware.',
            syllabus: [
                'Fundamentos de seguridad de la información y vectores de ataque.',
                'Protección de datos y gestión segura de credenciales e identidades.',
                'Protocolos de seguridad en redes e internet.',
                'Buenas prácticas institucionales contra phishing e ingeniería social.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-microsoft',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-microsoft'
        },
        {
            id: 'capacitar-problemas-inicial-accenture',
            code: 'C48099',
            title: 'Análisis y resolución de problemas (Inicial)',
            partner: 'En alianza con Accenture',
            provider: 'Plataforma Capacitar · Ministerio de Economía de la Nación',
            topic: 'Gestión y Toma de Decisiones',
            category: 'gestion',
            level: 'Inicial',
            duration: '1 h',
            hours: 1,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Aplica a Programa Insertar',
            tags: ['Sin costo', 'Certificado Oficial', 'Resolución de Conflictos', 'Accenture'],
            featured: false,
            description: 'Ser eficaz y autónomo en el análisis y resolución de problemas es una competencia altamente demandada en la función policial y operativa. Comprendé cómo surgen los inconvenientes, por qué algunos son más complejos y de qué manera la investigación facilita la toma de decisiones acertadas.',
            syllabus: [
                'Identificación y encuadre operativo de un problema.',
                'Técnicas de diagnóstico rápido de situación bajo presión.',
                'Desglose metodológico de causas y factores intervinientes.',
                'Formulación y selección de alternativas viables de acción.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/formulario-de-registro-cursos-de-capacitar?id_curso=C48099',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-accenture#C48099'
        },
        {
            id: 'capacitar-pensamiento-critico-accenture',
            code: 'C48207',
            title: 'Habilidades para el pensamiento crítico',
            partner: 'En alianza con Accenture',
            provider: 'Plataforma Capacitar · Ministerio de Economía de la Nación',
            topic: 'Análisis de Información',
            category: 'gestion',
            level: 'Intermedio',
            duration: '1 h',
            hours: 1,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Aplica a Programa Insertar',
            tags: ['Sin costo', 'Certificado Oficial', 'Pensamiento Crítico', 'Accenture'],
            featured: false,
            description: 'Aprendé a diferenciar hipótesis de meras suposiciones, analizar fuentes testimoniales y documentales con rigor metodológico y estructurar razonamientos lógicos para la confección de informes, sumarios e investigaciones.',
            syllabus: [
                'Diferenciación entre hipótesis, hechos y suposiciones.',
                'Evaluación de sesgos cognitivos en el análisis de información.',
                'Construcción de argumentos basados en evidencia comprobable.',
                'Aplicación práctica en redacción y toma de decisiones.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/formulario-de-registro-cursos-de-capacitar?id_curso=C48207',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-accenture#C48207'
        },
        {
            id: 'capacitar-cloud-aws',
            code: 'AWS-CLOUD',
            title: 'Fundamentos de Cloud y Seguridad en la Nube',
            partner: 'En alianza con Amazon Web Services (AWS)',
            provider: 'Plataforma Capacitar · Ministerio de Economía de la Nación',
            topic: 'Tecnología y Cloud',
            category: 'tecnologia',
            level: 'Inicial',
            duration: 'Autogestionado (Asincrónico)',
            hours: 15,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Ruta de Aprendizaje AWS',
            tags: ['AWS', 'Sin costo', 'Certificado Oficial', 'Cloud y Servidores'],
            featured: false,
            description: 'Capacitación oficial provista por Amazon Web Services en alianza con Capacitar. Aprendé los fundamentos de servidores en la nube, alta disponibilidad de servicios y resguardo centralizado de datos e información.',
            syllabus: [
                'Arquitectura de computación y servidores en la nube.',
                'Modelo de responsabilidad compartida y seguridad de datos.',
                'Almacenamiento seguro, copias de respaldo y redundancia.',
                'Casos de uso e infraestructura para organizaciones modernas.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-aws',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-aws'
        },
        {
            id: 'capacitar-datos-oracle',
            code: 'ORA-DATA',
            title: 'Fundamentos de Infraestructura y Datos',
            partner: 'En alianza con Oracle',
            provider: 'Plataforma Capacitar · Ministerio de Economía de la Nación',
            topic: 'Tecnología y Bases de Datos',
            category: 'tecnologia',
            level: 'Inicial',
            duration: 'Autogestionado (Asincrónico)',
            hours: 15,
            cost: 'Curso y certificado oficial sin costo ($0)',
            modality: '100% Virtual y Asincrónica',
            programTag: 'Oracle University / Capacitar',
            tags: ['Oracle', 'Sin costo', 'Certificado Oficial', 'Gestión de Datos'],
            featured: false,
            description: 'Formación introductoria sobre infraestructura de datos de Oracle: resguardo perimetral de bases de datos, administración de registros y mejores prácticas de integridad para el manejo de información confidencial.',
            syllabus: [
                'Conceptos clave de bases de datos relacionales y cloud.',
                'Seguridad, roles de usuario y control de acceso a registros.',
                'Mecanismos de respaldo y recuperación ante desastres.',
                'Certificación oficial emitida por Oracle University.'
            ],
            registrationUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-oracle',
            catalogueUrl: 'https://www.argentina.gob.ar/economia/capacitar/cursos-en-alianza-con-oracle'
        }
    ];

    /**
     * Resuelve el enlace de inscripción oficial ÚNICAMENTE si el usuario cuenta con habilitación.
     */
    window._resolveCourseOfficialLink = function(courseId) {
        var isProFn = null;
        if (typeof window !== 'undefined' && typeof window._hasCursosAccess === 'function') {
            isProFn = window._hasCursosAccess;
        } else if (typeof window !== 'undefined' && typeof window._isIsepPro === 'function') {
            isProFn = window._isIsepPro;
        }

        if (isProFn && !isProFn()) {
            return null;
        }
        var course = window.academyCourses.find(function(c) { return c.id === courseId; });
        return course ? (course.registrationUrl || course.catalogueUrl) : null;
    };

})();
