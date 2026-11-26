// * Se importan las clases y módulos necesarios
import { notificarExito, notificarError } from "./alertas.js";
import { gestor, renderizarTareas, renderizarResumenTareas } from "./views/taskView.js";

// * Se obtiene el formulario
const formulario = document.querySelector("#formulario-tarea");

// * Variable para identificar si estamos editando
let tareaEnEdicion = null;

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

    return true;

}

// * Cargar información de una tarea para editar
export function prepararEdicion(tareaId) {

    const tarea = gestor.obtenerTareas().find(
        tarea => tarea.id === tareaId
    );

    if (!tarea) {
        return;
    }

    tareaEnEdicion = tareaId;

    document.querySelector("#titulo-tarea").value = tarea.titulo;
    document.querySelector("#descripcion-tarea").value = tarea.descripcion;
    document.querySelector("#categoria-tarea").value = tarea.categoria;
    document.querySelector("#fecha-tarea").value = tarea.fecha;
    document.querySelector("#frecuencia-tarea").value = tarea.frecuencia;

    document.querySelector("#tituloModalTarea").textContent = "Editar tarea";

    const modal = bootstrap.Modal.getOrCreateInstance(
        document.querySelector("#modalNuevaTarea")
    );

    modal.show();
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

    // * Crear o editar tarea
    if (tareaEnEdicion !== null) {

        const actualizacionExitosa = gestor.editarTarea(
            tareaEnEdicion,
            datosTarea
        );

        if (!actualizacionExitosa) {
            notificarError("No se encontró la tarea que deseas editar.");
            return;
        }

        notificarExito("Tarea actualizada correctamente");

        tareaEnEdicion = null;

    } else {

        gestor.agregarTarea(datosTarea);

        notificarExito("Tarea creada correctamente");

    }

    // * Actualizar las tarjetas
    renderizarTareas();
    renderizarResumenTareas();

    // * Limpiar formulario
    formulario.reset();

    // * Restaurar título del modal
    document.querySelector("#tituloModalTarea").textContent = "Nueva tarea";

    // * Cerrar modal después de guardar correctamente
    bootstrap.Modal.getOrCreateInstance(
        document.querySelector("#modalNuevaTarea")
    ).hide();

});