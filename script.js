// Tus claves reales de Firebase (intactas)
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

// Pasar de la pantalla "Hola" a la pregunta
function irPaso2() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
}

// Lógica de envío, base de datos y música
function enviarRespuesta() {
    const respuesta = document.getElementById('respuestaInput').value;
    const boton = document.getElementById('btnEnviar');
    const spanBoton = boton.querySelector('span');
    
    if(respuesta.trim() !== "") {
        spanBoton.innerText = "Guardando...";
        boton.disabled = true;

        // Guardar la respuesta en tu Firestore
        db.collection("mensajes").add({
            texto: respuesta,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Éxito: Ocultar paso 2, mostrar paso 3
            document.getElementById('step2').classList.remove('active');
            document.getElementById('step3').classList.add('active');
            
            // Iniciar la música
            cancion.volume = 0.6;
            cancion.play().catch(e => console.log("Audio bloqueado:", e));
        }).catch((error) => {
            console.error("Error al guardar:", error);
            alert("Hubo un error de conexión, intenta de nuevo.");
            spanBoton.innerText = "Enviar";
            boton.disabled = false;
        });
    } else {
        alert("Por favor, escribe algo antes de continuar.");
    }
}