const InitialDate = document.querySelector('#fecha')
const newDate = new Date();

InitialDate.innerHTML = newDate.toLocaleDateString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'})

export function showAndCloseModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('modal-show');
}

