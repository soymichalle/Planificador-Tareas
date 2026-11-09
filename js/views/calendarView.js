// Temporal mientras veo como hacer la parte de tareas en puntitos de cada dia segun lo hecho en tareas

// * Se define la fecha que controla los dos calendarios
let fechaCalendario = new Date();

// * Función para generar el calendario
function generarCalendario(contenedor, titulo, fecha) {

    // * Se obtiene año y mes
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth();

    // * Se obtiene fecha actual
    const hoy = new Date();

    const diaActual = hoy.getDate();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();

    // * Primer día del mes
    const primerDia = new Date(anio, mes, 1).getDay();

    // * Último día del mes
    const ultimoDia = new Date(anio, mes + 1, 0).getDate();

    // * Se ajusta semana para comenzar el lunes
    const espacios = (primerDia + 6) % 7;

    // * Se actualiza título del calendario
    titulo.textContent = fecha.toLocaleDateString("es-CO", {
        month: "long",
        year: "numeric"
    });

    // * Se limpia calendario
    contenedor.innerHTML = "";

    // * Se generan los días de la semana
    const diasSemana = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

    diasSemana.forEach(dia => {
        contenedor.innerHTML += `
            <div class="dia-semana">${dia}</div>
        `;
    });

    // * Se genera espacios
    for (let i = 0; i < espacios; i++) {
        contenedor.innerHTML += `
            <div class="dia-vacio"></div>
        `;
    }

    // * Se generan los números del mes
    for (let dia = 1; dia <= ultimoDia; dia++) {

        // * Se comprueba si el día corresponde a hoy
        const esHoy =
            dia === diaActual &&
            mes === mesActual &&
            anio === anioActual;

        contenedor.innerHTML += `
            <div class="dia ${esHoy ? "dia-actual" : ""}">
                ${dia}
            </div>
        `;
    }
}

// * Function para actualizar ambos calendarios al cambiar de mes
function actualizarCalendarios() {

    // * Calendario pequeño de Inicio
    generarCalendario(
        document.getElementById("calendario-mini"),
        document.getElementById("mes-actual-mini"),
        fechaCalendario
    );

    // * Calendario de la sección independiente
    generarCalendario(
        document.getElementById("calendario-grid"),
        document.getElementById("mes-actual"),
        fechaCalendario
    );
}

// * Funcion para retroceder un mes
function mesAnterior() {

    fechaCalendario.setDate(1);
    fechaCalendario.setMonth(fechaCalendario.getMonth() - 1);

    actualizarCalendarios();
}

// * Función para avanzar un mes
function mesSiguiente() {

    fechaCalendario.setDate(1);
    fechaCalendario.setMonth(fechaCalendario.getMonth() + 1);

    actualizarCalendarios();
}

// * Botones del calendario pequeño
document.getElementById("mes-anterior-mini")
    .addEventListener("click", mesAnterior);

document.getElementById("mes-siguiente-mini")
    .addEventListener("click", mesSiguiente);

// * Botones del calendario grande
document.getElementById("mes-anterior")
    .addEventListener("click", mesAnterior);

document.getElementById("mes-siguiente")
    .addEventListener("click", mesSiguiente);

// * Se inicia el calendario
actualizarCalendarios();