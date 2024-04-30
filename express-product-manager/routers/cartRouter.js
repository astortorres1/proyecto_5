const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.post('/', cartController.createCart);
router.get('/:cartId/products', cartController.getCartProducts);
router.post('/:cartId/products', cartController.addProductToCart);

module.exports = router;
