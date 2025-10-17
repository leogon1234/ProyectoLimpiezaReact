import { Link } from "react-router-dom";
import "../assets/css/style.css";

function Registro() {
  return (
    <main className="container mv-auth-page">
      <header className="text-center my-4">
        <Link to="/" className="text-decoration-none color-principal fs-3 fw-bold">
          LimpiFresh
        </Link>
      </header>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow mv-card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-3 color-principal">Crea tu cuenta</h2>

              <div className="mv-tabs d-flex justify-content-center mb-3">
                <Link to="/login" className="mv-tab">
                  Iniciar sesión
                </Link>
                <Link to="/registro" className="mv-tab mv-active">
                  Registrarse
                </Link>
              </div>

              <form id="registro" noValidate>
                <div className="mb-3">
                  <label htmlFor="nombreRegistro" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombreRegistro"
                    className="form-control mv-input"
                    placeholder="Nombre y Apellido"
                    required
                    pattern="^[A-Za-zÁÉÍÓÚÑáéíóúÜü ]+$"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="correoRegistro" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="correoRegistro"
                    className="form-control mv-input"
                    placeholder="correo@ejemplo.cl"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="contraseñaRegistro" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contraseñaRegistro"
                    className="form-control mv-input"
                    placeholder="Mínimo 8 caracteres"
                    minLength={8}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="rutRegistro" className="form-label">
                    RUT
                  </label>
                  <input
                    type="text"
                    id="rutRegistro"
                    className="form-control mv-input"
                    placeholder="12.345.678-5"
                  />
                  <div className="form-text">Rut con dígito verificador</div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="regionRegistro" className="form-label">
                      Región
                    </label>
                    <select id="regionRegistro" className="form-select mv-input" required>
                      <option value="">Selecciona una región…</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="comunaRegistro" className="form-label">
                      Comuna
                    </label>
                    <select
                      id="comunaRegistro"
                      className="form-select mv-input"
                      required
                      disabled
                    >
                      <option value="">Selecciona una comuna…</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="mv-btn w-100">
                  Registrarse
                </button>

                <p id="mensajeRegistro" className="mt-3 text-center mv-hint"></p>

                <p className="text-center mt-3">
                  ¿Ya tienes cuenta?{" "}
                  <Link className="mv-link" to="/login">
                    Inicia sesión
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Registro;
