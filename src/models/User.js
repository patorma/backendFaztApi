const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const rolesValidos = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} no es role válido"
};
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    role: {
        type: String,
        default: "USER",
        required: [true],
        enum: rolesValidos
    }
}, {
    timestamps: true
});
// elimina la key password del objeto que retorna al momento de crear un usuario
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
userSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser único"
});

module.exports = model("User", userSchema, 'users');