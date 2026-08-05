import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Order, Product } from "@/lib/types";

const CART_KEY = "kaaru.cart.v1";
const ORDER_KEY = "kaaru.last-order.v1";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  lastOrder: Order | null;
  saveOrder: (order: Order) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(read<CartLine[]>(CART_KEY, []));
    setLastOrder(read<Order | null>(ORDER_KEY, null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (product, quantity = 1) => {
        setLines((current) => {
          const existing = current.find((line) => line.productId === product.id);
          if (existing) {
            return current.map((line) =>
              line.productId === product.id
                ? { ...line, quantity: line.quantity + quantity }
                : line,
            );
          }
          return [
            ...current,
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.images[0] ?? "",
              quantity,
            },
          ];
        });
        setIsOpen(true);
      },
      removeItem: (productId) =>
        setLines((current) => current.filter((line) => line.productId !== productId)),
      setQuantity: (productId, quantity) =>
        setLines((current) =>
          quantity <= 0
            ? current.filter((line) => line.productId !== productId)
            : current.map((line) =>
                line.productId === productId ? { ...line, quantity } : line,
              ),
        ),
      clear: () => setLines([]),
      lastOrder,
      saveOrder: (order) => {
        setLastOrder(order);
        window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      },
    };
  }, [lines, isOpen, lastOrder]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
