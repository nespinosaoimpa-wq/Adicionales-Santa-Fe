/**
 * Adicionales Santa Fe - Campus de Ascenso Policial (Materiales ISEP 2026 Oficiales)
 */

window.academyData = {
    manualSource: "3- Oficial de Policía - Escalafón General (ISEP 2026 - 344 Págs)",
    hierarchies: [
        {
            id: "oficial-subinspector",
            title: "Oficial de Policía ➔ Subinspector",
            subtitle: "Manual Oficial ISEP 2026 (344 Páginas - Agrupamiento Ejecución)",
            icon: "military_tech",
            badge: "ISEP 2026 Oficial",
            color: "from-blue-600 to-indigo-700",
            summaries: [
                {
                    id: "sum-of1-1",
                    title: "Unidad 1: Liderazgo Policial y Filosofía de Mando (Pág. 14 ISEP)",
                    readTime: "12 min",
                    content: `
                        <h3>1. El Liderazgo como Desarrollo Continuo</h3>
                        <p>El liderazgo policial no es un destino sino un camino de formación continua. Se define como <em>"la acción de influir audazmente para el logro de un objetivo común"</em> (Manual ISEP 2026, Pág. 14).</p>
                        
                        <h3>2. Las Cuatro Virtudes Fundamentales de la Autoridad Real</h3>
                        <p>La autoridad reglamentaria (formal) es insuficiente. La verdadera autoridad se construye mediante cuatro virtudes cardinales:</p>
                        <ul>
                            <li><strong>Prudencia:</strong> Discernimiento en la toma de decisiones bajo presión.</li>
                            <li><strong>Justicia:</strong> Equidad en el trato al personal y a la ciudadanía.</li>
                            <li><strong>Fortaleza:</strong> Firmeza ante la adversidad operativa.</li>
                            <li><strong>Templanza:</strong> Autocontrol y templanza emocional en el ejercicio del mando.</li>
                        </ul>

                        <h3>3. Las Tres "C" de la Conducción Policial</h3>
                        <ul>
                            <li><strong>Competencia:</strong> Sobre los recursos materiales y conocimientos normativos.</li>
                            <li><strong>Confianza:</strong> En el personal subalterno y mandos superiores.</li>
                            <li><strong>Compromiso:</strong> Con la misión institucional logrando la adhesión voluntaria.</li>
                        </ul>
                    `
                },
                {
                    id: "sum-of1-2",
                    title: "Unidad 2: Gestión de Armas de Fuego y Evidencia (Pág. 69 ISEP)",
                    readTime: "15 min",
                    content: `
                        <h3>1. Protocolo Obligatorio de Secuestro de Armas de Fuego</h3>
                        <p>Según el Manual de Procedimientos ISEP 2026 (Pág. 69), ante el secuestro de un arma en la vía pública:</p>
                        <ul>
                            <li><strong>Inspección y Descarga:</strong> Verificar de inmediato que no se encuentre cargada. En caso de descargarse en el lugar, <strong>debe realizarse obligatoriamente en presencia de testigos o filmando todo el procedimiento</strong>.</li>
                            <li><strong>Fotografía de Cartuchería:</strong> Los cartuchos alojados en recámara o tambor deben fotografiarse e individualizarse antes de ser embalados.</li>
                            <li><strong>Manipulación Segura:</strong> Levantar la evidencia siempre con guantes de nitrilo o látex, evitando alterar huellas dactilares en el disparador o corredera.</li>
                            <li><strong>Ubicación Espacial:</strong> Documentar coordenadas geográficas (GPS), croquis y plano del lugar exacto del hallazgo.</li>
                        </ul>

                        <h3>2. Recepción de Muestras Biológicas desde Efectores Públicos de Salud</h3>
                        <p>Las muestras remitidas por hospitales o centros de salud deben contar con el Formulario Oficial de Cadena de Custodia firmado por el médico interviniente y el preventor policial.</p>
                    `
                },
                {
                    id: "sum-of1-3",
                    title: "Unidad 3: Régimen Disciplinario Policial y Decreto 461/15 (Pág. 99 ISEP)",
                    readTime: "15 min",
                    content: `
                        <h3>1. Clasificación de Faltas Administrativas</h3>
                        <p>El régimen disciplinario sanciona el incumplimiento de los deberes del estado policial:</p>
                        <ul>
                            <li><strong>Faltas Leves:</strong> Sancionables con Apercibimiento o Arresto de hasta 10 días.</li>
                            <li><strong>Faltas Graves:</strong> Arresto de 11 a 30 días, Suspensión de empleo.</li>
                            <li><strong>Faltas Gravísimas:</strong> Destitución mediante <strong>Cesantía</strong> (separación con conservación de aportes) o <strong>Exoneración</strong> (separación definitiva con pérdida total de derechos previsionales policiales).</li>
                        </ul>

                        <h3>2. Aplicación del Decreto N° 461/15</h3>
                        <p>Reglamenta los sumarios administrativos relámpago y preventivos ante la imputación de delitos dolosos o faltas gravísimas en servicio.</p>
                    `
                }
            ],
            flashcards: [
                { id: "fc-1", front: "¿Cuáles son las 4 virtudes en las que se sustenta la Autoridad Real según el ISEP?", back: "Prudencia, Justicia, Fortaleza y Templanza (Manual ISEP Pág. 15).", category: "Liderazgo" },
                { id: "fc-2", front: "¿Qué requisito es OBLIGATORIO al descargar un arma de fuego secuestrada en el lugar del hecho?", back: "Presencia de testigos presenciales o filmación completa del procedimiento de descarga (ISEP Pág. 69).", category: "Procedimientos" },
                { id: "fc-3", front: "¿Cuáles son las 3 'C' del paradigma de conducción policial?", back: "Competencia, Confianza y Compromiso (ISEP Pág. 15).", category: "Liderazgo" },
                { id: "fc-4", front: "¿Qué diferencia existe entre Cesantía y Exoneración en la Ley 12.521?", back: "La Cesantía permite conservar el cómputo de aportes previsionales; la Exoneración provoca la pérdida total de derechos previsionales de la fuerza.", category: "Disciplinario" }
            ],
            exams: [
                {
                    id: "q-1",
                    question: "Según el Manual ISEP 2026 (Pág. 69), si un arma de fuego secuestrada en la vía pública se encuentra cargada, ¿cómo debe realizarse su descarga?",
                    options: [
                        "Descargarla rápidamente en el móvil sin presencia de terceros.",
                        "En presencia obligatoria de testigos o filmando todo el procedimiento de descarga.",
                        "Llevarla cargada a la Comisaría e informar al armeró al día siguiente.",
                        "Disparar al aire para vaciar la recámara."
                    ],
                    correctIndex: 1,
                    explanation: "El protocolo ISEP exige que la descarga de un arma secuestrada en el lugar del hecho se efectúe ante testigos o mediante registro de filmación continuo."
                },
                {
                    id: "q-2",
                    question: "¿Cómo define el Manual de Estudio del ISEP a las tres 'C' del liderazgo policial?",
                    options: [
                        "Comisaría, Comando y Cuadrante.",
                        "Competencia sobre recursos, Confianza en subordinados y Compromiso con la misión.",
                        "Control, Custodia y Código Penal.",
                        "Capacitación, Cumplimiento y Coordinación."
                    ],
                    correctIndex: 1,
                    explanation: "El Manual ISEP (Pág. 15) establece las 3 'C' como pilares del líder: Competencia, Confianza y Compromiso voluntario."
                },
                {
                    id: "q-3",
                    question: "En el Régimen Disciplinario Policial de Santa Fe (Decreto 461/15), ¿cuál es el alcance de la sanción de Exoneración?",
                    options: [
                        "Suspensión del haber por 30 días.",
                        "Separación definitiva de la institución con pérdida total de los derechos del estado policial y previsionales.",
                        "Apercibimiento en la foja de servicio sin afectar el retiro.",
                        "Traslado obligatorio a otra Unidad Regional."
                    ],
                    correctIndex: 1,
                    explanation: "La Exoneración es la sanción gravísima máxima de destitución y acarrea la pérdida completa de beneficios de la fuerza."
                }
            ],
            mindmaps: [
                {
                    title: "Protocolo ISEP: Secuestro de Armas de Fuego en Vía Pública",
                    mermaid: `
graph TD
    A[Hallazgo de Arma de Fuego] --> B[Inspección de Seguridad con Guantes de Nitrilo]
    B --> C{¿Arma Cargada?}
    C -- Sí --> D[Descarga Obligatoria ante Testigos o Filmación]
    C -- No --> E[Fijación Fotográfica + Croquis GPS]
    D --> E
    E --> F[Rotulado de Cadena de Custodia y Notificación al MPA]
                    `
                }
            ]
        },
        {
            id: "subinspector-inspector",
            title: "Subinspector ➔ Inspector",
            subtitle: "Concurso ISEP 2026 - Mandos Medios Operativos",
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
                            <li>Cordón de seguridad primario y secundario.</li>
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
            subtitle: "Concurso ISEP 2026 - Jefatura de Dependencia y Gestión de Recursos",
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
            subtitle: "Concurso ISEP 2026 - Planeamiento Estratégico y Operativo",
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
            subtitle: "Concurso ISEP 2026 - Alta Dirección Institucional y Seguridad Pública",
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
