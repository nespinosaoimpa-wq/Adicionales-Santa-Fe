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
const auth = firebase.auth();

console.log("Firebase Connected");
