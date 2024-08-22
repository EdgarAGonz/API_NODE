// Importa el módulo 'express' para crear el servidor y manejar rutas
const express = require('express');

// Importa las funciones 'register' y 'login' del controlador de autenticación
const { register, login, resourceOwnerPasswordGrant, authorizationCodeGrant } = require('../controllers/authController');

// Crea una nueva instancia del enrutador de Express
const router = express.Router();

// Define una ruta POST para '/register' que llama a la función 'register'
router.post('/register', register);

// Define una ruta POST para '/login' que llama a la función 'login'
router.post('/login', login);

router.post('/token', resourceOwnerPasswordGrant);

router.post('/authorize', authorizationCodeGrant);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;