const productos = [
  {
    id: 1,
    nombre: "Detergente Líquido",
    desc: "Ideal para ropa y superficies.",
    img: "img/Detergente.jpg",
    precio: 5990,
    oferta: false,
    precioOferta: null,
    descripcionLarga: "Detergente líquido con alto poder de limpieza y cuidado de las telas. Apto para lavado a mano o en máquina.",
    specs: {
      "Tipo de Producto": "Detergentes",
      "Variante": "Original",
      "Cantidad": "900 ml",
      "Formato": "Líquido",
      "Envase": "Botella",
      "Estado": "Líquido",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "Válida hasta su fecha de caducidad"
    }
  },
  {
    id: 2,
    nombre: "Cloro Desinfectante",
    desc: "Elimina el 99.9% de bacterias.",
    img: "img/Cloro.jpg",
    precio: 2500,
    oferta: true,
    precioOferta: 2000,
    descripcionLarga: "Solución desinfectante multiuso ideal para baños y cocinas. Utilizar diluido según indicaciones.",
    specs: {
      "Tipo de Producto": "Desinfectantes",
      "Variante": "Original",
      "Cantidad": "1 L",
      "Formato": "Líquido",
      "Envase": "Botella",
      "Estado": "Líquido",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "Válida hasta su fecha de caducidad"
    }
  },
  {
    id: 3,
    nombre: "Escoba Multiuso",
    desc: "Perfecta para interiores y exteriores.",
    img: "img/escoba.jpg",
    precio: 3500,
    oferta: false,
    precioOferta: null,
    descripcionLarga: "Escoba con cerdas resistentes para distintos tipos de superficies. Mango compatible estándar.",
    specs: {
      "Tipo de Producto": "Accesorios de limpieza",
      "Formato": "Escoba",
      "Material": "Plástico y fibras sintéticas",
      "Uso": "Interior/Exterior",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "6 meses"
    }
  },
  {
    id: 4,
    nombre: "Guantes de Limpieza",
    desc: "Protección para tus manos.",
    img: "img/guantes.jpg",
    precio: 1500,
    oferta: true,
    precioOferta: 1200,
    descripcionLarga: "Guantes reutilizables con recubrimiento antideslizante para mayor seguridad durante la limpieza.",
    specs: {
      "Tipo de Producto": "Guantes",
      "Talla": "M",
      "Material": "Látex",
      "Contenido": "1 par",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "3 meses"
    }
  },
  {
    id: 5,
    nombre: "Esponja Multiuso",
    desc: "Ideal para cocina y baño.",
    img: "img/esponja.jpg",
    precio: 800,
    oferta: false,
    precioOferta: null,
    descripcionLarga: "Esponja de doble textura para limpieza efectiva sin rayar.",
    specs: {
      "Tipo de Producto": "Accesorios de limpieza",
      "Formato": "Esponja",
      "Contenido": "1 unidad",
      "Uso": "Cocina y baño",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "3 meses"
    }
  },
  {
    id: 6,
    nombre: "Limpiavidrios",
    desc: "Brillo sin manchas.",
    img: "img/limpiavidrios.jpg",
    precio: 3000,
    oferta: true,
    precioOferta: 2500,
    descripcionLarga: "Fórmula especial para vidrios y espejos que no deja residuos.",
    specs: {
      "Tipo de Producto": "Limpia vidrios",
      "Cantidad": "500 ml",
      "Formato": "Spray",
      "Envase": "Botella con gatillo",
      "Estado": "Líquido",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "Válida hasta su fecha de caducidad"
    }
  },
  {
    id: 7,
    nombre: "Trapo de Piso",
    desc: "Absorbente y resistente.",
    img: "img/trapo.jpg",
    precio: 1000,
    oferta: false,
    precioOferta: null,
    descripcionLarga: "Paño absorbente para limpieza de pisos y superficies de alto tráfico.",
    specs: {
      "Tipo de Producto": "Accesorios de limpieza",
      "Formato": "Paño",
      "Material": "Algodón/Poliéster",
      "Contenido": "1 unidad",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "3 meses"
    }
  },
  {
    id: 8,
    nombre: "Escobillón",
    desc: "Cerdas resistentes para exteriores.",
    img: "img/escobillon.jpg",
    precio: 2200,
    oferta: false,
    precioOferta: null,
    descripcionLarga: "Escobillón de cerdas duras ideal para patios y veredas.",
    specs: {
      "Tipo de Producto": "Accesorios de limpieza",
      "Formato": "Escobillón",
      "Uso": "Exterior",
      "Material": "Plástico y fibras",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "6 meses"
    }
  },
  {
    id: 9,
    nombre: "Limpiapisos",
    desc: "Fragancia duradera.",
    img: "img/limpiapisos.jpg",
    precio: 3500,
    oferta: true,
    precioOferta: 3000,
    descripcionLarga: "Limpiador de pisos con fragancia prolongada y acción desengrasante.",
    specs: {
      "Tipo de Producto": "Limpiapisos",
      "Cantidad": "900 ml",
      "Formato": "Líquido",
      "Envase": "Botella",
      "Estado": "Líquido",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "Válida hasta su fecha de caducidad"
    }
  },
  {
    id: 10,
    nombre: "Cepillo de Limpieza",
    desc: "Ideal para superficies difíciles.",
    img: "img/cepillo.jpg",
    precio: 1800,
    oferta: false,
    precioOferta: null,
    descripcionLarga: "Cepillo manual con cerdas firmes para remover suciedad adherida.",
    specs: {
      "Tipo de Producto": "Accesorios de limpieza",
      "Formato": "Cepillo",
      "Material": "Plástico y cerdas sintéticas",
      "Uso": "Multiuso",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "3 meses"
    }
  },
  {
    id: 11,
    nombre: "Bolsas de Basura",
    desc: "Resistentes y prácticas.",
    img: "img/bolsas.jpg",
    precio: 1500,
    oferta: false,
    precioOferta: null,
    descripcionLarga: "Bolsas de alta resistencia para residuos domésticos.",
    specs: {
      "Tipo de Producto": "Bolsas",
      "Capacidad": "80 L",
      "Contenido": "10 unidades",
      "Color": "Negro",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "3 meses"
    }
  },
  {
    id: 12,
    nombre: "Limpiador Multiuso",
    desc: "Eficaz en todas las superficies.",
    img: "img/limpiador-multiuso.jpg",
    precio: 3200,
    oferta: true,
    precioOferta: 2800,
    descripcionLarga: "Limpiador concentrado para múltiples superficies. Ideal para uso diario.",
    specs: {
      "Tipo de Producto": "Limpiadores multiuso",
      "Cantidad": "900 ml",
      "Formato": "Líquido",
      "Envase": "Botella",
      "Estado": "Líquido",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "Válida hasta su fecha de caducidad"
    }
  },
  {
    id: 13,
    nombre: "Anti Sarro",
    desc: "Elimina sarro y manchas.",
    img: "img/anti-sarro.jpg",
    precio: 5000,
    oferta: true,
    precioOferta: 4500,
    descripcionLarga: "Elimina sarro y manchas difíciles.",
    specs: {
      "Tipo de Producto": "Desincrustantes",
      "Cantidad": "500 ml",
      "Formato": "Líquido",
      "Envase": "Botella",
      "Estado": "Líquido",
      "País de Origen": "Chile",
      "Garantía Mínima Legal": "Válida hasta su fecha de caducidad"
    }
  }
];

