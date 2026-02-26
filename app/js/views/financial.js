/**
 * Adicionales Santa Fe - Financial View
 * Quincenas: 1ra (1-15 cobro el 24), 2da (16-fin cobro el 9 del siguiente)
 */

function renderFinancial(container) {
    if (!container) container = document.getElementById('app');

    // --- QUINCENAL FILTER STATE ---
    if (window._financialFilter === undefined) window._financialFilter = 'q1';

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    // Determine current period automatically
    if (window._financialFilter === undefined) {
        window._financialFilter = currentDay <= 15 ? 'q1' : 'q2';
    }

    const filter = window._financialFilter;

    // --- FILTER SERVICES AND EXPENSES BY PERIOD ---
    const filterByPeriod = (items, dateField = 'date') => {
        return items.filter(item => {
            if (!item[dateField]) return false;
            const d = new Date(item[dateField] + 'T00:00:00');
            const isSameMonth = d.getMonth() === currentMonth && d.getFullYear() === currentYear;
            if (!isSameMonth) return false;
            const day = d.getDate();
            if (filter === 'q1') return day >= 1 && day <= 15;
            if (filter === 'q2') return day >= 16;
            return true; // 'all'
        });
    };

    const periodServices = filter === 'all' ? store.services : filterByPeriod(store.services, 'date');
    const periodExpenses = filter === 'all' ? store.expenses : filterByPeriod(store.expenses, 'date');

    const totalIncome = periodServices.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalExpenses = periodExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const balance = totalIncome - totalExpenses;

    // Payment dates
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let paymentLabel = '';
    if (filter === 'q1') {
        paymentLabel = `Cobro estimado: 24 de ${monthNames[currentMonth]}`;
    } else if (filter === 'q2') {
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        paymentLabel = `Cobro estimado: 9 de ${monthNames[nextMonth]}`;
    } else {
        paymentLabel = 'Mes completo';
    }

    const filterBtnClass = (f) => f === filter
        ? 'flex-1 py-2 text-xs font-bold rounded-lg bg-primary text-white shadow-lg shadow-primary/20'
        : 'flex-1 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors';

    const html = `
        <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 pt-6 pb-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center justify-between w-full">
                    <div class="flex flex-col">
                        <h1 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">Centro de Control</h1>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">${store.user.name}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div onclick="router.navigateTo('#profile')" class="hover:scale-105 transition-transform cursor-pointer">
                            ${renderLogo('medium')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex p-1 bg-slate-200 dark:bg-white/5 rounded-xl gap-1">
                <button onclick="window._financialFilter='q1'; renderFinancial()" class="${filterBtnClass('q1')}">1ra Quincena</button>
                <button onclick="window._financialFilter='q2'; renderFinancial()" class="${filterBtnClass('q2')}">2da Quincena</button>
                <button onclick="window._financialFilter='all'; renderFinancial()" class="${filterBtnClass('all')}">Total Mes</button>
            </div>
            <p class="text-[10px] text-primary/70 font-bold text-center mt-2">${paymentLabel}</p>
        </header>

        <main class="flex-1 px-4 py-6 space-y-6 overflow-y-auto pb-32">
            <!-- Summary Cards -->
            <div class="grid grid-cols-2 gap-4">
                <div class="glass-card p-5 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-2 opacity-10">
                        <span class="material-symbols-outlined text-4xl text-slate-900 dark:text-white">payments</span>
                    </div>
                    <p class="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Adicionales</p>
                    <p class="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">$${(totalIncome || 0).toLocaleString('es-AR')}</p>
                    <p class="text-[10px] text-emerald-400 mt-1">${periodServices.length} servicios</p>
                </div>
                <div class="glass-card p-5 rounded-2xl flex flex-col gap-1 border-red-500/20 bg-red-500/5">
                    <p class="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Total Gastos</p>
                    <p class="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">$${(totalExpenses || 0).toLocaleString('es-AR')}</p>
                    <p class="text-[10px] text-red-400 mt-1">${periodExpenses.length} gastos</p>
                </div>
            </div>

            <!-- Balance Card -->
            <div class="glass-card p-5 rounded-2xl flex items-center justify-between ${balance >= 0 ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}">
                <div>
                    <p class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Balance del Período</p>
                    <p class="text-3xl font-black tracking-tighter ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}">$${Math.abs(balance).toLocaleString('es-AR')}</p>
                    <p class="text-[10px] text-slate-500 mt-1">${balance >= 0 ? 'Superávit' : 'Déficit'}</p>
                </div>
                <span class="material-symbols-outlined text-4xl ${balance >= 0 ? 'text-emerald-500/30' : 'text-red-500/30'}">${balance >= 0 ? 'trending_up' : 'trending_down'}</span>
            </div>

            <!-- Expense Control -->
            <section class="space-y-4">
                 <div class="flex justify-between items-center">
                    <h2 class="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                        <span class="material-symbols-outlined text-primary">account_balance_wallet</span>
                        Control de Gastos
                    </h2>
                </div>

                <!-- Add Expense Inline Form -->
                <div class="glass-card p-4 rounded-2xl space-y-3">
                    <div class="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        ${['Comida', 'Transporte', 'Equipo', 'Comunicación', 'Salud', 'Otros'].map((cat, i) => {
        const icons = { 'Comida': 'restaurant', 'Transporte': 'directions_car', 'Equipo': 'build', 'Comunicación': 'phone_in_talk', 'Salud': 'medical_services', 'Otros': 'more_horiz' };
        const colors = { 'Comida': 'bg-red-500/20 text-red-400', 'Transporte': 'bg-blue-500/20 text-blue-400', 'Equipo': 'bg-purple-500/20 text-purple-400', 'Comunicación': 'bg-green-500/20 text-green-400', 'Salud': 'bg-pink-500/20 text-pink-400', 'Otros': 'bg-amber-500/20 text-amber-400' };
        return '<button onclick="window.selectExpenseCategory(\'' + cat + '\')" id="cat-btn-' + cat + '" class="expense-cat-btn flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ' + (i === 0 ? colors[cat] + ' ring-1 ring-white/20' : 'bg-white/5 text-slate-400') + '"><span class="material-symbols-outlined text-sm">' + icons[cat] + '</span>' + cat + '</button>';
    }).join('')}
                    </div>
                    <div class="flex gap-2">
                        <div class="flex-1 relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                            <input type="number" id="expense-amount" placeholder="Monto" 
                                   class="w-full pl-7 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-sm font-medium placeholder:text-slate-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all">
                        </div>
                        <input type="text" id="expense-desc" placeholder="Descripción (opcional)" 
                               class="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-900 dark:text-white text-sm placeholder:text-slate-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all">
                    </div>
                    <button id="btn-add-expense" onclick="window.submitExpense()" 
                            class="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined text-lg">add_circle</span>
                        Agregar Gasto
                    </button>
                </div>

                 <!-- Expense Chart -->
                 ${periodExpenses.length > 0 ? '<div class="glass-card p-5 rounded-2xl"><canvas id="expenseChart" class="max-h-64"></canvas></div>' : ''}
            </section>

            <!-- Recent Expenses List -->
            <section class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Gastos del Período</h3>
                    ${periodExpenses.length > 0 ? '<span class="text-xs text-slate-500">' + periodExpenses.length + ' gastos</span>' : ''}
                </div>
                <div class="space-y-2">
                    ${periodExpenses.length > 0 ? periodExpenses.slice(0, 20).map(e => {
        const catIcons = { 'Comida': 'restaurant', 'Transporte': 'directions_car', 'Equipo': 'build', 'Comunicación': 'phone_in_talk', 'Salud': 'medical_services', 'Otros': 'more_horiz' };
        const catColors = { 'Comida': 'bg-red-500/10 text-red-400', 'Transporte': 'bg-blue-500/10 text-blue-400', 'Equipo': 'bg-purple-500/10 text-purple-400', 'Comunicación': 'bg-green-500/10 text-green-400', 'Salud': 'bg-pink-500/10 text-pink-400', 'Otros': 'bg-amber-500/10 text-amber-400' };
        const icon = catIcons[e.category] || 'money_off';
        const color = catColors[e.category] || 'bg-red-500/10 text-red-400';
        return '<div class="glass-card p-3 rounded-2xl flex items-center justify-between border-white/5 group">' +
            '<div class="flex items-center gap-3">' +
            '<div class="size-9 rounded-xl ' + color + ' flex items-center justify-center">' +
            '<span class="material-symbols-outlined text-lg">' + icon + '</span>' +
            '</div>' +
            '<div>' +
            '<p class="font-bold text-sm text-slate-900 dark:text-white">' + e.category + '</p>' +
            '<p class="text-[10px] text-slate-500">' + (e.description || '-') + ' • ' + new Date(e.timestamp || e.date).toLocaleDateString() + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="flex items-center gap-3">' +
            '<p class="font-bold text-slate-900 dark:text-white">-$' + (e.amount || 0).toLocaleString('es-AR') + '</p>' +
            '<button onclick="window.deleteExpenseConfirm(\'' + e.id + '\')" class="size-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"><span class="material-symbols-outlined text-lg">delete</span></button>' +
            '</div>' +
            '</div>';
    }).join('') : '<div class="flex flex-col items-center py-8 text-center"><div class="size-14 rounded-full bg-red-500/10 flex items-center justify-center mb-3"><span class="material-symbols-outlined text-2xl text-red-400/40">receipt_long</span></div><p class="text-sm font-semibold text-slate-900 dark:text-white mb-1">Sin gastos en este período</p><p class="text-xs text-slate-400">Usá el formulario arriba para cargar gastos</p></div>'}
                </div>
            </section>
            
             <!-- Refresh / Export -->
             <div class="mt-8 flex justify-center gap-4">
                <button onclick="window.location.reload()" class="text-sm font-bold text-slate-500 flex items-center gap-2 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">refresh</span>
                    Actualizar Datos
                </button>
                <button onclick="store.exportData()" class="text-sm font-bold text-slate-400 flex items-center gap-2 hover:text-slate-900 dark:text-white transition-colors">
                    <span class="material-symbols-outlined">download</span>
                    Descargar CSV
                </button>
             </div>
        </main>
        ${renderBottomNav('financial')}
    `;
    container.innerHTML = html;

    // Expense Chart
    setTimeout(() => {
        const canvas = document.getElementById('expenseChart');
        if (canvas && periodExpenses.length > 0) {
            const expensesByCategory = {};
            periodExpenses.forEach(e => {
                expensesByCategory[e.category] = (expensesByCategory[e.category] || 0) + e.amount;
            });
            const categories = Object.keys(expensesByCategory);
            const amounts = Object.values(expensesByCategory);
            const colorMap = { 'Comida': '#ef4444', 'Transporte': '#3b82f6', 'Equipo': '#8b5cf6', 'Comunicación': '#10b981', 'Salud': '#ec4899', 'Otros': '#f59e0b' };
            const colors = categories.map(cat => colorMap[cat] || '#6b7280');
            if (window.Chart) {
                new Chart(canvas, {
                    type: 'doughnut',
                    data: {
                        labels: categories,
                        datasets: [{ data: amounts, backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 12, weight: 'bold' }, padding: 15, usePointStyle: true, pointStyle: 'circle' } },
                            tooltip: {
                                backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#fff', bodyColor: '#cbd5e1', padding: 12,
                                callbacks: {
                                    label: function (context) {
                                        const value = context.parsed || 0;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        return `${context.label}: $${value.toLocaleString('es-AR')} (${((value / total) * 100).toFixed(1)}%)`;
                                    }
                                }
                            }
                        },
                        cutout: '65%'
                    }
                });
            }
        }
    }, 100);

    // Expense form state
    let selectedCategory = 'Comida';

    window.selectExpenseCategory = (cat) => {
        selectedCategory = cat;
        const catColors = { 'Comida': 'bg-red-500/20 text-red-400', 'Transporte': 'bg-blue-500/20 text-blue-400', 'Equipo': 'bg-purple-500/20 text-purple-400', 'Comunicación': 'bg-green-500/20 text-green-400', 'Salud': 'bg-pink-500/20 text-pink-400', 'Otros': 'bg-amber-500/20 text-amber-400' };
        document.querySelectorAll('.expense-cat-btn').forEach(btn => {
            btn.className = 'expense-cat-btn flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all bg-white/5 text-slate-400';
        });
        const activeBtn = document.getElementById('cat-btn-' + cat);
        if (activeBtn) {
            const color = catColors[cat] || 'bg-amber-500/20 text-amber-400';
            activeBtn.className = 'expense-cat-btn flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ' + color + ' ring-1 ring-white/20';
        }
    };

    window.submitExpense = async () => {
        const amountInput = document.getElementById('expense-amount');
        const descInput = document.getElementById('expense-desc');
        const amount = parseFloat(amountInput.value);
        if (!amount || isNaN(amount) || amount <= 0) {
            showToast('Ingresá un monto válido');
            amountInput.focus();
            return;
        }
        const btn = document.getElementById('btn-add-expense');
        btn.disabled = true;
        btn.textContent = 'Guardando...';
        const success = await store.addExpense(selectedCategory, amount, descInput.value.trim());
        if (success) { amountInput.value = ''; descInput.value = ''; }
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined text-lg">add_circle</span> Agregar Gasto';
    };

    window.deleteExpenseConfirm = (id) => {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6';
        overlay.innerHTML = '<div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up"><div class="flex flex-col items-center text-center"><div class="size-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3"><span class="material-symbols-outlined text-2xl text-red-400">delete_forever</span></div><h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">¿Eliminar gasto?</h3><p class="text-sm text-slate-400 mb-5">Esta acción no se puede deshacer</p><div class="flex gap-3 w-full"><button onclick="this.closest(\'.fixed\').remove()" class="flex-1 py-2.5 bg-white/10 text-slate-900 dark:text-white text-sm font-bold rounded-xl">Cancelar</button><button onclick="store.deleteExpense(\'' + id + '\'); this.closest(\'.fixed\').remove()" class="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl">Eliminar</button></div></div></div>';
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    };
}
