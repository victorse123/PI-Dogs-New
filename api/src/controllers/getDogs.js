// require('dotenv').config();
// const axios = require('axios');
// const { API_KEY } = process.env;
// const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


// const getDogs = async (req, res) => {

//     const response = await axios.get(`${URL}`)
    
//     try {
//         if(response.data){
//             res.status(200).json(response.data)
//         }
        
//     } catch (error) {
//         res.status(404).json({message:error})
//     }

// }

// module.exports = getDogs;


require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getDogs = async (req, res) => {
    try {
        // Realiza una solicitud a la API externa para obtener datos de razas de perros
        const response = await axios.get(URL);
        
        // Manejar errores HTTP fuera del rango 200-299
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        // Manejar respuestas sin datos o datos en un formato incorrecto
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('No se recibieron datos válidos de razas de perros');
        }

        // Procesar y enviar los datos en caso de éxito
        const dogData = response.data;
        res.status(200).json(dogData);
    } catch (error) {
        // Manejar errores de red, errores de la API, y otros errores inesperados
        res.status(500).json({ message: `Error al obtener datos de razas de perros: ${error.message}` });
    }
};

module.exports = getDogs;