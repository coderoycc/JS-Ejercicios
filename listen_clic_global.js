document.querySelectorAll("#productodatos").forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(event.target.tagName);
        var tagName = event.target.tagName;
        var select = event.target;
      })
})
// Funcion para iterar un contenendor con subcontenedores para escuchar evento clic
