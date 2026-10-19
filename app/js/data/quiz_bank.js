/**
 * Adicionales Santa Fe - Banco de Preguntas ISEP 2026 Profesional
 * Simulador de Examen de Ascenso Policial Oficial
 * 
 * Contenido extraído directamente de los manuales oficiales de cada jerarquía
 * y enriquecido con los exámenes reales de perfeccionamiento policial (Daypo 2026):
 * - Tiro y Armamento Policial (MIRAF, Bersa Thunder/TPR, Balística, Posición SUL).
 * - Seguridad de la Información (Tríada CID, Protocolo de 5 pasos, Incidentes y Redes).
 * - Comunicación y Redacción Institucional (Prensa sin Off The Record, Asertividad 7C, Lenguaje llano).
 * - Conducción Policial y Orden Público (Mando, Comando, Conducción, OO, Inspecciones de Zona y Comisarías).
 * - Leyes y Procedimiento (CPP Ley 12.734, Narcomenudeo Ley 14.239, Jurados Ley 14.258, Dec. 461/15, Ley 12.521).
 * 
 * Modalidades de Dificultad:
 * - 'facil': Conceptos fundamentales, definiciones y principios rectores del manual.
 * - 'media': Procedimientos técnico-operativos de guardia, calle y tiro.
 * - 'dificil': Nivel concurso ISEP real (plazos procesales, artículos específicos, causales y distractores jurídicos).
 */

