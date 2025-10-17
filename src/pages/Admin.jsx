// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { products as siteProducts } from '../data/products.js';

export default function Admin() {
  const { user } = useUser();
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
      } catch {}
    }
    setProducts([]);
  }, []);

  // Persistir CRUD
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const clearForm = () => {
    setForm({ nombre: '', desc: '', precio: '', iva: DEFAULT_IVA, stock: '' });
    setEditingIndex(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.nombre.trim();
    const desc = form.desc.trim();
    const price = toInt(form.precio);
    const iva = toInt(form.iva);
    const stock = toInt(form.stock);
    if (!name) return alert('Ingresa el nombre del producto.');
    if (price <= 0) return alert('Ingresa un precio válido.');
    if (stock < 0) return alert('Ingresa un stock válido (0 o más).');
    if (iva < 0) return alert('Ingresa un IVA válido (0 o más).');

    const payload = { name, desc, price, stock, iva };
    setProducts((prev) => {
      if (editingIndex === null) return [...prev, payload];
      const copy = [...prev];
      copy[editingIndex] = payload;
      return copy;
    });
    clearForm();
  };
  const handleDelete = (index) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
      if (editingIndex === index) clearForm();
    }
  };
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ====== Catálogo del sitio (solo lectura, sin ofertas) ======
  const [catFilter, setCatFilter] = useState('Todas');
  const [q, setQ] = useState('');
  const categorias = ['Todas', ...Array.from(new Set(siteProducts.map(p => p.categoria)))];

  const filteredSite = siteProducts.filter(p => {
    const byCat = catFilter === 'Todas' || p.categoria === catFilter;
    const byText = !q || String(p.nombre).toLowerCase().includes(q.toLowerCase());
    return byCat && byText;
  });

  // ====== Blogs (solo vista) ======
  const blogs = [
    {
      id: 1,
      titulo: 'Bolsas 100% ecológicas',
      descripcion: 'Conoce cómo las bolsas biodegradables ayudan al medio ambiente.',
      imagen: '/img/Bolsas.jpg',
      fecha: '15 Octubre 2025',
    },
    {
      id: 2,
      titulo: 'Escobas de material reciclado',
      descripcion: 'Escobas fabricadas con materiales reciclados y resistentes.',
      imagen: '/img/escoba.jpg',
      fecha: '12 Octubre 2025',
    },
    {
      id: 3,
      titulo: 'Detergentes sin químicos agresivos',
      descripcion: 'Cuidan tus prendas y el medio ambiente.',
      imagen: '/img/Detergente.jpg',
      fecha: '10 Octubre 2025',
    },
  ];

  // No-ops para botones visuales
  const noop = (e) => e.preventDefault();

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Panel de Administración</h1>

      {/* ====== Formulario CRUD ====== */}
      <section className="card shadow-sm p-4 mb-5">
        <h2 className="mb-3">Agregar / Editar Producto</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del producto</label>
            <input id="nombre" name="nombre" type="text" className="form-control"
              value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Descripción</label>
            <textarea id="desc" name="desc" className="form-control" rows="3"
              value={form.desc} onChange={handleChange} />
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="precio" className="form-label">Precio (sin IVA)</label>
              <input id="precio" name="precio" type="number" min="0" step="1"
                className="form-control" value={form.precio} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="iva" className="form-label">IVA %</label>
              <input id="iva" name="iva" type="number" min="0" step="1"
                className="form-control" value={form.iva} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input id="stock" name="stock" type="number" min="0" step="1"
                className="form-control" value={form.stock} onChange={handleChange} required />
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

      {/* ====== Tabla de Productos CRUD ====== */}
      <section className="card shadow-sm p-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Productos</h4>
          <span className="badge bg-brand text-white">IVA actual: {form.iva || DEFAULT_IVA}%</span>
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
                      <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(i)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No hay productos.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/*  Catálogo del Sitio  */}
      <section className="card shadow-sm p-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Catálogo del sitio</h2>
        </div>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th style={{ width: 70 }}>ID</th>
                <th style={{ width: 84 }}>Img</th>
                <th>Nombre</th>
                <th style={{ width: 180 }}>Categoría</th>
                <th style={{ width: 180 }}>Precio</th>
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSite.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <div className="admin-thumb">
                      <img
                        src={p.img}
                        alt={p.nombre}
                        onError={(e) => (e.currentTarget.src = '/img/placeholder.png')}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="fw-semibold">{p.nombre}</div>
                    <small className="text-muted">{p.desc}</small>
                  </td>
                  <td>{p.categoria}</td>
                  <td>{formatCLP(p.precio)}</td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={noop} title="Acción visual">
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={noop} title="Acción visual">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSite.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">Sin resultados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/*  Administrar Blogs  */}
      <section className="card shadow-sm p-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Administrar Blogs</h2>
        </div>

        <div className="row g-4">
          {blogs.map((b) => (
            <div key={b.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img src={b.imagen} className="card-img-top" alt={b.titulo} />
                <div className="card-body">
                  <h5 className="fw-bold">{b.titulo}</h5>
                  <p className="text-muted">{b.descripcion}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={noop} title="Acción visual">
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={noop} title="Acción visual">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="col-12 text-center text-muted">No hay artículos de blog.</div>
          )}
        </div>
      </section>
    </div>
  );
}
