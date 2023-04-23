//function evaluarJugador(nombreJugador) {
const evaluarJugador = (nombreJugador) => {
  let jugador = nombreJugador;
  /*
   * Si la longitud del nombre del jugador es mayor que 3 y el primer caracter no es un número revuelve TRUE. En caso contrario devuelve FALSE.
   * Usamos condicional ternario.
   */
  jugador.length > 3 && isNaN(jugador[0]) ? (ret = true) : (ret = false);
  return ret;
};

//function evaluarPartidas(partidasAJugar) {
const evaluarPartidas = (partidasAJugar) => {
  let partidas = partidasAJugar;
  /*
   * Si partidas es mayor que 0 devuelve TRUE. En caso contrario FALSE;
   * Usamos condicional ternario
   */
  partidas > 0 ? (ret = true) : (ret = false);
  return ret;
};

// Añade una clase className a tagName
//function addClassAttr(tagName, className) {
const addClassAttr = (tagName, className) => {
  let tag = tagName;
  tag.classList.add(className);
};
// Elimina una clase className de tagName
const delClassAttr = (tagName, className) => {
  //function delClassAttr(tagName, className) {
  let tag = tagName;
  tag.classList.remove(className);
};

//function verificarJugadorPartidas(nombreJugador, partidasAJugar) {
const verificarJugadorPartidas = (nombreJugador, partidasAJugar) => {
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
};

//function addTotalToSpan(partidasAJugar) {
const addTotalToSpan = (partidasAJugar) => {
  // Valor actual del SPAN
  let spanId = document.getElementById("total");
  spanId.innerHTML = partidasAJugar.value;
  //console.log(partidasAJugar.value);
};

/*
 * Desactivar campos de texto Nombre del jugador y número de partidas.
 */

//function muteEventsOver(nombreJugador, partidasAJugar) {
const muteEventsOver = (nombreJugador, partidasAJugar) => {
  nombreJugador.setAttribute("readonly", "true");
  partidasAJugar.setAttribute("readonly", "true");
};

//function seleccionarJugada(imagenes, index) {
const seleccionarJugada = (imagenes, index) => {
  // Modifica las clases cuyo nombre es "seleccionado" por "noSeleccionado"
  for (const child of imagenes)
    child.classList.replace(child.classList, "noSeleccionado");

  // A continuación reemplaza el valor "noSeleccionado" por "seleccionado" el la imagen hallamos pulsado
  // Según el indice (index).
  imagenes[index].classList.replace(imagenes[index].classList, "seleccionado");
};
/*
 * Asignará a todas las imágenes, salvo a la última, el evento que permita seleccionar
 * la opción del jugador y poner en ellas las imágenes que les corresponden. Estas
 * imágenes se generarán a partir del array “posibilidades” que se suministra en la
 * primera línea del fichero JS y se le añadirá la ruta hasta ellas, el indicador que es de
 * “Jugador” y la extensión del fichero.
 */
//function asignarImagenes(posibilidades) {
const asignarImagenes = (posibilidades) => {
  let jugadorId = document.getElementById("jugador");
  let imagenes = jugadorId.getElementsByTagName("img");

  posibilidades.forEach(function (posValue, index) {
    imagenes[index].src = "img/" + posValue + "Jugador.png";
    imagenes[index].addEventListener(
      "click",
      function () {
        seleccionarJugada(imagenes, index);
      },
      false
    );
  });
};

//function playTheGame() {
const playTheGame = () => {
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
  }
};

const obtenerResultados = (posValue) => {
  let Resultados = [];
  let tiradaJugador;
  let tiradaMaquina = posValue;
  let jugadorId = document.getElementById("jugador");
  let imagenes = jugadorId.getElementsByTagName("img");

  Array.from(imagenes).forEach(function (posValue, index) {
    if (imagenes[index].classList.value == "seleccionado")
      //tiradaJugador = posibilidades[index];
      tiradaJugador = index; // número
  });
  /*
  console.log("tirada jugador => " + tiradaJugador);
  console.log("tirada maquina => " + tiradaMaquina);
  */
  Resultados.push(tiradaJugador);
  Resultados.push(tiradaMaquina);
  return Resultados;
};

