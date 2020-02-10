const { Router } = require('express');
const bcrypt = require('bcrypt');
const router = Router();

const jwt = require('jsonwebtoken')

const User = require('../models/User');

router.get('/', (req, res) => res.send('Hello world!!'))

router.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password: bcrypt.hashSync(password, 10) });
    await newUser.save()

    //una vez guardado en la bd el usuario creo un token
    const token = jwt.sign({ _id: newUser._id }, 'secretKey')

    res.status(200).json({ token })
})

//login
router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    //si se ecuentra ese correo se guarda en una constante
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send('El correo no existe')
        //se comprueba si la contraseña recibida es igual a la encontrada
    if (!bcrypt.compareSync(password, user.password)) return res.status(400).send('Contraseña incorrecta');
    //se devuelve un token
    const token = jwt.sign({ _id: user._id }, 'secretKey')
        //cuando el usuario hace login se devuelve
    return res.status(200).json({ token })
})
module.exports = router;