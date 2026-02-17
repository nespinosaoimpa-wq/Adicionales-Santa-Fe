# Adicionales Santa Fe 👮‍♂️📱

Una aplicación web progresiva (PWA) moderna para la gestión de servicios de policía adicional en Santa Fe.

## ✨ Características

-   **Gestión de Agenda**: Calendario interactivo de turnos.
-   **Cálculo Automático**: Tarifas, horas y totales calculados en tiempo real.
-   **Modo Offline**: Funciona sin internet gracias a su Service Worker.
-   **Panel de Control**: Estadísticas financieras y gráficas de ingresos.
-   **Panel de Admin**: Visualización de usuarios activos y métricas globales.
-   **Diseño Premium**: Interfaz estilo iOS con modo oscuro automático.

## 🚀 Instalación y Despliegue

### 1. Clonar y Probar Localmente
Simplemente abre el archivo `index.html` en tu navegador o usa una extensión como "Live Server".

### 2. Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit: Adicionales App Completa"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/adicionales-santa-fe.git
git push -u origin main
```

## 📲 Publicar en Google Play Store (Android)

Para subir esta web como una App nativa a la Play Store, utilizaremos **PWABuilder**.

1.  Sube tu código a GitHub y activa **GitHub Pages** (Settings -> Pages -> Branch: main) para tener una URL pública (ej: `https://tu-usuario.github.io/adicionales-santa-fe`).
2.  Ve a [PWABuilder.com](https://www.pwabuilder.com/).
3.  Ingresa la URL de tu app.
4.  Dale a **"Package for Store"**.
5.  Selecciona **Android**.
6.  Descarga el archivo `.aab` (Android App Bundle).
7.  Sube ese archivo a tu cuenta de Google Play Console.

## 🛠 Tecnologías

-   **Frontend**: HTML5, Vanilla JavaScript.
-   **Estilos**: Tailwind CSS (CDN) + CSS personalizado.
-   **Gráficos**: Chart.js.
-   **Iconos**: Material Symbols & UI Avatars.
-   **Persistencia**: LocalStorage (Simulando Base de Datos).

---
Desarrollado con ❤️ para la Policía de Santa Fe.
