const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Datos simulados de productos (para que la tabla de React cargue de inmediato)
let productos = [
  { id: 1, nombre: 'Teclado Gamer RGB', precio: 120, stock: 15 },
  { id: 2, nombre: 'Mouse Inalámbrico', precio: 45, stock: 30 }
];

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  res.json({ success: true, data: productos });
});

// Ruta para crear un producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio, stock } = req.body;
  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio,
    stock
  };
  productos.push(nuevoProducto);
  res.json({ success: true, data: nuevoProducto });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
