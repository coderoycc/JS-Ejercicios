// Funcion para iterar un contenendor con subcontenedores para escuchar evento clic
document.querySelectorAll("#productodatos").forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(event.target.tagName);
        var tagName = event.target.tagName;
        var select = event.target;
      })
})


// Encontrar evento clic de un contenedor y obtener el mismo con $(this) de jquery
$(document).on("click", ".btn-number", function (e) {
      e.preventDefault();
      fieldName = $(this).attr("data-field");
      let idProd = fieldName.match(/\[(.*?)\]/)[1];
      console.log(idProd,'---- valor ID')
      type = $(this).attr("data-type");
})
