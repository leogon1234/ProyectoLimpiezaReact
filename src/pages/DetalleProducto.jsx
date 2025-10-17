import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products.js';
import { useCart } from '../contexts/CartContext.jsx';


function generateSku(id) {
  return `SKU-${id}${Math.floor(100000 + Math.random() * 900000)}`;
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

  const handleAdd = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  const price = product.oferta && product.precioOferta ? product.precioOferta : product.precio;

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Product image */}
        <div className="col-md-5 text-center">
          <img
            src={product.img}
            alt={product.nombre}
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        {/* Product details */}
        <div className="col-md-7">
          <h2 className="fw-bold mb-2">{product.nombre}</h2>
          <p className="text-muted mb-1">ID: {generateSku(product.id)}</p>
          <p className="text-muted">{product.desc}</p>
          <div className="my-3">
            {product.oferta ? (
              <>
                <span className="fw-bold h4 text-danger me-2">
                  ${product.precioOferta.toLocaleString()}
                </span>
                <span className="text-muted text-decoration-line-through">
                  ${product.precio.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="fw-bold h4">${product.precio.toLocaleString()}</span>
            )}
          </div>
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="cantidad" className="me-2 fw-semibold mb-0">
              Cantidad
            </label>
            <input
              id="cantidad"
              type="number"
              className="form-control w-auto"
              style={{ maxWidth: '90px' }}
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </div>
          <button className="btn btn-success mb-3" onClick={handleAdd}>
            Agregar al carrito
          </button>
          {/* Tabs for description and characteristics */}
          <ul className="nav nav-pills mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${tab === 'caracteristicas' ? 'active' : ''}`}
                onClick={() => setTab('caracteristicas')}
              >
                Características
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${tab === 'descripcion' ? 'active' : ''}`}
                onClick={() => setTab('descripcion')}
              >
                Descripción
              </button>
            </li>
          </ul>
          {tab === 'caracteristicas' && (
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  {Object.keys(product.specs).length ? (
                    Object.entries(product.specs).map(([campo, valor]) => (
                      <tr key={campo}>
                        <th className="fw-normal text-muted" style={{ width: '200px' }}>
                          {campo}
                        </th>
                        <td>{valor}</td>
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
          )}
          {tab === 'descripcion' && (
            <p className="mt-3">{product.descripcionLarga}</p>
          )}
        </div>
      </div>
    </div>
  );
}