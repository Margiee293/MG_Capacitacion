import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs
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
let cargoUsuario = "";
/* ==========================================
   ELEMENTOS
========================================== */
const container = document.getElementById("userContainer");

const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modalMsg");

const btnCrear = document.getElementById("btnCrear");
const btnGuardar = document.getElementById("btnGuardar");
const btnBorrarProgress = document.getElementById("btnBorrarProgress");

const usuariosLista = document.getElementById("usuariosLista");
const usuariosProgreso = document.getElementById("usuariosProgreso");


const password_1 = document.getElementById("password_1");
const password_2 = document.getElementById("password_2");
const togglePass_1 = document.getElementById("togglePass_1");
const togglePass_2 = document.getElementById("togglePass_2");
const imgEye_1 = document.getElementById("imgEye_1");
const imgEye_2 = document.getElementById("imgEye_2");
/* ==========================================
   MODAL SIMPLE
========================================== */
function mostrarModal(texto) {
    modalMsg.textContent = texto;
    modal.classList.add("active");

    setTimeout(() => {
        modal.classList.remove("active");
    }, 2200);
}

/* ==========================================
   MODAL LOGOUT
========================================== */
function crearModalLogout() {
    if (document.getElementById("logoutModal")) return;

    document.body.insertAdjacentHTML(
        "beforeend",
        `
    <div class="modal_logout" id="logoutModal">
      <div class="modal_logout_box">
        <p>¿Estás seguro que quieres cerrar sesión?</p>

        <div class="modal_logout_btns">
          <button id="cancelLogout">Cancelar</button>
          <button id="confirmLogout">Cerrar sesión</button>
        </div>
      </div>
    </div>
    `
    );

    const logoutModal = document.getElementById("logoutModal");
    const cancelLogout = document.getElementById("cancelLogout");
    const confirmLogout = document.getElementById("confirmLogout");

    cancelLogout.addEventListener("click", () => {
        logoutModal.classList.remove("active");
    });

    logoutModal.addEventListener("click", (e) => {
        if (e.target.id === "logoutModal") {
            logoutModal.classList.remove("active");
        }
    });

    confirmLogout.addEventListener("click", async () => {
        await signOut(auth);
    });
}

/* ==========================================
   NAV USUARIO LOGUEADO
========================================== */
async function renderLogged(user) {


    try {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            cargoUsuario = snap.data().cargo || "";
        }

    } catch (error) {
        console.error(error);
    }

    let html = `
    <ul>
      <li id="user-email">${user.email}</li>
  `;

    if (cargoUsuario === "admon") {
        html += `
      <li>
        <a href="./administracion.html" id="btnAdmin">
          <img src="../IMG/SUB_PAG/ajustes.png" alt="Administración">
        </a>
      </li>
    `;
    }

    html += `
      <li>
        <button id="logout" type="button">Cerrar sesión</button>
      </li>
    </ul>
  `;

    container.innerHTML = html;

    crearModalLogout();

    document.getElementById("logout").addEventListener("click", () => {
        document.getElementById("logoutModal").classList.add("active");
    });
}

