// --- Mostrar productos en carrito.html ---
if (window.location.pathname.endsWith('carrito.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    // Array de productos igual que en detalle-producto.js
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
    const carrito = getCarrito();
    const lista = document.getElementById('carrito-lista');
    const totalSpan = document.getElementById('carrito-total');
    if (!carrito.length) {
      lista.innerHTML = '<p>El carrito está vacío.</p>';
      totalSpan.textContent = '$0';
      const ivaDiv = document.getElementById('carrito-original-iva');
      if (ivaDiv) ivaDiv.innerHTML = '';
      return;
    }
    let total = 0;
    let html = '<table class="table"><thead><tr><th>Producto</th><th>Nombre</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th><th></th></tr></thead><tbody>';
    carrito.forEach(item => {
      const prod = productos.find(p => p.id === item.id);
      if (!prod) return;
      const precioUnit = prod.oferta ? prod.precioOferta : prod.precio;
      const subtotal = precioUnit * item.cantidad;
      total += subtotal;
      html += `<tr><td><img src="${prod.img}" alt="${prod.nombre}" style="width:60px;height:60px;object-fit:contain;"></td><td>${prod.nombre}</td><td>${item.cantidad}</td><td>$${precioUnit.toLocaleString()}</td><td>$${subtotal.toLocaleString()}</td><td><button class='btn btn-danger btn-sm' onclick='eliminarDelCarrito(${item.id})'><i class="bi bi-trash"></i></button></td></tr>`;
    });
    html += '</tbody></table>';
    lista.innerHTML = html;
    totalSpan.textContent = '$' + total.toLocaleString();
    // Calcular y mostrar IVA (columna, sin recuadro, y el subtotal + iva da el total mostrado)
    const ivaDiv = document.getElementById('carrito-original-iva');
    if (ivaDiv) {
      // El total mostrado es el precio final (con IVA)
      const subtotal = Math.round(total / 1.19);
      const iva = total - subtotal;
      ivaDiv.innerHTML = `
            <div class="carrito-iva-col">
              <span class="carrito-iva-item">Subtotal: <b>$${subtotal.toLocaleString()}</b></span>
              <span class="carrito-iva-item">IVA (19%): <b>$${iva.toLocaleString()}</b></span>
            </div>
          `;
    }
  });
}

// Eliminar producto del carrito
window.eliminarDelCarrito = function (id) {
  let carrito = getCarrito();
  carrito = carrito.filter(item => item.id !== id);
  setCarrito(carrito);
  location.reload();
}
// --- Carrito global ---
// Utiliza localStorage para persistir el carrito

function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function setCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  const carrito = getCarrito();
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.querySelectorAll('#carrito-contador').forEach(el => el.textContent = total);
}

// Llamar al cargar la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
} else {
  actualizarContadorCarrito();
}

// --- Lógica para agregar desde Productos.html ---
window.agregarAlCarrito = function (id) {
  const carrito = getCarrito();
  const idx = carrito.findIndex(p => p.id === id);
  if (idx >= 0) {
    carrito[idx].cantidad += 1;
  } else {
    carrito.push({ id, cantidad: 1 });
  }
  setCarrito(carrito);
  actualizarContadorCarrito();
};

// --- Lógica para agregar desde detalle-producto.html ---
window.agregarAlCarritoConCantidad = function (id, cantidad) {
  const carrito = getCarrito();
  const idx = carrito.findIndex(p => p.id === id);
  if (idx >= 0) {
    carrito[idx].cantidad += cantidad;
  } else {
    carrito.push({ id, cantidad });
  }
  setCarrito(carrito);
  actualizarContadorCarrito();
};
