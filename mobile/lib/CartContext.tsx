import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selected: boolean;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "selected">) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  unselectAll: () => void;
  removeSelected: () => void;
  clearSelected: () => void;
  total: number;
};

const CartContext = createContext<CartContextType>(null as any);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity" | "selected">) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === item._id);
      if (existing) {
        return prev.map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1, selected: true }];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 0) return;
    
    if (qty === 0) {
      Alert.alert(
        "Remove Item",
        "Remove this item from cart?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () =>
              setCart((prev) => prev.filter((p) => p._id !== id)),
          },
        ]
      );
      return;
    }

    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, quantity: qty } : p
      )
    );
  };

  const toggleSelect = (id: string) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const selectAll = () => {
    setCart((prev) =>
      prev.map((p) => ({ ...p, selected: true }))
    );
  };

  const unselectAll = () => {
    setCart((prev) =>
      prev.map((p) => ({ ...p, selected: false }))
    );
  };

  const removeSelected = () => {
    setCart((prev) => prev.filter((p) => !p.selected));
  };

  const total = cart
    .filter((p) => p.selected)
    .reduce((sum, p) => sum + p.price * p.quantity, 0);

  const clearSelected = () => {
    setCart(prev => prev.filter(item => !item.selected));
  };

    
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        toggleSelect,
        selectAll,
        unselectAll,
        removeSelected,
        clearSelected,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
