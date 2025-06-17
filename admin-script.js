// Variables globales
let currentUser = null;
let allReports = {};
let filteredReports = {};
let currentReportId = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeTabs();
    loadReports();
    loadUserInfo();
    initializeFilters();
    updateDashboard();
    initializeSettings();
});

// Check if user is authenticated and has admin role
function checkAuthentication() {
    const userData = sessionStorage.getItem('currentUser');
    
    if (!userData) {
        // No user logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    
    // Check if session is still valid (less than 8 hours old)
    const loginTime = new Date(currentUser.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff >= 8) {
        // Session expired
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
        return;
    }
    
    // Check if user has admin role
    if (currentUser.role !== 'admin') {
        // Student trying to access admin page, redirect to student
        window.location.href = 'index.html';
        return;
    }
}

// Load user information into header
function loadUserInfo() {
    const userNameElement = document.getElementById('userName');
    
    if (userNameElement && currentUser) {
        userNameElement.textContent = currentUser.name;
    }
}

// Logout function
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Tab system
function initializeTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class
            this.classList.add('active');
            const targetTab = this.dataset.tab + '-tab';
            document.getElementById(targetTab).classList.add('active');
            
            // Update content based on tab
            if (this.dataset.tab === 'reports') {
                renderReportsTable();
            } else if (this.dataset.tab === 'statistics') {
                updateStatistics();
            }
        });
    });
}

// Load reports from localStorage and memory
function loadReports() {
    // Load from localStorage
    const storedReports = JSON.parse(localStorage.getItem('reports') || '{}');
    
    // Add sample reports if none exist
    if (Object.keys(storedReports).length === 0) {
        storedReports['CS-240610-DEMO'] = {
            id: 'CS-240610-DEMO',
            isAnonymous: true,
            reporterUser: 'estudiante1',
            institution: 'colegio-central',
            incidentDate: '2025-06-08',
            incidentTime: '10:30',
            incidentLocation: 'Patio principal',
            incidentType: 'verbal',
            personsInvolved: 'Estudiante de grado 10°, víctima de grado 8°',
            description: 'Situación de acoso verbal constante durante los recreos. El agresor utiliza insultos y amenazas hacia la víctima.',
            urgency: 'media',
            witnesses: 'Varios estudiantes presentes',
            previousIncidents: 'frecuente',
            additionalInfo: 'La víctima muestra signos de estrés y bajo rendimiento académico',
            timestamp: '2025-06-08T10:30:00Z',
            status: 'en-revision',
            statusHistory: [
                {
                    status: 'recibida',
                    date: '2025-06-08T10:30:00Z',
                    note: 'Denuncia recibida correctamente'
                },
                {
                    status: 'en-revision',
                    date: '2025-06-09T08:00:00Z',
                    note: 'Caso asignado al coordinador de convivencia para investigación'
                }
            ]
        };

        storedReports['CS-240609-TEST'] = {
            id: 'CS-240609-TEST',
            isAnonymous: false,
            reporterName: 'María González',
            reporterEmail: 'maria.gonzalez@email.com',
            reporterPhone: '3001234567',
            reporterGrade: '9° A',
            reporterUser: 'estudiante2',
            institution: 'escuela-norte',
            incidentDate: '2025-06-07',
            incidentTime: '14:15',
            incidentLocation: 'Aula 205',
            incidentType: 'fisico',
            personsInvolved: 'Dos estudiantes de grado 10°',
            description: 'Agresión física durante el cambio de clase. Uno de los estudiantes empujó y golpeó a otro.',
            urgency: 'alta',
            witnesses: 'Profesora de matemáticas y varios compañeros',
            previousIncidents: 'pocas-veces',
            additionalInfo: 'Se requiere intervención inmediata',
            timestamp: '2025-06-07T14:15:00Z',
            status: 'finalizada',
            statusHistory: [
                {
                    status: 'recibida',
                    date: '2025-06-07T14:15:00Z',
                    note: 'Denuncia recibida correctamente'
                },
                {
                    status: 'en-revision',
                    date: '2025-06-07T15:00:00Z',
                    note: 'Caso de alta prioridad asignado inmediatamente'
                },
                {
                    status: 'finalizada',
                    date: '2025-06-08T16:30:00Z',
                    note: 'Medidas disciplinarias aplicadas. Seguimiento programado.'
                }
            ]
        };

        storedReports['CS-240605-CYBER'] = {
            id: 'CS-240605-CYBER',
            isAnonymous: true,
            reporterUser: 'estudiante3',
            institution: 'liceo-sur',
            incidentDate: '2025-06-05',
            incidentTime: '',
            incidentLocation: 'Redes sociales',
            incidentType: 'cyberbullying',
            personsInvolved: 'Grupo de estudiantes de grado 11°',
            description: 'Ciberacoso a través de redes sociales. Creación de grupos para burlarse y humillar a una compañera.',
            urgency: 'alta',
            witnesses: 'Capturas de pantalla disponibles',
            previousIncidents: 'constante',
            additionalInfo: 'La víctima ha considerado cambiar de institución',
            timestamp: '2025-06-05T09:20:00Z',
            status: 'recibida',
            statusHistory: [
                {
                    status: 'recibida',
                    date: '2025-06-05T09:20:00Z',
                    note: 'Denuncia recibida correctamente'
                }
            ]
        };

        // Save sample reports
        localStorage.setItem('reports', JSON.stringify(storedReports));
    }
    
    allReports = storedReports;
    filteredReports = { ...allReports };
}

