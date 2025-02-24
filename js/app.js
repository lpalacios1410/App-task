import { saveTasksToLocalStorage, getTasksFromLocalStorage } from "../js/storage.js";
const taskInput = document.querySelector('#taskInput');
const TaskList = document.querySelector('#lista')

let ListTask = getTasksFromLocalStorage();

const addTask = () => {
    const textInput = taskInput.value.trim();
    
    if(textInput === '') {
        alert('No has ingresado ninguna tarea')
    } else {
        ListTask.push({ textInput: textInput, completed: false})
        taskInput.value = "";
        updateTasksList();
        saveTasksToLocalStorage(ListTask);
    }
};

const deleteTask = (index) => {
    ListTask.splice(index, 1);
    updateTasksList();
    saveTasksToLocalStorage(ListTask);
}

const editTask = (index) => {
    taskInput.value = ListTask[index].textInput;
    ListTask.splice(index, 1);
    updateTasksList();
    saveTasksToLocalStorage(ListTask);
}

const toggleTaskCompleted = (index) => {
    ListTask[index].completed = !ListTask[index].completed; 
    updateTasksList();
    saveTasksToLocalStorage(ListTask);
}

const updateTasksList= () => {
    TaskList.innerHTML = "";
    
    ListTask.forEach((task, index ) => {
        const listItem = document.createElement('li');
        
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.textInput}</p>
            </div>
            <div class="icons">
                <button class="edit-btn" onClick="editTask(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-btn" onClick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        `;

    listItem.addEventListener('change', ()=> toggleTaskCompleted(index))
    listItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
    listItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
    TaskList.appendChild(listItem);
    });
};
 
document.querySelector('#newTask').addEventListener('click', function(e){
    e.preventDefault()

    addTask();
})

window.addEventListener('load', () => {
    updateTasksList();
});