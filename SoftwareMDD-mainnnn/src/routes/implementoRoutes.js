const express = require('express');
const router = express.Router();
const Implemento = require('../models/implemento');
const { getAllImplementos, getAllImplementosByEstado } = require("../controllers/implementoController")

// Ruta para registrar un nuevo implemento

router.post('/implementos', async (req, res) => {
    try {
      const { descripcion, categoria, estado, numeroSerie } = req.body;
  
      // Crear un nuevo Implemento
      const nuevoImplemento = new Implemento({
        descripcion,
        categoria,
        estado,
        numeroSerie
      });
  
      // Guardar el Implemento en la base de datos
      await nuevoImplemento.save();
  
      res.status(200).json({ message: 'Implemento agregado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al Ingresar Implemento', error });
    }
  });


// busca un implemento (por el parametro estado) 
//modificable para cualquier parametro

router.get('/implementos/buscar', async (req, res) => {
    const { estado } = req.query;
    const implementos = await getAllImplementosByEstado(estado);
    res.json(implementos)
})


//busca y muestra todos los implementos 
router.get('/implementos', async (req, res) => {
    const implementos = await getAllImplementos();
    res.json(implementos)

})

//busca los implementos por la ide de la base de datos
router.get('/implementos/:id', async (req, res) => {
    const { id } = req.params
    const implemento = await Implemento.findById(id)
    res.json(implemento)

})

//elimina implementos por su _id de mongos
router.delete('/implementos/:id', async (req, res) => {
    const { id } = req.params
    const implemento = await Implemento.findByIdAndDelete(id)
    res.json(implemento)

})





module.exports = router;