// Importa el módulo 'mongoose' para interactuar con MongoDB
const mongoose = require('mongoose');
// Importa el módulo 'bcryptjs' para encriptar contraseñas
const bcrypt = require('bcryptjs');

// Define el esquema del modelo de usuario con 'username' y 'password'
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Campo 'username' de tipo String, requerido y único
    password: { type: String, required: true }, // Campo 'password' de tipo String y requerido
});

// Middleware que se ejecuta antes de guardar un documento de usuario
UserSchema.pre('save', async function (next) {
    // Si la contraseña no ha sido modificada, pasa al siguiente middleware
    if (!this.isModified('password')) {
        return next();
    }
    // Genera una sal (salt) para encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    // Encripta la contraseña usando la sal generada
    this.password = await bcrypt.hash(this.password, salt);
    // Pasa al siguiente middleware
    next();
});

// Exporta el modelo 'User' basado en el esquema 'UserSchema'
module.exports = mongoose.model('User', UserSchema);
