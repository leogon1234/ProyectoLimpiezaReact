// tests/adminFieldsOnSiteProducts.test.ts
import { describe, it, expect } from 'vitest'
import { products } from '../data/products'

describe('Campos de admin', () => {
  it('el iva debe ser mayor a 0%', () => {
    products.forEach(p => {
      if (typeof p.iva !== 'undefined') {
        expect(p.iva).toBeGreaterThanOrEqual(0)
      }
    })
  })

  it('el stock no debe ser negativo', () => {
    products.forEach(p => {
      if (typeof p.stock !== 'undefined') {
        expect(p.stock).toBeGreaterThanOrEqual(0)
      }
    })
  })
})
