const mongoose = require("mongoose");

async function connectDb({ host, port, dbName }) {
    //se destructura para obtener informacion de variables disponible
    const url = `mongodb://${host}:${port}/${dbName}`;

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
}
module.exports = connectDb;
/*mongoose
    .connect("mongodb://localhost/angular-auth", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

.then(db => console.log("Database is Connected!!"))
    .catch(err => console.log(err));*/