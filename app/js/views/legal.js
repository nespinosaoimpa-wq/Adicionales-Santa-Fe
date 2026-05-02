/**
 * Adicionales Santa Fe - Legal Views (Ads Compliance)
 */

function renderPrivacyPolicy(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col bg-background-dark text-slate-100 pb-10">
            <header class="p-6 flex items-center gap-4 bg-background-dark/80 backdrop-blur sticky top-0 z-10 border-b border-white/5">
                <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-white/10 text-slate-400">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 class="text-xl font-bold">Política de Privacidad</h2>
            </header>
            <div class="p-6 space-y-6 max-w-2xl mx-auto prose prose-invert">
                <section>
                    <h3 class="text-primary font-bold">1. Información que recopilamos</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        En Adicionales Santa Fe, la privacidad de nuestros visitantes es de extrema importancia para nosotros. Este documento de política de privacidad describe los tipos de información personal que Adicionales Santa Fe recibe y recopila y cómo se utiliza.
                    </p>
                </section>

                <section>
                    <h3 class="text-primary font-bold">2. Google AdSense y la Cookie de DoubleClick</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Google, como proveedor externo, utiliza cookies para publicar anuncios en Adicionales Santa Fe. El uso de la cookie de DART por parte de Google le permite publicar anuncios a los usuarios en función de su visita a Adicionales Santa Fe y otros sitios en Internet. Los usuarios pueden inhabilitar el uso de la cookie de DART visitando la política de privacidad de la red de contenido y anuncios de Google.
                    </p>
                </section>

                <section>
                    <h3 class="text-primary font-bold">3. Archivos de registro</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Al igual que muchos otros sitios web, Adicionales Santa Fe utiliza archivos de registro. La información dentro de los archivos de registro incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), sello de fecha/hora, páginas de referencia/salida y número de clics para analizar tendencias, administrar el sitio, rastrear el movimiento del usuario alrededor del sitio y recopilar información demográfica.
                    </p>
                </section>

                <section>
                    <h3 class="text-primary font-bold">4. Seguridad</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal cuando ingresa, envía o accede a su información personal.
                    </p>
                </section>
                
                <footer class="pt-10 text-center opacity-50 text-[10px]">
                    Última actualización: Marzo 2026
                </footer>
            </div>
        </div>
    `;
}

function renderTermsAndConditions(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col bg-background-dark text-slate-100 pb-10">
            <header class="p-6 flex items-center gap-4 bg-background-dark/80 backdrop-blur sticky top-0 z-10 border-b border-white/5">
                <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-white/10 text-slate-400">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 class="text-xl font-bold">Términos y Condiciones</h2>
            </header>
            <div class="p-6 space-y-6 max-w-2xl mx-auto prose prose-invert">
                <section>
                    <h3 class="text-primary font-bold">1. Aceptación de los Términos</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Al acceder a este sitio web, usted acepta estar obligado por estos Términos y Condiciones de uso del sitio web, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable.
                    </p>
                </section>

                <section>
                    <h3 class="text-primary font-bold">2. Licencia de Uso</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Adicionales Santa Fe para visualización transitoria personal y no comercial solamente.
                    </p>
                </section>

                <section>
                    <h3 class="text-primary font-bold">3. Exención de Responsabilidad</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        Los materiales en el sitio web de Adicionales Santa Fe se proporcionan "tal cual". Adicionales Santa Fe no ofrece ninguna garantía, expresa o implícita, y por la presente renuncia y niega todas las demás garantías.
                    </p>
                </section>

                <footer class="pt-10 text-center opacity-50 text-[10px]">
                    Última actualización: Marzo 2026
                </footer>
            </div>
        </div>
    `;
}

function renderAboutUs(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col bg-background-dark text-slate-100 pb-10">
            <header class="p-6 flex items-center gap-4 bg-background-dark/80 backdrop-blur sticky top-0 z-10 border-b border-white/5">
                <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-white/10 text-slate-400">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 class="text-xl font-bold">Sobre Nosotros</h2>
            </header>
            <div class="p-6 space-y-6 max-w-2xl mx-auto text-center">
                <div class="mx-auto size-24 bg-primary/20 rounded-3xl flex items-center justify-center text-primary border border-primary/30 mb-6">
                    <span class="material-symbols-outlined text-6xl">verified_user</span>
                </div>
                <h3 class="text-2xl font-bold">Adicionales Santa Fe</h3>
                <p class="text-slate-400 leading-relaxed">
                    Somos una plataforma dedicada a facilitar la gestión de servicios de policía adicional para los efectivos de la Provincia de Santa Fe. Nuestra misión es brindar herramientas tecnológicas que simplifiquen el cálculo, seguimiento y organización de la labor policial.
                </p>
                <div class="pt-6 border-t border-white/5 space-y-2">
                    <p class="text-sm text-slate-500 italic">Contacto para soporte y consultas:</p>
                    <a href="mailto:soporte@adicionalessantafe.com.ar" class="text-primary font-bold">soporte@adicionalessantafe.com.ar</a>
                </div>
            </div>
        </div>
    `;
}
