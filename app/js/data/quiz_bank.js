/**
 * Adicionales Santa Fe - Banco de Preguntas ISEP 2026 Profesional
 * Simulador de Examen de Ascenso Policial Oficial
 * 
 * v6.0.0 - DISTRACTORES EQUILIBRADOS
 * Todas las opciones tienen longitud y nivel de detalle similares.
 * Las incorrectas son plausibles y técnicas para evitar adivinación por descarte visual.
 * 
 * Contenido basado en manuales oficiales ISEP 2026 y exámenes reales Daypo:
 * - Tiro y Armamento Policial (MIRAF, Bersa Thunder/TPR, Balística, Posición SUL)
 * - Seguridad de la Información (Tríada CID, Protocolo de 5 pasos, Incidentes y Redes)
 * - Comunicación y Redacción Institucional (Prensa, Asertividad 7C, Lenguaje llano)
 * - Conducción Policial y Orden Público (Mando, Comando, Conducción, OO, Inspecciones)
 * - Leyes y Procedimiento (CPP Ley 12.734, Narcomenudeo Ley 14.239, Jurados Ley 14.258, Dec. 461/15, Ley 12.521)
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
                "Obediencia, Disciplina, Valentía y Lealtad institucional",
                "Prudencia, Justicia, Fortaleza y Templanza",
                "Eficiencia, Rapidez, Control operativo y Mando efectivo",
                "Respeto jerárquico, Orden, Comando de zona y Firmeza operativa"
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
                "Resolución 34/169 de la Asamblea General de la ONU (1979)",
                "Convenio 169 de la Organización Internacional del Trabajo (1989)",
                "Protocolo Adicional II de los Convenios de Ginebra de 1949",
                "Estatuto de Roma de la Corte Penal Internacional de 1998"
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
                "Zona de Ingreso controlado y Zona de Egreso supervisado por testigos civiles",
                "Perímetro de Tránsito vehicular y Perímetro Vecinal restringido a civiles",
                "Perímetro Interno (Zona de Exclusión) y Perímetro Externo (Zona de Seguridad)",
                "Área de evidencia primaria y Área de contención perimetral secundaria"
            ],
            correctIndex: 2,
            source: "Manual ISEP 2026 - Oficial, Pág. 22: Preservación del Lugar del Hecho",
            explanation: "El sistema de doble cordón define un Perímetro Interno exclusivo para peritos forenses y un Perímetro Externo para seguridad y apoyo."
        },
        {
            id: "os-f04",
            difficulty: "facil",
            question: "¿Qué tipo de falta disciplinaria constituye el desaliño en el uniforme o una tardanza menor sin justificar según el Decreto 461/15?",
            options: [
                "Falta Leve, sancionable con apercibimiento o arresto menor",
                "Falta Grave, sancionable con suspensión o pase a disponibilidad",
                "Falta Gravísima, causal de instrucción de sumario administrativo",
                "Irregularidad administrativa, causal de anotación en legajo personal"
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
                "El Jefe de la Comisaría jurisdiccional que asume la conducción operativa del procedimiento",
                "El perito forense de la policía científica designado para el relevamiento de indicios",
                "El Fiscal del Ministerio Público de la Acusación que dirige la investigación penal"
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
                "El cargador metálico reglamentario con capacidad de 15 cartuchos calibre 9mm",
                "El dispositivo de puntería nocturna tritio que equipa al arma de dotación",
                "La vaina servida que se expulsa del arma tras la percusión del fulminante"
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
                "Siempre cargada y lista para disparar, aun cuando se crea que está descargada",
                "Descargada mientras tenga el seguro manual colocado y el cargador retirado",
                "Inofensiva si el portador se encuentra dentro de una dependencia policial",
                "Segura si se verificó visualmente al inicio del turno en la formación diaria"
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
                "Secuestrar de inmediato las vainas servidas, fotografiarlas y embalarlas para la cadena de custodia",
                "Priorizar el auxilio médico y resguardo de la vida, coordinando el 107 y fijando la posición de indicios",
                "Esperar la llegada del Fiscal del MPA para recibir instrucciones antes de actuar en la escena",
                "Tomar declaración testimonial detallada a los vecinos presentes antes de que se retiren del lugar"
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
                "Artículos 138, 139 y concordantes del CPP (Ley 12.734) sobre formalidades de actas",
                "Artículos 212 y 213 del CPP (Ley 12.734) sobre allanamientos y requisas de personas",
                "Artículos 40 y 41 del Código Penal sobre determinación de la pena por el tribunal",
                "Artículos 10 y 11 de la Ley 12.521 sobre derechos y deberes del personal policial"
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
                "Mecánica, visual y táctil, habiendo retirado previamente el cargador del arma",
                "Auditiva, ponderal y electrónica, utilizando el instrumental de la armería central",
                "Fotográfica, digital y testimonial, con certificación del oficial de guardia diurna",
                "Documental, radioscópica e instrumental, según protocolo de la policía científica"
            ],
            correctIndex: 0,
            source: "Manual MIRAF / Daypo Tiro - Verificación de Tres Vías",
            explanation: "La verificación reglamentaria exige retirar el cargador, ciclar la corredera y comprobar de forma mecánica, visual y táctil que la recámara y el alvéolo estén vacíos."
        },
        {
            id: "os-m04",
            difficulty: "media",
            question: "Según el Código de Convivencia de Santa Fe, ¿cuál es el plazo para poner a disposición del Juez Comunitario a un contraventor demorado?",
            options: [
                "Inmediatamente, no pudiendo superar las 24 horas desde la demora efectiva",
                "Dentro de las 48 horas hábiles contadas a partir de la comunicación formal",
                "En el plazo de 72 horas corridas desde el labrado del acta contravencional",
                "Dentro de los 5 días hábiles siguientes con informe médico de aptitud legal"
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
                "Permite el ingreso sin restricción si el operativo tiene al menos cuatro efectivos uniformados presentes",
                "Faculta el ingreso si media persecución ininterrumpida y el sujeto se introdujo para ocultarse (Art. 212 CPP)",
                "Autoriza el ingreso únicamente si el propietario autoriza verbalmente la entrada frente a un testigo civil",
                "Prohíbe terminantemente el ingreso y obliga a establecer un cerco perimetral hasta la orden judicial"
            ],
            correctIndex: 1,
            source: "CPP Santa Fe Ley 12.734, Art. 212: Allanamiento sin Orden en Flagrancia",
            explanation: "El Art. 212 del CPP autoriza el allanamiento sin orden judicial previa ante flagrancia y persecución ininterrumpida o auxilio por peligro inminente para la vida."
        },
        {
            id: "os-m06",
            difficulty: "media",
            question: "¿Qué es la 'Posición SUL' en el tiro táctico policial y cuál es su finalidad operativa?",
            options: [
                "Una posición de retención donde el arma está pegada al pecho con codos cerrados y cañón al suelo",
                "Una posición de tiro prono que se adopta para disparar desde el suelo con apoyo de codos en terreno",
                "Una postura de puntería a dos manos donde los brazos se extienden completamente a la altura del pecho",
                "Una técnica de desenfunde veloz donde el arma pasa del talabarte a la línea de fuego en un movimiento"
            ],
            correctIndex: 0,
            source: "Manual MIRAF / Daypo Conducción y Tiro - Posiciones Tácticas",
            explanation: "La posición SUL (originada en Brasil) permite desplazarse en recintos cerrados o multitudes manteniendo el cañón en zona neutra y segura sin encañonar a terceros."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "os-d01",
            difficulty: "dificil",
            question: "Conforme al Art. 138 del CPP de Santa Fe, ¿en qué supuesto excepcional el acta de procedimiento policial puede ser válida sin la presencia de dos testigos civiles?",
            options: [
                "En casos de extrema urgencia o imposibilidad fundada de hallar testigos por peligro o desolación del lugar",
                "En ningún caso; la falta de dos testigos acarrea siempre la nulidad insanable de todo lo actuado",
                "Cuando el procedimiento se realice en horario nocturno comprendido entre las 22:00 y las 06:00 horas",
                "Siempre que el personal preventor cuente con la anuencia verbal directa del Fiscal de turno del MPA"
            ],
            correctIndex: 0,
            source: "CPP Santa Fe Ley 12.734, Art. 138 in fine: Excepción de Testigos",
            explanation: "El Art. 138 in fine autoriza a prescindir de testigos solo por razones fundadas de urgencia o peligro grave, dejándolo expresamente asentado para evitar la nulidad."
        },
        {
            id: "os-d02",
            difficulty: "dificil",
            question: "Según el Art. 214 del CPP de Santa Fe, ¿cuál es el plazo legal perentorio que tiene la policía para comunicar al Fiscal del MPA la aprehensión de una persona?",
            options: [
                "Inmediatamente y sin dilación, no pudiendo exceder en ningún caso las seis (6) horas",
                "Dentro de las doce (12) horas corridas posteriores al momento de la detención efectiva",
                "Dentro de las veinticuatro (24) horas hábiles siguientes contadas desde el acta labrada",
                "Al momento de remitir el sumario prevenicional concluido dentro de las 72 horas corridas"
            ],
            correctIndex: 0,
            source: "CPP Santa Fe Ley 12.734, Art. 214: Plazo de Comunicación de Aprehensión",
            explanation: "El Art. 214 establece que la aprehensión debe comunicarse de forma inmediata al fiscal, con un tope infranqueable de 6 horas."
        },
        {
            id: "os-d03",
            difficulty: "dificil",
            question: "¿Qué rama de la balística estudia el comportamiento del proyectil dentro del arma desde la percusión hasta que abandona la boca del cañón?",
            options: [
                "Balística Interior, que analiza deflagración, presión de gases y estriado dentro del ánima",
                "Balística Exterior, que analiza la trayectoria parabólica del proyectil fuera del cañón",
                "Balística de Efectos (Terminal), que analiza el impacto del proyectil sobre el objetivo final",
                "Balística Comparativa (Identificativa), que analiza la marca de rayas y campos del proyectil"
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
                "30 días corridos para las faltas leves y seis (6) meses para las faltas graves",
                "90 días hábiles para las faltas leves y un (1) año corrido para las graves",
                "120 días corridos para las faltas leves y tres (3) años para las faltas graves"
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
                "Cinco (5) años corridos contados desde la fecha de emisión del documento",
                "Tres (3) años corridos con renovación obligatoria y examen psicofísico",
                "Diez (10) años corridos para personal de fuerzas de seguridad en actividad",
                "Dos (2) años corridos con revalidación anual ante la autoridad de aplicación"
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
                "Al personal recién egresado de la escuela de oficiales en su primer destino operativo",
                "A los mandos medios y primeros supervisores de patrulla que modelan la conducta del personal",
                "A los directores generales de las Unidades Regionales que supervisan la estrategia global",
                "A los instructores de la Escuela de Policía que forman a los futuros oficiales iniciales"
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
                "Preservar la vida e integridad del causante y terceros, conteniendo y solicitando asistencia médica",
                "Reducir físicamente al causante con técnicas de inmovilización y sujeción mecánica reglamentaria",
                "Trasladarlo inmediatamente a la dependencia policial más cercana para confeccionar el informe",
                "Documentar la situación mediante filmación y fotografía para elevar al juzgado competente"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Subinspector, Pág. 16: Crisis Subjetiva - Abordaje",
            explanation: "Bajo la Ley de Salud Mental y doctrina ISEP, la crisis subjetiva es una emergencia sanitaria que requiere contención, distancia y auxilio médico, no criminalización."
        },
        {
            id: "si-f03",
            difficulty: "facil",
            question: "¿Cuáles son los componentes de la tríada fundamental de la Seguridad de la Información (Tríada CID)?",
            options: [
                "Confidencialidad, Integridad y Disponibilidad (más Autenticidad como complemento)",
                "Control de accesos, Identificación biométrica y Defensa perimetral de redes",
                "Cifrado asimétrico, Inspección de paquetes y Detección de intrusiones en red",
                "Contingencia operativa, Incidentes reportados y Datos clasificados por nivel"
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
                "Leer, comprender y memorizar el texto con rapidez y exactitud por cualquier destinatario",
                "Archivar, clasificar y recuperar expedientes de acuerdo a la normativa de mesa de entradas",
                "Firmar, sellar y foliar mecánicamente cada foja del actuado conforme a la reglamentación",
                "Imprimir, digitalizar y remitir los legajos al archivo histórico de la Unidad Regional"
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
                "La inspección ocular detallada y el croquis planimétrico con medidas, sentido y punto de impacto",
                "La sentencia judicial provisoria de culpabilidad indicando al conductor responsable del siniestro",
                "La cotización pericial de los daños materiales en cada vehículo involucrado en el hecho vial",
                "La suspensión cautelar del carnet de conducir de todos los conductores involucrados en el hecho"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Subinspector, Pág. 25: Procedimientos L.C.A.T.",
            explanation: "En hechos de L.C.A.T. es deber del preventor labrar la inspección ocular y el croquis acotado para elevar a fiscalía y peritos viales."
        },
        {
            id: "si-m02",
            difficulty: "media",
            question: "¿Qué recaudo legal es obligatorio al intervenir en la demora de un menor de 16 años (no punible penalmente)?",
            options: [
                "No esposarlo salvo riesgo inminente, examinarlo médicamente y dar intervención a la Secretaría de Niñez",
                "Alojarlo transitoriamente en la celda de contraventores de la comisaría hasta la audiencia del juez",
                "Tomarle declaración indagatoria formal en la oficina de guardia con presencia de un letrado público",
                "Registrar sus datos biométricos en el sistema CODIS y remitirlos al Registro Provincial de Menores"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Subinspector, Pág. 18: Procedimiento con Menores",
            explanation: "La ley de niñez y el manual ISEP prohíben alojar menores en calabozos, exigen certificado médico y articulación con los organismos de niñez locales."
        },
        {
            id: "si-m03",
            difficulty: "media",
            question: "¿Cuál es la diferencia principal entre 'Seguridad Informática' y 'Seguridad de la Información'?",
            options: [
                "La seguridad informática protege computadoras y redes; la de la información protege datos, procesos y personas",
                "La seguridad informática abarca exclusivamente la protección de documentos impresos en soporte papel",
                "Son conceptos idénticos sin ninguna distinción técnica ni operativa en la doctrina contemporánea",
                "La seguridad de la información se ocupa solamente de la encriptación de comunicaciones por radio policial"
            ],
            correctIndex: 0,
            source: "Manual ISEP - Seguridad de la Información / Daypo Informática",
            explanation: "La seguridad informática es un subsistema técnico; la seguridad de la información es un concepto abarcativo que involucra políticas, personas, infraestructura y datos en cualquier soporte."
        },
        {
            id: "si-m04",
            difficulty: "media",
            question: "En la resolución policial de conflictos interpersonales, ¿en base a qué enfoque se obtienen los acuerdos más sostenibles según la doctrina de comunicación?",
            options: [
                "Gestionando y negociando en base a los intereses y necesidades reales de las partes involucradas",
                "Imponiendo la solución exclusivamente mediante el ejercicio del poder legal de coerción estatal",
                "Aplicando el protocolo de mediación formal obligatoria regulado por el Código Procesal Civil vigente",
                "Derivando el conflicto íntegramente al juzgado comunitario sin intervención policial de ninguna clase"
            ],
            correctIndex: 0,
            source: "Manual ISEP - Gestión del Conflicto / Daypo Comunicación",
            explanation: "El modelo de negociación colaborativa enseña que las soluciones más sostenibles a largo plazo surgen de trabajar sobre los intereses de fondo y no sobre posiciones de poder."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "si-d01",
            difficulty: "dificil",
            question: "Con la implementación del Juicio por Jurados en Santa Fe (Ley 14.258), ¿cuál es el rol del funcionario policial que comparece como testigo en el debate?",
            options: [
                "Debe declarar oralmente con base en su percepción directa, usando actas solo para refrescar memoria",
                "Puede leer íntegramente las actas policiales durante su testimonio sin responder preguntas cruzadas",
                "Su testimonio oral queda excluido porque el jurado civil solo valora pruebas periciales de laboratorio",
                "Declara por escrito mediante informe jurado remitido al presidente del tribunal antes de la audiencia"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Subinspector, Pág. 159: Juicio por Jurados en Santa Fe (Ley 14.258)",
            explanation: "En el sistema de Juicio por Jurados rige la oralidad pura; las actas no ingresan por lectura directa sino a través del testimonio oral del efectivo policial."
        },
        {
            id: "si-d02",
            difficulty: "dificil",
            question: "¿Cuál es el procedimiento inicial estándar de cinco pasos ante un incidente de seguridad de la información en una dependencia policial?",
            options: [
                "1. Identificar, 2. Aislar el sistema, 3. Notificar autoridades, 4. No comprometer evidencia, 5. Registrar",
                "1. Apagar todos los equipos, 2. Formatear discos afectados, 3. Reinstalar sistema operativo, 4. Notificar, 5. Archivar",
                "1. Publicar alerta interna, 2. Cambiar contraseñas globales, 3. Restaurar backup, 4. Auditar red, 5. Sancionar",
                "1. Desconectar internet, 2. Trasladar equipos a armería, 3. Solicitar peritaje externo, 4. Labrar acta, 5. Informar"
            ],
            correctIndex: 0,
            source: "Manual ISEP - Protocolo ante Incidentes / Daypo Informática",
            explanation: "El protocolo de 5 pasos asegura la contención del ataque, preserva la evidencia digital forense y permite la trazabilidad del incidente."
        },
        {
            id: "si-d03",
            difficulty: "dificil",
            question: "En una requisa vehicular sin orden judicial en la vía pública (Art. 213 CPP Santa Fe), ¿qué requisito sustantivo exige la jurisprudencia para su validez?",
            options: [
                "La existencia de circunstancias previas objetivas que justifiquen la presunción de transporte delictivo",
                "Que el conductor presente antecedentes penales computables registrados en el sistema informático policial",
                "Que el operativo cuente con la presencia física in situ del Fiscal de turno del Ministerio Público",
                "Que el vehículo tenga las chapas patentes visiblemente adulteradas o la verificación técnica vencida"
            ],
            correctIndex: 0,
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
                "La desfederalización parcial de la competencia penal en materia de narcomenudeo",
                "La creación de una nueva Unidad Regional de policía en el norte de la provincia",
                "Un nuevo régimen de remuneraciones y adicionales para el personal de seguridad",
                "La reforma integral del Código Procesal Penal de la Provincia de Santa Fe"
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
                "Hacer descender el martillo de forma segura sin percutir el cartucho en recámara",
                "Trabar la corredera automáticamente cuando se agota el último cartucho del cargador",
                "Liberar el cargador vacío de la empuñadura para su recambio por uno completo",
                "Activar el sistema de puntería nocturna tritio incorporado en la corredera del arma"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 / Daypo Tiro - Palanca Decocker Bersa",
            explanation: "La palanca decocker desactiva el martillo de forma mecánica y segura, posicionando el arma en doble acción sin riesgo de disparo accidental."
        },
        {
            id: "is-f03",
            difficulty: "facil",
            question: "¿Cómo distingue la doctrina del ISEP los conceptos rectores de Mando, Comando y Conducción?",
            options: [
                "Mando es autoridad moral; Comando es autoridad legal por grado; Conducción es el arte de aplicar ambos",
                "Mando es la fuerza de la ley; Comando es la capacidad de combate; Conducción es la logística operativa",
                "Mando es exclusivo de oficiales superiores; Comando de subalternos; Conducción de agentes civiles",
                "Mando es la capacidad táctica; Comando es la planificación estratégica; Conducción es la formación policial"
            ],
            correctIndex: 0,
            source: "Manual de Conducción Policial ISEP / Daypo Conducción 151",
            explanation: "El Mando se apoya en la autoridad moral; el Comando en la atribución legal del cargo; la Conducción es la aplicación técnica-operacional de ambos a la misión."
        },

        // --- NIVEL MEDIO ---
        {
            id: "is-m01",
            difficulty: "media",
            question: "En el marco de la Ley 14.239, ¿cuál es la diferencia técnica entre la tenencia simple (Art. 14) y la tenencia con fines de comercialización (Art. 5 inc. C)?",
            options: [
                "La tenencia simple no exige acreditar destino comercial; el Art. 5 inc. C requiere indicios de venta",
                "La tenencia simple solo se investiga en la Justicia Federal; el Art. 5 inc. C en la Justicia Provincial",
                "No hay diferencia procesal entre ambas figuras ya que tienen idéntica escala penal establecida por ley",
                "La tenencia con fines de comercialización solo se configura si la sustancia supera los 5 kilogramos"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Inspector, Pág. 12-14: Tipos Penales de Microtráfico",
            explanation: "Para imputar el Art. 5 inc. C se requieren elementos objetivos que prueben la venta (fraccionamiento en dosis, balanzas, dinero menudo, anotaciones)."
        },
        {
            id: "is-m02",
            difficulty: "media",
            question: "En la estructura de las Unidades de Orden Público de Santa Fe, ¿cuál es la diferencia funcional entre una Comisaría y un Destacamento?",
            options: [
                "La Comisaría tiene funciones plenas de policía de seguridad y judicial; el Destacamento funciones acotadas",
                "El Destacamento tiene mayor dotación de personal y autonomía operativa que una Comisaría jurisdiccional",
                "La Comisaría solo atiende faltas contravencionales de tránsito; el Destacamento investiga delitos graves",
                "No existe diferencia funcional entre ambas dependencias ya que tienen igual jerarquía de comando"
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
                "Encabezamiento, Cuerpo (Situación, Misión, Ejecución, SPAC, Comando) y Final con firmas y anexos",
                "Introducción operativa, Desarrollo táctico pormenorizado y Conclusión con evaluación de resultados",
                "Carátula institucional, Índice numerado de contenidos y Bibliografía normativa de referencia",
                "Parte diario de novedades, Nómina de personal afectado y Planilla de combustible y logística"
            ],
            correctIndex: 0,
            source: "Manual de Conducción Policial ISEP / Daypo Conducción 151",
            explanation: "La Orden de Operaciones policial responde a una estructura formal estricta: Encabezamiento, Cuerpo de 5 párrafos tácticos y Final de autenticación."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "is-d01",
            difficulty: "dificil",
            question: "Bajo la Ley 14.239, si en un procedimiento de narcomenudeo se descubren indicios de una organización narcocriminal transnacional, ¿qué principio procesal rige?",
            options: [
                "Principio de Primacía Federal: el Fiscal debe declinar y remitir al Juzgado Federal competente",
                "Principio de Inmunidad Provincial: la causa permanece obligatoriamente en tribunales de Santa Fe",
                "Principio de Acumulación: se instruyen dos causas paralelas, una federal y otra provincial simultánea",
                "Principio de Prevención: la jurisdicción corresponde al tribunal que primero tomó conocimiento del hecho"
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
                "Un conjunto de sistemas pasivos internos que impiden el disparo sin acción voluntaria del disparador",
                "Un seguro manual externo bilateral ubicado en la corredera que se opera con la mano inhábil",
                "Una funda de retención nivel III con doble sistema de traba que envuelve completamente el arma",
                "Un dispositivo electrónico RFID integrado en la empuñadura que inhabilita el arma a distancia"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Inspector, Pág. 265: Seguro Integral de Funcionamiento",
            explanation: "El seguro pasivo bloquea mecánicamente la aguja percutora en todo momento, impidiendo disparos involuntarios por caídas o golpes."
        },
        {
            id: "is-d03",
            difficulty: "dificil",
            question: "En el secuestro de teléfonos celulares en allanamientos de microtráfico, ¿qué recaudo forense evita el borrado remoto de datos?",
            options: [
                "Colocar los dispositivos en Modo Avión o dentro de bolsas de Faraday y registrar su estado",
                "Dejar los teléfonos encendidos y conectados a la red Wi-Fi de la dependencia policial",
                "Intentar desbloquear los equipos con hasta diez combinaciones posibles en el mismo lugar",
                "Remitir los equipos por correo certificado al laboratorio forense sin precinto de cadena"
            ],
            correctIndex: 0,
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
                "Poder de Policía es la potestad legislativa de regular derechos; Policía es el órgano que la ejecuta",
                "Poder de Policía es la capacidad de detención; Policía es la institución que administra las cárceles",
                "Ambos términos son sinónimos jurídicos sin distinción conceptual en la doctrina constitucional",
                "Poder de Policía es la fuerza física coactiva; Policía es la estructura administrativa del Ministerio"
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
                "El Decreto Provincial N° 461/15 sobre faltas, sanciones y procedimiento sumarial",
                "La Ley Provincial N° 12.521 sobre el Escalafón y Carrera del Personal Policial",
                "El Código de Convivencia Provincial N° 10.703 sobre faltas contravencionales civiles",
                "La Ley Provincial N° 14.239 sobre Narcomenudeo y Desfederalización de Estupefacientes"
            ],
            correctIndex: 0,
            source: "Decreto Provincial 461/15 - Régimen Disciplinario Policial de Santa Fe",
            explanation: "El Decreto 461/15 es el marco legal que tipifica las faltas leves y graves, las sanciones y el procedimiento sumarial del personal policial de Santa Fe."
        },

        // --- NIVEL MEDIO ---
        {
            id: "sc-m01",
            difficulty: "media",
            question: "En la relación profesional del personal superior con la prensa, ¿cuál es la pauta rectora sobre los comentarios 'Off the Record'?",
            options: [
                "Evitar terminantemente los comentarios 'Off the Record' y mantener una vocería oficial única",
                "Utilizar el 'Off the Record' estratégicamente para generar agenda favorable en medios aliados",
                "Permitir comentarios extraoficiales solamente si el periodista firma un acuerdo de confidencialidad",
                "Derivar todas las consultas periodísticas sin excepción al jefe de prensa del Ministerio provincial"
            ],
            correctIndex: 0,
            source: "Manual de Comunicación Institucional ISEP / Daypo Comunicación",
            explanation: "La doctrina de vocería policial prohíbe el 'Off the Record' ya que genera trascendidos no verificables y puede quebrar el secreto sumarial."
        },
        {
            id: "sc-m02",
            difficulty: "media",
            question: "En el marco del Decreto 461/15, ¿cuáles son las sanciones expulsivas que pueden aplicarse al personal policial?",
            options: [
                "Cesantía y Exoneración, que extinguen la relación de empleo policial de forma definitiva",
                "Suspensión de empleo por 90 días y Retiro obligatorio con pérdida de la antigüedad",
                "Apercibimiento público con anotación en legajo y llamada de atención por acta interna",
                "Pase a comisión de servicio y traslado disciplinario a otra Unidad Regional provincial"
            ],
            correctIndex: 0,
            source: "Decreto 461/15, Art. 12 y conc.: Sanciones Expulsivas",
            explanation: "La cesantía y la exoneración son las dos sanciones de máxima gravedad que extinguen la relación de empleo policial."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "sc-d01",
            difficulty: "dificil",
            question: "Conforme a la Ley 12.521 y el Decreto 461/15, ¿cuál es el límite de días de arresto que puede aplicar un Jefe de Unidad Regional sin elevación a Jefatura de Provincia?",
            options: [
                "Hasta treinta (30) días de arresto dentro del ámbito de su jurisdicción territorial",
                "Hasta sesenta (60) días de arresto con informe fundado al Director General de Policía",
                "Hasta diez (10) días de arresto exclusivamente para personal subalterno y de ejecución",
                "Hasta quince (15) días de arresto con comunicación simultánea al Ministerio de Seguridad"
            ],
            correctIndex: 0,
            source: "Decreto 461/15 - Competencia Sancionatoria de Jefaturas de Unidad Regional",
            explanation: "El Decreto 461/15 faculta al Jefe de Unidad Regional a sancionar con arresto hasta un máximo de 30 días en el ámbito de su jurisdicción."
        },
        {
            id: "sc-d02",
            difficulty: "dificil",
            question: "En el diseño de una política pública de seguridad preventiva por cuadrículas, ¿qué elemento metodológico distingue a un objetivo SMART?",
            options: [
                "Que sea Específico, Medible, Alcanzable, Relevante y con un Plazo temporal determinado",
                "Que sea Sistemático, Modular, Auditable, Replicable y Trazable en cada etapa del proceso",
                "Que sea Social, Multidimensional, Adaptativo, Resiliente y Transversal a todas las áreas",
                "Que sea Sintético, Metódico, Articulado, Racionalizado y Técnicamente fundamentado en datos"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Subcomisario, Pág. 12: Elementos de Políticas Públicas",
            explanation: "Los objetivos SMART permiten evaluar el impacto real y la reducción del delito mediante indicadores métricos y plazos de control estricto."
        },
        {
            id: "sc-d03",
            difficulty: "dificil",
            question: "¿Bajo qué causal del Decreto 461/15 se configura la sanción de exoneración directa sin posibilidad de reintegro a la fuerza?",
            options: [
                "La condena penal firme por delitos en ejercicio de la función o que afecten gravemente la ética institucional",
                "La acumulación de tres sanciones de arresto por faltas leves durante el mismo año calendario",
                "El extravío culposo de material bélico durante una persecución vehicular de alta velocidad",
                "La solicitud voluntaria de pase a disponibilidad por razones particulares de índole familiar"
            ],
            correctIndex: 0,
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
                "Una carta de recomendación formal avalada por tres oficiales superiores en actividad",
                "Una declaración jurada de bienes patrimoniales sin examen escrito ni defensa oral",
                "Un examen psicofísico integral básico sin presentación de proyecto ni defensa de tesis"
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
                "La articulación estratégica entre el poder político, la policía, la justicia y la comunidad ciudadana",
                "El control exclusivo de los centros penitenciarios provinciales por parte de la oficialidad superior",
                "La privatización total de los servicios de policía adicional bajo supervisión del sector empresarial",
                "La centralización de todas las decisiones de seguridad en una única autoridad policial provincial"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Alta Dirección: Gobernanza Democrática",
            explanation: "La gobernanza moderna implica la coproducción de la seguridad entre Estado, fuerzas policiales y ciudadanía bajo control civil y democrático."
        },

        // --- NIVEL MEDIO ---
        {
            id: "cs-m01",
            difficulty: "media",
            question: "¿Cuál es el rol institucional del Comisario Supervisor en la articulación con el Ministerio de Justicia y Seguridad?",
            options: [
                "Coordinar la implementación táctica de las políticas públicas y directivas ministeriales en el territorio",
                "Manejar el presupuesto ministerial de forma independiente, autónoma y sin rendición de cuentas",
                "Redactar los proyectos de ley de presupuesto provincial para su tratamiento en la Legislatura",
                "Subrogar a los jueces de primera instancia en causas penales complejas con múltiples imputados"
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
                "Gastos de Funcionamiento Operativo y Bienes de Consumo para la operatividad cotidiana",
                "Sueldos básicos y complementarios de la plana mayor y personal subalterno de la unidad",
                "Fondos reservados del Poder Judicial asignados mediante resolución de la Corte Suprema",
                "Ingresos brutos comunales recaudados por la municipalidad para convenios de seguridad"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Gestión de Recursos Públicos en Unidades Regionales",
            explanation: "Los fondos de funcionamiento operativo sostienen la operatividad cotidiana de patrulleros, comisarías y comisarías móviles en el territorio."
        },

        // --- NIVEL DIFÍCIL (NIVEL CONCURSO ISEP) ---
        {
            id: "cs-d01",
            difficulty: "dificil",
            question: "En un Proyecto de Gestión Institucional para ascenso a Director de Policía, ¿qué componente del marco lógico determina la viabilidad y medición de resultados?",
            options: [
                "Los Indicadores Clave de Desempeño (KPIs), fuentes de verificación y gestión de riesgos críticos",
                "El cronograma de licencias anuales de la plana mayor y las dotaciones mínimas de cada guardia",
                "El monto global de horas de policía adicional asignadas a los objetivos protegidos en el trimestre",
                "La cantidad de móviles fuera de servicio registrados en el taller mecánico de la Unidad Regional"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Guía Elaboración Proyectos Agrupamiento Dirección",
            explanation: "Los proyectos de nivel Dirección se evalúan mediante KPIs medibles, fuentes de verificación auditables y análisis de supuestos y riesgos operacionales."
        },
        {
            id: "cs-d02",
            difficulty: "dificil",
            question: "Ante una auditoría del Tribunal de Cuentas por fondos de funcionamiento, ¿cuál es la responsabilidad patrimonial del Jefe de Unidad Regional?",
            options: [
                "Responsabilidad solidaria y directa por la legalidad y correcta afectación de los fondos asignados",
                "No posee responsabilidad patrimonial porque el personal policial está exento de rendiciones contables",
                "La responsabilidad recae exclusivamente en el habilitado de la administración contable subordinado",
                "Solo responde patrimonialmente si media condena penal firme por peculado o malversación dolosa"
            ],
            correctIndex: 0,
            source: "Ley de Administración Financiera de Santa Fe y Doctrina ISEP de Alta Dirección",
            explanation: "El titular de la Unidad de Organización posee responsabilidad administrativa y patrimonial por los caudales públicos administrados bajo su mando."
        },
        {
            id: "cs-d03",
            difficulty: "dificil",
            question: "¿Cómo se formula un 'Indicador de Impacto' en la gestión de seguridad pública a diferencia de un indicador de actividad?",
            options: [
                "Midiendo la variación porcentual de delitos o la tasa de resolución contra la línea de base histórica",
                "Contando la cantidad de patrulleros que salieron a la calle en cada turno de guardia del período",
                "Registrando la cantidad de combustible consumido por cada dependencia policial en el mes calendario",
                "Sumando la cantidad de hojas impresas y actuaciones labradas en la oficina de sumarios del distrito"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Metodología de Planificación y Control de Gestión",
            explanation: "El indicador de actividad mide tareas realizadas (ej. patrullajes); el indicador de impacto mide el efecto real sobre la ciudadanía (reducción de homicidios o robos)."
        }
    ]
};

// ═══════════════════════════════════════════════════════════════
// METADATA DEL BANCO DE PREGUNTAS
// ═══════════════════════════════════════════════════════════════
window.quizBankMeta = {
    version: "6.0.0",
    lastUpdated: "2026-10-21",
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
