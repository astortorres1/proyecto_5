//services/ProductService.js

const Product = require('../models/Product');

class ProductService {
  static async getProductById(productId) {
    return await Product.getById(productId);
  }

  static async addProduct(productData) {
    return await Product.add(productData);
  }

  static async updateProduct(productId, productData) {
    const product = await Product.getById(productId);
    return await product.update(productData);
  }

  static async deleteProduct(productId) {
    const product = await Product.getById(productId);
    return await product.delete();
  }
}

module.exports = ProductService;

