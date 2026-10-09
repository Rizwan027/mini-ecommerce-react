import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'northstar-cart-v1'

function readSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readSavedCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error('Unable to save cart to localStorage:', error)
    }
  }, [cart])

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => setCart((current) => current.filter((item) => item.id !== productId))
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId)
    setCart((current) => current.map((item) => item.id === productId ? { ...item, quantity } : item))
  }
  const clearCart = () => setCart([])

  const value = useMemo(() => ({
    cart, addToCart, removeFromCart, updateQuantity, clearCart,
    itemCount: cart.reduce((total, item) => total + item.quantity, 0),
    subtotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
  }), [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}