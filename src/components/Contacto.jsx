function Contacto() {
  return (
    <main className="py-5">
      <div className="container">
        <div className="row g-4 align-items-start">
          {/* Izquierda: formulario */}
          <div className="col-lg-6">
            <p className="lf-eyebrow mb-2">Conectemos</p>
            <h1 className="lf-title mb-3">Envíanos tu mensaje</h1>
            <p className="text-muted mb-4">
              ¿Tienes dudas o sugerencias? Completa el formulario y te responderemos a la brevedad.
            </p>
            <div id="lfOk" className="alert alert-success d-none">¡Gracias! Tu mensaje fue enviado correctamente.</div>
            <div id="lfErr" className="alert alert-danger d-none">Por favor revisa los campos marcados.</div>
            <form id="lfForm" noValidate className="lf-form">
              <div className="row g-3">
                <div className="col-md-6">
                  <input id="name" type="text" className="form-control lf-input" placeholder="Nombre" required pattern="^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{2,50}$" />
                </div>
                <div className="col-md-6">
                  <input id="email" type="email" className="form-control lf-input" placeholder="Correo" required />
                </div>
                <div className="col-12">
                  <input id="subject" type="text" className="form-control lf-input" placeholder="Asunto" />
                </div>
                <div className="col-12">
                  <textarea id="message" className="form-control lf-input" rows={5} placeholder="Mensaje" required minLength={10} defaultValue={""} />
                </div>
                <div className="col-12">
                  <button id="lfBtn" type="submit" className="btn lf-btn w-100 py-3">Enviar mensaje</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <div className="ratio ratio-4x3 ratio-lg-1x1">
              <iframe src="https://www.google.com/maps?q=Duoc%20UC%20Antonio%20Varas%2C%20Santiago&output=embed" loading="lazy" className="rounded-3" />
            </div>
          </div>
        </div>
        <div className="row g-3 mt-5">
          <div className="col-sm-6 col-lg-3">
            <div className="lf-card d-flex align-items-center p-3">
              <i className="bi bi-geo-alt-fill lf-icon" />
              <div>
                <h6 className="mb-1">Dirección</h6><small>Duoc UC Antonio Varas, Santiago</small>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="lf-card d-flex align-items-center p-3">
              <i className="bi bi-telephone-fill lf-icon" />
              <div>
                <h6 className="mb-1">Teléfono</h6><small>+56 9 1234 5678</small>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
          </div>
        </div></div></main>

  );
}

export default Contacto;