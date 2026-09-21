import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Product } from "@/lib/catalog";

export type CartItem = {
  product: Product;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, color: string) => void;
  updateQuantity: (slug: string, color: string, quantity: number) => void;
  removeItem: (slug: string, color: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "carry-nest-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return {
      items,
      count,
      subtotal,
      addItem: (product, color) => {
        setItems((current) => {
          const existing = current.find((item) => item.product.slug === product.slug && item.color === color);
          if (existing) {
            return current.map((item) =>
              item.product.slug === product.slug && item.color === color
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }
          return [...current, { product, color, quantity: 1 }];
        });
      },
      updateQuantity: (slug, color, quantity) => {
        setItems((current) =>
          current
            .map((item) =>
              item.product.slug === slug && item.color === color ? { ...item, quantity } : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem: (slug, color) => {
        setItems((current) => current.filter((item) => !(item.product.slug === slug && item.color === color)));
      },
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}