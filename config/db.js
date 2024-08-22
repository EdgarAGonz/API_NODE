// Importa el módulo 'mongoose' para interactuar con MongoDB
const mongoose = require('mongoose');

// Importa el módulo 'dotenv' para manejar variables de entorno
const dotenv = require('dotenv');

// Carga las variables de entorno desde un archivo .env
dotenv.config();

// Define una función asíncrona para conectar a la base de datos MongoDB
const connectDB = async () => {
    try {
        // Intenta conectar a MongoDB usando la URI almacenada en la variable de entorno MONGO_URI
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Usa el nuevo analizador de URL
            useUnifiedTopology: true, // Usa el nuevo motor de administración de conexiones
        });
        // Si la conexión es exitosa, imprime un mensaje en la consola
        console.log('MongoDB connected');
    } catch (error) {
        // Si hay un error en la conexión, imprime el error en la consola
        console.error('Error connecting to MongoDB:', error.message);
        // Termina el proceso con un código de error
        process.exit(1);
    }
};

// Exporta la función connectDB para que pueda ser utilizada en otros archivos
module.exports = connectDB;
