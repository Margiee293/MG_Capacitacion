/* ===============================
   CONFIGURACIÓN POR MARKER
================================ */

const markerContent = {
    mark_1: {
        title: "Financiamiento",
        items: [
            {
                label: "📄 Manual Financiamiento",
                type: "pdf",
                src: "./../../INFO/FINANCIAMIENTO/financiamiento.pdf"
            },
            {
                label: "📄 Manual Financiamiento por CETELEM",
                type: "pdf",
                src: "./../../INFO/FINANCIAMIENTO/CETELEM.pdf"
            }
        ]
    },
    mark_2: {
        title: "Prueba de Manejo",
        items: [
            {
                label: "📄 Prueba de Manejo",
                type: "pdf",
                src: "./../../INFO/PRUEBA DE MANEJO/prueba.pdf"
            }
        ]
    }


};
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

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

let userId = null;
let cargoUsuario = "";
/* ===============================
   REFERENCIAS
================================ */

const modal = document.getElementById("videoModal");
const viewer = document.getElementById("viewer");
const list = document.getElementById("contentList");
const title = document.getElementById("sidebarTitle");
const closeBtn = document.getElementById("closeModal");

/* ===============================
   ABRIR MODAL
================================ */
function abrirModal(marker) {
    const data = markerContent[marker.id];
    if (!data) return;

    title.textContent = data.title;
    list.innerHTML = "";

    cargarContenido(data.items[0].type, data.items[0].src);

    data.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.label;
        li.addEventListener("click", () => {
            cargarContenido(item.type, item.src);
        });
        list.appendChild(li);
    });

    modal.classList.add("active");
}

/* ===============================
   CARGAR CONTENIDO
================================ */

function cargarContenido(type, src) {
    viewer.innerHTML = "";

    if (type === "pdf") {
        viewer.innerHTML = `<iframe src="${src}#navpanes=0"></iframe>`;
    }
    if (type === "img") {
        viewer.innerHTML = `<img src="${src}" alt="">`;
    }

    if (type === "video") {
        viewer.innerHTML = `
            <iframe src="${src}" 
                    width="100%" 
                    height="auto" 
                    allow="autoplay">
            </iframe>
        `;
    }
}

/* ===============================
   CERRAR MODAL
================================ */

function cerrarModal() {
    viewer.innerHTML = "";
    modal.classList.remove("active");
}

closeBtn.addEventListener("click", cerrarModal);

modal.addEventListener("click", e => {
    if (e.target === modal) cerrarModal();
});

/* ===============================
   PROGRESO SIN GUARDADO
================================ */

const TOTAL_MARKERS = 2;
const markers = document.querySelectorAll(".marker-wrapper");

let progress = {
    unlocked: 1,
    visited_financiamiento: []
};



/* ===============================
   CLICK EN MARKERS
================================ */

markers.forEach(marker => {
    marker.addEventListener("click", async () => {

        const order = Number(marker.dataset.order);

        if (marker.classList.contains("locked")) return;

        abrirModal(marker);

        if (!Array.isArray(progress.visited_financiamiento)) {
            progress.visited_financiamiento = [];
        }

        if (!progress.visited_financiamiento.includes(marker.id)) {
            progress.visited_financiamiento.push(marker.id);
            marker.classList.add("visited_financiamiento");
        }

        if (order === progress.unlocked && progress.unlocked < TOTAL_MARKERS) {
            progress.unlocked++;
        }

        if (userId) {
            await setDoc(doc(db, "progreso", userId + "_financiamiento"), progress);
        }

        aplicarProgreso();
    });
});
function aplicarProgreso() {

    markers.forEach(marker => {

        const order = Number(marker.dataset.order);

        marker.classList.remove("locked", "visited_financiamiento", "show");

        const isLocked = order > progress.unlocked;
        const isVisited = progress.visited_financiamiento?.includes(marker.id);


        marker.classList.add("show");

        if (isVisited) {
            marker.classList.add("visited_financiamiento");
        }


        const shouldShow =
            marker.id === progress.visited_financiamiento?.at(-1) ||
            (!progress.visited_financiamiento.length && order === progress.unlocked);

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
                <a href="./../administracion.html" id="btnAdmin">
                    <img src="../../IMG/SUB_PAG/ajustes.png" alt="Admin">
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


/* ================= AUTH NAV ================= */
onAuthStateChanged(auth, async (user) => {

    // =========================
    // ❌ SIN SESIÓN
    // =========================
    if (!user) {
        userId = null;
        cargoUsuario = "";

        renderGuest();

        // 🔥 evitar duplicar modal
        if (!document.querySelector(".modal_auth")) {
            mostrarModalLogin();
        }

        return;
    }

    // =========================
    // ✅ SESIÓN ACTIVA
    // =========================
    userId = user.uid;

    try {

        // 👤 CARGO
        const userSnap = await getDoc(doc(db, "usuarios", user.uid));

        cargoUsuario = userSnap.exists()
            ? (userSnap.data().cargo || "")
            : "";

        renderLogged(user, cargoUsuario);

        // 📦 PROGRESO
        const progressSnap = await getDoc(
            doc(db, "progreso", user.uid + "_financiamiento")
        );

        if (progressSnap.exists()) {

            const data = progressSnap.data();

            progress = {
                unlocked: data.unlocked ?? 1,
                visited_financiamiento: Array.isArray(data.visited_financiamiento)
                    ? data.visited_financiamiento
                    : []
            };

        }

    } catch (error) {
        console.error("❌ Error auth:", error);
    }

    aplicarProgreso();
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