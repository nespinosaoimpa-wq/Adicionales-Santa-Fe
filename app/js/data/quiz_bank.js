/**
 * Adicionales Santa Fe - Banco de Preguntas ISEP 2026
 * Simulador de Examen de Ascenso Policial
 * 
 * Cada pregunta cita su fuente exacta (Manual ISEP, Ley, Decreto, Artículo)
 * para que el efectivo pueda ir al material de estudio y profundizar.
 * 
 * Jerarquías cubiertas:
 * - oficial-subinspector: Oficial de Policía → Subinspector
 * - subinspector-inspector: Subinspector → Inspector
 * - inspector-subcomisario: Inspector → Subcomisario
 * - subcomisario-comisario: Subcomisario → Comisario
 * - comisario-supervisor: Comisario → Comisario Supervisor / Director
 */

window.quizBank = {

    // ═══════════════════════════════════════════════════════════════
    // OFICIAL DE POLICÍA → SUBINSPECTOR (Agrupamiento Ejecución)
    // ═══════════════════════════════════════════════════════════════
    "oficial-subinspector": [
        // --- LIDERAZGO Y CONDUCCIÓN (Materia 1) ---
        {
            id: "os-001",
            question: "Según el Manual ISEP 2026, ¿cuáles son las cuatro virtudes cardinales que sustentan la 'autoridad real' del líder policial?",
            options: [
                "Obediencia, Disciplina, Valentía y Lealtad",
                "Prudencia, Justicia, Fortaleza y Templanza",
                "Respeto, Orden, Comando y Firmeza",
                "Eficiencia, Rapidez, Control y Mando"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Pág. 15 - Materia 1: Liderazgo Policial",
            explanation: "El ISEP establece que la autoridad legítima (real) se construye sobre Prudencia, Justicia, Fortaleza y Templanza, no sobre el mero cargo jerárquico."
        },
        {
            id: "os-002",
            question: "¿Cómo define el ISEP a las tres 'C' del paradigma de conducción policial?",
            options: [
                "Comisaría, Comando y Cuadrante",
                "Control, Custodia y Código Penal",
                "Competencia, Confianza y Compromiso",
                "Capacitación, Cumplimiento y Coordinación"
            ],
            correctIndex: 2,
            source: "Manual ISEP 2026, Pág. 15 - Materia 1: Paradigma de Conducción",
            explanation: "Las 3 'C' son: Competencia sobre los recursos asignados, Confianza recíproca con subordinados y Compromiso con la misión del servicio policial."
        },
        {
            id: "os-003",
            question: "¿Qué resolución de la ONU establece el Código de Conducta para funcionarios encargados de hacer cumplir la ley?",
            options: [
                "Resolución 1325 de la ONU",
                "Resolución 34/169 de la Asamblea General de la ONU",
                "Declaración Universal de los Derechos Humanos, Art. 1",
                "Pacto de San José de Costa Rica, Art. 5"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Pág. 30 - Materia 1: Código de Conducta ONU",
            explanation: "La Resolución 34/169 establece las normas de conducta que todo funcionario policial debe respetar, incluyendo el respeto a la dignidad humana y la prohibición de torturas."
        },
        {
            id: "os-004",
            question: "Según el ISEP, ¿qué tipo de liderazgo busca generar 'adhesión voluntaria' en lugar del 'mero acatamiento por temor'?",
            options: [
                "Liderazgo coercitivo",
                "Liderazgo moderno o transformacional",
                "Liderazgo burocrático",
                "Liderazgo autocrático"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Pág. 14 - Materia 1: Liderazgo como Proceso",
            explanation: "El ISEP define que el liderazgo policial moderno promueve la adhesión voluntaria del personal, no el simple cumplimiento por temor a la sanción disciplinaria."
        },

        // --- RÉGIMEN DISCIPLINARIO (Materia 2) ---
        {
            id: "os-005",
            question: "Según la Ley 12.521 y el Decreto 461/15, ¿cuál es la sanción máxima para una falta leve?",
            options: [
                "Suspensión de 30 días sin goce de haberes",
                "Apercibimiento o arresto de hasta 10 días",
                "Cesantía automática",
                "Traslado obligatorio a otra Unidad Regional"
            ],
            correctIndex: 1,
            source: "Ley 12.521 y Decreto 461/15 - Régimen Disciplinario",
            explanation: "Las faltas leves se sancionan con apercibimiento o arresto de hasta 10 días. Ejemplos: desaliño en uniforme, tardanzas o descuidos menores."
        },
        {
            id: "os-006",
            question: "¿Cuál es la diferencia principal entre Cesantía y Exoneración en el régimen disciplinario policial?",
            options: [
                "No hay diferencia, ambas son lo mismo",
                "La Cesantía conserva los aportes previsionales; la Exoneración los pierde totalmente",
                "La Cesantía es temporal y la Exoneración es por 5 años",
                "La Exoneración conserva los aportes y la Cesantía no"
            ],
            correctIndex: 1,
            source: "Ley 12.521 - Estatuto del Personal Policial, Sección Régimen Disciplinario",
            explanation: "En la Cesantía se conserva el cómputo de aportes previsionales acumulados. En la Exoneración se pierden la totalidad de los derechos previsionales de la fuerza."
        },
        {
            id: "os-007",
            question: "¿Qué rango de sanción corresponde a una falta grave según el Decreto 461/15?",
            options: [
                "Apercibimiento únicamente",
                "Arresto de 11 a 30 días o suspensión de empleo y haberes",
                "Hasta 5 días de arresto",
                "Solo traslado de dependencia"
            ],
            correctIndex: 1,
            source: "Decreto 461/15, Art. correspondiente - Faltas Graves",
            explanation: "Las faltas graves merecen arresto de 11 a 30 días o suspensión temporal. Ejemplos: negligencia en custodia de elementos, malos tratos al personal subalterno."
        },
        {
            id: "os-008",
            question: "¿Cuáles son los deberes esenciales del personal policial según la Ley 12.521?",
            options: [
                "Asistir a reuniones sociales y eventos comunitarios voluntariamente",
                "Obediencia jerárquica, portación de arma reglamentaria y neutralidad política",
                "Realizar tareas administrativas exclusivamente en horario de oficina",
                "Atender denuncias solo en la comisaría asignada"
            ],
            correctIndex: 1,
            source: "Ley 12.521, Deberes del Personal Policial",
            explanation: "Los tres deberes esenciales son: cumplir órdenes de superiores (siempre que no impliquen delito), portar el arma reglamentaria y abstenerse de actividades políticas en servicio."
        },
        {
            id: "os-009",
            question: "¿Qué instrumento normativo regula el procedimiento de sumarios administrativos en la Policía de Santa Fe?",
            options: [
                "La Constitución Nacional exclusivamente",
                "El Decreto N° 461/15 (Régimen Disciplinario)",
                "El Código Procesal Penal de Santa Fe",
                "La Ley Nacional de Seguridad Interior"
            ],
            correctIndex: 1,
            source: "Decreto 461/15 - Sumarios Administrativos",
            explanation: "El Decreto 461/15 establece el procedimiento legal y transparente para investigar faltas graves y gravísimas, garantizando el derecho a defensa del personal."
        },
        {
            id: "os-010",
            question: "¿Puede un policía de Santa Fe negarse a cumplir una orden de su superior?",
            options: [
                "Nunca, la obediencia es absoluta e incondicional",
                "Sí, cuando la orden implique la comisión de un delito manifiesto",
                "Sí, siempre que el policía tenga más antigüedad",
                "Solo si tiene autorización escrita del Jefe de Policía"
            ],
            correctIndex: 1,
            source: "Ley 12.521 - Deberes del Personal: Obediencia Jerárquica",
            explanation: "La obediencia jerárquica es un deber fundamental, pero tiene un límite claro: no se deben cumplir órdenes que impliquen la comisión de un delito manifiesto."
        },

        // --- PROCEDIMIENTOS OPERATIVOS (Materia 3) ---
        {
            id: "os-011",
            question: "¿Qué artículos del Código Procesal Penal de Santa Fe regulan el Acta de Procedimiento Policial?",
            options: [
                "Artículos 1 y 2 del CPP",
                "Artículos 120, 121 y concordantes del CPP de Santa Fe",
                "Artículo 268 únicamente",
                "No está regulado en el CPP sino en el Código Civil"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Acta de Procedimiento Policial (CPP SF)",
            explanation: "El acta de procedimiento es un instrumento público fundamental sustentado en los Arts. 120 y 121 del CPP de Santa Fe, que da inicio a las actuaciones sumariales."
        },
        {
            id: "os-012",
            question: "¿Cuántos testigos independientes se requieren obligatoriamente en un acta de procedimiento policial?",
            options: [
                "Uno solo es suficiente",
                "Al menos dos testigos independientes",
                "No se requieren testigos si hay cámaras",
                "Tres o más testigos siempre"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Testigos de Actuación",
            explanation: "Se requieren al menos dos testigos independientes. Si no es posible por urgencia o peligro inminente, se debe fundamentar la razón en el cuerpo del acta."
        },
        {
            id: "os-013",
            question: "¿Cómo se denomina el sistema de preservación del lugar del hecho con dos áreas diferenciadas?",
            options: [
                "Sistema de zona única",
                "Sistema de Doble Perímetro (Cordón Doble)",
                "Método de barrera simple",
                "Protocolo de acceso libre controlado"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Preservación de la Escena del Hecho",
            explanation: "El sistema de Doble Perímetro incluye: Perímetro Interno (zona de exclusión para peritos) y Perímetro Externo (zona de seguridad para apoyo)."
        },
        {
            id: "os-014",
            question: "¿Quiénes pueden ingresar al Perímetro Interno (Zona de Exclusión) en la escena del hecho?",
            options: [
                "Cualquier personal policial uniformado",
                "Solo peritos forenses oficiales con equipo de protección",
                "Familiares de la víctima con autorización verbal",
                "Todos los patrulleros asignados al operativo"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Protocolo de Preservación de Escena",
            explanation: "Al perímetro interno solo ingresan peritos forenses con equipo de protección. Queda prohibido pisar, tocar, fumar o alterar la escena."
        },
        {
            id: "os-015",
            question: "¿Qué es obligatorio registrar en la Planilla de Registro de ingreso a la escena del hecho?",
            options: [
                "Solo el nombre del jefe del operativo",
                "Nombre, jerarquía, hora y motivo de ingreso de toda persona que entre a la escena",
                "Únicamente la hora de llegada de los bomberos",
                "El número de vehículos policiales presentes"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Planilla de Registro",
            explanation: "Es obligatorio registrar a toda persona que ingrese, detallando nombre, jerarquía, hora y motivo del ingreso. Esto incluye personal médico, policial y judicial."
        },
        {
            id: "os-016",
            question: "¿Qué garantiza la Cadena de Custodia de evidencias en un procedimiento policial?",
            options: [
                "Que las pruebas se guarden en la comisaría más cercana",
                "Que la prueba presentada en juicio sea la misma recolectada en el hecho",
                "Que el fiscal visite personalmente el lugar del hecho",
                "Que los testigos recuerden lo ocurrido durante el juicio"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Cadena de Custodia de Evidencias",
            explanation: "La cadena de custodia garantiza la integridad probatoria: cada indicio debe ser rotulado, embalado herméticamente y documentado desde el primer preventor hasta el perito."
        },

        // --- ARMAMENTO Y USO DE LA FUERZA (Materia 4) ---
        {
            id: "os-017",
            question: "Según el Manual MIRAF, ¿cuál es la primera regla de seguridad al manipular un arma de fuego?",
            options: [
                "Verificar que esté descargada antes de cada uso",
                "Tratar toda arma de fuego como si estuviese cargada",
                "Guardarla siempre en la funda con el seguro puesto",
                "Apuntar al suelo mientras se camina"
            ],
            correctIndex: 1,
            source: "Manual MIRAF - Medidas de Seguridad Fundamentales",
            explanation: "La regla cardinal del MIRAF es tratar toda arma como si estuviera cargada, sin excepción ni circunstancia atenuante."
        },
        {
            id: "os-018",
            question: "¿Dónde debe mantenerse el dedo índice según las normas del Manual MIRAF hasta el momento de disparar?",
            options: [
                "Sobre el gatillo preparado para disparar rápidamente",
                "Estirado e inmóvil fuera del arco guardamonte",
                "Apoyado sobre la corredera del arma",
                "Dentro del guardamonte pero sin presionar el gatillo"
            ],
            correctIndex: 1,
            source: "Manual MIRAF - Medidas de Seguridad Fundamentales",
            explanation: "El dedo debe estar fuera del arco guardamonte hasta el momento en que se decida efectivamente efectuar el disparo. Esto previene disparos accidentales."
        },
        {
            id: "os-019",
            question: "¿Cuál es el orden correcto de la Escala del Uso Progresivo y Gradual de la Fuerza?",
            options: [
                "Arma de fuego → Control físico → Presencia → Comunicación verbal",
                "Presencia policial → Comunicación verbal → Control físico → Armas menos letales → Fuerza letal",
                "Comunicación verbal → Presencia → Fuerza letal → Armas menos letales",
                "Armas menos letales → Presencia → Control físico → Comunicación verbal → Fuerza letal"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 4 - Uso Progresivo de la Fuerza",
            explanation: "La escala va de menor a mayor: 1) Presencia, 2) Comunicación verbal, 3) Control físico activo, 4) Armas menos letales, 5) Fuerza letal (último recurso)."
        },
        {
            id: "os-020",
            question: "¿En qué circunstancia se justifica el uso de arma de fuego (fuerza letal) según el protocolo ISEP?",
            options: [
                "Cuando el sospechoso no obedece la voz de alto",
                "Exclusivamente ante peligro inminente de vida para el oficial o para terceros civiles",
                "Cuando el sospechoso intenta huir a pie",
                "Siempre que haya un delito flagrante de cualquier tipo"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 4 - Fuerza Letal",
            explanation: "El uso del arma de fuego es el último recurso y solo se justifica ante peligro inminente de vida para el oficial o terceros civiles."
        },
        {
            id: "os-021",
            question: "¿Cómo debe realizarse la descarga de un arma secuestrada que se encuentra cargada?",
            options: [
                "En la comisaría, sin testigos, al día siguiente",
                "En presencia obligatoria de testigos o filmando todo el procedimiento de descarga",
                "Disparando los proyectiles al aire",
                "Guardándola cargada en una bolsa de evidencia"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Pág. 69 - Protocolo de Descarga Segura",
            explanation: "El arma se descarga apuntando a zona segura (tierra o cajón de arena), con guantes de nitrilo, ante testigos independientes o con filmación continua."
        },
        {
            id: "os-022",
            question: "¿Con qué tipo de guantes debe manipularse un arma de fuego secuestrada en la vía pública?",
            options: [
                "Guantes de cuero",
                "Guantes de látex o nitrilo",
                "Sin guantes, directamente con las manos",
                "Guantes de tela de algodón"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 4 - Protocolo de Descarga Segura",
            explanation: "Se utilizan guantes de látex o nitrilo para preservar indicios dactiloscópicos (huellas digitales) que pudieran encontrarse en el arma."
        },
        {
            id: "os-023",
            question: "Según la Ley 12.521, ¿la portación del arma reglamentaria es obligatoria estando franco de servicio?",
            options: [
                "No, solo es obligatoria en horario de servicio",
                "Sí, es un deber del estado policial y existe obligación de intervenir las 24 horas del día",
                "Solo si el policía vive en zona conflictiva",
                "Es optativa y depende del criterio del oficial"
            ],
            correctIndex: 1,
            source: "Ley 12.521 / Manual ISEP 2026, Materia 4 - Portación de Arma",
            explanation: "La Ley 12.521 establece que la portación del armamento provisto por el Estado es un deber permanente, con obligación de intervenir en defensa de la vida y bienes."
        },
        {
            id: "os-024",
            question: "¿Qué tres principios rigen el uso de la fuerza pública según el protocolo ISEP?",
            options: [
                "Rapidez, Contundencia y Efectividad",
                "Legalidad, Necesidad y Proporcionalidad",
                "Autoridad, Jerarquía y Mando",
                "Disciplina, Obediencia y Valor"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 4 - Principios del Uso de la Fuerza",
            explanation: "Todo uso de la fuerza debe cumplir tres principios: ser Legal (conforme a la ley), Necesario (no hay alternativa) y Proporcional (adecuado a la amenaza)."
        },

        // --- SEGURIDAD INTERIOR Y DDHH (Materia 5) ---
        {
            id: "os-025",
            question: "¿Qué ley establece las bases de cooperación entre fuerzas policiales provinciales y fuerzas federales en Argentina?",
            options: [
                "Ley 12.521 de Personal Policial",
                "Ley Nacional de Seguridad Interior N° 24.059",
                "Decreto 461/15 de Régimen Disciplinario",
                "Ley 14.283 de Reforma Previsional"
            ],
            correctIndex: 1,
            source: "Ley 24.059 / Manual ISEP 2026, Materia 5",
            explanation: "La Ley 24.059 establece la cooperación recíproca entre policías provinciales y fuerzas federales bajo la dirección del Ministerio de Seguridad de la Nación."
        },
        {
            id: "os-026",
            question: "¿Cuál es la diferencia fundamental entre Seguridad Interior y Defensa Nacional?",
            options: [
                "No hay diferencia, son lo mismo",
                "La seguridad interior protege contra delitos internos; la defensa nacional contra agresiones militares extranjeras",
                "La defensa nacional se ocupa de los delitos y la seguridad interior de la soberanía",
                "La seguridad interior solo opera en Capital Federal"
            ],
            correctIndex: 1,
            source: "Ley 24.059 / Manual ISEP 2026, Materia 5 - Seguridad Interior vs. Defensa",
            explanation: "Seguridad interior = paz social interna (fuerzas policiales). Defensa nacional = soberanía territorial ante agresiones militares (fuerzas armadas)."
        },
        {
            id: "os-027",
            question: "Al detener a una persona, ¿qué derechos debe comunicarle inmediatamente el policía actuante?",
            options: [
                "Solo el derecho a guardar silencio",
                "Designar defensor, comunicarse con allegados, abstenerse de declarar y ser examinado por médico",
                "Firmar el acta de procedimiento solamente",
                "No es obligatorio comunicarle nada hasta llegar a la comisaría"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 5 - Derechos del Detenido (Art. 268 CPP SF)",
            explanation: "Es obligatorio comunicar inmediatamente: derecho a designar abogado, comunicarse con familiares, abstenerse de declarar y ser examinado por facultativo médico."
        },
        {
            id: "os-028",
            question: "¿A quién debe comunicarse inmediatamente una detención policial?",
            options: [
                "Al Jefe de Policía directamente",
                "Al Fiscal de turno del MPA (Ministerio Público de la Acusación) y al Defensor Oficial",
                "Al gobernador de la provincia",
                "Solo a los familiares del detenido"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 5 - Comunicaciones Inmediatas",
            explanation: "Se debe informar inmediatamente al Fiscal del MPA y al Defensor Oficial para el control de legalidad de la aprehensión."
        },
        {
            id: "os-029",
            question: "¿Qué artículo de la Constitución Nacional incorpora los tratados internacionales de derechos humanos?",
            options: [
                "Artículo 14",
                "Artículo 75, inciso 22",
                "Artículo 1",
                "Artículo 100"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 5 - Garantías Constitucionales",
            explanation: "El Art. 75 inc. 22 de la Constitución Nacional otorga jerarquía constitucional a los tratados internacionales de derechos humanos."
        },
        {
            id: "os-030",
            question: "¿Qué nivel de la escala de fuerza corresponde al uso de tonfa, esposas o gas pimienta?",
            options: [
                "Nivel 2: Comunicación verbal",
                "Nivel 3: Control físico activo",
                "Nivel 4: Armas menos letales",
                "Nivel 5: Fuerza letal"
            ],
            correctIndex: 2,
            source: "Manual ISEP 2026, Materia 4 - Escala del Uso Progresivo de la Fuerza",
            explanation: "El nivel 4 (Armas menos letales) incluye tonfa, esposas, gas pimienta, cartuchería antitumulto y armas de dispersión."
        },

        // --- PREGUNTAS ADICIONALES MIXTAS ---
        {
            id: "os-031",
            question: "¿Qué tipo de falta constituye la pérdida por descuido del arma reglamentaria o la credencial policial?",
            options: [
                "Falta leve con apercibimiento",
                "Falta grave",
                "No constituye falta disciplinaria",
                "Falta administrativa sin sanción"
            ],
            correctIndex: 1,
            source: "Ley 12.521 / Decreto 461/15 - Clasificación de Faltas",
            explanation: "La pérdida por descuido del arma o credencial se considera falta grave, sancionable con arresto de 11 a 30 días o suspensión."
        },
        {
            id: "os-032",
            question: "¿Qué tipo de falta constituye el abandono de servicio por parte de un efectivo policial?",
            options: [
                "Falta leve",
                "Falta grave",
                "Falta gravísima que puede llevar a destitución",
                "No está contemplado en el régimen disciplinario"
            ],
            correctIndex: 2,
            source: "Ley 12.521 / Decreto 461/15 - Faltas Gravísimas",
            explanation: "El abandono de servicio es una falta gravísima que puede derivar en Cesantía o Exoneración (destitución)."
        },
        {
            id: "os-033",
            question: "En un acta de procedimiento policial, ¿pueden incluirse apreciaciones subjetivas del policía actuante?",
            options: [
                "Sí, para enriquecer el relato de los hechos",
                "No, la descripción debe ser cronológica, detallada y sin apreciaciones subjetivas",
                "Solo si el superior jerárquico lo autoriza",
                "Sí, siempre que sean razonables"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Requisitos de Validez del Acta",
            explanation: "El acta requiere una descripción cronológica y objetiva de los hechos, sin opiniones ni apreciaciones subjetivas del funcionario actuante."
        },
        {
            id: "os-034",
            question: "¿Qué datos obligatorios debe contener un acta de procedimiento policial para ser válida?",
            options: [
                "Solo el nombre del policía y la firma",
                "Lugar, fecha, hora de inicio y cierre, datos de preventores y descripción cronológica",
                "Únicamente la firma de los testigos",
                "El número de legajo del policía y la comisaría de referencia"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Requisitos de Validez del Acta",
            explanation: "Para que un acta sea válida debe contener: lugar, fecha, hora exacta de inicio y cierre, datos de preventores intervinientes y descripción cronológica detallada."
        },
        {
            id: "os-035",
            question: "¿Cómo debe embalarse cada indicio secuestrado según la cadena de custodia?",
            options: [
                "Todos juntos en una misma bolsa grande",
                "De forma individual y hermética, debidamente rotulado",
                "Envuelto en papel de diario sin rotular",
                "En la caja del patrullero sin embalaje especial"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Cadena de Custodia",
            explanation: "Cada indicio debe ser rotulado y embalado herméticamente de forma individual para preservar su integridad como prueba judicial."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // SUBINSPECTOR → INSPECTOR (Mandos Medios Operativos)
    // ═══════════════════════════════════════════════════════════════
    "subinspector-inspector": [
        {
            id: "si-001",
            question: "¿Cuál es el rol principal del Subinspector al mando de una unidad operativa?",
            options: [
                "Realizar exclusivamente tareas administrativas de escritorio",
                "Supervisar procedimientos en vía pública, coordinar móviles y velar por la integridad del personal",
                "Comandar únicamente operativos de tránsito",
                "Redactar informes para el Ministerio de Seguridad"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector: Conducción Operativa",
            explanation: "El Subinspector ejerce supervisión de procedimientos en vía pública, coordinando móviles patrulleros y cuidando la integridad del personal dependiente."
        },
        {
            id: "si-002",
            question: "¿Cuál es la primera medida obligatoria al arribar a una escena de hecho de sangre?",
            options: [
                "Recolectar los casquillos y embalarlos sin fotografiar",
                "Preservar el perímetro mediante encintado doble y restringir el acceso",
                "Entrevistar a los vecinos antes de comunicar al Fiscal",
                "Mover el cuerpo a un lugar resguardado para protegerlo"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Criminalística: Preservación del Lugar del Hecho",
            explanation: "La preservación del perímetro y la intangibilidad del lugar del hecho es la primera prioridad criminalística, antes de cualquier otra acción."
        },
        {
            id: "si-003",
            question: "¿Puede el personal médico de emergencias ingresar al perímetro interno sin registrarse?",
            options: [
                "Sí, el personal médico tiene libre acceso por emergencia",
                "No, toda persona sin excepción debe quedar registrada en la planilla de custodia",
                "Solo si lo autoriza el jefe del operativo verbalmente",
                "Sí, pero deben dejar su identificación al salir"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Preservación: Planilla de Registro",
            explanation: "Toda persona, sin excepción (incluyendo médicos), que ingrese al perímetro resguardado debe quedar registrada con nombre, DNI, función y hora."
        },
        {
            id: "si-004",
            question: "¿Qué elementos de protección son obligatorios para ingresar al perímetro interno de la escena?",
            options: [
                "No se requiere equipamiento especial",
                "Cubrecalzados y guantes como mínimo",
                "Solo gorra y chaleco antibalas",
                "Barbijo y lentes de sol"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector: Preservación del Lugar del Hecho",
            explanation: "Es obligatorio utilizar cubrecalzados y guantes como mínimo para no contaminar la escena con huellas o material biológico del personal policial."
        },
        {
            id: "si-005",
            question: "¿Quién es el responsable primario de establecer el cordón de preservación en el lugar del hecho?",
            options: [
                "El fiscal del MPA que llega al lugar",
                "El primer preventor a cargo del móvil o dotación que llega al lugar",
                "El perito de criminalística",
                "El jefe de la Unidad Regional"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Criminalística: Cordón de Preservación",
            explanation: "La responsabilidad primaria de asegurar la escena recae en el primer preventor (policía) que llega al lugar del hecho."
        },
        {
            id: "si-006",
            question: "¿Qué datos se deben registrar en la planilla de ingreso al lugar del hecho?",
            options: [
                "Solo el nombre del funcionario",
                "Nombre, DNI, función, hora de ingreso y hora de egreso",
                "Únicamente la hora de llegada",
                "El número de patente del vehículo policial"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Planilla de Registro de Ingreso",
            explanation: "Deben registrarse: nombre completo, documento, función/cargo, hora exacta de ingreso y de egreso de toda persona autorizada."
        },
        {
            id: "si-007",
            question: "En la cadena de custodia, ¿qué ocurre si un indicio no está correctamente rotulado y documentado?",
            options: [
                "No tiene consecuencias legales",
                "Puede ser impugnado en juicio y declarado nulo como prueba",
                "Se puede rotular después sin problema",
                "Solo afecta si el juez lo solicita expresamente"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Cadena de Custodia",
            explanation: "La ruptura de la cadena de custodia puede invalidar la prueba en juicio, afectando todo el proceso penal."
        },
        {
            id: "si-008",
            question: "¿Cuál es el procedimiento correcto al encontrar evidencia en el lugar del hecho?",
            options: [
                "Recogerla con las manos desnudas y llevarla al móvil",
                "Fijación fotográfica y planimétrica → Embalaje hermético → Rotulado → Firma de custodia",
                "Guardarla en el bolsillo y entregarla en comisaría",
                "Dejarla en el lugar hasta que llegue el juez"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Procedimiento de Recolección de Evidencia",
            explanation: "El orden correcto es: 1) Fijación fotográfica y planimétrica, 2) Embalaje hermético individual, 3) Rotulado con datos completos, 4) Firma del formulario de custodia."
        },
        {
            id: "si-009",
            question: "¿Está prohibido fumar dentro del perímetro interno de la escena del hecho?",
            options: [
                "No, depende del criterio de cada efectivo",
                "Sí, queda absolutamente prohibido fumar, comer o alterar la escena de cualquier forma",
                "Solo si hay material explosivo",
                "No está regulado expresamente"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Zona de Exclusión",
            explanation: "En el perímetro interno queda prohibido fumar, pisar indicios, tocar elementos o realizar cualquier acción que pueda contaminar la escena."
        },
        {
            id: "si-010",
            question: "¿A qué se denomina 'Formulario de Cadena de Custodia'?",
            options: [
                "Un formulario de reclamo de viáticos",
                "El documento que registra la trazabilidad de cada indicio desde el primer preventor hasta el perito de destino",
                "Un acta de promoción de personal",
                "El parte diario de novedades del turno"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Cadena de Custodia",
            explanation: "El formulario documenta cada traspaso de la evidencia, garantizando que la prueba en juicio sea la misma que se recolectó originalmente."
        },
        // Preguntas adicionales para completar banco de 25+
        {
            id: "si-011",
            question: "¿Qué se entiende por 'preservación de la intangibilidad' del lugar del hecho?",
            options: [
                "Limpiar el lugar antes de que lleguen los peritos",
                "Que nada ni nadie altere, contamine o destruya los indicios presentes en la escena",
                "Tomar fotos con el celular personal",
                "Permitir el paso de la prensa para documentar"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Criminalística: Preservación",
            explanation: "La intangibilidad significa que la escena debe mantenerse exactamente como fue encontrada, sin ningún tipo de alteración, contaminación o pérdida de indicios."
        },
        {
            id: "si-012",
            question: "¿Cuáles son los dos perímetros del sistema de cordón doble?",
            options: [
                "Perímetro Norte y Perímetro Sur",
                "Perímetro Interno (Zona de Exclusión) y Perímetro Externo (Zona de Seguridad)",
                "Perímetro de entrada y Perímetro de salida",
                "Perímetro vehicular y Perímetro peatonal"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Sistema de Doble Perímetro",
            explanation: "El perímetro interno es la zona de exclusión para peritos; el externo es la zona de seguridad para apoyo policial, ambulancias y superiores."
        },
        {
            id: "si-013",
            question: "¿Quién está autorizado a levantar evidencia dentro del perímetro interno?",
            options: [
                "Cualquier oficial que tenga guantes",
                "Exclusivamente los peritos forenses oficiales designados",
                "El primer policía que llegó al lugar",
                "Los testigos civiles"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Recolección de Evidencia",
            explanation: "Solo los peritos forenses oficiales están autorizados a recolectar y manipular evidencia dentro del perímetro interno de la escena."
        },
        {
            id: "si-014",
            question: "¿Por qué se embala cada indicio de forma individual y hermética?",
            options: [
                "Para ahorrar espacio en el depósito",
                "Para evitar la contaminación cruzada entre indicios y preservar su valor probatorio",
                "Por cuestiones estéticas y de orden",
                "Porque lo exige la empresa de embalajes"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Cadena de Custodia",
            explanation: "El embalaje individual hermético previene la contaminación cruzada (mezcla de ADN, residuos de pólvora, sustancias) entre diferentes indicios del hecho."
        },
        {
            id: "si-015",
            question: "¿Qué sucede legalmente si se rompe la cadena de custodia de una evidencia?",
            options: [
                "No pasa nada, se puede reconstruir después",
                "La prueba puede ser declarada nula e inadmisible en el juicio oral",
                "Solo se aplica una multa al funcionario responsable",
                "Se pide un nuevo peritaje automáticamente"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026, Materia 3 - Cadena de Custodia",
            explanation: "La ruptura de la cadena de custodia puede invalidar la prueba en juicio, beneficiando al imputado por violación de garantías procesales."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // INSPECTOR → SUBCOMISARIO (Jefatura de Dependencia)
    // ═══════════════════════════════════════════════════════════════
    "inspector-subcomisario": [
        {
            id: "is-001",
            question: "¿De qué libros obligatorios responde el Subcomisario como jefe de dependencia policial?",
            options: [
                "Solo del Libro de Guardia",
                "Libro de Guardia, Libro de Detenidos, Registro de Armamento, Libro de Secuestros y Libro de Quejas",
                "Únicamente del Libro de Secuestros",
                "No es responsable de los libros, eso corresponde al escribiente"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Inspector→Subcomisario: Gestión de Comisarías",
            explanation: "El Subcomisario responde por la correcta confección e inviolabilidad de todos los libros obligatorios de la dependencia policial."
        },
        {
            id: "is-002",
            question: "¿Quién es el responsable institucional por la integridad física del detenido alojado en la Comisaría?",
            options: [
                "El Oficial Sumariante únicamente",
                "El Jefe o Subjefe de la Dependencia Policial a cargo del turno",
                "El Jefe de la Guardia Urbana Municipal",
                "El personal administrativo de entrada"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Jefatura de Dependencia",
            explanation: "La responsabilidad institucional y constitucional por la integridad y custodia de los alojados recae sobre la Jefatura de Dependencia (Subcomisario/Comisario)."
        },
        {
            id: "is-003",
            question: "¿Qué artículo del CPP de Santa Fe regula la aprehensión en flagrancia?",
            options: [
                "Artículo 1 del CPP",
                "Artículo 212 del CPP de Santa Fe",
                "Artículo 500 del Código Civil",
                "Artículo 75 de la Constitución Nacional"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Elevaciones al MPA (Art. 212 CPP SF)",
            explanation: "El Art. 212 del CPP de Santa Fe regula las condiciones y plazos de la aprehensión en flagrancia y las comunicaciones al fiscal de turno."
        },
        {
            id: "is-004",
            question: "¿Cuándo debe comunicarse la aprehensión al Fiscal del MPA?",
            options: [
                "Dentro de las 72 horas",
                "De inmediato, sin dilaciones innecesarias",
                "Al día siguiente hábil",
                "Solo si el detenido lo solicita"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Elevaciones al MPA",
            explanation: "La comunicación al Fiscal de turno debe ser inmediata, sin dilaciones innecesarias, elevando las actuaciones dentro del plazo procesal legal."
        },
        {
            id: "is-005",
            question: "¿Qué debe garantizar el Subcomisario respecto de los libros obligatorios de la comisaría?",
            options: [
                "Que estén guardados bajo llave y nadie los vea",
                "Su correcta confección e inviolabilidad",
                "Que se renueven cada mes",
                "Que solo los firme el Jefe de Policía"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Gestión de Recursos Humanos y Registros",
            explanation: "Los libros obligatorios son instrumentos legales que deben estar correctamente confeccionados, sin enmendaduras, tachaduras ni hojas arrancadas."
        },
        {
            id: "is-006",
            question: "¿Cuál es la función del Libro de Detenidos en una comisaría?",
            options: [
                "Registrar los horarios del personal policial",
                "Registrar el ingreso, alojamiento, traslado y egreso de toda persona privada de libertad",
                "Anotar las quejas de los vecinos",
                "Llevar la contabilidad de la dependencia"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Libros Obligatorios de Dependencia",
            explanation: "El Libro de Detenidos registra cronológicamente cada movimiento de personas privadas de libertad alojadas en la dependencia."
        },
        {
            id: "is-007",
            question: "¿Qué significa la sigla CUE en el contexto policial de Santa Fe?",
            options: [
                "Código Único de Emergencias",
                "Código Único de Evento (número que identifica cada actuación policial)",
                "Central Unificada de Estadísticas",
                "Comisión Unificada Especial"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Circuito Logístico y Sumarial en Comisaría",
            explanation: "El CUE (Código Único de Evento) es el número asignado a cada actuación policial que permite su trazabilidad en el sistema."
        },
        {
            id: "is-008",
            question: "¿Cómo se realiza la elevación de actuaciones al MPA en la actualidad?",
            options: [
                "Exclusivamente en papel, por correo postal",
                "Mediante comunicación electrónica digital al sistema del MPA",
                "Solo por fax",
                "Telefónicamente, sin respaldo escrito"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Elevaciones Digitales al MPA",
            explanation: "Las actuaciones se elevan digitalmente al sistema del MPA (Ministerio Público de la Acusación), con respaldo electrónico de todo lo actuado."
        },
        {
            id: "is-009",
            question: "¿Qué es el Libro de Quejas de la dependencia policial?",
            options: [
                "Un cuaderno de notas informales",
                "Un registro oficial donde los ciudadanos pueden asentar quejas o reclamos sobre la actuación policial",
                "Un libro de contabilidad interna",
                "Un diario personal del comisario"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Libros Obligatorios",
            explanation: "El Libro de Quejas es un instrumento obligatorio donde los ciudadanos pueden asentar formalmente reclamos sobre la actuación o el trato policial."
        },
        {
            id: "is-010",
            question: "¿Sobre qué tipo de recursos responde el jefe de dependencia policial?",
            options: [
                "Solo sobre los recursos económicos",
                "Sobre los recursos humanos, materiales, armamento y vehículos asignados a la dependencia",
                "Únicamente sobre los móviles policiales",
                "Solo sobre el personal administrativo"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Gestión de Recursos en Dependencia",
            explanation: "El jefe de dependencia es responsable integral de todos los recursos: personal, armamento, vehículos, equipamiento y bienes asignados."
        },
        {
            id: "is-011",
            question: "¿Qué es el Registro de Armamento en una dependencia policial?",
            options: [
                "Un inventario del arma personal de cada policía",
                "Un libro oficial donde se registran todas las armas asignadas, secuestradas, y sus movimientos",
                "Un listado de armerías de la zona",
                "Un manual de mantenimiento de armas"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Libros Obligatorios: Registro de Armamento",
            explanation: "Registra todas las armas (reglamentarias y secuestradas) que ingresan y egresan de la dependencia, con detalle de marca, calibre, número de serie y movimientos."
        },
        {
            id: "is-012",
            question: "¿Qué función cumple el Libro de Secuestros?",
            options: [
                "Registrar los secuestros extorsivos denunciados",
                "Registrar todos los elementos secuestrados en procedimientos, con detalle y destino judicial",
                "Llevar un control de los vehículos patrulleros",
                "Anotar las intervenciones de tránsito"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Libros Obligatorios: Libro de Secuestros",
            explanation: "El Libro de Secuestros documenta cada elemento incautado en procedimientos, describiendo el objeto, su procedencia y el destino judicial asignado."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // SUBCOMISARIO → COMISARIO (Planeamiento Estratégico)
    // ═══════════════════════════════════════════════════════════════
    "subcomisario-comisario": [
        {
            id: "sc-001",
            question: "¿Cuál es el objetivo principal del análisis de inteligencia criminal operativa?",
            options: [
                "Reducir el consumo de combustible únicamente",
                "Identificar patrones delictivos para desplegar patrullaje preventivo orientado",
                "Aumentar el número de actas de infracción de tránsito",
                "Reemplazar el sistema de denuncias presenciales"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Análisis del Delito y Cuadrantes 911",
            explanation: "El análisis operativo permite anticipar modalidades delictivas y concentrar recursos en las zonas críticas identificadas."
        },
        {
            id: "sc-002",
            question: "¿Qué es un mapa de calor operativo en el contexto policial?",
            options: [
                "Un mapa que muestra la temperatura ambiente en cada zona",
                "Una representación gráfica de la densidad delictiva para desplegar patrullaje focalizado",
                "Un plano del sistema de calefacción de la comisaría",
                "Un registro de las infracciones de tránsito por zona"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Mapas de Calor",
            explanation: "Los mapas de calor son representaciones georreferenciadas de la concentración de hechos delictivos, usados para planificar la distribución del patrullaje."
        },
        {
            id: "sc-003",
            question: "¿En qué se basa el Comisario para planificar los servicios ordinarios y extraordinarios?",
            options: [
                "En su experiencia personal exclusivamente",
                "En datos estadísticos de denuncias, llamadas al 911 y mapas georreferenciados de calor",
                "En las solicitudes de los vecinos por carta",
                "En los comunicados de prensa de los medios locales"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Diseño de Cuadrantes",
            explanation: "La planificación operativa moderna se basa en datos objetivos: estadísticas de denuncias, registros del 911 y georreferenciación de hechos delictivos."
        },
        {
            id: "sc-004",
            question: "¿Qué son los cuadrantes 911 en la gestión operativa policial?",
            options: [
                "Los turnos de guardia del personal 911",
                "Las divisiones geográficas del territorio para asignación de patrullajes con base en datos del 911",
                "Los números de teléfono de las comisarías",
                "Las categorías de llamadas telefónicas"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Cuadrantes 911",
            explanation: "Los cuadrantes dividen el territorio en zonas geográficas específicas, asignando móviles y personal con base en la demanda de llamadas al 911."
        },
        {
            id: "sc-005",
            question: "¿Qué evalúa la auditoría operativa que realiza el Comisario?",
            options: [
                "Solo la vestimenta del personal",
                "Los tiempos de respuesta del patrullaje preventivo y la inspección de servicios adicionales",
                "Únicamente la contabilidad de la comisaría",
                "Los permisos de licencia del personal"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Auditoría Operativa",
            explanation: "La auditoría evalúa continuamente la eficiencia del patrullaje (tiempos de respuesta) y la correcta prestación de servicios adicionales."
        },
        {
            id: "sc-006",
            question: "¿Qué son los KPI (Key Performance Indicators) en la gestión policial?",
            options: [
                "Los códigos de radio de las patrullas",
                "Indicadores clave de desempeño para medir la eficiencia operativa de la dependencia",
                "Las siglas del Código Penal Internacional",
                "Los turnos de personal de la semana"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Evaluación de Métricas KPI",
            explanation: "Los KPI son métricas que permiten evaluar objetivamente el desempeño: tiempos de respuesta, tasa de resolución, cobertura de cuadrantes, etc."
        },
        {
            id: "sc-007",
            question: "¿Qué tipo de servicio constituyen las custodias de objetivos en la planificación operativa?",
            options: [
                "Servicios administrativos internos",
                "Servicios adicionales o extraordinarios que requieren planificación específica",
                "Servicios de limpieza y mantenimiento",
                "Servicios de capacitación del personal"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Servicios Adicionales",
            explanation: "Las custodias de objetivos (bancos, edificios públicos, eventos) son servicios extraordinarios que el Comisario debe planificar e inspeccionar."
        },
        {
            id: "sc-008",
            question: "¿Qué herramienta se utiliza para georreferenciar los hechos delictivos en el territorio?",
            options: [
                "Una brújula manual",
                "Sistemas de información geográfica (GIS) y mapas georreferenciados",
                "Un listado en papel ordenado por fecha",
                "Los partes diarios del personal"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Georreferenciación",
            explanation: "Los sistemas GIS permiten visualizar la distribución espacial de los delitos para diseñar cuadrantes y focalizar recursos."
        },
        {
            id: "sc-009",
            question: "¿Con qué frecuencia se recomienda evaluar las métricas operativas (KPI) de la dependencia?",
            options: [
                "Una vez al año",
                "Semanalmente, para ajustar la distribución de recursos",
                "Solo cuando lo solicita el Jefe de Policía",
                "Cada cinco años"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Evaluación Semanal de Métricas",
            explanation: "La evaluación semanal de KPI permite detectar cambios en los patrones delictivos y ajustar rápidamente la distribución de patrullaje y recursos."
        },
        {
            id: "sc-010",
            question: "¿Qué incluyen los 'servicios ordinarios' en la planificación del Comisario?",
            options: [
                "Solo las guardias de la comisaría",
                "El patrullaje preventivo regular, guardias, turnos y servicios de calle programados",
                "Los eventos especiales y operativos extraordinarios",
                "Las licencias y francos del personal"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Comisario: Planificación de Servicios",
            explanation: "Los servicios ordinarios comprenden toda la actividad preventiva regular: patrullaje de cuadrantes, guardias, turnos de servicio y presencia en la vía pública."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // COMISARIO → COMISARIO SUPERVISOR / DIRECTOR (Alta Dirección)
    // ═══════════════════════════════════════════════════════════════
    "comisario-supervisor": [
        {
            id: "cs-001",
            question: "¿Cuál es el rol estratégico del Comisario Supervisor en la alta conducción policial?",
            options: [
                "Patrullaje pedestre en comisaría de distrito",
                "Dirección estratégica, evaluación presupuestaria, proyectos de gestión y articulación ministerial",
                "Confección de sumarios por faltas leves exclusivamente",
                "Recepción de llamados telefónicos en la central"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Alta Dirección Institucional",
            explanation: "La jerarquía superior implica la máxima conducción operacional, diseño de proyectos institucionales y articulación con las autoridades ministeriales."
        },
        {
            id: "cs-002",
            question: "¿Qué estructura requiere el ISEP para los proyectos de gestión en concursos de ascenso superiores?",
            options: [
                "Solo un resumen de una página",
                "Diagnóstico de situación, Objetivos SMART, Plan de Acción, Indicadores KPI, Presupuesto y Recursos",
                "Un ensayo libre sobre gestión policial",
                "Un curriculum vitae actualizado"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Guía ISEP para Elaboración de Proyectos",
            explanation: "Los proyectos deben contener: diagnóstico, objetivos SMART, plan de acción detallado, indicadores de medición (KPI), y estimación de presupuesto y recursos."
        },
        {
            id: "cs-003",
            question: "¿Qué órgano efectúa la auditoría externa de la conducta policial en Santa Fe?",
            options: [
                "El Consejo de Administración del Municipio",
                "La Dirección Provincial de Control Institucional / Asuntos Internos del Ministerio de Justicia y Seguridad",
                "El Colegio de Abogados de Santa Fe",
                "La Defensoría del Pueblo de la Nación"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Alta Dirección: Control Institucional",
            explanation: "La Dirección de Control Institucional (Asuntos Internos) del Ministerio de Justicia y Seguridad es el organismo de auditoría externa de la conducta policial."
        },
        {
            id: "cs-004",
            question: "¿En qué nivel de la estructura institucional se ubica el Comisario Supervisor?",
            options: [
                "En la base operativa de la comisaría",
                "En la plana mayor institucional, entre la Jefatura de Policía y las Unidades Regionales",
                "En la Dirección del Hospital Policial",
                "En la Escuela de Cadetes exclusivamente"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Estructura de Gobierno Institucional Policial",
            explanation: "El Comisario Supervisor integra la plana mayor, ubicándose entre la Jefatura de Policía de la Provincia y las Unidades Regionales (UR I a UR XIX)."
        },
        {
            id: "cs-005",
            question: "¿Qué son los objetivos SMART en un proyecto de gestión policial?",
            options: [
                "Objetivos inteligentes que usan tecnología",
                "Objetivos Específicos, Medibles, Alcanzables, Relevantes y con Tiempo definido",
                "Objetivos secretos que solo conoce el jefe de proyecto",
                "Objetivos de seguridad máxima para operativos especiales"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Guía de Proyectos de Gestión",
            explanation: "SMART es un acrónimo: Specific (Específico), Measurable (Medible), Achievable (Alcanzable), Relevant (Relevante), Time-bound (con plazo definido)."
        },
        {
            id: "cs-006",
            question: "¿Cuántas Unidades Regionales (UR) tiene la Policía de la Provincia de Santa Fe?",
            options: [
                "5 Unidades Regionales",
                "19 Unidades Regionales (UR I a UR XIX)",
                "10 Unidades Regionales",
                "3 Unidades Regionales"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Estructura de Gobierno Institucional",
            explanation: "La Policía de Santa Fe se organiza en 19 Unidades Regionales que cubren todo el territorio provincial."
        },
        {
            id: "cs-007",
            question: "¿Cuáles son las funciones principales del Comisario Supervisor en relación con las Unidades Regionales?",
            options: [
                "Solamente firmar documentos administrativos",
                "Auditoría de procedimientos, gestión presupuestaria y relación con los poderes del Estado",
                "Atender consultas telefónicas del público",
                "Dirigir el tránsito en eventos deportivos"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Alta Dirección: Funciones del Comisario Supervisor",
            explanation: "El Comisario Supervisor interviene en la auditoría de procedimientos, la gestión presupuestaria de las UR y la articulación con los poderes del Estado."
        },
        {
            id: "cs-008",
            question: "¿Quién se encuentra por encima del Comisario Supervisor en la estructura jerárquica policial?",
            options: [
                "El Inspector",
                "El Director / Director General de Policía y la Jefatura de Policía",
                "El Subcomisario",
                "El Oficial de Policía"
            ],
            correctIndex: 1,
            source: "Ley 12.521 - Escala Jerárquica Policial",
            explanation: "Por encima del Comisario Supervisor están: Subdirector, Director y Director General de Policía, dependientes de la Jefatura de Policía."
        },
        {
            id: "cs-009",
            question: "¿Qué relación tiene el Comisario Supervisor con el Ministerio de Justicia y Seguridad?",
            options: [
                "Ninguna, son independientes",
                "Articulación directa en materia de políticas públicas de seguridad y gestión institucional",
                "Solo se comunican por correo electrónico informal",
                "El Ministerio no interviene en asuntos policiales"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Alta Dirección y Políticas Públicas",
            explanation: "El Comisario Supervisor articula directamente con el Ministerio en la implementación de políticas públicas de seguridad y proyectos institucionales."
        },
        {
            id: "cs-010",
            question: "¿Qué tipo de concurso ISEP rinden los aspirantes a Comisario Supervisor o Director?",
            options: [
                "Solo examen escrito múltiple choice",
                "Examen escrito, proyecto de gestión institucional y evaluación de antecedentes",
                "Solo una entrevista personal",
                "Un examen físico de aptitud"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Concursos Superiores (Agrupamiento Supervisión/Dirección)",
            explanation: "Los concursos superiores requieren examen escrito, presentación de un proyecto de gestión (con estructura SMART, KPI, presupuesto) y evaluación de antecedentes."
        }
    ]
};

// ═══════════════════════════════════════════════════════════════
// METADATA DEL BANCO DE PREGUNTAS
// ═══════════════════════════════════════════════════════════════
window.quizBankMeta = {
    version: "2.1.0",
    lastUpdated: "2026-10-19",
    totalQuestions: Object.values(window.quizBank).reduce((acc, arr) => acc + arr.length, 0),
    hierarchies: [
        { id: "simulacro-integral", title: "Simulacro General ISEP (Todas las Materias)", icon: "auto_stories", color: "from-blue-600 via-indigo-600 to-purple-700", questionCount: 82 },
        { id: "oficial-subinspector", title: "Oficial → Subinspector", icon: "military_tech", color: "from-blue-600 to-indigo-700", questionCount: 35 },
        { id: "subinspector-inspector", title: "Subinspector → Inspector", icon: "shield_person", color: "from-emerald-600 to-teal-700", questionCount: 15 },
        { id: "inspector-subcomisario", title: "Inspector → Subcomisario", icon: "admin_panel_settings", color: "from-amber-600 to-orange-700", questionCount: 12 },
        { id: "subcomisario-comisario", title: "Subcomisario → Comisario", icon: "stars", color: "from-purple-600 to-indigo-800", questionCount: 10 },
        { id: "comisario-supervisor", title: "Comisario → Com. Supervisor / Director", icon: "workspace_premium", color: "from-amber-500 to-purple-700", questionCount: 10 }
    ]
};
