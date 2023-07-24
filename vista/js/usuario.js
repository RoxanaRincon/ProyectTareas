$(function(){

    var objTablaUsuario = null;
    var dataSetUsuario = [];
    var formulario = false;
    var formularioEditar = false;
    var usuarioActual= '';

    listarDatosUsuario();

    // ------------------------- funcion para listar los empleados -----------
    function listarDatosUsuario() {
        var objData = new FormData();
        objData.append("listarDatosUsuario", "ok");
        $.ajax({
            url: "../controlador/usuarioControlador.php",
            type: "POST",
            dataType: "JSON",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
           
            dataSetUsuario = [];
            var objBotones = '';

            respuesta.forEach(listarUsuario);
            console.log(respuesta)
            function listarUsuario(item, index) {
                objBotones = '<div class="btn-group">';
                objBotones += '<button id="btn-EditarUsuario" type="button" class="btn btn-secondary" usuario="' + item.idUsuario + '" Nombres="' + item.Nombres + '" Apellidos="' + item.Apellidos + '" Correo="' + item.Correo + '" password="' + item.password + '"><i class="bi bi-pencil-square"></i></button>';
                objBotones += '<button id="btn-eliminarUsuario" type="button" class="btn btn-dark" usuario="' + item.idUsuario + '"><i class="bi bi-trash"></i></button>';
                objBotones += '</div>';
            
                dataSetUsuario.push([item.Nombres, item.Apellidos, item.Correo, objBotones]);
                console.log(dataSetUsuario);
            }
            

            cargarTablaUsuario(dataSetUsuario);
        
        })
    }

    function cargarTablaUsuario(dataSetUsuario) {
         
        if (objTablaUsuario != null) {
            $("#tablaUsuario").dataTable().fnDestroy();
        }

        objTablaUsuario = $("#tablaUsuario").DataTable({
            data: dataSetUsuario
        })
    }

    // ----------------------------- Guardar nuevo usuario ---------------------- 
    $("#btnGuardarUsuario").on("click", function() {
        var Nombres = $("#txt_nombreusuario").val();
        var Apellidos = $("#txt_apellidousuario").val();
        var Correo = $("#txt_correo").val();
        var Password = $("#txt_password").val(); // Obtener la contraseña ingresada
    
        var objData = new FormData();
        objData.append("guardarNombres", Nombres);
        objData.append("guardarApellidos", Apellidos);
        objData.append("guardarCorreo", Correo);
        objData.append("guardarPassword", Password); // Agregar la contraseña al objeto FormData
    
        $.ajax({
            url: "../controlador/usuarioControlador.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            $("#txt_nombreusuario").val("");
            $("#txt_apellidousuario").val("");
            $("#txt_correo").val("");
            $("#txt_password").val(""); // Limpiar el campo de contraseña
    
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario Registrado Correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            listarDatosUsuario();
    
        }).fail(function(xhr, status, error) {
            // Manejar el error en caso de que falle la petición AJAX
            console.log(xhr, status, error);
        });
    });

    //------------------------- Editar Usuario ----------------------
    $("#tablaUsuario").on("click", "#btn-EditarUsuario", function(){

       
        $("#contenedorFormularios").hide();
        $("#contenedorEditarUsuario").show();
        var usuario = $(this).attr("usuario");
        var Nombres = $(this).attr("Nombres");
        var Apellidos = $(this).attr("Apellidos");
        var Correo = $(this).attr("Correo");
        

        $("#txt_EditNombre").val(Nombres);
        $("#txt_EditApellido").val(Apellidos);
        $("#txt_EditCorreo").val(Correo);
        $("#btnEditarUsuario").attr("usuario", usuario);
        
        if (usuarioActual != usuario){
            
            usuarioActual = usuario;
            formularioEditar = false;
        }

       // $("#contenedorEditarUsuario").hide();

        if (formularioEditar == false){
            $("#contenedorEditarUsuarior").fadeIn(1000);
            
            formularioEditar = true;
            //cargarDatosSelectCategoriaformEdit();
        } else {
            $("#contenedorEditarUsuarior").hide();
          
            formularioEditar = false;
        }

        $("#contenedorTablaUsuario").show();
        cargarTablaUsuario(dataSetUsuario);

    })

    //editar  registro de usuario
    $("#btnEditarUsuario").on("click", function(){
        var idUsuario = usuarioActual;
        var Nombres = $("#txt_EditNombre").val();
        var Apellidos = $("#txt_EditApellido").val();
        var Correo =  $("#txt_EditCorreo").val();
        var Password =  $("#txt_EditPassword").val(); // Obtener el valor de la contraseña
    
        var registroEditado = new FormData();
        registroEditado.append("updateNombres", Nombres);
        registroEditado.append("updateApellidos", Apellidos);
        registroEditado.append("updateCorreo", Correo);
        registroEditado.append("updatePassword", Password); // Agregar la contraseña al FormData
        registroEditado.append("updateIdUsuario", idUsuario);
    
   
        $.ajax({
            url: "../controlador/usuarioControlador.php",
            type: "POST",
            dataType: "JSON",
            data: registroEditado,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {

             $("#txt_EditNombre").val("");
             $("#txt_EditApellido").val("");
            $("#txt_EditCorreo").val("");
           
            
            $("#contenedorEditarUsuario").hide();


            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario Actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            })

            listarDatosUsuario();
    })
   
    $("#contenedorTablaUsuario").show();
    cargarTablaUsuario(dataSetUsuario);

    })

    // boton registarr usuario

    $("#btnUsuario").on("click", function() {

        $("#datosTablaUsuario").html("");

        if (formulario == false) {
            $("#contenedorFormularios").fadeIn(1000);
            $("#contenedorTabla").removeClass('col-sm-12').addClass('col-sm-8');
            formulario = true;
        } else {
            $("#contenedorFormularios").hide();
            $("#contenedorTablaUsuario").removeClass('col-sm-8').addClass('col-sm-12').hide();
            formulario = false;
        }


        $("#contenedorTablaUsuario").slideDown("slow");
        cargarTablaUsuario(dataSetUsuario);
       
    })
    
    //------------------------- Eliminar Usuario ----------------------
    $("#tablaUsuario").on("click", "#btn-eliminarUsuario", function() {
        Swal.fire({
            title: 'Esta seguro de eliminar este Usuario?',
            text: "Al eliminarlo no sera posible recuperar la información!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                var Usuario = $(this).attr("usuario");
                var objData = new FormData();
                objData.append("eliminarUsuario", Usuario);
                $.ajax({
                    url: "../controlador/usuarioControlador.php",
                    type: "POST",
                    dataType: "JSON",
                    data: objData,
                    cache: false,
                    contentType: false,
                    processData: false
                }).done(function(respuesta) {
                    console.log(respuesta);

                    if (respuesta != "ok" ){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'asegurese de primero  eliminar todas las tareas relacionadas al usuario o reasingnarlas',
                            showConfirmButton: false,
                            timer: 3000
                        })

                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Usuario Eliminado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        })


                    }



                    formularioEmpleados = false;
                    listarDatosUsuario();
                })
            }
        })
    })
   
})