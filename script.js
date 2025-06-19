// Inicializar funciones
document.addEventListener('DOMContentLoaded', function() {
    InicializarTabs();
    InicializarUrgencySelector();
});
// Sistema de pestañas
function InicializarTabs() {
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
// FORMULARIO DENUNCIA
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