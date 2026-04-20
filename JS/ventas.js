/* ===============================
CONFIGURACIÓN POR MARKER
================================ */

const markerContent = {
    mark_1: {
        title: "MG 3",
        items: [
            {
                label: "📄 Manual MG 3",
                type: "pdf",
                src: "./../../INFO/MG 3/PG MG 3.pdf"
            },
            {
                label: "📄 Ficha Técnica MG 3",
                type: "pdf",
                src: "./../../INFO/MG 3/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG 3",
                type: "pdf",
                src: "./../../INFO/MG 3/catalogo.pdf"
            }
        ]
    },
    mark_2: {
        title: "MG 3 HEV",
        items: [
            {
                label: "📄 Ficha Técnica MG 3 HEV",
                type: "pdf",
                src: "./../../INFO/MG 3 HEV/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG 3 HEV",
                type: "pdf",
                src: "./../../INFO/MG 3 HEV/catalogo.pdf"
            }
        ]
    },
    mark_3: {
        title: "MG 5",
        items: [
            {
                label: "📄 MG 5 2024 Y MG 5 2025",
                type: "pdf",
                src: "./../../INFO/MG 5/MG5.pdf"
            },
            {
                label: "📄 Ficha Técnica MG 5",
                type: "pdf",
                src: "./../../INFO/MG 5/ficha_tecnica.pdf"
            }
        ]
    },
    mark_4: {
        title: "Examén de MG3, MG3 HEV Y MG5",
        items: [
            {
                label: "📄 Examén",
                type: "pdf",
                src: "./../../INFO/EXAMEN/examen_1.pdf"
            }
        ]
    },
    mark_5: {
        title: "MG 7",
        items: [
            {
                label: "📄 Manual MG 7",
                type: "pdf",
                src: "./../../INFO/MG 7/PG MG 7.pdf"
            },
            {
                label: "📄 Ficha Técnica MG 7",
                type: "pdf",
                src: "./../../INFO/MG 7/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG 7",
                type: "pdf",
                src: "./../../INFO/MG 7/catalogo.pdf"
            }
        ]
    },

    mark_6: {
        title: "MG ZS Y ZS HYBRID",
        items: [
            {
                label: "📄 Manual MG ZS Y ZS HYBRID 2026",
                type: "pdf",
                src: "./../../INFO/MG ZS/PG MG ZS.pdf"
            },
            {
                label: "📄 Ficha Técnica MG ZS Y ZS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG ZS/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG ZS Y ZS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG ZS/catalogo.pdf"
            }

        ]
    },
    mark_7: {
        title: "MG HS, HS PHEV Y HS HYBRID",
        items: [
            {
                label: "📄 Ficha Técnica MG HS, HS PHEV Y HS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG HS/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG HS, HS PHEV Y HS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG HS/catalogo.pdf"
            }
        ]
    },
    mark_8: {
        title: "MG RX9",
        items: [
            {
                label: "📄 Manual MG RX9",
                type: "pdf",
                src: "./../../INFO/MG RX9/PG MG RX9.pdf"
            },
            {
                label: "📄 Ficha Técnica MG RX9",
                type: "pdf",
                src: "./../../INFO/MG RX9/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG RX9",
                type: "pdf",
                src: "./../../INFO/MG RX9/catalogo.pdf"
            }
        ]
    },
    mark_9: {
        title: "Examén de ZS, ZS HYBRID, HS, HS PHEV, HS HYBRID Y MG RX9",
        items: [
            {
                label: "📄 Examén",
                type: "pdf",
                src: "./../../INFO/EXAMEN/examen_2.pdf"
            }

        ]
    },


    mark_10: {
        title: "MG 4 ELECTRIC",
        items: [
            {
                label: "📄 Ficha Técnica MG 4 ELECTRIC",
                type: "pdf",
                src: "./../../INFO/MG 4 ELECTRIC/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG 4 ELECTRIC",
                type: "pdf",
                src: "./../../INFO/MG 4 ELECTRIC/catalogo.pdf"
            }
        ]
    },
    mark_11: {
        title: "MG IM LS7",
        items: [
            {
                label: "📄 Manual LS7",
                type: "pdf",
                src: "./../../INFO/MG IM LS7/IM LS7.pdf"
            },
            {
                label: "📄 Ficha Técnica MG IM LS7",
                type: "pdf",
                src: "./../../INFO/MG IM LS7/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG IM LS7",
                type: "pdf",
                src: "./../../INFO/MG IM LS7/catalogo.pdf"
            }
        ]
    },
    mark_12: {
        title: "MG CYBERTESTER",
        items: [
            {
                label: "📄 Ficha Técnica MG CYBERTESTER",
                type: "pdf",
                src: "./../../INFO/MG CYBERTESTER/ficha_tecnica.pdf"
            },
            {
                label: "📄 Catálogo MG CYBERTESTER",
                type: "pdf",
                src: "./../../INFO/MG CYBERTESTER/catalogo.pdf"
            }
        ]
    },


    mark_13: {
        title: "Examén de MG 4 ELECTRIC, MG IM LS7 Y MG CYBERTESTER",
        items: [
            {
                label: "📄 Examén",
                type: "pdf",
                src: "./../../INFO/EXAMEN/examen_3.pdf"
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
const btnVentas = document.getElementById("btnVentas");


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
PROGRESO GUARDADO
================================ */
const TOTAL_MARKERS = 13;
const markers = document.querySelectorAll(".marker-wrapper");

let progress = {
    unlocked: 1,
    visited_producto: [],
    lastVisited: null
};

/* ===============================
INICIALIZAR ESTADO
================================ */
markers.forEach(marker => {
    const order = Number(marker.dataset.order);
    const indicator = marker.querySelector(".marker-indicator");

    // Bloqueados
    if (order > progress.unlocked) {
        marker.classList.add("locked");
        if (indicator) indicator.style.display = "none";
    }
    // Desbloqueados
    else {
        marker.classList.remove("locked");
        marker.classList.add("show");

        if (indicator && !progress.visited_producto.includes(marker.id)) {
            indicator.style.display = "block";
        }
    }

    // Visitados
    if (progress.visited_producto.includes(marker.id)) {
        marker.classList.add("visited_producto");
        marker.classList.add("show");

        if (indicator && order !== 13) indicator.style.display = "none";
    }
});

markers.forEach(marker => {
    marker.addEventListener("click", async () => {

        const order = Number(marker.dataset.order);

        console.log("🟡 CLICK:", marker.id);
        console.log("📦 ORDER:", order);
        console.log("🔓 UNLOCKED:", progress.unlocked);
        console.log("⭐ LAST BEFORE:", progress.lastVisited);

        if (marker.classList.contains("locked")) {
            console.log("⛔ BLOQUEADO:", marker.id);
            return;
        }

        abrirModal(marker);

        // FIX: asegurar array siempre
        if (!Array.isArray(progress.visited_producto)) {
            console.log("⚠️ visited_producto NO era array, lo arreglo");
            progress.visited_producto = [];
        }

        if (!progress.visited_producto.includes(marker.id)) {
            progress.visited_producto.push(marker.id);
            console.log("👤 NUEVO VISITADO:", marker.id);
        }

        // último clickeado (MUÑEQUITA DEPENDE DE ESTO)
        progress.lastVisited = marker.id;
        console.log("⭐ LAST UPDATED:", progress.lastVisited);

        // unlock
        if (order === progress.unlocked && progress.unlocked < TOTAL_MARKERS) {
            progress.unlocked++;
            console.log("🔓 UNLOCKED +1 =>", progress.unlocked);
        }

        // save
        if (userId) {
            await setDoc(doc(db, "progreso", userId + "_productos"), progress);
            console.log("💾 GUARDADO EN FIREBASE");
        } else {
            console.log("🚫 NO userId");
        }

        aplicarProgreso();
        actualizarBtnVentas();
    });
});

function aplicarProgreso() {

    console.log("🔁 APLICANDO PROGRESO:", progress);

    markers.forEach(marker => {

        const order = Number(marker.dataset.order);
        const indicator = marker.querySelector(".marker-indicator");

        const isLocked = order > progress.unlocked;
        const isVisited = Array.isArray(progress.visited_producto)
            ? progress.visited_producto.includes(marker.id)
            : false;

        marker.classList.remove("locked", "visited_producto", "show");

        if (isLocked) {
            marker.classList.add("locked");
            if (indicator) indicator.style.display = "none";
            return;
        }

        marker.classList.add("show");

        if (isVisited) {
            marker.classList.add("visited_producto");
        }

        if (!indicator) return;

        // 🧠 REGLA FINAL MUÑEQUITA
        const shouldShow =
            marker.id === progress.lastVisited ||
            (!progress.lastVisited && order === progress.unlocked);

        indicator.style.display = shouldShow ? "block" : "none";

        console.log(
            "🎯 marker:", marker.id,
            "| lastVisited:", progress.lastVisited,
            "| show:", shouldShow
        );
    });
}
function actualizarBtnVentas() {

    if (!btnVentas) {
        console.log("🚫 btnVentas no existe en DOM");
        return;
    }

    const shouldShow =
        progress.lastVisited === "mark_13";

    console.log("🎯 BTN VENTAS CHECK:", {
        unlocked: progress.unlocked,
        lastVisited: progress.lastVisited,
        shouldShow
    });

    if (shouldShow) {
        btnVentas.classList.add("show");
        btnVentas.style.display = "block";
        btnVentas.style.opacity = "1";
        btnVentas.style.visibility = "visible";
    } else {
        btnVentas.classList.remove("show");
        btnVentas.style.display = "none";
    }
}
const introModal = document.getElementById("introModal");
const closeIntro = document.getElementById("closeIntro");

// Mostrar siempre al cargar
window.addEventListener("load", () => {
    introModal.classList.add("active");
});

// Cerrar modal
closeIntro.addEventListener("click", () => {
    introModal.classList.remove("active");
});

// Cerrar si da click afuera
introModal.addEventListener("click", (e) => {
    if (e.target === introModal) {
        introModal.classList.remove("active");
    }
});
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

/* ==========================================
   AUTH RÁPIDO
========================================== */
onAuthStateChanged(auth, async (user) => {

    // =========================
    // ❌ SIN SESIÓN
    // =========================
    if (!user) {
        userId = null;
        cargoUsuario = "";

        renderGuest();

        // 🔥 IMPORTANTE: mostrar modal SOLO una vez
        if (!document.getElementById("modal_auth")) {
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
            doc(db, "progreso", user.uid + "_productos")
        );

        if (progressSnap.exists()) {

            const data = progressSnap.data();

            progress = {
                unlocked: data.unlocked ?? 1,
                visited_producto: Array.isArray(data.visited_producto)
                    ? data.visited_producto
                    : [],
                lastVisited: data.lastVisited ?? null
            };

        }

        console.log("👤 cargoUsuario:", cargoUsuario);
        console.log("📥 progress:", progress);

    } catch (error) {
        console.error("❌ Error en auth:", error);
    }

    // =========================
    // UI UPDATE
    // =========================
    if (typeof aplicarEstadoCargos === "function") {
        aplicarEstadoCargos();
    }

    aplicarProgreso();
    actualizarBtnVentas?.();
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