// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { products as siteProducts } from "../data/products.js";
import { Categorias } from "../data/categorias.js";
import api from "../api/api.js";

export default function Admin() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  /*
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/");
  }, [user, navigate]);
  */

  const DEFAULT_IVA = 19;

  // Productos backend
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    desc: "",
    precio: "",
    iva: DEFAULT_IVA,
    stock: "",
    oferta: false,
    precioOferta: "",
    categoria: Categorias[0] ?? "General",
    img: "",
  });

  const toInt = (v) => {
    if (typeof v === "number") return Math.round(v);
    const n = String(v).replace(/[^0-9-]/g, "");
    return n ? Math.round(parseInt(n, 10)) : 0;
  };

  const formatCLP = (n) => "$" + toInt(n).toLocaleString("es-CL");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const clearForm = () => {
    setForm({
      nombre: "",
      desc: "",
      precio: "",
      iva: DEFAULT_IVA,
      stock: "",
      oferta: false,
      precioOferta: "",
      categoria: Categorias[0] ?? "General",
      img: "",
    });
    setEditingIndex(null);
  };

  useEffect(() => {
    api
      .get("/api/productos")
      .then((r) => setProducts(r.data || []))
      .catch((e) => {
        console.error("Error cargando productos", e);
        alert("No se pudieron cargar los productos desde el servidor.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, desc, precio, iva, stock, oferta, precioOferta, categoria, img } =
      form;

    if (!nombre.trim()) return alert("Ingresa el nombre del producto.");
    if (toInt(precio) <= 0) return alert("Precio inválido.");
    if (toInt(stock) < 0) return alert("Stock inválido.");
    if (oferta && toInt(precioOferta) <= 0)
      return alert(
        "Si el producto está en oferta, debes ingresar un precio de oferta válido."
      );

    const payload = {
      nombre: nombre.trim(),
      descripcionCorta: desc.trim(),
      descripcionLarga: desc.trim(),
      precio: toInt(precio),
      iva: toInt(iva),
      stock: toInt(stock),
      oferta,
      precioOferta: oferta ? toInt(precioOferta) : null,
      categoria: categoria || "General",
      img: img?.trim() || null,
    };

    try {
      if (editingIndex === null) {
        const r = await api.post("/api/productos", payload);
        setProducts((p) => [...p, r.data]);
      } else {
        const original = products[editingIndex];
        const r = await api.put(`/api/productos/${original.id}`, {
          ...payload,
          id: original.id,
        });
        setProducts((p) => {
          const c = [...p];
          c[editingIndex] = r.data;
          return c;
        });
      }
      clearForm();
    } catch (e) {
      console.error("Error guardando producto", e);
      alert("Ocurrió un error al guardar el producto en el servidor.");
    }
  };

  const handleDelete = async (i) => {
    const producto = products[i];
    if (!producto) return;
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/api/productos/${producto.id}`);
      setProducts((p) => p.filter((_, idx) => idx !== i));
      if (editingIndex === i) clearForm();
    } catch (e) {
      console.error("Error eliminando producto", e);
      alert("No se pudo eliminar el producto en el servidor.");
    }
  };

  const handleEdit = (i) => {
    const p = products[i];
    if (!p) return;
    setForm({
      nombre: p.nombre || "",
      desc: p.descripcionCorta || "",
      precio: p.precio ?? "",
      iva: p.iva ?? DEFAULT_IVA,
      stock: p.stock ?? "",
      oferta: !!p.oferta,
      precioOferta: p.precioOferta ?? "",
      categoria: p.categoria || (Categorias[0] ?? "General"),
      img: p.img || "",
    });
    setEditingIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Blogs backend
  const [blogs, setBlogs] = useState([]);
  const [blogEditingIndex, setBlogEditingIndex] = useState(null);
  const [blogForm, setBlogForm] = useState({
    titulo: "",
    contenido: "",
    imagenUrl: "",       
  });

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlogForm((p) => ({ ...p, [name]: value }));
  };

  const clearBlogForm = () => {
    setBlogForm({ titulo: "", contenido: "", imagenUrl: "" });
    setBlogEditingIndex(null);
  };

  useEffect(() => {
    api
      .get("/api/blogs")
      .then((r) => setBlogs(r.data || []))
      .catch((e) => {
        console.error("Error cargando blogs", e);
        alert("No se pudieron cargar los blogs desde el servidor.");
      });
  }, []);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const { titulo, contenido, imagenUrl } = blogForm;
    if (!titulo.trim()) return alert("Ingresa el título del blog.");
    if (!contenido.trim()) return alert("Ingresa el contenido del blog.");

    const payload = {
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      imagenUrl: imagenUrl?.trim() || null,   // 🔹 se envía la URL (puede ser null)
    };

    try {
      if (blogEditingIndex === null) {
        const r = await api.post("/api/blogs", payload);
        setBlogs((p) => [...p, r.data]);
      } else {
        const original = blogs[blogEditingIndex];
        if (!original) return;
        const r = await api.put(`/api/blogs/${original.id}`, {
          ...payload,
          id: original.id,
        });
        setBlogs((p) => {
          const c = [...p];
          c[blogEditingIndex] = r.data;
          return c;
        });
      }
      clearBlogForm();
    } catch (e) {
      console.error("Error guardando blog", e);
      alert("Ocurrió un error al guardar el blog en el servidor.");
    }
  };

  const handleBlogEdit = (i) => {
    const b = blogs[i];
    if (!b) return;
    setBlogForm({
      titulo: b.titulo || "",
      contenido: b.contenido || "",
      imagenUrl: b.imagenUrl || "",   // 🔹 cargamos la url existente
    });
    setBlogEditingIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBlogDelete = async (i) => {
    const b = blogs[i];
    if (!b) return;
    if (!window.confirm("¿Eliminar este blog?")) return;
    try {
      await api.delete(`/api/blogs/${b.id}`);
      setBlogs((p) => p.filter((_, idx) => idx !== i));
      if (blogEditingIndex === i) clearBlogForm();
    } catch (e) {
      console.error("Error eliminando blog", e);
      alert("No se pudo eliminar el blog en el servidor.");
    }
  };

  // Contacto backend
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    api
      .get("/api/contacto")
      .then((r) => setContactos(r.data || []))
      .catch((e) => {
        console.error("Error cargando contactos", e);
        alert("No se pudieron cargar los mensajes de contacto.");
      });
  }, []);

  const handleContactoDelete = async (id) => {
    if (!window.confirm("¿Eliminar este mensaje de contacto?")) return;
    try {
      await api.delete(`/api/contacto/${id}`);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error("Error eliminando contacto", e);
      alert("No se pudo eliminar el mensaje de contacto.");
    }
  };

  const [catFilter, setCatFilter] = useState("Todas");
  const [q, setQ] = useState("");
  const categorias = ["Todas", ...Array.from(new Set(siteProducts.map((p) => p.categoria)))];
  const filteredSite = siteProducts.filter((p) => {
    const byCat = catFilter === "Todas" || p.categoria === catFilter;
    const byText = !q || String(p.nombre).toLowerCase().includes(q.toLowerCase());
    return byCat && byText;
  });

  const noop = (e) => e.preventDefault();

  return (
    <div className="admin-layout d-flex">
      <aside className="sidebar bg-brand text-white p-3">
        <h3 className="fw-bold text-center mb-4">Limpifresh</h3>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <a className="nav-link text-white" href="#productos">
              <i className="bi bi-box-seam me-2" />
              Productos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#blogs">
              <i className="bi bi-journal-text me-2" />
              Blogs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#contactos">
              <i className="bi bi-envelope-paper-heart me-2" />
              Contactos
            </a>
          </li>
          <li className="nav-item mt-3">
            <button onClick={logout} className="btn btn-light w-100">
              <i className="bi bi-box-arrow-right me-2" />
              Salir
            </button>
          </li>
        </ul>
      </aside>

      <main className="main-content flex-grow-1 p-4 bg-light overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold text-brand">Panel de Administración</h1>
          <span className="badge bg-primary text-white p-2">
            Admin: {user?.name || "Administrador"}
          </span>
        </div>

        {/* Productos */}
        <section
          id="productos"
          className="admin-box p-4 mb-5 text-black border border-dark rounded"
        >
          <h2 className="mb-3">
            <i className="bi bi-plus-circle me-2" />
            Agregar / Editar Producto
          </h2>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  name="nombre"
                  className="form-control border-dark"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Precio (sin IVA)</label>
                <input
                  name="precio"
                  type="number"
                  className="form-control border-dark"
                  value={form.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">IVA (%)</label>
                <input
                  name="iva"
                  type="number"
                  className="form-control border-dark"
                  value={form.iva}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input
                  name="stock"
                  type="number"
                  className="form-control border-dark"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Categoría</label>
                <select
                  name="categoria"
                  className="form-select form-control border-dark"
                  value={form.categoria}
                  onChange={handleChange}
                >
                  {Categorias.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label">Imagen del producto (URL)</label>
                <input
                  name="img"
                  type="url"
                  className="form-control border-dark"
                  value={form.img}
                  onChange={handleChange}
                  placeholder="https://tuservidor.com/img/producto.jpg"
                />
                {form.img && (
                  <div className="mt-2">
                    <span className="small text-muted d-block">
                      Vista previa:
                    </span>
                    <img
                      src={form.img}
                      alt="Vista previa producto"
                      className="preview-img-admin"
                    />
                  </div>
                )}
              </div>

              <div className="col-md-4 d-flex align-items-center mt-2">
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
                    Oferta
                  </label>
                </div>
              </div>

              {form.oferta && (
                <div className="col-md-4">
                  <label className="form-label">Precio oferta</label>
                  <input
                    name="precioOferta"
                    type="number"
                    className="form-control border-dark"
                    value={form.precioOferta}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="col-md-12">
                <label className="form-label">Descripción</label>
                <textarea
                  name="desc"
                  className="form-control border-dark"
                  rows="3"
                  value={form.desc}
                  onChange={handleChange}
                />
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
                {editingIndex === null ? "Guardar" : "Actualizar"}
              </button>
            </div>
          </form>
        </section>

        {/* TABLA PRODUCTOS */}
        <section className="admin-box p-4 mb-5 text-black form-control border-dark">
          <h3 className="mb-3">
            <i className="bi bi-box2-heart me-2" />
            Productos guardados
          </h3>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
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
                      <td>{p.categoria}</td>
                      <td>{formatCLP(p.precio)}</td>
                      <td>{p.oferta ? "Sí" : "No"}</td>
                      <td>
                        {p.oferta && p.precioOferta != null
                          ? formatCLP(p.precioOferta)
                          : "-"}
                      </td>
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
                    <td colSpan="8" className="text-center text-muted">
                      No hay productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* BLOGS */}
        <section
          id="blogs"
          className="admin-box p-4 mb-5 form-control border-dark"
        >
          <h3 className="mb-4">
            <i className="bi bi-journal-text me-2" />
            Administrar Blogs
          </h3>

          <form onSubmit={handleBlogSubmit} className="mb-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Título</label>
                <input
                  name="titulo"
                  className="form-control border-dark"
                  value={blogForm.titulo}
                  onChange={handleBlogChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Imagen (URL)</label>
                <input
                  name="imagenUrl"
                  type="url"
                  className="form-control border-dark"
                  placeholder="https://tuservidor.com/img/blog.jpg"
                  value={blogForm.imagenUrl}
                  onChange={handleBlogChange}
                />
                {blogForm.imagenUrl && (
                  <div className="mt-2">
                    <span className="small text-muted d-block">
                      Vista previa:
                    </span>
                    <img
                      src={blogForm.imagenUrl}
                      alt="Vista previa blog"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "160px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label">Contenido</label>
                <textarea
                  name="contenido"
                  className="form-control border-dark"
                  rows="4"
                  value={blogForm.contenido}
                  onChange={handleBlogChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                onClick={clearBlogForm}
                className="btn btn-outline-secondary"
              >
                Limpiar
              </button>
              <button type="submit" className="btn btn.success btn-success">
                {blogEditingIndex === null ? "Guardar Blog" : "Actualizar Blog"}
              </button>
            </div>
          </form>

          {blogs.length === 0 ? (
            <p className="text-muted">No hay blogs creados.</p>
          ) : (
            <div className="row g-4">
              {blogs.map((b, i) => (
                <div className="col-md-4" key={b.id ?? i}>
                  <div className="card h-100 shadow-sm">
                    {b.imagenUrl && (
                      <img
                        src={b.imagenUrl}
                        alt={b.titulo}
                        className="card-img-top"
                        style={{ maxHeight: "180px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h5>{b.titulo}</h5>
                      <p
                        className="text-muted"
                        style={{ maxHeight: "80px", overflow: "hidden" }}
                      >
                        {b.contenido}
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleBlogEdit(i)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleBlogDelete(i)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CONTACTO */}
        <section
          id="contactos"
          className="admin-box p-4 mb-5 form-control border-dark"
        >
          <h3 className="mb-3">
            <i className="bi bi-envelope-paper-heart me-2" />
            Mensajes de contacto
          </h3>
          {contactos.length === 0 ? (
            <p className="text-muted">No hay mensajes de contacto.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Asunto</th>
                    <th>Mensaje</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contactos.map((c) => (
                    <tr key={c.id}>
                      <td>{c.nombre}</td>
                      <td>{c.email}</td>
                      <td>{c.asunto}</td>
                      <td
                        style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}
                      >
                        {c.mensaje}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleContactoDelete(c.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
