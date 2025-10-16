// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpg";

const Header = () => {
  return (
    <header className="lf-navbar navbar navbar-expand-lg navbar-dark bg-brand sticky-top shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="Logo LimpiFresh" width="80" height="80" className="logo-img" />
          LimpiFresh
        </Link>

        <div className="collapse navbar-collapse justify-content-center" id="lfNav">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blogs">Blogs</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <Link to="/login" className="btn btn-light btn-sm rounded-3 d-flex align-items-center gap-1">
            <i className="bi bi-person"></i>
            <span className="d-none d-md-inline">Iniciar sesión</span>
          </Link>
          <Link to="/carrito" className="btn btn-light btn-sm rounded-3 position-relative d-flex align-items-center gap-1">
            <i className="bi bi-cart"></i>
            <span className="d-none d-md-inline">Carrito</span>
            <span className="badge bg-danger rounded-pill position-absolute top-0 end-0 translate-middle">3</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
