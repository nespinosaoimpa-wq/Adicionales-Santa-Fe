/**
 * Adicionales Santa Fe - Register Service View
 */

function renderRegister(container) {
    if (!container) container = document.getElementById('app');
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/20">
            <div class="flex items-center justify-between px-4 h-16">
                <button onclick="router.navigateTo('#agenda')" class="flex items-center text-primary">
                    <span class="material-symbols-outlined text-[28px]">chevron_left</span>
                    <span class="text-lg font-medium">Atrás</span>
                </button>
                <h1 class="text-lg font-semibold absolute left-1/2 -translate-x-1/2 dark:text-slate-900 dark:text-white">Nuevo Servicio</h1>
                <button id="btn-save-top" class="text-primary text-lg font-semibold">Guardar</button>
            </div>
        </header>

        <main class="max-w-md mx-auto px-4 py-6 space-y-6">
            <!-- Details -->
            <section class="space-y-4">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Detalles del Servicio</h2>
                <div class="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
                    <div class="flex items-center p-4 border-b border-slate-200 dark:border-primary/10">
                        <span class="material-symbols-outlined text-primary mr-3">calendar_today</span>
                        <div class="flex-1">
                            <p class="text-xs text-slate-500">Fecha</p>
                            <input id="inp-date" class="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium dark:text-slate-900 dark:text-white" type="date" value="${store.selectedDate || today}"/>
                        </div>
                    </div>
                    <!-- Time Range -->
                    <div class="flex items-center p-4">
                         <span class="material-symbols-outlined text-primary mr-3">schedule</span>
                         <div class="flex-1 grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs text-slate-500">Inicio</p>
                                <input id="inp-start" class="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium dark:text-slate-900 dark:text-white" type="time" value="08:00"/>
                            </div>
                            <div>
                                <p class="text-xs text-slate-500">Fin</p>
                                <input id="inp-end" class="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium dark:text-slate-900 dark:text-white" type="time" value="12:00"/>
                            </div>
                         </div>
                    </div>
                     <div class="px-4 pb-2 text-right">
                        <p class="text-xs font-bold text-primary" id="lbl-hours">4.0 Horas</p>
                     </div>
                </div>
            </section>

            <!-- Categorization -->
            <section class="space-y-4">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Tipo de Servicio</h2>
                
                <!-- Main Type -->
                <div class="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
                    <button id="type-public" class="flex-1 py-2 text-xs font-bold rounded-md bg-white dark:bg-primary shadow-sm dark:text-white transition-all" onclick="setFormType('Public')">Público</button>
                    <button id="type-private" class="flex-1 py-2 text-xs font-bold text-slate-500 dark:text-slate-400" onclick="setFormType('Private')">Privado</button>
                    <button id="type-ospes" class="flex-1 py-2 text-xs font-bold text-slate-500 dark:text-slate-400" onclick="setFormType('OSPES')">OSPES</button>
                </div>
                
                <!-- Sub Type Hidden (Automated) -->
                <div class="hidden" id="subtype-container"></div>

                <div class="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 p-4">
                    <p class="text-xs text-slate-500 mb-2">Ubicación / Notas</p>
                    <input id="inp-location" type="text" placeholder="Ej: Banco Nación" class="w-full bg-transparent border-none p-0 text-base font-medium dark:text-slate-900 dark:text-white focus:ring-0" />
                </div>
            </section>

            <!-- Calculator Section -->
            <section class="space-y-4">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-primary/60 px-1">Tarifa y Cálculo</h2>
                <div class="bg-primary/10 dark:bg-primary/20 border-2 border-primary/30 rounded-2xl p-5 space-y-4">
                    <!-- Price per hour -->
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-slate-600 dark:text-slate-700 dark:text-slate-300">Precio por hora</span>
                        <div class="flex items-center text-primary font-bold">
                            <span class="text-lg">$</span>
                            <input id="inp-rate" class="w-20 bg-transparent border-none p-0 text-right focus:ring-0 text-lg font-bold text-primary" type="number" value="1250"/>
                        </div>
                    </div>
                    
                    <div class="h-px bg-primary/20"></div>
                    
                    <!-- Breakdown -->
                    <div class="space-y-2">
                        <div class="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                            <span id="lbl-calculation">Subtotal (4h × $1250)</span>
                            <span id="txt-subtotal">$5.000,00</span>
                        </div>
                        
                        <!-- Total -->
                        <div class="flex justify-between items-end pt-2">
                            <span class="text-base font-bold text-slate-900 dark:text-white">Pago Estimado</span>
                            <span id="txt-total" class="text-2xl font-black text-primary">$5.000,00</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Action Button -->
            <div class="pt-4 pb-12">
                <button id="btn-save" class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-95">
                    <span class="material-symbols-outlined">check_circle</span>
                    Confirmar Registro
                </button>
                <p class="text-center text-xs text-slate-500 mt-4 px-6">
                    Este registro se incluirá en la liquidación de la quincena actual.
                </p>
            </div>
        </main>
    `;

    // Logic
    let currentType = 'Public';
    let currentSubType = 'Ordinaria';

    const updateSubtypes = () => {
        // Now automated, but we keep the logic to fetch rates
        updateRate();
    };

    window.setFormType = (type) => {
        currentType = type;
        ['Public', 'Private', 'OSPES'].forEach(t => {
            const btn = document.getElementById(`type-${t.toLowerCase()}`);
            if (t === type) {
                btn.className = 'flex-1 py-2 text-xs font-bold rounded-md bg-white dark:bg-primary shadow-sm dark:text-white transition-all';
            } else {
                btn.className = 'flex-1 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 transition-all';
            }
        });
        updateSubtypes();
    };

    window.setSubType = (sub) => {
        currentSubType = sub;
        updateSubtypes();
    };

    const updateRate = () => {
        const rate = store.serviceConfig[currentType][currentSubType];
        document.getElementById('inp-rate').value = rate;
        calculateTotal();
    };

    const calculateHours = () => {
        const start = document.getElementById('inp-start').value;
        const end = document.getElementById('inp-end').value;

        if (start && end) {
            const startDate = new Date(`2000-01-01T${start}`);
            let endDate = new Date(`2000-01-01T${end}`);
            if (endDate < startDate) endDate = new Date(`2000-01-02T${end}`);
            const diff = (endDate - startDate) / (1000 * 60 * 60);
            document.getElementById('lbl-hours').innerText = diff.toFixed(1) + ' Horas';
            return diff;
        }
        return 0;
    };

    const calculateTotal = () => {
        const date = document.getElementById('inp-date').value;
        const start = document.getElementById('inp-start').value;
        const end = document.getElementById('inp-end').value;

        const split = store.calculateHoursSplit(date, start, end);
        const totalHours = split.ord + split.ext;

        // Get rates for current type
        const rates = store.serviceConfig[currentType];
        const ordRate = rates['Ordinaria'];
        const extRate = rates['Extraordinaria'];

        const ordTotal = split.ord * ordRate;
        const extTotal = split.ext * extRate;
        const total = ordTotal + extTotal;

        document.getElementById('lbl-hours').innerText = totalHours.toFixed(1) + ' Horas';

        // Update labels
        let calcText = '';
        if (split.ord > 0 && split.ext > 0) {
            calcText = `Subtotal (${split.ord.toFixed(1)}h Ord × $${ordRate.toLocaleString()} + ${split.ext.toFixed(1)}h Ext × $${extRate.toLocaleString()})`;
        } else if (split.ext > 0) {
            calcText = `Subtotal (${split.ext.toFixed(1)}h Ext × $${extRate.toLocaleString()})`;
        } else {
            calcText = `Subtotal (${split.ord.toFixed(1)}h Ord × $${ordRate.toLocaleString()})`;
        }

        document.getElementById('lbl-calculation').innerText = calcText;
        const formatted = `$${(total || 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('txt-subtotal').innerText = formatted;
        document.getElementById('txt-total').innerText = formatted;

        // El input de rate se mantiene para referencia del usuario del tipo actual pero el cálculo es automático
        document.getElementById('inp-rate').value = (split.ext > 0 && split.ord === 0) ? extRate : ordRate;
    };

    document.getElementById('inp-date').addEventListener('change', calculateTotal);
    document.getElementById('inp-start').addEventListener('change', calculateTotal);
    document.getElementById('inp-end').addEventListener('change', calculateTotal);

    let isSaving = false;
    const saveAction = async () => {
        if (isSaving) return;

        const date = document.getElementById('inp-date').value;
        const start = document.getElementById('inp-start').value;
        const end = document.getElementById('inp-end').value;
        const rate = parseFloat(document.getElementById('inp-rate').value);
        const location = document.getElementById('inp-location').value || (currentType + ' - ' + currentSubType);
        const split = store.calculateHoursSplit(date, start, end);
        const hours = split.ord + split.ext;

        if (hours <= 0) {
            showToast("⚠️ Define un horario válido");
            return;
        }

        const rates = store.serviceConfig[currentType];
        const total = (split.ord * rates['Ordinaria']) + (split.ext * rates['Extraordinaria']);

        try {
            isSaving = true;
            const btn = document.getElementById('btn-save');
            const btnTop = document.getElementById('btn-save-top');

            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Guardando...';
            }
            if (btnTop) btnTop.disabled = true;

            await store.addService({
                date,
                startTime: start,
                endTime: end,
                hours,
                split, // Guardar el desglose
                type: currentType,
                subType: currentSubType,
                location,
                total: total,
                status: 'pending'
            });
            router.navigateTo('#agenda');
        } catch (error) {
            console.error("Error saving service:", error);
            isSaving = false;
            const btn = document.getElementById('btn-save');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Confirmar Registro';
            }
            const btnTop = document.getElementById('btn-save-top');
            if (btnTop) btnTop.disabled = false;
        }
    };

    document.getElementById('btn-save').addEventListener('click', saveAction);
    document.getElementById('btn-save-top').addEventListener('click', saveAction);

    updateSubtypes();
    setFormType('Public');
}
