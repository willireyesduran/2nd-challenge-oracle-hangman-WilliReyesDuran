let lienzo = document.querySelector("canvas");
let pincel = lienzo.getContext("2d");

// function temblar() {
//     let elemento = document.querySelector("#ahorcado");
//     elemento.classList.toggle("ahorcado2");
// }



// Dibujo de la base:
function dibujoBase() {
    pincel.beginPath();
    pincel.lineWidth = 10;
    pincel.moveTo(100, 500);
    pincel.lineTo(150, 500);
    pincel.lineTo(125, 475);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de columna:
function dibujoColumna() {
    pincel.beginPath();
    pincel.moveTo(125, 475);
    pincel.lineTo(125, 175);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de viga:
function dibujoViga() {
    pincel.beginPath();
    pincel.moveTo(125, 200);
    pincel.lineTo(150, 175);
    pincel.moveTo(125, 175);
    pincel.lineTo(275, 175);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de soga:
function dibujoSoga() {
    pincel.beginPath();
    pincel.moveTo(275, 175);
    pincel.lineTo(275, 225);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de cabeza:
function dibujoCabeza() {
    pincel.beginPath();
    pincel.arc(275, 250, 25, 0, 2 * Math.PI);
    pincel.stroke();
}

// Dibujo de cuerpo:
function dibujoCuerpo() {
    pincel.beginPath();
    pincel.moveTo(275, 275);
    pincel.lineTo(275, 350);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de pierna izquierda:
function dibujoPiernaIzq() {
    pincel.beginPath();
    pincel.moveTo(275, 350);
    pincel.lineTo(250, 425);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de pierna derecha:
function dibujoPiernaDer() {
    pincel.beginPath();
    pincel.moveTo(275, 350);
    pincel.lineTo(300, 425);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de brazo izquierdo:
function dibujoBrazoIzq() {
    pincel.beginPath();
    pincel.moveTo(275, 285);
    pincel.lineTo(250, 335);
    pincel.closePath();
    pincel.stroke();
}

// Dibujo de brazo derecho:
function dibujoBrazoDer() {
    pincel.beginPath();
    pincel.moveTo(275, 285);
    pincel.lineTo(300, 335);
    // pincel.lineTo(335, 285);
    // pincel.strokeRect(330, 280, 5, 5);
    // pincel.moveTo(335, 285);
    // pincel.lineTo(335, 275)
    pincel.closePath();
    pincel.stroke();
}



// Seleccion de palabras

let arregloPalabras = ["CONEJO", "JIRAFA", "ELEFANTE", "LEON", "COCODRILO", "TIGRE", "CANGURO", "AGUILA", "BALLENA", "MURCIELAGO"];
function palabraAleatoria(datos) {
    if (!Array.isArray(datos)) {
        throw TypeError("El argumento debe ser un arreglo");
    }

    if (!datos.length) {
        return null;
    }

    let indiceAleatorio = Math.floor(Math.random() * datos.length);

    return datos[indiceAleatorio];
}

// Agregar nueva palabra:
let botonNuevaPalabra = document.querySelector("#nueva-palabra");
function palabraNueva(event) {
    let nuevaPalabra = document.querySelector("#input-nueva-palabra").value;
    arregloPalabras.push(nuevaPalabra);
    event.preventDefault();
    console.log("palabra agregada con exito!")
}
botonNuevaPalabra.addEventListener("click", palabraNueva);


let letrasCorrecta = [];
let letrasIncorrecta = [];
let palabra
let laLetra


// Boton nuevo juego
let nuevoJuego = document.querySelector("#nuevo-juego");


// Dibujar Lineas:
function drawLines(x, y) {
    for (let i = 1; i <= palabra.length; i++) {
        pincel.beginPath();
        pincel.moveTo(x, y);
        pincel.lineTo(x + 35, y);
        pincel.closePath();
        pincel.stroke();
        x = x + 50;
    }
}


// Dibujar letras correctas e incorrectas:

function dibujarLetras(dato, x, y) {
    let errores = 0;
    for (let i = 0; i < dato.length; i++) {
        if (laLetra == dato[i]) {
            pincel.font = "20px Arial";
            pincel.fillText(dato[i], x + 35, y - 20);
            x = x + 50;
            letrasCorrecta.push(laLetra);
        } else {
            errores++;
            x = x + 50;
            if ((errores === dato.length && laLetra !== null)) {
                letrasIncorrecta.push(laLetra);
            } else {
                ;
            }
        }
    }
}




function dibujarLetrasIncorrectas(dato, x, y) {
    pincel.font = "20px Arial";
    pincel.fillText(dato, x, y);
    x = x + 50;
}


// Funcion mensaje ganador:
function ganaste(dato) {
    pincel.fillStyle = "green";
    pincel.font = "20px Arial";
    pincel.fillText(dato, 500, 200);
}

// Funcion mensaje perdedor:
function perdiste(dato, x, y) {
    pincel.fillStyle = "red";
    pincel.font = "20px Arial";
    pincel.fillText(dato, x, y);
}


// Iniciar el juego:
let iniciarJuego = document.querySelector("#iniciar-juego");

function empezarJuego() {
    dibujoBase();
    palabra = palabraAleatoria(arregloPalabras);
    console.log(palabra);
    let vector = Array.from(palabra);
    console.log(vector);
    drawLines(100, 650);


    if (letrasCorrecta.length !== palabra.length) {
        iniciarJuego.style.display = "none";
    }



    document.addEventListener("keydown", (evento) => {
        let keyValue = evento.key.toUpperCase();
        laLetra = keyValue.match(/[A-Z]/g);
        console.log(laLetra);

        dibujarLetras(vector, 75, 650);
        console.log(letrasIncorrecta);

        dibujarLetrasIncorrectas(letrasIncorrecta, 500, 400);

        switch (letrasIncorrecta.length) {
            case 1:
                dibujoColumna();
                break;
            case 2:
                dibujoViga();
                break;
            case 3:
                dibujoSoga();
                break;
            case 4:
                dibujoCabeza();
                break;
            case 5:
                dibujoCuerpo();
                break;
            case 6:
                dibujoBrazoIzq();
                break;
            case 7:
                dibujoPiernaIzq();
                break;
            case 8:
                dibujoPiernaDer();
                break;
            case 9:
                dibujoBrazoDer();
                break;
        }
        if (letrasIncorrecta.length === 9) {
            perdiste("PERDISTE, MEJOR SUERTE PARA LA PROXIMA!", 500, 200);
            perdiste(`LA PALABRA ERA ${palabra}`, 500, 230);
            laLetra = "";
            vector = [];
            nuevoJuego.style.display = "inline-block";
        }
        if (palabra.length === letrasCorrecta.length) {
            console.log("felicidades, has ganado");
            ganaste("FELICIDADES, HAS GANADO!");
            laLetra = "";
            vector = [];
            nuevoJuego.style.display = "inline-block";
        }

        evento.stopPropagation();

    });
}
iniciarJuego.addEventListener("click", empezarJuego);


// Nuevo juego:
nuevoJuego.addEventListener("click", function () {
    palabra = "";
    keyValue = "";
    laLetra = [];
    vector = [];
    letrasCorrecta = [];
    letrasIncorrecta = [];
    pincel.fillStyle = "black";
    pincel.clearRect(0, 0, 1200, 800);
    empezarJuego();
    nuevoJuego.style.display = "none";
});




