function Pago() {
    return (
        <main className="container my-5">
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Tu carrito</span>
                        <span className="badge bg-primary rounded-pill" id="total-items">0</span>
                    </h4>
                    <ul className="list-group mb-3" id="resumen-carrito">
                    </ul>
                    <div className="list-group-item d-flex justify-content-between bg-light">
                        <strong>Total a pagar</strong>
                        <strong id="total-precio" className="text-primary">$0</strong>
                    </div>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Información de pago</h4>
                    <form id="formulario-pago" className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="firstName" required />
                                <div className="invalid-feedback">
                                    El nombre es requerido.
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Apellido</label>
                                <input type="text" className="form-control" id="lastName" required />
                                <div className="invalid-feedback">
                                    El apellido es requerido.
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="tu@ejemplo.com" required />
                                <div className="invalid-feedback">
                                    Por favor ingresa un email válido.
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Dirección</label>
                                <input type="text" className="form-control" id="address" required />
                                <div className="invalid-feedback">
                                    Por favor ingresa tu dirección de envío.
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="region" className="form-label">Región</label>
                                <select className="form-select" id="region" required>
                                    <option value>Seleccionar...</option>
                                </select>
                                <div className="invalid-feedback">
                                    Por favor selecciona una región.
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="comuna" className="form-label">Comuna</label>
                                <select className="form-select" id="comuna" required disabled>
                                    <option value>Seleccionar...</option>
                                </select>
                                <div className="invalid-feedback">
                                    Por favor selecciona una comuna.
                                </div>
                            </div>
                            <hr className="my-4" />
                            <h4 className="mb-3">Método de pago</h4>
                            <div className="col-12">
                                <div className="form-check">
                                    <input type="radio" name="metodoPago" className="form-check-input" id="credito" required />
                                    <label className="form-check-label" htmlFor="credito">Tarjeta de crédito</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="metodoPago" className="form-check-input" id="debito" required />
                                    <label className="form-check-label" htmlFor="debito">Tarjeta de débito</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="metodoPago" className="form-check-input" id="transferencia" required />
                                    <label className="form-check-label" htmlFor="transferencia">Transferencia bancaria</label>
                                </div>
                            </div>
                            <div id="tarjeta-campos" className="d-none">
                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Número de tarjeta</label>
                                    <input type="text" className="form-control" id="cc-number" required />
                                    <div className="invalid-feedback">
                                        El número de tarjeta es requerido
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="cc-expiration" className="form-label">Vencimiento</label>
                                        <input type="text" className="form-control" id="cc-expiration" placeholder="MM/YY" required />
                                        <div className="invalid-feedback">
                                            La fecha de vencimiento es requerida
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                        <input type="text" className="form-control" id="cc-cvv" required />
                                        <div className="invalid-feedback">
                                            El código de seguridad es requerido
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Confirmar compra</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    );
}

export default Pago;