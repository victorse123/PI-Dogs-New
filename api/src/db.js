require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const dogModel = require('../src/models/Dog');
const temperamentModel = require('../src/models/Temperament');

const basename = path.basename(__filename);
// Configuración de la conexión a la base de datos
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // Evita mostrar los logs de las consultas SQL
  native: false, // Usa pg-native para aumentar la velocidad (opcional)
});

// Arreglo para almacenar los definidores de modelos
const modelDefiners = [];

// Lectura de archivos de modelos y definición de los mismos
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Asociación de la conexión con los modelos y capitalización de los nombres
modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructuración de los modelos para usar en las relaciones
const { Dog, Temperament } = sequelize.models;

// Definición de las relaciones entre los modelos
Dog.belongsToMany(Temperament, { through: 'dog_temperament', timestamps: false });
Temperament.belongsToMany(Dog, { through: 'dog_temperament', timestamps: false });

// Exportación de los modelos y la conexión para ser utilizados en otros archivos
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};