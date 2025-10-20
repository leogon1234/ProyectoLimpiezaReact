import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pago from './Pago';
import { CartContext } from '../contexts/CartContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCart = [
  {
    id: 1,
    name: 'Detergente Premium',
    price: 5000,
    quantity: 2,
    offer: false
  },
  {
    id: 2,
    name: 'Limpiador Multiuso',
    price: 3000,
    quantity: 1,
    offer: true,
    priceOffer: 2500
  }
];

const renderWithCart = (cart = mockCart, clearCart = vi.fn()) => {
  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = item.offer && item.priceOffer ? item.priceOffer : item.price;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const cartContextValue = {
    cart,
    clearCart,
    subtotal,
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    count: cart.length
  };

  return {
    ...render(
      <BrowserRouter>
        <CartContext.Provider value={cartContextValue}>
          <Pago />
        </CartContext.Provider>
      </BrowserRouter>
    ),
    clearCart
  };
};

describe('Pago Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Carrito vacío', () => {
    it('debe mostrar mensaje cuando el carrito está vacío', () => {
      renderWithCart([]);
      expect(screen.getByText('No tienes productos en el carrito.')).toBeInTheDocument();
    });

    it('debe tener un botón para ver productos cuando el carrito está vacío', () => {
      renderWithCart([]);
      const button = screen.getByText('Ver productos');
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith('/productos');
    });
  });

  describe('Formulario de pago', () => {
    it('debe renderizar el título de la página', () => {
      renderWithCart();
      expect(screen.getByText('Pago')).toBeInTheDocument();
    });

    it('debe renderizar todos los campos del formulario', () => {
      renderWithCart();
      expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument();
      expect(screen.getByLabelText('Dirección')).toBeInTheDocument();
      expect(screen.getByLabelText('Ciudad')).toBeInTheDocument();
      expect(screen.getByLabelText('Teléfono (opcional)')).toBeInTheDocument();
      expect(screen.getByLabelText('Número de tarjeta (16 dígitos)')).toBeInTheDocument();
      expect(screen.getByLabelText('Expiración (MM/AA)')).toBeInTheDocument();
      expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    });

    it('debe actualizar el estado al escribir en los campos', () => {
      renderWithCart();
      const nombreInput = screen.getByPlaceholderText('Ej: Juan Vera');
      const direccionInput = screen.getByPlaceholderText('Ej: calle Antonio, Varas Nº 666');
      const ciudadInput = screen.getByPlaceholderText('Ej: Santiago');
      fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
      fireEvent.change(direccionInput, { target: { value: 'Calle 123' } });
      fireEvent.change(ciudadInput, { target: { value: 'Santiago' } });
      expect(nombreInput.value).toBe('Juan Pérez');
      expect(direccionInput.value).toBe('Calle 123');
      expect(ciudadInput.value).toBe('Santiago');
    });

    it('debe formatear el número de tarjeta correctamente', () => {
      renderWithCart();
      const tarjetaInput = screen.getByPlaceholderText('1234 5678 9012 3456');
      fireEvent.change(tarjetaInput, { target: { value: '1234567890123456' } });
      expect(tarjetaInput.value).toBe('1234 5678 9012 3456');
    });

    it('debe formatear la fecha de expiración correctamente', () => {
      renderWithCart();
      const expiracionInput = screen.getByPlaceholderText('12/25');
      fireEvent.change(expiracionInput, { target: { value: '1225' } });
      expect(expiracionInput.value).toBe('12/25');
    });

    it('debe aceptar solo números en el campo CVV', () => {
      renderWithCart();
      const cvvInput = screen.getByPlaceholderText('123');
      fireEvent.change(cvvInput, { target: { value: '456' } });
      expect(cvvInput.value).toBe('456');
    });

    
    it('debe limitar el CVV a 3 dígitos', () => {
      renderWithCart();
      const cvvInput = screen.getByPlaceholderText('123');
      fireEvent.change(cvvInput, { target: { value: '123' } });
      expect(cvvInput.value).toBe('123');
      fireEvent.change(cvvInput, { target: { value: '12345' } });
      expect(cvvInput.value.length).toBe(3);
    });

    it('debe aceptar solo números en el teléfono', () => {
      renderWithCart();
      const telefonoInput = screen.getByPlaceholderText('Ej: (+56) 9 12345678');
      fireEvent.change(telefonoInput, { target: { value: '912345678' } });
      expect(telefonoInput.value).toBe('912345678');
    });
  });

  describe('Validaciones del formulario', () => {
    it('debe prevenir el envío cuando el formulario está vacío', () => {
      const mockClearCart = vi.fn();
      renderWithCart(mockCart, mockClearCart);
      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);
      expect(mockClearCart).not.toHaveBeenCalled();
    });

    it('debe mostrar error si el nombre no tiene apellido', () => {
      renderWithCart();
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Vera'), { target: { value: 'Juan' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: calle Antonio, Varas Nº 666'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Santiago'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1229' } });
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });
      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);
      expect(screen.getByText('Por favor ingresa tu nombre y apellido.')).toBeInTheDocument();
    });

    it('debe mostrar error si el CVV es muy corto', () => {
      renderWithCart();
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Vera'), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: calle Antonio, Varas Nº 666'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Santiago'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1229' } });
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '12' } });
      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);
      expect(screen.getByText('El CVV debe tener 3.')).toBeInTheDocument();
    });
  });
});
