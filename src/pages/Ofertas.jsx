import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Ofertas() {
  const ofertas = products.filter((p) => p.oferta);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 color-principal">Productos en oferta</h2>
      <div className="row">
        {ofertas.length ? (
          ofertas.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-muted">No hay productos en oferta.</p>
        )}
      </div>
    </div>
  );
}