// Obtener ID de la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
let producto = productos.find(p => p.id === id) || productos[0];

function generarID() {
  return 'SKU-' + Math.floor(100000 + Math.random() * 900000);
}

// Mostrar datos
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('detalle-img').src = producto.img;
  document.getElementById('detalle-nombre').textContent = producto.nombre;
  document.getElementById('detalle-desc').textContent = producto.desc;
  document.getElementById('detalle-id').textContent = 'ID: ' + generarID();
  if (producto.oferta) {
    document.getElementById('detalle-precios').innerHTML = `<span class="detalle-precio-oferta">$${producto.precioOferta.toLocaleString()}</span> <span class="detalle-precio-tachado">$${producto.precio.toLocaleString()}</span>`;
  } else {
    document.getElementById('detalle-precios').innerHTML = `<span class="detalle-precio">$${producto.precio.toLocaleString()}</span>`;
  }

  // Descripción corta de 15 palabras (pestaña)
  const descCortaEl = document.getElementById('detalle-descripcion-corta');
  if (descCortaEl) {
    const base = (producto.descripcionLarga || producto.desc || '').trim();
    const palabras = base.split(/\s+/).filter(Boolean);
    const corta = palabras.slice(0, 15).join(' ');
    descCortaEl.textContent = corta + (palabras.length > 15 ? '…' : '');
  }

  // Renderizar tabla de características
  const tbody = document.querySelector('#tabla-caracteristicas tbody');
  if (tbody) {
    const specs = producto.specs || {};
    const orden = [
      'Tipo de Producto','Producto Sustentable','Característica Sustentable','Dimensiones','Surtido','Variantes del Surtido','Variante','Cantidad','Formato','Contenido','Envase','Estado','País de Origen','Uso','Material','Capacidad','Color','Talla','Garantía Proveedor','Garantía Mínima Legal'
    ];
    const keys = Object.keys(specs);
    const ya = new Set();
    orden.forEach(k => {
      if (k in specs) {
        ya.add(k);
        tbody.insertAdjacentHTML('beforeend', filaSpec(k, specs[k]));
      }
    });
    keys.forEach(k => {
      if (!ya.has(k)) tbody.insertAdjacentHTML('beforeend', filaSpec(k, specs[k]));
    });
    if (!keys.length) {
      tbody.innerHTML = '<tr><td class="text-muted">Sin información adicional</td></tr>';
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btn-agregar-carrito').addEventListener('click', function (e) {
    e.preventDefault();
    const cantidad = Math.max(1, parseInt(document.getElementById('cantidad').value) || 1);
    agregarAlCarritoConCantidad(id, cantidad);
  });
});

function filaSpec(campo, valor) {
  return `<tr><th class="fw-normal text-muted" style="width: 220px;">${escapeHtml(campo)}</th><td>${escapeHtml(String(valor))}</td></tr>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


