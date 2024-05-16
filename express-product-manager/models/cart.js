//models/cart.js
class Cart {
  constructor(id, userId) {
    this.id = id;
    this.userId = userId;
    this.products = [];
  }

  static async getById(cartId) {
    const result = await db.query('SELECT * FROM carts WHERE id = $1', [cartId]);
    return result.rows[0];
  }

  static async addProductToCart(cartId, productId) {
    const result = await db.query('INSERT INTO cart_products (cart_id, product_id) VALUES ($1, $2)', [cartId, productId]);
    return result.rowCount > 0;
  }

  async getCartProducts() {
    const result = await db.query('SELECT * FROM products INNER JOIN cart_products ON products.id = cart_products.product_id WHERE cart_products.cart_id = $1', [this.id]);
    return result.rows;
  }
}

module.exports = Cart;
