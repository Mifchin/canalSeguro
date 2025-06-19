<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $_NOMBRE; ?> - Sistema de Denuncias Escolares</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="img/favicon2.png" type="image/x-icon">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo-section">
                    <div class="logo">CS</div>
                    <div>
                        <h1 class="header-title"><?php echo $_NOMBRE; ?></h1>
                        <p class="header-subtitle">Sistema de Denuncias Escolares</p>
                    </div>
                </div>
                <div class="user-section">
                    <div class="user-info">
                        <span class="user-name" id="userName">Usuario</span>
                        <span class="user-role">Estudiante</span>
                    </div>
                </div>
                <nav class="nav-tabs">
                    <a href="#" class="nav-tab active" data-tab="report">Nueva Denuncia</a>
                    <a href="#" class="nav-tab" data-tab="tracking">Seguimiento</a>
                    <a href="#" class="nav-tab" data-tab="news">Noticias</a>
                    <a href="logout.php" class="nav-tab">Salir</a>
                </nav>
            </div>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <!-- TAB: NUEVA DENUNCIA -->
            <div id="report-tab" class="tab-content active">
                <div class="content-grid">
                    <section class="form-section">
                        <h2 class="section-title">Realizar Denuncia</h2>
                        <p class="section-description">
                            Reporta situaciones de acoso escolar. Puedes elegir mantener tu anonimato o proporcionar tus datos de contacto.
                        </p>

                        <div class="success-message" id="successMessage">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Tu denuncia ha sido enviada exitosamente. Guarda tu ID de seguimiento.
                        </div>

                        <form id="denunciaForm">
                            <div class="anonymous-toggle">
                                <div class="toggle-switch" id="anonymousToggle">
                                    <div class="toggle-slider"></div>
                                </div>
                                <div>
                                    <strong>Denuncia Anónima</strong>
                                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Activa para mantener tu identidad oculta</p>
                                </div>
                            </div>

                            <div class="contact-fields" id="contactFields">
                                <h4 style="margin-bottom: 1rem; color: var(--primary-color);">Datos de Contacto (Opcional)</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label" for="reporterName">Nombre Completo</label>
                                        <input type="text" class="form-control" id="reporterName" 
                                            placeholder="Tu nombre completo">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="reporterEmail">Correo Electrónico</label>
                                        <input type="email" class="form-control" id="reporterEmail" 
                                            placeholder="tu@email.com">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label" for="reporterPhone">Teléfono</label>
                                        <input type="tel" class="form-control" id="reporterPhone" 
                                            placeholder="Número de contacto">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="reporterGrade">Grado/Curso</label>
                                        <input type="text" class="form-control" id="reporterGrade" 
                                            placeholder="Ej: 9° A, 11° B">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="institutionId">Institución Educativa *</label>
                                <select class="form-control" name="institutionId" id="institutionId" required>
                                    <option value="">Selecciona tu institución</option>
                                    <?php
                                    // Consulta para obtener id y nombre de instituciones
                                    $sql = "SELECT id, nombre FROM institucion ORDER BY nombre ASC";
                                    $result = $conexion->query($sql);
                                    while($row = $result->fetch_assoc()) {
                                        echo '<option value="' . htmlspecialchars($row['id']) . '">' . htmlspecialchars($row['nombre']) . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label" for="fecha">Fecha del Incidente *</label>
                                    <input type="date" class="form-control" name="fecha" id="fecha" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="hora">Hora Aproximada</label>
                                    <input type="time" class="form-control" name="hora" id="hora">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="lugar">Lugar Específico del Incidente *</label>
                                <input type="text" class="form-control" name="lugar" id="lugar" required
                                    placeholder="Ej: Patio principal, Aula 201, Baños del segundo piso, etc.">
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="tipincId">Tipo de Incidente *</label>
                                <select class="form-control" name="tipincId" id="tipincId" required>
                                    <option value="">Selecciona el tipo de acoso</option>
                                    <?php
                                    // Consulta para obtener id y nombre de los tipos de incidente
                                    $sql = "SELECT id, nombre FROM tipoincidente ORDER BY nombre ASC";
                                    $result = $conexion->query($sql);
                                    while($row = $result->fetch_assoc()) {
                                        echo '<option value="' . htmlspecialchars($row['id']) . '">' . htmlspecialchars($row['nombre']) . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="personas">Personas Involucradas *</label>
                                <textarea class="form-control" name="personas" id="personas" required placeholder="Describe quiénes estuvieron involucrados: agresores, víctimas, testigos. Puedes usar iniciales o apodos si no conoces nombres completos."></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="descripcion">Descripción Detallada del Incidente *</label>
                                <textarea class="form-control" name="descripcion" id="descripcion" required placeholder="Describe paso a paso lo que ocurrió. Incluye detalles sobre las acciones, palabras utilizadas, y cualquier contexto relevante."></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Nivel de Urgencia *</label>
                                <div class="urgency-selector">
                                    <div class="urgency-option urgency-low" data-urgency="baja">
                                        <div>Baja</div>
                                        <small>Situación controlable</small>
                                    </div>
                                    <div class="urgency-option urgency-medium" data-urgency="media">
                                        <div>Media</div>
                                        <small>Requiere atención</small>
                                    </div>
                                    <div class="urgency-option urgency-high" data-urgency="alta">
                                        <div>Alta</div>
                                        <small>Situación grave</small>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="testigos">Testigos Presentes</label>
                                <textarea class="form-control" name="testigos" id="testigos" placeholder="¿Hubo testigos? Menciona nombres, apodos o cualquier información que ayude a identificarlos"></textarea>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="concurrenciaId">¿Ha ocurrido antes?</label>
                                <select class="form-control" name="concurrenciaId" id="concurrenciaId">
                                    <option value="">Selecciona una opción</option>
                                    <?php 
                                    // Consulta para obtener id y nombre de las concurrencias
                                    $sql = "SELECT id, nombre FROM concurrencia ORDER BY nombre ASC";
                                    $result = $conexion->query($sql);
                                    while($row = $result->fetch_assoc()) {
                                        echo '<option value="' . htmlspecialchars($row['id']) . '">' . htmlspecialchars($row['nombre']) . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="informacionadicional">Información Adicional</label>
                                <textarea class="form-control" name="informacionadicional" id="informacionadicional" placeholder="Cualquier otra información que consideres relevante: antecedentes, impacto emocional, medidas tomadas anteriormente, etc."></textarea>
                            </div>

                            <button type="submit" class="submit-btn">
                                <svg class="icon" style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24">
                                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                                </svg>
                                Enviar Denuncia
                            </button>
                        </form>

                        <div class="anonymous-id" id="trackingId" style="display: none;">
                            ID de Seguimiento: <span id="generatedId"></span>
                            <br><small>Guarda este ID para consultar el estado de tu denuncia</small>
                        </div>
                    </section>

                    <aside class="sidebar">
                        <div class="info-card">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                                </svg>
                                Privacidad Garantizada
                            </h3>
                            <div class="info-card-content">
                                <p>Puedes elegir entre:</p>
                                <ul class="privacy-points">
                                    <li>Denuncia completamente anónima</li>
                                    <li>Proporcionar datos de contacto</li>
                                    <li>Comunicación segura y encriptada</li>
                                    <li>Solo la institución verá tu reporte</li>
                                </ul>
                            </div>
                        </div>

                        <div class="info-card">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M13 2L3 14h6v8l10-12h-6V2z"/>
                                </svg>
                                ¿Necesitas Ayuda Inmediata?
                            </h3>
                            <div class="info-card-content">
                                <p>Si estás en peligro inmediato:</p>
                                <br>
                                <strong>• Línea Nacional: 141</strong><br>
                                <strong>• Policía de Infancia: 123</strong><br>
                                <strong>• Emergencias: 112</strong><br>
                                <strong>• Te Protejo: 018000-112440</strong>
                            </div>
                        </div>

                        <div class="info-card contact-info">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                Coordinación Departamental
                            </h3>
                            <div class="info-card-content">
                                Sistema administrado por Grupo 7 para garantizar un entorno escolar seguro y libre de acoso.
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <!-- TAB: SEGUIMIENTO -->
            <div id="tracking-tab" class="tab-content">
                <div class="content-grid">
                    <section class="tracking-section">
                        <h2 class="section-title">Seguimiento de Denuncia</h2>
                        <p class="section-description">
                            Ingresa tu ID de seguimiento para conocer el estado actual de tu denuncia.
                        </p>

                        <div class="tracking-form">
                            <input type="text" class="form-control" id="trackingInput" 
                                placeholder="Ingresa tu ID de seguimiento (Ej: CS-123456-ABCD)">
                            <button type="button" class="tracking-btn" onclick="searchReport()">
                                <svg class="icon" style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/>
                                </svg>
                                Buscar
                            </button>
                        </div>

                        <div id="trackingResults">
                            <!-- Los resultados aparecerán aquí -->
                        </div>

                        <!-- Ejemplo de estados -->
                        <div style="margin-top: 2rem;">
                            <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Estados de Denuncias:</h4>
                            
                            <div class="status-card status-pending">
                                <div class="status-badge badge-pending">RECIBIDA</div>
                                <h4>Denuncia Recibida</h4>
                                <p>Tu denuncia ha sido recibida y está esperando revisión inicial por parte de la institución.</p>
                            </div>

                            <div class="status-card status-reviewing">
                                <div class="status-badge badge-reviewing">EN REVISIÓN</div>
                                <h4>En Proceso de Investigación</h4>
                                <p>La institución está investigando los hechos reportados y recopilando información adicional.</p>
                            </div>

                            <div class="status-card status-completed">
                                <div class="status-badge badge-completed">FINALIZADA</div>
                                <h4>Caso Cerrado</h4>
                                <p>La investigación ha concluido y se han tomado las medidas correspondientes.</p>
                            </div>
                        </div>
                    </section>

                    <aside class="sidebar">
                        <div class="info-card">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                ¿Cómo Funciona el Seguimiento?
                            </h3>
                            <div class="info-card-content">
                                <p><strong>1. Recibida:</strong> Tu denuncia llegó correctamente</p>
                                <p><strong>2. En Revisión:</strong> Se está investigando el caso</p>
                                <p><strong>3. Finalizada:</strong> Se tomaron medidas y el caso se cerró</p>
                                <br>
                                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                                    El tiempo de respuesta varía según la complejidad del caso.
                                </p>
                            </div>
                        </div>

                        <div class="info-card">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                ¿No Tienes tu ID?
                            </h3>
                            <div class="info-card-content">
                                <p>Si perdiste tu ID de seguimiento:</p>
                                <br>
                                <p>• Revisa tu correo si proporcionaste datos de contacto</p>
                                <p>• Contacta a la institución educativa</p>
                                <p>• El ID tiene formato: CS-XXXXXX-XXXX</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <!-- TAB: NOTICIAS -->
            <div id="news-tab" class="tab-content">
                <div class="content-grid">
                    <section class="news-section">
                        <h2 class="section-title">Noticias y Recursos</h2>
                        <p class="section-description">
                            Mantente informado sobre prevención del acoso escolar, recursos disponibles y casos de éxito.
                        </p>

                        <div class="news-grid">
                            <article class="news-article">
                                <div class="news-date">10 de Junio, 2025</div>
                                <h3 class="news-title">Nueva Campaña "Cero Tolerancia al Acoso" en Instituciones Departamentales</h3>
                                <p class="news-excerpt">
                                    La Secretaría de Educación lanza una iniciativa integral para erradicar el acoso escolar, 
                                    implementando protocolos mejorados y programas de sensibilización en todas las instituciones.
                                </p>
                                <span class="news-tag">Prevención</span>
                            </article>

                            <article class="news-article">
                                <div class="news-date">8 de Junio, 2025</div>
                                <h3 class="news-title">Guía para Padres: Cómo Identificar Signos de Acoso Escolar</h3>
                                <p class="news-excerpt">
                                    Psicólogos educativos comparten las señales más comunes que indican que un menor 
                                    puede estar siendo víctima de acoso, junto con estrategias de apoyo familiar.
                                </p>
                                <span class="news-tag">Familia</span>
                            </article>

                            <article class="news-article">
                                <div class="news-date">5 de Junio, 2025</div>
                                <h3 class="news-title">Ciberseguridad Escolar: Protección Contra el Ciberacoso</h3>
                                <p class="news-excerpt">
                                    Con el aumento del uso de redes sociales, las instituciones implementan 
                                    programas educativos sobre uso responsable de internet y prevención del ciberacoso.
                                </p>
                                <span class="news-tag">Tecnología</span>
                            </article>

                            <article class="news-article">
                                <div class="news-date">3 de Junio, 2025</div>
                                <h3 class="news-title">Testimonio: "El Canal Seguro Cambió Mi Experiencia Escolar"</h3>
                                <p class="news-excerpt">
                                    Un estudiante comparte cómo el sistema anónimo de denuncias le permitió buscar ayuda 
                                    y resolver una situación de acoso que afectaba su rendimiento académico.
                                </p>
                                <span class="news-tag">Testimonios</span>
                            </article>

                            <article class="news-article">
                                <div class="news-date">1 de Junio, 2025</div>
                                <h3 class="news-title">Capacitación Docente en Mediación de Conflictos</h3>
                                <p class="news-excerpt">
                                    200 docentes del departamento participaron en talleres especializados sobre 
                                    detección temprana y manejo de situaciones de conflicto escolar.
                                </p>
                                <span class="news-tag">Educación</span>
                            </article>

                            <article class="news-article">
                                <div class="news-date">28 de Mayo, 2025</div>
                                <h3 class="news-title">Día Mundial de la Convivencia Escolar: Actividades y Reflexiones</h3>
                                <p class="news-excerpt">
                                    Las instituciones celebraron con jornadas de sensibilización, obras de teatro 
                                    y actividades que promueven el respeto y la inclusión en el ambiente escolar.
                                </p>
                                <span class="news-tag">Eventos</span>
                            </article>

                            <article class="news-article">
                                <div class="news-date">25 de Mayo, 2025</div>
                                <h3 class="news-title">Estadísticas Positivas: Reducción del 40% en Casos de Acoso</h3>
                                <p class="news-excerpt">
                                    Los datos del primer semestre muestran una significativa disminución en los 
                                    reportes de acoso escolar gracias a las medidas preventivas implementadas.
                                </p>
                                <span class="news-tag">Estadísticas</span>
                            </article>

                            <article class="news-article">
                                <div class="news-date">22 de Mayo, 2025</div>
                                <h3 class="news-title">Recursos de Apoyo Psicológico para Estudiantes</h3>
                                <p class="news-excerpt">
                                    Se amplía la red de psicólogos escolares y se implementan espacios de 
                                    apoyo emocional en todas las instituciones del departamento.
                                </p>
                                <span class="news-tag">Salud Mental</span>
                            </article>
                        </div>
                    </section>

                    <aside class="sidebar">
                        <div class="info-card">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                Recursos Destacados
                            </h3>
                            <div class="info-card-content">
                                <p><strong>📚 Guías de Convivencia</strong><br>
                                Materiales educativos para estudiantes</p>
                                <br>
                                <p><strong>👨‍👩‍👧‍👦 Material para Padres</strong><br>
                                Recursos para el apoyo familiar</p>
                                <br>
                                <p><strong>🎓 Capacitación Docente</strong><br>
                                Programas de formación continua</p>
                            </div>
                        </div>

                        <div class="info-card">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                                </svg>
                                Documentos Importantes
                            </h3>
                            <div class="info-card-content">
                                <p>• Manual de Convivencia Escolar</p>
                                <p>• Protocolo de Atención de Casos</p>
                                <p>• Derechos y Deberes Estudiantiles</p>
                                <p>• Rutas de Atención Integral</p>
                            </div>
                        </div>

                        <div class="info-card contact-info">
                            <h3 class="info-card-title">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                                </svg>
                                Suscríbete a Noticias
                            </h3>
                            <div class="info-card-content">
                                Recibe las últimas noticias y recursos sobre convivencia escolar directamente en tu correo.
                                <br><br>
                                <input type="email" placeholder="tu@email.com" style="width: 100%; padding: 0.5rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; background: rgba(255,255,255,0.1); color: white;">
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </main>

    <script src="script.js"></script>
</body>
</html>