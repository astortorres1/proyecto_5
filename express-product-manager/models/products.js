const db = require('../db');

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static async getAll() {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
  }

  static async getById(productId) {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
    return result.rows[0];
  }

  static async add(productData) {
    const result = await db.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [productData.name, productData.price]);
    return result.rows[0];
  }

  async update(productData) {
    const result = await db.query('UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *', [productData.name, productData.price, this.id]);
    return result.rows[0];
  }

  async delete() {
    const result = await db.query('DELETE FROM products WHERE id = $1', [this.id]);
    return result.rowCount > 0;
  }
}

module.exports = Product;