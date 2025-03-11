import { taskListItems } from "./app.js";

// Filter tasks completed-incompleted-all tasks
export const updateTasksListFilter = (filtro) =>{
    const TaskCompleted = taskListItems.filter (task => task.completed);
    console.log('Tareas completadas: ',TaskCompleted)
    
    const TaskNotCompleted = taskListItems.filter (task => !task.completed);
    console.log('Tareas incompletas: ',TaskNotCompleted)
    
    let tasksFilter = taskListItems
    
    if(filtro === 'completed') {
        return tasksFilter = TaskCompleted;
    }else if( filtro === 'incompleted'){
        return tasksFilter = TaskNotCompleted;
    }
};

// Update progress Bar

export const updateStats = () =>{
    const TaskCompleted = taskListItems.filter ((task) => task.completed).length;
    const totalTask = taskListItems.length;
    const progress = (TaskCompleted / totalTask) * 100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${TaskCompleted} / ${totalTask}`;

}