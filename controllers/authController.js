// Importa el módulo 'jsonwebtoken' para crear y verificar tokens JWT
const jwt = require('jsonwebtoken');

// Importa el módulo 'bcryptjs' para encriptar y comparar contraseñas
const bcrypt = require('bcryptjs');

// Importa el modelo de usuario desde el archivo correspondiente
const User = require('../models/userModel');

// Define y exporta la función 'register' para registrar nuevos usuarios
exports.register = async (req, res) => {
    // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;
    try {
        // Crea una nueva instancia del modelo de usuario con los datos proporcionados
        const user = new User({ username, password });
        // Guarda el nuevo usuario en la base de datos
        await user.save();
        // Responde con un estado 201 (creado) y un mensaje de éxito
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        // Si ocurre un error, responde con un estado 500 (error del servidor) y el mensaje de error
        res.status(500).json({ error: err.message });
    }
};

// Define y exporta la función 'login' para autenticar usuarios
exports.login = async (req, res) => {
    // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;
    try {
        // Busca un usuario en la base de datos con el nombre de usuario proporcionado
        const user = await User.findOne({ username });
        // Si no se encuentra el usuario, responde con un estado 400 (solicitud incorrecta) y un mensaje de error
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        // Si las contraseñas no coinciden, responde con un estado 400 y un mensaje de error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Si las credenciales son válidas, crea un token JWT con el ID del usuario y una expiración de 1 hora
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // Responde con el token JWT
        res.json({ token });
    } catch (err) {
        // Si ocurre un error, responde con un estado 500 y el mensaje de error
        res.status(500).json({ error: err.message });
    }
};

// Implementar Resource Owner Password Grant
exports.resourceOwnerPasswordGrant = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Implementar Authorization Code Grant
exports.authorizationCodeGrant = async (req, res) => {
    const { code } = req.body;
    try {
        // Aquí deberías intercambiar el código por un token de acceso
        const token = jwt.sign({ code }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
