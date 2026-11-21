// * Se importan las clases y módulos necesarios
import { notificarExito, notificarError } from "./alertas.js";
import { gestor, renderizarTareas } from "./views/taskView.js";

// * Se obtiene el formulario
const formulario = document.querySelector("#formulario-tarea");

// * Se obtiene la alerta
const alerta = document.querySelector("#alerta-validacion");

// * Función para validar los campos del formulario
function validFormFieldInput(data) {


    if (!data.titulo.trim()) {
        return notificarError("Oh-uh! Parece que no has digitado el titulo. Por favor, verifica");
    }
    
    if (!data.fecha) {
        return notificarError("Oh-uh! Parece que no has digitado la fecha. Por favor, verifica");
    }
    
    if (!data.estado) {
        return notificarError("Oh-uh! Parece que no has seleccionado un estado. Por favor, verifica");
    }
    
    if (!data.categoria) {
        return notificarError("Oh-uh! Parece que no has seleccionado una categoria. Por favor, verifica");
    }
    
    if (!data.frecuencia) {
        return notificarError("Oh-uh! Parece que no has seleccionado una frecuencia. Por favor, verifica");
    }

}

// * Se agrega un evento al formulario para capturar los datos y validarlos
formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    // * Se capturan los datos
    const datosTarea = {
        titulo: document.querySelector("#titulo-tarea").value,
        descripcion: document.querySelector("#descripcion-tarea").value,
        categoria: document.querySelector("#categoria-tarea").value,
        estado: document.querySelector("#estado-tarea").value,
        fecha: document.querySelector("#fecha-tarea").value,
        frecuencia: document.querySelector("#frecuencia-tarea").value
    };

    // * Se validan los datos
    const formularioValido = validFormFieldInput(datosTarea);

    if (!formularioValido) {
    return;
}
    // * Se agrega la tarea al gestor
    const tarea = gestor.agregarTarea(datosTarea);

    // * Se comprueba que la tarea fue guardada
    console.log("Tarea creada correctamente:", tarea);
    console.log("Listado de tareas:", gestor.obtenerTareas());

    // * Mensaje de exito
    notificarExito("Se ha guardado la nueva tarea correctamente");

    // * Se actualizan las tarjetas
    renderizarTareas();

    // * Se limpia el formulario
    formulario.reset();

});