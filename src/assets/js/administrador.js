(() => {
  // Almacena el IVA predeterminado utilizado al crear productos
  const DEFAULT_IVA = 19;
  const STORAGE_KEY = "lf_products";

  // Selección de elementos del DOM utilizando IDs explícitos
  const form = document.getElementById("formProducto");
  const inputId = document.getElementById("productoId");
  const nameInput = document.getElementById("nombre");
  const descInput = document.getElementById("descripcion");
  const priceInput = document.getElementById("precio");
  const ivaInput = document.getElementById("iva");
  const stockInput = document.getElementById("stock");
  const btnGuardar = document.getElementById("btnGuardar");
  const tbody = document.getElementById("tbodyProductos");

  // Arreglo para mantener los productos en memoria
  let products = [];
  // Índice del elemento que se está editando; null si se está creando
  let editingIndex = null;

  /*
   * Convierte cualquier valor a entero. Si recibe un string que contiene
   * caracteres no numéricos (como "1.000" o "$2.500"), los elimina antes
   * de parsear. Siempre redondea el resultado.
   */
  const toInt = (v) => {
    if (typeof v === "number") return Math.round(v);
    const n = String(v).replace(/[^0-9-]/g, "");
    return n ? Math.round(parseInt(n, 10)) : 0;
  };

  // Formatea un número como CLP (peso chileno), agregando el símbolo y separadores de miles
  const formatCLP = (n) => "$" + toInt(n).toLocaleString("es-CL");

  // Limpia el formulario y restaura los valores predeterminados
  const clearForm = () => {
    form.reset();
    inputId.value = "";
    editingIndex = null;
    // Restaura el IVA al valor predeterminado
    ivaInput.value = DEFAULT_IVA;
    btnGuardar.textContent = "Guardar";
  };

  // Guarda el arreglo de productos en localStorage
  const saveProducts = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  };

  // Carga los productos desde localStorage. Si no existen, utiliza las filas que ya están en la tabla como semilla.
  const loadProducts = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          products = parsed;
          return;
        }
      } catch (e) {
        console.warn("[Admin] No se pudo parsear STORAGE_KEY", e);
      }
    }
    // Semilla inicial: toma las filas existentes en la tabla
    const seedRows = Array.from(tbody.querySelectorAll("tr"));
    products = seedRows.map((tr) => {
      const tds = tr.children;
      const name = (tds[0] && tds[0].textContent.trim()) || "";
      const price = toInt(tds[1]?.textContent);
      const iva = toInt(tds[2]?.textContent) || DEFAULT_IVA;
      const stock = toInt(tds[4]?.textContent);
      return { name, desc: "", price, stock, iva };
    });
    saveProducts();
  };

  // Renderiza la tabla en el DOM a partir del arreglo de productos
  const render = () => {
    tbody.innerHTML = products
      .map((p, i) => {
        const priceWithIVA = Math.round(p.price * (1 + p.iva / 100));
        return `
          <tr data-index="${i}">
            <td>${p.name}</td>
            <td>${formatCLP(p.price)}</td>
            <td>${p.iva}%</td>
            <td>${formatCLP(priceWithIVA)}</td>
            <td>${p.stock}</td>
            <td class="d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm" data-action="edit">Editar</button>
              <button class="btn btn-danger btn-sm" data-action="delete">Eliminar</button>
            </td>
          </tr>
        `;
      })
      .join("");
  };

  // Maneja el envío del formulario para crear o actualizar productos
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const desc = descInput.value.trim();
    const price = toInt(priceInput.value);
    const iva = toInt(ivaInput.value);
    const stock = toInt(stockInput.value);

    // Validaciones básicas
    if (!name) {
      alert("Ingresa el nombre del producto.");
      return;
    }
    if (price <= 0) {
      alert("Ingresa un precio válido.");
      return;
    }
    if (stock < 0) {
      alert("Ingresa un stock válido (0 o más).");
      return;
    }
    if (iva < 0) {
      alert("Ingresa un IVA válido (0 o más).");
      return;
    }

    const payload = { name, desc, price, stock, iva };

    if (editingIndex === null) {
      // Crear nuevo producto
      products.push(payload);
    } else {
      // Actualizar producto existente
      products[editingIndex] = payload;
    }
    saveProducts();
    render();
    clearForm();
  });

  // Delegación de eventos para editar o eliminar un producto desde la tabla
  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const tr = btn.closest("tr");
    const index = parseInt(tr?.dataset.index, 10);
    const action = btn.dataset.action;
    if (Number.isNaN(index)) return;

    if (action === "delete") {
      if (confirm("¿Eliminar este producto?")) {
        products.splice(index, 1);
        saveProducts();
        render();
        // Si se eliminó el producto que se estaba editando, limpiamos el formulario
        if (editingIndex === index) {
          clearForm();
        }
      }
      return;
    }

    if (action === "edit") {
      const p = products[index];
      if (!p) return;
      nameInput.value = p.name;
      descInput.value = p.desc || "";
      priceInput.value = p.price;
      ivaInput.value = p.iva;
      stockInput.value = p.stock;
      editingIndex = index;
      btnGuardar.textContent = "Actualizar";
      // Llevar la vista al inicio del formulario para mejorar la experiencia
      window.scrollTo({ top: form.offsetTop - 20, behavior: "smooth" });
    }
  });

  // Inicializa la app cuando el DOM está listo
  const init = () => {
    loadProducts();
    render();
    // Asegurarse de que el IVA por defecto esté en el input
    ivaInput.value = DEFAULT_IVA;
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();