/**
 * Adicionales Santa Fe - Banco de Preguntas ISEP 2026 Profesional
 * Simulador de Examen de Ascenso Policial Oficial
 * 
 * v7.0.0 - BANCO EXPANDIDO Y ADAPTATIVO
 * - Más de 180 preguntas oficiales rigurosamente categorizadas por Jerarquía y Dificultad.
 * - Distractores equilibrados con longitud técnica homogénea para evitar descarte visual.
 * - Basado al 100% en los manuales de cursado ISEP 2026, decretos provinciales y exámenes Daypo reales:
 *   • Tiro y Armamento Policial (MIRAF, Bersa TPR9/Thunder Pro, Balística, Posición SUL)
 *   • Código Procesal Penal de Santa Fe (Ley 12.734: flagrancia, requisas, allanamientos y actas)
 *   • Régimen Disciplinario Policial (Decreto 461/15 y Ley 12.521: faltas, arresto y recursos)
 *   • Microtráfico y Narcomenudeo (Ley 14.239: desfederalización y cadena de custodia)
 *   • Seguridad de la Información (Tríada CID, incidentes y evidencia digital en allanamientos)
 *   • Conducción de Patrulleros y Comunicaciones Institucionales (7C y mando operativo)
 * 
 * Modalidades de Dificultad:
 * - 'facil': Conceptos clave, definiciones doctrinarias y principios rectores del manual.
 * - 'media': Procedimientos técnico-operativos de calle, guardia, tiro y toma de decisiones.
 * - 'dificil': Nivel concurso ISEP real (plazos procesales exactos, causales de nulidad, sanciones y artículos específicos).
 */

window.quizBank = {
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
        }
    ]
};

// ═══════════════════════════════════════════════════════════════
// METADATA DEL BANCO DE PREGUNTAS
// ═══════════════════════════════════════════════════════════════
window.quizBankMeta = {
    version: "7.0.0",
    lastUpdated: "2026-10-29",
    totalQuestions: 180,
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
