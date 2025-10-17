import React, { useState } from "react";

function Admin() {

  return(
    <main className="container">
      <h1 className="text-center mb-4">Panel de Administración</h1>
      <section className="card shadow-sm p-4 mb-5">
        <h2 className="mb-3">Agregar / Editar Producto</h2>
        <form id="formProducto" autoComplete="off">
          <input type="hidden" id="productoId" name="productoId" />
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del producto</label>
            <input id="nombre" name="nombre" type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea id="descripcion" name="descripcion" className="form-control" rows={3} required defaultValue={""} />
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="precio" className="form-label">Precio (sin IVA)</label>
              <input id="precio" name="precio" type="number" min={0} step={1} className="form-control" required />
            </div>
            <div className="col-md-4">
              <label htmlFor="iva" className="form-label">IVA %</label>
              <input id="iva" name="iva" type="number" min={0} step={1} className="form-control" defaultValue={19} />
            </div>
            <div className="col-md-4">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input id="stock" name="stock" type="number" min={0} step={1} className="form-control" required />
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="reset" className="btn btn-outline-primary">Limpiar</button>
            <button id="btnGuardar" type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </section>
      <section className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Productos</h4>
          <span className="badge bg-brand text-white">IVA actual: <span id="ivaActualBadge">19%</span></span>
        </div>
        <div className="table-responsive">
          <table id="tablaProductos" className="table table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>IVA</th>
                <th>Precio c/ IVA</th>
                <th>Stock</th>
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>
            <tbody id="tbodyProductos">
              <tr>
                <td>Detergente líquido</td>
                <td>$2.500</td>
                <td>19%</td>
                <td>$2.975</td>
                <td>100</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm" data-action="edit">Editar</button>
                  <button className="btn btn-danger btn-sm" data-action="delete">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

  );
};

export default Admin;
