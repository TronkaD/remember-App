/**
 * Add a task to the DOM and to the right column
 * @param {string} taskName -- the name of the task
 * @param {string} status -- The status of the task
 * @param {string} taskId -- The id of the task
 * @returns {void}
 */
const addTaskToDOM = (taskName, status, taskId) => {
    const container = document.getElementById(status);
    if(!container){
        console.warn('Container not for status', status);
        return;
    }

    const taskElement = document.createElement('div');
    taskElement.className = 'draggable';
    taskElement.textContent = taskName;
    taskElement.id = taskId;

    container.appendChild(taskElement);
}

/**
 * Set a loader inside the containerId
 * @param{ string} containerId -- The ID of the container to add the loader
 * @param {boolean} isLoading -- wether to show or hide the loader
 * @returns {void}
 */
const setLoader = (containerId, isLoading) => {
    const container = document.getElementById(containerId);
    if(!container) {
        console.error("Container not found. Can not set loader");
        return;
    }
    
    if(isLoading) {
        const loader = document.createElement("div");
        loader.className = "loader";
        container.appendChild(loader);
    }else{
        const loader = container.querySelector(".loader");
        if(loader) {
            loader.remove();
        }
    }
};

/**
 * Show an alert message during 5 seconds 
 * @param {string} message -- The message to show inside the alert
 */
const showAlert = (message) => {
    const alertContainer  = document.getElementById("alert-container");
    const alertMessage = document.querySelector(".alert-message");

    alertMessage.textContent = message;
    alertContainer.style.display = "block";

    setTimeout(() => {
        alertContainer.style.display = "none";
    }, 5000);
};

export {addTaskToDOM, setLoader, showAlert} ;