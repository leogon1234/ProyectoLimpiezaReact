import React from "react";
const imagenes = import.meta.glob("../assets/img/*.{jpg,png,jpeg,webp}", { eager: true });

function Ofertas() {
  const productos = [
    { id: 1, nombre: "Detergente Líquido 900ml", img: imagenes["../assets/img/Detergente.jpg"].default, precio: 5990, oferta: false, precioOferta: null },
    { id: 2, nombre: "Cloro Desinfectante 1L", img: imagenes["../assets/img/Cloro.jpg"].default, precio: 2500, oferta: true, precioOferta: 2000 },
    { id: 3, nombre: "Escoba Multiuso 1 Unidad", img: imagenes["../assets/img/escoba.jpg"].default, precio: 3500, oferta: false, precioOferta: null },
    { id: 4, nombre: "Guantes de Limpieza 1 Par", img: imagenes["../assets/img/guantes.jpg"].default, precio: 1500, oferta: true, precioOferta: 1200 },
    { id: 5, nombre: "Esponja Multiuso 1 Unidad", img: imagenes["../assets/img/esponja.jpg"].default, precio: 800, oferta: false, precioOferta: null },
    { id: 6, nombre: "Limpiavidrios 900ml", img: imagenes["../assets/img/limpiavidrios.jpg"].default, precio: 3000, oferta: true, precioOferta: 2500 },
    { id: 7, nombre: "Trapo de Piso 1 Unidad", img: imagenes["../assets/img/trapo.jpg"].default, precio: 1000, oferta: false, precioOferta: null },
    { id: 8, nombre: "Escobillón 1 Unidad", img: imagenes["../assets/img/escobillon.jpg"].default, precio: 2200, oferta: false, precioOferta: null },
    { id: 9, nombre: "Limpiapisos 1 Unidad", img: imagenes["../assets/img/limpiapisos.jpg"].default, precio: 3500, oferta: true, precioOferta: 3000 },
    { id: 10, nombre: "Cepillo de Limpieza 1 Unidad", img: imagenes["../assets/img/cepillo.jpg"].default, precio: 1800, oferta: false, precioOferta: null },
    { id: 11, nombre: "Bolsas de Basura 10 Unidades", img: imagenes["../assets/img/Bolsas.jpg"].default, precio: 1500, oferta: false, precioOferta: null },
    { id: 12, nombre: "Limpiador Multiuso 900ml", img: imagenes["../assets/img/limpiador-multiuso.jpg"].default, precio: 3200, oferta: true, precioOferta: 2800 },
    { id: 13, nombre: "Anti Sarro 900ml", img: imagenes["../assets/img/anti-sarro.jpg"].default, precio: 5000, oferta: true, precioOferta: 4500 },
  ];

  const ofertas = productos.filter((p) => p.oferta);

  // Simula la función de agregar al carrito
  const agregarAlCarrito = (id) => {
    const prod = productos.find((p) => p.id === id);
    alert(`Producto agregado: ${prod.nombre}`);
  };

  return (
    <main className="container my-4">
      <h2 className="mb-4">Ofertas</h2>
      <div className="row g-4">
        {ofertas.map((prod) => (
          <div key={prod.id} className="col-md-4">
            <div className="card h-100 shadow-sm position-relative">
              <span className="badge-sale">Descuento</span>
              <img
                src={prod.img}
                className="card-img-top"
                alt={prod.nombre}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center d-flex flex-column justify-content-between h-100">
                <div>
                  <h5 className="card-title">{prod.nombre}</h5>
                  <div className="precios-oferta">
                    <span className="precio-oferta">
                      ${prod.precioOferta.toLocaleString()}
                    </span>
                    <span className="precio-tachado ms-2 text-muted text-decoration-line-through">
                      ${prod.precio.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  className="btn btn-success mt-3"
                  onClick={() => agregarAlCarrito(prod.id)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Ofertas;