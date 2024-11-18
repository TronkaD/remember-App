import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Configuration de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCICgkw88ApUM7YvTdwvWY3aA6baUyb9Ks",
    projectId: "remember-app-ec31a",
    appId: "445083891185",
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

// Exportation des instances d'authentification et de Firestore
export { auth, db}; 
