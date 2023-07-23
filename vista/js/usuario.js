$(function(){

    //var formularioUsuario = false;
    var objTablaUsuario = null;
    var dataSetUsuario = [];
    //var tabla = null;

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
                objBotones += '<button id="btn-EditarUsuario" type="button" class="btn btn-secondary" Usuario="' + item.idUsuario +  '" Nombres="' + item.Nombres + '" Apellidos="' + item.Apellidos + '" Correo="' + item.Correo + '"><i class="bi bi-pencil-square"></i></button>';
                objBotones += '<button id="btn-eliminarUsuario" type="button" class="btn btn-dark" Usuario="' + item.idUsuario + '" ><i class="bi bi-trash"></i></button>';
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

        var objData = new FormData();
        objData.append("guardarNombres", Nombres);
        objData.append("guardarApellidos", Apellidos);
        objData.append("guardarCorreo", Correo);
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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario  Registrado Correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            listarDatosUsuario();
            
        })
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
                var idUsuario = $(this).attr("idUsuario");
                var objData = new FormData();
                objData.append("eliminarUsuario", idUsuario);
                $.ajax({
                    url: "../controlador/usuarioControlador.php",
                    type: "POST",
                    dataType: "JSON",
                    data: objData,
                    cache: false,
                    contentType: false,
                    processData: false
                }).done(function(respuesta) {
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario Eliminado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    formularioEmpleados = false;
                    listarDatosUsuario();
                })
            }
        })
    })
    //cargarDatosSelectUsuario();
   // listarProducto();

    /*function cargarDatosSelectUsuario(){
        
        var ObjData= new FormData();
        ObjData.append("listarDatosUsuario","ok");
      
        $.ajax({
            url: "./control/UsuarioControl.php",
            type: "POST",
            dataType: "JSON",
            data: ObjData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            var opciones = '';
            if (respuesta != null) {
            respuesta.forEach(agregarOpciones)
            
            function agregarOpciones(item, index){
          
                opciones = opciones + '<option value="' + item.idUsuario + '">' + item.nombreUsuario + '</option>';
            }

            $("#selectUsuarios").html(opciones);
           
        }
        }).fail(function(xhr, status, error) {
             console.log(xhr,status,error);
        });
    }


    $("#btn_formularios").on("click", function() {

        $("#datosTablaUsuario").html("");

        if (formularioUsuario == false) {
            $("#contenedorFormularios").fadeIn(1000);
            $("#contenedorTablas").removeClass('col-sm-12').addClass('col-sm-8');
            formularioUsuario = true;
        } else {
            $("#contenedorFormularios").hide();
            $("#contenedorTablas").removeClass('col-sm-8').addClass('col-sm-12').hide();
            formularioUsuario = false;
        }

        $("#contenedorTablas").slideDown("slow");
        cargarTablaUsuario(dataSetUsuario);
    })

    

    */
})