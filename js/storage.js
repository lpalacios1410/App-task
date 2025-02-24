export function saveTasksToLocalStorage(ListTask) {
  localStorage.setItem('tasks', JSON.stringify(ListTask));
}

export function getTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
}