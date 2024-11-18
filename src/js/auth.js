import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "../../firebase-config.js";
import {changeView} from "./route.js";
import { showAlert } from "./ui-helpers.js";

/*
 * Inscription d'un utilisateur
 * @param {String} email -- L'adresse email de l'utilisateur 
 * @param {String} password -- Le mot de passe de l'utilisateur
 * @returns {void}
 */
const signUpUser = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {  // Correction ici
        console.warn("Inscription réussie", userCredential);
        changeView("board");
    })
    .catch((err) => {
        console.log("error", err);
        showAlert("Oups. Inscription echouée...")
    });
   

/**
 * Connexion d'un utilisateur
 * @param {String} email - L'adresse email de l'utilisateur
 * @param {String} password - Le mot de passe de l'utilisateur
 * @returns {void}
 */
const signInUser = (email, password) => 
    signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                changeView("board");
            })
            .catch((err) => {
                console.log("Erreur de connexion", err);
                showAlert("Oups. Connexion echouée...")
            });

/**
 *  Obtient de manière asynchrone l'utilisateur authentifié actuel
 * @returns {Promise<User | null>} -- L'objet utilisateur s'il est connecté, sinon null
*/

const getUser = async () => 
    new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            /* (user) => {
                unsubscribe();
                if(user) {
                    resolve(user);
                }else {
                    resolve(null);
                }
            },
            reject, */
            (user) => {
                unsubscribe(); 
                resolve(user ? user : null);
            },
            (error) => {
                unsubscribe(); 
                reject(error);
            }
        );
    });

    /**
     * Déconnexion de l'utilisateur
     */
    const disconnectUser = () => signOut(auth); 

export { signUpUser, signInUser, getUser, disconnectUser};

