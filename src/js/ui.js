import initializeSignupEventListener from "./register.js";
import initializeSignInEventListener from "./login.js";
import initializeProtectionRouterListener from "./middleware.js";
import initializeLogoutEventListener from "./logout.js";
import {initializeDragAndDropColumns, initializeAddNewTaskListers} from "./board.js";
import { loadInitialTasks } from "./tasks.js";

const init = () => {
    initializeProtectionRouterListener();
    initializeSignupEventListener();
    initializeSignInEventListener();
    initializeLogoutEventListener();
    initializeDragAndDropColumns();
    initializeAddNewTaskListers();
    loadInitialTasks();
};
export default init;