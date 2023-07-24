<?php

include_once "../modelo/modeloUsuario.php";

class ctrUsuario {

    public $idUsuario;
    public $Nombres;
    public $Apellidos;
    public $Correo;
    public $Password; // Nuevo campo para la contraseña

    public function ctrListarUsuario() {
        $respuestaUsuarioM = mdlUsuario::mdlListarUsuario();
        echo json_encode($respuestaUsuarioM);
    }

    public function ctrGuardarUsuario() {
        $respuestaUsuarioM = mdlUsuario::mdlGuardarUsuario($this->Nombres, $this->Apellidos, $this->Correo, $this->Password);
        echo json_encode($respuestaUsuarioM);
    }

    public function ctrUpdateUsuario() {
        $respuestaUsuarioM = mdlUsuario::mdlUpdateUsuario($this->Nombres, $this->Apellidos, $this->Correo, $this->Password, $this->idUsuario);
        echo json_encode($respuestaUsuarioM);
    }

    public function ctrEliminarUsuario() {
        $respuestaUsuarioM = mdlUsuario::mdlEliminarUsuario($this->idUsuario);
        echo json_encode($respuestaUsuarioM);
    }

    public function ctrIniciarSesion() {
        // Lógica para implementar el inicio de sesión
        $usuario = mdlUsuario::mdlIniciarSesion($this->Correo, $this->Password);
        if ($usuario) {
            // Inicio de sesión exitoso, guardar información del usuario en la sesión
            session_start();
            $_SESSION['loggedin'] = true; // Variable que indica que el usuario ha iniciado sesión
            $_SESSION['idUsuario'] = $usuario['idUsuario']; // Solo almacenar el ID del usuario en la sesión
            // Aquí puedes guardar más información del usuario en la sesión si lo necesitas
            echo json_encode("ok");
        } else {
            echo json_encode("Usuario o contraseña incorrectos");
        }
    }
    
}



// Verificar si se ha enviado el formulario de inicio de sesión
if (isset($_POST["correo"], $_POST["password"])) {
    $objUsuario = new ctrUsuario();
    $objUsuario->Correo = $_POST["correo"];
    $objUsuario->Password = $_POST["password"];
    $objUsuario->ctrIniciarSesion();
}

if(isset($_POST["listarDatosUsuario"]) && $_POST["listarDatosUsuario"] == "ok"){

    $objUsuario = new ctrUsuario();
    $objUsuario -> ctrListarUsuario();

}

if (isset($_POST["guardarNombres"], $_POST["guardarApellidos"], $_POST["guardarCorreo"], $_POST["guardarPassword"])) {
    $objUsuario = new ctrUsuario();
    $objUsuario->Nombres = $_POST["guardarNombres"];
    $objUsuario->Apellidos = $_POST["guardarApellidos"];
    $objUsuario->Correo = $_POST["guardarCorreo"];
    $objUsuario->Password = $_POST["guardarPassword"]; // Agregar el campo de contraseña al objeto ctrUsuario
    $objUsuario->ctrGuardarUsuario();
}

if(isset($_POST["eliminarUsuario"])){
    $objUsuario = new ctrUsuario();
    $objUsuario -> idUsuario = $_POST["eliminarUsuario"];
    $objUsuario -> ctrEliminarUsuario();
}


if (isset($_POST["updateNombres"], $_POST["updateApellidos"], $_POST["updateCorreo"], $_POST["updateIdUsuario"], $_POST["updatePassword"])) {
    $objPersonaje = new ctrUsuario();
    $objPersonaje->Nombres = $_POST["updateNombres"];
    $objPersonaje->Apellidos = $_POST["updateApellidos"];
    $objPersonaje->Correo = $_POST["updateCorreo"];
    $objPersonaje->idUsuario = $_POST["updateIdUsuario"];
    $objPersonaje->Password = $_POST["updatePassword"]; // Agregar el campo de contraseña al objeto ctrUsuario
    $objPersonaje->ctrUpdateUsuario();
}