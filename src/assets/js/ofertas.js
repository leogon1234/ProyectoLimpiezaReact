// Muestra los productos en oferta en Ofertas.html

document.addEventListener('DOMContentLoaded', function () {
    // Debe coincidir con el array de productos de carrito.js
    const productos = [
        { id: 1, nombre: "Detergente Líquido", img: "img/Detergente.jpg", precio: 5990, oferta: false, precioOferta: null },
        { id: 2, nombre: "Cloro Desinfectante", img: "img/Cloro.jpg", precio: 2500, oferta: true, precioOferta: 2000 },
        { id: 3, nombre: "Escoba Multiuso", img: "img/escoba.jpg", precio: 3500, oferta: false, precioOferta: null },
        { id: 4, nombre: "Guantes de Limpieza", img: "img/guantes.jpg", precio: 1500, oferta: true, precioOferta: 1200 },
        { id: 5, nombre: "Esponja Multiuso", img: "img/esponja.jpg", precio: 800, oferta: false, precioOferta: null },
        { id: 6, nombre: "Limpiavidrios", img: "img/limpiavidrios.jpg", precio: 3000, oferta: true, precioOferta: 2500 },
        { id: 7, nombre: "Trapo de Piso", img: "img/trapo.jpg", precio: 1000, oferta: false, precioOferta: null },
        { id: 8, nombre: "Escobillón", img: "img/escobillon.jpg", precio: 2200, oferta: false, precioOferta: null },
        { id: 9, nombre: "Limpiapisos", img: "img/limpiapisos.jpg", precio: 3500, oferta: true, precioOferta: 3000 },
        { id: 10, nombre: "Cepillo de Limpieza", img: "img/cepillo.jpg", precio: 1800, oferta: false, precioOferta: null },
        { id: 11, nombre: "Bolsas de Basura", img: "img/bolsas.jpg", precio: 1500, oferta: false, precioOferta: null },
        { id: 12, nombre: "Limpiador Multiuso", img: "img/limpiador-multiuso.jpg", precio: 3200, oferta: true, precioOferta: 2800 }
    ];

    const ofertas = productos.filter(p => p.oferta);
    const lista = document.getElementById('ofertas-lista');
    let html = '';
    ofertas.forEach(prod => {
        html += `
      <div class="col-md-4">
        <a href="detalle-producto.html?id=${prod.id}" class="link-producto">
          <div class="card h-100 shadow-sm position-relative">
            <span class="badge-sale">Descuento</span>
            <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}" />
            <div class="card-body text-center d-flex flex-column justify-content-between h-100">
              <div>
                <h5 class="card-title">${prod.nombre}</h5>
                <div class="precios-oferta">
                  <span class="precio-oferta">$${prod.precioOferta.toLocaleString()}</span>
                  <span class="precio-tachado">$${prod.precio.toLocaleString()}</span>
                </div>
              </div>
              <button class="btn btn-success mt-3" onclick="event.preventDefault(); agregarAlCarrito(${prod.id});">Agregar al carrito</button>
            </div>
          </div>
        </a>
      </div>
    `;
    });
    lista.innerHTML = html;
});

    const productos = [
        { id: 1, nombre: "Detergente Líquido 900ml", img: "img/Detergente.jpg", precio: 5990, oferta: false, precioOferta: null },
        { id: 2, nombre: "Cloro Desinfectante 1L", img: "img/Cloro.jpg", precio: 2500, oferta: true, precioOferta: 2000 },
        { id: 3, nombre: "Escoba Multiuso 1 Unidad", img: "img/escoba.jpg", precio: 3500, oferta: false, precioOferta: null },
        { id: 4, nombre: "Guantes de Limpieza 1 Par", img: "img/guantes.jpg", precio: 1500, oferta: true, precioOferta: 1200 },
        { id: 5, nombre: "Esponja Multiuso 1 Unidad", img: "img/esponja.jpg", precio: 800, oferta: false, precioOferta: null },
        { id: 6, nombre: "Limpiavidrios 900ml", img: "img/limpiavidrios.jpg", precio: 3000, oferta: true, precioOferta: 2500 },
        { id: 7, nombre: "Trapo de Piso 1 Unidad", img: "img/trapo.jpg", precio: 1000, oferta: false, precioOferta: null },
        { id: 8, nombre: "Escobillón 1 Unidad", img: "img/escobillon.jpg", precio: 2200, oferta: false, precioOferta: null },
        { id: 9, nombre: "Limpiapisos 1 Unidad", img: "img/limpiapisos.jpg", precio: 3500, oferta: true, precioOferta: 3000 },
        { id: 10, nombre: "Cepillo de Limpieza 1 Unidad", img: "img/cepillo.jpg", precio: 1800, oferta: false, precioOferta: null },
        { id: 11, nombre: "Bolsas de Basura 10 Unidades", img: "img/bolsas.jpg", precio: 1500, oferta: false, precioOferta: null },
        { id: 12, nombre: "Limpiador Multiuso 900ml", img: "img/limpiador-multiuso.jpg", precio: 3200, oferta: true, precioOferta: 2800 },
        { id: 13, nombre: "Anti Sarro 900ml", img: "img/anti-sarro.jpg", precio: 5000, oferta: true, precioOferta: 4500 }
    ];

    function mostrarOfertas() {
        const ofertas = productos.filter(p => p.oferta);
        const lista = document.getElementById('ofertas-lista');
        let html = '';
        ofertas.forEach(prod => {
            html += `
      <div class="col-md-4">
    <a href="detalle-producto.html?id=${prod.id}" class="link-producto">
          <div class="card h-100 shadow-sm position-relative">
            <span class="badge-sale">Descuento</span>
            <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}" />
            <div class="card-body text-center d-flex flex-column justify-content-between h-100">
              <div>
                <h5 class="card-title">${prod.nombre}</h5>
                <div class="precios-oferta">
                  <span class="precio-oferta">$${prod.precioOferta.toLocaleString()}</span>
                  <span class="precio-tachado">$${prod.precio.toLocaleString()}</span>
                </div>
              </div>
              <button class="btn btn-success mt-3" onclick="event.preventDefault(); agregarAlCarrito(${prod.id});">Agregar al carrito</button>
            </div>
          </div>
        </a>
      </div>
    `;
        });
        lista.innerHTML = html;
    }

    document.addEventListener('DOMContentLoaded', mostrarOfertas);