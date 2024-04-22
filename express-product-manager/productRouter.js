//productRouter.js
const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

// Ruta raíz para obtener todos los productos
router.get('/', ProductController.getAllProducts);

// Ruta para obtener un producto por ID
router.get('/:pid', ProductController.getProductById);

// Ruta para agregar un nuevo producto
router.post('/', ProductController.addProduct);

// Ruta para actualizar un producto por ID
router.put('/:pid', ProductController.updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/:pid', ProductController.deleteProduct);

module.exports = router;
