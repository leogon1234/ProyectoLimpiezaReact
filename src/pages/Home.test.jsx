import {describe, it, expect} from 'vitest'
import { products } from '../data/products'

describe('Pruebas con Home', () => {
    it('deberia tener productos disponibles', () => {
        expect(products.length).toBeGreaterThan(0);
    });

    it('generar link de producto correctamente', () => {
        const producto = products[0];
        const productoLink = `/productos/${producto.id}`;
        expect(productoLink).toBe(`/productos/${producto.id}`);
    });

    it('generar link de producto incorrectamente', () => {
        const producto = products[0];
        const productoLink = `/productos/${producto.id}`;
        expect(productoLink).not.toBe(`/productos/999999`);
    });

    it('No aceptar links no correpospondientes', () => {
        const tiposLinks= ['/productos/abc', '/productos//', '/productos//456'];
        tiposLinks.forEach(link => {
            expect(link).not.toMatch(/\/productos\/\d+/);
        });
    });
});
