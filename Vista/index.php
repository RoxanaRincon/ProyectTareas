
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
</head>

<body>
    <nav>
        <ul>
            <li><a href="Vista/tarea.php">Tareas</a></li>
            <li><a href="Vista/usuario.php">Usuarios</a></li>
            <!-- Agrega más elementos de menú si es necesario -->
            <li><a href="Vista/cerrar_sesion.php">Cerrar Sesión</a></li>
        </ul>
    </nav>
</body>

</html>
Ahora, asegúrate de que el archivo cerrar_sesion.php esté ubicado en la carpeta Vista y contenga el código para cerrar la sesión. Si el archivo cerrar_sesion.php ya existe, simplemente incluye la lógica para cerrar la sesión en ese archivo.

El código del archivo cerrar_sesion.php podría ser similar a esto:

php
Copy code
<?php
// cerrar_sesion.php

// Iniciar sesión
session_start();

// Destruir todas las variables de sesión
session_destroy();

// Redireccionar a la página de inicio de sesión
header('Location: login.php');
exit;
?>
Con estos cambios, cuando hagas clic en el enlace "Cerrar Sesión" en el menú, se ejecutará la lógica para cerrar la sesión y te redirigirá a la página de inicio de sesión (login.php).






