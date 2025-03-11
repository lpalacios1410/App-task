// const themeToggle = document.querySelector('#theme-toggle');
// const body = document.body;

// const updateButtonText = (theme) => {
//     themeToggle.textContent = theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
// };


// const savedTheme = localStorage.getItem('theme');
// if (savedTheme) {
//     body.setAttribute('data-theme', savedTheme);
//     updateButtonText(savedTheme);
// }

// themeToggle.addEventListener('click', () => {
//     const currentTheme = body.getAttribute('data-theme');
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
//     body.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme); // Guardar el tema en Local Storage
//     updateButtonText(newTheme);
// });
