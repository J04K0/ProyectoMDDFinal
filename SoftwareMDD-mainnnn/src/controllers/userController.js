const User = require('../models/User');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      password,
      role,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};