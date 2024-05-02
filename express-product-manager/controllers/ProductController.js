
const Product = require('../models/products');


class ProductController {
  async getAllProducts(req, res) {
    const products = await Product.getAll();
    res.json(products);
  }

  async getProductById(req, res) {
    const product = await Product.getById(req.params.productId);
    res.json(product);
  }

  async addProduct(req, res) {
    const newProduct = new Product(null, req.body.name, req.body.price);
    const savedProduct = await Product.add(newProduct);
    res.json(savedProduct);
  }

  async updateProduct(req, res) {
    const product = await Product.getById(req.params.productId);
    const updatedProduct = await product.update(req.body);
    res.json(updatedProduct);
  }

  async deleteProduct(req, res) {
    const product = await Product.getById(req.params.productId);
    const deleted = await product.delete();
    res.json({ success: deleted });
  }
}

module.exports = new ProductController();
