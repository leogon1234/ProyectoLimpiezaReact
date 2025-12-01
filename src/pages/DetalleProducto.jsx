import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducto } from '../hooks/useProducts.jsx';
import { useCart } from '../contexts/CartContext.jsx';

function generateSku(id) {
  return `SKU-${id}`;
}

export default function DetalleProducto() {
  const { id } = useParams();
  const { producto, cargando, error } = useProducto(id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('caracteristicas');

  if (cargando) {
    return (
      <div className="container py-4">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container py-4">
        <p className="text-muted">Producto no encontrado.</p>
      </div>
    );
  }

  const price = producto.oferta && producto.precioOferta
    ? producto.precioOferta
    : producto.precio;

  const handleAdd = () => {
    addItem(producto, quantity);
    setQuantity(1);
  };

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-start">
        <div className="col-md-5 text-center">
          <div className="dp-img-wrap mx-auto">
            <img
              src={producto.img || "https://via.placeholder.com/400?text=Sin+Imagen"}
              alt={producto.nombre}
              className="dp-img"
              loading="lazy"
            />
          </div>
        </div>

        <div className="col-md-7">
          <div className="d-flex align-items-start justify-content-between mb-2">
            <h2 className="fw-bold mb-0">{producto.nombre}</h2>
            <small className="text-muted ms-3">ID: {generateSku(producto.id)}</small>
          </div>

          <div className="dp-price my-2">
            {producto.oferta ? (
              <>
                <span className="dp-price-main">
                  ${price.toLocaleString()}
                </span>
                <span className="text-muted text-decoration-line-through ms-2">
                  ${producto.precio.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="dp-price-main">
                ${price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-muted mb-3">
            {producto.desc || producto.descripcionCorta || ''}
          </p>

          <div className="d-flex align-items-center gap-2 mb-3">
            <label htmlFor="cantidad" className="fw-semibold mb-0">Cantidad:</label>
            <input
              id="cantidad"
              type="number"
              min="1"
              className="form-control"
              style={{ maxWidth: 90 }}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value)))
              }
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
                      <tr>
                        <th className="text-muted fw-normal" style={{ width: 260 }}>
                          Categoría
                        </th>
                        <td className="fw-semibold">{producto.categoria || 'N/A'}</td>
                      </tr>
                      <tr>
                        <th className="text-muted fw-normal">Stock</th>
                        <td className="fw-semibold">{producto.stock ?? '—'}</td>
                      </tr>
                      <tr>
                        <th className="text-muted fw-normal">IVA</th>
                        <td className="fw-semibold">{producto.iva ?? '—'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <h5 className="mb-3">Descripción</h5>
                <p className="mb-0">
                  {producto.descripcionLarga || 'Sin descripción adicional.'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
