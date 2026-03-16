/**
 * Adicionales Santa Fe - Recursos Policiales Data
 * Beneficios TAP y Estampillas Médicas
 */

window.policeResources = {
    tap: {
        lastUpdate: 'Marzo 2026',
        monto: 175682,
        general: [
            { title: 'Supermercados COTO', benefit: '15% de descuento (Lunes y Miércoles)', type: 'Crédito' },
            { title: 'Mayoristas (Makro/Yaguar)', benefit: '15-25% Reintegro MODO (Sáb/Dom)', type: 'QR' }
        ],
        departments: {
            'La Capital': [
                { chain: 'Kilbel / Alvear', detail: '25% Reintegro los Viernes con MODO.' },
                { chain: 'Franco Colella', detail: 'Acepta TAP para panadería y cafetería.' },
                { chain: 'El Solar', detail: 'Beneficios Billetera Santa Fe (hasta $20k).' }
            ],
            'Rosario': [
                { chain: 'La Reina / La Gallega', detail: '10-20% Reintegro diario con Billetera SF.' },
                { chain: 'Supermercados DIA', detail: '30% Descuento los Martes con MODO NBSF.' }
            ],
            'Castellanos (Rafaela)': [
                { chain: 'La Anónima', detail: '30% Reintegro (Vie/Sáb) MODO NBSF.' },
                { chain: 'Diarco', detail: '15% Descuento (Sáb/Dom) sin tope.' }
            ],
            'Gral. Obligado (Reconquista)': [
                { chain: 'El Súper Reconquista', detail: '30% Reintegro Miércoles (MODO BNA).' },
                { chain: 'Súper Fridays', detail: 'Descuentos hasta el 45% con BNA.' }
            ],
            'Gral. López (Venado)': [
                { chain: 'La Anónima', detail: '30% Reintegro (Vie/Sáb) MODO NBSF.' },
                { chain: 'ICBC MODO', detail: '20% Reintegro los Jueves.' }
            ]
        },
        tips: {
            acceptance: "La TAP usa el código de rubro (MCC). Pasa en Panaderías y Almacenes (ej. Franco Colella), pero suele fallar en Fast Food (ej. McDonald's) o Nafta.",
            gasStations: "En estaciones de servicio, solo usala en el SHOP (Full/Select) para comida, NO para combustible."
        }
    },
    estampillas: {
        title: 'Estampillas Médicas (Santa Fe)',
        locations: [
            { name: 'Aritoys', address: 'Tucumán e/ San Martín y San Jerónimo' },
            { name: 'Librería Junín', address: 'Junín casi 9 de Julio (Cerca Esc. Industrial)' },
            { name: 'Librería Francia', address: 'Francia y Pje. Irala (Frente Esc. Fátima)' },
            { name: 'Clínica Verna', address: 'Las Heras y Hernandarias' },
            { name: 'Clínica 1 de Mayo', address: '1° de Mayo 3017' },
            { name: 'Kiosco Zeballos', address: 'Zeballos 3484' },
            { name: 'Librería Tomo I', address: 'Mendoza y San José (Frente Sagrado Corazón)' },
            { name: 'Caja Arte de Curar', address: '25 de Mayo 1867' },
            { name: 'Librería Itatí', address: 'Lavaisse 2665' },
            { name: 'Colegio de Médicos', address: '9 de Julio 2464' },
            { name: 'Clínica Infantil Trosero', address: 'Crespo e/ 1° de Mayo y 9 de Julio' },
            { name: 'Centro Médico López y Planes', address: 'López y Planes 4575' },
            { name: 'Consultorios San Gerónimo', address: 'Barrio El Pozo (Centro Comercial)' }
        ]
    }
};
