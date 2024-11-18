import { 
    doc,
    setDoc , 
    collection,
    query,
    where,
    getDocs,
    updateDoc
} from "firebase/firestore";
import { getUser } from "./auth.js";
import { db } from "../../firebase-config.js";
import {addTaskToDOM, setLoader, showAlert} from "./ui-helpers.js";

/**
 * Create a task in Firestore Database
 * @param {string} taskName -- The name of the task
 * @param {string} status -- The status of the task 
 */
const createTask = async (taskName, status) => {
    const user = await getUser();

    if(!user) {
        console.warn("No user loggued in. Can not create task.");
        return;
    }

    const taskId = `${user.uid}_${Date.now()}`;
    const taskRef = doc(db, "tasks", taskId);

    try {
        await setDoc(taskRef, {
            name: taskName,
            status,
            userId: user.uid,
        });
        
    } catch (err) {
        showAlert("Oups impossible de créer la tâche .. Recommencez");
        console.error("was not able to create task", err);
    }
};

/**
 * Load initial tasks for the user
 */
const loadInitialTasks = async () => {
    const board = document.getElementById("board");
    if(!board){
        return;
    }

    setLoader("TODO", true);
    setLoader("DOING", true);
    setLoader("DO", true);
    /** */
    const columnsContainer = document.getElementsByClassName("task-container");
    if(!columnsContainer){
        return;
    }

    const user = await getUser();
    if(!user) {
        console.warn("No user loggued in, Can no retrieve initial tasks.");
        return;
    }

    const tasksCollection = collection(db, "tasks");
    const q = query(tasksCollection, where("userId", "==", user.uid));
    try {
        const querySnapshot = await getDocs(q);
        
        if(!querySnapshot){
            return;
        }
        
        setLoader("TODO", false);
        setLoader("DOING", false);
        setLoader("DO", false);

        querySnapshot.forEach((el) => {
            const document = el.data();
            const taskElement = el.id;

            addTaskToDOM(document.name, document.status, taskElement);
        });
     } catch (err) {
        showAlert("Oups impossible de charger les  tâches .. Recommencez");
        console.log("was not able to load initials tasks.", err);
    }
};

/**
 * Update  STATUS task by taskId
 * @param {string} taskId -- The id of the task
 * @param {string} newStat -- The new status od the task
 * @returns {void}
 */
const UpdateTaskStatus = async (taskId, newStatus) => {
    if(!taskId || !newStatus){
        console.warn('No task ID or Status Provided'); 
        return;
    }

    const taskRef = doc(db, "tasks", taskId);

    try {
        await updateDoc(taskRef, {
            status: newStatus,
        });
    } catch (err) {
        showAlert("Oups impossible de mettre à jour la tâche .. Recommencez");
        console.error("Failed to update task status: ", err);
    }
}
export {loadInitialTasks, createTask, UpdateTaskStatus};