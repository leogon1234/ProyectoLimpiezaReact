import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { products, getCategories } from '../data/products.js';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const categories = ['Todas', ...getCategories()];

  const filtered = products.filter((p) => {
    const matchesCategory = category === 'Todas' || p.categoria === category;
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 color-principal">Catálogo de productos</h2>
      <div className="row mb-4 g-2 align-items-end">
        <div className="col-sm-6 col-md-4">
          <label htmlFor="categoryFilter" className="form-label fw-semibold">
            Categoría
          </label>
          <select
            id="categoryFilter"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-6 col-md-4">
          <label htmlFor="searchBox" className="form-label fw-semibold">
            Buscar
          </label>
          <input
            id="searchBox"
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
          {filtered.length ? (
            filtered.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-muted">No se encontraron productos.</p>
          )}
      </div>
    </div>
  );
}