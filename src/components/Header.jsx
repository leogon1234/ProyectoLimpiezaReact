import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useUser } from '../contexts/UserContext.jsx';

/**
 * Navigation bar. Uses Bootstrap classes as defined in the original
 * project. The cart badge reflects the total quantity of items in
 * the cart by reading from the CartContext.
 */
export default function Header() {
  const { count } = useCart();
  const { user, logout } = useUser();

  return (
    <header className="lf-navbar navbar navbar-expand-lg navbar-dark bg-brand sticky-top shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <img src="/img/logo.jpg" alt="Logo LimpiFresh" width="60" height="60" className="logo-img" />
          LimpiFresh
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#lfNav"
          aria-controls="lfNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="lfNav">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">
                Ofertas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">
                Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blogs">
                Blogs
              </NavLink>
            </li>
            {user && user.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Panel
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex align-items-center gap-2 ms-auto">
          {/* Authentication section */}
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-white d-none d-md-inline">Hola, {user.name}</span>
              <button
                className="btn btn-light btn-sm rounded-3 d-flex align-items-center gap-1"
                onClick={logout}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span className="d-none d-md-inline">Cerrar sesión</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-light btn-sm rounded-3 d-flex align-items-center gap-1"
            >
              <i className="bi bi-person"></i>
              <span className="d-none d-md-inline">Iniciar sesión</span>
            </Link>
          )}
          <Link
            to="/carrito"
            className="btn btn-light btn-sm rounded-3 position-relative d-flex align-items-center gap-1"
          >
            <i className="bi bi-cart"></i>
            <span className="d-none d-md-inline">Carrito</span>
            {count > 0 && (
              <span className="badge bg-danger rounded-pill position-absolute top-0 end-0 translate-middle">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}