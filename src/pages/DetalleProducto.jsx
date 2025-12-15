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

  const buildFeatureRows = (productoActual) => {
    if (!productoActual) return [];

    const baseRows = [
      {
        label: 'Categoría',
        value: productoActual.categoria || 'N/A',
      },
      {
        label: 'Stock',
        value: productoActual.stock ?? '—',
      },
      {
        label: 'IVA',
        value:
          productoActual.iva !== undefined && productoActual.iva !== null
            ? `${productoActual.iva}%`
            : '—',
      },
    ];

    const categoriaTexto = (productoActual.categoria || '').toLowerCase();

    if (categoriaTexto.includes('detergent')) {
      baseRows.push(
        {
          label: 'Uso recomendado',
          value: 'Lavado de ropa y textiles, apto para uso doméstico.',
        },
        {
          label: 'Tipo de fórmula',
          value: 'Fórmula concentrada de alto rendimiento.',
        },
        {
          label: 'Aroma',
          value: 'Fragancia fresca y agradable.',
        },
      );
    } else if (
      categoriaTexto.includes('multiuso') ||
      categoriaTexto.includes('limpiador') ||
      categoriaTexto.includes('limpia')
    ) {
      baseRows.push(
        {
          label: 'Uso recomendado',
          value: 'Limpieza general de superficies del hogar.',
        },
        {
          label: 'Superficies compatibles',
          value: 'Cerámica, porcelanato y superficies lavables.',
        },
      );
    } else if (
      categoriaTexto.includes('cloro') ||
      categoriaTexto.includes('desinfect')
    ) {
      baseRows.push(
        {
          label: 'Uso recomendado',
          value: 'Desinfección de baños, pisos y superficies de alto contacto.',
        },
        {
          label: 'Precauciones',
          value: 'Usar guantes y evitar mezclar con otros productos químicos.',
        },
      );
    } else {
      baseRows.push({
        label: 'Uso recomendado',
        value: 'Producto de limpieza para el hogar.',
      });
    }

    return baseRows;
  };

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
    <div className="container py-4 detalle-container">
      <div className="row g-4 align-items-center justify-content-center">
        <div className="col-md-5 text-center">
          <div className="dp-img-wrap mx-auto">
            {producto.oferta && (
              <span className="badge-sale">Oferta</span>
            )}
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
          </div>

          <div className="dp-meta">
            <span className="detalle-id">ID: {generateSku(producto.id)}</span>
            {producto.categoria && (
              <span className="badge rounded-pill bg-light text-secondary">
                {producto.categoria}
              </span>
            )}
            {producto.stock != null && (
              <span
                className={`badge rounded-pill ${
                  producto.stock > 0 ? 'bg-success-subtle text-success' : 'bg-secondary text-light'
                }`}
              >
                {producto.stock > 0 ? 'En stock' : 'Sin stock'}
              </span>
            )}
          </div>

          <div className="dp-price my-3">
            <div className="d-flex flex-column">
              <span className="dp-price-label">Precio</span>
              {producto.oferta ? (
                <div className="d-flex align-items-baseline gap-2">
                  <span className="dp-price-main">
                    ${price.toLocaleString()}
                  </span>
                  <span className="dp-price-old">
                    ${producto.precio.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="dp-price-main">
                  ${price.toLocaleString()}
                </span>
              )}
            </div>
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
                      {buildFeatureRows(producto).map((row, idx) => (
                        <tr key={idx}>
                          <th
                            className="text-muted fw-normal"
                            style={{ width: 260 }}
                          >
                            {row.label}
                          </th>
                          <td className="fw-semibold">{row.value}</td>
                        </tr>
                      ))}
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
