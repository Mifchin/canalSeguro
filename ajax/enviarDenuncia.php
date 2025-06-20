<?php
require_once "../config.php";
// Funcion para Crear un Codigo Unico
function generarCodigoUnico($conexion) {
    $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    do {
        // Generar 5 digitos
        $digitos = '';
        for ($i = 0; $i < 5; $i++) {
            $digitos .= mt_rand(0, 9);
        }
        // Generar 4 letras
        $letras = '';
        for ($i = 0; $i < 4; $i++) {
            $letras .= $chars[mt_rand(0, strlen($chars) - 1)];
        }
        $codigo = "CS-{$digitos}-{$letras}";
        // Consultar si ya existe ese código
        $stmt = $conexion->prepare("SELECT COUNT(*) FROM denuncia WHERE codigo = ?");
        $stmt->bind_param("s", $codigo);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();
    } while ($count > 0);
    return $codigo;
}
// Capturo los datos
$codigo                 = generarCodigoUnico($conexion);
$institutionId          = isset($_POST['institutionId'])        ? $_POST['institutionId']                          : '';
$fecha                  = isset($_POST['fecha'])                ? $_POST['fecha']                                  : '';
$hora                   = isset($_POST['hora'])                 ? $_POST['hora']                                   : '';
$lugar                  = isset($_POST['lugar'])                ? trim(strip_tags($_POST['lugar']))                : '';
$tipincId               = isset($_POST['tipincId'])             ? $_POST['tipincId']                               : '';
$personas               = isset($_POST['personas'])             ? trim(strip_tags($_POST['personas']))             : '';
$descripcion            = isset($_POST['descripcion'])          ? trim(strip_tags($_POST['descripcion']))          : '';
$nivelUrgencia          = isset($_POST['nivelUrgencia'])        ? $_POST['nivelUrgencia']                          : '';
$testigos               = isset($_POST['testigos'])             ? trim(strip_tags($_POST['testigos']))             : '';
$concurrenciaId         = isset($_POST['concurrenciaId'])       ? $_POST['concurrenciaId']                         : '';
$informacionadicional   = isset($_POST['informacionadicional']) ? trim(strip_tags($_POST['informacionadicional'])) : '';
$estadoId               = 1;

// Preparo el insert
$sql = "INSERT INTO denuncia 
    (codigo, institucion_id, fecha, hora, lugar, tipinc_id, personas, descripcion, nivelurgencia, testigos, concurrencia_id, informacionadicional, estado_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
// Mostrar si hay error
if ($stmt === false) {
    http_response_code(500);
    echo "Error en la preparación de la consulta: " . $conexion->error;
}
// Guardar el la base de datos
$stmt->bind_param(
    "sisssissssisi",
    $codigo,
    $institutionId,
    $fecha,
    $hora,
    $lugar,
    $tipincId,
    $personas,
    $descripcion,
    $nivelUrgencia,
    $testigos,
    $concurrenciaId,
    $informacionadicional,
    $estadoId
);
// Mostrar los mensajes
if ($stmt->execute()) {
    http_response_code(200);
    echo $codigo;
} else {
    http_response_code(500);
    echo "Error al insertar la denuncia: " . $stmt->error;
}
$stmt->close();
?>