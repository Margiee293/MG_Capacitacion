import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";

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
   CONFIG CARGOS
========================================== */
const cargosConfig = {
    recepcion: {
        imgOpen: "../../IMG/SUB_PAG/Cargos/Chica_MG.png",
        imgLock: "../../IMG/SUB_PAG/Cargos/Chica_MG_Bloqueada.png"
    },
    vendedor: {
        imgOpen: "../../IMG/SUB_PAG/Cargos/Chico_MG.png",
        imgLock: "../../IMG/SUB_PAG/Cargos/Chico_MG_Bloqueado.png"
    },
    admon_ventas: {
        imgOpen: "../../IMG/SUB_PAG/Cargos/Chica_MG_2.png",
        imgLock: "../../IMG/SUB_PAG/Cargos/Chica_MG_2_Bloqueada.png"
    },
    business: {
        imgOpen: "../../IMG/SUB_PAG/Cargos/Chico_MG_2.png",
        imgLock: "../../IMG/SUB_PAG/Cargos/Chico_MG_2_Bloqueado.png"
    },
    financiamiento: {
        imgOpen: "../../IMG/SUB_PAG/Cargos/Chica_MG_3.png",
        imgLock: "../../IMG/SUB_PAG/Cargos/Chica_MG_3_Bloqueada.png"
    }
};

/* ==========================================
   MODAL LOGIN
========================================== */
function mostrarModalLogin() {

    const modal = document.createElement("div");

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
        window.location.href = "../../index.html";
    };

    document.getElementById("loginBtn").onclick = () => {
        window.location.href = "../login.html";
    };
}

/* ==========================================
   AUTH RÁPIDO
========================================== */
onAuthStateChanged(auth, async (user) => {

    /* NO LOGUEADO */
    if (!user) {
        mostrarModalLogin();
        return;
    }

    try {

        /* CONSULTA SOLO USUARIO */
        const usuarioSnap = await getDoc(doc(db, "usuarios", user.uid));

        if (usuarioSnap.exists()) {
            cargoUsuario = usuarioSnap.data().cargo || "";
        }

    } catch (error) {
        console.error(error);
    }

    aplicarEstadoCargos();

    if (typeof aplicarProgreso === "function") {
        aplicarProgreso();
    }

});

/* ==========================================
   CARGOS
========================================== */
function aplicarEstadoCargos() {

    const cargos = document.querySelectorAll(".cajon_chica, .cajon_chico");

    cargos.forEach(cargo => {

        const id = cargo.id;
        const config = cargosConfig[id];

        if (!config) return;

        const img = cargo.querySelector("img");
        const link = cargo.closest("a");

        if (link && !link.dataset.href) {
            const href = link.getAttribute("href");

            if (href) {
                link.dataset.href = href;
            }
        }

        const activo = (cargoUsuario === "admon") || (id === cargoUsuario);

        if (activo) {

            cargo.classList.remove("bloqueado");

            if (img) img.src = config.imgOpen;

            if (link) {
                link.href = link.dataset.href;
                link.style.pointerEvents = "auto";
                link.style.opacity = "1";
            }

        } else {

            cargo.classList.add("bloqueado");

            if (img) img.src = config.imgLock;

            if (link) {
                link.removeAttribute("href");
                link.style.pointerEvents = "none";
                link.style.opacity = ".55";
            }

        }

    });

}

//PARA Q FUNCIONE EL NAV
/* ================= CONTENEDOR NAV ================= */
const container = document.getElementById("userContainer");

/* ================= OBTENER CARGO ================= */
async function getCargo(uid) {
    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        return snap.data().cargo || "";
    }
    return "";
}

/* ================= MODAL LOGOUT ================= */
function createLogoutModal() {

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

    const modal = document.getElementById("logoutModal");

    document.getElementById("cancelLogout").onclick = () => {
        modal.classList.remove("active");
    };

    modal.onclick = (e) => {
        if (e.target.id === "logoutModal") {
            modal.classList.remove("active");
        }
    };

    document.getElementById("confirmLogout").onclick = async () => {
        await signOut(auth);
    };
}

/* ================= NAV LOGUEADO ================= */
function renderLogged(user, cargo) {

    let html = `
    <ul>
        <li id="user-email">${user.email}</li>
    `;

    /* SOLO ADMIN */
    if (cargo === "admon") {
        html += `
        <li>
            <a href="./administracion.html" id="btnAdmin">
                <img src="../../IMG/SUB_PAG/Ajustes.png" alt="Admin">
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

    createLogoutModal();

    document.getElementById("logout").onclick = () => {
        document.getElementById("logoutModal").classList.add("active");
    };
}

/* ================= NAV INVITADO ================= */
function renderGuest() {
    container.innerHTML = `
    <ul>
        <li>
            <a href="../login.html">Iniciar Sesión</a>
        </li>
    </ul>
    `;
}

/* ================= AUTH NAV ================= */
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        renderGuest();
        return;
    }

    const cargo = await getCargo(user.uid);

    renderLogged(user, cargo);
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