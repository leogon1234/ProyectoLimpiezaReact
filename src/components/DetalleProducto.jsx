import { useParams } from "react-router-dom";

export default function DetalleProducto() {
  const { id } = useParams();

  return (
    <main className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={`/img/producto${id || 1}.jpg`}
            alt={`Producto ${id}`}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2 className="color-principal">Desinfectante Multiusos</h2>
          <p>
            Limpieza profunda y protección contra bacterias. Ideal para baños, cocinas y
            superficies en general.
          </p>
          <p className="fw-bold fs-4">$4.990</p>
          <button className="btn btn-primary">
            <i className="bi bi-cart-plus me-2"></i> Agregar al Carrito
          </button>
        </div>
      </div>
    </main>
  );
}
