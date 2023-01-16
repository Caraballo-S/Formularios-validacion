import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");
//cuando pongo querySelectorAll me va a devolver un arreglo

inputs.forEach(input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});