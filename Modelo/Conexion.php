<?php
// Datos de conexión a la base de datos
$host = 'localhost'; 
$dbname = 'tarea';
$username = 'root';
$password = '';

try {
    // Establecer la conexión con la base de datos usando PDO
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Configurar el modo de manejo de errores de PDO a excepciones
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Opcional: Establecer el juego de caracteres a UTF-8 (opcional, pero recomendado)
    $db->exec("SET NAMES utf8"); 
    //die ("conexion exitosa");

} catch (PDOException $e) {
    // En caso de error, mostrar un mensaje de error y terminar la ejecución del script
    die("Error de conexión a la base de datos: " . $e->getMessage());
}

?>