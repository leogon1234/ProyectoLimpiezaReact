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
      expect(screen.getByLabelText('CVV (3 o 4 dígitos)')).toBeInTheDocument();
    });

    it('debe actualizar el estado al escribir en los campos', () => {
      renderWithCart();
      
      const nombreInput = screen.getByPlaceholderText('Ej: Juan Pérez');
      const direccionInput = screen.getByPlaceholderText('Ej: Calle 123 #45-67');
      const ciudadInput = screen.getByPlaceholderText('Ej: Bogotá');

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

    it('debe limitar el CVV a 4 dígitos', () => {
      renderWithCart();
      
      const cvvInput = screen.getByPlaceholderText('123');

      fireEvent.change(cvvInput, { target: { value: '1234' } });
      expect(cvvInput.value).toBe('1234');
      
      fireEvent.change(cvvInput, { target: { value: '12345' } });
      expect(cvvInput.value.length).toBeLessThanOrEqual(4);
    });

    it('debe aceptar solo números en el teléfono', () => {
      renderWithCart();
      
      const telefonoInput = screen.getByPlaceholderText('Ej: 3001234567');
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
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), { target: { value: 'Juan' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1229' } });
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      expect(screen.getByText('Por favor ingresa tu nombre y apellido.')).toBeInTheDocument();
    });

    it('debe mostrar error si la dirección es muy corta', () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), { target: { value: 'Cal' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1229' } });
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      expect(screen.getByText('La dirección debe tener al menos 5 caracteres.')).toBeInTheDocument();
    });

    it('debe mostrar error si la ciudad es muy corta', () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), { target: { value: 'Sa' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1229' } });
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      expect(screen.getByText('La ciudad debe tener al menos 3 caracteres.')).toBeInTheDocument();
    });

    it('debe mostrar error si la tarjeta no tiene 16 dígitos', () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1229' } });
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      expect(screen.getByText('El número de tarjeta debe tener 16 dígitos.')).toBeInTheDocument();
    });

    it('debe mostrar error si el mes de expiración es inválido', () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1330' } }); 
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      expect(screen.getByText('El mes debe estar entre 01 y 12.')).toBeInTheDocument();
    });

    it('debe mostrar error si la tarjeta está vencida', () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '0120' } }); 
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      expect(screen.getByText('La tarjeta está vencida.')).toBeInTheDocument();
    });

    it('debe mostrar error si el CVV es muy corto', () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), { target: { value: 'Calle Principal 123' } });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), { target: { value: 'Santiago' } });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByPlaceholderText('12/25'), { target: { value: '1229' } });
      fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '12' } });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      expect(screen.getByText('El CVV debe tener 3 o 4 dígitos.')).toBeInTheDocument();
    });
  });

  describe('Resumen del pedido', () => {
    it('debe mostrar todos los productos del carrito', () => {
      renderWithCart();
      
      expect(screen.getByText('Detergente Premium')).toBeInTheDocument();
      expect(screen.getByText('Limpiador Multiuso')).toBeInTheDocument();
    });

    it('debe mostrar la cantidad de cada producto', () => {
      renderWithCart();
      
      expect(screen.getByText('Cantidad: 2')).toBeInTheDocument();
      expect(screen.getByText('Cantidad: 1')).toBeInTheDocument();
    });

    it('debe calcular correctamente el subtotal', () => {
      renderWithCart();
      
      const subtotal = (5000 * 2) + (2500 * 1); // 12500
      expect(screen.getByText(`$${subtotal.toLocaleString()}`)).toBeInTheDocument();
    });

    it('debe calcular el IVA correctamente', () => {
      renderWithCart();
      
      const subtotal = (5000 * 2) + (2500 * 1); // 12500
      const iva = subtotal * 0.19; // 2375
      const ivaFormatted = iva.toLocaleString(undefined, { maximumFractionDigits: 0 });
      expect(screen.getByText(`$${ivaFormatted}`)).toBeInTheDocument();
    });

    it('debe calcular el total correctamente', () => {
      renderWithCart();
      
      const subtotal = (5000 * 2) + (2500 * 1); // 12500
      const total = subtotal + (subtotal * 0.19); // 14875
      const totalFormatted = total.toLocaleString(undefined, { maximumFractionDigits: 0 });
      expect(screen.getByText(`$${totalFormatted}`)).toBeInTheDocument();
    });

    it('debe usar el precio de oferta cuando esté disponible', () => {
      const cartWithOffer = [
        {
          id: 1,
          name: 'Producto con Oferta',
          price: 5000,
          priceOffer: 3000,
          quantity: 1,
          offer: true
        }
      ];
      renderWithCart(cartWithOffer);
      
      const prices = screen.getAllByText('$3,000');
      expect(prices.length).toBeGreaterThan(0);
      expect(screen.getByText('Producto con Oferta')).toBeInTheDocument();
    });
  });

  describe('Envío del formulario', () => {
    it('debe procesar el pago correctamente con datos válidos', async () => {
      const mockClearCart = vi.fn();
      renderWithCart(mockCart, mockClearCart);
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), {
        target: { value: 'Juan Pérez González' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), {
        target: { value: 'Calle Principal 123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), {
        target: { value: 'Santiago' }
      });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
        target: { value: '1234567890123456' }
      });
      fireEvent.change(screen.getByPlaceholderText('12/25'), {
        target: { value: '1229' } 
      });
      fireEvent.change(screen.getByPlaceholderText('123'), {
        target: { value: '123' }
      });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockClearCart).toHaveBeenCalledTimes(1);
      });
    });

    it('debe guardar los datos del pedido en localStorage', async () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), {
        target: { value: 'Juan Pérez González' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), {
        target: { value: 'Calle Principal 123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), {
        target: { value: 'Santiago' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: 3001234567'), {
        target: { value: '912345678' }
      });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
        target: { value: '1234567890123456' }
      });
      fireEvent.change(screen.getByPlaceholderText('12/25'), {
        target: { value: '1229' }
      });
      fireEvent.change(screen.getByPlaceholderText('123'), {
        target: { value: '123' }
      });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      await waitFor(() => {
        const savedOrder = localStorage.getItem('lastOrder');
        expect(savedOrder).toBeTruthy();
        
        const orderData = JSON.parse(savedOrder);
        expect(orderData.customerInfo.nombre).toBe('Juan Pérez González');
        expect(orderData.customerInfo.direccion).toBe('Calle Principal 123');
        expect(orderData.customerInfo.ciudad).toBe('Santiago');
        expect(orderData.customerInfo.telefono).toBe('912345678');
      });
    });

    it('debe mostrar la página de confirmación después del pago exitoso', async () => {
      renderWithCart();
      
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), {
        target: { value: 'Juan Pérez González' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), {
        target: { value: 'Calle Principal 123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), {
        target: { value: 'Santiago' }
      });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
        target: { value: '1234567890123456' }
      });
      fireEvent.change(screen.getByPlaceholderText('12/25'), {
        target: { value: '1229' }
      });
      fireEvent.change(screen.getByPlaceholderText('123'), {
        target: { value: '123' }
      });

      const submitButton = screen.getByText('Confirmar compra');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('¡Gracias por tu compra!')).toBeInTheDocument();
      });
    });
  });

  describe('Página de confirmación', () => {
    it('debe mostrar mensaje de éxito después del pago', async () => {
      renderWithCart();
      
      // Completar el pago
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), {
        target: { value: 'Juan Pérez González' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), {
        target: { value: 'Calle Principal 123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), {
        target: { value: 'Santiago' }
      });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
        target: { value: '1234567890123456' }
      });
      fireEvent.change(screen.getByPlaceholderText('12/25'), {
        target: { value: '1229' }
      });
      fireEvent.change(screen.getByPlaceholderText('123'), {
        target: { value: '123' }
      });

      fireEvent.click(screen.getByText('Confirmar compra'));

      await waitFor(() => {
        expect(screen.getByText('¡Gracias por tu compra!')).toBeInTheDocument();
        expect(screen.getByText(/Hemos recibido tu pedido/)).toBeInTheDocument();
      });
    });

    it('debe tener un botón para descargar la boleta', async () => {
      renderWithCart();
      
      // Completar el pago
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), {
        target: { value: 'Juan Pérez González' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), {
        target: { value: 'Calle Principal 123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), {
        target: { value: 'Santiago' }
      });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
        target: { value: '1234567890123456' }
      });
      fireEvent.change(screen.getByPlaceholderText('12/25'), {
        target: { value: '1229' }
      });
      fireEvent.change(screen.getByPlaceholderText('123'), {
        target: { value: '123' }
      });

      fireEvent.click(screen.getByText('Confirmar compra'));

      await waitFor(() => {
        const boletaButton = screen.getByText(/Descargar tu boleta aquí/);
        expect(boletaButton).toBeInTheDocument();
        fireEvent.click(boletaButton);
        expect(mockNavigate).toHaveBeenCalledWith('/boleta');
      });
    });

    it('debe tener botones de navegación en la página de confirmación', async () => {
      renderWithCart();
      
      // Completar el pago
      fireEvent.change(screen.getByPlaceholderText('Ej: Juan Pérez'), {
        target: { value: 'Juan Pérez González' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Calle 123 #45-67'), {
        target: { value: 'Calle Principal 123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ej: Bogotá'), {
        target: { value: 'Santiago' }
      });
      fireEvent.change(screen.getByPlaceholderText('1234 5678 9012 3456'), {
        target: { value: '1234567890123456' }
      });
      fireEvent.change(screen.getByPlaceholderText('12/25'), {
        target: { value: '1229' }
      });
      fireEvent.change(screen.getByPlaceholderText('123'), {
        target: { value: '123' }
      });

      fireEvent.click(screen.getByText('Confirmar compra'));

      await waitFor(() => {
        expect(screen.getByText('Volver al inicio')).toBeInTheDocument();
        expect(screen.getByText('Ver más productos')).toBeInTheDocument();
      });
    });
  });

  describe('Límites de entrada', () => {
    it('no debe permitir más de 16 dígitos en la tarjeta', () => {
      renderWithCart();
      
      const tarjetaInput = screen.getByPlaceholderText('1234 5678 9012 3456');
      fireEvent.change(tarjetaInput, { target: { value: '12345678901234567' } }); // 17 dígitos

      // Debe mantener solo 16 dígitos formateados
      expect(tarjetaInput.value.replace(/\s/g, '').length).toBeLessThanOrEqual(16);
    });

    it('no debe permitir más de 4 caracteres en expiración', () => {
      renderWithCart();
      
      const expiracionInput = screen.getByPlaceholderText('12/25');
      fireEvent.change(expiracionInput, { target: { value: '123456' } });

      // Debe mantener formato MM/AA (5 caracteres con la barra)
      expect(expiracionInput.value.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Limpiar errores', () => {
    it('debe permitir editar campos después de un intento de envío fallido', () => {
      renderWithCart();
      
      // Enviar formulario vacío
      fireEvent.click(screen.getByText('Confirmar compra'));
      
      // Debe poder escribir en los campos después de un intento fallido
      const nombreInput = screen.getByPlaceholderText('Ej: Juan Pérez');
      fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });

      // El campo debe actualizarse correctamente
      expect(nombreInput.value).toBe('Juan Pérez');
    });
  });
});

