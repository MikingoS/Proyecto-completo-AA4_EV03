import React, { useState, useEffect } from 'react';
import { getProductos, createProducto } from '../services/api';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estado para el formulario de nuevo producto
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });
  const [mensajeExito, setMensajeExito] = useState('');

  // Cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const res = await getProductos();
      setProductos(res.data.data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor backend Node.js.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      setError('Por favor completa el nombre y el precio');
      return;
    }

    try {
      await createProducto({
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock) || 0
      });
      setMensajeExito('¡Producto registrado con éxito!');
      setForm({ nombre: '', precio: '', stock: '' });
      setError('');
      cargarProductos(); // Recargar la lista
    } catch (err) {
      setError('Error al registrar el producto.');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Gestión de Productos (CRUD)</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

      <div className="row">
        {/* Formulario de registro */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Registrar Nuevo Producto</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Teclado Gamer"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    placeholder="Ej. 120"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock inicial</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Ej. 15"
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Guardar Producto
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Listado de productos */}
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Listado de Productos</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <p>Cargando productos...</p>
              ) : productos.length === 0 ? (
                <p className="text-muted">No hay productos registrados.</p>
              ) : (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((prod) => (
                      <tr key={prod.id}>
                        <td>{prod.id}</td>
                        <td>{prod.nombre}</td>
                        <td>${prod.precio}</td>
                        <td>{prod.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosPage;