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

    // Funcion para aregar un usuario
    public static function mdlGuardarUsuario($Nombres, $Apellidos, $Correo){

        $mensaje = "";  

        try{
            $respuestaUsuario= Conexion::conectar()->prepare("INSERT INTO usuario(Nombres,Apellidos,Correo)VALUES(:Nombres, :Apellidos, :Correo)");
            $respuestaUsuario->bindParam(":Nombres", $Nombres);
            $respuestaUsuario->bindParam(":Apellidos", $Apellidos);
            $respuestaUsuario->bindParam(":Correo", $Correo);
            if($respuestaUsuario->execute()){
                $mensaje = "ok";
            }else{
                $mensaje = "Error a registrar el usuario";
            }
            
        }catch(Exception $error){
            $mensaje = $error;
        }

        return $mensaje;
    }

    //funcion editar usuario
    public static function mdlUpdateUsuario($Nombres, $Apellidos, $Correo, $idUsuario){
        
        $mensaje = "";

        try {

            $objRespuesta = Conexion::conectar()->prepare("UPDATE  usuario  SET Nombres = :Nombres, Apellidos = :Apellidos, Correo = :Correo  WHERE idUsuario = :id"); 
            $objRespuesta->bindParam(":Nombres", $Nombres);
            $objRespuesta->bindParam(":Apellidos", $Apellidos);
            $objRespuesta->bindParam(":Correo", $Correo);
            $objRespuesta->bindParam(":id", $idUsuario);
            $objRespuesta->execute();

            $mensaje = "ok";

            

        }catch(Exception $e){
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



}