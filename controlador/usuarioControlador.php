<?php

include_once "../modelo/modeloUsuario.php";

class ctrUsuario{

    public $idUsuario;

    public $Nombres;
    public $Apellidos;
    public $Correo;

    public function ctrListarUsuario(){
        $respuestaUsuarioM = mdlUsuario::mdlListarUsuario();
        echo json_encode($respuestaUsuarioM);
    }

    public function ctrGuardarUsuario(){
       $respuestaUsuarioM =  mdlUsuario::mdlGuardarUsuario($this->Nombres,  $this->Apellidos, $this->Correo);
       echo json_encode($respuestaUsuarioM);
    }

    public function ctrUpdateUsuario(){
        $respuestaUsuarioM = mdlUsuario::mdlUpdateUsuario($this->Nombres,  $this->Apellidos, $this->Correo, $this->idUsuario);
        echo json_encode($respuestaUsuarioM);
    }

    public function ctrEliminarUsuario(){
        $respuestaUsuarioM =  mdlUsuario::mdlEliminarUsuario($this->idUsuario);
        echo json_encode($respuestaUsuarioM);
    }
}

if(isset($_POST["listarDatosUsuario"]) == "ok"){

    $objUsuario = new ctrUsuario();
    $objUsuario -> ctrListarUsuario();

}

if(isset($_POST["guardarNombres"], $_POST["guardarApellidos"], $_POST["guardarCorreo"])){

    $objUsuario = new ctrUsuario();
    $objUsuario->Nombres = $_POST["guardarNombres"];
    $objUsuario->Apellidos = $_POST["guardarApellidos"];
    $objUsuario->Correo = $_POST["guardarCorreo"];
    $objUsuario-> ctrGuardarUsuario();

}

if(isset($_POST["eliminarUsuario"])){
    $objUsuario = new ctrUsuario();
    $objUsuario -> idUsuario = $_POST["eliminarUsuario"];
    $objUsuario -> ctrEliminarUsuario();
}


if (isset($_POST["updateNombres"], $_POST["updateApellidos"], $_POST["updateCorreo"],$_POST["updateIdUsuario"])){

    $objPersonaje = new ctrUsuario ();
    $objPersonaje-> Nombres = $_POST["updateNombres"];
    $objPersonaje-> Apellidos = $_POST["updateApellidos"];
    $objPersonaje-> Correo = $_POST["updateCorreo"];
    $objPersonaje-> idUsuario = $_POST["updateIdUsuario"];
    $objPersonaje-> ctrUpdateUsuario();
}
