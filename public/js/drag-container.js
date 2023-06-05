var containers = document.querySelectorAll(".drag");

// Recorremos todos los contenedores con la clase 'drag'
containers.forEach(function(container) {
  // Obtenemos la posición guardada del contenedor desde el almacenamiento local
  var savedPosition = JSON.parse(localStorage.getItem(container.id + "Position"));
  if (savedPosition) {
    container.style.left = savedPosition.left;
    container.style.top = savedPosition.top;
  }

  var offsetX, offsetY;

  container.addEventListener("mousedown", function(e) {
    offsetX = e.clientX - container.offsetLeft;
    offsetY = e.clientY - container.offsetTop;
    console.log(offsetX, offsetY)
    document.addEventListener("mousemove", mousemoveHandler);
  });

  document.addEventListener("mouseup", function(e) {
    document.removeEventListener("mousemove", mousemoveHandler);

    // Guardamos la posición actual del contenedor en el almacenamiento local
    var currentPosition = {
      left: container.style.left,
      top: container.style.top
    };
    localStorage.setItem(container.id + "Position", JSON.stringify(currentPosition));
  });

  function mousemoveHandler(e) {
    var x = e.clientX - offsetX;
    var y = e.clientY - offsetY;
    console.log(x,",",y)
    container.style.left = x + "px";
    container.style.top = y + "px";
  }
});
