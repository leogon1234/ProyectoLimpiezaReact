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
  const [errors, setErrors] = useState({});        
  const [showPassword, setShowPassword] = useState(false); // 👈 AGREGADO

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);

  const REGION_ORDER = ['XV', 'I', 'II', 'III', 'IV', 'V', 'RM', 'VI', 'VII', 'VIII', 'IX', 'XIV', 'X', 'XI', 'XII', 'XVI'];

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const NAME_RE = /^[A-Za-zÁÉÍÓÚÑáéíóúÜü ]+$/;
  const RUT_FORMAT_RE = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;

  const RM_COMUNAS = [
    'Alhué','Buin','Calera de Tango','Cerrillos','Cerro Navia','Colina','Conchalí','Curacaví',
    'El Bosque','El Monte','Estación Central','Huechuraba','Independencia','Isla de Maipo',
    'La Cisterna','La Florida','La Granja','La Pintana','La Reina','Lampa','Las Condes',
    'Lo Barnechea','Lo Espejo','Lo Prado','Macul','Maipú','María Pinto','Melipilla',
    'Padre Hurtado','Paine','Pedro Aguirre Cerda','Peñaflor','Peñalolén','Pirque','Providencia',
    'Pudahuel','Puente Alto','Quilicura','Quinta Normal','Recoleta','Renca','San Bernardo',
    'San Joaquín','San José de Maipo','San Miguel','San Pedro','San Ramón','Santiago',
    'Talagante','Tiltil','Vitacura'
  ].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

  const cleanRut = (rut) => rut.replace(/[.\-]/g, '').toUpperCase();

  const isValidRut = (rut) => {
    if (!rut) return false;
    const rutClean = cleanRut(rut);
    if (rutClean.length < 8 || rutClean.length > 9) return false;

    const cuerpo = rutClean.slice(0, -1);
    const dv = rutClean.slice(-1);

    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i], 10) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const dvCalculadoNum = 11 - resto;
    let dvCalculado;

    if (dvCalculadoNum === 11) dvCalculado = '0';
    else if (dvCalculadoNum === 10) dvCalculado = 'K';
    else dvCalculado = String(dvCalculadoNum);

    return dv === dvCalculado;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    else if (form.name.trim().length < 3)
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    else if (!NAME_RE.test(form.name.trim()))
      newErrors.name = 'El nombre solo puede contener letras y espacios.';

    if (!form.email.trim()) newErrors.email = 'El correo es obligatorio.';
    else if (!EMAIL_RE.test(form.email.trim()))
      newErrors.email = 'Ingresa un correo válido.';

    if (!form.password) newErrors.password = 'La contraseña es obligatoria.';
    else if (form.password.length < 8)
      newErrors.password = 'Debe tener mínimo 8 caracteres.';

    const rutTrim = form.rut.trim();
    if (!rutTrim) newErrors.rut = 'El RUT es obligatorio.';
    else if (!RUT_FORMAT_RE.test(rutTrim))
      newErrors.rut = 'Formato de RUT inválido (12.345.678-5).';
    else if (!isValidRut(rutTrim))
      newErrors.rut = 'El RUT ingresado no es válido.';

    if (!form.region) newErrors.region = 'Selecciona una región.';
    if (!form.comuna) newErrors.comuna = 'Selecciona una comuna.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const regionLabel = (r) => `${r.code} - ${r.name}`;
  const regionValue = (r) => `${r.code}|${r.name}`;

  useEffect(() => {
    const URL = 'https://raw.githubusercontent.com/ivanayala98/chile-regiones-y-comunas/master/comunas.json';

    (async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        const normalizado = data.map(r => ({
          code: r.prefix === 'RM' ? 'RM' : r.prefix,
          name: r.region,
          comunas: [...r.communes].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
        }));

        const idxRM = normalizado.findIndex(r => r.code === 'RM');
        if (idxRM !== -1) normalizado[idxRM].comunas = RM_COMUNAS;

        normalizado.sort((a, b) => REGION_ORDER.indexOf(a.code) - REGION_ORDER.indexOf(b.code));

        setRegiones(normalizado);
      } catch (e) {
        setRegiones([
          { code: 'RM', name: 'Región Metropolitana de Santiago', comunas: RM_COMUNAS }
        ]);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => {
      const next = { ...prev, [name]: value };

      if (name === 'region') {
        const regionSel = regiones.find(r => regionValue(r) === value);
        setComunas(regionSel ? regionSel.comunas : []);
        next.comuna = '';
      }

      return next;
    });

    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      await register(
        form.name.trim(),
        form.email.trim(),
        form.password,
        form.rut.trim(),
        form.region,
        form.comuna
      );
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Ocurrió un error al registrar.');
    }
  };

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

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>

          {/* Nombre */}
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className={`form-control mv-input ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Nombre y Apellido"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className={`form-control mv-input ${errors.email ? 'is-invalid' : ''}`}
              placeholder="correo@ejemplo.cl"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* CONTRASEÑA CON OJO 👁️ */}
          <div className="mb-3 password-container">
            <div className="label-row">
              <span>Contraseña</span>
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(prev => !prev)}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                {showPassword ? ' Ocultar contraseña' : ' Mostrar contraseña'}
              </button>
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`form-control mv-input ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* RUT */}
          <div className="mb-3">
            <input
              type="text"
              name="rut"
              className={`form-control mv-input ${errors.rut ? 'is-invalid' : ''}`}
              placeholder="12.345.678-5"
              value={form.rut}
              onChange={handleChange}
            />
            {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
            <small className="text-muted">Rut con dígito verificador</small>
          </div>

          {/* Región + Comuna */}
          <div className="row g-3">
            <div className="col-6">
              <select
                name="region"
                className={`form-select mv-input ${errors.region ? 'is-invalid' : ''}`}
                value={form.region}
                onChange={handleChange}
              >
                <option value="">Selecciona una región</option>
                {regiones.map((r) => (
                  <option key={regionValue(r)} value={regionValue(r)}>
                    {regionLabel(r)}
                  </option>
                ))}
              </select>
              {errors.region && <div className="invalid-feedback d-block">{errors.region}</div>}
            </div>

            <div className="col-6">
              <select
                name="comuna"
                className={`form-select mv-input ${errors.comuna ? 'is-invalid' : ''}`}
                value={form.comuna}
                onChange={handleChange}
                disabled={!form.region}
              >
                <option value="">{form.region ? 'Selecciona una comuna' : 'Selecciona una región primero'}</option>
                {comunas.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.comuna && <div className="invalid-feedback d-block">{errors.comuna}</div>}
            </div>
          </div>

          <button type="submit" className="mv-btn mt-3">Registrarse</button>
        </form>

        <p className="mv-hint mt-2">
          ¿Ya tienes cuenta? <Link to="/login" className="mv-link">Inicia sesión</Link>
        </p>
      </div>
    </>
  );
}
