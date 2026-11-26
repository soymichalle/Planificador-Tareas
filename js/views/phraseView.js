
const API_FRASES = "https://frasesestoicas.com/api/v1/quotes/";
const CLAVE_FRASE = "frase_del_dia";

// * Obtener fecha actual
function obtenerFechaActual() {
    const fecha = new Date();

    return [
        fecha.getFullYear(),
        String(fecha.getMonth() + 1).padStart(2, "0"),
        String(fecha.getDate()).padStart(2, "0")
    ].join("-");
}

// * Formatear nombre del autor
function formatearAutor(autor) {
    return autor
        .replaceAll("-", " ")
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

// * Mostrar frase en HTML
function mostrarFrase(frase) {
    const textoFrase = document.getElementById("texto-frase");
    const autorFrase = document.getElementById("autor-frase");

    textoFrase.textContent = frase.text;
    autorFrase.textContent =
        `${formatearAutor(frase.author)} · ${frase.canonical_ref}`;
}

// * Consultar frase del día
export async function obtenerFraseDelDia() {

    const fechaActual = obtenerFechaActual();

    // Revisar si ya tenemos una frase guardada para hoy
    const fraseGuardada = JSON.parse(
        localStorage.getItem(CLAVE_FRASE)
    );

    if (fraseGuardada && fraseGuardada.fecha === fechaActual) {
        mostrarFrase(fraseGuardada.frase);
        return;
    }

    try {
        const respuesta = await fetch(API_FRASES);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las frases");
        }

        const datos = await respuesta.json();

        const frasesValidas = datos.quotes.filter(
            frase => frase.audit_status === "traduccion_o_extracto_cotejado"
        );

        if (frasesValidas.length === 0) {
            throw new Error("No hay frases disponibles");
        }

        // Seleccionar una frase para el día actual
        const dia = Number(fechaActual.replaceAll("-", ""));
        const indice = dia % frasesValidas.length;

        const fraseSeleccionada = frasesValidas[indice];

        // Guardar frase y fecha
        localStorage.setItem(CLAVE_FRASE, JSON.stringify({
            fecha: fechaActual,
            frase: fraseSeleccionada
        }));

        mostrarFrase(fraseSeleccionada);

    } catch (error) {
        console.error("Error al obtener la frase:", error);

        const textoFrase = document.getElementById("texto-frase");
        const autorFrase = document.getElementById("autor-frase");

        textoFrase.textContent = "No fue posible cargar la frase del día.";

        autorFrase.textContent = "";
    }
}