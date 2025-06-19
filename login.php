<?php
require_once('config.php'); // Agregamos la configuracion general

if (isset($_SESSION['usuarioLogin'])) {
    header('Location: index.php');
    exit();
}

// Si se ha enviado el login vamos a validar los datos
if (isset($_POST['username'], $_POST['password']) && !empty($_POST['username']) && !empty($_POST['password'])) {
    $username = $_POST['username'];
    $password = md5($_POST['password']);
    // Ejecutar la consulta
    $stmt = $conexion->prepare("SELECT * FROM usuario WHERE usuario = ? AND clave = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    // Obtener resultados
    $resultado = $stmt->get_result();
    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();
        $_SESSION['usuarioLogin'] = $usuario['usuario'];
        $_SESSION['rolId'] = $usuario['rol_id'];
        header('Location: index.php');
    } else {
        $loginErrorMessage = "style='display: block'";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $_NOMBRE; ?> - Iniciar Sesión</title>
    <link rel="stylesheet" href="login-style.css">
    <link rel="icon" href="img/favicon2.png" type="image/x-icon">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="logo-section">
                <div class="logo">CS</div>
                <h1 class="login-title">Canal Seguro</h1>
                <p class="login-subtitle">Sistema de Denuncias Escolares</p>
            </div>

            <div class="error-message" id="errorMessage" <?php echo $loginErrorMessage; ?>>
                <svg class="icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span id="errorText">Usuario o contraseña incorrectos</span>
            </div>

            <form action="login.php" method="POST">
                <div class="form-group">
                    <label class="form-label" for="username">Usuario</label>
                    <input type="text" class="form-control" name="username" id="username" required placeholder="Ingresa tu usuario">
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">Contraseña</label>
                    <div class="password-input">
                        <input type="password" class="form-control" name="password" id="password" required placeholder="Ingresa tu contraseña">
                        <button type="button" class="password-toggle" id="passwordToggle">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button type="submit" class="login-btn">
                    <svg class="icon" style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24">
                        <path d="M10 17l5-5-5-5v10z"/>
                    </svg>
                    Iniciar Sesión
                </button>
            </form>
        </div>

        <div class="info-panel">
            <div class="info-card">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                    </svg>
                    Acceso Seguro
                </h3>
                <p>Tu información está protegida con encriptación de extremo a extremo.</p>
            </div>

            <div class="info-card">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Confidencialidad
                </h3>
                <p>Garantizamos la privacidad de todas las denuncias y comunicaciones.</p>
            </div>

            <div class="info-card">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M13 2L3 14h6v8l10-12h-6V2z"/>
                    </svg>
                    Soporte 24/7
                </h3>
                <p>Líneas de emergencia disponibles las 24 horas del día.</p>
            </div>
        </div>
    </div>
</body>
</html>