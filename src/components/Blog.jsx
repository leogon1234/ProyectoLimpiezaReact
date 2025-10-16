function Blog() {
  return (
    <main className="container my-5">
      <h2 className="text-center color-principal mb-4">Blog LimpiaFresh</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <img src="/img/blog1.jpg" className="card-img-top" alt="Consejos de limpieza" />
            <div className="card-body">
              <h5 className="card-title">Consejos para mantener tu hogar reluciente</h5>
              <p className="card-text">
                Aprende trucos fáciles y productos naturales para mantener cada rincón impecable.
              </p>
              <a href="#" className="btn btn-outline-primary">
                Leer más
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <img src="/img/blog2.jpg" className="card-img-top" alt="Organización de limpieza" />
            <div className="card-body">
              <h5 className="card-title">Cómo organizar tu rutina de limpieza semanal</h5>
              <p className="card-text">
                Una guía práctica para mantener el orden y ahorrar tiempo cada día.
              </p>
              <a href="#" className="btn btn-outline-primary">
                Leer más
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Blog;

