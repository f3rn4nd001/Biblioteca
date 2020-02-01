const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const usuarioNuevo = new Schema({
    tipo: { type: Object, required: true },
    telefono: { type: Number, required: true },
    nombre: { type: String, required: true },
    numerocontrol: { type: Number, required: true },
    escuelaProcedencia: { type: String, required: true },
    apellido: { type: String, required: true },
    calle: { type: String, required: true },
    numExt: { type: Number, required: true },
    colonia: { type: String, required: true },
    cp: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Usuario', usuarioNuevo)