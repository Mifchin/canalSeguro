<?php
require_once "../config.php";

// Inicializar variables
$total = $pendientes = $revision = $finalizadas = 0;

try {
    // Total
    $sqlTotal = "SELECT COUNT(*) AS total FROM denuncia";
    $result = $conexion->query($sqlTotal);
    if ($result && $row = $result->fetch_assoc()) {
        $total = $row['total'];
    }

    // Pendientes (estado_id = 1)
    $sqlPendientes = "SELECT COUNT(*) AS pendientes FROM denuncia WHERE estado_id = 1";
    $result = $conexion->query($sqlPendientes);
    if ($result && $row = $result->fetch_assoc()) {
        $pendientes = $row['pendientes'];
    }

    // Revisión (estado_id = 2)
    $sqlRevision = "SELECT COUNT(*) AS revision FROM denuncia WHERE estado_id = 2";
    $result = $conexion->query($sqlRevision);
    if ($result && $row = $result->fetch_assoc()) {
        $revision = $row['revision'];
    }

    // Finalizadas (estado_id = 3)
    $sqlFinalizadas = "SELECT COUNT(*) AS finalizadas FROM denuncia WHERE estado_id = 3";
    $result = $conexion->query($sqlFinalizadas);
    if ($result && $row = $result->fetch_assoc()) {
        $finalizadas = $row['finalizadas'];
    }

    // Denuncias recientes
    $sqlRecientes = "SELECT den.codigo, ins.nombre AS nombre_institucion, den.fecha, tipinc.nombre AS nombre_tipoincidente,
    CASE WHEN den.nivelurgencia = 0 THEN 'BAJA' WHEN den.nivelurgencia = 1 THEN 'MEDIA' WHEN den.nivelurgencia = 2 THEN 'ALTA' ELSE '' END AS nivel_urgencia
    FROM denuncia den
    JOIN institucion ins ON (ins.id = den.institucion_id)
    JOIN tipoincidente tipinc ON (tipinc.id = den.tipinc_id)
    LEFT JOIN estado est ON (est.id = den.estado_id)
    WHERE den.estado_id NOT IN (3)
    ORDER BY den.fecha DESC";
    $result = $conexion->query($sqlRecientes);
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $recientes[] = $row;
        }
    }

    // Devolver como JSON
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'total' => $total,
        'pendientes' => $pendientes,
        'revision' => $revision,
        'finalizadas' => $finalizadas,
        'recientes' => $recientes
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al obtener los conteos: ' . $e->getMessage()
    ]);
}
?>
