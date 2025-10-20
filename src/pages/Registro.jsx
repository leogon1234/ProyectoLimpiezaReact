import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';

export default function Registro() {
  useEffect(() => {
    document.body.classList.add('mv-auth-page');
    return () => {
      document.body.classList.remove('mv-auth-page');
    };
  }, []);

  const { register } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rut: '',
    region: '',
    comuna: '',
  });
  const [error, setError] = useState(null);

  // ---------- NUEVO: regiones/comunas ----------
  const [regiones, setRegiones] = useState([]);        // [{code:'I', name:'Tarapacá', comunas:[...]}]
  const [comunas, setComunas] = useState([]);          // comunas visibles según región

  // Orden oficial para mostrar regiones
  const REGION_ORDER = ['XV', 'I', 'II', 'III', 'IV', 'V', 'RM', 'VI', 'VII', 'VIII', 'IX', 'XIV', 'X', 'XI', 'XII', 'XVI'];

  useEffect(() => {
    // Fuente abierta y estable con regiones y comunas de Chile
    // (si quieres lo hacemos local en /src/data/cl-geo.json)
    const URL = 'https://raw.githubusercontent.com/ivanayala98/chile-regiones-y-comunas/master/comunas.json';

    (async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        // data viene como [{ region: 'Tarapacá', prefix: 'I', communes: ['Alto Hospicio', ...] }, ...]
        const normalizado = data.map(r => ({
          code: r.prefix === 'RM' ? 'RM' : r.prefix, // ya viene correcto
          name: r.region,
          comunas: [...r.communes].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
        }));

        // Ordenar regiones por código oficial
        normalizado.sort(
          (a, b) => REGION_ORDER.indexOf(a.code) - REGION_ORDER.indexOf(b.code)
        );

        setRegiones(normalizado);
      } catch (e) {
        // Si falla el fetch, al menos dejamos las 4 opciones básicas que ya tenías
        setRegiones([
          { code: 'RM', name: 'Región Metropolitana', comunas: ['Santiago', 'Providencia', 'Ñuñoa', 'Otra'].sort((a,b)=>a.localeCompare(b,'es')) },
          { code: 'V', name: 'Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Otra'].sort((a,b)=>a.localeCompare(b,'es')) },
          { code: 'VIII', name: 'Biobío', comunas: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Otra'].sort((a,b)=>a.localeCompare(b,'es')) },
          { code: 'Otras', name: 'Otras', comunas: ['Otra'] }
        ]);
      }
    })();
  }, []);
  // ---------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      // Cuando cambia la región, setear comunas y limpiar comuna actual
      if (name === 'region') {
        const regionSel = regiones.find(r => regionValue(r) === value);
        setComunas(regionSel ? regionSel.comunas : []);
        next.comuna = '';
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  // Muestra "I - Tarapacá", "RM - Región Metropolitana", etc.
  const regionLabel = (r) => `${r.code} - ${r.name}`;
  // Guardamos como value un string estable (code|name) para evitar colisiones
  const regionValue = (r) => `${r.code}|${r.name}`;

  return (
    <>
      <style>{`
        body.mv-auth-page header:not(.lf-auth-header) { 
          display: none !important; 
        }
      `}</style>

      <header className="lf-auth-header">
        <Link to="/" className="lf-auth-brand">
          <img src="/img/logo.jpg" alt="Logo LimpiFresh" className="lf-auth-logo" />
          <span className="lf-auth-title">LimpiFresh</span>
        </Link>
      </header>

      <div className="mv-card mt-4">
        <h2>Crea tu cuenta</h2>
        <div className="mv-tabs">
          <Link to="/login" className="mv-tab">Iniciar sesión</Link>
          <Link to="/registro" className="mv-tab mv-active">Registrarse</Link>
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control mv-input"
              placeholder="Nombre y Apellido"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control mv-input"
              placeholder="correo@ejemplo.cl"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control mv-input"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              id="rut"
              name="rut"
              className="form-control mv-input"
              placeholder="12.345.678-5"
              value={form.rut}
              onChange={handleChange}
            />
            <small className="text-muted">Rut con dígito verificador</small>
          </div>

          <div className="row g-3">
            <div className="col-6 mb-3">
              <select
                id="region"
                name="region"
                className="form-select mv-input"
                value={form.region}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una región</option>
                {regiones.map((r) => (
                  <option key={regionValue(r)} value={regionValue(r)}>
                    {regionLabel(r)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6 mb-3">
              <select
                id="comuna"
                name="comuna"
                className="form-select mv-input"
                value={form.comuna}
                onChange={handleChange}
                required
                disabled={!form.region}
              >
                <option value="">{form.region ? 'Selecciona una comuna' : 'Selecciona una región primero'}</option>
                {comunas.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="mv-btn mb-2">Registrarse</button>
        </form>

        <p className="mv-hint mt-2">
          ¿Ya tienes cuenta? <Link to="/login" className="mv-link">Inicia sesión</Link>
        </p>
      </div>
    </>
  );
}
