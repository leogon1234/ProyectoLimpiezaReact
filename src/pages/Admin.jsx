// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { products as siteProducts } from '../data/products.js';

export default function Admin() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

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

  // Cargar productos CRUD (localStorage)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setProducts(parsed);
          return;
        }
      } catch { }
    }
    setProducts([]);
  }, []);

  // Guardar CRUD
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // Helpers
  const toInt = (v) => {
    if (typeof v === 'number') return Math.round(v);
    const n = String(v).replace(/[^0-9-]/g, '');
    return n ? Math.round(parseInt(n, 10)) : 0;
  };
  const formatCLP = (n) => '$' + toInt(n).toLocaleString('es-CL');

  // Handlers CRUD
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const clearForm = () => {
    setForm({ nombre: '', desc: '', precio: '', iva: DEFAULT_IVA, stock: '' });
    setEditingIndex(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, desc, precio, iva, stock } = form;
    if (!nombre.trim()) return alert('Ingresa el nombre del producto.');
    if (precio <= 0) return alert('Precio inválido.');
    if (stock < 0) return alert('Stock inválido.');

    const payload = { name: nombre, desc, price: toInt(precio), iva: toInt(iva), stock: toInt(stock) };
    setProducts((prev) => {
      if (editingIndex === null) return [...prev, payload];
      const copy = [...prev];
      copy[editingIndex] = payload;
      return copy;
    });
    clearForm();
  };
  const handleDelete = (i) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setProducts((p) => p.filter((_, idx) => idx !== i));
      if (editingIndex === i) clearForm();
    }
  };
  const handleEdit = (i) => {
    const p = products[i];
    setForm({ nombre: p.name, desc: p.desc, precio: p.price, iva: p.iva, stock: p.stock });
    setEditingIndex(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Catálogo del sitio
  const [catFilter, setCatFilter] = useState('Todas');
  const [q, setQ] = useState('');
  const categorias = ['Todas', ...Array.from(new Set(siteProducts.map(p => p.categoria)))];
  const filteredSite = siteProducts.filter(p => {
    const byCat = catFilter === 'Todas' || p.categoria === catFilter;
    const byText = !q || String(p.nombre).toLowerCase().includes(q.toLowerCase());
    return byCat && byText;
  });

  const blogs = [
    { id: 1, titulo: 'Bolsas 100% ecológicas', descripcion: 'Ayudan al medio ambiente.', imagen: '/img/Bolsas.jpg' },
    { id: 2, titulo: 'Escobas recicladas', descripcion: 'Fabricadas con materiales reciclados.', imagen: '/img/escoba.jpg' },
    { id: 3, titulo: 'Detergentes sin químicos agresivos', descripcion: 'Cuidan tus prendas.', imagen: '/img/Detergente.jpg' },
  ];
  const noop = (e) => e.preventDefault();

  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <aside className="sidebar bg-brand text-white p-3">
        <h3 className="fw-bold text-center mb-4">Limpifresh</h3>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <a className="nav-link text-white" href="#productos"><i className="bi bi-box-seam me-2"></i>Productos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#catalogo"><i className="bi bi-grid me-2"></i>Catálogo</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#blogs"><i className="bi bi-journal-text me-2"></i>Blogs</a>
          </li>
          <li className="nav-item mt-3">
            <button onClick={logout} className="btn btn-light w-100"><i className="bi bi-box-arrow-right me-2"></i>Salir</button>
          </li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="main-content flex-grow-1 p-4 bg-light overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold text-brand">Panel de Administración</h1>
          <span className="badge bg-primary text-white p-2">Admin: {user?.name || 'Administrador'}</span>
        </div>

        {/* CRUD */}
        <section id="productos" className="card shadow-sm p-4 mb-5">
          <h2 className="mb-3"><i className="bi bi-plus-circle me-2"></i>Agregar / Editar Producto</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input id="nombre" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="precio" className="form-label">Precio (sin IVA)</label>
                <input id="precio" name="precio" type="number" className="form-control" value={form.precio} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="iva" className="form-label">IVA (%)</label>
                <input id="iva" name="iva" type="number" className="form-control" value={form.iva} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input id="stock" name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} required />
              </div>
              <div className="col-md-12">
                <label htmlFor="desc" className="form-label">Descripción</label>
                <textarea id="desc" name="desc" className="form-control" rows="3" value={form.desc} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button type="reset" onClick={clearForm} className="btn btn-outline-secondary">Limpiar</button>
              <button type="submit" className="btn btn-primary">{editingIndex === null ? 'Guardar' : 'Actualizar'}</button>
            </div>
          </form>
        </section>

        {/* Tabla de productos */}
        <section className="card shadow-sm p-4 mb-5">
          <h3 className="mb-3"><i className="bi bi-box2-heart me-2"></i>Productos guardados</h3>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>IVA</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length ? products.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{formatCLP(p.price)}</td>
                    <td>{p.iva}%</td>
                    <td>{p.stock}</td>
                    <td className="d-flex gap-2">
                      <button onClick={() => handleEdit(i)} className="btn btn-outline-primary btn-sm">Editar</button>
                      <button onClick={() => handleDelete(i)} className="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="text-center text-muted">No hay productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Catálogo */}
        <section id="catalogo" className="card shadow-sm p-4 mb-5">
          <h3 className="mb-3"><i className="bi bi-shop me-2"></i>Catálogo del Sitio</h3>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSite.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><img src={p.img} alt={p.nombre} style={{ width: '60px', height: '60px', objectFit: 'cover' }} /></td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>{formatCLP(p.precio)}</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm" onClick={noop}>Editar</button>{' '}
                      <button className="btn btn-danger btn-sm" onClick={noop}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Blogs */}
        <section id="blogs" className="card shadow-sm p-4">
          <h3 className="mb-4"><i className="bi bi-journal-text me-2"></i>Administrar Blogs</h3>
          <button className="btn btn-success">
            <i className="bi bi-plus-lg me-1"></i> Agregar Blog
          </button>
          <br />
          <div className="row g-4">
            {blogs.map(b => (
              <div className="col-md-4" key={b.id}>
                <div className="card h-100 shadow-sm">
                  <img src={b.imagen} className="card-img-top" alt={b.titulo} />
                  <div className="card-body">
                    <h5>{b.titulo}</h5>
                    <p className="text-muted">{b.descripcion}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm" onClick={noop}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={noop}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
