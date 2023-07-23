<?php

include_once "../modelo/modeloUsuario.php";

class ctrUsuario{

    public $idUsuario;

    public function ctrListarUsuario(){
        $respuestaUsuarioM = mdlUsuario::mdlListarUsuario();
        echo json_encode($respuestaUsuarioM);
    }

    public function ctrtFiltrarUsuario(){
        $respuestaUsuarioMF = mdlUsuario::mdlFiltrarUsuario($this->idUsuario);
        echo json_encode($respuestaUsuarioMF);
    }
}