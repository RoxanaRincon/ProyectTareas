$(function() {

    var objTabla = null;
    var dataSet = [];
    var formulario = false;
    var formularioEditar = false;
    var ProductoActual= '';
    cargarDatosUsuarioSelect();
    listarDatosTarea();

    // ------------------------- listar el selct de usuarios -----------

    function cargarDatosUsuarioSelect() {
        var objData = new FormData();
        objData.append("mostrarUsuarios", "ok");
        $.ajax({
            url: "../controlador/tareaControlador.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            var opciones = '';
            respuesta.forEach(agregarOpciones);

            function agregarOpciones(item, index) {
                opciones += '<option value="' + item.idUsuario + '">' + item.Nombres + '</option>';

            }
 
            $("#selectusuarioform").html(opciones)
            
        })
    }
    // ---------------------------- Listar los datos de la tabla Tareas -----------
    function listarDatosTarea() {
        var objData = new FormData();
        objData.append("listarDatosTarea", "ok");
        $.ajax({
            url: "../controlador/tareaControlador.php",
            type: "POST",
            dataType: "JSON",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            var objBotones = '';
            dataSet = [];

            respuesta.forEach(listarTarea);
            function listarTarea(item, index) {
                
                objBotones = '<div class="btn-group">';
                objBotones += '<button id="btn-EditarProducto" type="button" class="btn btn-warning" idTarea="' + item.idTarea +  '" Nombre="' + item.Nombre + '" Descripcion="' + item.Descripcion + '" Prioridad= "' + item.Prioridad + '" Tiempo="' + item.Tiempo + + '" Nombres="' + item.Nombres +'"><i class="bi bi-pencil-square"></i></button>';
                objBotones += '<button id="btn-eliminar" type="button" idTarea="' + item.idTarea + '" class="btn btn-danger"><i class="bi bi-trash"></i></button>';
                objBotones += '</div>';

            
                
                dataSet.push([item.Nombre, item.Descripcion, item.Prioridad, item.Tiempo, item.Nombres, objBotones]);
            }
            cargarTablaTarea(dataSet);
        })
    }

    // -------------------------- Agregar nueva tarea --------------------------

    $("#btnGuardarActividad").on("click", function() {
        var Nombre = $("#txt_nombre").val();
        var Descripcion = $("#txt_descripcion").val();
        var Prioridad = $("#selectprioridadform").val();
        var Tiempo = $("#txt_tiempoHoras").val();
        var fk_Usuario = $("#selectusuarioform").val();

        var objData = new FormData();
        objData.append("guardarNombre", Nombre);
        objData.append("guardarDescripcion", Descripcion);
        objData.append("guardarPrioridad", Prioridad);
        objData.append("guardarTiempo", Tiempo);
        objData.append("guardaridUsuario", fk_Usuario);
        $.ajax({
            url: "../controlador/tareaControlador.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            $("#txt_nombre").val("");
            $("#txt_descripcion").val("");
            $("#selectprioridadform").val("");
            $("#txt_tiempoHoras").val("");
            $("#selectusuarioform").val("");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tarea Registrado Correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            listarDatosTarea();
        })
    })

    //ELIMINAR REGISTRO USUARIO
    $("#tablaActividad").on("click", "#btn-eliminar", function() {
        Swal.fire({
            title: 'Esta seguro de eliminar este Tarea?',
            text: "Al eliminarlo no sera posible recuperar la información!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                var idTarea = $(this).attr("idTarea");
                var objData = new FormData();
                objData.append("eliminarTarea", idTarea);
                $.ajax({
                    url: "../controlador/tareaControlador.php",
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
                    formularioTarea = false
                    listarDatosTarea();
                })
            }
        })

    })

    // --------------------------- Cargar Tabla -----------------------
    function cargarTablaTarea(dataSet) {
         
        if (objTabla != null) {
            $("#tablaActividad").dataTable().fnDestroy();
        }

        objTabla = $("#tablaActividad").DataTable({
            data: dataSet
        })
    }

/*
    
    $("#btn_formulario").on("click", function() {

        $("#datosTablaProducto").html("");

        if (formulario == false) {
            $("#contenedorFormulario").fadeIn(1000);
            $("#contenedorTabla").removeClass('col-sm-12').addClass('col-sm-8');
            formulario = true;
        } else {
            $("#contenedorFormulario").hide();
            $("#contenedorTabla").removeClass('col-sm-8').addClass('col-sm-12').hide();
            formulario = false;
        }


        $("#contenedorTabla").slideDown("slow");
        cargarTablaProducto(dataSet);
        cargarDatosSelectCategoriaform();
    })

    $("#btnCancelar").on ("click", function (){
        $("#contenedorFormularioEditar").hide();
        $("#contenedorTabla").removeClass('col-sm-8').addClass('col-sm-12').hide();
        $("#btn_formulario").removeClass("btn-danger").addClass('btn-primary').attr("disabled", true);
        $("#contenedorTabla").show();
        cargarTablaProducto(dataSet);
    })


    $("#tablaProducto").on("click", "#btn-EditarProducto", function(){
        var idProducto = $(this).attr("Producto");
        //alert(valorProductoUsuario);
        var cantidadProductoProducto = $(this).attr("cantidadProducto");
        var valorProductoProducto = $(this).attr("valorProducto");
        var descripcionProductoProducto = $(this).attr("descripcionProducto");
        var NombreProductoProducto = $(this).attr("NombreProducto");
        

        $("#txt_EditcantidadProducto").val(cantidadProductoProducto);
        $("#txt_EditvalorProducto").val(valorProductoProducto);
        $("#txt_EditdescripcionProducto").val(descripcionProductoProducto);
        $("#txt_EditNombreProducto").val(NombreProductoProducto);
        $("#btnEditarProducto").attr("Producto", idProducto);
        
        /*
        alert(usuarioActual);
        alert(idUsuario);
        alert(formularioEditar);*/
       
        /*if (ProductoActual != idProducto){
            
            ProductoActual = idProducto;
            formularioEditar= false;
        }*/
       
        /*alert(usuarioActual);
        alert(idUsuario);
        alert(formularioEditar);*/

        /*$("#contenedorFormulario").hide();

        if (formularioEditar == false){
            $("#contenedorFormularioEditar").fadeIn(1000);
            $("#contenedorTabla").removeClass('col-sm-12').addClass('col-sm-8');
            formularioEditar = true;
            cargarDatosSelectCategoriaformEdit();
        } else {
            $("#contenedorFormularioEditar").hide();
            $("#contenedorTabla").removeClass('col-sm-8').addClass('col-sm-12').hide();
            $("#btn_formulario").removeClass('btn-danger').addClass('btn-primary').attr('disabled', true);
            formularioEditar = false;
        }

        $("#contenedorTabla").show();
        cargarTablaProducto(dataSet);

    })


    $("#bntCancelar").on("click", function(){
        $("#contenedorFormularioEditar").hide();
        $("#contenedorTabla").removeClass('col-sm-8').addClass('col-sm-12').hide();
        $("#btn_formulario").removeClass('btn-danger').addClass('btn-primary').attr('disabled', true);

        $("#contenedorTabla").show();
        cargarTablaProducto(dataSet);
    })

    //EDITAR REGISTRO USUARIO
    $("#btnEditarProducto").on("click", function(){

        var idProducto = ProductoActual;
       
        var cantidadProductoProducto = $("#txt_EditcantidadProducto").val();
        var valorProductoProducto= $("#txt_EditvalorProducto").val();
        var descripcionProductoProducto =  $("#txt_EditdescripcionProducto").val();
        var NombreProductoProducto = $("#txt_EditNombreProducto").val();
       var idCategoriaupdate = $("#selectCategoriaformedit option:selected" ).val();
      
        var objData = new FormData();
        objData.append("updatecantidadProducto", cantidadProductoProducto);
        objData.append("updatevalorProducto", valorProductoProducto);
        objData.append("updatedescripcionProducto", descripcionProductoProducto);
        objData.append("updateNombreProducto", NombreProductoProducto);
        objData.append("updateId", idProducto);
        objData.append("updateidCategoria", idCategoriaupdate);

        console.log(cantidadProductoProducto,valorProductoProducto,descripcionProductoProducto,NombreProductoProducto,idProducto,idCategoriaupdate);

        
        $.ajax({
            url: "./control/productoControl.php",
            type: "POST",
            dataType: "JSON",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            console.log("edicion");
            console.log(respuesta);
            $("#txt_cantidadProducto").val("");
            $("#txt_valorProducto").val("");
            $("#txt_descripcionProducto").val("");
            $("#txt_NombreProducto").val("");
          

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario Actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            })

        listarDatos();
    })
   
    $("#contenedorTabla").show();
    cargarTablaProducto(dataSet);

    })


    

    function cargarDatosSelectCategoriaform(){
        
        var ObjData= new FormData();
        ObjData.append("listarDatosCategoria","ok");
      
        $.ajax({
            url: "../../controlador/tareaControlador.php",
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
                
                opciones = opciones + '<option value="' + item.idCategoria + '">' + item.nombrecategoria + '</option>';
            }

            $("#selectCategoriaform").html(opciones);
        }

        }).fail(function(xhr, status, error) {
        
        });
    }

   
    function cargarDatosSelectCategoriaformEdit(){
        
        var ObjData= new FormData();
        ObjData.append("listarDatosCategoria","ok");
      
        $.ajax({
            url: "../../controlador/tareaControlador.php",
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
                
                opciones = opciones + '<option value="' + item.idCategoria + '">' + item.nombrecategoria + '</option>';
            }

            $("#selectCategoriaformedit").html(opciones);
        }

        }).fail(function(xhr, status, error) {
        
        });
    }


    $("#selectCategorias").change(function(){
        var idCategoria = $(this).val();
        var objData = new FormData();
        objData.append("filtroCategoria", idCategoria);
        

        $.ajax({
            url: "../../controlador/tareaControlador.php",
            type:"POST",
            dataType: "JSON",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            
            dataSetCategoria = [];
        
            var botonAcciones = '';
       
            respuesta.forEach(cargarFiltroProducto);

            function cargarFiltroProducto(item, index){

                objBotones = '<div class="btn-group">';
                objBotones += '<button id="btn-EditarProducto" type="button" class="btn btn-warning" Producto="' + item.idProducto +  '" cantidadProducto="' + item.cantidadProducto + '" valorProducto="' + item.valorProducto + '" descripcionProducto= "' + item.descripcionProducto + '" NombreProducto="' + item.NombreProducto + '"><i class="bi bi-person-fill-gear"></i></button>';
                objBotones += '<button id="btn-eliminar" type="button" Producto="' + item.idProducto + '" class="btn btn-danger"><i class="bi bi-person-fill-x"></i></button>';
                objBotones += '</div>';
                
                dataSetCategoria.push([item.cantidadProducto, item.valorProducto, item.descripcionProducto, item.NombreProducto, objBotones]);
            }

            actualizarTabla(dataSetCategoria)
        })

    })

    
    function actualizarTabla(dataSetCategoria) {
         
        if (objTabla != null) {
            $("#tablaProducto").dataTable().fnDestroy();
        }

        objTabla = $("#tablaProducto").DataTable({
            data: dataSetCategoria
        })
    }
    */
})