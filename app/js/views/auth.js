/**
 * Adicionales Santa Fe - Auth Views
 */

function renderLogin(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-background-dark">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <div class="mx-auto size-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/30 mb-6">
                    <span class="material-symbols-outlined text-4xl">security</span>
                </div>
                <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Bienvenido</h2>
                <p class="mt-2 text-sm text-slate-400">Ingresa a tu cuenta para continuar</p>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">

                <!-- Primary Google Login Button -->
                <button onclick="handleGoogleLogin(event)" type="button" class="flex w-full justify-center items-center gap-3 rounded-2xl bg-white/10 dark:bg-white/10 px-4 py-3.5 text-sm font-bold text-white shadow-md border border-white/10 hover:bg-white/20 transition-all active:scale-95">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google">
                    Continuar con Google
                </button>

                <div class="relative my-2">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
                    <div class="relative flex justify-center text-xs"><span class="bg-background-dark px-3 text-slate-400 font-medium">O con tu email o legajo</span></div>
                </div>

                <form class="space-y-4" onsubmit="handleLogin(event)">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Email / Legajo</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="text" autocomplete="username" placeholder="Ej: nespinosa.oimpa" class="block w-full rounded-xl border-0 bg-white/5 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Contraseña <span class="text-xs text-slate-500 font-normal">(Opcional)</span></label>
                            <div class="text-sm">
                                <a href="#" onclick="store.showPasswordReset()" class="font-semibold text-primary hover:text-primary/80">¿Olvidaste tu clave?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Dejá en blanco si entrás por Email/Legajo" class="block w-full rounded-xl border-0 bg-white/5 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                            Ingresar
                        </button>
                    </div>
                </form>

            <div class="mt-8 text-center sm:mx-auto sm:w-full sm:max-w-sm">
                <p class="text-slate-500 text-xs text-center">
                    ¿No tienes cuenta? <a href="#signup" class="text-primary font-bold hover:underline">Regístrate gratis</a>
                </p>

                <div class="mt-6 border-t border-white/5 pt-4 text-center">
                    <p class="text-[10px] text-slate-500 font-mono">v535.10.15 (Suite Asistente Virtual PRO)</p>
                    <div class="mt-4 flex justify-center gap-4 text-[10px] text-slate-400">
                        <a href="#legal/privacy" class="hover:underline">Privacidad</a>
                        <span>•</span>
                        <a href="#legal/terms" class="hover:underline">Términos</a>
                        <span>•</span>
                        <a href="#legal/about" class="hover:underline">Sobre Nosotros</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    window.handleGoogleLogin = (event) => {
        const btn = (event && event.currentTarget) ? event.currentTarget : document.querySelector('button[onclick*="handleGoogleLogin"]');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>';
        }

        store.loginWithGoogle()
            .then(() => {
                showToast("¡Bienvenido!");
            })
            .catch(e => {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '<img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5 inline mr-2">Continuar con Google';
                }
                console.error("Google auth notice:", e);
                showToast("Procesando inicio de sesión con Google...");
            });
    };

    window.handleRecoverByEmail = (e) => {
        if (e) e.preventDefault();
        const email = document.getElementById('email')?.value;
        if (!email) {
            showToast("⚠️ Ingresá tu Email o Legajo en el campo de arriba.");
            document.getElementById('email')?.focus();
            return;
        }
        store.loginByEmail(email);
    };

    window.handleLogin = (e) => {
        e.preventDefault();
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        if (!email || !email.trim()) {
            showToast("⚠️ Por favor ingresá tu Email o Legajo.");
            return;
        }
        if (!password || !password.trim()) {
            store.loginByEmail(email);
        } else {
            store.login(email, password);
        }
    }
}

function renderSignup(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-background-dark">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                 <button onclick="router.navigateTo('#login')" class="absolute top-6 left-6 text-slate-400 hover:text-slate-900 dark:text-white flex items-center gap-1">
                    <span class="material-symbols-outlined">arrow_back</span> Atrás
                </button>
                <div class="mx-auto size-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/30 mb-6">
                    <span class="material-symbols-outlined text-4xl">person_add</span>
                </div>
                <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Crear Cuenta</h2>
                <p class="mt-2 text-sm text-slate-400">Comienza a gestionar tus adicionales hoy</p>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-4" onsubmit="handleSignup(event)">
                    <div class="grid grid-cols-2 gap-4">
                         <div>
                            <label class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Nombre</label>
                            <div class="mt-2">
                                <input id="s-name" name="name" type="text" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                            </div>
                        </div>
                         <div>
                            <label class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Apellido</label>
                            <div class="mt-2">
                                <input id="s-lastname" name="lastname" type="text" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Email</label>
                        <div class="mt-2">
                            <input id="s-email" name="email" type="email" autocomplete="email" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">Contraseña</label>
                        <div class="mt-2">
                            <input id="s-password" name="password" type="password" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-lg shadow-primary/20 mt-6">
                            Crear Cuenta
                        </button>
                    </div>
                </form>

                <div class="mt-10 border-t border-white/5 pt-4 text-center">
                    <div class="flex justify-center gap-4 text-[10px] text-slate-400">
                        <a href="#legal/privacy" class="hover:underline">Privacidad</a>
                        <span>•</span>
                        <a href="#legal/terms" class="hover:underline">Términos</a>
                        <span>•</span>
                        <a href="#legal/about" class="hover:underline">Sobre Nosotros</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    window.handleSignup = (e) => {
        e.preventDefault();
        const email = document.getElementById('s-email').value;
        const password = document.getElementById('s-password').value;
        const name = document.getElementById('s-name').value;
        store.register(email, password, name);
    }
}
