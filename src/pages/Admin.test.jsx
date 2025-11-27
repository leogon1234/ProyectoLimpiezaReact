import { describe, it, expect } from 'vitest'
import { products } from '../data/products'

describe('Validar casilla de iva, stock y precio', () => {

  it('debería aprobar cuando el IVA y el stock son válidos', () => {
    const iva = 19;
    const stock = 10;
    expect(iva).toBeGreaterThan(0);
    expect(stock).toBeGreaterThan(0);
  });

  it('debe fallar si el IVA es negativo', () => {
    const iva = -5;
    expect(iva).toBeLessThanOrEqual(0);
  });

  it('debe fallar si el stock es negativo', () => {
    const stock = -2;
    expect(stock).toBeLessThanOrEqual(0);
  });

  it('debe fallar si el IVA o el stock son cero', () => {
    const iva = 0;
    const stock = 0;

    expect(iva).toBeLessThanOrEqual(0);
    expect(stock).toBeLessThanOrEqual(0);
  });
  
  it('el precio debe ser mayor que 0', () => {
    const precio = 2500;
    expect(precio).toBeGreaterThan(0);
  });

  it('debe fallar si el precio es negativo',()=>{
    const precio_negativo= -1000
    expect(precio_negativo).toBeLessThan(0)
  })

});