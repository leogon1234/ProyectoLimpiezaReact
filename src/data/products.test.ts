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
})
