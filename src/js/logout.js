import { disconnectUser } from "./auth.js";
import { changeView } from "./route.js";
import { showAlert } from "./ui-helpers.js";

/**
 * Initialize logout event listener
 */

const initializeLogoutEventListener = () => {
    const disconnectBtn = document.getElementById("logout-btn");

    if (!disconnectBtn) {
        console.warn("disconnect btn not ready");
        return;
    }
    
    disconnectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        disconnectUser()
        .then(() => {
            changeView("login");
        })
        .catch((err) => {
            showAlert("Oups... Erreur lors de la déconnexion");
            console.log(err);
        });
    });
};

export default initializeLogoutEventListener;