// ProductManager.js

const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  async getProductById(productId) {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const products = JSON.parse(data);
      return products.find(product => product.id === productId);
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
}

module.exports = ProductManager;
