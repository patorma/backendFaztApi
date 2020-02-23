const jwt = require("jsonwebtoken");

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
module.exports = verifyToken;