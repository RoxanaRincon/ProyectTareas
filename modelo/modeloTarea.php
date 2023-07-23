<?php

include_once "Conexion.php";

class mdlTarea {
    
    // Funcion para listar la tabla de tareas
    public static function mdlListarTarea(){
        $listarTarea = "";

        try{
            $respuestaTarea= Conexion::conectar()->prepare("SELECT actividad.idTarea, actividad.Nombre, actividad.Descripcion, actividad.Prioridad 
            , actividad.Tiempo, usuario.Nombres FROM actividad INNER JOIN usuario ON actividad.fk_Usuario = usuario.idUsuario ");
            $respuestaTarea->execute();
            $listarTarea = $respuestaTarea->fetchAll();
            $respuestaTarea= null;

        }catch(Exception $error){
            $listarTarea = $error;

        }
        return $listarTarea;
    }


    // funcion para listar el slect de usuarios
    public static function mdlListarSelectUsuario(){
        $listarSelectUsuario = "";

        try{
            $respuestaSelectUsuario= Conexion::conectar()->prepare("SELECT * FROM usuario");
            $respuestaSelectUsuario->execute();
            $listarSelectUsuario = $respuestaSelectUsuario->fetchAll();
            $respuestaSelectUsuario= null;

        }catch(Exception $error){
            $listarSelectUsuario = $error;

        }
        return $listarSelectUsuario;
    }
    

    public static function mdlGuardarTarea($Nombre, $Descripcion, $Prioridad, $Tiempo, $fk_Usuario){
        $mensaje = "";
                
        try{
            $respuestaGTarea= Conexion::conectar()->prepare("INSERT INTO actividad(Nombre, Descripcion, Prioridad, Tiempo, fk_Usuario) VALUES(:nombre, :descripcion, :prioridad, :tiempo, :fk_Usuario)"); 
            $respuestaGTarea->bindParam(":nombre", $Nombre);
            $respuestaGTarea->bindParam(":descripcion", $Descripcion);
            $respuestaGTarea->bindParam(":prioridad", $Prioridad);
            $respuestaGTarea->bindParam(":tiempo", $Tiempo);
            $respuestaGTarea->bindParam(":fk_Usuario", $fk_Usuario);
            if($respuestaGTarea->execute()){
                $mensaje = "ok";
            }else{
                $mensaje = "Error al registrar la tarea";
            }

        }catch(Exception $error){
            $mensaje = $error;

        }
        return $mensaje;
    }

    public static function mdlEliminarTarea($idTarea){

        $mensaje = "";  
        try{
            $respuestaTarea= Conexion::conectar()->prepare("DELETE FROM actividad WHERE idTarea = :idTarea");
            $respuestaTarea->bindParam(":idTarea", $idTarea);
            if($respuestaTarea->execute()){
                $mensaje = "ok";
            }else{
                $mensaje = "Error al eliminar el usuario";
            }
            
        }catch(Exception $error){
            $mensaje = $error;
        }

        return $mensaje;
    }
    
    /*
    public static function mdlUpdateTarea($Nombre, $Descripcion, $Prioridad, $Tiempo,$idUsuario, $id){
        
        $updateTarea = "";

        try {

            $respuestaUpTarea = Conexion::conectar()->prepare("UPDATE  actividad  SET Nombre = :nombre, Descripcion = :descripcion, Priodirdad = :prioridad, Tiempo = :tiempo, fk_Usuario = :fk_Usuario WHERE idTarea = :id "); 
            $respuestaUpTarea ->bindParam(":nombre", $Nombre);
            $respuestaUpTarea->bindParam(":descripcion", $Descripcion);
            $respuestaUpTarea->bindParam(":prioridad", $Prioridad);
            $respuestaUpTarea->bindParam(":tiempo", $Tiempo);
            $respuestaUpTarea->bindParam(":fk_Usuario", $idUsuario);
            $respuestaUpTarea->bindParam(":id", $id);
            
            if ($respuestaUpTarea->execute()){
                $updateTarea= "ok";

            }else{
                $updateTarea= "Error al editar datos";
            }

        }catch(Exception $e){
            $updateTarea = $e;
        }
        return $updateTarea;
    }


    public static function mdlEliminarTarea($id){

        $eliminarTarea = "";

        try {

            $respuestaElTarea = Conexion::conectar()->prepare("DELETE FROM  actividad  WHERE idTarea = :id");           
            $respuestaElTarea ->bindParam(":id", $id);

            if ($$respuestaElTarea ->execute()){
                $eliminarTarea= "ok";

            }else{
                $eliminarTarea= "Eliminar datos";
            }

        }catch(Exception $e){
            $eliminarTarea = $e;
        }
        return $eliminarTarea;
    }*/
}