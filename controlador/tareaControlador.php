<?php

include_once "../modelo/modeloTarea.php";

class ctrTarea{

    public $Nombre;
    public $Descripcion;
    public $Prioridad;
    public $Tiempo;
    public $fk_Usuario;

    public $idTarea;

  public function ctrListarTarea(){
    $respuestaTareaM = mdlTarea::mdlListarTarea();
    echo json_encode($respuestaTareaM);
  }
  public function ctrListarSelectUsuario(){
    $respuestaTareaM = mdlTarea::mdlListarSelectUsuario();
    echo json_encode($respuestaTareaM);
  }

  public function ctrGuardarTareas(){
    $respuestaTareaM = mdlTarea::mdlGuardarTarea($this->Nombre, $this->Descripcion,$this->Prioridad,$this->Tiempo,$this->fk_Usuario,);
    echo json_encode($respuestaTareaM);
  }


  public function ctrEliminarTarea(){
    $respuestaTareaM =  mdlTarea::mdlEliminarTarea($this->idTarea);
    echo json_encode($respuestaTareaM);
 }

 public function ctrEditarTarea(){
    $respuestaTareaM = mdlTarea::mdlEditarTarea($this->idTarea,$this->Nombre, $this->Descripcion,$this->Prioridad,$this->Tiempo,$this->fk_Usuario,);
    echo json_encode($respuestaTareaM);
  }

  

}

// Validacion para listar las tareas en la tabla 
if(isset($_POST["listarDatosTarea"]) == "ok"){

    $objTarea = new ctrTarea();
    $objTarea -> ctrListarTarea();
}

// Validacion para select de usuarios
if(isset($_POST["mostrarUsuarios"]) == "ok"){

    $objTarea = new ctrTarea();
    $objTarea -> ctrListarSelectUsuario();
}

// Validacion para guardar tareas
if(isset($_POST["guardarNombre"],$_POST["guardarDescripcion"],$_POST["guardarPrioridad"],$_POST["guardarTiempo"] ,$_POST["guardaridUsuario"])){
    $objTarea = new ctrTarea();
    $objTarea->Nombre = $_POST["guardarNombre"];
    $objTarea->Descripcion = $_POST["guardarDescripcion"];
    $objTarea->Prioridad = $_POST["guardarPrioridad"];
    $objTarea->Tiempo = $_POST["guardarTiempo"];
    $objTarea->fk_Usuario = $_POST["guardaridUsuario"];
    $objTarea->ctrGuardarTareas();
}

// Validacion para eliminar tareas
if(isset($_POST["eliminarTarea"])){
    $objTarea = new ctrTarea();
    $objTarea -> idTarea = $_POST["eliminarTarea"];
    $objTarea -> ctrEliminarTarea();
}

// Validacion para editar tareas

if(isset($_POST["editarNombre"], $_POST["editarDescripcion"], $_POST["editarPrioridad"], $_POST["editarTiempo"], $_POST["editarIdUsuario"], $_POST["editarIdTarea"])){
    $objTarea = new ctrTarea();
    $objTarea -> Nombre = $_POST["editarNombre"];
    $objTarea -> Descripcion = $_POST["editarDescripcion"];
    $objTarea -> Prioridad = $_POST["editarPrioridad"];
    $objTarea -> Tiempo = $_POST["editarTiempo"];
    $objTarea -> fk_Usuario = $_POST["editarIdUsuario"];
    $objTarea -> idTarea = $_POST["editarIdTarea"];
    $objTarea->ctrEditarTarea();
}



