
const paginaUno = document.querySelector(".inicio-botones")
const paginaDos = document.querySelector(".palabra-entrante")
const paginaTres = document.querySelector(".juego-ahorcado")

const textoAgregarDos = document.querySelector(".entrada-palabra");

const textoLetraUsada = document.querySelector(".letras-usadas")
const textoFinalizacion = document.querySelector(".texto-finalizacion")

// variables pagina tres
const muniecoFigura = document.querySelector(".imagen-figura-ahorcado")
const letraPrimeraA = document.querySelector(".letra-primera")
const letraSegundaB = document.querySelector(".letra-segunda")
const letraTerceraC = document.querySelector(".letra-tercera")
const letraCuartaD = document.querySelector(".letra-cuarta")
const letraQuintaE = document.querySelector(".letra-quinta")
const letraSextaF = document.querySelector(".letra-sexta")
const letraSeptimaG = document.querySelector(".letra-septima")
const letraOctavaH = document.querySelector(".letra-octava")

const lineaLetraA = document.querySelector(".linea-letra-uno")
const lineaLetraB = document.querySelector(".linea-letra-dos")
const lineaLetraC = document.querySelector(".linea-letra-tres")
const lineaLetraD = document.querySelector(".linea-letra-cuatro")
const lineaLetraE = document.querySelector(".linea-letra-cinco")
const lineaLetraF = document.querySelector(".linea-letra-seis")
const lineaLetraG = document.querySelector(".linea-letra-siete")
const lineaLetraH = document.querySelector(".linea-letra-ocho")

var posicionesLetraHtml = [letraPrimeraA, letraSegundaB,letraTerceraC, letraCuartaD, letraQuintaE, letraSextaF,letraSeptimaG, letraOctavaH];

var posicionesLineaCss = [lineaLetraA, lineaLetraB, lineaLetraC, lineaLetraD, lineaLetraE, lineaLetraF, lineaLetraG, lineaLetraH];

var abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var vocabulario = ["HOLA","CAMPEON","SOL","ALURA","CODIGO","LOGICA","ESTUDIO","HTML","FUTBOL","AMIGO"];

var matrizFiguraTipo = ["url()","url(Imagenes/figA.png)","url(Imagenes/figB.png)","url(Imagenes/figC.png)","url(Imagenes/figD.png)","url(Imagenes/figE.png)","url(Imagenes/figF.png)","url(Imagenes/figG.png)","url(Imagenes/figH.png)","url(Imagenes/figI.png)"]


var letrasRepetidas = [];
var LetrasTodasUsadas = "";
var palabraAleatoria = "";
var contadorCorrecto = 0;
var conteoFallos = 0;
var permitirJugarFinal = false;

// FUNCIONES Generales

function reinicioVariables(){
    letrasRepetidas = [];
    LetrasTodasUsadas = "";
    palabraAleatoria = "";
    contadorCorrecto = 0;
    conteoFallos = 0;
    permitirJugarFinal = true;

    LetrasTodasUsadas = "";
    textoAgregarDos.value = ""

    textoLetraUsada.value = "";
    textoFinalizacion.innerHTML = "";
}

function reiniciarJuego(){

    muniecoFigura.style.backgroundImage = "url()"; // fig vacia
    for (var index = 0; index < posicionesLetraHtml.length; index++) {
        posicionesLetraHtml[index].innerHTML = "";
        posicionesLetraHtml[index].style.display = "none";
        posicionesLineaCss[index].style.display = "none";
    } // Reinicio de las letras etiqueta p
    reinicioVariables();
}

// var vocabulario = ["HOLA","CAMPEON","SOL","ALURA","CODIGO","LOGICA","ESTUDIO","HTML","FUTBOL","AMIGO"];

function escogerPalabra() {
    var aleatorio = Math.floor(Math.random()*vocabulario.length);
    return vocabulario[9];
}

function delimitarPosicionLetras(entradaFuncion){
    for (var index = 0; index < entradaFuncion.length; index++) {
        posicionesLetraHtml[index].style.display = "inline-block";
        posicionesLineaCss[index].style.display = "inline-block";
    }
}

function realizarJuego() {
    reiniciarJuego();
    palabraAleatoria = escogerPalabra();
    delimitarPosicionLetras(palabraAleatoria);
    // AGREGAR - CONTINUACION
}

