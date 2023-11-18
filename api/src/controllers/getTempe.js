// require('dotenv').config();
// const { Temperaments } = require('../db');
// const axios = require('axios')
// const { API_KEY } = process.env;
// const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// const getTempe = async (req, res) => {
//     try {
//         const response = await axios.get(`${URL}`);
//         if (response.data) {
//             const alldogs = response.data
//             const alltempe = await alldogs.map(dog => dog.temperaments? dog.temperaments.flatMap(tempe => tempe ? tempe.split(',') : []): 'No tiene temperamentos')
            
//             for (const temperamento of alltempe) {
//                 await Temperaments.findOrCreate({
//                     where: { name: temperamento },
//                 })}
            
//             }
            
//             res.status(200).json({ message: `Temperamentos agregados a la base de datos.` });
//     } catch (error) {
//         res.status(500).json({ message: `ERROR: ${error}`});
//     }
// }

// module.exports = getTempe;


// const axios = require('axios');
// const { API_KEY } = process.env;
// const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// const getTempe = async (req, res) => {
//     try {
//         const response = await axios.get(URL);
        
//         if (response.data) {
//             const allDogs = response.data;
//             const allTemperaments = allDogs.flatMap(dog => dog.temperaments ? dog.temperaments.flatMap(tempe => tempe ? tempe.split(',') : []) : []);

//             const uniqueTemperaments = Array.from(new Set(allTemperaments));
            
//             const promises = uniqueTemperaments.map(async (temperamento) => {
//                 const [temperament, created] = await Temperaments.findOrCreate({
//                     where: { name: temperamento },
//                 });
//                 return temperament;
//             });

//             await Promise.all(promises);

//             res.status(200).json({ message: `Temperamentos agregados a la base de datos.` });
//         }
//     } catch (error) {
//         res.status(500).json({ message: `ERROR: ${error}` });
//     }
// };

// module.exports = getTempe;


const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getTempe = async (req, res) => {
    try {
        // Realiza una solicitud a la API externa para obtener datos de razas de perros
        const response = await axios.get(URL);
        
        if (response.data) {
            // Obtiene la lista completa de razas de perros desde la respuesta de la API
            const allDogs = response.data;

            // Extrae los temperamentos de todas las razas y los almacena en un array
            const allTemperaments = allDogs.flatMap(dog => dog.temperaments ? dog.temperaments.flatMap(tempe => tempe ? tempe.split(',') : []) : []);

            // Elimina duplicados de los temperamentos
            const uniqueTemperaments = Array.from(new Set(allTemperaments));
            
            // Itera sobre los temperamentos únicos y los agrega a la base de datos si no existen
            const promises = uniqueTemperaments.map(async (temperamento) => {
                const [temperament, created] = await Temperaments.findOrCreate({
                    where: { name: temperamento },
                });
                return temperament;
            });

            // Espera a que se completen todas las promesas de agregar temperamentos a la base de datos
            await Promise.all(promises);

            // Respuesta exitosa indicando que se han agregado los temperamentos a la base de datos
            res.status(200).json({ message: `Temperamentos agregados a la base de datos.` });
        }
    } catch (error) {
        // En caso de error, se manejan los errores y se envía una respuesta de error
        res.status(500).json({ message: `ERROR: ${error}` });
    }
};

module.exports = getTempe;