<?php
require_once('config.php'); // Agregamos la configuracion general
if (!isset($_SESSION['usuarioLogin'])) {
    header('Location: login.php');
    exit();
}
// Mostrar el dashboard segun el rol
if ($_SESSION['rolId']==1){
    require_once('dashboardAdmin.php');
} else if ($_SESSION['rolId']==2){
    require_once('dashboardEstudiante.php');
}
?>