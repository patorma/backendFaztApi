const express = require("express");

const cors = require("cors");

const app = express();

const usuario = require("./routes/index");

app.use(cors());
//va a poder entender los json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", usuario);
//require("./database");

//todas las rutas van a comenzar con /api
//app.use("/api", require("./routes/index"));

//app.listen(3000);

//console.log("Server on port", 3000);

module.exports = app;