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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'tarjeta') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length <= 16) {
        newValue = onlyNumbers.match(/.{1,4}/g)?.join(' ') || onlyNumbers;  //limite de 4 digitos por espacio
      } else {
        return; // No permitir más de 16 dígitos
      }
    }

    if (name === 'expiracion') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length <= 4) {
        if (onlyNumbers.length >= 2) {
          newValue = onlyNumbers.slice(0, 2) + '/' + onlyNumbers.slice(2); //formato MM/AA
        } else {
          newValue = onlyNumbers;
        }
      } else {
        return;
      }
    }

    if (name === 'cvv') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (onlyNumbers.length <= 3) { //limite de 3 dígitos
        newValue = onlyNumbers;
      } else {
        return;
      }
    }

    if (name === 'telefono') {
      const onlyNumbers = value.replace(/\D/g, '');
      newValue = onlyNumbers;
    }

    setForm({ ...form, [name]: newValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        if (!value || value.trim() === '') {
          return 'El nombre completo es requerido.';
        }
        const nombreParts = value.trim().split(/\s+/);
        if (nombreParts.length < 2) {
          return 'Por favor ingresa tu nombre y apellido.';
        }
        break;
      
      case 'direccion':
        if (!value || value.trim() === '') {
          return 'La dirección es requerida.';
        }
        if (value.trim().length < 5) {
          return 'La dirección debe tener al menos 5 caracteres.';
        }
        break;
      
      case 'ciudad':
        if (!value || value.trim() === '') {
          return 'La ciudad es requerida.';
        }
        if (value.trim().length < 3) {
          return 'La ciudad debe tener al menos 3 caracteres.';
        }
        break;
      
      case 'tarjeta':
        if (!value || value.trim() === '') {
          return 'El número de tarjeta es requerido.';
        }
        const tarjetaDigits = value.replace(/\D/g, '');
        if (tarjetaDigits.length !== 16) {
          return 'El número de tarjeta debe tener 16 dígitos.';
        }
        break;
      
      case 'expiracion':
        if (!value || value.trim() === '') {
          return 'La fecha de expiración es requerida.';
        }
        const expiracionParts = value.split('/');
        if (expiracionParts.length !== 2) {
          return 'Formato inválido. Use MM/AA.';
        }
        const mes = parseInt(expiracionParts[0], 10);
        const año = parseInt(expiracionParts[1], 10);
        
        if (mes < 1 || mes > 12) {
          return 'El mes debe estar entre 01 y 12.';
        }
        
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1;
        const añoActual = parseInt(fechaActual.getFullYear().toString().slice(-2), 10);
        
        if (año < añoActual || (año === añoActual && mes < mesActual)) {
          return 'La tarjeta está vencida.';
        }
        break;
      
      case 'cvv':
        if (!value || value.trim() === '') {
          return 'El CVV es requerido.';
        }
        if (value.length != 3 ) {
          return 'El CVV debe tener 3.';
        }
        break;
      
      default:
        break;
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    const requiredFields = ['nombre', 'direccion', 'ciudad', 'tarjeta', 'expiracion', 'cvv'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Guardar datos del pedido para la boleta
    const orderData = {
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      customerInfo: {
        nombre: form.nombre,
        direccion: form.direccion,
        ciudad: form.ciudad,
        telefono: form.telefono
      },
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        offer: item.offer,
        priceOffer: item.priceOffer
      })),
      subtotal: subtotal,
      iva: iva,
      total: total
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
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
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-success">
              <div className="card-body p-5">
                <div className="mb-4">
                  <svg
                    className="text-success"
                    width="80"
                    height="80"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </div>
                <h2 className="fw-bold mb-3 text-success">¡Gracias por tu compra!</h2>
                <p className="text-muted mb-4">
                  Hemos recibido tu pedido y estamos procesándolo. Pronto recibirás un email con los
                  detalles del envío.
                </p>
                
                <div className="alert alert-info mb-4">
                  <h5 className="alert-heading">
                    <svg width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    Descarga tu boleta
                  </h5>
                  <p className="mb-3">Puedes descargar o imprimir tu boleta de compra:</p>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/boleta')}
                  >
                    Descargar tu boleta aquí
                  </button>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button className="btn btn-success" onClick={() => navigate('/')}>
                    Volver al inicio
                  </button>
                  <button className="btn btn-outline-primary" onClick={() => navigate('/productos')}>
                    Ver más productos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                placeholder="Ej: Juan Vera"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              {errors.nombre && (
                <div className="invalid-feedback d-block">
                  {errors.nombre}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                placeholder="Ej: calle Antonio, Varas Nº 666"
                value={form.direccion}
                onChange={handleChange}
                required
              />
              {errors.direccion && (
                <div className="invalid-feedback d-block">
                  {errors.direccion}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                placeholder="Ej: Santiago "
                value={form.ciudad}
                onChange={handleChange}
                required
              />
              {errors.ciudad && (
                <div className="invalid-feedback d-block">
                  {errors.ciudad}
                </div>
              )}
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
                placeholder="Ej: (+56) 9 12345678"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tarjeta" className="form-label">
                Número de tarjeta (16 dígitos)
              </label>
              <input
                type="text"
                id="tarjeta"
                name="tarjeta"
                className={`form-control ${errors.tarjeta ? 'is-invalid' : ''}`}
                placeholder="1234 5678 9012 3456"
                value={form.tarjeta}
                onChange={handleChange}
                maxLength="19"
                required
              />
              {errors.tarjeta && (
                <div className="invalid-feedback d-block">
                  {errors.tarjeta}
                </div>
              )}
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
                  className={`form-control ${errors.expiracion ? 'is-invalid' : ''}`}
                  placeholder="12/25"
                  value={form.expiracion}
                  onChange={handleChange}
                  maxLength="5"
                  required
                />
                {errors.expiracion && (
                  <div className="invalid-feedback d-block">
                    {errors.expiracion}
                  </div>
                )}
              </div>
              <div className="col">
                <label htmlFor="cvv" className="form-label">
                  CVV 
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                  placeholder="123"
                  value={form.cvv}
                  onChange={handleChange}
                  maxLength="4"
                  required
                />
                {errors.cvv && (
                  <div className="invalid-feedback d-block">
                    {errors.cvv}
                  </div>
                )}
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