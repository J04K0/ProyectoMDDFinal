const mongoose = require('mongoose');

const implementoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  numeroSerie: {
    type: String,
    required: true,
  },
  asignadoA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fechaMantenimiento: Date,
});

const Implemento = mongoose.model('implemento', implementoSchema);

module.exports = Implemento;
