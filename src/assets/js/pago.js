// Lista de productos
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

document.addEventListener('DOMContentLoaded', function() {
    cargarResumenCarrito();
    setupFormulario();
    setupMetodosPago();
});

function getCarrito() {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function cargarResumenCarrito() {
    const carrito = getCarrito();
    const resumenCarrito = document.getElementById('resumen-carrito');
    const totalItems = document.getElementById('total-items');
    const totalPrecio = document.getElementById('total-precio');
    
    resumenCarrito.innerHTML = '';
    
    let total = 0;
    
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) return;

        const precioUnitario = producto.oferta ? producto.precioOferta : producto.precio;
        const subtotal = precioUnitario * item.cantidad;
        total += subtotal;
        
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between lh-sm';
        li.innerHTML = `
            <div>
                <h6 class="my-0">${producto.nombre}</h6>
                <small class="text-muted">Cantidad: ${item.cantidad}</small>
            </div>
            <span class="text-muted">$${subtotal.toLocaleString()}</span>
        `;
        
        resumenCarrito.appendChild(li);
    });
    
    const subtotal = Math.round(total / 1.19);
    const iva = total - subtotal;
    
    const subtotalLi = document.createElement('li');
    subtotalLi.className = 'list-group-item d-flex justify-content-between';
    subtotalLi.innerHTML = `
        <span>Subtotal</span>
        <span>$${subtotal.toLocaleString()}</span>
    `;
    resumenCarrito.appendChild(subtotalLi);
    
    const ivaLi = document.createElement('li');
    ivaLi.className = 'list-group-item d-flex justify-content-between';
    ivaLi.innerHTML = `
        <span>IVA (19%)</span>
        <span>$${iva.toLocaleString()}</span>
    `;
    resumenCarrito.appendChild(ivaLi);
    
    totalItems.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    totalPrecio.textContent = `$${total.toLocaleString()}`;
}

const regionesComunas = {
    "Región Metropolitana": [
        "Santiago", "Providencia", "Las Condes", "Ñuñoa", "La Reina", 
        "Vitacura", "Lo Barnechea", "La Florida", "Maipú", "Puente Alto",
        "San Miguel", "La Cisterna", "San Bernardo", "Quilicura", "Renca"
    ],
    "Valparaíso": [
        "Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana",
        "San Antonio", "Quillota", "Los Andes", "San Felipe", "Casablanca"
    ],
    "Biobío": [
        "Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz", 
        "Hualpén", "Coronel", "Lota", "Los Ángeles", "Tomé", "Penco"
    ]
};

function setupFormulario() {
    const form = document.getElementById('formulario-pago');
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');
    
    Object.keys(regionesComunas).forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
    
    regionSelect.addEventListener('change', function() {
        comunaSelect.innerHTML = '<option value="">Seleccionar...</option>';
        
        if (this.value) {
            const comunas = regionesComunas[this.value];
            comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                comunaSelect.appendChild(option);
            });
            comunaSelect.disabled = false;
        } else {
            comunaSelect.disabled = true;
        }
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        procesarPago();
    });
}

function setupMetodosPago() {
    const metodosRadio = document.querySelectorAll('input[name="metodoPago"]');
    const tarjetaCampos = document.getElementById('tarjeta-campos');
    
    metodosRadio.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.id === 'credito' || this.id === 'debito') {
                tarjetaCampos.classList.remove('d-none');
                habilitarCamposTarjeta(true);
            } else {
                tarjetaCampos.classList.add('d-none');
                habilitarCamposTarjeta(false);
            }
        });
    });
}

function habilitarCamposTarjeta(required) {
    const campos = ['cc-number', 'cc-expiration', 'cc-cvv'];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        campo.required = required;
    });
}

function procesarPago() {
    const loadingButton = document.querySelector('button[type="submit"]');
    loadingButton.disabled = true;
    loadingButton.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Procesando...
    `;
    
    // Simular una demora en el procesamiento
    setTimeout(() => {
        localStorage.removeItem('carrito');
        
        alert('¡Pago procesado con éxito! Gracias por tu compra.');
        
        window.location.href = 'index.html';
    }, 2000);
}
