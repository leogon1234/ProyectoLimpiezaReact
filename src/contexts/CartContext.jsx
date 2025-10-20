import React, { createContext, useContext, useReducer, useEffect } from 'react';

function initCart() {
  try {
    const stored = localStorage.getItem('limpifresh-cart');
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Error reading cart from localStorage', err);
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        return state.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...state, { ...item }];
    }
    case 'REMOVE_ITEM': {
      const id = action.payload;
      return state.filter((i) => i.id !== id);
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      return state.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      );
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
  }
}

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], initCart);

  useEffect(() => {
    try {
      localStorage.setItem('limpifresh-cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error writing cart to localStorage', err);
    }
  }, [cart]);

  const addItem = (product, quantity = 1) => {
    const { id, nombre, precio, oferta, precioOferta, img } = product;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id,
        name: nombre,
        price: precio,
        offer: oferta,
        priceOffer: precioOferta,
        image: img,
        quantity,
      },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = item.offer && item.priceOffer ? item.priceOffer : item.price;
    return sum + price * item.quantity;
  }, 0);

  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}