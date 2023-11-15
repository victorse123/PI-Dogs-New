// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//     // defino el modelo
//     sequelize.define('Temperament', {

//         id: {
//             type: DataTypes.INTEGER,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             allowNull: false,
//             autoIncrement: true
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         }
//     }, {timestamps: false})
// };


const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Temperaments", {
    
    id:{
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }

    }, {timestamps: false});
};