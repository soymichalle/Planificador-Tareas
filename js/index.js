// * Se importan las clases y módulos necesarios
import { gestor, renderizarTareas } from "./views/taskView.js";
import "./views/calendarView.js"
import "./taskNew.js";

import { cargarCategorias } from "./data/categories.js";
//import { cargarEstados } from "./estados.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    //cargarEstados();
});

// * Lógica próximamente

// * Se definen variables y constantes
let tareas = [];

const enlaces = document.querySelectorAll(".sidebar-link");
const vistas = document.querySelectorAll(".vista");

// * Función para mostrar u ocultar vistas
function navegar() {

    // * Obtener la vista seleccionada
    const id = window.location.hash || "#inicio";

    // * Ocultar todas las vistas
    vistas.forEach(vista => {
        vista.classList.remove("activa");
    });

    // * Mostrar la vista seleccionada
    const vistaActual = document.querySelector(id);

    if (vistaActual && vistaActual.classList.contains("vista")) {
        vistaActual.classList.add("activa");
    }

    // * Actualizar enlace activo
    enlaces.forEach(enlace => {
        enlace.classList.toggle(
            "activo",
            enlace.getAttribute("href") === id
        );
    });

}

// * Eventos

// * Detectar navegación
window.addEventListener("hashchange", navegar);

// * Listener para gestionar las tareas
const contenedorTareas = document.getElementById("contenedor-tareas");

contenedorTareas.addEventListener("click", (event) => {

    // * Marcar y desmarcar tarea
    const botonCompletar = event.target.closest(".boton-completar");

    if (botonCompletar) {

        const tareaId = Number(botonCompletar.dataset.id);

        gestor.completarTarea(tareaId);

        renderizarTareas();

    }

    // * Eliminar tarea
    if (event.target.classList.contains("boton-rojo")) {

        const tareaId = Number(event.target.dataset.id);

        gestor.eliminarTarea(tareaId);

        renderizarTareas();

    }

});

// * Mostrar vista inicial
navegar();