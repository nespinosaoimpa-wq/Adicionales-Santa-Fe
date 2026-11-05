/**
 * Adicionales Santa Fe - Banco de Preguntas ISEP 2026 Profesional
 * Simulador de Examen de Ascenso Policial Oficial
 * 
 * v8.1.0 - BANCO EXPANDIDO: MÓDULO SUBOFICIAL A OFICIAL INCORPORADO
 * - Más de 770 preguntas oficiales rigurosamente categorizadas por Jerarquía y Dificultad.
 * - Basado al 100% en los manuales de cursado ISEP 2026, decretos provinciales y exámenes reales de ascenso:
 *   • MANUAL DE ESTUDIO PERFECCIONAMIENTO SUBOFICIAL (ISEP 2026 - 273 págs.)
 *   • Escena del Crimen, RPI, 7 Preguntas de Oro, Locard y Perímetros de Seguridad
 *   • Tiro y Armamento Policial (MIRAF, Bersa TPR9/Thunder Pro, Balística, Posición SUL)
 *   • Código Procesal Penal de Santa Fe (Ley 12.734: flagrancia, requisas, allanamientos y actas)
 *   • Régimen Disciplinario Policial (Decreto 461/15 y Ley 12.521: faltas, arresto y recursos)
 *   • Microtráfico y Narcomenudeo (Ley 14.239: desfederalización y cadena de custodia)
 *   • Regla de Tueller (21 pies / 6,4 m), empleo de la fuerza y Carta Iberoamericana
 *   • Redacción de Actas de Procedimiento, Notas y Partes de Novedades
 *   • Informática Policial (LibreOffice Writer, Calc, Ciberseguridad y Google Drive)
 *   • Inteligencia Emocional, empatía y desescalada de conflictos
 * 
 * Modalidades de Dificultad:
 * - 'facil': Conceptos clave, definiciones doctrinarias y principios rectores del manual.
 * - 'media': Procedimientos técnico-operativos de calle, guardia, tiro y toma de decisiones.
 * - 'dificil': Nivel concurso ISEP real (plazos procesales exactos, causales de nulidad, sanciones y artículos específicos).
 */

window.quizBank = {
    "suboficial-oficial": [
        {
            "id": "so-001",
            "difficulty": "facil",
            "question": "¿Cuál es el principio fundamental de la Criminalística postulado por Edmond Locard en 1910?",
            "options": [
                "Principio de Correspondencia: el daño mecánico siempre es idéntico al elemento utilizado",
                "Principio de Inocencia: todo imputado es inocente hasta sentencia firme",
                "Principio de Inmutabilidad: las huellas dactilares nunca cambian con el tiempo",
                "Principio de Intercambio: el autor deja indicios en el lugar y se lleva rastros del mismo"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 7",
            "explanation": "El Principio de Intercambio de Edmond Locard establece que cuando dos objetos entran en contacto, siempre hay una transferencia mutua de materia entre el autor, la víctima y el lugar del hecho."
        },
        {
            "id": "so-002",
            "difficulty": "facil",
            "question": "¿Cuáles son las conocidas 'Siete Preguntas de Oro' de la investigación criminalística según el manual?",
            "options": [
                "Qué ley se violó, Cuándo prescribe, Quién denuncia, Quién detiene, Dónde se aloja, Cómo y Con qué",
                "Quién es el juez, Quién es el fiscal, Dónde ocurrió, Cuántos disparos hubo, Quién vio, Cuándo y Por qué",
                "Qué, Quién, Cómo, Cuándo, Dónde, Con qué y Por qué",
                "Dónde, Cuándo, Por orden de quién, Con qué testigos, A qué hora, Cuánto y Para qué"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 8",
            "explanation": "Las 7 preguntas fundamentales son: ¿Qué sucedió? ¿Quién lo cometió o fue víctima? ¿Cómo ocurrió? ¿Cuándo fue? ¿Dónde tuvo lugar? ¿Con qué instrumentos se ejecutó? y ¿Por qué motivo o móvil se produjo?"
        },
        {
            "id": "so-003",
            "difficulty": "media",
            "question": "¿Cómo se delimita y qué función cumple la 'Zona Interior Crítica' en la preservación del lugar del hecho?",
            "options": [
                "Área para estacionamiento exclusivo de los móviles policiales y ambulancias de traslado",
                "Zona externa donde el personal de guardia realiza la identificación preventiva de transeúntes",
                "Sector donde se ubican los familiares y medios de prensa para brindar conferencias informativas",
                "Área donde se concentran las evidencias físicas directas; acceso restringido exclusivamente a peritos y médico forense"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 24-25",
            "explanation": "La Zona Interior Crítica es el perímetro primario que contiene el cuerpo y las evidencias materiales; ningún funcionario no pericial debe ingresar para evitar contaminación por el Principio de Intercambio."
        },
        {
            "id": "so-004",
            "difficulty": "dificil",
            "question": "En el lugar del hecho, ¿cuál es el método de búsqueda criminalística más recomendado para espacios abiertos y amplios como campos o descampados?",
            "options": [
                "Método de espiral excéntrica desde el centro hacia afuera",
                "Método de punto a punto aleatorio según criterio visual del preventor",
                "Método de franjas o líneas paralelas con avance sincronizado de los inspectores",
                "Método radial circular exclusivo para recintos cerrados"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 27",
            "explanation": "El método de franjas o líneas permite un rastrillaje exhaustivo y coordinado en grandes superficies abiertas sin dejar zonas muertas sin inspeccionar."
        },
        {
            "id": "so-005",
            "difficulty": "facil",
            "question": "¿Cuáles son los tres postulados científicos universales en los que se fundamenta la Dactiloscopía para la identificación humana?",
            "options": [
                "Elasticidad, Visibilidad y Homogeneidad genética",
                "Simetría, Profundidad epidérmica y Regeneración celular",
                "Linearidad, Proporcionalidad y Correspondencia anatómica",
                "Perennidad, Inmutabilidad y Diversidad (o Variedad infinita)"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 12",
            "explanation": "La dactiloscopía se basa en que las papilas se forman en el cuarto mes de vida intrauterina y duran hasta la descomposición (perennidad), no cambian sus dibujos (inmutabilidad) y son únicas en cada individuo (diversidad)."
        },
        {
            "id": "so-006",
            "difficulty": "media",
            "question": "Según el Art. 268 del CPP de Santa Fe (Ley 12.734), ¿cuál es el primer deber del preventor policial al arribar al lugar del hecho?",
            "options": [
                "Tomar declaración testimonial jurada al imputado en el móvil",
                "Proceder al secuestro inmediato de armas sin confeccionar acta ni croquis",
                "Convocar obligatoriamente a los medios de comunicación para transparentar la labor",
                "Prestar inmediato auxilio a las víctimas y asegurar la escena para evitar la alteración de rastros"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 17-19",
            "explanation": "El Art. 268 inc. 1 y 2 del CPP obliga al personal policial a prestar auxilio prioritario a los heridos y asegurar la conservación del lugar del hecho y de los elementos materiales del delito."
        },
        {
            "id": "so-007",
            "difficulty": "dificil",
            "question": "¿Qué establece el Art. 260 del Código Procesal Penal respecto a la formalidad y validez de las actuaciones policiales de prevención?",
            "options": [
                "Determina la nulidad absoluta de todo procedimiento si el testigo es menor de 21 años",
                "Exige firma obligatoria de un escribano público para convalidar el acta en sede judicial",
                "Las actuaciones de prevención no exigirán formalidades sacramentales, pero deberán consignar lugar, fecha, hora, personas intervinientes y circunstancias relevantes",
                "Prohíbe terminantemente el uso de croquis ilustrativo o fotografías complementarias"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 19-20 / CPP Art. 260",
            "explanation": "El Art. 260 del CPP consagra la flexibilidad formal pero exige rigurosa precisión en circunstancias de tiempo, lugar, personas y relatos fácticos para garantizar el derecho de defensa."
        },
        {
            "id": "so-008",
            "difficulty": "media",
            "question": "Al embalar prendas con presuntas manchas de sangre húmeda en la escena del hecho, ¿cuál es la pauta técnica correcta de preservación?",
            "options": [
                "Guardarlas inmediatamente en bolsa plástica hermética sellada al vacío",
                "Lavar con agua fría para aislar los glóbulos rojos antes del envío al laboratorio",
                "Dejarlas secar a temperatura ambiente bajo sombra y luego embalar en bolsa de papel madera permeable",
                "Aplicar alcohol etílico al 70% para evitar la putrefacción de las bacterias"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 29-30",
            "explanation": "Las evidencias biológicas húmedas nunca deben confinarse en bolsas plásticas porque la humedad produce hongos que destruyen el ADN; deben secarse a la sombra y guardarse en papel transpirable."
        },
        {
            "id": "so-009",
            "difficulty": "facil",
            "question": "¿Qué delimita la 'Zona Intermedia' en el esquema de tres perímetros de preservación policial?",
            "options": [
                "El área de comando operativo, descanso pericial, depósito de instrumental y enlace con autoridades",
                "La zona exterior abierta al tránsito vehicular y transporte público",
                "El lugar exacto donde cayó el cuerpo de la víctima y los casquillos",
                "El sector donde se encierra a los sospechosos aprehendidos para su requisa"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 24-25",
            "explanation": "La Zona Intermedia rodea a la zona crítica y sirve como buffer de seguridad donde opera el jefe de servicio, la logística, los peritos antes de ingresar y los equipos de apoyo."
        },
        {
            "id": "so-010",
            "difficulty": "dificil",
            "question": "Conforme al Art. 270 y 271 del CPP de Santa Fe, ¿cuál es la relación funcional de la policía frente al Ministerio Público de la Acusación (MPA)?",
            "options": [
                "Dependencia exclusiva de las instrucciones directas del Juez de Paz comunal",
                "Subordinación jerárquica al Ministerio de Justicia de la Nación en todas las causas",
                "Subordinación funcional y jurídica a las directivas del Fiscal en la Investigación Penal Preparatoria",
                "Autonomía operativa absoluta e independencia decisoria frente a los magistrados judiciales"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 33",
            "explanation": "En el sistema acusatorio santafesino, la policía actúa como auxiliar subordinada a la dirección jurídica y fáctica de los fiscales del MPA durante toda la IPP."
        },
        {
            "id": "so-011",
            "difficulty": "media",
            "question": "En criminalística, ¿qué diferencia sustancial existe entre un 'indicio' y una 'evidencia'?",
            "options": [
                "El indicio lo aporta el testigo civil y la evidencia es exclusiva de los peritos de parte",
                "El indicio solo existe en delitos dolosos y la evidencia en delitos culposos",
                "No existe ninguna diferencia técnica ni jurídica entre ambos términos",
                "El indicio es una señal o vestigio probable que requiere peritaje; la evidencia es el indicio ya analizado y vinculado científicamente al hecho"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 15-16",
            "explanation": "El indicio es todo objeto o marca perceptible que sugiere una relación con el hecho (elemento orientador). Al comprobarse fehacientemente su nexo causal mediante pericia científica, adquiere el rango de evidencia."
        },
        {
            "id": "so-012",
            "difficulty": "facil",
            "question": "¿Quién es el único funcionario facultado para modificar o levantar los perímetros de seguridad en la escena del hecho?",
            "options": [
                "Cualquier periodista acreditado en la Unidad Regional",
                "El testigo presencial de mayor edad en el vecindario",
                "El conductor del móvil policial que llegó primero",
                "El Coordinador o Perito de Criminalística a cargo con conocimiento del Fiscal interviniente"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 25",
            "explanation": "El manual establece que los peritos criminalísticos y el coordinador del relevamiento son quienes disponen la ampliación, reducción o levantamiento final del perímetro resguardado."
        },
        {
            "id": "so-013",
            "difficulty": "media",
            "question": "Cuando se debe trasladar de urgencia a una persona herida desde el lugar del hecho, ¿qué constancia debe asentar el preventor policial?",
            "options": [
                "Únicamente el nombre de pila de la persona herida sin registrar hora ni destino",
                "El pronóstico médico definitivo emitido por el chofer del móvil sanitario",
                "Datos de la ambulancia, matrícula, médico interviniente, hospital de destino y posición original de la víctima",
                "La renuncia formal de la víctima a iniciar acciones penales"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 23",
            "explanation": "El personal policial debe registrar con exactitud la unidad sanitaria, móvil, profesional a cargo, centro de salud receptor y demarcar o fotografiar la posición en que yacía la víctima antes del auxilio."
        },
        {
            "id": "so-014",
            "difficulty": "dificil",
            "question": "¿Qué establece el Principio de Correspondencia de Características en balística y accidentología?",
            "options": [
                "La velocidad del impacto es siempre proporcional a la masa del proyectil",
                "Las huellas de frenada corresponden exclusivamente al peso del eje trasero del vehículo",
                "Todo disparo de arma de fuego produce exactamente la misma trayectoria balística en cualquier condición",
                "La acción de un agente vulnerable deja impresas sus características morfológicas particulares sobre el cuerpo o superficie que impacta"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 7-8",
            "explanation": "El principio de correspondencia demuestra que las irregularidades y marcas particulares del agente vulnerante (ej. estrías de un cañón o huellas de calzado) se reproducen en el soporte de impacto."
        },
        {
            "id": "so-015",
            "difficulty": "facil",
            "question": "Según el modelo de Daniel Goleman adoptado por el ISEP, ¿cuál de los siguientes es un componente esencial de la Inteligencia Emocional?",
            "options": [
                "Autoconocimiento y Autorregulación emocional",
                "Imposición de autoridad mediante castigos ejemplares",
                "Memoria fotográfica y velocidad de tipeo en actas",
                "Supresión absoluta de sentimientos y frialdad psicológica"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Inteligencia Emocional, Pág. 38",
            "explanation": "Goleman postula cinco pilares: Autoconocimiento, Autorregulación, Motivación, Empatía y Habilidades Sociales, fundamentales para la gestión del estrés y el trato ciudadano."
        },
        {
            "id": "so-016",
            "difficulty": "media",
            "question": "En una intervención de alta hostilidad en la vía pública, ¿cómo contribuye la 'autorregulación emocional' al accionar del suboficial?",
            "options": [
                "Obliga a delegar el mando en los transeúntes que presencian el hecho",
                "Permite modular las respuestas impulsivas, evitar provocaciones y mantener la calma para tomar decisiones racionales y proporcionadas",
                "Habilita a retirarse del lugar de inmediato sin dar cuenta a la superioridad",
                "Exige responder con la misma agresividad verbal para doblegar al oponente"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Inteligencia Emocional, Pág. 41-43",
            "explanation": "La autorregulación evita que el funcionario policial caiga en el 'secuestro amigdalino' o reacción visceral ante insultos, garantizando el profesionalismo y la legitimidad del procedimiento."
        },
        {
            "id": "so-017",
            "difficulty": "facil",
            "question": "¿Qué define a la 'comunicación asertiva' en el trato policial con la comunidad?",
            "options": [
                "Hablar en voz muy alta e intimidar físicamente para exigir obediencia",
                "Utilizar lenguaje técnico incomprensible para confundir a los ciudadanos",
                "Aceptar pasivamente cualquier reclamo sin hacer cumplir las leyes vigentes",
                "Expresar derechos, órdenes o límites con firmeza, claridad y respeto, sin ser sumiso ni agresivo"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Inteligencia Emocional, Pág. 54-56",
            "explanation": "La asertividad es el punto de equilibrio donde el efectivo hace valer su autoridad legal sin avasallar la dignidad de la otra persona, desescalando situaciones conflictivas."
        },
        {
            "id": "so-018",
            "difficulty": "media",
            "question": "La 'escucha activa' como herramienta policial implica fundamentalmente:",
            "options": [
                "Interrumpir constantemente al vecino para indicarle que está equivocado",
                "Tomar nota textual sin mirar a los ojos a la víctima que relata el suceso",
                "Prestar atención integral al mensaje verbal y no verbal, demostrando comprensión antes de responder o actuar",
                "Oír pasivamente mientras se revisan las redes sociales en el teléfono celular"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Inteligencia Emocional, Pág. 48-50",
            "explanation": "La escucha activa transmite empatía y respeto, desarma la hostilidad del interlocutor y permite recabar información táctica fidedigna y de calidad."
        },
        {
            "id": "so-019",
            "difficulty": "dificil",
            "question": "Respecto a la retroalimentación ('feedback') en el ámbito policial, ¿qué método promueve el ISEP para corregir desvíos de un compañero o subalterno?",
            "options": [
                "Publicar el desvío en el grupo de mensajería informal de la seccional",
                "Ignorar el error para no generar mal clima interno en la guardia de tercio",
                "Amonestación verbal enérgica delante de los vecinos para marcar autoridad",
                "Método constructivo: resaltar aspectos positivos, señalar concretamente la conducta a mejorar y acordar pautas futuras"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Inteligencia Emocional, Pág. 60-61",
            "explanation": "La doctrina ISEP enseña que el feedback efectivo debe ser específico, oportuno, enfocado en conductas objetivas (no en la persona) y orientado a la mejora continua."
        },
        {
            "id": "so-020",
            "difficulty": "facil",
            "question": "¿Qué técnica psicofísica básica se enseña para controlar la taquicardia y el túnel de visión ante un evento crítico con armas?",
            "options": [
                "Respiración táctica consciente y controlada (inhalación profunda, retención y exhalación pausada)",
                "Ingesta rápida de bebidas energizantes con alto contenido de cafeína",
                "Cerrar los ojos durante 10 segundos en plena zona de peligro",
                "Acelerar el ritmo respiratorio para aumentar la agresividad física"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Inteligencia Emocional, Pág. 43-45",
            "explanation": "La respiración diafragmática o táctica reactiva el sistema parasimpático, reduce las pulsaciones y devuelve la agudeza sensorial y visual al operador policial."
        },
        {
            "id": "so-021",
            "difficulty": "facil",
            "question": "¿Cuál es la ley que rige los deberes, derechos, estabilidad y régimen de la carrera policial en Santa Fe?",
            "options": [
                "Ley del Personal Policial N° 12.521",
                "Ley de Procedimientos Administrativos N° 11.516",
                "Ley Orgánica de Ministerios N° 13.013",
                "Ley de Seguridad Social N° 10.703"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 72",
            "explanation": "La Ley 12.521, sancionada en 2006, derogó la antigua Ley 6.769 y constituye el estatuto fundamental del personal policial de la Provincia de Santa Fe."
        },
        {
            "id": "so-022",
            "difficulty": "media",
            "question": "Según la escala jerárquica de la Ley 12.521, ¿a qué grado asciende de forma inmediata un Suboficial de Policía?",
            "options": [
                "Oficial de Policía",
                "Sargento de Policía",
                "Inspector de Policía",
                "Subinspector de Policía"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 72-73",
            "explanation": "La escala jerárquica de la Ley 12.521 inicia en Suboficial de Policía, continuando sucesivamente con Oficial de Policía, Subinspector, Inspector, Subcomisario, Comisario, Comisario Supervisor, Subdirector, Director y Director General."
        },
        {
            "id": "so-023",
            "difficulty": "dificil",
            "question": "En el Régimen Disciplinario Policial (Decreto N° 0461/2015), ¿cuáles son las sanciones expulsivas que pueden aplicarse al personal?",
            "options": [
                "Apercibimiento y Reconvención",
                "Traslado de jurisdicción y recargo de servicio de guardia",
                "Suspensión de empleo de hasta 15 días y Arresto policial",
                "Cesantía y Exoneración"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 82-84 / Dec. 461/15",
            "explanation": "Las sanciones disciplinarias se dividen en correctivas (reconvención y apercibimiento), segregativas (suspensión de empleo y arresto) y expulsivas (cesantía y exoneración)."
        },
        {
            "id": "so-024",
            "difficulty": "media",
            "question": "¿Qué causal transforma a una falta leve del Art. 41 de la Ley 12.521 en una falta grave según el Art. 42?",
            "options": [
                "Cuando el autor tenga menos de 5 años de antigüedad en la repartición",
                "Cuando el superior directo no se encuentre presente al momento del hecho",
                "Cuando por sus consecuencias produzca un perjuicio grave al servicio o afecte seriamente el prestigio institucional",
                "Cuando se cometa en un día domingo o feriado nacional"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 84",
            "explanation": "El Art. 42 de la Ley 12.521 establece como agravante que las faltas leves muten a graves cuando sus efectos causen grave daño a la disciplina, a terceros o a la imagen pública de la Institución."
        },
        {
            "id": "so-025",
            "difficulty": "facil",
            "question": "Conforme al Art. 29 de la Ley 12.521, ¿cuál es la obligación del personal con autoridad policial respecto al arma de fuego reglamentaria?",
            "options": [
                "Utilizar únicamente municiones de caza mayor no homologadas por la institución",
                "Portar el arma provista en todo momento durante la prestación del servicio ordinario o extraordinario",
                "Dejar el arma bajo custodia en su domicilio particular al salir de servicio",
                "Prestar el armamento provisto a familiares para seguridad de la vivienda"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 75",
            "explanation": "El personal policial con autoridad policial tiene el deber inexcusable de portar el armamento reglamentario provisto durante la prestación activa del servicio de seguridad."
        },
        {
            "id": "so-026",
            "difficulty": "dificil",
            "question": "¿Qué establece el Decreto N° 1166/2018 respecto al personal policial bajo sumario administrativo frente al concurso de ascenso?",
            "options": [
                "Queda automáticamente exonerado de la fuerza sin derecho a reclamo alguno",
                "Se le prohíbe de por vida presentarse a cualquier concurso de perfeccionamiento",
                "Puede concursar, pero si está llamado a prestar declaración indagatoria por falta grave su ascenso quedará condicionado al resultado final del sumario",
                "Asciende de forma automática para evitar violar su derecho de defensa"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 81 / Dec. 1166/18",
            "explanation": "El Decreto 1166/18 resguarda la vacante si el agente aprueba el concurso, supeditando la efectivización del decreto de ascenso a que resulte sobreseído o con sanción que no inhabilite el ascenso."
        },
        {
            "id": "so-027",
            "difficulty": "media",
            "question": "¿Qué principio de organización institucional consagra el Decreto-Ley 12.333/62 para la Policía de Santa Fe?",
            "options": [
                "Comando rotativo elegido por asamblea vecinal cada seis meses",
                "Independencia absoluta de cada comisaría respecto de la Jefatura Provincial",
                "Descentralización política y cobro de aranceles jurisdiccionales propios",
                "Centralización administrativa y descentralización funcional y operativa"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 85-86",
            "explanation": "La Policía de Santa Fe es centralizada en lo administrativo (Jefatura de Policía) y descentralizada en lo funcional (Unidades Regionales y Direcciones Generales operativas)."
        },
        {
            "id": "so-028",
            "difficulty": "dificil",
            "question": "En el marco de la Ley N° 11.516 (incorporada como Art. 10 bis a la Ley 7.395), ¿cuáles son los requisitos estrictos para demorar a una persona para averiguación de antecedentes?",
            "options": [
                "Mero disgusto personal del funcionario policial, con plazo de alojamiento libre de hasta 72 horas",
                "Haber cometido una falta de tránsito menor en zona rural sin testigos",
                "Existencia de sospecha fundada sobre delito o contravención, negativa a identificarse, plazo máximo de 6 horas y comunicación inmediata",
                "Orden escrita de un concejal comunal con retención de DNI por 48 horas"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 87-88",
            "explanation": "El Art. 10 bis es excepcional: requiere sospecha razonable de preparación de hecho ilícito, renuencia o imposibilidad de identificación fehaciente, plazo perentorio de 6 horas y notificación fiscal."
        },
        {
            "id": "so-029",
            "difficulty": "facil",
            "question": "¿Cómo se integran las Direcciones que conforman la Plana Mayor Policial (D-1 a D-5)?",
            "options": [
                "D-1 Informática, D-2 Patrulleros, D-3 Balística, D-4 Bomberos y D-5 Custodias",
                "D-1 Finanzas, D-2 Tránsito, D-3 Armería, D-4 Prensa y D-5 Protocolo",
                "D-1 Personal, D-2 Inteligencia, D-3 Operaciones Policiales, D-4 Logística y D-5 Asuntos Judiciales",
                "D-1 Asistentes, D-2 Guardias, D-3 Adicionales, D-4 Salud y D-5 Escuelas"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 86",
            "explanation": "La Plana Mayor Policial asesora al Jefe de Policía a través de sus cinco departamentos clásicos: Personal (D1), Inteligencia (D2), Operaciones (D3), Logística (D4) y Judicial (D5)."
        },
        {
            "id": "so-029b",
            "difficulty": "media",
            "question": "Bajo el Decreto 461/15, ¿constituye falta administrativa para un superior no sancionar a un subalterno que comete una falta disciplinaria comprobada?",
            "options": [
                "Sí, expresamente tipificada como omisión sancionatoria que acarrea responsabilidad disciplinaria para el superior",
                "No, el superior tiene discrecionalidad absoluta para perdonar cualquier falta sin límite",
                "Solo si el subalterno pertenece a un escalafón administrativo o profesional",
                "Únicamente si la falta fue publicada previamente en un medio de prensa escrito"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 74 / Dec. 461/15",
            "explanation": "El Decreto 461/15 establece la obligatoriedad del ejercicio del poder disciplinario; la tolerancia o encubrimiento de faltas por parte del superior constituye en sí misma una falta administrativa grave."
        },
        {
            "id": "so-030",
            "difficulty": "facil",
            "question": "¿Cuál es la norma de fondo que sanciona las conductas contravencionales en el territorio de la Provincia de Santa Fe?",
            "options": [
                "Ley de Seguridad Interior N° 24.059",
                "Código de Convivencia Provincial (Ley N° 13.774)",
                "Código Civil y Comercial de la Nación",
                "Código Penal de la Nación Argentina (Ley N° 11.179)"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 90-91",
            "explanation": "La Ley 13.774 modificó sustancialmente la antigua Ley 10.703, instaurando el Código de Convivencia santafesino con enfoque en la mediación y respeto comunitario."
        },
        {
            "id": "so-031",
            "difficulty": "media",
            "question": "En el Código de Convivencia (Ley 13.774), ¿cuál es la unidad utilizada para tasar los montos de las multas contravencionales?",
            "options": [
                "La Unidad Jus (arancel regulatorio judicial vigente en la provincia)",
                "Un porcentaje fijo de los haberes brutos del personal policial",
                "El valor del litro de nafta súper en estaciones oficiales",
                "El Salario Mínimo, Vital y Móvil nacional"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 94",
            "explanation": "El Art. 16 de la Ley 13.774 establece la Unidad Jus como medida de valor actualizada para fijar multas contravencionales, evitando la depreciación por inflación."
        },
        {
            "id": "so-032",
            "difficulty": "dificil",
            "question": "Según el Art. 4 del Código de Convivencia y la Ley 12.967, ¿se puede aplicar pena de arresto a menores de 18 años por infracciones contravencionales?",
            "options": [
                "No, bajo ninguna circunstancia se les aplica pena de arresto, rigiendo medidas socioeducativas y protección de derechos",
                "Sí, hasta un máximo de 30 días en celdas individuales de comisaría",
                "Únicamente con autorización verbal del oficial de servicio de guardia",
                "Solo si el menor cometió la contravención en horario nocturno"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 92",
            "explanation": "El Art. 4 del Código de Convivencia exime a los menores de 18 años de la pena de arresto contravencional, supeditando su abordaje a los principios de la Ley 12.967 de protección integral."
        },
        {
            "id": "so-033",
            "difficulty": "media",
            "question": "Conforme al Art. 213 del Código Procesal Penal de Santa Fe, ¿cuándo se considera que existe 'flagrancia'?",
            "options": [
                "Cuando un denunciante anónimo relata un hecho ocurrido la semana anterior",
                "Cuando se sospecha de una persona sin haber presenciado ningún acto ilícito",
                "Cuando el autor es sorprendido en el momento de cometer el delito, inmediatamente después, o perseguido con rastros concluyentes",
                "Cuando el imputado se presenta espontáneamente a consultar por su legajo"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 109-111",
            "explanation": "La flagrancia (Art. 213) y la cuasiflagrancia facultan la aprehensión inmediata sin orden previa de juez cuando el sujeto es sorprendido in fraganti o perseguido clamorosamente."
        },
        {
            "id": "so-034",
            "difficulty": "dificil",
            "question": "El Art. 211 del CPP faculta al arresto preventivo en el lugar del hecho por un plazo máximo de:",
            "options": [
                "Hasta setenta y dos (72) horas sin dar aviso a ninguna autoridad judicial",
                "Quince (15) días corridos en dependencias de la Unidad Regional",
                "Hasta ocho (8) horas para individualizar personas o recibir declaraciones urgentes en los primeros momentos de la investigación",
                "Veinticuatro (24) horas prorrogables automáticamente por el jefe de destacamento"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 94 / CPP Art. 211",
            "explanation": "El Art. 211 del CPP autoriza el arresto excepcional de los presentes en la escena hasta por 8 horas para identificar partícipes y evitar que se fuguen o entorpezcan el inicio de la pesquisa."
        },
        {
            "id": "so-035",
            "difficulty": "media",
            "question": "De acuerdo al Art. 170 del CPP, ¿en qué caso puede la policía allanar una morada habitada SIN orden judicial previa?",
            "options": [
                "Cuando el vecino del frente tenga sospechas de que en la casa juegan cartas",
                "Para verificar el pago regular de las tasas municipales de la propiedad",
                "Por orden verbal de un inspector municipal sin firma de magistrado alguno",
                "Para evitar un estrago grave, responder a pedidos de auxilio del interior o persecución de imputado flagrante que se introdujo en la vivienda"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 107-108 / CPP Art. 170",
            "explanation": "El allanamiento sin orden es taxativo y excepcional: incendio, inundación u otro estrago, gritos de auxilio que indiquen comisión de delito, o ingreso en persecución continua de un sospechoso en flagrancia."
        },
        {
            "id": "so-036",
            "difficulty": "facil",
            "question": "En el Derecho Penal argentino, ¿qué causal de justificación consagra el Art. 34 inc. 6 del Código Penal?",
            "options": [
                "La obediencia jerárquica a órdenes manifiestamente delictivas",
                "La Legítima Defensa propia (ante agresión ilegítima, necesidad racional del medio empleado y falta de provocación)",
                "El perdón espontáneo otorgado por el policía de turno",
                "La venganza personal inmediata ante un agravio moral"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 116-118",
            "explanation": "El Art. 34 inc. 6 exime de pena a quien obra en legítima defensa de su persona o derechos, siempre que medie agresión ilegítima, racionalidad en el medio defensivo y ausencia de provocación."
        },
        {
            "id": "so-037",
            "difficulty": "dificil",
            "question": "¿En qué figura penal incurre el funcionario policial que no cesa una detención ilegal o prolonga la aprehensión más allá de los plazos legales?",
            "options": [
                "Privación ilegítima de la libertad cometida por funcionario público (Art. 143 y 144 bis del Código Penal)",
                "Falta meramente administrativa no punible en sede judicial penal",
                "Incumplimiento civil menor sancionable solo con llamada de atención",
                "Insubordinación militar conforme al Código de Justicia Militar derogado"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 122-123",
            "explanation": "El Art. 144 bis tipifica con severas penas de prisión e inhabilitación especial al funcionario que retiene indebidamente a una persona o retarda hacer cesar una medida coercitiva indebida."
        },
        {
            "id": "so-038",
            "difficulty": "media",
            "question": "En el Código Procesal Penal santafesino, ¿qué garantía emana del principio constitucional 'In dubio pro reo' (Art. 7 CPP)?",
            "options": [
                "En caso de duda, se debe ordenar la prisión preventiva inmediata por precaución",
                "En caso de duda razonable e insalvable sobre los hechos, el tribunal debe decidir siempre a favor del imputado",
                "El fiscal puede imponer penas de arresto sin necesidad de debate ni juicio oral",
                "El policía siempre tiene la presunción legal de culpabilidad del sospechoso"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 97",
            "explanation": "El Art. 7 del CPP consagra que la duda probatoria insuperable beneficia al acusado, en consonancia con la presunción de inocencia garantizada en el Art. 18 de la Constitución Nacional."
        },
        {
            "id": "so-039",
            "difficulty": "facil",
            "question": "¿Quién tiene la atribución exclusiva de dirigir la investigación penal preparatoria en la Provincia de Santa Fe?",
            "options": [
                "El Jefe de la Unidad Especial de Bomberos Zapadores",
                "El Comisario de la seccional de la jurisdicción respectiva",
                "El Intendente municipal o Presidente comunal de la ciudad",
                "El Fiscal del Ministerio Público de la Acusación (MPA)"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 99-101",
            "explanation": "En el modelo procesal penal santafesino (acusatorio), el fiscal del MPA lidera y orienta estratégicamente la IPP, siendo la policía su órgano ejecutor especializado."
        },
        {
            "id": "so-040",
            "difficulty": "facil",
            "question": "¿Qué establece la reconocida 'Regla de Tueller' en la táctica operacional policial?",
            "options": [
                "Las esposas de seguridad deben colocarse exclusivamente a 6,4 centímetros de las muñecas",
                "Un móvil policial debe mantener 100 metros de distancia en persecuciones urbanas",
                "Un agresor con arma blanca puede cubrir una distancia de 21 pies (6,4 metros) en 1,5 segundos, tiempo mínimo para desenfundar y disparar",
                "El policía debe esperar 21 minutos antes de ingresar a un domicilio allanado"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 148-150",
            "explanation": "Desarrollada por el sargento Dennis Tueller en 1983, determina que dentro de los 6,4 metros un atacante con cuchillo o elemento punzocortante impactará al policía antes de que este pueda reaccionar con su arma."
        },
        {
            "id": "so-041",
            "difficulty": "media",
            "question": "¿Qué innovación jurídica introdujo la Ley Provincial N° 14.239 en la Provincia de Santa Fe?",
            "options": [
                "La transferencia del control de rutas a los juzgados de paz comunales",
                "La prohibición total del empleo de chalecos balísticos por el personal policial",
                "La desfederalización de la persecución penal del narcomenudeo o microtráfico de estupefacientes hacia el fuero penal provincial",
                "El reemplazo del Código Procesal Penal por ordenanzas de cada municipio"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 151-154",
            "explanation": "La Ley 14.239 adhirió a la desfederalización de la Ley Nacional 23.737, facultando a la Policía de Santa Fe y a los fiscales del MPA a intervenir y allanar 'búnkers' y puntos de venta minorista."
        },
        {
            "id": "so-042",
            "difficulty": "facil",
            "question": "En el uso progresivo y gradual de la fuerza policial, ¿cuál es el primer nivel de control táctico?",
            "options": [
                "La aplicación directa de gas pimienta sin aviso verbal",
                "El disparo disuasivo con posta de goma hacia el pecho",
                "El derribo inmediato con llave marcial sobre la calzada",
                "La presencia policial uniformada y la persuasión verbal"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 128-129",
            "explanation": "El continuo del uso de la fuerza inicia con la presencia policial (uniforme, porte y equipo) y la verbalización táctica disuasiva, escalando solo si la resistencia del sujeto lo amerita."
        },
        {
            "id": "so-043",
            "difficulty": "dificil",
            "question": "¿Cuáles son los tres principios rectores del empleo de la fuerza pública consagrados por los estándares internacionales de la ONU?",
            "options": [
                "Publicidad, Discrecionalidad y Conveniencia política",
                "Legalidad, Necesidad y Proporcionalidad",
                "Rigidez, Fuerza letal preventiva y Silencio administrativo",
                "Inmediatez, Velocidad y Celeridad sancionatoria"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 127-129",
            "explanation": "Todo uso de fuerza debe estar amparado en la ley (legalidad), ser el último recurso disponible sin alternativa viable (necesidad) y adecuarse a la gravedad de la amenaza (proporcionalidad)."
        },
        {
            "id": "so-044",
            "difficulty": "media",
            "question": "Conforme a la Ley 26.485 y los protocolos vigentes, ¿cómo debe actuar el personal de guardia ante una denuncia por Violencia de Género?",
            "options": [
                "Exigir que la víctima regrese a su hogar a mediar y reconciliarse con el agresor",
                "Brindar atención prioritaria en ambiente reservado, evitar la revictimización, recepcionar la denuncia y dar intervención inmediata a la fiscalía",
                "Cobrar un arancel de estampilla médica para autorizar la remisión del parte",
                "Demorar la recepción del acta hasta que la denunciante traiga dos testigos presenciales"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 138-140",
            "explanation": "La normativa de violencia contra la mujer exige escucha empática, confidencialidad, celeridad y la solicitud inmediata de medidas de protección cautelares (exclusión de hogar, perimetral)."
        },
        {
            "id": "so-045",
            "difficulty": "facil",
            "question": "En el marco de la preservación en microtráfico, ¿qué recaudo esencial debe tomarse al secuestrar sustancias estupefacientes?",
            "options": [
                "Guardar la droga en el bolsillo del uniforme hasta el final del turno de guardia",
                "Pesaje fehaciente, prueba orientativa de campo (narcotest), faja de seguridad con firmas y cadena de custodia",
                "Trasladar los envoltorios sueltos en el asiento delantero del móvil policial",
                "Tirar la sustancia por la rejilla pluvial si es una cantidad menor a 5 gramos"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 153-156",
            "explanation": "En delitos de narcomenudeo, la prueba de campo, el pesaje exacto, el precintado numerado y la cadena de custodia inviolable son indispensables para evitar nulidades en el juicio."
        },
        {
            "id": "so-046",
            "difficulty": "facil",
            "question": "¿En qué tiempo verbal y persona gramatical debe redactarse de forma general un Acta de Procedimiento Policial?",
            "options": [
                "En tono imperativo en segunda persona singular dirigido exclusivamente al fiscal",
                "En tiempo futuro imperfecto y en primera persona del plural de forma coloquial",
                "En tiempo presente continuo utilizando metáforas literarias para embellecer el texto",
                "En tiempo pretérito (pasado) y en tercera persona gramatical, con absoluta objetividad fáctica"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Comunicación y Redacción, Pág. 173-175",
            "explanation": "Las actas policiales son instrumentos públicos que dan fe de hechos sucedidos; su redacción debe ser objetiva, despojada de apreciaciones subjetivas, en pasado ('se constituyó', 'procedió') y tercera persona."
        },
        {
            "id": "so-047",
            "difficulty": "media",
            "question": "Si al confeccionar un acta manuscrita se comete un error involuntario de escritura, ¿cuál es el procedimiento formal correcto?",
            "options": [
                "Aplicar corrector líquido blanco abundante y volver a escribir encima",
                "Tachar intensamente con bolígrafo hasta que no se lea la palabra equivocada",
                "Salvar el error con una línea suave (testado) y consignar al pie del acta 'Testado... No vale. Enmendado... Vale' antes de las firmas",
                "Romper el acta completa aunque ya contenga firmas de testigos forenses"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Comunicación y Redacción, Pág. 175-177",
            "explanation": "Las tachaduras o el uso de corrector en actas procesales pueden acarrear tachas de falsedad o nulidades probatorias; toda corrección debe salvarse formalmente al pie antes de firmar."
        },
        {
            "id": "so-048",
            "difficulty": "dificil",
            "question": "¿Cuál es la función principal del 'Parte Diario o Parte de Novedades' en una dependencia policial?",
            "options": [
                "Registrar únicamente los consumos de combustible de los móviles asignados",
                "Registrar cronológica y detalladamente todas las intervenciones, ingresos, egresos, consignas y novedades acaecidas durante el servicio",
                "Publicar avisos comerciales de vecinos del barrio que soliciten auspicio",
                "Servir de borrador desechable que se destruye semanalmente sin archivo"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Comunicación y Redacción, Pág. 174-175",
            "explanation": "El libro de partes y guardia es el asiento oficial y permanente que da cuenta de la actividad de la unidad, con valor documental para auditorías, sumarios y requerimientos judiciales."
        },
        {
            "id": "so-049",
            "difficulty": "facil",
            "question": "¿Cuáles son los requisitos de validez indispensables que deben figurar al encabezar un Acta de Procedimiento (Art. 138 CPP)?",
            "options": [
                "El estado del clima, la marca de neumáticos del móvil y el signo zodiacal de los testigos",
                "La opinión personal del policía sobre si el detenido merece condena judicial",
                "Únicamente la firma del oficial de guardia sin asentar lugar ni horario",
                "Lugar exacto, ciudad, fecha y hora de inicio, identificación del preventor actuante y personal interviniente"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Comunicación y Redacción, Pág. 175-176 / CPP Art. 138",
            "explanation": "El Art. 138 del CPP exige con rigor legal fecha, hora, lugar, identidad funcional de los actuantes, relato circunstanciado de los actos cumplidos y firmas de ley."
        },
        {
            "id": "so-050",
            "difficulty": "facil",
            "question": "En la suite ofimática LibreOffice de uso habitual en dependencias públicas de Santa Fe, ¿cuál es el programa equivalente a Microsoft Word para procesar textos?",
            "options": [
                "LibreOffice Base",
                "LibreOffice Calc",
                "LibreOffice Impress",
                "LibreOffice Writer"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Informática Inicial, Pág. 207-208",
            "explanation": "Writer es el procesador de textos de LibreOffice utilizado para confeccionar informes, notas y actuaciones policiales en formato de código abierto y estándares provinciales."
        },
        {
            "id": "so-051",
            "difficulty": "media",
            "question": "En la hoja de cálculo LibreOffice Calc, ¿cómo se denomina a la intersección de una columna y una fila donde se ingresan datos o fórmulas?",
            "options": [
                "Párrafo de edición",
                "Cursor de hardware",
                "Directorio raíz",
                "Celda (ejemplo: B4)"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Informática Inicial, Pág. 224-226",
            "explanation": "Una celda es la unidad básica de almacenamiento de una hoja de cálculo, identificada por la letra de la columna y el número de la fila correspondiente."
        },
        {
            "id": "so-052",
            "difficulty": "facil",
            "question": "En LibreOffice Calc o Excel, ¿con qué símbolo obligatorio debe comenzar siempre una fórmula matemática para que el sistema realice el cálculo?",
            "options": [
                "Con el signo igual (=)",
                "Con un signo de interrogación (?)",
                "Con un punto y coma (;)",
                "Con el signo arroba (@)"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Informática Inicial, Pág. 228-230",
            "explanation": "El signo '=' le indica al programa que el contenido posterior no es texto plano, sino una operación aritmética o función de cálculo (ej. '=SUMA(A1:A10)')."
        },
        {
            "id": "so-053",
            "difficulty": "dificil",
            "question": "Respecto a la seguridad en el manejo de correos electrónicos y cuentas institucionales en comisaría, ¿cuál es una regla de ciberseguridad indispensable?",
            "options": [
                "No abrir archivos adjuntos sospechosos ni enlaces no verificados, cerrar la sesión al retirarse y no compartir contraseñas",
                "Descargar e instalar programas de videojuegos en las terminales de guardia",
                "Reenviar información judicial confidencial a casillas de correo personales sin encriptar",
                "Anotar la contraseña en un papel pegado en el monitor para que todos puedan usar la cuenta"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Informática Inicial, Pág. 206-207 y 248-250",
            "explanation": "La protección de las terminales operativas exige evitar ataques de phishing, resguardar las credenciales personales y preservar la confidencialidad de la información procesal."
        },
        {
            "id": "so-054",
            "difficulty": "facil",
            "question": "¿Qué representa la regla nemotécnica 'MIRAF' en la doctrina de seguridad con armas de fuego del ISEP?",
            "options": [
                "Mando inmediato, Resistencia física, Aceleración, Firmeza y Acción directa",
                "Manipular como cargada, Índice fuera del disparador, Rayo láser a lugar seguro, Asegurarse del blanco y Familiarizarse con el arma",
                "Munición blindada, Intervención veloz, Recarga táctica, Apoyo de tercio y Fuego",
                "Miras iluminadas, Inspección rápida, Respaldo táctico, Armadura de combate y Fuerza"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 254-256",
            "explanation": "Las normas universales MIRAF previenen disparos involuntarios: tratar siempre el arma como cargada, dedo en el armazón hasta apuntar, boca del cañón siempre a lugar seguro y verificar blanco y fondo."
        },
        {
            "id": "so-055",
            "difficulty": "media",
            "question": "¿Cuáles son los cuatro componentes esenciales que componen un cartucho de proyectil único para pistola reglamentaria 9x19mm?",
            "options": [
                "Vaina, Cápsula fulminante o iniciador, Pólvora o carga propulsora y Proyectil o bala",
                "Blindaje exterior, Miras nocturnas, Cinta transportadora y Pistón",
                "Tubo cañón, Corredera, Resorte recuperador y Cargador",
                "Alza, Guión, Percutor y Fiador de seguridad"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 270-272",
            "explanation": "El cartucho metálico moderno está integrado por la vaina (contenedor), el fulminante (ignición), la pólvora (combustión de gases) y la bala (elemento lanzado por el cañón)."
        },
        {
            "id": "so-056",
            "difficulty": "facil",
            "question": "Según la clasificación legal de la ANMaC, ¿qué define a una 'Pistola Semiautomática' como la Bersa TPR9 o Thunder Pro?",
            "options": [
                "Aquella en la que el tirador debe oprimir la cola del disparador para cada disparo individual, realizándose la recarga en forma automática",
                "Aquella que mantiene fuego continuo e ininterrumpido mientras el disparador permanezca presionado",
                "Aquella que requiere amartillar manualmente con el pulgar para cada disparo",
                "Aquella que almacena los cartuchos en un tambor giratorio accionado por resorte"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 266-269 / ANMaC",
            "explanation": "En las armas semiautomáticas, cada disparo exige accionar la cola del disparador una vez; el retroceso de los gases eyecta la vaina servida y monta un nuevo cartucho en la recámara."
        },
        {
            "id": "so-057",
            "difficulty": "media",
            "question": "¿En qué consiste la posición táctica preventiva de tiro conocida como 'Posición SUL'?",
            "options": [
                "El arma se mantiene extendida con un solo brazo apuntando directamente a la cabeza del sospechoso",
                "El arma se apoya sobre el capot del móvil policial para hacer puntería a larga distancia",
                "El arma se sostiene con el cañón hacia arriba pegada a la oreja del tirador",
                "El arma se ubica pegada al pecho con ambas manos, cañón apuntando 45 grados hacia el suelo entre los pies del operador"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 256-258",
            "explanation": "La posición SUL ('sur' en portugués) es una posición segura de alerta que permite proteger el arma de forcejeos, no barrer con el cañón a compañeros o civiles y reaccionar velozmente ante peligro letal."
        },
        {
            "id": "so-058",
            "difficulty": "dificil",
            "question": "Ante una interrupción de tiro en la pistola reglamentaria por encasquillamiento simple ('falla de alimentación'), ¿cuál es la maniobra táctica inmediata a ejecutar?",
            "options": [
                "Desarmar la pistola por completo aflojando la palanca de desarme en plena vía pública",
                "Guardar el arma en la funda de inmediato y emprender la retirada",
                "Mirar por la boca del cañón para verificar si hay un plomo atascado",
                "Golpe firme a la base del cargador, jalar la corredera hacia atrás hasta el tope y soltar ('Tap, Rack & Assess')"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 258-260",
            "explanation": "La técnica 'Golpe y Tracción' (Tap and Rack) asienta el cargador deficientemente trabado y cicla la corredera expulsando el cartucho fallido y alimentando uno fresco para reanudar el fuego si es necesario."
        },
        {
            "id": "so-059",
            "difficulty": "facil",
            "question": "¿Cuál es la primera medida de seguridad obligatoria antes de iniciar la limpieza o desarme básico de campaña del arma reglamentaria?",
            "options": [
                "Pasar la baqueta metálica por el cañón con el cargador colocado",
                "Extraer el cargador, ciclar la corredera repetidas veces y verificar visual y táctilmente la recámara vacía",
                "Sumergir el arma completa en solvente químico inflamable con cartuchos puestos",
                "Apretar el disparador hacia el suelo para ver si suena el percutor"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 255-256",
            "explanation": "Toda inspección de seguridad exige retirar la fuente de alimentación (cargador) y comprobar visualmente y al tacto que no haya cartucho en la recámara."
        },
        {
            "id": "so-060",
            "difficulty": "media",
            "question": "En la clasificación de los indicios según su naturaleza física, ¿qué son los 'indicios determinables'?",
            "options": [
                "Sustancias químicas complejas que forzosamente requieren cromatografía de gases para saber qué son",
                "Meras hipótesis abstractas formuladas verbalmente por los denunciantes",
                "Indicios que carecen de todo valor probatorio en el juicio penal",
                "Aquellos que por su morfología y estructura pueden identificarse a simple vista o con aumento menor (armas, casquillos, huellas)"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 16",
            "explanation": "Los indicios determinables requieren solo un análisis macroscópico directo para su reconocimiento (ej. una vaina servida, un cuchillo, un proyectil)."
        },
        {
            "id": "so-061",
            "difficulty": "dificil",
            "question": "¿Quién es el responsable de mantener la 'Cadena de Custodia' de un elemento probatorio secuestrado en un procedimiento?",
            "options": [
                "El fabricante industrial del elemento secuestrado",
                "El chofer del patrullero de forma única y excluyente",
                "Cada uno de los funcionarios policiales o judiciales que sucesivamente reciban, trasladen o periten el objeto, documentando el pase",
                "Exclusivamente el juez de primera instancia que dicte la sentencia definitiva"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 30-31",
            "explanation": "La cadena de custodia es un procedimiento riguroso e ininterrumpido donde cada custodio asume la responsabilidad formal de la integridad del indicio mediante actas y planillas de pase."
        },
        {
            "id": "so-062",
            "difficulty": "facil",
            "question": "¿Qué función cumple el 'Perímetro Exterior' en el aseguramiento de un hecho en la vía pública?",
            "options": [
                "Servir como área de autopsia preliminar al aire libre",
                "Alojar a los sospechosos aprehendidos para que declaren ante los vecinos",
                "Contener al público general, desviar el tránsito vehicular y aislar a los curiosos para resguardar la labor pericial",
                "Permitir el libre ingreso y egreso de cualquier transeúnte"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Escena del Crimen, Pág. 24",
            "explanation": "El perímetro exterior es el límite más amplio, custodiado por personal operativo con cinta y vallas, impidiendo que civiles interfieran en las zonas intermedia y crítica."
        },
        {
            "id": "so-063",
            "difficulty": "media",
            "question": "Conforme al Art. 41 de la Ley 12.521, ¿cuál de las siguientes conductas configura una 'Falta Administrativa Leve'?",
            "options": [
                "El desaseo personal o descuido en la conservación del uniforme reglamentario",
                "El abandono injustificado del puesto de guardia por más de 72 horas",
                "El cobro indebido de sumas de dinero a comerciantes de la zona",
                "La pérdida culposa del arma de fuego reglamentaria provista"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 82-83 / Ley 12.521",
            "explanation": "Las faltas leves del Art. 41 refieren a descuidos de presentación, puntualidad o formalidades menores del servicio; las conductas lesivas graves o de corrupción caen bajo el Art. 43."
        },
        {
            "id": "so-064",
            "difficulty": "dificil",
            "question": "Bajo el régimen del Decreto 461/15, ¿cuál es el plazo que tiene un efectivo para interponer Recurso de Revocatoria contra una sanción disciplinaria?",
            "options": [
                "No existe derecho a interponer ningún recurso administrativo",
                "Dentro de los cinco (5) días hábiles siguientes a la notificación fehaciente",
                "Hasta treinta (30) días hábiles por ante la Corte Suprema provincial",
                "Dentro de las cuarenta y ocho (48) horas corridas de producido el hecho"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 84 / Dec. 461/15",
            "explanation": "El Decreto 461/15 garantiza el debido proceso fijando 5 días hábiles desde la notificación formal para interponer la revocatoria con o sin apelación en subsidio."
        },
        {
            "id": "so-065",
            "difficulty": "facil",
            "question": "¿Cómo se denominan las tres escuelas que integran el Instituto de Seguridad Pública (I.Se.P.) conforme al Decreto N° 12.333/04?",
            "options": [
                "Escuela Primaria Policial, Escuela de Suboficiales y Escuela de Generales",
                "Escuela de Choferes, Escuela de Armería y Escuela de Infantería",
                "Escuela de Policía, Escuela Superior de Seguridad Pública y Escuela de Especialidades",
                "Escuela de Patrullaje Urbano, Escuela Rural y Escuela Fluvial"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Legislación Policial, Pág. 76-77",
            "explanation": "El ISEP estructura su oferta académica en tres ramas: Escuela de Policía (ingreso de cadetes), Escuela Superior (oficiales de comando) y Escuela de Especialidades (cursos técnico-operativos)."
        },
        {
            "id": "so-066",
            "difficulty": "media",
            "question": "En el marco del Art. 163 del CPP, ¿qué requisito legal es imprescindible al realizar una requisa personal sobre una mujer?",
            "options": [
                "Debe realizarse obligatoriamente en presencia de un representante consular",
                "Puede ser practicada por cualquier personal masculino sin formalidad alguna",
                "Debe ser efectuada exclusivamente por personal policial femenino, respetando su pudor y dignidad",
                "Exige la autorización previa por escrito del ministro de seguridad provincial"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 107 / CPP Art. 163",
            "explanation": "El Art. 163 del CPP manda taxativamente que las inspecciones corporales y requisas sean efectuadas por personas del mismo sexo del requisado para resguardar la intimidad y el pudor."
        },
        {
            "id": "so-067",
            "difficulty": "dificil",
            "question": "¿En qué consiste el instituto de la 'Suspensión del Juicio a Prueba' (Probation) previsto en el Código Penal?",
            "options": [
                "El traslado compulsivo del imputado a otra provincia por dos años",
                "La absolución automática sin condiciones para todo imputado primario",
                "Una sanción de reclusión perpetua dictada en audiencia de trámite rápido",
                "La suspensión del trámite del juicio a cambio de cumplir reglas de conducta y reparar el daño, evitando una condena si se cumple el plazo"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 105-106",
            "explanation": "La probation busca la reinserción social y la resolución alternativa del conflicto en delitos de penas menores, imponiendo pautas de conducta sin registrar condena penal."
        },
        {
            "id": "so-068",
            "difficulty": "media",
            "question": "Conforme al Art. 214 del Código Procesal Penal, ¿pueden los ciudadanos particulares aprehender a una persona?",
            "options": [
                "Sí, en los mismos casos de flagrancia que autorizan la aprehensión policial, debiendo entregar al aprehendido de inmediato a la autoridad",
                "Únicamente con autorización escrita del Colegio de Abogados de la jurisdicción",
                "No, la aprehensión por particulares está tipificada como delito en todos los casos",
                "Solo si el particular es propietario de un inmueble rural de más de 100 hectáreas"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 111 / CPP Art. 214",
            "explanation": "El Art. 214 faculta a cualquier ciudadano a practicar la aprehensión en situación flagrante, debiendo entregar al sujeto inmediatamente a la policía junto con los objetos secuestrados."
        },
        {
            "id": "so-069",
            "difficulty": "facil",
            "question": "¿Qué acción judicial de garantía constitucional procede de inmediato cuando una persona sufre una privación ilegítima o amenaza a su libertad física?",
            "options": [
                "Juicio ordinario de quiebra comercial",
                "Recurso de Hábeas Corpus (Art. 43 Constitución Nacional)",
                "Recurso de casación administrativa",
                "Denuncia contravencional por ruidos molestos"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Actualización Legal, Pág. 115",
            "explanation": "El Hábeas Corpus es la acción constitucional rápida y expedita que puede interponer cualquier persona ante un juez para que ordene la cesación de un arresto o detención ilegal."
        },
        {
            "id": "so-070",
            "difficulty": "media",
            "question": "En la Carta Iberoamericana de la Función Pública, ¿cuál es el principio rector fundamental que debe guiar al empleado policial?",
            "options": [
                "La obediencia a intereses de facciones partidarias por sobre las leyes",
                "El cobro de honorarios adicionales privados a los vecinos por patrullaje",
                "El secreto absoluto de todas las partidas presupuestarias ante el público",
                "La vocación de servicio al ciudadano, la transparencia, el mérito y la ética pública"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 130",
            "explanation": "La Carta Iberoamericana consagra la profesionalización de la función pública, la igualdad de oportunidades por mérito y el servicio orientado al bienestar de la sociedad."
        },
        {
            "id": "so-071",
            "difficulty": "dificil",
            "question": "¿Cómo se define la 'distancia de reacción' en el contexto de la Regla de Tueller ante un atacante con arma blanca?",
            "options": [
                "La longitud máxima del cañón de la escopeta reglamentaria calibre 12/70",
                "La separación física entre dos móviles patrulleros al estacionar en cordón",
                "La distancia mínima que necesita el policía para percibir la amenaza letal, decidir la respuesta, desenfundar y efectuar un disparo certero",
                "El radio de acción de las granadas de humo utilizadas por la Guardia de Infantería"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 148-150",
            "explanation": "Los 6,4 metros (21 pies) combinan el tiempo de percepción-reacción del operador policial (aprox. 1,5 segundos) con la velocidad atlética del atacante para alcanzarlo."
        },
        {
            "id": "so-072",
            "difficulty": "facil",
            "question": "En la entrevista a un testigo de un hecho delictivo, ¿qué tipo de preguntas debe priorizar el suboficial para obtener un relato veraz?",
            "options": [
                "Preguntas intimidatorias que amenacen con arrestar al testigo si no acusa a un vecino",
                "Preguntas de respuesta única por 'Sí' o 'No' preparadas previamente en un formulario",
                "Preguntas abiertas que permitan al testigo relatar libremente lo percibido por sus sentidos ('¿Qué observó?')",
                "Preguntas capciosas o sugestivas que fuercen al testigo a afirmar lo que el policía piensa"
            ],
            "correctIndex": 2,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Práctica Policial, Pág. 134-136",
            "explanation": "Las preguntas abiertas ('¿Dónde estaba?', '¿Qué escuchó?') incentivan la memoria testimonial espontánea y evitan la contaminación del relato con suposiciones del entrevistador."
        },
        {
            "id": "so-073",
            "difficulty": "media",
            "question": "¿Por qué es fundamental evitar apreciaciones personales o juicios de valor al redactar un informe policial?",
            "options": [
                "Porque el Código Penal exige que las actas no superen las 100 palabras de longitud",
                "Porque el acta es un documento público probatorio que debe reflejar hechos objetivos y comprobables para no vulnerar el debido proceso",
                "Porque el personal policial carece de libertad de expresión fuera de su hogar",
                "Porque los juicios de valor aumentan el costo de la tinta de impresión institucional"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Comunicación y Redacción, Pág. 165-167",
            "explanation": "La fe pública policial se basa en la neutralidad y precisión objetiva de lo observado y actuado; adjetivar o juzgar intenciones descalifica el rigor pericial del instrumento."
        },
        {
            "id": "so-074",
            "difficulty": "facil",
            "question": "¿Qué es una 'Nota de Elevación' en el ámbito administrativo de la Policía de Santa Fe?",
            "options": [
                "Una planilla de cálculo exclusiva para registrar sueldos policiales",
                "Una comunicación formal mediante la cual se eleva una actuación, informe o solicitud a la autoridad jerárquica competente",
                "Un acta de defunción confeccionada por el médico de guardia",
                "Una orden de arresto emitida verbalmente en el patio de armas"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Comunicación y Redacción, Pág. 173-174",
            "explanation": "La nota de elevación es la pieza documental de estilo que acompaña y tramita expedientes, sumarios o solicitudes a través de la vía jerárquica correspondiente."
        },
        {
            "id": "so-075",
            "difficulty": "media",
            "question": "En LibreOffice Calc, ¿cuál de las siguientes funciones permite sumar automáticamente los valores numéricos comprendidos entre la celda A1 y la celda A20?",
            "options": [
                "=AGREGAR_CELDAS[A1-A20]",
                "=CALCULAR_TODO(A1:A20)",
                "=TOTAL(A1..A20)",
                "=SUMA(A1:A20)"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Informática Inicial, Pág. 228-232",
            "explanation": "La función sintáctica estándar en español en Calc es '=SUMA(rango_inicial:rango_final)', procesando todos los valores numéricos del bloque seleccionado."
        },
        {
            "id": "so-076",
            "difficulty": "facil",
            "question": "¿Qué significa que una página web oficial tenga el prefijo 'https://' y un candado cerrado en el navegador?",
            "options": [
                "Que el sitio web pertenece obligatoriamente al Ejército Argentino",
                "Que el usuario ha olvidado su contraseña y la página está bloqueada",
                "Que la computadora no tiene conexión a internet y trabaja fuera de línea",
                "Que la conexión entre la computadora policial y el servidor web viaja encriptada y segura mediante certificado SSL/TLS"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Informática Inicial, Pág. 205-207",
            "explanation": "HTTPS (Hypertext Transfer Protocol Secure) garantiza que los datos viajan cifrados, impidiendo que terceros intercepten claves o datos confidenciales en la red."
        },
        {
            "id": "so-077",
            "difficulty": "facil",
            "question": "En la regla MIRAF, ¿qué exige la letra 'I' respecto al dedo índice del tirador?",
            "options": [
                "Apretar continuamente el disparador para verificar la resistencia del resorte",
                "Introducir el dedo índice en la ventana expulsora para destrabar cartuchos",
                "Usar el dedo índice para tapar la boca del cañón al transportar el arma",
                "Mantener el dedo índice recto a lo largo del armazón y fuera de la cola del disparador hasta que las miras estén sobre el blanco y se decida disparar"
            ],
            "correctIndex": 3,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 255",
            "explanation": "El dedo fuera del disparador (sobre el armazón) previene el 99% de los disparos involuntarios producidos por sobresalto, tropiezo o estrés fisiológico del operador."
        },
        {
            "id": "so-078",
            "difficulty": "media",
            "question": "En balística general, ¿qué rama estudia los fenómenos que ocurren desde que el proyectil abandona la boca del cañón hasta que impacta en el blanco?",
            "options": [
                "Balística Exterior",
                "Balística Terminal o de Efectos",
                "Balística Interior",
                "Balística Identificativa"
            ],
            "correctIndex": 0,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 260-262",
            "explanation": "La balística se divide en: Interior (dentro del ánima del cañón), Exterior (trayectoria en el aire, gravedad y viento) y Terminal o de Efectos (comportamiento al impactar el blanco)."
        },
        {
            "id": "so-079",
            "difficulty": "dificil",
            "question": "En una pistola de doble acción como la Bersa TPR9, ¿qué ocurre mecánicamente al presionar la cola del disparador cuando el martillo está en posición de reposo?",
            "options": [
                "Se requiere levantar la corredera con la otra mano obligatoriamente",
                "El mecanismo monta el martillo hacia atrás y lo libera en el mismo recorrido continuo para golpear la aguja percutora",
                "El percutor queda bloqueado hasta que se inserte una llave mecánica externa",
                "El arma se traba de forma automática como dispositivo de seguridad"
            ],
            "correctIndex": 1,
            "source": "Manual de Perfeccionamiento Suboficial ISEP - Tiro, Pág. 267-268",
            "explanation": "La 'doble acción' cumple dos fases mecánicas en una sola tracción del disparador: monta el percutor/martillo y acto seguido lo libera para producir el disparo."
        }
    ],
    "oficial-subinspector": [
        {
            "id": "os-f01",
            "difficulty": "facil",
            "question": "¿Cuáles son las cuatro virtudes cardinales que según el Manual ISEP sustentan la 'autoridad real' del líder policial?",
            "options": [
                "Obediencia, Disciplina, Valentía y Lealtad institucional",
                "Prudencia, Justicia, Fortaleza y Templanza",
                "Eficiencia, Rapidez, Control operativo y Mando efectivo",
                "Respeto jerárquico, Orden, Comando de zona y Firmeza operativa"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Oficial, Pág. 15: Liderazgo Policial",
            "explanation": "El ISEP enseña que la autoridad no proviene solo del cargo jerárquico sino de las 4 virtudes cardinales: Prudencia, Justicia, Fortaleza y Templanza."
        },
        {
            "id": "os-f02",
            "difficulty": "facil",
            "question": "¿Qué norma internacional consagra el Código de Conducta para Funcionarios Encargados de Hacer Cumplir la Ley?",
            "options": [
                "Resolución 34/169 de la Asamblea General de la ONU (1979)",
                "Convenio 169 de la Organización Internacional del Trabajo (1989)",
                "Protocolo Adicional II de los Convenios de Ginebra de 1949",
                "Estatuto de Roma de la Corte Penal Internacional de 1998"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Oficial, Pág. 30: Código de Conducta ONU",
            "explanation": "La Resolución 34/169 de la ONU de 1979 establece los 8 artículos fundamentales que rigen el ejercicio ético de la función policial."
        },
        {
            "id": "os-f03",
            "difficulty": "facil",
            "question": "¿Cómo se divide el sistema de preservación de escena del hecho denominado 'Cordón Doble'?",
            "options": [
                "Zona de Ingreso controlado y Zona de Egreso supervisado por testigos civiles",
                "Perímetro de Tránsito vehicular y Perímetro Vecinal restringido a civiles",
                "Perímetro Interno (Zona de Exclusión) y Perímetro Externo (Zona de Seguridad)",
                "Área de evidencia primaria y Área de contención perimetral secundaria"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Oficial, Pág. 22: Preservación del Lugar del Hecho",
            "explanation": "El sistema de doble cordón define un Perímetro Interno exclusivo para peritos forenses y un Perímetro Externo para seguridad y apoyo."
        },
        {
            "id": "os-f04",
            "difficulty": "facil",
            "question": "¿Qué tipo de falta disciplinaria constituye el desaliño en el uniforme o una tardanza menor sin justificar según el Decreto 461/15?",
            "options": [
                "Falta Leve, sancionable con apercibimiento o arresto menor",
                "Falta Grave, sancionable con suspensión o pase a disponibilidad",
                "Falta Gravísima, causal de instrucción de sumario administrativo",
                "Irregularidad administrativa, causal de anotación en legajo personal"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15 - Régimen Disciplinario Policial",
            "explanation": "El desaliño o descuidos menores en el servicio constituyen faltas leves, sancionables con apercibimiento o arresto de hasta 10 días."
        },
        {
            "id": "os-f05",
            "difficulty": "facil",
            "question": "¿Quién es considerado el 'Primer Preventor' policial en una escena delictiva?",
            "options": [
                "El primer personal policial uniformado que toma conocimiento e interviene en el lugar del hecho",
                "El Jefe de la Comisaría jurisdiccional que asume la conducción operativa del procedimiento",
                "El perito forense de la policía científica designado para el relevamiento de indicios",
                "El Fiscal del Ministerio Público de la Acusación que dirige la investigación penal"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Oficial, Pág. 20: Rol del Primer Preventor",
            "explanation": "El primer preventor es el efectivo que arriba en primer término al lugar, asumiendo la responsabilidad inicial de asegurar y preservar la escena."
        },
        {
            "id": "os-f06",
            "difficulty": "facil",
            "question": "¿Qué es la 'Munición' según la reglamentación de tiro policial y la Ley Nacional de Armas?",
            "options": [
                "El conjunto de cartuchos que se proveen para ser utilizados en un arma de fuego",
                "El cargador metálico reglamentario con capacidad de 15 cartuchos calibre 9mm",
                "El dispositivo de puntería nocturna tritio que equipa al arma de dotación",
                "La vaina servida que se expulsa del arma tras la percusión del fulminante"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Armamento y Tiro Policial / Daypo Tiro",
            "explanation": "La munición es el conjunto o provisión de cartuchos diseñados y aptos para ser disparados por las armas de fuego."
        },
        {
            "id": "os-f07",
            "difficulty": "facil",
            "question": "En las reglas cardinales de seguridad con armas de fuego, ¿cómo debe considerarse toda arma que se empuña?",
            "options": [
                "Siempre cargada y lista para disparar, aun cuando se crea que está descargada",
                "Descargada mientras tenga el seguro manual colocado y el cargador retirado",
                "Inofensiva si el portador se encuentra dentro de una dependencia policial",
                "Segura si se verificó visualmente al inicio del turno en la formación diaria"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Reglas Cardinales de Seguridad",
            "explanation": "La regla de oro del tiro policial exige tratar a toda arma en todo momento como si estuviese cargada, sin excepciones."
        },
        {
            "id": "os-f08",
            "difficulty": "facil",
            "question": "¿Qué posición adopta el dedo índice del policía cuando no se ha tomado la decisión consciente de disparar?",
            "options": [
                "Completamente extendido y apoyado en el armazón, fuera del guardamonte",
                "Apoyado levemente sobre la lengüeta del disparador sin aplicar presión",
                "En contacto con el seguro de aleta lateral de la corredera de la pistola",
                "Ubicado debajo de la empuñadura para mejorar la estabilidad del empuñe"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Pág. 12: Reglas de Manejo Seguro",
            "explanation": "El dedo índice permanece fuera del disparador y apoyado en el armazón en todo momento hasta que las miras estén alineadas y se decida disparar."
        },
        {
            "id": "os-f09",
            "difficulty": "facil",
            "question": "Según el Código Procesal Penal de Santa Fe (Ley 12.734), ¿cuándo se configura la 'Flagrancia'?",
            "options": [
                "Cuando el autor es sorprendido en el momento de cometer el hecho o inmediatamente después",
                "Cuando existen sospechas vecinales fundadas de que una persona cometió un ilícito días atrás",
                "Cuando la persona posee antecedentes penales por delitos contra la propiedad en el registro",
                "Cuando el imputado confiesa espontáneamente ante los oficiales en la guardia de la comisaría"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 212: Flagrancia",
            "explanation": "Hay flagrancia cuando el autor es sorprendido en el momento de intentar o cometer el delito, o inmediatamente después mientras es perseguido o con objetos del hecho."
        },
        {
            "id": "os-f10",
            "difficulty": "facil",
            "question": "¿Cuál es la función principal de la 'Posición SUL' en la doctrina de tiro policial?",
            "options": [
                "Mantener el arma apuntando al suelo a 45° pegada al pecho en entornos cerrados o con civiles",
                "Efectuar disparos reactivos de cadera a corta distancia sin alinear los aparatos de puntería",
                "Permitir la recarga del cargador con el arma apuntando directamente hacia el blanco hostil",
                "Descansar los brazos del tirador durante las guardias prolongadas de control vehicular"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Posiciones Tácticas de Guardia",
            "explanation": "La posición SUL mantiene el cañón orientado hacia el suelo a 45° con las manos al pecho, evitando apuntar a inocentes o camaradas en 360 grados."
        },
        {
            "id": "os-f11",
            "difficulty": "facil",
            "question": "¿Qué principio rector del uso de la fuerza policial establece que solo debe emplearse cuando otros medios resulten ineficaces?",
            "options": [
                "Principio de Necesidad",
                "Principio de Proporcionalidad",
                "Principio de Legalidad",
                "Principio de Oportunidad"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Uso Progresivo de la Fuerza - ISEP / ONU",
            "explanation": "El principio de necesidad indica que el uso de la fuerza física o letal es el último recurso, aplicable únicamente cuando los métodos no violentos han fracasado."
        },
        {
            "id": "os-f12",
            "difficulty": "facil",
            "question": "¿Quién tiene la dirección jurídica de la investigación penal preparatoria en el sistema procesal de Santa Fe?",
            "options": [
                "El Fiscal del Ministerio Público de la Acusación (MPA)",
                "El Juez de Instrucción Penal de Distrito en turno",
                "El Jefe de la Unidad Regional jurisdiccional actuante",
                "El Secretario de Seguridad Pública de la Provincia"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 16: Dirección de la Investigación",
            "explanation": "En el sistema acusatorio de Santa Fe, el Fiscal del MPA dirige la investigación penal preparatoria y coordina a la policía en función judicial."
        },
        {
            "id": "os-m01",
            "difficulty": "media",
            "question": "¿Cuál es la obligación inmediata del primer preventor policial al llegar a una escena del hecho con heridos de arma de fuego?",
            "options": [
                "Secuestrar de inmediato las vainas servidas, fotografiarlas y embalarlas para la cadena de custodia",
                "Priorizar el auxilio médico y resguardo de la vida, coordinando el 107 y fijando la posición de indicios",
                "Esperar la llegada del Fiscal del MPA para recibir instrucciones antes de actuar en la escena",
                "Tomar declaración testimonial detallada a los vecinos presentes antes de que se retiren del lugar"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Oficial, Pág. 24: Primer Preventor y Auxilio",
            "explanation": "La preservación de la vida es el mandato supremo; el auxilio médico prima sobre la intangibilidad de la evidencia, documentando las alteraciones necesarias."
        },
        {
            "id": "os-m02",
            "difficulty": "media",
            "question": "En la pistola reglamentaria Bersa Thunder 9 Pro / TPR9, ¿qué función cumple la palanca de desamartillado (Decocker)?",
            "options": [
                "Desmonta el martillo de manera segura sin golpear el percutor, dejando el arma en doble acción",
                "Traba mecánicamente la corredera para impedir que se extraiga el cargador durante el combate",
                "Desconecta el fiador permanentemente requiriendo amartillar a mano para el primer disparo",
                "Bloquea la cola del disparador únicamente cuando el cargador se encuentra completamente vacío"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Armamento Reglamentario: Pistola Bersa",
            "explanation": "El decocker desciende el martillo de forma 100% controlada sin impacto sobre la aguja percutora, permitiendo portar el arma en cartucho en recámara con doble acción lista."
        },
        {
            "id": "os-m03",
            "difficulty": "media",
            "question": "De acuerdo al Art. 215 del CPP de Santa Fe, ¿en qué circunstancia puede la policía realizar una requisa personal sin orden judicial previa?",
            "options": [
                "Cuando existan motivos fundados y circunstancias objetivas de que la persona oculta cosas vinculadas al delito",
                "En cualquier momento de forma preventiva durante controles de tránsito o patrullajes de rutina en la vía pública",
                "Únicamente cuando medie denuncia anónima previa registrada formalmente en el sistema de emergencias 911",
                "Siempre que la persona demuestre nerviosismo o se niegue a responder sobre su domicilio a la patrulla"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 215: Requisa sin orden judicial",
            "explanation": "La requisa sin orden requiere indicios vehementes y circunstancias objetivas previas de que porta objetos ilícitos, debiendo labrarse acta con testigos hábiles."
        },
        {
            "id": "os-m04",
            "difficulty": "media",
            "question": "¿Cuáles son los tiempos técnicos del desenfunde policial según la doctrina del Manual MIRAF?",
            "options": [
                "1: Desbloqueo y empuñe; 2: Extracción y rotación; 3: Encuentro de ambas manos; 4: Extensión y miras",
                "1: Toma de empuñadura; 2: Retiro veloz; 3: Desbloqueo de seguro; 4: Presión sobre el disparador",
                "1: Alerta visual; 2: Movimiento de cadera; 3: Apertura de funda; 4: Alineación de punto y alza",
                "1: Identificación de blanco; 2: Desamartillado; 3: Presentación al pecho; 4: Disparo reactivo"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Pág. 18: Fases Técnicas del Desenfunde",
            "explanation": "Los 4 tiempos del desenfunde coordinan: empuñe firme liberando seguros, elevación con cañón al frente, unión de manos al pecho y extensión visual al blanco."
        },
        {
            "id": "os-m05",
            "difficulty": "media",
            "question": "Conforme a la Ley Provincial 14.239 de Narcomenudeo, ¿qué conductas son de competencia exclusiva de los fiscales provinciales del MPA?",
            "options": [
                "Comercio, fraccionamiento y tenencia de estupefacientes destinada directamente al consumidor final",
                "El tráfico transnacional de precursores químicos y contrabando aduanero de sustancias prohibidas",
                "Las redes de narcotráfico con lavado de activos transfronterizo investigadas por PROCUNAR",
                "El transporte interprovincial de cargamentos mayores de clorhidrato de cocaína o cannabis"
            ],
            "correctIndex": 0,
            "source": "Ley 14.239 (Santa Fe) / Art. 34 de la Ley Nacional 23.737",
            "explanation": "La Ley 14.239 desfederaliza el microtráfico en Santa Fe, asignando al MPA el comercio fraccionado directo a usuarios (narcomenudeo barrial)."
        },
        {
            "id": "os-m06",
            "difficulty": "media",
            "question": "¿Cómo debe proceder el personal policial actuante ante el secuestro de un teléfono celular encendido en una escena de allanamiento?",
            "options": [
                "Colocarlo inmediatamente en Modo Avión, mantenerlo encendido y guardarlo en bolsa antiestática/Faraday",
                "Apagarlo de inmediato quitando la batería para evitar que se borren los mensajes de WhatsApp",
                "Navegar los chats recientes de mensajería para extraer capturas de pantalla antes de remitirlo",
                "Conectarlo al cargador de la unidad móvil policial para asegurar que no se agote la batería"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Evidencia Digital ISEP - Pág. 28: Dispositivos Móviles",
            "explanation": "El aislamiento de red en Modo Avión o bolsa de Faraday evita el borrado remoto; no se apaga para preservar datos volátiles de memoria RAM y claves abiertas."
        },
        {
            "id": "os-m07",
            "difficulty": "media",
            "question": "¿Qué establece la 'Regla de Tueller' en el entrenamiento táctico y uso progresivo de la fuerza?",
            "options": [
                "Un atacante con arma blanca a 6,4 metros (21 pies) puede alcanzar al policía antes de que desenfunde y dispare",
                "La distancia mínima para utilizar postas de goma (antidisturbios) sin provocar lesiones letales es de 21 metros",
                "El tiempo que demora un cartucho 9mm en alcanzar la velocidad terminal en boca de cañón es de 0,21 segundos",
                "La dispersión promedio del proyectil en tiro nocturno aumenta un 21% si no se utiliza linterna táctica"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF / Doctrina Operativa de Intervenciones Armadas",
            "explanation": "La regla de Dennis Tueller (1983) demuestra que un agresor armado con cuchillo recorre 6.4 metros en 1.5 segundos, tiempo promedio de reacción y disparo defensivo."
        },
        {
            "id": "os-m08",
            "difficulty": "media",
            "question": "En la redacción del Acta de Procedimiento (Art. 138 CPP), ¿quiénes NO pueden ser testigos de actuación según la ley procesal?",
            "options": [
                "Los menores de edad, las personas con alteración mental manifiesta y el propio personal policial interviniente",
                "Cualquier ciudadano argentino mayor de 18 años que transite libremente por la vía pública en el horario",
                "Los comerciantes del barrio que no tengan relación de parentesco demostrada con el imputado o la víctima",
                "Los conductores de taxis o remises que hayan sido convocados expresamente como observadores del acto"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Arts. 138 y 139: Testigos de Actuación",
            "explanation": "El personal policial actuante no puede ser testigo de su propia actuación; los testigos deben ser terceros civiles hábiles y desinteresados."
        },
        {
            "id": "os-m09",
            "difficulty": "media",
            "question": "¿Qué sanción disciplinaria máxima puede imponer un Oficial Jefe (Subcomisario o Comisario) según el Decreto 461/15?",
            "options": [
                "Arresto policial de hasta 15 días y apercibimiento dentro de su jurisdicción",
                "Suspensión de empleo por 60 días con retención del 50% de haberes mensuales",
                "Destitución con pérdida del grado policial previo sumario de asuntos internos",
                "Pase a retiro obligatorio por falta de idoneidad en el ejercicio del mando de tropa"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Régimen Disciplinario - Facultades Sancionatorias",
            "explanation": "Los Oficiales Jefes poseen facultades sancionatorias directas sobre el personal subalterno para aplicar apercibimiento y arresto hasta los límites fijados por jerarquía."
        },
        {
            "id": "os-m10",
            "difficulty": "media",
            "question": "Durante un allanamiento urgente por persecución en flagrancia (Art. 211 CPP), ¿cuál es el requisito formal ineludible?",
            "options": [
                "Dar aviso inmediato al Fiscal en turno y labrar acta circunstanciada detallando los motivos de la urgencia",
                "Esperar obligatoriamente la presencia física del Juez Penal de Turno antes de ingresar a la propiedad",
                "Obtener previamente la autorización verbal o por escrito del dueño de la morada o de un vecino lindero",
                "Secuestrar únicamente elementos que estén a la vista prohibiéndose la aprehensión del prófugo dentro"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 211: Allanamiento sin orden judicial",
            "explanation": "El ingreso sin orden por flagrancia o auxilio exige comunicación inmediata al fiscal del MPA y confección de acta con testigos detallando la causa de excepción."
        },
        {
            "id": "os-m11",
            "difficulty": "media",
            "question": "¿Cuál es la causa de una traba de tiro del tipo 'Chimenea' (Stovepipe) en una pistola semiautomática?",
            "options": [
                "La vaina servida queda atrapada verticalmente por la corredera antes de ser expulsada por completo",
                "El fulminante del cartucho percutido no inició la deflagración de la pólvora por defecto de fábrica",
                "El proyectil quedó alojado en el interior del ánima del cañón bloqueando el paso de nuevos disparos",
                "Dos cartuchos intentan ingresar simultáneamente a la recámara trabando el elevador del cargador"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Incidentes de Tiro y Resolución de Trabas",
            "explanation": "El fallo de expulsión o chimenea ocurre cuando la vaina queda pinzada entre la recámara y la corredera, resolviéndose con el golpe de base y barrido (Tap & Rack)."
        },
        {
            "id": "os-m12",
            "difficulty": "media",
            "question": "¿Qué estipula la Ley 12.521 respecto a la potestad de portación de arma de fuego del personal policial?",
            "options": [
                "Es un derecho y una obligación permanente del estado policial, salvo sanción disciplinaria o suspensión médica",
                "Es una atribución opcional que el efectivo puede ejercer solo si cuenta con credencial CLU civil vigente",
                "Se encuentra limitada exclusivamente al horario en que el oficial se encuentra prestando servicio ordinario",
                "Requiere autorización expresa y escrita del Ministerio de Seguridad renovable cada seis meses calendario"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 (Personal Policial de Santa Fe), Art. 12: Estado Policial",
            "explanation": "El estado policial impone el deber y derecho a la portación del arma provista las 24 horas del día, excepto restricciones fundadas de salud o disciplinarias."
        },
        {
            "id": "os-m13",
            "difficulty": "media",
            "question": "¿Cómo se define la 'Cadena de Custodia' de los elementos probatorios secuestrados en el marco del CPP?",
            "options": [
                "El procedimiento que garantiza la trazabilidad, inalterabilidad y autenticidad del indicio desde su hallazgo hasta el juicio",
                "El registro fotográfico que efectúa el sumariante al momento de recepcionar los efectos en la oficina de guardia",
                "El comprobante de entrega en mano que firma el fiscal del MPA cuando recibe los efectos secuestrados en audiencia",
                "El libro foliado de guardia donde se anota el ingreso de pertenencias personales de los contraventores demorados"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP - Preservación de Evidencia y Cadena de Custodia",
            "explanation": "La cadena de custodia asegura que el indicio presentado en juicio es exactamente el mismo que se recogió en la escena, sin adulteraciones ni reemplazos."
        },
        {
            "id": "os-m14",
            "difficulty": "media",
            "question": "¿Cuál es la velocidad reglamentaria máxima para la conducción de patrulleros en desplazamiento normal de prevención según la reglamentación?",
            "options": [
                "Debe adecuarse estrictamente a los límites de la Ley Nacional de Tránsito respetando las normas viales generales",
                "Posee una tolerancia automática de hasta un 50% superior a los vehículos civiles en cualquier arteria urbana",
                "No posee límite de velocidad mientras la unidad mantenga las balizas lumínicas encendidas sin sirena acústica",
                "Está fijada en 80 km/h uniformemente tanto en avenidas como en calles barriales de la ciudad de Santa Fe"
            ],
            "correctIndex": 0,
            "source": "Reglamento de Conducción Policial - ISEP / Ley 24.449",
            "explanation": "En patrullaje ordinario, el móvil policial está sujeto a las reglas generales de tránsito; la excepción rige solo ante emergencias debidamente señalizadas."
        },
        {
            "id": "os-d01",
            "difficulty": "dificil",
            "question": "¿En qué plazo perentorio debe la autoridad policial comunicar la aprehensión de una persona al Fiscal del MPA según el CPP?",
            "options": [
                "De manera inmediata y dentro de las 6 horas de producido el acto material de privación de la libertad",
                "Dentro del término improrrogable de las 24 horas posteriores a la confección del acta sumarial en comisaría",
                "Al finalizar el turno de guardia de 24 horas en el cual se produjo la intervención de la patrulla policial",
                "Antes de que se cumplan las 48 horas cuando el detenido deba ser trasladado a los tribunales penales"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 214: Comunicación de la aprehensión",
            "explanation": "El Art. 214 exige notificación inmediata y nunca más allá de las 6 horas, bajo apercibimiento de ilegalidad de la detención."
        },
        {
            "id": "os-d02",
            "difficulty": "dificil",
            "question": "En el marco del Decreto 461/15, ¿cuándo prescribe la acción disciplinaria para juzgar una 'Falta Grave'?",
            "options": [
                "A los 2 años de cometida la falta o desde que cesó su consumación continua",
                "Al cumplirse exactamente 1 año calendario desde la fecha del informe inicial",
                "A los 3 años contados a partir del momento en que el superior tomó conocimiento",
                "Es imprescriptible mientras el oficial involucrado se encuentre en actividad en la fuerza"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Art. 45: Prescripción de la Acción Disciplinaria",
            "explanation": "Las faltas leves prescriben al año, las graves a los dos años, y las gravísimas a los tres años (o al plazo de prescripción penal si constituye delito)."
        },
        {
            "id": "os-d03",
            "difficulty": "dificil",
            "question": "¿Cuál es la consecuencia jurídica ineludible si se realiza un secuestro probatorio sin testigos civiles habiendo podido convocarlos?",
            "options": [
                "La nulidad absoluta del acto procesal por violación de las formas sustanciales de la prueba",
                "Una simple falta administrativa leve que se subsana con la ratificación testimonial del sumariante",
                "La convalidación automática por parte del fiscal al momento de formalizar la acusación en la audiencia",
                "El pase a disponibilidad preventiva de todo el personal policial que firmó el acta de secuestro"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Arts. 138, 161 y 162: Régimen de Nulidades",
            "explanation": "La omisión injustificada de testigos de actuación en requisas y secuestros vicia el acto de nulidad absoluta insanable (teoría del fruto del árbol envenenado)."
        },
        {
            "id": "os-d04",
            "difficulty": "dificil",
            "question": "En balística forense, ¿qué elementos caracterizan al disparo a 'Quemarrropa' sobre un cuerpo humano?",
            "options": [
                "Presencia de tatuaje de pólvora indeleble, ahumamiento denso y quemadura por la llama de la deflagración",
                "Orificio de entrada con bordes evertidos sin presencia de residuos químicos ni hollín circundante",
                "Ausencia total de zona de Fish o anillo de enjugamiento alrededor del orificio de ingreso del proyectil",
                "Presencia exclusiva de dispersión cónica de perdigones a una distancia mayor a los quince metros"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Balística Forense y Efectos de Disparo",
            "explanation": "El disparo a quemarropa (dentro del alcance de la llama) produce quemadura de tejidos, depósito concentrado de hollín e incrustación de pólvora."
        },
        {
            "id": "os-d05",
            "difficulty": "dificil",
            "question": "Conforme a la Ley 12.521, ¿qué recurso administrativo puede interponer el personal policial frente a una sanción disciplinaria directa?",
            "options": [
                "Recurso de Reconsideración dentro de los 5 días hábiles ante la misma autoridad que dictó la sanción",
                "Demanda contencioso administrativa directa ante la Cámara Contenciosa dentro de las 48 horas",
                "Acción de Amparo constitucional ante los Tribunales del Trabajo de la ciudad de Rosario o Santa Fe",
                "Denuncia de ilegítima sanción ante el Defensor del Pueblo de la Provincia de Santa Fe"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521, Art. 78 y Decreto Reglamentario 461/15",
            "explanation": "El policía sancionado puede interponer recurso de reconsideración dentro de 5 días hábiles, y subsidiariamente apelación jerárquica ante el superior inmediato."
        },
        {
            "id": "os-d06",
            "difficulty": "dificil",
            "question": "¿Qué establece el Art. 15 de la Ley 12.521 respecto a los límites de la obediencia jerárquica policial?",
            "options": [
                "El deber de obediencia cesa cuando la orden impartida sea manifiestamente contraria a la ley o constituya delito",
                "El subordinado debe cumplir siempre la orden impartida, limitándose su derecho a formular queja posterior por escrito",
                "Solo los oficiales con jerarquía superior a Subcomisario pueden negarse a ejecutar órdenes de sus superiores directos",
                "La objeción de conciencia permite rechazar órdenes de servicio adicionales durante fines de semana y feriados"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 (Personal Policial de Santa Fe), Art. 15: Deber de Obediencia",
            "explanation": "La obediencia debida no ampara la ejecución de actos manifiestamente ilegales o lesivos de derechos humanos fundamentales; la orden delictual no debe acatarse."
        },
        {
            "id": "os-d07",
            "difficulty": "dificil",
            "question": "En materia de Juicio por Jurados (Ley 14.258 de Santa Fe), ¿qué causa criminal requiere obligatoriamente veredicto ciudadano popular?",
            "options": [
                "Homicidios calificados del Art. 80 del Código Penal y delitos cometidos por policías que resulten en muerte",
                "Todos los delitos de robo calificado en poblado y en banda con armas de fuego de uso civil condicional",
                "Las causas correccionales de lesiones leves en riña y accidentes de tránsito con imputados alcoholizados",
                "Las causas de microtráfico barrial tramitadas bajo el régimen de desfederalización de la Ley 14.239"
            ],
            "correctIndex": 0,
            "source": "Ley 14.258 (Juicio por Jurados de Santa Fe), Art. 2: Competencia Material",
            "explanation": "La Ley 14.258 establece jurados populares para homicidios calificados, abusos seguidos de muerte y delitos donde intervenga personal policial con resultado muerte."
        },
        {
            "id": "os-d08",
            "difficulty": "dificil",
            "question": "¿Qué procedimiento técnico balístico debe ejecutarse ante una doble alimentación (Tipo 2) en situación de enfrentamiento armado?",
            "options": [
                "Fijar corredera atrás (Lock), extraer cargador a la fuerza (Strip), ciclar corredera dos veces (Rack) e insertar nuevo cargador",
                "Presionar fuertemente la base del cargador hacia arriba (Tap) y ciclar la corredera una sola vez hacia atrás",
                "Accionar inmediatamente la palanca de desamartillado (Decocker) y apretar la cola del disparador en doble acción",
                "Girar el arma en posición SUL y soplar la recámara para liberar el proyectil que bloquea el percutor"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Pág. 32: Resolución de Interrupciones Complejas",
            "explanation": "La doble alimentación no sale con un simple Tap-Rack; requiere retener corredera, arrancar el cargador trabado, ciclar para vaciar la recámara y recargar."
        },
        {
            "id": "os-d09",
            "difficulty": "dificil",
            "question": "Conforme al régimen disciplinario policial, ¿qué distingue sustancialmente a la 'Cesantía' de la 'Exoneración'?",
            "options": [
                "La cesantía no quita el derecho a los aportes previsionales acumulados; la exoneración extingue todos los derechos y es la máxima sanción",
                "La cesantía permite reincorporarse a la fuerza a los seis meses; la exoneración requiere esperar cinco años para rendir concurso",
                "La cesantía se aplica a Oficiales Subalternos y la exoneración es una figura exclusiva para el Agrupamiento de Supervisión",
                "No existe diferencia jurídica ya que ambos términos se utilizan como sinónimos en los decretos del poder ejecutivo"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Arts. 18 y 19: Destitución Policial",
            "explanation": "La cesantía extingue la relación de empleo pero preserva derechos jubilatorios consolidados; la exoneración cancela todo beneficio y grado, siendo la más gravosa."
        },
        {
            "id": "os-d10",
            "difficulty": "dificil",
            "question": "En el levantamiento de un arma de fuego en el lugar del hecho, ¿por qué está terminantemente prohibido levantarla introduciendo una lapicera en el cañón?",
            "options": [
                "Porque daña el estriado helicoidal del ánima y puede transferir fibras alterando las pruebas de microscopía comparativa",
                "Porque activa mecánicamente el mecanismo del seguro automático de percutor bloqueando la corredera",
                "Porque el peso del arma curva el cañón alterando permanentemente la precisión balística en disparos de prueba",
                "Porque está prohibido por el Código de Procedimientos de la O.N.U. bajo apercibimiento de multa administrativa"
            ],
            "correctIndex": 0,
            "source": "Manual de Criminalística y Preservación - ISEP 2026",
            "explanation": "Introducir elementos en el ánima destruye residuos de pólvora y raya las estrías microscópicas que individualizan el arma con las balas testigo."
        },
        {
            "id": "os-d11",
            "difficulty": "dificil",
            "question": "Según el CPP de Santa Fe, ¿cuál es el plazo máximo que puede durar la incomunicación de un detenido ordenada por el Fiscal?",
            "options": [
                "Hasta 48 horas y únicamente por resolución judicial fundada cuando existan motivos para temer entorpecimiento",
                "Hasta 12 horas corridas a criterio exclusivo del sumariante de la comisaría sin intervención de terceros",
                "Hasta 7 días hábiles siempre que se trate de bandas organizadas dedicadas al narcomenudeo o microtráfico",
                "La incomunicación se encuentra expresamente prohibida en el sistema procesal penal santafesino"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 219: Incomunicación del Imputado",
            "explanation": "La incomunicación no la decide la policía; requiere orden del juez a pedido del fiscal por un máximo de 48 horas, preservando el contacto con su defensor."
        },
        {
            "id": "os-d12",
            "difficulty": "dificil",
            "question": "¿Qué establece el principio de 'Prohibición de autoincriminación' respecto al personal policial en el momento de la aprehensión?",
            "options": [
                "La policía no puede interrogar al detenido sobre el hecho ni registrar manifestaciones suyas sin presencia de su abogado",
                "El detenido tiene la obligación legal de declarar verbalmente ante el oficial de servicio en el libro de guardia",
                "El personal policial puede ofrecer reducciones de pena si el demorado indica el lugar donde se escondió el botín",
                "La policía debe grabar un video con el celular del oficial donde el sospechoso admita voluntariamente su autoría"
            ],
            "correctIndex": 0,
            "source": "Constitución Nacional Art. 18 / Ley 12.734 (CPP Santa Fe), Art. 216",
            "explanation": "Las manifestaciones espontáneas o interrogatorios policiales sin defensor son nulos de nulidad absoluta; solo puede declarar válidamente ante el juez o fiscal."
        },
        {
            "id": "os-d13",
            "difficulty": "dificil",
            "question": "En la tríada de Seguridad de la Información (CID), ¿qué significa el principio de 'Disponibilidad'?",
            "options": [
                "Que la información y los sistemas operativos estén accesibles para los usuarios autorizados cuando sea necesario",
                "Que los datos policiales sean de acceso público y gratuito para cualquier ciudadano a través de la web oficial",
                "Que los oficiales de guardia estén disponibles para realizar horas de servicio adicional los fines de semana",
                "Que el personal policial mantenga sus líneas de telefonía corporativa abiertas las 24 horas del día"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Seguridad de la Información: Tríada CID",
            "explanation": "La Disponibilidad asegura que los recursos, bases de datos y sistemas de despacho 911 funcionen continuamente sin interrupciones por ciberataques o fallos."
        },
        {
            "id": "os-d14",
            "difficulty": "dificil",
            "question": "¿Cuál es la consecuencia procesal de no informar los derechos constitucionales (Art. 216 CPP) al aprehendido al momento de su detención?",
            "options": [
                "Posible planteo de nulidad de las actuaciones posteriores y responsabilidad disciplinaria para el personal policial",
                "El archivo inmediato de la causa penal sin posibilidad de reabrir investigación contra el imputado",
                "Una sanción pecuniaria automática con descuento directo en el haber mensual del primer preventor",
                "La libertad bajo caución real fijada exclusivamente por la guardia policial sin intervención del MPA"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 216 y 217: Lectura de Derechos",
            "explanation": "La intimación de derechos (conocer la causa, guardar silencio, designar defensor, llamada telefónica) es una garantía de orden público cuya omisión acarrea nulidad."
        },
        {
            "id": "isep-d26-011",
            "difficulty": "media",
            "question": "Una actuación policial ilegítima o irregular afecta directamente:",
            "options": [
                "Solo a la institución policial",
                "El trabajo de fiscales y jueces",
                "El procedimiento administrativo",
                "El régimen disciplinario interno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El trabajo de fiscales y jueces\"."
        },
        {
            "id": "isep-d26-021",
            "difficulty": "facil",
            "question": "El cumplimiento de la ley se inicia principalmente con:",
            "options": [
                "La actuación policial",
                "La actuación legislativa",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"La actuación policial\"."
        },
        {
            "id": "isep-d26-022",
            "difficulty": "media",
            "question": "El Judo Verbal es una técnica de:",
            "options": [
                "Comunicación táctica",
                "Intimidación psicológica",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida",
                "Centralización absoluta de la toma de decisiones sin delegación de mando"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP - Comunicación Táctica y Judo Verbal Operativo",
            "explanation": "El Judo Verbal enseña a utilizar la empatía y la persuasión táctica para desescalar conflictos y resolver intervenciones sin violencia. La opción correcta conforme a la normativa oficial es: \"Comunicación táctica\"."
        },
        {
            "id": "isep-d26-023",
            "difficulty": "media",
            "question": "El objetivo principal del Judo Verbal es:",
            "options": [
                "Resolver conflictos sin recurrir a la fuerza física",
                "Ganar discusiones",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida",
                "Centralización absoluta de la toma de decisiones sin delegación de mando"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP - Comunicación Táctica y Judo Verbal Operativo",
            "explanation": "El Judo Verbal enseña a utilizar la empatía y la persuasión táctica para desescalar conflictos y resolver intervenciones sin violencia. La opción correcta conforme a la normativa oficial es: \"Resolver conflictos sin recurrir a la fuerza física\"."
        },
        {
            "id": "isep-d26-032",
            "difficulty": "facil",
            "question": "Si no se cuenta con documentación, la edad se acredita mediante:",
            "options": [
                "Declaración de los padres",
                "Informe médico de menores",
                "Intervención del fiscal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Informe médico de menores\"."
        },
        {
            "id": "isep-d26-033",
            "difficulty": "facil",
            "question": "La actuación policial en hechos que involucren menores se rige por:",
            "options": [
                "Código Procesal Penal",
                "Ley de Seguridad Pública",
                "Código Procesal de Menores",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Código Procesal de Menores\"."
        },
        {
            "id": "isep-d26-034",
            "difficulty": "media",
            "question": "Ante la participación de un menor en un delito, la policía debe comunicar inmediatamente al:",
            "options": [
                "Fiscal de turno",
                "Juez de Garantías",
                "Juez de Menores",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Juez de Menores\"."
        },
        {
            "id": "isep-d26-035",
            "difficulty": "dificil",
            "question": "Dentro de las 24 horas, la autoridad policial debe comunicar el hecho al:",
            "options": [
                "Fiscal de Menores",
                "Asesor de Menores",
                "Juez Penal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Asesor de Menores\"."
        },
        {
            "id": "isep-d26-036",
            "difficulty": "facil",
            "question": "Si el menor es punible, además se debe dar intervención inmediata al:",
            "options": [
                "Defensor Oficial",
                "Asesor de Menores",
                "Fiscal de Menores",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Fiscal de Menores\"."
        },
        {
            "id": "isep-d26-037",
            "difficulty": "media",
            "question": "En caso de aprehensión de un menor, la policía debe informar de inmediato a:",
            "options": [
                "El fiscal",
                "El juez",
                "Los padres, tutor o guardadores",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Los padres, tutor o guardadores\"."
        },
        {
            "id": "isep-d26-038",
            "difficulty": "dificil",
            "question": "Cuando un menor es aprehendido, detenido o citado, el funcionario policial debe informarle sus derechos:",
            "options": [
                "Dentro de las 24 horas",
                "Luego del interrogatorio",
                "De inmediato y antes de cualquier otro acto",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"De inmediato y antes de cualquier otro acto\"."
        },
        {
            "id": "isep-d26-041",
            "difficulty": "dificil",
            "question": "Las diligencias urgentes realizadas por la policía deben informarse al juez dentro de:",
            "options": [
                "48 horas",
                "72 horas",
                "24 horas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"24 horas\"."
        },
        {
            "id": "isep-d26-044",
            "difficulty": "dificil",
            "question": "La omisión de informar los derechos al menor genera como consecuencia:",
            "options": [
                "Falta administrativa",
                "Sanción disciplinaria",
                "Nulidad del procedimiento",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Nulidad del procedimiento\"."
        },
        {
            "id": "isep-d26-055",
            "difficulty": "media",
            "question": "El Acta de Procedimiento se define como:",
            "options": [
                "Un informe administrativo interno",
                "Un relato subjetivo del personal interviniente",
                "Un relato histórico, circunstanciado y escrito de toda intervención policial",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Un relato histórico, circunstanciado y escrito de toda intervención policial\"."
        },
        {
            "id": "isep-d26-056",
            "difficulty": "media",
            "question": "El Acta de Procedimiento se labra cuando la intervención policial ocurre:",
            "options": [
                "Solo en comisión de delito",
                "Solo con orden judicial",
                "En prevención, comisión o con posterioridad al delito",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"En prevención, comisión o con posterioridad al delito\"."
        },
        {
            "id": "isep-d26-057",
            "difficulty": "media",
            "question": "¿Cuál NO es una finalidad del Acta de Procedimiento?",
            "options": [
                "Dejar constancia clara de los hechos",
                "Respaldar actuaciones judiciales futuras",
                "Emitir opinión personal del funcionario",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Emitir opinión personal del funcionario\"."
        },
        {
            "id": "isep-d26-059",
            "difficulty": "media",
            "question": "¿En qué casos el personal policial puede restringir la libertad sin orden judicial?",
            "options": [
                "En operativos preventivos",
                "En averiguación de antecedentes",
                "En casos de flagrancia",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"En casos de flagrancia\"."
        },
        {
            "id": "isep-d26-060",
            "difficulty": "dificil",
            "question": "Según el Art. 213 del CPP, hay flagrancia cuando el presunto autor:",
            "options": [
                "Es señalado días después del hecho",
                "Es sorprendido intentando o cometiendo el hecho",
                "antecedentes penales",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Es sorprendido intentando o cometiendo el hecho\"."
        },
        {
            "id": "isep-d26-061",
            "difficulty": "dificil",
            "question": "¿Cuál de las siguientes situaciones NO constituye flagrancia según el Art. 213 CPP?",
            "options": [
                "Ser perseguido inmediatamente después del delito",
                "Poseer objetos que hagan presumir participación inmediata",
                "Ser denunciado horas después sin otros indicios",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ser denunciado horas después sin otros indicios\"."
        },
        {
            "id": "isep-d26-064",
            "difficulty": "facil",
            "question": "En caso de demora, el personal policial debe dar aviso inmediato a:",
            "options": [
                "El juez competente",
                "El fiscal de turno",
                "El Servicio Público Provincial de la Defensa Penal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El Servicio Público Provincial de la Defensa Penal\"."
        },
        {
            "id": "isep-d26-066",
            "difficulty": "media",
            "question": "Las personas demoradas trasladadas a dependencias policiales:",
            "options": [
                "Pueden alojarse con detenidos",
                "Deben permanecer en calabozos",
                "No pueden ser alojadas con detenidos por delitos o contravenciones",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"No pueden ser alojadas con detenidos por delitos o contravenciones\"."
        },
        {
            "id": "isep-d26-071",
            "difficulty": "facil",
            "question": "El personal interviniente deberá actuar:",
            "options": [
                "Con autoridad y severidad",
                "Con firmeza y respeto",
                "De manera discrecional",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Con firmeza y respeto\"."
        },
        {
            "id": "isep-d26-076",
            "difficulty": "dificil",
            "question": "El artículo del Código Penal que reprime las lesiones culposas es:",
            "options": [
                "Art. 94 CP",
                "Art. 90 CP",
                "Art. 89 CP",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Art. 94 CP\"."
        },
        {
            "id": "isep-d26-077",
            "difficulty": "media",
            "question": "En lesiones culposas leves por accidente de tránsito, corresponde:",
            "options": [
                "Liberar al conductor sin actuaciones",
                "Acta de procedimiento, secuestro preventivo y análisis biológicos",
                "Allanamiento inmediato del domicilio",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Acta de procedimiento, secuestro preventivo y análisis biológicos\"."
        },
        {
            "id": "isep-d26-079",
            "difficulty": "facil",
            "question": "En lesiones culposas graves u homicidio culposo, es obligatorio",
            "options": [
                "Consultar a la Fiscalía",
                "Entregar el rodado inmediatamente",
                "Evitar secuestros",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 0,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Consultar a la Fiscalía\"."
        },
        {
            "id": "isep-d26-084",
            "difficulty": "dificil",
            "question": "El principio constitucional que regula los allanamientos es:",
            "options": [
                "Art. 14 CN",
                "Art. 17 CN",
                "Art. 18 CN",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Art. 18 CN\"."
        },
        {
            "id": "isep-d26-085",
            "difficulty": "media",
            "question": "En Santa Fe, el allanamiento con orden judicial puede ser autorizado por:",
            "options": [
                "Solo la policía",
                "El Tribunal a solicitud fundada",
                "El vecino",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El Tribunal a solicitud fundada\"."
        },
        {
            "id": "isep-d26-086",
            "difficulty": "media",
            "question": "El allanamiento sin orden judicial es válido cuando:",
            "options": [
                "Lo solicita la víctima",
                "Existe urgencia legalmente justificada",
                "El domicilio está cerrado",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Existe urgencia legalmente justificada\"."
        },
        {
            "id": "isep-d26-087",
            "difficulty": "dificil",
            "question": "El art. 170 CPPP-SF habilita el allanamiento sin orden ante:",
            "options": [
                "Falta de testigos",
                "Incendio o peligro grave",
                "Sospechas genéricas",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Incendio o peligro grave\"."
        },
        {
            "id": "isep-d26-088",
            "difficulty": "media",
            "question": "La requisa personal requiere:",
            "options": [
                "Identificación simple",
                "Motivos razonables fundados",
                "Autorización del requisado",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Motivos razonables fundados\"."
        },
        {
            "id": "isep-d26-089",
            "difficulty": "media",
            "question": "Antes de realizar una requisa, el personal debe:",
            "options": [
                "Reducir a la persona",
                "Invitar a exhibir el objeto",
                "Trasladar a la seccional",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Invitar a exhibir el objeto\"."
        },
        {
            "id": "isep-d26-091",
            "difficulty": "facil",
            "question": "El efecto túnel en estrés táctico provoca:",
            "options": [
                "El efecto túnel en estrés táctico provoca:",
                "Reducción severa de la visión periférica",
                "Mejora de audición",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Reducción severa de la visión periférica\"."
        },
        {
            "id": "isep-d26-096",
            "difficulty": "facil",
            "question": "La principal herramienta del policía en situaciones críticas o de crisis es:",
            "options": [
                "El uso inmediato del arma de fuego",
                "La fuerza física",
                "El uso de la palabra y el lenguaje gestual",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El uso de la palabra y el lenguaje gestual\"."
        },
        {
            "id": "isep-d26-101",
            "difficulty": "facil",
            "question": "La Regla de Tueller establece que una persona armada con arma blanca puede representar una amenaza mortal hasta una distancia aproximada de:",
            "options": [
                "3 metros",
                "5 metros",
                "6,4 metros (21 pies)",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"6,4 metros (21 pies)\"."
        },
        {
            "id": "isep-d26-106",
            "difficulty": "facil",
            "question": "¿Cuál de los siguientes NO es un requisito para los vehículos de emergencia?",
            "options": [
                "Habilitación técnica especial.",
                "Antigüedad máxima de 15 años.",
                "Uso permanente de sirena en toda intervención.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Uso permanente de sirena en toda intervención.\"."
        },
        {
            "id": "isep-d26-111",
            "difficulty": "facil",
            "question": "Los programas actuales de formación policial incorporan principalmente",
            "options": [
                "Comunicación efectiva, desescalamiento y uso proporcional de la fuerza",
                "Eliminación de protocolos previos.",
                "Uso intensivo de la fuerza letal.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Comunicación efectiva, desescalamiento y uso proporcional de la fuerza\"."
        },
        {
            "id": "isep-d26-126",
            "difficulty": "facil",
            "question": "Corresponde la competencia provincial cuando la venta es:",
            "options": [
                "Internacional.",
                "A gran escala.",
                "Directa al consumidor final.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Directa al consumidor final.\"."
        },
        {
            "id": "isep-d26-131",
            "difficulty": "facil",
            "question": "Si el cultivo NO tiene destino inequívoco al consumo personal:",
            "options": [
                "Se aplica el tipo atenuado.",
                "Se excluye responsabilidad penal.",
                "Se aplica la pena de 4 a 15 años.",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se aplica la pena de 4 a 15 años.\"."
        },
        {
            "id": "isep-d26-141",
            "difficulty": "facil",
            "question": "La denuncia con reserva de identidad se caracteriza porque:",
            "options": [
                "El denunciante no se identifica en ningún momento",
                "El denunciante está identificado, pero sus datos se mantienen en reserva",
                "Solo puede ser realizada por funcionarios públicos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El denunciante está identificado, pero sus datos se mantienen en reserva\"."
        },
        {
            "id": "isep-d26-142",
            "difficulty": "dificil",
            "question": "Según el Código Procesal Penal de Santa Fe, la protección del denunciante o testigo tiene como finalidad principal:",
            "options": [
                "Evitar la nulidad del proceso",
                "Garantizar el secreto de sumario",
                "Preservarlo de intimidaciones o represalias",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Preservarlo de intimidaciones o represalias\"."
        },
        {
            "id": "isep-d26-144",
            "difficulty": "facil",
            "question": "En la denuncia anónima, el denunciante:",
            "options": [
                "Se identifica ante el fiscal",
                "Se identifica solo ante la policía",
                "No se identifica",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"No se identifica\"."
        },
        {
            "id": "isep-d26-146",
            "difficulty": "facil",
            "question": "Para que una denuncia anónima sea considerada válida como noticia criminis, debe ser:",
            "options": [
                "Formal y escrita",
                "Seria, verosímil y razonable, con datos concretos",
                "Ratificada por un testigo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Seria, verosímil y razonable, con datos concretos\"."
        },
        {
            "id": "isep-d26-150",
            "difficulty": "media",
            "question": "El lugar del hecho se considera escena del delito:",
            "options": [
                "Solo cuando lo confirma el fiscal.",
                "Hasta que se determine lo contrario.",
                "Cuando hay testigos presenciales.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Hasta que se determine lo contrario.\"."
        },
        {
            "id": "isep-d26-151",
            "difficulty": "facil",
            "question": "¿Cuál de los siguientes NO integra el concepto de lugar del hecho?",
            "options": [
                "Lugar donde se cometió el hecho.",
                "Lugar de ocultamiento.",
                "Dependencia policial interviniente",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Dependencia policial interviniente\"."
        },
        {
            "id": "isep-d26-156",
            "difficulty": "facil",
            "question": "Puede haber dentro de un mismo hecho:",
            "options": [
                "Un solo escenario posible.",
                "Únicamente escenarios secundarios.",
                "Varios escenarios primarios y secundarios.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Varios escenarios primarios y secundarios.\"."
        },
        {
            "id": "isep-d26-161",
            "difficulty": "facil",
            "question": "La \"hostilidad de la zona\" se entiende como:",
            "options": [
                "Una característica barrial.",
                "Un concepto socioeconómico.",
                "Una situación circunstancial del lugar.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Una situación circunstancial del lugar.\"."
        },
        {
            "id": "isep-d26-162",
            "difficulty": "dificil",
            "question": "La actuación policial frente a la pérdida de indicios debe ajustarse a:",
            "options": [
                "Art. 18 de la Constitución Nacional.",
                "Art. 174 del CPP Santa Fe.",
                "Art. 268 del CPP Santa Fe (Ley 12.734).",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Art. 268 del CPP Santa Fe (Ley 12.734).\"."
        },
        {
            "id": "isep-d26-166",
            "difficulty": "facil",
            "question": "La primera etapa del proceso (indicio) se caracteriza por:",
            "options": [
                "Afirmar la naturaleza del indicio.",
                "Validar testimonios como verdad absoluta.",
                "Recolección inicial y aseguramiento legal.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Recolección inicial y aseguramiento legal.\"."
        },
        {
            "id": "isep-d26-168",
            "difficulty": "facil",
            "question": "La tercera etapa del proceso permite:",
            "options": [
                "La simple conservación del indicio.",
                "Elevar evidencia válida al Fiscal como prueba judicial.",
                "La actuación autónoma policial.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Elevar evidencia válida al Fiscal como prueba judicial.\"."
        },
        {
            "id": "isep-d26-171",
            "difficulty": "facil",
            "question": "¿Cuáles son las acciones obligatorias del ACTO DE INTERVENCIÓN?",
            "options": [
                "Búsqueda – Recolección – Preservación",
                "Comunicar – Preservar – Custodiar",
                "Informar – Investigar – Secuestrar",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Comunicar – Preservar – Custodiar\"."
        },
        {
            "id": "isep-d26-173",
            "difficulty": "dificil",
            "question": "El artículo del CPP que regula los actos irreproducibles o definitivos es:",
            "options": [
                "Art. 163",
                "Art. 174",
                "Art. 260",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Art. 260\"."
        },
        {
            "id": "isep-d26-175",
            "difficulty": "media",
            "question": "¿Qué documentación debe confeccionarse siempre como acto procesal?",
            "options": [
                "Solo el acta de procedimiento",
                "Acta de procedimiento, croquis e inspección judicial",
                "Informe preliminar y sumario",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Acta de procedimiento, croquis e inspección judicial\"."
        },
        {
            "id": "isep-d26-181",
            "difficulty": "dificil",
            "question": "La inspección judicial (u ocular) está regulada por:",
            "options": [
                "Art. 260 CPP",
                "Art. 268 CPP",
                "Art. 163 CPP",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Art. 163 CPP\"."
        },
        {
            "id": "isep-d26-186",
            "difficulty": "facil",
            "question": "Sin legalidad en la actuación policial:",
            "options": [
                "La prueba se refuerza",
                "La investigación continúa igual",
                "No hay prueba válida",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No hay prueba válida\"."
        },
        {
            "id": "isep-d26-187",
            "difficulty": "facil",
            "question": "La Ley N° 12.734 corresponde a:",
            "options": [
                "Ley Orgánica de la Policía",
                "Nuevo Código Procesal Penal de Santa Fe",
                "Código Penal Argentino",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Nuevo Código Procesal Penal de Santa Fe\"."
        },
        {
            "id": "isep-d26-190",
            "difficulty": "dificil",
            "question": "Según el Art. 270 del CPP de Santa Fe, la Policía:",
            "options": [
                "Actúa con total autonomía",
                "Debe cumplir directivas bajo dirección jurídica del MPA",
                "Solo interviene por orden judicial escrita",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Debe cumplir directivas bajo dirección jurídica del MPA\"."
        },
        {
            "id": "isep-d26-191",
            "difficulty": "dificil",
            "question": "El Art. 271 del CPP establece:",
            "options": [
                "Las facultades del Juez",
                "El poder disciplinario ante incumplimientos policiales",
                "Las atribuciones del Defensor",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El poder disciplinario ante incumplimientos policiales\"."
        },
        {
            "id": "isep-d26-192",
            "difficulty": "facil",
            "question": "Las instrucciones del Fiscal pueden ser:",
            "options": [
                "Orales o escritas únicamente",
                "Genéricas o específicas",
                "Judiciales o administrativas",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Genéricas o específicas\"."
        },
        {
            "id": "isep-d26-193",
            "difficulty": "facil",
            "question": "Las decisiones estratégicas de investigación deben ser:",
            "options": [
                "Tomadas exclusivamente por la Policía",
                "Consultadas al Fiscal",
                "Decididas por el Juez",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Consultadas al Fiscal\"."
        },
        {
            "id": "isep-d26-194",
            "difficulty": "facil",
            "question": "El Legajo de Investigación:",
            "options": [
                "Es un documento interno policial",
                "Reemplaza al Código Procesal",
                "Pertenece al Fiscal y puede ser confeccionado por la Policía",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Pertenece al Fiscal y puede ser confeccionado por la Policía\"."
        },
        {
            "id": "isep-d26-196",
            "difficulty": "facil",
            "question": "La Instrucción General N° 4 fue dictada por:",
            "options": [
                "El Ministro de Seguridad",
                "El Gobernador de Santa Fe",
                "El Dr. Julio de Olazábal",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El Dr. Julio de Olazábal\"."
        },
        {
            "id": "isep-d26-197",
            "difficulty": "facil",
            "question": "La IPP puede iniciarse por:",
            "options": [
                "Denuncia anónima exclusivamente",
                "Decisión del Fiscal o acción de la Policía",
                "Orden del Juez únicamente",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Decisión del Fiscal o acción de la Policía\"."
        },
        {
            "id": "isep-d26-198",
            "difficulty": "media",
            "question": "La presencia del Fiscal en el lugar del hecho:",
            "options": [
                "Es obligatoria en todos los casos",
                "Depende de su evaluación como director de la investigación",
                "Solo ocurre en delitos graves",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Depende de su evaluación como director de la investigación\"."
        },
        {
            "id": "isep-d26-201",
            "difficulty": "facil",
            "question": "El fiscal puede ingresar a la Zona Interior Crítica:",
            "options": [
                "Libremente en cualquier momento",
                "Solo con autorización del jefe policial",
                "Por canal seguro e indicado por el Coordinador Pericial",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Por canal seguro e indicado por el Coordinador Pericial\"."
        },
        {
            "id": "isep-d26-206",
            "difficulty": "facil",
            "question": "La entrada y salida única de la escena es:",
            "options": [
                "De uso libre para funcionarios",
                "Para ingreso de prensa",
                "Un canal exclusivo y seguro para emergencias",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Un canal exclusivo y seguro para emergencias\"."
        },
        {
            "id": "isep-d26-207",
            "difficulty": "facil",
            "question": "La figura del Coordinador Pericial surge de:",
            "options": [
                "Ley 12.734",
                "Ley 13.013",
                "Resolución 26/2014 de la Fiscalía Regional N° 2 Rosario",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Resolución 26/2014 de la Fiscalía Regional N° 2 Rosario\"."
        },
        {
            "id": "isep-d26-209",
            "difficulty": "facil",
            "question": "Dentro de la escena, la máxima autoridad es:",
            "options": [
                "El jefe de comisaría",
                "El fiscal",
                "El Coordinador Pericial (en materia técnica-científica)",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El Coordinador Pericial (en materia técnica-científica)\"."
        },
        {
            "id": "isep-d26-211",
            "difficulty": "facil",
            "question": "La preservación de la cadena de custodia es responsabilidad:",
            "options": [
                "Exclusiva del juez",
                "Del primer testigo",
                "Del Coordinador Pericial y equipo interviniente",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Del Coordinador Pericial y equipo interviniente\"."
        },
        {
            "id": "isep-d26-213",
            "difficulty": "facil",
            "question": "El primer interventor:",
            "options": [
                "Puede retirarse si llega el fiscal",
                "Puede modificar la escena",
                "No puede retirarse y debe informar todo lo observado",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"No puede retirarse y debe informar todo lo observado\"."
        },
        {
            "id": "isep-d26-215",
            "difficulty": "facil",
            "question": "Entre las funciones técnicas del Coordinador Pericial se encuentra:",
            "options": [
                "Interrogar imputados",
                "Determinar ubicación geográfica, vías de acceso, iluminación y clima",
                "Ordenar allanamientos",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Determinar ubicación geográfica, vías de acceso, iluminación y clima\"."
        },
        {
            "id": "isep-d26-222",
            "difficulty": "dificil",
            "question": "El contenido del legajo según el Art. 253 CPP debe incluir:",
            "options": [
                "Opiniones personales",
                "Solo declaraciones testimoniales",
                "Documentación de todos los actos y elementos para probar identidad y daño",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Documentación de todos los actos y elementos para probar identidad y daño\"."
        },
        {
            "id": "isep-d26-223",
            "difficulty": "dificil",
            "question": "Los actos irreproducibles o definitivos están regulados en:",
            "options": [
                "Art. 18 CN",
                "Art. 260 CPP",
                "Decreto 2703/10",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Art. 260 CPP\"."
        },
        {
            "id": "isep-d26-224",
            "difficulty": "facil",
            "question": "El Nuevo Código Procesal Penal de la Provincia de Santa Fe fue establecido por:",
            "options": [
                "Ley 23.737",
                "Ley 24.449",
                "Ley 12.734",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ley 12.734\"."
        },
        {
            "id": "isep-d26-225",
            "difficulty": "facil",
            "question": "La Investigación Penal Preparatoria (IPP) es dirigida por:",
            "options": [
                "Juez de Garantías",
                "Defensor",
                "Fiscal del MPA",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Fiscal del MPA\"."
        },
        {
            "id": "isep-d26-226",
            "difficulty": "facil",
            "question": "El órgano encargado de la persecución penal en Santa Fe es el:",
            "options": [
                "Poder Ejecutivo",
                "Ministerio de Seguridad",
                "Ministerio Público de la Acusación",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Ministerio Público de la Acusación\"."
        },
        {
            "id": "isep-d26-227",
            "difficulty": "facil",
            "question": "El Ministerio Público de la Acusación fue creado por:",
            "options": [
                "Ley 12.734",
                "Ley 13.013",
                "Ley 24.660",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ley 13.013\"."
        },
        {
            "id": "isep-d26-228",
            "difficulty": "facil",
            "question": "Según la Instrucción General N° 4 (2014) del Dr. Julio de Olazábal, la Policía debe:",
            "options": [
                "Iniciar sumario propio",
                "Ajustar su actuación a guías para el legajo",
                "Actuar sin comunicación al fiscal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ajustar su actuación a guías para el legajo\"."
        },
        {
            "id": "isep-d26-229",
            "difficulty": "facil",
            "question": "En el actual sistema procesal penal:",
            "options": [
                "Existe el sumario policial",
                "Existe el legajo policial",
                "Existe el Legajo de Investigación del Fiscal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Existe el Legajo de Investigación del Fiscal\"."
        },
        {
            "id": "isep-d26-231",
            "difficulty": "facil",
            "question": "La cadena de custodia:",
            "options": [
                "Finaliza con la sentencia",
                "Finaliza con la acusación",
                "Puede continuar aun después de la sentencia",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Puede continuar aun después de la sentencia\"."
        },
        {
            "id": "isep-d26-236",
            "difficulty": "facil",
            "question": "Los residuos de disparo se analizan mediante:",
            "options": [
                "Microscopio óptico común",
                "Cromatografía líquida",
                "Microscopio Electrónico de Barrido",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Microscopio Electrónico de Barrido\"."
        },
        {
            "id": "isep-d26-241",
            "difficulty": "media",
            "question": "Si una muestra biológica llega en malas condiciones, el funcionario debe:",
            "options": [
                "Rechazarla sin acta",
                "Labrar acta e informar a la autoridad judicial",
                "Desecharla",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Labrar acta e informar a la autoridad judicial\"."
        },
        {
            "id": "isep-d26-242",
            "difficulty": "facil",
            "question": "En la IPP, la Policía puede:",
            "options": [
                "Investigar autónomamente sin control",
                "Actuar en auxilio de la justicia bajo dirección del fiscal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno",
                "Solo ante la presencia de dos testigos hábiles y personal de la AIC/PDI"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Actuar en auxilio de la justicia bajo dirección del fiscal\"."
        },
        {
            "id": "isep-d26-248",
            "difficulty": "facil",
            "question": "El Decreto que reglamenta el Régimen de Ascensos y Concursos es el:",
            "options": [
                "916/08",
                "12734/09",
                "1166/2018",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"1166/2018\"."
        },
        {
            "id": "isep-d26-256",
            "difficulty": "dificil",
            "question": "La causal de inhabilidad por procesamiento se equipara a:",
            "options": [
                "Indagatoria",
                "Detención preventiva",
                "Audiencia imputativa del Art. 274 del Código Procesal Penal de la Provincia de Santa Fe",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Audiencia imputativa del Art. 274 del Código Procesal Penal de la Provincia de Santa Fe\"."
        },
        {
            "id": "isep-d26-260",
            "difficulty": "facil",
            "question": "Si el sumario concluye con suspensión por falta grave:",
            "options": [
                "Puede ascender con retroactividad",
                "Puede ascender sin restricciones",
                "No corresponde el ascenso",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"No corresponde el ascenso\"."
        },
        {
            "id": "isep-d26-266",
            "difficulty": "facil",
            "question": "La Policía es una organización:",
            "options": [
                "Privada",
                "Judicial",
                "Socialmente construida",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Socialmente construida\"."
        },
        {
            "id": "isep-d26-269",
            "difficulty": "facil",
            "question": "El responsable de la conducción operativa y administrativa es:",
            "options": [
                "El Gobernador",
                "El Fiscal",
                "El Jefe de Policía",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El Jefe de Policía\"."
        },
        {
            "id": "isep-d26-271",
            "difficulty": "facil",
            "question": "La Policía se organiza como un cuerpo:",
            "options": [
                "Descentralizado totalmente",
                "Centralizado administrativamente",
                "Judicial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Centralizado administrativamente\"."
        },
        {
            "id": "isep-d26-276",
            "difficulty": "facil",
            "question": "El Departamento Operaciones es:",
            "options": [
                "1",
                "2",
                "3",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"3\"."
        },
        {
            "id": "isep-d26-284",
            "difficulty": "facil",
            "question": "La máxima autoridad policial es:",
            "options": [
                "Subjefe",
                "Fiscal",
                "Jefe de Policía",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Jefe de Policía\"."
        },
        {
            "id": "isep-d26-291",
            "difficulty": "dificil",
            "question": "La legítima defensa está regulada en el:",
            "options": [
                "Art. 79 del Código Penal",
                "Art. 268 CPP",
                "Art. 34 inc. 6° del Código Penal de la Nación Argentina",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Art. 34 inc. 6° del Código Penal de la Nación Argentina\"."
        },
        {
            "id": "isep-d26-292",
            "difficulty": "facil",
            "question": "Para que exista legítima defensa deben concurrir:",
            "options": [
                "Agresión culposa, medio proporcional y aviso previo",
                "Agresión ilegítima, necesidad racional del medio y falta de provocación suficiente",
                "Solo agresión ilegítima",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Agresión ilegítima, necesidad racional del medio y falta de provocación suficiente\"."
        },
        {
            "id": "isep-d26-296",
            "difficulty": "facil",
            "question": "El peligro inminente requiere:",
            "options": [
                "Sospecha subjetiva",
                "Denuncia previa",
                "Oportunidad, capacidad e intención manifiesta del agresor",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Oportunidad, capacidad e intención manifiesta del agresor\"."
        },
        {
            "id": "isep-d26-301",
            "difficulty": "facil",
            "question": "En la escala progresiva, antes del arma de fuego debe intentarse:",
            "options": [
                "Fuerza letal",
                "Neutralización directa",
                "Medios no violentos y control físico",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Medios no violentos y control físico\"."
        },
        {
            "id": "isep-d26-306",
            "difficulty": "facil",
            "question": "El uso progresivo de la fuerza consiste en:",
            "options": [
                "Aplicar siempre la máxima fuerza",
                "Actuar según jerarquía",
                "Seleccionar el nivel de fuerza según la conducta del sospechoso",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Seleccionar el nivel de fuerza según la conducta del sospechoso\"."
        },
        {
            "id": "isep-d26-316",
            "difficulty": "facil",
            "question": "No será necesaria la advertencia previa cuando:",
            "options": [
                "Hay desobediencia",
                "Hay insultos",
                "La demora pueda provocar muerte o lesiones graves",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"La demora pueda provocar muerte o lesiones graves\"."
        },
        {
            "id": "isep-d26-326",
            "difficulty": "facil",
            "question": "El respeto irrestricto a los Derechos Humanos:",
            "options": [
                "Es opcional",
                "Depende del contexto",
                "Debe orientar toda actuación policial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Debe orientar toda actuación policial\"."
        },
        {
            "id": "isep-d26-331",
            "difficulty": "dificil",
            "question": "Según el Artículo 2°, el Servicio Penitenciario se rige por este Protocolo:",
            "options": [
                "Siempre, dentro y fuera de establecimientos.",
                "Exclusivamente cuando actúa fuera del ámbito de los establecimientos penitenciarios.",
                "Nunca.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Exclusivamente cuando actúa fuera del ámbito de los establecimientos penitenciarios.\"."
        },
        {
            "id": "isep-d26-341",
            "difficulty": "dificil",
            "question": "La asimetría sobrevenida (Art. 6°) es aquella que:",
            "options": [
                "Existe antes del contacto.",
                "Surge durante el desarrollo de la intervención.",
                "Se determina judicialmente.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Surge durante el desarrollo de la intervención.\"."
        },
        {
            "id": "isep-d26-345",
            "difficulty": "facil",
            "question": "El Código Procesal Penal de la Provincia de Santa Fe es la:",
            "options": [
                "Ley 12.521",
                "Ley 12.734",
                "Ley 13.774",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ley 12.734\"."
        },
        {
            "id": "isep-d26-346",
            "difficulty": "facil",
            "question": "El nuevo sistema procesal penal en Santa Fe entró en vigencia en:",
            "options": [
                "2010",
                "2012",
                "2014",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"2014\"."
        },
        {
            "id": "isep-d26-347",
            "difficulty": "media",
            "question": "Las contravenciones son",
            "options": [
                "Delitos graves",
                "Infracciones menos graves que los delitos",
                "Delitos federales",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Infracciones menos graves que los delitos\"."
        },
        {
            "id": "isep-d26-348",
            "difficulty": "facil",
            "question": "El Código de Convivencia de la Provincia de Santa Fe corresponde a la:",
            "options": [
                "Ley 12.734",
                "Ley 12.521",
                "Ley 13.774",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ley 13.774\"."
        },
        {
            "id": "isep-d26-349",
            "difficulty": "facil",
            "question": "El Código de Convivencia se aplica:",
            "options": [
                "En todo el país",
                "Solo en municipios",
                "En el territorio de la Provincia de Santa Fe",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"En el territorio de la Provincia de Santa Fe\"."
        },
        {
            "id": "isep-d26-350",
            "difficulty": "facil",
            "question": "Las contravenciones pueden ser:",
            "options": [
                "Solo dolosas",
                "Ninguna de las anteriores",
                "Dolosas o culposas",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Dolosas o culposas\"."
        },
        {
            "id": "isep-d26-351",
            "difficulty": "facil",
            "question": "La forma culposa en las contravenciones:",
            "options": [
                "Siempre se castiga",
                "Debe estar expresamente prevista en la ley",
                "No se castiga nunca",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Debe estar expresamente prevista en la ley\"."
        },
        {
            "id": "isep-d26-352",
            "difficulty": "facil",
            "question": "No son punibles en contravenciones:",
            "options": [
                "Los mayores de edad",
                "Los menores de 16 años",
                "Los mayores de 18",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Los menores de 16 años\"."
        },
        {
            "id": "isep-d26-354",
            "difficulty": "media",
            "question": "Cuando un mismo hecho constituye delito y contravención:",
            "options": [
                "Se aplican ambas penas",
                "Se aplica solo la contravención",
                "Se aplica únicamente la pena del delito",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Se aplica únicamente la pena del delito\"."
        },
        {
            "id": "isep-d26-355",
            "difficulty": "facil",
            "question": "Las personas entre 16 y 18 años:",
            "options": [
                "No tienen responsabilidad",
                "Son responsables contravencionalmente con limitaciones",
                "Siempre reciben arresto",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Son responsables contravencionalmente con limitaciones\"."
        },
        {
            "id": "isep-d26-357",
            "difficulty": "facil",
            "question": "Los menores infractores son juzgados por:",
            "options": [
                "Fiscales penales",
                "Jueces civiles",
                "Jueces de menores",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Jueces de menores\"."
        },
        {
            "id": "isep-d26-358",
            "difficulty": "facil",
            "question": "La Ley de protección integral de niños, niñas y adolescentes en Santa Fe es la:",
            "options": [
                "Ley 13.774",
                "Ley 12.967",
                "Ley 12.521",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Ley 12.967\"."
        },
        {
            "id": "isep-d26-359",
            "difficulty": "dificil",
            "question": "Según el Código de Convivencia, las penas están establecidas en el:",
            "options": [
                "Artículo 8",
                "Artículo 9",
                "Artículo 11",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Artículo 11\"."
        },
        {
            "id": "isep-d26-360",
            "difficulty": "facil",
            "question": "Una de las penas del Código de Convivencia es:",
            "options": [
                "Prisión perpetua",
                "Arresto",
                "Reclusión mayor",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Arresto\"."
        },
        {
            "id": "isep-d26-361",
            "difficulty": "facil",
            "question": "Otra pena del Código de Convivencia es:",
            "options": [
                "Cadena perpetua",
                "Multa",
                "Suspensión política",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Multa\"."
        },
        {
            "id": "isep-d26-371",
            "difficulty": "facil",
            "question": "El juez puede suspender la pena de arresto cuando:",
            "options": [
                "El infractor es reincidente",
                "No tiene condenas en los últimos dos años",
                "Tiene antecedentes penales",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No tiene condenas en los últimos dos años\"."
        },
        {
            "id": "isep-d26-373",
            "difficulty": "facil",
            "question": "Si dentro de los dos años el condenado no comete otra contravención:",
            "options": [
                "Se reinicia el proceso",
                "La condena se tendrá por no pronunciada",
                "Se duplica la sanción",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"La condena se tendrá por no pronunciada\"."
        },
        {
            "id": "isep-d26-374",
            "difficulty": "facil",
            "question": "Cuando un hecho queda subsumido en más de un tipo contravencional:",
            "options": [
                "Se aplican todas las penas.",
                "Se aplica la pena menor.",
                "Se aplica solamente la pena de mayor gravedad",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Se aplica solamente la pena de mayor gravedad\"."
        },
        {
            "id": "isep-d26-376",
            "difficulty": "facil",
            "question": "Cuando las penas acumuladas son de la misma especie",
            "options": [
                "No tienen límite.",
                "No podrán exceder el máximo legal fijado para ese tipo de pena.",
                "Se reducen a la mitad.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No podrán exceder el máximo legal fijado para ese tipo de pena.\"."
        },
        {
            "id": "isep-d26-377",
            "difficulty": "facil",
            "question": "Existe reincidencia cuando:",
            "options": [
                "Se cometen dos faltas el mismo día.",
                "Una persona condenada por una falta comete otra dentro de los 2 años de quedar firme la sentencia",
                "Se cometen dos faltas distintas.",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Una persona condenada por una falta comete otra dentro de los 2 años de quedar firme la sentencia\"."
        },
        {
            "id": "isep-d26-378",
            "difficulty": "facil",
            "question": "En caso de reincidencia:",
            "options": [
                "Se reduce la pena.",
                "Se aplica el máximo de la pena prevista para la contravención.",
                "Se extingue la acción",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Se aplica el máximo de la pena prevista para la contravención.\"."
        },
        {
            "id": "isep-d26-379",
            "difficulty": "facil",
            "question": "La acción contravencional se extingue por:",
            "options": [
                "Muerte del imputado.",
                "Criterio de oportunidad.",
                "Todas son correctas.",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-380",
            "difficulty": "facil",
            "question": "La acción contravencional prescribe a los:",
            "options": [
                "6 meses",
                "1 año",
                "2 años",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"2 años\"."
        },
        {
            "id": "isep-d26-381",
            "difficulty": "facil",
            "question": "La prescripción de la acción se interrumpe por:",
            "options": [
                "Comisión de una nueva falta.",
                "Sentencia condenatoria.",
                "Todas son correctas",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Todas son correctas\"."
        },
        {
            "id": "isep-d26-382",
            "difficulty": "facil",
            "question": "La sanción contravencional se extingue por:",
            "options": [
                "Cumplimiento de la pena.",
                "Muerte del condenado.",
                "Todas son correctas.",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-383",
            "difficulty": "facil",
            "question": "La pena contravencional prescribe:",
            "options": [
                "A los 2 años de haber sido impuesta y encontrarse firme.",
                "A los 5 años.",
                "Nunca prescribe.",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 0,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"A los 2 años de haber sido impuesta y encontrarse firme.\"."
        },
        {
            "id": "isep-d26-384",
            "difficulty": "facil",
            "question": "La acción contravencional es promovida por:",
            "options": [
                "Ministerio Público de la Acusación",
                "Defensor público.",
                "Juez",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 0,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Ministerio Público de la Acusación\"."
        },
        {
            "id": "isep-d26-385",
            "difficulty": "facil",
            "question": "El Ministerio Público de la Acusación puede:",
            "options": [
                "Delegar diligencias investigativas a la policía.",
                "Dirigir la investigación",
                "Promover la acción contravencional.",
                "Todas son correctas."
            ],
            "correctIndex": 3,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-386",
            "difficulty": "facil",
            "question": "El imputado tiene derecho a:",
            "options": [
                "Defensa técnica.",
                "Abogado particular.",
                "Todas son correctas.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-389",
            "difficulty": "facil",
            "question": "La víctima puede:",
            "options": [
                "Aportar pruebas al Fiscal.",
                "Solicitar mecanismos alternativos de resolución de conflictos.",
                "Todas son correctas.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-391",
            "difficulty": "facil",
            "question": "En las faltas de acción privada:",
            "options": [
                "Actúa el Fiscal.",
                "Actúa la policía.",
                "La acción la promueve el ofendido.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"La acción la promueve el ofendido.\"."
        },
        {
            "id": "isep-d26-392",
            "difficulty": "facil",
            "question": "La denuncia por contravención puede realizarse ante:",
            "options": [
                "Ministerio Público de la Acusación.",
                "Centros Territoriales de Denuncias.",
                "Todas son correctas.",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-394",
            "difficulty": "dificil",
            "question": "La investigación contravencional preparatoria dura:",
            "options": [
                "10 días.",
                "15 días",
                "30 días",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"15 días\"."
        },
        {
            "id": "isep-d26-395",
            "difficulty": "dificil",
            "question": "Este plazo puede:",
            "options": [
                "No prorrogarse",
                "Prorrogarse por otros 15 días por decisión del Fiscal.",
                "Duplicarse automáticamente.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Prorrogarse por otros 15 días por decisión del Fiscal.\"."
        },
        {
            "id": "isep-d26-396",
            "difficulty": "facil",
            "question": "El Fiscal puede desestimar la denuncia cuando:",
            "options": [
                "El hecho no es punible.",
                "La acción está extinguida",
                "Todas son correctas.",
                "No existen elementos suficientes."
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-397",
            "difficulty": "facil",
            "question": "Entre las medidas cautelares que puede ordenar el Fiscal se encuentra:",
            "options": [
                "Secuestro de bienes.",
                "Inmovilización de vehículos.",
                "Todas son correctas.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Todas son correctas.\"."
        },
        {
            "id": "isep-d26-398",
            "difficulty": "media",
            "question": "La policía puede ejercer coacción directa:",
            "options": [
                "En cualquier caso.",
                "Para hacer cesar una contravención flagrante.",
                "Solo con orden judicial.",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Para hacer cesar una contravención flagrante.\"."
        },
        {
            "id": "isep-d26-399",
            "difficulty": "dificil",
            "question": "La aprehensión en contravenciones:",
            "options": [
                "Puede durar 24 horas.",
                "Puede durar 48 horas.",
                "No puede superar las 12 horas.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"No puede superar las 12 horas.\"."
        },
        {
            "id": "isep-d26-400",
            "difficulty": "facil",
            "question": "El juicio contravencional será:",
            "options": [
                "Escrito.",
                "Oral y público",
                "Administrativo.",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Oral y público\"."
        },
        {
            "id": "isep-d26-401",
            "difficulty": "facil",
            "question": "El juez no podrá condenar cuando:",
            "options": [
                "El imputado no declara.",
                "El Fiscal solicita la absolución.",
                "No hay testigos.",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El Fiscal solicita la absolución.\"."
        },
        {
            "id": "isep-d26-402",
            "difficulty": "facil",
            "question": "El juez no puede imponer:",
            "options": [
                "Pena mayor a la solicitada por el Fiscal.",
                "Absolución.",
                "Medidas cautelares",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 0,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Pena mayor a la solicitada por el Fiscal.\"."
        },
        {
            "id": "isep-d26-404",
            "difficulty": "dificil",
            "question": "El acoso sexual callejero está regulado en:",
            "options": [
                "Artículo 84",
                "Artículo 84 bis",
                "Artículo 105",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Artículo 84 bis\"."
        },
        {
            "id": "isep-d26-405",
            "difficulty": "dificil",
            "question": "El artículo 84 bis fue incorporado por:",
            "options": [
                "Ley 12.333",
                "Ley 13.774",
                "Ley 10.703",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Ley 13.774\"."
        },
        {
            "id": "isep-d26-406",
            "difficulty": "facil",
            "question": "El acoso sexual callejero ocurre cuando:",
            "options": [
                "Hay consentimiento de la víctima",
                "Se realiza un acto de connotación sexual sin consentimiento en espacios públicos",
                "Ocurre en lugares privados",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se realiza un acto de connotación sexual sin consentimiento en espacios públicos\"."
        },
        {
            "id": "isep-d26-409",
            "difficulty": "dificil",
            "question": "La conducción peligrosa está regulada en:",
            "options": [
                "Artículo 84 bis",
                "Artículo 105",
                "Artículo 70",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Artículo 105\"."
        },
        {
            "id": "isep-d26-414",
            "difficulty": "facil",
            "question": "Código Procesal Penal de Santa Fe – Ley 12.734.....¿Qué ley regula el proceso penal en la provincia de Santa Fe?",
            "options": [
                "Ley 13.774",
                "Ley 12.734",
                "Ley 12.521",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ley 12.734\"."
        },
        {
            "id": "isep-d26-415",
            "difficulty": "facil",
            "question": "¿En qué fecha fue sancionada la Ley 12.734?",
            "options": [
                "12 de julio de 2005",
                "31 de agosto de 2007",
                "15 de marzo de 2010",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"31 de agosto de 2007\"."
        },
        {
            "id": "isep-d26-416",
            "difficulty": "facil",
            "question": "¿Cuáles son las tres etapas del proceso penal en Santa Fe?",
            "options": [
                "Investigación – juicio – sentencia",
                "Investigación Penal Preparatoria, etapa intermedia y juicio oral",
                "Denuncia – investigación – archivo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Investigación Penal Preparatoria, etapa intermedia y juicio oral\"."
        },
        {
            "id": "isep-d26-418",
            "difficulty": "facil",
            "question": "¿Quién dirige la Investigación Penal Preparatoria?",
            "options": [
                "El juez",
                "El fiscal del Ministerio Público de la Acusación",
                "El defensor público",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El fiscal del Ministerio Público de la Acusación\"."
        },
        {
            "id": "isep-d26-420",
            "difficulty": "facil",
            "question": "¿Quién puede iniciar la Investigación Penal Preparatoria?",
            "options": [
                "Solo la policía",
                "El fiscal o la policía con comunicación inmediata al fiscal",
                "Solo la víctima",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El fiscal o la policía con comunicación inmediata al fiscal\"."
        },
        {
            "id": "isep-d26-422",
            "difficulty": "facil",
            "question": "¿Ante quién se realiza la audiencia imputativa?",
            "options": [
                "Ante la policía",
                "Ante un juez",
                "Ante el fiscal regional",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Ante un juez\"."
        },
        {
            "id": "isep-d26-423",
            "difficulty": "facil",
            "question": "Para que la audiencia imputativa sea válida debe estar presente:",
            "options": [
                "El fiscal regional",
                "El defensor del imputado",
                "El jefe de policía",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El defensor del imputado\"."
        },
        {
            "id": "isep-d26-425",
            "difficulty": "dificil",
            "question": "¿En qué plazo debe resolver el fiscal el pedido de archivo solicitado por la defensa?",
            "options": [
                "10 días",
                "15 días",
                "30 días",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"15 días\"."
        },
        {
            "id": "isep-d26-426",
            "difficulty": "facil",
            "question": "¿Quién dirige la investigación policial?",
            "options": [
                "El fiscal",
                "El defensor",
                "El gobernador",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 0,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El fiscal\"."
        },
        {
            "id": "isep-d26-428",
            "difficulty": "facil",
            "question": "La reapertura de la investigación penal preparatoria procede cuando:",
            "options": [
                "Lo solicita el imputado",
                "Aparecen nuevas pruebas y lo autoriza el Fiscal Regional",
                "Lo ordena el juez sin fundamento",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Aparecen nuevas pruebas y lo autoriza el Fiscal Regional\"."
        },
        {
            "id": "isep-d26-429",
            "difficulty": "media",
            "question": "¿Quién dirige las audiencias durante la investigación, procedimiento intermedio o ejecución penal?",
            "options": [
                "El fiscal",
                "El defensor",
                "El Tribunal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El Tribunal\"."
        },
        {
            "id": "isep-d26-431",
            "difficulty": "dificil",
            "question": "¿Cuándo debe resolver el Tribunal en las audiencias?",
            "options": [
                "Dentro de los 10 días",
                "En la próxima audiencia",
                "Verbalmente en la misma audiencia",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Verbalmente en la misma audiencia\"."
        },
        {
            "id": "isep-d26-436",
            "difficulty": "dificil",
            "question": "¿Cuántos días antes de la audiencia preliminar deben ofrecer las partes la prueba para el juicio oral?",
            "options": [
                "1 día",
                "2 días",
                "3 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"3 días\"."
        },
        {
            "id": "isep-d26-440",
            "difficulty": "facil",
            "question": "¿Cómo deben valorar los tribunales la prueba?",
            "options": [
                "Según su criterio personal",
                "Según la opinión del fiscal",
                "Conforme a la sana crítica racional",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Conforme a la sana crítica racional\"."
        },
        {
            "id": "isep-d26-441",
            "difficulty": "facil",
            "question": "¿Qué ocurre con la prueba obtenida violando garantías constitucionales?",
            "options": [
                "Se considera parcialmente válida",
                "Carece de toda eficacia",
                "Se analiza en juicio",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Carece de toda eficacia\"."
        },
        {
            "id": "isep-d26-442",
            "difficulty": "facil",
            "question": "¿Quién realiza la entrevista a la víctima en la Cámara Gesell?",
            "options": [
                "Un psicólogo designado por el tribunal",
                "El fiscal",
                "El defensor",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 0,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Un psicólogo designado por el tribunal\"."
        },
        {
            "id": "isep-d26-444",
            "difficulty": "facil",
            "question": "Para que la declaración del imputado sea válida debe:",
            "options": [
                "Estar presente el fiscal",
                "Ser grabada",
                "Estar presente su defensor",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Estar presente su defensor\"."
        },
        {
            "id": "isep-d26-446",
            "difficulty": "facil",
            "question": "¿Quiénes pueden abstenerse de declarar?",
            "options": [
                "Solo los amigos del imputado",
                "Cónyuge y parientes cercanos del imputado",
                "Ninguna persona",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Cónyuge y parientes cercanos del imputado\"."
        },
        {
            "id": "isep-d26-451",
            "difficulty": "media",
            "question": "¿Qué documento se realiza luego de la inspección del lugar del hecho?",
            "options": [
                "Denuncia",
                "Acta detallada de lo observado",
                "Pericia médica",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Acta detallada de lo observado\"."
        },
        {
            "id": "isep-d26-452",
            "difficulty": "facil",
            "question": "¿Qué puede ordenar la Fiscalía en el lugar del hecho?",
            "options": [
                "La condena del imputado",
                "El archivo del caso",
                "La recolección de rastros biológicos o genéticos",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"La recolección de rastros biológicos o genéticos\"."
        },
        {
            "id": "isep-d26-456",
            "difficulty": "media",
            "question": "¿Qué es la entrega vigilada?",
            "options": [
                "Un allanamiento nocturno",
                "Una requisa personal",
                "Postergar la detención o secuestro para no afectar la investigación",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Postergar la detención o secuestro para no afectar la investigación\"."
        },
        {
            "id": "isep-d26-457",
            "difficulty": "facil",
            "question": "¿Quién puede autorizar la entrega vigilada?",
            "options": [
                "El juez únicamente",
                "La policía",
                "La Fiscalía con conocimiento inmediato del Tribunal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"La Fiscalía con conocimiento inmediato del Tribunal\"."
        },
        {
            "id": "isep-d26-458",
            "difficulty": "facil",
            "question": "¿Puede obligarse a un funcionario a actuar como agente encubierto?",
            "options": [
                "Sí, si lo ordena el fiscal",
                "No, nadie puede ser obligado",
                "Sí, si lo ordena el juez",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"No, nadie puede ser obligado\"."
        },
        {
            "id": "isep-d26-461",
            "difficulty": "facil",
            "question": "¿Qué debe garantizarse respecto al material obtenido?",
            "options": [
                "Su confidencialidad parcial",
                "La cadena de custodia y su inalterabilidad",
                "Tres veces",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"La cadena de custodia y su inalterabilidad\"."
        },
        {
            "id": "isep-d26-464",
            "difficulty": "facil",
            "question": "¿Qué es el imputado arrepentido?",
            "options": [
                "Un testigo del hecho",
                "Un imputado que brinda información útil a cambio de reducción de pena",
                "Un fiscal auxiliar",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Un imputado que brinda información útil a cambio de reducción de pena\"."
        },
        {
            "id": "isep-d26-466",
            "difficulty": "facil",
            "question": "¿Hasta cuándo puede presentarse el acuerdo del arrepentido?",
            "options": [
                "Solo antes de la denuncia",
                "Hasta el requerimiento acusatorio o junto con éste",
                "Durante el juicio oral",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Hasta el requerimiento acusatorio o junto con éste\"."
        },
        {
            "id": "isep-d26-471",
            "difficulty": "facil",
            "question": "La exhibición de álbumes fotográficos procede cuando:",
            "options": [
                "Ya hay un imputado identificado",
                "Se busca individualizar personas desconocidas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se busca individualizar personas desconocidas\"."
        },
        {
            "id": "isep-d26-472",
            "difficulty": "facil",
            "question": "Manipular o sugerir fotografías al testigo constituye:",
            "options": [
                "Falta leve",
                "Falta administrativa",
                "Falta grave",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 2,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Falta grave\"."
        },
        {
            "id": "isep-d26-473",
            "difficulty": "facil",
            "question": "El reconocimiento de cosas exige previamente:",
            "options": [
                "Una orden fiscal",
                "Que la persona describa el objeto",
                "Presencia de testigos",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Que la persona describa el objeto\"."
        },
        {
            "id": "isep-d26-476",
            "difficulty": "facil",
            "question": "El agente encubierto:",
            "options": [
                "Actúa sin autorización",
                "Se infiltra con identidad falsa",
                "Solo observa",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se infiltra con identidad falsa\"."
        },
        {
            "id": "isep-d26-481",
            "difficulty": "facil",
            "question": "Las medidas especiales pueden prorrogarse:",
            "options": [
                "Infinitamente",
                "Una sola vez",
                "Dos veces",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Una sola vez\"."
        },
        {
            "id": "isep-d26-486",
            "difficulty": "facil",
            "question": "¿Qué se hace con un celular secuestrado?",
            "options": [
                "Apagarlo",
                "Revisarlo",
                "Ponerlo en modo avión y no apagarlo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Ponerlo en modo avión y no apagarlo\"."
        },
        {
            "id": "isep-d26-487",
            "difficulty": "media",
            "question": "La aprehensión debe realizarse:",
            "options": [
                "Sin testigos",
                "Solo de día",
                "Con testigos",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Con testigos\"."
        },
        {
            "id": "isep-d26-488",
            "difficulty": "facil",
            "question": "En lesiones leves por accidente de tránsito:",
            "options": [
                "Se aprehende al conductor",
                "No se aprehende al presunto responsable",
                "Únicamente con autorización previa y por escrito del Fiscal en turno",
                "Solo ante la presencia de dos testigos hábiles y personal de la AIC/PDI"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"No se aprehende al presunto responsable\"."
        },
        {
            "id": "isep-d26-490",
            "difficulty": "facil",
            "question": "En abuso de armas, ¿qué se realiza?",
            "options": [
                "Entrevista a vecinos únicamente",
                "Dermotest al aprehendido",
                "Únicamente con autorización previa y por escrito del Fiscal en turno",
                "Solo ante la presencia de dos testigos hábiles y personal de la AIC/PDI"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Dermotest al aprehendido\"."
        },
        {
            "id": "isep-d26-491",
            "difficulty": "facil",
            "question": "En amenazas, ¿cómo debe ser la declaración?",
            "options": [
                "Técnica",
                "Textual y en primera persona",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Textual y en primera persona\"."
        },
        {
            "id": "isep-d26-493",
            "difficulty": "media",
            "question": "El procedimiento abreviado requiere:",
            "options": [
                "Acuerdo fiscal + defensor + consentimiento del menor",
                "Solo juez",
                "Únicamente con autorización previa y por escrito del Fiscal en turno",
                "Solo ante la presencia de dos testigos hábiles y personal de la AIC/PDI"
            ],
            "correctIndex": 0,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Acuerdo fiscal + defensor + consentimiento del menor\"."
        },
        {
            "id": "isep-d26-501",
            "difficulty": "facil",
            "question": "La violencia obstétrica implica:",
            "options": [
                "Falta de pago",
                "Maltrato del personal de salud en procesos reproductivos",
                "Problemas laborales",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"Maltrato del personal de salud en procesos reproductivos\"."
        },
        {
            "id": "isep-d26-510",
            "difficulty": "media",
            "question": "Respecto al procedimiento: En Argentina:",
            "options": [
                "Existe el delito \"violencia de género\"",
                "No existe como delito autónomo",
                "Solo es contravención",
                "Mediante arresto preventivo inmediato sin orden del Juez Comunitario"
            ],
            "correctIndex": 1,
            "source": "Código de Convivencia de la Provincia de Santa Fe (Ley 13.774)",
            "explanation": "La Ley 13.774 rige las contravenciones y faltas en Santa Fe, privilegiando la mediación y el orden pacífico comunitario. La opción correcta conforme a la normativa oficial es: \"No existe como delito autónomo\"."
        },
        {
            "id": "isep-d26-513",
            "difficulty": "media",
            "question": "La flagrancia ocurre cuando:",
            "options": [
                "Hay denuncia escrita",
                "El autor es sorprendido cometiendo el hecho",
                "Pasa mucho tiempo del hecho",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"El autor es sorprendido cometiendo el hecho\"."
        }
    ],
    "subinspector-inspector": [
        {
            "id": "si-f01",
            "difficulty": "facil",
            "question": "¿Cuáles son los tres pilares de la seguridad de la información conocidos como la 'Tríada CID'?",
            "options": [
                "Confidencialidad, Integridad y Disponibilidad",
                "Control, Inspección y Disciplina operativa",
                "Certeza, Identidad y Documentación formal",
                "Comando, Intervención y Despacho policial"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Seguridad de la Información, Pág. 10: Tríada CID",
            "explanation": "La tríada CID (Confidencialidad, Integridad y Disponibilidad) es la base doctrinal de la ciberseguridad policial internacional y del manual ISEP."
        },
        {
            "id": "si-f02",
            "difficulty": "facil",
            "question": "En la Ley Provincial 12.967 de Protección Integral de la Niñez, ¿cuál es el principio rector que debe guiar toda intervención policial?",
            "options": [
                "El Interés Superior de la Niña, Niño o Adolescente",
                "La presunción de culpabilidad hasta su comparecencia judicial",
                "El aislamiento preventivo en celda individual sin contacto exterior",
                "La derivación inmediata a institutos correccionales de régimen cerrado"
            ],
            "correctIndex": 0,
            "source": "Ley 12.967 (Santa Fe), Art. 3: Principio del Interés Superior",
            "explanation": "El interés superior del menor obliga a adoptar siempre la medida que mejor garantice su desarrollo físico, psíquico y moral, evitando su criminalización."
        },
        {
            "id": "si-f03",
            "difficulty": "facil",
            "question": "¿Cómo se define el 'Ataque de Phishing' en los sistemas informáticos de la administración pública provincial?",
            "options": [
                "Técnica de ingeniería social que simula páginas oficiales para robar credenciales de acceso",
                "Virus que borra el disco duro al encender la computadora de guardia de la comisaría",
                "Fallo eléctrico del servidor central del 911 por sobrecarga de llamadas simultáneas",
                "Interferencia en las frecuencias de radio policial VHF por antenas clandestinas"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Ciberseguridad: Incidentes Frecuentes",
            "explanation": "El phishing engaña a los usuarios mediante correos o mensajes fraudulentos para obtener contraseñas o datos confidenciales de las redes oficiales."
        },
        {
            "id": "si-f04",
            "difficulty": "facil",
            "question": "¿Qué establece la doctrina policial respecto al uso de las esposas metálicas de dotación?",
            "options": [
                "Son un medio de coerción física para inmovilizar preventivamente y evitar fugas o agresiones",
                "Constituyen una sanción disciplinaria directa de aplicación inmediata en el lugar del hecho",
                "Son un accesorio de uso discrecional únicamente obligatorio en traslados interdepartamentales",
                "Solo pueden colocarse si el aprehendido presta su consentimiento por escrito en el acta"
            ],
            "correctIndex": 0,
            "source": "Protocolo ISEP - Uso Racional de Medios de Coerción",
            "explanation": "Las esposas son una medida de seguridad temporal para neutralizar riesgos a terceros, al personal policial o al propio aprehendido, nunca un castigo."
        },
        {
            "id": "si-f05",
            "difficulty": "facil",
            "question": "¿Cómo se compone el jurado popular en un Juicio por Jurados según la Ley 14.258 de Santa Fe?",
            "options": [
                "12 jurados titulares y 2 suplentes, integrados por mitades exactas de varones y mujeres",
                "6 jurados legos y 6 oficiales de policía designados por sorteo del padrón electoral provincial",
                "10 ciudadanos mayores de edad presididos por el Jefe de la Unidad Regional respectiva",
                "15 miembros titulares sin distinción de género ni exigencia de residencia en la provincia"
            ],
            "correctIndex": 0,
            "source": "Ley 14.258 (Santa Fe), Art. 4: Composición y Paridad de Género",
            "explanation": "La Ley 14.258 exige 12 titulares y 2 suplentes con paridad estricta de género (6 varones y 6 mujeres) para emitir el veredicto de culpabilidad o no culpabilidad."
        },
        {
            "id": "si-f06",
            "difficulty": "facil",
            "question": "En la supervisión de un libro de guardia policial, ¿qué práctica está terminantemente prohibida por la reglamentación?",
            "options": [
                "Dejar renglones en blanco, utilizar corrector líquido, borrar o arrancar hojas del foliado",
                "Registrar las novedades de guardia en orden cronológico con tinta indeleble de color azul",
                "Hacer constar la hora exacta de salida y regreso de cada móvil de patrullaje asignado",
                "Firmar y sellar el cierre de tercio por parte del oficial de guardia saliente y entrante"
            ],
            "correctIndex": 0,
            "source": "Reglamento de Documentación Policial - ISEP 2026: Libros de Guardia",
            "explanation": "El libro de guardia es instrumento público; no puede tener espacios en blanco, tachaduras sin salvar, enmiendas ni adulteración de su foliado oficial."
        },
        {
            "id": "si-f07",
            "difficulty": "facil",
            "question": "¿Qué es la 'Fuerza Letal' en la escala del uso progresivo y gradual de la fuerza policial?",
            "options": [
                "El empleo de armas de fuego con probabilidad real de causar la muerte o lesiones gravísimas",
                "El uso de gas pimienta en aerosol para dispersar una multitud hostil en la vía pública",
                "La reducción física cuerpo a cuerpo mediante técnicas de luxación o llaves de inmovilización",
                "La impartición de órdenes verbales firmes con exhibición del bastón táctico extensible"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Uso Progresivo de la Fuerza - ISEP 2026",
            "explanation": "La fuerza letal es el último escalón, reservado exclusivamente para repeler un peligro inminente de muerte o lesiones graves para el policía o terceros."
        },
        {
            "id": "si-f08",
            "difficulty": "facil",
            "question": "¿Cuál es la regla fundamental para crear una contraseña segura en las cuentas y sistemas policiales?",
            "options": [
                "Combinar mayúsculas, minúsculas, números y símbolos especiales superando los 12 caracteres",
                "Utilizar el número de C.I.P. o número de DNI del oficial para no olvidarla durante la guardia",
                "Anotarla en un papel adhesivo adherido al monitor de la computadora de la oficina de sumarios",
                "Usar la misma clave para el sistema de despacho 911, el correo personal y las redes sociales"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Guía de Buenas Prácticas Informáticas",
            "explanation": "Las contraseñas robustas superan los 12 caracteres, mezclan diferentes tipos de caracteres y nunca deben basarse en datos personales ni compartirse."
        },
        {
            "id": "si-f09",
            "difficulty": "facil",
            "question": "¿Qué autoridad judicial interviene cuando se produce la aprehensión de un menor no punible (menor de 16 años)?",
            "options": [
                "El Juzgado de Menores competente dando inmediata intervención a la Secretaría de Niñez",
                "El Tribunal Oral Federal en lo Criminal con competencia en materia de estupefacientes",
                "El Juez de Faltas Municipal para la aplicación de multas comunitarias a los progenitores",
                "La autoridad policial de la comisaría quien resuelve la sanción de arresto en calabozo"
            ],
            "correctIndex": 0,
            "source": "Ley 12.967 y Código de Procedimientos de Menores de Santa Fe",
            "explanation": "Los menores no punibles no pueden ser privados de la libertad penalmente; se notifica al Juez de Menores y a los organismos de protección integral de niñez."
        },
        {
            "id": "si-f10",
            "difficulty": "facil",
            "question": "¿Qué calibre de escopeta policial es el provisto reglamentariamente en la Policía de la Provincia de Santa Fe?",
            "options": [
                "Calibre 12/70 (12 Gauge)",
                "Calibre 20/70",
                "Calibre 16/70",
                "Calibre .410 Magnum"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Armamento Colectivo Policial",
            "explanation": "La escopeta reglamentaria de dotación policial en Santa Fe es de calibre 12/70, apta para cartuchos de postas de plomo (PG) y postas de goma (AT)."
        },
        {
            "id": "si-f11",
            "difficulty": "facil",
            "question": "¿Qué efecto produce el cartucho de 'Posta de Goma' (Anti-tumulto) a corta distancia (menos de 5 metros)?",
            "options": [
                "Puede causar lesiones penetrantes graves o letales, por lo que está prohibido disparar a quemarropa",
                "Genera únicamente un efecto sónico disuasivo sin impactar físicamente en el cuerpo de la persona",
                "Produce una nube de gas lacrimógeno que inhabilita temporalmente la visión del agresor",
                "Pierde toda su energía cinética en el aire cayendo al suelo sin capacidad de generar impacto"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Cartuchería Menos Letal",
            "explanation": "A menos de 5-10 metros, la posta de goma se comporta como un proyectil con energía suficiente para penetrar órganos vitales; el manual exige disparar hacia las piernas y con rebote."
        },
        {
            "id": "si-f12",
            "difficulty": "facil",
            "question": "¿Quién es el responsable directo de la seguridad física de las personas alojadas transitoriamente en una comisaría?",
            "options": [
                "El Oficial de Guardia y el personal policial de servicio de cuartel de esa dependencia",
                "El abogado defensor particular que haya asumido la representación legal del imputado",
                "El médico forense policial que realizó la constatación del estado clínico de ingreso",
                "Los propios detenidos bajo el régimen de autogestión de pabellones de detención"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 / Protocolo de Custodia de Personas Privadas de Libertad",
            "explanation": "El Estado ejerce una posición de garante sobre la vida e integridad psicofísica del detenido desde el instante en que queda bajo custodia policial."
        },
        {
            "id": "si-m01",
            "difficulty": "media",
            "question": "En el marco de la Ley 12.967, ¿dónde está terminantemente prohibido alojar a un menor de edad aprehendido en sede policial?",
            "options": [
                "En celdas o calabozos comunes junto a personas adultas privadas de la libertad",
                "En la oficina de la jefatura de la dependencia mientras se labran las actas",
                "En una sala de espera custodiado permanentemente por personal femenino si es mujer",
                "En el área de asistencia médica del policlínico policial para su examen clínico"
            ],
            "correctIndex": 0,
            "source": "Ley 12.967 / Convención sobre los Derechos del Niño",
            "explanation": "Está terminantemente vedado recluir a menores en calabozos de mayores o celdas de encierro carcelario; deben permanecer en áreas de tutela transitoria separadas."
        },
        {
            "id": "si-m02",
            "difficulty": "media",
            "question": "¿Cuál es el 'Protocolo de 5 Pasos' para la gestión de incidentes de ciberseguridad según el Manual ISEP?",
            "options": [
                "1. Identificar, 2. Proteger, 3. Detectar, 4. Responder, 5. Recuperar",
                "1. Denunciar, 2. Formatear, 3. Bloquear, 4. Apagar, 5. Reemplazar",
                "1. Investigar, 2. Detener, 3. Interrogar, 4. Secuestrar, 5. Notificar",
                "1. Conectar, 2. Monitorear, 3. Respaldar, 4. Difundir, 5. Cerrar"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Seguridad de la Información, Marco NIST/ISEP",
            "explanation": "El estándar de gestión de incidentes del manual se compone de cinco fases coordinadas: Identificar, Proteger, Detectar, Responder y Recuperar."
        },
        {
            "id": "si-m03",
            "difficulty": "media",
            "question": "¿En qué consiste la técnica de disparo conocida como 'Doble Tap' (Doble Impacto Controlado)?",
            "options": [
                "Dos disparos rápidos sucesivos sobre el mismo blanco alineando miras en el primer disparo y recuperando el alza para el segundo",
                "Disparar simultáneamente con dos armas de fuego empuñadas en cada mano hacia blancos laterales",
                "Efectuar un disparo al tórax y un segundo disparo de advertencia al aire para amedrentar al atacante",
                "Presionar dos veces el disparador sin que la corredera haya completado su ciclo mecánico de recarga"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Pág. 40: Técnicas de Disparo Policial",
            "explanation": "El Doble Tap busca maximizar el poder de detención frente a agresiones letales inminentes mediante dos impactos certeros al centro de masa en rápida secuencia."
        },
        {
            "id": "si-m04",
            "difficulty": "media",
            "question": "Conforme a la Ley Nacional de Armas (20.429), ¿qué clasificación tiene la pistola calibre 9x19mm Parabellum provista a la fuerza?",
            "options": [
                "Arma de Guerra de Uso Civil Condicional",
                "Arma de Uso Civil Exclusivo y Libre Adquisición",
                "Material Bélico Secreto de Defensa Nacional",
                "Dispositivo de Empleo Discrecional y Deportivo"
            ],
            "correctIndex": 0,
            "source": "Ley 20.429 / Decreto 395/75 Reglamentario de Armas y Explosivos",
            "explanation": "Las pistolas de calibre superior al .32 (como el 9mm, .40 o .45) se clasifican legalmente como armas de guerra sujetas a la categoría de uso civil condicional."
        },
        {
            "id": "si-m05",
            "difficulty": "media",
            "question": "Al supervisar una guardia, ¿cuál es la obligación del Subinspector ante la denuncia de un delito de violencia de género (Ley 13.348)?",
            "options": [
                "Recibir la denuncia inmediatamente en ámbito de privacidad, ofrecer botón de pánico y dar aviso urgente al MPA",
                "Exigir a la víctima que intente una mediación previa con el denunciado antes de asentar las actuaciones",
                "Recomendar a la mujer que vuelva al día siguiente cuando esté presente el médico policial forense",
                "Archivar la actuación si la víctima no presenta testigos presenciales o marcas físicas visibles en el cuerpo"
            ],
            "correctIndex": 0,
            "source": "Ley 13.348 (Santa Fe) y Protocolo de Actuación Policial en Violencia de Género",
            "explanation": "La atención en violencia de género exige inmediatez, contención reservada, prohibición de revictimización o mediaciones, y comunicación instantánea al fiscal."
        },
        {
            "id": "si-m06",
            "difficulty": "media",
            "question": "¿Qué recaudos deben tomarse al trasladar a un aprehendido en el móvil policial (patrullero con reja separadora)?",
            "options": [
                "Esposado con las manos a la espalda, colocado el cinturón de seguridad y custodiado visualmente por el acompañante",
                "Ubicado en el asiento delantero junto al chofer para facilitar su vigilancia permanente durante el viaje",
                "Con las manos libres para que pueda sostenerse de las manijas interiores del habitáculo del patrullero",
                "Sin cinturón de seguridad para permitir una rápida evacuación en caso de siniestro vial en la avenida"
            ],
            "correctIndex": 0,
            "source": "Reglamento de Traslado de Detenidos - ISEP 2026",
            "explanation": "El aprehendido debe viajar en el asiento trasero asegurado con cinturón y esposado en la espalda, impidiendo que alcance los mandos del chofer o se autolesione."
        },
        {
            "id": "si-m07",
            "difficulty": "media",
            "question": "En el marco del Código de Convivencia de Santa Fe (Ley 10.703 / modif.), ¿quién juzga las contravenciones urbanas?",
            "options": [
                "El Juez Comunitario de las Pequeñas Causas o Juez de Faltas provincial competente",
                "El Jefe de Policía de la Provincia mediante resolución administrativa sumaria",
                "El Oficial Sumariante de la Comisaría de la jurisdicción donde se cometió la falta",
                "El Jurado Popular de 12 ciudadanos convocados por el padrón electoral distrital"
            ],
            "correctIndex": 0,
            "source": "Ley 10.703 / Ley 13.774 (Código de Convivencia de Santa Fe)",
            "explanation": "Las faltas contravencionales son juzgadas por la judicatura letrada (Jueces Comunitarios o de Faltas), no por la autoridad policial de forma directa."
        },
        {
            "id": "si-m08",
            "difficulty": "media",
            "question": "¿Por qué es crítico preservar el 'Hash' criptográfico al secuestrar archivos informáticos o videos de cámaras de seguridad?",
            "options": [
                "Porque demuestra matemáticamente que el archivo no fue modificado, editado ni corrompido desde su secuestro",
                "Porque permite comprimir el video para enviarlo más rápido por mensaje de WhatsApp al fiscal",
                "Porque desencripta automáticamente las contraseñas de las cuentas de usuario de la computadora",
                "Porque convierte las imágenes borrosas en fotografías de alta definición aptas para juicio oral"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Cadena de Custodia de Evidencia Digital",
            "explanation": "El valor hash (MD5 o SHA-256) es la huella dactilar digital del archivo; si un solo bit cambia, el hash varía por completo revelando manipulación."
        },
        {
            "id": "si-m09",
            "difficulty": "media",
            "question": "¿Cuál es la regla para efectuar un disparo con escopeta policial utilizando cartuchos de proyectil único (brenneke/slug)?",
            "options": [
                "Se emplea contra blancos duros o vehículos a distancias mayores requiriendo puntería precisa sobre el alza y guión",
                "Se debe disparar exclusivamente hacia el pavimento para que el rebote disperse esquirlas sobre los neumáticos",
                "Solo puede ser disparado con la culata apoyada en la cadera para absorber el retroceso de la deflagración",
                "Está diseñado para dispersar 9 postas de plomo con un radio de cobertura de 15 metros a la redonda"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Munición Especial y Proyectil Único",
            "explanation": "El slug o monoposta es un proyectil macizo de plomo de alto peso que requiere alinear miras como un fusil, con gran poder de penetración y alcance letal."
        },
        {
            "id": "si-m10",
            "difficulty": "media",
            "question": "En un incidente crítico con toma de rehenes, ¿cuál es el rol del primer escalón de contención policial hasta la llegada del Grupo Táctico (TOE)?",
            "options": [
                "Aislar la zona, congelar la situación sin precipitar acciones armadas y establecer un cordón de seguridad estricto",
                "Ingresar de inmediato disparando al techo para desorientar a los captores y rescatar a las víctimas civiles",
                "Comenzar a ofrecer dinero o vehículos de escape al captor sin consultar a las autoridades judiciales",
                "Permitir el ingreso de los medios de prensa para que transmitan en vivo las exigencias de los delincuentes"
            ],
            "correctIndex": 0,
            "source": "Protocolo ISEP - Manejo de Crisis y Toma de Rehenes",
            "explanation": "El primer interventor en crisis debe aislar, contener y congelar la situación (no negociar de fondo ni asaltar), esperando al negociador y equipo táctico de élite."
        },
        {
            "id": "si-m11",
            "difficulty": "media",
            "question": "¿Qué documento formal acredita la entrega y recepción del armamento y municiones al relevar una guardia en la comisaría?",
            "options": [
                "El Inventario de Armamento y Libro de Entrega de Guardia firmado por los oficiales saliente y entrante",
                "Una anotación informal en una libreta de notas de bolsillo del oficial de servicio saliente",
                "El mensaje de texto transmitido al grupo de mensajería del tercio informando 'todo sin novedad'",
                "El recibo de haberes mensual donde figura la asignación del plus por mantenimiento de uniforme"
            ],
            "correctIndex": 0,
            "source": "Reglamento Interno de Armas de Dotación - ISEP 2026",
            "explanation": "El relevo de guardia exige conteo físico de armas de dotación, cargadores y municiones, con firma conjunta en el libro de inventario bajo responsabilidad funcional."
        },
        {
            "id": "si-m12",
            "difficulty": "media",
            "question": "¿En qué consiste la regla de las '7C' en la comunicación y redacción de informes policiales?",
            "options": [
                "Claro, Conciso, Concreto, Correcto, Coherente, Completo y Cortés",
                "Comando, Control, Calibre, Custodia, Combate, Cuidado y Coerción",
                "Celeridad, Certeza, Cuartel, Código, Conflicto, Causa y Convicción",
                "Central, Ciudad, Calle, Comisaría, Celda, Cargo y Capacidad"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Comunicación y Redacción Institucional",
            "explanation": "Las 7C estructuran la redacción formal para que cualquier parte o sumario sea entendido sin ambigüedades por fiscales, jueces y superiores."
        },
        {
            "id": "si-m13",
            "difficulty": "media",
            "question": "Si una persona aprehendida presenta lesiones visibles al ingresar a la dependencia policial, ¿cuál es el deber del oficial a cargo?",
            "options": [
                "Hacerla examinar de inmediato por el médico forense/hospitalario y asentar detalladamente el origen alegado de las lesiones",
                "Aguardar 24 horas para verificar si las lesiones desaparecen antes de consignarlas formalmente en el sumario",
                "Prohibir que el aprehendido se entreviste con su abogado hasta que las lesiones hayan cicatrizado totalmente",
                "Obligar al aprehendido a firmar una declaración jurada donde afirme que se lesionó solo al correr del móvil"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Prevención de la Tortura / Manual ISEP 2026",
            "explanation": "La constatación médica inmediata es obligatoria e inviolable para deslindar responsabilidades y salvaguardar los derechos humanos del aprehendido."
        },
        {
            "id": "si-d01",
            "difficulty": "dificil",
            "question": "En el Juicio por Jurados de Santa Fe (Ley 14.258), ¿cuántos votos afirmativos se requieren para declarar la 'Culpabilidad' de un acusado?",
            "options": [
                "Se requiere unanimidad estricta (12 de los 12 miembros del jurado)",
                "Mayoría calificada de al menos 10 votos de los 12 miembros integrantes",
                "Mayoría simple de la mitad más uno (al menos 7 de los 12 integrantes)",
                "El voto mayoritario de los 6 miembros que representen al mismo género del imputado"
            ],
            "correctIndex": 0,
            "source": "Ley 14.258 (Santa Fe), Art. 65: Veredicto del Jurado Popular",
            "explanation": "En Santa Fe el veredicto condenatorio exige la unanimidad de los 12 jurados populares; si no hay acuerdo tras deliberaciones, se declara estancado."
        },
        {
            "id": "si-d02",
            "difficulty": "dificil",
            "question": "¿Cuál es la sanción administrativa para un oficial que revela información reservada de una investigación penal en curso a la prensa?",
            "options": [
                "Falta Gravísima sancionable con destitución (cesantía o exoneración) y denuncia penal por violación de secreto",
                "Falta Leve que se subsana con un llamado de atención verbal del Jefe de Unidad Regional en su despacho",
                "Apercibimiento formal con recargo de guardia de doce horas en la subcomisaría de origen",
                "Pase a disponibilidad por 15 días con goce íntegro de sueldo básico y suplementos adicionales"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Art. 12: Faltas Gravísimas a los Deberes Policiales",
            "explanation": "Filtrar información reservada compromete vidas y juicios; constituye falta gravísima disciplinaria y delito de violación de secretos (Art. 157 CP)."
        },
        {
            "id": "si-d03",
            "difficulty": "dificil",
            "question": "Según el CPP de Santa Fe, ¿qué valor probatorio tiene en el juicio oral el acta de procedimiento labrada por la policía?",
            "options": [
                "No reemplaza la declaración oral en el debate; los policías actuantes deben comparecer a declarar como testigos bajo juramento",
                "Hace plena fe probatoria absoluta impidiendo que los abogados defensores interroguen a los oficiales intervinientes",
                "Constituye prueba tarifada que el tribunal de juicio está obligado a dar por cierta sin someterla a contradicción",
                "Solo puede ser incorporada por lectura si el Fiscal del MPA no cuenta con testigos presenciales civiles del delito"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Principio de Oralidad e Inmediación",
            "explanation": "En el sistema acusatorio, el acta sirve para refrescar memoria o marcar contradicciones, pero la prueba en sí es el testimonio oral del policía ante el juez."
        },
        {
            "id": "si-d04",
            "difficulty": "dificil",
            "question": "¿Qué causal exime válidamente al personal policial del uso de testigos civiles de actuación en una requisa de urgencia nocturna?",
            "options": [
                "Imposibilidad material debidamente acreditada (zona rural despoblada, hostilidad armada extrema con peligro para terceros)",
                "La simple lluvia o mal tiempo meteorológico que incomode la permanencia de civiles en la vereda de la comisaría",
                "El apuro del personal policial por retirarse de guardia al finalizar las horas de su turno ordinario de servicio",
                "La negativa verbal de los primeros dos transeúntes consultados en una transitada avenida céntrica de la ciudad"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734, Art. 138 / Jurisprudencia de la Corte Suprema de Santa Fe",
            "explanation": "La excepción de testigos civiles es excepcionalísima: exige dejar constancia exacta de la causa insuperable que impidió hallarlos, so pena de nulidad."
        },
        {
            "id": "si-d05",
            "difficulty": "dificil",
            "question": "En balística de efectos, ¿qué fenómeno físico explica la 'Cavitación Temporal' generada por un proyectil de alta velocidad?",
            "options": [
                "La expansión elástica y momentánea de los tejidos biológicos que excede el diámetro físico del proyectil debido a la energía cinética",
                "El rebote metálico que sufre el proyectil al chocar contra las estructuras óseas del tórax humano en ángulo oblicuo",
                "El calor emitido por la fricción del proyectil con el aire que produce el ahumamiento de la ropa de la víctima",
                "La desaceleración gradual del proyectil provocada por la gravedad terrestre durante su recorrido de vuelo libre"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Balística Terminal y Efectos en Tejidos",
            "explanation": "La cavidad temporal es el desplazamiento violento hacia afuera de los tejidos que multiplica el daño celular por la transferencia masiva de energía."
        },
        {
            "id": "si-d06",
            "difficulty": "dificil",
            "question": "¿En qué plazo prescribe la acción de cobro retroactivo de haberes o suplementos no liquidados por la administración policial?",
            "options": [
                "A los 2 años según el Código Civil y Comercial y la Ley de Administración Financiera provincial",
                "A los 6 meses contados a partir de la publicación del decreto gubernamental de aumento de sueldos",
                "A los 10 años conforme a las normas generales de las obligaciones de derecho administrativo",
                "No prescribe nunca mientras el personal policial preste servicio activo en la Unidad Regional"
            ],
            "correctIndex": 0,
            "source": "Ley de Administración Financiera de Santa Fe / Código Civil y Comercial",
            "explanation": "Los reclamos de créditos laborales y salariales contra el Estado provincial prescriben a los 2 años de haberse devengado la suma no percibida."
        },
        {
            "id": "si-d07",
            "difficulty": "dificil",
            "question": "En la custodia de una escena del hecho homicida, ¿cuál es el criterio para fijar el 'Punto de Acceso Único' (PAU)?",
            "options": [
                "Una sola vía de ingreso y egreso controlada con planilla de registro nominal para evitar la contaminación cruzada de pisadas",
                "Permitir la entrada por la puerta principal y la salida por el patio trasero para agilizar el retiro de los peritos forenses",
                "Habilitar el paso libre a familiares directos de la víctima siempre que permanezcan en silencio dentro del cuarto",
                "Instalar el acceso en el sector donde se encuentren los casquillos de bala para vigilarlos permanentemente de cerca"
            ],
            "correctIndex": 0,
            "source": "Manual de Criminalística - Protocolo de Escena del Crimen ISEP",
            "explanation": "El PAU obliga a todos los peritos y fiscales a entrar y salir por la misma senda limpia, registrando nombre, jerarquía y hora en planilla estricta."
        },
        {
            "id": "si-d08",
            "difficulty": "dificil",
            "question": "¿Qué recurso jurídico procede si una orden judicial de allanamiento contiene un error grosero en la numeración catastral del inmueble?",
            "options": [
                "No debe ejecutarse hasta que el Fiscal subsane y aclare formalmente el error material con el Juez Penal interviniente",
                "Debe ejecutarse igualmente allanando la casa vecina que presente similares características edilicias",
                "El oficial a cargo debe tachar con bolígrafo la orden judicial y escribir el número correcto de la vivienda",
                "Se debe proceder a la demolición de la puerta de ingreso de ambas propiedades para asegurar el éxito del procedimiento"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 210: Mandamiento de Allanamiento",
            "explanation": "El allanamiento en domicilio equivocado por error de orden es ilícito y acarrea nulidad de todo lo secuestrado; requiere consulta inmediata y mandamiento rectificatorio."
        },
        {
            "id": "si-d09",
            "difficulty": "dificil",
            "question": "Conforme al Decreto 461/15, ¿cuándo se configura la falta gravísima de 'Abandono de Servicio'?",
            "options": [
                "Cuando el personal se ausenta de su puesto de guardia sin autorización por más de 72 horas consecutivas sin causa",
                "Cuando un oficial arriba con una demora de veinte minutos a la formación diaria de inicio de turno",
                "Cuando se solicita licencia médica justificada sin haber presentado el certificado antes de las dos horas",
                "Cuando un efectivo se niega a realizar un servicio adicional voluntario fuera de su horario ordinario"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Art. 14: Abandono de Destino y Servicio",
            "explanation": "La ausencia injustificada superior a 72 horas corridas constituye abandono de servicio, causal directa de instrucción de sumario para destitución."
        },
        {
            "id": "si-d10",
            "difficulty": "dificil",
            "question": "En el uso de la fuerza policial, ¿qué implica el 'Principio de Rendición de Cuentas' (Accountability)?",
            "options": [
                "La obligación ineludible de documentar, justificar y someter a investigación administrativa y judicial cada disparo o acto de fuerza",
                "El reintegro pecuniario que debe efectuar el policía por cada cartucho disparado en cumplimiento de su deber",
                "La rendición contable de viáticos y gastos de combustible efectuada al cierre de cada semestre presupuestario",
                "La entrega del recibo de sueldo firmado al habilitado de pagos de la división de administración de la jefatura"
            ],
            "correctIndex": 0,
            "source": "Principios Básicos de la ONU sobre el Empleo de la Fuerza / Manual ISEP",
            "explanation": "Todo uso de la fuerza, en especial letal, genera el deber indelegable de informar detalladamente las causas y circunstancias ante la justicia y superiores."
        },
        {
            "id": "si-d11",
            "difficulty": "dificil",
            "question": "¿Qué establece la doctrina de 'Evidencia en Peligro' (Exigent Circumstances) para el secuestro de servidores informáticos?",
            "options": [
                "Permite desconectar inmediatamente el cable de red para frenar un script de autodestrucción remota en ejecución",
                "Habilita a borrar los discos duros policiales para que no sean vulnerados por piratas informáticos externos",
                "Exige esperar siempre una autorización escrita del Ministerio de Innovación Pública antes de tocar un cable de red",
                "Autoriza a difundir públicamente los datos secuestrados para que la ciudadanía verifique su veracidad"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Ciberseguridad: Actuación en Servidores",
            "explanation": "Si se constata un proceso activo de sobreescritura o formateo remoto, la desconexión física de la red es una medida de excepción para preservar la prueba."
        },
        {
            "id": "si-d12",
            "difficulty": "dificil",
            "question": "¿Cuál es la consecuencia de la figura jurídica de la 'Disponibilidad Pasiva' contemplada en la Ley 12.521?",
            "options": [
                "Retención preventiva de credencial y arma provista, con percepción reducida de haberes mientras se sustancia el sumario grave",
                "El ascenso extraordinario por mérito en acto de servicio con incremento inmediato de la escala de antigüedad",
                "La autorización automática para prestar servicios adicionales sin límite de horas durante los fines de semana",
                "El traslado definitivo a una dependencia del interior provincial manteniendo la totalidad de sus suplementos"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 (Santa Fe), Arts. 48 y 49: Situaciones de Revista",
            "explanation": "La disponibilidad pasiva aparta temporalmente al policía bajo sumario grave o proceso penal, retirando arma/credencial y reduciendo haberes según la ley."
        },
        {
            "id": "si-d13",
            "difficulty": "dificil",
            "question": "En materia de requisa a personas del género femenino, ¿cuál es el mandato legal expreso del Art. 215 del CPP?",
            "options": [
                "Debe ser efectuada exclusivamente por personal policial femenino, respetando el pudor y la intimidad de la persona",
                "Puede realizarla cualquier efectivo masculino siempre que se encuentre presente el jefe de la comisaría de turno",
                "Solo requiere presencia de personal femenino si la requisa se lleva a cabo dentro de una celda de detención",
                "No existen pautas de género en la ley procesal santafesina aplicándose un criterio uniforme para todos los ciudadanos"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 215 segundo párrafo",
            "explanation": "La ley exige imperativamente que la requisa corporal a mujeres sea ejecutada por personal femenino, bajo sanción de nulidad y falta grave disciplinaria."
        },
        {
            "id": "isep-d26-001",
            "difficulty": "facil",
            "question": "El liderazgo policial se define principalmente como:",
            "options": [
                "Un cargo jerárquico otorgado por la superioridad",
                "Un destino que se alcanza al final de la carrera",
                "Un proceso en constante desarrollo",
                "Una habilidad innata exclusiva de algunas personas"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Un proceso en constante desarrollo\"."
        },
        {
            "id": "isep-d26-002",
            "difficulty": "facil",
            "question": "Según el enfoque de \"Pequeños Grandes Líderes\", el liderazgo:",
            "options": [
                "Depende del rango y la antigüedad",
                "Se basa solo en el cumplimiento de órdenes",
                "Puede desarrollarse y perfeccionarse",
                "Es exclusivo del personal superior"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Puede desarrollarse y perfeccionarse\"."
        },
        {
            "id": "isep-d26-006",
            "difficulty": "facil",
            "question": "¿Cuál de los siguientes NO es un valor fundamental del liderazgo policial?",
            "options": [
                "Ética",
                "Integridad",
                "Responsabilidad",
                "autoritario"
            ],
            "correctIndex": 3,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"autoritario\"."
        },
        {
            "id": "isep-d26-014",
            "difficulty": "facil",
            "question": "Dicho Código fue incorporado al derecho argentino mediante la:",
            "options": [
                "Ley N.º 26.657",
                "Ley N.º 24.059 – Ley de Seguridad Interior (1992)",
                "Decreto N.º 911/21",
                "Constitución Nacional"
            ],
            "correctIndex": 1,
            "source": "Ley Nacional de Salud Mental (Ley 26.657) - Protocolo de Actuación Policial",
            "explanation": "La Ley 26.657 establece que la intervención de fuerzas de seguridad ante crisis subjetivas o padecimientos mentales es de carácter auxiliar sanitario. La opción correcta conforme a la normativa oficial es: \"Ley N.º 24.059 – Ley de Seguridad Interior (1992)\"."
        },
        {
            "id": "isep-d26-024",
            "difficulty": "facil",
            "question": "La Ley Nacional de Salud Mental es la: a) Ley 24.059",
            "options": [
                "Ley 26.657",
                "Ley 27.275",
                "Internación preventiva por orden directa del personal policial interviniente",
                "Inmovilización física como primera medida obligatoria de contención"
            ],
            "correctIndex": 0,
            "source": "Ley Nacional de Salud Mental (Ley 26.657) - Protocolo de Actuación Policial",
            "explanation": "La Ley 26.657 establece que la intervención de fuerzas de seguridad ante crisis subjetivas o padecimientos mentales es de carácter auxiliar sanitario. La opción correcta conforme a la normativa oficial es: \"Ley 26.657\"."
        },
        {
            "id": "isep-d26-025",
            "difficulty": "facil",
            "question": "La intervención policial en crisis subjetiva debe ser:",
            "options": [
                "Excepcional y respetuosa de los Derechos Humanos",
                "Automática",
                "Internación preventiva por orden directa del personal policial interviniente",
                "Inmovilización física como primera medida obligatoria de contención"
            ],
            "correctIndex": 0,
            "source": "Ley Nacional de Salud Mental (Ley 26.657) - Protocolo de Actuación Policial",
            "explanation": "La Ley 26.657 establece que la intervención de fuerzas de seguridad ante crisis subjetivas o padecimientos mentales es de carácter auxiliar sanitario. La opción correcta conforme a la normativa oficial es: \"Excepcional y respetuosa de los Derechos Humanos\"."
        },
        {
            "id": "isep-d26-028",
            "difficulty": "facil",
            "question": "Según el Código Civil y Comercial, se considera menor de edad a la persona que:",
            "options": [
                "No haya cumplido 16 años",
                "No haya cumplido 17 años",
                "No haya cumplido 18 años",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 2,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"No haya cumplido 18 años\"."
        },
        {
            "id": "isep-d26-029",
            "difficulty": "dificil",
            "question": "El Art. 3 del Código Procesal de Menores establece que se considera menor a quien:",
            "options": [
                "Lo determine el juez de menores",
                "No posea documentación",
                "Así lo determinen las leyes sustantivas",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"Así lo determinen las leyes sustantivas\"."
        },
        {
            "id": "isep-d26-030",
            "difficulty": "facil",
            "question": "En caso de duda sobre la edad de una persona, esta será considerada:",
            "options": [
                "Mayor hasta acreditar su edad",
                "Menor solo a efectos procesales",
                "Menor hasta que se acredite lo contrario",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 2,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"Menor hasta que se acredite lo contrario\"."
        },
        {
            "id": "isep-d26-031",
            "difficulty": "facil",
            "question": "La edad del menor se acredita prioritariamente mediante:",
            "options": [
                "Declaración jurada",
                "Testimonio policial",
                "Documentos legales",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 2,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"Documentos legales\"."
        },
        {
            "id": "isep-d26-039",
            "difficulty": "facil",
            "question": "Entre los derechos que deben informarse al menor se encuentra:",
            "options": [
                "La obligación de declarar",
                "La presunción de culpabilidad",
                "El derecho a abstenerse de declarar sin presunción en su contra",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 2,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"El derecho a abstenerse de declarar sin presunción en su contra\"."
        },
        {
            "id": "isep-d26-040",
            "difficulty": "facil",
            "question": "El interrogatorio sumario al menor puede realizarse:",
            "options": [
                "Siempre que el policía lo considere necesario",
                "Solo con autorización judicial",
                "Solo con consentimiento del menor y para orientar la investigación",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 2,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"Solo con consentimiento del menor y para orientar la investigación\"."
        },
        {
            "id": "isep-d26-042",
            "difficulty": "dificil",
            "question": "Las diligencias prevencionales deben realizarse en un plazo máximo de:",
            "options": [
                "10 días",
                "15 días",
                "20 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"15 días\"."
        },
        {
            "id": "isep-d26-043",
            "difficulty": "dificil",
            "question": "Si se dispone la internación del menor, la investigación debe elevarse al juzgado en un plazo máximo de:",
            "options": [
                "24 horas",
                "36 horas",
                "48 horas",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 2,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"48 horas\"."
        },
        {
            "id": "isep-d26-062",
            "difficulty": "facil",
            "question": "La demora para constatación de identidad podrá realizarse:",
            "options": [
                "Solo en dependencias policiales",
                "Únicamente en la vía pública",
                "En el lugar o en dependencia policial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"En el lugar o en dependencia policial\"."
        },
        {
            "id": "isep-d26-067",
            "difficulty": "facil",
            "question": "Entre los derechos de la persona demorada se encuentra:",
            "options": [
                "Acceder a abogado particular únicamente",
                "Realizar una llamada telefónica",
                "Permanecer incomunicado",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Realizar una llamada telefónica\"."
        },
        {
            "id": "isep-d26-072",
            "difficulty": "facil",
            "question": "En controles vehiculares, el registro podrá realizarse cuando:",
            "options": [
                "Sea un control rutinario",
                "El conductor lo autorice",
                "Exista sospecha fundada",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Exista sospecha fundada\"."
        },
        {
            "id": "isep-d26-080",
            "difficulty": "media",
            "question": "La inspección ocular se caracteriza por ser:",
            "options": [
                "Repetible y optativa",
                "Inmediata, única e irrepetible",
                "Solo fotográfica",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Inmediata, única e irrepetible\"."
        },
        {
            "id": "isep-d26-081",
            "difficulty": "media",
            "question": "Uno de los principios clave de la inspección ocular es:",
            "options": [
                "Velocidad",
                "Presunción",
                "Método",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Método\"."
        },
        {
            "id": "isep-d26-082",
            "difficulty": "media",
            "question": "El croquis tiene como finalidad principal:",
            "options": [
                "Embellecer el acta",
                "Sustituir la inspección ocular",
                "Representar gráficamente el lugar del hecho",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Representar gráficamente el lugar del hecho\"."
        },
        {
            "id": "isep-d26-092",
            "difficulty": "facil",
            "question": "El lugar del hecho debe preservarse:",
            "options": [
                "Solo si hay víctima fatal",
                "Con un perímetro mínimo",
                "Con un perímetro amplio ante la duda",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Con un perímetro amplio ante la duda\"."
        },
        {
            "id": "isep-d26-097",
            "difficulty": "facil",
            "question": "El Primer Respondiente Policial debe considerar, en primer lugar:",
            "options": [
                "El armamento disponible",
                "El punto de crisis, las víctimas y los sujetos intervinientes",
                "La intervención judicial inmediata",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El punto de crisis, las víctimas y los sujetos intervinientes\"."
        },
        {
            "id": "isep-d26-100",
            "difficulty": "facil",
            "question": "Para que la prioridad de paso del vehículo policial sea reconocida por la jurisprudencia, es indispensable que:",
            "options": [
                "El conductor esté uniformado",
                "El móvil tenga menos de 10 año",
                "Utilice señales lumínicas y sonoras al momento del hecho",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Utilice señales lumínicas y sonoras al momento del hecho\"."
        },
        {
            "id": "isep-d26-102",
            "difficulty": "facil",
            "question": "La Regla de Tueller fue desarrollada por:",
            "options": [
                "La Corte Suprema de Justicia",
                "El FBI",
                "El Sargento Dennis Tueller, en la década de 1980",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"El Sargento Dennis Tueller, en la década de 1980\"."
        },
        {
            "id": "isep-d26-107",
            "difficulty": "facil",
            "question": "El uso de sirena por parte de los vehículos de emergencia debe realizarse:",
            "options": [
                "Siempre que el vehículo esté en circulación",
                "Solo con balizas apagadas",
                "Ante una emergencia extraordinaria y junto con las balizas, con moderación.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Ante una emergencia extraordinaria y junto con las balizas, con moderación.\"."
        },
        {
            "id": "isep-d26-108",
            "difficulty": "facil",
            "question": "Según la normativa y la jurisprudencia, la prioridad de paso de los vehículos policiales se reconoce cuando:",
            "options": [
                "Circulan a alta velocidad",
                "Están identificados como móviles oficiales.",
                "Utilizan simultáneamente señales lumínicas y sonoras al momento del hecho",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Utilizan simultáneamente señales lumínicas y sonoras al momento del hecho\"."
        },
        {
            "id": "isep-d26-113",
            "difficulty": "facil",
            "question": "La Ley Nacional N° 26.052 establece:",
            "options": [
                "La exclusividad de la competencia federal",
                "La despenalización del consumo.",
                "La desfederalización parcial del narcotráfico, otorgando competencia a la justicia provincial en ciertos casos",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"La desfederalización parcial del narcotráfico, otorgando competencia a la justicia provincial en ciertos casos\"."
        },
        {
            "id": "isep-d26-122",
            "difficulty": "facil",
            "question": "¿Cuál de los siguientes NO es un indicador típico de finalidad comercial?",
            "options": [
                "Balanza de precisión.",
                "Droga fraccionada en dosis.",
                "Consumo personal acreditado.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Consumo personal acreditado.\"."
        },
        {
            "id": "isep-d26-127",
            "difficulty": "facil",
            "question": "Según la jurisprudencia citada (\"H., S.P., SJA\"), se acredita prima facie el fin comercial cuando existe:",
            "options": [
                "Únicamente tenencia simple.",
                "Sustancia fraccionada, balanza y dinero.",
                "Consumo personal declarado.",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Sustancia fraccionada, balanza y dinero.\"."
        },
        {
            "id": "isep-d26-147",
            "difficulty": "facil",
            "question": "Según la jurisprudencia, la denuncia anónima",
            "options": [
                "Es válida como noticia criminis y habilita la investigación",
                "Solo sirve como antecedente administrativo",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida",
                "Centralización absoluta de la toma de decisiones sin delegación de mando"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Es válida como noticia criminis y habilita la investigación\"."
        },
        {
            "id": "isep-d26-152",
            "difficulty": "facil",
            "question": "Un lugar del hecho \"abierto\" se caracteriza principalmente por:",
            "options": [
                "Protección ambiental y límites físicos.",
                "Riesgo por factores humanos exclusivamente",
                "Mayor riesgo de pérdida de indicios por factores externos.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Mayor riesgo de pérdida de indicios por factores externos.\"."
        },
        {
            "id": "isep-d26-157",
            "difficulty": "media",
            "question": "Un indicio se define como:",
            "options": [
                "La prueba judicialmente válida.",
                "El resultado del análisis científico.",
                "Todo rastro, huella o vestigio del delito.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Todo rastro, huella o vestigio del delito.\"."
        },
        {
            "id": "isep-d26-167",
            "difficulty": "facil",
            "question": "La segunda etapa del proceso corresponde a:",
            "options": [
                "Presentación judicial de la prueba.",
                "Dirección exclusiva del juez.",
                "Análisis científico o técnico del indicio.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Análisis científico o técnico del indicio.\"."
        },
        {
            "id": "isep-d26-172",
            "difficulty": "media",
            "question": "Los actos de investigación se realizan cuando:",
            "options": [
                "Siempre que haya un delito",
                "Lo ordena expresamente el juez",
                "Existe riesgo inminente de pérdida de indicios",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Existe riesgo inminente de pérdida de indicios\"."
        },
        {
            "id": "isep-d26-176",
            "difficulty": "dificil",
            "question": "El Artículo 268 del CPP:",
            "options": [
                "Regula únicamente la inspección ocular",
                "Rige toda la actividad policial",
                "Aplica solo a delitos graves",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Rige toda la actividad policial\"."
        },
        {
            "id": "isep-d26-177",
            "difficulty": "facil",
            "question": "El croquis demostrativo del lugar del hecho es:",
            "options": [
                "Un plano técnico con escala",
                "Un dibujo a mano alzada, esquemático y orientativo",
                "Un informe fotográfico",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Un dibujo a mano alzada, esquemático y orientativo\"."
        },
        {
            "id": "isep-d26-182",
            "difficulty": "media",
            "question": "La inspección ocular tiene como finalidad:",
            "options": [
                "Determinar la pena",
                "Comprobar el estado de personas, lugares y cosas",
                "Tomar declaración al imputado",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Comprobar el estado de personas, lugares y cosas\"."
        },
        {
            "id": "isep-d26-183",
            "difficulty": "media",
            "question": "Una vez iniciada la inspección ocular:",
            "options": [
                "Puede interrumpirse libremente",
                "No debe interrumpirse, salvo riesgo físico o daños",
                "Puede suspenderse por razones administrativas",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"No debe interrumpirse, salvo riesgo físico o daños\"."
        },
        {
            "id": "isep-d26-202",
            "difficulty": "media",
            "question": "Todo movimiento dentro de la Zona Crítica debe:",
            "options": [
                "Informarse verbalmente",
                "Autorizarlo la policía",
                "Constar formalmente en acta",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Constar formalmente en acta\"."
        },
        {
            "id": "isep-d26-216",
            "difficulty": "facil",
            "question": "El Responsable Policial de la Investigación (RPI) es quien:",
            "options": [
                "Dicta sentencia",
                "Dirige el juicio oral",
                "Asume la responsabilidad de la investigación en sede policial y ejecuta directivas del Fiscal",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Asume la responsabilidad de la investigación en sede policial y ejecuta directivas del Fiscal\"."
        },
        {
            "id": "isep-d26-217",
            "difficulty": "facil",
            "question": "El RPI responde funcionalmente ante:",
            "options": [
                "Jefe de Unidad Regional",
                "Juez",
                "Fiscal interviniente",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Fiscal interviniente\"."
        },
        {
            "id": "isep-d26-218",
            "difficulty": "facil",
            "question": "La designación del RPI corresponde:",
            "options": [
                "Exclusivamente al Juez",
                "A la institución policial, sin perjuicio de lo que disponga el Fiscal",
                "A la víctima",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"A la institución policial, sin perjuicio de lo que disponga el Fiscal\"."
        },
        {
            "id": "isep-d26-219",
            "difficulty": "facil",
            "question": "El Código Procesal Penal de Santa Fe:",
            "options": [
                "Exige determinada jerarquía para ser RPI",
                "Solo permite oficiales superiores como RPI",
                "No distingue grado o escalafón para cumplir la función",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"No distingue grado o escalafón para cumplir la función\"."
        },
        {
            "id": "isep-d26-220",
            "difficulty": "facil",
            "question": "Respecto al procedimiento: El RPI debe:",
            "options": [
                "Limitarse a recibir actuaciones",
                "Reunir evidencias y cumplir diligencias para individualizar responsables",
                "Delegar todo al primer interventor",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Reunir evidencias y cumplir diligencias para individualizar responsables\"."
        },
        {
            "id": "isep-d26-221",
            "difficulty": "facil",
            "question": "Si el RPI no puede concurrir inmediatamente al lugar del hecho:",
            "options": [
                "Se archiva la causa",
                "Debe documentar en sede policial y luego ampliar medidas investigativas",
                "Pierde competencia",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 1,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Debe documentar en sede policial y luego ampliar medidas investigativas\"."
        },
        {
            "id": "isep-d26-232",
            "difficulty": "facil",
            "question": "La sangre recolectada en el lugar del hecho debe embalarse en:",
            "options": [
                "Bolsa plástica cerrada",
                "Recipiente hermético húmedo",
                "Papel o cartón",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Papel o cartón\"."
        },
        {
            "id": "isep-d26-237",
            "difficulty": "dificil",
            "question": "El semen puede detectarse aproximadamente en cavidad vaginal hasta:",
            "options": [
                "6 horas",
                "24 horas",
                "3 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"3 días\"."
        },
        {
            "id": "isep-d26-252",
            "difficulty": "facil",
            "question": "La convocatoria anual a concursos es realizada por:",
            "options": [
                "Corte Suprema",
                "Jefatura de Policía",
                "Ministro de Seguridad",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Ministro de Seguridad\"."
        },
        {
            "id": "isep-d26-257",
            "difficulty": "dificil",
            "question": "El listado de inhabilitados debe publicarse por:",
            "options": [
                "3 días",
                "5 días",
                "10 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"5 días\"."
        },
        {
            "id": "isep-d26-264",
            "difficulty": "dificil",
            "question": "Según el artículo 1, la Policía tiene como función:",
            "options": [
                "Administrar justicia",
                "Dictar leyes",
                "Mantener el orden público y la paz social",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Mantener el orden público y la paz social\"."
        },
        {
            "id": "isep-d26-267",
            "difficulty": "dificil",
            "question": "Según el artículo 4, la Policía es:",
            "options": [
                "Descentralizada administrativamente",
                "Centralizada administrativamente",
                "Independiente",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Centralizada administrativamente\"."
        },
        {
            "id": "isep-d26-277",
            "difficulty": "facil",
            "question": "El Departamento Logística es:",
            "options": [
                "2",
                "3",
                "4",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"4\"."
        },
        {
            "id": "isep-d26-282",
            "difficulty": "facil",
            "question": "El Departamento Logística se encarga de:",
            "options": [
                "Inteligencia",
                "Abastecimiento",
                "Investigaciones",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Abastecimiento\"."
        },
        {
            "id": "isep-d26-297",
            "difficulty": "facil",
            "question": "La aptitud del agresor se refiere a:",
            "options": [
                "Su edad",
                "Su capacidad real para matar o lesionar",
                "Su antecedentes",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Su capacidad real para matar o lesionar\"."
        },
        {
            "id": "isep-d26-302",
            "difficulty": "facil",
            "question": "En el modelo de control continuo, \"Apuntar el arma\" corresponde a:",
            "options": [
                "Control sin arma",
                "Control verbal",
                "Control con arma de fuego",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Control con arma de fuego\"."
        },
        {
            "id": "isep-d26-307",
            "difficulty": "facil",
            "question": "La fuerza letal procede cuando:",
            "options": [
                "Hay resistencia pasiva",
                "Hay insultos",
                "Existe agresión letal o peligro inminente de muerte o lesión grave",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Existe agresión letal o peligro inminente de muerte o lesión grave\"."
        },
        {
            "id": "isep-d26-312",
            "difficulty": "facil",
            "question": "Puede alegarse obediencia debida para justificar uso ilícito de la fuerza:",
            "options": [
                "Sí, siempre",
                "Solo en emergencias",
                "No, nunca puede alegarse para eludir responsabilidad",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No, nunca puede alegarse para eludir responsabilidad\"."
        },
        {
            "id": "isep-d26-317",
            "difficulty": "facil",
            "question": "Después del uso del arma de fuego se debe:",
            "options": [
                "Retirarse del lugar",
                "Esperar orden superior",
                "Brindar asistencia médica e informar a familiares",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Brindar asistencia médica e informar a familiares\"."
        },
        {
            "id": "isep-d26-322",
            "difficulty": "facil",
            "question": "El uso excesivo de la fuerza puede:",
            "options": [
                "Fortalecer la imagen institucional",
                "Mejorar la autoridad",
                "Debilitar la legitimidad y generar desorden social",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Debilitar la legitimidad y generar desorden social\"."
        },
        {
            "id": "isep-d26-327",
            "difficulty": "facil",
            "question": "El uso de armas de fuego para impedir fuga es válido cuando:",
            "options": [
                "Hay fuga simple",
                "Hay desobediencia",
                "La persona representa peligro grave para la vida",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"La persona representa peligro grave para la vida\"."
        },
        {
            "id": "isep-d26-335",
            "difficulty": "dificil",
            "question": "De acuerdo al Artículo 4°, la resistencia pasiva implica:",
            "options": [
                "Violencia directa contra el agente.",
                "Uso de arma blanca.",
                "Omisión persistente de seguir indicaciones sin ejercer fuerza física activa.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Omisión persistente de seguir indicaciones sin ejercer fuerza física activa.\"."
        },
        {
            "id": "isep-d26-336",
            "difficulty": "dificil",
            "question": "Según el Artículo 4°, el ataque directo consiste en:",
            "options": [
                "Intimidación verbal reiterada.",
                "Actos de violencia dirigidos a neutralizar la intervención del agente o facilitar la huida.",
                "Negativa a identificarse.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Actos de violencia dirigidos a neutralizar la intervención del agente o facilitar la huida.\"."
        },
        {
            "id": "isep-d26-337",
            "difficulty": "dificil",
            "question": "Según el Artículo 5°, ante intimidación verbal la respuesta proporcional es:",
            "options": [
                "Fuerza defensiva inmediata.",
                "Uso de arma de fuego.",
                "Comunicación con el propósito de retornar a la normalidad.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Comunicación con el propósito de retornar a la normalidad.\"."
        },
        {
            "id": "isep-d26-342",
            "difficulty": "dificil",
            "question": "Según el Artículo 7°, la situación medioambiental comprende:",
            "options": [
                "Solo condiciones climáticas.",
                "Solo visibilidad.",
                "Conjunto de condiciones externas (terreno, clima, visibilidad) que influyen en la intervención.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Conjunto de condiciones externas (terreno, clima, visibilidad) que influyen en la intervención.\"."
        },
        {
            "id": "isep-d26-353",
            "difficulty": "dificil",
            "question": "Las causas de justificación se encuentran en el:",
            "options": [
                "Artículo 35 Código Penal",
                "Artículo 33 Código Penal",
                "Artículo 34 Código Penal",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Artículo 34 Código Penal\"."
        },
        {
            "id": "isep-d26-356",
            "difficulty": "facil",
            "question": "A los menores entre 16 y 18 años:",
            "options": [
                "Se les aplica arresto",
                "No se les puede aplicar arresto",
                "Se les aplica prisión",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 1,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"No se les puede aplicar arresto\"."
        },
        {
            "id": "isep-d26-362",
            "difficulty": "facil",
            "question": "También se puede aplicar:",
            "options": [
                "Pena capital",
                "Clausura",
                "Reclusión perpetua",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Clausura\"."
        },
        {
            "id": "isep-d26-372",
            "difficulty": "facil",
            "question": "Las reglas de conducta en la condena en suspenso pueden durar hasta:",
            "options": [
                "6 meses",
                "2 años",
                "1 año",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"1 año\"."
        },
        {
            "id": "isep-d26-387",
            "difficulty": "facil",
            "question": "La autodefensa del imputado:",
            "options": [
                "Está prohibida siempre.",
                "Puede autorizarse salvo que resulte perjudicial.",
                "Es obligatoria",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Puede autorizarse salvo que resulte perjudicial.\"."
        },
        {
            "id": "isep-d26-388",
            "difficulty": "facil",
            "question": "Si el imputado es menor de edad:",
            "options": [
                "Debe defenderse solo",
                "Debe intervenir defensor público si no tiene defensor particular",
                "Se suspende el proceso",
                "Alojamiento en dependencia policial hasta la presentación de los progenitores"
            ],
            "correctIndex": 1,
            "source": "Ley de Protección Integral de los Derechos de las Niñas, Niños y Adolescentes (Ley 12.967)",
            "explanation": "La Ley 12.967 y el régimen de menores garantizan el interés superior del niño y exigen la intervención de órganos de protección de derechos. La opción correcta conforme a la normativa oficial es: \"Debe intervenir defensor público si no tiene defensor particular\"."
        },
        {
            "id": "isep-d26-408",
            "difficulty": "facil",
            "question": "Además de la multa, el infractor puede ser obligado a:",
            "options": [
                "Hacer trabajo comunitario",
                "Realizar curso de manejo",
                "Realizar un curso sobre violencia de género",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Realizar un curso sobre violencia de género\"."
        },
        {
            "id": "isep-d26-417",
            "difficulty": "dificil",
            "question": "¿Qué artículos regulan la Investigación Penal Preparatoria?",
            "options": [
                "Art. 200 al 240",
                "Art. 251 al 293",
                "Art. 300 al 350",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Art. 251 al 293\"."
        },
        {
            "id": "isep-d26-421",
            "difficulty": "media",
            "question": "¿Qué audiencia se realiza cuando el fiscal comunica formalmente el delito al imputado?",
            "options": [
                "Audiencia preliminar",
                "Audiencia de juicio",
                "Audiencia imputativa",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Audiencia imputativa\"."
        },
        {
            "id": "isep-d26-427",
            "difficulty": "facil",
            "question": "La IPP tiene como finalidad:",
            "options": [
                "Determinar la pena",
                "Averiguar los hechos delictivos y reunir pruebas",
                "Ejecutar la sentencia",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Averiguar los hechos delictivos y reunir pruebas\"."
        },
        {
            "id": "isep-d26-432",
            "difficulty": "facil",
            "question": "¿Qué ocurre si las partes presentan una postura conjunta y no hay controversia?",
            "options": [
                "Se suspende el proceso",
                "Se debe convocar obligatoriamente a audiencia",
                "El Tribunal puede resolver sin convocar a audiencia",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El Tribunal puede resolver sin convocar a audiencia\"."
        },
        {
            "id": "isep-d26-437",
            "difficulty": "dificil",
            "question": "¿Dentro de qué plazo puede el juez resolver luego de finalizado el debate de la audiencia preliminar?",
            "options": [
                "2 días",
                "3 días",
                "5 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"5 días\"."
        },
        {
            "id": "isep-d26-447",
            "difficulty": "facil",
            "question": "Antes de declarar, los testigos:",
            "options": [
                "Pueden hablar entre ellos",
                "Pueden escuchar todo el debate",
                "No pueden comunicarse entre sí",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No pueden comunicarse entre sí\"."
        },
        {
            "id": "isep-d26-449",
            "difficulty": "media",
            "question": "¿Qué es la inspección ocular?",
            "options": [
                "Un informe policial",
                "Un interrogatorio a testigos",
                "Una observación metódica del lugar del hecho o escena del crimen",
                "Únicamente con autorización previa y por escrito del Fiscal en turno"
            ],
            "correctIndex": 2,
            "source": "Código Procesal Penal de Santa Fe (Ley 12.734) / Guía MPA",
            "explanation": "El CPP de Santa Fe (Ley 12.734) y las instrucciones del MPA regulan taxativamente las atribuciones del personal policial y los plazos procesales. La opción correcta conforme a la normativa oficial es: \"Una observación metódica del lugar del hecho o escena del crimen\"."
        },
        {
            "id": "isep-d26-462",
            "difficulty": "facil",
            "question": "¿Para qué se obtiene ADN del imputado?",
            "options": [
                "Para condenarlo automáticamente",
                "Para archivar la causa",
                "Para crear una huella genética digitalizada",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Para crear una huella genética digitalizada\"."
        },
        {
            "id": "isep-d26-467",
            "difficulty": "facil",
            "question": "En el reconocimiento en rueda de personas, la cantidad mínima de personas similares es:",
            "options": [
                "2",
                "3",
                "5",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"3\"."
        },
        {
            "id": "isep-d26-477",
            "difficulty": "media",
            "question": "El agente revelador se caracteriza por:",
            "options": [
                "Infiltrarse permanentemente",
                "Actuar en operaciones puntuales",
                "No participar en delitos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Actuar en operaciones puntuales\"."
        },
        {
            "id": "isep-d26-482",
            "difficulty": "media",
            "question": "El ADN puede obtenerse:",
            "options": [
                "Solo con consentimiento",
                "Solo por orden judicial",
                "Con consentimiento o por orden judicial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Con consentimiento o por orden judicial\"."
        },
        {
            "id": "isep-d26-492",
            "difficulty": "facil",
            "question": "En extorsión, ¿qué es importante?",
            "options": [
                "El medio utilizado (teléfono/red social)",
                "El croquis",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El medio utilizado (teléfono/red social)\"."
        },
        {
            "id": "isep-d26-494",
            "difficulty": "facil",
            "question": "Según la Ley 26.485, la violencia contra la mujer es:",
            "options": [
                "Solo la agresión física",
                "Solo la violencia dentro del hogar",
                "Toda conducta que afecte derechos basada en desigualdad de poder",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Toda conducta que afecte derechos basada en desigualdad de poder\"."
        },
        {
            "id": "isep-d26-495",
            "difficulty": "facil",
            "question": "La violencia psicológica incluye:",
            "options": [
                "Solo insultos",
                "Daño emocional y control de la conducta",
                "Exclusivamente amenazas de muerte",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Daño emocional y control de la conducta\"."
        },
        {
            "id": "isep-d26-497",
            "difficulty": "facil",
            "question": "La violencia simbólica se manifiesta a través de:",
            "options": [
                "Amenazas directas",
                "Detenciones ilegales",
                "Estereotipos y mensajes que naturalizan desigualdad",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Estereotipos y mensajes que naturalizan desigualdad\"."
        },
        {
            "id": "isep-d26-498",
            "difficulty": "facil",
            "question": "La violencia doméstica se caracteriza por:",
            "options": [
                "Ocurrir solo en espacios públicos",
                "Ser cometida por desconocidos",
                "Darse dentro del grupo familiar o relaciones de pareja",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Darse dentro del grupo familiar o relaciones de pareja\"."
        },
        {
            "id": "isep-d26-499",
            "difficulty": "facil",
            "question": "La violencia institucional es:",
            "options": [
                "La ejercida por familiares",
                "La violencia callejera",
                "La realizada por funcionarios que obstaculizan derechos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"La realizada por funcionarios que obstaculizan derechos\"."
        },
        {
            "id": "isep-d26-500",
            "difficulty": "facil",
            "question": "La violencia laboral incluye:",
            "options": [
                "Únicamente insultos",
                "Solo violencia física",
                "Discriminación y desigualdad en el trabajo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Discriminación y desigualdad en el trabajo\"."
        },
        {
            "id": "isep-d26-502",
            "difficulty": "facil",
            "question": "La violencia mediática consiste en:",
            "options": [
                "Difusión de imágenes que discriminan o humillan",
                "Violencia física en medios",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 0,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Difusión de imágenes que discriminan o humillan\"."
        },
        {
            "id": "isep-d26-503",
            "difficulty": "facil",
            "question": "La violencia en el espacio público incluye:",
            "options": [
                "Solo robos",
                "Conductas con connotación sexual que afectan la dignidad",
                "Solo violencia institucional",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Conductas con connotación sexual que afectan la dignidad\"."
        },
        {
            "id": "isep-d26-504",
            "difficulty": "facil",
            "question": "La violencia digital es:",
            "options": [
                "Cualquier agresión mediante tecnología",
                "Solo insultos por celular",
                "Robo físico de celulares",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Cualquier agresión mediante tecnología\"."
        },
        {
            "id": "isep-d26-505",
            "difficulty": "facil",
            "question": "El ciclo de violencia tiene tres fases:",
            "options": [
                "Discusión – reconciliación – separación",
                "Tensión – agresión – luna de miel",
                "Golpe – denuncia – cárcel",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Tensión – agresión – luna de miel\"."
        },
        {
            "id": "isep-d26-506",
            "difficulty": "facil",
            "question": "En la fase de acumulación de tensión:",
            "options": [
                "Hay violencia extrema",
                "El agresor pide perdón",
                "Se generan conflictos y control progresivo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Se generan conflictos y control progresivo\"."
        },
        {
            "id": "isep-d26-507",
            "difficulty": "facil",
            "question": "En la fase de agresión:",
            "options": [
                "Aparecen agresiones visibles",
                "Hay reconciliación",
                "No hay conflictos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Aparecen agresiones visibles\"."
        },
        {
            "id": "isep-d26-508",
            "difficulty": "facil",
            "question": "En la fase de \"luna de miel\":",
            "options": [
                "El agresor ignora a la víctima",
                "El agresor pide perdón y promete cambiar",
                "Hay violencia física",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"El agresor pide perdón y promete cambiar\"."
        },
        {
            "id": "isep-d26-509",
            "difficulty": "facil",
            "question": "La violencia de género:",
            "options": [
                "Es biológica",
                "Es producto de desigualdad social y cultural",
                "Es solo doméstica",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Es producto de desigualdad social y cultural\"."
        },
        {
            "id": "isep-d26-511",
            "difficulty": "dificil",
            "question": "El femicidio está previsto en:",
            "options": [
                "Artículo 14",
                "Artículo 80 del Código Penal",
                "Ley de tránsito",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Artículo 80 del Código Penal\"."
        },
        {
            "id": "isep-d26-512",
            "difficulty": "dificil",
            "question": "El inc. 11 del art. 80 establece:",
            "options": [
                "Robo agravado",
                "Homicidio de una mujer mediando violencia de género",
                "Lesiones leves",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Ley 26.485 de Protección Integral contra la Violencia hacia las Mujeres",
            "explanation": "La Ley 26.485 dispone medidas de protección urgentes, atención prioritaria y articulación inmediata con la fiscalía especializada. La opción correcta conforme a la normativa oficial es: \"Homicidio de una mujer mediando violencia de género\"."
        }
    ],
    "inspector-subcomisario": [
        {
            "id": "is-f01",
            "difficulty": "facil",
            "question": "¿Cuál es el objetivo principal de la desfederalización del microtráfico establecida por la Ley 14.239 en Santa Fe?",
            "options": [
                "Permitir la persecución ágil del comercio de drogas al menudeo en barrios por parte de la justicia provincial",
                "Traspasar la custodia de las cárceles federales de máxima seguridad al personal de la policía de Santa Fe",
                "Permitir el libre consumo de sustancias estupefacientes en plazas y paseos públicos de las grandes ciudades",
                "Eliminar la intervención de los juzgados federales en los casos de grandes cargamentos y contrabando"
            ],
            "correctIndex": 0,
            "source": "Ley Provincial 14.239 (Santa Fe) - Microtráfico / Narcomenudeo",
            "explanation": "La ley asume la competencia provincial para desarticular 'bunkers' y puntos de venta minorista barrial con fiscales y jueces locales del MPA."
        },
        {
            "id": "is-f02",
            "difficulty": "facil",
            "question": "¿Cuáles son las cinco partes fundamentales que componen una Orden de Operaciones (OO) policial?",
            "options": [
                "I. Situación, II. Misión, III. Ejecución, IV. Logística y Administración, V. Comando y Comunicaciones",
                "I. Denuncia, II. Investigación, III. Allanamientos, IV. Detención de sospechosos, V. Juicio Oral",
                "I. Personal de turno, II. Armas provistas, III. Móviles en servicio, IV. Combustible, V. Novedades",
                "I. Orden de mérito, II. Horas adicionales, III. Licencias del tercio, IV. Sanciones, V. Archivo"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Planificación Operativa y Órdenes de Operaciones",
            "explanation": "El formato estándar de la Orden de Operaciones (OO) se estructura en: Situación, Misión, Ejecución, Logística/Administración y Comando/Comunicaciones."
        },
        {
            "id": "is-f03",
            "difficulty": "facil",
            "question": "En la conducción de una dependencia policial, ¿quién es el jefe natural de la misma con responsabilidad integral sobre su funcionamiento?",
            "options": [
                "El Jefe de Comisaría (Oficial Jefe designado por orden de la Jefatura de Unidad Regional)",
                "El Oficial de Guardia más antiguo que se encuentre prestando servicio en el tercio de turno",
                "El empleado administrativo encargado del despacho de expedientes del Ministerio Público de la Acusación",
                "El personal subalterno con mayor cantidad de horas acumuladas de policía adicional en el mes"
            ],
            "correctIndex": 0,
            "source": "Reglamento Orgánico de Comisarías de Santa Fe - ISEP 2026",
            "explanation": "El titular de la comisaría ejerce la conducción, mando administrativo, disciplinario y operativo de la unidad ante la superioridad y la justicia."
        },
        {
            "id": "is-f04",
            "difficulty": "facil",
            "question": "¿Qué reactivo químico de orientación se utiliza comúnmente en pruebas de campo policial para identificar presunta cocaína?",
            "options": [
                "Reactivo de Scott (da coloración azul en presencia de clorhidrato de cocaína)",
                "Reactivo de Marquis (utilizado primordialmente para la detección de opiáceos y anfetaminas)",
                "Solución salina fisiológica al 0,9% estéril para dilución de muestras sólidas",
                "Alcohol etílico al 70% para desinfección de envoltorios plásticos de fraccionamiento"
            ],
            "correctIndex": 0,
            "source": "Manual de Procedimiento en Microtráfico - Ley 14.239 / Criminalística ISEP",
            "explanation": "El Test de Scott es la prueba orientativa estándar: el tiocianato de cobalto reacciona virando a azul turquesa ante derivados de cocaína."
        },
        {
            "id": "is-f05",
            "difficulty": "facil",
            "question": "¿Cómo debe realizarse el desarme de campo (primer escalón de mantenimiento) de la pistola Bersa TPR9?",
            "options": [
                "Comprobando visual y manualmente que la recámara esté vacía, retirando cargador y accionando la palanca de desarme",
                "Apretando el disparador repetidas veces mientras se tira fuertemente de la corredera hacia atrás",
                "Introduciendo un destornillador plano en la ranura del percutor para forzar la salida del resorte recuperador",
                "Sumergiendo el arma armada en nafta o solventes inflamables durante toda la noche de guardia"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Mantenimiento Reglamentario de Armas de Fuego",
            "explanation": "El desarme básico requiere verificar descarga total (cargador y recámara), girar la palanca de desarme 90° y retirar corredera, cañón y resorte."
        },
        {
            "id": "is-f06",
            "difficulty": "facil",
            "question": "¿Qué papel desempeña el 'Centro de Denuncias Patrimoniales' (o mesa de entradas) en una comisaría?",
            "options": [
                "Es el primer punto de contacto con el ciudadano para recepcionar denuncias, reclamos y derivaciones",
                "Es una oficina exclusiva para la liquidación de sueldos y cobro de suplementos de guardia del personal",
                "Es el depósito donde se guardan las armas largas y escopetas policiales de la reserva táctica",
                "Es la sala donde se realizan las ruedas de reconocimiento de sospechosos con jurados populares"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Conducción de Comisarías y Atención al Ciudadano",
            "explanation": "La mesa de entradas y guardia es la cara visible de la institución; su trato profesional, celeridad y empatía determinan la confianza pública."
        },
        {
            "id": "is-f07",
            "difficulty": "facil",
            "question": "En el secuestro de drogas fraccionadas para la venta, ¿por qué es importante incautar el dinero de baja denominación hallado en el lugar?",
            "options": [
                "Porque constituye indicio objetivo del comercio minorista derivado de transacciones sucesivas de narcomenudeo",
                "Porque ese dinero se destina inmediatamente a pagar los viáticos de los oficiales de la patrulla",
                "Porque la ley prohíbe que los ciudadanos posean billetes de baja denominación dentro de sus viviendas",
                "Porque el dinero en efectivo pierde validez legal una vez que entra en contacto con sustancias prohibidas"
            ],
            "correctIndex": 0,
            "source": "Ley 14.239 / Guía Operativa de Intervenciones en Microtráfico",
            "explanation": "Billetes chicos (de $500, $1.000, $2.000) junto a balanzas de precisión y recortes de nylon son prueba contundente de comercio activo al menudeo."
        },
        {
            "id": "is-f08",
            "difficulty": "facil",
            "question": "¿Qué es la 'Misión' dentro del cuerpo de una Orden de Operaciones policial?",
            "options": [
                "El enunciado claro, conciso y directo de qué debe lograr la fuerza, dónde, cuándo y con qué finalidad",
                "El relato cronológico de los antecedentes penales de todos los delincuentes identificados en el barrio",
                "La lista detallada de los alimentos y raciones de campaña provistas para el personal de servicio",
                "El cálculo del presupuesto monetario que cobrará cada efectivo por prestar servicio en el operativo"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Planificación Táctica Policial",
            "explanation": "La misión responde a las preguntas clave: Quién, Qué, Dónde, Cuándo y Para Qué, guiando el esfuerzo de todo el personal empeñado en el servicio."
        },
        {
            "id": "is-f09",
            "difficulty": "facil",
            "question": "Al secuestrar una balanza digital de precisión en un punto de microtráfico, ¿cómo debe ser embalada?",
            "options": [
                "En caja o bolsa de papel madera con faja de seguridad firmada por testigos para no borrar restos de sustancia adheridos",
                "Limpiándola previamente con un paño húmedo para que se pueda leer con claridad la marca del fabricante",
                "Encendiéndola en la comisaría para pesar los expedientes y verificar si funciona correctamente la batería",
                "Entregándosela a los testigos de actuación para que la custodien en su casa hasta la fecha del juicio oral"
            ],
            "correctIndex": 0,
            "source": "Manual de Criminalística y Cadena de Custodia en Estupefacientes",
            "explanation": "Las balanzas suelen contener trazas microscópicas de droga; deben preservarse intactas en soporte de papel sin limpiar para pericias químicas."
        },
        {
            "id": "is-f10",
            "difficulty": "facil",
            "question": "¿Qué autoridad provincial coordina las políticas de persecución del microtráfico entre el Ministerio de Justicia y Seguridad y el MPA?",
            "options": [
                "La Mesa Interinstitucional de Seguridad y la Fiscalía General del Ministerio Público de la Acusación",
                "La Dirección Nacional de Aduanas y la Administración Federal de Ingresos Públicos (AFIP)",
                "El Juzgado Federal con competencia electoral de la capital de la Provincia de Santa Fe",
                "La Jefatura del Servicio Penitenciario Federal con asiento en la Ciudad Autónoma de Buenos Aires"
            ],
            "correctIndex": 0,
            "source": "Ley 14.239 de Santa Fe - Coordinación Institucional",
            "explanation": "La aplicación de la ley de microtráfico es articulada de manera directa entre el Ministerio de Justicia y Seguridad y el MPA provincial."
        },
        {
            "id": "is-f11",
            "difficulty": "facil",
            "question": "¿Cuál es la función del 'Oficial de Enlace' en una Orden de Operaciones de gran magnitud (ej. clásico de fútbol)?",
            "options": [
                "Mantener la comunicación fluida y coordinar acciones con otras fuerzas de seguridad, emergencias sanitarias y organizadores",
                "Comprar los suministros de hidratación y refrigerio para el personal desplegado en las puertas de ingreso al estadio",
                "Emitir las entradas y tickets de acceso para las autoridades gubernamentales e invitados de protocolo",
                "Disparar la escopeta con postas de estruendo ante la salida del equipo visitante al campo de juego"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Operativos de Seguridad Deportiva y Eventos Masivos",
            "explanation": "El oficial de enlace articula en tiempo real con salud (107), bomberos, tránsito municipal, directivos y justicia para resolver imprevistos."
        },
        {
            "id": "is-f12",
            "difficulty": "facil",
            "question": "¿Por qué las sustancias estupefacientes secuestradas deben pesarse en presencia de los testigos de actuación?",
            "options": [
                "Para otorgar transparencia legal al peso bruto inicial y evitar sospechas de sustracción o reemplazo de la sustancia",
                "Porque los testigos son quienes deben llevar la sustancia a su domicilio para conservarla en la heladera",
                "Porque la ley exige que los testigos compren la sustancia al finalizar el pesaje formal en la mesa de guardia",
                "Para que el personal policial no tenga que firmar el acta asumiendo la responsabilidad del procedimiento"
            ],
            "correctIndex": 0,
            "source": "Ley 14.239 / Protocolo de Actuación en Secuestro de Estupefacientes",
            "explanation": "El pesaje conjunto y su asiento en el acta con firma de los testigos garantiza que la cantidad secuestrada no sufrió mermas ni adulteración."
        },
        {
            "id": "is-m01",
            "difficulty": "media",
            "question": "¿Cuál es el criterio distintivo para que una causa de estupefacientes sea investigada por el fuero ordinario provincial (Ley 14.239) y no por el Fuero Federal?",
            "options": [
                "Comercialización fraccionada en dosis destinadas directamente al consumidor y facilitación ocasional de estupefacientes",
                "Transporte a granel interjurisdiccional con camiones de carga de más de quinientos kilogramos de peso bruto",
                "Asociaciones ilícitas internacionales con triangulación financiera en paraísos fiscales investigadas por UIF",
                "Contrabando de precursores químicos a través de puertos de ultramar sobre el Río Paraná fiscalizados por Prefectura"
            ],
            "correctIndex": 0,
            "source": "Ley 14.239, Art. 1 (Adhesión al Art. 34 de la Ley 23.737) - Santa Fe",
            "explanation": "Santa Fe asumió los delitos del último eslabón de la cadena (art. 5 inc. c, art. 14 de la Ley 23.737): venta minorista, entrega y tenencia para consumo."
        },
        {
            "id": "is-m02",
            "difficulty": "media",
            "question": "En la confección de una Orden de Operaciones, ¿qué contiene el anexo de 'Reglas de Empeñamiento' (ROE)?",
            "options": [
                "Las pautas estrictas de actuación y niveles autorizados del uso de la fuerza y armas de fuego para cada fase del operativo",
                "La lista de precios autorizados para la venta de alimentos y bebidas dentro del radio de exclusión del evento",
                "El cronograma de turnos y licencias ordinarias de verano correspondientes al personal administrativo de la jefatura",
                "Las características técnicas y especificaciones de fábrica de los teléfonos celulares particulares de los oficiales"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Conducción Táctica y Operaciones de Orden Público",
            "explanation": "Las ROE (Rules of Engagement) establecen cuándo y cómo escalar el uso de la fuerza (verbalización, bastón, postas de goma, letal) ante cada hipótesis."
        },
        {
            "id": "is-m03",
            "difficulty": "media",
            "question": "Si durante un procedimiento de narcomenudeo se descubren armas de fuego con numeración limada o adulterada, ¿cómo se desdobla la causa?",
            "options": [
                "La droga tramita ante el fiscal de microtráfico del MPA y la tenencia ilegítima de arma con numeración limada por el fiscal penal ordinario",
                "Todo el procedimiento debe ser derivado automáticamente a los Tribunales Federales de Comodoro Py en Buenos Aires",
                "El arma se devuelve inmediatamente al dueño del domicilio labrándose únicamente acta por el secuestro de la droga",
                "Se archiva la causa de drogas y se procesa al imputado exclusivamente por una contravención municipal de ruidos molestos"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Coordinación del MPA de Santa Fe - Microtráfico y Armas",
            "explanation": "Ambos delitos son de competencia provincial de Santa Fe (MPA): el microtráfico por Ley 14.239 y el arma de guerra limada por el Art. 189 bis inc. 2 CP."
        },
        {
            "id": "is-m04",
            "difficulty": "media",
            "question": "En el libro de detenidos de una comisaría, ¿cuál es el plazo máximo para notificar la aprehensión a la Defensa Pública (SPPDP)?",
            "options": [
                "En forma inmediata y sin dilación a fin de garantizar el ejercicio del derecho constitucional de defensa en juicio",
                "Dentro de las 72 horas siempre que el detenido manifieste por escrito no tener dinero para pagar un abogado particular",
                "Al momento en que se celebre la audiencia preliminar de elevación a juicio en los tribunales penales de distrito",
                "La policía no tiene obligación de notificar a la defensa pública sino únicamente a los familiares directos del demorado"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 / Ley 13.014 del Servicio Público Provincial de Defensa Penal",
            "explanation": "El SPPDP debe ser notificado inmediatamente de toda detención para asegurar asistencia legal técnica desde las primeras horas de la aprehensión."
        },
        {
            "id": "is-m05",
            "difficulty": "media",
            "question": "¿Qué función cumple la 'Cadena de Mando' en la conducción de un destacamento o comisaría?",
            "options": [
                "Establece la línea formal ininterrumpida de autoridad, subordinación y responsabilidad desde el superior hasta el escalón más bajo",
                "Permite que cualquier subalterno modifique las directivas operativas de la jefatura si no está de acuerdo con el servicio",
                "Determina el orden de prelación para el cobro del plus salarial por título universitario otorgado por el ISEP",
                "Es el candado de acero templado con el que se aseguran las puertas de acceso a los calabozos de detención transitoria"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 - Régimen Orgánico y Jerárquico Policial",
            "explanation": "La cadena de mando asegura la unidad de doctrina y dirección: cada escalón responde ante su superior y ejerce el mando sobre sus subordinados."
        },
        {
            "id": "is-m06",
            "difficulty": "media",
            "question": "¿Qué establece el protocolo respecto a la demolición de los 'Bunkers' de venta de drogas en el marco de la Ley 14.239?",
            "options": [
                "Requiere autorización judicial previa a solicitud fundada del Fiscal del MPA, constatando que la estructura es un punto exclusivo de venta",
                "Puede ser demolido inmediatamente por la patrulla policial con mazas y herramientas sin dar aviso a ningún magistrado",
                "Debe ser prendido fuego por los vecinos del barrio en presencia de los medios de comunicación y canales de televisión",
                "La demolición es ilegal en la provincia de Santa Fe debiendo devolverse la construcción al propietario en todos los casos"
            ],
            "correctIndex": 0,
            "source": "Ley 14.239 de Santa Fe - Desactivación y Derribo de Inmuebles",
            "explanation": "El derribo o inutilización de búnkers de narcomenudeo exige orden judicial a pedido del fiscal tras verificar que su único destino era el comercio delictivo."
        },
        {
            "id": "is-m07",
            "difficulty": "media",
            "question": "Al recepcionar una persona denunciando ser víctima de 'Extorsión' armada, ¿cuál es la medida inmediata que debe adoptar el Subcomisario?",
            "options": [
                "Dar intervención inmediata a la unidad fiscal especializada y articular medidas urgentes de protección y custodia para la víctima",
                "Recomendar a la víctima que pague la suma exigida para evitar que los agresores cumplan sus amenazas contra el local",
                "Publicar el número telefónico de los extorsionadores en las redes sociales de la comisaría para alertar a los vecinos",
                "Esperar a que se produzca una segunda amenaza o ataque con disparos antes de dar aviso al Ministerio Público de la Acusación"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Actuación ante Balaceras y Extorsiones - MPA / Ministerio de Seguridad",
            "explanation": "Las extorsiones y balaceras exigen alerta temprana a la Unidad Especial de Balaceras del MPA y protección inmediata para salvaguardar la vida."
        },
        {
            "id": "is-m08",
            "difficulty": "media",
            "question": "¿Cuál es la diferencia técnica entre una 'Inspección Ocular' y una 'Requisa' según el Código Procesal Penal?",
            "options": [
                "La inspección ocular examina lugares y cosas a la vista; la requisa busca elementos ocultos en el cuerpo o prendas de una persona",
                "La inspección ocular se efectúa exclusivamente sobre cadáveres y la requisa se realiza únicamente sobre vehículos a motor",
                "La inspección ocular requiere presencia de un juez y la requisa puede ser ejecutada por cualquier civil que transite la calle",
                "No existe diferencia procesal alguna utilizándose ambos términos indistintamente en la redacción de las actas sumariales"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Arts. 195 y 215",
            "explanation": "La inspección comprueba el estado de lugares y cosas mediante la observación; la requisa invade la intimidad corporal/prendas en busca de efectos ilícitos ocultos."
        },
        {
            "id": "is-m09",
            "difficulty": "media",
            "question": "En el marco de la balística policial, ¿qué produce el estriado helicoidal del ánima del cañón de la pistola Bersa?",
            "options": [
                "Imprime al proyectil un movimiento de rotación giroscópica sobre su eje que le otorga estabilidad y precisión en el vuelo",
                "Aumenta la cantidad de humo que sale por la boca de fuego para camuflar la posición del tirador ante los agresores",
                "Reduce la velocidad del proyectil para asegurar que no perfore los chalecos antibalas del personal policial camarada",
                "Permite que la pólvora deflagrada se enfríe antes de que el proyectil abandone la boca del cañón del arma"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF - Balística Interior y Fundamentos del Estriado",
            "explanation": "El paso de estrías (giro a la derecha en Bersa) dota al proyectil de estabilidad giroscópica, evitando que se desvíe o cabecee en su trayectoria aérea."
        },
        {
            "id": "is-m10",
            "difficulty": "media",
            "question": "¿Quién tiene la facultad disciplinaria de ordenar la 'Suspensión Preventiva' de un oficial según el Decreto 461/15?",
            "options": [
                "El Jefe de Policía de la Provincia o el Ministro de Justicia y Seguridad a propuesta fundada de la autoridad sumariante",
                "El oficial de servicio de cuartel de la comisaría mediante anotación en el libro de novedades diarias",
                "El delegado gremial policial designado por los trabajadores de la dependencia de la Unidad Regional",
                "Cualquier ciudadano que presente una queja por mala atención en la mesa de entradas de la seccional"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15 - Medidas Preventivas Disciplinarias",
            "explanation": "La suspensión preventiva es una medida cautelar gravosa que solo puede disponer la Jefatura de Policía o el Ministro ante faltas de extrema gravedad."
        },
        {
            "id": "is-m11",
            "difficulty": "media",
            "question": "¿Qué establece la doctrina de 'Mando Compartido' o delegación de funciones en un operativo de seguridad de gran escala?",
            "options": [
                "El jefe superior delega la ejecución de tareas específicas pero mantiene la responsabilidad indelegable por la conducción general",
                "Los subalternos asumen la totalidad de la responsabilidad penal quedando el jefe del operativo exento de cualquier investigación",
                "El comando del operativo se sortea entre los oficiales jefes presentes al momento de iniciarse la formación de personal",
                "Cada jefe de sección puede decidir libremente si cumple o rechaza la misión asignada en la Orden de Operaciones formal"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Conducción de Fuerzas y Liderazgo Policial",
            "explanation": "Se puede delegar la autoridad para ejecutar, pero nunca la responsabilidad final sobre las consecuencias del operativo policial planificado."
        },
        {
            "id": "is-m12",
            "difficulty": "media",
            "question": "Al secuestrar un vehículo automotor con pedido de captura judicial en la vía pública, ¿cómo debe procederse con su inventario?",
            "options": [
                "Labrar acta detallada de estado general, kilometraje, accesorios, documentación, herramientas y pertenencias interiores con testigos",
                "Trasladarlo inmediatamente a la comisaría sin revisar el interior para no perder tiempo de patrullaje de prevención",
                "Permitir que el conductor sospechoso retire todas las cajas y bolsos del baúl antes de remolcarlo con la grúa policial",
                "Subastar los repuestos mecánicos del vehículo en la seccional para financiar los gastos de librería de la guardia"
            ],
            "correctIndex": 0,
            "source": "Reglamento de Procedimiento Policial - Secuestro de Automotores ISEP",
            "explanation": "El acta de inventario pormenorizada con testigos evita falsas denuncias por sustracción de efectos personales o averías posteriores al secuestro."
        },
        {
            "id": "is-d01",
            "difficulty": "dificil",
            "question": "En una causa de microtráfico (Ley 14.239), ¿cuál es el plazo perentorio para realizar la audiencia imputativa tras la aprehensión del imputado?",
            "options": [
                "Dentro de las 72 horas desde la detención, prorrogables por 24 horas más a solicitud fundada del Fiscal ante el Juez",
                "Dentro de las 12 horas corridas contadas a partir de la firma del acta de secuestro en la vía pública",
                "A los 30 días hábiles cuando la policía científica haya concluido la totalidad de los análisis cromatográficos",
                "El plazo es indeterminado pudiendo el fiscal fijar la audiencia cuando considere finalizada la investigación preliminar"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 274: Audiencia Imputativa y Prisión Preventiva",
            "explanation": "El plazo máximo de detención policial previa a la audiencia judicial es de 72 horas (prorrogable 24h más), bajo pena de libertad inmediata."
        },
        {
            "id": "is-d02",
            "difficulty": "dificil",
            "question": "¿Cuál es la sanción jurídica y penal para un funcionario policial que destruye o adultera un elemento secuestrado en una causa criminal?",
            "options": [
                "Delito de encubrimiento agravado (Art. 277 CP), violación de medios de prueba (Art. 255 CP) y destitución por falta gravísima",
                "Simple apercibimiento administrativo en el legajo personal si el objeto secuestrado tenía un valor económico menor a $10.000",
                "Una suspensión de cinco días de servicio ordinario pudiendo continuar realizando servicios adicionales normalmente",
                "No constituye delito si el oficial manifiesta que actuó con el objetivo de no complicar la situación procesal de un conocido"
            ],
            "correctIndex": 0,
            "source": "Código Penal de la Nación, Arts. 255 y 277 / Decreto 461/15",
            "explanation": "Adulterar pruebas es un delito penal grave contra la administración pública y una falta gravísima que acarrea exoneración ineludible."
        },
        {
            "id": "is-d03",
            "difficulty": "dificil",
            "question": "¿Qué requisito formal exige el Art. 140 del CPP de Santa Fe para la validez de un secuestro de correspondencia epistolar o electrónica?",
            "options": [
                "Orden judicial fundada previa expedida por el Juez Penal a solicitud del Fiscal, bajo pena de nulidad absoluta",
                "Autorización escrita y firmada en conformidad por el Jefe de la Unidad Regional respectiva",
                "Dictamen favorable vinculante de la Secretaría de Comunicación Social de la Gobernación provincial",
                "La simple sospecha fundada del oficial instructor plasmada en una nota interna de servicio de guardia"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 140: Interceptación de Correspondencia",
            "explanation": "La correspondencia y comunicaciones privadas gozan de inviolabilidad constitucional (Art. 18 CN); su apertura exige siempre orden de juez competente."
        },
        {
            "id": "is-d04",
            "difficulty": "dificil",
            "question": "En el marco del Decreto 461/15, ¿en qué caso la prescripción de una falta disciplinaria se interrumpe válidamente?",
            "options": [
                "Por la comisión de una nueva falta disciplinaria o por el llamado a prestar declaración indagatoria administrativa formal",
                "Por el simple cambio de destino o traslado del personal policial investigado a otra comisaría del interior",
                "Por la interposición de un recurso de queja presentado por el abogado defensor ante el Colegio de Abogados",
                "Por la toma de licencia anual ordinaria de descanso correspondiente al año calendario en curso"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Art. 47: Interrupción de la Prescripción",
            "explanation": "La prescripción se interrumpe por actos procesales formales de avance sumarial o por la comisión de nuevas infracciones antes de cumplirse el plazo legal."
        },
        {
            "id": "is-d05",
            "difficulty": "dificil",
            "question": "En criminalística balística, ¿qué determina el 'Cotejo Microscópico Comparativo' en el sistema de comparación de vainas servidas?",
            "options": [
                "La correspondencia unívoca de las micro-estrías dejadas por la aguja percutora, el botador y el extractor en el culote de la vaina",
                "La marca comercial de fábrica del cartucho y el año de elaboración impreso en el envase de cartón original",
                "La cantidad exacta de granos de pólvora de doble base que no deflagraron dentro de la recámara del arma",
                "El peso en gramos del metal de latón militar que compone la pared cilíndrica de la vaina percutida"
            ],
            "correctIndex": 0,
            "source": "Manual de Criminalística y Balística Identificativa ISEP",
            "explanation": "El percutor, la uña extractora y el botador dejan huellas microscópicas irrepetibles que identifican a un arma individual con certeza científica."
        },
        {
            "id": "is-d06",
            "difficulty": "dificil",
            "question": "¿Qué establece el Art. 211 del CPP respecto al allanamiento nocturno de morada sin orden judicial?",
            "options": [
                "Es de interpretación sumamente restrictiva, admitiéndose solo ante auxilio urgente por catástrofe o persecución flagrante de delito grave",
                "Se encuentra prohibido de manera absoluta en el territorio provincial aun cuando se escuchen pedidos de socorro desde el interior",
                "Puede ser ordenado telefónicamente por el Jefe de la Comisaría de la jurisdicción sin requerir comunicación posterior al fiscal",
                "Requiere el consentimiento verbal del presidente de la vecinal del barrio donde se encuentra emplazado el inmueble"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 211 in fine",
            "explanation": "El domicilio nocturno tiene la máxima protección constitucional; la entrada sin orden nocturna es excepcionalísima (riesgo de vida o flagrancia atroz)."
        },
        {
            "id": "is-d07",
            "difficulty": "dificil",
            "question": "Conforme a la Ley 12.521, ¿qué causal amerita la baja por 'Pérdida de Aptitud Profesional'?",
            "options": [
                "Haber sido calificado dos años consecutivos con nota insuficiente o reprobar los cursos obligatorios de ascenso del ISEP",
                "Negarse a prestar servicios de policía adicional en canchas de fútbol durante tres meses continuos",
                "Tener una sanción de apercibimiento por haber extraviado una gorra reglamentaria de fajina en el patrullaje",
                "Haber contraído matrimonio sin autorización previa del Jefe de la Unidad Regional respectiva"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 (Santa Fe), Régimen de Calificaciones y Bajas",
            "explanation": "La inaptitud profesional sobreviniente (calificaciones reprobadas reiteradas o fracaso en capacitación ISEP) faculta a la baja sin perjuicio previsional."
        },
        {
            "id": "is-d08",
            "difficulty": "dificil",
            "question": "¿Qué ocurre si en un allanamiento por microtráfico se hallan estupefacientes pero el acta omite la firma de los testigos civiles convocados?",
            "options": [
                "La prueba del hallazgo es pasible de declaración de nulidad absoluta insanable impidiendo su uso para fundar la prisión preventiva",
                "El juez penal convalida automáticamente el procedimiento aplicando una multa pecuniaria a los testigos ausentes",
                "El personal policial puede reemplazar la firma de los testigos convocando a dos oficiales camaradas de la brigada operativa",
                "Se considera una simple falta formal que no afecta la validez jurídica de la droga ni la legalidad de la aprehensión"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734, Arts. 138 y 162: Nulidades Absolutas",
            "explanation": "El acta carente de firma de testigos (sin justificación de fuerza mayor) carece de valor instrumental para acreditar la existencia del secuestro en la morada."
        },
        {
            "id": "is-d09",
            "difficulty": "dificil",
            "question": "¿Cuál es la responsabilidad administrativa del Jefe de Comisaría frente a la fuga de un preso bajo custodia de su guardia?",
            "options": [
                "Instrucción inmediata de sumario administrativo para deslindar responsabilidades funcionales y eventual imputación por favorecimiento culposo de evasión",
                "El cese definitivo y automático de todo el personal de la comisaría sin derecho a defensa previa ni sumario administrativo",
                "La obligación de abonar de su propio bolsillo una recompensa a la ciudadanía para recapturar al prófugo de la justicia",
                "No posee ninguna responsabilidad si en el momento exacto de la evasión se encontraba descansando en su domicilio particular"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15 / Código Penal Art. 281: Evasión Culposa",
            "explanation": "El titular responde por el control y funcionamiento de la guardia; la fuga abre sumario de Asuntos Internos y causa penal por omisión culposa de custodia."
        },
        {
            "id": "is-d10",
            "difficulty": "dificil",
            "question": "En la doctrina de seguridad de la información, ¿qué es un 'Ataque de Ransomware'?",
            "options": [
                "Software malicioso que cifra los archivos del sistema impidiendo el acceso a menos que se pague un rescate en criptomonedas",
                "Un programa informático que acelera la velocidad de descarga de las planillas de sueldos de la policía provincial",
                "Un protocolo de seguridad que respalda automáticamente las fotos de los detenidos en los servidores de la nube",
                "La pérdida de señal de telefonía celular ocurrida durante una tormenta eléctrica en una zona rural despoblada"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Ciberseguridad Institucional: Amenazas Críticas",
            "explanation": "El ransomware bloquea la operatividad mediante cifrado hostil; su ingreso suele darse por phishing o pendrives no autorizados en redes institucionales."
        },
        {
            "id": "is-d11",
            "difficulty": "dificil",
            "question": "¿Qué establece el Art. 222 del CPP de Santa Fe respecto al 'Registro y Requisas Vehiculares'?",
            "options": [
                "Exige motivos fundados y circunstancias previas de que el vehículo contiene cosas ilícitas o personas prófugas, labrándose acta con testigos",
                "Autoriza a desarmar íntegramente cualquier automóvil en la vía pública sin necesidad de invocar ninguna sospecha o justificación",
                "Requiere obligatoriamente que el chofer del patrullero sea el titular registral del dominio del vehículo policial utilizado",
                "Solo puede ser llevado a cabo sobre camiones de transporte internacional en pasos fronterizos provinciales habilitados"
            ],
            "correctIndex": 0,
            "source": "Ley 12.734 (CPP Santa Fe), Art. 222: Registro de Vehículos",
            "explanation": "La requisa vehicular restringe la intimidad del automotor y exige las mismas garantías que la requisa personal: causa objetiva fundada y testigos."
        },
        {
            "id": "is-d12",
            "difficulty": "dificil",
            "question": "Conforme al régimen disciplinario, ¿cuál es la autoridad máxima de apelación administrativa frente a una sanción de destitución policial?",
            "options": [
                "El Gobernador de la Provincia mediante el dictado de un Decreto que agota la vía administrativa provincial",
                "El Jefe de la Unidad Regional respectiva en acuerdo general con los oficiales superiores de plana mayor",
                "El Presidente de la Corte Suprema de Justicia de Santa Fe actuando como tribunal de alzada disciplinaria",
                "El Consejo de la Magistratura de la Provincia de Santa Fe a través de su comisión de acuerdos éticos"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 / Ley de Procedimientos Administrativos de Santa Fe",
            "explanation": "La destitución emana del Poder Ejecutivo (Gobernador); su revisión mediante recurso de reconsideración agota la vía administrativa previa al contencioso judicial."
        },
        {
            "id": "isep-d26-048",
            "difficulty": "facil",
            "question": "La Carta establece un marco general que permite a cada país:",
            "options": [
                "Aplicar sanciones unificadas",
                "Adaptar los principios a su realidad histórica, cultural e institucional",
                "Eliminar normas propias",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Adaptar los principios a su realidad histórica, cultural e institucional\"."
        },
        {
            "id": "isep-d26-053",
            "difficulty": "facil",
            "question": "El cumplimiento de la Carta contribuye principalmente a:",
            "options": [
                "La centralización del poder estatal",
                "El fortalecimiento institucional",
                "La reducción de la participación ciudadana",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El fortalecimiento institucional\"."
        },
        {
            "id": "isep-d26-063",
            "difficulty": "facil",
            "question": "La \"causa objetiva\" que habilita la demora debe basarse en:",
            "options": [
                "Presunción subjetiva del personal",
                "Sospechas o indicios ciertos",
                "Orden del superior",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Sospechas o indicios ciertos\"."
        },
        {
            "id": "isep-d26-073",
            "difficulty": "facil",
            "question": "En motovehículos, el control incluye especialmente:",
            "options": [
                "Solo al conductor",
                "Únicamente la documentación",
                "Identificación y elementos portados",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Identificación y elementos portados\"."
        },
        {
            "id": "isep-d26-078",
            "difficulty": "facil",
            "question": "La toma de muestra de sangre es obligatoria cuando:",
            "options": [
                "El conductor es profesional",
                "Hay daños materiales",
                "El vehículo es oficial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El conductor es profesional\"."
        },
        {
            "id": "isep-d26-083",
            "difficulty": "facil",
            "question": "El croquis panorámico se utiliza para:",
            "options": [
                "Detalles específicos",
                "Visión general del lugar",
                "Armas secuestradas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Visión general del lugar\"."
        },
        {
            "id": "isep-d26-093",
            "difficulty": "facil",
            "question": "La persecución policial puede originarse por:",
            "options": [
                "Únicamente órdenes judiciales",
                "Comunicaciones radiales, denuncias, controles y patrullajes preventivos",
                "Solo denuncias anónimas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Comunicaciones radiales, denuncias, controles y patrullajes preventivos\"."
        },
        {
            "id": "isep-d26-098",
            "difficulty": "facil",
            "question": "Respecto al punto de crisis, el Primer Respondiente Policial debe:",
            "options": [
                "Localizar, estabilizar, aislar, contener y evaluar",
                "Intervenir de forma directa sin apoyo",
                "Esperar instrucciones sin actuar",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Localizar, estabilizar, aislar, contener y evaluar\"."
        },
        {
            "id": "isep-d26-103",
            "difficulty": "facil",
            "question": "El fundamento técnico de la Regla de Tueller demuestra que",
            "options": [
                "El oficial siempre puede neutralizar al agresor a tiempo",
                "El agresor puede cerrar 6,4 m en menos tiempo del necesario para reaccionar y disparar",
                "El uso de la fuerza letal es automático",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El agresor puede cerrar 6,4 m en menos tiempo del necesario para reaccionar y disparar\"."
        },
        {
            "id": "isep-d26-112",
            "difficulty": "facil",
            "question": "El microtráfico se caracteriza principalmente por:",
            "options": [
                "La exportación de grandes cantidades de droga",
                "La comercialización internacional",
                "La venta minorista de dosis pequeñas destinadas al consumo directo",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"La venta minorista de dosis pequeñas destinadas al consumo directo\"."
        },
        {
            "id": "isep-d26-114",
            "difficulty": "dificil",
            "question": "Para que un delito sea de competencia provincial según el art. 2 de la Ley 26.052, es requisito esencial que",
            "options": [
                "Exista reincidencia.",
                "Sea una sustancia importada",
                "El estupefaciente esté fraccionado en dosis destinadas al consumidor",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"El estupefaciente esté fraccionado en dosis destinadas al consumidor\"."
        },
        {
            "id": "isep-d26-116",
            "difficulty": "facil",
            "question": "Para que exista tenencia de estupefacientes, se requiere:",
            "options": [
                "Contacto físico directo con la sustancia",
                "Cantidad mínima determinada.",
                "Poder de disposición sobre el material, aun sin contacto físico",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Poder de disposición sobre el material, aun sin contacto físico\"."
        },
        {
            "id": "isep-d26-117",
            "difficulty": "facil",
            "question": "Un estupefaciente, para ser considerado como tal, debe:",
            "options": [
                "Estar incluido en un listado legal únicamente",
                "Ser ilegal en cualquier circunstancia",
                "Estar en los listados legales y ser capaz de producir dependencia física o psíquica.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Estar en los listados legales y ser capaz de producir dependencia física o psíquica.\"."
        },
        {
            "id": "isep-d26-118",
            "difficulty": "facil",
            "question": "Estar en los listados legales y ser capaz de producir dependencia física o psíquica.",
            "options": [
                "Daño concreto.",
                "Lesión efectiva.",
                "Peligro abstracto que protege la Salud Pública.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Peligro abstracto que protege la Salud Pública.\"."
        },
        {
            "id": "isep-d26-119",
            "difficulty": "dificil",
            "question": "El delito de tenencia con fines de comercialización (art. 5 inc. c) requiere:",
            "options": [
                "La sola tenencia de estupefacientes.",
                "La acreditación de un resultado material dañoso.",
                "La prueba de la finalidad de comercio.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"La prueba de la finalidad de comercio.\"."
        },
        {
            "id": "isep-d26-121",
            "difficulty": "dificil",
            "question": "¿Cuál es el bien jurídico protegido en los delitos previstos por el art. 5 de la Ley 23.737?",
            "options": [
                "La seguridad pública.",
                "El orden económico",
                "La salud pública.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"La salud pública.\"."
        },
        {
            "id": "isep-d26-123",
            "difficulty": "media",
            "question": "La tenencia con fines de comercialización es un delito:",
            "options": [
                "De resultado.",
                "De peligro concreto.",
                "De peligro abstracto.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"De peligro abstracto.\"."
        },
        {
            "id": "isep-d26-125",
            "difficulty": "facil",
            "question": "En la Provincia de Santa Fe, la competencia provincial en materia de microtráfico surge de:",
            "options": [
                "Ley Nacional 23.737.",
                "Ley Nacional 26.052 exclusivamente.",
                "Ley Provincial 14.239.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Ley Provincial 14.239.\"."
        },
        {
            "id": "isep-d26-128",
            "difficulty": "dificil",
            "question": "La entrega gratuita de estupefacientes (art. 5 inc. e, último párrafo) se caracteriza por:",
            "options": [
                "La existencia de lucro.",
                "La habitualidad en la venta.",
                "La ausencia de contraprestación económica.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"La ausencia de contraprestación económica.\"."
        },
        {
            "id": "isep-d26-129",
            "difficulty": "facil",
            "question": "La pena para la entrega gratuita de estupefacientes es de:",
            "options": [
                "1 mes a 2 años.",
                "3 a 12 años.",
                "4 a 15 años.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 1,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"3 a 12 años.\"."
        },
        {
            "id": "isep-d26-132",
            "difficulty": "media",
            "question": "El almacenamiento de estupefacientes se caracteriza por:",
            "options": [
                "Exigir finalidad comercial",
                "Ser un delito de peligro abstracto.",
                "Requerir venta efectiva",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 1,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Ser un delito de peligro abstracto.\"."
        },
        {
            "id": "isep-d26-133",
            "difficulty": "media",
            "question": "El delito de transporte de estupefacientes se consuma con:",
            "options": [
                "La intención de vender.",
                "La integración a una banda.",
                "El efectivo desplazamiento de la droga.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"El efectivo desplazamiento de la droga.\"."
        },
        {
            "id": "isep-d26-134",
            "difficulty": "media",
            "question": "Las semillas de cannabis:",
            "options": [
                "Siempre configuran delito.",
                "Son estupefacientes.",
                "No contienen principio activo.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"No contienen principio activo.\"."
        },
        {
            "id": "isep-d26-135",
            "difficulty": "media",
            "question": "La denuncia anónima en delitos de microtráfico:",
            "options": [
                "Es inválida como noticia criminis.",
                "No puede iniciar una investigación.",
                "Es válida si es seria y verosímil.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Es válida si es seria y verosímil.\"."
        },
        {
            "id": "isep-d26-136",
            "difficulty": "facil",
            "question": "La política criminal de Santa Fe en microtráfico tiene como objetivo principal:",
            "options": [
                "Combatir carteles internacionales.",
                "Reprimir al consumidor.",
                "Reducir la conflictividad social territorial.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Reducir la conflictividad social territorial.\"."
        },
        {
            "id": "isep-d26-137",
            "difficulty": "dificil",
            "question": "El régimen de desfederalización en materia de estupefacientes previsto en la Ley 23.737 se encuentra regulado en",
            "options": [
                "Art. 5.",
                "Art. 14.",
                "Art. 34.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Art. 34.\"."
        },
        {
            "id": "isep-d26-138",
            "difficulty": "facil",
            "question": "Para que opere la competencia provincial en microtráfico, la sustancia debe estar:",
            "options": [
                "Destinada a exportación.",
                "En grandes cantidades.",
                "Fraccionada en dosis para el consumidor final.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Fraccionada en dosis para el consumidor final.\"."
        },
        {
            "id": "isep-d26-139",
            "difficulty": "media",
            "question": "La Ley 23.737 es la norma que:",
            "options": [
                "Regula exclusivamente el consumo personal de estupefacientes",
                "Establece el Código Penal argentino.",
                "Tipifica y reprime los delitos vinculados al tráfico ilícito de estupefacientes y sustancias controladas.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Tipifica y reprime los delitos vinculados al tráfico ilícito de estupefacientes y sustancias controladas.\"."
        },
        {
            "id": "isep-d26-140",
            "difficulty": "facil",
            "question": "La finalidad política de la Ley Provincial 14.239 es principalmente:",
            "options": [
                "Incrementar las penas.",
                "Perseguir al consumidor.",
                "Reducir la conflictividad social derivada del narcomenudeo.",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial"
            ],
            "correctIndex": 2,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Reducir la conflictividad social derivada del narcomenudeo.\"."
        },
        {
            "id": "isep-d26-143",
            "difficulty": "facil",
            "question": "La denuncia con reserva de identidad es considerada:",
            "options": [
                "Un acto administrativo",
                "Un medio de prueba inválido",
                "Un medio de prueba válido con resguardo judicial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Un medio de prueba válido con resguardo judicial\"."
        },
        {
            "id": "isep-d26-148",
            "difficulty": "media",
            "question": "La aceptación de la denuncia anónima es especialmente relevante en casos de:",
            "options": [
                "Microtráfico o narcomenudeo",
                "Delitos contra la administración pública",
                "Competencia exclusiva del Fuero Federal sin intervención de la justicia provincial",
                "Incautación y análisis de campo preliminar sin formalidades de cadena de custodia"
            ],
            "correctIndex": 0,
            "source": "Ley de Desfederalización de Narcomenudeo (Ley 14.239) / Ley 23.737",
            "explanation": "La Ley 14.239 facultó a la Policía de Santa Fe y al MPA a intervenir directamente en causas de narcomenudeo y venta minorista de estupefacientes. La opción correcta conforme a la normativa oficial es: \"Microtráfico o narcomenudeo\"."
        },
        {
            "id": "isep-d26-153",
            "difficulty": "media",
            "question": "Un vehículo utilizado para cometer un delito se clasifica como",
            "options": [
                "Lugar cerrado.",
                "Lugar mixto.",
                "Lugar móvil.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Lugar móvil.\"."
        },
        {
            "id": "isep-d26-158",
            "difficulty": "facil",
            "question": "Según su momento de producción, los indicios se clasifican en:",
            "options": [
                "Físicos, químicos y biológicos.",
                "Directos e indirectos.",
                "Antecedentes, concomitantes y consecuentes.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Antecedentes, concomitantes y consecuentes.\"."
        },
        {
            "id": "isep-d26-163",
            "difficulty": "facil",
            "question": "Una huella se define como:",
            "options": [
                "Un cambio de color en una superficie.",
                "Un depósito de sustancia extraña.",
                "Una marca producida por contacto sobre una superficie.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Una marca producida por contacto sobre una superficie.\"."
        },
        {
            "id": "isep-d26-178",
            "difficulty": "facil",
            "question": "¿Quién debe confeccionar el croquis demostrativo?",
            "options": [
                "Exclusivamente el perito",
                "El juez",
                "El primer interventor",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El primer interventor\"."
        },
        {
            "id": "isep-d26-188",
            "difficulty": "facil",
            "question": "La Investigación Penal Preparatoria (IPP) tiene por finalidad:",
            "options": [
                "Dictar sentencia",
                "Determinar la culpabilidad del imputado",
                "Preparar la acusación reuniendo prueba relevante",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Preparar la acusación reuniendo prueba relevante\"."
        },
        {
            "id": "isep-d26-233",
            "difficulty": "facil",
            "question": "Las muestras biológicas enviadas desde hospitales:",
            "options": [
                "Deben congelarse",
                "No deben congelarse",
                "Pueden enviarse sin rotular",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No deben congelarse\"."
        },
        {
            "id": "isep-d26-238",
            "difficulty": "facil",
            "question": "En caso de semen escaso, la recolección correcta es:",
            "options": [
                "Paño común",
                "Hisopos estériles",
                "Papel absorbente",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Hisopos estériles\"."
        },
        {
            "id": "isep-d26-243",
            "difficulty": "facil",
            "question": "Un error formal en la cadena de custodia puede:",
            "options": [
                "Ser subsanado automáticamente",
                "Invalidar la prueba en juicio",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Invalidar la prueba en juicio\"."
        },
        {
            "id": "isep-d26-253",
            "difficulty": "facil",
            "question": "Los jurados comienzan sus actividades a partir del:",
            "options": [
                "1° de enero",
                "1° de septiembre",
                "1° de diciembre",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"1° de septiembre\"."
        },
        {
            "id": "isep-d26-268",
            "difficulty": "facil",
            "question": "La Policía es descentralizada en el aspecto:",
            "options": [
                "Administrativo",
                "Judicial",
                "Funcional",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Funcional\"."
        },
        {
            "id": "isep-d26-278",
            "difficulty": "facil",
            "question": "El Departamento Judicial es:",
            "options": [
                "2",
                "3",
                "5",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"5\"."
        },
        {
            "id": "isep-d26-293",
            "difficulty": "media",
            "question": "La necesidad racional del medio empleado significa:",
            "options": [
                "Que debe existir igualdad exacta de armas",
                "Que la defensa debe ser matemática",
                "Que debe ser racional y proporcional al ataque",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Que debe ser racional y proporcional al ataque\"."
        },
        {
            "id": "isep-d26-298",
            "difficulty": "facil",
            "question": "El uso progresivo de la fuerza implica:",
            "options": [
                "Aplicar directamente el nivel más alto",
                "Usar siempre arma contundente",
                "Escalar la respuesta según la conducta del agresor",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Escalar la respuesta según la conducta del agresor\"."
        },
        {
            "id": "isep-d26-303",
            "difficulty": "media",
            "question": "La represión policial es:",
            "options": [
                "Venganza institucional",
                "Castigo automático",
                "Acción coercitiva para restablecer el orden público frente al delito",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Acción coercitiva para restablecer el orden público frente al delito\"."
        },
        {
            "id": "isep-d26-308",
            "difficulty": "facil",
            "question": "El uso de la fuerza nunca debe:",
            "options": [
                "Ser gradual",
                "Ser racional",
                "Ser ilegítimo o arbitrario",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Ser ilegítimo o arbitrario\"."
        },
        {
            "id": "isep-d26-313",
            "difficulty": "facil",
            "question": "Las armas de fuego son consideradas:",
            "options": [
                "Herramienta preventiva",
                "Medio habitual",
                "Medida extrema",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Medida extrema\"."
        },
        {
            "id": "isep-d26-318",
            "difficulty": "facil",
            "question": "También se debe:",
            "options": [
                "Omitir detalles",
                "Informar verbalmente",
                "Realizar informe completo y permitir investigación",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Realizar informe completo y permitir investigación\"."
        },
        {
            "id": "isep-d26-323",
            "difficulty": "facil",
            "question": "El uso de la fuerza sin respetar principios de legalidad, necesidad y proporcionalidad:",
            "options": [
                "Es válido si es rápido",
                "Es discrecional",
                "Se convierte en ilegal y violento",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se convierte en ilegal y violento\"."
        },
        {
            "id": "isep-d26-328",
            "difficulty": "facil",
            "question": "La responsabilidad por uso ilícito de la fuerza es:",
            "options": [
                "Solo institucional",
                "Solo del superior",
                "Individual y también jerárquica",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Individual y también jerárquica\"."
        },
        {
            "id": "isep-d26-333",
            "difficulty": "dificil",
            "question": "Según el Artículo 3°, una de las atribuciones del Ministerio es:",
            "options": [
                "Dictar sentencias penales.",
                "Autorizar previamente cada uso de la fuerza.",
                "Recopilar, sistematizar y publicar estadísticas periódicas sobre el uso de la fuerza.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Recopilar, sistematizar y publicar estadísticas periódicas sobre el uso de la fuerza.\"."
        },
        {
            "id": "isep-d26-338",
            "difficulty": "dificil",
            "question": "La violación del espacio personal (Art. 5°) puede habilitar:",
            "options": [
                "Detención automática.",
                "Uso obligatorio de fuerza letal.",
                "Legítima defensa preventiva para recuperar el control del espacio.",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Legítima defensa preventiva para recuperar el control del espacio.\"."
        },
        {
            "id": "isep-d26-343",
            "difficulty": "dificil",
            "question": "Conforme el Artículo 8°, son motivaciones legítimas de intervención:",
            "options": [
                "Sospecha subjetiva sin análisis.",
                "Decisión arbitraria.",
                "Requerimiento formal, análisis de riesgo dinámico o plan operativo basado en análisis de riesgo.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Requerimiento formal, análisis de riesgo dinámico o plan operativo basado en análisis de riesgo.\"."
        },
        {
            "id": "isep-d26-363",
            "difficulty": "facil",
            "question": "El decomiso consiste en:",
            "options": [
                "Arrestar al infractor",
                "Secuestrar los elementos utilizados en la infracción",
                "Suspender servicios",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Secuestrar los elementos utilizados en la infracción\"."
        },
        {
            "id": "isep-d26-368",
            "difficulty": "dificil",
            "question": "El arresto puede cumplirse:",
            "options": [
                "Solo en cárcel",
                "Solo en prisión federal",
                "En horario nocturno o días no laborables",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"En horario nocturno o días no laborables\"."
        },
        {
            "id": "isep-d26-393",
            "difficulty": "facil",
            "question": "La denuncia puede ser:",
            "options": [
                "Solo escrita.",
                "Solo verbal",
                "Verbal o escrita.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Verbal o escrita.\"."
        },
        {
            "id": "isep-d26-403",
            "difficulty": "facil",
            "question": "Las sentencias condenatorias deben comunicarse al:",
            "options": [
                "Ministerio de Seguridad.",
                "Registro Civil.",
                "Registro Único de Antecedentes Penales de la Provincia.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Registro Único de Antecedentes Penales de la Provincia.\"."
        },
        {
            "id": "isep-d26-413",
            "difficulty": "facil",
            "question": "En el proceso penal el testigo:",
            "options": [
                "Es un sujeto esencial",
                "Es un sujeto eventual",
                "No es considerado sujeto del proceso",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No es considerado sujeto del proceso\"."
        },
        {
            "id": "isep-d26-433",
            "difficulty": "facil",
            "question": "¿Cuándo se presenta la requisitoria de acusación?",
            "options": [
                "Antes de la audiencia imputativa",
                "Después de la sentencia",
                "Luego de la audiencia imputativa cuando hay prueba suficiente",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Luego de la audiencia imputativa cuando hay prueba suficiente\"."
        },
        {
            "id": "isep-d26-438",
            "difficulty": "facil",
            "question": "¿Cuál de las siguientes decisiones puede tomar el juez en la audiencia preliminar?",
            "options": [
                "Dictar sentencia condenatoria",
                "Dictar prisión perpetua",
                "Admitir o rechazar la acusación",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Admitir o rechazar la acusación\"."
        },
        {
            "id": "isep-d26-448",
            "difficulty": "facil",
            "question": "El Tribunal puede disponer protección para un testigo cuando:",
            "options": [
                "El testigo lo pide sin motivo",
                "Existe peligro de intimidación o represalias",
                "El proceso termina",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Existe peligro de intimidación o represalias\"."
        },
        {
            "id": "isep-d26-453",
            "difficulty": "media",
            "question": "¿Cuándo se realiza el levantamiento del cadáver?",
            "options": [
                "Después del juicio",
                "Antes de la denuncia",
                "Luego de la inspección preliminar del cuerpo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Luego de la inspección preliminar del cuerpo\"."
        },
        {
            "id": "isep-d26-463",
            "difficulty": "facil",
            "question": "¿Dónde se incorpora la huella genética digitalizada?",
            "options": [
                "Registro Nacional de Personas",
                "Registro Civil",
                "Registro Provincial de Huellas Genéticas Digitalizadas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Registro Provincial de Huellas Genéticas Digitalizadas\"."
        },
        {
            "id": "isep-d26-468",
            "difficulty": "facil",
            "question": "En la rueda de reconocimiento, el imputado:",
            "options": [
                "Puede negarse a participar",
                "Es ubicado por la policía",
                "Elige su colocación en la fila",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Elige su colocación en la fila\"."
        },
        {
            "id": "isep-d26-478",
            "difficulty": "facil",
            "question": "Respecto al procedimiento: El informante:",
            "options": [
                "Debe revelar su identidad",
                "Puede recibir beneficio económico",
                "No puede aportar pruebas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Puede recibir beneficio económico\"."
        },
        {
            "id": "isep-d26-483",
            "difficulty": "facil",
            "question": "La obtención de ADN debe ser:",
            "options": [
                "Invasiva",
                "Dolorosa",
                "Lo menos lesiva posible",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Lo menos lesiva posible\"."
        }
    ],
    "subcomisario-comisario": [
        {
            "id": "sc-f01",
            "difficulty": "facil",
            "question": "¿Cuál es la función primordial del Oficial Vocero Policial ante los medios de comunicación masivos?",
            "options": [
                "Transmitir información institucional oficial, veraz y prudente, sin comprometer la investigación ni derechos de víctimas",
                "Emitir opiniones personales y valoraciones subjetivas sobre las decisiones de los jueces penales de turno",
                "Brindar declaraciones 'en reserva' (off the record) filtrando nombres de sospechosos a periodistas amigos",
                "Promocionar la venta de rifas y bonos de contribución para la cooperadora de la unidad regional"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Comunicación y Prensa Institucional",
            "explanation": "El vocero oficial representa a la institución; debe brindar datos certeros confirmados, protegiendo a las víctimas y el secreto del sumario."
        },
        {
            "id": "sc-f02",
            "difficulty": "facil",
            "question": "¿Qué es el 'Poder de Policía' según el derecho administrativo y la doctrina policial de Santa Fe?",
            "options": [
                "La facultad estatal de limitar razonablemente los derechos individuales en resguardo de la seguridad, salubridad y moralidad pública",
                "La capacidad exclusiva de los oficiales superiores de portar armas de fuego automáticas de grueso calibre en ceremonias",
                "El privilegio de los comisarios de estacionar sus vehículos particulares en lugares reservados sin pagar estacionamiento medido",
                "La atribución de detener a cualquier ciudadano por tiempo indeterminado sin dar intervención al poder judicial"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Doctrina y Poder de Policía",
            "explanation": "El poder de policía es la potestad regulatoria del Estado para armonizar libertades individuales con el orden público y la convivencia pacífica."
        },
        {
            "id": "sc-f03",
            "difficulty": "facil",
            "question": "¿Por qué está terminantemente prohibido difundir a la prensa la identidad de víctimas de delitos contra la integridad sexual?",
            "options": [
                "Para evitar su revictimización y garantizar la protección de su intimidad y dignidad tuteladas por ley",
                "Porque los periodistas deben pagar un arancel administrativo previo a la oficina de prensa de la jefatura",
                "Porque la ley presume que la víctima cometió una falta contravencional por transitar en horario nocturno",
                "Para que los vecinos del barrio no se enteren de que ocurrió un hecho delictivo en la cuadra"
            ],
            "correctIndex": 0,
            "source": "Código Penal Art. 119 / Ley 26.485 de Protección Integral a las Mujeres",
            "explanation": "La revelación de la identidad de víctimas vulnerables viola derechos personalísimos reconocidos en pactos internacionales y leyes de protección integral."
        },
        {
            "id": "sc-f04",
            "difficulty": "facil",
            "question": "¿Qué es un 'Sector de Cuadrícula' en el despliegue del patrullaje urbano preventivo?",
            "options": [
                "Una delimitación geográfica específica asignada a un móvil policial con patrullaje permanente y tiempos de respuesta controlados",
                "El patio interior de la comisaría donde forman los efectivos para el izamiento del pabellón nacional",
                "El espacio reservado en la vereda de la seccional para el estacionamiento de móviles averiados en reparación",
                "La celda de aislamiento donde se ubica a los contraventores que presentan estado de ebriedad manifiesta"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Gestión Operativa y Cuadrículas",
            "explanation": "El sistema por cuadrículas divide el territorio en áreas operacionales con patrullero y tripulación fija para reducir tiempos y generar cercanía vecinal."
        },
        {
            "id": "sc-f05",
            "difficulty": "facil",
            "question": "En el marco del Decreto 461/15, ¿quién instruye un sumario administrativo de prevención ante una falta grave en una comisaría?",
            "options": [
                "El Oficial Instructor designado con jerarquía superior o más antiguo que el personal investigado",
                "El delegado del gremio policial con mayor cantidad de años de aportes jubilatorios en la caja de previsión",
                "El empleado administrativo encargado de la mesa de entradas del Ministerio de Economía de la Provincia",
                "Cualquier oficial subalterno que se postule voluntariamente para investigar a sus propios jefes directos"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15 - Procedimiento Sumarial Policial",
            "explanation": "El instructor sumariante debe tener jerarquía superior o mayor antigüedad que el imputado para garantizar la imparcialidad y la autoridad disciplinaria."
        },
        {
            "id": "sc-f06",
            "difficulty": "facil",
            "question": "¿Cuál es la función del libro de 'Registro de Servicios Adicionales' (SPA / OSESP) en una dependencia policial?",
            "options": [
                "Asentar con precisión las horas cumplidas, el personal asignado, el objetivo contratante y los montos liquidados",
                "Registrar las recetas médicas y constancias de licencia por enfermedad de corta duración del personal policial",
                "Anotar los antecedentes penales de las personas que concurren a renovar su certificado de buena conducta",
                "Llevar el control del mantenimiento mecánico y cambio de neumáticos de los móviles de la división logística"
            ],
            "correctIndex": 0,
            "source": "Decreto 0075/25 y Reglamentación de Servicios de Policía Adicional",
            "explanation": "El libro de SPA es un documento contable auditado que certifica los servicios extraordinarios prestados a entidades públicas y privadas."
        },
        {
            "id": "sc-f07",
            "difficulty": "facil",
            "question": "¿Qué principio debe regir la distribución de combustible para los patrulleros en una zona de inspección policial?",
            "options": [
                "Eficiencia, control de kilometraje recorrido y afectación estricta a tareas de prevención activa",
                "Reparto discrecional según el grado jerárquico del chofer asignado a la conducción del móvil",
                "Asignación exclusiva para los móviles que presten servicios de custodia de edificios gubernamentales",
                "Uso libre por parte del personal para sus traslados de fin de semana hacia sus domicilios particulares"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Administración Logística y Recursos Policiales",
            "explanation": "El combustible es recurso público crítico y debe auditarse contra kilómetros patrullados y cuadrículas recorridas según el GPS institucional."
        },
        {
            "id": "sc-f08",
            "difficulty": "facil",
            "question": "¿Qué información NUNCA debe ser revelada en una conferencia de prensa por parte de una autoridad policial?",
            "options": [
                "Técnicas encubiertas de investigación, identidades protegidas de testigos y detalles de operaciones en curso",
                "El número telefónico de emergencias 911 ni la dirección de las comisarías de la ciudad de Santa Fe",
                "El nombre del Ministro de Justicia y Seguridad ni el cargo institucional del Jefe de Policía de Provincia",
                "Las recomendaciones generales de prevención de estafas virtuales destinadas a la comunidad de adultos mayores"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Protocolo de Prensa Institucional",
            "explanation": "Revelar técnicas especiales o identidades de testigos frustra causas judiciales y pone en peligro inminente la vida de los intervinientes."
        },
        {
            "id": "sc-f09",
            "difficulty": "facil",
            "question": "¿Cuál es la naturaleza jurídica de los 'Decretos Salariales' del Poder Ejecutivo para la policía de Santa Fe?",
            "options": [
                "Normas administrativas de rango reglamentario que fijan las escalas de haberes, suplementos y coeficientes jerárquicos",
                "Leyes nacionales sancionadas por el Congreso de la Nación que rigen exclusivamente para las fuerzas armadas",
                "Acuerdos verbales entre los jefes de unidades regionales y las empresas privadas contratantes de adicionales",
                "Sentencias judiciales dictadas por los tribunales laborales en el marco de juicios colectivos de trabajo"
            ],
            "correctIndex": 0,
            "source": "Constitución de Santa Fe / Ley 12.521 - Régimen de Haberes",
            "explanation": "Las escalas de sueldos y suplementos policiales emanan del Gobernador mediante decretos (ej. Dec. 0411, Dec. 0142) en ejercicio de sus potestades de administración."
        },
        {
            "id": "sc-f10",
            "difficulty": "facil",
            "question": "En la resolución de conflictos comunitarios en una seccional, ¿cuál es el rol del Jefe de Comisaría?",
            "options": [
                "Promover la mediación pacífica en controversias vecinales menores que no constituyan delitos de acción pública",
                "Aplicar multas en dinero en efectivo exigiendo el pago inmediato en la oficina de guardia de la seccional",
                "Ordenar el desalojo por la fuerza de viviendas familiares sin necesidad de contar con mandamiento judicial alguno",
                "Designar a los abogados defensores particulares que deberán representar a los vecinos involucrados en el pleito"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Policía Comunitaria y Resolución Alternativa de Conflictos",
            "explanation": "El comisario debe facilitar el diálogo en problemas de vecindad para evitar que escalen a violencia armada, derivando a mediación penal cuando corresponda."
        },
        {
            "id": "sc-f11",
            "difficulty": "facil",
            "question": "¿Quién tiene la custodia legal del armamento secuestrado en una causa criminal radicada en la comisaría?",
            "options": [
                "El titular de la dependencia policial bajo estricta cadena de custodia hasta su remisión a la Sección Balística o depósito judicial",
                "El primer preventor que efectuó el secuestro para que la utilice como arma secundaria en sus turnos de servicio",
                "El presidente de la cooperadora policial para su exhibición en el museo institucional de la unidad regional",
                "Los testigos de actuación quienes deben conservarla en su domicilio particular hasta la fecha del juicio oral"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Custodia de Efectos Judiciales y Armas",
            "explanation": "El titular de la comisaría responde funcionalmente por el depósito de efectos y armas secuestradas hasta su traslado seguro al MPA o ANMaC."
        },
        {
            "id": "sc-m01",
            "difficulty": "media",
            "question": "¿Qué establece la directiva ministerial respecto a las declaraciones 'Off The Record' brindadas por jefes policiales a la prensa?",
            "options": [
                "Están expresamente desaconsejadas y prohibidas; toda comunicación institucional debe ser formal, transparente y documentada",
                "Son el medio principal recomendado para difundir sospechas sobre funcionarios judiciales de manera anónima",
                "Están permitidas siempre que el periodista entregue una suma de dinero en concepto de pauta publicitaria a la comisaría",
                "Solo pueden formularse los días domingos y feriados nacionales cuando no haya actividad judicial ordinaria"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Comunicación y Vocería Oficial Policial",
            "explanation": "El 'off the record' genera trascendidos no verificados y filtraciones; la doctrina ISEP exige vocería transparente y responsable ante los medios."
        },
        {
            "id": "sc-m02",
            "difficulty": "media",
            "question": "En la gestión de cuadrículas urbanas, ¿qué indicador se utiliza para evaluar la eficacia operativa del patrullaje preventivo?",
            "options": [
                "El tiempo promedio de respuesta desde el despacho del 911 hasta el arribo del móvil y la tasa de prevención delictiva",
                "La cantidad de combustible que sobró en el tanque de los patrulleros al finalizar el turno de guardia de 24 horas",
                "El número de actas de contravención labradas por desaliño en el uniforme a los subalternos de la guardia",
                "La cantidad de entrevistas que el jefe de seccional otorgó a los canales de televisión locales en la semana"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Control de Gestión Operativa",
            "explanation": "El tiempo de arribo del móvil tras el llamado al 911 y la reducción del delito en la cuadrícula son los indicadores clave de desempeño (KPIs)."
        },
        {
            "id": "sc-m03",
            "difficulty": "media",
            "question": "Conforme al Decreto 461/15, ¿cuál es el plazo que tiene el oficial sumariado para presentar su 'Alegato de Defensa'?",
            "options": [
                "5 días hábiles contados a partir de la notificación formal de la clausura de la etapa instructoria del sumario",
                "24 horas corridas desde el momento en que se cometió el hecho que motivó el inicio de la investigación",
                "30 días corridos prorrogables indefinidamente a solicitud verbal del sindicato de empleados públicos",
                "El personal sumariado no tiene derecho a presentar alegatos de defensa en el régimen disciplinario policial"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Art. 68: Derecho de Defensa y Alegatos",
            "explanation": "Garantizando el debido proceso administrativo, el imputado cuenta con 5 días hábiles para examinar las actuaciones y formular su alegato."
        },
        {
            "id": "sc-m04",
            "difficulty": "media",
            "question": "¿Qué procedimiento debe seguirse si un servicio de policía adicional (SPA) no es abonado en término por la empresa contratante privada?",
            "options": [
                "Suspender la cobertura previa intimación legal y gestionar el cobro por vía ejecutiva judicial a través del área de Asuntos Jurídicos",
                "Descontar el monto adeudado directamente del sueldo de los policías que cumplieron la guardia en ese objetivo",
                "Ordenar el allanamiento del domicilio del gerente de la empresa utilizando la patrulla de prevención de la comisaría",
                "Condonar la deuda a cambio de que la empresa done pintura y artículos de limpieza para la oficina de guardia"
            ],
            "correctIndex": 0,
            "source": "Decreto 0075/25 - Régimen de Servicios de Policía Adicional",
            "explanation": "El no pago motiva la rescisión del servicio e intimación formal de cobro judicial por el área letrada del Ministerio, protegiendo el crédito estatal."
        },
        {
            "id": "sc-m05",
            "difficulty": "media",
            "question": "En la supervisión de un procedimiento con armas letales, ¿cuándo cesa inmediatamente la autorización para efectuar disparos?",
            "options": [
                "En el instante exacto en que la agresión armada ilegítima ha cesado o el agresor se encuentra neutralizado o en fuga desarmada",
                "Cuando el personal policial se queda sin municiones de dotación en su cargador de reserva reglamentario",
                "Únicamente cuando el Fiscal del MPA arriba físicamente a la esquina donde se produce el tiroteo",
                "Cuando el superior a cargo del operativo emita un silbatazo largo según el código de señales de orden público"
            ],
            "correctIndex": 0,
            "source": "Manual MIRAF / Principios Básicos de la ONU sobre el Uso de Armas de Fuego",
            "explanation": "El principio de proporcionalidad y necesidad exige interrumpir el fuego en cuanto cesa la amenaza; disparar por la espalda a un fugitivo desarmado es ilícito."
        },
        {
            "id": "sc-m06",
            "difficulty": "media",
            "question": "¿Cuál es la responsabilidad del Comisario ante una denuncia de 'Apremios Ilegales' formulada contra personal bajo su mando?",
            "options": [
                "Comunicar inmediatamente el hecho a la Fiscalía de Violencia Institucional del MPA y a la Dirección Provincial de Asuntos Internos",
                "Reunir a los oficiales denunciados para coordinar una versión común que niegue formalmente las acusaciones",
                "Encerrar al denunciante en un calabozo de aislamiento hasta que acepte retirar la denuncia formulada en sede policial",
                "Archivar la actuación en la seccional para salvaguardar el prestigio institucional de la comisaría de distrito"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 / Protocolo de Actuación ante Denuncias de Violencia Institucional",
            "explanation": "El encubrimiento de apremios es delito autónomo; el jefe debe denunciar de inmediato al MPA (Unidad de Violencia Institucional) y a Asuntos Internos."
        },
        {
            "id": "sc-m07",
            "difficulty": "media",
            "question": "¿Cómo se clasifican las faltas disciplinarias cometidas por personal policial en 'Acto de Servicio' respecto a las cometidas fuera de servicio?",
            "options": [
                "La comisión en acto de servicio o vistiendo uniforme policial constituye una circunstancia agravante de la falta disciplinaria",
                "Las faltas cometidas en servicio no son sancionables porque se presumen realizadas en cumplimiento del deber funcional",
                "Tienen exactamente la misma graduación sancionatoria sin importar si el efectivo se encontraba de guardia o de civil",
                "Las faltas cometidas fuera de servicio prescriben automáticamente a los treinta días de su ocurrencia material"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Art. 24: Agravantes de la Falta Disciplinaria",
            "explanation": "El uniforme, el servicio y el uso del armamento oficial agravan la falta disciplinaria por el mayor daño causado a la confianza comunitaria."
        },
        {
            "id": "sc-m08",
            "difficulty": "media",
            "question": "En la planificación de un operativo de desalojo judicial ordenado por el MPA, ¿cuál es el requisito operacional indispensable?",
            "options": [
                "Contar con mandamiento judicial escrito con límites catastrales precisos, ambulancia del 107 y presencia de asistentes de niñez si hay menores",
                "Ingresar a la propiedad de noche y sin previo aviso para sorprender a los ocupantes mientras duermen dentro de las casillas",
                "Efectuar disparos disuasivos de posta de goma contra las paredes exteriores antes de intimar la desocupación pacífica",
                "Reemplazar a los oficiales de justicia por personal de empresas de demolición privadas armadas con bastones"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Desalojos Judiciales de Santa Fe - ISEP 2026",
            "explanation": "El desalojo judicial exige mandamiento expreso, previo diálogo e intimación pacífica, ambulancia, y contención interdisciplinaria ante menores de edad."
        },
        {
            "id": "sc-m09",
            "difficulty": "media",
            "question": "¿Qué atribución posee el Jefe de Zona de Inspección sobre las comisarías bajo su órbita territorial?",
            "options": [
                "Inspeccionar periódicamente el estado de dependencias, libros de guardia, calidades del servicio de patrullaje y disciplina de tropas",
                "Sancionar con destitución directa a cualquier oficial sin necesidad de sustanciar sumario administrativo previo",
                "Fijar libremente el valor de las tarifas de los servicios adicionales cobrados a las empresas de la jurisdicción",
                "Modificar los límites de las circunscripciones judiciales fijados por las leyes de la Legislatura provincial"
            ],
            "correctIndex": 0,
            "source": "Reglamento Orgánico de Jefaturas de Zona de Inspección - Santa Fe",
            "explanation": "El Jefe de Zona supervisa la doctrina, disciplina, estado edilicio y operatividad de las comisarías y subcomisarías que integran su sector."
        },
        {
            "id": "sc-m10",
            "difficulty": "media",
            "question": "¿Por qué es nula una sanción disciplinaria aplicada sin haber intimado previamente al oficial a formular su descargo formal?",
            "options": [
                "Porque viola la garantía constitucional del Debido Proceso y el Derecho de Defensa en Juicio (Art. 18 de la Constitución Nacional)",
                "Porque la Ley de Personal Policial exige que toda sanción sea aprobada primero por el intendente de la ciudad cabecera",
                "Porque el oficial sancionado debe contar con un plazo de tres meses para ausentarse de la fuerza con goce de haberes",
                "Porque no existe ninguna norma escrita que regule las sanciones disciplinarias en el ámbito de la provincia de Santa Fe"
            ],
            "correctIndex": 0,
            "source": "Constitución Nacional Art. 18 / Decreto 461/15",
            "explanation": "El derecho a ser oído y formular descargo previo es irrenunciable; la sanción intempestiva sin audiencia previa es un acto nulo de nulidad absoluta."
        },
        {
            "id": "sc-m11",
            "difficulty": "media",
            "question": "En el marco de la preservación de la escena, ¿cuándo puede el Comisario permitir el acceso de los medios de prensa al lugar del hecho?",
            "options": [
                "Únicamente cuando los peritos forenses y el Fiscal hayan finalizado la totalidad de las tareas periciales y levantado el perímetro",
                "En cualquier momento siempre que los camarógrafos utilicen chalecos identificatorios de prensa de color anaranjado",
                "Inmediatamente después de arribar el primer patrullero para que los periodistas colaboren en la búsqueda de vainas servidas",
                "Cuando los familiares de la víctima presten su consentimiento verbal ante las cámaras de televisión en la vereda"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Protocolo de Relación con Medios en la Escena",
            "explanation": "La prensa debe aguardar fuera del perímetro externo de seguridad; el acceso al lugar del hecho está vedado hasta la total liberación por el fiscal."
        },
        {
            "id": "sc-d01",
            "difficulty": "dificil",
            "question": "En materia de responsabilidad civil del Estado por el accionar policial, ¿cuándo responde solidariamente el funcionario a título personal?",
            "options": [
                "Cuando actuó con dolo manifiesto, culpa grave o extralimitación abusiva de sus funciones legales reglamentarias",
                "En todos los casos en que se produzcan daños materiales derivados de persecuciones de patrulleros a delincuentes",
                "Nunca, ya que el Estado provincial absorbe la totalidad de las indemnizaciones patrimoniales sin derecho a repetición",
                "Únicamente si la víctima del delito cuenta con patrocinio letrado del Centro de Asistencia Judicial a la Víctima (CAJ)"
            ],
            "correctIndex": 0,
            "source": "Código Civil y Comercial de la Nación, Art. 1766 / Ley de Responsabilidad Estatal",
            "explanation": "El funcionario responde personalmente si obró con dolo o culpa grave; el Estado que indemniza a la víctima tiene la obligación de accionar por repetición contra el policía."
        },
        {
            "id": "sc-d02",
            "difficulty": "dificil",
            "question": "¿Cuál es el término de prescripción de la sanción disciplinaria de 'Destitución' según el régimen disciplinario de Santa Fe?",
            "options": [
                "3 años contados a partir del momento en que el acto administrativo de cesantía o exoneración quedó firme en vía ejecutiva",
                "6 meses corridos a partir del momento en que el oficial sumariado hizo abandono material de su puesto de servicio",
                "10 años improrrogables fijados por el Código Procesal Civil y Comercial de los Tribunales provinciales de alzada",
                "Las sanciones disciplinarias de destitución son imprescriptibles pudiendo ejecutarse en cualquier momento histórico"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15, Art. 52: Prescripción de las Sanciones",
            "explanation": "Una vez firme la destitución, la administración tiene 3 años para efectivizarla y registrarla, vencido el cual opera la prescripción de la sanción."
        },
        {
            "id": "sc-d03",
            "difficulty": "dificil",
            "question": "¿Qué establece la doctrina respecto al 'Uso Racional de la Fuerza' cuando el agresor ya ha sido reducido en el suelo y esposado?",
            "options": [
                "Cesa por completo toda autorización del uso de la fuerza física; cualquier golpe o maltrato posterior configura tortura o vejaciones (Art. 144 bis CP)",
                "Se autoriza a continuar aplicando golpes de bastón táctico para asegurar que el aprehendido no intente incorporarse",
                "El personal policial puede obligarlo a permanecer de pie descalzo sobre el pavimento caliente durante varias horas",
                "Es legal aplicarle descargas eléctricas de pistolas taser para que confiese la ubicación de las armas delictivas"
            ],
            "correctIndex": 0,
            "source": "Código Penal Art. 144 bis / Convención contra la Tortura de la ONU",
            "explanation": "Reducido el individuo, el uso de la fuerza debe cesar inmediatamente; continuar agrediéndolo constituye delito de vejaciones o torturas penado con prisión efectiva."
        },
        {
            "id": "sc-d04",
            "difficulty": "dificil",
            "question": "En el marco de la Ley 12.521, ¿qué situación de revista corresponde al oficial sometido a proceso penal con auto de prisión preventiva firme?",
            "options": [
                "Pase a Disponibilidad Pasiva con retención obligatoria del 50% de sus haberes mensuales de revista",
                "Pase a Retiro Efectivo con cobro del 100% de la jubilación móvil otorgada por la Caja de Previsión",
                "Ascenso extraordinario por estar afrontando un litigio derivado de su función de seguridad de calle",
                "Traslado provisorio a tareas no operativas en la Dirección de Administración y Finanzas de la Jefatura"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521, Arts. 50 y 51: Situación de Disponibilidad Pasiva",
            "explanation": "La prisión preventiva formal impone la disponibilidad pasiva con retención salarial hasta que se resuelva la situación procesal penal mediante sobreseimiento o condena."
        },
        {
            "id": "sc-d05",
            "difficulty": "dificil",
            "question": "¿Cuál es la obligación jurídica del Comisario ante una orden de servicio manifiestamente arbitraria que pone en riesgo cierto de muerte a sus subordinados sin equipo protector?",
            "options": [
                "Plantear formal objeción motivada por escrito requiriendo reconsideración, y no acatarla si implica la comisión flagrante de ilícitos",
                "Cumplirla ciegamente en todos sus términos manifestando que en el ámbito policial no existe ningún derecho a objetar directivas",
                "Abandonar la comisaría inmediatamente y pedir la baja voluntaria de la fuerza policial en la mesa de entradas",
                "Publicar la orden en un diario de circulación masiva para que la ciudadanía decida mediante votación popular"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521, Art. 15 / Código de Conducta de la ONU Art. 5",
            "explanation": "El deber de obediencia encuentra su límite en la ley y la preservación de la vida; las órdenes que configuren vejación o temeridad ilícita manifiesta deben objetarse formalmente."
        },
        {
            "id": "sc-d06",
            "difficulty": "dificil",
            "question": "En la liquidación de horas extraordinarias por Decreto 0075/25, ¿cuándo comienza a computarse el valor de la tarifa 'Extraordinaria' en días hábiles?",
            "options": [
                "A partir de las 22:00 horas del día hábil y hasta las 06:00 horas del día siguiente",
                "A partir de las 13:00 horas del día hábil coincidiendo con el cierre de la atención bancaria",
                "A partir de las 18:00 horas del día hábil en épocas de invierno y a las 20:00 horas en verano",
                "Durante las veinticuatro horas del día siempre que el servicio se preste en una entidad bancaria"
            ],
            "correctIndex": 0,
            "source": "Decreto 0075/25 - Régimen de Tarifas de Policía Adicional",
            "explanation": "En días hábiles la tarifa ordinaria rige de 06:00 a 22:00hs; desde las 22:00hs arranca la tarifa extraordinaria, y los sábados desde las 12:00hs."
        },
        {
            "id": "sc-d07",
            "difficulty": "dificil",
            "question": "¿Qué consecuencia acarrea la falta de rendición documentada de fondos de 'Caja Chica' por parte de un titular de comisaría?",
            "options": [
                "Juicio de cuentas ante el Tribunal de Cuentas provincial, sumario administrativo por retención indebida y suspensión de firmas",
                "Un simple descuento administrativo no remunerativo en la liquidación complementaria del medio aguinaldo",
                "La autorización automática para compensar el faltante con el cobro de comisiones a los comerciantes de la zona",
                "La elevación inmediata de la jerarquía del oficial para que asuma responsabilidades de mayor envergadura presupuestaria"
            ],
            "correctIndex": 0,
            "source": "Ley de Administración Financiera de Santa Fe / Reglamento del Tribunal de Cuentas",
            "explanation": "Los fondos de caja chica son caudales públicos con rendición perentoria; la omisión genera juicio de responsabilidad patrimonial y sumario disciplinario."
        },
        {
            "id": "sc-d08",
            "difficulty": "dificil",
            "question": "¿Cuál es la sanción administrativa para un oficial jefe que ejerce acoso laboral o violencia psicológica reiterada contra sus subalternos?",
            "options": [
                "Falta Gravísima tipificada en el régimen disciplinario sancionable con destitución y remoción del cargo funcional",
                "Un cambio de turno de guardia rotativo para que no coincida con los empleados que presentaron la queja",
                "La entrega de una felicitación en la foja de servicios por demostrar firmeza en la conducción del personal",
                "Una multa económica equivalente a dos días de servicio adicional deducible de su recibo de sueldo"
            ],
            "correctIndex": 0,
            "source": "Decreto 461/15 / Ley 12.521 y Ley 13.348",
            "explanation": "El acoso, maltrato degradante o abuso de autoridad vulnera la dignidad humana y el régimen de mando, constituyendo falta gravísima de destitución."
        },
        {
            "id": "sc-d09",
            "difficulty": "dificil",
            "question": "En el control de legalidad de un procedimiento con secuestro de armamento de guerra, ¿qué información debe cotejarse en forma inmediata con ANMaC?",
            "options": [
                "Estado registral, titularidad de dominio, existencia de pedido de secuestro activo y condición de legítimo usuario del portador",
                "El valor comercial de reventa del arma en las armerías habilitadas de la República Argentina",
                "La cantidad de armas de fuego que el fabricante exportó a países limítrofes en el último año calendario",
                "El número de teléfono particular del gerente de comercialización de la fábrica de armas de origen"
            ],
            "correctIndex": 0,
            "source": "Ley 20.429 / Protocolo ANMaC de Trazabilidad de Armas de Fuego",
            "explanation": "El cotejo con el Banco Nacional de Datos de ANMaC individualiza el origen lícito o ilícito del arma, robos previos y estado registral del legítimo usuario."
        },
        {
            "id": "sc-d10",
            "difficulty": "dificil",
            "question": "Conforme a la Ley 12.521, ¿qué efecto produce la 'Sanción de Suspensión de Empleo' mayor a 15 días en la carrera policial?",
            "options": [
                "Pérdida de la antigüedad por el lapso de la suspensión y postergación automática para el ascenso en los concursos ISEP",
                "El otorgamiento de vacaciones compensatorias acumuladas para gozarlas durante los meses de temporada baja",
                "La posibilidad de concursar directamente para el agrupamiento superior sin rendir los exámenes teóricos",
                "La exención del pago de los aportes jubilatorios de ley durante los tres años posteriores a la sanción"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 (Santa Fe), Arts. 62 y 63: Efectos de las Sanciones",
            "explanation": "Las suspensiones mayores a 15 días descuentan antigüedad computable, inhabilitan temporalmente para el ascenso y perjudican el orden de mérito de concurso."
        },
        {
            "id": "sc-d11",
            "difficulty": "dificil",
            "question": "¿Qué establece el protocolo respecto a la requisa íntima de cavidades corporales (rectal o vaginal)?",
            "options": [
                "Está terminantemente prohibida para el personal policial; solo puede realizarse por profesionales médicos en centro de salud bajo orden judicial",
                "Puede ser ejecutada en la oficina de guardia de la seccional por el oficial más antiguo en presencia de dos testigos",
                "Se encuentra autorizada en todos los casos de aprehensión de delincuentes que hayan participado en asaltos armados",
                "Puede llevarse a cabo por el sumariante utilizando guantes de látex estériles provistos por la división medicina legal"
            ],
            "correctIndex": 0,
            "source": "Jurisprudencia de la Corte Interamericana de Derechos Humanos / Manual ISEP",
            "explanation": "La inspección de cavidades es un acto médico invasivo; jamás puede realizarlo la policía bajo pena de cometer delito de abuso sexual agravado y vejaciones."
        },
        {
            "id": "sc-d12",
            "difficulty": "dificil",
            "question": "En materia de compras y contrataciones directas en la comisaría, ¿cuál es el límite fijado por la Ley de Administración Financiera provincial?",
            "options": [
                "No superar los montos topes fijados periódicamente para contratación directa menor, con tres presupuestos comparativos de proveedores",
                "El titular de la comisaría puede gastar sumas ilimitadas de dinero en efectivo sin presentar facturas fiscales electrónicas",
                "Se prohíbe realizar cualquier tipo de compra de insumos de librería debiendo solicitarse exclusivamente al Poder Judicial",
                "Las compras solo pueden efectuarse a empresas que pertenezcan a familiares directos de los oficiales superiores"
            ],
            "correctIndex": 0,
            "source": "Ley de Administración Financiera y Hacienda Pública de Santa Fe",
            "explanation": "La contratación directa menor exige no rebasar los topes reglamentarios, adjuntar cotizaciones cotejables y rendir facturas AFIP tipo B o C oficiales."
        },
        {
            "id": "isep-d26-026",
            "difficulty": "facil",
            "question": "El uso de la fuerza en crisis subjetiva se considera:",
            "options": [
                "Recurso extremo",
                "Medida preventiva",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes",
                "Solo puede ser resuelto por el Jefe de la Unidad Regional respectiva"
            ],
            "correctIndex": 0,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Recurso extremo\"."
        },
        {
            "id": "isep-d26-046",
            "difficulty": "facil",
            "question": "La Carta Iberoamericana propone un enfoque que va más allá de:",
            "options": [
                "La formación profesional",
                "La evaluación institucional",
                "La sanción de actos ilícitos",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"La sanción de actos ilícitos\"."
        },
        {
            "id": "isep-d26-047",
            "difficulty": "facil",
            "question": "¿En qué se basa el sistema de integridad que promueve la Carta?",
            "options": [
                "En el castigo disciplinario",
                "En el control jerárquico",
                "En el comportamiento honesto de los servidores públicos",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"En el comportamiento honesto de los servidores públicos\"."
        },
        {
            "id": "isep-d26-058",
            "difficulty": "dificil",
            "question": "Según el Art. 10 bis de la Ley Orgánica de la Policía, la regla general respecto a la libertad corporal es que:",
            "options": [
                "El personal policial puede detener libremente",
                "Puede restringirse la libertad por sospecha",
                "No podrá detener o restringir sin orden de autoridad competente",
                "Depende orgánicamente de la Secretaría General de la Gobernación"
            ],
            "correctIndex": 2,
            "source": "Ley Orgánica Policial de Santa Fe (Decreto-Ley 12.333/62)",
            "explanation": "El Decreto-Ley 12.333/62 organiza la estructura institucional, la Plana Mayor Policial y las funciones de comando superior. La opción correcta conforme a la normativa oficial es: \"No podrá detener o restringir sin orden de autoridad competente\"."
        },
        {
            "id": "isep-d26-069",
            "difficulty": "media",
            "question": "El acta de demora debe contener:",
            "options": [
                "Solo la identificación del personal",
                "Causa, fecha y hora de la medida",
                "Opinión del funcionario",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Causa, fecha y hora de la medida\"."
        },
        {
            "id": "isep-d26-074",
            "difficulty": "media",
            "question": "La orientación de la entrevista policial debe:",
            "options": [
                "Ser siempre la misma sin importar el delito",
                "Adaptarse al tipo de delito investigado",
                "Basarse únicamente en la declaración del imputado",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Adaptarse al tipo de delito investigado\"."
        },
        {
            "id": "isep-d26-094",
            "difficulty": "facil",
            "question": "Durante los servicios de prevención y persecución, el personal policial debe mantener:",
            "options": [
                "Solo correcta uniformidad",
                "Alto nivel de atención, actitud vigilante y correcta uniformidad",
                "Actitud reactiva ante los hechos",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Alto nivel de atención, actitud vigilante y correcta uniformidad\"."
        },
        {
            "id": "isep-d26-099",
            "difficulty": "dificil",
            "question": "Según el artículo 61 de la Ley 24.449, los vehículos de emergencia pueden:",
            "options": [
                "Incumplir normas de tránsito sin restricciones",
                "No respetar normas solo si es imprescindible y no genera un mal mayor",
                "Circular sin balizas ni sirenas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"No respetar normas solo si es imprescindible y no genera un mal mayor\"."
        },
        {
            "id": "isep-d26-104",
            "difficulty": "facil",
            "question": "Según la Regla de Tueller, cuando la distancia lo permite, el personal policial debe priorizar:",
            "options": [
                "El uso inmediato del arma de fuego",
                "La huida del lugar",
                "Medios menos letales como aerosol de pimienta o Taser",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Medios menos letales como aerosol de pimienta o Taser\"."
        },
        {
            "id": "isep-d26-109",
            "difficulty": "facil",
            "question": "Los demás usuarios de la vía pública, ante un vehículo de emergencia, deben:",
            "options": [
                "Seguirlo para aprovechar la prioridad.",
                "Facilitar su paso y no seguirlo.",
                "Mantener su carril y velocidad.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Facilitar su paso y no seguirlo.\"."
        },
        {
            "id": "isep-d26-124",
            "difficulty": "facil",
            "question": "La Ley Nacional 26.052 establece:",
            "options": [
                "La eliminación de la competencia federal.",
                "La competencia exclusiva de las provincias.",
                "La competencia concurrente entre Nación y provincias.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"La competencia concurrente entre Nación y provincias.\"."
        },
        {
            "id": "isep-d26-149",
            "difficulty": "facil",
            "question": "Se considera \"lugar del hecho\" a:",
            "options": [
                "Únicamente el sitio donde se produjo el resultado delictivo.",
                "El espacio físico donde fue detenido el autor.",
                "Todo espacio físico vinculado al hecho susceptible de investigación penal.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Todo espacio físico vinculado al hecho susceptible de investigación penal.\"."
        },
        {
            "id": "isep-d26-154",
            "difficulty": "facil",
            "question": "El lugar del hecho \"mixto\" se define como:",
            "options": [
                "Un sitio sin protección ambiental.",
                "Una combinación de espacio abierto y cerrado.",
                "Un espacio trasladable.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Una combinación de espacio abierto y cerrado.\"."
        },
        {
            "id": "isep-d26-159",
            "difficulty": "facil",
            "question": "¿Cuál de los siguientes NO es un tipo de indicio?",
            "options": [
                "Biológico.",
                "Informático.",
                "Documental judicial.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Documental judicial.\"."
        },
        {
            "id": "isep-d26-164",
            "difficulty": "facil",
            "question": "La evidencia es:",
            "options": [
                "Todo indicio observado en el lugar.",
                "El indicio confirmado mediante análisis científico o técnico.",
                "La prueba producida en juicio.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El indicio confirmado mediante análisis científico o técnico.\"."
        },
        {
            "id": "isep-d26-169",
            "difficulty": "media",
            "question": "¿Cuál es la prioridad del funcionario policial al arribar al lugar del hecho?",
            "options": [
                "Comenzar la investigación inmediatamente",
                "Identificar al imputado",
                "Preservar la escena del delito",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Preservar la escena del delito\"."
        },
        {
            "id": "isep-d26-174",
            "difficulty": "media",
            "question": "¿Cuál es la regla fundamental en la escena del delito?",
            "options": [
                "Todo lo que se secuestra se analiza",
                "Todo lo que se observa, se dibuja y se describe",
                "Todo lo que se fotografía no se escribe",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Todo lo que se observa, se dibuja y se describe\"."
        },
        {
            "id": "isep-d26-179",
            "difficulty": "media",
            "question": "¿Cuál de las siguientes características corresponde al croquis?",
            "options": [
                "Escala fija y proporciones exactas",
                "Dibujo complejo y técnico",
                "Sin escala técnica y con leyendas aclaratorias",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Sin escala técnica y con leyendas aclaratorias\"."
        },
        {
            "id": "isep-d26-184",
            "difficulty": "facil",
            "question": "¿Cuál es la diferencia correcta entre croquis y plano?",
            "options": [
                "Ambos usan escala técnica",
                "El croquis es técnico y el plano no",
                "El croquis es esquemático y el plano técnico",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El croquis es esquemático y el plano técnico\"."
        },
        {
            "id": "isep-d26-185",
            "difficulty": "facil",
            "question": "¿Qué consecuencia puede generar un error en la primera intervención?",
            "options": [
                "Ninguna si hay confesión",
                "Solo una sanción administrativa",
                "La invalidez de la prueba",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"La invalidez de la prueba\"."
        },
        {
            "id": "isep-d26-199",
            "difficulty": "facil",
            "question": "La Zona Interior Crítica se caracteriza por:",
            "options": [
                "Ser el sector de prensa autorizado",
                "Ser un área de circulación libre",
                "Contener elementos, rastros e indicios del hecho",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Contener elementos, rastros e indicios del hecho\"."
        },
        {
            "id": "isep-d26-203",
            "difficulty": "facil",
            "question": "La Zona Exterior Restringida permite circulación únicamente a:",
            "options": [
                "Vecinos",
                "Periodistas",
                "Especialistas, personal policial de apoyo y funcionarios judiciales",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Especialistas, personal policial de apoyo y funcionarios judiciales\"."
        },
        {
            "id": "isep-d26-204",
            "difficulty": "facil",
            "question": "La Zona Exterior Amplia tiene como función principal:",
            "options": [
                "Realizar pericias",
                "Custodiar evidencia",
                "Impedir ingreso de curiosos y prensa",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Impedir ingreso de curiosos y prensa\"."
        },
        {
            "id": "isep-d26-205",
            "difficulty": "facil",
            "question": "Para delimitar la Zona Exterior Amplia se utiliza:",
            "options": [
                "Señalización vial",
                "Conos de tránsito únicamente",
                "Cinta perimetral y personal policial",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Cinta perimetral y personal policial\"."
        },
        {
            "id": "isep-d26-214",
            "difficulty": "facil",
            "question": "El primer interventor no debe:",
            "options": [
                "Preservar el lugar",
                "Comunicar a la autoridad judicial",
                "Asumir rol de perito si no corresponde",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Asumir rol de perito si no corresponde\"."
        },
        {
            "id": "isep-d26-234",
            "difficulty": "facil",
            "question": "Toda muestra biológica debe contener en su rótulo:",
            "options": [
                "Solo nombre del médico",
                "Solo número de causa",
                "Datos personales, fecha, hora y lugar",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Datos personales, fecha, hora y lugar\"."
        },
        {
            "id": "isep-d26-239",
            "difficulty": "media",
            "question": "La IPP tiene como objetivo:",
            "options": [
                "Dictar sentencia",
                "Determinar existencia del delito y reunir pruebas",
                "Ejecutar la pena",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Determinar existencia del delito y reunir pruebas\"."
        },
        {
            "id": "isep-d26-244",
            "difficulty": "facil",
            "question": "Los ascensos del personal policial se rigen por el principio constitucional de:",
            "options": [
                "Igualdad",
                "Legalidad",
                "Idoneidad",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Idoneidad\"."
        },
        {
            "id": "isep-d26-245",
            "difficulty": "facil",
            "question": "Los ascensos se producen mediante:",
            "options": [
                "Resolución ministerial",
                "Decreto del Poder Ejecutivo",
                "Disposición del Jefe de Policía",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Decreto del Poder Ejecutivo\"."
        },
        {
            "id": "isep-d26-246",
            "difficulty": "facil",
            "question": "Según la Ley Provincial 12.521, los ascensos son:",
            "options": [
                "Directos",
                "Por antigüedad automática",
                "Grado a grado",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Grado a grado\"."
        },
        {
            "id": "isep-d26-247",
            "difficulty": "facil",
            "question": "El sistema de ascensos ordinarios es:",
            "options": [
                "Designación directa",
                "Concurso público de antecedentes y oposición",
                "Evaluación interna reservada",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Concurso público de antecedentes y oposición\"."
        },
        {
            "id": "isep-d26-249",
            "difficulty": "facil",
            "question": "Los ascensos extraordinarios se otorgan cuando existe:",
            "options": [
                "Antigüedad superior a 20 años",
                "Acto administrativo favorable",
                "Acto de arrojo con grave y real riesgo en cumplimiento del deber",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Acto de arrojo con grave y real riesgo en cumplimiento del deber\"."
        },
        {
            "id": "isep-d26-250",
            "difficulty": "facil",
            "question": "Los ascensos post mortem se conceden cuando:",
            "options": [
                "El agente está jubilado",
                "El agente fallece en acto heroico en cumplimiento del deber",
                "El agente tiene sumario pendiente",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"El agente fallece en acto heroico en cumplimiento del deber\"."
        },
        {
            "id": "isep-d26-251",
            "difficulty": "dificil",
            "question": "Los ascensos extraordinarios:",
            "options": [
                "Están sujetos a todas las inhabilidades del Art. 78",
                "No están sujetos a los requisitos generales de ascensos ordinarios",
                "Se otorgan automáticamente",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"No están sujetos a los requisitos generales de ascensos ordinarios\"."
        },
        {
            "id": "isep-d26-254",
            "difficulty": "facil",
            "question": "Puede participar del concurso quien:",
            "options": [
                "Tenga cualquier jerarquía",
                "Sea de la jerarquía inmediata anterior",
                "Sea recomendado por un superior",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Sea de la jerarquía inmediata anterior\"."
        },
        {
            "id": "isep-d26-255",
            "difficulty": "facil",
            "question": "La aptitud psicofísica:",
            "options": [
                "Es opcional",
                "Se acredita mediante exámenes obligatorios",
                "Solo se evalúa en ascensos extraordinarios",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Se acredita mediante exámenes obligatorios\"."
        },
        {
            "id": "isep-d26-258",
            "difficulty": "dificil",
            "question": "El recurso contra la declaración de inhabilitación debe interponerse dentro de:",
            "options": [
                "24 horas",
                "3 días hábiles",
                "5 días hábiles",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"3 días hábiles\"."
        },
        {
            "id": "isep-d26-259",
            "difficulty": "facil",
            "question": "El personal bajo sumario administrativo:",
            "options": [
                "No puede participar nunca",
                "Puede participar pero el ascenso queda en suspenso",
                "Asciende automáticamente",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Puede participar pero el ascenso queda en suspenso\"."
        },
        {
            "id": "isep-d26-261",
            "difficulty": "facil",
            "question": "El ascenso se perfecciona cuando:",
            "options": [
                "Lo aprueba el jurado",
                "Se dicta el acto administrativo correspondiente",
                "Finaliza el concurso",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Se dicta el acto administrativo correspondiente\"."
        },
        {
            "id": "isep-d26-262",
            "difficulty": "facil",
            "question": "La Ley Orgánica Policial de la Provincia de Santa Fe es el:",
            "options": [
                "Decreto 461/15",
                "Decreto Ley 12.333/1962",
                "Ley 12.521/2005",
                "Depende orgánicamente de la Secretaría General de la Gobernación"
            ],
            "correctIndex": 1,
            "source": "Ley Orgánica Policial de Santa Fe (Decreto-Ley 12.333/62)",
            "explanation": "El Decreto-Ley 12.333/62 organiza la estructura institucional, la Plana Mayor Policial y las funciones de comando superior. La opción correcta conforme a la normativa oficial es: \"Decreto Ley 12.333/1962\"."
        },
        {
            "id": "isep-d26-263",
            "difficulty": "facil",
            "question": "La Ley Orgánica Policial fue dictada en el año:",
            "options": [
                "1958",
                "1962",
                "1975",
                "Depende orgánicamente de la Secretaría General de la Gobernación"
            ],
            "correctIndex": 1,
            "source": "Ley Orgánica Policial de Santa Fe (Decreto-Ley 12.333/62)",
            "explanation": "El Decreto-Ley 12.333/62 organiza la estructura institucional, la Plana Mayor Policial y las funciones de comando superior. La opción correcta conforme a la normativa oficial es: \"1962\"."
        },
        {
            "id": "isep-d26-272",
            "difficulty": "facil",
            "question": "La Plana Mayor Policial es el organismo de:",
            "options": [
                "Detención",
                "Planeamiento, coordinación y control",
                "Juzgamiento",
                "Depende orgánicamente de la Secretaría General de la Gobernación"
            ],
            "correctIndex": 1,
            "source": "Ley Orgánica Policial de Santa Fe (Decreto-Ley 12.333/62)",
            "explanation": "El Decreto-Ley 12.333/62 organiza la estructura institucional, la Plana Mayor Policial y las funciones de comando superior. La opción correcta conforme a la normativa oficial es: \"Planeamiento, coordinación y control\"."
        },
        {
            "id": "isep-d26-273",
            "difficulty": "facil",
            "question": "La Plana Mayor Policial está integrada por:",
            "options": [
                "3 departamentos",
                "4 departamentos",
                "5 departamentos",
                "Depende orgánicamente de la Secretaría General de la Gobernación"
            ],
            "correctIndex": 2,
            "source": "Ley Orgánica Policial de Santa Fe (Decreto-Ley 12.333/62)",
            "explanation": "El Decreto-Ley 12.333/62 organiza la estructura institucional, la Plana Mayor Policial y las funciones de comando superior. La opción correcta conforme a la normativa oficial es: \"5 departamentos\"."
        },
        {
            "id": "isep-d26-274",
            "difficulty": "facil",
            "question": "El Departamento Personal es:",
            "options": [
                "1",
                "2",
                "3",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"1\"."
        },
        {
            "id": "isep-d26-279",
            "difficulty": "facil",
            "question": "El Departamento Personal se encarga de:",
            "options": [
                "Inteligencia",
                "Recursos humanos",
                "Operativos",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Recursos humanos\"."
        },
        {
            "id": "isep-d26-281",
            "difficulty": "facil",
            "question": "El Departamento Operaciones se encarga de:",
            "options": [
                "Inteligencia",
                "Recursos humanos",
                "Operativos policiales",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Operativos policiales\"."
        },
        {
            "id": "isep-d26-283",
            "difficulty": "facil",
            "question": "El Departamento Judicial se encarga de:",
            "options": [
                "Recursos humanos",
                "Operativos",
                "Pericias y antecedentes",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Pericias y antecedentes\"."
        },
        {
            "id": "isep-d26-285",
            "difficulty": "facil",
            "question": "La unidad básica policial es:",
            "options": [
                "Unidad Regional",
                "Comisaría",
                "Ministerio",
                "Depende orgánicamente de la Secretaría General de la Gobernación"
            ],
            "correctIndex": 1,
            "source": "Ley Orgánica Policial de Santa Fe (Decreto-Ley 12.333/62)",
            "explanation": "El Decreto-Ley 12.333/62 organiza la estructura institucional, la Plana Mayor Policial y las funciones de comando superior. La opción correcta conforme a la normativa oficial es: \"Comisaría\"."
        },
        {
            "id": "isep-d26-286",
            "difficulty": "facil",
            "question": "Una Unidad Regional es una unidad:",
            "options": [
                "Simple",
                "Judicial",
                "Compuesta",
                "Depende orgánicamente de la Secretaría General de la Gobernación"
            ],
            "correctIndex": 2,
            "source": "Ley Orgánica Policial de Santa Fe (Decreto-Ley 12.333/62)",
            "explanation": "El Decreto-Ley 12.333/62 organiza la estructura institucional, la Plana Mayor Policial y las funciones de comando superior. La opción correcta conforme a la normativa oficial es: \"Compuesta\"."
        },
        {
            "id": "isep-d26-287",
            "difficulty": "dificil",
            "question": "El artículo 1 establece:",
            "options": [
                "Régimen disciplinario",
                "Función policial",
                "Ascensos",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Función policial\"."
        },
        {
            "id": "isep-d26-288",
            "difficulty": "dificil",
            "question": "El artículo 4 establece:",
            "options": [
                "Régimen disciplinario",
                "Centralización administrativa",
                "Ascensos",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Centralización administrativa\"."
        },
        {
            "id": "isep-d26-289",
            "difficulty": "dificil",
            "question": "El artículo 27 establece:",
            "options": [
                "Función policial",
                "Conducción del Jefe de Policía",
                "Régimen disciplinario",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Conducción del Jefe de Policía\"."
        },
        {
            "id": "isep-d26-290",
            "difficulty": "dificil",
            "question": "El artículo 54 establece:",
            "options": [
                "Organización funcional",
                "Régimen disciplinario",
                "Sanciones",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 0,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Organización funcional\"."
        },
        {
            "id": "isep-d26-294",
            "difficulty": "facil",
            "question": "Se presume legítima defensa cuando:",
            "options": [
                "El agresor huye",
                "Se rechaza de noche el ingreso por escalamiento o fractura al hogar",
                "Hay discusión verbal",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se rechaza de noche el ingreso por escalamiento o fractura al hogar\"."
        },
        {
            "id": "isep-d26-295",
            "difficulty": "facil",
            "question": "El uso del arma de fuego debe considerarse:",
            "options": [
                "Primera opción",
                "Segunda opción",
                "Último recurso ante peligro inminente de muerte o lesión grave",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Último recurso ante peligro inminente de muerte o lesión grave\"."
        },
        {
            "id": "isep-d26-299",
            "difficulty": "facil",
            "question": "En el modelo de \"Niveles de Respuesta\", el Nivel 1 es:",
            "options": [
                "Control físico",
                "Uso de arma química",
                "Presencia policial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Presencia policial\"."
        },
        {
            "id": "isep-d26-304",
            "difficulty": "facil",
            "question": "La represión debe ser:",
            "options": [
                "Inmediata y violenta",
                "Preventiva",
                "Justa, medida y oportuna",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Justa, medida y oportuna\"."
        },
        {
            "id": "isep-d26-309",
            "difficulty": "facil",
            "question": "Todo incidente de uso de la fuerza debe:",
            "options": [
                "Archivarse",
                "Comunicarse solo si hay heridos",
                "Notificarse a los funcionarios superiores para su examen",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Notificarse a los funcionarios superiores para su examen\"."
        },
        {
            "id": "isep-d26-311",
            "difficulty": "facil",
            "question": "El funcionario que se niega a cumplir una orden ilícita:",
            "options": [
                "Puede ser sancionado",
                "Debe cumplirla igualmente",
                "No será objeto de sanción penal ni disciplinaria",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"No será objeto de sanción penal ni disciplinaria\"."
        },
        {
            "id": "isep-d26-314",
            "difficulty": "facil",
            "question": "El uso letal intencional de armas de fuego solo es admisible cuando:",
            "options": [
                "Hay resistencia pasiva",
                "Hay fuga simple",
                "Sea estrictamente inevitable para proteger una vida humana",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Sea estrictamente inevitable para proteger una vida humana\"."
        },
        {
            "id": "isep-d26-324",
            "difficulty": "facil",
            "question": "La capacitación en uso de la fuerza debe:",
            "options": [
                "Realizarse solo al ingreso",
                "Ser opcional",
                "Ser continua e incluir fundamentos legales y éticos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Ser continua e incluir fundamentos legales y éticos\"."
        },
        {
            "id": "isep-d26-329",
            "difficulty": "dificil",
            "question": "Según el Artículo 1°, el objeto del Protocolo es:",
            "options": [
                "Regular exclusivamente el uso de armas letales.",
                "Establecer sanciones disciplinarias.",
                "Establecer principios y directrices para el uso progresivo de la fuerza garantizando legalidad, proporcionalidad y respeto a los derechos humanos.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Establecer principios y directrices para el uso progresivo de la fuerza garantizando legalidad, proporcionalidad y respeto a los derechos humanos.\"."
        },
        {
            "id": "isep-d26-334",
            "difficulty": "dificil",
            "question": "Según el Artículo 4°, cuando la persona cumple indicaciones sin resistencia estamos ante:",
            "options": [
                "Resistencia activa.",
                "Ataque directo.",
                "Cooperación activa.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Cooperación activa.\"."
        },
        {
            "id": "isep-d26-339",
            "difficulty": "dificil",
            "question": "Según el Artículo 5°, el acometimiento se configura cuando:",
            "options": [
                "Hay insultos reiterados.",
                "Se invade la distancia de seguridad.",
                "Se inicia un ataque violento contra el agente o terceros.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se inicia un ataque violento contra el agente o terceros.\"."
        },
        {
            "id": "isep-d26-344",
            "difficulty": "media",
            "question": "El proceso penal es:",
            "options": [
                "Un procedimiento administrativo",
                "Un sistema disciplinario",
                "Un instrumento exigido constitucionalmente para aplicar el derecho penal",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Un instrumento exigido constitucionalmente para aplicar el derecho penal\"."
        },
        {
            "id": "isep-d26-364",
            "difficulty": "facil",
            "question": "Las penas pueden ser sustituidas por:",
            "options": [
                "Suspensión laboral",
                "Arresto policial",
                "Reparación del daño o trabajo comunitario",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Reparación del daño o trabajo comunitario\"."
        },
        {
            "id": "isep-d26-366",
            "difficulty": "facil",
            "question": "La sanción debe ser:",
            "options": [
                "Arbitraria",
                "Proporcional a la magnitud del hecho",
                "Siempre igual",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Proporcional a la magnitud del hecho\"."
        },
        {
            "id": "isep-d26-367",
            "difficulty": "facil",
            "question": "Para graduar la sanción se tiene en cuenta:",
            "options": [
                "Las circunstancias del hecho y del autor",
                "Solo antecedentes",
                "Solo daño económico",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 0,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Las circunstancias del hecho y del autor\"."
        },
        {
            "id": "isep-d26-369",
            "difficulty": "facil",
            "question": "El arresto también puede cumplirse:",
            "options": [
                "En tribunales",
                "En el domicilio del infractor",
                "En hospitales",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"En el domicilio del infractor\"."
        },
        {
            "id": "isep-d26-407",
            "difficulty": "dificil",
            "question": "Una sanción por acoso sexual callejero es:",
            "options": [
                "Arresto hasta 60 días",
                "Multa de 1 a 5 unidades jus",
                "Prisión perpetua",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Multa de 1 a 5 unidades jus\"."
        },
        {
            "id": "isep-d26-411",
            "difficulty": "dificil",
            "question": "Si el conductor está ebrio:",
            "options": [
                "No hay sanción",
                "Solo multa",
                "Arresto hasta 30 días y multa hasta 6 jus",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Arresto hasta 30 días y multa hasta 6 jus\"."
        },
        {
            "id": "isep-d26-412",
            "difficulty": "dificil",
            "question": "Como sanción accesoria puede aplicarse:",
            "options": [
                "Secuestro definitivo del vehículo",
                "Inhabilitación para conducir hasta 90 días",
                "Expulsión del país",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 1,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Inhabilitación para conducir hasta 90 días\"."
        },
        {
            "id": "isep-d26-419",
            "difficulty": "media",
            "question": "¿Cuál es el objetivo principal de la IPP?",
            "options": [
                "Dictar sentencia",
                "Ejecutar la pena",
                "Investigar el delito y reunir pruebas para preparar la acusación",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Investigar el delito y reunir pruebas para preparar la acusación\"."
        },
        {
            "id": "isep-d26-424",
            "difficulty": "facil",
            "question": "¿Cuánto tiempo debe pasar desde la audiencia imputativa para que la defensa pueda solicitar el archivo jurisdiccional?",
            "options": [
                "6 meses",
                "8 meses",
                "10 meses",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"10 meses\"."
        },
        {
            "id": "isep-d26-434",
            "difficulty": "facil",
            "question": "¿Cuál de los siguientes elementos debe contener la acusación?",
            "options": [
                "Declaración del imputado obligatoria",
                "Calificación legal del hecho",
                "Declaración de todos los testigos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Calificación legal del hecho\"."
        },
        {
            "id": "isep-d26-439",
            "difficulty": "facil",
            "question": "¿Cuál es el principio general en materia de prueba?",
            "options": [
                "Prueba tasada",
                "Prueba limitada",
                "Libertad probatoria",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Libertad probatoria\"."
        },
        {
            "id": "isep-d26-454",
            "difficulty": "facil",
            "question": "¿Cuándo se realiza una autopsia?",
            "options": [
                "Siempre que muere una persona",
                "Solo si lo pide la familia",
                "Cuando no es evidente la causa de la muerte",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Cuando no es evidente la causa de la muerte\"."
        },
        {
            "id": "isep-d26-459",
            "difficulty": "dificil",
            "question": "¿Cuánto tiempo pueden durar las medidas especiales de investigació",
            "options": [
                "30 días",
                "60 días",
                "90 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"90 días\"."
        },
        {
            "id": "isep-d26-469",
            "difficulty": "facil",
            "question": "El testigo en el reconocimiento:",
            "options": [
                "Puede señalar de forma imprecisa",
                "Debe señalar clara y precisamente",
                "Solo observa sin intervenir",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Debe señalar clara y precisamente\"."
        },
        {
            "id": "isep-d26-474",
            "difficulty": "facil",
            "question": "El careo procede cuando:",
            "options": [
                "Hay confesión",
                "Hay contradicciones importantes",
                "El imputado lo pide",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Hay contradicciones importantes\"."
        },
        {
            "id": "isep-d26-479",
            "difficulty": "media",
            "question": "La entrega vigilada consiste en:",
            "options": [
                "Detener inmediatamente",
                "Permitir continuar el delito controladamente",
                "Suspender la investigación",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Permitir continuar el delito controladamente\"."
        },
        {
            "id": "isep-d26-484",
            "difficulty": "facil",
            "question": "Los agentes encubiertos en juicio:",
            "options": [
                "Declaran públicamente",
                "No pueden declarar",
                "Se protege su identidad",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se protege su identidad\"."
        },
        {
            "id": "isep-d26-489",
            "difficulty": "facil",
            "question": "En lesiones graves en tránsito:",
            "options": [
                "No interviene nadie más",
                "Se convoca al gabinete accidentológico",
                "Se libera la escena",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se convoca al gabinete accidentológico\"."
        },
        {
            "id": "isep-d26-496",
            "difficulty": "facil",
            "question": "La violencia económica y patrimonial implica:",
            "options": [
                "Únicamente daño físico",
                "Violencia verbal",
                "Control o limitación de recursos económicos",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Ley del Personal Policial (Ley 12.521) / Régimen Disciplinario (Decreto 461/15)",
            "explanation": "La Ley 12.521 y el Decreto 461/15 regulan el régimen de calificaciones, ascensos, faltas disciplinarias y recursos administrativos. La opción correcta conforme a la normativa oficial es: \"Control o limitación de recursos económicos\"."
        }
    ],
    "comisario-supervisor": [
        {
            "id": "cs-f01",
            "difficulty": "facil",
            "question": "¿Cuáles son los cinco atributos que deben reunir los objetivos formulados bajo la metodología SMART en la gestión policial?",
            "options": [
                "Específicos, Medibles, Alcanzables, Relevantes y con Plazo determinado (Temporales)",
                "Secretos, Militares, Armados, Rápidos y Tácticos para la contención de multitudes",
                "Simples, Modernos, Aprobados, Reglamentados y Transmitidos por radio institucional",
                "Sancionatorios, Máximos, Administrativos, Regionales y Teóricos según el ISEP"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Guía de Proyectos Institucionales: Criterios SMART",
            "explanation": "El estándar SMART (Specific, Measurable, Achievable, Relevant, Time-bound) es la base metodológica exigida por el ISEP para proyectos de ascenso."
        },
        {
            "id": "cs-f02",
            "difficulty": "facil",
            "question": "En el marco de la Ley Nacional 24.059 de Seguridad Interior, ¿cuál es el ámbito de actuación de las Fuerzas Federales en la provincia?",
            "options": [
                "Actúan en auxilio de la seguridad provincial a requerimiento del Gobernador y en el marco del Comité de Crisis conjunto",
                "Reemplazan en su totalidad a la Policía de Santa Fe asumiendo el mando directo de las comisarías y destacamentos",
                "Solo pueden intervenir si el Presidente de la Nación declara formalmente el estado de sitio en todo el país",
                "Se limitan exclusivamente a realizar pericias contables en el Banco Central de la República Argentina"
            ],
            "correctIndex": 0,
            "source": "Ley Nacional de Seguridad Interior N° 24.059, Arts. 13 a 18",
            "explanation": "La intervención de fuerzas federales (GNA, PNA, PFA, PSA) es complementaria y coordinada con la provincia a través del Comité de Crisis conjunto."
        },
        {
            "id": "cs-f03",
            "difficulty": "facil",
            "question": "¿Qué es un 'Indicador de Desempeño' (KPI) en la evaluación de una Unidad Regional policial?",
            "options": [
                "Una medida cuantitativa o cualitativa que permite evaluar el cumplimiento de metas y la eficacia de los servicios prestados",
                "El número de serie grabado en la corredera de las pistolas provistas al personal del Agrupamiento de Supervisión",
                "La cantidad de folios que componen el libro de guardia de una seccional al finalizar el año calendario",
                "El cálculo del porcentaje de descuento jubilatorio que se aplica al personal en el recibo de haberes mensual"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Control de Gestión y Métricas de Rendimiento",
            "explanation": "Un KPI (Key Performance Indicator) monitorea resultados operativos (ej. tiempo de arribo 911, patrullajes cumplidos, delitos esclarecidos)."
        },
        {
            "id": "cs-f04",
            "difficulty": "facil",
            "question": "¿Cuál es la función del Tribunal de Cuentas de la Provincia de Santa Fe respecto a la Policía provincial?",
            "options": [
                "Fiscalizar la legalidad y legitimidad de los gastos públicos, contrataciones e inversiones patrimoniales de la fuerza",
                "Juzgar los delitos penales cometidos por el personal policial en el marco de juicios orales y públicos",
                "Determinar el puntaje de calificación anual para los ascensos de los oficiales del Agrupamiento Dirección",
                "Confeccionar los programas de estudio de tiro y armamento para los aspirantes de la escuela de cadetes"
            ],
            "correctIndex": 0,
            "source": "Constitución de Santa Fe Art. 81 / Ley Orgánica del Tribunal de Cuentas",
            "explanation": "El Tribunal de Cuentas ejerce el control externo de las cuentas públicas provinciales, aprobando o formulando cargos patrimoniales a los responsables."
        },
        {
            "id": "cs-f05",
            "difficulty": "facil",
            "question": "¿Qué es el 'Árbol de Problemas' en la metodología de Marco Lógico aplicada a la seguridad pública?",
            "options": [
                "Una herramienta analítica que diagrama las causas raíz, el problema central y los efectos de una situación delictiva",
                "Un mapa geográfico de la ciudad donde se señalan con chinchetas los árboles caídos tras una tormenta",
                "El diagrama jerárquico que muestra los nombres y números de legajo de todos los comisarios de la Unidad Regional",
                "Un registro de los expedientes administrativos que se encuentran demorados en el archivo de la jefatura"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Metodología de Marco Lógico y Proyectos de Gestión",
            "explanation": "El Árbol de Problemas permite identificar las causas de fondo del delito para luego transformarlas en el Árbol de Objetivos y planificar soluciones."
        },
        {
            "id": "cs-f06",
            "difficulty": "facil",
            "question": "¿Qué establece la doctrina de 'Mando Estratégico' a nivel de Jefe de Unidad Regional?",
            "options": [
                "Concentrarse en la visión de largo plazo, asignación general de recursos, coordinación interinstitucional y liderazgo transformacional",
                "Manejar personalmente el patrullero de avanzada en todas las intervenciones de robo en flagrancia de la ciudad",
                "Tomar declaración testimonial en la mesa de entradas a las personas que asisten a radicar denuncias de extravío",
                "Desarmar y limpiar las armas de dotación de los subalternos antes de cada formación de relevo de guardia"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Dirección y Liderazgo Estratégico Policial",
            "explanation": "La alta dirección policial define rumbos, políticas generales y coordina con municipios y justicia; la ejecución táctica recae en los mandos medios."
        },
        {
            "id": "cs-f07",
            "difficulty": "facil",
            "question": "En la gestión de recursos humanos policiales, ¿qué es la 'Planificación de Dotaciones'?",
            "options": [
                "El cálculo técnico del personal necesario por jerarquía y especialidad para cubrir cuadrículas, guardias e investigaciones",
                "El sorteo al azar de los destinos del personal subalterno para evitar que los oficiales permanezcan mucho tiempo en un barrio",
                "La lista de los policías que cumplen años durante el mes en curso para organizar los festejos de la dependencia",
                "El número de familiares que pueden ingresar a presenciar los desfiles ceremoniales de la Jefatura de Policía"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Gestión del Talento y Dotaciones Operativas",
            "explanation": "Planificar dotaciones evita zonas descubiertas y sobrecarga horaria, garantizando que cada dependencia cuente con los efectivos requeridos para su mapa delictivo."
        },
        {
            "id": "cs-f08",
            "difficulty": "facil",
            "question": "¿Qué es la 'Tasa de Homicidios por cada 100.000 habitantes' como métrica internacional de seguridad?",
            "options": [
                "El indicador estandarizado que permite comparar la violencia letal entre diferentes ciudades, provincias o países de manera homogénea",
                "La cantidad de muertes ocurridas por causas naturales en los hospitales públicos de la capital provincial",
                "El promedio de heridos de arma de fuego que son dados de alta en un mes calendario en las guardias médicas",
                "El número de policías que se encuentran prestando servicio ordinario de patrullaje en las avenidas comerciales"
            ],
            "correctIndex": 0,
            "source": "Estadísticas Criminales - Observatorio de Seguridad Pública de Santa Fe (OSP)",
            "explanation": "La tasa por 100.000 hab. estandariza la cifra bruta en función de la población, permitiendo medir la evolución real de la violencia letal en el tiempo."
        },
        {
            "id": "cs-f09",
            "difficulty": "facil",
            "question": "¿Cuál es el rol del Ministerio de Justicia y Seguridad de la Provincia respecto a la Policía de Santa Fe?",
            "options": [
                "Ejerce la conducción política, presupuestaria e institucional de las fuerzas policiales en el territorio provincial",
                "Es una entidad privada con fines de lucro que se encarga de la venta de uniformes y calzado al personal",
                "Es un tribunal judicial de segunda instancia que revisa las sentencias dictadas por los jueces de juicio oral",
                "Se limita exclusivamente a la administración y mantenimiento edilicio de la escuela de cadetes del ISEP"
            ],
            "correctIndex": 0,
            "source": "Ley Orgánica de Ministerios de la Provincia de Santa Fe",
            "explanation": "En el sistema democrático republicano, las fuerzas de seguridad están subordinadas al poder político civil encarnado en el Ministerio de Seguridad."
        },
        {
            "id": "cs-f10",
            "difficulty": "facil",
            "question": "¿Qué es la 'Matriz de Marco Lógico' en el diseño de planes de seguridad comunitaria?",
            "options": [
                "Una tabla de cuatro por cuatro que resume objetivos, indicadores, fuentes de verificación y supuestos de un proyecto",
                "La lista de los patrulleros que se encuentran en los talleres mecánicos esperando repuestos de motor",
                "El cronograma de guardias de servicios adicionales que se entrega a las empresas los días viernes",
                "El reglamento de disciplina donde se detallan las causales de arresto policial de hasta sesenta días"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Metodología de Proyectos para Alta Dirección",
            "explanation": "La Matriz de Marco Lógico sintetiza el Fin, Propósito, Componentes y Actividades del proyecto policial, con sus métricas y riesgos anticipados."
        },
        {
            "id": "cs-m01",
            "difficulty": "media",
            "question": "¿Cómo se calcula la 'Tasa de Respuesta Operativa' del sistema de despacho de emergencias 911?",
            "options": [
                "Tiempo transcurrido desde la recepción y categorización de la llamada hasta la llegada física del primer móvil al lugar del hecho",
                "La cantidad de kilómetros que recorrió el móvil policial multiplicado por los litros de nafta consumidos en el turno",
                "El tiempo que tarda el operador del 911 en transferir la llamada telefónica a la guardia de la comisaría más cercana",
                "La cantidad de llamadas falsas o bromas que el sistema de emergencias bloquea automáticamente por día"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Gestión del Sistema 911 - Ministerio de Seguridad de Santa Fe",
            "explanation": "La tasa de respuesta mide el tiempo total de ciclo: toma del llamado, despacho del recurso más cercano y arribo efectivo del patrullero a la escena."
        },
        {
            "id": "cs-m02",
            "difficulty": "media",
            "question": "En la formulación de un proyecto para concurso ISEP, ¿cuál es la diferencia entre un 'Indicador de Producto' y un 'Indicador de Resultado'?",
            "options": [
                "El de producto mide los bienes/servicios entregados (ej. 500 oficiales capacitados); el de resultado mide el cambio logrado (ej. 30% menos quejas por abuso)",
                "El de producto mide el costo monetario en pesos y el de resultado mide la cantidad de combustible ahorrado en los móviles",
                "El de producto se utiliza en comisarías del interior y el de resultado es de aplicación exclusiva en la ciudad de Rosario",
                "No existe diferencia alguna entre ambos términos tratándose de sinónimos utilizados en la administración pública"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Guía Metodológica de Proyectos de Gestión",
            "explanation": "El producto es el entregable directo del proyecto; el resultado es el impacto o transformación real sobre la conducta del personal o el delito."
        },
        {
            "id": "cs-m03",
            "difficulty": "media",
            "question": "Ante una auditoría del Tribunal de Cuentas por fondos de funcionamiento, ¿cuál es la responsabilidad patrimonial del Jefe de Unidad Regional?",
            "options": [
                "Responsabilidad solidaria y directa por la legalidad y correcta afectación de los fondos asignados bajo su mando",
                "No posee responsabilidad patrimonial porque el personal policial está legalmente exento de rendiciones contables",
                "La responsabilidad recae exclusivamente en el habilitado de la administración contable subordinado que libró el cheque",
                "Solo responde patrimonialmente si media condena penal firme por peculado o malversación dolosa de caudales"
            ],
            "correctIndex": 0,
            "source": "Ley de Administración Financiera de Santa Fe / Doctrina ISEP de Alta Dirección",
            "explanation": "El administrador titular de la Unidad de Organización posee responsabilidad administrativa y patrimonial directa por los fondos bajo su custodia."
        },
        {
            "id": "cs-m04",
            "difficulty": "media",
            "question": "¿Qué establece el 'Plan de Contingencia y Continuidad Operativa' de una Jefatura de Policía ante desastres climáticos severos?",
            "options": [
                "Protocolos para garantizar el funcionamiento ininterrumpido de las comunicaciones 911, patrullaje de emergencia y relevos de guardia",
                "La orden de evacuar inmediatamente todas las comisarías y suspender la atención al público hasta que cese el temporal",
                "La autorización para que el personal policial se retire a sus domicilios particulares hasta que vuelva el suministro eléctrico",
                "El traspaso de la totalidad del parque automotor de la policía al Ministerio de Obras Públicas de la Provincia"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Gestión de Crisis y Continuidad del Servicio",
            "explanation": "El plan de contingencia prevé generadores autónomos, repetidoras de radio alternativas y brigadas de rescate para sostener la seguridad en crisis."
        },
        {
            "id": "cs-m05",
            "difficulty": "media",
            "question": "¿En qué consiste el 'Análisis Criminal Espacial' (Puntos Calientes / Hot Spots) en la planificación del patrullaje?",
            "options": [
                "Identificación geo-referenciada de concentraciones recurrentes de delitos en zonas y franjas horarias específicas para focalizar recursos",
                "El mapeo de las viviendas de todos los oficiales de policía para verificar que no vivan cerca de las comisarías de destino",
                "El registro de la temperatura ambiente de las celdas de detención para cumplir con las normas de salubridad e higiene",
                "La instalación de puestos fijos de control policial en esquinas elegidas al azar sin considerar las estadísticas de hechos delictivos"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Análisis Criminal y Patrullaje Focalizado",
            "explanation": "El patrullaje basado en evidencia concentra recursos policiales en los lugares y horas de mayor densidad delictual comprobada (Hot Spots)."
        },
        {
            "id": "cs-m06",
            "difficulty": "media",
            "question": "¿Qué es la 'Auditoría Interna de Control de Gestión' en el marco del Agrupamiento de Supervisión policial?",
            "options": [
                "Evaluación sistemática de los procesos operativos, administrativos y disciplinarios para detectar desvíos, ineficiencias o irregularidades",
                "La revisión exclusiva de las cuentas bancarias particulares de los oficiales que prestan servicio en la guardia de prevención",
                "Un examen de tiro al blanco anual en polígono cerrado para verificar la puntería de los oficiales superiores de plana mayor",
                "La inspección de los armarios personales de los cadetes del ISEP antes de iniciar las clases teóricas de la mañana"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Auditoría y Calidad en la Gestión Policial",
            "explanation": "La auditoría evalúa la calidad del servicio, la correcta asignación de combustibles y adicionales, y el cumplimiento estricto de las directivas."
        },
        {
            "id": "cs-m07",
            "difficulty": "media",
            "question": "En el diseño de un proyecto SMART de seguridad, ¿qué significa que un indicador sea 'Verificable de manera Independiente'?",
            "options": [
                "Que sus datos puedan ser corroborados por fuentes externas objetivas (ej. estadísticas del MPA, registros del 911, encuestas de victimización)",
                "Que solo pueda ser interpretado y modificado por el comisario autor del proyecto sin dar explicaciones a terceros",
                "Que no requiera ninguna documentación respaldatoria escrita ni planillas de registro en soporte digital de almacenamiento",
                "Que los resultados del proyecto se publiquen en un sitio web extranjero fuera de la jurisdicción de la República Argentina"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Medición de Indicadores y Fuentes de Verificación",
            "explanation": "Una buena métrica debe poder auditarse contra fuentes externas transparentes (denuncias judiciales, despacho de ambulancias, llamadas registradas)."
        },
        {
            "id": "cs-m08",
            "difficulty": "media",
            "question": "¿Cuál es la política institucional exigida por el ISEP frente al 'Bienestar y Salud Mental' del personal policial bajo mando superior?",
            "options": [
                "Implementar protocolos de contención psicológica temprana, detección de burnout y retiro preventivo de arma ante riesgo evidente",
                "Exigir al personal que no manifieste debilidades emocionales bajo apercibimiento de sanción de arresto en el legajo de revista",
                "Derivar la totalidad de los problemas de salud mental a los juzgados de faltas municipales para su tratamiento comunitario",
                "Prohibir que los oficiales hagan uso de licencias médicas por estrés debiendo cumplir sus guardias ordinarias completas"
            ],
            "correctIndex": 0,
            "source": "Protocolo de Salud Mental Policial - ISEP 2026 / Ministerio de Seguridad",
            "explanation": "La alta dirección debe velar por la salud mental y descompresión del estrés operativo, retirando el arma provista preventivamente si hay ideación de riesgo."
        },
        {
            "id": "cs-m09",
            "difficulty": "media",
            "question": "En materia de compras mayores para equipamiento policial, ¿qué modalidad de contratación exige la ley provincial como regla general?",
            "options": [
                "Licitación Pública abierta con publicación de pliegos y libre concurrencia de oferentes para asegurar transparencia y precio",
                "Contratación directa telefónica con el proveedor más cercano a la jefatura de policía sin solicitar cotizaciones previas",
                "Compra en cuotas con tarjeta de crédito particular del Jefe de Unidad Regional a reembolsar por planilla complementaria",
                "Adquisición de armamento y vehículos a través de remates aduaneros clandestinos sin homologación balística oficial"
            ],
            "correctIndex": 0,
            "source": "Ley de Administración Financiera de Santa Fe - Régimen de Contrataciones",
            "explanation": "La licitación pública es la regla de oro constitucional para garantizar la libre competencia, transparencia y la mejor oferta para el erario público."
        },
        {
            "id": "cs-m10",
            "difficulty": "media",
            "question": "¿Cómo se define el concepto de 'Gobernanza de la Seguridad' en la doctrina moderna enseñada en los cursos de ascenso del ISEP?",
            "options": [
                "Articulación coordinada entre el Estado, la policía, los gobiernos locales (municipios), el poder judicial y la sociedad civil organizada",
                "El ejercicio autocrático y militarizado del poder de policía sin intervención de intendentes ni legisladores provinciales",
                "La privatización total de los servicios de patrullaje preventivo mediante empresas de seguridad privada y vigilancia barrial",
                "La transferencia del control de las armas de fuego de dotación policial a las juntas vecinales de fomento barrial"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Gobernanza y Seguridad Ciudadana",
            "explanation": "La gobernanza supera el enfoque puramente policial: integra justicia, urbanismo, políticas sociales municipales y participación comunitaria activa."
        },
        {
            "id": "cs-m11",
            "difficulty": "media",
            "question": "¿Qué rol cumple el 'Mapa del Delito' provincial elaborado por el Observatorio de Seguridad Pública (OSP)?",
            "options": [
                "Diagnosticar con base empírica las tipologías delictivas, series temporales y zonas críticas para orientar el despliegue de patrullas",
                "Publicar las fotografías de las personas procesadas penalmente en afiches distribuidos en paradas de transporte público",
                "Indicar a los turistas cuáles son las ciudades de la provincia donde no se requiere circular con cédula del automotor",
                "Establecer el precio de los alquileres de inmuebles urbanos en función de la cercanía a las comisarías jurisdiccionales"
            ],
            "correctIndex": 0,
            "source": "Observatorio de Seguridad Pública de Santa Fe (OSP) / Manual ISEP",
            "explanation": "El mapa del delito transforma las denuncias y partes en información geo-espacial estratégica para alimentar la toma de decisiones del mando policial."
        },
        {
            "id": "cs-d01",
            "difficulty": "dificil",
            "question": "En el marco del Sistema de Seguridad Interior (Ley 24.059), ¿qué función cumple el 'Comité de Crisis' provincial?",
            "options": [
                "Ejercer la conducción política y operacional conjunta de las fuerzas policiales provinciales y fuerzas de seguridad federales asignadas",
                "Redactar las sentencias de los juicios por jurados populares que deban resolverse en los tribunales penales de Santa Fe",
                "Fijar el aumento salarial porcentual para los empleados del escalafón técnico y profesional de la administración central",
                "Supervisar las obras viales de reparación de puentes y rutas provinciales dañadas por inundaciones ribereñas"
            ],
            "correctIndex": 0,
            "source": "Ley Nacional de Seguridad Interior N° 24.059, Art. 13",
            "explanation": "El Comité de Crisis coordina bajo mando conjunto provincial-federal las operaciones operativas ante situaciones críticas de desborde delictivo."
        },
        {
            "id": "cs-d02",
            "difficulty": "dificil",
            "question": "¿Cómo se formula un 'Indicador de Impacto' en la gestión de seguridad pública a diferencia de un indicador de actividad?",
            "options": [
                "Midiendo la variación porcentual de delitos o la tasa de resolución contra la línea de base histórica consolidada",
                "Contando la cantidad de patrulleros que salieron a la calle en cada turno de guardia del período examinado",
                "Registrando la cantidad de combustible consumido por cada dependencia policial en el mes calendario respectivo",
                "Sumando la cantidad de hojas impresas y actuaciones labradas en la oficina de sumarios del distrito comunal"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Metodología de Planificación y Control de Gestión",
            "explanation": "El indicador de actividad mide tareas realizadas (ej. patrullajes); el indicador de impacto mide el efecto real sobre la ciudadanía (reducción de homicidios o robos)."
        },
        {
            "id": "cs-d03",
            "difficulty": "dificil",
            "question": "Conforme a la Ley de Administración Financiera provincial, ¿cuándo prescribe la responsabilidad de un funcionario por rendición de cuentas de fondos públicos?",
            "options": [
                "A los 5 años desde el vencimiento del plazo para presentar la cuenta o desde que cesó en la función administradora del cargo",
                "A los 6 meses contados a partir del momento en que entregó el balance provisional a la jefatura de policía",
                "A los 20 años conforme a las normas generales del derecho canónico e internacional público",
                "No prescribe nunca mientras el oficial mantenga su domicilio real dentro de los límites de la República Argentina"
            ],
            "correctIndex": 0,
            "source": "Ley de Administración Financiera de Santa Fe / Procedimiento del Tribunal de Cuentas",
            "explanation": "Las acciones por rendición de cuentas y responsabilidad patrimonial contra administradores del Estado provincial prescriben a los 5 años."
        },
        {
            "id": "cs-d04",
            "difficulty": "dificil",
            "question": "¿Qué establece la 'Teoría de las Ventanas Rotas' (Broken Windows) en las políticas de seguridad comunitaria de alta dirección?",
            "options": [
                "Que tolerar el deterioro urbano menor, el vandalismo y el desorden callejero propicia la escalada hacia delitos graves y violencia",
                "Que los edificios policiales deben contar con vidrios blindados de nivel RB3 para resistir disparos de fusiles de asalto",
                "Que la policía debe cobrar multas a los vecinos que no reparen las persianas de sus domicilios antes de la puesta del sol",
                "Que los móviles policiales deben circular permanentemente con las ventanillas bajas para escuchar pedidos de socorro"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Criminología Aplicada y Prevención Situacional",
            "explanation": "Wilson y Kelling demostraron que el abandono y la falta de control en faltas menores transmite sensación de desamparo y atrae crimen organizado."
        },
        {
            "id": "cs-d05",
            "difficulty": "dificil",
            "question": "En la evaluación ex-post de un proyecto de seguridad pública, ¿qué mide la 'Eficiencia' a diferencia de la 'Eficacia'?",
            "options": [
                "La eficiencia relaciona los resultados alcanzados con los recursos y costos insumidos; la eficacia mide solo el grado de logro del objetivo",
                "La eficiencia mide el grado de satisfacción de los vecinos en las encuestas y la eficacia calcula los litros de combustible consumidos",
                "La eficiencia es un concepto militar que no se aplica en los exámenes de ascenso del Instituto de Seguridad Pública",
                "Son conceptos idénticos que no presentan distinción técnica alguna en la metodología de Marco Lógico internacional"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Evaluación de Proyectos de Seguridad",
            "explanation": "Eficacia es cumplir la meta (reducir el delito); eficiencia es lograrlo al menor costo de recursos, tiempo y vidas posible (optimización)."
        },
        {
            "id": "cs-d06",
            "difficulty": "dificil",
            "question": "¿Cuál es la consecuencia jurídica de un 'Reparo' u observación formal formulada por el Tribunal de Cuentas sobre una compra policial?",
            "options": [
                "Suspende la ejecución del pago o contratación hasta que el Poder Ejecutivo subsane la objeción o insista por acuerdo de ministros",
                "Provoca la detención inmediata del Jefe de Policía de Provincia sin necesidad de juicio oral ni sumario administrativo",
                "Anula retroactivamente todas las leyes provinciales sancionadas por la Legislatura en el período legislativo ordinario",
                "Es una sugerencia de redacción no vinculante que el área de compras de la policía puede desestimar sin fundamentar"
            ],
            "correctIndex": 0,
            "source": "Ley del Tribunal de Cuentas de Santa Fe - Trámite de Reparo e Insistencia",
            "explanation": "La observación legal frena el acto; si el Ejecutivo no corrige, solo puede insistir por Decreto en Acuerdo General de Ministros bajo su responsabilidad."
        },
        {
            "id": "cs-d07",
            "difficulty": "dificil",
            "question": "En el marco de la gestión de riesgos institucionales, ¿cómo se calcula el 'Nivel de Riesgo Operacional'?",
            "options": [
                "Multiplicando la Probabilidad de ocurrencia del evento adverso por la Severidad o Impacto de sus consecuencias (R = P x I)",
                "Sumando la cantidad de efectivos de la guardia de prevención al total de móviles operativos con que cuenta el comando",
                "Restando la cantidad de denuncias radicadas en la comisaría del número de efectivos que se encuentran con parte médico",
                "Dividiendo el presupuesto asignado a la Unidad Regional por los kilómetros cuadrados que abarca el departamento"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Gestión de Riesgos y Seguridad Operacional",
            "explanation": "La matriz de riesgo estándar cuantifica Riesgo = Probabilidad x Impacto, priorizando la mitigación de eventos altamente probables y destructivos."
        },
        {
            "id": "cs-d08",
            "difficulty": "dificil",
            "question": "¿Qué establece la doctrina de 'Liderazgo Transformacional' enseñada en los cursos de Alta Dirección del ISEP?",
            "options": [
                "Inspirar y motivar al personal hacia una visión compartida de excelencia ética y servicio público, más allá de la mera obediencia ciega",
                "Imponer sanciones disciplinarias de arresto policial todos los días para mantener el temor y la disciplina férrea en la tropa",
                "Reemplazar a la totalidad del personal subalterno por nuevos aspirantes cada tres meses para evitar el desgaste funcional",
                "Delegar la totalidad de las decisiones operativas de la jefatura en los jueces penales de primera instancia del distrito"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Liderazgo Transformacional y Cultura Organizacional",
            "explanation": "El liderazgo transformacional trasciende el modelo transaccional del castigo/premio, construyendo una cultura de integridad, orgullo profesional y vocación."
        },
        {
            "id": "cs-d09",
            "difficulty": "dificil",
            "question": "Conforme a la Ley 12.521, ¿cuál es el requisito ineludible para el ascenso al grado de 'Director de Policía'?",
            "options": [
                "Haber aprobado los cursos de posgrado del ISEP, reunir antigüedad mínima en el grado inmediato anterior y contar con propuesta del jurado",
                "Haber cumplido cincuenta años de servicio continuo en unidades operativas de calle sin registrar ninguna licencia anual",
                "Poseer un título nobiliario militar otorgado por una academia de policía de un país miembro del Tratado de Roma",
                "Haber realizado donaciones en dinero en efectivo superiores a dos millones de pesos a la cooperadora policial central"
            ],
            "correctIndex": 0,
            "source": "Ley 12.521 (Santa Fe) / Reglamento de Ascensos Policiales",
            "explanation": "El ascenso al agrupamiento superior exige cursado y aprobación en el ISEP, antigüedad legal mínima en la jerarquía previa y decreto del Gobernador."
        },
        {
            "id": "cs-d10",
            "difficulty": "dificil",
            "question": "¿Qué es la 'Línea de Base' (Baseline) en la metodología de evaluación de políticas de seguridad pública?",
            "options": [
                "El estado inicial documentado de los indicadores antes de implementar la intervención para poder medir el cambio real atribuible",
                "La vereda exterior de la Jefatura de Policía donde se estacionan los móviles asignados a la custodia de las autoridades",
                "El número mínimo de cartuchos que debe poseer cada oficial de policía en su cargador de servicio antes de salir al patrullaje",
                "El salario básico inicial fijado por decreto para el grado de Oficial de Policía de escalafón general al ingresar a la fuerza"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Evaluación de Políticas Públicas de Seguridad",
            "explanation": "Sin línea de base es imposible saber si el plan funcionó: es el punto de partida estadístico riguroso contra el cual se contrastan las mejoras logradas."
        },
        {
            "id": "cs-d11",
            "difficulty": "dificil",
            "question": "En la gestión presupuestaria de una Unidad Regional, ¿qué prohíbe taxativamente la Ley de Contabilidad Pública provincial?",
            "options": [
                "El desvío de fondos con afectación específica (ej. combustibles o raciones) para destinarlos a fines no autorizados por la ley",
                "El pago puntual de los sueldos y suplementos salariales a los oficiales que prestaron servicios de guardia ordinaria",
                "La rendición documentada de comprobantes fiscales electrónicos ante las autoridades de la Dirección General de Administración",
                "La solicitud formal de nuevos móviles patrulleros a la Subsecretaría de Logística del Ministerio de Seguridad"
            ],
            "correctIndex": 0,
            "source": "Ley de Administración Financiera de Santa Fe / Código Penal Art. 260 (Malversación de Caudales)",
            "explanation": "La malversación de caudales (aplicar fondos a un destino público distinto al legalmente presupuestado) es delito penal y falta gravísima."
        },
        {
            "id": "isep-d26-003",
            "difficulty": "facil",
            "question": "Liderar implica:",
            "options": [
                "Imponer autoridad mediante el uso del poder",
                "Influir de manera positiva para un objetivo común",
                "Controlar al personal con sanciones",
                "Obtener logros individuales"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Influir de manera positiva para un objetivo común\"."
        },
        {
            "id": "isep-d26-004",
            "difficulty": "facil",
            "question": "El liderazgo policial se define como:",
            "options": [
                "El liderazgo policial se define como:",
                "Un proceso dinámico en constante desarrollo",
                "Una función exclusiva del jefe",
                "Una habilidad natural sin aprendizaje"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Un proceso dinámico en constante desarrollo\"."
        },
        {
            "id": "isep-d26-005",
            "difficulty": "facil",
            "question": "Según el concepto moderno de liderazgo policial, liderar implica",
            "options": [
                "Ejercer autoridad formal",
                "Influir positivamente para alcanzar un objetivo común",
                "Aplicar disciplina estricta",
                "Obtener resultados individuales"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Influir positivamente para alcanzar un objetivo común\"."
        },
        {
            "id": "isep-d26-007",
            "difficulty": "facil",
            "question": "La autoridad moral del líder se fundamenta en:",
            "options": [
                "El grado jerárquico",
                "La antigüedad en la institución",
                "Virtudes como prudencia, justicia, fortaleza y templanza",
                "El poder sancionatorio"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Virtudes como prudencia, justicia, fortaleza y templanza\"."
        },
        {
            "id": "isep-d26-008",
            "difficulty": "facil",
            "question": "Durante la carrera policial se articulan tres aspectos esenciales:",
            "options": [
                "Mando, control y disciplina",
                "Misión, función de jefe y rol de líder",
                "Operatividad, estrategia y logística",
                "Autoridad, jerarquía y obediencia"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Misión, función de jefe y rol de líder\"."
        },
        {
            "id": "isep-d26-009",
            "difficulty": "facil",
            "question": "Las tres \"C\" que orientan el accionar policial son:",
            "options": [
                "Comando, control y conducción",
                "Capacidad, carácter y conducta",
                "Competencia, confianza y compromiso",
                "Coordinación, comunicación y control"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Competencia, confianza y compromiso\"."
        },
        {
            "id": "isep-d26-010",
            "difficulty": "facil",
            "question": "En el Estado argentino, el cumplimiento de la ley se inicia con:",
            "options": [
                "El accionar judicial",
                "El accionar legislativo",
                "El accionar policial",
                "El accionar administrativo"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El accionar policial\"."
        },
        {
            "id": "isep-d26-012",
            "difficulty": "facil",
            "question": "La conducta policial se rige por:",
            "options": [
                "Reglamentos internos",
                "Constitución Nacional, tratados internacionales de DD.HH. y leyes",
                "Órdenes superiores",
                "Costumbres institucionales"
            ],
            "correctIndex": 1,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Constitución Nacional, tratados internacionales de DD.HH. y leyes\"."
        },
        {
            "id": "isep-d26-013",
            "difficulty": "facil",
            "question": "El Código de Conducta para Funcionarios Encargados de Hacer Cumplir la Ley fue aprobado por la ONU en el año:",
            "options": [
                "1979",
                "1985",
                "1990",
                "2000"
            ],
            "correctIndex": 1,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"1985\"."
        },
        {
            "id": "isep-d26-015",
            "difficulty": "facil",
            "question": "El uso de la fuerza en un Estado democrático de derecho:",
            "options": [
                "Está prohibido",
                "Es discrecional",
                "Está permitido solo en situaciones excepcionales",
                "No requiere control"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Está permitido solo en situaciones excepcionales\"."
        },
        {
            "id": "isep-d26-016",
            "difficulty": "facil",
            "question": "Los principios internacionales del uso de la fuerza (ONU) incluyen:",
            "options": [
                "Severidad y rapidez",
                "Autoridad y control",
                "Necesidad y proporcionalidad",
                "Castigo y disuasión"
            ],
            "correctIndex": 2,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Necesidad y proporcionalidad\"."
        },
        {
            "id": "isep-d26-017",
            "difficulty": "facil",
            "question": "La autoridad moral del líder se sustenta en:",
            "options": [
                "El grado jerárquico",
                "La antigüedad",
                "Virtudes personales y ejemplo",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Virtudes personales y ejemplo\"."
        },
        {
            "id": "isep-d26-018",
            "difficulty": "facil",
            "question": "Durante la carrera policial se articulan:",
            "options": [
                "Misión, función de jefe y rol de líder",
                "Estrategia, logística y control",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida",
                "Centralización absoluta de la toma de decisiones sin delegación de mando"
            ],
            "correctIndex": 0,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Misión, función de jefe y rol de líder\"."
        },
        {
            "id": "isep-d26-019",
            "difficulty": "dificil",
            "question": "El principio de legalidad se encuentra en el artículo:",
            "options": [
                "Art. 18 CN",
                "Art. 14 CN",
                "Art. 75 CN",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Art. 18 CN\"."
        },
        {
            "id": "isep-d26-020",
            "difficulty": "dificil",
            "question": "Los tratados de DD.HH. tienen jerarquía constitucional según:",
            "options": [
                "Art. 31 CN",
                "Art. 75 inc. 22 CN",
                "Art. 19 CN",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Art. 75 inc. 22 CN\"."
        },
        {
            "id": "isep-d26-027",
            "difficulty": "dificil",
            "question": "Los tratados de Derechos Humanos tienen jerarquía constitucional según",
            "options": [
                "Art. 75 inc. 22 CN",
                "Art. 19 CN",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 0,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Art. 75 inc. 22 CN\"."
        },
        {
            "id": "isep-d26-045",
            "difficulty": "facil",
            "question": "¿Cuál es uno de los objetivos centrales de la Carta Iberoamericana de la Función Pública?",
            "options": [
                "Incrementar el control penal sobre los funcionarios",
                "Prevenir y combatir la corrupción mediante valores éticos",
                "Centralizar la gestión pública en un solo organismo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Carta Iberoamericana de la Función Pública / Ética Institucional",
            "explanation": "La Carta Iberoamericana promueve el mérito, la transparencia, la vocación de servicio al ciudadano y la calidad en la gestión pública. La opción correcta conforme a la normativa oficial es: \"Prevenir y combatir la corrupción mediante valores éticos\"."
        },
        {
            "id": "isep-d26-049",
            "difficulty": "facil",
            "question": "Según la Carta, la calidad en la gestión pública se define por:",
            "options": [
                "La rapidez administrativa",
                "El cumplimiento estricto de normas internas",
                "El servicio al interés público con justicia, equidad, objetividad y eficiencia",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Carta Iberoamericana de la Función Pública / Ética Institucional",
            "explanation": "La Carta Iberoamericana promueve el mérito, la transparencia, la vocación de servicio al ciudadano y la calidad en la gestión pública. La opción correcta conforme a la normativa oficial es: \"El servicio al interés público con justicia, equidad, objetividad y eficiencia\"."
        },
        {
            "id": "isep-d26-050",
            "difficulty": "facil",
            "question": "¿Qué derecho reconoce la Carta a los ciudadanos?",
            "options": [
                "El acceso restringido a la información pública",
                "La gestión pública de calidad",
                "La intervención directa en decisiones judiciales",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Carta Iberoamericana de la Función Pública / Ética Institucional",
            "explanation": "La Carta Iberoamericana promueve el mérito, la transparencia, la vocación de servicio al ciudadano y la calidad en la gestión pública. La opción correcta conforme a la normativa oficial es: \"La gestión pública de calidad\"."
        },
        {
            "id": "isep-d26-051",
            "difficulty": "facil",
            "question": "Entre los derechos ciudadanos reconocidos por la Carta se encuentra:",
            "options": [
                "La libre designación de funcionarios",
                "La posibilidad de realizar reclamos y recibir respuestas oportunas",
                "La eliminación de controles administrativos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Carta Iberoamericana de la Función Pública / Ética Institucional",
            "explanation": "La Carta Iberoamericana promueve el mérito, la transparencia, la vocación de servicio al ciudadano y la calidad en la gestión pública. La opción correcta conforme a la normativa oficial es: \"La posibilidad de realizar reclamos y recibir respuestas oportunas\"."
        },
        {
            "id": "isep-d26-052",
            "difficulty": "facil",
            "question": "En el ámbito policial, la Carta Iberoamericana enfatiza especialmente:",
            "options": [
                "La obediencia jerárquica absoluta",
                "La eficiencia operativa por sobre los derechos humanos",
                "La honestidad, integridad y respeto por los derechos humanos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Carta Iberoamericana de la Función Pública / Ética Institucional",
            "explanation": "La Carta Iberoamericana promueve el mérito, la transparencia, la vocación de servicio al ciudadano y la calidad en la gestión pública. La opción correcta conforme a la normativa oficial es: \"La honestidad, integridad y respeto por los derechos humanos\"."
        },
        {
            "id": "isep-d26-054",
            "difficulty": "facil",
            "question": "La Carta Iberoamericana promueve la mejora continua y la excelencia en:",
            "options": [
                "El sistema judicial",
                "La actividad privada",
                "El servicio público",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Carta Iberoamericana de la Función Pública / Ética Institucional",
            "explanation": "La Carta Iberoamericana promueve el mérito, la transparencia, la vocación de servicio al ciudadano y la calidad en la gestión pública. La opción correcta conforme a la normativa oficial es: \"El servicio público\"."
        },
        {
            "id": "isep-d26-065",
            "difficulty": "dificil",
            "question": "¿Cuál es el plazo máximo de demora permitido por el Art. 10 bis?",
            "options": [
                "4 horas",
                "6 horas corridas",
                "8 horas",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"6 horas corridas\"."
        },
        {
            "id": "isep-d26-068",
            "difficulty": "facil",
            "question": "Al momento de la demora, la persona debe ser informada de:",
            "options": [
                "Solo la causa de la demora",
                "Sus derechos y garantías",
                "El nombre del jefe de dependencia",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 1,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Sus derechos y garantías\"."
        },
        {
            "id": "isep-d26-070",
            "difficulty": "media",
            "question": "El acta debe ser firmada por:",
            "options": [
                "Solo el funcionario actuante",
                "Funcionario y superior jerárquico",
                "Funcionario, persona demorada y dos testigos si los hubiere",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Funcionario, persona demorada y dos testigos si los hubiere\"."
        },
        {
            "id": "isep-d26-075",
            "difficulty": "dificil",
            "question": "En un homicidio (art. 79 CP), NO es un aspecto central a determinar:",
            "options": [
                "Participación de la persona",
                "Conducta por acción u omisión",
                "Nacionalidad del imputado",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Nacionalidad del imputado\"."
        },
        {
            "id": "isep-d26-090",
            "difficulty": "facil",
            "question": "Según la guía LGBTI, la orientación sexual:",
            "options": [
                "Puede justificar intervención",
                "Justifica identificación",
                "Nunca es motivo de intervención",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Nunca es motivo de intervención\"."
        },
        {
            "id": "isep-d26-095",
            "difficulty": "media",
            "question": "La función preventiva de la policía implica:",
            "options": [
                "Actuar únicamente ante delitos consumados",
                "Actuar de forma pasiva hasta recibir órdenes",
                "Actuar de manera proactiva para desalentar delitos y alteraciones del orden público",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Actuar de manera proactiva para desalentar delitos y alteraciones del orden público\"."
        },
        {
            "id": "isep-d26-105",
            "difficulty": "dificil",
            "question": "Según el Artículo 61 de la Ley 24.449, los vehículos de emergencia pueden no respetar normas de circulación:",
            "options": [
                "En cualquier situación y sin restricciones",
                "Solo cuando lo decida el conductor.",
                "De forma excepcional, en cumplimiento de su misión y si no genera un mal mayor",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"De forma excepcional, en cumplimiento de su misión y si no genera un mal mayor\"."
        },
        {
            "id": "isep-d26-110",
            "difficulty": "facil",
            "question": "Según la Regla de Tueller, a menos de 21 pies (6,4 m):",
            "options": [
                "El arma blanca pierde efectividad.",
                "Disminuyen considerablemente las probabilidades de supervivencia si el arma está enfundada",
                "La amenaza puede ser fácilmente neutralizada verbalmente.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Disminuyen considerablemente las probabilidades de supervivencia si el arma está enfundada\"."
        },
        {
            "id": "isep-d26-115",
            "difficulty": "media",
            "question": "La conexidad subjetiva se configura cuando",
            "options": [
                "El delito afecta a varias personas.",
                "Intervienen varias fuerzas de seguridad.",
                "Una misma persona tiene varios delitos en concurso real",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Una misma persona tiene varios delitos en concurso real\"."
        },
        {
            "id": "isep-d26-120",
            "difficulty": "facil",
            "question": "La finalidad de comercio en la tenencia con fines de comercialización se denomina:",
            "options": [
                "Dolo eventual.",
                "Resultado típico.",
                "Ultraintención.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Ultraintención.\"."
        },
        {
            "id": "isep-d26-130",
            "difficulty": "facil",
            "question": "La siembra o cultivo escaso para consumo personal:",
            "options": [
                "Exige probar finalidad de comercio.",
                "Es atípica.",
                "Configura un tipo atenuado.",
                "Conlleva suspensión preventiva de empleo y retención del 50% de haberes"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Configura un tipo atenuado.\"."
        },
        {
            "id": "isep-d26-145",
            "difficulty": "facil",
            "question": "¿Cuál de los siguientes ejemplos corresponde a una denuncia anónima?",
            "options": [
                "Declaración testimonial bajo juramento",
                "Denuncia con patrocinio letrado",
                "Carta sin firma o aviso telefónico",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Carta sin firma o aviso telefónico\"."
        },
        {
            "id": "isep-d26-155",
            "difficulty": "facil",
            "question": "La diferencia correcta entre \"lugar del hecho\" y \"escenario\" es que:",
            "options": [
                "Son conceptos idénticos",
                "El escenario siempre es único.",
                "El escenario es el sitio específico donde, por la presencia de indicios, se evidencia parte del hecho.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El escenario es el sitio específico donde, por la presencia de indicios, se evidencia parte del hecho.\"."
        },
        {
            "id": "isep-d26-160",
            "difficulty": "facil",
            "question": "Son factores de pérdida de indicios, EXCEPTO:",
            "options": [
                "Factores climáticos.",
                "Factores judiciales.",
                "Factores humanos.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Factores judiciales.\"."
        },
        {
            "id": "isep-d26-165",
            "difficulty": "facil",
            "question": "En criminalística, la relación correcta es:",
            "options": [
                "ndicio = prueba.",
                "Evidencia = prueba automáticamente.",
                "Indicio → evidencia → prueba (en el proceso judicial).",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Indicio → evidencia → prueba (en el proceso judicial).\"."
        },
        {
            "id": "isep-d26-170",
            "difficulty": "media",
            "question": "La actuación policial en la escena del delito se organiza en:",
            "options": [
                "Dos actos con cuatro acciones",
                "Tres actos con tres acciones cada uno",
                "Cuatro actos independientes",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Tres actos con tres acciones cada uno\"."
        },
        {
            "id": "isep-d26-180",
            "difficulty": "facil",
            "question": "¿Qué debe indicarse obligatoriamente en el croquis?",
            "options": [
                "El nombre del imputado",
                "El norte",
                "La calificación legal",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"El norte\"."
        },
        {
            "id": "isep-d26-189",
            "difficulty": "facil",
            "question": "El responsable de dirigir la IPP es:",
            "options": [
                "El Juez",
                "El Jefe de Policía",
                "El Ministerio Público de la Acusación",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"El Ministerio Público de la Acusación\"."
        },
        {
            "id": "isep-d26-195",
            "difficulty": "facil",
            "question": "La Instrucción General N° 4 fue dictada en el año:",
            "options": [
                "2010",
                "2012",
                "2014",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"2014\"."
        },
        {
            "id": "isep-d26-200",
            "difficulty": "facil",
            "question": "En la Zona Interior Crítica solo pueden permanecer:",
            "options": [
                "Cualquier funcionario policial",
                "Equipo pericial y testigos necesarios",
                "Prensa autorizada",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Equipo pericial y testigos necesarios\"."
        },
        {
            "id": "isep-d26-208",
            "difficulty": "facil",
            "question": "El Coordinador Pericial es:",
            "options": [
                "Un jefe policial",
                "Un juez técnico",
                "Funcionario técnico–legal que dirige científicamente la escena",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Funcionario técnico–legal que dirige científicamente la escena\"."
        },
        {
            "id": "isep-d26-210",
            "difficulty": "facil",
            "question": "El Coordinador Pericial tiene la facultad de:",
            "options": [
                "Dictar sentencia",
                "Detener personas",
                "Definir perímetros y organizar orden de ingreso de peritos",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Definir perímetros y organizar orden de ingreso de peritos\"."
        },
        {
            "id": "isep-d26-212",
            "difficulty": "facil",
            "question": "La liberación del lugar del hecho corresponde exclusivamente a:",
            "options": [
                "Jefe policial",
                "Coordinador Pericial",
                "Autoridad judicial competente",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"Autoridad judicial competente\"."
        },
        {
            "id": "isep-d26-230",
            "difficulty": "facil",
            "question": "La cadena de custodia tiene como finalidad:",
            "options": [
                "Determinar la pena",
                "Garantizar que la prueba sea la misma secuestrada",
                "Acelerar el juicio",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Garantizar que la prueba sea la misma secuestrada\"."
        },
        {
            "id": "isep-d26-235",
            "difficulty": "facil",
            "question": "El análisis de residuos de disparo (STUBS) detecta principalmente:",
            "options": [
                "Hierro, cobre y zinc",
                "Plomo, bario y antimonio",
                "Calcio y sodio",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Plomo, bario y antimonio\"."
        },
        {
            "id": "isep-d26-240",
            "difficulty": "dificil",
            "question": "El artículo 18 de la Constitución de la Nación Argentina establece el principio de:",
            "options": [
                "Oportunidad",
                "Juicio previo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno",
                "Solo ante requerimiento expreso del Ministerio de Justicia y Seguridad"
            ],
            "correctIndex": 1,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Juicio previo\"."
        },
        {
            "id": "isep-d26-265",
            "difficulty": "facil",
            "question": "La Policía ejerce sus funciones en:",
            "options": [
                "Solo zonas urbanas",
                "Solo zonas rurales",
                "Todo el territorio provincial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Todo el territorio provincial\"."
        },
        {
            "id": "isep-d26-270",
            "difficulty": "dificil",
            "question": "Esto está establecido en el artículo:",
            "options": [
                "Art. 1",
                "Art. 4",
                "Art. 27",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Art. 27\"."
        },
        {
            "id": "isep-d26-275",
            "difficulty": "facil",
            "question": "El Departamento Informaciones es:",
            "options": [
                "1",
                "2",
                "3",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"2\"."
        },
        {
            "id": "isep-d26-280",
            "difficulty": "facil",
            "question": "El Departamento Informaciones se encarga de:",
            "options": [
                "Logística",
                "Inteligencia",
                "Administración",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Inteligencia\"."
        },
        {
            "id": "isep-d26-300",
            "difficulty": "facil",
            "question": "En el modelo de control continuo, antes de disparar con arma de fuego se debe:",
            "options": [
                "Golpear obligatoriamente",
                "Advertir verbalmente",
                "Advertir, empuñar, desenfundar y apuntar",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Advertir, empuñar, desenfundar y apuntar\"."
        },
        {
            "id": "isep-d26-305",
            "difficulty": "dificil",
            "question": "El Art. 274 del Código Penal sanciona:",
            "options": [
                "Abuso de armas",
                "Lesiones graves",
                "La omisión del funcionario público de promover persecución y represión del delito",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"La omisión del funcionario público de promover persecución y represión del delito\"."
        },
        {
            "id": "isep-d26-310",
            "difficulty": "facil",
            "question": "El superior jerárquico es responsable cuando:",
            "options": [
                "Solo si dio la orden directa",
                "Sabía o debía saber del uso ilícito y no adoptó medidas correctivas",
                "El hecho tuvo repercusión mediática",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Sabía o debía saber del uso ilícito y no adoptó medidas correctivas\"."
        },
        {
            "id": "isep-d26-315",
            "difficulty": "facil",
            "question": "Antes de usar un arma de fuego, el funcionario debe:",
            "options": [
                "Disparar preventivamente",
                "Pedir autorización judicial",
                "Identificarse, advertir y dar tiempo suficiente",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Identificarse, advertir y dar tiempo suficiente\"."
        },
        {
            "id": "isep-d26-319",
            "difficulty": "dificil",
            "question": "Según el Art. 3 del Código de Conducta:",
            "options": [
                "La fuerza es discrecional",
                "Solo puede usarse cuando sea estrictamente necesaria y en la medida requerida",
                "Puede usarse preventivamente",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Solo puede usarse cuando sea estrictamente necesaria y en la medida requerida\"."
        },
        {
            "id": "isep-d26-320",
            "difficulty": "dificil",
            "question": "El Art. 5 del Código de Conducta establece:",
            "options": [
                "Uso progresivo obligatorio",
                "Facultades ampliadas",
                "Prohibición absoluta de tortura o tratos crueles",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Prohibición absoluta de tortura o tratos crueles\"."
        },
        {
            "id": "isep-d26-321",
            "difficulty": "dificil",
            "question": "El Art. 8 del Código de Conducta dispone que el funcionario debe:",
            "options": [
                "Guardar silencio",
                "Respetar la ley e impedir violaciones",
                "Obedecer siempre",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"Respetar la ley e impedir violaciones\"."
        },
        {
            "id": "isep-d26-325",
            "difficulty": "facil",
            "question": "El objetivo primordial de la labor policial es:",
            "options": [
                "Sancionar",
                "Imponer autoridad",
                "Mantener la paz y la estabilidad social",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Mantener la paz y la estabilidad social\"."
        },
        {
            "id": "isep-d26-330",
            "difficulty": "dificil",
            "question": "Conforme el Artículo 2°, el Protocolo es de aplicación:",
            "options": [
                "Facultativa para las fuerzas provinciales.",
                "Solo para la Policía de la Provincia.",
                "Obligatoria y sin excepción para todos los sujetos vinculados al uso de la fuerza dentro del territorio provincial.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Obligatoria y sin excepción para todos los sujetos vinculados al uso de la fuerza dentro del territorio provincial.\"."
        },
        {
            "id": "isep-d26-332",
            "difficulty": "dificil",
            "question": "El Artículo 3° establece que la autoridad de aplicación es:",
            "options": [
                "La Jefatura de Policía.",
                "El Ministerio Público de la Acusación.",
                "El Ministerio de Justicia y Seguridad.",
                "Imposición inflexible de la jerarquía mediante el principio de obediencia debida"
            ],
            "correctIndex": 2,
            "source": "Manual ISEP 2026 - Conducción Policial y Liderazgo Estratégico",
            "explanation": "El liderazgo policial armoniza la autoridad moral basada en virtudes cardinales con la función técnica de mando de tropa. La opción correcta conforme a la normativa oficial es: \"El Ministerio de Justicia y Seguridad.\"."
        },
        {
            "id": "isep-d26-340",
            "difficulty": "dificil",
            "question": "Conforme el Artículo 6°, la asimetría física implica:",
            "options": [
                "Desventaja por cantidad numérica.",
                "Desventaja por armas del agresor.",
                "Desventaja por tamaño, altura o peso que compromete la seguridad del agente.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Desventaja por tamaño, altura o peso que compromete la seguridad del agente.\"."
        },
        {
            "id": "isep-d26-365",
            "difficulty": "facil",
            "question": "Entre las penas accesorias se encuentra:",
            "options": [
                "Prisión perpetua",
                "Promesa caucionada de no ofender",
                "Inhabilitación perpetua",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Promesa caucionada de no ofender\"."
        },
        {
            "id": "isep-d26-370",
            "difficulty": "facil",
            "question": "Si el infractor viola el arresto domiciliario:",
            "options": [
                "Pierde el beneficio y cumple la pena en establecimiento correspondiente",
                "Se reduce la pena",
                "Se archiva la causa",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 0,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Pierde el beneficio y cumple la pena en establecimiento correspondiente\"."
        },
        {
            "id": "isep-d26-375",
            "difficulty": "facil",
            "question": "Cuando concurren varias infracciones independientes:",
            "options": [
                "Se aplica la pena más grave.",
                "Se acumulan las penas correspondientes a cada hecho.",
                "Se aplica una sola pena.",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Se acumulan las penas correspondientes a cada hecho.\"."
        },
        {
            "id": "isep-d26-390",
            "difficulty": "dificil",
            "question": "Para constituirse en querellante particular durante el juicio:",
            "options": [
                "Debe hacerlo dentro de 10 días.",
                "Dentro de 5 días de notificado el requerimiento acusatorio.",
                "En cualquier momento",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Dentro de 5 días de notificado el requerimiento acusatorio.\"."
        },
        {
            "id": "isep-d26-410",
            "difficulty": "dificil",
            "question": "La pena base por conducción peligrosa es:",
            "options": [
                "Arresto hasta 10 días",
                "Arresto hasta 15 días y multa hasta 3 jus",
                "Arresto hasta 30 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Arresto hasta 15 días y multa hasta 3 jus\"."
        },
        {
            "id": "isep-d26-430",
            "difficulty": "facil",
            "question": "¿En qué tipo de evidencia debe basar sus decisiones el Tribunal?",
            "options": [
                "Solo documental",
                "Solo testimonial",
                "Testimonial, material y documental",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Testimonial, material y documental\"."
        },
        {
            "id": "isep-d26-435",
            "difficulty": "facil",
            "question": "¿Qué tipo de audiencia convoca el juez una vez presentada la acusación?",
            "options": [
                "Privada",
                "Escrita",
                "Oral y pública",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Oral y pública\"."
        },
        {
            "id": "isep-d26-443",
            "difficulty": "facil",
            "question": "Según la Constitución Nacional, el imputado:",
            "options": [
                "Debe declarar en juicio",
                "No puede ser obligado a declarar contra sí mismo",
                "Solo puede declarar ante el juez",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Constitución Nacional / Código de Conducta ONU (Res. 34/169) / Ley 24.059",
            "explanation": "Los principios constitucionales y los estándares de derechos humanos de la ONU son rectores irrenunciables para los mandos de conducción. La opción correcta conforme a la normativa oficial es: \"No puede ser obligado a declarar contra sí mismo\"."
        },
        {
            "id": "isep-d26-445",
            "difficulty": "facil",
            "question": "¿Qué es un testigo?",
            "options": [
                "Un funcionario judicial",
                "Una persona que declara sobre hechos percibidos por sus sentidos",
                "Un representante del imputado",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Una persona que declara sobre hechos percibidos por sus sentidos\"."
        },
        {
            "id": "isep-d26-450",
            "difficulty": "media",
            "question": "¿Cuál es el objetivo de la inspección del lugar del hecho?",
            "options": [
                "Interrogar al imputado",
                "Verificar rastros, estado de personas, lugares y cosas relacionadas con el delito",
                "Tomar declaración testimonial",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Verificar rastros, estado de personas, lugares y cosas relacionadas con el delito\"."
        },
        {
            "id": "isep-d26-455",
            "difficulty": "facil",
            "question": "¿Quiénes no pueden ser informantes?",
            "options": [
                "Ciudadanos comunes",
                "Víctimas",
                "Integrantes o ex integrantes de fuerzas de seguridad o inteligencia",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Carta Iberoamericana de la Función Pública / Ética Institucional",
            "explanation": "La Carta Iberoamericana promueve el mérito, la transparencia, la vocación de servicio al ciudadano y la calidad en la gestión pública. La opción correcta conforme a la normativa oficial es: \"Integrantes o ex integrantes de fuerzas de seguridad o inteligencia\"."
        },
        {
            "id": "isep-d26-460",
            "difficulty": "facil",
            "question": "¿Cuántas veces puede prorrogarse la medida?",
            "options": [
                "Ilimitadas veces",
                "Dos veces",
                "Una sola vez por igual término",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Una sola vez por igual término\"."
        },
        {
            "id": "isep-d26-465",
            "difficulty": "facil",
            "question": "¿Qué debe hacer el Tribunal respecto al acuerdo del arrepentido?",
            "options": [
                "Enviarlo a la policía",
                "Homologarlo judicialmente",
                "Archivarlo",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Homologarlo judicialmente\"."
        },
        {
            "id": "isep-d26-470",
            "difficulty": "facil",
            "question": "El reconocimiento por fotografías requiere un mínimo de:",
            "options": [
                "3 imágenes",
                "5 imágenes",
                "7 imágenes",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"7 imágenes\"."
        },
        {
            "id": "isep-d26-475",
            "difficulty": "facil",
            "question": "En el careo, el imputado:",
            "options": [
                "Está obligado a participar",
                "Puede negarse",
                "Declara bajo juramento obligatorio",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 1,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"Puede negarse\"."
        },
        {
            "id": "isep-d26-480",
            "difficulty": "dificil",
            "question": "Las medidas especiales duran:",
            "options": [
                "30 días",
                "60 días",
                "90 días",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"90 días\"."
        },
        {
            "id": "isep-d26-485",
            "difficulty": "facil",
            "question": "¿Cuántas fotos panorámicas mínimo se deben tomar?",
            "options": [
                "2",
                "3",
                "4",
                "Queda a exclusivo criterio discrecional de la Superioridad de turno"
            ],
            "correctIndex": 2,
            "source": "Manual de Doctrina y Procedimiento Policial ISEP 2026",
            "explanation": "Doctrina oficial establecida en el programa de concurso de ascenso del Instituto de Seguridad Pública (ISEP). La opción correcta conforme a la normativa oficial es: \"4\"."
        }
    ]
};

// ═══════════════════════════════════════════════════════════════
// METADATA DEL BANCO DE PREGUNTAS
// ═══════════════════════════════════════════════════════════════
window.quizBankMeta = {
    "version": "8.1.0",
    "lastUpdated": "2026-11-05",
    "totalQuestions": 773,
    "difficulties": [
        {
            "id": "facil",
            "title": "Fácil (Repaso Inicial)",
            "desc": "Conceptos clave, definiciones claras y principios rectores",
            "icon": "sentiment_satisfied",
            "color": "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
            "badge": "🟢 FÁCIL"
        },
        {
            "id": "media",
            "title": "Media (Procedimientos Operativos)",
            "desc": "Actuaciones de calle, guardia, L.C.A.T., menores y narcomenudeo",
            "icon": "psychology",
            "color": "text-amber-400 bg-amber-500/10 border-amber-500/30",
            "badge": "🟡 MEDIA"
        },
        {
            "id": "dificil",
            "title": "Difícil (Nivel Concurso ISEP)",
            "desc": "Plazos procesales estrictos, artículos específicos, causales y distractores jurídicos",
            "icon": "military_tech",
            "color": "text-red-400 bg-red-500/10 border-red-500/30",
            "badge": "🔴 DIFÍCIL"
        }
    ],
    "hierarchies": [
        {
            "id": "simulacro-integral",
            "title": "Simulacro General ISEP (Todas las Materias)",
            "icon": "auto_stories",
            "color": "from-blue-600 via-indigo-600 to-purple-700",
            "desc": "Evaluación integral con preguntas de Tiro, Conducción, Comunicación, Informática y Leyes",
            "programSyllabus": "Tiro MIRAF · Conducción Policial · Seguridad de la Información · CPP Ley 12.734 · Microtráfico Ley 14.239 · Jurados Ley 14.258"
        },
        {
            "id": "suboficial-oficial",
            "title": "Suboficial → Oficial de Policía",
            "icon": "shield",
            "color": "from-sky-600 via-blue-700 to-indigo-800",
            "desc": "Escena del crimen, RPI, Decreto 461/15, CPP Art. 213, Regla de Tueller y MIRAF",
            "programSyllabus": "Escena del Crimen y RPI · Inteligencia Emocional · Ley 12.521 y Dec. 461/15 · CPP Ley 12.734 · Convivencia Ley 13.774 · Microtráfico Ley 14.239 · Actas · Informática · Tiro ANMaC"
        },
        {
            "id": "oficial-subinspector",
            "title": "Oficial → Subinspector",
            "icon": "military_tech",
            "color": "from-blue-600 to-indigo-700",
            "desc": "Práctica policial, Tiro MIRAF (Balística y SUL), Actas CPP (Art. 138), Preservación y Convivencia",
            "programSyllabus": "Módulo I: Práctica Policial, Tiro y Armamento MIRAF, Primer Preventor, Código de Conducta ONU y Código de Convivencia"
        },
        {
            "id": "subinspector-inspector",
            "title": "Subinspector → Inspector",
            "icon": "shield_person",
            "color": "from-emerald-600 to-teal-700",
            "desc": "Liderazgo, Seguridad de la Información (Tríada CID), Comunicación, LCAT y Jurados",
            "programSyllabus": "Liderazgo Operativo, Seguridad de la Información e Incidentes, Niñez Ley 12.967, L.C.A.T. y Juicio por Jurados (Ley 14.258)"
        },
        {
            "id": "inspector-subcomisario",
            "title": "Inspector → Subcomisario",
            "icon": "admin_panel_settings",
            "color": "from-amber-600 to-orange-700",
            "desc": "Narcomenudeo (Ley 14.239), Conducción de Comisarías y Orden Público, Pistola Bersa 9mm",
            "programSyllabus": "Desfederalización y Microtráfico, Conducción de Comisarías y Destacamentos, Órdenes de Operaciones y Armamento"
        },
        {
            "id": "subcomisario-comisario",
            "title": "Subcomisario → Comisario",
            "icon": "stars",
            "color": "from-purple-600 to-indigo-800",
            "desc": "Políticas de seguridad por cuadrículas, Vocería y Prensa sin 'Off The Record', Decreto 461/15",
            "programSyllabus": "Poder de Policía, Vocería Policial ante Medios Masivos, Régimen Disciplinario Decreto 461/15 y Sanciones"
        },
        {
            "id": "comisario-supervisor",
            "title": "Comisario → Com. Supervisor / Director",
            "icon": "workspace_premium",
            "color": "from-amber-500 to-purple-700",
            "desc": "Proyectos de Gestión Institucional SMART, KPIs y Auditoría de Gestión",
            "programSyllabus": "Metodología de Marco Lógico, Indicadores Clave (KPIs), Alta Dirección y Responsabilidad Patrimonial"
        }
    ]
};
