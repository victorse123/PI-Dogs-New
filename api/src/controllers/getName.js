// const axios = require('axios');
// const { Sequelize } = require('sequelize');
// require('dotenv').config();
// const { API_KEY } = process.env;
// const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
// const { Dog } = require('../db')



// const getName = async (req, res) => {
//     try {
        
//         const { name } = req.query;
        

//         if(name){

//             const response = await axios.get(`${URL}`)
//             if(response.data){
//                 const apiList = response.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
//                 const dbList = await Dog.findAll({

//                     where:{
//                         name:{
//                             [Sequelize.Op.iLike]: `%${name}%`

//                         }
//                     }
//                 })
                
//                 if (apiList.length > 0) {
//                     const allDogs = [...apiList, ...dbList]
//                     res.status(200).json(allDogs)
//                 }
//             }
//             } else {
//                 res.status(404).json({ message: 'No se encuentra esta raza' })
//             }
//     } catch (error) {
//         res.status(500).json({ message: error })
//     }
// }


// module.exports = getName


const axios = require('axios');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const { Dog } = require('../db');

const getName = async (req, res) => {
    try {
        // Extrae el parámetro de nombre de la consulta
        const { name } = req.query;

        if (name) {
            // Realiza una solicitud a la API externa para obtener datos de razas de perros
            const response = await axios.get(`${URL}`);
            
            if (response.data) {
                // Filtra las razas de la API basadas en el nombre proporcionado, sin importar mayúsculas o minúsculas
                const apiList = response.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
                
                // Busca en la base de datos local las razas que coincidan con el nombre proporcionado
                const dbList = await Dog.findAll({
                    where: {
                        name: {
                            [Sequelize.Op.iLike]: `%${name}%`
                        }
                    }
                });

                // Si se encuentra alguna coincidencia en la API, combina los resultados de la API y la base de datos
                if (apiList.length > 0) {
                    const allDogs = [...apiList, ...dbList];
                    res.status(200).json(allDogs);
                }
            }
        } else {
            // Si no se proporciona un nombre, envía un mensaje de error indicando que no se encontró la raza
            res.status(404).json({ message: 'No se encuentra esta raza' });
        }
    } catch (error) {
        // En caso de error, se envía una respuesta de error con el mensaje del error
        res.status(500).json({ message: error });
    }
};

module.exports = getName;