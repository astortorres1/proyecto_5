//server.js
// Importar el módulo express para configurar el servidor
const express = require('express');
// Importar el módulo fs para manejar el sistema de archivos
const fs = require('fs').promises;

// Crear una instancia del enrutador de Express
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');

// Configurar el middleware para el análisis del cuerpo de la solicitud en formato JSON
const app = express();
app.use(express.json());

// Definir el puerto en el que se ejecutará el servidor
const PORT = 8080;

// Agregar el enrutador de productos a la ruta /products
app.use('/api/products', productRouter);

// Agregar el enrutador de carritos a la ruta /carts
app.use('/api/carts', cartRouter);

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
