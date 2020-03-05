require("dotenv").config();
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
    try {

        // jwtTokent = req.header('Authorization')
        if (!req.headers.authorization) {
            return res.status(401).send("Aunthorize request2");
        }
        //separamos lo que viene en authorization como si fuera un arreglo
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token)
        if (token === "null") {
            return res.status(401).send("Aunthorize request3");
        }

        //si pasa las validaciones anteriores , viniendo un token
        //verifico el token que me pasan
        //se verifica con llave
        //se obtiene datos que vienen en el token
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        //console.log(payload);
        if (!payload) {
            return res.status(401).send('Unauhtorized Request2020');
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).send('Unauhtorized Request3');

    }
}