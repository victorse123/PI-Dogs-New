const { Dogs, Temperaments } = require('../db');

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
            const [dogs, created] = await Dog.findOrCreate({
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
                console.log('Perro creado:', dog.name);
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

