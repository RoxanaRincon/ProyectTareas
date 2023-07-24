$(function() {

    var objTabla = null;
    var dataSet = [];
    var tareaActual = '';
    var formulario = false;
    var formularioEditar = false;
    cargarDatosUsuarioSelect();
    listarDatosTarea();

    // ------------------------- listar el select de usuarios -----------
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
            $("#Editselectusuarioform").html(opciones)
            
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
                objBotones += '<button id="btn-EditarTarea" type="button" class="btn btn-warning" idTarea="' + item.idTarea +  '" Nombre="' + item.Nombre + '" Descripcion="' + item.Descripcion + '" Prioridad= "' + item.Prioridad + '" Tiempo="' + item.Tiempo + '" fk_Usuario="' + item.fk_Usuario +'" Nombres="' + item.Nombres +'"><i class="bi bi-pencil-square"></i></button>';
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

    //----------------------------------- Eliminar tareas -------------------------
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


    // --------------------------- Treer tarea a editar ----------------------
    $("#tablaActividad").on("click", "#btn-EditarTarea", function(){
        $("#contenedorFormularios").hide();
        $("#contenedorEditarUsuario").show();
        var tarea = $(this).attr("idTarea");
        var Nombre = $(this).attr("Nombre");
        var Descripcion = $(this).attr("Descripcion");
        var Prioridad = $(this).attr("Prioridad");
        var Tiempo = $(this).attr("Tiempo");
        var fk_Usuario = $(this).attr("fk_Usuario");
        
    
        $("#txt_Editnombre").val(Nombre);
        $("#txt_Editdescripcion").val(Descripcion);
        $("#Editselectprioridadform").val(Prioridad);
        $("#txt_EdittiempoHoras").val(Tiempo);
        $("#Editselectusuarioform").val(fk_Usuario);
        $("#btnEditarTarea").attr("tarea", tarea);
        
        if (tareaActual != tarea){
            
            tareaActual = tarea;
            formularioEditar = false;
        }

        if (formularioEditar == false){
            $("#contenedorFormularioEditar").fadeIn(1000);
            
            formularioEditar = true;
        } else {
            $("#contenedorFormularioEditar").hide();
          
            formularioEditar = false;
        }

        $("#contenedorTabla").show();
        cargarTablaTarea(dataSet);

    })


    // ----------------------------- Editar Tarea --------------------
    $("#btnEditarTarea").on("click", function(){

        var idTarea = tareaActual;

        var Nombre = $("#txt_Editnombre").val();
        var Descripcion = $("#txt_Editdescripcion").val();
        var Prioridad = $("#Editselectprioridadform").val();
        var Tiempo = $("#txt_EdittiempoHoras").val();
        var fk_Usuario = $("#Editselectusuarioform").val();

        var registroEditadoTarea = new FormData();
        registroEditadoTarea.append("editarNombre", Nombre);
        registroEditadoTarea.append("editarDescripcion", Descripcion);
        registroEditadoTarea.append("editarPrioridad", Prioridad);
        registroEditadoTarea.append("editarTiempo", Tiempo);
        registroEditadoTarea.append("editarIdUsuario", fk_Usuario);
        registroEditadoTarea.append("editarIdTarea", idTarea);

        $.ajax({
            url: "../controlador/tareaControlador.php",
            type: "POST",
            dataType: "JSON",
            data: registroEditadoTarea,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {

            console.log(respuesta);
            $("#txt_Editnombre").val("");
            $("#txt_Editdescripcion").val("");
            $("#Editselectprioridadform").val("");
            $("#txt_EdittiempoHoras").val("");
            $("#Editselectusuarioform").val("");
           
            
            $("#contenedorFormularioEditar").hide();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tarea Actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        
        listarDatosTarea();
    })
    $("#contenedorFormularioEditar").show();
        cargarTablaTarea(dataSet);

    })    

    $("#btnCancelar").on("click", function(){
        $("#contenedorFormularioEditar").hide();

        $("#contenedorTabla").show();
        cargarTablaTarea(dataSet);
    })


    //----------------------------- boton registar tarea --------------------------
    $("#btn_Tarea").on("click", function() {
        $("#contenedorFormularioEditar").hide();
        $("#datosTablaActividad").html("");

        if (formulario == false) {
            $("#contenedorFormulario").fadeIn(1000);
            $("#contenedorTabla").removeClass('col-sm-12').addClass('col-sm-8');
            formulario = true;
        } else {
            $("#contenedorFormulario").hide();
            $("#datosTablaActividad").removeClass('col-sm-8').addClass('col-sm-12').hide();
            formulario = false;
        }


        $("#datosTablaActividad").slideDown("slow");
        cargarTablaTarea(dataSet);
       
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

})