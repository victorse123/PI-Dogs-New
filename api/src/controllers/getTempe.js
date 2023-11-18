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


const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getTempe = async (req, res) => {
    try {
        const response = await axios.get(URL);
        
        if (response.data) {
            const allDogs = response.data;
            const allTemperaments = allDogs.flatMap(dog => dog.temperaments ? dog.temperaments.flatMap(tempe => tempe ? tempe.split(',') : []) : []);

            const uniqueTemperaments = Array.from(new Set(allTemperaments));
            
            const promises = uniqueTemperaments.map(async (temperamento) => {
                const [temperament, created] = await Temperaments.findOrCreate({
                    where: { name: temperamento },
                });
                return temperament;
            });

            await Promise.all(promises);

            res.status(200).json({ message: `Temperamentos agregados a la base de datos.` });
        }
    } catch (error) {
        res.status(500).json({ message: `ERROR: ${error}` });
    }
};

module.exports = getTempe;