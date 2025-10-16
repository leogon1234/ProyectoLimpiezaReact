function Carrito() {
  return (
    <main className="container my-5">
      <h2 className="text-center color-principal mb-4">Tu Carrito</h2>

      <table className="table table-striped text-center align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desinfectante Multiusos</td>
            <td>$4.990</td>
            <td>2</td>
            <td>$9.980</td>
            <td>
              <button className="btn btn-danger btn-sm">
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-end">
        <h4>Total: $9.980</h4>
        <button className="btn btn-success mt-2">Proceder al Pago</button>
      </div>
    </main>
  );
}

export default Carrito;
