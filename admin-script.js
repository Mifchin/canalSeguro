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
<<<<<<< HEAD
    setupAutoRefresh();
=======
<<<<<<< HEAD
    setupAutoRefresh();
=======
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
});

// Check if user is authenticated and has admin role
function checkAuthentication() {
    const userData = sessionStorage.getItem('currentUser');
    
    if (!userData) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        // No user logged in, redirect to login
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    
    // Check if session is still valid (less than 8 hours old)
    const loginTime = new Date(currentUser.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff >= 8) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        // Session expired
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
        return;
    }
    
    // Check if user has admin role
    if (currentUser.role !== 'admin') {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        // Student trying to access admin page, redirect to student
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
            } else if (this.dataset.tab === 'institutions') {
                updateInstitutionsData();
=======
<<<<<<< HEAD
            } else if (this.dataset.tab === 'institutions') {
                updateInstitutionsData();
=======
            } else if (this.dataset.tab === 'statistics') {
                updateStatistics();
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
            }
        });
    });
}

// Load reports from localStorage and memory
function loadReports() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    const storedReports = JSON.parse(localStorage.getItem('reports') || '{}');
    
    // Add comprehensive sample reports if none exist
    if (Object.keys(storedReports).length === 0) {
        const sampleReports = generateSampleReports();
        Object.assign(storedReports, sampleReports);
<<<<<<< HEAD
=======
=======
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
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
        localStorage.setItem('reports', JSON.stringify(storedReports));
    }
    
    allReports = storedReports;
    filteredReports = { ...allReports };
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
function generateSampleReports() {
    const institutions = [
        'colegio-central', 'escuela-norte', 'liceo-sur', 
        'instituto-tecnico', 'colegio-santa-maria', 'escuela-rural'
    ];
    
    const incidentTypes = ['verbal', 'fisico', 'social', 'cyberbullying', 'sexual', 'discriminacion'];
    const urgencyLevels = ['baja', 'media', 'alta'];
    const statuses = ['recibida', 'en-revision', 'finalizada'];
    
    const reports = {};
    
    // Generate 15 sample reports
    for (let i = 1; i <= 15; i++) {
        const id = `CS-${String(Date.now() + i).slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        const institution = institutions[Math.floor(Math.random() * institutions.length)];
        const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
        const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const isAnonymous = Math.random() > 0.4;
        
        const baseDate = new Date();
        baseDate.setDate(baseDate.getDate() - Math.floor(Math.random() * 30));
        
        reports[id] = {
            id: id,
            isAnonymous: isAnonymous,
            reporterName: isAnonymous ? null : `Estudiante ${i}`,
            reporterEmail: isAnonymous ? null : `estudiante${i}@email.com`,
            reporterPhone: isAnonymous ? null : `300123456${i}`,
            reporterGrade: isAnonymous ? null : `${Math.floor(Math.random() * 5) + 8}° ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
            reporterUser: `estudiante${i}`,
            institution: institution,
            incidentDate: baseDate.toISOString().split('T')[0],
            incidentTime: `${Math.floor(Math.random() * 12) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            incidentLocation: getRandomLocation(),
            incidentType: incidentType,
            personsInvolved: getRandomPersonsInvolved(),
            description: getRandomDescription(incidentType),
            urgency: urgency,
            witnesses: Math.random() > 0.5 ? getRandomWitnesses() : '',
            previousIncidents: ['primera-vez', 'pocas-veces', 'frecuente', 'constante'][Math.floor(Math.random() * 4)],
            additionalInfo: Math.random() > 0.6 ? getRandomAdditionalInfo() : '',
            timestamp: baseDate.toISOString(),
            status: status,
            statusHistory: generateStatusHistory(status, baseDate)
        };
    }
    
    return reports;
}

function getRandomLocation() {
    const locations = [
        'Patio principal', 'Aula 201', 'Baños del segundo piso', 'Cafetería',
        'Biblioteca', 'Laboratorio de informática', 'Cancha deportiva',
        'Pasillo principal', 'Entrada del colegio', 'Sala de profesores'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomPersonsInvolved() {
    const examples = [
        'Estudiante de grado 10°, víctima de grado 8°',
        'Grupo de estudiantes de grado 11°',
        'Dos estudiantes del mismo curso',
        'Estudiante agresor y víctima de diferentes grados',
        'Varios estudiantes del recreo'
    ];
    return examples[Math.floor(Math.random() * examples.length)];
}

function getRandomDescription(type) {
    const descriptions = {
        verbal: [
            'Situación de acoso verbal constante durante los recreos con insultos y amenazas.',
            'Burlas constantes sobre la apariencia física de la víctima.',
            'Amenazas verbales repetidas en el aula de clase.'
        ],
        fisico: [
            'Agresión física durante el cambio de clase con empujones y golpes.',
            'Incidente de violencia física en el patio durante el recreo.',
            'Agresión con objetos durante la clase de educación física.'
        ],
        social: [
            'Exclusión sistemática del grupo durante actividades escolares.',
            'Aislamiento intencional de la víctima en eventos sociales.',
            'Rechazo grupal organizado hacia un compañero.'
        ],
        cyberbullying: [
            'Ciberacoso a través de redes sociales con creación de grupos para humillar.',
            'Difusión de imágenes comprometedoras en redes sociales.',
            'Amenazas y acoso constante por mensajes privados.'
        ]
    };
    
    const typeDescriptions = descriptions[type] || descriptions.verbal;
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
}

function getRandomWitnesses() {
    const witnesses = [
        'Varios estudiantes presentes',
        'Profesora de matemáticas y compañeros',
        'Estudiantes del mismo grado',
        'Personal de vigilancia',
        'Compañeros de clase'
    ];
    return witnesses[Math.floor(Math.random() * witnesses.length)];
}

function getRandomAdditionalInfo() {
    const info = [
        'La víctima muestra signos de estrés y bajo rendimiento académico',
        'Se requiere intervención inmediata',
        'Los padres han sido notificados de la situación',
        'Es necesario seguimiento psicológico',
        'Se recomienda mediación entre las partes'
    ];
    return info[Math.floor(Math.random() * info.length)];
}

function generateStatusHistory(finalStatus, baseDate) {
    const history = [{
        status: 'recibida',
        date: baseDate.toISOString(),
        note: 'Denuncia recibida correctamente'
    }];
    
    if (finalStatus === 'en-revision' || finalStatus === 'finalizada') {
        const reviewDate = new Date(baseDate);
        reviewDate.setHours(reviewDate.getHours() + Math.floor(Math.random() * 48));
        
        history.push({
            status: 'en-revision',
            date: reviewDate.toISOString(),
            note: 'Caso asignado para investigación detallada'
        });
    }
    
    if (finalStatus === 'finalizada') {
        const finalDate = new Date(baseDate);
        finalDate.setDate(finalDate.getDate() + Math.floor(Math.random() * 7) + 1);
        
        history.push({
            status: 'finalizada',
            date: finalDate.toISOString(),
            note: 'Medidas disciplinarias aplicadas. Caso cerrado con seguimiento programado.'
        });
    }
    
    return history;
}

<<<<<<< HEAD
=======
=======
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
// Update dashboard statistics
function updateDashboard() {
    const reports = Object.values(allReports);
    
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    // Update stat cards with animations
    animateCounter('totalReports', reports.length);
    animateCounter('pendingReports', reports.filter(r => r.status === 'recibida').length);
    animateCounter('reviewingReports', reports.filter(r => r.status === 'en-revision').length);
    animateCounter('completedReports', reports.filter(r => r.status === 'finalizada').length);
<<<<<<< HEAD
=======
=======
    // Update stat cards
    document.getElementById('totalReports').textContent = reports.length;
    document.getElementById('pendingReports').textContent = reports.filter(r => r.status === 'recibida').length;
    document.getElementById('reviewingReports').textContent = reports.filter(r => r.status === 'en-revision').length;
    document.getElementById('completedReports').textContent = reports.filter(r => r.status === 'finalizada').length;
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    
    // Update recent reports
    updateRecentReports();
    updateUrgentReports();
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

<<<<<<< HEAD
=======
=======
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency.toUpperCase()}</span>
=======
<<<<<<< HEAD
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency.toUpperCase()}</span>
=======
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency}</span>
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
        <div class="report-item urgent-item" onclick="openReportModal('${report.id}')">
=======
<<<<<<< HEAD
        <div class="report-item urgent-item" onclick="openReportModal('${report.id}')">
=======
        <div class="report-item" onclick="openReportModal('${report.id}')">
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
            <div class="report-header">
                <span class="report-id">${report.id}</span>
                <span class="report-date">${formatDate(report.timestamp)}</span>
            </div>
            <div class="report-info">
                <strong>${getInstitutionName(report.institution)}</strong><br>
                ${getIncidentTypeName(report.incidentType)} - ${report.incidentLocation}
<<<<<<< HEAD
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency.toUpperCase()}</span>
=======
<<<<<<< HEAD
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency.toUpperCase()}</span>
=======
                <span class="urgency-badge urgency-${report.urgency}">${report.urgency}</span>
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
    
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    searchInput.addEventListener('input', debounce(applyFilters, 300));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
<<<<<<< HEAD
=======
=======
    searchInput.addEventListener('input', applyFilters);
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    updateFilterStats();
}

function updateFilterStats() {
    const totalFiltered = Object.keys(filteredReports).length;
    const totalReports = Object.keys(allReports).length;
    
    // Update filter indicator
    const filterIndicator = document.getElementById('filterIndicator') || createFilterIndicator();
    filterIndicator.textContent = totalFiltered === totalReports 
        ? `Mostrando ${totalReports} denuncias` 
        : `Mostrando ${totalFiltered} de ${totalReports} denuncias`;
}

function createFilterIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'filterIndicator';
    indicator.style.cssText = 'margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.9rem;';
    
    const tableContainer = document.querySelector('.reports-table-container');
    tableContainer.parentNode.insertBefore(indicator, tableContainer);
    
    return indicator;
<<<<<<< HEAD
=======
=======
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
        <tr class="report-row" data-urgency="${report.urgency}">
            <td>
                <span class="report-id-cell">
=======
<<<<<<< HEAD
        <tr class="report-row" data-urgency="${report.urgency}">
            <td>
                <span class="report-id-cell">
=======
        <tr>
            <td>
                <span style="font-family: 'Courier New', monospace; font-weight: 600; color: var(--primary-color);">
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
                    ${report.id}
                </span>
            </td>
            <td>${formatDate(report.incidentDate)}</td>
<<<<<<< HEAD
            <td class="institution-cell">${getInstitutionName(report.institution)}</td>
=======
<<<<<<< HEAD
            <td class="institution-cell">${getInstitutionName(report.institution)}</td>
=======
            <td>${getInstitutionName(report.institution)}</td>
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
                    <button class="btn-view" onclick="openReportModal('${report.id}')" title="Ver detalles">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                    </button>
                    <button class="btn-edit" onclick="editReport('${report.id}')" title="Editar estado">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>
<<<<<<< HEAD
=======
=======
                    <button class="btn-view" onclick="openReportModal('${report.id}')">Ver</button>
                    <button class="btn-edit" onclick="editReport('${report.id}')">Editar</button>
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
    
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    modalBody.innerHTML = generateReportModalContent(report);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function generateReportModalContent(report) {
    return `
<<<<<<< HEAD
=======
=======
    modalBody.innerHTML = `
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
                    <div class="anonymous-indicator">
=======
<<<<<<< HEAD
                    <div class="anonymous-indicator">
=======
                    <p style="color: var(--warning-color); font-weight: 600;">
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
                        <svg class="icon" style="width: 16px; height: 16px; margin-right: 4px;" viewBox="0 0 24 24">
                            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                        </svg>
                        Denuncia Anónima
<<<<<<< HEAD
                    </div>
=======
<<<<<<< HEAD
                    </div>
=======
                    </p>
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    
    modal.style.display = 'block';
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
}

function closeModal() {
    document.getElementById('reportModal').style.display = 'none';
<<<<<<< HEAD
    document.body.style.overflow = 'auto';
=======
<<<<<<< HEAD
    document.body.style.overflow = 'auto';
=======
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    currentReportId = null;
}

function updateReportStatus() {
    if (!currentReportId) return;
    
    const newStatus = document.getElementById('newStatus').value;
    const statusNote = document.getElementById('statusNote').value.trim();
    
    if (!statusNote) {
<<<<<<< HEAD
        showNotification('Por favor proporciona una nota sobre el cambio de estado', 'warning');
=======
<<<<<<< HEAD
        showNotification('Por favor proporciona una nota sobre el cambio de estado', 'warning');
=======
        alert('Por favor proporciona una nota sobre el cambio de estado');
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
        return;
    }
    
    const report = allReports[currentReportId];
    const oldStatus = report.status;
    
    if (newStatus === oldStatus) {
<<<<<<< HEAD
        showNotification('El estado seleccionado es el mismo que el actual', 'info');
=======
<<<<<<< HEAD
        showNotification('El estado seleccionado es el mismo que el actual', 'info');
=======
        alert('El estado seleccionado es el mismo que el actual');
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
        return;
    }
    
    // Update report status
    report.status = newStatus;
    report.statusHistory.push({
        status: newStatus,
        date: new Date().toISOString(),
<<<<<<< HEAD
        note: statusNote,
        updatedBy: currentUser.name
=======
<<<<<<< HEAD
        note: statusNote,
        updatedBy: currentUser.name
=======
        note: statusNote
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    });
    
    // Save to localStorage
    localStorage.setItem('reports', JSON.stringify(allReports));
    
    // Update UI
    updateDashboard();
    renderReportsTable();
    closeModal();
    
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    showNotification(`Estado actualizado de "${getStatusName(oldStatus)}" a "${getStatusName(newStatus)}"`, 'success');
}

function editReport(reportId) {
    openReportModal(reportId);
}

// Institutions management
function updateInstitutionsData() {
    const reports = Object.values(allReports);
    const institutionStats = {};
    
    // Calculate stats for each institution
    reports.forEach(report => {
        if (!institutionStats[report.institution]) {
            institutionStats[report.institution] = {
                total: 0,
                active: 0,
                resolved: 0,
                avgTime: 0
            };
        }
        
        institutionStats[report.institution].total++;
        
        if (report.status !== 'finalizada') {
            institutionStats[report.institution].active++;
        } else {
            institutionStats[report.institution].resolved++;
        }
    });
    
    // Update institution cards
    updateInstitutionCards(institutionStats);
}

function updateInstitutionCards(stats) {
    const institutions = [
        { id: 'colegio-central', name: 'CENTRO EDUCATIVO PACIFICO' },
        { id: 'escuela-norte', name: 'I.E AGROPECUARIA TAGACHI' },
        { id: 'liceo-sur', name: 'I.E ANTONIO MARIA CLARET' },
        { id: 'instituto-tecnico', name: 'I.E ANTONIO RICAURTE' },
        { id: 'colegio-santa-maria', name: 'I.E ANTONIO ROLDAN BETANCUR' },
        { id: 'escuela-rural', name: 'I.E CACIQUE NOANAMÁ' }
    ];
    
    const container = document.querySelector('.institutions-grid');
    if (!container) return;
    
    container.innerHTML = institutions.map(institution => {
        const stat = stats[institution.id] || { total: 0, active: 0, resolved: 0 };
        const avgTime = Math.random() * 2 + 2; // Simulated average time
        
        return `
            <div class="institution-card">
                <h4>${institution.name}</h4>
                <div class="institution-stats">
                    <div class="stat-item">
                        <span class="stat-label">Denuncias activas:</span>
                        <span class="stat-value">${stat.active}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Resueltas este mes:</span>
                        <span class="stat-value">${stat.resolved}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Tiempo promedio:</span>
                        <span class="stat-value">${avgTime.toFixed(1)} días</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Total denuncias:</span>
                        <span class="stat-value">${stat.total}</span>
                    </div>
                </div>
                <div class="institution-actions">
                    <button class="btn-secondary" onclick="viewInstitutionDetails('${institution.id}')">Ver Detalles</button>
                    <button class="btn-primary" onclick="generateInstitutionReport('${institution.id}')">Generar Reporte</button>
                </div>
            </div>
        `;
    }).join('');
}

function viewInstitutionDetails(institutionId) {
    // Filter reports by institution
    const institutionReports = Object.values(allReports).filter(r => r.institution === institutionId);
    
    // Switch to reports tab and apply filter
    document.querySelector('[data-tab="reports"]').click();
    document.getElementById('institutionFilter').value = institutionId;
    applyFilters();
    
    showNotification(`Mostrando denuncias de ${getInstitutionName(institutionId)}`, 'info');
}

function generateInstitutionReport(institutionId) {
    const institutionReports = Object.values(allReports).filter(r => r.institution === institutionId);
    const csvContent = generateCSV(institutionReports);
    const institutionName = getInstitutionName(institutionId).replace(/\s+/g, '_');
    downloadFile(csvContent, `reporte_${institutionName}.csv`, 'text/csv');
    
    showNotification('Reporte generado y descargado exitosamente', 'success');
<<<<<<< HEAD
=======
=======
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
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
}

// Settings functions
function initializeSettings() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    // Initialize toggle switches
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
            handleSettingChange(this);
        });
    });
    
    // Load saved settings
    loadSettings();
}

function handleSettingChange(toggle) {
    const setting = toggle.closest('.form-group').querySelector('.form-label').textContent;
    const isActive = toggle.classList.contains('active');
    
    // Save setting
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    settings[setting] = isActive;
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    showNotification(`Configuración "${setting}" ${isActive ? 'activada' : 'desactivada'}`, 'info');
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    
    Object.entries(settings).forEach(([setting, value]) => {
        const toggle = Array.from(document.querySelectorAll('.form-group')).find(group => 
            group.querySelector('.form-label').textContent === setting
        )?.querySelector('.toggle-switch');
        
        if (toggle && value) {
            toggle.classList.add('active');
        }
    });
}

// Auto-refresh functionality
function setupAutoRefresh() {
    setInterval(() => {
        if (document.querySelector('.nav-tab[data-tab="dashboard"]').classList.contains('active')) {
            loadReports();
            updateDashboard();
        }
    }, 30000); // Refresh every 30 seconds
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg class="icon" viewBox="0 0 24 24">
                ${getNotificationIcon(type)}
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
        warning: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
        error: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
        info: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
    };
    return icons[type] || icons.info;
}

// Export functions
function exportReports() {
    const reports = Object.values(filteredReports);
    if (reports.length === 0) {
        showNotification('No hay denuncias para exportar con los filtros actuales', 'warning');
        return;
    }
    
    const csvContent = generateCSV(reports);
    downloadFile(csvContent, 'denuncias_export.csv', 'text/csv');
    showNotification(`${reports.length} denuncias exportadas exitosamente`, 'success');
}

function generateCSV(reports) {
    const headers = [
        'ID', 'Fecha', 'Institución', 'Tipo', 'Urgencia', 'Estado', 
        'Lugar', 'Descripción', 'Es Anónima', 'Fecha Creación'
    ];
    
    const rows = reports.map(report => [
        report.id,
        formatDate(report.incidentDate),
        getInstitutionName(report.institution),
        getIncidentTypeName(report.incidentType),
        report.urgency,
        getStatusName(report.status),
        report.incidentLocation,
        report.description.replace(/,/g, ';').replace(/\n/g, ' '),
        report.isAnonymous ? 'Sí' : 'No',
        formatDateTime(report.timestamp)
    ]);
    
    return [headers, ...rows].map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
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
<<<<<<< HEAD
=======
=======
        });
    });
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
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

<<<<<<< HEAD
// Event listeners
=======
<<<<<<< HEAD
// Event listeners
=======
// Close modal when clicking outside
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
window.onclick = function(event) {
    const modal = document.getElementById('reportModal');
    if (event.target === modal) {
        closeModal();
    }
}

<<<<<<< HEAD
document.addEventListener('keydown', function(e) {
=======
<<<<<<< HEAD
document.addEventListener('keydown', function(e) {
=======
// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    if (e.key === 'Escape') {
        closeModal();
    }
    
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    // Quick search with Ctrl+F
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loadingIndicator';
    loadingIndicator.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Cargando panel administrativo...</p>
        </div>
    `;
    document.body.appendChild(loadingIndicator);
    
    // Remove loading indicator after initialization
    setTimeout(() => {
        if (loadingIndicator.parentElement) {
            loadingIndicator.remove();
        }
    }, 1000);
<<<<<<< HEAD
});
=======
});
=======
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
>>>>>>> 0a5389ed2eef41e0e277d5a0dd40d15c31fbd627
>>>>>>> 55bc23c543f5373f65bbf2ce7196a9f245d2b107
