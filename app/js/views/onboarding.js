/**
 * Adicionales Santa Fe - Onboarding Tour (Mejora 4)
 * Shows a 3-step interactive tutorial for new users.
 */

function showOnboarding() {
    if (localStorage.getItem('onboarding_done_v533')) return;

    const steps = [
        {
            title: '¡Bienvenido a Adicionales SF! 👮',
            text: 'Esta app te ayuda a organizar tus servicios adicionales, calcular tu sueldo extra y controlar tus cobros.',
            icon: 'waving_hand',
            color: 'from-primary to-blue-500'
        },
        {
            title: 'Registrá tus Servicios ✍️',
            text: 'Tocá el botón "+" en la Agenda para anotar un nuevo adicional. La app calcula automáticamente tus horas ordinarias y extraordinarias.',
            icon: 'add_circle',
            color: 'from-emerald-500 to-green-500'
        },
        {
            title: 'Controlá tu Plata 💰',
            text: 'Andá a Estadísticas o Centro de Control para ver cuánto ganaste, qué te deben y exportar reportes en PDF.',
            icon: 'account_balance_wallet',
            color: 'from-amber-500 to-orange-500'
        }
    ];

    let currentStep = 0;

    const overlay = document.createElement('div');
    overlay.id = 'onboarding-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(8px);';

    function renderStep() {
        const step = steps[currentStep];
        const isLast = currentStep === steps.length - 1;
        overlay.innerHTML = `
            <div style="max-width:360px;width:100%;text-align:center;animation:fadeIn 0.3s ease;">
                <div style="width:80px;height:80px;margin:0 auto 24px;border-radius:20px;background:linear-gradient(135deg, var(--tw-gradient-stops));display:flex;align-items:center;justify-content:center;" class="bg-gradient-to-br ${step.color}">
                    <span class="material-symbols-outlined" style="font-size:36px;color:white;">${step.icon}</span>
                </div>
                <h2 style="color:white;font-size:20px;font-weight:800;margin-bottom:12px;font-family:'Public Sans',sans-serif;">${step.title}</h2>
                <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin-bottom:32px;font-family:'Inter',sans-serif;">${step.text}</p>
                <div style="display:flex;justify-content:center;gap:6px;margin-bottom:24px;">
                    ${steps.map((_, i) => `<div style="width:${i === currentStep ? '24px' : '8px'};height:8px;border-radius:4px;background:${i === currentStep ? '#0d59f2' : '#334155'};transition:all 0.3s;"></div>`).join('')}
                </div>
                <div style="display:flex;gap:12px;justify-content:center;">
                    <button onclick="document.getElementById('onboarding-overlay').remove(); localStorage.setItem('onboarding_done_v533','true');" style="padding:12px 24px;border-radius:12px;background:#1e293b;color:#94a3b8;font-size:13px;font-weight:700;border:1px solid #334155;cursor:pointer;">Saltar</button>
                    <button id="onboarding-next-btn" style="padding:12px 32px;border-radius:12px;background:linear-gradient(135deg,#0d59f2,#3b82f6);color:white;font-size:13px;font-weight:700;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(13,89,242,0.3);">${isLast ? '¡Empezar!' : 'Siguiente →'}</button>
                </div>
            </div>
        `;

        document.getElementById('onboarding-next-btn').addEventListener('click', () => {
            if (isLast) {
                localStorage.setItem('onboarding_done_v533', 'true');
                overlay.remove();
            } else {
                currentStep++;
                renderStep();
            }
        });
    }

    renderStep();
    document.body.appendChild(overlay);
}

window.showOnboarding = showOnboarding;
