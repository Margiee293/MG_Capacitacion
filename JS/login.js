
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword }
    from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7Z0aygJbT6ebXqrIv6rPtFuB92N-gQ70",
    authDomain: "mg-capacitacion-5504d.firebaseapp.com",
    projectId: "mg-capacitacion-5504d",
    storageBucket: "mg-capacitacion-5504d.firebasestorage.app",
    messagingSenderId: "551354112247",
    appId: "1:551354112247:web:f76d457671259c40df1bf2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ELEMENTOS */
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const togglePass = document.getElementById("togglePass");
const imgEye = document.getElementById("imgEye");

const modal = document.getElementById("loginModal");
const msg = document.getElementById("loginMsg");
const box = document.getElementById("loginModalBox");

/* MODAL */
function mostrarModal(texto, tipo = "ok") {
    msg.textContent = texto;

    if (tipo === "ok") {
        box.style.borderColor = "#00c853";
    } else {
        box.style.borderColor = "#ff1744";
    }

    modal.classList.add("active");
}

/* LOGIN */
async function login() {

    const email = correo.value.trim();
    const pass = password.value.trim();

    if (email === "" || pass === "") {
        mostrarModal("Completa todos los campos", "error");
        setTimeout(() => modal.classList.remove("active"), 1500);
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, pass);

        mostrarModal("Bienvenido 🚀", "ok");

        setTimeout(() => {

            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = "../index.html";
            }

        }, 1500);

    } catch (error) {
        mostrarModal("Acceso denegado ❌", "error");

        setTimeout(() => {
            modal.classList.remove("active");
        }, 1500);
    }
}

/* BOTÓN */
btnLogin.addEventListener("click", login);

/* ENTER EN PASSWORD */
password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        login();
    }
});

/* VER CONTRASEÑA */
togglePass.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        imgEye.src = "../IMG/SUB_PAG/Visible.png";
        imgEye.alt = "Ocultar";
    } else {
        password.type = "password";
        imgEye.src = "../IMG/SUB_PAG/Invisible.png";
        imgEye.alt = "Mostrar";
    }

});