/* ==========================================
   NAV INVITADO
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
   CARGAR USUARIOS
========================================== */
async function cargarUsuarios() {
    usuariosLista.innerHTML =
        `<option value="">Selecciona usuario</option>`;

    usuariosProgreso.innerHTML =
        `<option value="">Selecciona usuario</option>`;

    const querySnapshot = await getDocs(collection(db, "usuarios"));

    querySnapshot.forEach((docSnap) => {
        const datos = docSnap.data();
        const uid = docSnap.id;
        const correo = datos.email || uid;

        usuariosLista.innerHTML += `
      <option value="${uid}">${correo}</option>
    `;

        usuariosProgreso.innerHTML += `
      <option value="${uid}">${correo}</option>
    `;
    });
}
usuariosLista.addEventListener("change", async () => {

    const uid = usuariosLista.value;

    if (!uid) return;

    try {

        const ref = doc(db, "usuarios", uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            mostrarModal("Usuario no encontrado");
            return;
        }

        const datos = snap.data();

        document.getElementById("editEmail").value =
            datos.email || "";

        document.getElementById("editCargo").value =
            datos.cargo || "";

        document.getElementById("editPass").value = "";

    } catch (error) {
        console.error(error);
        mostrarModal("Error al cargar usuario");
    }

});
/* ==========================================
   MODAL LOGIN
========================================== */
function mostrarModalLogin() {

    if (document.getElementById("modal_auth")) return;

    const modal = document.createElement("div");
    modal.id = "modal_auth"; // 🔥 IMPORTANTE

    modal.innerHTML = `
        <div class="modal_auth">
            <div class="modal_auth_box">
                <p>Debes iniciar sesión para continuar</p>

                <div class="modal_auth_btns">
                    <button id="volverBtn">Regresar</button>
                    <button id="loginBtn">Iniciar sesión</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("volverBtn").onclick = () => {
        window.location.href = "../index.html";
    };

    document.getElementById("loginBtn").onclick = () => {
        window.location.href = "./login.html";
    };
}

/* ==========================================
   LOGIN + VALIDACIÓN ADMIN
========================================== */
onAuthStateChanged(auth, async (user) => {

    if (!user) {

        renderGuest();

        // 🔥 IMPORTANTE: mostrar modal SOLO una vez
        if (!document.getElementById("modal_auth")) {
            mostrarModalLogin();
        }
        return;
    }

    await renderLogged(user);

    try {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            window.location.href = "../index.html";
            return;
        }

        const datos = snap.data();

        if (datos.cargo !== "admon") {
            window.location.href = "../index.html";
            return;
        }

        cargarUsuarios();

    } catch (error) {
        console.error(error);
        window.location.href = "../index.html";
    }
});

/* ==========================================
   CREAR USUARIO
========================================== */
btnCrear?.addEventListener("click", async () => {

    const email = newEmail.value.trim();
    const password = newPass.value.trim();
    const cargo = newCargo.value;

    const res = await fetch("http://localhost:3000/crear-usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            cargo
        })
    });

    const data = await res.json();

    mostrarModal(data.mensaje);
});

/* ==========================================
   EDITAR USUARIO
========================================== */
btnGuardar?.addEventListener("click", async () => {

    const uid = usuariosLista.value;
    const email = editEmail.value.trim();
    const password = editPass.value.trim();
    const cargo = editCargo.value;

    if (!uid) {
        mostrarModal("Selecciona usuario");
        return;
    }

    try {

        if (email) {
            await fetch("http://localhost:3000/editar-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uid, email })
            });
        }

        if (password) {
            await fetch("http://localhost:3000/editar-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uid, password })
            });
        }

        if (cargo) {
            await updateDoc(doc(db, "usuarios", uid), {
                cargo
            });
        }

        mostrarModal("Usuario actualizado");
        cargarUsuarios();

    } catch (error) {
        console.error(error);
        mostrarModal("Error al actualizar");
    }

});

/* ==========================================
   BORRAR TODO EL PROGRESO
========================================== */
btnBorrarProgress?.addEventListener("click", async () => {

    const uid = usuariosProgreso.value;

    if (!uid) {
        mostrarModal("Selecciona usuario");
        return;
    }

    try {
        await setDoc(
            doc(db, "progreso", uid + "_productos"),
            {
                unlocked: 1,
                completados: []
            }
        );
        await setDoc(
            doc(db, "progreso", uid + "_ventas"),
            {
                unlocked: 1,
                completados: []
            }
        );
        mostrarModal("Progreso eliminado");

    } catch (error) {
        console.error(error);
        mostrarModal("Error al borrar");
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

/* VER CONTRASEÑA CREAR USUARIO */
togglePass_1.addEventListener("click", () => {

    if (password_1.type === "password") {
        password_1.type = "text";
        imgEye_1.src = "../IMG/SUB_PAG/Visible.png";
        imgEye_1.alt = "Ocultar";
    } else {
        password_1.type = "password";
        imgEye_1.src = "../IMG/SUB_PAG/Invisible.png";
        imgEye_1.alt = "Mostrar";
    }

});
/* VER CONTRASEÑA EDITAR USUARIO */
togglePass_2.addEventListener("click", () => {

    if (password_2.type === "password") {
        password_2.type = "text";
        imgEye_2.src = "../IMG/SUB_PAG/Visible.png";
        imgEye_2.alt = "Ocultar";
    } else {
        password_2.type = "password";
        imgEye_2.src = "../IMG/SUB_PAG/Invisible.png";
        imgEye_2.alt = "Mostrar";
    }

});