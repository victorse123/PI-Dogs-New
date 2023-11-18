// const { Router } = require('express');
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
// const getDogs = require('../controllers/getDogs')
// const getIdRaza = require('../controllers/getIdRaza')
// const getName = require('../controllers/getName')
// const postDogs = require('../controllers/postDogs')

// const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
// router.get('/dogs', getDogs);
// router.get('/dogs/:idRaza', getIdRaza);
// router.get('/name', getName);
// router.post('/dogs', postDogs)

// module.exports = router;

const { Router } = require('express');
const router = Router();

// Importar controladores directamente en las rutas para manejar cada endpoint
router.get('/dogs', require('../controllers/getDogs')); // Endpoint para obtener todos los perros
router.get('/dogs/:idRaza', require('../controllers/getIdRaza')); // Endpoint para obtener detalles de un perro por ID
router.get('/name', require('../controllers/getName')); // Endpoint para buscar perros por nombre
router.post('/dogs', require('../controllers/postDogs')); // Endpoint para agregar un perro

module.exports = router;