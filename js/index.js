// * Se importan las clases y módulos necesarios
import { gestor, renderizarTareas, renderizarResumenTareas } from "./views/taskView.js";
import "./views/calendarView.js"
import { prepararEdicion } from "./taskNew.js";
import { obtenerFraseDelDia } from "./views/phraseView.js";

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
const contenedorTareas = document.getElementById("contenedor-tareas");
const filtroFrecuencia = document.getElementById("filtroFrecuencia");
const inicio = document.getElementById("inicio");

const frecuencias = {
    "btn-todas": "todas",
    "btn-dia": "Diaria",
    "btn-semana": "Semanal",
    "btn-mes": "Mensual"
};

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

// * Evento para gestionar las cards de tareas
contenedorTareas.addEventListener("click", (event) => {

    // * Marcar y desmarcar tarea
    const botonCompletar = event.target.closest(".boton-completar");

    if (botonCompletar) {

        const tareaId = Number(botonCompletar.dataset.id);

        gestor.completarTarea(tareaId);

        renderizarTareas();
        renderizarResumenTareas();

    }

    // * Editar tarea
    const botonEditar = event.target.closest(".boton-editar");

    if (botonEditar) {

        const tareaId = Number(botonEditar.dataset.id);

        prepararEdicion(tareaId);

        return;
    }

    // * Eliminar tarea
    if (event.target.classList.contains("boton-rojo")) {

        const botonEliminar = event.target.closest(".boton-rojo");

        if (botonEliminar) {
            const tareaId = Number(event.target.dataset.id);
            gestor.eliminarTarea(tareaId);
        }
    }

    renderizarTareas();
    renderizarResumenTareas();

});

// * Evento filtro de frecuencia en vista de tareas
filtroFrecuencia.addEventListener("click", (e) => {

    const boton = e.target.closest("button");

    if (!boton) return;

    const claseBoton = Object.keys(frecuencias).find(clase =>
        boton.classList.contains(clase)
    );

    if (!claseBoton) return;
    
    // * Actualizar estilos de los botones
    const botones = filtroFrecuencia.querySelectorAll("button");

    botones.forEach(boton => {
        boton.classList.remove("boton-rosa");
        boton.classList.add("boton-beige");
    });

    boton.classList.remove("boton-beige");
    boton.classList.add("boton-rosa");

    const frecuencia = frecuencias[claseBoton];
    const tareasFiltradas = gestor.filtrarPorFrecuencia(frecuencia);

    renderizarTareas(tareasFiltradas);

});

// * Evento filtro de frecuencia en vista inicio
inicio.addEventListener("change", (e) => {
    if (!e.target.matches('input[name="frecuencia"]')) return;

    const frecuenciasInicio = {
        diaria: "Diaria",
        semanal: "Semanal",
        mensual: "Mensual"
    };

    const frecuencia = frecuenciasInicio[e.target.id];

    renderizarResumenTareas(frecuencia);
});

obtenerFraseDelDia();

// * Mostrar vista inicial
navegar();

renderizarTareas();
renderizarResumenTareas();