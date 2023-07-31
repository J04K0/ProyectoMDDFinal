const Implemento = require('../models/implemento');

// Controlador para crear un nuevo implemento
const createImplemento = async (req, res) => {
  try {
    const { descripcion, categoria, estado, numeroSerie } = req.body;

    // Crear un nuevo implemento
    const nuevoImplemento = new Implemento({
      descripcion,
      categoria,
      estado,
      numeroSerie,
    });

    // Guardar el implemento en la base de datos
    await nuevoImplemento.save();

    res.status(200).json({ message: 'Implemento registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar implemento' });
  }
};

// Controlador para obtener todos los implementos
const getAllImplementos = async () => {
    const implementos = await Implemento.find();
    return implementos;
};

// Otros controladores para la gestión de implementos (actualizar, eliminar, etc.)
// ...

//puras weas

const getAllImplementosByEstado = async (estado) => {
  const implementos = await Implemento.find({ estado });
  return implementos;
};

module.exports = {
  getAllImplementos,
  getAllImplementosByEstado
}
