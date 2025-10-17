document.addEventListener("DOMContentLoaded", () => {
  // Utilidades 
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const NOMBRE_RE = /^[A-Za-zÁÉÍÓÚÑáéíóúÜü ]+$/;
  // RUT: solo formato (xx.xxx.xxx-x) sin validar dígito verificador
  const RUT_FORMAT_RE = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;

  const validarEmail = (v) => EMAIL_RE.test(v);
  const validarNombre = (v) => NOMBRE_RE.test((v || "").trim());
  const validarRutFormato = (v) => !v || RUT_FORMAT_RE.test(v.trim()); // permite vacío u opcional

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem("usuarios") || "[]"); }
    catch { return []; }
  };
  const setUsers = (arr) => localStorage.setItem("usuarios", JSON.stringify(arr));

  //  Región/Comuna (si existen en la página) 
  const regRegion = document.getElementById("regionRegistro") || document.getElementById("regRegion");
  const regComuna = document.getElementById("comunaRegistro") || document.getElementById("regComuna");

  if (regRegion && window.CL_REGIONES) {
    // Carga regiones en el orden definido en CL_REGIONES
    regRegion.innerHTML = '<option value="">Selecciona una región…</option>';
    Object.keys(window.CL_REGIONES).forEach((r) => {
      const op = document.createElement("option");
      op.value = r; op.textContent = r;
      regRegion.appendChild(op);
    });

    regRegion.addEventListener("change", () => {
      const region = regRegion.value;
      regComuna.innerHTML = '<option value="">Selecciona una comuna…</option>';
      if (!region || !window.CL_REGIONES[region]) {
        if (regComuna) regComuna.disabled = true;
        return;
      }
      const comunas = [...window.CL_REGIONES[region]].sort((a, b) => a.localeCompare(b, 'es'));
      comunas.forEach((c) => {
        const op = document.createElement("option");
        op.value = c; op.textContent = c;
        regComuna.appendChild(op);
      });
      if (regComuna) regComuna.disabled = false;
    });

    // Estado inicial
    if (regComuna) regComuna.disabled = true;
  }

  //  Registro 
  const regForm = document.getElementById("registro");
  const regMsg = document.getElementById("mensajeRegistro");

  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (regMsg) { regMsg.textContent = ""; regMsg.style.color = ""; }

      const nombre = (regForm.nombreRegistro || regForm.regNombre)?.value.trim();
      const correo = (regForm.correoRegistro || regForm.regEmail)?.value.trim();
      const pass = (regForm.contraseñaRegistro || regForm.regPass)?.value;
      const rutInp = document.getElementById("rutRegistro") || document.getElementById("regRut");
      const rutVal = rutInp ? rutInp.value.trim() : "";

      const regionVal = regRegion ? regRegion.value : "";
      const comunaVal = regComuna ? regComuna.value : "";

      // Validaciones mínimas
      if (!validarNombre(nombre)) {
        if (regMsg) { regMsg.textContent = "El nombre solo puede contener letras y espacios."; regMsg.style.color = "red"; }
        return;
      }
      if (!validarEmail(correo)) {
        if (regMsg) { regMsg.textContent = "¡Correo no válido!"; regMsg.style.color = "red"; }
        return;
      }
      if (!pass || pass.length < 8) {
        if (regMsg) { regMsg.textContent = "La contraseña debe tener al menos 8 caracteres."; regMsg.style.color = "red"; }
        return;
      }
      // RUT: solo formato (si fue ingresado)
      if (!validarRutFormato(rutVal)) {
        if (regMsg) { regMsg.textContent = "Formato de RUT inválido. Usa 12.345.678-5"; regMsg.style.color = "red"; }
        return;
      }
      // Si los selects existen, exigir selección
      if ((regRegion && !regionVal) || (regComuna && !comunaVal)) {
        if (regMsg) { regMsg.textContent = "Selecciona región y comuna."; regMsg.style.color = "red"; }
        return;
      }

      const usuarios = getUsers();
      if (usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase())) {
        if (regMsg) { regMsg.textContent = "¡Este correo ya está registrado!"; regMsg.style.color = "red"; }
        return;
      }

      usuarios.push({
        nombre, correo, contraseña: pass,
        rut: rutVal || null,
        region: regionVal || null,
        comuna: comunaVal || null,
        createdAt: Date.now()
      });
      setUsers(usuarios);

      if (regMsg) { regMsg.textContent = "¡Registro exitoso! Redirigiendo..."; regMsg.style.color = "green"; }
      setTimeout(() => { window.location.href = "login.html"; }, 900);
    });
  }

  //  Login (incluye atajo admin/admin) 
  const loginForm = document.getElementById("login");
  const loginMsg = document.getElementById("mensajeLogin");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (loginMsg) { loginMsg.textContent = ""; loginMsg.style.color = ""; }

      const correo = (loginForm.querySelector('input[name="correoLogin"]') || document.getElementById("correoLogin"))?.value.trim().toLowerCase();
      const pass = (loginForm.querySelector('input[name="contraseñaLogin"]') || document.getElementById("contraseñaLogin"))?.value;

      // Atajo admin
      if (correo === "admin" && pass === "admin") {
        if (loginMsg) { loginMsg.textContent = "Acceso administrador concedido..."; loginMsg.style.color = "green"; }
        setTimeout(() => { window.location.href = "admin.html"; }, 800);
        return;
      }

      // Validación mínima
      if (!validarEmail(correo)) {
        if (loginMsg) { loginMsg.textContent = "¡Correo no válido!"; loginMsg.style.color = "red"; }
        return;
      }
      if (!pass || pass.length < 8) {
        if (loginMsg) { loginMsg.textContent = "La contraseña debe tener al menos 8 caracteres."; loginMsg.style.color = "red"; }
        return;
      }

      const usuarios = getUsers();
      const ok = usuarios.find(u => u.correo.toLowerCase() === correo && u.contraseña === pass);
      if (ok) {
        if (loginMsg) { loginMsg.textContent = "¡Inicio de sesión correcto!"; loginMsg.style.color = "green"; }
        localStorage.setItem("lf_session", JSON.stringify({ correo: ok.correo, nombre: ok.nombre }));
        setTimeout(() => { window.location.href = "index.html"; }, 900);
      } else {
        if (loginMsg) { loginMsg.textContent = "Usuario o contraseña incorrectos"; loginMsg.style.color = "red"; }
      }
    });
  }

  // Login Admin (form aparte opcional)
  const adminForm = document.getElementById("formularioLogin");
  const adminMsg = document.getElementById("mensajeError");
  if (adminForm) {
    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value.trim();
      const clave = document.getElementById("clave").value.trim();
      if (usuario === "admin" && clave === "admin") {
        window.location.href = "admin.html";
      } else {
        if (adminMsg) adminMsg.textContent = "Usuario o contraseña incorrectos";
      }
    });
  }
});

