// * Se importan las clases necesarias
import { Task } from "./task.js";

// * Se crea la clase de gestor de tareas
export class taskManager {

    // * Se define el constructor de la clase
    constructor() {

        this.tareas = [];
        this.currentId = 0;
        this.cargarTareas();
        
    }

    // * Se crea el método para agregar una tarea al gestor
    agregarTarea(infoTarea) {

        this.currentId++;

        const nuevaTarea = new Task(
            this.currentId,
            infoTarea.titulo,
            infoTarea.descripcion,
            infoTarea.categoria,
            infoTarea.fecha,
            infoTarea.frecuencia,
            infoTarea.estado,
        )

        this.tareas.push(nuevaTarea);
        this.guardarTareas();

        return nuevaTarea;
    }

    // * Se crea el método para obtener todas las tareas del gestor
    obtenerTareas() {

        return this.tareas;

    }

    // * Se crea el método para eliminar una tarea del gestor
    eliminarTarea(tareaId) {

        const nuevasTareas = [];

        for (let tarea of this.tareas) {
            if (tarea.id != tareaId) {
                nuevasTareas.push(tarea);
            }
        }

        this.tareas = nuevasTareas;
        this.guardarTareas();

    }

    // * Se crea el método para completar una tarea del gestor
    completarTarea(id) {

        const tarea = this.tareas.find(
            tarea => tarea.id === id
        );

        if (tarea) {
            tarea.estado = tarea.estado === "completada"
                ? (tarea.estaVencida() ? "vencida" : "pendiente")
                : "completada";
        }

        this.guardarTareas();

    }

    // * Se crea el método para filtrar las tareas por frecuencia
    filtrarPorFrecuencia(frecuencia) {

        if (frecuencia === "todas") {
            return this.tareas;
        }

        return this.tareas.filter(
            tarea => tarea.frecuencia === frecuencia
        );

    }

    // * Método para editar una tarea
    editarTarea(tareaId, nuevosDatos) {

        const tarea = this.tareas.find(
            tarea => tarea.id === tareaId
        );

        if (!tarea) {
            return false;
        }

        tarea.titulo = nuevosDatos.titulo;
        tarea.descripcion = nuevosDatos.descripcion;
        tarea.categoria = nuevosDatos.categoria;
        tarea.fecha = nuevosDatos.fecha;
        tarea.frecuencia = nuevosDatos.frecuencia;

        this.guardarTareas();

        return true;
    }

    // * Guardar tareas en localStorage
    guardarTareas() {

        localStorage.setItem(
            "planificador_tareas",
            JSON.stringify({
                tareas: this.tareas,
                currentId: this.currentId
            })
        );

    }

    // * Recuperar tareas de localStorage
    cargarTareas() {

        const datosGuardados = localStorage.getItem("planificador_tareas");

        if (!datosGuardados) {
            return;
        }

        try {

            const datos = JSON.parse(datosGuardados);

            this.tareas = datos.tareas.map(tarea => {

                return new Task(
                    tarea.id,
                    tarea.titulo,
                    tarea.descripcion,
                    tarea.categoria,
                    tarea.fecha,
                    tarea.frecuencia,
                    tarea.estado
                );

            });

            this.currentId = datos.currentId;

        } catch (error) {

            console.error("Error al recuperar las tareas:", error);

            this.tareas = [];
            this.currentId = 0;

        }
    }
}