import React from 'react';
import bolsa from '../assets/img/Bolsas.jpg';
import escoba from '../assets/img/escoba.jpg';
import detegente from '../assets/img/Detergente.jpg';

function Blog() {
  return (
    <div>
      <main className="container my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold color-principal">Blogs de la FreshComunity</h2>
          <p className="text-muted">Conoce más sobre nuestros productos, procesos y compromiso con el medio ambiente.</p>
        </div>
        <div className="row justify-content-center g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
              <div className="row g-0 align-items-center">
                <div className="col-4 text-center">
                  <img src={bolsa} alt="Bolsas ecológicas" className="img-fluid rounded-start p-3" style={{ maxWidth: 120 }} />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">Bolsas 100% ecológicas</h5>
                    <p className="card-text">Las bolsas de basura modernas están hechas para resistir el peso y
                      los olores.
                      En LimpiFresh promovemos las bolsas biodegradables para cuidar el medio ambiente.
                    </p>
                    <a href="pagina-blog.html" className="btn btn-outline-success btn-sm mt-2">Más aquí</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
              <div className="row g-0 align-items-center">
                <div className="col-4 text-center">
                  <img src={escoba} alt="Escobas recicladas" className="img-fluid rounded-start p-3" style={{ maxWidth: 120 }} />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">Escobas de material reciclado</h5>
                    <p className="card-text">Desde su origen en el siglo XVIII, la escoba ha evolucionado en
                      materiales y diseño.
                      Hoy se fabrican con cerdas sintéticas más duraderas y mangos ergonómicos.</p>
                    <a href="pagina-blog.html" className="btn btn-outline-success btn-sm mt-2">Más aquí</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
              <div className="row g-0 align-items-center">
                <div className="col-4 text-center">
                  <img src={detegente} alt="Detergente ecológico" className="img-fluid rounded-start p-3" style={{ maxWidth: 120 }} />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">Detergentes sin químicos agresivos</h5>
                    <p className="card-text">El detergente líquido no solo limpia, sino que cuida las telas y
                      elimina bacterias.
                      En LimpiFresh, ofrecemos fórmulas biodegradables con fragancias naturales.</p>
                    <a href="pagina-blog.html" className="btn btn-outline-success btn-sm mt-2">Más aquí</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="my-5">
        <h3 className="text-center fw-bold mb-4 color-principal">Consejos Rápidos de Limpieza</h3>
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-droplet-half fs-1 text-success" />
            <h5 className="mt-3">Usa menos agua</h5>
            <p className="text-muted">Un balde de agua con jabón ecológico es suficiente para limpiar grandes áreas.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-recycle fs-1 text-success" />
            <h5 className="mt-3">Recicla envases</h5>
            <p className="text-muted">Nuestras botellas son 100% reciclables. Devuélvelas o reutilízalas en casa.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-brightness-high fs-1 text-success" />
            <h5 className="mt-3">Secado natural</h5>
            <p className="text-muted">Aprovecha el sol para secar y desinfectar tus utensilios de limpieza.</p>
          </div>
        </div>
      </section>
    </div>


  );
}

export default Blog;

