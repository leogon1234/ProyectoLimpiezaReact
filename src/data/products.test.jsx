import { describe, it, expect } from 'vitest'
import { getProductById, products } from './products'

describe('Obtener producto por id', () => {
  it('que devuelva el producto si existe', () => {
    const id = products[0].id
    const p = getProductById(id)
    expect(p).toBeTruthy()
    expect(p?.id).toBe(id)
    expect(typeof p?.nombre).toBe('string')
  })

  it('que devuelva undefined cuando no existe', () => {
    const p = getProductById(999999)
    expect(p).toBeUndefined()
  })

  it('verificar que los productos son verdaderos y falso si no existe', () => {
    expect(getProductById(products[1].id)).toBeTruthy()
    expect(getProductById(123456)).toBeFalsy()
  })
})
