import { saveTasksToLocalStorage, getTasksFromLocalStorage, initializeTheme } from "../js/storage.js";
import { updateStats } from "./filters.js";
import  {showAndCloseModal}  from "./ui.js";
import { addAlert, notAddAlert, deleteAlert, editAlert } from "./sweetAlert.js";


const taskInput = document.querySelector('#taskInput'); // Recoge la informacion del input del form
const taskListNode = document.querySelector('#lista') // Este es el nodo de la UL en el html
const tasksCompleted = document.querySelector('#taskNodeCompleted')
const tasksIncompleted = document.querySelector('#taskNodeIncompleted')

export let taskListItems = getTasksFromLocalStorage(); 
initializeTheme();

[taskListNode, tasksCompleted, tasksIncompleted].forEach(element => {
    Sortable.create(element, {
        group: "shared",
        animation: 500,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        onEnd: (e) => {

            if (e.from !== e.to) {  // verificamos que se movio a otra lista e.from es la lista inicial
                                    // y e.to es la lista a la cual vamos a mover el elemento
                const itemId = e.item.querySelector('.taskItem').id;
                const itemIndex = parseInt(itemId);
                
                // Verificar el estado basado en la lista de destino
                let newState = false;
                if (e.to.id === 'taskNodeCompleted') {
                    newState = true;
                } else if (e.to.id === 'taskNodeIncompleted') {
                    newState = false;
                } else if ( e.to.id === 'lista'){
                    newState = false;
                }
                
                taskListItems[itemIndex].completed = newState;
                
                const checkbox = e.item.querySelector('.checkbox');
                if (checkbox) {
                    checkbox.checked = newState;
                    
                // Actualizar la clase 'completed' en el texto
                const textElement = e.item.querySelector('.textTask');
                if (textElement) {
                    if (newState) {
                        textElement.parentElement.classList.add('completed');
                    } else {
                        textElement.parentElement.classList.remove('completed');
                    }
                }
                // Actualizar la clase 'incompleted' en el texto
                const elementText = e.item.querySelector('.textTask');
                if (elementText) {
                    if (newState === false) {
                        elementText.parentElement.classList.add('incompleted');
                    } else {
                        elementText.parentElement.classList.remove('incompleted');
                     }
                    }
                }
            }
            // Actualizar la UI y guardar
            updateUI({ save: true, stats: true, tasks: false });
        }
        
    });
});

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
        updateUI({ save: true, stats: true, tasks: true});
        addAlert();
    }
};

const deleteTask = (index) => {
    taskListItems.splice(index, 1);
    updateUI({ save: true, stats: true, tasks: true});
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
        updateUI(index, newTaskValue, { save: true, stats: true, tasks: true});
        showAndCloseModal();
        editAlert();
    })
};

const toggleTaskCompleted = (index) => {
    taskListItems[index].completed = !taskListItems[index].completed; 
    updateUI({ save: true, stats: true, tasks: false});
}

const updateTasksList = (tasks) => {
    taskListNode.innerHTML = '';
    
    tasks.forEach((tasks, index ) => {
        const listItem = document.createElement('li');
        
        listItem.innerHTML = `
        <div class="taskItem" id="${index}">
            <div class="task ${tasks.completed ? 'completed' : ""}">
                <label class="checkbox" ${tasks.completed ? "checked" : ""} />
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

const updateUI = (options = {save: true, stats: true, tasks: true}) => {

    if (options.save) storage.save(taskListItems)
    if (options.stats) updateStats(taskListItems)
    if (options.tasks) updateTasksList(taskListItems)
    
    // storage.save(taskListItems);
    // updateStats(taskListItems);
    // updateTasksList(taskListItems);
}


document.querySelector('#newTask').addEventListener('click', function(e){
    e.preventDefault()
    addTask();
})

window.addEventListener('load', () => {
    updateUI({ save: true, stats: true, tasks: true});      
});