window.quizBank = {

    // ═══════════════════════════════════════════════════════════════
    // OFICIAL DE POLICÍA → SUBINSPECTOR (Agrupamiento Ejecución)
    // ═══════════════════════════════════════════════════════════════
    "oficial-subinspector": [
        // --- NIVEL FÁCIL ---
        {
            id: "os-f01",
            difficulty: "facil",
            question: "¿Cuáles son las cuatro virtudes cardinales que según el Manual ISEP sustentan la 'autoridad real' del líder policial?",
            options: [
                "Obediencia, Disciplina, Valentía y Lealtad",
                "Prudencia, Justicia, Fortaleza y Templanza",
                "Respeto, Orden, Comando y Firmeza",
                "Eficiencia, Rapidez, Control y Mando"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Oficial, Pág. 15: Liderazgo Policial",
            explanation: "El ISEP enseña que la autoridad no proviene solo del cargo jerárquico sino de las 4 virtudes cardinales: Prudencia, Justicia, Fortaleza y Templanza."
        },
        {
            id: "os-f02",
            difficulty: "facil",
            question: "¿Qué norma internacional consagra el Código de Conducta para Funcionarios Encargados de Hacer Cumplir la Ley?",
            options: [
                "Resolución 34/169 de la Asamblea General de la ONU",
                "Convenio 169 de la OIT",
                "Declaración de Ginebra de 1949",
                "Tratado de Roma de 1998"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Oficial, Pág. 30: Código de Conducta ONU",
            explanation: "La Resolución 34/169 de la ONU de 1979 establece los 8 artículos fundamentales que rigen el ejercicio ético de la función policial."
        },
        {
            id: "os-f03",
            difficulty: "facil",
            question: "¿Cómo se divide el sistema de preservación de escena del hecho denominado 'Cordón Doble'?",
            options: [
                "Zona Norte y Zona Sur",
                "Perímetro Interno (Zona de Exclusión) y Perímetro Externo (Zona de Seguridad)",
                "Área de entrada y Área de salida",
                "Perímetro de Tránsito y Perímetro Vecinal"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Oficial, Pág. 22: Preservación del Lugar del Hecho",
            explanation: "El sistema de doble cordón define un Perímetro Interno exclusivo para peritos forenses y un Perímetro Externo para seguridad y apoyo."
        },
        {
            id: "os-f04",
            difficulty: "facil",
            question: "¿Qué tipo de falta disciplinaria constituye el desaliño en el uniforme o una tardanza menor sin justificar según el Decreto 461/15?",
            options: [
                "Falta Leve",
                "Falta Grave",
                "Falta Gravísima",
                "No constituye falta disciplinaria"
            ],
            correctIndex: 0,
            source: "Decreto 461/15 - Régimen Disciplinario Policial",
            explanation: "El desaliño o descuidos menores en el servicio constituyen faltas leves, sancionables con apercibimiento o arresto de hasta 10 días."
        },
        {
            id: "os-f05",
            difficulty: "facil",
            question: "¿Quién es considerado el 'Primer Preventor' policial en una escena delictiva?",
            options: [
                "El primer personal policial uniformado que toma conocimiento e interviene en el lugar del hecho",
                "Exclusivamente el Jefe de la Comisaría de la jurisdicción",
                "El médico forense de la policía científica",
                "El Fiscal del Ministerio Público de la Acusación"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Oficial, Pág. 20: Rol del Primer Preventor",
            explanation: "El primer preventor es el efectivo que arriba en primer término al lugar, asumiendo la responsabilidad inicial de asegurar y preservar la escena."
        },
        {
            id: "os-f06",
            difficulty: "facil",
            question: "¿Qué es la 'Munición' según la reglamentación de tiro policial y la Ley Nacional de Armas?",
            options: [
                "El conjunto de cartuchos que se proveen para ser utilizados en un arma de fuego",
                "Únicamente la pólvora y el fulminante sin la vaina",
                "El cargador metálico vacío",
                "El dispositivo de puntería nocturna"
            ],
            correctIndex: 0,
            source: "Manual MIRAF - Armamento y Tiro Policial / Daypo Tiro",
            explanation: "La munición es el conjunto o provisión de cartuchos diseñados y aptos para ser disparados por las armas de fuego."
        },
        {
            id: "os-f07",
            difficulty: "facil",
            question: "En las reglas cardinales de seguridad con armas de fuego, ¿cómo debe considerarse toda arma que se empuña?",
            options: [
                "Siempre cargada y lista para disparar, aun cuando se crea o sepa que está descargada",
                "Descargada mientras tenga el seguro manual colocado",
                "Inofensiva si se encuentra dentro de la dependencia policial",
                "Segura si el cargador está desprendido aunque tenga cartucho en recámara"
            ],
            correctIndex: 0,
            source: "Manual MIRAF - Reglas Cardinales de Seguridad",
            explanation: "La regla de oro del tiro policial exige tratar a toda arma en todo momento como si estuviese cargada, sin excepciones."
        },

        // --- NIVEL MEDIO ---
        {
            id: "os-m01",
            difficulty: "media",
            question: "¿Cuál es la obligación inmediata del primer preventor policial al llegar a una escena del hecho con heridos de arma de fuego?",
            options: [
                "Secuestrar de inmediato las vainas servidas para que no se pierdan",
                "Priorizar el auxilio médico y resguardo de la vida, coordinando el 107 y fijando la posición de los indicios movidos si fuere indispensable",
                "Esperar la llegada del Fiscal del MPA antes de tocar a los heridos",
                "Tomar declaración testimonial a los vecinos antes del traslado de los heridos"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Oficial, Pág. 24: Primer Preventor y Auxilio",
            explanation: "El deber prioritario es la preservación de la vida humana; si se debe mover a un herido o elementos para salvarlo, se registra detalladamente la modificación."
        },
        {
            id: "os-m02",
            difficulty: "media",
            question: "¿En qué artículos del Código Procesal Penal de Santa Fe se fundamenta formalmente el labrado del Acta de Procedimiento Policial?",
            options: [
                "Artículos 138, 139 y concordantes del CPP (Ley 12.734)",
                "Artículos 212 y 213 únicamente",
                "Artículos 40 y 41 del Código Penal",
                "Artículos 10 y 11 de la Ley 12.521"
            ],
            correctIndex: 0,
            source: "CPP de Santa Fe Ley 12.734, Art. 138: Actas Policiales",
            explanation: "Los artículos 138 y concordantes del CPP regulan las formalidades, requisitos de validez, mención de fecha, lugar, firmas y testigos del acta policial."
        },
        {
            id: "os-m03",
            difficulty: "media",
            question: "Para verificar con total certeza que un arma de fuego se encuentra descargada, ¿de qué tres maneras complementarias debe realizarse la comprobación?",
            options: [
                "Mecánica, visual y táctil (habiendo retirado previamente el cargador)",
                "Únicamente disparando en seco hacia el piso",
                "Solo retirando el cargador sin abrir la corredera",
                "Pesando el arma con una balanza digital"
            ],
            correctIndex: 0,
            source: "Manual MIRAF / Daypo Tiro - Verificación de Tres Vías",
            explanation: "La verificación reglamentaria exige retirar el cargador, ciclar la corredera y comprobar de forma mecánica, visual y táctil que la recámara y el alvéolo estén vacíos."
        },
        {
            id: "os-m04",
            difficulty: "media",
            question: "Según el Código de Convivencia de Santa Fe (Ley 10.703 / Ley 13.774), ¿cuál es el plazo para poner a disposición del Juez Comunitario a un contraventor demorado?",
            options: [
                "Inmediatamente, no pudiendo superar las 24 horas",
                "Dentro de los 5 días hábiles",
                "En el plazo de 48 horas sin excepción",
                "A las 72 horas con informe médico"
            ],
            correctIndex: 0,
            source: "Código de Convivencia de Santa Fe - Procedimiento Contravencional",
            explanation: "La legislación contravencional provincial exige dar intervención y poner al demorado a disposición del juez dentro del término perentorio de 24 horas."
        },
        {
            id: "os-m05",
            difficulty: "media",
            question: "En una persecución en flagrante delito, ¿qué faculta el CPP de Santa Fe a la policía respecto al ingreso a una morada privada sin orden de allanamiento?",
            options: [
                "Faculta el ingreso inmediato únicamente si media persecución ininterrumpida de quien se presume cometió un delito grave y se introdujo en ella para ocultarse o evitar la detención (Art. 212 CPP)",
                "Prohíbe terminantemente el ingreso en todos los casos hasta contar con orden escrita de un juez",
                "Permite el ingreso en cualquier momento sin necesidad de justificar flagrancia ni persecución",
                "Solo permite ingresar si el dueño de casa autoriza por escrito en presencia de dos escribanos"
            ],
            correctIndex: 0,
            source: "CPP Santa Fe Ley 12.734, Art. 212: Allanamiento sin Orden en Flagrancia",
            explanation: "El Art. 212 del CPP autoriza el allanamiento sin orden judicial previa ante flagrancia y persecución ininterrumpida o auxilio por peligro inminente para la vida."
        },
        {
            id: "os-m06",
            difficulty: "media",
            question: "¿Qué es la 'Posición SUL' en el tiro táctico policial y cuál es su finalidad operativa?",
            options: [
                "Una posición de descanso, traslado y retención donde el arma está pegada al pecho, codos cerrados y el cañón apunta a 90° hacia el suelo entre los pies",
                "Una posición de tiro acrobático con una sola mano extendida",
                "Una postura de puntería apoyando el arma sobre el hombro del compañero",
                "Una posición en el suelo boca arriba para disparar hacia atrás"
            ],
            correctIndex: 0,
            source: "Manual MIRAF / Daypo Conducción y Tiro - Posiciones Tácticas",
            explanation: "La posición SUL (originada en Brasil) permite desplazarse en recintos cerrados o multitudes manteniendo el cañón en zona neutra y segura sin encañonar a terceros."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "os-d01",
            difficulty: "dificil",
            question: "Conforme al Art. 138 del Código Procesal Penal de Santa Fe, ¿en qué supuesto excepcional el acta de procedimiento policial puede ser válida sin la presencia de dos testigos civiles?",
            options: [
                "En ningún caso; la falta de dos testigos acarrea la nulidad insanable de todo lo actuado",
                "En casos de extrema urgencia o imposibilidad fundada de hallar testigos por razones de peligro inminente o desolación del lugar, debiendo asentarse dicha circunstancia de modo expreso en el acta",
                "Siempre que el procedimiento se realice en horario nocturno (entre las 22:00 y las 06:00 hs)",
                "Cuando el personal preventor cuente con la anuencia verbal del Fiscal de turno"
            ],
            correctIndex: 1,
            source: "CPP Santa Fe Ley 12.734, Art. 138 in fine: Excepción de Testigos",
            explanation: "El Art. 138 in fine autoriza a prescindir de testigos solo por razones fundadas de urgencia o peligro grave, dejándolo expresamente asentado para evitar la nulidad."
        },
        {
            id: "os-d02",
            difficulty: "dificil",
            question: "Según el Art. 214 del CPP de Santa Fe, ¿cuál es el plazo legal perentorio que tiene la policía para comunicar al Fiscal del MPA la aprehensión de una persona?",
            options: [
                "Inmediatamente y sin dilación alguna, no pudiendo exceder en ningún caso las seis (6) horas de materializada",
                "Dentro de las doce (12) horas corridas posteriores a la detención",
                "Dentro de las veinticuatro (24) horas hábiles siguientes",
                "Al momento de remitir el sumario prevenicional concluido a las 72 horas"
            ],
            correctIndex: 0,
            source: "CPP Santa Fe Ley 12.734, Art. 214: Plazo de Comunicación de Aprehensión",
            explanation: "El Art. 214 establece que la aprehensión debe comunicarse de forma inmediata al fiscal, con un tope infranqueable de 6 horas."
        },
        {
            id: "os-d03",
            difficulty: "dificil",
            question: "¿Qué rama de la balística estudia el comportamiento del proyectil dentro del arma desde que se presiona la cola del disparador hasta que la ojiva abandona la boca del cañón?",
            options: [
                "Balística Interior",
                "Balística Exterior",
                "Balística de Efectos",
                "Balística Comparativa"
            ],
            correctIndex: 0,
            source: "Manual MIRAF / Daypo Tiro - Ramas de la Balística",
            explanation: "La Balística Interior estudia los fenómenos físico-químicos dentro del arma (deflagración, presión de gases, estriado y desplazamiento en el ánima)."
        },
        {
            id: "os-d04",
            difficulty: "dificil",
            question: "De acuerdo con el Decreto 461/15, ¿cuál es el plazo de prescripción de la acción disciplinaria para las faltas leves y para las faltas graves respectivamente?",
            options: [
                "60 días corridos para las faltas leves y dos (2) años para las faltas graves",
                "30 días para leves y 6 meses para graves",
                "1 año para leves y 5 años para graves",
                "Las faltas disciplinarias policiales son imprescriptibles mientras el funcionario siga en actividad"
            ],
            correctIndex: 0,
            source: "Decreto 461/15 - Régimen Disciplinario, Prescripción de Faltas",
            explanation: "El Decreto 461/15 fija que la potestad disciplinaria prescribe a los 60 días en faltas leves y a los 2 años en faltas graves contados desde la comisión del hecho."
        },
        {
            id: "os-d05",
            difficulty: "dificil",
            question: "¿Cuál es el plazo de vencimiento legal de la Credencial de Legítimo Usuario (CLU) emitida por la ANMaC según la Ley Nacional 20.429?",
            options: [
                "Cinco (5) años",
                "Tres (3) años",
                "Diez (10) años",
                "No vence nunca para personal policial en actividad"
            ],
            correctIndex: 0,
            source: "Ley 20.429 / Manual MIRAF / Daypo Tiro",
            explanation: "La Credencial de Legítimo Usuario (CLU) tiene una vigencia legal de 5 años corridos contados desde su fecha de emisión."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // SUBINSPECTOR → INSPECTOR (Liderazgo, Crisis, Menores, LCAT)
    // ═══════════════════════════════════════════════════════════════
    "subinspector-inspector": [
        // --- NIVEL FÁCIL ---
        {
            id: "si-f01",
            difficulty: "facil",
            question: "En el Manual ISEP para Subinspectores, ¿a qué alude el concepto de 'Pequeños Grandes Líderes'?",
            options: [
                "Al personal que recién egresa de la escuela de oficiales",
                "A los mandos medios y primeros supervisores de patrulla que con su ejemplo diario modelan la conducta y operatividad del personal subordinado",
                "A los directores generales de las Unidades Regionales",
                "A los cadetes en período de prácticas profesionalizantes"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector, Pág. 8: Pequeños Grandes Líderes",
            explanation: "El concepto resalta el rol estratégico del Subinspector como líder de proximidad directa con la guardia y el móvil patrullero."
        },
        {
            id: "si-f02",
            difficulty: "facil",
            question: "En una intervención ante una persona con padecimiento mental en crisis en vía pública, ¿cuál es el objetivo primordial del accionar policial?",
            options: [
                "Reducir físicamente al causante con armas de letalidad inmediata",
                "Preservar la vida e integridad del causante y de terceros, conteniendo la situación y solicitando asistencia médica de salud mental (107 / SIES)",
                "Trasladarlo inmediatamente a un calabozo de comisaría para interrogarlo",
                "Llamar a los medios de comunicación para dejar constancia"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector, Pág. 16: Crisis Subjetiva - Abordaje",
            explanation: "Bajo la Ley de Salud Mental y doctrina ISEP, la crisis subjetiva es una emergencia sanitaria que requiere contención, distancia y auxilio médico, no criminalización."
        },
        {
            id: "si-f03",
            difficulty: "facil",
            question: "¿Cuáles son los componentes de la tríada fundamental de la Seguridad de la Información (Tríada CID)?",
            options: [
                "Confidencialidad, Integridad y Disponibilidad (más Autenticidad)",
                "Control, Identificación y Defensa",
                "Comando, Instrucción y Disciplina",
                "Confianza, Información y Datos"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Seguridad de la Información / Daypo Informática",
            explanation: "La tríada CID (Confidencialidad, Integridad y Disponibilidad) es el pilar internacional de la protección de la información física y digital."
        },
        {
            id: "si-f04",
            difficulty: "facil",
            question: "En materia de redacción institucional policial, ¿cuáles son los tres procesos que se facilitan al utilizar un lenguaje llano y legible?",
            options: [
                "Leer, comprender y memorizar el texto con rapidez",
                "Archivar, destruir y ocultar antecedentes",
                "Firmar, sellar y foliar mecánicamente",
                "Imprimir, fotocopiar y escanear legajos"
            ],
            correctIndex: 0,
            source: "Manual ISEP - Redacción Institucional / Daypo Comunicación",
            explanation: "La legibilidad garantiza que cualquier funcionario o ciudadano pueda leer, comprender y recordar con exactitud lo consignado en un acta o parte."
        },

        // --- NIVEL MEDIO ---
        {
            id: "si-m01",
            difficulty: "media",
            question: "En un siniestro vial con Lesiones Culposas en Accidentes de Tránsito (L.C.A.T.), ¿qué elemento técnico debe confeccionar el Subinspector preventor?",
            options: [
                "Una sentencia judicial provisoria de culpabilidad",
                "La inspección ocular detallada y el croquis planimétrico ilustrativo con medidas, sentido de circulación y punto de impacto estimado",
                "Una cotización de los repuestos de los vehículos dañados",
                "La suspensión preventiva del carnet de conducir de ambos involucrados"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector, Pág. 25: Procedimientos L.C.A.T.",
            explanation: "En hechos de L.C.A.T. es deber del preventor labrar la inspección ocular y el croquis acotado para elevar a fiscalía y peritos viales."
        },
        {
            id: "si-m02",
            difficulty: "media",
            question: "¿Qué recaudo legal es obligatorio al intervenir en la demora de un menor de 16 años (no punible penalmente)?",
            options: [
                "Alojarlo en el penal de mayores hasta que el juez resuelva",
                "No esposarlo salvo riesgo inminente, examinarlo médicamente, no alojarlo en celdas de detención y dar inmediata intervención a la Secretaría de Niñez (Ley 12.967)",
                "Tomarle declaración indagatoria en la oficina de guardia",
                "Publicar sus datos personales en el parte de prensa para ubicar a sus padres"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector, Pág. 18: Procedimiento con Menores",
            explanation: "La ley de niñez y el manual ISEP prohíben alojar menores en calabozos, exigen certificado médico y articulación con los organismos de niñez locales."
        },
        {
            id: "si-m03",
            difficulty: "media",
            question: "¿Cuál es la diferencia principal entre 'Seguridad Informática' y 'Seguridad de la Información'?",
            options: [
                "La seguridad informática protege exclusivamente computadoras, redes y software frente a ciberataques; la seguridad de la información protege los datos críticos, procesos, personas y documentos físicos y digitales",
                "Son exactamente lo mismo sin ninguna distinción técnica",
                "La seguridad informática solo protege documentos impresos en papel",
                "La seguridad de la información es tarea exclusiva de la policía científica"
            ],
            correctIndex: 0,
            source: "Manual ISEP - Seguridad de la Información / Daypo Informática",
            explanation: "La seguridad informática es un subsistema técnico; la seguridad de la información es un concepto abarcativo que involucra políticas, personas, infraestructura y datos en cualquier soporte."
        },
        {
            id: "si-m04",
            difficulty: "media",
            question: "En la resolución policial de conflictos interpersonales, ¿en base a qué enfoque se obtienen los acuerdos más sostenibles y pacíficos según la doctrina de comunicación?",
            options: [
                "Gestionando y negociando en base a los Intereses y necesidades reales de las partes",
                "Imponiendo la solución exclusivamente por la fuerza y el poder de coerción",
                "Ignorando el conflicto y dejando que los involucrados se retiren",
                "Amenazando con arresto inmediato a ambas partes"
            ],
            correctIndex: 0,
            source: "Manual ISEP - Gestión del Conflicto / Daypo Comunicación",
            explanation: "El modelo de negociación colaborativa enseña que las soluciones más sostenibles a largo plazo surgen de trabajar sobre los intereses de fondo y no sobre posiciones de poder."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "si-d01",
            difficulty: "dificil",
            question: "Con la implementación del Juicio por Jurados en la Provincia de Santa Fe (Ley 14.258), ¿cuál es el rol y exigencia probatoria sobre el funcionario policial que comparece como testigo en el debate?",
            options: [
                "Puede leer íntegramente las actas policiales durante su testimonio sin responder preguntas de las partes",
                "Debe declarar oralmente con base en su percepción directa y memoria, pudiendo utilizar las actas únicamente para refrescar memoria o superar contradicciones a solicitud fundada de las partes",
                "Su testimonio es irrelevante porque el jurado civil solo juzga pruebas periciales de laboratorio",
                "El policía declara a puertas cerradas sin la presencia de los doce ciudadanos jurados"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector, Pág. 159: Juicio por Jurados en Santa Fe (Ley 14.258)",
            explanation: "En el sistema de Juicio por Jurados rige la oralidad pura; las actas no ingresan por lectura directa sino a través del testimonio oral del efectivo policial."
        },
        {
            id: "si-d02",
            difficulty: "dificil",
            question: "¿Cuál es el procedimiento inicial estándar de cinco pasos que debe seguir el personal policial ante un incidente de seguridad de la información en una dependencia?",
            options: [
                "1. Identificar el incidente, 2. Aislar el equipo/sistema, 3. Notificar a las autoridades competentes, 4. Evitar acciones que comprometan la evidencia y 5. Registrar el incidente",
                "1. Apagar y formatear el disco duro inmediatamente, 2. No avisar a nadie, 3. Esperar una semana",
                "1. Publicar el incidente en redes sociales para alertar a la población, 2. Denunciar al técnico",
                "1. Desconectar la luz de toda la comisaría y quemar los libros de guardia"
            ],
            correctIndex: 0,
            source: "Manual ISEP - Protocolo ante Incidentes / Daypo Informática",
            explanation: "El protocolo de 5 pasos asegura la contención del ataque, preserva la evidencia digital forense y permite la trazabilidad del incidente."
        },
        {
            id: "si-d03",
            difficulty: "dificil",
            question: "En una requisa vehicular sin orden judicial en la vía pública (Art. 213 CPP Santa Fe), ¿qué requisito de legalidad sustantiva exige la jurisprudencia para que el secuestro no sea declarado nulo?",
            options: [
                "Que el conductor tenga antecedentes penales computables en el sistema Cóndor",
                "La existencia de circunstancias previas objetivas y concordantes (motivo fundado) que justifiquen la presunción de que en el rodado se transportan efectos de un delito, debidamente exteriorizadas en el acta",
                "Que el operativo cuente con la presencia física in situ del Fiscal en turno",
                "Que el vehículo sea de procedencia extranjera o de otra provincia"
            ],
            correctIndex: 1,
            source: "CPP Santa Fe Ley 12.734, Art. 213: Requisa Vehicular sin Orden",
            explanation: "El Art. 213 exige motivos bastantes objetivos. La mera sospecha subjetiva sin exteriorización fáctica en el acta acarrea la nulidad del secuestro en juicio."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // INSPECTOR → SUBCOMISARIO (Narcomenudeo Ley 14.239, Armamento, Jefatura)
    // ═══════════════════════════════════════════════════════════════
    "inspector-subcomisario": [
        // --- NIVEL FÁCIL ---
        {
            id: "is-f01",
            difficulty: "facil",
            question: "¿Qué establece la Ley Provincial N° 14.239 sancionada en la Provincia de Santa Fe?",
            options: [
                "La desfederalización parcial de la competencia penal en materia de estupefacientes (microtráfico / narcomenudeo)",
                "La creación de una nueva Unidad Regional en el norte provincial",
                "Un nuevo estatuto de remuneraciones y adicionales",
                "La unificación de las comisarías con los juzgados comunales"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Inspector, Pág. 9: Ley N° 14.239 de Microtráfico",
            explanation: "La Ley 14.239 adhirió a la desfederalización (Ley 26.052), permitiendo que la Policía de Santa Fe y el MPA investiguen el narcomenudeo local."
        },
        {
            id: "is-f02",
            difficulty: "facil",
            question: "En la pistola reglamentaria Bersa Thunder / TPR 9mm, ¿cuál es la función de la palanca de desmartillado (decocker)?",
            options: [
                "Aumentar la cadencia de disparo a ráfaga",
                "Hacer descender o abatir el martillo de forma totalmente segura sin percutir el cartucho alojado en la recámara",
                "Trabar la corredera cuando se agotan los cartuchos del cargador",
                "Liberar el cargador vacío de la empuñadura"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 / Daypo Tiro - Palanca Decocker Bersa",
            explanation: "La palanca decocker desactiva el martillo de forma mecánica y segura, posicionando el arma en doble acción sin riesgo de disparo accidental."
        },
        {
            id: "is-f03",
            difficulty: "facil",
            question: "¿Cómo distingue la doctrina del ISEP los conceptos rectores de Mando, Comando y Conducción?",
            options: [
                "Mando es la autoridad moral (persuasión y respeto); Comando es la autoridad legal (regulada por leyes según grado y cargo); Conducción es la autoridad operacional (arte y ciencia de aplicar el comando a un problema policial)",
                "Los tres términos son exactamente lo mismo sin distinción legal",
                "Mando solo lo tienen los cabos; Comando los comisarios y Conducción los choferes de patrullero",
                "Mando es la fuerza física; Comando es el armamento y Conducción es el traslado de detenidos"
            ],
            correctIndex: 0,
            source: "Manual de Conducción Policial ISEP / Daypo Conducción 151",
            explanation: "El Mando se apoya en la autoridad moral; el Comando en la atribución legal del cargo; la Conducción es la aplicación técnica-operacional de ambos a la misión."
        },

        // --- NIVEL MEDIO ---
        {
            id: "is-m01",
            difficulty: "media",
            question: "En el marco de la Ley 14.239, ¿cuál es la diferencia técnica entre la tenencia simple (Art. 14 1° P. Ley 23.737) y la tenencia con fines de comercialización (Art. 5 inc. C)?",
            options: [
                "No hay diferencia procesal; ambas tienen idéntica escala penal",
                "La tenencia simple no exige acreditar el destino comercial, mientras que en el Art. 5 inc. C deben concurrir indicios unívocos de venta (fraccionamiento, balanza, dinero en baja denominación, envoltorios)",
                "La tenencia simple solo se investiga en la Justicia Federal y el Art. 5 en la Justicia Provincial",
                "La tenencia con fines de comercialización solo se configura si la sustancia supera los 10 kilogramos"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Inspector, Pág. 12-14: Tipos Penales de Microtráfico",
            explanation: "Para imputar el Art. 5 inc. C se requieren elementos objetivos que prueben la venta (fraccionamiento en dosis, balanzas, dinero menudo, anotaciones)."
        },
        {
            id: "is-m02",
            difficulty: "media",
            question: "En la estructura de las Unidades de Orden Público de Santa Fe, ¿cuál es la diferencia funcional entre una Comisaría y un Destacamento?",
            options: [
                "La Comisaría tiene funciones plenas de policía de seguridad y judicial dentro de su jurisdicción; el Destacamento depende de una comisaría y ejecuta funciones de seguridad y solo excepcionalmente policiales judiciales",
                "El Destacamento tiene mayor dotación de personal que una Comisaría",
                "La Comisaría solo atiende faltas de tránsito y el Destacamento delitos graves",
                "No existe diferencia, ambas tienen igual jerarquía de comando"
            ],
            correctIndex: 0,
            source: "Manual de Conducción Policial ISEP / Daypo Conducción 151",
            explanation: "La Comisaría es la unidad matriz de orden público (urbana o distrito rural); los destacamentos y puestos son extensiones territoriales dependientes con funciones acotadas."
        },
        {
            id: "is-m03",
            difficulty: "media",
            question: "¿Cuáles son las tres partes principales en que se divide formalmente una Orden de Operaciones (OO)?",
            options: [
                "Encabezamiento (jefatura, fecha, clave), Cuerpo (Situación, Misión, Ejecución, SPAC, Comando/Comunicaciones) y Final (instrucciones de acuse, anexos y firmas)",
                "Introducción, Desarrollo y Conclusión sin firmas",
                "Carátula, Índice y Bibliografía",
                "Parte diario, Nómina de personal y Planilla de combustible"
            ],
            correctIndex: 0,
            source: "Manual de Conducción Policial ISEP / Daypo Conducción 151",
            explanation: "La Orden de Operaciones policial responde a una estructura formal estricta: Encabezamiento, Cuerpo de 5 párrafos tácticos y Final de autenticación."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "is-d01",
            difficulty: "dificil",
            question: "Bajo la Ley 14.239, si en un procedimiento policial de narcomenudeo se descubren indicios de una organización narcocriminal transnacional o conexidad con lavado de activos federal, ¿qué principio procesal rige?",
            options: [
                "Principio de Primacía Federal: el Fiscal del MPA debe declinar la competencia y remitir las actuaciones y secuestros al Juzgado Federal correspondiente",
                "Principio de Inmunidad Provincial: la causa debe permanecer obligatoriamente en los tribunales provinciales",
                "Principio de Doble Juzgamiento: se instruyen dos causas paralelas por el mismo hecho de forma simultánea",
                "La causa se archiva por incompetencia manifiesta de la policía de seguridad"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Inspector, Pág. 11: Principio de Primacía Federal",
            explanation: "El principio de primacía federal ordena que ante la concurrencia de delitos de narcotráfico de mayor envergadura, la justicia federal atrae la investigación completa."
        },
        {
            id: "is-d02",
            difficulty: "dificil",
            question: "¿En qué consiste el 'Seguro Integral de Funcionamiento' de las pistolas semiautomáticas reglamentarias de la Policía de Santa Fe?",
            options: [
                "Un seguro manual externo que debe colocarse con la mano inhábil",
                "Un conjunto de sistemas pasivos internos (seguro de aguja percutora, seguro de caída y desconector de corredera) que impiden el disparo a menos que la cola del disparador sea accionada voluntariamente",
                "Una funda de plástico rígido con nivel de retención tres",
                "Un dispositivo electrónico que inhabilita el arma si se aleja del uniforme"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Inspector, Pág. 265: Seguro Integral de Funcionamiento",
            explanation: "El seguro pasivo bloquea mecánicamente la aguja percutora en todo momento, impidiendo disparos involuntarios por caídas o golpes."
        },
        {
            id: "is-d03",
            difficulty: "dificil",
            question: "Respecto a la requisa y secuestro de teléfonos celulares en allanamientos de microtráfico, ¿qué recaudo tecnológico de preservación forense exige el protocolo para evitar el borrado remoto de datos?",
            options: [
                "Dejar los teléfonos encendidos y conectados a la red Wi-Fi de la comisaría",
                "Colocar inmediatamente los dispositivos en Modo Avión o dentro de bolsas de Faraday (bloqueador de señal electromagnética) y registrar el estado de bloqueo",
                "Intentar adivinar el patrón de desbloqueo hasta 10 veces en el lugar",
                "Remitir los equipos por correo postal común sin precinto de seguridad"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Inspector, Evidencia Digital en Delitos Complejos",
            explanation: "El aislamiento electromagnético (bolsa de Faraday o modo avión) impide la recepción de señales de red que permitan a terceros borrar remotamente los mensajes y contactos."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // SUBCOMISARIO → COMISARIO (Políticas Públicas, Vocería, Decreto 461/15)
    // ═══════════════════════════════════════════════════════════════
    "subcomisario-comisario": [
        // --- NIVEL FÁCIL ---
        {
            id: "sc-f01",
            difficulty: "facil",
            question: "Según el Manual ISEP para Subcomisarios, ¿cuál es la diferencia entre 'Poder de Policía' y 'Policía'?",
            options: [
                "El Poder de Policía es la potestad legislativa de regular derechos para el bien común; la Policía es el órgano ejecutivo que aplica dicha regulación en el terreno",
                "Ambos términos son sinónimos absolutos sin distinción jurídica",
                "Poder de Policía es el armamento y Policía son los uniformados",
                "Poder de Policía solo lo tiene la Policía Federal Argentina"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Subcomisario, Pág. 19: Policía y Poder de Policía",
            explanation: "El Poder de Policía radica en el Estado (Poder Legislativo) para limitar derechos; la Policía es la fuerza ejecutiva que cumple y hace cumplir la norma."
        },
        {
            id: "sc-f02",
            difficulty: "facil",
            question: "¿Qué norma provincial regula el Régimen Disciplinario Policial en la Provincia de Santa Fe?",
            options: [
                "El Decreto Provincial N° 461/15",
                "El Código de Comercio",
                "La Ley de Contrato de Trabajo N° 20.744",
                "El Reglamento General de Tiro Federal"
            ],
            correctIndex: 0,
            source: "Decreto Provincial 461/15 - Régimen Disciplinario Policial de Santa Fe",
            explanation: "El Decreto 461/15 es el marco legal que tipifica las faltas leves y graves, las sanciones y el procedimiento sumarial del personal policial de Santa Fe."
        },

        // --- NIVEL MEDIO ---
        {
            id: "sc-m01",
            difficulty: "media",
            question: "En la relación profesional del personal superior con la prensa y medios de comunicación, ¿cuál es la pauta rectora sobre los comentarios 'Off the Record'?",
            options: [
                "Evitar terminantemente los comentarios 'Off the Record', mantener una vocería oficial única y no discriminar a ningún medio de prensa",
                "Filtrar datos extraoficiales a periodistas amigos para obtener mejor cobertura",
                "Dar nombres de víctimas fatales antes de que sean notificadas sus familias",
                "Permitir que los cronistas ingresen a la zona de exclusión de peritajes"
            ],
            correctIndex: 0,
            source: "Manual de Comunicación Institucional ISEP / Daypo Comunicación",
            explanation: "La doctrina de vocería policial prohíbe el 'Off the Record' ya que genera trascendidos no verificables y puede quebrar el secreto sumarial."
        },
        {
            id: "sc-m02",
            difficulty: "media",
            question: "En el marco del Decreto 461/15, ¿cuáles son las sanciones expulsivas que pueden aplicarse al personal policial tras la instrucción de un sumario administrativo?",
            options: [
                "Apercibimiento y llamada de atención",
                "Cesantía y Exoneración",
                "Suspensión de empleo por 5 días",
                "Pase a comisión de servicio"
            ],
            correctIndex: 1,
            source: "Decreto 461/15, Art. 12 y conc.: Sanciones Expulsivas",
            explanation: "La cesantía y la exoneración son las dos sanciones de máxima gravedad que extinguen la relación de empleo policial, reservándose la exoneración para las causales más afrentosas con pérdida de beneficios."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "sc-d01",
            difficulty: "dificil",
            question: "Conforme a la Ley 12.521 y el Decreto 461/15, ¿cuál es el límite de días de arresto que puede aplicar por sí mismo un Jefe de Unidad Regional a un oficial subordinado sin requerir elevación a Jefatura de Provincia?",
            options: [
                "Hasta treinta (30) días de arresto",
                "Hasta sesenta (60) días de arresto",
                "Hasta diez (10) días de arresto exclusivamente",
                "Solo tiene facultades de apercibimiento verbal"
            ],
            correctIndex: 0,
            source: "Decreto 461/15 - Competencia Sancionatoria de Jefaturas de Unidad Regional",
            explanation: "El Decreto 461/15 faculta al Jefe de Unidad Regional a sancionar con arresto hasta un máximo de 30 días en el ámbito de su jurisdicción."
        },
        {
            id: "sc-d02",
            difficulty: "dificil",
            question: "En el diseño de una política pública de seguridad preventiva por cuadrículas, ¿qué elemento metodológico distingue a un objetivo SMART según la doctrina ISEP?",
            options: [
                "Que sea un deseo genérico de reducción del delito a largo plazo",
                "Que sea Específico, Medible, Alcanzable, Relevante y con un Plazo temporal determinado con indicadores de gestión verificables",
                "Que cuente con presupuesto ilimitado aprobado por decreto",
                "Que sea secreto y no pueda ser auditado por organismos civiles"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subcomisario, Pág. 12: Elementos de Políticas Públicas",
            explanation: "Los objetivos SMART permiten evaluar el impacto real y la reducción del delito mediante indicadores métricos y plazos de control estricto."
        },
        {
            id: "sc-d03",
            difficulty: "dificil",
            question: "¿Bajo qué causal taxativa contemplada en el Decreto 461/15 se configura la sanción de exoneración directa sin posibilidad de reintegro futuro a la fuerza?",
            options: [
                "La acumulación de tres llegadas tarde injustificadas en el año",
                "La condena judicial penal firme por delitos cometidos en el ejercicio de la función pública o que afecten gravemente el decoro y la ética institucional",
                "El extravío culposo de un chaleco balístico durante una persecución",
                "La solicitud voluntaria de pase a disponibilidad por razones particulares"
            ],
            correctIndex: 1,
            source: "Decreto 461/15 - Causales de Exoneración Policial",
            explanation: "La exoneración es la máxima sanción moral y jurídica, derivada de condenas penales dolosas que destruyen de raíz la idoneidad moral exigible a un policía."
        }
    ],

    // ═══════════════════════════════════════════════════════════════
    // COMISARIO → COMISARIO SUPERVISOR / DIRECTOR (Alta Dirección)
    // ═══════════════════════════════════════════════════════════════
    "comisario-supervisor": [
        // --- NIVEL FÁCIL ---
        {
            id: "cs-f01",
            difficulty: "facil",
            question: "¿Qué instrumento deben presentar obligatoriamente los aspirantes al Agrupamiento Supervisión y Dirección en el concurso ISEP?",
            options: [
                "Un Proyecto de Gestión Institucional aplicable a la seguridad pública provincial",
                "Únicamente una carta de recomendación política",
                "Una declaración jurada de bienes sin examen escrito",
                "Un examen psicofísico básico sin defensa de tesis"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Guía de Proyectos de Gestión Institucional",
            explanation: "Para los grados superiores (Comisario Supervisor y Director) el concurso exige un proyecto de gestión institucional defendido ante el tribunal evaluador."
        },
        {
            id: "cs-f02",
            difficulty: "facil",
            question: "¿Qué significa el concepto de 'Gobernanza de la Seguridad' en la formación de la alta oficialidad del ISEP?",
            options: [
                "Que solo la policía armada tiene voz y voto en la seguridad comunitaria",
                "La articulación estratégica e interinstitucional entre el poder político, la policía, la justicia y la comunidad ciudadana",
                "El control exclusivo de las cárceles por parte de oficiales superiores",
                "La privatización total de los servicios policiales adicionales"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Alta Dirección: Gobernanza Democrática",
            explanation: "La gobernanza moderna implica la coproducción de la seguridad entre Estado, fuerzas policiales y ciudadanía bajo control civil y democrático."
        },

        // --- NIVEL MEDIO ---
        {
            id: "cs-m01",
            difficulty: "media",
            question: "¿Cuál es el rol institucional del Comisario Supervisor en la articulación con el Ministerio de Justicia y Seguridad?",
            options: [
                "Coordinar la implementación táctica de las políticas públicas y directivas ministeriales de seguridad en el territorio asignado",
                "Manejar el presupuesto ministerial de forma independiente y autónoma",
                "Redactar las leyes de presupuesto provincial en la Legislatura",
                "Subrogar a los jueces de primera instancia en causas penales"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Alta Dirección y Conducción Estratégica",
            explanation: "El Agrupamiento Supervisión es el nexo directo de conducción estratégica entre las decisiones del Ministerio y la ejecución operativa en las Unidades Regionales."
        },
        {
            id: "cs-m02",
            difficulty: "media",
            question: "En la planificación presupuestaria de una Unidad Regional, ¿qué concepto financiero abarca los rubros de mantenimiento de flota, racionamiento y combustible?",
            options: [
                "Gastos de Funcionamiento Operativo y Bienes de Consumo",
                "Sueldos básicos de la plana mayor",
                "Fondos reservados del Poder Judicial",
                "Ingresos brutos comunales"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Gestión de Recursos Públicos en Unidades Regionales",
            explanation: "Los fondos de funcionamiento operativo sostienen la operatividad cotidiana de patrulleros, comisarías y comisarías móviles en el territorio."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "cs-d01",
            difficulty: "dificil",
            question: "En la evaluación de un Proyecto de Gestión Institucional para ascenso a Director de Policía, ¿qué componente de la matriz de marco lógico determina la viabilidad operativa y la medición de resultados?",
            options: [
                "El cronograma de licencias de la plana mayor",
                "Los Indicadores Clave de Desempeño (KPIs), las fuentes de verificación objetivas y la gestión de riesgos y supuestos críticos",
                "El monto global de horas de policía adicional asignadas",
                "La cantidad de móviles fuera de servicio en el taller de la Unidad Regional"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Guía Elaboración Proyectos Agrupamiento Dirección",
            explanation: "Los proyectos de nivel Dirección se evalúan mediante KPIs medibles, fuentes de verificación auditables y análisis de supuestos y riesgos operacionales."
        },
        {
            id: "cs-d02",
            difficulty: "dificil",
            question: "Ante una auditoría del Tribunal de Cuentas o del Ministerio de Seguridad por fondos de funcionamiento y adicionales, ¿cuál es la responsabilidad patrimonial del Jefe de Unidad Regional según la ley de administración pública provincial?",
            options: [
                "No posee responsabilidad patrimonial porque el personal policial está exento de rendiciones",
                "Responsabilidad solidaria y directa por la legalidad, comprobantes respaldatorios y correcta afectación de los fondos públicos asignados a su comando",
                "La responsabilidad recae exclusivamente en el habilitado de la administración contable",
                "Solo responde patrimonialmente si media condena penal firme por peculado"
            ],
            correctIndex: 1,
            source: "Ley de Administración Financiera de Santa Fe y Doctrina ISEP de Alta Dirección",
            explanation: "El titular de la Unidad de Organización posee responsabilidad administrativa y patrimonial por los caudales públicos administrados bajo su mando."
        },
        {
            id: "cs-d03",
            difficulty: "dificil",
            question: "¿Cómo se formula un 'Indicador de Impacto' en la gestión de seguridad pública estratégica a diferencia de un simple indicador de actividad?",
            options: [
                "Midiendo la cantidad de patrulleros que salieron a la calle en un turno determinado",
                "Midiendo la variación porcentual de delitos violentos o la tasa de resolución en un período comparativo contra la línea de base histórica",
                "Contando la cantidad de hojas impresas en la oficina de sumarios",
                "Registrando la cantidad de combustible consumido por cada dependencia"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Metodología de Planificación y Control de Gestión",
            explanation: "El indicador de actividad mide tareas realizadas (ej. patrullajes); el indicador de impacto mide el efecto real sobre la ciudadanía (reducción de homicidios o robos)."
        }
    ]
};

// ═══════════════════════════════════════════════════════════════
// METADATA DEL BANCO DE PREGUNTAS
// ═══════════════════════════════════════════════════════════════
window.quizBankMeta = {
    version: "5.0.0",
    lastUpdated: "2026-10-19",
    totalQuestions: Object.values(window.quizBank).reduce((acc, arr) => acc + arr.length, 0),
    difficulties: [
        { id: "facil", title: "Fácil (Repaso Inicial)", desc: "Conceptos clave, definiciones claras y principios rectores", icon: "sentiment_satisfied", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", badge: "🟢 FÁCIL" },
        { id: "media", title: "Media (Procedimientos Operativos)", desc: "Actuaciones de calle, guardia, L.C.A.T., menores y narcomenudeo", icon: "psychology", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", badge: "🟡 MEDIA" },
        { id: "dificil", title: "Difícil (Nivel Concurso ISEP)", desc: "Plazos procesales estrictos, artículos específicos, causales y distractores jurídicos", icon: "military_tech", color: "text-red-400 bg-red-500/10 border-red-500/30", badge: "🔴 DIFÍCIL" }
    ],
    hierarchies: [
        { 
            id: "simulacro-integral", 
            title: "Simulacro General ISEP (Todas las Materias)", 
            icon: "auto_stories", 
            color: "from-blue-600 via-indigo-600 to-purple-700", 
            desc: "Evaluación integral con preguntas de Tiro, Conducción, Comunicación, Informática y Leyes",
            programSyllabus: "Tiro MIRAF · Conducción Policial · Seguridad de la Información · CPP Ley 12.734 · Microtráfico Ley 14.239 · Jurados Ley 14.258"
        },
        { 
            id: "oficial-subinspector", 
            title: "Oficial → Subinspector", 
            icon: "military_tech", 
            color: "from-blue-600 to-indigo-700", 
            desc: "Práctica policial, Tiro MIRAF (Balística y SUL), Actas CPP (Art. 138), Preservación y Convivencia",
            programSyllabus: "Módulo I: Práctica Policial, Tiro y Armamento MIRAF, Primer Preventor, Código de Conducta ONU y Código de Convivencia"
        },
        { 
            id: "subinspector-inspector", 
            title: "Subinspector → Inspector", 
            icon: "shield_person", 
            color: "from-emerald-600 to-teal-700", 
            desc: "Liderazgo, Seguridad de la Información (Tríada CID), Comunicación, LCAT y Jurados",
            programSyllabus: "Liderazgo Operativo, Seguridad de la Información e Incidentes, Niñez Ley 12.967, L.C.A.T. y Juicio por Jurados (Ley 14.258)"
        },
        { 
            id: "inspector-subcomisario", 
            title: "Inspector → Subcomisario", 
            icon: "admin_panel_settings", 
            color: "from-amber-600 to-orange-700", 
            desc: "Narcomenudeo (Ley 14.239), Conducción de Comisarías y Orden Público, Pistola Bersa 9mm",
            programSyllabus: "Desfederalización y Microtráfico, Conducción de Comisarías y Destacamentos, Órdenes de Operaciones y Armamento"
        },
        { 
            id: "subcomisario-comisario", 
            title: "Subcomisario → Comisario", 
            icon: "stars", 
            color: "from-purple-600 to-indigo-800", 
            desc: "Políticas de seguridad por cuadrículas, Vocería y Prensa sin 'Off The Record', Decreto 461/15",
            programSyllabus: "Poder de Policía, Vocería Policial ante Medios Masivos, Régimen Disciplinario Decreto 461/15 y Sanciones"
        },
        { 
            id: "comisario-supervisor", 
            title: "Comisario → Com. Supervisor / Director", 
            icon: "workspace_premium", 
            color: "from-amber-500 to-purple-700", 
            desc: "Proyectos de Gestión Institucional SMART, KPIs y Auditoría de Gestión",
            programSyllabus: "Metodología de Marco Lógico, Indicadores Clave (KPIs), Alta Dirección y Responsabilidad Patrimonial"
        }
    ]
};
