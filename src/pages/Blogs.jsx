import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    slug: 'bolsas-ecologicas',
    title: 'Bolsas 100% ecológicas',
    excerpt:
      'Las bolsas de basura modernas están hechas para resistir el peso y los olores. En LimpiFresh promovemos las bolsas biodegradables para cuidar el medio ambiente.',
    image: '/img/Bolsas.jpg',
  },
  {
    slug: 'escobas-recicladas',
    title: 'Escobas de material reciclado',
    excerpt:
      'Desde su origen en el siglo XVIII, la escoba ha evolucionado en materiales y diseño. Hoy se fabrican con cerdas sintéticas más duraderas y mangos ergonómicos.',
    image: '/img/escoba.jpg',
  },
  {
    slug: 'detergentes-ecologicos',
    title: 'Detergentes sin químicos agresivos',
    excerpt:
      'El detergente líquido no solo limpia, sino que cuida las telas y elimina bacterias. En LimpiFresh, ofrecemos fórmulas biodegradables con fragancias naturales.',
    image: '/img/Detergente.jpg',
  },
];

export default function Blogs() {
  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold color-principal">Blogs de la FreshComunity</h2>
        <p className="text-muted">
          Conoce más sobre nuestros productos, procesos y compromiso con el medio ambiente.
        </p>
      </div>
      <div className="row justify-content-center g-4">
        {posts.map((post) => (
          <div className="col-md-6" key={post.slug}>
            <div className="card h-100 shadow border-0">
              <div className="row g-0 align-items-center">
                <div className="col-4 text-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="img-fluid rounded-start p-3"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{post.title}</h5>
                    <p className="card-text">{post.excerpt}</p>
                    <Link to={`/blogs/${post.slug}`} className="btn btn-outline-success btn-sm mt-2">
                      Más aquí
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}