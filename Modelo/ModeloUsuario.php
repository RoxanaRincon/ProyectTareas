<?php

include_once "Conexion.php";

class mdlUsuario {

    // funcion para listar la tabla de usuarios
    public static function mdlListarUsuario(){

        $listarUsuario = "";

        try{
            $respuestaUsuario= Conexion::conectar()->prepare("SELECT * FROM usuario");
            $respuestaUsuario->execute();
            $listarUsuario = $respuestaUsuario->fetchAll();
            $respuestaUsuario= null;

        }catch(Exception $error){
            $listarUsuario = $error;
        }

        return $listarUsuario;
    }

    public static function mdlGuardarUsuario($Nombres, $Apellidos, $Correo, $Password){
        $mensaje = "";  
        try{
            // Cifrar la contraseña antes de guardarla en la base de datos
            $password_cifrado = password_hash($Password, PASSWORD_DEFAULT);

            $respuestaUsuario = Conexion::conectar()->prepare("INSERT INTO usuario(Nombres, Apellidos, Correo, Password) VALUES(:Nombres, :Apellidos, :Correo, :Password)");
            $respuestaUsuario->bindParam(":Nombres", $Nombres);
            $respuestaUsuario->bindParam(":Apellidos", $Apellidos);
            $respuestaUsuario->bindParam(":Correo", $Correo);
            $respuestaUsuario->bindParam(":Password", $password_cifrado);
            
            if ($respuestaUsuario->execute()) {
                $mensaje = "ok";
            } else {
                $mensaje = "Error al registrar el usuario";
            }
            
        } catch(Exception $error){
            $mensaje = $error;
        }

        return $mensaje;
    }

    //funcion editar usuario
    public static function mdlUpdateUsuario($Nombres, $Apellidos, $Correo, $Password, $idUsuario){
        $mensaje = "";
        try {
            // Cifrar la contraseña antes de guardarla en la base de datos
            $password_cifrado = password_hash($Password, PASSWORD_DEFAULT);

            $objRespuesta = Conexion::conectar()->prepare("UPDATE usuario SET Nombres = :Nombres, Apellidos = :Apellidos, Correo = :Correo, Password = :Password WHERE idUsuario = :id"); 
            $objRespuesta->bindParam(":Nombres", $Nombres);
            $objRespuesta->bindParam(":Apellidos", $Apellidos);
            $objRespuesta->bindParam(":Correo", $Correo);
            $objRespuesta->bindParam(":Password", $password_cifrado);
            $objRespuesta->bindParam(":id", $idUsuario);
            $objRespuesta->execute();

            $mensaje = "ok";

        } catch(Exception $e){
            $mensaje = $e;
        }
        return $mensaje;
    }

    // funcion eliminar usuario
    public static function mdlEliminarUsuario($idUsuario){
        $mensaje = "";  
        try{
            $respuestaUsuario= Conexion::conectar()->prepare("DELETE FROM usuario WHERE idUsuario = :idUsuario");
            $respuestaUsuario->bindParam(":idUsuario", $idUsuario);
            if($respuestaUsuario->execute()){
                $mensaje = "ok";
            }else{
                $mensaje = "Error al eliminar el usuario";
            }
            
        }catch(Exception $error){
            $mensaje = $error;
        }

        return $mensaje;
    }


     // Función para iniciar sesión
     public static function mdlIniciarSesion($correo, $password) {
        try {
            $consulta = Conexion::conectar()->prepare("SELECT * FROM usuario WHERE Correo = :correo");
            $consulta->bindParam(":correo", $correo);
            $consulta->execute();
            $usuario = $consulta->fetch(PDO::FETCH_ASSOC);

            if ($usuario && password_verify($password, $usuario['Password'])) {
                // La contraseña coincide, el usuario existe
                return $usuario;
            } else {
                // El usuario o contraseña son incorrectos
                return false;
            }
        } catch (Exception $error) {
            return false;
        }
    }


}