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
  const [form, setForm] = useState({ name: '', email: '', password: '', rut: '', region: '', comuna: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

  return (
    <>
      <header className="lf-auth-header">
        <Link to="/" className="lf-auth-brand">
          <img src="/img/logo.jpg" alt="Logo LimpiFresh" className="lf-auth-logo" />
          <span className="lf-auth-title">LimpiFresh</span>
        </Link>
      </header>
      <div className="mv-card mt-4">
        <h2>Crea tu cuenta</h2>
        <div className="mv-tabs">
          <Link to="/login" className="mv-tab">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="mv-tab mv-active">
            Registrarse
          </Link>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
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
                <option value="Región Metropolitana">Región Metropolitana</option>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Biobío">Biobío</option>
                <option value="Otras">Otras</option>
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
              >
                <option value="">Selecciona una comuna</option>
                <option value="Santiago">Santiago</option>
                <option value="Providencia">Providencia</option>
                <option value="Ñuñoa">Ñuñoa</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mv-btn mb-2">
            Registrarse
          </button>
        </form>
        <p className="mv-hint mt-2">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="mv-link">Inicia sesión</Link>
        </p>
      </div>
    </>
  );
}