
// Importar el módulo express para configurar el servidor
const express = require('express');
// Importar la clase ProductManager desde el archivo local ProductManager.js
const ProductManager = require('./ProductManager');

// Crear una instancia de la aplicación Express
const app = express();
// Definir el puerto en el que se ejecutará el servidor
const PORT = 8080;

// Crear una instancia de ProductManager con el archivo de productos especificado
const productManager = new ProductManager('products.json');

// Definir el endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    // Obtener el parámetro 'limit' de la consulta, si está presente
    const limit = req.query.limit;
    // Obtener todos los productos desde ProductManager
    let products = await productManager.getAllProducts();
    // Si se especifica un límite, reducir la lista de productos al límite dado
    if (limit) {
      products = products.slice(0, parseInt(limit));
    }
    // Enviar los productos como respuesta en formato JSON
    res.json(products);
  } catch (error) {
    // Manejar errores internos del servidor y enviar una respuesta de error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Definir el endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  try {
    // Obtener el ID del producto de los parámetros de la solicitud
    const productId = req.params.pid;
    // Obtener el producto correspondiente al ID dado desde ProductManager
    const product = await productManager.getProductById(productId);
    // Si no se encuentra el producto, enviar una respuesta de error 404
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      // Enviar el producto como respuesta en formato JSON
      res.json(product);
    }
  } catch (error) {
    // Manejar errores internos del servidor y enviar una respuesta de error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
