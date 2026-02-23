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
                <h2 class="text-3xl font-bold tracking-tight text-white">Bienvenido</h2>
                <p class="mt-2 text-sm text-slate-400">Ingresa a tu cuenta para continuar</p>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                <!-- Google Button -->
                <button onclick="handleGoogleLogin()" class="flex w-full justify-center items-center gap-3 rounded-xl bg-white px-4 py-4 text-base font-semibold text-slate-900 shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6" alt="Google">
                    Continuar con Google
                </button>
                
                <div class="relative">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
                    <div class="relative flex justify-center text-sm"><span class="bg-background-dark px-2 text-slate-500">O con tu email</span></div>
                </div>

                <form class="space-y-4" onsubmit="handleLogin(event)">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-slate-300">Email / Legajo</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 text-slate-300">Contraseña</label>
                            <div class="text-sm">
                                <a href="#" onclick="store.showPasswordReset()" class="font-semibold text-primary hover:text-primary/80">¿Olvidaste tu clave?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-lg shadow-primary/20 active:scale-95">
                            Ingresar
                        </button>
                    </div>
                </form>

            <div class="mt-8 text-center sm:mx-auto sm:w-full sm:max-w-sm">
                <p class="text-slate-500 text-xs text-center">
                    ¿No tienes cuenta? <a href="#signup" class="text-primary font-bold hover:underline">Regístrate gratis</a>
                </p>

                <div class="mt-6 border-t border-white/5 pt-4 text-center">
                    <p class="text-[10px] text-slate-500 font-mono">v2.1.1 (Suite Asistente Virtual PRO)</p>
                </div>
            </div>
        </div>
    `;

    window.handleGoogleLogin = (event) => {
        const btn = event.currentTarget;
        btn.disabled = true;
        btn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mx-auto"></div>';

        store.loginWithGoogle()
            .then(() => {
                showToast("¡Bienvenido!");
            })
            .catch(e => {
                btn.disabled = false;
                btn.innerHTML = '<img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-6 h-6 inline mr-2">Continuar con Google';
                showToast("Error: " + e.message);
            });
    };

    window.handleLogin = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        store.login(email, password);
    }
}

function renderSignup(container) {
    container.innerHTML = `
        <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-background-dark">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                 <button onclick="router.navigateTo('#login')" class="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-1">
                    <span class="material-symbols-outlined">arrow_back</span> Atrás
                </button>
                <div class="mx-auto size-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/30 mb-6">
                    <span class="material-symbols-outlined text-4xl">person_add</span>
                </div>
                <h2 class="text-3xl font-bold tracking-tight text-white">Crear Cuenta</h2>
                <p class="mt-2 text-sm text-slate-400">Comienza a gestionar tus adicionales hoy</p>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-4" onsubmit="handleSignup(event)">
                    <div class="grid grid-cols-2 gap-4">
                         <div>
                            <label class="block text-sm font-medium leading-6 text-slate-300">Nombre</label>
                            <div class="mt-2">
                                <input id="s-name" name="name" type="text" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                            </div>
                        </div>
                         <div>
                            <label class="block text-sm font-medium leading-6 text-slate-300">Apellido</label>
                            <div class="mt-2">
                                <input id="s-lastname" name="lastname" type="text" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium leading-6 text-slate-300">Email</label>
                        <div class="mt-2">
                            <input id="s-email" name="email" type="email" autocomplete="email" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium leading-6 text-slate-300">Contraseña</label>
                        <div class="mt-2">
                            <input id="s-password" name="password" type="password" required class="block w-full rounded-xl border-0 bg-white/5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4">
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-xl bg-primary px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-lg shadow-primary/20 mt-6">
                            Crear Cuenta
                        </button>
                    </div>
                </form>
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
