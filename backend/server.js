const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors());
app.use(express.json());

const db = admin.firestore();

app.post("/crear-usuario", async (req, res) => {

    console.log("📥 POST /crear-usuario recibido");
    console.log("Body:", req.body);

    try {

        const { email, password, cargo } = req.body;

        console.log("📌 Email:", email);
        console.log("📌 Cargo:", cargo);

        const user = await admin.auth().createUser({
            email: email,
            password: password
        });

        console.log("✅ Usuario creado:", user.uid);

        /* GUARDAR USUARIO */
        await db.collection("usuarios").doc(user.uid).set({
            email: email,
            cargo: cargo
        });

        console.log("✅ Documento usuario creado");

        /* ===============================
           PROGRESO SEGÚN CARGO
        =============================== */

        if (cargo.toLowerCase() === "vendedor") {

            await db.collection("progreso").doc(user.uid + "_productos").set({
                unlocked: 1,
                completados: []
            });

            console.log("✅ progreso_productos creado");

            await db.collection("progreso").doc(user.uid + "_ventas").set({
                unlocked: 1,
                completados: []
            });

            console.log("✅ progreso_ventas creado");
        }

        else if (cargo.toLowerCase() === "recepcion") {

            await db.collection("progreso").doc(user.uid + "_recepcion").set({
                unlocked: 1,
                completados: []
            });

            console.log("✅ progreso_recepcion creado");
        }

        else if (cargo.toLowerCase() === "financiamiento") {

            await db.collection("progreso").doc(user.uid + "_financiamiento").set({
                unlocked: 1,
                completados: []
            });

            console.log("✅ progreso_financiamiento creado");
        }

        else {
            console.log("⚠️ Cargo no reconocido:", cargo);
        }

        res.json({
            ok: true,
            mensaje: "Usuario creado correctamente"
        });

    } catch (error) {

        console.error("❌ ERROR EN /crear-usuario");
        console.error(error);

        let mensaje = "Error al crear usuario";

        if (error.code === "auth/email-already-exists") {
            mensaje = "Usuario ya existente";
        }

        if (error.code === "auth/invalid-password") {
            mensaje = "Contraseña demasiado débil";
        }

        if (error.code === "auth/invalid-email") {
            mensaje = "Correo inválido";
        }

        res.status(500).json({
            ok: false,
            mensaje
        });
    }
});

/* ==========================================
   EDITAR EMAIL
========================================== */
app.post("/editar-email", async (req, res) => {

    try {

        const { uid, email } = req.body;

        await admin.auth().updateUser(uid, {
            email: email
        });

        await db.collection("usuarios").doc(uid).update({
            email: email
        });

        res.json({
            ok: true,
            mensaje: "Correo actualizado"
        });

    } catch (error) {

        console.error(error);

        let mensaje = "Error al actualizar correo";

        if (error.code === "auth/email-already-exists") {
            mensaje = "Usuario ya existente";
        }

        if (error.code === "auth/invalid-email") {
            mensaje = "Correo inválido";
        }

        res.status(500).json({
            ok: false,
            mensaje
        });
    }
});

/* ==========================================
   EDITAR PASSWORD
========================================== */
app.post("/editar-password", async (req, res) => {

    try {

        const { uid, password } = req.body;

        await admin.auth().updateUser(uid, {
            password: password
        });

        res.json({
            ok: true,
            mensaje: "Contraseña actualizada"
        });

    } catch (error) {

        console.error(error);

        let mensaje = "Error al actualizar contraseña";

        if (error.code === "auth/invalid-password") {
            mensaje = "La contraseña debe tener mínimo 6 caracteres";
        }

        res.status(500).json({
            ok: false,
            mensaje
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor activo en puerto " + PORT);
});