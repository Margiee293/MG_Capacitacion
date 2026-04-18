document.addEventListener("DOMContentLoaded", () => {

  const imagen = document.getElementById("img_carrusel");

  if (!imagen) {
    console.error("ERROR: No se encontró la imagen con id='img_carrusel'");
    return;
  }
  const imagenes = [
    "./IMG/IMG_Bienvenidos/1.jpeg",
    "./IMG/IMG_Bienvenidos/2.jpeg",
    "./IMG/IMG_Bienvenidos/3.jpeg",
    "./IMG/IMG_Bienvenidos/4.jpeg",
    "./IMG/IMG_Bienvenidos/5.jpeg",
    "./IMG/IMG_Bienvenidos/6.jpeg",
    "./IMG/IMG_Bienvenidos/7.jpeg",
    "./IMG/IMG_Bienvenidos/8.jpeg",
    "./IMG/IMG_Bienvenidos/9.jpeg",
    "./IMG/IMG_Bienvenidos/10.jpeg"
  ];

  let indice = 0;

  setInterval(() => {

    imagen.style.opacity = 0.3;
    setTimeout(() => {
      indice = (indice + 1) % imagenes.length;
      imagen.src = imagenes[indice];
      imagen.style.opacity = 1;
    }, 500);

  }, 5000);
});

/* ==========================================
   IMPORTS
========================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

/* ==========================================
   FIREBASE
========================================== */
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
const db = getFirestore(app);

const container = document.getElementById("userContainer");

/* ==========================================
   RENDER USUARIO
========================================== */
function renderLogged(user, cargo = "") {

  /* SOLO SI ES ADMIN */
  const botonAdmin =
    cargo === "admon"
      ? `
      <li>
        <a href="HTML/administracion.html" id="btnAdmin" title="Administración">
          <img src="./IMG/SUB_PAG/ajustes.png" alt="Administración">
        </a>
      </li>
    `
      : "";

  container.innerHTML = `
    <ul>
      <li id="user-email">${user.email}</li>

      ${botonAdmin}

      <li>
        <button id="logout" type="button">Cerrar sesión</button>
      </li>
    </ul>
  `;

  document.getElementById("logout").addEventListener("click", () => {
    document.getElementById("logoutModal").classList.add("active");
  });
}

/* ==========================================
   VISITANTE
========================================== */
function renderGuest() {
  container.innerHTML = `
    <ul>
      <li>
        <a href="HTML/login.html">Iniciar Sesión</a>
      </li>
    </ul>
  `;
}

/* ==========================================
   AUTH + CARGO
========================================== */
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    renderGuest();
    return;
  }

  let cargo = "";

  try {

    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      cargo = snap.data().cargo || "";
    }

  } catch (error) {
    console.error(error);
  }

  renderLogged(user, cargo);

});

/* ==========================================
   MODAL LOGOUT
========================================== */
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

cancelLogout.addEventListener("click", () => {
  logoutModal.classList.remove("active");
});

confirmLogout.addEventListener("click", async () => {
  await signOut(auth);
  logoutModal.classList.remove("active");
});

logoutModal.addEventListener("click", (e) => {
  if (e.target === logoutModal) {
    logoutModal.classList.remove("active");
  }
});

//MODAL PARA PANTALLAS SOLO PC+

function createDeviceBlocker() {
  if (document.getElementById("mobileBlocker")) return;

  const modal = document.createElement("div");
  modal.id = "mobileBlocker";
  modal.className = "mobile-blocker";

  modal.innerHTML = `
      <div class="mobile-blocker-box">
          <h2>🔒 Acceso restringido</h2>
          <p>Esta plataforma solo está disponible en computadora (PC o Laptop).</p>
      </div>
  `;

  document.body.appendChild(modal);
}
function checkScreen() {
  const blocker = document.getElementById("mobileBlocker");

  if (!blocker) return;

  if (window.innerWidth < 1024) {
    blocker.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    blocker.style.display = "none";
    document.body.style.overflow = "auto";
  }
}
window.addEventListener("load", () => {
  createDeviceBlocker();
  checkScreen();
});

window.addEventListener("resize", checkScreen);