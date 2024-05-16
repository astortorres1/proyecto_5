const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;

// Importa las rutas de los controladores
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');

// URI de conexión a la base de datos MongoDB
const mongoURI = 'mongodb://localhost:27017/ecommerce';

// Conexión a MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
