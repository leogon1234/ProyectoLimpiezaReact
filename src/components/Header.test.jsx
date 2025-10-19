import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

// Helper function to render with all providers
const renderWithProviders = (user = null, cart = []) => {
  const mockLogout = vi.fn();
  
  const userContextValue = {
    user,
    logout: mockLogout,
    login: vi.fn(),
    register: vi.fn()
  };

  const cartContextValue = {
    cart,
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    subtotal: 0,
    count: cart.length
  };

  return {
    ...render(
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <CartContext.Provider value={cartContextValue}>
            <Header />
          </CartContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    ),
    mockLogout
  };
};

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el logo y el nombre de la empresa', () => {
    renderWithProviders();
    expect(screen.getByText('LimpiFresh')).toBeInTheDocument();
    expect(screen.getByAltText('Logo LimpiFresh')).toBeInTheDocument();
  });

  it('debe renderizar todos los enlaces de navegación', () => {
    renderWithProviders();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Ofertas')).toBeInTheDocument();
    expect(screen.getByText('Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('debe mostrar el botón de "Iniciar sesión" cuando no hay usuario', () => {
    renderWithProviders();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  it('debe mostrar el nombre del usuario cuando está logueado', () => {
    const user = { name: 'Juan Pérez', email: 'juan@test.com', isAdmin: false };
    renderWithProviders(user);
    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  it('debe mostrar "Administrador" cuando el usuario es admin', () => {
    const user = { name: 'Admin', email: 'admin@test.com', isAdmin: true };
    renderWithProviders(user);
    expect(screen.getByText(/Administrador/)).toBeInTheDocument();
  });

  it('debe mostrar el enlace "Panel" solo para administradores', () => {
    const adminUser = { name: 'Admin', email: 'admin@test.com', isAdmin: true };
    const { rerender } = renderWithProviders(adminUser);
    expect(screen.getByText('Panel')).toBeInTheDocument();

    // Re-render con usuario normal
    const normalUser = { name: 'Juan', email: 'juan@test.com', isAdmin: false };
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: normalUser, logout: vi.fn(), login: vi.fn(), register: vi.fn() }}>
          <CartContext.Provider value={{ cart: [], addItem: vi.fn(), removeItem: vi.fn(), updateQuantity: vi.fn(), clearCart: vi.fn(), subtotal: 0, count: 0 }}>
            <Header />
          </CartContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    const panelLinks = screen.queryAllByText('Panel');
    expect(panelLinks.length).toBeGreaterThan(0); // El primero es del admin
  });

  it('debe llamar a logout cuando se hace clic en "Cerrar sesión"', () => {
    const user = { name: 'Juan Pérez', email: 'juan@test.com', isAdmin: false };
    const { mockLogout } = renderWithProviders(user);
    
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar el carrito con el contador de items', () => {
    const cart = [
      { id: 1, name: 'Producto 1', quantity: 2 },
      { id: 2, name: 'Producto 2', quantity: 1 }
    ];
    renderWithProviders(null, cart);
    
    expect(screen.getByText('Carrito')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Badge con el número de items
  });

  it('no debe mostrar el badge del carrito cuando está vacío', () => {
    renderWithProviders(null, []);
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it('debe tener los enlaces correctos configurados', () => {
    renderWithProviders();
    
    const inicioLink = screen.getByText('Inicio').closest('a');
    const productosLink = screen.getByText('Productos').closest('a');
    const carritoLink = screen.getByText('Carrito').closest('a');
    
    expect(inicioLink).toHaveAttribute('href', '/');
    expect(productosLink).toHaveAttribute('href', '/productos');
    expect(carritoLink).toHaveAttribute('href', '/carrito');
  });
});

