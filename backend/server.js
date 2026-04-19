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


app.post("/crear-usuario", async (req, res) => {
    console.log("POST /crear-usuario");
    try {

        const { email, password, cargo } = req.body;

        const user = await admin.auth().createUser({
            email: email,
            password: password
        });

        await db.collection("usuarios").doc(user.uid).set({
            email: email,
            cargo: cargo
        });

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

app.post("/editar-email", async (req, res) => {
    console.log("POST /editar-usuario");
    try {
        const { uid, email } = req.body;

        await admin.auth().updateUser(uid, {
            email
        });

        await db.collection("usuarios").doc(uid).update({
            email
        });

        res.json({ ok: true });

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

        res.status(500).json({ error: error.message });
    }
});

app.post("/editar-password", async (req, res) => {
    try {
        const { uid, password } = req.body;

        await admin.auth().updateUser(uid, {
            password
        });

        res.json({ ok: true });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log("Servidor activo en puerto 3000");
});