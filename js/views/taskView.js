import { Task } from "../clases/task.js";
import { taskManager } from "../clases/taskManager.js";

// * Instanciamos nuestro gestor
export const gestor = new taskManager();

// * Datos de prueba
const tarea1 = new Task(
    1,
    "Estudiar JavaScript",
    "Repasar eventos del DOM",
    "Estudio",
    "2026-11-06",
    "Diaria",
    "completada" // para pruebas
);

const tarea2 = new Task(
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

// * Renderizar cards en vista tareas
export function renderizarTareas() {

    const tareas = gestor.obtenerTareas();

    contenedor.innerHTML = tareas.map(tarea => {

        const estado = tarea.estado === "completada"
            ? "Completada"
            : tarea.estaVencida()
                ? "Vencida"
                : "Pendiente";

        const colorEstado = tarea.estado == "completada"
            ? "success"
            : tarea.estaVencida()
                ? "danger"
                : "warning";

        const textoBoton = tarea.estado === "completada"
            ? "Desmarcar"
            : "Completar";

        return `
            <div class="col py-3">
                <div class="card contenedor h-100 ${estado}">
                    <div class="card-body">
                        
                    <div class="col-12 py-2">
                    <span class="badge rounded-pill text-bg-${colorEstado}">${estado}</span>
                    </div>

                        <button type="button" class="boton-rosa" data-id="${tarea.id}">${textoBoton}</button>
                        <button type="button" class="boton-beige" data-id="${tarea.id}">Editar</button>


                        <h5 class="card-title mt-3 ${tarea.estado === "completada" ? "texto-completada" : ""}">
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