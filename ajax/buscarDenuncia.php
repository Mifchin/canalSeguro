<?php
require_once "../config.php";

$denunciaId = isset($_POST['denunciaId']) ? $_POST['denunciaId'] : '';
// Preparo el select
$sql = "SELECT den.codigo, ins.nombre AS nombre_institucion, den.fecha, tipinc.nombre AS nombre_tipoincidente,
    CASE WHEN den.nivelurgencia = 0 THEN 'BAJA' WHEN den.nivelurgencia = 1 THEN 'MEDIA' WHEN den.nivelurgencia = 2 THEN 'ALTA' ELSE '' END AS nivel_urgencia,
    est.nombre AS nombre_estado, est.id AS id_estado
    FROM denuncia den
    JOIN institucion ins ON (ins.id = den.institucion_id)
    JOIN tipoincidente tipinc ON (tipinc.id = den.tipinc_id)
    LEFT JOIN estado est ON (est.id = den.estado_id)
    WHERE den.codigo = ?";
$stmt = $conexion->prepare($sql);
// Mostrar si hay error
if ($stmt === false) {
    http_response_code(500);
    echo "Error en la preparación de la consulta: " . $conexion->error;
}
// Guardar el la base de datos
$stmt->bind_param("s", $denunciaId);
if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'codigo' => $row['codigo'],
            'nombre_institucion' => $row['nombre_institucion'],
            'fecha' => $row['fecha'],
            'nombre_tipoincidente' => $row['nombre_tipoincidente'],
            'nivel_urgencia' => $row['nivel_urgencia'],
            'nombre_estado' => $row['nombre_estado'],
            'id_estado'     => $row['id_estado']
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Denuncia no encontrada'
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al ejecutar la consulta: ' . $stmt->error
    ]);
}
$stmt->close();
?>