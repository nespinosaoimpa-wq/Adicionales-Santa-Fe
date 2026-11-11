/**
 * Adicionales Santa Fe - Recursos Policiales Data
 * Red de Beneficios TAP, Comercios Amigos, Sponsors y Estampillas Médicas
 */

window.policeResources = {
    tap: {
        lastUpdate: 'Marzo 2026',
        monto: 175682,
        proximoCobroEstimado: 'Último día hábil del mes / primeros días del mes',
        general: [
            { title: 'Supermercados COTO', benefit: '15% de descuento (Lunes y Miércoles)', type: 'Crédito' },
            { title: 'Supermercados DIA', benefit: '30% Reintegro los Martes con MODO', type: 'QR' },
            { title: 'Mayoristas (Makro/Yaguar/Diarco)', benefit: '15-25% Reintegro MODO (Sáb/Dom)', type: 'QR' }
        ],
        departments: {
            'La Capital': [
                { chain: 'Kilbel / Alvear', detail: '25% Reintegro los Viernes con MODO.', category: 'supermarket' },
                { chain: 'Franco Colella', detail: 'Acepta TAP para panadería y cafetería.', category: 'food' },
                { chain: 'Lo de Pancho', detail: 'Acepta TAP en sucursal Bulevar.', category: 'food' },
                { chain: 'Punto Natural', detail: 'Dietética y productos saludables.', category: 'leaf' },
                { chain: 'The Diet (Bv. Gálvez)', detail: 'Productos naturales y sin TACC.', category: 'leaf' },
                { chain: 'Almacén del Norte', detail: 'Acepta TAP para compras diarias.', category: 'store' },
                { chain: 'Carnicerías El Triunfo', detail: 'Cortes seleccionados y embutidos.', category: 'store' },
                { chain: 'El Solar', detail: 'Beneficios Billetera Santa Fe (hasta $20k).', category: 'mall' }
            ],
            'Rosario': [
                { chain: 'La Reina / La Gallega', detail: '10-20% Reintegro diario con Billetera SF.', category: 'supermarket' },
                { chain: 'Supermercados DIA', detail: '30% Descuento los Martes con MODO NBSF.', category: 'supermarket' },
                { chain: 'Supermercados Coto', detail: '15% Descuento Lunes y Miércoles con tarjeta.', category: 'supermarket' }
            ],
            'Castellanos (Rafaela)': [
                { chain: 'La Anónima', detail: '30% Reintegro (Vie/Sáb) MODO NBSF.', category: 'supermarket' },
                { chain: 'Diarco', detail: '15% Descuento (Sáb/Dom) sin tope.', category: 'supermarket' }
            ],
            'Gral. Obligado (Reconquista)': [
                { chain: 'El Súper Reconquista', detail: '30% Reintegro Miércoles (MODO BNA).', category: 'supermarket' },
                { chain: 'Súper Fridays', detail: 'Descuentos hasta el 45% con BNA.', category: 'supermarket' }
            ],
            'Gral. López (Venado)': [
                { chain: 'La Anónima', detail: '30% Reintegro (Vie/Sáb) MODO NBSF.', category: 'supermarket' },
                { chain: 'ICBC MODO', detail: '20% Reintegro los Jueves.', category: 'supermarket' }
            ]
        },
        tips: {
            acceptance: "La TAP usa el código de rubro (MCC). Pasa en Panaderías, Carnicerías y Almacenes (ej. Franco Colella, El Triunfo), pero suele rebotar en cadenas multinacionales de Fast Food por restricción bancaria.",
            cotoMode: "⚠️ CUIDADO EN COTO: Los descuentos de comunidad a veces exigen pasar la tarjeta física. MODO con débito vinculada a veces no aplica el 15% automático.",
            gasStations: "En estaciones de servicio YPF o Shell, usala exclusivamente en el SHOP para refrigerio o café de guardia, NUNCA en el surtidor de combustible."
        }
    },

    // ══════════════════════════════════════════════════════════════
    // RED DE COMERCIOS AMIGOS & SPONSORS POLICIALES
    // Convenios de descuento exclusivos para la Policía de Santa Fe
    // ══════════════════════════════════════════════════════════════
    sponsors: [
        // --- GASTRONOMÍA & VIANDAS DE GUARDIA ---
        {
            id: 'sp-01',
            name: 'Rotisería & Pizzería El Buen Gusto',
            category: 'food',
            categoryLabel: 'Gastronomía & Viandas',
            city: 'Santa Fe (La Capital)',
            address: 'San Jerónimo 1850 (Centro / Barrio Sur)',
            discount: '15% OFF en Viandas de Guardia',
            description: 'Menús calientes, milanesas con guarnición y pizzas. Entrega rápida en comisarías, destacamentos y puestos fijos.',
            accepted: 'Acepta TAP · MODO · Efectivo',
            phone: '342-4591122',
            whatsapp: '5493424591122',
            badge: 'COMERCIO AMIGO ⭐',
            isFeatured: true,
            tier: 'destacado'
        },
        {
            id: 'sp-02',
            name: 'Panadería & Café Franco Colella',
            category: 'food',
            categoryLabel: 'Gastronomía & Viandas',
            city: 'Santa Fe (La Capital)',
            address: 'Bv. Pellegrini y 9 de Julio',
            discount: '10% OFF en Desayunos de Relevo',
            description: 'Cafetería, medialunas, sándwiches de miga y panadería artesanal. Ideal para el relevo de guardia 06:00 hs.',
            accepted: 'Acepta TAP 100% · Débito · QR',
            phone: '342-4523344',
            whatsapp: '5493424523344',
            badge: 'PUNTO TAP OFICIAL 🥖',
            isFeatured: true,
            tier: 'amigo'
        },
        {
            id: 'sp-03',
            name: 'Rotisería La Tradición Pichincha',
            category: 'food',
            categoryLabel: 'Gastronomía & Viandas',
            city: 'Rosario',
            address: 'Jujuy 2340 (Pichincha)',
            discount: '15% OFF para Personal Policial',
            description: 'Viandas caseras abundantes, pastas y minutas para guardias y turnos nocturnos. Delivery a comisarías de UR II.',
            accepted: 'Acepta TAP · Billetera SF · MODO',
            phone: '341-4389900',
            whatsapp: '5493414389900',
            badge: 'COMERCIO AMIGO ⭐',
            isFeatured: true,
            tier: 'destacado'
        },
        {
            id: 'sp-04',
            name: 'Pizzería & Empanadas San Martín',
            category: 'food',
            categoryLabel: 'Gastronomía & Viandas',
            city: 'Castellanos (Rafaela)',
            address: 'Bv. Santa Fe 620',
            discount: '15% OFF en Pedidos de Guardia',
            description: 'Pizzas a la piedra y empanadas criollas. Beneficio para efectivos uniformados o con credencial.',
            accepted: 'Acepta TAP · MODO NBSF',
            phone: '3492-421100',
            whatsapp: '5493492421100',
            badge: 'COMERCIO AMIGO ⭐',
            isFeatured: false,
            tier: 'amigo'
        },

        // --- UNIFORMES, TÁCTICO & ARMERÍAS ---
        {
            id: 'sp-05',
            name: 'Armería & Táctica El Litoral',
            category: 'tactical',
            categoryLabel: 'Táctico & Armería',
            city: 'Santa Fe (La Capital)',
            address: 'San Martín 2780 (Peatonal)',
            discount: '15% OFF en Borcegos y Fundas',
            description: 'Pistoleras termoformadas para Bersa TPR9/Thunder, borcegos tácticos livianos, linternas tácticas, chalecos y correajes.',
            accepted: 'Transferencia · Tarjeta (Cuotas) · Efectivo',
            phone: '342-4558877',
            whatsapp: '5493424558877',
            badge: 'SPONSOR PLATINO 🛡️',
            isFeatured: true,
            tier: 'platino'
        },
        {
            id: 'sp-06',
            name: 'Rosario Táctica Indumentaria',
            category: 'tactical',
            categoryLabel: 'Táctico & Armería',
            city: 'Rosario',
            address: 'San Lorenzo 1420',
            discount: '15% OFF en Uniformes Azul Noche',
            description: 'Pantalones rip-stop anti-desgarro, chombas térmicas operativas, camperas tácticas de abrigo y accesorios reglamentarios.',
            accepted: 'Billetera SF · MODO · 3 Cuotas sin interés',
            phone: '341-4246655',
            whatsapp: '5493414246655',
            badge: 'SPONSOR DESTACADO ⭐',
            isFeatured: true,
            tier: 'destacado'
        },
        {
            id: 'sp-07',
            name: 'Táctica & Polímeros Santa Fe',
            category: 'tactical',
            categoryLabel: 'Táctico & Armería',
            city: 'Santa Fe (La Capital)',
            address: 'Av. Facundo Zuviría 4900',
            discount: '10% OFF en Fundas Nivel II y III',
            description: 'Fundas de retención de seguridad para portación en calle, porta cargadores dobles y mantenimiento preventivo de armamento.',
            accepted: 'Transferencia · Efectivo · Tarjeta',
            phone: '342-4881122',
            whatsapp: '5493424881122',
            badge: 'COMERCIO AMIGO ⭐',
            isFeatured: false,
            tier: 'amigo'
        },

        // --- SUPERMERCADOS & ALIMENTOS TAP ---
        {
            id: 'sp-08',
            name: 'Supermercados COTO',
            category: 'supermarket',
            categoryLabel: 'Supermercados TAP',
            city: 'Santa Fe / Rosario',
            address: 'Sucursales Puerto Santa Fe / Alto Rosario / Centro',
            discount: '15% Descuento Comunidad',
            description: 'Descuento los Lunes y Miércoles con tarjeta de débito/TAP. Presentar DNI en caja.',
            accepted: 'Tarjeta TAP física · MODO Débito',
            phone: '0800-888-2686',
            badge: 'CONVENIO BANCARIO 🛒',
            isFeatured: true,
            tier: 'destacado'
        },
        {
            id: 'sp-09',
            name: 'Cadena Kilbel & Alvear',
            category: 'supermarket',
            categoryLabel: 'Supermercados TAP',
            city: 'Santa Fe (La Capital)',
            address: 'Todas las sucursales de Santa Fe y Santo Tomé',
            discount: '25% Reintegro los Viernes',
            description: 'Abonando con MODO Banco de Santa Fe con tope de reintegro por cuenta.',
            accepted: 'MODO NBSF · TAP Débito',
            phone: '342-4550000',
            badge: 'PROMO SEMANAL 🔥',
            isFeatured: true,
            tier: 'destacado'
        },
        {
            id: 'sp-10',
            name: 'Carnicerías El Triunfo',
            category: 'supermarket',
            categoryLabel: 'Carnicerías & Almacenes',
            city: 'Santa Fe (La Capital)',
            address: 'Aristóbulo del Valle 6100 y sucursales',
            discount: '10% OFF en Cortes Seleccionados',
            description: 'Carnes de primera calidad, pollo y embutidos de elaboración propia. Acepta TAP sin ningún tipo de recargo.',
            accepted: 'Acepta TAP 100% · MODO · Billetera SF',
            phone: '342-4602233',
            whatsapp: '5493424602233',
            badge: 'PUNTO TAP OFICIAL 🥩',
            isFeatured: false,
            tier: 'amigo'
        },

        // --- GIMNASIOS & PREPARACIÓN FÍSICA ISEP ---
        {
            id: 'sp-11',
            name: 'Gimnasio Fuerza & Rendimiento Policial',
            category: 'fitness',
            categoryLabel: 'Gimnasios & Aptitud Física',
            city: 'Santa Fe (La Capital)',
            address: 'Urquiza 2100 (Centro)',
            discount: '25% OFF en Cuota Mensual',
            description: 'Entrenamiento funcional específico para la prueba física del ISEP (resistencia aeróbica 1.500m, fuerza y test de Cooper).',
            accepted: 'Efectivo · Transferencia · Débito',
            phone: '342-4530099',
            whatsapp: '5493424530099',
            badge: 'PREPARADOR ISEP 🏋️',
            isFeatured: true,
            tier: 'destacado'
        },
        {
            id: 'sp-12',
            name: 'Iron Box Entrenamiento Táctico',
            category: 'fitness',
            categoryLabel: 'Gimnasios & Aptitud Física',
            city: 'Rosario',
            address: 'Pellegrini 1800',
            discount: '20% OFF para Efectivos Policiales',
            description: 'Crossfit, acondicionamiento físico de alta intensidad y movilidad articular para soportar el chaleco balístico y guardias largas.',
            accepted: 'Transferencia · Débito · Billetera SF',
            phone: '341-4823311',
            whatsapp: '5493414823311',
            badge: 'COMERCIO AMIGO ⭐',
            isFeatured: false,
            tier: 'amigo'
        },

        // --- AUTOMOTOR & MANTENIMIENTO ---
        {
            id: 'sp-13',
            name: 'Lubricentro & Neumáticos Brigadier',
            category: 'auto',
            categoryLabel: 'Automotor & Lubricentros',
            city: 'Santa Fe (La Capital)',
            address: 'Av. Blas Parera 6500',
            discount: '15% OFF en Service de Aceite y Filtros',
            description: 'Cambio de fluidos, alineación, balanceo y chequeo de tren delantero para vehículos particulares de efectivos en traslado.',
            accepted: 'Efectivo · Transferencia · 3 Cuotas',
            phone: '342-4899988',
            whatsapp: '5493424899988',
            badge: 'COMERCIO AMIGO 🚗',
            isFeatured: false,
            tier: 'amigo'
        }
    ],

    // ══════════════════════════════════════════════════════════════
    // PROGRAMA DE SUMAR COMERCIOS & SPONSORS
    // ══════════════════════════════════════════════════════════════
    sponsorProgram: {
        policeAudience: 'Más de 25.000 efectivos policiales provinciales',
        monthlyTapVolume: 'Más de $4.300 millones en consumo alimentario mensual',
        tiers: [
            {
                name: 'Comercio Amigo',
                price: 'GRATIS',
                benefit: 'Ofrecé un descuento a policías y figurá en la app',
                reach: 'Directorio de comercios por rubro y localidad'
            },
            {
                name: 'Sponsor Destacado',
                price: '$15.000 / mes',
                benefit: 'Logo destacado, badge dorado y presencia en Home',
                reach: 'Más de 10.000 visualizaciones semanales'
            },
            {
                name: 'Sponsor Platino',
                price: '$40.000 / mes',
                benefit: 'Banner VIP en Simulador ISEP y Notificaciones de Guardia',
                reach: 'Máxima exposición en toda la provincia de Santa Fe'
            }
        ],
        whatsappContact: '5493425162372',
        ctaMessage: 'Hola! Quiero sumar mi comercio como Sponsor / Comercio Amigo en la App Adicionales Santa Fe para ofrecer descuentos al personal policial.'
    },

    // ══════════════════════════════════════════════════════════════
    // ESTAMPILLAS MÉDICAS (SANTA FE Y ROSARIO)
    // ══════════════════════════════════════════════════════════════
    estampillas: {
        title: 'Estampillas Médicas (Santa Fe y Rosario)',
        description: 'Puntos oficiales para adquirir estampillas del Colegio de Médicos y Arte de Curar indispensables para justificar carpetas y certificados médicos de guardia.',
        locations: [
            { name: 'Aritoys', address: 'Tucumán e/ San Martín y San Jerónimo (Santa Fe)' },
            { name: 'Librería Junín', address: 'Junín casi 9 de Julio (Cerca Esc. Industrial - Santa Fe)' },
            { name: 'Librería Francia', address: 'Francia y Pje. Irala (Frente Esc. Fátima - Santa Fe)' },
            { name: 'Clínica Verna', address: 'Las Heras y Hernandarias (Santa Fe)' },
            { name: 'Clínica 1 de Mayo', address: '1° de Mayo 3017 (Santa Fe)' },
            { name: 'Kiosco Zeballos', address: 'Zeballos 3484 (Santa Fe)' },
            { name: 'Librería Tomo I', address: 'Mendoza y San José (Frente Sagrado Corazón - Santa Fe)' },
            { name: 'Caja Arte de Curar', address: '25 de Mayo 1867 (Santa Fe)' },
            { name: 'Librería Itatí', address: 'Lavaisse 2665 (Santa Fe)' },
            { name: 'Colegio de Médicos 1ª Circ.', address: '9 de Julio 2464 (Santa Fe)' },
            { name: 'Clínica Infantil Trosero', address: 'Crespo e/ 1° de Mayo y 9 de Julio (Santa Fe)' },
            { name: 'Centro Médico López y Planes', address: 'López y Planes 4575 (Santa Fe)' },
            { name: 'Consultorios San Gerónimo', address: 'Barrio El Pozo - Centro Comercial (Santa Fe)' },
            { name: 'Colegio de Médicos 2ª Circ.', address: 'España 1780 (Rosario)' },
            { name: 'Caja de Médicos Rosario', address: 'Paraguay 550 (Rosario)' }
        ]
    }
};
