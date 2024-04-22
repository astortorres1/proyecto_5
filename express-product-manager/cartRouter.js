//cartrouter.js
const express = require('express');
const router = express.Router();
const CartController = require('./CartController');

// Ruta raíz para crear un nuevo carrito
router.post('/', CartController.createCart);

// Ruta para obtener productos de un carrito por ID de carrito
router.get('/:cid', CartController.getCartProducts);

// Ruta para agregar un producto a un carrito por ID de carrito y ID de producto
router.post('/:cid/product/:pid', CartController.addProductToCart);

module.exports = router;
