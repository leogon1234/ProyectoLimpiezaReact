 function Contacto() {
  return (
    <main className="container my-5">
      <h2 className="text-center color-principal mb-4">Contáctanos</h2>

      <form className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            className="form-control"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            className="form-control"
            rows="4"
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Enviar
        </button>
      </form>
    </main>
  );
}

export default Contacto;