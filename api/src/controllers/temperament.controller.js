const { Temperament, Dog } = require('../models/relations')
const { where, fn, col } = require('sequelize')

const newTemp = async ({name}) => {
    try {
        if(!name) throw 'Falta nombre de temperamento'
        const data = await Temperament.create({name})
        return data
    } catch (error) {
        throw error
    }
} 

const allTemps = async ({temperamento}) => {
    try {
        const resultadoApi = await getApiData()
        if(!resultadoApi) throw 'No se obtener datos de la API'
        if(temperamento){
            const temps = await Temperament.findAll({
                include: {
                    model: Dog,
                    attributes: ["id", "nombre"]
                },
                where: {
                    name: where(fn("LOWER", col('name')), "LIKE", `%${temperamento.toLowerCase()}%`)
                }
            })
            if(temps.length === 0) throw `Temperamento  ${temperamento} no encontrado`
            return temps
        }

        const temperaments = await Temperament.findAll({
            include: {
                model: Dog,
                attributes: ["id", "nombre"]
            }
        })
        return temperaments
    } catch (error) {
        throw error
    }
}

const getApiData = async () => {
    try {
    const resApi = await fetch(process.env.URI_API)
        const dataApi = await resApi.json()
        const temperamentos = []

        dataApi.forEach(dogApi => {
            if(dogApi.temperament){
                let temps = dogApi.temperament.split(',')
                temps.forEach(temp => {
                    const limpio = temp.trim()
                    if(!temperamentos.includes(limpio)) temperamentos.push(limpio)
                })
            }
        })

        const bulkTemps = temperamentos.map(t => {
            return {name: t}
        })

        const oneTemp = await Temperament.findOne({where: bulkTemps[bulkTemps.length - 1]})

        if(!oneTemp){
            await Temperament.bulkCreate(bulkTemps)
            return true
            // return `Data importada desde ${process.env.URI_API} exitosamente. 👌`
        }
        return true
        return 'La informacion se cargo en la base de datos, revisar /temperaments'
    } catch (error) {
        throw `Ocurrió un error al extraer la informacion desde la api: ${process.env.URI_API}`
    }
}
module.exports = { newTemp, allTemps, getApiData}