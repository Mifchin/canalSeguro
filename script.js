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
        console.log("Denuncia registrada con código:", codigo);
    }).catch(error => {
        console.error("Error al registrar la denuncia:", error.message);
    });
});