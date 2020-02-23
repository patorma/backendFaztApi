const config = {
    //se configura puerto de la aplicacion(variables de entorno)
    appConfig: {
        port: process.env.APP_PORT
    },
    //configuracion base de datos(variables de entorno)
    dbConfig: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME
    }
};

module.exports = config;