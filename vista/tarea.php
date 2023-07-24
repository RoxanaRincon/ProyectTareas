<?php
// tarea.php

include_once "sesion.php";

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Evaluacion</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>


    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.2/css/jquery.dataTables.css">

    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.2/js/jquery.dataTables.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>


    <link rel='stylesheet' type='text/css' media='screen' href='css/main.css'>

    <script src='js/tarea.js'></script>
   

    
</head>

<body>




<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Mi Sitio Web</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="tarea.php">Tareas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="usuario.php">Usuarios</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="cerrarsesion.php">Cerrar Sesión</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
       





    <div class="row">
        <div class="mb-3 mt-3">
            <button id="btn_Tarea" type="button" class="btn btn-primary">Registrar Tarea</button>
        </div>
    </div>


    <div class="row">
        <div class="col-sm-4" id="contenedorFormulario" style="display: none;">
            <div class="container">
                <form method="post" class="needs-validation">
                    
                    <div class="mb-3">
                        <label for="pwd" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="txt_nombre" placeholder="Ingrese el nombre" name="txt_nombre" required>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div class="mb-3">
                        <label for="pwd" class="form-label">Descripcion</label>
                        <input type="text" class="form-control" id="txt_descripcion" placeholder="Ingrese la descripcion" name="txt_descripcion" required>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div class="mb-3">
                        <label for="pwd" class="form-label">Seleccione la Prioridad</label>
                        <select select id="selectprioridadform" class="form-select" aria-label="Default select example">
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                    </div>

                    <div class="mb-3 mt-3">
                        <label for="uname" class="form-label">Tiempo en Horas:</label>
                        <input type="number" class="form-control" id="txt_tiempoHoras" placeholder="Ingrese tiempo en horas" name="txt_tiempoHoras" required>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div class="mb-3">
                        <label for="pwd" class="form-label">Seleccione el Usuario</label>
                        <select select id="selectusuarioform" class="form-select" aria-label="Default select example">
                            
                        </select>
                    </div>

                    <button type="button" id="btnGuardarActividad" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>


        <div class="col-sm-4" id="contenedorFormularioEditar" style="display: none;">
            <div class="container">
                <form method="post" class="needs-validation">
                <div class="mb-3">
                        <label for="pwd" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="txt_Editnombre" placeholder="Ingrese el nombre" name="txt_Editnombre" required>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div class="mb-3">
                        <label for="pwd" class="form-label">Descripcion:</label>
                        <input type="text" class="form-control" id="txt_Editdescripcion" placeholder="Ingrese la descripcion" name="txt_Editdescripcion" required>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div class="mb-3">
                        <label for="pwd" class="form-label">Seleccione la Prioridad:</label>
                        <select select id="Editselectprioridadform" class="form-select" aria-label="Default select example">
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                    </div>

                    <div class="mb-3 mt-3">
                        <label for="uname" class="form-label">Tiempo en Horas:</label>
                        <input type="number" class="form-control" id="txt_EdittiempoHoras" placeholder="Ingrese tiempo en horas" name="txt_EdittiempoHoras" required>
                        <div class="valid-feedback">Valid.</div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <div class="mb-3">
                        <label for="pwd" class="form-label">Seleccione el Usuario:</label>
                        <select select id="Editselectusuarioform" class="form-select" aria-label="Default select example">
                        </select>
                    </div>

                    <button type="button" id="btnEditarTarea" Producto="" class="btn btn-primary">Editar Tarea</button>
                    <button type="button" id="btnCancelar" Producto="" class="btn btn-success">Cancelar</button>
                </form>
            </div>
        </div>


        <div class="col-sm-12" id="contenedorTabla">
            <table id="tablaActividad" class="table">
                <thead class="table-info">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Prioridad</th>
                        <th>Tiempo</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="datosTablaActividad">

                </tbody>
            </table>

        </div>
    </div>
    </div>
</body>
</html>

