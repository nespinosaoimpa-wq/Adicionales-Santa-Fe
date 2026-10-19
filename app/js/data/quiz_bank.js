/**
 * Adicionales Santa Fe - Banco de Preguntas ISEP 2026 Profesional
 * Simulador de Examen de Ascenso Policial Oficial
 * 
 * Contenido extraído directamente de los manuales oficiales de cada jerarquía:
 * - Oficial -> Subinspector: Práctica policial, CPP Ley 12.734, Código de Convivencia, Preservación y primer preventor.
 * - Subinspector -> Inspector: Pequeños grandes líderes, Crisis subjetivas (Ley 26.657), Niñez (Ley 12.967), L.C.A.T., Juicio por Jurados (Ley 14.258).
 * - Inspector -> Subcomisario: Desfederalización y Narcomenudeo en Santa Fe (Ley Provincial 14.239 / Ley 23.737), Armamento Bersa Thunder 9mm Pro, Desmartillado, Libros Matrices de Comisaría.
 * - Subcomisario -> Comisario: Políticas públicas de seguridad por cuadrículas, Poder de policía y límites constitucionales, Comunicación en crisis y vocería ante prensa, Régimen Disciplinario Decreto 461/15.
 * - Comisario -> Com. Supervisor / Director: Gestión estratégica, Proyectos SMART, Metodología de Marco Lógico, Auditoría patrimonial y KPIs policiales.
 * 
 * Modalidades de Dificultad:
 * - 'facil': Conceptos fundamentales, definiciones y principios del manual.
 * - 'media': Procedimientos técnico-operativos de guardia, calle y actas.
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
            question: "¿Qué elementos de bioseguridad mínimos debe vestir obligatoriamente el personal autorizado para ingresar al perímetro interno de la escena?",
            options: [
                "Guantes de nitrilo/látex y cubrecalzados",
                "Únicamente chaleco balístico y gorra policial",
                "Barbijo quirúrgico sin necesidad de guantes",
                "Campera refractaria y linterna de alta potencia"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Oficial, Pág. 26: Criminalística de Campo",
            explanation: "Para evitar la contaminación cruzada biológica (ADN, huellas del calzado propio), es obligatorio el uso de guantes y cubrecalzados."
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
            question: "¿En cuál de las siguientes situaciones de revista contempladas en la Ley 12.521 el personal policial pasa a percibir el 50% de sus haberes y retiene su estado policial pero sin portación de arma?",
            options: [
                "Disponibilidad por sumario administrativo grave cuando se dispone cautelarmente el pase a situación pasiva o retención de arma",
                "Servicio efectivo durante el uso de licencia médica menor a 30 días",
                "Disponibilidad simple a la espera de designación de nuevo destino por menos de 60 días",
                "Licencia anual ordinaria acumulada de dos períodos"
            ],
            correctIndex: 0,
            source: "Ley 12.521 - Estatuto del Personal Policial, Art. 52 y conc.: Situaciones de Revista",
            explanation: "En la situación pasiva o disponibilidad con retención preventiva dispuesta en el sumario administrativo, se reduce el haber al 50% y se retira el armamento reglamentario."
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
            question: "En una requisa personal en la vía pública sin orden judicial previa (Art. 213 CPP Santa Fe), ¿qué requisito de fundamentación sustantiva debe constar en el acta para superar el test de validez constitucional?",
            options: [
                "La constatación de que la persona vestía prendas holgadas y mirada evasiva únicamente",
                "La exteriorización precisa de circunstancias previas objetivas que razonablemente justifiquen la presunción de que porta consigo efectos provenientes de un delito o cosas que sirvieron para cometerlo",
                "La sola mención de que se encontraba en una zona considerada de alta conflictividad por el mapa delictivo",
                "Que la persona carezca de documento nacional de identidad al momento del chequeo"
            ],
            correctIndex: 1,
            source: "CPP Santa Fe Ley 12.734, Art. 213 y Fallos Corte Suprema sobre Requisa Policial",
            explanation: "La doctrina jurisprudencial exige motivos bastantes objetivos y concordantes; la mera sospecha subjetiva sin base fáctica acarrea la nulidad de la requisa y el secuestro."
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
            question: "¿Qué ley nacional regula el marco de actuación ante situaciones de salud mental y crisis subjetivas?",
            options: [
                "Ley Nacional de Salud Mental N° 26.657",
                "Ley de Tránsito N° 24.449",
                "Ley de Seguridad Interior N° 24.059",
                "Ley de Estupefacientes N° 23.737"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Subinspector, Pág. 14: Marco Normativo Salud Mental",
            explanation: "La Ley 26.657 establece los derechos de las personas en padecimientos mentales y el rol sanitario interdisciplinario."
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
            question: "En materia de L.C.A.T., cuando el conductor de un vehículo involucrado presenta aliento etílico evidente pero se niega a realizar el test de alcoholemia, ¿qué temperamento corresponde adoptar?",
            options: [
                "Obligarlo físicamente mediante el uso de la fuerza a soplar la pipeta",
                "Asentar la negativa expresa en el acta ante testigos, requerir extracción de sangre/orina dispuesta por el Fiscal o examen clínico por médico de policía",
                "Dejarlo retirarse conduciendo al no poder medirse los gramos de alcohol",
                "Aplicarle una sanción de arresto contravencional directo en el móvil"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subinspector, Procedimiento en Siniestros Viales y Alcoholemia",
            explanation: "Ante la negativa, se deja constancia formal en presencia de testigos y se convoca al médico policial para diagnóstico clínico del estado de intoxicación con directiva fiscal."
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
        },
        {
            id: "si-d03",
            difficulty: "dificil",
            question: "Bajo la Ley Provincial 12.967 de Protección Integral de los Derechos de Niñas, Niños y Adolescentes, ¿cuál es el límite temporal máximo para que la policía mantenga demorado a un adolescente punible (16 a 17 años) antes de resolver su situación?",
            options: [
                "Hasta 12 horas improrrogables, debiendo notificar de inmediato a la defensa técnica y al Juzgado de Menores / Fiscal de Menores",
                "Hasta 72 horas corridas en el calabozo común de la comisaría",
                "Hasta 5 días para averiguación de antecedentes",
                "No existe límite temporal mientras los padres no se presenten a retirarlo"
            ],
            correctIndex: 0,
            source: "Ley 12.967 y Régimen Penal Juvenil de Santa Fe",
            explanation: "La privación de libertad cautelar de un menor es excepcionalísima; la policía debe dar intervención inmediata a la justicia juvenil y no puede retenerlo más allá del plazo perentorio legal."
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
            question: "En la pistola reglamentaria Bersa Thunder 9mm Pro, ¿cuál es la función de la palanca de desmartillado (decocker)?",
            options: [
                "Aumentar la cadencia de disparo a ráfaga",
                "Hacer descender el martillo de forma totalmente segura sin percutir el cartucho alojado en recámara",
                "Trabar la corredera cuando se agotan los cartuchos del cargador",
                "Liberar el cargador vacío de la empuñadura"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Inspector, Pág. 262: Armamento y Palanca de Desmartillado",
            explanation: "La palanca decocker desactiva el martillo de forma mecánica y segura, posicionando el arma en doble acción sin riesgo de disparo accidental."
        },
        {
            id: "is-f03",
            difficulty: "facil",
            question: "¿Cuál es el órgano judicial provincial competente para investigar los delitos de microtráfico bajo la Ley 14.239?",
            options: [
                "El Ministerio Público de la Acusación (MPA)",
                "La Justicia Federal con asiento en Rosario o Santa Fe",
                "Los Juzgados Comunales de Pequeñas Causas",
                "El Tribunal de Cuentas de la Provincia"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Inspector, Pág. 10: Competencia MPA en Narcomenudeo",
            explanation: "A partir de la Ley 14.239, los fiscales del MPA asumen la dirección de las investigaciones por venta minorista de estupefacientes en territorio santafesino."
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
            question: "¿Qué libros son de llevanza obligatoria y custodia estricta bajo responsabilidad del Jefe o Subjefe de Comisaría?",
            options: [
                "Libro de Guardia, Libro de Detenidos, Registro de Armamento y Munición, y Libro de Efectos Secuestrados",
                "Únicamente el Libro de Asistencia de Personal",
                "Solo las carpetas de correspondencia interna",
                "El libro contable de la Asociación Cooperadora Policial exclusivamente"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Inspector, Gestión de Dependencias Policiales",
            explanation: "El titular de la dependencia responde administrativa y penalmente por la inviolabilidad y actualización de los libros matrices de guardia, detenidos, secuestros y armas."
        },
        {
            id: "is-m03",
            difficulty: "media",
            question: "En la cadena de custodia de sustancias estupefacientes secuestradas en un punto de venta (boca de expendio), ¿qué procedimiento técnico es inexcusable?",
            options: [
                "Pesar la sustancia, realizar test orientativo de campo ante dos testigos civiles, rotular, precintar en sobre de seguridad con firmas y remitir a laboratorio forense",
                "Guardar la sustancia en el escritorio de la guardia hasta el día de la audiencia",
                "Entregar las muestras directamente a los denunciantes anónimos",
                "Destruir la sustancia en el lugar sin análisis químico previo"
            ],
            correctIndex: 0,
            source: "Manual ISEP 2026 - Inspector, Protocolo de Cadena de Custodia de Estupefacientes",
            explanation: "El test de reactivos de campo y el pesaje ante testigos, junto con el precintado numerado, garantizan la inalterabilidad probatoria de la evidencia química."
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
            question: "En una situación de crisis operativa con toma de rehenes o conmoción comunitaria, ¿cuál es la regla fundamental de la vocería policial ante la prensa?",
            options: [
                "Brindar de inmediato los nombres de las víctimas y familiares para tranquilizar a la población",
                "Centralizar la vocería en un portavoz calificado, transmitir información oficial confirmada, no revelar tácticas de intervención y preservar la intimidad de las víctimas",
                "Permitir el libre acceso de periodistas al sector de negociación para mayor transparencia",
                "Negarse a toda comunicación y apagar los teléfonos institucionales"
            ],
            correctIndex: 1,
            source: "Manual ISEP 2026 - Subcomisario, Pág. 134: Comunicación en Situaciones Críticas",
            explanation: "La gestión de vocería profesional exige información precisa, sin comprometer el éxito de la intervención táctica ni violar el secreto sumarial."
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
    version: "4.0.0",
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
            desc: "Evaluación transversal con preguntas de todos los programas oficiales",
            programSyllabus: "CPP Ley 12.734 · Microtráfico Ley 14.239 · Juicio por Jurados Ley 14.258 · Dec. 461/15 · Gestión SMART"
        },
        { 
            id: "oficial-subinspector", 
            title: "Oficial → Subinspector", 
            icon: "military_tech", 
            color: "from-blue-600 to-indigo-700", 
            desc: "Práctica policial, CPP Ley 12.734 (Art. 138), Preservación del hecho y Convivencia",
            programSyllabus: "Módulo I: Práctica Policial, Código de Conducta ONU, Primer Preventor, Actas procesales y Código de Convivencia"
        },
        { 
            id: "subinspector-inspector", 
            title: "Subinspector → Inspector", 
            icon: "shield_person", 
            color: "from-emerald-600 to-teal-700", 
            desc: "Liderazgo ('Pequeños Grandes Líderes'), Crisis Subjetivas, Menores, LCAT y Juicio por Jurados",
            programSyllabus: "Liderazgo Operativo, Ley de Salud Mental 26.657, Ley de Niñez 12.967, L.C.A.T. y Juicio por Jurados (Ley 14.258)"
        },
        { 
            id: "inspector-subcomisario", 
            title: "Inspector → Subcomisario", 
            icon: "admin_panel_settings", 
            color: "from-amber-600 to-orange-700", 
            desc: "Narcomenudeo (Ley 14.239), Pistola Bersa 9mm y desmartillado, Libros de Comisaría",
            programSyllabus: "Desfederalización y Microtráfico, Ley 23.737, Armamento y Palanca Decocker, Libros Matrices de Dependencia"
        },
        { 
            id: "subcomisario-comisario", 
            title: "Subcomisario → Comisario", 
            icon: "stars", 
            color: "from-purple-600 to-indigo-800", 
            desc: "Políticas de seguridad pública por cuadrículas, Vocería en crisis, Decreto 461/15",
            programSyllabus: "Poder de Policía, Vocería Policial en Situaciones Críticas, Régimen Disciplinario Decreto 461/15 y Sanciones"
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
