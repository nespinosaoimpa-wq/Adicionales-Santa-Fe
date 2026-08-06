/**
 * Adicionales Santa Fe - Campus de Ascenso Policial (Materiales ISEP)
 */

window.academyData = {
    hierarchies: [
        {
            id: "oficial-subinspector",
            title: "Oficial de Policía ➔ Subinspector",
            subtitle: "Concurso de Ascenso ISEP - Nivel Inicial a Medio",
            icon: "military_tech",
            badge: "ISEP Concurso 1",
            color: "from-blue-600 to-indigo-700",
            summaries: [
                {
                    id: "sum-of1-1",
                    title: "Unidad 1: Ley N° 12.521 del Personal Policial",
                    readTime: "10 min",
                    content: `
                        <h3>1. Estado Policial y Deberes Fundamentales</h3>
                        <p>El Estado Policial es la situación jurídica resultante del conjunto de deberes, obligaciones y derechos que establecen las leyes y reglamentos para el personal de la Policía de Santa Fe.</p>
                        <ul>
                            <li><strong>Art. 10:</strong> Defiende la subordinación a la Constitución Nacional y Provincial.</li>
                            <li><strong>Art. 15:</strong> Prohibición de ejercer actividades incompatibles con la función pública o portación de armas sin autorización legal.</li>
                            <li><strong>Art. 22:</strong> Obligatoriedad de intervenir en cualquier lugar y momento ante la comisión de un delito flagrante.</li>
                        </ul>

                        <h3>2. Régimen Disciplinario y Licencias</h3>
                        <p>El personal policial está sujeto a sanciones disciplinarias según la gravedad de la falta:</p>
                        <ul>
                            <li><strong>Faltas Leves:</strong> Apercibimiento y Arresto hasta 10 días.</li>
                            <li><strong>Faltas Graves:</strong> Arresto hasta 30 días, Suspensión de empleo.</li>
                            <li><strong>Faltas Gravísimas:</strong> Destitución (Cesantía o Exoneración).</li>
                        </ul>
                    `
                },
                {
                    id: "sum-of1-2",
                    title: "Unidad 2: Código Procesal Penal de Santa Fe (Ley 12.734)",
                    readTime: "15 min",
                    content: `
                        <h3>1. Aprehensión e Intervención Policial</h3>
                        <p>Los oficiales de policía tienen la facultad de aprehender a una persona sin orden judicial previa únicamente en los siguientes casos de flagrancia:</p>
                        <ul>
                            <li>Cuando intentare cometer un delito, al momento de cometerlo o inmediatamente después.</li>
                            <li>Cuando se fugare estando legalmente detenido.</li>
                            <li>Cuando portare armas o elementos que hagan presumir su participación en un hecho punible reciente.</li>
                        </ul>

                        <h3>2. Plazos Procesales y Comunicación al Fiscal</h3>
                        <p>La aprehensión debe comunicarse <strong>de inmediato</strong> (sin dilaciones) al Fiscal de turno del MPA (Ministerio Público de la Acusación). El acta de procedimiento debe confeccionarse con precisión de hora, lugar, testigos y fijación fotográfica de secuestros.</p>
                    `
                }
            ],
            flashcards: [
                { id: "fc-1", front: "¿Cuál es el plazo máximo para notificar la aprehensión al Fiscal del MPA?", back: "De inmediato (sin dilaciones indeseadas).", category: "Procesal Penal" },
                { id: "fc-2", front: "¿Qué artículo de la Ley 12.521 establece la obligación de intervenir ante delito flagrante?", back: "El Artículo 22 de la Ley 12.521.", category: "Ley Policial" },
                { id: "fc-3", front: "¿Cuáles son los tipos de destitución en la Policía de Santa Fe?", back: "Cesantía (con opción a cómputo previsional) y Exoneración (pérdida total de derechos).", category: "Régimen Disciplinario" },
                { id: "fc-4", front: "¿Qué se requiere para realizar una requisa personal sin orden judicial?", back: "Fundadas sospechas de que oculta cosas relacionadas a un delito y causa de urgencia (Art. 210 CPP).", category: "Procedimientos" }
            ],
            exams: [
                {
                    id: "q-1",
                    question: "¿En cuál de los siguientes supuestos la Policía puede proceder a la aprehensión de una persona sin orden judicial?",
                    options: [
                        "Únicamente con autorización por escrito del Jefe de Comisaría.",
                        "En caso de delito de acción privada previa denuncia.",
                        "En flagrante delito o cuando la persona se fugare estando detenida.",
                        "Cuando la persona tenga antecedentes penales anteriores."
                    ],
                    correctIndex: 2,
                    explanation: "Según el CPP de Santa Fe, la aprehensión sin orden judicial procede ante delito flagrante o fuga de detención legal."
                },
                {
                    id: "q-2",
                    question: "¿Cuál es la sanción disciplinaria máxima prevista en la Ley 12.521?",
                    options: [
                        "Arresto por 60 días en la Unidad Regional.",
                        "Exoneración.",
                        "Suspensión preventiva por 6 meses.",
                        "Apercibimiento por escrito."
                    ],
                    correctIndex: 1,
                    explanation: "La Exoneración es la sanción de destitución más grave e implica la separación definitiva de la fuerza y pérdida de derechos del estado policial."
                },
                {
                    id: "q-3",
                    question: "Ante la incautación de elementos en un procedimiento policial, ¿cuál es el protocolo obligatorio?",
                    options: [
                        "Entregar los elementos inmediatamente a los damnificados en el lugar.",
                        "Confeccionar Acta de Secuestro, Cadena de Custodia y notificar al Fiscal.",
                        "Guardar los elementos en el móvil hasta el cambio de guardia.",
                        "Fotografiar los elementos sin confeccionar acta."
                    ],
                    correctIndex: 1,
                    explanation: "Todo elemento incautado debe contar con Acta de Secuestro formal, rótulo de Cadena de Custodia y comunicación inmediata al Fiscal."
                }
            ],
            mindmaps: [
                {
                    title: "Procedimiento de Aprehensión en Flagrancia",
                    mermaid: `
graph TD
    A[Ocurrencia del Hecho Flagrante] --> B[Aprehensión e Inmovilización del Imputado]
    B --> C[Lectura de Derechos de Imputado]
    C --> D[Secuestro de Elementos y Fijación]
    D --> E[Comunicación Inmediata al Fiscal del MPA]
    E --> F[Traslado a Sede Policial y Confección de Sumario]
                    `
                }
            ]
        },
        {
            id: "subinspector-inspector",
            title: "Subinspector ➔ Inspector",
            subtitle: "Concurso de Ascenso ISEP - Mandos Medios Operativos",
            icon: "shield_person",
            badge: "ISEP Concurso 2",
            color: "from-emerald-600 to-teal-700",
            summaries: [
                {
                    id: "sum-ins-1",
                    title: "Unidad 1: Conducción Operativa y Preservación de Escena",
                    readTime: "12 min",
                    content: `
                        <h3>1. Rol del Subinspector al Mando de Unidad Operativa</h3>
                        <p>El Subinspector ejerce la supervisión de los procedimientos en la vía pública, coordinando los móviles patrulleros y velando por la integridad del personal dependiente.</p>
                        <h3>2. Preservación del Lugar del Hecho (Manual de Criminalística ISEP)</h3>
                        <ul>
                            <li>Cordon de seguridad primario y secundario.</li>
                            <li>Prohibición absoluta de ingresar sin equipamiento de protección al perímetro interno.</li>
                            <li>Planilla de registro de ingreso y egreso de personal asistencial o judicial.</li>
                        </ul>
                    `
                }
            ],
            flashcards: [
                { id: "fc-ins-1", front: "¿Quién es el responsable primario de establecer el cordón de preservación?", back: "El primer preventor a cargo del móvil o la dotación policial que llega al lugar del hecho.", category: "Criminalística" },
                { id: "fc-ins-2", front: "¿Qué se debe registrar en la planilla de ingreso al lugar del hecho?", back: "Nombre, DNI, función, hora de ingreso y hora de egreso de toda persona autorizada.", category: "Preservación" }
            ],
            exams: [
                {
                    id: "q-ins-1",
                    question: "¿Cuál es la primera medida preventiva obligatoria al arribar a una escena de hecho de sangre?",
                    options: [
                        "Recolectar los casquillos y embalarlos.",
                        "Preservar el perímetro mediante encintado y restringir el acceso.",
                        "Entrevistar a los vecinos antes de comunicar al Fiscal.",
                        "Mover el cuerpo a un lugar resguardado."
                    ],
                    correctIndex: 1,
                    explanation: "La preservación del perímetro y la intangibilidad del lugar del hecho es la primera prioridad criminalística."
                }
            ],
            mindmaps: [
                {
                    title: "Cadena de Custodia de Evidencia",
                    mermaid: `
graph TD
    A[Hallazgo de Evidencia] --> B[Fijación Fotográfica y Planimétrica]
    B --> C[Embalaje Hermético y Rotulado]
    C --> D[Firma de Formulario de Cadena de Custodia]
    D --> E[Traspaso a Peritos Periciales]
                    `
                }
            ]
        },
        {
            id: "inspector-subcomisario",
            title: "Inspector ➔ Subcomisario",
            subtitle: "Concurso ISEP - Jefatura de Dependencia y Gestión de Recursos",
            icon: "admin_panel_settings",
            badge: "ISEP Concurso 3",
            color: "from-amber-600 to-orange-700",
            summaries: [
                {
                    id: "sum-subcom-1",
                    title: "Unidad 1: Gestión de Recursos Humanos y Logística Comisaría",
                    readTime: "15 min",
                    content: `
                        <h3>1. Administración de Personal y Libro de Guardia</h3>
                        <p>El Subcomisario responde por la correcta confección de los libros obligatorios de la dependencia policial (Libro de Guardia, Libro de Detenidos, Registro de Armamento y Libro de Quejas).</p>
                    `
                }
            ],
            flashcards: [
                { id: "fc-sub-1", front: "¿Qué plazo máximo tiene la dependencia para elevar las actuaciones con detenido al MPA?", back: "Dentro de las 24 horas salvo prórroga dispuesta por el Fiscal.", category: "Gestión Policial" }
            ],
            exams: [
                {
                    id: "q-sub-1",
                    question: "¿Quién verifica la custodia e inventario del libro de detenidos en una Comisaría?",
                    options: [
                        "El Oficial Sumariante únicamente.",
                        "El Jefe o Subjefe de la Dependencia Policial.",
                        "El Jefe de la Guardia Urbana.",
                        "El personal administrativo sumariante."
                    ],
                    correctIndex: 1,
                    explanation: "La responsabilidad administrativa e institucional de los registros de detenidos recae sobre la Jefatura de Dependencia."
                }
            ],
            mindmaps: [
                {
                    title: "Circuito Logístico y Sumarial",
                    mermaid: `
graph TD
    A[Ingreso de Denuncia / Actuación] --> B[Registro en Libro de Guardia]
    B --> C[Asignación de Sumariante]
    C --> D[Elevación Digital / Física al MPA]
                    `
                }
            ]
        },
        {
            id: "subcomisario-comisario",
            title: "Subcomisario ➔ Comisario",
            subtitle: "Concurso ISEP - Planeamiento Estratégico y Operativo",
            icon: "stars",
            badge: "ISEP Concurso 4",
            color: "from-purple-600 to-indigo-800",
            summaries: [
                {
                    id: "sum-com-1",
                    title: "Unidad 1: Análisis del Delito y Mapas de Calor",
                    readTime: "15 min",
                    content: `
                        <h3>1. Diseño de Cuadrantes y Mapeo del Delito</h3>
                        <p>El Comisario planifica los servicios ordinarios y extraordinarios basándose en datos estadísticos de denuncias, llamadas al 911 y mapas georreferenciados.</p>
                    `
                }
            ],
            flashcards: [
                { id: "fc-com-1", front: "¿Qué es el mapa de calor operativo?", back: "Representación gráfica de densidad de hechos delictivos para asignación eficiente de patrullaje.", category: "Planificación" }
            ],
            exams: [
                {
                    id: "q-com-1",
                    question: "¿Cuál es el objetivo principal del análisis de inteligencia criminal operativa?",
                    options: [
                        "Reducir el consumo de combustible únicamente.",
                        "Identificar patrones delictivos para desplegar patrullaje preventivo orientado.",
                        "Aumentar el número de actas de infracción de tránsito.",
                        "Reemplazar el sistema de denuncias presenciales."
                    ],
                    correctIndex: 1,
                    explanation: "El análisis operativo permite anticipar modalidades delictivas y concentrar recursos en zonas críticas."
                }
            ],
            mindmaps: [
                {
                    title: "Planificación Operativa de Seguridad",
                    mermaid: `
graph TD
    A[Estadística 911 + Denuncias] --> B[Georreferenciación de Puntos Calientes]
    B --> C[Diseño de Cuadrantes y Patrullaje]
    C --> D[Evaluación Semanal de Resultados]
                    `
                }
            ]
        },
        {
            id: "comisario-supervisor",
            title: "Comisario ➔ Comisario Supervisor",
            subtitle: "Concurso ISEP - Alta Dirección Institucional y Seguridad Pública",
            icon: "workspace_premium",
            badge: "ISEP Concurso 5 Superior",
            color: "from-amber-500 via-purple-700 to-slate-900",
            summaries: [
                {
                    id: "sum-sup-1",
                    title: "Unidad 1: Políticas Públicas de Seguridad y Control Institucional",
                    readTime: "20 min",
                    content: `
                        <h3>1. Dirección Superior e Intervención de Unidades Regionales</h3>
                        <p>El Comisario Supervisor integra la plana mayor institucional, interviniendo en la auditoría de procedimientos, gestión presupuestaria y relación con los poderes del Estado.</p>
                    `
                }
            ],
            flashcards: [
                { id: "fc-sup-1", front: "¿Qué órgano efectúa la auditoría externa de la conducta policial en Santa Fe?", back: "La Dirección Provincial de Asuntos Internos / Control Institucional del Ministerio de Justicia y Seguridad.", category: "Gestión Superior" }
            ],
            exams: [
                {
                    id: "q-sup-1",
                    question: "¿Cuál es el rol estratégico del Comisario Supervisor en el mando institucional?",
                    options: [
                        "Patrullaje pedestre en comisaría de distrito.",
                        "Dirección estratégica, evaluación presupuestaria y articulación ministerial.",
                        "Confección de sumarios por faltas leves exclusivamente.",
                        "Recepción de llamados telefónicos en la central."
                    ],
                    correctIndex: 1,
                    explanation: "La jerarquía superior implica la máxima conducción operacional, diseño de políticas públicas de seguridad y articulación con los poderes constitucionales."
                }
            ],
            mindmaps: [
                {
                    title: "Estructura de Gobierno Institucional",
                    mermaid: `
graph TD
    A[Ministerio de Justicia y Seguridad] --> B[Jefatura de Policía de Provincia]
    B --> C[Plana Mayor / Comisarios Supervisores]
    C --> D[Unidades Regionales I a XIX]
                    `
                }
            ]
        }
    ]
};
