/**
 * Sends a re-engagement announcement to all Adicionales Santa Fe users
 * via the Firestore REST API.
 * 
 * This writes to the 'announcements' collection which has public write rules.
 * All connected clients will receive this in real-time via onSnapshot.
 */
const https = require('https');

const message = "📢 ¡SISTEMA 100% RESTABLECIDO! Estuvimos trabajando para mejorar la plataforma. Tu cuenta, servicios y datos están intactos. ¡Ingresá y comprobalo! 🚀";

const data = JSON.stringify({
    fields: {
        message: { stringValue: message },
        type: { stringValue: "success" },
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

console.log('📨 Sending re-engagement announcement to all users...');
console.log('Message:', message);
console.log('');

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        if (res.statusCode === 200) {
            const result = JSON.parse(body);
            console.log('✅ Announcement published successfully!');
            console.log('Document ID:', result.name?.split('/').pop());
            console.log('Timestamp:', result.createTime);
            console.log('');
            console.log('🎯 All connected users will now see the WhatsApp-style notification.');
            console.log('🔔 Users with push permissions will also get a native notification.');
        } else {
            console.log('❌ Failed to publish announcement.');
            console.log('Response:', body);
            console.log('');
            console.log('💡 TIP: If 403 error, deploy Firestore rules first:');
            console.log('   npx firebase-tools deploy --only firestore:rules');
        }
    });
});

req.on('error', (e) => {
    console.error('❌ Network error:', e.message);
});

req.write(data);
req.end();
