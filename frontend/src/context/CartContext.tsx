import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  nomenclature?: string;
};

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartTotal: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  addToCart: (
    item: {
      id: string;
      name: string;
      price?: number | null;
      image: string;
      category?: string;
      nomenclature?: string;
    },
    quantity?: number,
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
};

const CART_STORAGE_KEY = "cad-cart-items-v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota safety
    }
  }, [items]);

  const addToCart = useCallback(
    (
      product: {
        id: string;
        name: string;
        price?: number | null;
        image: string;
        category?: string;
        nomenclature?: string;
      },
      quantity: number = 1,
    ) => {
      const price = product.price != null && product.price > 0 ? product.price : 24;
      setItems((prev) => {
        const existingIdx = prev.findIndex((i) => i.productId === product.id || i.id === product.id);
        if (existingIdx >= 0) {
          const next = [...prev];
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: next[existingIdx].quantity + quantity,
          };
          return next;
        }
        return [
          ...prev,
          {
            id: product.id,
            productId: product.id,
            name: product.name,
            price,
            image: product.image,
            quantity,
            category: product.category,
            nomenclature: product.nomenclature,
          },
        ];
      });
      setIsCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id && i.productId !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id && i.productId !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id || i.productId === id ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const cartSubtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const cartShipping = useMemo(
    () => (cartSubtotal > 60 || cartSubtotal === 0 ? 0 : 8),
    [cartSubtotal],
  );

  const cartTotal = useMemo(
    () => cartSubtotal + cartShipping,
    [cartSubtotal, cartShipping],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTotal,
        isCartOpen,
        isCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
