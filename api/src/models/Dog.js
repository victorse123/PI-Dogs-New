const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life_span_min:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    life_span_max:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: true,
      
    }
  });
};
