import React from "react";
import img1 from "../assets/img/carrosel1.png";
import img2 from "../assets/img/carrosel2.png";
import det from "../assets/img/Detergente.jpg";
import escoba from "../assets/img/escoba.jpg";
import cloro from "../assets/img/Cloro.jpg";

const Home = () => {
  const productos = [
    { id: 1, img: det, nombre: "Detergente Líquido 900ml", desc: "Ideal para ropa y superficies.", precio: "$5.990" },
    { id: 2, img: escoba, nombre: "Escoba Multiuso 1 Unidad", desc: "Perfecta para interiores y exteriores.", precio: "$3.500" },
    { id: 3, img: cloro, nombre: "Cloro Desinfectante 1L", desc: "Elimina el 99.9% de bacterias.", precio: "$2.000" },
  ];

  return (
    <main className="container my-5">
      <div className="text-center">
        <h2 className="mb-4">¡Bienvenido a Tienda de Limpieza!</h2>
        <p className="lead">
          Descubre la mejor selección de productos para la limpieza de tu hogar, oficina o negocio.<br />
          Ofrecemos calidad, buenos precios y atención personalizada.
        </p>
        <a href="/productos" className="btn btn-primary btn-lg mt-3">Ver productos</a>
      </div>

      <div id="marcasCarousel" className="carousel slide my-5 carousel-marcas" data-bs-ride="carousel" data-bs-interval="3500">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#marcasCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#marcasCarousel" data-bs-slide-to="1"></button>
        </div>
        <div className="carousel-inner rounded shadow-sm">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Calidad profesional</h5>
              <p>Las mejores marcas para tu hogar y negocio.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Variedad y buen precio</h5>
              <p>Detergentes, ceras, limpiadores y mucho más.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#marcasCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#marcasCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <hr className="my-5" />
      <h2 className="text-center mb-4">PRODUCTOS QUE PODRÍAN INTERESARTE</h2>
      <section className="row g-4">
        {productos.map(p => (
          <div key={p.id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img src={p.img} className="card-img-top" alt={p.nombre} />
              <div className="card-body text-center">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">{p.desc}</p>
                <span className="precio">{p.precio}</span>
                <button className="btn btn-success mt-2">Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
