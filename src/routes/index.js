const express = require("express");
const mongoose = require("mongoose");
//const { Router } = require("express");
//const bcrypt = require("bcrypt");
//const router = Router();
const api = express.Router();

const jwt = require("jsonwebtoken");
mongoose.set("useCreateIndex", true);

//const User = require("../models/User");
//const { verifyToken } = require("../verify/verification");
const {
    registrarUsuario,
    holaMundo,
    loginUsuario,
    verTareasPublicas,
    tareasPrivadas,
    verProfile
} = require("../controllers/userController");

//saludo
api.get("/", holaMundo);

//registrar usuario
api.post("/signup", registrarUsuario);

//login
api.post("/signin", loginUsuario);

//ver tareas publicas
api.get("/tasks", verTareasPublicas);

//ruta de prueba que simulara datos privados
api.get("/private-tasks", verifyToken, tareasPrivadas);

api.get("/profile", verifyToken, verProfile);

module.exports = api;

//verifica en cada ruta el token
function verifyToken(req, res, next) {
    //console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send("Aunthorize request");
    }
    //separamos lo que viene en authorization como si fuera un arreglo
    const token = req.headers.authorization.split(" ")[1];

    if (token === "null") {
        return res.status(401).send("Aunthorize request");
    }

    //si pasa las validaciones anteriores , viniendo un token
    //verifico el token que me pasan
    //se verifica con llave
    //se obtiene datos que vienen en el token
    const payload = jwt.verify(token, "secretkey");
    //console.log(payload);
    req.userId = payload._id;
    next();
}