const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();

const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.get("/", (req, res) => res.send("Hello world!!"));

//registrar usuario
router.post("/signup", async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password: bcrypt.hashSync(password, 10) });
    await newUser.save();

    //una vez guardado en la bd el usuario creo un token
    const token = jwt.sign({ _id: newUser._id }, "secretkey");

    res.status(200).json({ token });
});

//login
router.post("/signin", async(req, res) => {
    const { email, password } = req.body;
    //si se ecuentra ese correo se guarda en una constante
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("El correo no existe");
    //se comprueba si la contraseña recibida es igual a la encontrada
    if (!bcrypt.compareSync(password, user.password))
        return res.status(400).send("Contraseña incorrecta");
    //se devuelve un token, si los datos son correctos
    const token = jwt.sign({ _id: user._id }, "secretkey");
    //cuando el usuario hace login se devuelve
    return res.status(200).json({ token });
});

//ver tareas publicas
router.get("/tasks", (req, res) => {
    res.json([{
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
});

//ruta de prueba que simulara datos privados
router.get("/private-tasks", verifyToken, (req, res) => {
    res.json([{
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
});

router.get("/profile", verifyToken, (req, res) => {
    res.send(req.userId);
});
module.exports = router;

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