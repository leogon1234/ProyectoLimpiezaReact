import React, { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import useProducts from "../hooks/useProducts.jsx";
import { Categorias } from "../data/categorias.js";
export default function Products() {
  const { productos, cargando, error } = useProducts();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const categorias = useMemo(() => {
    const set = new Set(Categorias);

    productos.forEach((p) => {
      if (p.categoria) {
        set.add(p.categoria);
      }
    });

    return ["Todas", ...Array.from(set)];
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase();
    return productos.filter((p) => {
      const coincideCategoria =
        categoriaSeleccionada === "Todas" ||
        p.categoria === categoriaSeleccionada;

      const coincideTexto = !texto? true: (p.nombre ?? "").toLowerCase().includes(texto);
      return coincideCategoria && coincideTexto;
    });
  }, [productos, categoriaSeleccionada, busqueda]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Catálogo de productos</h2>

      {/* Filtros */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label fw-semibold">Categoría</label>
          <select
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-semibold">Buscar</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!cargando && !error && productosFiltrados.length === 0 && (
        <p>No se encontraron productos.</p>
      )}

      <div className="row g-4">
        {productosFiltrados.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