/* ===============================
   Regiones y Comunas de Chile 
   (ya definidas por ti)
=============================== */
window.CL_REGIONES = {
  "Región de Arica y Parinacota (XV)": ["Arica", "Camarones", "General Lagos", "Putre"],
  "Región de Tarapacá (I)": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
  "Región de Antofagasta (II)": ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"],
  "Región de Atacama (III)": ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"],
  "Región de Coquimbo (IV)": ["Andacollo", "Combarbalá", "Coquimbo", "Illapel", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Salamanca", "Vicuña"],
  "Región de Valparaíso (V)": ["Algarrobo", "Cabildo", "Calera", "Calera de Tango", "Cartagena", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "La Cruz", "La Ligua", "Limache", "Los Andes", "Olmué", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"],
  "Región Metropolitana de Santiago (RM)": ["Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Ramón", "Santiago", "Talagante", "Vitacura"],
  "Región del Libertador General Bernardo O’Higgins (VI)": ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchigüe", "Nancagua", "Navidad", "Palmilla", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente de Tagua Tagua", "Santa Cruz"],
  "Región del Maule (VII)": ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Molina", "Parral", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", "San Clemente", "San Javier", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"],
  "Región de Ñuble (XVI)": ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coihueco", "El Carmen", "Ninhue", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Región del Biobío (VIII)": ["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"],
  "Región de La Araucanía (IX)": ["Angol", "Carahue", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"],
  "Región de Los Ríos (XIV)": ["Corral", "Futrono", "Lago Ranco", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"],
  "Región de Los Lagos (X)": ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"],
  "Región de Aysén del General Carlos Ibáñez del Campo (XI)": ["Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "O’Higgins", "Río Ibáñez", "Tortel"],
  "Región de Magallanes y de la Antártica Chilena (XII)": ["Antártica", "Cabo de Hornos", "Porvenir", "Puerto Natales", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"]
};

window.loadRegiones = function (selectRegion) {
  if (!selectRegion) return;
  selectRegion.innerHTML = '<option value="">Selecciona una región…</option>';
  Object.keys(CL_REGIONES).forEach(r => {
    const op = document.createElement('option');
    op.value = r; op.textContent = r;
    selectRegion.appendChild(op);
  });
};

window.loadComunas = function (region, selectComuna) {
  if (!selectComuna) return;
  selectComuna.innerHTML = '<option value="">Selecciona una comuna…</option>';
  const lista = (CL_REGIONES[region] || []).slice().sort((a, b) => a.localeCompare(b, 'es'));
  lista.forEach(c => {
    const op = document.createElement('option');
    op.value = c; op.textContent = c;
    selectComuna.appendChild(op);
  });
  selectComuna.disabled = lista.length === 0;
};

// Inicializa Región/Comuna al cargar
document.addEventListener('DOMContentLoaded', () => {
  const reg = document.getElementById('regionRegistro');
  const com = document.getElementById('comunaRegistro');

  if (window.loadRegiones) loadRegiones(reg);
  reg.addEventListener('change', () => {
    if (window.loadComunas) loadComunas(reg.value, com);
  });
});


// Mostrar / ocultar contraseña
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const eyeText = document.getElementById("eyeText");
const passwordInput = document.getElementById("contraseñaLogin");

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  eyeIcon.src = isHidden ? "img/ojoabierto.png" : "img/ojocerrado.png";
  eyeText.textContent = isHidden ? "Ocultar contraseña" : "Mostrar contraseña";
});
