/* ===============================
   CONFIGURACIÓN POR MARKER
================================ */

const markerContent = {
    mark_1: {
        title: "Bienvenida e Interacción con el Cliente",
        items: [
            {
                label: "📄 Bienvenida e Interacción con el Cliente",
                type: "pdf",
                src: "./../../INFO/BIENVENIDA/bienvenida.pdf"
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
    },
    mark_3: {
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
    mark_4: {
        title: "Alta de Cliente Global",
        items: [
            {
                label: "📄 Alta de Cliente Global",
                type: "pdf",
                src: "./../../INFO/ALTA CLIENTE/alta.pdf"
            }
        ]
    },
    mark_5: {
        title: "Pago y Validación en Tesorería",
        items: [
            {
                label: "📄 Pago y Validación",
                type: "pdf",
                src: "./../../INFO/PAGO Y VALIDACION/pago.pdf"
            }
        ]
    },
    mark_6: {
        title: "Apartado del Vehículo",
        items: [
            {
                label: "📄 Manual Operativo Apartado del Vehículo",
                type: "pdf",
                src: "./../../INFO/APARTADO VEHICULO/apartado.pdf"
            }
        ]
    },
    mark_7: {
        title: "Intercambio",
        items: [
            {
                label: "📄 Manual Operativo Proceso de Intercambios",
                type: "pdf",
                src: "./../../INFO/INTERCAMBIO/intercambio.pdf"
            }
        ]
    },
    mark_8: {
        title: "Facturación y PLD",
        items: [
            {
                label: "📄 Manual Operativo Administrativo de Ventas",
                type: "pdf",
                src: "./../../INFO/FACTURACION/facturacion.pdf"
            },
            {
                label: "📄 Proceso de Facturación",
                type: "video",
                src: "https://drive.google.com/file/d/1dBKQsbxhSISlwt3QWsoE-0jjeZkEIgKU/preview"
            }
        ]

    },
    mark_9: {
        title: "SALE-U",
        items: [
            {
                label: "📄 Introducción a SALE-U",
                type: "pdf",
                src: "./../../INFO/SALEU/introduccion.pdf"
            },
            {
                label: "📄 Guía de Uso Básico de SALE-U",
                type: "pdf",
                src: "./../../INFO/SALEU/guia_uso.pdf"
            },
            {
                label: "📄 Seguimiento para Ciclo de Compra",
                type: "pdf",
                src: "./../../INFO/SALEU/seguimiento.pdf"
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

const TOTAL_MARKERS = 9;
const markers = document.querySelectorAll(".marker-wrapper");

let progress = {
    unlocked: 1,
    visited: []
};

/* ===============================
   INICIALIZAR ESTADO
================================ */

markers.forEach(marker => {
    const order = Number(marker.dataset.order);

    if (order > progress.unlocked) {
        marker.classList.add("locked");
    } else {
        marker.classList.remove("locked");
    }

    if (progress.visited.includes(marker.id)) {
        marker.classList.add("visited");
    }
});

/* ===============================
   CLICK EN MARKERS
================================ */

markers.forEach(marker => {
    marker.addEventListener("click", () => {
        const order = Number(marker.dataset.order);

        if (marker.classList.contains("locked")) return;

        abrirModal(marker);

        // ✅ Marcar visitado
        if (!progress.visited.includes(marker.id)) {
            progress.visited.push(marker.id);
            marker.classList.add("visited");
        }

        // 🔓 Desbloquear siguiente
        if (order === progress.unlocked && order < TOTAL_MARKERS) {
            progress.unlocked++;

            const next = document.querySelector(
                `.marker-wrapper[data-order="${progress.unlocked}"]`
            );

            if (next) {
                next.classList.remove("locked");
            }
        }

    });
});