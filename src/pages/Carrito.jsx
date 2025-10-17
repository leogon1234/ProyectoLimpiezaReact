import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';


export default function Carrito() {
  const { cart, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  const ivaRate = 0.19;
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;

  const handleCheckout = () => {
    navigate('/pago');
  };

  if (cart.length === 0) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold mb-3 color-principal">Tu carrito</h2>
        <p className="text-muted">No hay productos en el carrito.</p>
        <Link to="/productos" className="btn btn-success">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 color-principal">Tu carrito</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mt-4">
        <div className="mb-3 mb-md-0">
          <button className="btn btn-danger" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>
        <div className="card shadow-sm" style={{ minWidth: '260px' }}>
          <div className="card-body">
            <h5 className="card-title fw-bold">Resumen</h5>
            <ul className="list-unstyled mb-3">
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
            <button className="btn btn-success w-100" onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}