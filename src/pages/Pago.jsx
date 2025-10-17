import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Pago() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const ivaRate = 0.19;
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    tarjeta: '',
    expiracion: '',
    cvv: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const requiredFields = ['nombre', 'direccion', 'ciudad', 'tarjeta', 'expiracion', 'cvv'];
    for (const f of requiredFields) {
      if (!form[f]) {
        setError('Por favor completa todos los campos requeridos.');
        return;
      }
    }
    clearCart();
    setSubmitted(true);
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className="container py-4 text-center">
        <h2 className="fw-bold mb-3 color-principal">Pago</h2>
        <p className="text-muted">No tienes productos en el carrito.</p>
        <button className="btn btn-success" onClick={() => navigate('/productos')}>
          Ver productos
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container py-4 text-center">
        <h2 className="fw-bold mb-3 color-principal">¡Gracias por tu compra!</h2>
        <p className="text-muted">
          Hemos recibido tu pedido y estamos procesándolo. Pronto recibirás un email con los detalles del
          envío.
        </p>
        <button className="btn btn-success" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 color-principal">Pago</h2>
      <div className="row g-4">
        {/* Resumen */}
        <div className="col-md-6 order-md-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Resumen del pedido</h5>
              <ul className="list-group list-group-flush mb-3">
                {cart.map((item) => {
                  const unitPrice = item.offer && item.priceOffer ? item.priceOffer : item.price;
                  return (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-start"
                    >
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <small className="text-muted">Cantidad: {item.quantity}</small>
                      </div>
                      <span>${(unitPrice * item.quantity).toLocaleString()}</span>
                    </li>
                  );
                })}
              </ul>
              <ul className="list-unstyled mb-0">
                <li className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString()}</span>
                </li>
                <li className="d-flex justify-content-between">
                  <span>IVA (19%):</span>
                  <span>${iva.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </li>
                <li className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Formulario de pago */}
        <div className="col-md-6 order-md-1">
          <h5 className="fw-bold mb-3">Datos de envío y pago</h5>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="form-control"
                value={form.direccion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                className="form-control"
                value={form.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono (opcional)
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className="form-control"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tarjeta" className="form-label">
                Número de tarjeta
              </label>
              <input
                type="text"
                id="tarjeta"
                name="tarjeta"
                className="form-control"
                value={form.tarjeta}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="expiracion" className="form-label">
                  Expiración (MM/AA)
                </label>
                <input
                  type="text"
                  id="expiracion"
                  name="expiracion"
                  className="form-control"
                  value={form.expiracion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="form-control"
                  value={form.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Confirmar compra
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}