function ingresoDeLetras(entradaFuncionUno) {
    var entradaFuncion = entradaFuncionUno.toUpperCase();
    var matrizComprobarPosicion = false;       
    if (comprobarLetraRepetida(entradaFuncion)) {
        matrizComprobarPosicion = comprobarLetra(entradaFuncion);
        letrasRepetidas.push(entradaFuncion)
        if (matrizComprobarPosicion == false) {
            LetrasTodasUsadas += entradaFuncion + " "; 
            textoLetraUsada.value = LetrasTodasUsadas;
            agregarPartesMunieco();     
        }
        verificarEstadoGanarPerder();
    }   
}

function verificarEstadoGanarPerder() {
    if (contadorCorrecto == palabraAleatoria.length) {
        textoFinalizacion.innerHTML = "Felicidades, ¡GANASTE!";
        permitirJugarFinal = false;
    }
    if (conteoFallos == 9) {
        textoFinalizacion.innerHTML = "Lo siento, ¡PERDISTE!";
        permitirJugarFinal = false;
    }
}

function comprobarLetraRepetida(entradaFuncion) {
    var pruebaUno = true;
    var pruebaDos = true;
    for (let index = 0; index < abecedario.length; index++) {
        if (entradaFuncion != abecedario[index]){
            pruebaUno = false
        }else{
            pruebaUno = true;
            break;
        }
    }
    for (let index = 0; index < letrasRepetidas.length; index++) {
        if (entradaFuncion == letrasRepetidas[index] ) {
            pruebaDos = false;
            break;
        }        
    }
    if (pruebaDos && pruebaUno) {
        return true;
    }else{
        return false;
    }
}

function comprobarLetra(entradaFuncion){

    var comprobacion = false;

    for (var posicion = 0; posicion < palabraAleatoria.length; posicion++) {

        if ( entradaFuncion == palabraAleatoria[posicion] ) {
            contadorCorrecto += 1;
            posicionesLetraHtml[posicion].innerHTML = entradaFuncion;
            comprobacion = true;
        }        
    }
    return comprobacion;
}

function agregarPartesMunieco() {
    conteoFallos += 1;
    muniecoFigura.style.backgroundImage = matrizFiguraTipo[conteoFallos];

}

function agregarPalabraMatriz(entradaFuncion) {
    vocabulario.push(entradaFuncion.toUpperCase());
}

function aceptarPalabra(entradaFuncion) {
    var contadorAceptar = 0;
    for (let indexUno = 0; indexUno < entradaFuncion.length; indexUno++) {
        for (let index = 0; index < abecedario.length; index++) {
            if ( entradaFuncion[indexUno] == abecedario[index]) {
                contadorAceptar += 1;
                break
            }
        }
    }
    if (contadorAceptar == entradaFuncion.length) {
        return true
    } else {
        return false
    }
}

function permitirEntradaTexto(entradaT) {
    var entradaT = textoAgregarDos.value.toUpperCase();
    if(entradaT != "" && aceptarPalabra(entradaT)){
        agregarPalabraMatriz(entradaT);
        realizarJuego();
        paginaDos.style.display = "none";
        paginaTres.style.display = "inherit"
    }
}

document.addEventListener('keydown', (event) => {
    var codigo = event.which || event.keyCode;
    var tecladoLetra = "";
    console.log("keyValue: " + codigo);
    if(codigo >= 65 && codigo <= 90){
        // console.log(String.fromCharCode(codigo));
        tecladoLetra = String.fromCharCode(codigo);
    }
    if(codigo == 192){
        // console.log(String.fromCharCode("Ñ"));
        tecladoLetra = "Ñ";
    }
    
    if (permitirJugarFinal) {
        ingresoDeLetras(tecladoLetra);
    }

  }, false);

// BOTONES

function btnIniciarJuego(){
    paginaUno.style.display = "none";  
    realizarJuego();
    paginaTres.style.display = "inherit";
}

function btnAgregarPalabra() {
    
    paginaUno.style.display = "none";
    paginaDos.style.display = "inherit";
    
}

function btnGuardarEmpezar() {
    permitirEntradaTexto();
}

function btnCancelar() {
    reinicioVariables();
    paginaDos.style.display = "none";
    paginaUno.style.display = "inherit";
}

function btnJugarNuevo() {
    realizarJuego();
}

function btnDesistir() {
    paginaTres.style.display = "none";
    paginaUno.style.display = "inherit";
}