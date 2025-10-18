import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('debe renderizar el footer correctamente', () => {
    render(<Footer />);
    expect(screen.getByText('LimpiFresh')).toBeInTheDocument();
  });

  it('debe mostrar la sección de contacto', () => {
    render(<Footer />);
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('debe mostrar la dirección', () => {
    render(<Footer />);
    expect(screen.getByText('Duoc Antonio Varas')).toBeInTheDocument();
  });

  it('debe mostrar el número de teléfono', () => {
    render(<Footer />);
    const phoneLink = screen.getByText(/\+56\s*9\s*1234\s*5678/);
    expect(phoneLink).toBeInTheDocument();
  });

  it('debe tener el enlace del teléfono con href correcto', () => {
    render(<Footer />);
    const phoneLink = screen.getByText(/\+56\s*9\s*1234\s*5678/).closest('a');
    expect(phoneLink).toHaveAttribute('href', 'tel:+56912345678');
  });

  it('debe mostrar la descripción del negocio', () => {
    render(<Footer />);
    expect(screen.getByText(/Productos de limpieza de alta calidad/)).toBeInTheDocument();
    expect(screen.getByText(/Soluciones ecológicas para mantener tus espacios impecables/)).toBeInTheDocument();
  });

  it('debe tener el logo con un enlace al inicio', () => {
    render(<Footer />);
    const logoLink = screen.getByText('LimpiFresh').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('debe aplicar las clases CSS correctas', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-light', 'text-center', 'text-lg-start', 'mt-5', 'border-top');
  });

  it('debe tener iconos de Bootstrap', () => {
    const { container } = render(<Footer />);
    const geoIcon = container.querySelector('.bi-geo-alt-fill');
    const phoneIcon = container.querySelector('.bi-telephone-fill');
    
    expect(geoIcon).toBeInTheDocument();
    expect(phoneIcon).toBeInTheDocument();
  });

  it('debe estar estructurado con contenedor y columnas', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('.row')).toBeInTheDocument();
    expect(container.querySelectorAll('.col-md-4').length).toBe(2);
  });
});

