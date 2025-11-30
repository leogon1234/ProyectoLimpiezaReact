import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const { user, logout } = useUser();
  const { cart } = useCart();
  const displayName = user?.nombre || user?.name || "Usuario";
  const initial = displayName.charAt(0).toUpperCase();
   const navigate = useNavigate();

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-brand shadow-sm py-2">
      <div className="container-fluid px-4">
        {/* IZQUIERDA DEL HEADER */}
        <Link to="/home" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/img/logo.jpg"
            alt="Logo LimpiFresh"
            width="45"
            height="45"
            className="rounded-circle border border-light"
          />
          <span className="fw-bold fs-5 text-white">LimpiFresh</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTRO DEL HEADER */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/home">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/ofertas">
                Ofertas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/nosotros">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/contacto">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/blogs">
                Blog
              </Link>
            </li>
            {user?.isAdmin && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/admin">
                  Panel
                </Link>
              </li>
            )}
          </ul>

          {/* DERECHA DEL HEADER */}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <div className="d-flex align-items-center gap-2 me-2">
                  <div className="text-white small">
                    <div>
                      Hola,{displayName}
                    </div>
                    {user.isAdmin && (
                      <span className="badge bg-warning text-dark mt-1">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <button className="btn btn-light btn-sm" onClick={()=>{
                  logout();
                  navigate("/registro");
                }} >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-light btn-sm">
                Iniciar sesión
              </Link>
            )}
            <Link
              to="/carrito"
              className="btn btn-outline-light btn-sm d-flex align-items-center">
              <i className="bi bi-cart3 me-1"></i> Carrito
              {cart.length > 0 && (
                <span className="badge bg-light text-dark ms-2">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
