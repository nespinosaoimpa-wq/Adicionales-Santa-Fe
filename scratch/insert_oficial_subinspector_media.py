# -*- coding: utf-8 -*-
"""
Script to insert 50 questions into quiz_bank.js for 'oficial-subinspector' with difficulty 'media'.
"""
import os
import json
import re

QUIZ_BANK_PATH = os.path.abspath(os.path.join(os.getcwd(), "app", "js", "data", "quiz_bank.js"))

new_questions = [
    {
        "id": "os-leg-m01",
        "difficulty": "media",
        "question": "¿Cómo se define la superioridad jerárquica según el Artículo 4 de la Ley del Personal Policial N.° 12.521?",
        "options": [
            "La que surge por haber alcanzado un grado más elevado en la escala jerárquica única.",
            "La que tiene el personal con respecto a otro exclusivamente por mayor antigüedad en el grado.",
            "La que deviene del cargo específico o función orgánica asignada por orden del día.",
            "La que se adquiere únicamente al obtener el título de grado universitario en el I.Se.P."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 4",
        "explanation": "La superioridad jerárquica (Art. 4, L.P.P. 12.521) es la que surge por haber alcanzado un grado más elevado en la escala jerárquica. La permanencia en el mismo grado configura la superioridad por antigüedad."
    },
    {
        "id": "os-leg-m02",
        "difficulty": "media",
        "question": "¿Cuál de las siguientes afirmaciones respecto del Cuadro Único de la Escala Jerárquica (Ley 12.521/06) es correcta?",
        "options": [
            "Se divide en tres cuadros independientes: Oficiales Superiores, Oficiales Jefes y Suboficiales.",
            "Estructura un cuadro único de grados que abarca desde Suboficial de Policía hasta Director General de Policía.",
            "Mantiene la vigencia del régimen jerárquico de la antigua Ley 6769.",
            "Excluye al agrupamiento de Ejecución de las obligaciones disciplinarias."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 3 y 4",
        "explanation": "Una de las reformas fundamentales de la Ley 12.521/06 fue la unificación de la escala jerárquica en un cuadro único integrado por los agrupamientos de Ejecución, Coordinación, Supervisión y Dirección."
    },
    {
        "id": "os-leg-m03",
        "difficulty": "media",
        "question": "En el marco de la Ley 12.521, ¿qué efecto jurídico principal produce la 'superioridad por cargo' en la relación funcional?",
        "options": [
            "Impone únicamente un deber formal de saludo institucional sin obligación de acatamiento operativo.",
            "Otorga competencia directa para impartir órdenes de servicio que el subordinado tiene la obligación legal de cumplir.",
            "Faculta al superior a modificar las remuneraciones y suplementos particulares del dependiente.",
            "Genera automáticamente la promoción al grado inmediato superior del jefe de dependencia."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 4",
        "explanation": "La superioridad por cargo resulta de la dependencia orgánica. A diferencia de la jerárquica o por antigüedad (que imponen deber de respeto), la superioridad por cargo otorga competencia directa para impartir órdenes del servicio que deben ser acatadas obligatoriamente."
    },
    {
        "id": "os-leg-m04",
        "difficulty": "media",
        "question": "Conforme al Artículo 25 de la Ley 12.521, ¿qué personal policial está legalmente investido de 'Autoridad Policial' en la Provincia de Santa Fe?",
        "options": [
            "Todos los integrantes de la fuerza policial, cualquiera sea su escalafón de revista.",
            "Exclusivamente el personal perteneciente al Escalafón General.",
            "El personal de los Escalafones Profesional y Técnico con título habilitante.",
            "Únicamente el personal que ostente jerarquías de Oficiales Jefes y Superiores."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 25",
        "explanation": "El Artículo 25 de la Ley 12.521 establece de manera expresa que el personal del Escalafón General es el único investido de autoridad policial. El personal del Escalafón Profesional carece de dicha investidura."
    },
    {
        "id": "os-leg-m05",
        "difficulty": "media",
        "question": "Según el Artículo 29 de la Ley 12.521, ¿cuál es el régimen de portación del arma de fuego reglamentaria para el personal con autoridad policial?",
        "options": [
            "Es obligatoria durante la prestación del servicio ordinario o extraordinario, y facultativa durante el franco de servicio.",
            "Es obligatoria las 24 horas del día, quedando prohibido dejar el arma aún durante las licencias anuales.",
            "Está estrictamente prohibida fuera del horario de guardia y debe depositarse obligatoriamente en armería.",
            "Solo es obligatoria para los choferes de patrullero y personal de agrupamientos especiales."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 29",
        "explanation": "Conforme al Artículo 29 de la Ley 12.521, el personal con autoridad policial está obligado a portar arma de fuego únicamente durante la prestación del servicio. Durante el franco de servicio, la portación queda a criterio del agente."
    },
    {
        "id": "os-leg-m06",
        "difficulty": "media",
        "question": "¿Cuáles son los tres subescalafones que integran orgánicamente el Escalafón General de la Policía de Santa Fe (Ley 12.521)?",
        "options": [
            "Seguridad, Judicial e Investigación Criminal.",
            "Seguridad, Sanidad y Comunicaciones Técnicas.",
            "Prevención, Criminalística y Logística Operativa.",
            "Orden Público, Bomberos y Administración Contable."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 12",
        "explanation": "El Escalafón General está integrado por tres subescalafones: Seguridad, Judicial e Investigación Criminal. Sanidad pertenece al Escalafón Profesional y Técnico."
    },
    {
        "id": "os-leg-m07",
        "difficulty": "media",
        "question": "Respecto al deber de guardar secreto sobre asuntos del servicio en la función policial (Ley 12.521), ¿cuál es la regla legal vigente?",
        "options": [
            "Cesa en forma automática y total una vez notificado el decreto de retiro o baja de la fuerza.",
            "Subsiste aun después del retiro o baja de la institución respecto de asuntos que por su naturaleza o disposición legal lo exijan.",
            "Solo rige mientras el efectivo cumpla funciones operativas en la Dirección de Investigaciones.",
            "Prescribe a los seis meses de cesar la relación activa de empleo policial."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 15 inc. b",
        "explanation": "El deber esencial de guardar secreto subsiste aun después del retiro o baja de la institución respecto de asuntos del servicio que por su naturaleza o norma especial lo exijan."
    },
    {
        "id": "os-leg-m08",
        "difficulty": "media",
        "question": "Presentada la renuncia a la institución policial, ¿cuál es el plazo que el agente debe continuar en funciones si antes no es reemplazado ni aceptada su dimisión?",
        "options": [
            "Hasta un término de 30 días, bajo apercibimiento de incurrir en abandono de servicio e incumplimiento de deberes.",
            "Puede cesar de prestar servicio inmediatamente al día siguiente de ingresar la nota por mesa de entradas.",
            "Exactamente 48 horas hábiles contadas desde la firma del legajo personal.",
            "Hasta 90 días corridos prorrogables indefinidamente por la Jefatura de Policía."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 16",
        "explanation": "El agente debe continuar en el desempeño de sus funciones hasta un término de 30 días si antes no es reemplazado o su dimisión aceptada, bajo apercibimiento de incurrir en abandono de servicio e incumplimiento de deberes de funcionario público."
    },
    {
        "id": "os-leg-m09",
        "difficulty": "media",
        "question": "¿Cuál de las siguientes actividades es considerada incompatible con el ejercicio de la función policial en la Provincia de Santa Fe?",
        "options": [
            "El estudio de carreras universitarias o terciarias en instituciones oficiales.",
            "El ejercicio de profesiones liberales cuando exista conflicto de intereses o la prestación de servicios en agencias de seguridad privada en actividad.",
            "La práctica de actividades deportivas o recreativas no remuneradas.",
            "La percepción del haber de retiro previsional conforme al régimen provincial."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 y Decreto Reglamentario del Art. 41",
        "explanation": "El Decreto Reglamentario del Art. 41 de la Ley 12.521 prohíbe taxativamente prestar servicios o dirigir agencias privadas de seguridad estando en actividad o actuar en causas penales/contravencionales contra el Estado."
    },
    {
        "id": "os-leg-m10",
        "difficulty": "media",
        "question": "Conforme al Artículo 24 de la Ley 12.521, ¿qué alcance tiene la cobertura médica y psicológica para afecciones contraídas en o por actos de servicio?",
        "options": [
            "Asistencia médica, psicológica y farmacológica integral y gratuita hasta la total curación o rehabilitación del agente.",
            "Cobertura del 50% de medicamentos, debiendo abonar coseguro en centros asistenciales privados.",
            "Asistencia únicamente durante los primeros 30 días hábiles posteriores a la denuncia del hecho.",
            "Cobertura exclusivamente hospitalaria sin provisión de psicofármacos ni prótesis médicas."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 24 inc. e",
        "explanation": "Es un derecho esencial previsto en el Artículo 24 de la Ley 12.521, que incluye la provisión de medicamentos hasta la total curación de lesiones sufridas con motivo o en ocasión del servicio."
    },
    {
        "id": "os-leg-m11",
        "difficulty": "media",
        "question": "Según el Artículo 1 de la Ley N.° 12.333, ¿cuál es la naturaleza jurídica y administrativa del Instituto de Seguridad Pública (I.Se.P.)?",
        "options": [
            "Persona de derecho público autárquica y organismo descentralizado con personalidad jurídica y patrimonio propio.",
            "División interna dependiente de la Plana Mayor Policial (D-1) sin autarquía financiera.",
            "Sociedad del Estado sujeta a la Ley de Sociedades Comerciales.",
            "Unidad regional especial con asiento exclusivo en la ciudad de Recreo."
        ],
        "correctIndex": 0,
        "source": "Ley 12.333 de creación del I.Se.P., Art. 1",
        "explanation": "El Artículo 1 de la Ley N.° 12.333 crea el I.Se.P. como una persona de derecho público autárquica y organismo descentralizado con personalidad jurídica propia y autarquía funcional."
    },
    {
        "id": "os-leg-m12",
        "difficulty": "media",
        "question": "Según el Decreto N.° 688/15, ¿cuáles son las cuatro Escuelas que componen la estructura orgánica del I.Se.P.?",
        "options": [
            "Escuela de Policía, Escuela de Especialidades en Seguridad, Escuela Superior de Seguridad Pública y Escuela de Investigaciones.",
            "Escuela de Cadetes, Escuela de Tiro Policial, Escuela de Choferes y Escuela de Investigaciones Científicas.",
            "Escuela de Suboficiales, Escuela de Oficiales Subalternos, Escuela de Jefes y Escuela de Plana Mayor.",
            "Escuela Primaria de Seguridad, Escuela Técnica de Armamento, Escuela Táctica y Escuela de Medicina Forense."
        ],
        "correctIndex": 0,
        "source": "Decreto N.° 688/15 - Estructura Orgánica del I.Se.P.",
        "explanation": "El Decreto 688/15 establece la estructura orgánica del I.Se.P. compuesta por cuatro escuelas: de Policía, de Especialidades en Seguridad, Superior de Seguridad Pública y de Investigaciones. La Tecnicatura Superior es un título académico, no una escuela."
    },
    {
        "id": "os-leg-m13",
        "difficulty": "media",
        "question": "¿A qué jerarquías policiales está destinada específicamente la Escuela de Especialidades en Seguridad del I.Se.P.?",
        "options": [
            "Suboficial de Policía, Oficial de Policía, Subinspector de Policía e Inspector de Policía.",
            "Subcomisario, Comisario, Comisario Supervisor y Subdirector de Policía.",
            "Exclusivamente a los Cadetes aspirantes de primer y segundo año.",
            "Únicamente a los Directores Generales y miembros de la Plana Mayor."
        ],
        "correctIndex": 0,
        "source": "Decreto 688/15 - Estructura Orgánica I.Se.P.",
        "explanation": "La Escuela de Especialidades en Seguridad agrupa la formación de las jerarquías de Suboficial a Inspector. La Escuela Superior está destinada a Subcomisarios, Comisarios, Comisarios Supervisores, Subdirectores y Directores."
    },
    {
        "id": "os-leg-m14",
        "difficulty": "media",
        "question": "En relación a la aprobación de carreras y cursos de perfeccionamiento en el I.Se.P. (Ley 12.333), ¿qué principio establece la normativa?",
        "options": [
            "El solo cursado de las materias no confiere derecho a promoción ni egreso automático; requiere aprobación fehaciente de evaluaciones.",
            "Se promueve automáticamente a todo agente que acredite el 80% de asistencia presencial.",
            "La antigüedad en el grado suple la falta de aprobación de los módulos pedagógicos.",
            "El Jefe de Policía puede convalidar el egreso sin necesidad de rendir exámenes finales."
        ],
        "correctIndex": 0,
        "source": "Ley 12.333 - Creación del I.Se.P., Art. 3",
        "explanation": "El Artículo 3 de la Ley 12.333 prohíbe la promoción automática por el solo cursado, exigiendo la aprobación fehaciente de las evaluaciones y exámenes correspondientes para acceder al egreso o habilitación de concurso."
    },
    {
        "id": "os-leg-m15",
        "difficulty": "media",
        "question": "¿Qué jerarquías componen el alumnado y destinatarios de la Escuela Superior de Seguridad Pública del I.Se.P.?",
        "options": [
            "Cadetes e Inscriptos al ciclo inicial de ingreso a la carrera policial.",
            "Suboficial de Policía, Oficial de Policía, Subinspector e Inspector.",
            "Subcomisario, Comisario, Comisario Supervisor, Subdirector de Policía y Director de Policía.",
            "Exclusivamente el Director General de Policía y personal de Gabinete Ministerial."
        ],
        "correctIndex": 2,
        "source": "Decreto 688/15 - Estructura Orgánica del I.Se.P.",
        "explanation": "La Escuela Superior está destinada a la formación de cuadros de mando y conducción estratégica, comprendiendo a las jerarquías de Subcomisario a Director de Policía."
    },
    {
        "id": "os-leg-m16",
        "difficulty": "media",
        "question": "Los ascensos del personal policial de Santa Fe se rigen constitucionalmente por el principio de:",
        "options": [
            "Antigüedad absoluta en el servicio ininterrumpido.",
            "Idoneidad profesional demostrada mediante concursos de antecedentes y oposición.",
            "Elección directa por sufragio secreto del personal subordinado.",
            "Decisión discrecional y privativa del Jefe de Unidad Regional."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 73",
        "explanation": "El Artículo 73 de la Ley 12.521 establece que los ascensos se rigen por el principio constitucional de idoneidad, mediante concursos de antecedentes y oposición."
    },
    {
        "id": "os-leg-m17",
        "difficulty": "media",
        "question": "Al cumplir el tiempo mínimo de permanencia en el grado exigido por la ley, ¿qué derecho adquiere un Oficial de Policía?",
        "options": [
            "Adquiere el derecho de admisibilidad para postularse al concurso de ascenso, sin que implique promoción automática.",
            "Adquiere el derecho al ascenso automático a Subinspector por el solo transcurso del tiempo.",
            "Obtiene el ascenso condicional sujeto a disponibilidad presupuestaria en la Unidad Regional.",
            "Queda exento de rendir el examen de oposición teórico en el I.Se.P."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06, Art. 74 y Decreto Reglamentario 1166/18",
        "explanation": "El tiempo mínimo es solo un requisito de admisibilidad para concursar. El ascenso se produce únicamente si el postulante aprueba el concurso y obtiene un orden de mérito dentro de las vacantes fijadas por el Poder Ejecutivo."
    },
    {
        "id": "os-leg-m18",
        "difficulty": "media",
        "question": "¿Qué normativa regula de manera integral el régimen de ascensos grado a grado y por sistema de concursos en la Policía de Santa Fe?",
        "options": [
            "Ley 12.521 (Capítulo V) y Decreto Reglamentario N.° 1166/18.",
            "Código Procesal Penal de la Provincia y Ley 14.258.",
            "Ley Orgánica del Servicio Penitenciario Provincial.",
            "Ley Provincial de Presupuesto Anual y Plan de Metas."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 (Capítulo V) y Decreto Reglamentario 1166/18",
        "explanation": "El Capítulo V de la Ley 12.521 y su Decreto Reglamentario N.° 1166/18 norman íntegramente el procedimiento de ascensos policiales por concurso de antecedentes y oposición."
    },
    {
        "id": "os-leg-m19",
        "difficulty": "media",
        "question": "Si un efectivo policial reúne los requisitos para concursar el ascenso pero decide no inscribirse en la convocatoria, ¿cuál es la consecuencia jurídica?",
        "options": [
            "Permanece en su grado y conserva intacto su derecho a inscribirse y postularse en futuros concursos de ascenso.",
            "Pierde definitivamente la posibilidad de concursar durante toda su carrera policial.",
            "Pasa automáticamente a disponibilidad con retención del 50% de sus haberes.",
            "Incurre en falta grave por desinterés en el perfeccionamiento profesional."
        ],
        "correctIndex": 0,
        "source": "Decreto Reglamentario N.° 1166/18, Art. 76",
        "explanation": "Conforme al Artículo 76 del Decreto 1166/18 (permanencia en el grado), quien no se inscriba o no logre ascender conserva intacto su derecho a participar en posteriores concursos."
    },
    {
        "id": "os-leg-m20",
        "difficulty": "media",
        "question": "Publicada la lista de inhabilitados para un concurso de ascenso, ¿cuál es el plazo perentorio que tiene el afectado para interponer recurso directo?",
        "options": [
            "10 días corridos contados desde la notificación fehaciente.",
            "3 días hábiles contados a partir de la última publicación del listado.",
            "30 días hábiles ante la Mesa de Entradas del I.Se.P.",
            "No existe plazo; se puede reclamar indistintamente al finalizar las pruebas de oposición."
        ],
        "correctIndex": 1,
        "source": "Decreto Reglamentario N.° 1166/18, Art. 78",
        "explanation": "El Artículo 78 del Decreto 1166/18 fija un plazo perentorio de 3 días hábiles administrativos a partir de la última publicación del listado para interponer el recurso correspondiente."
    },
    {
        "id": "os-leg-m21",
        "difficulty": "media",
        "question": "Toda impugnación o recurso contra la inhabilitación a un concurso de ascenso que no adjunte documentación respaldatoria ni fundamentación legal será:",
        "options": [
            "Tramitado con carácter de urgencia por la Comisión Evaluadora.",
            "Rechazado in limine (de plano) por la autoridad ministerial.",
            "Derivado a la Jefatura de Unidad Regional para investigación sumaria.",
            "Aceptado provisoriamente hasta la fecha del examen presencial."
        ],
        "correctIndex": 1,
        "source": "Decreto Reglamentario N.° 1166/18, Art. 78",
        "explanation": "El régimen exige que el reclamo contenga fundamentación seria y documental respaldatoria adjunta; caso contrario la autoridad administrativa lo rechaza de plano (in limine)."
    },
    {
        "id": "os-leg-m22",
        "difficulty": "media",
        "question": "Conforme al Artículo 79 del Decreto 1166/18, ¿cuál es la situación del personal policial que se encuentra bajo sumario administrativo no resuelto?",
        "options": [
            "Está autorizado a inscribirse y rendir el concurso, pero su eventual propuesta de ascenso queda suspendida hasta la resolución del sumario.",
            "Tiene prohibido en forma absoluta inscribirse o rendir cualquier examen de ascenso.",
            "Asciende automáticamente de forma preventiva y se le retiene la jerarquía si luego es sancionado.",
            "Solo puede rendir si cuenta con una autorización expresa del Fiscal General del MPA."
        ],
        "correctIndex": 0,
        "source": "Decreto Reglamentario N.° 1166/18, Art. 79",
        "explanation": "El Artículo 79 del Decreto 1166/18 autoriza al personal sumariado a inscribirse y participar del concurso. Sin embargo, su propuesta de ascenso queda suspendida hasta la resolución del sumario administrativo."
    },
    {
        "id": "os-leg-m23",
        "difficulty": "media",
        "question": "Si un efectivo sumariado participa del concurso de ascenso y la causa concluye con una sanción de suspensión de empleo por falta grave:",
        "options": [
            "Corresponde dictar el decreto de ascenso con retención de suplementos.",
            "No le corresponde el ascenso bajo ningún concepto.",
            "Se le otorga un ascenso condicional por el término de un año.",
            "Asciende con pérdida de seis meses de antigüedad en el nuevo grado."
        ],
        "correctIndex": 1,
        "source": "Decreto Reglamentario N.° 1166/18, Art. 79",
        "explanation": "La resolución de un sumario con sanción grave (suspensión de empleo o destitución) invalida definitivamente la posibilidad de ascenso tramitada durante dicho concurso."
    },
    {
        "id": "os-leg-m24",
        "difficulty": "media",
        "question": "Si el sumario administrativo pendiente del postulante concluye con su absolución o sanción leve (apercibimiento), ¿qué trámite corresponde?",
        "options": [
            "El interesado puede solicitar el levantamiento de la suspensión y la efectivización de su ascenso si estaba en orden de mérito.",
            "Debe rendir nuevamente todos los exámenes del I.Se.P. en el concurso del año siguiente.",
            "Queda inhabilitado por dos años para ascender debido al antecedente del sumario.",
            "Se archiva la postulación sin posibilidad de reclamo administrativo."
        ],
        "correctIndex": 0,
        "source": "Decreto Reglamentario N.° 1166/18, Art. 79",
        "explanation": "Al ser absuelto o sancionado solo con falta leve, la norma autoriza al agente a solicitar que se tramite su ascenso con efectividad al acto administrativo que lo otorgue si hubiere alcanzado vacante."
    },
    {
        "id": "os-leg-m25",
        "difficulty": "media",
        "question": "Respecto a los ascensos extraordinarios por 'Actos de Arrojo o Mérito Extraordinario' (Decreto 1166/18), ¿cuál de las siguientes características es correcta?",
        "options": [
            "Están exentos del cumplimiento del tiempo mínimo en el grado y de las causales ordinarias de inhabilitación.",
            "Requieren obligatoriamente contar con al menos 10 años de antigüedad ininterrumpida en la fuerza.",
            "Exigen haber aprobado previamente la Tecnicatura Superior en el I.Se.P.",
            "Solo pueden otorgarse post-mortem sin aplicación para personal con vida."
        ],
        "correctIndex": 0,
        "source": "Decreto Reglamentario N.° 1166/18, Art. 73 inc. C",
        "explanation": "El Artículo 73 inc. C del Decreto 1166/18 establece expresamente que las promociones por actos meritorios excepcionales de valor en servicio no se sujetan a los requisitos generales ni causales del Art. 78."
    },
    {
        "id": "os-leg-m26",
        "difficulty": "media",
        "question": "Conforme al Artículo 39 de la Ley 12.521, ¿cómo se define formalmente la falta administrativa o disciplinaria policial?",
        "options": [
            "Toda violación a los deberes policiales establecidos explícita o implícitamente en la normativa vigente.",
            "Únicamente la comisión de delitos contemplados en el Código Penal con condena firme.",
            "La inasistencia injustificada de más de 30 días corridos a la dependencia de revista.",
            "Toda desavenencia de carácter exclusivamente personal entre agentes de igual jerarquía."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 39",
        "explanation": "Constituye falta administrativa toda infracción a los deberes policiales establecidos explícita o implícitamente en la normativa vigente (Art. 39 Ley 12.521), garantizando el debido proceso y defensa."
    },
    {
        "id": "os-leg-m27",
        "difficulty": "media",
        "question": "¿Cómo clasifica formalmente las faltas administrativas el Artículo 40 de la Ley del Personal Policial N.° 12.521?",
        "options": [
            "Leves, Graves y Gravísimas.",
            "Leves (Art. 41) y Graves (Art. 43).",
            "Faltas de Servicio y Faltas de Ética exclusivamente.",
            "Leves y Delitos Penales de Acción Pública."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 40",
        "explanation": "La estructura legal de la Ley 12.521 clasifica formalmente las faltas disciplinarias en dos categorías: Faltas Leves (Art. 41) y Faltas Graves (Art. 43)."
    },
    {
        "id": "os-leg-m28",
        "difficulty": "media",
        "question": "De acuerdo con el Artículo 42 de la Ley 12.521, ¿qué efecto jurídico produce la acumulación o concurso de tres (3) faltas leves?",
        "options": [
            "Opera como agravante legal, transformando el concurso automáticamente en una falta grave.",
            "Acarrea la baja obligatoria inmediata del agente sin sustanciación de sumario.",
            "Se compensa con la pérdida de cinco días de licencia anual ordinaria.",
            "No produce consecuencias agravantes si las faltas fueron cometidas en distintos turnos."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 42",
        "explanation": "Conforme al Artículo 42 de la Ley 12.521, el concurso de tres faltas leves opera como agravante transformándolas automáticamente en falta grave con sustanciación sumarial."
    },
    {
        "id": "os-leg-m29",
        "difficulty": "media",
        "question": "¿Cuál de las siguientes conductas es considerada una falta leve según el Artículo 41 de la Ley 12.521?",
        "options": [
            "Atentar contra el orden constitucional o los derechos humanos.",
            "La inasistencia injustificada o tardanza de hasta 72 horas.",
            "La comisión de delitos dolosos con condena firme.",
            "El abandono de servicio por más de 10 días corridos."
        ],
        "correctIndex": 1,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 41 inc. c",
        "explanation": "El inc. c del Art. 41 tipifica las inasistencias o tardanzas injustificadas de hasta 72 horas como faltas leves sujetas a descuento proporcional de haberes y sanción disciplinaria."
    },
    {
        "id": "os-leg-m30",
        "difficulty": "media",
        "question": "Bajo la reglamentación del Decreto N.° 461/15 (Art. 41 inc. d), ¿cómo se tipifica el uso indebido de celular particular o la falta de aseo en el uniforme durante el servicio?",
        "options": [
            "Como faltas leves de servicio y desatención en la diligencia reglamentaria obligatoria.",
            "Como faltas gravísimas punibles con cesantía directa por el Jefe de Unidad.",
            "Como faltas éticas sin sanción formal en el legajo del agente.",
            "Como conductas atípicas no sujetas al poder disciplinario institucional."
        ],
        "correctIndex": 0,
        "source": "Decreto Reglamentario N.° 461/15 - Régimen Disciplinario",
        "explanation": "El Decreto 461/15 reglamentó el Art. 41 inc. d) especificando conductas cotidianas de falta de diligencia como el uso indebido de telefonía celular personal en servicio, fumar en lugares prohibidos o descuido del uniforme como faltas leves."
    },
    {
        "id": "os-leg-m31",
        "difficulty": "media",
        "question": "Si un superior policial presencia o constata una falta cometida por un dependiente y omite intencionalmente sancionarla o elevar las actuaciones:",
        "options": [
            "Incurre en falta grave por incumplimiento del deber de sancionar y falta de control de mando.",
            "Queda exento de responsabilidad disciplinaria si se trata de un subordinado directo.",
            "Comete una mera falta leve de omisión administrativa subsanable.",
            "Ejerce una atribución discrecional que no puede ser revisada por la superioridad."
        ],
        "correctIndex": 0,
        "source": "Decreto Reglamentario N.° 461/15 - Régimen Disciplinario",
        "explanation": "El Decreto 461/15 tipifica expresamente como falta grave la omisión de sancionar o controlar por parte de los mandos superiores frente a conductas antirreglamentarias de subordinados."
    },
    {
        "id": "os-leg-m32",
        "difficulty": "media",
        "question": "¿Cuál es la situación del personal policial en situación de retiro respecto del Régimen Disciplinario de la Ley 12.521?",
        "options": [
            "Continúa sujeto a las prescripciones del régimen disciplinario porque conserva el Estado Policial.",
            "Queda eximido en forma total e irrevocable de cualquier potestad o sanción administrativa.",
            "Solo responde civilmente pero bajo ningún concepto administrativamente.",
            "Pasa a ser juzgado exclusivamente por el fuero civil y comercial ordinario."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 - Ley del Personal Policial, Art. 19 y 39",
        "explanation": "El personal retirado mantiene el Estado Policial (Art. 19), motivo por el cual continúa sujeto a las prescripciones del régimen disciplinario institucional."
    },
    {
        "id": "os-leg-m33",
        "difficulty": "media",
        "question": "¿Cómo está estructurada orgánicamente la Policía de Santa Fe según la Ley Orgánica Policial?",
        "options": [
            "Administrativamente centralizada y funcionalmente descentralizada en unidades territoriales.",
            "Totalmente descentralizada con autonomía política y presupuestaria en cada comisaría.",
            "Centralizada tanto en lo administrativo como en la totalidad de sus despliegues operativos.",
            "Dependiente en forma colegiada de los intendentes municipales de cada departamento."
        ],
        "correctIndex": 0,
        "source": "Ley Orgánica Policial de Santa Fe, Art. 4 y 54",
        "explanation": "Conforme a la Ley Orgánica Policial (Art. 4 y 54), la institución mantiene mando unificado centralizado en el Jefe de Policía y descentralización funcional y operativa en las Unidades Regionales y Direcciones."
    },
    {
        "id": "os-leg-m34",
        "difficulty": "media",
        "question": "¿Cuántos Departamentos integran la Plana Mayor Policial (P.M.P.) de la Provincia de Santa Fe?",
        "options": [
            "Tres (D-1, D-2 y D-3).",
            "Cinco (D-1 Personal, D-2 Informaciones, D-3 Operaciones, D-4 Logística y D-5 Judicial).",
            "Ocho Departamentos ejecutivos.",
            "Diez Unidades Especiales autónomas."
        ],
        "correctIndex": 1,
        "source": "Ley Orgánica Policial de Santa Fe - Estructura de Plana Mayor",
        "explanation": "La Plana Mayor Policial está conformada por 5 Departamentos de planeamiento, control y apoyo técnico: D-1 Personal, D-2 Informaciones, D-3 Operaciones, D-4 Logística y D-5 Judicial."
    },
    {
        "id": "os-leg-m35",
        "difficulty": "media",
        "question": "¿Cuál es la función específica asignada al Departamento Operaciones Policiales (D-3) de la Plana Mayor Policial?",
        "options": [
            "El planeamiento, control y coordinación de las operaciones de seguridad general, tránsito y bomberos.",
            "La liquidación mensual de los sueldos y la compra de suministros y uniformes.",
            "La instrucción sumarial exclusiva de los sumarios administrativos graves.",
            "El reclutamiento de aspirantes y la gestión de licencias médicas del personal."
        ],
        "correctIndex": 0,
        "source": "Ley Orgánica Policial de Santa Fe - Misiones y Funciones del D-3",
        "explanation": "Es la competencia específica asignada al D-3 dentro de la estructura de la Plana Mayor Policial: planeamiento, coordinación y supervisión de operaciones tácticas, seguridad pública, tránsito y bomberos."
    },
    {
        "id": "os-leg-m36",
        "difficulty": "media",
        "question": "¿Qué Departamento de la Plana Mayor Policial se encarga del reclutamiento, régimen disciplinario, licencias y promociones del personal?",
        "options": [
            "D-2 Informaciones Policiales.",
            "D-1 Personal.",
            "D-4 Logística.",
            "D-5 Judicial."
        ],
        "correctIndex": 1,
        "source": "Ley Orgánica Policial de Santa Fe - Misiones y Funciones del D-1",
        "explanation": "El Departamento Personal (D-1) tiene la responsabilidad integral sobre la gestión del talento humano, administración de legajos, licencias, régimen disciplinario y promociones del personal policial."
    },
    {
        "id": "os-leg-m37",
        "difficulty": "media",
        "question": "En la estructura de la organización policial santafesina, ¿cómo se catalogan las Unidades Regionales?",
        "options": [
            "Unidades compuestas territoriales que agrupan a diversas unidades simples (comisarías, subcomisarías y destacamentos).",
            "Unidades simples de ejecución directa sin dependencias subordinadas.",
            "Organismos desconcentrados exclusivamente administrativos sin capacidad de patrullaje.",
            "Entes autárquicos con facultades legislativas en materia de contravenciones."
        ],
        "correctIndex": 0,
        "source": "Ley Orgánica Policial de Santa Fe - Régimen de Unidades Regionales",
        "explanation": "De acuerdo con los conceptos sociológicos y orgánicos aplicados a la función policial, la Unidad Regional es una estructura compuesta de orden público que coordina múltiples dependencias simples de despliegue."
    },
    {
        "id": "os-leg-m38",
        "difficulty": "media",
        "question": "¿Cuáles son los cuatro principios esenciales que rigen el uso de la fuerza policial según la Resolución Ministerial N.° 2237/25?",
        "options": [
            "Rapidez, Letalidad, Oportunidad y Celeridad.",
            "Legalidad, Necesidad, Proporcionalidad y Ética.",
            "Autonomía, Discrecionalidad, Superioridad y Coerción.",
            "Defensa, Ataque, Represión y Retención preventiva."
        ],
        "correctIndex": 1,
        "source": "Resolución Ministerial N.° 2237/25 - Protocolo de Uso Progresivo de la Fuerza",
        "explanation": "Consagrados internacionalmente y en el protocolo provincial (Res. 2237/25), el uso de la fuerza policial debe ajustarse a cuatro principios rectores: Legalidad, Necesidad, Proporcionalidad y Ética."
    },
    {
        "id": "os-leg-m39",
        "difficulty": "media",
        "question": "¿Bajo qué presupuesto excluyente autoriza el Protocolo Ministerial (Res. 2237/25) el empleo del arma de fuego reglamentaria?",
        "options": [
            "Únicamente como recurso extremo y de última ratio ante un peligro inminente de muerte o lesiones gravísimas.",
            "Como primera medida disuasiva para dispersar aglomeraciones o manifestaciones sin violencia física.",
            "Frente a cualquier resistencia pasiva donde el infractor se niegue a exhibir su documento de identidad.",
            "Para detener a un sospechoso que se da a la fuga a pie desarmado sin riesgo vital."
        ],
        "correctIndex": 0,
        "source": "Resolución Ministerial N.° 2237/25, Art. 12",
        "explanation": "El uso de arma de fuego es una medida extrema y de último recurso, admisible únicamente ante peligro inminente de muerte o lesiones graves para el funcionario o terceros."
    },
    {
        "id": "os-leg-m40",
        "difficulty": "media",
        "question": "Para configurar válidamente la situación de Legítima Defensa (Art. 34 inc. 6 CP y Res. 2237/25), deben concurrir simultáneamente los siguientes elementos:",
        "options": [
            "Agresión ilegítima, necesidad racional del medio empleado y falta de provocación suficiente.",
            "Superioridad numérica, uso de armas contundentes y nocturnidad comprobada.",
            "Orden escrita previa del fiscal y advertencia verbal reiterada en tres oportunidades.",
            "Autorización expresa del Director General de Policía o jefe de guardia."
        ],
        "correctIndex": 0,
        "source": "Código Penal de la Nación, Art. 34 inc. 6 y Res. 2237/25",
        "explanation": "Son los tres requisitos normativos indispensables fijados por el Artículo 34 inc. 6 del Código Penal: agresión ilegítima actual o inminente, necesidad racional del medio empleado y falta de provocación suficiente."
    },
    {
        "id": "os-leg-m41",
        "difficulty": "media",
        "question": "¿Cuáles son los tres elementos que deben converger simultáneamente para configurar el 'Peligro Inminente' en la actuación policial?",
        "options": [
            "Oportunidad actual, Capacidad actual e Intención manifiesta del agresor.",
            "Uniforme policial, Arma de fuego cargada y Distancia superior a 50 metros.",
            "Intimidación verbal, Escalamiento nocturno y Fuga a pie por vía pública.",
            "Negativa a identificarse, Portación de mochila cerrada y Resistencia pasiva."
        ],
        "correctIndex": 0,
        "source": "Resolución Ministerial N.° 2237/25 - Protocolo de Uso Progresivo de la Fuerza",
        "explanation": "El peligro inminente requiere la convergencia de tres factores: Oportunidad (tiempo y espacio adecuado), Capacidad (medios y aptitud lesiva del agresor) e Intención manifiesta de atacar."
    },
    {
        "id": "os-leg-m42",
        "difficulty": "media",
        "question": "En el Protocolo de Uso Progresivo de la Fuerza (Res. 2237/25), una persona que omite seguir las indicaciones del agente sin emplear violencia física se clasifica como:",
        "options": [
            "Cooperación Activa.",
            "Resistencia Pasiva.",
            "Ataque Directo.",
            "Resistencia Activa."
        ],
        "correctIndex": 1,
        "source": "Resolución Ministerial N.° 2237/25, Art. 4°",
        "explanation": "El Art. 4° del Protocolo define la resistencia pasiva como la negativa persistente a acatar la orden legítima de la autoridad policial sin ejercer acometimiento o violencia física hacia el actuante."
    },
    {
        "id": "os-leg-m43",
        "difficulty": "media",
        "question": "¿Cuál es el objetivo táctico del armamento de menor letalidad (Taser, Byrna, agentes químicos) según la Resolución Ministerial N.° 2237/25?",
        "options": [
            "Incapacitar temporalmente al agresor neutralizando la amenaza con mínimo riesgo de muerte o daño permanente.",
            "Reemplazar en forma permanente y total la tenencia de armas de fuego reglamentarias en todas las comisarías.",
            "Aplicar un castigo ejemplificador inmediato a personas que profieran agravios verbales al personal policial.",
            "Utilizarse exclusivamente en requisas carcelarias sin autorización para la vía pública."
        ],
        "correctIndex": 0,
        "source": "Resolución Ministerial N.° 2237/25, Art. 10 y 13",
        "explanation": "Conforme al Art. 10 y 13 del Protocolo, el armamento menos letal ofrece una opción intermedia ante resistencias violentas donde el arma de fuego sería desproporcionada, incapacitando temporalmente al agresor."
    },
    {
        "id": "os-leg-m44",
        "difficulty": "media",
        "question": "Si un subordinado recibe una orden manifiesta e indudablemente ilícita que implique el uso ilegítimo de fuerza letal, ¿cuál es su deber legal?",
        "options": [
            "Tiene el deber legal de no cumplirla; la obediencia debida no exime de responsabilidad penal ni administrativa ante órdenes manifiestamente ilegales.",
            "Debe cumplirla de inmediato sin objetar, quedando legalmente deslindado de toda responsabilidad.",
            "Debe solicitar confirmación por escrito ante escribano público para recién cumplirla.",
            "Puede ejecutarla libremente si el superior jerárquico se encuentra presente en el lugar."
        ],
        "correctIndex": 0,
        "source": "Ley 12.521/06 Art. 15 inc. d y Estándares Internacionales de DD.HH.",
        "explanation": "El principio internacional y constitucional establece que no se puede alegar la obediencia debida para justificar usos ilícitos o desproporcionados de la fuerza letal. El subordinado tiene el deber estricto de abstenerse."
    },
    {
        "id": "os-leg-m45",
        "difficulty": "media",
        "question": "¿Qué constituye la 'Asimetría de la Fuerza' según el Artículo 6° del Protocolo Provincial (Res. 2237/25)?",
        "options": [
            "La diferencia de antigüedad en el grado entre dos funcionarios policiales de guardia.",
            "La situación de desventaja competitiva (física, numérica o mediata) del agente que lo habilita a escalar preventivamente la fuerza o solicitar apoyo.",
            "El uso simultáneo de armas de fuego de diferente calibre en un tiroteo.",
            "La intervención operativa conjunta entre la Policía Provincial y fuerzas de seguridad federales."
        ],
        "correctIndex": 1,
        "source": "Resolución Ministerial N.° 2237/25, Art. 6°",
        "explanation": "La asimetría objetiva la situación de vulnerabilidad táctica del agente frente al grupo o sujeto agresor (desventaja numérica o física), autorizándolo a graduar defensivamente su nivel de respuesta o solicitar refuerzos."
    },
    {
        "id": "os-leg-m46",
        "difficulty": "media",
        "question": "Respecto a la advertencia previa e identificación antes de usar el arma de fuego (Res. 2237/25), ¿cuál es la prescripción obligatoria?",
        "options": [
            "Debe identificarse y dar clara advertencia de su intención de usar el arma, salvo que la demora ponga en peligro inminente la vida.",
            "La advertencia previa es obligatoria en todos los casos sin excepción, aun cuando el agresor ya esté disparando.",
            "No existe obligación de dar aviso verbal; el disparo disuasivo al aire reemplaza toda advertencia.",
            "Solo se exige advertencia previa en intervenciones diurnas en zonas céntricas o bancarias."
        ],
        "correctIndex": 0,
        "source": "Resolución Ministerial N.° 2237/25, Art. 14",
        "explanation": "Es el procedimiento operativo obligatorio establecido en los estándares internacionales y de protocolo: identificarse verbalmente y advertir, salvo que la demora incremente el riesgo letal inminente para sí o terceros."
    },
    {
        "id": "os-leg-m47",
        "difficulty": "media",
        "question": "Conforme al Artículo 15 de la Resolución Ministerial N.° 2237/25, ¿cuándo está legalmente justificado el porte de arma con cartucho en recámara?",
        "options": [
            "Bajo condiciones excepcionales y fundadas de riesgo inminente, patrullaje en zonas críticas, custodia especial o agente aislado.",
            "De forma permanente e indiscriminada durante la totalidad de la guardia ordinaria y tareas de oficina.",
            "En ningún caso; está penalizado y prohibido bajo cualquier circunstancia operativa por Ley de Armas.",
            "Únicamente cuando el personal esté prestando servicios policiales adicionales privados en bancos."
        ],
        "correctIndex": 0,
        "source": "Resolución Ministerial N.° 2237/25, Art. 15",
        "explanation": "El Art. 15 del Protocolo exige condiciones excepcionales específicas (riesgo inminente, zonas de alta peligrosidad, custodia de alto valor o agente aislado) debiendo fundarse documentalmente la medida."
    },
    {
        "id": "os-leg-m48",
        "difficulty": "media",
        "question": "Tras un procedimiento policial donde hubo empleo de arma de fuego con personas lesionadas, ¿cuáles son los deberes inmediatos del personal actuante?",
        "options": [
            "Procurar asistencia médica urgente a los heridos, notificar al Fiscal del MPA y elevar informe pormenorizado.",
            "Retirarse del lugar de inmediato y esperar citación judicial antes de elaborar cualquier acta.",
            "Secuestrar únicamente las pertenencias de los heridos sin resguardar las vainas servidas.",
            "Entregar el armamento al jefe de turno sin asentar las circunstancias en el libro de guardia."
        ],
        "correctIndex": 0,
        "source": "Resolución Ministerial N.° 2237/25 y CPP Ley 12.734",
        "explanation": "El deber de cuidado e informe posterior resulta un mandato legal estricto: prestar asistencia médica inmediata, dar comunicación al Ministerio Público de la Acusación y confeccionar acta detallada."
    },
    {
        "id": "os-leg-m49",
        "difficulty": "media",
        "question": "En materia de Derechos Humanos (Código de Conducta para Funcionarios de la ONU, Art. 5), la prohibición de la tortura y tratos crueles, inhumanos o degradantes:",
        "options": [
            "Es absoluta e incondicional; no admite justificación alguna por estado de conmoción pública ni orden de superiores.",
            "Admite excepciones justificadas en casos de delitos graves de narcotráfico o terrorismo.",
            "Queda suspendida temporalmente durante allanamientos nocturnos de urgencia.",
            "Solo rige para personal de comisarías, exceptuando a unidades tácticas de choque."
        ],
        "correctIndex": 0,
        "source": "Código de Conducta para Funcionarios de la ONU, Art. 5 y LPP 12.521",
        "explanation": "El Artículo 5 del Código de Conducta de la ONU establece una prohibición imperativa e incondicional que no admite justificación alguna por estado de emergencia, guerra u órdenes de superiores."
    },
    {
        "id": "os-leg-m50",
        "difficulty": "media",
        "question": "En el Cuadro de Niveles de Respuesta de la Res. 2237/25, frente a una agresión clasificada como 'Ataque Directo' con riesgo vital inminente, la respuesta proporcional es:",
        "options": [
            "Presencia disuasiva pasiva sin contacto visual.",
            "Comunicación persuasiva y espera pasiva de refuerzos.",
            "Fuerza defensiva y/o uso de medios potencialmente letales para neutralizar la agresión.",
            "Retiro inmediato del personal policial sin intervención en el suceso."
        ],
        "correctIndex": 2,
        "source": "Resolución Ministerial N.° 2237/25 - Cuadro de Niveles de Respuesta",
        "explanation": "Frente a la acometida violenta o ataque directo que ponga en peligro la vida o integridad física, el agente está legitimado para emplear fuerza defensiva proporcional y medios potencialmente letales para neutralizar la amenaza."
    }
]

print("Total new questions:", len(new_questions))
for i, q in enumerate(new_questions):
    assert len(q["options"]) == 4, f"Q{i+1} options != 4"
    assert len(set(q["options"])) == 4, f"Q{i+1} duplicate options"
    assert q["correctIndex"] in [0, 1, 2, 3], f"Q{i+1} bad correctIndex"
    assert len(q["question"]) > 15, f"Q{i+1} short question"
    assert len(q["source"]) > 5, f"Q{i+1} short source"
    assert len(q["explanation"]) > 10, f"Q{i+1} short explanation"
    assert q["difficulty"] == "media", f"Q{i+1} bad difficulty"
print("All 50 questions validated successfully against schema!")

with open(QUIZ_BANK_PATH, "r", encoding="utf-8") as f:
    content = f.read()

sub_marker = '    ],\n    "subinspector-inspector": ['
idx = content.find(sub_marker)
if idx == -1:
    print("ERROR: marker not found!")
    exit(1)

lines = []
for q in new_questions:
    formatted_q = "        {\n"
    formatted_q += f'            "id": {json.dumps(q["id"])},\n'
    formatted_q += f'            "difficulty": {json.dumps(q["difficulty"])},\n'
    formatted_q += f'            "question": {json.dumps(q["question"], ensure_ascii=False)},\n'
    formatted_q += f'            "options": [\n'
    for opt_idx, opt in enumerate(q["options"]):
        comma = "," if opt_idx < 3 else ""
        formatted_q += f'                {json.dumps(opt, ensure_ascii=False)}{comma}\n'
    formatted_q += f'            ],\n'
    formatted_q += f'            "correctIndex": {q["correctIndex"]},\n'
    formatted_q += f'            "source": {json.dumps(q["source"], ensure_ascii=False)},\n'
    formatted_q += f'            "explanation": {json.dumps(q["explanation"], ensure_ascii=False)}\n'
    formatted_q += "        }"
    lines.append(formatted_q)

insertion_text = ",\n" + ",\n".join(lines)
new_content = content[:idx] + insertion_text + content[idx:]

with open(QUIZ_BANK_PATH, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Successfully inserted {len(new_questions)} questions into oficial-subinspector in {QUIZ_BANK_PATH}!")


