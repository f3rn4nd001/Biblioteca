const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const libroNuevo = new Schema({
    nombreLibro: { type: String, required: true },
    autor: { type: String, required: true },
    editorialLibro: { type: String, required: true },
    tipoLibro: { type: String, required: true },
    numeroPaginas: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Libro', libroNuevo)