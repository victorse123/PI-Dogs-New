const { Dog, Temperament } = require('../models/relations')
const {fn, where, col, Op} = require("sequelize")

const findDogs = async ({name}) => {
    try {
    const resp = await fetch(process.env.URI_API)
    const data = await resp.json()

    const arrApi = data.map(dog => {
        let life = dog.life_span?.split(' ')
        let height_min = Number(dog.height.metric.split(" - ")[0]) 
        let height_max = Number(dog.height.metric.split(" - ")[1]) 
        let weight_min = Number(dog.weight.metric.split(" - ")[0]) 
        let weight_max = Number(dog.weight.metric.split(" - ")[1]) 
        let life_span_min = Number(life[0])
        let life_span_max = Number(life[2]) 
        let temperament = dog.temperament?.split(',').map(t => t.trim())

        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            origin: "externo",
            height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, temperament
        }
    })
        //SI NO VIENE UN NAME EN REQ QUERY ENTREGO TODOS LOS DOGS
    if(!name) {
        const doge = await Dog.findAll({
            include: {model: Temperament}
        })
        return [...doge, ...arrApi]
    }

        // SI VIENE NAME, AGREGO WHERE AL FINDALL, AMBOS CASOS INCLUYO EL MODELO DE TEMPERAMENTOS
    const minusc = name.toLowerCase()
    const doge = await Dog.findAll({
        where: {
            // nombre: where(fn("LOWER", col('nombre')), "LIKE", `%${minusc}%`)
            name: {
                [Op.iLike]: `%${minusc}%`
            }
        },
        include: { 
            model: Temperament
            },
        })
    if(!doge) throw `No se hallo resultado ${name}`
    return doge

    } catch (error) {
        throw error
    }
}

const findDogById = async (id) => {
    try {        
        //BUSCAR EN DATA API
        const resp = await fetch(process.env.URI_API)
        const data = await resp.json()
        if(!isNaN(Number(id))){
            const findApi = data.find(dog => dog.id === Number(id))
            let life = findApi?.life_span?.split(' ')
            let height_min = Number(findApi?.height?.metric.split(" - ")[0]) 
            let height_max = Number(findApi?.height?.metric.split(" - ")[1]) 
            let weight_min = Number(findApi?.weight?.metric.split(" - ")[0]) 
            let weight_max = Number(findApi?.weight?.metric.split(" - ")[1]) 
            let life_span_min = Number(life[0])
            let life_span_max = Number(life[2])
            let temperament = findApi.temperament?.split(',').map(t => t.trim())
            const formatted = {
                id: findApi.id,
                name: findApi.name,
                image: findApi.image.url,
                origin: "externo",
                height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, temperament
            }
            if(findApi) return formatted
        }

        //BUSCAR EN BD
        const doge = await Dog.findByPk(id, {
            include: { 
                model: Temperament
                },
        })
        return doge
    } catch (error) {
        console.log(error)
        throw `Raza con id: ${id} no hallada`
    }
}

const newBreedDog = async ({name, image, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, arrTemperamentsId}) => {
    try {
        if(!name || !image || !height_min || !height_max || !weight_min || !weight_max || !life_span_min || !life_span_max) throw 'Faltan datos'
        const doge = await Dog.create({
            origin: "database",
            name, 
            imagen, 
            height_min, 
            height_max, 
            weight_min, 
            weight_max, 
            life_span_min, 
            life_span_max, 
            arrTemperamentsId
        })
        if(arrTemperamentsId && arrTemperamentsId.length > 0) {
            const addDogTemperament = await doge.addTemperament(arrTemperamentsId)
            console.log(addDogTemperament)
            if(addDogTemperament.length === 0) throw 'No'
        }
        return doge
    } catch (error) {
        throw error
    }
}

const updateDataDog = async ({id}, {name,  height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, arrTemperamentsId}) => {
    try{
        console.log(id)
        const findUsr = await Dog.findByPk(id)
        if(!findUsr) throw 'Dog no hallado'
        findUsr.name = name
        return findUsr.save()
    } catch (error) {
        throw error
    }
}

const removeDog = async ({id}) => {
    try {
        const removeDog = await Dog.destroy({where: {id}})
        return removeDog
    } catch (error) {
        throw error
    }
}
module.exports = {findDogs, findDogById, newBreedDog, updateDataDog, removeDog}