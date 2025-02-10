import { saveTasks, getTask } from "../js/storage.js";

const botonAdd = document.querySelector('#enter'); // +
const inputText = document.querySelector('#input'); // input de addtask
const lista = document.querySelector('#lista');

const check = 'fa-circle-check';
const unCheck = 'fa-circle';
const lineConfirm = 'line-confirm';
let LIST = getTask(); 
let id = LIST.length;   


    // ADD TASK FUNCTION
    function addTask(task, id, done, trash) {
        if(trash) {
            return;
        }
    const REALIZADO = done ? check : unCheck;
    const LINE = done ? lineConfirm : '';
    const element = `
                     <li id="element">
                     <i class="fa-regular ${REALIZADO}" data="done" id=${id}></i>
                     <p class="text ${LINE}">${task}</p>
                     <i class="fa-regular fa-trash-can" data="trash" id=${id}></i>
                     </li>
                     `
    lista.insertAdjacentHTML('beforeend', element)
}

    // TASK DONE FUNCTION

    function taskDone(element){
        element.classList.toggle(check);
        element.classList.toggle(unCheck);
        element.parentNode.querySelector('.text').classList.toggle(lineConfirm);
        LIST[element.id].done = LIST[element.id].done ? false : true; 
    }

    // TASK TRASH FUNCTION

    function taskTrash(element){
        element.parentNode.parentNode.removeChild(element.parentNode)
        LIST[element.id].trash = true;
    }

    
    // EVENT LISTENERS
    botonAdd.addEventListener('click', () => {
        const task = inputText.value;
        // console.log('funciona')
        if (task) {
            addTask(task, id, false, false);
            LIST.push({
                nombre: task,
                id: id,
                done: false,
                trash: false
            })
        }
        inputText.value = '';
        id = LIST.length;
        saveTasks(LIST);
    })

    inputText.addEventListener('keyup', function(event){
        
        if (event.key === 'Enter' ){
            const task = inputText.value;
            if (task) {
                addTask(task, id, false, false);
                LIST.push({
                    nombre: task,
                    id: id,
                    done: false,
                    trash: false
                })
            }
            inputText.value = '';
            id = LIST.length;
            saveTasks(LIST);
        }
    })

    lista.addEventListener('click', function(event) {
        const element = event.target;
        const elementData = element.attributes.data.value
        if (elementData === 'done'){
             taskDone(element);
        }
        else if(elementData === 'trash'){
             taskTrash(element);
        }
        saveTasks(LIST);
    });


    window.addEventListener('load', () => {
        LIST.forEach(task => {
            if (!task.trash) {
                addTask(task.nombre, task.id, task.done, task.trash);
            }
        });
    });