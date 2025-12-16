// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";

export default function BlogDetail() {
  const { id } = useParams(); // <- viene /blogs/:id
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    api
      .get(`/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        if (err?.response?.status === 404) setNotFound(true);
        else console.error("Error cargando blog", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="container py-4">
        <p>Cargando artículo...</p>
      </main>
    );
  }

  if (notFound || !blog) {
    return (
      <main className="container py-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold color-principal">Artículo no encontrado</h2>
          <p className="text-muted">Lo sentimos, el artículo que buscas no se encuentra disponible.</p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/blogs" className="btn btn-outline-success">
            Volver a blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold color-principal">{blog.titulo}</h2>
        <p className="text-muted">
          Descubre historias, detalles ecológicos y curiosidades sobre nuestros productos.
        </p>
      </div>

      <div className="text-center mb-4">
        <img
          src={blog.imagenUrl || "/img/muchasescobas.jpg"}
          alt={blog.titulo}
          className="img-fluid rounded shadow-sm"
          style={{ maxHeight: "500px", objectFit: "contain", width: "100%" }}
          onError={(e) => (e.currentTarget.src = "/img/muchasescobas.jpg")}
        />
      </div>

      <section className="mb-5">
        <p style={{ whiteSpace: "pre-wrap" }}>{blog.contenido}</p>
      </section>

      <div className="mt-4">
        <Link to="/blogs" className="btn btn-outline-success">
          Volver a blogs
        </Link>
      </div>
    </main>
  );
}
