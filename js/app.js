import { saveTasksToLocalStorage, getTasksFromLocalStorage, initializeTheme } from "../js/storage.js";
import { updateTasksListFilter, updateStats } from "./filters.js";
const taskInput = document.querySelector('#taskInput'); // Recoge la informacion del input del form
const taskListNode = document.querySelector('#lista') // Este es el nodo de la UL en el html

export let taskListItems = getTasksFromLocalStorage(); 
initializeTheme();
const addTask = () => {
    const textInput = taskInput.value.trim();
    
    if(textInput === '') {
        alert('No has ingresado ninguna tarea')
    } else {
        taskListItems.push({textInput: textInput, completed: false})
        taskInput.value = "";
        updateTasksList(taskListItems);
        saveTasksToLocalStorage(taskListItems);
        updateStats(taskListItems);
        console.log(taskListItems);
    }
};

const deleteTask = (index) => {
    taskListItems.splice(index, 1);
    updateTasksList(taskListItems);
    saveTasksToLocalStorage(taskListItems);
    updateStats(taskListItems);
    alert   ('Tarea Eliminada; ', index)
}

const editTask = (index) => {

    taskInput.value = taskListItems[index].textInput;
    taskListItems.splice(index, 1);
    updateTasksList(taskListItems);
    saveTasksToLocalStorage(taskListItems);
    updateStats(taskListItems);
   
    // const taskElement = document.getElementById(`task${e}`);
    // const taskText = taskListItems[index].textInput;
    // // taskListItems.splice(index, 1)

    // const editInput = document.createElement('input');
    // editInput.type = 'text';
    // editInput.value = taskText;
    // editInput.classList.add('editar-input');

    // taskElement.querySelector('p').replaceWith(editInput);
    // editInput.focus();

    // editInput.addEventListener('blur', () => {
    //     finishEdit(index, editInput.value);
    // });

    // editInput.addEventListener('keydown', (e) => {
    //     if (e.key === 'Enter') {
    //         finishEdit(index, editInput.value);
    //     }
    // });
    
    // const finishEdit = (index, newText) => {
    //     taskListItems[index].textInput = newText;
    //     updateTasksList(taskListItems);
    //     saveTasksToLocalStorage(taskListItems);
    // }
}

const toggleTaskCompleted = (index) => {
    taskListItems[index].completed = !taskListItems[index].completed; 
    updateTasksList(taskListItems);
    saveTasksToLocalStorage(taskListItems);
    updateStats(taskListItems);
}

const updateTasksList = (tasks) => {
    taskListNode.innerHTML = '';
    
    tasks.forEach((tasks, index ) => {
        const listItem = document.createElement('li');
        
        listItem.innerHTML = `
        <div class="taskItem" id="task${index}">
            <div class="task ${tasks.completed ? 'completed' : ""}">
                <input type="checkbox" class="checkbox" ${tasks.completed ? "checked" : ""} />
                <p class="textTask">${tasks.textInput}</p>
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
        listItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
        taskListNode.appendChild(listItem);
    });
};

document.querySelector('#newTask').addEventListener('click', function(e){
    e.preventDefault()
    
    addTask();
})

window.addEventListener('load', () => {
    const listItem = document.querySelectorAll('.taskItem');
    updateTasksList(taskListItems);

    document.querySelectorAll('.delete-btn').forEach((button)=>{
        button.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.taskItem')
            console.log(taskItem)
            const taskId = taskItem.dataset.taskId;
            deleteTask(taskId)
            updateStats(taskListItems);
        })
    });

    // document.querySelectorAll(".edit-btn").forEach((button) => {
    //     button.addEventListener("click", function (e) {
    //         const taskItem = e.target(".task"); // obtiene la tarea
    //         console.log(taskItem)
    //     });
    // });
            
});
    
    // Listeners para filtrar
    document.querySelector('#showAllTask').addEventListener('click', () => {
        updateTasksList(taskListItems)  
    });
    document.querySelector('#showCompletedTask').addEventListener('click', () => {
        const resultTask =  updateTasksListFilter('completed');
        updateTasksList(resultTask);
    });
    document.querySelector('#showIncompletedTask').addEventListener('click', () => {
        const resultTask =  updateTasksListFilter('incompleted');
        updateTasksList(resultTask);
    });

