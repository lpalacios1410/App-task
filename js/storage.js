// TASK IN LOCALSTORAGE

export function saveTasksToLocalStorage(ListTask) {
  localStorage.setItem('tasks', JSON.stringify(ListTask));
}

export function getTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
}
 // DARK MODE IN LOCALSTORAGE

 const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

const updateButtonText = (theme) => {
  themeToggle.textContent = theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
};

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateButtonText(savedTheme);
  }
};

export const toggleTheme = () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonText(newTheme);
};

themeToggle.addEventListener('click', toggleTheme);