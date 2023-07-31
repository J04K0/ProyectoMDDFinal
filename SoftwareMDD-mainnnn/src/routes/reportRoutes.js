const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Ruta para generar un informe
router.get('/reports', reportController.generateReport);


module.exports = router;




