// * Esto esta comentado, tonces do se esta usando
// * pero se deja por si se quiere usar en el futuro (pienso que si :3)

export const estados = ["vencida", "pendiente", "completada"];

// * Si se requiere cargar estados
export function cargarEstados() {
    const selectEstado = document.getElementById("estado-tarea");

    estados.forEach(estado => {
        const opcion = document.createElement("option");

        opcion.value = estado;
        opcion.textContent = estado;

        selectEstado.appendChild(opcion);
    });
}

// * Función de aplicar estilos según estados
export function aplicarEstilosEstado() {
    
}

// * Función de alternar estados
export function alternarEstados() {
    
}