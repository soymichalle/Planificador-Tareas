// * Se importan las clases necesarias
import { Task } from "./task.js";

// * Se crea la clase de gestor de tareas
export class taskManager {

    // * Se define el constructor de la clase
    constructor(currentId = 0) {

        this.tareas = [];
        this.currentId = currentId;

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

        return nuevaTarea;
    }

    // * Se crea el método para obtener todas las tareas del gestor
    obtenerTareas() {

        return this.tareas;

    }

    // * Se crea el método para eliminar una tarea del gestor
    eliminarTarea(tareaId) {

        const nuevasTareas = [];

        for(let tarea of this.tareas) {
            if (tarea.id != tareaId) {
                nuevasTareas.push(tarea);
            }
        }

        this.tareas = nuevasTareas;
        
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