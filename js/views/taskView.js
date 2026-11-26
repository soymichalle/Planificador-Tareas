import { Task } from "../clases/task.js";
import { taskManager } from "../clases/taskManager.js";

// * Instanciamos nuestro gestor
export const gestor = new taskManager();

// * Datos de prueba
// * Datos iniciales de prueba
if (!localStorage.getItem("planificador_tareas")) {

    gestor.agregarTarea({
        titulo: "Estudiar JavaScript",
        descripcion: "Repasar eventos del DOM",
        categoria: "Estudio",
        fecha: "2026-11-06",
        frecuencia: "Diaria",
        estado: "completada" // para pruebas
    });

    gestor.agregarTarea({
        titulo: "Actualizar portafolio",
        descripcion: "Mejorar sección de contacto",
        categoria: "Personal",
        fecha: "2026-11-04",
        frecuencia: "Semanal"
    });

};

// * Referencia al contenedor
const contenedor = document.getElementById("contenedor-tareas");

// * Renderizar cards en vista tareas
export function renderizarTareas(tareasAMostrar = gestor.obtenerTareas()) {

    const tareas = tareasAMostrar;
    const contenedor = document.getElementById("contenedor-tareas");

    if (gestor.tareas.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <div class="card contenedor h-100">
                    <div class="card-body">
                        <h5>¡No tienes tareas pendientes!</h5>
                        <p>¡Qué juicioso! ¿Creamos una nueva para empezar?</p>
                        <button type="button" class="boton-rosa" data-bs-toggle="modal" data-bs-target="#modalNuevaTarea">
                            <span class="material-symbols-outlined">add_circle</span>
                            Añadir nueva tarea
                        </button>
                    </div>
                </div>
            </div>
        `;
        return;
    }

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

                        <button type="button" class="boton-rosa boton-completar" data-id="${tarea.id}">${textoBoton}</button>
                        <button type="button" class="boton-beige boton-editar" data-id="${tarea.id}">Editar</button>
                        <button type="button" class="boton-rojo" data-id="${tarea.id}">Eliminar</button>

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

// * Renderizar resumen de tareas en inicio
export function renderizarResumenTareas(frecuencia = "todas") {

    const contenedorResumen = document.getElementById("resumen-tareas");

    const tareasPendientes = gestor.obtenerTareas()
        .filter(tarea => frecuencia === "todas" || tarea.frecuencia === frecuencia)
        .filter(tarea => tarea.estado !== "completada")
        .slice(0, 3);

    if (tareasPendientes.length === 0) {

        contenedorResumen.innerHTML = `
            <div class="col-12 text-center py-4">
                <h5>¡Todo al día! 🎉</h5>
                <p>No tienes tareas pendientes. ¡Disfruta tu tranquilidad!</p>
            </div>
        `;

        return;
    }

    contenedorResumen.innerHTML = tareasPendientes.map(tarea => {

        const vencida = tarea.estaVencida();

        const estado = vencida ? "Vencida" : "Pendiente";

        const colorEstado = vencida ? "danger" : "warning";

        return `
            <div class="col-12">
                <div class="card contenedor">
                    <div class="card-body">

                        <span class="badge text-bg-${colorEstado}">
                            ${estado}
                        </span>

                        <h5 class="card-title mt-2">
                            ${tarea.titulo}
                        </h5>

                        <p class="card-text">
                            ${tarea.descripcion}
                        </p>

                        <small>
                            Fecha: ${tarea.fecha} |
                            ${tarea.frecuencia}
                        </small>

                    </div>
                </div>
            </div>
        `;

    }).join("");

}

// * Primera renderización
renderizarTareas();
renderizarResumenTareas();