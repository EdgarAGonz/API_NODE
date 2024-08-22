// Importa el módulo 'axios' para hacer solicitudes HTTP
const axios = require('axios');

// Importa el módulo 'qs' para serializar datos
const qs = require('qs');

// Define una función asíncrona para obtener el token de Spotify
const getSpotifyToken = async () => {
    try {
        // Obtiene las credenciales del cliente desde las variables de entorno
        const client_id = process.env.SPOTIFY_CLIENT_ID;
        const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

        // Codifica las credenciales en base64
        const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

        // Hace una solicitud POST a la API de Spotify para obtener el token
        const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
            grant_type: 'client_credentials'
        }), {
            headers: {
                'Authorization': `Basic ${token}`, // Añade el token codificado en los encabezados
                'Content-Type': 'application/x-www-form-urlencoded' // Especifica el tipo de contenido
            }
        });

        // Retorna el token de acceso desde la respuesta
        return response.data.access_token;
    } catch (error) {
        // Muestra un mensaje de error en la consola si ocurre un problema
        console.error('Error obtaining Spotify token:', error);
        // Lanza el error para que pueda ser manejado por el llamador de la función
        throw error;
    }
};

// Exporta la función 'getSpotifyToken' para que pueda ser utilizada en otras partes de la aplicación
module.exports = { getSpotifyToken };