export const categorias = ["Estudio", "Trabajo", "Personal"];

export function cargarCategorias() {
    const selectCategoria = document.getElementById("categoria-tarea");

    categorias.forEach(categoria => {
        const opcion = document.createElement("option");

        opcion.value = categoria;
        opcion.textContent = categoria;

        selectCategoria.appendChild(opcion);
    });
}