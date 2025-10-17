import React from 'react';


export default function Nosotros() {
  return (
    <div className="container my-4">
      {/* Nosotros seccion */}
      <section className="about-hero rounded-4 p-4 p-md-5 mb-5 bg-light">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h2 className="fw-bold color-principal mb-3">Sobre Nosotros</h2>
            <p className="lead mb-0">
              En LimpiFresh nos especializamos en productos de limpieza sustentables para el hogar.
              Nuestro objetivo es entregar calidad y cuidar el medio ambiente. Todos nuestros productos
              están hechos con ingredientes biodegradables.
            </p>
          </div>
          <div className="col-lg-5 text-center">
            <img
              src="/img/sobrenosotros.jpg"
              alt="Ilustración Sobre Nosotros"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="mb-5">
        <h3 className="fw-semibold text-center mb-4">Nuestros Servicios</h3>
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="service-card h-100 text-center p-4 rounded-4 bg-white shadow-sm">
              <div className="service-icon mb-2 fs-2 text-success">
                <i className="bi bi-percent"></i>
              </div>
              <a href="/ofertas" className="text-decoration-none fw-semibold text-dark">
                Ofertas
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="service-card h-100 text-center p-4 rounded-4 bg-white shadow-sm">
              <div className="service-icon mb-2 fs-2 text-success">
                <i className="bi bi-person"></i>
              </div>
              <a href="/contacto" className="text-decoration-none fw-semibold text-dark">
                Atención 24/7
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FreshCommunity secciom */}
      <section className="mb-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h3 className="fw-semibold mb-3">FreshComunity</h3>
            <p className="mb-0">
              En LimpiFresh somos más que una tienda de limpieza: somos parte de FreshComunity, una comunidad
              comprometida con el bienestar, la higiene y el cuidado de nuestros espacios compartidos.
              Creemos que la limpieza no solo transforma lugares, sino también la forma en que vivimos. Por eso
              trabajamos día a día para ofrecerte productos de calidad, precios justos y un servicio cercano,
              pensado para hogares, negocios y comunidades que valoran el orden y la frescura.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/img/freshcomunity.jpg"
              alt="FreshComunity"
              className="img-fluid rounded-4"
              style={{ width: '80%' }}
            />
          </div>
        </div>
      </section>

      {/* Seccion de equipo*/}
      <section className="mb-4">
        <h3 className="fw-semibold text-center mb-4">El equipo de desarrolladores</h3>
        <div className="row justify-content-center g-4">
          {['Benjamin Mella', 'Leandro Gonzalez', 'Alonso Carrasco'].map((name) => (
            <div className="col-md-4" key={name}>
              <div className="card h-100 shadow text-center border-0">
                <img
                  src="/img/rostro.jpg"
                  alt={name}
                  className="card-img-top rounded-circle mx-auto mt-4"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h4 className="card-title mb-1">{name}</h4>
                  <p className="card-text text-muted">Desarrollador backend y frontend</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}