const express = require('express');
const router = express.Router();
const Implemento = require('../models/implemento');

// Ruta para obtener el inventario completo
router.get('/inventory', async (req, res) => {
  try {
    // Obtener todos los implementos de la base de datos

    res.status(200).json({ inventory });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inventario' });
  }
});

module.exports = router;
