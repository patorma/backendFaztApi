require("dotenv").config();
const app = require("./src/app");

const connectDb = require("./src/db/database");

//destructuring
const { appConfig, dbConfig } = require("./config");

//se controla los errores de la bd
async function initApp(appConfig, dbConfig) {
    try {
        //inicia la conexion
        await connectDb(dbConfig);
        app.listen(appConfig.port, () =>
            console.log(`listen on ${appConfig.port}`)
        );
        console.log("Conectado a MongoDb");
        console.log(`puerto de mongodb ${dbConfig.port}`);
    } catch (e) {
        console.log(e);
        console.log("No se ha conectado a MongoDb");
    }
}

//ejecutamos initApp
initApp(appConfig, dbConfig);