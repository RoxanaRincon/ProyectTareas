$(function() {

    var objTabla = null;
    var dataSet = [];
    var formulario = false;
    var formularioEditar = false;
    var ProductoActual= '';
    
    listarDatos();

    $("#btnGuardarProducto").on("click", function() {

        //En este punto asigno a las variable el valor que obtengo de los campos del formulario
        var cantidadProducto = $("#txt_cantidadProducto").val();
        var valorProducto = $("#txt_valorProducto").val();
        var descripcionProducto = $("#txt_descripcionProducto").val();
        var NombreProducto = $("#txt_NombreProducto").val();
        var idCategoria = $("#selectCategoriaform option:selected" ).val();

        var objData = new FormData();
        objData.append("guardarcantidadProducto", cantidadProducto);
        objData.append("guardarvalorProducto", valorProducto);
        objData.append("guardardescripcionProducto", descripcionProducto);
        objData.append("guardarNombreProducto", NombreProducto);
        objData.append("idCategoria", idCategoria);
        

        $.ajax({
            url: "../../controlador/tareaControlador.php",
            type: "POST",
            dataType: "JSON",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta) {
            
            $("#txt_cantidadProducto").val("");
            $("#txt_valorProducto").val("");
            $("#txt_descripcionProducto").val("");
            $("#txt_NombreProducto").val("");
            $("#selectCategoriaform option:selected" ).val("");

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto registrado correctamente',
                showConfirmButton: false,
                timer: 1500
            })

            listarDatos();
        })
    })


    function listarDatos() {
   
        var objData = new FormData();
        objData.append("listarDatos", "ok");
        $.ajax({
            url: "../../controlador/tareaControlador.php",
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
                respuesta.forEach(listarProducto);
                
                function listarProducto(item, index) {
                    
                    objBotones = '<div class="btn-group">';
                    objBotones += '<button id="btn-EditarProducto" type="button" class="btn btn-warning" Producto="' + item.idProducto +  '" cantidadProducto="' + item.cantidadProducto + '" valorProducto="' + item.valorProducto + '" descripcionProducto= "' + item.descripcionProducto + '" NombreProducto="' + item.NombreProducto + '"><i class="bi bi-person-fill-gear"></i></button>';
                    objBotones += '<button id="btn-eliminar" type="button" Producto="' + item.idProducto + '" class="btn btn-danger"><i class="bi bi-person-fill-x"></i></button>';
                    objBotones += '</div>';

                
                    
                    dataSet.push([item.cantidadProducto, item.valorProducto, item.descripcionProducto, item.NombreProducto, objBotones]);
                }

                cargarTablaProducto(dataSet);
            }

        })
    }


    function cargarTablaProducto(dataSet) {
         
        if (objTabla != null) {
            $("#tablaProducto").dataTable().fnDestroy();
        }

        objTabla = $("#tablaProducto").DataTable({
            data: dataSet
        })
    }


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
       
        if (ProductoActual != idProducto){
            
            ProductoActual = idProducto;
            formularioEditar= false;
        }
       
        /*alert(usuarioActual);
        alert(idUsuario);
        alert(formularioEditar);*/

        $("#contenedorFormulario").hide();

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


    //ELIMINAR REGISTRO USUARIO
    $("#tablaProducto").on("click", "#btn-eliminar", function() {
        var idProducto = $(this).attr("Producto");

        Swal.fire({
            title: 'Esta seguro de eliminar este Producto?',
            text: "Al eliminarlo no sera posible recuperar la información!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                var objData = new FormData();
                 
                objData.append("eliminarId", idProducto);
                $.ajax({
                    url: "./control/ProductoControl.php",
                    type: "POST",
                    dataType: "JSON",
                    data: objData,
                    cache: false,
                    contentType: false,
                    processData: false
                }).done(function(respuesta) {
            
                    $("#txt_cantidadProducto").val("");
                    $("#txt_valorProducto").val("");
                    $("#txt_descripcionProducto").val("");
                    $("#txt_NombreProducto").val("");
                   
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario Eliminado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
            
                    listarDatos();
                })
            }
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

})