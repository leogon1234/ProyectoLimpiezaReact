import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogDetail() {
  const { slug } = useParams();

  let title = '';
  let sections = [];

  switch (slug) {
    case 'bolsas-ecologicas':
      title = 'Más sobre nuestras bolsas ecológicas';
      sections = [
        {
          heading: 'Bolsas biodegradables',
          content:
            'Las bolsas LimpiFresh están fabricadas con polímeros biodegradables que se descomponen en menos de 12 meses. Además, cada compra contribuye a programas de limpieza urbana. ¡Una elección sustentable y práctica!',
        },
        {
          heading: 'Datos curiosos',
          list: [
            'Los envases son reciclables y reutilizables.',
            'Reducimos un 40% el uso de plásticos en los envíos desde 2024.',
            'Por cada compra, apoyas un programa de reforestación en Chile.',
          ],
        },
      ];
      break;
    case 'escobas-recicladas':
      title = 'Más sobre las escobas recicladas';
      sections = [
        {
          heading: 'Material reciclado',
          content:
            'El 80% del material usado en nuestras escobas proviene de botellas recicladas. Su diseño reduce el esfuerzo al barrer y aumenta la durabilidad. Perfectas para interiores y exteriores.',
        },
        {
          heading: 'Datos curiosos',
          list: [
            'Las cerdas sintéticas son más duraderas y fáciles de limpiar.',
            'Los mangos ergonómicos reducen la fatiga al barrer.',
            'Reutilizar envases ayuda a disminuir la huella de carbono.',
          ],
        },
      ];
      break;
    case 'detergentes-ecologicos':
      title = 'Más sobre los detergentes ecológicos';
      sections = [
        {
          heading: 'Ingredientes naturales',
          content:
            'Nuestros detergentes están libres de fosfatos y microplásticos, con aromas naturales a limón y lavanda. Ideales para pieles sensibles y respetuosos con el agua del medio ambiente.',
        },
        {
          heading: 'Datos curiosos',
          list: [
            'Utilizamos energía solar en la producción de detergentes.',
            'Los detergentes concentrados rinden el doble y reducen el uso de envases.',
            'Las fórmulas biodegradables se descomponen de manera segura en el agua.',
          ],
        },
      ];
      break;
    default:
      title = 'Artículo no encontrado';
      sections = [
        {
          heading: '',
          content: 'Lo sentimos, el artículo que buscas no se encuentra disponible.',
        },
      ];
      break;
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold color-principal">{title}</h2>
        <p className="text-muted">Descubre historias, detalles ecológicos y curiosidades sobre nuestros productos.</p>
      </div>
      <div className="text-center mb-4">
        <img
          src={`/img/muchasescobas.jpg`}
          alt={title}
          className="img-fluid rounded shadow-sm"
          style={{ maxHeight: '500px', objectFit: 'contain', width: '100%' }}
        />
      </div>
      {sections.map((sec, index) => (
        <section key={index} className="mb-5">
          {sec.heading && <h3 className="fw-bold text-success mb-3">{sec.heading}</h3>}
          {sec.content && <p>{sec.content}</p>}
          {sec.list && (
            <ul className="list-group">
              {sec.list.map((item, i) => (
                <li key={i} className="list-group-item">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <div className="mt-4">
        <Link to="/blogs" className="btn btn-outline-success">
          Volver a blogs
        </Link>
      </div>
    </div>
  );
}