export const addAlert = () => {
    Swal.fire({
        title: 'Tarea Agregada',
        html: 'La tarea fue agregada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        background: '#121212',

        customClass: {
            confirmButton: 'swal-button',
            title: 'swal-title',
            htmlContainer: 'swal-text'
        }
        
        });
}

export const notAddAlert = () =>{
    Swal.fire({
        title: 'No has agregado una tarea',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        background: '#121212',

        customClass: {
            confirmButton: 'swal-button',
            title: 'swal-title',
        }
        
        });
}

export const deleteAlert = ()=>{
    Swal.fire({
        title: 'Tarea eliminada',
        html: 'La tarea fue eliminada correctamente',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        background: '#121212',

        customClass: {
            confirmButton: 'swal-button',
            title: 'swal-title',
            htmlContainer: 'swal-text'
        }
        
        });
}

export const editAlert = () => {
    Swal.fire({
        title: 'Tarea editada',
        html: 'La tarea fue editada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        background: '#121212',

        customClass: {
            confirmButton: 'swal-button',
            title: 'swal-title',
            htmlContainer: 'swal-text'
        }
        
        });
}