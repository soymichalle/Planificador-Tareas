// * Se importan las clases necesarias
import { Task } from "./task.js";

// * Se crea la clase de gestor de tareas
export class taskManager {

    // * Se define el constructor de la clase
    constructor() {

        this.tareas = [];

    }

    // * Se crea el método para agregar una tarea al gestor
    agregarTarea(tarea) {

        this.tareas.push(tarea);

    }

    // * Se crea el método para obtener todas las tareas del gestor
    obtenerTareas() {

        return this.tareas;

    }

    // * Se crea el método para eliminar una tarea del gestor
    eliminarTarea(id) {

        this.tareas = this.tareas.filter(
            tarea => tarea.id !== id
        );

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
}