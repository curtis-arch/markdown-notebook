'use client'

import React, { createContext, useContext, useState } from 'react'
import { HeadingNode } from '../utils/markdownParser'

interface CartItem {
  node: HeadingNode
  content: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (nodeTitle: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      if (!prevItems.some((i) => i.node.title === item.node.title)) {
        return [...prevItems, item]
      }
      return prevItems
    })
  }

  const removeFromCart = (nodeTitle: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.node.title !== nodeTitle))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

