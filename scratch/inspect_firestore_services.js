const https = require('https');

async function checkFirestoreViaREST() {
    console.log("=== FIRESTORE REST API INSPETION ===");
    // Fetch Firestore documents via REST API
    const url = "https://firestore.googleapis.com/v1/projects/adicionales-santa-fe/databases/(default)/documents/services?pageSize=300";
    
    https.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(body);
                if (json.documents) {
                    console.log(`Found ${json.documents.length} docs in Firestore services collection.`);
                    const emailCounts = {};
                    json.documents.forEach(doc => {
                        const fields = doc.fields || {};
                        const em = (fields.userEmail && fields.userEmail.stringValue) || (fields.user_email && fields.user_email.stringValue) || 'unknown';
                        emailCounts[em] = (emailCounts[em] || 0) + 1;
                    });
                    console.log("Firestore Services per email:", emailCounts);
                } else {
                    console.log("Firestore REST response:", json);
                }
            } catch (e) {
                console.error("Parse error:", e);
            }
        });
    }).on('error', err => console.error("Request error:", err));
}

checkFirestoreViaREST();
