const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Ruta para obtener el inventario
router.get('/inventory', inventoryController.getInventory);

// Ruta para actualizar el inventario
router.put('/inventory/:id', inventoryController.updateInventory);

module.exports = router;
