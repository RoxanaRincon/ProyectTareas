$(document).ready(function() {
    // Escuchar el evento de envío del formulario
    $("#formLogin").submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        // Enviar los datos del formulario al controlador mediante AJAX
        $.ajax({
            url: "../controlador/usuarioControlador.php", // Reemplaza "ruta/a/tu_controlador.php" por la URL real de tu controlador
            method: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                // Aquí puedes manejar la respuesta del servidor
                if (response === "ok") {
                    // Redireccionar a la página de inicio o al dashboard
                    window.location.href = "../Vista/tarea.php"; // Reemplaza "ruta/a/dashboard.php" por la URL real de tu dashboard
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            },
            error: function() {
                alert("Error al procesar la solicitud");
            }
        });
    });
});