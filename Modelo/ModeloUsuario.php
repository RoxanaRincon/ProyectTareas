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

    
    

    /*public static function mdlFiltrarUsuario($idUsuario){

        $listarUsuarioF = "";

        try{
            $respuestaUsuarioF = Conexion::conectar()->prepare("SELECT * FROM actividad WHERE fk_Usuario = ?");
            $respuestaUsuarioF->execute([$idUsuario]);
            $listarUsuarioF = $respuestaUsuarioF->fetchAll();
            $respuestaUsuarioF= null;

        }catch (Exception $error){
            $listarUsuarioF  = $error;
        }

        return $listarUsuarioF;
    }

    public static function mdlListarTodasUsuarios(){

        $listarUsuariosTdo = "";

        try{
            $respuestaUsuarioT= Conexion::conectar()->prepare("SELECT * FROM usuario");
            $respuestaUsuarioT->bindParam(":fk_Usuario", $fk_Usuario);
            $respuestaUsuarioT->execute();
            $$listarUsuariosTdo = $respuestaUsuarioT->fetchAll();
            $respuestaUsuarioT= null;

        }catch(Exception $e){
            $listarProducto = $e;
        }
        return $listarProducto;
    }*/

}