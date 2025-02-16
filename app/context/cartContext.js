// context/cartContext.js
"use client";

import { createContext, useContext, useState } from "react";

// Create context
const CartContext = createContext();

// Custom hook to use Cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Get cart item count
  const getCartItemCount = () => cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
