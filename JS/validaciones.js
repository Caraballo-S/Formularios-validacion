//¡EL QUERYSELECTOR YENDO A UN ID NO ES TA BUENA PRACTICA
// const inputNacimiento = document.querySelector("#birth");

//Ademas nosotrs queremos que nuestro addEventListenner lo podamos reutilizar

//que evento es el quiero escuchar, cuando -salga- la fecha en este caso blur
//El evento blur() se da cuando un elemento pierde el foco que obtuvo al ser clickado por el ratón o llegando por navegación tabular en palabras mas senciilas una vez elejido la fecha y precione otra cosa salta el evento.
//inputNacimiento.addEventListener("blur", (evento) => {
//    validarnacimiento(evento.target); });

export function valida (input){
    const tipoDeInput = input.dataset.tipo
    //verificar si dentro de validadores existe el tipo de input
    if(validadores[tipoDeInput]){
        //y si existe le voy a pasar el parametro input
        validadores[tipoDeInput](input)
    }

    //este if hace que agregue o remueva una clase que hace que aparesza en rojo el input si no es valido
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""; //seleccionar la clase que tiene el mensaje de error y dejarlo vacio
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)//seleccionar la clase que tiene el mensaje de error y llamar a una fucnion para mostrar el mensaje correcto
    }
}

const tipoDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

//objeto con los mensaje de error para cada tipo y situacion, con los errores del $0.validity
//nosotros necesitamos ver es dependiendo del tipo de input que el usuario esta interactuando si esta valido o no esta valido, en caso de no estar valido debemos acceder a este objeto y a cada una de sus llaves dependiendo del input
const mensajeDeError = {
    name: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido" // esto es el tipo 
    },
    password:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe tener una letra mayuscula, una letra miniscula, un numero y no puede contener caracteres especiales"// este en vez de poner el tip ponemo un patron por el patron que usamos en el html
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
};

//esto va hacer un objeto
const validadores = {
    nacimiento: (input) => validarnacimiento(input)
};


function mostrarMensajeDeError (tipoDeInput, input){
    let mensaje = "";
    tipoDeError.forEach((error) => {
        console.log(error);
        if(input.validity[error]){
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error])
            mensaje = mensajeDeError[tipoDeInput][error];
            
        }
    })
    return mensaje;
}



//esta funcion va a recibir nuestro input
function validarnacimiento (input){
    //y accedemos al valor del input
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    };

    //funcion que va a mostrar un mensaje de error al registarse
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();//esto especifica el dia actual
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    return diferenciaFechas <= fechaActual
}