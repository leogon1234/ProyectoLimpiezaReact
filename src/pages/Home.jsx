// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductosApi } from '../data/products';
import useProductos from '../hooks/useProducts.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const { productos, cargando, error } = useProductos();
  const featured = productos.slice(0, 4);
    if (cargando) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="mb-4 fw-bold">¡Bienvenido a Tienda de Limpieza!</h2>
        <p className="lead">
          Descubre la mejor selección de productos para la limpieza de tu hogar, oficina o negocio.
          <br />
          Ofrecemos calidad, buenos precios y atención personalizada para que encuentres todo lo que necesitas en un
          solo lugar.
        </p>
        <Link to="/productos" className="btn lf-btn btn-lg mt-2">
          Ver productos
        </Link>
      </div>
      {/* Carrusel */}
      <div
        id="marcasCarousel"
        className="carousel slide carousel-marcas my-5"
        data-bs-ride="carousel"
        data-bs-interval="3500"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#marcasCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#marcasCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner rounded shadow-sm">
          <div className="carousel-item active">
            <div className="slide-frame">
              <img
                src="/img/carrosel1.png"
                className="d-block slide-img"
                alt="Productos de limpieza marcas 1"
              />
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h5>Calidad profesional</h5>
              <p>Las mejores marcas para tu hogar y negocio.</p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="slide-frame">
              <img
                src="/img/carrosel2.png"
                className="d-block slide-img"
                alt="Productos de limpieza marcas 2"
              />
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h5>Variedad y buen precio</h5>
              <p>Detergentes, ceras, limpiadores y mucho más.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#marcasCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#marcasCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
      <hr className="my-5" />
      <h2 className="text-center mb-4">PRODUCTOS QUE PODRÍAN INTERESARTE</h2>
      <div className="row g-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <section className="my-5 compromiso-eco text-center p-5">
        <h3 className="fw-bold color-principal mb-3">Nuestro Compromiso</h3>
        <p className="text-muted mb-4">
          En <strong>Limpifresh</strong> creemos que la limpieza y el cuidado del planeta pueden ir de la mano.
          Por eso trabajamos con <strong>productos biodegradables</strong>, <strong>envases reciclables</strong>
          y <strong>procesos sostenibles</strong> que protegen tu hogar y nuestro entorno.
        </p>
        <img
          src="/img/ecologico.jpg"
          alt="Compromiso ecológico"
          className="img-fluid rounded sombra-eco"
        />
      </section>
    </div>
  );
}