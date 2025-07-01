// Crear la clase Activity
class Activity {
  constructor(id, titulo, descripcion, imgUrl) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imgUrl = imgUrl;
  }
}

// Implementar la clase Repository, la cual se encargará de crear, almacenar y manipular las actividades
class Repository {
  constructor() {
    this.activities = [];
    this.id = 1;
  }

  // obtener todas las actividades
  getAllActivities() {
    return this.activities;
  }

  // agregar actividad
  createActivity(titulo, descripcion, imgUrl) {
    const activity = new Activity(this.id, titulo, descripcion, imgUrl);
    this.activities.push(activity);
    this.id++;
  }

  // eliminar actividad
  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id);
  }
}

// nueva instancia
const repository = new Repository();

// implementar una función que tomará UNA instancia de Activity y la convertirá en elemento HTML. Esta función nos servirá más adelante. La función deberá:

// Recibir por parámetro un objeto instancia de Activity.
const generateCard = (Activity) => {
  // Extraer sus propiedades en variables utilizando destructuring.
  const { id, titulo, descripcion, imgUrl } = Activity;

  // Crear un elemento <div> que será la tarjeta donde incluiremos todos los demás elementos.
  let cardContainer = document.createElement("div");

  // Crear los elementos HTML que formarán parte de la tarjeta. Ej: <h3> para el título, <p> para la descripción, <img> para la imagen. Asignar los valores a las propiedades correspondientes a cada uno de los elementos. Ej: a la propiedad innerHTML del elemento del título, asignar el valor correspondiente. A la propiedad src del elemento de la imagen, asignar el valor correspondiente. Agregar a los elementos las clases CSS correspondientes que hayas implementado para darles estilos.

  cardContainer.className = "card";

  // “Appendear” al nuevo <div> los elementos creados anteriormente .
  cardContainer.innerHTML = `
    <img id="imgClose" class="img-close" data-id=${id} src="assets/icons-exit.png" alt="icono de cierre de la card">
    <img class="img-new-act" src="${imgUrl}" alt="Imagen de la actividad">
    <div class="info-card-container">
    <h3 class="titulo-new-act">${titulo}</h3>
    <p class="p-new-act">${descripcion}</p>
    </div>
`;

  // Retornar el <div> finalizado con todos los elementos correspondientes dentro.
  return cardContainer;
};

const convertActivities = () => {
  // Seleccionar el contenedor donde queremos agregar las actividades.
  const contenedorCard = document.getElementById("contenedor-tarjetas");
  // Vaciar el contenido actual del contenedor. Se puede hacer manipulando la propiedad innerHTML.
  contenedorCard.innerHTML = "";
  // Obtener el listado completo de actividades mediante el método correspondiente de una instancia de Repository.
  const getActivities = repository.getAllActivities();

  // “Mapear” el listado de actividades para convertirlos todos en elementos HTML. Para ello utilizar el método “map”, aprovechando como callback la función que hicimos en el punto anterior. Guardar el resultado del mapeo en una nueva variable.
  const activitiesMaped = getActivities.map((activity) => {
    return generateCard(activity);
  });

  activitiesMaped.forEach((item) => {
    // “Appendear” todos los elementos HTML del nuevo array dentro del contenedor seleccionado. Para ello puedes utilizar el método forEach
    contenedorCard.appendChild(item);
  });
};

const handlerClick = () => {
  // Seleccionar los inputs de title, description e imgUrl.
  const tituloInput = document.getElementById("inputTitulo");
  const descripcionInput = document.getElementById("inputDescripcion");
  const imgURLInput = document.getElementById("inputImgURL");

  // Validar que los inputs no esten vacios
  if (tituloInput.value === "") return alert("Necesitas completar el titulo");

  if (descripcionInput.value === "")
    return alert("Necesitas completar la descripcion");

  if (imgURLInput.value === "")
    return alert("Necesitas completar la URL de la imagen");

  // agregamos la actividad al array de repository
  repository.createActivity(
    tituloInput.value,
    descripcionInput.value,
    imgURLInput.value
  );

  convertActivities();

  tituloInput.value = "";
  descripcionInput.value = "";
  imgURLInput.value = "";

  deleteItem();
};

/*
Seleccionar el botón que disparará el evento de agregar actividad y agregar un Event Listener. El evento, al dispararse, debe ejecutar la función que creamos en el punto anterior.
 */
const buttonAgregar = document.getElementById("boton-agregar");
buttonAgregar.addEventListener("click", handlerClick);

// funcion para eliminar
const deleteItem = () => {
  // seleccionamos los botones
  const deleteIcon = document.querySelectorAll(".img-close");

  // recorremos el array de elementos para agregarle el listener
  deleteIcon.forEach((elem) => {
    elem.addEventListener("click", () => {
      // obtenemos el valor del atributo "data-id", lo parseamos a numero
      const deletID = parseInt(elem.getAttribute("data-id"));

      // lo eliminamos del repository
      repository.deleteActivity(deletID);

      // lo eliminamos del DOM
      const cardToRemove = elem.closest(".card");
      if (cardToRemove) cardToRemove.remove();
    });
  });
};

document.get;
