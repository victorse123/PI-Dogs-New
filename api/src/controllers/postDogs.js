// const { Dog, Temperaments } = require('../db')

// const postDogs = async (req, res) => {
//     const { image, 
//             name,
//             height_min,
//             height_max,
//             weight_min,
//             weight_max,
//             life_span,
//             temperament
//          } = req.body
//     try {
//         if(image&&name&&height_max&&height_min&&weight_max&&weight_min&&life_span_max&&life_span_min&&temperament){
//             const [ dog , creado ] = await Dog.findOrCreate({
                
//                 where: { image, 
//                     name,
//                     height_min,
//                     height_max,
//                     weight_min,
//                     weight_max,
//                     life_span,
//                     temperament }
            
//             });
//             if(creado){
                

//                 res.status(200).json('Se agrego con exito a '+dog.name);}
//         }else{
//             res.status(404).json({message:'Faltan datos'})
//         }
        
//     } catch (error) {
//         res.status(500).json({message:error})
//     }
// }

// module.exports = postDogs;


// const { Dog, Temperaments } = require('../db');

// const postDogs = async (req, res) => {
//     const { image, name, height_min, height_max, weight_min, weight_max, life_span, temperament } = req.body;

//     try {
        
//         // Validación de los datos requeridos y su tipo
//         const isValidTemperament = /^[a-zA-Z]+(?:,[a-zA-Z]+)*$/.test(temperament);

//         if (
//             image &&
//             name &&
//             typeof height_min === 'number' &&
//             typeof height_max === 'number' &&
//             typeof weight_min === 'number' &&
//             typeof weight_max === 'number' &&
//             typeof life_span === 'string' &&
//             isValidTemperament
//         ) {
//             const [dog, created] = await Dog.findOrCreate({
//                 where: {
//                     image,
//                     name,
//                     height_min,
//                     height_max,
//                     weight_min,
//                     weight_max,
//                     life_span,
//                     temperament,
//                 },
//             });

//             if (created) {
//                 return res.status(200).json('Se agregó con éxito a ' + dog.name);
//             } else {
//                 return res.status(400).json({ message: 'Ya existe un perro con estos datos.' });
//             }
//         } else {
//             return res.status(400).json({ message: 'Datos inválidos o faltantes.' });
//         }
//     } catch (error) {
//         // Manejo de errores específicos
//         if (error.name === 'SequelizeValidationError') {
//             return res.status(400).json({ message: 'Error de validación de datos.' });
//         } else if (error.name === 'SequelizeUniqueConstraintError') {
//             return res.status(400).json({ message: 'Ya existe un perro con este nombre.' });
//         } else {
//             return res.status(500).json({ message: 'Error interno del servidor.' });
//         }
//     }
// };

// module.exports = postDogs;



const { Dog, Temperaments } = require('../db');

const postDogs = async (req, res) => {
    const { image, name, height_min, height_max, weight_min, weight_max, life_span, temperament } = req.body;

    try {
        // Validación del formato del campo "temperament" usando expresión regular
        const isValidTemperament = /^[a-zA-Z]+(?:,[a-zA-Z]+)*$/.test(temperament);

        // Constantes para mensajes
        const successMessage = 'Se agregó con éxito a ';
        const errorMessage = {
            invalidData: 'Datos inválidos o faltantes.',
            duplicateDog: 'Ya existe un perro con estos datos.',
            validationError: 'Error de validación de datos.',
            uniqueConstraintError: 'Ya existe un perro con este nombre.',
            serverError: 'Error interno del servidor.'
        };

        if (
            image &&
            name &&
            typeof height_min === 'number' &&
            typeof height_max === 'number' &&
            typeof weight_min === 'number' &&
            typeof weight_max === 'number' &&
            typeof life_span === 'string' &&
            isValidTemperament
        ) {
            const [dog, created] = await Dog.findOrCreate({
                where: {
                    image,
                    name,
                    height_min,
                    height_max,
                    weight_min,
                    weight_max,
                    life_span,
                    temperament,
                },
            });

            if (created) {
                return res.status(200).json(successMessage + dog.name);
            } else {
                return res.status(400).json({ message: errorMessage.duplicateDog });
            }
        } else {
            return res.status(400).json({ message: errorMessage.invalidData });
        }
    } catch (error) {
        // Manejo de errores específicos
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: errorMessage.validationError });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: errorMessage.uniqueConstraintError });
        } else {
            return res.status(500).json({ message: errorMessage.serverError });
        }
    }
};

module.exports = postDogs;