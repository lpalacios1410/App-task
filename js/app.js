import { saveTasksToLocalStorage, getTasksFromLocalStorage, initializeTheme } from "../js/storage.js";
import { updateTasksListFilter, updateStats } from "./filters.js";
import  {showAndCloseModal}  from "./ui.js";
import { addAlert, notAddAlert, deleteAlert, editAlert } from "./sweetAlert.js";


const taskInput = document.querySelector('#taskInput'); // Recoge la informacion del input del form
const taskListNode = document.querySelector('#lista') // Este es el nodo de la UL en el html
const tasksCompleted = document.querySelector('#taskNodeCompleted')
const tasksIncompleted = document.querySelector('#taskNodeIncompleted')

export let taskListItems = getTasksFromLocalStorage(); 
initializeTheme();

Sortable.create(taskListNode, {
    group:"shared",
    animation: 500,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    onEnd: () => {
        saveTasksToLocalStorage(taskListItems);
    }
})
Sortable.create(tasksCompleted, {
    group:"shared",
    animation: 500,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    onEnd: () => {
        saveTasksToLocalStorage(taskListItems);
    }
})
Sortable.create(tasksIncompleted, {
    group:"shared",
    animation: 500,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    onEnd: () => {
        saveTasksToLocalStorage(taskListItems);
    }
})
const storage = {
    save: (tasks) => saveTasksToLocalStorage(tasks),
    load: () => getTasksFromLocalStorage()
};

const addTask = () => {
    const textInput = taskInput.value.trim();
    
    if(textInput === '') {
        notAddAlert()
        return;
    } else {
        taskListItems.push({textInput: textInput, completed: false})
        taskInput.value = "";
        updateUI();
        addAlert();
    }
};

const deleteTask = (index) => {
    taskListItems.splice(index, 1);
    updateUI();
    deleteAlert();
}

const editTask = (index) => {
    showAndCloseModal();
    const inputNewTask = document.querySelector('#editTaskInput'); 
    const taskInput = taskListItems[index].textInput;
    inputNewTask.value = taskInput;
    const saveButton = document.querySelector('#saveChanges');
    const closeButton = document.querySelector('#close-modal');
    closeButton.addEventListener("click", showAndCloseModal)
    
    saveButton.addEventListener('click', () =>{
        const newTaskValue = inputNewTask.value;
        taskListItems[index].textInput = newTaskValue;
        updateUI(index, newTaskValue);
        showAndCloseModal();
        editAlert();
    })
};

const toggleTaskCompleted = (index) => {
    taskListItems[index].completed = !taskListItems[index].completed; 
    updateUI();
}

const updateTasksList = (tasks) => {
    taskListNode.innerHTML = '';
    
    tasks.forEach((tasks, index ) => {
        const listItem = document.createElement('li');
        
        listItem.innerHTML = `
        <div class="taskItem" id="${index}">
            <div class="task ${tasks.completed ? 'completed' : ""}">
                <input type="checkbox" class="checkbox" ${tasks.completed ? "checked" : ""} />
                <p class="textTask">${tasks.textInput}</p>
            </div>
            <div class="icons">
                <button class="edit-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        `;
        listItem.addEventListener('change', ()=> toggleTaskCompleted(index))
        listItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
        taskListNode.appendChild(listItem);
    });
};

const updateUI = () => {
    storage.save(taskListItems);
    updateStats(taskListItems);
    updateTasksList(taskListItems);
}

document.querySelector('#newTask').addEventListener('click', function(e){
    e.preventDefault()
    addTask();
})

window.addEventListener('load', () => {
    updateUI();      
});

// document.querySelector('#showAllTask').addEventListener('click', () => {
//     updateTasksList(taskListItems)  
// });
// document.querySelector('#showCompletedTask').addEventListener('click', () => {
//     const resultTask =  updateTasksListFilter('completed');
//     updateTasksList(resultTask);
// });
// document.querySelector('#showIncompletedTask').addEventListener('click', () => {
//     const resultTask =  updateTasksListFilter('incompleted');
//     updateTasksList(resultTask);
// });

