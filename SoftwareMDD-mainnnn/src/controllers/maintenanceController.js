const Maintenance = require('../models/Maintenance');
const Implemento = require('../models/Implemento');

// ENVIAR ELEMENTO A MANTENIMIENTO
exports.enviarMantenimiento = async (req, res) => {
  try {
    const { implementoId, observaciones } = req.body;

    const implemento = await Implemento.findById(implementoId);

    if (!implemento) {
      return res.status(404).json({ message: 'No se encontró el implemento.' });
    }

    if (implemento.estado !== 'Disponible') {
      return res.status(400).json({ message: 'El implemento no está disponible para mantenimiento.' });
    }

    const maintenance = new Maintenance({
      implemento: implementoId,
      estado: 'En Mantenimiento',
      observaciones: observaciones || '',
    });

    await maintenance.save();

    // IMPLEMENTO A ESTADO NO DISPONIBLE
    implemento.estado = 'No Disponible';
    await implemento.save();

    res.json({ message: 'Implemento enviado a mantenimiento exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al enviar el implemento a mantenimiento.' });
  }
};

// FUNCION DE LA DISPONIBILIDAD DE UN IMPLEMENTO EN MANTENCION
exports.marcarDisponible = async (req, res) => {
  try {
    const { implementoId } = req.body;

    const maintenance = await Maintenance.findOne({ implemento: implementoId });

    if (!maintenance) {
      return res.status(404).json({ message: 'No se encontró el implemento en mantenimiento.' });
    }

    // EVALUACION PREVIA A LA DISPONIBILIDAD
    const implemento = await Implemento.findById(implementoId);
    const evaluacionExitosa = await realizarEvaluacion(implemento);

    if (!evaluacionExitosa) {
      return res.status(400).json({ message: 'No se han realizado las reparaciones necesarias en el implemento.' });
    }

    // IMPLEMENTO A DISPONIBLE
    implemento.estado = 'Disponible';
    await implemento.save();

    // ELIMINAR ENTRADA DE MANTENIMIENTO
    await maintenance.remove();

    // REGISTRO DE ACCION 
    await registrarOperacionMantenimiento(implemento, 'Disponible');

    res.json({ message: 'Implemento marcado como disponible exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al marcar el implemento como disponible.' });
  }
};

// FUNCION DE EVALUACION DE IMPLEMENTOS
async function realizarEvaluacion(implemento) {
  //EVALUACION DE REPARACION
  const reparacionesRealizadas = implemento.reparacionesRealizadas || [];
  const reparacionesNecesarias = implemento.reparacionesNecesarias || [];

  // COMPARACION DE EVALUACIONES 
  const evaluacionExitosa = reparacionesNecesarias.every(reparacion => reparacionesRealizadas.includes(reparacion));

  return evaluacionExitosa;
}

// REGISTRO DE OPERACIONES DE MANTENIMIENTO
async function registrarOperacionMantenimiento(implemento, estado) {
  const operacion = {
    implemento: implemento._id,
    fecha: new Date(),
    estado: estado,
  };

  implemento.historial.push(operacion);
  await implemento.save();
}

module.exports = {
  enviarMantenimiento,
  marcarDisponible,
};


//