/*
 * - Lo que esté en la primera posición del array “posibilidades” gana a lo que esté en la última.
 * - Lo que esté en la posición “n” del array gana a lo que está en la posición “n-1” del array.
 * Es decir, lo que esté en la posición 2 gana a lo que está en la posición 1, y así sucesivamente.
 */
const evaluaResultados = (resultados) => {
  let Jugador = resultados[0];
  let Maquina = resultados[1];
  console.log("Tirada del jugador => " + Jugador);
  console.log("Tirada de la maquina => " + Maquina);

  /*
   * Las variables Jugador y Maquina contienen el indice de posición del array:
   * var posibilidades = ["piedra", "papel", "tijera"];
   * Jugador = 0 = "Piedra"
   * Jugador = 1 = "Papel"
   * Jugador = 2 = "Tijera"
   * Maquina = 0 = "Piedra"
   * Maquina = 1 = "Papel"
   * Maquina = 2 = "Tijera"
   */

  if (Jugador == Maquina) console.log("Empate");
  else {
    if (!Jugador) {
      if (Maquina == 1) console.log("Gana Máquina");
      else if (Maquina == 2) console.log("Gana Jugador");
    } else if (Jugador == 1) {
      if (Maquina == 0) console.log("Gana Jugador");
      else if (Maquina == 2) console.log("Gana Maquina");
    } else if (Jugador == 2) {
      if (Maquina == 0) console.log("Gana Maquina");
      else if (Maquina == 1) console.log("Gana Jugador");
    }
  }
};

/*
 * Al pulsar sobre el botón ¡YA! generará una opción aleatoria para el <img> dentro
 * del <div> de la “máquina” y sumará una partida en el <span> “actual” que indica el
 * número de tiradas realizadas hasta el momento.
 * La opción aleatoria la generará a partir del array “posibilidades” que se suministra
 * en la primera línea del fichero y se le añadirá la ruta hasta ella, el indicador que es
 * de “Ordenador” y la extensión del fichero.
 */

//function playTheGameNow() {
const playTheGameNow = () => {
  // Primero tenemos que determinar si hay partidas por jugar.
  // leyendo el id "total" <h3>Jugando la partida <span id="actual">0</span> de <span id="total">0</span>.</h3>
  //console.log("play de game now");
  let spanId = document.getElementById("total");
  let numPartidas = spanId.innerHTML;
  //console.log(spanId.innerHTML);

  if (numPartidas > 0) {
    let maquinaId = document.getElementById("maquina");
    let imagen = maquinaId.getElementsByTagName("img");

    // Generar número aleatorio entre 0 y el tamaño del array "posibilidades"
    // random devuelve un número aleatorio entre 0 y 1 el cual multiplicamos por la longitud del array "posibilidades"
    randonValue = Math.floor(Math.random() * posibilidades.length);
    //console.log(randonValue);
    posValue = posibilidades[randonValue];
    imagen[0].src = "img/" + posValue + "Ordenador.png";

    /*
     * Comprobará el resultado de la jugada teniendo en cuenta que:
     * - Lo que esté en la primera posición del array “posibilidades” gana a lo que
     * esté en la última.
     * - Lo que esté en la posición “n” del array gana a lo que está en la posición “n-
     * 1” del array. Es decir, lo que esté en la posición 2 gana a lo que está en la
     * posición 1, y así sucesivamente.
     */
    //resultados = obtenerResultados(posValue);
    resultados = obtenerResultados(randonValue);
    evaluaResultados(resultados);
  } else alert("tranki, pulsa jugar primero....");
};

/*********************************************************************************/
/******** El programa comienza aquí, ya que al usar funciones flecha *************/
/******** estas deben de estar ya creadas para poder usarlas. ********************/
/*********************************************************************************/
// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

/*
 * Primera Acción:
 *  - Asignamos el evento onclick al boton "¡JUGAR!"
 */
document
  .getElementsByTagName("button")[0]
  .addEventListener("click", playTheGame, false);
/*
 * Segunda Acción:
 *  - Asignamos el evento onclick al boton "¡Ya!"
 */
document
  .getElementsByTagName("button")[1]
  .addEventListener("click", playTheGameNow, false);

// Asignamos la imagenes y los eventos.
asignarImagenes(posibilidades);
/**********************************************************************************/
