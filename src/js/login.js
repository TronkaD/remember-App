
import { signInUser } from "./auth.js";

/**
 * Initialize signin event listener
 */

const initializeSignInEventListener = () => {
    const formDiv = document.getElementById('signin-form');
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if(!formDiv || !emailElement || !passwordElement){
        console.warn("Signin form not ready");
        return;
    }

    formDiv.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = emailElement.value;
        const password = passwordElement.value;
        signInUser(email, password);
        
    });
};

export default initializeSignInEventListener;