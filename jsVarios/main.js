$(document).ready(() =>{
  $.ajax({
    url: './main.php',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data.success)
      console.log(data.data)
      const cantidad = data.data.length;
      const maximo = 2;
      const paginas = Math.ceil(cantidad / maximo);
      let html = '';
      for (let i = 1; i <= paginas; i++) {
        html += `<li class="page-item" onclick="getActualPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
      }
      html += `
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>`;
      $('#pagination').append(html);
      console.log(data.data.length)
    },
    error: (error) => {
      console.log(error)
    }
  })
})

const getActualPage = (page) => {
  console.log("Actual click ", page)
}