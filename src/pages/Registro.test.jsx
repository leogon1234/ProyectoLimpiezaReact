import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registro from './Registro';
import { UserContext } from '../contexts/UserContext';

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (registerMock = vi.fn()) => {
  const userContextValue = {
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
    register: registerMock
  };

  return render(
    <BrowserRouter>
      <UserContext.Provider value={userContextValue}>
        <Registro />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

describe('Registro Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.className = '';
  });

  it('debe renderizar el formulario de registro', () => {
    renderWithProviders();
    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
  });

  it('debe mostrar el logo y nombre de la empresa', () => {
    renderWithProviders();
    expect(screen.getByAltText('Logo LimpiFresh')).toBeInTheDocument();
    expect(screen.getAllByText('LimpiFresh').length).toBeGreaterThan(0);
  });

  it('debe tener todos los campos del formulario', () => {
    renderWithProviders();
    
    expect(screen.getByPlaceholderText('Nombre y Apellido')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('correo@ejemplo.cl')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mínimo 8 caracteres')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('12.345.678-5')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una región')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una comuna')).toBeInTheDocument();
  });

  it('debe actualizar el estado del formulario al escribir', () => {
    renderWithProviders();
    
    const nameInput = screen.getByPlaceholderText('Nombre y Apellido');
    const emailInput = screen.getByPlaceholderText('correo@ejemplo.cl');
    const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('Juan Pérez');
    expect(emailInput.value).toBe('juan@test.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('debe permitir seleccionar región y comuna', () => {
    renderWithProviders();
    
    const regionSelect = screen.getByDisplayValue('Selecciona una región');
    const comunaSelect = screen.getByDisplayValue('Selecciona una comuna');

    fireEvent.change(regionSelect, { target: { value: 'Región Metropolitana' } });
    fireEvent.change(comunaSelect, { target: { value: 'Santiago' } });

    expect(regionSelect.value).toBe('Región Metropolitana');
    expect(comunaSelect.value).toBe('Santiago');
  });

  it('debe tener las opciones de región correctas', () => {
    renderWithProviders();
    
    expect(screen.getByText('Región Metropolitana')).toBeInTheDocument();
    expect(screen.getByText('Valparaíso')).toBeInTheDocument();
    expect(screen.getByText('Biobío')).toBeInTheDocument();
    expect(screen.getByText('Otras')).toBeInTheDocument();
  });

  it('debe tener las opciones de comuna correctas', () => {
    renderWithProviders();
    
    expect(screen.getByText('Santiago')).toBeInTheDocument();
    expect(screen.getByText('Providencia')).toBeInTheDocument();
    expect(screen.getByText('Ñuñoa')).toBeInTheDocument();
    expect(screen.getByText('Otra')).toBeInTheDocument();
  });

  it('debe llamar a register con los datos correctos al enviar el formulario', async () => {
    const mockRegister = vi.fn().mockResolvedValue({});
    renderWithProviders(mockRegister);
    
    const nameInput = screen.getByPlaceholderText('Nombre y Apellido');
    const emailInput = screen.getByPlaceholderText('correo@ejemplo.cl');
    const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');
    const submitButton = screen.getByRole('button', { name: 'Registrarse' });

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('Juan Pérez', 'juan@test.com', 'password123');
    });
  });

  it('debe navegar a / después de un registro exitoso', async () => {
    const mockRegister = vi.fn().mockResolvedValue({});
    renderWithProviders(mockRegister);
    
    const nameInput = screen.getByPlaceholderText('Nombre y Apellido');
    const emailInput = screen.getByPlaceholderText('correo@ejemplo.cl');
    const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');
    const submitButton = screen.getByRole('button', { name: 'Registrarse' });

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('debe mostrar un mensaje de error cuando el registro falla', async () => {
    const mockRegister = vi.fn().mockRejectedValue(new Error('El email ya existe'));
    renderWithProviders(mockRegister);
    
    const nameInput = screen.getByPlaceholderText('Nombre y Apellido');
    const emailInput = screen.getByPlaceholderText('correo@ejemplo.cl');
    const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');
    const submitButton = screen.getByRole('button', { name: 'Registrarse' });

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'existente@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El email ya existe')).toBeInTheDocument();
    });
  });

  it('debe tener pestañas de Iniciar sesión y Registrarse', () => {
    renderWithProviders();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.getAllByText('Registrarse').length).toBeGreaterThan(0);
  });

  it('debe tener un enlace para ir a login', () => {
    renderWithProviders();
    const loginLinks = screen.getAllByText('Iniciar sesión');
    const loginLink = loginLinks.find(el => el.closest('a'))?.closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('debe mostrar el texto "¿Ya tienes cuenta?"', () => {
    renderWithProviders();
    expect(screen.getByText('¿Ya tienes cuenta?')).toBeInTheDocument();
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

  it('debe tener el botón de registro habilitado', () => {
    renderWithProviders();
    const submitButton = screen.getByRole('button', { name: 'Registrarse' });
    expect(submitButton).not.toBeDisabled();
  });

  it('debe mostrar ayuda para el campo RUT', () => {
    renderWithProviders();
    expect(screen.getByText('Rut con dígito verificador')).toBeInTheDocument();
  });
});

