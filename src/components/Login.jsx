import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/style.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("Intentando iniciar sesión...");
    // Aquí podrías agregar tu lógica real de autenticación
    setTimeout(() => {
      setMensaje("Inicio de sesión exitoso (simulado).");
    }, 1000);
  };

  return (
    <main className="container mv-auth-page">
      <header className="text-center my-4">
        <Link to="/" className="text-decoration-none color-principal fs-3 fw-bold">
          LimpiFresh
        </Link>
      </header>

      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow mv-card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-3 color-principal">Bienvenido a LimpiFresh</h2>

              <div className="mv-tabs d-flex justify-content-center mb-3">
                <Link to="/login" className="mv-tab mv-active">
                  Iniciar sesión
                </Link>
                <Link to="/registro" className="mv-tab">
                  Registrarse
                </Link>
              </div>

              <form id="login" noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="correoLogin" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    name="correoLogin"
                    id="correoLogin"
                    className="form-control mv-input"
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>

                <div className="mb-3 password-container">
                  <div className="label-row d-flex justify-content-between align-items-center">
                    <label htmlFor="contraseñaLogin" className="form-label">
                      Contraseña
                    </label>
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Mostrar contraseña"
                    >
                      <img
                        src={`/img/${showPassword ? "ojoabierto.png" : "ojocerrado.png"}`}
                        alt="icono ojo"
                        id="eyeIcon"
                        style={{ width: "20px", marginRight: "5px" }}
                      />
                      <span id="eyeText">
                        {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      </span>
                    </button>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="contraseñaLogin"
                    id="contraseñaLogin"
                    className="form-control mv-input"
                    placeholder="Ingresa tu contraseña"
                    minLength="8"
                    required
                  />
                </div>

                <button type="submit" className="mv-btn w-100">
                  Ingresar
                </button>

                <p id="mensajeLogin" className="mt-3 text-center mv-hint">
                  {mensaje}
                </p>

                <p className="text-center mt-3">
                  <Link className="mv-link" to="/">
                    ← Volver al inicio
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
