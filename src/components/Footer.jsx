// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 border-top">
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3 mb-md-0">
            <h4 className="mb-3 color-principal">Contacto</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  <i className="bi bi-geo-alt me-2"></i>Duoc Antonio Varas
                </a>
              </li>
              <li className="mt-2">
                <a href="tel:+56912345678" className="text-decoration-none text-dark">
                  <i className="bi bi-telephone me-2"></i>+56 9 1234 5678
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <Link to="/" className="logo-footer d-block mb-2 fw-bold fs-4 color-principal text-decoration-none">
              LimpiFresh
            </Link>
            <p className="text-muted mb-0">
              Productos de limpieza de alta calidad para tu hogar y negocio.<br />
              Soluciones ecológicas para mantener tus espacios impecables.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
