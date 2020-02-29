require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function holaMundo(req, res, next) {
    try {
        await res.send("Hello world!!");
    } catch (e) {
        res.status(500).send({ message: e.message });
        next();
    }
}
async function registrarUsuario(req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        const newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            role
        });

        await newUser.save();

        //una vez guardado en la bd el usuario creo un token
        const token = jwt.sign({ _id: newUser._id }, "secretkey");
        res.status(201).json({ token, usuario: newUser });
    } catch (e) {
        res.status(500).send({ message: e.message });
        next();
    }
}
async function loginUsuario(req, res, next) {
    try {
        const { email, password } = req.body;

        //si se ecuentra ese correo se guarda en una constante
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send("El correo no existe");

        //se comprueba si la contraseña recibida es igual a la encontrada
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).send("Contraseña incorrecta");

        //se devuelve un token, si los datos son correctos
        //_id: user._id
        const token = jwt.sign({
                usuario: user
            },
            process.env.SEED_AUTENTICACION, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            },
            "secretkey"
        );

        //cuando el usuario hace login se devuelve
        return res.status(200).json({ usuario: user, token });
    } catch (e) {
        res.status(500).send({ message: e.message });
        next();
    }
}

async function verTareasPublicas(req, res, next) {
    try {
        await res.json([{
                _id: 1,
                name: "Task One",
                description: "lorem ipsum",
                date: "2020-02-21T04:32:46.970Z"
            },
            {
                _id: 2,
                name: "Task two",
                description: "lorem ipsum",
                date: "2020-02-21T04:32:46.970Z"
            },
            {
                _id: 3,
                name: "Task three",
                description: "lorem ipsum",
                date: "2020-02-21T04:32:46.970Z"
            }
        ]);
    } catch (e) {
        res.status(500).send({ message: e.message });
        next();
    }
}

async function tareasPrivadas(req, res, next) {
    try {
        await res.json([{
                _id: 1,
                name: "Task One",
                description: "lorem ipsum",
                date: "2020-02-21T04:32:46.970Z"
            },
            {
                _id: 2,
                name: "Task two",
                description: "lorem ipsum",
                date: "2020-02-21T04:32:46.970Z"
            },
            {
                _id: 3,
                name: "Task three",
                description: "lorem ipsum",
                date: "2020-02-21T04:32:46.970Z"
            }
        ]);
    } catch (e) {
        res.status(500).send({ message: e.message });
        next();
    }
}

async function verProfile(req, res, next) {
    try {
        await res.send(req.userId);
    } catch (e) {
        res.status(500).send({ message: e.message });
        next();
    }
}
module.exports = {
    registrarUsuario,
    holaMundo,
    loginUsuario,
    verTareasPublicas,
    tareasPrivadas,
    verProfile
};