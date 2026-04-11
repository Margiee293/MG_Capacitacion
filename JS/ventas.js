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
                src: "./../../INFO/MG 3/PG MG 3.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Ficha Técnica MG 3",
                type: "pdf",
                src: "./../../INFO/MG 3/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG 3",
                type: "pdf",
                src: "./../../INFO/MG 3/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    },
    mark_2: {
        title: "MG 3 HEV",
        items: [
            {
                label: "📄 Ficha Técnica MG 3 HEV",
                type: "pdf",
                src: "./../../INFO/MG 3 HEV/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG 3 HEV",
                type: "pdf",
                src: "./../../INFO/MG 3 HEV/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    },
    mark_3: {
        title: "MG 5",
        items: [
            {
                label: "📄 MG 5 2024 Y MG 5 2025",
                type: "pdf",
                src: "./../../INFO/MG 5/MG5.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Ficha Técnica MG 5",
                type: "pdf",
                src: "./../../INFO/MG 5/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            }
        ]
    },
    mark_4: {
        title: "MG 7",
        items: [
            {
                label: "📄 Manual MG 7",
                type: "pdf",
                src: "./../../INFO/MG 7/PG MG 7.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Ficha Técnica MG 7",
                type: "pdf",
                src: "./../../INFO/MG 7/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG 7",
                type: "pdf",
                src: "./../../INFO/MG 7/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    },

    mark_5: {
        title: "MG ZS Y ZS HYBRID",
        items: [
            {
                label: "📄 Manual MG ZS Y ZS HYBRID 2026",
                type: "pdf",
                src: "./../../INFO/MG ZS/PG MG ZS.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Ficha Técnica MG ZS Y ZS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG ZS/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG ZS Y ZS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG ZS/catalogo.pdf#toolbar=0&navpanes=0"
            }

        ]
    },

    mark_6: {
        title: "MG RX9",
        items: [
            {
                label: "📄 Manual MG RX9",
                type: "pdf",
                src: "./../../INFO/MG RX9/PG MG RX9.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Ficha Técnica MG RX9",
                type: "pdf",
                src: "./../../INFO/MG RX9/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG RX9",
                type: "pdf",
                src: "./../../INFO/MG RX9/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    },

    mark_7: {
        title: "MG 4 ELECTRIC",
        items: [
            {
                label: "📄 Ficha Técnica MG 4 ELECTRIC",
                type: "pdf",
                src: "./../../INFO/MG 4 ELECTRIC/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG 4 ELECTRIC",
                type: "pdf",
                src: "./../../INFO/MG 4 ELECTRIC/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    },
    mark_8: {
        title: "MG IM LS7",
        items: [
            {
                label: "📄 Manual LS7",
                type: "pdf",
                src: "./../../INFO/MG IM LS7/IM LS7.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Ficha Técnica MG IM LS7",
                type: "pdf",
                src: "./../../INFO/MG IM LS7/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG IM LS7",
                type: "pdf",
                src: "./../../INFO/MG IM LS7/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    },
    mark_9: {
        title: "MG CYBERTESTER",
        items: [
            {
                label: "📄 Ficha Técnica MG CYBERTESTER",
                type: "pdf",
                src: "./../../INFO/MG CYBERTESTER/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG CYBERTESTER",
                type: "pdf",
                src: "./../../INFO/MG CYBERTESTER/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    },
    mark_10: {
        title: "MG HS, HS PHEV Y HS HYBRID",
        items: [
            {
                label: "📄 Ficha Técnica MG HS, HS PHEV Y HS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG HS/ficha_tecnica.pdf#toolbar=0&navpanes=0"
            },
            {
                label: "📄 Catálogo MG HS, HS PHEV Y HS HYBRID",
                type: "pdf",
                src: "./../../INFO/MG HS/catalogo.pdf#toolbar=0&navpanes=0"
            }
        ]
    }
};

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

    if (data.items.length === 1) {
        cargarContenido(data.items[0].type, data.items[0].src);
    } else {
        viewer.innerHTML = `<p class="selecciona">Selecciona un elemento del temario</p>`;
    }

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

    if (type === "pdf") viewer.innerHTML = `<iframe src="${src}"></iframe>`;
    if (type === "img") viewer.innerHTML = `<img src="${src}" alt="">`;
    if (type === "video") viewer.innerHTML = `<video autoplay controls><source src="${src}" type="video/mp4"></video>`;
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
const TOTAL_MARKERS = 10;
const markers = document.querySelectorAll(".marker-wrapper");

// 👉 YA NO se usa localStorage
let progress = {
    unlocked: 1,
    visited: []
};

// ❌ Ya no se mantiene al recargar
// if (progress.visited.includes("mark_10")) btnVentas.classList.add("show");

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

        if (indicator && !progress.visited.includes(marker.id)) {
            indicator.style.display = "block";
        }
    }

    // Visitados
    if (progress.visited.includes(marker.id)) {
        marker.classList.add("visited");
        marker.classList.add("show");

        if (indicator && order !== 10) indicator.style.display = "none";
    }
});

/* ===============================
   CLICK EN MARKERS
================================ */
markers.forEach(marker => {
    marker.addEventListener("click", () => {
        const order = Number(marker.dataset.order);
        const indicator = marker.querySelector(".marker-indicator");

        if (marker.classList.contains("locked")) return;

        abrirModal(marker);

        // ✅ Marcar visitado
        if (!progress.visited.includes(marker.id)) {
            progress.visited.push(marker.id);
            marker.classList.add("visited");
            marker.classList.add("show");

            if (indicator && order !== 10) indicator.style.display = "none";
        }

        // 🔓 Desbloquear siguiente
        if (order === progress.unlocked && order < TOTAL_MARKERS) {
            progress.unlocked++;

            const next = document.querySelector(
                `.marker-wrapper[data-order="${progress.unlocked}"]`
            );

            if (next) {
                next.classList.remove("locked");
                next.classList.add("show");

                const nextIndicator = next.querySelector(".marker-indicator");
                if (nextIndicator) nextIndicator.style.display = "block";
            }
        }

        // ❌ ELIMINADO localStorage

        // Mostrar botón ventas solo al 10 (solo en esta sesión)
        if (order === 10) btnVentas.classList.add("show");
    });
});

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