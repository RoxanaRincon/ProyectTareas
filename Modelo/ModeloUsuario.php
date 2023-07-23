<?php

include_once "Conexion.php";

class mdlUsuario {

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

    public static function mdlFiltrarUsuario($idUsuario){

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
    }

}