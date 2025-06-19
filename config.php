<?php
session_start();
// Variables globales
$_NOMBRE = "CanalSeguro";
$_MYSQLHOST = "127.0.0.1";
$_MYSQLUSER = "root";
$_MYSQLPASS = "";
$_MYSQLDB   = "canalseguro";

// Hacemos la conexion con la base de datos
$conexion = new mysqli($_MYSQLHOST, $_MYSQLUSER, $_MYSQLPASS, $_MYSQLDB);
$conexion->set_charset("utf8");
// Si hay error se muestra
if ($conexion->connect_error) {
    die("Error de conexión con la base de datos: " . $conexion->connect_error);
}
?>