<?php

include_once "Conexion.php";

class mdlTarea {
    
    public static function mdlGuardarTarea($Nombre, $Descripcion, $Prioridad, $Tiempo, $idUsuario){
        //$mensaje = "";
        $registrarTarea= "";
         
        try{
            $respuestaGTarea= Conexion::conectar()->prepare("INSERT INTO actividad(Nombre, Descripcion, Prioridad, Tiempo, fk_Usuario) VALUES(:nombre, :descripcion, :prioridad, :tiempo, :fk_Usuario)"); 
            $respuestaGTarea->bindParam(":nombre", $Nombre);
            $respuestaGTarea->bindParam(":descripcion", $Descripcion);
            $respuestaGTarea->bindParam(":prioridad", $Prioridad);
            $respuestaGTarea->bindParam(":tiempo", $Tiempo);
            $respuestaGTarea->bindParam(":fk_Usuario", $idUsuario);
            $respuestaGTarea->execute();
            $registrarTarea = $respuestaGTarea->fetchAll();
            $registrarTarea= null;

        }catch(Exception $error){
            $registrarTarea = $error;

        }
        return $registrarTarea;
    }


    public static function mdlListarTarea(){
        //$mensaje = "";
        $listarTarea = "";

        try{
            $respuestaTarea= Conexion::conectar()->prepare("SELECT * FROM actividad");
            $respuestaTarea->execute();
            $listarTarea = $respuestaTarea->fetchAll();
            $respuestaTarea= null;

        }catch(Exception $error){
            $listarTarea = $error;

        }
        return $listarTarea;
    }

    
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
    }
}