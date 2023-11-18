// require('dotenv').config();
// const { Sequelize } = require('sequelize');
// const fs = require('fs');
// const path = require('path');
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// const dog = require('../src/models/Dog');
// const temperament = require('../src/models/Temperament');

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
// const basename = path.basename(__filename);

// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);

// // En sequelize.models están todos los modelos importados como propiedades
// // Para relacionarlos hacemos un destructuring
// const { Dog, Temperament } = sequelize.models;

// // Aca vendrian las relaciones
// // Product.hasMany(Reviews);
// Dog.belongsToMany(Temperament, {through: "dog_temperament" , timestamps: false});
// Temperament.belongsToMany(Dog, {through: "dog_temperament" , timestamps: false});

// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
// };

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const dogModel = require('../src/models/Dog');
const temperamentModel = require('../src/models/Temperament');

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