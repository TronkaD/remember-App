import Sortable from 'sortablejs';
import {createTask, UpdateTaskStatus} from './tasks';

/**
 * Initialize Drag & Drop Columns
 */
const initializeDragAndDropColumns = () => {
    const columnsContainers = document.getElementsByClassName("task-container");
    
    if(columnsContainers.length === 0) {
        console.warn("No columns found on the page");
        return;
    }

    const columnsArray = Array.from(columnsContainers);

    columnsArray.map((columnContainer) => 
            new Sortable(columnContainer, {
                animation:150,
                group:"shared",
                onEnd:  (event) => {
                    const originalTaskId = event.item.getAttribute("id");
                    const newStatus = event.to.getAttribute("id");
                    UpdateTaskStatus(originalTaskId, newStatus);
                },
            })
    );
   /*  columnsArray.forEach((columnContainer) => 
        new Sortable(columnContainer, {
            animation: 150,
            group: "shared",
            onEnd: (event) => {
                const originalTaskId = event.item.getAttribute("id");
                const newStatus = event.to.getAttribute("id");
                UpdateTaskStatus(originalTaskId, newStatus)
                    .catch(err => console.error("Error updating task status:", err));
            },
        })
    ); */
};

/**
 * Initialize event listeners for adding new tasks
 */
const initializeAddNewTaskListers = () => {
    const board = document.getElementById("board");

    if(!board){
        console.warn("No board found on the page.");
        return;
    }

    board.addEventListener("click", (event) => {
        const isAddTaskBtn = event.target.classList.contains("add-task-btn");
        if(!isAddTaskBtn) {
            return;
        }
        const columnContainer = event.target.nextElementSibling;
        const columnStatus = columnContainer.getAttribute("id");

        const taskName = prompt("Entrez le contenu de votre tâche ");
        if(taskName) {
            const taskElement = document.createElement("div");

            taskElement.className = "draggable";
            taskElement.textContent = taskName;
            taskElement.setAttribute("id", `task-${Date.now()}`);

            columnContainer.appendChild(taskElement);
            
            // Create the task in the Database Firestore
            createTask(taskName, columnStatus)
        }
    });

};


export {initializeDragAndDropColumns, initializeAddNewTaskListers};