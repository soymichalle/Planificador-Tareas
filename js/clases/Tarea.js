// * Se crea la clase de tarea
export class Tarea {

    constructor(id, titulo, descripcion, categoria,
                fecha, frecuencia, estado = "pendiente") {

        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.fecha = fecha;
        this.frecuencia = frecuencia;
        this.estado = estado;
    }

    estaVencida() {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const fechaLimite = new Date(`${this.fecha}T00:00:00`);

        return this.estado !== "completada" && fechaLimite < hoy;
    }

}