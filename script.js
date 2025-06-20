// Sistema de pestañas
function InicializarTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        if (!tab.hasAttribute('data-tab')) return;
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clases active
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Agregar clase active
            this.classList.add('active');
            const targetTab = this.dataset.tab + '-tab';
            document.getElementById(targetTab).classList.add('active');
        });
    });
}
// Selector de urgencia
function InicializarUrgencySelector() {
    const urgencyOptions = document.querySelectorAll('.urgency-option');
    urgencyOptions.forEach(option => {
        option.addEventListener('click', function() {
            urgencyOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('nivelUrgencia').value = this.dataset.urgency;
        });
    });
}
// Modal
function openReportModal(reportId) {
    const report = reportId;
    
    currentReportId = reportId;
    
    const modal = document.getElementById('reportModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Denuncia ${report.id}`;
    
    modalBody.innerHTML = generateReportModalContent(report);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function generateReportModalContent(report) {
    return `
        <div class="report-details">
            <div class="detail-section">
                <h4>Información General</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <strong>ID:</strong> 
                    </div>
                    <div class="detail-item">
                        <strong>Fecha del incidente:</strong>
                    </div>
                    <div class="detail-item">
                        <strong>Hora:</strong>
                    </div>
                    <div class="detail-item">
                        <strong>Institución:</strong> 
                    </div>
                    <div class="detail-item">
                        <strong>Lugar:</strong> 
                    </div>
                    <div class="detail-item">
                        <strong>Tipo:</strong>
                    </div>
                    <div class="detail-item">
                        <strong>Urgencia:</strong> 
                        <span class="urgency-badge urgency-"></span>
                    </div>
                    <div class="detail-item">
                        <strong>Estado:</strong> 
                        <span class="status-badge status-"></span>
                    </div>
                </div>
            </div>
           
            
            <div class="detail-section">
                <h4>Descripción del Incidente</h4>
                <div class="detail-text">
                    <strong>Personas involucradas:</strong><br>
                </div>
                <div class="detail-text">
                    <strong>Descripción:</strong><br>
                </div>
               
            </div>
            
          
            
            <div class="detail-section">
                <h4>Actualizar Estado</h4>
                <div class="status-update">
                    <select id="newStatus" class="form-control">
                        
                    </select>
                    <textarea id="statusNote" class="form-control" placeholder="Nota sobre el cambio de estado..." style="margin-top: 0.5rem; min-height: 80px;"></textarea>
                </div>
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById('reportModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentReportId = null;
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funciones
    InicializarTabs();
    InicializarUrgencySelector();

    // ADMINISTRADOR TRAER TOTAL DENUNCIAS
    const totalContaDenuncias = document.getElementById('totalReports');
    const pendienteContaDenuncias = document.getElementById('pendingReports');
    const revisionContaDenuncias = document.getElementById('reviewingReports');
    const finalizadaContaDenuncias = document.getElementById('completedReports');
    if (totalContaDenuncias && pendienteContaDenuncias && revisionContaDenuncias && finalizadaContaDenuncias) {
        fetch('ajax/totalDenuncias.php')
        .then(response => {
            if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => { throw new Error(text); });
                }
            })
        .then(data => {
            if (data.status === 'success') {
                    totalContaDenuncias.innerText = data.total;
                    pendienteContaDenuncias.innerText = data.pendientes;
                    revisionContaDenuncias.innerText = data.revision;
                    finalizadaContaDenuncias.innerText = data.finalizadas;
                    const recentList = document.getElementById('recentReportsList');
                    if (recentList) {
                        recentList.innerHTML = '';
                        data.recientes.forEach(item => {
                            const urgenciaClase = item.nivel_urgencia === 'ALTA' ? 'urgency-alta'
                                : item.nivel_urgencia === 'MEDIA' ? 'urgency-media'
                                : 'urgency-baja';
                            const html = `<div class="report-item" onclick="openReportModal('${item.codigo}')">
                                <div class="report-header">
                                    <span class="report-id">${item.codigo}</span>
                                    <span class="report-date">${item.fecha}</span>
                                </div>
                                <div class="report-info">
                                    <strong>${item.nombre_institucion}</strong><br>
                                    ${item.nombre_tipoincidente}
                                    <span class="urgency-badge ${urgenciaClase}">${item.nivel_urgencia}</span>
                                </div>
                            </div>`;
                            recentList.innerHTML += html;
                        });
                    }
                } else {
                    console.warn("Error del servidor:", data.mensaje);
                }
            })
        .catch(error => {
            try {
                const errObj = JSON.parse(error.message);
                console.error("Error al obtener estadísticas:", errObj.mensaje);
            } catch {
                console.error("Error al obtener estadísticas:", error.message);
            }
        });

        
    }
    
    // FORMULARIO ESTUDIANTE-DENUNCIA
    const denunciaForm = document.getElementById('denunciaForm');
    if(denunciaForm){
        document.getElementById('denunciaForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que se recargue la página al enviar
            const formData = new FormData(document.getElementById('denunciaForm'));
            fetch('ajax/enviarDenuncia.php', {
                method: 'POST',
                body: formData,
            }).then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            }).then(codigo => {
                alert("Denuncia registrada con código: " + codigo);
                document.getElementById('trackingInput').value = codigo;
                // Limpiar Formulario
                document.getElementById('denunciaForm').reset();
                document.querySelectorAll('.urgency-option').forEach(opt => opt.classList.remove('active'));
                const trackingTab = document.querySelector('.nav-tab[data-tab="tracking"]');
                if (trackingTab) {
                    trackingTab.click();
                }
            }).catch(error => {
                console.error("Error al registrar la denuncia:", error.message);
            });
        });
    }
    // FORMULARIO ESTUDIANTE-SEGUIMIENTO
    const trackingButton = document.getElementById('trackingButton');
    if(trackingButton){
        document.getElementById('trackingButton').addEventListener('click', function () {
            const denunciaId = document.getElementById('trackingInput').value.trim();
            const denunciaResultado = document.getElementById('trackingResults');
            denunciaResultado.style.display = 'none';
            if (!denunciaId) {
                alert('Por favor ingresa un código de denuncia.');
                return;
            }
            const formData = new FormData();
            formData.append('denunciaId', denunciaId);
            fetch('ajax/buscarDenuncia.php', {
                method: 'POST',
                body: formData,
            }).then(response => {
                if (response.ok) {
                    return response.json(); // Esperamos JSON
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            }).then(data => {
                if (data.status === 'success') {
                    console.log("Denuncia encontrada:", data);
                    document.getElementById('codigo').innerText = data.codigo || '';
                    document.getElementById('nombre_institucion').innerHTML = '<strong>Institución: </strong>' + data.nombre_institucion || '';
                    document.getElementById('fecha').innerHTML = '<strong>Fecha incidente: </strong>' + data.fecha || '';
                    document.getElementById('nombre_tipoincidente').innerHTML = '<strong>Tipo incidente: </strong>' + data.nombre_tipoincidente || '';
                    document.getElementById('nivel_urgencia').innerHTML = '<strong>Urgencia: </strong>' + data.nivel_urgencia || '';
                    document.getElementById('nombre_estado').innerText = data.nombre_estado || '';
                    if(data.id_estado==1){
                        document.getElementById('seguimientoDenuncia').classList.add('status-pending'); // Pendiente
                        document.getElementById('nombre_estado').classList.add('badge-pending'); // Pendiente
                    } else if(data.id_estado==2){
                        document.getElementById('seguimientoDenuncia').classList.add('status-reviewing'); // Revision
                        document.getElementById('nombre_estado').classList.add('badge-reviewing'); // Revision
                    } else if(data.id_estado==3){
                        document.getElementById('seguimientoDenuncia').classList.add('status-completed'); // Finalizada
                        document.getElementById('nombre_estado').classList.add('badge-completed'); // Finalizada
                    }
                    denunciaResultado.style.display = 'block';
                } else {
                    alert(`Error: ${data.mensaje}`);
                }
            }).catch(error => {
                try {
                    const errorObj = JSON.parse(error.message);
                    alert("Error: " + errorObj.mensaje);
                } catch {
                    alert("Error: " + error.message);
                }
            });
        });
    }
});