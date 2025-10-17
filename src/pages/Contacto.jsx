import React, { useState } from 'react';


export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado', form);
    setSubmitted(true);
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        {/* Columna izquierda: título y formulario */}
        <div className="col-lg-6">
          <p className="lf-eyebrow mb-2">Conectemos</p>
          <h1 className="lf-title mb-3">Envíanos tu mensaje</h1>
          <p className="text-muted mb-4">
            ¿Tienes dudas o sugerencias? Completa el formulario y te responderemos a la brevedad.
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
                  className="form-control lf-input"
                  placeholder="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  id="email"
                  type="email"
                  className="form-control lf-input"
                  placeholder="Correo"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <input
                  id="asunto"
                  type="text"
                  className="form-control lf-input"
                  placeholder="Asunto"
                  name="asunto"
                  value={form.asunto}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <textarea
                  id="mensaje"
                  className="form-control lf-input"
                  rows="5"
                  placeholder="Mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn lf-btn w-100 py-3">
                  Enviar mensaje
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Columna derecha: mapa */}
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
      {/* Tarjetas de contacto */}
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