function PaginaBlog() {
    return (
        <main className="container my-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold color-principal">Datos Curiosos sobre LimpiFresh</h2>
                <p className="text-muted">Descubre historias, detalles ecológicos y curiosidades sobre nuestros productos más
                    populares.</p>
            </div>
            <hr className="my-5" />
            <section id="mas-bolsas" className="section-datos">
                <h3 className="fw-bold text-success mb-3">Más sobre nuestras bolsas ecológicas</h3>
                <p>Las bolsas LimpiFresh están fabricadas con polímeros biodegradables que se descomponen en menos de 12
                    meses.
                    Además, cada compra contribuye a programas de limpieza urbana. ¡Una elección sustentable y práctica!</p>
            </section>
            <section id="mas-escobas" className="section-datos mt-5">
                <h3 className="fw-bold text-success mb-3">Más sobre las escobas recicladas</h3>
                <p>El 80% del material usado en nuestras escobas proviene de botellas recicladas.
                    Su diseño reduce el esfuerzo al barrer y aumenta la durabilidad. Perfectas para interiores y exteriores.
                </p>
            </section>
            <section id="mas-detergentes" className="section-datos mt-5">
                <h3 className="fw-bold text-success mb-3">Más sobre los detergentes naturales</h3>
                <p>Nuestros detergentes están libres de fosfatos y microplásticos, con aromas naturales a limón y lavanda.
                    Ideales para pieles sensibles y respetuosos con el agua del medio ambiente.</p>
            </section>
            <section className="section-datos mt-5">
                <h3 className="fw-bold text-success mb-3">Otros datos curiosos</h3>
                <ul className="list-group">
                    <li className="list-group-item">Todos los envases son reciclables y reutilizables.</li>
                    <li className="list-group-item">Usamos energía solar en la producción de detergentes.</li>
                    <li className="list-group-item">Reducimos un 40% el uso de plásticos en los envíos desde 2024.</li>
                    <li className="list-group-item">Por cada compra, apoyas un programa de reforestación en Chile.</li>
                </ul>
            </section>
        </main>
    );

}


export default PaginaBlog;
