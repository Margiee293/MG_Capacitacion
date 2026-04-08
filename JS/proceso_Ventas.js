/* ===============================
   CONFIGURACIÓN POR MARKER
================================ */

const markerContent = {
    mark_1: {
        title: "MG5",
        items: [
            {
                label: "📄 MG5 2024 Y MG5 2025",
                type: "pdf",
                src: "./../../INFO/MG 5/MG5.pdf#toolbar=0&navpanes=0&scrollbar=0"
            }
        ]
    },
    mark_2: {
        title: "MG3",
        items: [
            {
                label: "📄 Manual MG3",
                type: "pdf",
                src: "./../../INFO/MG 3/PG MG 3.pdf#toolbar=0&navpanes=0&scrollbar=0"
            }
        ]
    },
    mark_3: {
        title: "MG7",
        items: [
            {
                label: "📄 Manual MG7",
                type: "pdf",
                src: "./../../INFO/MG 7/PG MG 7.pdf#toolbar=0&navpanes=0&scrollbar=0"
            }
        ]
    },
    mark_4: {
        title: "LS7",
        items: [
            {
                label: "📄 Manual LS7",
                type: "pdf",
                src: "./../../INFO/IM LS7/IM LS7.pdf#toolbar=0&navpanes=0&scrollbar=0"
            }
        ]
    },
    mark_5: {
        title: "MG RX9",
        items: [
            {
                label: "📄 Manual MG RX9",
                type: "pdf",
                src: "./../../INFO/MG RX9/PG MG RX9.pdf#toolbar=0&navpanes=0&scrollbar=0"
            }
        ]
    },
    mark_6: {
        title: "MG ZS 2026",
        items: [
            {
                label: "📄 Manual MG ZS 2026",
                type: "pdf",
                src: "./../../INFO/MG ZS/PG MG ZS.pdf#toolbar=0&navpanes=0&scrollbar=0"
            }
        ]
    },
    mark_7: {
        title: "LUCKY 7",
        items: [
            {
                label: "📄 LUCKY 7",
                type: "pdf",
                src: "./../../INFO/LUCKY 7/LUCKY 7.pdf#toolbar=0&navpanes=0&scrollbar=0"
            }
        ]
    },
    mark_8: {
        title: "PROCESO ADMINISTRATIVO",
        items: [
            {
                label: "📄 PROCESO ADMINISTRATIVO",
                type: "video",
                src: "./../../INFO/PROCESO ADMINISTRATIVO/ADMON_OCTAVIO.mp4"
            }
        ]
    },

};

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
    if (data.items.length === 1) {
        cargarContenido(data.items[0].type, data.items[0].src);
    } else {
        viewer.innerHTML =
            `<p class="selecciona">Selecciona un elemento del temario</p>`;
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

    if (type === "pdf") {
        viewer.innerHTML = `<iframe src="${src}"></iframe>`;
    }

    if (type === "img") {
        viewer.innerHTML = `<img src="${src}" alt="">`;
    }

    if (type === "video") {
        viewer.innerHTML = `
      <video autoplay controls>
        <source src="${src}" type="video/mp4">
      </video>
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
   PROGRESO CON LOCALSTORAGE
================================ */

const TOTAL_MARKERS = 8;
const markers = document.querySelectorAll(".marker-wrapper");

let progress = JSON.parse(localStorage.getItem("markersProgress")) || {
    unlocked: 1,
    visited: []
};

/* ===============================
   INICIALIZAR ESTADO
================================ */

markers.forEach(marker => {
    const order = Number(marker.dataset.order);
    const indicator = marker.querySelector(".marker-indicator");

    // 🔒 Bloqueados
    if (order > progress.unlocked) {
        marker.classList.add("locked");
        if (indicator) indicator.style.display = "none";
    }
    // 🔓 Desbloqueados
    else {
        marker.classList.remove("locked");

        // 👁️ Mostrar indicador si NO ha sido visitado
        if (
            indicator &&
            !progress.visited.includes(marker.id)
        ) {
            indicator.style.display = "block";
        }
    }

    // ✅ Visitados
    if (progress.visited.includes(marker.id)) {
        marker.classList.add("visited");

        // ❌ Ocultar indicador excepto marker 8
        if (indicator && order !== 8) {
            indicator.style.display = "none";
        }
    }
});

/* ===============================
   CLICK EN MARKERS
================================ */

markers.forEach(marker => {
    marker.addEventListener("click", () => {
        const order = Number(marker.dataset.order);
        const indicator = marker.querySelector(".marker-indicator");

        // ⛔ No permitir click si está bloqueado
        if (marker.classList.contains("locked")) return;

        // 🟢 Abrir modal
        abrirModal(marker);

        // ===============================
        // MARCAR VISITADO
        // ===============================
        if (!progress.visited.includes(marker.id)) {
            progress.visited.push(marker.id);
            marker.classList.add("visited");

            // ❌ Ocultar indicador (excepto 8)
            if (indicator && order !== 8) {
                indicator.style.display = "none";
            }
        }

        // ===============================
        // DESBLOQUEAR SIGUIENTE
        // ===============================
        if (order === progress.unlocked && order < TOTAL_MARKERS) {
            progress.unlocked++;

            const next = document.querySelector(
                `.marker-wrapper[data-order="${progress.unlocked}"]`
            );

            if (next) {
                next.classList.remove("locked");

                const nextIndicator = next.querySelector(".marker-indicator");
                if (nextIndicator) {
                    nextIndicator.style.display = "block";
                }
            }
        }

        // 💾 Guardar progreso
        localStorage.setItem(
            "markersProgress",
            JSON.stringify(progress)
        );
    });
});
