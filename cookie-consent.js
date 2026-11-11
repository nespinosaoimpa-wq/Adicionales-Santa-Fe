/**
 * Adicionales Santa Fe - Cookie Consent Banner Loader
 * Dynamically injects and manages the cookie consent banner on landing pages.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check if consent has already been accepted
    if (localStorage.getItem('cookie_consent_accepted') === 'true') {
        return;
    }

    // Create the banner container
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'fixed bottom-0 left-0 w-full z-[100] transform translate-y-full transition-transform duration-500 ease-out hidden';
    
    // Inject the HTML structure (Tailwind classes matching the landing design)
    banner.innerHTML = `
        <div class="bg-[#101622] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-4 sm:p-6">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex-1 text-sm text-slate-300">
                    <p class="mb-2"><strong>Aviso sobre Cookies y Privacidad</strong></p>
                    <p class="leading-relaxed">
                        Este sitio web utiliza cookies propias y de terceros (como Google AdSense) para analizar nuestro tráfico, mejorar su experiencia y personalizar los anuncios que le mostramos en función de sus hábitos de navegación. 
                        Al pulsar "Aceptar", usted consiente el uso de todas las cookies. Puede consultar nuestra <a href="privacy.html" class="text-primary hover:underline">Política de Privacidad</a> para obtener más información y configurar sus preferencias.
                    </p>
                </div>
                <div class="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                    <a href="privacy.html" class="text-xs font-bold text-slate-400 hover:text-white px-4 py-2 border border-white/10 rounded-xl whitespace-nowrap text-center">Más Información</a>
                    <button id="accept-cookies" class="bg-[#0d59f2] hover:bg-[#0d59f2]/90 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#0d59f2]/20 transition-all active:scale-95 whitespace-nowrap">
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    // Show banner after a slight delay
    setTimeout(() => {
        banner.classList.remove('hidden');
        // Small delay to allow display:block to apply before animating transform
        setTimeout(() => {
            banner.classList.remove('translate-y-full');
        }, 50);
    }, 1000);

    // Click handler to accept cookies
    const acceptBtn = document.getElementById('accept-cookies');
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_accepted', 'true');
        banner.classList.add('translate-y-full');
        setTimeout(() => {
            banner.classList.add('hidden');
            banner.remove();
        }, 500);
    });
});
