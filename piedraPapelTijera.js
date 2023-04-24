const evaluarJugador = (nombreJugador) => {
  let jugador = nombreJugador;
  /*
   * Si la longitud del nombre del jugador es mayor que 3 y el primer caracter no es un número revuelve TRUE. En caso contrario devuelve FALSE.
   * Usamos condicional ternario.
   */
  jugador.length > 3 && isNaN(jugador[0]) ? (ret = true) : (ret = false);
  return ret;
};

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

const addTotalToSpan = (partidasAJugar) => {
  // Valor actual del SPAN
  let spanId = document.getElementById("total");
  spanId.innerHTML = partidasAJugar.value;
};

const addActualToSpan = (partidaActual) => {
  // Valor actual del SPAN
  let spanId = document.getElementById("actual");
  spanId.innerHTML = partidaActual;
};

/*
 * Desactivar campos de texto Nombre del jugador y número de partidas.
 */
const muteEventsOver = (nombreJugador, partidasAJugar) => {
  nombreJugador.setAttribute("readonly", "true");
  partidasAJugar.setAttribute("readonly", "true");
  let botonPlayTheGame = document.getElementsByTagName("button")[0];
  botonPlayTheGame.disabled = true;
};

/*
 * Activar campos de texto Nombre del jugador y número de partidas.
 */
const unmuteEventsOver = (nombreJugador, partidasAJugar) => {
  nombreJugador.removeAttribute("readonly");
  partidasAJugar.removeAttribute("readonly");
  let botonPlayTheGame = document.getElementsByTagName("button")[0];
  botonPlayTheGame.disabled = false;
};

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

const playTheGame = () => {
  /*
   * Si la función verificarJugadorPartidas devuelve TRUE continuamos...
   * Volcamos el valor introducido en el <span> “total” que indica el número de tiradas totales que se
   * podrán realizar.
   */

  /* Si ya estaban el el DOM los elimina. No devuelve ningun valor */
  document
    .getElementsByTagName("button")[1]
    .removeEventListener("click", playTheGameNow, false);
  /*document
    .getElementsByTagName("button")[1]
    .removeEventListener("click", gameReset, false);*/

  if (verificarJugadorPartidas(nombreJugador, partidasAJugar)) {
    muteEventsOver(nombreJugador, partidasAJugar); // Desactiva ambos campos
    addTotalToSpan(partidasAJugar); // Añade el valor del campo Partidas a jugar al SPAN.

    // Elección y tirada
    partidaActual = 1;
    addActualToSpan(partidaActual);
    console.log(partidaActual);
    /*
     * Segunda Acción:
     *  - Asignamos el evento onclick al boton "¡Ya!"
     */
    document
      .getElementsByTagName("button")[1]
      .addEventListener("click", playTheGameNow, false);

    /*
     * Tercera Acción:
     *  - Asignamos el evento onclick al boton "RESET"
     */
  /*  document
      .getElementsByTagName("button")[2]
      .addEventListener("click", gameReset, false);*/
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
  Resultados.push(tiradaJugador);
  Resultados.push(tiradaMaquina);
  return Resultados;
};

const putHistorial = (mensaje) => {
  let historial = document.getElementById("historial");
  const node = document.createElement("li");
  const textnode = document.createTextNode(mensaje);
  node.appendChild(textnode);
  historial.appendChild(node);
};
/*
 * - Lo que esté en la primera posición del array “posibilidades” gana a lo que esté en la última.
 * - Lo que esté en la posición “n” del array gana a lo que está en la posición “n-1” del array.
 * Es decir, lo que esté en la posición 2 gana a lo que está en la posición 1, y así sucesivamente.
 */
const evaluaResultados = (resultados) => {
  let Jugador = resultados[0];
  let Maquina = resultados[1];
  let historial = document.getElementById("historial");

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

  if (Jugador == Maquina) {
    console.log("Empate");
    putHistorial("Empate");
  }
  if (Jugador == Maquina - 1 || Jugador - 2 == Maquina) {
    console.log("Gana Maquina");
    putHistorial("Gana Máquina");
  }
  if (Jugador == Maquina - 2 || Jugador - 1 == Maquina) {
    console.log("Gana Jugador");
    putHistorial("Gana " + nombreJugador.value);
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
const playTheGameNow = () => {
  // Primero tenemos que determinar si hay partidas por jugar.
  // leyendo el id "total" <h3>Jugando la partida <span id="actual">0</span> de <span id="total">0</span>.</h3>
  //console.log("play de game now");
  let spanId = document.getElementById("total");
  let numPartidas = spanId.innerHTML;

  //addActualToSpan(partidaActual);
  console.log("numero de partidas " + numPartidas);
  console.log("partida actual " + partidaActual);

  if (numPartidas >= partidaActual) {
    addActualToSpan(partidaActual);
    partidaActual++;
    //addActualToSpan(partidaActual);
    let maquinaId = document.getElementById("maquina");
    let imagen = maquinaId.getElementsByTagName("img");

    // Generar número aleatorio entre 0 y el tamaño del array "posibilidades"
    // random devuelve un número aleatorio entre 0 y 1 el cual multiplicamos por la longitud del array "posibilidades"
    randonValue = Math.floor(Math.random() * posibilidades.length);
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
  } else {
    alert(
      "Partida terminada\nPulse de nuevo el botón ¡JUGAR! para una nueva partida...."
    );
    unmuteEventsOver(nombreJugador, partidasAJugar); // Vuelve a activar los campos nombre y partidas a jugar.
    
  }
};

/*
 * Cuando se pulse el botón RESET, mostrará el mensaje “Nueva partida” y realizará
 * los siguientes cambios en la aplicación:
 * - Volverá a activar los campos de texto del comienzo de partida, dejando a “0” las partidas introducidas y manteniendo el nombre del jugador.
 * - Volverá a poner a 0 los contadores de partidas “actual” y “total”.
 * - Pondrá la imagen por defecto en la opción de la máquina.
 * - Mantendrá el historial de resultados hasta el momento.
 */
const gameReset = () => {
  partidaActual = 0;
  console.log("boton reset");
  putHistorial("Nueva partida");
  unmuteEventsOver(nombreJugador, partidasAJugar); // Vuelve a activar los campos nombre y partidas a jugar.
  partidasAJugar.value = 0;
  nombreJugador.value = "";
  addTotalToSpan(partidasAJugar);
  addActualToSpan(partidaActual);
  let maquinaId = document.getElementById("maquina");
  let imagen = maquinaId.getElementsByTagName("img");
  imagen[0].src = "img/defecto.png";

  document
    .getElementsByTagName("button")[1]
    .removeEventListener("click", playTheGameNow, false);
  
};

/*********************************************************************************/
/******** El programa comienza aquí, ya que al usar funciones flecha *************/
/******** estas deben de estar ya creadas para poder usarlas. ********************/
/*********************************************************************************/
// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
let partidaActual = 0;
const nombreJugador = document.getElementsByTagName("input")[0]; // Primer Input. Contiene el obj HTMLInputElement.
const partidasAJugar = document.getElementsByTagName("input")[1]; // Segundo Input. Contiene el obj HTMLInputElement.
//const botonReset = document.getElementsByTagName("button")[2]; // Botón RESET
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
/*document
  .getElementsByTagName("button")[1]
  .addEventListener("click", playTheGameNow, false);*/

/*
 * Tercera Acción:
 *  - Asignamos el evento onclick al boton "RESET"
 */
document
  .getElementsByTagName("button")[2]
  .addEventListener("click", gameReset, false);

// Asignamos la imagenes y los eventos.
asignarImagenes(posibilidades);
/**********************************************************************************/
