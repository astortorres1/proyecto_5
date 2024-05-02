const Cart = require('../models/cart');

class CartController {
  async createCart(req, res) {
    const newCart = new Cart(null, req.body.userId);
    const savedCart = await Cart.add(newCart);
    res.json(savedCart);
  }

  async getCartProducts(req, res) {
    const cart = await Cart.getById(req.params.cartId);
    const products = await cart.getCartProducts();
    res.json(products);
  }

  async addProductToCart(req, res) {
    const added = await Cart.addProductToCart(req.params.cartId, req.body.productId);
    res.json({ success: added });
  }
}

module.exports = new CartController();
