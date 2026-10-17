import axios from 'axios';

// Instancia de axios configurada para conectarse a tu backend Node.js
const API = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getProductos = () => API.get('/productos');
export const createProducto = (nuevoProducto) => API.post('/productos', nuevoProducto);

export default API;