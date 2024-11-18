import { getUser } from "./auth.js";
import { changeView, getCurrentRoute } from "./route.js";
import { setLoader } from "./ui-helpers.js";

/**
 * Initialize a router protection on every routes
 */

const initializeProtectionRouterListener = async () => {
   //Enable loader to avoid bad UX if user is already connexted
    setLoader('body-login', true);
    setLoader('body-register', true);

    const user = await getUser();
    const currentRoute = getCurrentRoute();

    if(!user && currentRoute === "board") {
        changeView("login");
    }

    if(user && (currentRoute === "login" || currentRoute === "register")) {
        changeView("board");
    }

    if(user && currentRoute === "board"){
        const boardContentDiv = document.getElementById("body-board");

        if(!boardContentDiv){
            console.error("HTML do not container board");
        }
        boardContentDiv.style.display = "block";
    }

    if(!user && currentRoute === "login") {
        const loginBodyContainer = document.getElementById("body-login");
        if(!loginBodyContainer){
            return;
        }

        const containerFormDiv = loginBodyContainer.firstElementChild;
        containerFormDiv.style = "flex";
        setLoader("body-login", false);
    }

    if(!user && currentRoute === "register"){
        const registerBodyContainer = document.getElementById("body-register");
        if(!registerBodyContainer){
            return;
        }
        const containerFormDiv = registerBodyContainer.firstElementChild;
        containerFormDiv.style = "flex";
        setLoader("body-login", false);
    }

};

export default initializeProtectionRouterListener;