// varaibles
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// eventListeners
EventListener();
function EventListener() {
  // cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);
  // cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets") || []);
    console.log(tweets);
    crearHTML();
  });
}

//funciones
function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  //validacion
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return; // evita que se ejecute mas linea de codigo
  }

  const tweetObj = {
    id: Date.now(),
    texto: tweet,
  };

  // anadir al arreglo de tweets
  tweets = [...tweets, tweetObj];

  // una vez agregado crear HTML
  crearHTML();

  // reiniciar el formulario
  formulario.reset();
}

// mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //Insertarlo en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  // elimina la alerta despues de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// MUESTRA UN LISTADO DE LOS TWEETS
function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // agregar un boton de eliminar

      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "x";

      // anadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // crear el hmtl
      const li = document.createElement("li");
      // anadir el texto
      li.textContent = tweet.texto;
      //asignar el boton
      li.appendChild(btnEliminar);
      // insertarlo en el html
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}
//agrega los tweets actales a local storage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id); // todos los demas exepcto el que diste click
  crearHTML();
}

// limpiar el html
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
