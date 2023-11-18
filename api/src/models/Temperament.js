// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//     // defino el modelo
//     sequelize.define('Temperament', {

//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             allowNull: false,
//             autoIncrement: true
//         },
//         name: {
//             type: DataTypes.STRING,
//             unique: true
//         }
//     }, {timestamps: false})
// };

const { DataTypes } = require('sequelize');

// Definición del modelo Temperament utilizando Sequelize
module.exports = (sequelize) => {
    // Definición del modelo con dos campos: id y name
    sequelize.define('Temperament', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true, // Asegura que cada nombre de temperamento sea único en la base de datos
            allowNull: false // Garantiza que el nombre no sea nulo
        }
    }, {
        timestamps: false // Evita la generación de timestamps automáticamente
    });
};