// Update dashboard statistics
function updateDashboard() {
    const reports = Object.values(allReports);
    
    // Update stat cards
    document.getElementById('totalReports').textContent = reports.length;
    document.getElementById('pendingReports').textContent = reports.filter(r => r.status === 'recibida').length;
    document.getElementById('reviewingReports').textContent = reports.filter(r => r.status === 'en-revision').length;
    document.getElementById('completedReports').textContent = reports.filter(r => r.status === 'finalizada').length;
    
    // Update recent reports
    updateRecentReports();
    updateUrgentReports();
}

function updateRecentReports() {
    const recentReports = Object.values(allReports)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
    
    const container = document.getElementById('recentReportsList');
    
    if (recentReports.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No hay denuncias recientes</p>';
        return;
    }
    
    container.innerHTML = recentReports.map(report => `
        <div class="report-item" onclick="openReportModal('${report.id}')">
            <div class="report-header">
                <span class="report-id">${report.id}</span>
                <span class="report-date">${formatDate(report.timestamp)}</span>
            </div>
            <div class="report-info">
                <strong>${getInstitutionName(report.institution)}</strong><br>
                ${getIncidentTypeName(report.incidentType)} - ${report.incidentLocation}
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency}</span>
            </div>
        </div>
    `).join('');
}

function updateUrgentReports() {
    const urgentReports = Object.values(allReports)
        .filter(r => r.urgency === 'alta' && r.status !== 'finalizada')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const container = document.getElementById('urgentReportsList');
    
    if (urgentReports.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No hay casos urgentes pendientes</p>';
        return;
    }
    
    container.innerHTML = urgentReports.map(report => `
        <div class="report-item" onclick="openReportModal('${report.id}')">
            <div class="report-header">
                <span class="report-id">${report.id}</span>
                <span class="report-date">${formatDate(report.timestamp)}</span>
            </div>
            <div class="report-info">
                <strong>${getInstitutionName(report.institution)}</strong><br>
                ${getIncidentTypeName(report.incidentType)} - ${report.incidentLocation}
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency}</span>
            </div>
        </div>
    `).join('');
}

// Initialize filters
function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const urgencyFilter = document.getElementById('urgencyFilter');
    const institutionFilter = document.getElementById('institutionFilter');
    const searchInput = document.getElementById('searchInput');
    
    [statusFilter, urgencyFilter, institutionFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    searchInput.addEventListener('input', applyFilters);
}

