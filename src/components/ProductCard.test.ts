import { describe, it, expect } from 'vitest'
import { products } from '../data/products'

describe('verificar los productos', () => {
  it('que devuelva el precio del producto si existe', () => {
        const product= products[0];
        expect(typeof product.precio).toBe('number');
    });
    
    it('que devuelva el nombre del producto si existe', () => {
        const product= products[0];
        expect(typeof product.nombre).toBe('string');
    });

    it ('que no devuelva producto cuando no existe', () => {
        const product= products.find(p => p.id === 999999);
        expect(product).toBeUndefined();
    });

    it ('no devolver precios que sean negativos o cero', () => {
        const negativo_nulo = products.find(p => p.precio <= 0);
        expect(negativo_nulo).toBeUndefined();
    });
});