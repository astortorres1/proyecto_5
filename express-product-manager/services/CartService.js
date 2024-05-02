const Cart = require('./models/Cart');

class CartService {
  static async getCartById(cartId) {
    return await Cart.getById(cartId);
  }

  static async addProductToCart(cartId, productId) {
    return await Cart.addProductToCart(cartId, productId);
  }

  static async getCartProducts(cartId) {
    const cart = await Cart.getById(cartId);
    return await cart.getCartProducts();
  }
}

module.exports = CartService;


