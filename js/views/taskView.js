import { Task } from "../clases/task.js";
import { taskManager } from "../clases/taskManager.js";

// * Instanciamos nuestro gestor
export const gestor = new taskManager();

// * Datos de prueba
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

                        <button type="button" class="boton-rosa boton-completar" data-id="${tarea.id}">${textoBoton}</button>
                        <button type="button" class="boton-beige" data-id="${tarea.id}">Editar</button>
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

// * Primera renderización
renderizarTareas();