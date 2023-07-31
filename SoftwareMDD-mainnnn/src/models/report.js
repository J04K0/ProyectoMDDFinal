// Importa el módulo 'mongoose' para crear la conexión a la base de datos
const mongoose = require('mongoose');

// Crea el esquema de la colección 'informes'
const reportSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    implemento: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
});

// Crea el modelo de datos 'informe' a partir del esquema 'usuarioSchema'
const report = mongoose.model('report', usuarioSchema);

// Exporta el modelo de datos 'informe'
module.exports = report;
