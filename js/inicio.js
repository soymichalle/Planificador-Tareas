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

// * Detectar navegación
window.addEventListener("hashchange", navegar);

// * Mostrar vista inicial
navegar();