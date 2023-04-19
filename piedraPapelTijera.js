// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

/*
 * Primera Acción:
 *  - Asignamos el evento onclick al boton "¡JUGAR!"
 */
document
  .getElementsByTagName("button")[0]
  .addEventListener("click", playTheGame, false);

// Asignamos la imagenes y los eventos.
asignarImagenes(posibilidades);
/**********************************************************************************/

function evaluarJugador(nombreJugador) {
  let jugador = nombreJugador;
  /*
   * Si la longitud del nombre del jugador es mayor que 3 y el primer caracter no es un número revuelve TRUE. En caso contrario devuelve FALSE.
   * Usamos condicional ternario.
   */
  jugador.length > 3 && isNaN(jugador[0]) ? (ret = true) : (ret = false);
  return ret;
}

function evaluarPartidas(partidasAJugar) {
  let partidas = partidasAJugar;
  /*
   * Si partidas es mayor que 0 devuelve TRUE. En caso contrario FALSE;
   * Usamos condicional ternario
   */
  partidas > 0 ? (ret = true) : (ret = false);
  return ret;
}

function addClassAttr(tagName, className) {
  let tag = tagName;
  tag.classList.add(className);
}

function delClassAttr(tagName, className) {
  let tag = tagName;
  tag.classList.remove(className);
}

function verificarJugadorPartidas(nombreJugador, partidasAJugar) {
  /********************************************************
   * Devulve TRUE o FALSE según requisitos de la PAC.
   */
  let retJugador = evaluarJugador(nombreJugador.value);
  let retPartidas = evaluarPartidas(partidasAJugar.value);
  /********************************************************/
  // Usamos condicional ternario
  /************************************************************************
   * Si no cumple con los requisitos añade la clase fondoRojo, si no... la elimina.
   */
  !retJugador
    ? addClassAttr(nombreJugador, "fondoRojo")
    : delClassAttr(nombreJugador, "fondoRojo");
  !retPartidas
    ? addClassAttr(partidasAJugar, "fondoRojo")
    : delClassAttr(partidasAJugar, "fondoRojo");
  /********************************************************************* */

  if (retJugador && retPartidas) return true;
  else return false;
}

function addTotalToSpan(partidasAJugar) {
  // Valor actual del SPAN
  let spanId = document.getElementById("total");
  spanId.innerHTML = partidasAJugar.value;
  //console.log(partidasAJugar.value);
}

/*
 * Desactivar campos de texto Nombre del jugador y número de partidas.
 */
function muteEventsOver(nombreJugador, partidasAJugar) {
  nombreJugador.setAttribute("readonly", "true");
  partidasAJugar.setAttribute("readonly", "true");
  /*console.log(nombreJugador);
  console.log(partidasAJugar);*/
}

function seleccionarJugada(argumento, index) {
//  console.log(index);

  console.log("hola " + argumento[index].classList);
 
  
  /*for (let i = 0; i < 3; i++) {
    if (i == index) {
      console.log("Valor encontrado!! " + i + " " + index);
      argumento[index].classList = "seleccionado";
      console.log("hola " + argumento[index].classList);
    } else {
      console.log("Valor NO encontrado!! " + i + " " + index);
      argumento[index].classList = "noSeleccionado";
      console.log("adios " + argumento[index].classList);
    }
  }*/
}
/*
 * Asignará a todas las imágenes, salvo a la última, el evento que permita seleccionar
 * la opción del jugador y poner en ellas las imágenes que les corresponden. Estas
 * imágenes se generarán a partir del array “posibilidades” que se suministra en la
 * primera línea del fichero JS y se le añadirá la ruta hasta ellas, el indicador que es de
 * “Jugador” y la extensión del fichero.
 */
function asignarImagenes(posibilidades) {
  let jugadorId = document.getElementById("jugador");
  let imagenes = jugadorId.getElementsByTagName("img");

  //let imageClass = jugadorId.getElementsByClassName("seleccionado");
  //console.log(imagenes[0]);

  /*imagenes[0].src.addEventListener("click", seleccionarJugada(), true);
  console.log(imagenes[0]);*/
  //console.log(imageClass);
  //document.getElementsByTagName("button")[0].addEventListener("click", playTheGame, false);

  //console.log(imagenes);
  // Modifica las imagenes

  posibilidades.forEach(function (posValue, index) {
    //console.log(imagenes[index].classList.value);
    imagenes[index].src = "img/" + posValue + "Jugador.png";
    imagenes[index].addEventListener(
      "click",
      function () {
        seleccionarJugada(imagenes, index);
      },
      false
    );
  });

  /*posibilidades.forEach(function (posValue, index) {
    imagenes[index].src = "img/" + posValue + "Jugador.png";
    imagenes[index].addEventListener("click", seleccionarJugada, false);
  });*/

  //imagenes[index].addEventListener("click", seleccionarJugada, false);

  //let index = 0;
  //console.log(imagenes[1]);
  /*
   * Por hacer:
   *
   * Hay que añadir a cada elemento del array posibilidades: "img/" al inicio y "quien.png" (quien puede ser Jugador u Ordenador) al final.
   * Añadir cada imagen en su cuadrado y un evento para poder seleccionarlo.
   */

  //console.log(posibilidades.length);
  /*posibilidades.forEach(function (elemento) {
    
    if (elemento == "piedra") imagenes[0].src = "img/piedraJugador.png";
    if (elemento == "papel") imagenes[1].src = "img/papelJugador.png";
    if (elemento == "tijera") imagenes[2].src = "img/tijeraJugador.png";

    imagenes[0] = "img/" + elemento + "Jugador.png";
  });*/

  /*posibilidades.forEach(function (elemento) {
    
  });*/

  /*  
  do {
    imagenes[index].src = "img/" + posibilidades[index] + "Jugador.png";
  } while (++index < posibilidades.length);*/
}

function playTheGame() {
  let nombreJugador = document.getElementsByTagName("input")[0]; // Primer Input. Contiene el nombre del jugador.
  let partidasAJugar = document.getElementsByTagName("input")[1]; // Segundo Input. Contiene el número de partidas que queremos jugar.

  /*
   * Si la función verificarJugadorPartidas devuelve TRUE continuamos...
   * Volcamos el valor introducido en el <span> “total” que indica el número de tiradas totales que se
   * podrán realizar.
   */

  if (verificarJugadorPartidas(nombreJugador, partidasAJugar)) {
    muteEventsOver(nombreJugador, partidasAJugar); // Desactiva ambos campos
    addTotalToSpan(partidasAJugar); // Añade el valor del campo Partidas a jugar al SPAN.

    // Elección y tirada
  } else console.log("Error.");

  //console.log(valor);
}
