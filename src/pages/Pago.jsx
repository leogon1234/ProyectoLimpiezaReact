import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { useUser } from "../contexts/UserContext.jsx";

export default function Pago() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const ivaRate = 0.19;
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    direccion: "",
    ciudad: "",
    telefono: "",
    tarjeta: "",
    expiracion: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!user) {
      alert("Debes iniciar sesión para realizar una compra.");
      navigate("/login");
      return;
    }
    setForm((prev) => ({
      ...prev,
      direccion: user.direccion || "",
      ciudad: user.ciudad || "",
      telefono: user.telefono || "",
    }));
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "tarjeta") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 16) {
        newValue = onlyNumbers.match(/.{1,4}/g)?.join(" ") || onlyNumbers;
      } else {
        return;
      }
    }

    if (name === "expiracion") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 4) {
        if (onlyNumbers.length >= 2) {
          newValue = onlyNumbers.slice(0, 2) + "/" + onlyNumbers.slice(2);
        } else {
          newValue = onlyNumbers;
        }
      } else {
        return;
      }
    }

    if (name === "cvv") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 3) {
        newValue = onlyNumbers;
      } else {
        return;
      }
    }

    if (name === "telefono") {
      const onlyNumbers = value.replace(/\D/g, "");
      newValue = onlyNumbers;
    }

    setForm({ ...form, [name]: newValue });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "direccion":
        if (!value || value.trim() === "") return "La dirección es requerida.";
        if (value.trim().length < 5) return "La dirección debe tener al menos 5 caracteres.";
        break;
      case "ciudad":
        if (!value || value.trim() === "") return "La ciudad es requerida.";
        if (value.trim().length < 3) return "La ciudad debe tener al menos 3 caracteres.";
        break;
      case "tarjeta":
        if (!value || value.trim() === "") return "El número de tarjeta es requerido.";
        if (value.replace(/\D/g, "").length !== 16) return "El número de tarjeta debe tener 16 dígitos.";
        break;
      case "expiracion":
        if (!value || value.trim() === "") return "La fecha de expiración es requerida.";
        const parts = value.split("/");
        if (parts.length !== 2) return "Formato inválido. Use MM/AA.";
        const mes = parseInt(parts[0], 10);
        const anio = parseInt(parts[1], 10);
        if (mes < 1 || mes > 12) return "El mes debe estar entre 01 y 12.";
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1;
        const anioActual = parseInt(fechaActual.getFullYear().toString().slice(-2), 10);
        if (anio < anioActual || (anio === anioActual && mes < mesActual)) return "La tarjeta está vencida.";
        break;
      case "cvv":
        if (!value || value.trim() === "") return "El CVV es requerido.";
        if (value.length !== 3) return "El CVV debe tener 3 dígitos.";
        break;
      default:
        break;
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Debes iniciar sesión para comprar.");
      return navigate("/login");
    }

    const newErrors = {};
    const requiredFields = ["direccion", "ciudad", "tarjeta", "expiracion", "cvv"];

    requiredFields.forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        usuarioId: user.id,
        nombreCliente: user.nombre || user.name || "Cliente",
        email: user.email || null,
        direccion: form.direccion,
        ciudad: form.ciudad,
        telefono: form.telefono,
        items: cart.map((item) => ({
          productoId: item.id,
          cantidad: item.quantity,
        })),
      };

      const resp = await api.post("/api/boletas/checkout", payload);
      const b = resp.data;

      const orderData = {
        invoiceNumber: b.numeroBoleta,
        invoiceDate: b.fechaBoleta
          ? new Date(b.fechaBoleta).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
          : new Date().toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" }),
        customerInfo: {
          nombre: b.nombreCliente,
          direccion: b.direccion,
          ciudad: b.ciudad,
          telefono: b.telefono,
          email: b.email,
        },
        items: (b.items || []).map((it) => ({
          name: it.nombreProducto || it.producto?.nombre || "Producto",
          quantity: it.cantidad,
          price: it.precioUnitario,
          offer: !!it.ofertaAplicada,
          priceOffer: it.precioOfertaUnitario,
        })),
        subtotal: b.subtotal,
        iva: b.iva,
        total: b.total,
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      clearCart();
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("No se pudo registrar la boleta en el servidor.");
    }
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className="container py-4 text-center">
        <h2 className="fw-bold mb-3 color-principal">Pago</h2>
        <p className="text-muted">No tienes productos en el carrito.</p>
        <button className="btn btn-success" onClick={() => navigate("/productos")}>
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
                <h2 className="fw-bold mb-3 text-success">¡Gracias por tu compra!</h2>
                <p className="text-muted mb-4">Hemos recibido tu pedido y estamos procesándolo.</p>
                <div className="alert alert-info mb-4">
                  <h5 className="alert-heading">Descarga tu boleta</h5>
                  <p className="mb-3">Puedes descargar o imprimir tu boleta de compra:</p>
                  <button className="btn btn-primary btn-lg" onClick={() => navigate("/boleta")}>
                    Descargar tu boleta aquí
                  </button>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button className="btn btn-success" onClick={() => navigate("/")}>
                    Volver al inicio
                  </button>
                  <button className="btn btn-outline-primary" onClick={() => navigate("/productos")}>
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
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
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
        <div className="col-md-6 order-md-1">
          <h5 className="fw-bold mb-3">Datos de envío y pago</h5>
          <div className="mb-3">
            <label className="form-label">Nombre (cuenta)</label>
            <input className="form-control" value={user?.nombre || user?.name || ""} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Email (cuenta)</label>
            <input className="form-control" value={user?.email || ""} disabled />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                name="direccion"
                className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                value={form.direccion}
                onChange={handleChange}
                required
              />
              {errors.direccion && <div className="invalid-feedback d-block">{errors.direccion}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Ciudad</label>
              <input
                name="ciudad"
                className={`form-control ${errors.ciudad ? "is-invalid" : ""}`}
                value={form.ciudad}
                onChange={handleChange}
                required
              />
              {errors.ciudad && <div className="invalid-feedback d-block">{errors.ciudad}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono (opcional)</label>
              <input
                name="telefono"
                className="form-control"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Número de tarjeta (16 dígitos)</label>
              <input
                name="tarjeta"
                className={`form-control ${errors.tarjeta ? "is-invalid" : ""}`}
                value={form.tarjeta}
                onChange={handleChange}
                maxLength="19"
                required
              />
              {errors.tarjeta && <div className="invalid-feedback d-block">{errors.tarjeta}</div>}
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Expiración (MM/AA)</label>
                <input
                  name="expiracion"
                  className={`form-control ${errors.expiracion ? "is-invalid" : ""}`}
                  value={form.expiracion}
                  onChange={handleChange}
                  maxLength="5"
                  required
                />
                {errors.expiracion && <div className="invalid-feedback d-block">{errors.expiracion}</div>}
              </div>
              <div className="col">
                <label className="form-label">CVV</label>
                <input
                  name="cvv"
                  className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                  value={form.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  required
                />
                {errors.cvv && <div className="invalid-feedback d-block">{errors.cvv}</div>}
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