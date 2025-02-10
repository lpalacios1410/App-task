
export function saveTasks(LIST) {
    localStorage.setItem('task', JSON.stringify(LIST));
  }

  export function getTask() {
    const saveTasks = localStorage.getItem('task');
    return saveTasks ? JSON.parse(saveTasks) : []; // Devuelve un array vacío si no hay tareas guardadas
  }