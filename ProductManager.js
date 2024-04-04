
const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    addProduct(product) {
        let products = this.getProductsFromFile();
        product.id = this.generateId(products);
        products.push(product);
        this.saveProductsToFile(products);
    }

    getProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe o hay algun error, devuelve una matriz vacía
            return [];
        }
    }

    saveProductsToFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    getProducts() {
        return this.getProductsFromFile();
    }

    getProductById(id) {
        const products = this.getProductsFromFile();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        let products = this.getProductsFromFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            this.saveProductsToFile(products);
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        let products = this.getProductsFromFile();
        products = products.filter(product => product.id !== id);
        this.saveProductsToFile(products);
    }

    generateId(products) {
        return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
    }
}

module.exports = ProductManager;
