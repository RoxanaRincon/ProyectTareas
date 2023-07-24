<?php
// Iniciar la sesión (si no se ha iniciado ya)
session_start();

// Destruir todas las variables de sesión
session_unset();

// Destruir la sesión
session_destroy();

// Redireccionar al usuario a la página de inicio de sesión
header('Location: login.php');
exit;
?>






