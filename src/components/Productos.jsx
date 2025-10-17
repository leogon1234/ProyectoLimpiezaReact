// src/pages/Productos.jsx
import React from "react";
import det from "../assets/img/Detergente.jpg";
import escoba from "../assets/img/escoba.jpg";
import cloro from "../assets/img/Cloro.jpg";
import guantes from "../assets/img/guantes.jpg";
import esponja from "../assets/img/esponja.jpg";
import limpiavidrios from "../assets/img/limpiavidrios.jpg";
import trapo from "../assets/img/trapo.jpg";
import escobillon from "../assets/img/escobillon.jpg";
import limpiapisos from "../assets/img/limpiapisos.jpg";
import cepillo from "../assets/img/cepillo.jpg";
import bolsas from "../assets/img/bolsas.jpg";
import limpiadorMultiuso from "../assets/img/limpiador-multiuso.jpg";

const Productos = () => {
    return (
        <main className="container my-4">
            <div className="row">
                {/* Filtros de productos */}
                <div className="col-md-3">
                    <h2 className="mb-3">Filtros</h2>
                    <select className="form-select" id="filtroProductos">
                        <option value="todos">Todos los productos</option>
                        <option value="limpiadores">Limpiadores</option>
                        <option value="implementos">Implementos</option>
                        <option value="desechables">Desechables</option>
                    </select>
                </div>
                <div className="col-md-9">
                    <h2>Productos</h2>
                    <section className="row g-4">
                        {/* Producto 1 */}
                        <div className="col-md-4" data-category="limpiadores">
                            <a href="detalle-producto.html?id=1" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <img src={det} className="card-img-top" alt="Detergente" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Detergente Líquido 900ml</h5>
                                        <p className="card-text">Ideal para ropa y superficies.</p>
                                        <span className="precio">$5.990</span>
                                        <button className="btn btn-success mt-2" onclick="event.preventDefault(); agregarAlCarrito(1);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 2 (Oferta) */}
                        <div className="col-md-4" data-category="limpiadores">
                            <a href="detalle-producto.html?id=2" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <span className="badge-sale">Descuento</span>
                                    <img src={cloro} className="card-img-top" alt="Cloro" />
                                    <div className="card-body text-center d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h5 className="card-title">Cloro Desinfectante 1L</h5>
                                            <p className="card-text">Elimina el 99.9% de bacterias.</p>
                                            <div className="precios-oferta">
                                                <span className="precio-oferta">$2.000</span>
                                                <span className="precio-tachado">$2.500</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-success mt-3" onclick="event.preventDefault(); agregarAlCarrito(2);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 3 */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=3" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <img src={escoba} className="card-img-top" alt="Escoba" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Escoba Multiuso 1 Unidad</h5>
                                        <p className="card-text">Perfecta para interiores y exteriores.</p>
                                        <span className="precio">$3.500</span>
                                        <button className="btn btn-success mt-2" onclick="event.preventDefault(); agregarAlCarrito(3);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 4 (Oferta) */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=4" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <span className="badge-sale">Descuento</span>
                                    <img src={guantes} className="card-img-top" alt="Guantes" />
                                    <div className="card-body text-center d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h5 className="card-title">Par de Guantes de Limpieza</h5>
                                            <p className="card-text">Protección para tus manos.</p>
                                            <div className="precios-oferta">
                                                <span className="precio-oferta">$1.200</span>
                                                <span className="precio-tachado">$1.500</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-success mt-3" onclick="event.preventDefault(); agregarAlCarrito(4);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 5 */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=5" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <img src={esponja} className="card-img-top" alt="Esponja" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Esponja Multiuso 1 Unidad</h5>
                                        <p className="card-text">Ideal para cocina y baño.</p>
                                        <span className="precio">$800</span>
                                        <button className="btn btn-success mt-2" onclick="event.preventDefault(); agregarAlCarrito(5);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 6 (Oferta) */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=6" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <span className="badge-sale">Descuento</span>
                                    <img src={limpiavidrios} className="card-img-top" alt="Limpiavidrios" />
                                    <div className="card-body text-center d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h5 className="card-title">Limpiavidrios 500ml</h5>
                                            <p className="card-text">Brillo sin manchas.</p>
                                            <div className="precios-oferta">
                                                <span className="precio-oferta">$2.500</span>
                                                <span className="precio-tachado">$3.000</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-success mt-3" onclick="event.preventDefault(); agregarAlCarrito(6);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 7 */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=7" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <img src={trapo} className="card-img-top" alt="Trapo" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Trapo de Piso 1 Unidad</h5>
                                        <p className="card-text">Absorbente y resistente.</p>
                                        <span className="precio">$1.000</span>
                                        <button className="btn btn-success mt-2" onclick="event.preventDefault(); agregarAlCarrito(7);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 8 */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=8" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <img src={escobillon} className="card-img-top" alt="Escobillón" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Escobillón 1 Unidad</h5>
                                        <p className="card-text">Cerdas resistentes para exteriores.</p>
                                        <span className="precio">$2.200</span>
                                        <button className="btn btn-success mt-2" onclick="event.preventDefault(); agregarAlCarrito(8);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 9 (Oferta) */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=9" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <span className="badge-sale">Descuento</span>
                                    <img src={limpiapisos} className="card-img-top" alt="Limpiapisos" />
                                    <div className="card-body text-center d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h5 className="card-title">Limpiapisos 900ml</h5>
                                            <p className="card-text">Fragancia duradera.</p>
                                            <div className="precios-oferta">
                                                <span className="precio-oferta">$3.000</span>
                                                <span className="precio-tachado">$3.500</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-success mt-3" onclick="event.preventDefault(); agregarAlCarrito(9);">Agregar al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 10 */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=10" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <img src={cepillo} className="card-img-top" alt="Cepillo" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Cepillo de Limpieza 1 Unidad</h5>
                                        <p className="card-text">Ideal para superficies difíciles.</p>
                                        <span className="precio">$1.800</span>
                                        <button className="btn btn-success mt-2" onclick="event.preventDefault(); agregarAlCarrito(10);">Agregar
                                            al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 11 */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=11" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <img src={bolsas} className="card-img-top" alt="Bolsas" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">Bolsas de Basura 10 Unidades</h5>
                                        <p className="card-text">Resistentes y prácticas.</p>
                                        <span className="precio">$1.500</span>
                                        <button className="btn btn-success mt-2" onclick="event.preventDefault(); agregarAlCarrito(11);">Agregar
                                            al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Producto 12 (Oferta) */}
                        <div className="col-md-4">
                            <a href="detalle-producto.html?id=12" className="link-producto">
                                <div className="card h-100 shadow-sm position-relative">
                                    <span className="badge-sale">Descuento</span>
                                    <img src={limpiadorMultiuso} className="card-img-top" alt="Limpiador Multiuso" />
                                    <div className="card-body text-center d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h5 className="card-title">Limpiador Multiuso 900ml</h5>
                                            <p className="card-text">Eficaz en todas las superficies.</p>
                                            <div className="precios-oferta">
                                                <span className="precio-oferta">$2.800</span>
                                                <span className="precio-tachado">$3.200</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-success mt-3" onclick="event.preventDefault(); agregarAlCarrito(12);">Agregar
                                            al
                                            carrito</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </main>

    );
};

export default Productos;