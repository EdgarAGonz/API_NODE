// Importa el módulo 'jsonwebtoken' para crear y verificar tokens JWT
const jwt = require('jsonwebtoken');

// Exporta una función middleware para verificar tokens JWT
module.exports = (req, res, next) => {
    // Obtiene el token del encabezado 'Authorization' de la solicitud
    const token = req.header('Authorization');
    // Si no hay token, responde con un estado 401 (no autorizado) y un mensaje de error
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Verifica el token usando la clave secreta almacenada en las variables de entorno
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Asigna el usuario decodificado al objeto de solicitud para su uso posterior
        req.user = decoded.user;
        // Llama a la siguiente función middleware en la cadena
        next();
    } catch (err) {
        // Si el token no es válido, responde con un estado 401 y un mensaje de error
        res.status(401).json({ message: 'Token is not valid' });
    }
};
