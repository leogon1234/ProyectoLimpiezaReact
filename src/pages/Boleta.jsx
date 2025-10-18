import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Boleta() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Obtener los datos del pedido desde localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (!savedOrder) {
      // Si no hay datos, redirigir al inicio
      navigate('/');
      return;
    }
    setOrderData(JSON.parse(savedOrder));
  }, [navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (!orderData) {
    return (
      <div className="container py-4 text-center">
        <p>Cargando boleta...</p>
      </div>
    );
  }

  const { invoiceNumber, invoiceDate, customerInfo, items, subtotal, iva, total } = orderData;

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between mb-3 d-print-none">
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Volver al inicio
            </button>
          </div>

          <div className="card shadow-lg border-0" id="invoice">
            <div className="card-body p-5">
              <div className="row mb-5">
                <div className="col-6">
                  <div className="mb-3">
                    <div className="border rounded p-3 d-inline-block bg-light">
                      <img
                        src="/img/logo.jpg"
                        alt="LimpiFresh Logo"
                        style={{ height: "60px" }}
                      />
                    </div>
                  </div>
                  <h5 className="text-muted mb-2">LimpiFresh</h5>
                  <p className="text-muted mb-0">Productos de Limpieza</p>
                  <p className="text-muted mb-0">Antonio Varas</p>
                  <p className="text-muted mb-0">Santiago, Chile</p>
                  <p className="text-primary mb-0">Chile</p>
                </div>
                <div className="col-6 text-end">
                  <h1 className="display-5 fw-bold text-dark mb-0">BOLETA</h1>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-6">
                  <h6 className="fw-bold mb-3">Facturado a:</h6>
                  <p className="text-muted mb-1">{customerInfo.nombre}</p>
                  <p className="text-muted mb-1">{customerInfo.direccion}</p>
                  <p className="text-muted mb-1">{customerInfo.ciudad}</p>
                  <p className="text-primary mb-0">Chile</p>
                  {customerInfo.telefono && (
                    <p className="text-muted mb-0">Tel: {customerInfo.telefono}</p>
                  )}
                </div>
                <div className="col-6">
                  <div className="row mb-2">
                    <div className="col-6 text-end">
                      <strong>Boleta #</strong>
                    </div>
                    <div className="col-6 text-end">
                      <span className="text-muted">{invoiceNumber}</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 text-end">
                      <strong>Fecha de Boleta</strong>
                    </div>
                    <div className="col-6 text-end">
                      <span className="text-muted">{invoiceDate}</span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 text-end">
                      <strong>Fecha de Pago</strong>
                    </div>
                    <div className="col-6 text-end">
                      <span className="text-muted">{invoiceDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive mb-4">
                <table className="table">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th className="py-3">Descripción del Artículo</th>
                      <th className="py-3 text-center">Cantidad</th>
                      <th className="py-3 text-end">Precio</th>
                      <th className="py-3 text-end">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      const unitPrice = item.offer && item.priceOffer ? item.priceOffer : item.price;
                      const amount = unitPrice * item.quantity;
                      return (
                        <tr key={index} className="border-bottom">
                          <td className="py-3">{item.name}</td>
                          <td className="py-3 text-center">{item.quantity}</td>
                          <td className="py-3 text-end">${unitPrice.toLocaleString()}</td>
                          <td className="py-3 text-end">${amount.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    
                    {items.length < 3 && [...Array(3 - items.length)].map((_, i) => (
                      <tr key={`empty-${i}`} className="border-bottom">
                        <td className="py-3 text-muted">
                          <span style={{ opacity: 0 }}>-</span>
                        </td>
                        <td className="py-3 text-center">-</td>
                        <td className="py-3 text-end">-</td>
                        <td className="py-3 text-end">-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="row justify-content-end">
                <div className="col-md-5">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>IVA (19%):</span>
                    <span>${iva.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="d-flex justify-content-between py-3 bg-light px-3">
                    <strong className="h5 mb-0">TOTAL</strong>
                    <strong className="h5 mb-0">$ {total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
}

