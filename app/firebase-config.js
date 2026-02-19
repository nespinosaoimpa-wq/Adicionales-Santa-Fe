// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQcFLomEYkLjk9da08u2mAiO49pbpn6wU",
    authDomain: "adicionales-santa-fe.firebaseapp.com",
    projectId: "adicionales-santa-fe",
    storageBucket: "adicionales-santa-fe.firebasestorage.app",
    messagingSenderId: "633828043228",
    appId: "1:633828043228:web:c417d3a92ae07a2e550719"
};

// Initialize Firebase (Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true })
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.warn('Persistence failed: Multiple tabs open');
        } else if (err.code == 'unimplemented') {
            console.warn('Persistence not supported');
        }
    });
const auth = firebase.auth();
const storage = firebase.storage();

console.log("Firebase Connected");
