/**
 * Adicionales Santa Fe - Calculador de Sueldo PRO
 */

function renderSueldoPRO(container) {
    if (!container) container = document.getElementById('app');

    const jerarquias = [
        { label: 'Oficial', basico: 170025, suplementos: 600000 },
        { label: 'Subinspector', basico: 302986, suplementos: 650000 },
        { label: 'Inspector', basico: 408061, suplementos: 700000 },
        { label: 'Subcomisario', basico: 450000, suplementos: 750000 },
        { label: 'Comisario', basico: 1123106, suplementos: 800000 },
        { label: 'Comisario Supervisor', basico: 1179261, suplementos: 850000 },
        { label: 'Subdirector', basico: 1403882, suplementos: 900000 },
        { label: 'Director', basico: 1700463, suplementos: 950000 },
        { label: 'Director General', basico: 2039350, suplementos: 1000000 }
    ];

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="router.navigateTo('#asistente')" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-sm font-black text-white leading-none">Calculador de Sueldo PRO</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Escalas 2026 (Dec 0411)</span>
            </div>
        </header>

        <main class="p-6 space-y-6 pb-32 max-w-md mx-auto view-transition">
            <div class="glass-card p-6 rounded-3xl border border-white/5 space-y-5">
                <!-- Jerarquía -->
                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Jerarquía / Grado</label>
                    <select id="sueldo-jerarquia" onchange="window._updateSueldoPRO()" 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                        ${jerarquias.map(j => `<option value="${j.basico}" data-sup="${j.suplementos}">${j.label}</option>`).join('')}
                    </select>
                </div>

                <!-- Antigüedad -->
                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Años de Antigüedad</label>
                    <input type="number" id="sueldo-antiguedad" value="5" min="0" max="40" oninput="window._updateSueldoPRO()"
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none transition-all">
                </div>

                <!-- Adicionales de este mes -->
                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Adicionales Liquidados ($)</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                        <input type="number" id="sueldo-adicionales" value="450000" oninput="window._updateSueldoPRO()"
                            class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-8 text-sm text-white focus:ring-1 focus:ring-primary outline-none transition-all">
                    </div>
                    <p class="text-[9px] text-slate-500 px-1 italic">Este valor lo podés ver en tu sección "Caja" de la App.</p>
                </div>

                <div class="pt-4 border-t border-white/5 space-y-4">
                    <div class="flex justify-between items-center px-1">
                        <span class="text-xs text-slate-400">Neto Bolsillo Estimado</span>
                        <span id="sueldo-total" class="text-2xl font-black text-primary">$ 0,00</span>
                    </div>
                    
                    <div class="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                        <div class="flex justify-between text-[10px]">
                            <span class="text-slate-500">Sueldo Básico + Supl.</span>
                            <span id="sueldo-base-display" class="text-slate-300">$ 0</span>
                        </div>
                        <div class="flex justify-between text-[10px]">
                            <span class="text-slate-500">Plus Antigüedad (2% p/año)</span>
                            <span id="sueldo-ant-display" class="text-slate-300">$ 0</span>
                        </div>
                        <div class="flex justify-between text-[10px]">
                            <span class="text-slate-500 text-emerald-500/80">Servicios Adicionales</span>
                            <span id="sueldo-adi-display" class="text-emerald-400">$ 0</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                <span class="material-symbols-outlined text-amber-500 text-sm">info</span>
                <p class="text-[10px] text-amber-200/70 leading-relaxed">
                    Valores aproximados basados en el Decreto 0411/26. No incluye descuentos por aportes previsionales (17%), IAPOS (3.5%) o préstamos personales.
                </p>
            </div>
        </main>
        ${renderBottomNav('asistente')}
    `;

    window._updateSueldoPRO = () => {
        const select = document.getElementById('sueldo-jerarquia');
        const basico = parseFloat(select.value);
        const suplementos = parseFloat(select.options[select.selectedIndex].dataset.sup);
        const antiguedad = parseInt(document.getElementById('sueldo-antiguedad').value) || 0;
        const adicionales = parseFloat(document.getElementById('sueldo-adicionales').value) || 0;

        const montoAnt = basico * 0.02 * antiguedad;
        const totalBase = basico + suplementos;
        const total = totalBase + montoAnt + adicionales;

        document.getElementById('sueldo-total').innerText = formatMoney(total);
        document.getElementById('sueldo-base-display').innerText = formatMoney(totalBase);
        document.getElementById('sueldo-ant-display').innerText = formatMoney(montoAnt);
        document.getElementById('sueldo-adi-display').innerText = formatMoney(adicionales);
    };

    // Initial calc
    window._updateSueldoPRO();
}

window.renderSueldoPRO = renderSueldoPRO;
