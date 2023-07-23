<?php
// Incluye el archivo con la clase Conexion
include_once 'usuarioControlador.php';

// Crea una instancia de la clase ctrTarea
$controladorusuario = new ctrUsuario();

// Llama al método ctrListarTarea() en el objeto $controladorTarea
$mensaje = $controladorusuario->ctrListarUsuario();

echo $mensaje;

