const express = require("express");
const app = express();

require("./database");
//va a poder entender los json
app.use(express.json());

//todas las rutas van a comenzar con /api
app.use("/api", require("./routes/index"));

app.listen(3000);

console.log("Server on port", 3000);