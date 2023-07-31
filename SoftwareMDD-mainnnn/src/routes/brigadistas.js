const express = require('express');
const router = express.Router();
const Brigadista = require('../models/brigadista');

// Ruta para registrar un nuevo brigadista
router.post('/brigadistas', async (req, res) => {
  try {
    const { nombre, apellido, edad, correo } = req.body;

    // Crear un nuevo brigadista
    const nuevoBrigadista = new Brigadista({
      nombre,
      apellido,
      edad,
      correo
    });

    // Guardar el brigadista en la base de datos
    await nuevoBrigadista.save();

    res.status(200).json({ message: 'Brigadista registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar brigadista' });
  }
});

module.exports = router;
