import { useEffect, useState } from "react";
import { X, Trash2, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { useStore } from "@/store/StoreContext";
import { useRouter } from "@/store/RouterContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { cartItemsDetailed, updateQuantity, removeFromCart, cartSubtotal, discount, total, coupon, applyCoupon, removeCoupon, clearCart } = useStore();
  const { navigate } = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const tryCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    if (applyCoupon(code)) {
      setError("");
      setCode("");
    } else {
      setError("Invalid coupon code");
    }
  };

  const goCheckout = () => {
    onClose();
    navigate({ name: "checkout" });
  };

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 flex h-full w-[26rem] max-w-[88vw] flex-col bg-ink-soft shadow-2xl transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h3 className="font-display text-lg font-semibold text-white">Your Cart</h3>
            <span className="text-xs text-white/40">({cartItemsDetailed.length})</span>
          </div>
          <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-gold">
            <X className="h-5 w-5" />
          </button>
        </div>

        {cartItemsDetailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <ShoppingBag className="h-8 w-8 text-white/30" />
            </div>
            <div>
              <p className="font-display text-lg text-white">Your cart is empty</p>
              <p className="mt-1 text-sm text-white/50">Discover a fragrance that becomes your signature.</p>
            </div>
            <button onClick={() => { onClose(); navigate({ name: "shop" }); }} className="btn-gold">Shop Now</button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {cartItemsDetailed.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 rounded-xl border border-white/8 bg-ink-card p-3">
                    <img src={product.images[0]} alt={product.name} className="h-20 w-16 flex-shrink-0 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-display text-sm font-semibold text-white">{product.name}</h4>
                          <p className="text-[11px] text-white/45">{product.size}</p>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} aria-label="Remove" className="text-white/40 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-white/15">
                          <button onClick={() => updateQuantity(product.id, quantity - 1)} className="flex h-7 w-7 items-center justify-center text-white/70 hover:text-gold" aria-label="Decrease">−</button>
                          <span className="w-6 text-center text-xs text-white">{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, quantity + 1)} className="flex h-7 w-7 items-center justify-center text-white/70 hover:text-gold" aria-label="Increase">+</button>
                        </div>
                        <span className="font-display text-sm font-semibold text-gold">${(product.price * quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-5">
              {/* Coupon */}
              {coupon ? (
                <div className="mb-4 flex items-center justify-between rounded-lg bg-gold/10 px-3 py-2 text-xs">
                  <span className="flex items-center gap-1.5 text-gold"><Tag className="h-3.5 w-3.5" /> {coupon} applied</span>
                  <button onClick={removeCoupon} className="text-white/50 hover:text-red-400">Remove</button>
                </div>
              ) : (
                <form onSubmit={tryCoupon} className="mb-4 flex gap-2">
                  <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="input-lux !py-2 text-xs" />
                  <button type="submit" className="btn-outline !px-4 !py-2 text-xs">Apply</button>
                </form>
              )}
              {error && <p className="mb-2 text-[11px] text-red-400">{error}</p>}
              <p className="mb-3 text-[10px] text-white/40">Try: ZOYAN10 · LUXE15 · GOLD20</p>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-white/60"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                {discount > 0 && <div className="flex justify-between text-gold"><span>Discount</span><span>−${discount.toFixed(2)}</span></div>}
                <div className="flex justify-between border-t border-white/10 pt-2 font-display text-base font-semibold text-white"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>

              <button onClick={goCheckout} className="btn-gold mt-4 w-full">
                Checkout <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={clearCart} className="mt-2 w-full text-center text-[11px] text-white/40 hover:text-red-400">Clear cart</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
