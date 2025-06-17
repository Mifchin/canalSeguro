// Variables globales
        let selectedUrgency = null;
        let isAnonymous = true;
        let reports = {}; // Simulación de base de datos
        
        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            initializeTabs();
            initializeUrgencySelector();
            initializeForm();
            initializeAnonymousToggle();
            setDefaultDate();
            initializeSampleReports();
        });

        // Sistema de pestañas
        function initializeTabs() {
            const tabs = document.querySelectorAll('.nav-tab');
            const contents = document.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
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

        // Toggle de anonimato
        function initializeAnonymousToggle() {
            const toggle = document.getElementById('anonymousToggle');
            const contactFields = document.getElementById('contactFields');
            
            toggle.addEventListener('click', function() {
                isAnonymous = !isAnonymous;
                
                if (isAnonymous) {
                    toggle.classList.remove('active');
                    contactFields.classList.remove('show');
                } else {
                    toggle.classList.add('active');
                    contactFields.classList.add('show');
                }
            });
        }

        // Fecha por defecto (hoy)
        function setDefaultDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('incidentDate').value = today;
        }

        // Selector de urgencia
        function initializeUrgencySelector() {
            const urgencyOptions = document.querySelectorAll('.urgency-option');
            
            urgencyOptions.forEach(option => {
                option.addEventListener('click', function() {
                    urgencyOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedUrgency = this.dataset.urgency;
                });
            });
        }

        // Formulario principal
        function initializeForm() {
            const form = document.getElementById('reportForm');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (!validateForm()) {
                    return;
                }
                
                submitReport();
            });
        }

        function validateForm() {
            const required = [
                'institution', 'incidentDate', 'incidentLocation', 
                'incidentType', 'personsInvolved', 'description'
            ];
            
            for (let field of required) {
                const value = document.getElementById(field).value.trim();
                if (!value) {
                    alert(`Por favor completa el campo: ${getFieldLabel(field)}`);
                    document.getElementById(field).focus();
                    return false;
                }
            }
            
            if (!selectedUrgency) {
                alert('Por favor selecciona el nivel de urgencia');
                return false;
            }
            
            if (document.getElementById('description').value.length < 30) {
                alert('Por favor proporciona una descripción más detallada (mínimo 30 caracteres)');
                return false;
            }
            
            return true;
        }

        function getFieldLabel(fieldId) {
            const labels = {
                'institution': 'Institución Educativa',
                'incidentDate': 'Fecha del Incidente',
                'incidentLocation': 'Lugar del Incidente',
                'incidentType': 'Tipo de Incidente',
                'personsInvolved': 'Personas Involucradas',
                'description': 'Descripción del Incidente'
            };
            return labels[fieldId] || fieldId;
        }

        function submitReport() {
            const trackingId = generateTrackingId();
            
            const reportData = {
                id: trackingId,
                isAnonymous: isAnonymous,
                reporterName: isAnonymous ? null : document.getElementById('reporterName').value,
                reporterEmail: isAnonymous ? null : document.getElementById('reporterEmail').value,
                reporterPhone: isAnonymous ? null : document.getElementById('reporterPhone').value,
                reporterGrade: isAnonymous ? null : document.getElementById('reporterGrade').value,
                institution: document.getElementById('institution').value,
                incidentDate: document.getElementById('incidentDate').value,
                incidentTime: document.getElementById('incidentTime').value,
                incidentLocation: document.getElementById('incidentLocation').value,
                incidentType: document.getElementById('incidentType').value,
                personsInvolved: document.getElementById('personsInvolved').value,
                description: document.getElementById('description').value,
                urgency: selectedUrgency,
                witnesses: document.getElementById('witnesses').value,
                previousIncidents: document.getElementById('previousIncidents').value,
                additionalInfo: document.getElementById('additionalInfo').value,
                timestamp: new Date().toISOString(),
                status: 'recibida',
                statusHistory: [
                    {
                        status: 'recibida',
                        date: new Date().toISOString(),
                        note: 'Denuncia recibida correctamente'
                    }
                ]
            };
            
            // Guardar en "base de datos" simulada
            reports[trackingId] = reportData;
            
            console.log('Reporte enviado:', reportData);
            
            showSuccessMessage(trackingId);
            resetForm();
        }

        function generateTrackingId() {
            const prefix = 'CS';
            const timestamp = Date.now().toString().slice(-6);
            const random = Math.random().toString(36).substr(2, 4).toUpperCase();
            return `${prefix}-${timestamp}-${random}`;
        }

        function showSuccessMessage(trackingId) {
            const successMessage = document.getElementById('successMessage');
            const trackingIdElement = document.getElementById('trackingId');
            const generatedIdElement = document.getElementById('generatedId');
            
            successMessage.style.display = 'flex';
            trackingIdElement.style.display = 'block';
            generatedIdElement.textContent = trackingId;
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                successMessage.style.display = 'none';
                trackingIdElement.style.display = 'none';
            }, 15000);
        }

        function resetForm() {
            document.getElementById('reportForm').reset();
            document.querySelectorAll('.urgency-option').forEach(opt => opt.classList.remove('selected'));
            selectedUrgency = null;
            setDefaultDate();
            
            // Resetear toggle anónimo
            isAnonymous = true;
            document.getElementById('anonymousToggle').classList.remove('active');
            document.getElementById('contactFields').classList.remove('show');
        }

        // Sistema de seguimiento
        function searchReport() {
            const trackingId = document.getElementById('trackingInput').value.trim().toUpperCase();
            const resultsContainer = document.getElementById('trackingResults');
            
            if (!trackingId) {
                alert('Por favor ingresa un ID de seguimiento');
                return;
            }
            
            const report = reports[trackingId];
            
            if (!report) {
                resultsContainer.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                        <svg class="icon" style="width: 48px; height: 48px; margin-bottom: 1rem;" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <h3>ID no encontrado</h3>
                        <p>No se encontró ninguna denuncia con el ID proporcionado.</p>
                        <p>Verifica que hayas ingresado el ID correctamente.</p>
                    </div>
                `;
                return;
            }
            
            displayReportStatus(report);
        }

        function displayReportStatus(report) {
            const resultsContainer = document.getElementById('trackingResults');
            const statusClass = `status-${report.status === 'recibida' ? 'pending' : report.status === 'en-revision' ? 'reviewing' : 'completed'}`;
            const badgeClass = `badge-${report.status === 'recibida' ? 'pending' : report.status === 'en-revision' ? 'reviewing' : 'completed'}`;
            
            const statusText = {
                'recibida': 'RECIBIDA',
                'en-revision': 'EN REVISIÓN',
                'finalizada': 'FINALIZADA'
            };
            
            const statusDescription = {
                'recibida': 'Tu denuncia ha sido recibida y está esperando revisión inicial.',
                'en-revision': 'La institución está investigando los hechos reportados.',
                'finalizada': 'La investigación ha concluido y se han tomado las medidas correspondientes.'
            };
            
            resultsContainer.innerHTML = `
                <div class="status-card ${statusClass}">
                    <div class="status-badge ${badgeClass}">${statusText[report.status]}</div>
                    <h4>ID: ${report.id}</h4>
                    <p><strong>Institución:</strong> ${getInstitutionName(report.institution)}</p>
                    <p><strong>Fecha del incidente:</strong> ${formatDate(report.incidentDate)}</p>
                    <p><strong>Tipo:</strong> ${getIncidentTypeName(report.incidentType)}</p>
                    <p><strong>Urgencia:</strong> ${report.urgency.toUpperCase()}</p>
                    <br>
                    <p>${statusDescription[report.status]}</p>
                    ${report.status === 'finalizada' ? '<p><strong>Medidas tomadas:</strong> Se implementaron acciones correctivas y de seguimiento según el protocolo institucional.</p>' : ''}
                </div>
                
                <div style="margin-top: 1rem;">
                    <h4>Historial de seguimiento:</h4>
                    ${report.statusHistory.map(entry => `
                        <div style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                            <strong>${formatDate(entry.date)}:</strong> ${entry.note}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Funciones auxiliares
        function getInstitutionName(value) {
            const institutions = {
                'colegio-central': 'Colegio Central Departamental',
                'escuela-norte': 'Escuela Norte',
                'liceo-sur': 'Liceo del Sur',
                'instituto-tecnico': 'Instituto Técnico',
                'colegio-santa-maria': 'Colegio Santa María',
                'escuela-rural': 'Escuela Rural Integrada'
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

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Inicializar reportes de ejemplo para demostración
        function initializeSampleReports() {
            reports['CS-240610-DEMO'] = {
                id: 'CS-240610-DEMO',
                isAnonymous: true,
                institution: 'colegio-central',
                incidentDate: '2025-06-08',
                incidentLocation: 'Patio principal',
                incidentType: 'verbal',
                personsInvolved: 'Estudiante de grado 10°, víctima de grado 8°',
                description: 'Situación de acoso verbal constante durante los recreos',
                urgency: 'media',
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
        }

        // Mejorar experiencia de usuario
        document.addEventListener('DOMContentLoaded', function() {
            // Auto-expand textarea
            const textareas = document.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
            });
            
            // Contador de caracteres
            const description = document.getElementById('description');
            const counter = document.createElement('small');
            counter.style.color = '#6b7280';
            counter.style.display = 'block';
            counter.style.marginTop = '0.5rem';
            description.parentNode.appendChild(counter);
            
            description.addEventListener('input', function() {
                const count = this.value.length;
                counter.textContent = `${count} caracteres (mínimo 30)`;
                counter.style.color = count >= 30 ? '#16a34a' : '#dc2626';
            });
            
            // Permitir Enter en input de seguimiento
            document.getElementById('trackingInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchReport();
                }
            });
        });