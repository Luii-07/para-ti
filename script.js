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
            document.getElementById('contenedorMusica').classList.remove('opacity-0', 'pointer-events-none');
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

/* --- SISTEMA DE LETRAS Y REPRODUCTOR --- */

// Tiempos en segundos y traducción de "All of Me"
const letrasSincronizadas = [
    { tiempo: 0, texto: "🎶 (Música) 🎶" },
    { tiempo: 14, texto: "¿Qué haría yo sin tu lengua afilada?" },
    { tiempo: 19, texto: "Atrayéndome y echándome" },
    { tiempo: 23, texto: "Mi cabeza está dando vueltas, no es broma" },
    { tiempo: 27, texto: "No logro descifrarte" },
    { tiempo: 30, texto: "¿Qué pasa por esa mente hermosa?" },
    { tiempo: 34, texto: "Estoy en tu viaje mágico y misterioso" },
    { tiempo: 37, texto: "Y me siento tan mareado, no sé qué me dio" },
    { tiempo: 41, texto: "Pero estaré bien" },
    { tiempo: 44, texto: "Mi cabeza está bajo el agua" },
    { tiempo: 48, texto: "Pero respiro sin problema" },
    { tiempo: 51, texto: "Tú estás loca y yo estoy fuera de mí" },
    { tiempo: 55, texto: "Porque todo de mí" },
    { tiempo: 59, texto: "Ama todo de ti" },
    { tiempo: 63, texto: "Amo tus curvas y todos tus contornos" },
    { tiempo: 66, texto: "Todas tus perfectas imperfecciones" },
    { tiempo: 70, texto: "Dame todo de ti a mí" },
    { tiempo: 74, texto: "Te daré todo de mí a ti" },
    { tiempo: 79, texto: "Eres mi final y mi comienzo" },
    { tiempo: 83, texto: "Incluso cuando pierdo, salgo ganando" },
    { tiempo: 87, texto: "Porque yo te doy todo de mí" },
    { tiempo: 93, texto: "Y tú me das todo de ti, oh-oh" },
    { tiempo: 100, texto: "¿Cuántas veces tengo que decirte?" },
    { tiempo: 105, texto: "Incluso cuando lloras, eres hermosa" },
    { tiempo: 108, texto: "El mundo te está castigando, pero yo te sigo en cada momento" },
    { tiempo: 113, texto: "Eres mi caida, eres mi musa" },
    { tiempo: 117, texto: "Mi peor distracción, mi ritmo y melodía" },
    { tiempo: 121, texto: "No puedo dejar de cantar" },
    { tiempo: 124, texto: "está sonando en mi mente, para ti" },
    { tiempo: 128, texto: "Mi cabeza está bajo el agua" },
    { tiempo: 131, texto: "Pero respiro sin problema" },
    { tiempo: 134, texto: "Tú estás loca y yo estoy fuera de mí" },
    { tiempo: 139, texto: "Porque todo de mí" },
    { tiempo: 143, texto: "Ama todo de ti" },
    { tiempo: 147, texto: "Amo tus curvas y todos tus contornos" },
    { tiempo: 150, texto: "Todas tus perfectas imperfecciones" },
    { tiempo: 154, texto: "Dame todo de ti a mí" },
    { tiempo: 158, texto: "Te daré todo de mí a ti" },
    { tiempo: 163, texto: "Eres mi final y mi comienzo" },
    { tiempo: 167, texto: "Incluso cuando pierdo, salgo ganando" },
    { tiempo: 171, texto: "Porque yo te doy todo de mí" },
    { tiempo: 177, texto: "Y tú me das todo de ti, oh-oh" },
    { tiempo: 181, texto: "Dame todo de ti, oh" },
    { tiempo: 186, texto: "Cartas sobre la mesa" },
    { tiempo: 190, texto: "Los dos estamos mostrando corazones" },
    { tiempo: 195, texto: "Arriesgándolo todo, aunque sea difícil" },
    { tiempo: 199, texto: "Porque todo de mí" },
    { tiempo: 203, texto: "Ama todo de ti" },
    { tiempo: 206, texto: "Amo tus curvas y todos tus contornos" },
    { tiempo: 210, texto: "Todas tus perfectas imperfecciones" },
    { tiempo: 214, texto: "Dame todo de ti a mí" },
    { tiempo: 219, texto: "Te daré todo de mí a ti" },
    { tiempo: 223, texto: "Eres mi final y mi comienzo" },
    { tiempo: 227, texto: "Incluso cuando pierdo, salgo ganando" },
    { tiempo: 233, texto: "Porque yo te doy todo de mí" },
    { tiempo: 240, texto: "Y tú me das todo de ti" },
    { tiempo: 245, texto: "Yo te doy todo de mí" },
    { tiempo: 250, texto: "Y tú me das todo de ti, oh" },
    { tiempo: 258, texto: "🎶 (Música final) 🎶" }
];

// Mostrar las letras en tiempo real
cancion.addEventListener('timeupdate', () => {
    const tiempoActual = Math.floor(cancion.currentTime);
    
    // Buscar la letra que corresponde al segundo actual
    const letraActual = letrasSincronizadas.filter(l => tiempoActual >= l.tiempo).pop();
    
    if (letraActual) {
        const divLetras = document.getElementById('letras');
        // Si el texto cambia, hacemos una transición suave
        if (divLetras.innerText !== letraActual.texto) {
            divLetras.style.opacity = 0; // Se desvanece
            setTimeout(() => {
                divLetras.innerText = letraActual.texto; // Cambia el texto
                divLetras.style.opacity = 1; // Aparece suavemente
            }, 400); // 400 milisegundos de transición
        }
    }
});

// Función para el botón del reproductor
function pausarReproducir() {
    const iconoPlay = document.getElementById('iconoPlay');
    const iconoPause = document.getElementById('iconoPause');
    
    if (cancion.paused) {
        cancion.play();
        iconoPlay.classList.add('hidden');
        iconoPause.classList.remove('hidden');
    } else {
        cancion.pause();
        iconoPlay.classList.remove('hidden');
        iconoPause.classList.add('hidden');
    }
}