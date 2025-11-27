// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { products as siteProducts } from '../data/products.js';
import api from '../api/api.js';

export default function Admin() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

//para evitar que se metan con esta ruta http://localhost:5175/admin si no eres admin
/* 
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);
*/

  const DEFAULT_IVA = 19;

  // Productos que se manejan en el CRUD (BACKEND)
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    desc: '', 
    precio: '',
    iva: DEFAULT_IVA,
    stock: '',
    oferta: false,
    precioOferta: '',
  });

  // Para poder convertir un valor a un numero entero
  const toInt = (v) => {
    if (typeof v === 'number') return Math.round(v);
    const n = String(v).replace(/[^0-9-]/g, '');
    return n ? Math.round(parseInt(n, 10)) : 0;
  };

  const formatCLP=(n) =>'$'+toInt(n).toLocaleString('es-CL');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const clearForm = () => {
    setForm({
      nombre: '',
      desc: '',
      precio: '',
      iva: DEFAULT_IVA,
      stock: '',
      oferta: false,
      precioOferta: '',
    });
    setEditingIndex(null);
  };

  useEffect(() => {
    api
      .get('/productos').then((res) => {
        setProducts(res.data || []);
      }).catch((err) => {
        console.error('Error cargando productos de backend', err);
        alert('No se pudieron cargar los productos desde el servidor.');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, desc, precio, iva, stock, oferta, precioOferta } = form;

    // Validaciones del formulario
    if (!nombre.trim()) return alert('Ingresa el nombre del producto.');
    if (toInt(precio) <= 0) return alert('Precio inválido.');
    if (toInt(stock) < 0) return alert('Stock inválido.');
    if (oferta && toInt(precioOferta) <= 0) {
      return alert('Si el producto está en oferta, debes ingresar un precio de oferta válido.');
    }

    // El objeto que se envia al backend
    const payload = {
      nombre: nombre.trim(),
      descripcionCorta: desc.trim(),
      descripcionLarga: desc.trim(),
      precio: toInt(precio),
      iva: toInt(iva),
      stock: toInt(stock),
      oferta: oferta,
      precioOferta: oferta ? toInt(precioOferta) : null,
      categoria: 'General', // puedes cambiarlo luego si agregas categoría al form
      img: null,            // por ahora sin imagen
    };  

    try {
      if (editingIndex===null) {
        // Crear el producto
        const res =await api.post('/productos', payload);
        const creado =res.data;
        setProducts((prev) =>[...prev, creado]);
      } else {
        // Actualizar el producto
        const original = roducts[editingIndex];
        const res =await api.put(`/productos/${original.id}`, {
          ...payload,
          id: original.id,
        });
        const actualizado =res.data;
        setProducts((prev) => {
          const copia = [...prev];
          copia[editingIndex] = actualizado;
          return copia;
        });
      }
      clearForm();
    } catch (err) {
      console.error('Error guardando producto', err);
      alert('Ocurrió un error al guardar el producto en el servidor.');
    }
  };

  const handleDelete = async (i) => {
    const producto = products[i];
    if (!producto) return;
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await api.delete(`/productos/${producto.id}`);
      setProducts((prev) => prev.filter((_, idx) => idx !== i));
      if (editingIndex === i) clearForm();
    } catch (err) {
      console.error('Error eliminando producto', err);
      alert('No se pudo eliminar el producto en el servidor.');
    }
  };

  const handleEdit = (i) => {
    const p = products[i];
    if (!p) return;

    setForm({
      nombre: p.nombre || '',
      desc: p.descripcionCorta || '',
      precio: p.precio ?? '',
      iva: p.iva ?? DEFAULT_IVA,
      stock: p.stock ?? '',
      oferta: !!p.oferta,
      precioOferta: p.precioOferta ?? '',
    });
    setEditingIndex(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <button onClick={logout} className="btn btn-light w-100">
              <i className="bi bi-box-arrow-right me-2"></i>Salir
            </button>
          </li>
        </ul>
      </aside>
      <main className="main-content flex-grow-1 p-4 bg-light overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold text-brand">Panel de Administración</h1>
          <span className="badge bg-primary text-white p-2">
            Admin: {user?.name || 'Administrador'}
          </span>
        </div>
        <section id="productos" className="card shadow-sm p-4 mb-5">
          <h2 className="mb-3">
            <i className="bi bi-plus-circle me-2"></i>Agregar / Editar Producto
          </h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="precio" className="form-label">Precio (sin IVA)</label>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  className="form-control"
                  value={form.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="iva" className="form-label">IVA (%)</label>
                <input
                  id="iva"
                  name="iva"
                  type="number"
                  className="form-control"
                  value={form.iva}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  className="form-control"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 d-flex align-items-center mt-4">
                <div className="form-check">
                  <input
                    id="oferta"
                    name="oferta"
                    type="checkbox"
                    className="form-check-input"
                    checked={form.oferta}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="oferta">
                    oferta
                  </label>
                </div>
              </div>

              {form.oferta && (
                <div className="col-md-4">
                  <label htmlFor="precioOferta" className="form-label">Precio oferta</label>
                  <input
                    id="precioOferta"
                    name="precioOferta"
                    type="number"
                    className="form-control"
                    value={form.precioOferta}
                    onChange={handleChange}
                    required={form.oferta}
                  />
                </div>
              )}

              <div className="col-md-12">
                <label htmlFor="desc" className="form-label">Descripción</label>
                <textarea
                  id="desc"
                  name="desc"
                  className="form-control"
                  rows="3"
                  value={form.desc}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="reset"
                onClick={clearForm}
                className="btn btn-outline-secondary"
              >
                Limpiar
              </button>
              <button type="submit" className="btn btn-primary">
                {editingIndex === null ? 'Guardar' : 'Actualizar'}
              </button>
            </div>
          </form>
        </section>
        <section className="card shadow-sm p-4 mb-5">
          <h3 className="mb-3">
            <i className="bi bi-box2-heart me-2"></i>Productos guardados
          </h3>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Oferta</th>
                  <th>Precio oferta</th>
                  <th>IVA</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length ? (
                  products.map((p, i) => (
                    <tr key={p.id ?? i}>
                      <td>{p.nombre}</td>
                      <td>{formatCLP(p.precio)}</td>
                      <td>{p.oferta ? 'Sí' : 'No'}</td>
                      <td>{p.oferta && p.precioOferta != null ? formatCLP(p.precioOferta) : '-'}</td>
                      <td>{p.iva}%</td>
                      <td>{p.stock}</td>
                      <td className="d-flex gap-2">
                        <button
                          onClick={() => handleEdit(i)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          className="btn btn-danger btn-sm"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No hay productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section id="catalogo" className="card shadow-sm p-4 mb-5">
          <h3 className="mb-3">
            <i className="bi bi-shop me-2"></i>Catálogo del Sitio
          </h3>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
              >
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Buscar</label>
              <input
                className="form-control"
                placeholder="Nombre del producto..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

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
                {filteredSite.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      <img
                        src={p.img}
                        alt={p.nombre}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>{formatCLP(p.precio)}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={noop}
                      >
                        Editar
                      </button>{' '}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={noop}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="blogs" className="card shadow-sm p-4">
          <h3 className="mb-4">
            <i className="bi bi-journal-text me-2"></i>Administrar Blogs
          </h3>
          <button className="btn btn-success">
            <i className="bi bi-plus-lg me-1"></i> Agregar Blog
          </button>
          <br />
          <div className="row g-4">
            {blogs.map((b) => (
              <div className="col-md-4" key={b.id}>
                <div className="card h-100 shadow-sm">
                  <img src={b.imagen} className="card-img-top" alt={b.titulo} />
                  <div className="card-body">
                    <h5>{b.titulo}</h5>
                    <p className="text-muted">{b.descripcion}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={noop}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={noop}
                    >
                      Eliminar
                    </button>
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
