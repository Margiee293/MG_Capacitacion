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
    let cargoUsuario = "";

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
          <img src="../IMG/SUB_PAG/Ajustes.png" alt="Administración">
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
        <a href="../login.html">Iniciar Sesión</a>
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

/* ==========================================
   LOGIN + VALIDACIÓN ADMIN
========================================== */
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        renderGuest();
        window.location.href = "../login.html";
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
btnCrear.addEventListener("click", async () => {

    const email = document.getElementById("newEmail").value.trim();
    const pass = document.getElementById("newPass").value.trim();
    const cargo = document.getElementById("newCargo").value;

    if (!email || !pass || !cargo) {
        mostrarModal("Completa todos los campos");
        return;
    }

    try {
        const uid = crypto.randomUUID();

        await setDoc(doc(db, "usuarios", uid), {
            email: email,
            password: pass,
            cargo: cargo
        });

        await setDoc(doc(db, "progreso", uid + "_productos"), {});

        mostrarModal("Usuario creado");
        cargarUsuarios();

    } catch (error) {
        console.error(error);
        mostrarModal("Error al crear");
    }
});

/* ==========================================
   EDITAR USUARIO
========================================== */
btnGuardar.addEventListener("click", async () => {

    const uid = usuariosLista.value;

    if (!uid) {
        mostrarModal("Selecciona usuario");
        return;
    }

    const email = document.getElementById("editEmail").value.trim();
    const pass = document.getElementById("editPass").value.trim();
    const cargo = document.getElementById("editCargo").value;

    const data = {};

    if (email) data.email = email;
    if (pass) data.password = pass;
    if (cargo) data.cargo = cargo;

    if (Object.keys(data).length === 0) {
        mostrarModal("Sin cambios");
        return;
    }

    try {
        await updateDoc(doc(db, "usuarios", uid), data);

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
btnBorrarProgress.addEventListener("click", async () => {

    const uid = usuariosProgreso.value;

    if (!uid) {
        mostrarModal("Selecciona usuario");
        return;
    }

    try {
        await setDoc(
            doc(db, "progreso", uid + "_productos"),
            {}
        );

        mostrarModal("Progreso eliminado");

    } catch (error) {
        console.error(error);
        mostrarModal("Error al borrar");
    }
});