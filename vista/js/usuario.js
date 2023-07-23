$(function(){

    var formularioUsuario = false;
    var objTablaUsuario = null;
    var dataSetUsuario = [];
    var tabla = null;

    listarDatosUsuario();

    cargarDatosSelectUsuario();
   // listarProducto();

    function cargarDatosSelectUsuario(){
        
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

    function cargarTablaUsuario(dataSetUsuario) {
         
        if (objTablaUsuario != null) {
            $("#tablaUsuario").dataTable().fnDestroy();
        }

        objTablaUsuario = $("#tablaUsuario").DataTable({
            data: dataSetUsuario
        })
    }

    function listarDatosUsuario() {
        var objData = new FormData();
        objData.append("listarDatosUsuario", "ok");
        $.ajax({
            url: "./control/UsuarioControl.php",
            type: "POST",
            dataType: "JSON",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
           
            var objBotones = '';
            dataSet = [];
            
            if (respuesta != null) {
                respuesta.forEach(listarUsuario);
                console.log(respuesta);
                function listarUsuario(item, index) {
                  
                    objBotones = '<div class="btn-group">';
                    objBotones += '<button id="btn-EditarUsuario" type="button" class="btn btn-secondary" Usuario="' + item.idUsuario +  '" nombreUsuario="' + item.nombreUsuario + '" descripcion="' + item.descripcionUsuario + '"><i class="bi bi-person-fill-gear"></i></button>';
                    objBotones += '<button id="btn-eliminarA" type="button" class="btn btn-dark" Usuario="' + item.idUsuario + '" ><i class="bi bi-person-fill-x"></i></button>';
                    objBotones += '</div>';

                    dataSetUsuario.push([item.nombreUsuario, item.descripcionUsuario]);
                }

                cargarTablaUsuario(dataSetUsuario);
            }
        })
    }
})