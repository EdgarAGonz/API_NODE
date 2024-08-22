// Importa el módulo 'express' para crear el servidor
const express = require('express');

// Importa el módulo 'body-parser' para manejar datos JSON en las solicitudes
const bodyParser = require('body-parser');

// Importa el módulo 'dotenv' para manejar variables de entorno
const dotenv = require('dotenv');

// Importa las rutas de autenticación
const authRoutes = require('./routes/authRoutes');

// Importa la función para conectar a la base de datos
const connectDB = require('./config/db');

// Configura dotenv para usar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Crea una instancia de la aplicación Express
const app = express();

// Usa body-parser para manejar datos JSON en las solicitudes
app.use(bodyParser.json());

// Usa las rutas de autenticación bajo el prefijo '/api/auth'
app.use('/api/auth', authRoutes);

// Define el puerto en el que el servidor escuchará, usando una variable de entorno o el puerto 5000 por defecto
const PORT = process.env.PORT || 5000;

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
