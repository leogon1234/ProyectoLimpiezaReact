import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Ofertas from './pages/Ofertas.jsx';
import Carrito from './pages/Carrito.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Contacto from './pages/Contacto.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Pago from './pages/Pago.jsx';
import Admin from './pages/Admin.jsx';
import Boleta from './pages/Boleta.jsx';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/registro" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/boleta" element={<Boleta />} />
        </Routes>
      <Footer />
    </div>
  );
}