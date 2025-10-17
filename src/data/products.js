export const products = [
  {
    id: 1,
    nombre: 'Detergente Líquido',
    desc: 'Ideal para ropa y superficies.',
    img: '/img/Detergente.jpg',
    precio: 5990,
    oferta: false,
    precioOferta: null,
    descripcionLarga:
      'Detergente líquido con alto poder de limpieza y cuidado de las telas. Apto para lavado a mano o en máquina.',
    categoria: 'Detergentes',
    specs: {
      'Tipo de Producto': 'Detergentes',
      Variante: 'Original',
      Cantidad: '900 ml',
      Formato: 'Líquido',
      Envase: 'Botella',
      Estado: 'Líquido',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': 'Válida hasta su fecha de caducidad',
    },
  },
  {
    id: 2,
    nombre: 'Cloro Desinfectante',
    desc: 'Elimina el 99.9% de bacterias.',
    img: '/img/Cloro.jpg',
    precio: 2500,
    oferta: true,
    precioOferta: 2000,
    descripcionLarga:
      'Solución desinfectante multiuso ideal para baños y cocinas. Utilizar diluido según indicaciones.',
    categoria: 'Desinfectantes',
    specs: {
      'Tipo de Producto': 'Desinfectantes',
      Variante: 'Original',
      Cantidad: '1 L',
      Formato: 'Líquido',
      Envase: 'Botella',
      Estado: 'Líquido',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': 'Válida hasta su fecha de caducidad',
    },
  },
  {
    id: 3,
    nombre: 'Escoba Multiuso',
    desc: 'Perfecta para interiores y exteriores.',
    img: '/img/escoba.jpg',
    precio: 3500,
    oferta: false,
    precioOferta: null,
    descripcionLarga:
      'Escoba con cerdas resistentes para distintos tipos de superficies. Mango compatible estándar.',
    categoria: 'Accesorios',
    specs: {
      'Tipo de Producto': 'Accesorios de limpieza',
      Formato: 'Escoba',
      Material: 'Plástico y fibras sintéticas',
      Uso: 'Interior/Exterior',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': '6 meses',
    },
  },
  {
    id: 4,
    nombre: 'Guantes de Limpieza',
    desc: 'Protección para tus manos.',
    img: '/img/guantes.jpg',
    precio: 1500,
    oferta: true,
    precioOferta: 1200,
    descripcionLarga:
      'Guantes reutilizables con recubrimiento antideslizante para mayor seguridad durante la limpieza.',
    categoria: 'Guantes',
    specs: {
      'Tipo de Producto': 'Guantes',
      Talla: 'M',
      Material: 'Látex',
      Contenido: '1 par',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': '3 meses',
    },
  },
  {
    id: 5,
    nombre: 'Esponja Multiuso',
    desc: 'Ideal para cocina y baño.',
    img: '/img/esponja.jpg',
    precio: 800,
    oferta: false,
    precioOferta: null,
    descripcionLarga: 'Esponja de doble textura para limpieza efectiva sin rayar.',
    categoria: 'Accesorios',
    specs: {
      'Tipo de Producto': 'Accesorios de limpieza',
      Formato: 'Esponja',
      Contenido: '1 unidad',
      Uso: 'Cocina y baño',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': '3 meses',
    },
  },
  {
    id: 6,
    nombre: 'Limpiavidrios',
    desc: 'Brillo sin manchas.',
    img: '/img/limpiavidrios.jpg',
    precio: 3000,
    oferta: true,
    precioOferta: 2500,
    descripcionLarga:
      'Fórmula especial para vidrios y espejos que no deja residuos.',
    categoria: 'Limpia vidrios',
    specs: {
      'Tipo de Producto': 'Limpia vidrios',
      Cantidad: '500 ml',
      Formato: 'Spray',
      Envase: 'Botella con gatillo',
      Estado: 'Líquido',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': 'Válida hasta su fecha de caducidad',
    },
  },
  {
    id: 7,
    nombre: 'Trapo de Piso',
    desc: 'Absorbente y resistente.',
    img: '/img/trapo.jpg',
    precio: 1000,
    oferta: false,
    precioOferta: null,
    descripcionLarga:
      'Paño absorbente para limpieza de pisos y superficies de alto tráfico.',
    categoria: 'Accesorios',
    specs: {
      'Tipo de Producto': 'Accesorios de limpieza',
      Formato: 'Paño',
      Material: 'Algodón/Poliéster',
      Contenido: '1 unidad',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': '3 meses',
    },
  },
  {
    id: 8,
    nombre: 'Escobillón',
    desc: 'Cerdas resistentes para exteriores.',
    img: '/img/escobillon.jpg',
    precio: 2200,
    oferta: false,
    precioOferta: null,
    descripcionLarga:
      'Escobillón de cerdas duras ideal para patios y veredas.',
    categoria: 'Accesorios',
    specs: {
      'Tipo de Producto': 'Accesorios de limpieza',
      Formato: 'Escobillón',
      Uso: 'Exterior',
      Material: 'Plástico y fibras',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': '6 meses',
    },
  },
  {
    id: 9,
    nombre: 'Limpiapisos',
    desc: 'Fragancia duradera.',
    img: '/img/limpiapisos.jpg',
    precio: 3500,
    oferta: true,
    precioOferta: 3000,
    descripcionLarga:
      'Limpiador de pisos con fragancia prolongada y acción desengrasante.',
    categoria: 'Limpiapisos',
    specs: {
      'Tipo de Producto': 'Limpiapisos',
      Cantidad: '900 ml',
      Formato: 'Líquido',
      Envase: 'Botella',
      Estado: 'Líquido',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': 'Válida hasta su fecha de caducidad',
    },
  },
  {
    id: 10,
    nombre: 'Cepillo de Limpieza',
    desc: 'Ideal para superficies difíciles.',
    img: '/img/cepillo.jpg',
    precio: 1800,
    oferta: false,
    precioOferta: null,
    descripcionLarga:
      'Cepillo manual con cerdas firmes para remover suciedad adherida.',
    categoria: 'Accesorios',
    specs: {
      'Tipo de Producto': 'Accesorios de limpieza',
      Formato: 'Cepillo',
      Material: 'Plástico y cerdas sintéticas',
      Uso: 'Multiuso',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': '3 meses',
    },
  },
  {
    id: 11,
    nombre: 'Bolsas de Basura',
    desc: 'Resistentes y prácticas.',
    img: '/img/Bolsas.jpg',
    precio: 1500,
    oferta: false,
    precioOferta: null,
    descripcionLarga:
      'Bolsas de alta resistencia para residuos domésticos.',
    categoria: 'Accesorios',
    specs: {
      'Tipo de Producto': 'Bolsas',
      Capacidad: '80 L',
      Contenido: '10 unidades',
      Color: 'Negro',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': '3 meses',
    },
  },
  {
    id: 12,
    nombre: 'Limpiador Multiuso',
    desc: 'Eficaz en todas las superficies.',
    img: '/img/limpiador-multiuso.jpg',
    precio: 3200,
    oferta: true,
    precioOferta: 2800,
    descripcionLarga:
      'Limpiador concentrado para múltiples superficies. Ideal para uso diario.',
    categoria: 'Limpiadores multiuso',
    specs: {
      'Tipo de Producto': 'Limpiadores multiuso',
      Cantidad: '900 ml',
      Formato: 'Líquido',
      Envase: 'Botella',
      Estado: 'Líquido',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': 'Válida hasta su fecha de caducidad',
    },
  },
  {
    id: 13,
    nombre: 'Anti Sarro',
    desc: 'Elimina sarro y manchas.',
    img: '/img/anti-sarro.jpg',
    precio: 5000,
    oferta: true,
    precioOferta: 4500,
    descripcionLarga: 'Elimina sarro y manchas difíciles.',
    categoria: 'Desincrustantes',
    specs: {
      'Tipo de Producto': 'Desincrustantes',
      Cantidad: '500 ml',
      Formato: 'Líquido',
      Envase: 'Botella',
      Estado: 'Líquido',
      'País de Origen': 'Chile',
      'Garantía Mínima Legal': 'Válida hasta su fecha de caducidad',
    },
  },
];

/**
 * Get a product by its numeric ID. Returns undefined if not found.
 *
 * @param {number} id - The ID of the product to retrieve.
 */
export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

/**
 * Get a unique list of categories from the product catalog. Categories are
 * derived from the categoria property of each product.
 */
export function getCategories() {
  const set = new Set(products.map((p) => p.categoria));
  return Array.from(set);
}