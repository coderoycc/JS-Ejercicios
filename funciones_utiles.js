// Funcion para cmabiar a una nueva pagina con JS
function ver_detalle(id) {
  // console.log("id producto: ", id);
  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "shop-details.php");
  form.innerHTML = `
        <input type="hidden" name="id" value="${id}">
    `;
  document.body.appendChild(form);
  form.submit();
  form.remove();
}
