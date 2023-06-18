let pagActual = 1;
let datos = [];
let paginas = 0;
$(document).ready(() =>{
  
  $.ajax({
    url: './main.php',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data.success)
      datos = data.data;
      console.log(datos)
      const cantidad = data.data.length;
      const maximo = 2;
      paginas = Math.ceil(cantidad / maximo);
      let html = '';
      for (let i = 1; i <= paginas; i++) {
        html += `<li class="page-item" onclick="getActualPage(${i})" id="pg${i}"><a class="page-link" href="#" >${i}</a></li>`;
      }
      html += `
      <li class="page-item" onclick="getNextPage()">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Siguiente</span>
        </a>
      </li>`;
      $('#pagination').append(html);
      console.log(data.data.length)
      mostrar();

    },
    error: (error) => {
      console.log(error)
    }
  })


})

function mostrar(){
  $(".page-item").removeClass('active');
  $("#pg" + pagActual).addClass('active');
  let html = '';
  let inicio = (pagActual - 1) * 2;
  let final = inicio + 2;
  final = (final > datos.length) ? datos.length : final;
  for (let i = inicio; i < final; i++) {
    html += `
      <tr>
        <td>${datos[i].nombre}</td>
        <td>${datos[i].apellido}</td>
        <td>${datos[i].edad}</td>
      </tr>
    `;
  }
  $('#tbody').append(html);

}
const getPreviousPage = () => {
  if (pagActual > 1) {
    pagActual--;
    $('#tbody').html('');
    mostrar();
  }
}
const getNextPage = () => {
  if (pagActual < paginas) {
    pagActual++;
    $('#tbody').html('');
    mostrar();
  }
}
const getActualPage = (page) => {
  pagActual = page;
  $('#tbody').html('');
  mostrar();
}