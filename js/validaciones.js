export function validar(input){
    const tipoInput = input.dataset.tipo
    if(validadores[tipoInput]){
        validadores[tipoInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHtml = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHtml = mostrarMensajeError();
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío",
    },
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener un caracter especial y al menos un numero",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
}

const validadores = {
    nacimento: (input) => validarNacimiento(input),
}

function mostrarMensajeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity(error)){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente =  new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener 18 años para registrarte";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() +18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    
    return diferenciaFecha <= fechaActual ;
}