import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';

export default function Login() {
  useEffect(() => {
    document.body.classList.add('mv-auth-page');
    return () => {
      document.body.classList.remove('mv-auth-page');
    };
  }, []);

  const { login } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const logged = await login(form.email, form.password);
      if (logged && logged.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
 
      <style>{`
        body.mv-auth-page header:not(.lf-auth-header) { 
          display: none !important; 
        }
      `}</style>

      {/* Compact header with large logo centered */}
      <header className="lf-auth-header">
        <Link to="/" className="lf-auth-brand">
          <img src="/img/logo.jpg" alt="Logo LimpiFresh" className="lf-auth-logo" />
          <span className="lf-auth-title">LimpiFresh</span>
        </Link>
      </header>

      {/* Card container for the auth form */}
      <div className="mv-card mt-4">
        <h2>Bienvenido a LimpiFresh</h2>
        <div className="mv-tabs">
          <Link to="/login" className="mv-tab mv-active">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="mv-tab">
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
              type="email"
              id="email"
              name="email"
              className="form-control mv-input"
              placeholder="Ingresa tu correo"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 password-container">
            <div className="label-row">
              <span>Contraseña</span>
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                {showPassword ? ' Ocultar contraseña' : ' Mostrar contraseña'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="form-control mv-input"
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="mv-btn">
            Ingresar
          </button>
        </form>
        <p className="mv-hint mt-3">
          <Link to="/" className="mv-link d-inline-flex align-items-center">
            <i className="bi bi-arrow-left me-1"></i>
            Volver al inicio
          </Link>
        </p>
      </div>
    </>
  );
}
