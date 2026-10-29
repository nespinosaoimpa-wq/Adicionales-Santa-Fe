// Firebase Configuration
const firebaseConfig = {
    apiKey: atob("QUl6YVN5QVFjRkxvbUVZa0xqazlkYTA4dTJtQWlPNDlwYnBuNndV"),
    authDomain: "adicionales-santa-fe.firebaseapp.com",
    projectId: "adicionales-santa-fe",
    storageBucket: "adicionales-santa-fe.firebasestorage.app",
    messagingSenderId: "633828043228",
    appId: "1:633828043228:web:c417d3a92ae07a2e550719",
    measurementId: "G-Z882W79NHZ"
};

try {
    if (typeof firebase !== 'undefined' && firebase.apps) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        window.db = firebase.firestore();
        window.db.enablePersistence().catch((err) => {
            if (err.code == 'failed-precondition') {
                console.warn('Persistence failed: Multiple tabs open');
            } else if (err.code == 'unimplemented') {
                console.warn('Persistence not supported');
            }
        });
        window.auth = firebase.auth();
        window.storage = firebase.storage();

        // Inicializar Google Analytics para Firebase
        if (typeof firebase.analytics === 'function') {
            try {
                window.analytics = firebase.analytics();
                console.log("Firebase Analytics Connected:", firebaseConfig.measurementId);
            } catch (aErr) {
                console.warn("Analytics init notice (likely offline/local):", aErr);
            }
        }

        console.log("Firebase Connected");
    } else {
        console.error("Critical: Firebase SDK not loaded before firebase-config.js!");
    }
} catch (e) {
    console.error("Firebase init error:", e);
}
