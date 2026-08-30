import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/data/products";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  coupon: string | null;
  cartCount: number;
  cartSubtotal: number;
  discount: number;
  total: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartItemsDetailed: { product: Product; quantity: number }[];
}

const COUPONS: Record<string, number> = {
  ZOYAN10: 0.1,
  LUXE15: 0.15,
  GOLD20: 0.2,
};

const StoreContext = createContext<StoreState | null>(null);

const STORAGE_KEY = "zoyan-store-v1";

interface Persisted {
  cart: CartItem[];
  wishlist: string[];
  coupon: string | null;
}

function load(): Persisted {
  if (typeof window === "undefined") return { cart: [], wishlist: [], coupon: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cart: [], wishlist: [], coupon: null };
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      cart: parsed.cart ?? [],
      wishlist: parsed.wishlist ?? [],
      coupon: parsed.coupon ?? null,
    };
  } catch {
    return { cart: [], wishlist: [], coupon: null };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load().cart);
  const [wishlist, setWishlist] = useState<string[]>(() => load().wishlist);
  const [coupon, setCoupon] = useState<string | null>(() => load().coupon);

  useEffect(() => {
    const data: Persisted = { cart, wishlist, coupon };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, [cart, wishlist, coupon]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const applyCoupon = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      if (COUPONS[normalized]) {
        setCoupon(normalized);
        return true;
      }
      return false;
    },
    []
  );

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const cartItemsDetailed = useMemo(
    () =>
      cart
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((x): x is { product: Product; quantity: number } => x !== null),
    [cart]
  );

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  const cartSubtotal = useMemo(
    () => cartItemsDetailed.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0),
    [cartItemsDetailed]
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    const rate = COUPONS[coupon] ?? 0;
    return Math.round(cartSubtotal * rate * 100) / 100;
  }, [coupon, cartSubtotal]);

  const total = useMemo(() => Math.max(0, cartSubtotal - discount), [cartSubtotal, discount]);

  const value: StoreState = {
    cart,
    wishlist,
    coupon,
    cartCount,
    cartSubtotal,
    discount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    applyCoupon,
    removeCoupon,
    cartItemsDetailed,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
