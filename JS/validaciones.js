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
        input.parentElement.classList.remove("input-container--invalid")
    }else{
        input.parentElement.classList.add("input-container--invalid")
    }
}

//esto va hacer un objeto
const validadores = {
    nacimiento: (input) => validarnacimiento(input)
};



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