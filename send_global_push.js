const https = require('https');

// Announcement payload
const announcementData = {
    message: "📢 ¡SISTEMA 100% RESTABLECIDO Y OPTIMIZADO! Estuvimos trabajando para mejorar la plataforma. Tu cuenta, servicios y registros están totalmente intactos y seguros. ¡Ingresá y comprobá las nuevas mejoras! 🚀",
    type: "success",
    timestamp: new Date().toISOString()
};

console.log("Preparing to publish global announcement to all Firebase users...");
console.log("Message:", announcementData.message);
