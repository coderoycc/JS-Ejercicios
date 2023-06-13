// function load(page, filter1, buscador1) {
//     var parametros = { "action": "ajax", "page": page };

//     $("#loader").fadeIn('slow');
//     $.ajax({
//         url: 'listar.php?filter=' + filter1 + '&buscar=' + buscador1 + '&page=' + page,
//         data: parametros,
//         beforeSend: function (objeto) {
//             $("#loader").html("<img src='loader.gif'>");
//         },
//         success: function (data) {
//             $(".outer_div").html(data).fadeIn('slow');
//             $("#loader").html("");
//         }
//     })
// }
// var carrito = [];
var idMarca = 0;
var paginadorglobal = 0;
var carrito = new Map([]);
var checkboxesChecked = [];
var mainService = new MainService($);

var nombrecarrito = "carrito";
var pagina_actual = 1;
// CUANDO EL DOCUMENTO ESTE LISTO
$(document).ready(function () {
  console.log(
    "La resolución de tu pantalla es: " + screen.width + " x " + screen.height
  );
  if (screen.width < 420) {
    $("#navbarSupportedContent").show();
  }
  var storage;
  try {
    if (localStorage.getItem) {
      var id_cliente = localStorage.getItem("user_id_cliente");
      if (id_cliente == null) {
        id_cliente = 0;
      }
      var nombre_cliente = localStorage.getItem("user_cliente");
      if (nombre_cliente == null) {
        nombre_cliente = "";
      }
    }
  } catch (e) {
    storage = {};
  }
  console.log(id_cliente);
  $("#idusuario").val(id_cliente);
  $("#user_cliente").val(nombre_cliente);
  if (nombre_cliente == "" && id_cliente == 0) {
    $("#inicio_sesion").show();
    $("#fin_sesion").hide();
    $("#boton_listado").hide();
  } else {
    $("#inicio_sesion").hide();
    $("#fin_sesion").show();
    $("#inicio_sesion_texto").text(nombre_cliente);
    $("#inicio_sesion_texto").prop("href", "./user/perfil.php");
    $("#boton_listado").show();
  }
  $("#inicio_sesion_texto").css("color", "white");

  // listarCategorias();
  listarMenu2();
  selectcategoria();

  if (parseInt($("#sw").val()) > 0) {
    pagina_actual = parseInt($("#pagina").val());
    console.log("Caso de inicio sw: ", pagina_actual, parseInt($("#sw").val()));
    listarProductos(pagina_actual);
  } else {
    console.log("Caso de inicio normal: ", pagina_actual);
    listarProductos(pagina_actual);
  }
  // var buscador = document.getElementsByName('buscador')[0].value;
  // if(buscador == ""){
  //     // listarProductos(1);
  //     console.log("buscador vacio");
  // }
  // else{
  //     console.log("buscador lleno");
  //     selectpaginationB(1);
  // }

  // totalpaginacion(1);
  // selectpagination();
  cargarCarritoStorage();
  addCarrito();
  gotoDetails();
  addreduce();

  // listarMarcas();

  selectCheckbox();

  function listarMarcas() {
    console.log("LISTAR MARCAS");

    var idCategoria = document
      .getElementById("idCategoria")
      .getAttribute("data-value");

    console.log("categoria " + idCategoria);

    var buscar = document.getElementById("search").value;

    console.log("buscar " + buscar);

    var precioMin = document.getElementById("precioMin").value;
    var precioMax = document.getElementById("precioMax").value;

    console.log("precios  " + precioMin + "  " + precioMax);

    mainService
      .listarMarcas(idCategoria, buscar, precioMin, precioMax)
      .then((data) => {
        // console.log("listarMarcas");
        // console.log(data);
        var jsonData = JSON.parse(data);
        if (jsonData.success) {
          var test = document.getElementById("test");

          test.innerHTML = "";

          var ul = document.createElement("ul");
          ul.setAttribute("class", "list-group-flush");

          for (let i = 0; i < jsonData.data.length; i++) {
            const element = jsonData.data[i];

            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item");

            var div = document.createElement("div");
            div.setAttribute("class", "form-check");

            var input = document.createElement("input");
            input.setAttribute("class", "form-check-input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", "pruebita[]");
            input.setAttribute("value", "" + element.idMarca);

            // input.checked = true;

            var label = document.createElement("label");
            label.setAttribute("class", "form-check-label");
            label.innerHTML = element.marca;

            div.appendChild(input);
            div.appendChild(label);

            li.appendChild(div);
            ul.appendChild(li);
          }

          test.appendChild(ul);
        } else {
          console.log("No existen datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function listarProductos(pag) {
    console.log("LISTAR PRODUCTOS");
    var idCategoria = document
      .getElementById("idCategoria")
      .getAttribute("data-value");
    idMarca = document
      .getElementById("idCategoria")
      .getAttribute("data-idmarca");
    idMarcaFiltro = document
      .getElementById("idCategoria")
      .getAttribute("data-idmarcafiltro");
    // console.log("categoria "+idCategoria);

    var buscar = document.getElementById("search").value;

    // console.log("buscar " + buscar);

    var precioMin = document.getElementById("precioMin").value;
    var precioMax = document.getElementById("precioMax").value;

    // console.log("precios  " + precioMin +"  "+ precioMax);

    if (checkboxesChecked.length > 0) {
      console.log("entro");
    }

    var ele = document.getElementsByName("optradio");
    var orden = "";

    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        console.log("orden: " + ele[i].value);
        orden = ele[i].value;
      }
    }

    // var textobusca = document.getElementById('idCategoria').getAttribute('data-busca');
    console.log(
      idCategoria,
      buscar,
      precioMin,
      precioMax,
      checkboxesChecked,
      orden,
      pag,
      idMarca
    );
    mainService
      .listarProductos(
        idCategoria,
        buscar,
        precioMin,
        precioMax,
        checkboxesChecked,
        orden,
        pag,
        idMarca,
        idMarcaFiltro
      )

      .then((data) => {
        // console.log(data);
        var jsonData = JSON.parse(data);
        if (jsonData.success) {
          var div = document.getElementById("idlistaProductos");
          sw = false;
          div.innerHTML = "";
          var i = 0;
          for (i = 0; i < jsonData.data.length; i++) {
            const element = jsonData.data[i];
            // console.log(element);

            if (i % 2 == 0) {
              divcolp = document.createElement("div");
              sw = false;
              divcolp.setAttribute("class", "col-sm-6 form-inline");
            }

            var divcol = document.createElement("div");
            divcol.setAttribute("class", "col-sm-6 productoitem");

            var divpro = document.createElement("div");
            divpro.setAttribute("class", "productoimagen");

            var aimagen = document.createElement("a");
            aimagen.setAttribute("href", "#");

            var img = document.createElement("img");
            var span = document.createElement("span");
            img.src =
              "https://webinventario.com/producto/base_imagen/aswan/normal/1_" +
              element.idProducto +
              ".jpg";
            img.setAttribute(
              "onerror",
              'this.src="https://webinventario.com/producto/base_imagen/aswan/normal/1_0.jpg"'
            );

            img.setAttribute("data-field", "quant[" + element.idProducto + "]");
            img.setAttribute("data-value", element.idProducto + "");
            img.setAttribute('class', 'imagen-etiqueta')
            span.setAttribute('class', 'etiqueta');
            span.textContent='Oferta';

            aimagen.appendChild(img);
            aimagen.appendChild(span);

            divpro.appendChild(aimagen);
            divcol.appendChild(divpro);

            var descripcion = document.createElement("p");
            var negrita = document.createElement("b");
            descripcion.setAttribute("class", "descripcion limit-2");
            negrita.innerHTML = element.nombreComercial;
            descripcion.appendChild(negrita);

            var stock = document.createElement("p");
            stock.setAttribute("class", "stock");

            var p = document.createElement("p");
            if (element.precioU1 < 1 && element.tipoVenta == "JERARQUIAS") {
              p.innerHTML =
                " Bs." + parseFloat(element.pre_cajape01).toFixed(2);
            } else {
              p.innerHTML = " Bs." + parseFloat(element.precioU1).toFixed(2);
            }

            divcol.appendChild(descripcion);

            if (element.existencia > 0) {
              if (element.existencia > 50) {
                stock.innerHTML = " Disponible : más de 50 u.";
              } else {
                stock.innerHTML =
                  " Disponible : " +
                  parseInt(element.existencia) +
                  " unidades.";
              }
            }

            if (element.existencia / element.piezasxCajaPeque >= 1) {
              if (
                element.existencia / element.piezasxCajaPeque > 50 &&
                element.tipoVenta == "JERARQUIAS"
              ) {
                stock.innerHTML = " Disponibdle : más de 50 u.";
                console.log(
                  element.existencia / element.piezasxCajaPeque +
                    " " +
                    element.idProducto
                );
              }
              if (
                element.existencia / element.piezasxCajaPeque < 50 &&
                element.tipoVenta == "JERARQUIAS"
              ) {
                stock.innerHTML =
                  " Disponible : " +
                  parseInt(element.existencia / element.piezasxCajaPeque) +
                  " unidades.";
              }
            }

            // else{
            //     stock.innerHTML = " Disponilbe : cero unidades";
            // }
            divcol.appendChild(stock);
            divcol.appendChild(p);

            var divmasmenos = document.createElement("div");
            divmasmenos.setAttribute("class", "container-fluid");

            var row = document.createElement("div");
            row.setAttribute("class", "row");

            var col = document.createElement("div");
            col.setAttribute("class", "col-lg-12 col-md-12");

            var inputgroup = document.createElement("div");
            inputgroup.setAttribute("class", "input-group");

            var prepend = document.createElement("span");
            prepend.setAttribute("class", "input-group-prepend");

            var button = document.createElement("button");
            button.setAttribute(
              "class",
              "btn btn-outline-secondary btn-number"
            );
            button.setAttribute("type", "button");
            // button.setAttribute('disabled','disabled');
            button.setAttribute("data-type", "minus");
            button.setAttribute(
              "data-field",
              "quant[" + element.idProducto + "]"
            );

            var spanminus = document.createElement("span");
            spanminus.setAttribute("class", "fa fa-minus");

            button.appendChild(spanminus);
            prepend.appendChild(button);
            inputgroup.appendChild(prepend);

            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("name", "quant[" + element.idProducto + "]");
            input.setAttribute("class", "form-control input-number");
            input.setAttribute("value", "1");
            input.setAttribute("min", "1");
            input.setAttribute("max", "100");
            input.setAttribute("style", "text-align: center");

            inputgroup.appendChild(input);

            var append = document.createElement("span");
            append.setAttribute("class", "input-group-append");

            var buttonp = document.createElement("button");
            buttonp.setAttribute(
              "class",
              "btn btn-outline-secondary btn-number"
            );
            buttonp.setAttribute("type", "button");
            buttonp.setAttribute("data-type", "plus");
            buttonp.setAttribute(
              "data-field",
              "quant[" + element.idProducto + "]"
            );

            var spanplus = document.createElement("span");
            spanplus.setAttribute("class", "fa fa-plus");

            buttonp.appendChild(spanplus);
            append.appendChild(buttonp);
            inputgroup.appendChild(append);
            col.appendChild(inputgroup);
            row.appendChild(col);

            divmasmenos.appendChild(row);

            var divagregar = document.createElement("div");
            divagregar.setAttribute("class", "container-fluid productocarrito");

            var rowagre = document.createElement("div");
            rowagre.setAttribute("class", "row");

            var divagre = document.createElement("div");
            divagre.setAttribute("class", "col-lg-12 col-md-12");

            var a = document.createElement("a");
            a.setAttribute("style", "color:black");
            a.setAttribute("type", "button");
            a.setAttribute("class", "btn site-btn btn-block");
            a.setAttribute("href", "#");
            a.innerHTML = "Agregar ";
            a.setAttribute("data-value", element.idProducto + "");
            a.setAttribute("data-existencia", element.existencia + "");

            var iagre = document.createElement("i");
            iagre.setAttribute("class", "fa fa-shopping-cart");
            iagre.setAttribute("style", "color:black");
            iagre.setAttribute("data-value", element.idProducto + "");

            a.appendChild(iagre);
            divagre.appendChild(a);
            rowagre.appendChild(divagre);
            divagregar.appendChild(rowagre);

            divcol.appendChild(divmasmenos);
            divcol.appendChild(divagregar);

            if (i % 2 == 1) {
              divcolp.appendChild(divcol);
              sw = true;
              div.appendChild(divcolp);
            } else {
              divcolp.appendChild(divcol);
            }
          }
          console.log(sw);
          if (!sw) {
            var divcol = document.createElement("div");
            divcol.setAttribute("class", "col-sm-6 productoitem");
            divcolp.appendChild(divcol);
            div.appendChild(divcolp);
          }

          if (i >= jsonData.data.length) {
            console.log("globallll " + i);
            switch (paginadorglobal) {
              case 0:
                totalpaginacion(1);
                listarMarcas();
                break;
              case 1:
                paginadorglobal = 0;
                pagina_actual = pag;
                console.log("entro por el 1 " + pag);
                break;
              case 2:
                paginadorglobal = 0;
                totalpaginacion(pag);
                break;
            }
          }
        } else {
          var div = document.getElementById("idlistaProductos");

          div.innerHTML = "Productos no encotrados";
          div.style.textAlign = "center";
          console.log("No existen datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function totalpaginacion(nropaginas) {
    console.log("LISTAR TOTAL");

    var idCategoria = document
      .getElementById("idCategoria")
      .getAttribute("data-value");
    idMarca = document
      .getElementById("idCategoria")
      .getAttribute("data-idmarca");
    // console.log("categoria "+idCategoria);

    var buscar = document.getElementById("search").value;

    // console.log("buscar " + buscar);

    var precioMin = document.getElementById("precioMin").value;
    var precioMax = document.getElementById("precioMax").value;

    // console.log("precios  " + precioMin +"  "+ precioMax);

    console.log("totalpaginacion" + idCategoria);

    if (checkboxesChecked.length > 0) {
      console.log("entro");
    }
    // idCategoria

    mainService
      .listartptalpaginacion(
        idCategoria,
        buscar,
        precioMin,
        precioMax,
        checkboxesChecked,
        idMarca
      )
      .then((data) => {
        console.log(data);
        var jsonData = JSON.parse(data);
        if (jsonData.success) {
          var total = jsonData.data[0].total;
          // paginadorglobal = 0;

          //  var total = Math.ceil(total/12);
          console.log("total" + total);
          console.log("nropaginas" + nropaginas);

          console.log("ready!" + total, 5, nropaginas, 12);

          $("#page").remove();

          var div = document.getElementById("idTotalpaginacion");

          var divq = document.createElement("div");
          divq.setAttribute("class", "demo");

          var divp = document.createElement("div");
          divp.setAttribute("style", "text-align: center;");
          divp.id = "page";

          var ul = document.createElement("ul");
          ul.setAttribute("class", "pagination");

          divp.appendChild(ul);
          divq.appendChild(divp);
          div.appendChild(divp);

          $("#page").Pagination(
            {
              size: total,
              pageShow: 5,
              page: nropaginas,
              limit: 12,
            },
            function (obj) {
              paginadorglobal = 1;
              listarProductos(obj.page);
              console.log("por que entra esto" + obj.page);
            }
          );
          $(".page" + nropaginas).addClass("active");
          console.log("TOTAL PAGINATIONNNNNNNNNNNNNNNNNNNNNNNNNN");
        } else {
          console.log("No existen datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function selectpagination() {
    console.log("selectpagination");
    $("#page").Pagination(
      {
        size: 87,
        pageShow: 5,
        page: 1,
        limit: 12,
      },
      function (obj) {
        paginadorglobal = 1;
        console.log("por que entra esto" + obj.page);
      }
    );
  }

  function addreduce() {
    $(document).on("click", ".btn-number", function (e) {
      // console.log("entrooo");

      e.preventDefault();

      fieldName = $(this).attr("data-field");
      type = $(this).attr("data-type");
      var input = $("input[name='" + fieldName + "']");
      var currentVal = parseInt(input.val());
      if (!isNaN(currentVal)) {
        if (type == "minus") {
          if (currentVal > input.attr("min")) {
            input.val(currentVal - 1).change();
          }
          if (parseInt(input.val()) == input.attr("min")) {
            $(this).attr("disabled", true);
          }
        } else if (type == "plus") {
          if (currentVal < input.attr("max")) {
            input.val(currentVal + 1).change();
          }
          if (parseInt(input.val()) == input.attr("max")) {
            $(this).attr("disabled", true);
          }
        }
      } else {
        input.val(0);
      }
    });
    $(document).on("focusin", ".input-number", function () {
      // $('.input-number').focusin(function(){
      $(this).data("oldValue", $(this).val());
    });

    $(document).on("change", ".input-number", function () {
      // $('.input-number').change(function() {
      // console.log("entro en input number");

      minValue = parseInt($(this).attr("min"));
      maxValue = parseInt($(this).attr("max"));
      valueCurrent = parseInt($(this).val());

      namesd = $(this).attr("name");
      // console.log(namesd);
      if (valueCurrent >= minValue) {
        $(
          ".btn-number[data-type='minus'][data-field='" + namesd + "']"
        ).removeAttr("disabled");
      } else {
        alert("Sorry, the minimum value was reached");
        $(this).val($(this).data("oldValue"));
      }
      if (valueCurrent <= maxValue) {
        $(
          ".btn-number[data-type='plus'][data-field='" + namesd + "']"
        ).removeAttr("disabled");
      } else {
        alert("Sorry, the maximum value was reached");
        $(this).val($(this).data("oldValue"));
      }
    });

    $(".input-number").keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if (
        $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    });
  }

  function gotoDetails() {
    var idCategoria = document
      .getElementById("idCategoria")
      .getAttribute("data-value");
    var idMarca = document
      .getElementById("idCategoria")
      .getAttribute("data-idmarca");
    var busca = document
      .getElementById("idCategoria")
      .getAttribute("data-busca");

    document.querySelectorAll("#idlistaProductos").forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(event.target);
        var tagName = event.target.tagName;
        var select = event.target;
        if (tagName == "IMG") {
          console.log("gotoDetails");

          var id = select.getAttribute("data-value");
          console.log("id: " + id, idCategoria, idMarca, busca, pagina_actual);

          var form = document.createElement("form");
          form.setAttribute("action", "shop-details.php");
          form.setAttribute("method", "post");

          // var imputid = document.createElement("input");
          // imputid.value = id;
          // imputid.setAttribute("name","id");

          // var categoria = document.createElement("input");
          // categoria.value = idCategoria;
          // categoria.setAttribute("name","categoria");

          // var marca = document.createElement("input");
          // marca.value = idMarca;
          // marca.setAttribute("name","marca");

          // var buscar = document.createElement("input");
          // buscar.value = busca;
          // buscar.setAttribute("name","busca");

          // var pagina = document.createElement("input");
          // pagina.value = pagina_actual;
          // pagina.setAttribute("name","pagina");

          // form.appendChild(imputid);
          // form.appendChild(categoria);
          // form.appendChild(marca);
          // form.appendChild(buscar);
          // form.appendChild(pagina);

          // document.body.appendChild(form)

          form.innerHTML = `
                    <input type="hidden" name="id" value="${id}">
                    <input type="hidden" name="categoria" value="${idCategoria}">
                    <input type="hidden" name="marca" value="${idMarca}">
                    <input type="hidden" name="busca" value="${busca}">
                    <input type="hidden" name="pagina" value="${pagina_actual}">`;
          document.body.appendChild(form);
          form.submit();
          form.remove();
        }
      });
    });
  }
  function addCarrito() {
    document.querySelectorAll("#idlistaProductos").forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(event.target.tagName);
        var tagName = event.target.tagName;
        var select = event.target;
        if (tagName == "A" || tagName == "I") {
          console.log("carrito agregado");

          var id = select.getAttribute("data-value");
          var existencia = select.getAttribute("data-existencia");

          var input = $("input[name='quant[" + id + "]']");
          var currentVal = parseInt(input.val());

          var cantidad = currentVal;
          if (parseInt(cantidad) <= parseInt(existencia)) {
            // producto = new Item(id, 1);
            // const resultado = carrito.find(proc => proc.id === '4931' );

            if (carrito.has(id)) {
              console.log(carrito.get(id) + "obtener carrito");
              cantidad = carrito.get(id) + currentVal;
            }
            carrito.set(id, cantidad);

            console.log("currentVal" + currentVal);

            var carritototal = document.getElementById("carritototal");
            carritototal.innerHTML = carrito.size;

            if (typeof Storage !== "undefined") {
              // Store
              // localStorage.setItem("carrito", carrito);
              localStorage.setItem(
                nombrecarrito,
                JSON.stringify(Array.from(carrito.entries()))
              );

              console.log("guardado");
              map = new Map(JSON.parse(localStorage.getItem(nombrecarrito)));
              console.log(map);
              alertify.success('Producto agregado');
              // avisos("Producto Agregado");
              // Retrieve
              // document.getElementById("result").innerHTML = localStorage.getItem("lastname");
            } else {
              console.log("Erroe storage");
            }
          } else {
            alerta("Cantidad del Producto Insuficiente.");
          }
        }
      });
    });
  }

  function cargarCarritoStorage() {
    if (typeof Storage !== "undefined") {
      console.log("cargarCarritoStorage");

      if (
        localStorage.getItem("user_email") !== "" &&
        localStorage.getItem("user_email") !== null
      ) {
        nombrecarrito = "carrito" + localStorage.getItem("user_email");
        console.log(nombrecarrito);
        console.log(localStorage.getItem("user_email"));
      }
      // console.log("locallll"+localStorage.getItem(nombrecarrito));
      if (
        localStorage.getItem(nombrecarrito) !== null &&
        localStorage.getItem(nombrecarrito) !== ""
      ) {
        map = new Map(JSON.parse(localStorage.getItem(nombrecarrito)));

        var carritototal = document.getElementById("carritototal");
        carritototal.innerHTML = map.size;
        carrito = map;
        console.log(map);
      } else {
        console.log("vacio storage");
      }
    } else {
      console.log("Erroe storage");
    }
  }

  function listarMenu2() {
    console.log("Listado Categorias y marcas");
    mainService
      .listarCategorias()
      .then((data) => {
        var jsonData = JSON.parse(data);
        console.log("JSONDATA2", jsonData);
        if (jsonData.success) {
          var ulf = document.getElementById("todoListo");
          // <ul class="dropdown-menu">
          var ulprim = document.createElement("ul");
          ulprim.setAttribute("class", "dropdown-menu show");
          ulprim.setAttribute("aria-labellebdy", "navbarDropdownMenuLink");
          ulprim.setAttribute("style", "width: auto; ");

          var span = document.createElement("span");
          span.setAttribute("class", "caret");

          // butt.insertBefore(span,butt.firstChild);
          // ul.appendChild(butt);

          for (let i = 0; i < jsonData.data.length; i++) {
            const element = jsonData.data[i];
            var liprim = document.createElement("li");
            if (element.marca.length != 0) {
              //   console.log("aqui hay una marca");
              //   console.log("element", element);
              liprim.setAttribute("class", "dropdown-submenu");
              // <a class="test" tabindex="-1" href="#">New dropdown <span class="caret"></span></a>

              // var div = document.createElement("div");
              // div.setAttribute("class", "dropdown-submenu");
              var a = document.createElement("a");
              a.setAttribute("id", "dropdownMenu" + element.idGrupo);
              a.setAttribute("class", "dropdown-item dropdown-toggle");
              a.href = "#";
              var span = document.createElement("span");
              span.setAttribute("class", "caret");

              a.textContent = element.grupo;
              a.setAttribute("data-toggle", "dropdown");

              var ul2 = document.createElement("ul");
              ul2.setAttribute("class", "dropdown-menu");
              ul2.setAttribute("style", "overflow:auto; max-height:465px");

              for (let j = 0; j < jsonData.data[i].marca.length; j++) {
                const element2 = jsonData.data[i].marca[j];
                // console.log("textContent", element2);
                // <li><a tabindex="-1" href="#">2nd level dropdown</a></li>
                var li2 = document.createElement("li");
                var a2 = document.createElement("a");
                // a2.setAttribute("tabindex", "-1");
                a2.href = "#";
                a2.setAttribute("class", "dropdown-item");
                a2.textContent = element2.familia;
                a2.setAttribute(
                  "id",
                  element.idGrupo + ":" + element2.idFamilia
                );

                li2.insertBefore(a2, li2.firstChild);
                ul2.insertBefore(li2, ul2.firstChild);
                // div2.insertBefore(a2, div2.firstChild);
              }

              // div.insertBefore(div2, div.firstChild);
              liprim.insertBefore(ul2, liprim.firstChild);
              liprim.insertBefore(a, liprim.firstChild);

              // div.insertBefore(a, div.firstChild);
              // ul.appendChild(div);
            } else {
              //   console.log("aqui no hay no marca");
              //   console.log("element2", element);
              // <li><a tabindex="-1" href="#">CSS</a></li>
              var a = document.createElement("a");
              a.setAttribute("class", "dropdown-item");
              a.setAttribute("data-value", "" + element.grupo);

              var icon = document.createElement("icon");
              icon.setAttribute("class", "fa fa-user");
              icon.style.paddingRight = "20px";
              icon.style.paddingLeft = "10px";

              a.id = element.idGrupo;
              a.href = "#";
              a.textContent = element.grupo;
              // a.setAttribute("data-toggle", "dropdown");
              // a.setAttribute("tabindex","-1");
              a.insertBefore(icon, a.firstChild);
              // a.appendChild(icon);
              // element.grupo;
              // ul.appendChild(a);
              liprim.insertBefore(a, liprim.firstChild);
            }
            ulprim.appendChild(liprim);
          }

          ulf.insertBefore(ulprim, ulf.firstChild);
        } else {
          console.log("No existen datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function listarCategorias() {
    console.log("listar categorias");

    mainService
      .listarCategorias()
      .then((data) => {
        // console.log(data);
        var jsonData = JSON.parse(data);
        if (jsonData.success) {
          var ul = document.getElementById("idCategorias");

          for (let i = 0; i < jsonData.data.length; i++) {
            // <a class="dropdown-item" href="#"><i class="fa fa-user" ></i>Action</a>
            const element = jsonData.data[i];

            var a = document.createElement("a");
            a.setAttribute("class", "dropdown-item");
            a.setAttribute("data-value", "" + element.grupo);
            var icon = document.createElement("icon");
            icon.setAttribute("class", "fa fa-user");
            icon.style.paddingRight = "20px";
            icon.style.paddingLeft = "10px";

            a.id = element.idGrupo;
            a.href = "#";
            a.textContent = element.grupo;
            a.insertBefore(icon, a.firstChild);
            // a.appendChild(icon);

            element.grupo;
            ul.appendChild(a);
          }
        } else {
          console.log("No existen datos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function selectcategoria() {
    document.querySelector("#todoListo").addEventListener("click", (event) => {
      var idahora = event.target.id.toString();
      var h = idahora.substring(0, 1);
      if (h != "d") {
        // console.log(event.target.id);

        var form = document.createElement("form");
        form.setAttribute("action", "shop-grid.php");
        form.setAttribute("method", "post");

        var ids = idahora.split(":");
        if (ids.length === 2) {
          var idmarca = document.createElement("input");
          idmarca.value = ids[1];
          idmarca.setAttribute("name", "idmarca");
          form.appendChild(idmarca);
        }
        var categoria = document.createElement("input");
        categoria.value = ids[0];
        categoria.setAttribute("name", "categoria");

        // form.setAttribute('target','_blank');

        var active = document.createElement("input");
        active.value = "shop";
        active.setAttribute("name", "active");

        var categorianombre = document.createElement("input");
        categorianombre.value = event.target.getAttribute("data-value");
        categorianombre.setAttribute("name", "categorianombre");

        form.appendChild(categoria);
        form.appendChild(active);
        form.appendChild(categorianombre);

        document.body.appendChild(form);
        form.submit();
        form.remove();
      }

      // handle click
      // event.target.id;
      //
    });
  }

  $("#formprecio").submit(function (e) {
    e.preventDefault();

    var buscarmin = document.getElementById("precioMin").value;

    var buscarmax = document.getElementById("precioMax").value;

    if (buscarmin >= 0 && buscarmax >= 0) {
      console.log(e);
      listarProductos(1);
    }
  });


  function avisos(texto) {
    swal({
      title: "Listo!",
      text: texto,
      icon: "success",
      dangerMode: true,
    });
  }

  function alerta(texto) {
    swal({
      title: "Aviso!",
      text: texto,
      icon: "warning",
      dangerMode: true,
    });
  }

  function selectCheckbox() {
    $(document).on("change", "input[type='checkbox']", function () {
      if (this.checked) {
        console.log("checked");
        checkboxesChecked = [];
        document
          .querySelectorAll("input[type=checkbox]:checked")
          .forEach(function (elem) {
            checkboxesChecked.push(elem.value);
          });
        console.log(checkboxesChecked);
        paginadorglobal = 2;
        listarProductos(1);
        // totalpaginacion(1);
      } else {
        checkboxesChecked = [];
        document
          .querySelectorAll("input[type=checkbox]:checked")
          .forEach(function (elem) {
            checkboxesChecked.push(elem.value);
          });

        console.log(checkboxesChecked);
        paginadorglobal = 2;
        listarProductos(1);
        // totalpaginacion(1);
      }
    });

    $(document).on("change", "input[type='radio']", function () {
      if (this.checked) {
        console.log("checked radio " + this.value);
        paginadorglobal = 1;
        listarProductos(1);
      }
    });
  }

  $("#formBuscador").submit(function (e) {
    e.preventDefault();
    console.log("BUSCADOR");
    console.log(e);

    listarProductos(1);
  });

  function onerror() {
    console.log("erorrrrrr");
  }
});

$(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
  if (!$(this).next().hasClass("show")) {
    $(this).parents(".dropdown-menu").first().find(".show").removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass("show");

  $(this)
    .parents("li.nav-item.dropdown.show")
    .on("hidden.bs.dropdown", function (e) {
      $(".dropdown-submenu .show").removeClass("show");
    });

  return false;
});
