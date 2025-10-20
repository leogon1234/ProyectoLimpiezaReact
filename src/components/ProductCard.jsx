import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const {
    id,
    nombre,
    desc,
    img,
    precio,
    oferta,
    precioOferta,
  } = product;

  const handleAdd = () => {
    addItem(product, 1);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 text-center shadow-sm border-0">
        <Link to={`/detalle/${id}`} className="text-decoration-none text-dark">
          <img
            src={img}
            alt={nombre}
            className="card-img-top"
            style={{ objectFit: 'contain', height: '190px' }}
          />
          <div className="card-body">
            <h5 className="card-title fw-bold">{nombre}</h5>
            <p className="card-text text-muted small">{desc}</p>
          </div>
        </Link>
        <div className="card-footer bg-white border-0 d-flex flex-column">
          <div className="mb-2">
            {oferta ? (
              <>
                <span className="fw-semibold text-danger h6 me-2">
                  ${precioOferta.toLocaleString()}
                </span>
                <span className="text-muted text-decoration-line-through">
                  ${precio.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="fw-semibold h6">${precio.toLocaleString()}</span>
            )}
          </div>
          <button onClick={handleAdd} className="btn btn-success btn-sm">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}