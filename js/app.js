// * Se importan las clases y módulos necesarios
import "./inicio.js";
import "./tareas.js";
import "./nuevaTarea.js";
import "./calendario.js";

import { cargarCategorias } from "./categorias.js";
//import { cargarEstados } from "./estados.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    //cargarEstados();
});