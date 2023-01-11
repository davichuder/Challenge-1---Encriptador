function copiarTexto() {
    let texto = $output.textContent;
    navigator.clipboard.writeText(texto);
}

function verificarErrores(accion) {
    if ($input.value === "") {
        mostrarMensaje("block", "none", "none");
    } else if (! /^[a-z1-9¿?¡!.,\nñ ]*$/.test($input.value)) {
        mostrarMensaje("none", "none", "inline-grid");
    } else {
        mostrarMensaje("none", "flex", "none");
        if (accion === "encriptar") encriptar();
        if (accion === "desencriptar") desencriptar();
    }
}

function mostrarMensaje(display_no_encontrado, display_encontrado, display_error) {
    let no_encontrado = document.querySelector("#no-encontrado");
    let encontrado = document.querySelector("#encontrado");
    let error = document.querySelector("#error");

    no_encontrado.style.display = display_no_encontrado;
    encontrado.style.display = display_encontrado;
    error.style.display = display_error;
}

function encriptar() {
    let texto = "";
    for (let letra of $input.value) {
        texto += (Object.keys(VOCAL_A_CODIGO).includes(letra)) ? VOCAL_A_CODIGO[letra] : letra;
    }
    $output.textContent = texto;
    $input.value = "";
}

function desencriptar() {
    let texto = $input.value;
    for (let letra in VOCAL_A_CODIGO) {
        texto = texto.replaceAll(VOCAL_A_CODIGO[letra], letra);
    }
    $output.textContent = texto;
    $input.value = "";
}

const $botonEncriptar = document.querySelector("#boton-encriptar");
const $botonDesencriptar = document.querySelector("#boton-desencriptar");
const $botonCopiar = document.querySelector("#boton-copiar");
const $output = document.querySelector("#output-texto");
const $input = document.querySelector("#input-texto");

const VOCAL_A_CODIGO = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
}

$botonEncriptar.onclick = () => { verificarErrores("encriptar") };
$botonDesencriptar.onclick = () => { verificarErrores("desencriptar") };
$botonCopiar.onclick = copiarTexto;