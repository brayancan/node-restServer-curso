const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roleValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un ROL válido'
}

let Schema = mongoose.Schema;


let usuariochema = new Schema({
    nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  email: {
    type: String,
    index: {unique: true},
    required: [true, "El correo es necesario"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es necesaria"],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: roleValidos
  },
  estado: {
    type: Boolean,
    //required: [true]
    default: true,
  },
    google: {
    type: Boolean,
    default: false,
  },
});

usuariochema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuariochema.plugin( uniqueValidator, {message: '{PATH} Debe de ser unico'})

module.exports = mongoose.model(  'Usuario', usuariochema  );

