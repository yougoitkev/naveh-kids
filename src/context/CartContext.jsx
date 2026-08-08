import React from "react";
import { useState, useEffect } from "react";

const CART_KEY = "kaaru.cart.v1";
const ORDER_KEY = "kaaru.last-order.v1";

function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {}
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLines(read(CART_KEY, []));
    setLastOrder(read(ORDER_KEY, null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      isOpen,
      openCart() {
        setIsOpen(true);
      },
      closeCart() {
        setIsOpen(false);
      },
      addItem(product, quantity = 1) {
        setLines((current) => {
          const existing = current.find(line => line.productId === product.id);
          if (existing) {
            return current.map(line =>
              line.productId === product.id
                ? { ...line, quantity: line.quantity + quantity }
                : line,
            );
          }
          return [
            ...current,
            { productId: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images[0] || "" },
          ];
        });
      },
      removeItem(productId) {
        setLines(current => current.filter(line => line.productId !== productId));
      },
      setQuantity(productId, quantity) {
        setLines((current) =>
          quantity <= 0
            ? current.filter(line => line.productId !== productId)
            : current.map(line =>
                line.productId === productId ? { ...line, quantity } : line,
              ),
        );
      },
      clear() {
        setLines([]);
      },
      lastOrder: lastOrder || null,
      saveOrder(order) {
        setLastOrder(order);
        window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      },
    };
  }, [lines]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}