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


const { Dog, Temperaments } = require('../db');

const postDogs = async (req, res) => {
    const { image, name, height_min, height_max, weight_min, weight_max, life_span, temperament } = req.body;

    try {
        // Validación de los datos requeridos y su tipo
        if (
            image &&
            name &&
            typeof height_min === 'number' &&
            typeof height_max === 'number' &&
            typeof weight_min === 'number' &&
            typeof weight_max === 'number' &&
            typeof life_span === 'string' &&
            temperament
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
                return res.status(200).json('Se agregó con éxito a ' + dog.name);
            } else {
                return res.status(400).json({ message: 'Ya existe un perro con estos datos.' });
            }
        } else {
            return res.status(400).json({ message: 'Datos inválidos o faltantes.' });
        }
    } catch (error) {
        // Manejo de errores específicos
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación de datos.' });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Ya existe un perro con este nombre.' });
        } else {
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
};

module.exports = postDogs;