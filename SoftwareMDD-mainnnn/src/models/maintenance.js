const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  implemento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Implemento',
    required: true,
  },
  estado: {
    type: String,
    enum: ['En Mantenimiento', 'Disponible'],
    required: true,
    default: 'En Mantenimiento',
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  observaciones: {
    type: String,
  },
});


module.exports = mongoose.model('Maintenance', MaintenanceSchema);




///