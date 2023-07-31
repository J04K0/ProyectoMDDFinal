const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientoController');
//rutas por funciones


// Enviar implemento a mantencion
router.post('/enviar-mantenimiento', mantenimientoController.enviarMantenimiento);

// Marcar implemento como estado : disponible
router.post('/marcar-disponible', mantenimientoController.marcarDisponible);

// Enviar implemento a evaluacion
router.get('/evaluar-implementos', mantenimientoController.evaluarImplementos);

// Enviar registro de mantencion
router.post('/registrar-operacion', mantenimientoController.registrarOperacion);

module.exports = router;
//