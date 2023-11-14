const { Dog , Temperaments } = require('../db')

const dogsDB = async () => {

    const allDogs = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: { attributes: [] },
          }
    })

    return allDogs;
}

module.exports = dogsDB;