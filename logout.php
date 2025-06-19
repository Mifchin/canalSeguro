<?php
require_once('config.php'); // Agregamos la configuracion general

if (isset($_SESSION['usuarioLogin'])) {
    unset($_SESSION['usuarioLogin']);
    unset($_SESSION['rolId']);
    $_SESSION = array();
    header('Location: login.php');
    exit();
}
header('Location: login.php');
?>