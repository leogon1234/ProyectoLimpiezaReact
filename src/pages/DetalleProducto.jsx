import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products.js';
import { useCart } from '../contexts/CartContext.jsx';

function resolveImage(img) {
  if (!img) return '';
  const file = img.split('/').pop();
  return new URL(`/src/assets/img/${file}`, import.meta.url).href;
}

function generateSku(id) {
  return `SKU-${id}`;
}

export default function DetalleProducto() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('caracteristicas');

  if (!product) {
    return (
      <div className="container py-4">
        <p className="text-muted">Producto no encontrado.</p>
      </div>
    );
  }

  const price = product.oferta && product.precioOferta ? product.precioOferta : product.precio;

  const handleAdd = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="container py-4">
      {/* ==== Bloque principal (imagen + info) ==== */}
      <div className="row g-4 align-items-start">
        <div className="col-md-5 text-center">
          <div className="dp-img-wrap mx-auto">
            <img
              src={resolveImage(product.img)}
              alt={product.nombre}
              className="dp-img"
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-md-7">
          <div className="d-flex align-items-start justify-content-between mb-2">
            <h2 className="fw-bold mb-0">{product.nombre}</h2>
            <small className="text-muted ms-3">ID: {generateSku(product.id)}</small>
          </div>

          <div className="dp-price my-2">
            {product.oferta ? (
              <>
                <span className="dp-price-main">${product.precioOferta.toLocaleString()}</span>
                <span className="text-muted text-decoration-line-through ms-2">
                  ${product.precio.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="dp-price-main">${price.toLocaleString()}</span>
            )}
          </div>

          <p className="text-muted mb-3">{product.desc}</p>

          <div className="d-flex align-items-center gap-2 mb-3">
            <label htmlFor="cantidad" className="fw-semibold mb-0">Cantidad:</label>
            <input
              id="cantidad"
              type="number"
              min="1"
              className="form-control"
              style={{ maxWidth: 90 }}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </div>
          <button className="btn btn-success" onClick={handleAdd}>
            Agregar al carrito
          </button>
        </div>
      </div>

      <div className="mt-5">
        <ul className="nav nav-tabs dp-tabs justify-content-start" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${tab === 'caracteristicas' ? 'active' : ''}`}
              onClick={() => setTab('caracteristicas')}
              type="button"
              role="tab"
            >
              Características
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${tab === 'descripcion' ? 'active' : ''}`}
              onClick={() => setTab('descripcion')}
              type="button"
              role="tab"
            >
              Descripción
            </button>
          </li>
        </ul>

        <div className="card border-top-0 rounded-top-0 dp-tab-card">
          <div className="card-body">
            {tab === 'caracteristicas' ? (
              <>
                <h5 className="mb-3">Características</h5>
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <tbody>
                      {product.specs && Object.keys(product.specs).length ? (
                        Object.entries(product.specs).map(([campo, valor]) => (
                          <tr key={campo}>
                            <th className="text-muted fw-normal" style={{ width: 260 }}>
                              {campo}
                            </th>
                            <td className="fw-semibold">{valor}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-muted">Sin información adicional</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <h5 className="mb-3">Descripción</h5>
                <p className="mb-0">{product.descripcionLarga}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
