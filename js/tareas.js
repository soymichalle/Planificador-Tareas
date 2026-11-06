import { Tarea } from "./clases/Tarea.js";
import { GestorTareas } from "./clases/GestorTareas.js";

// * Instanciamos nuestro gestor
export const gestor = new GestorTareas();

// * Datos de prueba
const tarea1 = new Tarea(
    1,
    "Estudiar JavaScript",
    "Repasar eventos del DOM",
    "Estudio",
    "2026-11-06",
    "Diaria"
);

const tarea2 = new Tarea(
    2,
    "Actualizar portafolio",
    "Mejorar sección de contacto",
    "Personal",
    "2026-11-04",
    "Semanal"
);

// * Agregamos las tareas al gestor
gestor.agregarTarea(tarea1);
gestor.agregarTarea(tarea2);


// * Referencia al contenedor
const contenedor = document.getElementById("contenedor-tareas");

// * Renderizar cards
export function renderizarTareas() {

    const tareas = gestor.obtenerTareas();

    contenedor.innerHTML = tareas.map(tarea => {

        const estado = tarea.estado === "completada"
            ? "Completada"
            : tarea.estaVencida()
                ? "Vencida"
                : "Pendiente";

        return `
            <div class="col py-3">
                <div class="card contenedor h-100">
                    <div class="card-body">

                        <span>${estado}</span>

                        <h5 class="card-title mt-3">
                            ${tarea.titulo}
                        </h5>

                        <p class="card-text">
                            ${tarea.descripcion}
                        </p>

                        <p>Fecha: ${tarea.fecha}</p>
                        <p>Categoría: ${tarea.categoria}</p>
                        <p>Frecuencia: ${tarea.frecuencia}</p>

                    </div>
                </div>
            </div>
        `;

    }).join("");

}

// * Primera renderización
renderizarTareas();