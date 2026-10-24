const cancion = document.getElementById('cancionFondo');

function enviarRespuesta() {
    const respuesta = document.getElementById('respuestaInput').value;
    
    if(respuesta.trim() !== "") {
        // Aquí añadiremos la conexión a Firebase más adelante
        console.log("Respuesta guardada:", respuesta);

        document.getElementById('seccionAcertijo').style.display = 'none';
        document.getElementById('seccionMensaje').style.display = 'block';

        cancion.volume = 0.5; // Volumen suave
        cancion.play().catch(e => console.log("Error de audio:", e));
    } else {
        alert("Por favor, escribe algo antes de continuar.");
    }
}