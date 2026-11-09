// * Se importan las clases y módulos necesarios
import { Task } from "./clases/task.js";
import { gestor, renderizarTareas } from "./views/taskView.js";

// * Se obtiene el formulario
const formulario = document.querySelector("#formulario-tarea");

// * Se obtiene la alerta
const alerta = document.querySelector("#alerta-validacion");

// * Función para validar los campos del formulario
function validFormFieldInput(data) {

    const errores = [];

    if (!data.titulo.trim()) {
        errores.push("El nombre de la tarea es obligatorio.");
    }

    if (!data.descripcion.trim()) {
        errores.push("La descripción es obligatoria.");
    }

    if (!data.fecha) {
        errores.push("Debes seleccionar una fecha.");
    }

    if (!data.estado) {
        errores.push("Debes seleccionar un estado.");
    }

    if (!data.categoria) {
        errores.push("Debes seleccionar una categoría.");
    }

    if (!data.frecuencia) {
        errores.push("Debes seleccionar una frecuencia.");
    }

    return errores;
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
    const errores = validFormFieldInput(datosTarea);

    if (errores.length > 0) {

        alerta.innerHTML = errores.join("<br>");
        alerta.classList.remove("d-none");

        return;
    }

    // * Si los datos son correctos
    alerta.classList.add("d-none");

    // * Se crea una nueva instancia de Tarea
    const tarea = new Task(
        Date.now(),
        datosTarea.titulo,
        datosTarea.descripcion,
        datosTarea.categoria,
        datosTarea.fecha,
        datosTarea.frecuencia,
        datosTarea.estado
    );

    // * Se agrega la tarea al gestor
    gestor.agregarTarea(tarea);

    // * Se comprueba que la tarea fue guardada
    console.log("Tarea creada correctamente:", tarea);
    console.log("Listado de tareas:", gestor.obtenerTareas());

    // * Se actualizan las tarjetas
    renderizarTareas();

    // * Se limpia el formulario
    formulario.reset();
});