function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const urgencyFilter = document.getElementById('urgencyFilter').value;
    const institutionFilter = document.getElementById('institutionFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredReports = {};
    
    Object.values(allReports).forEach(report => {
        let matches = true;
        
        // Status filter
        if (statusFilter && report.status !== statusFilter) {
            matches = false;
        }
        
        // Urgency filter
        if (urgencyFilter && report.urgency !== urgencyFilter) {
            matches = false;
        }
        
        // Institution filter
        if (institutionFilter && report.institution !== institutionFilter) {
            matches = false;
        }
        
        // Search filter
        if (searchTerm) {
            const searchableText = `${report.id} ${report.description} ${report.personsInvolved} ${report.incidentLocation}`.toLowerCase();
            if (!searchableText.includes(searchTerm)) {
                matches = false;
            }
        }
        
        if (matches) {
            filteredReports[report.id] = report;
        }
    });
    
    renderReportsTable();
}

function renderReportsTable() {
    const tbody = document.getElementById('reportsTableBody');
    const reports = Object.values(filteredReports)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (reports.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    No se encontraron denuncias con los filtros aplicados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = reports.map(report => `
        <tr>
            <td>
                <span style="font-family: 'Courier New', monospace; font-weight: 600; color: var(--primary-color);">
                    ${report.id}
                </span>
            </td>
            <td>${formatDate(report.incidentDate)}</td>
            <td>${getInstitutionName(report.institution)}</td>
            <td>${getIncidentTypeName(report.incidentType)}</td>
            <td>
                <span class="urgency-badge urgency-${report.urgency}">
                    ${report.urgency.toUpperCase()}
                </span>
            </td>
            <td>
                <span class="status-badge status-${report.status}">
                    ${getStatusName(report.status)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-view" onclick="openReportModal('${report.id}')">Ver</button>
                    <button class="btn-edit" onclick="editReport('${report.id}')">Editar</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Modal functions
function openReportModal(reportId) {
    const report = allReports[reportId];
    if (!report) return;
    
    currentReportId = reportId;
    
    const modal = document.getElementById('reportModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Denuncia ${report.id}`;
    
    modalBody.innerHTML = `
        <div class="report-details">
            <div class="detail-section">
                <h4>Información General</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <strong>ID:</strong> ${report.id}
                    </div>
                    <div class="detail-item">
                        <strong>Fecha del incidente:</strong> ${formatDate(report.incidentDate)}
                    </div>
                    <div class="detail-item">
                        <strong>Hora:</strong> ${report.incidentTime || 'No especificada'}
                    </div>
                    <div class="detail-item">
                        <strong>Institución:</strong> ${getInstitutionName(report.institution)}
                    </div>
                    <div class="detail-item">
                        <strong>Lugar:</strong> ${report.incidentLocation}
                    </div>
                    <div class="detail-item">
                        <strong>Tipo:</strong> ${getIncidentTypeName(report.incidentType)}
                    </div>
                    <div class="detail-item">
                        <strong>Urgencia:</strong> 
                        <span class="urgency-badge urgency-${report.urgency}">${report.urgency.toUpperCase()}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Estado:</strong> 
                        <span class="status-badge status-${report.status}">${getStatusName(report.status)}</span>
                    </div>
                </div>
            </div>
            
            ${!report.isAnonymous ? `
                <div class="detail-section">
                    <h4>Datos del Denunciante</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <strong>Nombre:</strong> ${report.reporterName || 'No proporcionado'}
                        </div>
                        <div class="detail-item">
                            <strong>Email:</strong> ${report.reporterEmail || 'No proporcionado'}
                        </div>
                        <div class="detail-item">
                            <strong>Teléfono:</strong> ${report.reporterPhone || 'No proporcionado'}
                        </div>
                        <div class="detail-item">
                            <strong>Grado:</strong> ${report.reporterGrade || 'No proporcionado'}
                        </div>
                    </div>
                </div>
            ` : `
                <div class="detail-section">
                    <h4>Tipo de Denuncia</h4>
                    <p style="color: var(--warning-color); font-weight: 600;">
                        <svg class="icon" style="width: 16px; height: 16px; margin-right: 4px;" viewBox="0 0 24 24">
                            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                        </svg>
                        Denuncia Anónima
                    </p>
                </div>
            `}
            
            <div class="detail-section">
                <h4>Descripción del Incidente</h4>
                <div class="detail-text">
                    <strong>Personas involucradas:</strong><br>
                    ${report.personsInvolved}
                </div>
                <div class="detail-text">
                    <strong>Descripción:</strong><br>
                    ${report.description}
                </div>
                ${report.witnesses ? `
                    <div class="detail-text">
                        <strong>Testigos:</strong><br>
                        ${report.witnesses}
                    </div>
                ` : ''}
                ${report.previousIncidents ? `
                    <div class="detail-text">
                        <strong>Incidentes previos:</strong><br>
                        ${getPreviousIncidentsName(report.previousIncidents)}
                    </div>
                ` : ''}
                ${report.additionalInfo ? `
                    <div class="detail-text">
                        <strong>Información adicional:</strong><br>
                        ${report.additionalInfo}
                    </div>
                ` : ''}
            </div>
            
            <div class="detail-section">
                <h4>Historial de Estados</h4>
                <div class="status-history">
                    ${report.statusHistory.map(entry => `
                        <div class="history-item">
                            <div class="history-date">${formatDateTime(entry.date)}</div>
                            <div class="history-note">${entry.note}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Actualizar Estado</h4>
                <div class="status-update">
                    <select id="newStatus" class="form-control">
                        <option value="recibida" ${report.status === 'recibida' ? 'selected' : ''}>Recibida</option>
                        <option value="en-revision" ${report.status === 'en-revision' ? 'selected' : ''}>En Revisión</option>
                        <option value="finalizada" ${report.status === 'finalizada' ? 'selected' : ''}>Finalizada</option>
                    </select>
                    <textarea id="statusNote" class="form-control" placeholder="Nota sobre el cambio de estado..." style="margin-top: 0.5rem; min-height: 80px;"></textarea>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('reportModal').style.display = 'none';
    currentReportId = null;
}

function updateReportStatus() {
    if (!currentReportId) return;
    
    const newStatus = document.getElementById('newStatus').value;
    const statusNote = document.getElementById('statusNote').value.trim();
    
    if (!statusNote) {
        alert('Por favor proporciona una nota sobre el cambio de estado');
        return;
    }
    
    const report = allReports[currentReportId];
    const oldStatus = report.status;
    
    if (newStatus === oldStatus) {
        alert('El estado seleccionado es el mismo que el actual');
        return;
    }
    
    // Update report status
    report.status = newStatus;
    report.statusHistory.push({
        status: newStatus,
        date: new Date().toISOString(),
        note: statusNote
    });
    
    // Save to localStorage
    localStorage.setItem('reports', JSON.stringify(allReports));
    
    // Update UI
    updateDashboard();
    renderReportsTable();
    closeModal();
    
    alert(`Estado actualizado de "${getStatusName(oldStatus)}" a "${getStatusName(newStatus)}"`);
}

function editReport(reportId) {
    // For now, just open the modal - in a full implementation, this would open an edit form
    openReportModal(reportId);
}

// Statistics functions
function updateStatistics() {
    // This would integrate with a charting library like Chart.js
    // For now, we'll just update the summary statistics
    const reports = Object.values(allReports);
    
    // Calculate average resolution time
    const completedReports = reports.filter(r => r.status === 'finalizada');
    let totalDays = 0;
    
    completedReports.forEach(report => {
        const startDate = new Date(report.timestamp);
        const endDate = new Date(report.statusHistory[report.statusHistory.length - 1].date);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalDays += diffDays;
    });
    
    const avgResolutionTime = completedReports.length > 0 ? (totalDays / completedReports.length).toFixed(1) : 0;
    const resolutionRate = reports.length > 0 ? Math.round((completedReports.length / reports.length) * 100) : 0;
    const criticalCases = reports.filter(r => r.urgency === 'alta').length;
    const criticalResolved = reports.filter(r => r.urgency === 'alta' && r.status === 'finalizada').length;
    const criticalRate = criticalCases > 0 ? Math.round((criticalResolved / criticalCases) * 100) : 100;
    
    // Update summary statistics
    const avgTimeElement = document.getElementById('avgResolutionTime');
    const resolutionRateElement = document.getElementById('resolutionRate');
    const criticalCasesElement = document.getElementById('criticalCases');
    
    if (avgTimeElement) avgTimeElement.textContent = `${avgResolutionTime} días`;
    if (resolutionRateElement) resolutionRateElement.textContent = `${resolutionRate}%`;
    if (criticalCasesElement) criticalCasesElement.textContent = `${criticalRate}%`;
}

// Settings functions
function initializeSettings() {
    // Initialize toggle switches
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// Utility functions
function getInstitutionName(value) {
    const institutions = {
        'colegio-central': 'CENTRO EDUCATIVO PACIFICO',
        'escuela-norte': 'I.E AGROPECUARIA TAGACHI',
        'liceo-sur': 'I.E ANTONIO MARIA CLARET',
        'instituto-tecnico': 'I.E ANTONIO RICAURTE',
        'colegio-santa-maria': 'I.E ANTONIO ROLDAN BETANCUR',
        'escuela-rural': 'I.E CACIQUE NOANAMÁ'
    };
    return institutions[value] || value;
}

function getIncidentTypeName(value) {
    const types = {
        'verbal': 'Acoso Verbal',
        'fisico': 'Acoso Físico',
        'social': 'Exclusión Social',
        'cyberbullying': 'Ciberacoso',
        'sexual': 'Acoso Sexual',
        'discriminacion': 'Discriminación',
        'vandalismo': 'Vandalismo',
        'otro': 'Otro'
    };
    return types[value] || value;
}

function getStatusName(value) {
    const statuses = {
        'recibida': 'RECIBIDA',
        'en-revision': 'EN REVISIÓN',
        'finalizada': 'FINALIZADA'
    };
    return statuses[value] || value;
}

function getPreviousIncidentsName(value) {
    const incidents = {
        'primera-vez': 'Es la primera vez',
        'pocas-veces': 'Ha ocurrido pocas veces',
        'frecuente': 'Ocurre frecuentemente',
        'constante': 'Es constante/diario'
    };
    return incidents[value] || value;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('reportModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Quick search with Ctrl+F
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Auto-refresh dashboard every 30 seconds
setInterval(() => {
    if (document.querySelector('.nav-tab[data-tab="dashboard"]').classList.contains('active')) {
        loadReports();
        updateDashboard();
    }
}, 30000);

// Export functions (placeholder implementations)
function exportReports() {
    const reports = Object.values(allReports);
    const csvContent = generateCSV(reports);
    downloadFile(csvContent, 'denuncias.csv', 'text/csv');
}

function generateCSV(reports) {
    const headers = ['ID', 'Fecha', 'Institución', 'Tipo', 'Urgencia', 'Estado', 'Descripción'];
    const rows = reports.map(report => [
        report.id,
        formatDate(report.incidentDate),
        getInstitutionName(report.institution),
        getIncidentTypeName(report.incidentType),
        report.urgency,
        getStatusName(report.status),
        report.description.replace(/,/g, ';') // Replace commas to avoid CSV issues
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add CSS for modal detail styles
const additionalStyles = `
    .detail-section {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .detail-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .detail-section h4 {
        color: var(--primary-color);
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .detail-item {
        padding: 0.75rem;
        background: var(--light-bg);
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }
    
    .detail-item strong {
        color: var(--text-primary);
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
    }
    
    .detail-text {
        margin-bottom: 1rem;
        padding: 1rem;
        background: var(--light-bg);
        border-radius: 8px;
        border: 1px solid var(--border-color);
        line-height: 1.6;
    }
    
    .detail-text strong {
        color: var(--primary-color);
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .status-history {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .history-item {
        padding: 1rem;
        background: var(--light-bg);
        border-radius: 8px;
        border-left: 4px solid var(--primary-color);
    }
    
    .history-date {
        font-weight: 600;
        color: var(--primary-color);
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
    }
    
    .history-note {
        color: var(--text-secondary);
        line-height: 1.4;
    }
    
    .status-update {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    @media (max-width: 768px) {
        .detail-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);