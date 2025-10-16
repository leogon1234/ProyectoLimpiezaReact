import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Carrito from "./components/Carrito";
import Contacto from "./components/Contacto";
import Productos from "./components/Productos";
import DetalleProducto from "./components/DetalleProducto";
import Login from "./components/Login";
import Nosotros from "./components/Nosotros";
import Ofertas from "./components/Ofertas";
import PaginaBlog from "./components/PaginaBlog";
import Pago from "./components/Pago";
import Registro from "./components/Registro";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/pagina-blog/:id" element={<PaginaBlog />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
