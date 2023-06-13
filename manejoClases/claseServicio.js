function MainService($) {

    //Agregar division
    this.listarCarrito = function (carrito) {

        return new Promise(function (resolve, reject) {
            $.get(`cart/php/listarCarrito.php?carrito=${carrito}`, function (data, status) {         
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }
    this.listarCategorias = function () {

        return new Promise(function (resolve, reject) {
            $.get(`cart/php/listarCategorias.php`, function (data, status) {         
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }

    this.buscar = function (event,pag) {
        return new Promise(function (resolve, reject) {
            var formulario = event.target;
            event.preventDefault();
            var formData = new FormData(formulario);
            formData.append('pag', pag);
            
            // var id = formulario.getAttribute('slug');
            $.ajax({
                url: `cart/php/listarProductosB.php`,
                type: "POST",
                data: formData,
                beforeSend: function (objeto) {
                    // $(".datos_ajax_delete").html("Mensaje: Cargando...");
                    console.log("Antes de elemento");
                },
                success: function (datos) {
                    return resolve(datos);
                },
                error: function (err) {
                    return reject(err);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }

    this.listarMarcas = function () {

        return new Promise(function (resolve, reject) {
            $.get(`main/php/listarMarcas.php`, function (data, status) {         
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }

    this.listartptalpaginacion = function (categoria) {

        return new Promise(function (resolve, reject) {
            $.get(`shop/php/totalpaginacion.php?categoria=${categoria}`, function (data, status) {         
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }

    //Editar division
    this.editarEquipo = function (event) {
        return new Promise(function (resolve, reject) {
            var formulario = event.target;
            event.preventDefault();
            var formData = new FormData(formulario);
            var nombreDivision = formulario.querySelector("[name='division']").value;
            formData.append('division', nombreDivision);
            var id = formulario.getAttribute('slug');

            $.ajax({
                url: `editarDivision.php?id=${id}`,
                type: "POST",
                data: formData,
                beforeSend: function (objeto) {
                    // $(".datos_ajax_delete").html("Mensaje: Cargando...");
                    console.log("Antes de elemento");
                },
                success: function (datos) {
                    return resolve(datos);
                },
                error: function (err) {
                    return reject(err);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }

    //Agregar categoria division

    this.sendCategoria = function (event) {

        return new Promise(function (resolve, reject) {
            var formulario = event.target;
            event.preventDefault();
            var formData = new FormData(formulario);
            var nombreDivision = formulario.querySelector("[name='categoria']").value;
            var id = formulario.getAttribute('slug');
            formData.append('division', nombreDivision);
            formData.append('idDivision', id)

            $.ajax({
                url: `adicionarCategoriaDivision.php`,
                type: "POST",
                data: formData,
                beforeSend: function (objeto) {
                    // $(".datos_ajax_delete").html("Mensaje: Cargando...");
                    console.log("Antes de elemento");
                },
                success: function (datos) {
                    return resolve(datos);
                },
                error: function (err) {
                    return reject(err);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }

    this.postJugadoresEquipo = function (event, form, slugEquipo) {
        return new Promise(function (resolve, reject) {
            console.log(form);
            var formData = new FormData(form);
            formData.append('idEquipo', slugEquipo);
            $.ajax({
                url: "adicionarJugadorEquipo.php",
                type: 'POST',
                data: formData,
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }
    this.putJugadoresEquipo = function (event, form, slugJugador) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData(form);
            formData.append('idJugador', slugJugador);
            $.ajax({
                url: "editarJugador.php",
                type: 'POST',
                data: formData,
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }

    this.deleteJugadorEquipo = function (formulario) {
        console.log(formulario);

        var formData = new FormData(formulario);
        // formData.append('idJugador',formulario.querySelector("[name='idJugador']").value)

        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "eliminaJugadorEquipo.php",
                data: formData,
                beforeSend: function (objeto) {
                    // $( ".datos_ajax_delete").html("Mensaje: Cargando...");
                },
                success: function (datos) {
                    resolve(datos);
                },
                error: function (error) {
                    reject(error);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }
    //Editar listar categoria
    this.listarEquiposCampeonato = function (campeonato) {

        return new Promise(function (resolve, reject) {
            $.get(`listarEquipos.php?slugCampeonato=${campeonato}`, function (data, status) {
                
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }

    this.listarEquiposTodo = function () {

        return new Promise(function (resolve, reject) {
            $.get(`listarEquiposTodo.php`, function (data, status) {
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }

    //eliminar categoria
    this.eliminarEquipo = function (formulario) {
        var formData = new FormData(formulario);

        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "eliminarEquipo.php",
                data: formData,
                beforeSend: function (objeto) {
                    // $( ".datos_ajax_delete").html("Mensaje: Cargando...");
                },
                success: function (datos) {
                    resolve(datos);
                },
                error: function (error) {
                    reject(error);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }

    this.sendDataEditarEquipo = function (event) {
        return new Promise(function (resolve, reject) {
            var formulario = event.target;
            event.preventDefault();
            var formData = new FormData(formulario);
            var id = formulario.getAttribute('slug');
            $.ajax({
                url: `editarEquipo.php?id=${id}`,
                type: "POST",
                data: formData,
                beforeSend: function (objeto) {
                    // $(".datos_ajax_delete").html("Mensaje: Cargando...");
                    console.log("Antes de elemento");
                },
                success: function (datos) {
                    return resolve(datos);
                },
                error: function (err) {
                    return reject(err);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        })
    }

    this.listarJugadoresEquipo = function (slugId) {

        return new Promise(function (resolve, reject) {
            $.get(`listarJugadoresEquipo.php/?slugEquipo=${slugId}`, function (data, status) {
                
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }
    this.listarJugadoresEquipoCampeonato = function (slugIdEquipo, slugIdCampeonato, fixture) {

        return new Promise(function (resolve, reject) {
            $.get(`cs-listarJugadoresEquipoCampeonato.php/?slugEquipo=${slugIdEquipo}&slugCampeonato=${slugIdCampeonato}&fixture=${fixture}`, function (data, status) {
                
                if (data) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            });
        })
    }
}
