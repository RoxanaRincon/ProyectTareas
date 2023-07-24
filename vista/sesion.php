<?php
// sesion.php

// Iniciar sesión
session_start();

// Comprobar si el usuario ha iniciado sesión
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    // Redireccionar a la página de inicio de sesión si no ha iniciado sesión
    header('Location: login.php');
    exit;
}
?>