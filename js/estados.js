// * Esto esta comentado, tonces do se esta usando
// * pero se deja por si se quiere usar en el futuro (pienso que si :3)

export const estados = ["Vencida", "Pendiente", "Completada"];

export function cargarEstados() {
    const selectEstado = document.getElementById("estado-tarea");

    estados.forEach(estado => {
        const opcion = document.createElement("option");

        opcion.value = estado;
        opcion.textContent = estado;

        selectEstado.appendChild(opcion);
    });
}