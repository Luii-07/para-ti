const firebaseConfig = {
  apiKey: "AIzaSyCd8aBX9zlaSKMtMS5VWUFYLk477i7k1lc",
  authDomain: "proyecto-amor-26085.firebaseapp.com",
  projectId: "proyecto-amor-26085",
  storageBucket: "proyecto-amor-26085.firebasestorage.app",
  messagingSenderId: "756734526657",
  appId: "1:756734526657:web:fc1f0591745cd8c0334040"
};

// Inicializar la base de datos
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const cancion = document.getElementById('cancionFondo');

// Lógica de envío y música
function enviarRespuesta() {
    const respuesta = document.getElementById('respuestaInput').value;
    const boton = document.querySelector('button');
    
    if(respuesta.trim() !== "") {
        boton.innerText = "Guardando...";
        boton.disabled = true;

        // Guardar la respuesta en la nube en una colección llamada "mensajes"
        db.collection("mensajes").add({
            texto: respuesta,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Éxito: Ocultar pregunta, mostrar mensaje y reproducir música
            document.getElementById('seccionAcertijo').style.display = 'none';
            document.getElementById('seccionMensaje').style.display = 'block';
            
            cancion.volume = 0.6;
            cancion.play().catch(e => console.log("Audio bloqueado:", e));
        }).catch((error) => {
            console.error("Error al guardar:", error);
            alert("Hubo un error de conexión, intenta de nuevo.");
            boton.innerText = "Enviar";
            boton.disabled = false;
        });
    } else {
        alert("Por favor, escribe algo antes de continuar.");
    }
}