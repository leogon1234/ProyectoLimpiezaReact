function Admin() {
    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Panel de Administración</h1>
                <div className="card shadow-sm p-4">
                    <h2 className="mb-3">Agregar / Editar Producto</h2>
                    <form>
                        <div className="mb-3">
                            <p className="form-label">Nombre del producto</p>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <p className="form-label">Descripción</p>
                            <textarea className="form-control" rows={3} defaultValue={""} />
                        </div>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <p className="form-label">Precio del producto</p>
                                <input type="number" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <p className="form-label">Stock</p>
                                <input type="number" className="form-control" />
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card mt-5 shadow-sm p-4">
                <h4 className="mb-3">Productos</h4>
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>IVA</th>
                            <th>Precio con IVA</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Detergente líquido</td>
                            <td>$2500</td>
                            <td>19%</td>
                            <td>$2975</td>
                            <td>100</td>
                            <td>
                                <button className="btn btn-sm btn-primary">Editar</button>
                                <button className="btn btn-sm btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Admin;
