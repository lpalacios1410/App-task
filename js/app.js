const botonAdd = document.querySelector('#enter'); // +
const inputText = document.querySelector('#input'); // input de addtask
const lista = document.querySelector('#lista');

const check = 'class="fa-regular fa-circle-check"'
const unCheck = 'class="fa-regular fa-circle"'
const lineConfirm = 'line-confirm'
const id = 0;

function AddTask(task, id, done, trash) {

    const element = `<li id="element">
                     <i class="fa fa-check-circle" aria-hidden="true" data="realizado" id="0"></i>
                     <p class="text">${task}</p>
                     <i class="fa-regular fa-trash-can" aria-hidden="true" data="eliminado" id="0"></i>
                     </li>
                     `


    lista.insertAdjacentHTML('beforeend', element)
}
    
    botonAdd.addEventListener('click', () => {
        
        const task = inputText.value;
        // console.log('funciona')
        if (task) {
            AddTask(task, id, false, false);
        }
        inputText.value = '';
    })

    inputText.addEventListener('keyup', function(event){
        
        if (event.key === 'Enter' ){
            const task = inputText.value;
            if (task) {
                AddTask(task);
            }
            inputText.value = '';
        }
    })

