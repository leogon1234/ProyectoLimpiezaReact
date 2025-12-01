// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/blogs")
      .then((res) => {
        setBlogs(res.data || []);
      })
      .catch((err) => {
        console.error("Error cargando blogs de backend", err);
        alert("No se pudieron cargar los blogs desde el servidor.");
      })
      .finally(() => setLoading(false));
  }, []);

  const getExcerpt = (texto, max = 180) => {
    if (!texto) return "";
    if (texto.length <= max) return texto;
    return texto.slice(0, max - 3) + "...";
  };

  if (loading) {
    return (
      <main className="container my-5">
        <p>Cargando blogs...</p>
      </main>
    );
  }

  return (
    <main className="container my-5">
      {/* Encabezado */}
      <div className="text-center mb-5">
        <h2 className="fw-bold color-principal">Blogs de la FreshComunity</h2>
        <p className="text-muted">
          Conoce más sobre nuestros productos, procesos y compromiso con el medio ambiente.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        {blogs.length === 0 ? (
          <p className="text-muted text-center">
            Aún no hay blogs publicados.
          </p>
        ) : (
          blogs.map((blog) => (
            <div className="col-md-6" key={blog.id}>
              <div className="card h-100 shadow border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-4 text-center">
                    {blog.imagenUrl && (
                      <img
                        src={blog.imagenUrl}
                        alt={blog.titulo}
                        className="img-fluid rounded-start p-3"
                        style={{ maxWidth: "120px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title fw-semibold">{blog.titulo}</h5>
                      <p className="card-text">
                        {getExcerpt(blog.contenido)}
                      </p>
                      <Link
                        to={`/blogs/${blog.id}`}
                        className="btn btn-outline-success btn-sm mt-2"
                      >
                        Más aquí
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <section className="my-5">
        <h3 className="text-center fw-bold mb-4 color-principal">
          Consejos Rápidos de Limpieza
        </h3>
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-droplet-half fs-1 text-success"></i>
            <h5 className="mt-3">Usa menos agua</h5>
            <p className="text-muted">
              Un balde de agua con jabón ecológico es suficiente para limpiar grandes áreas.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-recycle fs-1 text-success"></i>
            <h5 className="mt-3">Recicla envases</h5>
            <p className="text-muted">
              Nuestras botellas son 100% reciclables. Devuélvelas o reutilízalas en casa.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-brightness-high fs-1 text-success"></i>
            <h5 className="mt-3">Secado natural</h5>
            <p className="text-muted">
              Aprovecha el sol para secar y desinfectar tus utensilios de limpieza.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
