<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <!-- Agrega aquí tus enlaces a las librerías jQuery y Bootstrap -->
   
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
    <script src='js/login.js'></script>
</head>
<body>

<div class="container">
    <h2>Iniciar Sesión</h2>
    <form id="formLogin">
        <div class="form-group">
            <label for="correo">Correo electrónico:</label>
            <input type="email" class="form-control" id="correo" name="correo" required>
        </div>
        <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" class="form-control" id="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
    </form>
</div>

<?php
// Comprobamos si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener las credenciales ingresadas
    $correo = $_POST["correo"];
    $password = $_POST["password"];

    // Comprobamos las credenciales (aquí deberías tener una lógica para validar las credenciales contra tu base de datos)
    // Por simplicidad, asumiremos que las credenciales son válidas
    if ($correo == "tu_correo_valido" && $password == "tu_contraseña_valida") {
        // Iniciar sesión y redireccionar a la página protegida
        session_start();
        $_SESSION['loggedin'] = true;
        $_SESSION['correo'] = $correo;

        // Redireccionar a la página protegida (por ejemplo, tarea.php o usuario.php)
        header("Location: tarea.php");
        exit();
    } else {
        // Credenciales incorrectas, mostrar mensaje de error
        echo '<div class="container mt-3"><div class="alert alert-danger" role="alert">Credenciales incorrectas. Intente nuevamente.</div></div>';
    }
}
?>

</body>
</html>
