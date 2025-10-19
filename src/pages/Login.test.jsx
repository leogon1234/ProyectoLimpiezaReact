import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { UserContext } from '../contexts/UserContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (loginMock = vi.fn()) => {
  const userContextValue = {
    user: null,
    login: loginMock,
    logout: vi.fn(),
    register: vi.fn()
  };

  return render(
    <BrowserRouter>
      <UserContext.Provider value={userContextValue}>
        <Login />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.className = ''; 
  });

  it('debe renderizar el formulario de login', () => {
    renderWithProviders();
    expect(screen.getByText('Bienvenido a LimpiFresh')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeInTheDocument();
  });

  it('debe mostrar el logo y nombre de la empresa', () => {
    renderWithProviders();
    expect(screen.getByAltText('Logo LimpiFresh')).toBeInTheDocument();
    expect(screen.getAllByText('LimpiFresh').length).toBeGreaterThan(0);
  });

  it('debe tener pestañas de Iniciar sesión y Registrarse', () => {
    renderWithProviders();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
  });

  it('debe actualizar el estado del formulario al escribir', () => {
    renderWithProviders();
    
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('debe alternar la visibilidad de la contraseña', () => {
    renderWithProviders();
    
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const toggleButton = screen.getByText(/Mostrar contraseña/);

    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('debe llamar a login con las credenciales correctas al enviar el formulario', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ isAdmin: false });
    renderWithProviders(mockLogin);
    
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const submitButton = screen.getByText('Ingresar');

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user@test.com', 'password123');
    });
  });

  it('debe navegar a /admin si el usuario es administrador', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ isAdmin: true });
    renderWithProviders(mockLogin);
    
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const submitButton = screen.getByText('Ingresar');

    fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  it('debe navegar a / si el usuario no es administrador', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ isAdmin: false });
    renderWithProviders(mockLogin);
    
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const submitButton = screen.getByText('Ingresar');

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('debe mostrar un mensaje de error cuando el login falla', async () => {
    const mockLogin = vi.fn().mockRejectedValue(new Error('Credenciales inválidas'));
    renderWithProviders(mockLogin);
    
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const submitButton = screen.getByText('Ingresar');

    fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
    });
  });

  it('debe tener un enlace para volver al inicio', () => {
    renderWithProviders();
    const backLink = screen.getByText('Volver al inicio').closest('a');
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('debe tener un enlace para ir a registro', () => {
    renderWithProviders();
    const registerLink = screen.getByText('Registrarse').closest('a');
    expect(registerLink).toHaveAttribute('href', '/registro');
  });

  it('debe agregar clase mv-auth-page al body al montar', () => {
    renderWithProviders();
    expect(document.body.classList.contains('mv-auth-page')).toBe(true);
  });

  it('debe remover clase mv-auth-page al desmontar', () => {
    const { unmount } = renderWithProviders();
    expect(document.body.classList.contains('mv-auth-page')).toBe(true);
    unmount();
    expect(document.body.classList.contains('mv-auth-page')).toBe(false);
  });
});

