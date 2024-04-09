const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async addProduct(product) {
        // Validar campos obligatorios y que el código no se repita
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        const products = await this.getProductsFromFile();
        if (products.some(p => p.code === product.code)) {
            console.error("Ya existe un producto con este código.");
            return;
        }

        product.id = this.generateId(products);
        products.push(product);
        await this.saveProductsToFile(products);
    }

    async getProductsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe o hay algún error, devuelve una matriz vacía
            return [];
        }
    }

    async saveProductsToFile(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async getProducts() {
        return await this.getProductsFromFile();
    }

    async getProductById(id) {
        const products = await this.getProductsFromFile();
        return products.find(product => product.id === id);
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProductsFromFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            // Validar que el id no se esté modificando
            if (updatedFields.id && updatedFields.id !== id) {
                console.error("No se puede modificar el ID del producto.");
                return false;
            }

            // Validar que el código no se repita
            if (updatedFields.code && products.some(p => p.code === updatedFields.code && p.id !== id)) {
                console.error("Ya existe un producto con este código.");
                return false;
            }

            products[index] = { ...products[index], ...updatedFields };
            await this.saveProductsToFile(products);
            return true;
        }
        return false;
    }

    async deleteProduct(id) {
        let products = await this.getProductsFromFile();
        products = products.filter(product => product.id !== id);
        await this.saveProductsToFile(products);
    }

    generateId(products) {
        return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
    }
}

module.exports = ProductManager;
