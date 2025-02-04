const FechaActual = document.querySelector('#fecha')
const Fecha = new Date();
FechaActual.innerHTML = Fecha.toLocaleDateString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'})
