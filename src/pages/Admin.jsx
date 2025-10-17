import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';


export default function Admin() {
  const { user } = useUser();
  const navigate = useNavigate();

  // If user isn't admin, redirect away
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const STORAGE_KEY = 'lf_products';
  const DEFAULT_IVA = 19;

  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    desc: '',
    precio: '',
    iva: DEFAULT_IVA,
    stock: '',
  });

  // Load products from storage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setProducts(parsed);
          return;
        }
      } catch {
        /* ignore parse error */
      }
    }
    // Seed with empty array if nothing exists
    setProducts([]);
  }, []);

  // Persist products when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // Format number as CLP
  const toInt = (v) => {
    if (typeof v === 'number') return Math.round(v);
    const n = String(v).replace(/[^0-9-]/g, '');
    return n ? Math.round(parseInt(n, 10)) : 0;
  };
  const formatCLP = (n) => '$' + toInt(n).toLocaleString('es-CL');

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Clear form
  const clearForm = () => {
    setForm({ nombre: '', desc: '', precio: '', iva: DEFAULT_IVA, stock: '' });
    setEditingIndex(null);
  };

  // Submit form (add or update product)
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.nombre.trim();
    const desc = form.desc.trim();
    const price = toInt(form.precio);
    const iva = toInt(form.iva);
    const stock = toInt(form.stock);
    if (!name) {
      alert('Ingresa el nombre del producto.');
      return;
    }
    if (price <= 0) {
      alert('Ingresa un precio válido.');
      return;
    }
    if (stock < 0) {
      alert('Ingresa un stock válido (0 o más).');
      return;
    }
    if (iva < 0) {
      alert('Ingresa un IVA válido (0 o más).');
      return;
    }
    const payload = { name, desc, price, stock, iva };
    setProducts((prev) => {
      if (editingIndex === null) {
        return [...prev, payload];
      } else {
        const copy = [...prev];
        copy[editingIndex] = payload;
        return copy;
      }
    });
    clearForm();
  };

  // Delete product
  const handleDelete = (index) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
      if (editingIndex === index) {
        clearForm();
      }
    }
  };

  // Edit product
  const handleEdit = (index) => {
    const p = products[index];
    setForm({
      nombre: p.name,
      desc: p.desc || '',
      precio: p.price,
      iva: p.iva,
      stock: p.stock,
    });
    setEditingIndex(index);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Panel de Administración</h1>
      {/* Formulario */}
      <section className="card shadow-sm p-4 mb-5">
        <h2 className="mb-3">Agregar / Editar Producto</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre del producto
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Descripción
            </label>
            <textarea
              id="desc"
              name="desc"
              className="form-control"
              rows="3"
              value={form.desc}
              onChange={handleChange}
            />
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="precio" className="form-label">
                Precio (sin IVA)
              </label>
              <input
                id="precio"
                name="precio"
                type="number"
                min="0"
                step="1"
                className="form-control"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="iva" className="form-label">
                IVA %
              </label>
              <input
                id="iva"
                name="iva"
                type="number"
                min="0"
                step="1"
                className="form-control"
                value={form.iva}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                className="form-control"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="reset" className="btn btn-outline-primary" onClick={clearForm}>
              Limpiar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingIndex === null ? 'Guardar' : 'Actualizar'}
            </button>
          </div>
        </form>
      </section>
      {/* Tabla de productos */}
      <section className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Productos</h4>
          <span className="badge bg-brand text-white">
            IVA actual: {form.iva || DEFAULT_IVA}%
          </span>
        </div>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>IVA</th>
                <th>Precio c/ IVA</th>
                <th>Stock</th>
                <th style={{ width: '160px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const priceWithIVA = Math.round(p.price * (1 + p.iva / 100));
                return (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{formatCLP(p.price)}</td>
                    <td>{p.iva}%</td>
                    <td>{formatCLP(priceWithIVA)}</td>
                    <td>{p.stock}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEdit(i)}
                      >
                        Editar
                      </button>
                        <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(i)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No hay productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}