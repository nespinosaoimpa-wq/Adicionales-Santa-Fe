const https = require('https');

const data = JSON.stringify({
    fields: {
        message: { stringValue: "📢 ¡SISTEMA RESTABLECIDO Y OPTIMIZADO! La aplicación ha sido actualizada correctamente a la versión v535.7.0." },
        type: { stringValue: "info" },
        timestamp: { stringValue: new Date().toISOString() }
    }
});

const options = {
    hostname: 'firestore.googleapis.com',
    port: 443,
    path: '/v1/projects/adicionales-santa-fe/databases/(default)/documents/announcements',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', body);
    });
});

req.on('error', (e) => {
    console.error('Error sending announcement:', e);
});

req.write(data);
req.end();
