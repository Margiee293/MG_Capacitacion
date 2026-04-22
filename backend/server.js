const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors());
app.use(express.json());

const db = admin.firestore();

/* ==========================================
   CREAR USUARIO
========================================== */
app.post("/crear-usuario", async (req, res) => {
    console.log("POST /crear-usuario");

    try {

        const { email, password, cargo } = req.body;

        const user = await admin.auth().createUser({
            email: email,
            password: password
        });

        /* SOLO GUARDA EMAIL Y CARGO */
        await db.collection("usuarios").doc(user.uid).set({
            email: email,
            cargo: cargo
        });

        /* PROGRESO */
        await db.collection("progreso").doc(user.uid + "_productos").set({
            unlocked: 1,
            completados: []
        });

        await db.collection("progreso").doc(user.uid + "_ventas").set({
            unlocked: 1,
            completados: []
        });

        res.json({
            ok: true,
            mensaje: "Usuario creado correctamente"
        });

    } catch (error) {

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

app.listen(3000, () => {
    console.log("Servidor activo en puerto 3000");
});