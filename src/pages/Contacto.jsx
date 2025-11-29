import React, { useState } from "react";
import api from "../api/api.js";

const ASUNTOS = [
  { value: "", label: "Selecciona un asunto" },
  { value: "Reembolso", label: "Reembolso" },
  { value: "Devolución", label: "Devolución" },
  { value: "Cambio de producto", label: "Cambio de producto" },
  { value: "Consulta", label: "Consulta general" },
  { value: "Sugerencia", label: "Sugerencia" },
  { value: "Reclamo", label: "Reclamo" },
];

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  
  const [contactos, setContactos] = useState([]);

  const validarContacto = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    else if (!nameRegex.test(form.nombre))
      newErrors.nombre = "El nombre solo debe contener letras.";

    if (!form.email.trim()) newErrors.email = "El correo es obligatorio.";
    else if (!emailRegex.test(form.email))
      newErrors.email = "El correo no tiene un formato válido.";

    if (!form.asunto.trim()) newErrors.asunto = "Debes seleccionar un asunto.";
    if (!form.mensaje.trim())
      newErrors.mensaje = "El mensaje no puede estar vacío.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarErrores = validarContacto();

    if (Object.keys(validarErrores).length > 0) {
      setErrors(validarErrores);
      setSubmitted(false);
      return;
    }

    try {
      await api.post("/contacto", form);
      setSubmitted(true);
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
      setErrors({});
    } catch (err) {
      console.error("Error enviando contacto", err);
      alert("Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.");
      setSubmitted(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        {/* Columna izquierda: título y formulario */}
        <div className="col-lg-6">
          <p className="lf-eyebrow mb-2">Conectemos</p>
          <h1 className="lf-title mb-3">Envíanos tu mensaje</h1>
          <p className="text-muted mb-4">
            ¿Tienes dudas o sugerencias? Completa el formulario y te
            responderemos a la brevedad.
          </p>
          {submitted && (
            <div className="alert alert-success" role="alert">
              ¡Gracias! Tu mensaje fue enviado correctamente.
            </div>
          )}
          <form onSubmit={handleSubmit} className="lf-form" noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  id="nombre"
                  type="text"
                  className={`form-control lf-input ${
                    errors.nombre ? "is-invalid" : ""
                  }`}
                  placeholder="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && (
                  <div className="invalid-feedback">{errors.nombre}</div>
                )}
              </div>
              <div className="col-md-6">
                <input
                  id="email"
                  type="email"
                  className={`form-control lf-input ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Correo"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="col-12">
                <select
                  id="asunto"
                  className={`form-select lf-input ${
                    errors.asunto ? "is-invalid" : ""
                  }`}
                  name="asunto"
                  value={form.asunto}
                  onChange={handleChange}
                >
                  {ASUNTOS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.asunto && (
                  <div className="invalid-feedback">{errors.asunto}</div>
                )}
              </div>
              <div className="col-12">
                <textarea
                  id="mensaje"
                  className={`form-control lf-input ${
                    errors.mensaje ? "is-invalid" : ""
                  }`}
                  rows="5"
                  placeholder="Mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                ></textarea>
                {errors.mensaje && (
                  <div className="invalid-feedback">{errors.mensaje}</div>
                )}
              </div>
              <div className="col-12">
                <button type="submit" className="btn lf-btn w-100 py-3">
                  Enviar mensaje
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Columna derecha: mapa (igual que ya tenías) */}
        <div className="col-lg-6">
          <div className="ratio ratio-4x3 ratio-lg-1x1">
            <iframe
              src="https://www.google.com/maps?q=Duoc%20UC%20Antonio%20Varas%2C%20Santiago&output=embed"
              loading="lazy"
              className="rounded-3 w-100 h-100"
              title="Mapa Duoc UC Antonio Varas"
            ></iframe>
          </div>
        </div>
      </div>
      {/* Tarjetas de contacto (igual que ya tenías) */}
      <div className="row g-3 mt-5">
        <div className="col-sm-6 col-lg-3">
          <div className="lf-card d-flex align-items-center p-3">
            <i className="bi bi-geo-alt-fill lf-icon me-3"></i>
            <div>
              <h6 className="mb-1">Dirección</h6>
              <small>Duoc UC Antonio Varas, Santiago</small>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="lf-card d-flex align-items-center p-3">
            <i className="bi bi-telephone-fill lf-icon me-3"></i>
            <div>
              <h6 className="mb-1">Teléfono</h6>
              <small>+56 9 1234 5678</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
