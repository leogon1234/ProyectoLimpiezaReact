// src/pages/Ofertas.jsx
import React from "react";
import ProductCard from "../components/ProductCard.jsx";
import useProducts from "../hooks/useProducts.jsx";

export default function Ofertas() {
  const { productos, cargando, error } = useProducts();
  const ofertas = productos.filter((p) => p.oferta);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 color-principal">Productos en oferta</h2>
      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!cargando && !error && (
        <div className="row">
          {ofertas.length ? (
            ofertas.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-muted">No hay productos en oferta.</p>
          )}
        </div>
      )}
    </div>
  );
}