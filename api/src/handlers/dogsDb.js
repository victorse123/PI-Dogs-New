// const { Dog , Temperaments } = require('../db')

// const dogsDB = async () => {

//     const allDogs = await Dog.findAll({
//         include: {
//             model: Temperaments,
//             attributes: ["name"],
//             through: { attributes: [] },
//           }
//     })

//     return allDogs;
// }

// module.exports = dogsDB;

const dogsAPI = require("../handlers/dogsAPI");
const dogsDB = require('../handlers/dogsDb');

const getDogs = async () => {
    try {
        const dogsApi = await dogsAPI();
        const dogsDb = await dogsDB();
        const allDogs = [...dogsApi, ...dogsDb];

        if (allDogs.length > 0) {
            return allDogs;
        } else {
            throw new Error('No se encontraron perros.');
        }
    } catch (error) {
        throw new Error('Hubo un error al obtener la información: ' + error);
    }
};

module.exports = dogsDB;