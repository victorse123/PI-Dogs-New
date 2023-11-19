const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dog', {
    // ID único para cada perro, generado automáticamente al crear un perro
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // Generar UUID automáticamente al crear un perro
    },
    // Nombre del perro, no puede ser nulo
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Altura mínima del perro, no puede ser nula
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Peso mínimo del perro, no puede ser nulo
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Altura máxima del perro, no puede ser nula
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Peso máximo del perro, no puede ser nulo
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Esperanza de vida mínima del perro (opcional)
    life_span_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Esperanza de vida máxima del perro (opcional)
    life_span_max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // URL de la imagen del perro (opcional)
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Indica si el perro fue creado en la base de datos (predeterminado: true)
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};