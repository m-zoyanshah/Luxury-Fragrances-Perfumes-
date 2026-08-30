import { useState } from "react";
import { ShoppingBag, CreditCard, Wallet, Banknote, Check, Lock, Tag, ArrowRight, Trash2 } from "lucide-react";
import { useStore } from "@/store/StoreContext";
import { useRouter } from "@/store/RouterContext";

type PaymentMethod = "stripe" | "paypal" | "cod";

export default function CheckoutPage() {
  const { cartItemsDetailed, cartSubtotal, discount, total, coupon, applyCoupon, removeCoupon, updateQuantity, removeFromCart, clearCart } = useStore();
  const { navigate } = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", country: "" });

  const tryCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(code)) { setCouponError(""); setCode(""); }
    else setCouponError("Invalid coupon code");
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/10 animate-glow">
          <Check className="h-10 w-10 text-gold" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold text-white">Order Confirmed</h1>
        <p className="mt-3 max-w-md text-sm text-white/60">
          Thank you for your order. A confirmation has been sent to your email. Your fragrance is being hand-prepared and will ship within 24 hours.
        </p>
        <button onClick={() => navigate({ name: "home" })} className="btn-gold mt-8">Back to Home</button>
      </div>
    );
  }

  if (cartItemsDetailed.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 pt-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <ShoppingBag className="h-8 w-8 text-white/30" />
        </div>
        <p className="font-display text-2xl text-white">Your cart is empty</p>
        <button onClick={() => navigate({ name: "shop" })} className="btn-gold">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-8xl px-5 py-10 lg:px-10">
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Checkout</h1>
        <p className="mt-2 text-sm text-white/55">Complete your order — it's secure and encrypted.</p>

        <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Left: details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Shipping */}
            <div className="rounded-3xl border border-white/10 bg-ink-card p-7">
              <h2 className="font-display text-xl font-semibold text-white">Shipping Details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="input-lux" />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="input-lux" />
                <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" className="input-lux sm:col-span-2" />
                <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="input-lux" />
                <input required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="ZIP / Postal code" className="input-lux" />
                <input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" className="input-lux sm:col-span-2" />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-white/10 bg-ink-card p-7">
              <h2 className="font-display text-xl font-semibold text-white">Payment Method</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {([
                  { id: "stripe", label: "Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
                  { id: "paypal", label: "PayPal", icon: Wallet, desc: "Pay with your account" },
                  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when it arrives" },
                ] as const).map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setMethod(p.id)}
                    className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
                      method === p.id ? "border-gold bg-gold/10" : "border-white/10 bg-white/5 hover:border-white/25"
                    }`}
                  >
                    <p.icon className={`h-5 w-5 ${method === p.id ? "text-gold" : "text-white/60"}`} />
                    <span className="text-sm font-semibold text-white">{p.label}</span>
                    <span className="text-[11px] text-white/45">{p.desc}</span>
                  </button>
                ))}
              </div>
              {method === "stripe" && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input placeholder="Card number" className="input-lux sm:col-span-2" />
                  <input placeholder="MM / YY" className="input-lux" />
                  <input placeholder="CVC" className="input-lux" />
                </div>
              )}
            </div>
          </div>

          {/* Right: summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-ink-card p-7">
              <h2 className="font-display text-xl font-semibold text-white">Order Summary</h2>

              <div className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
                {cartItemsDetailed.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img src={product.images[0]} alt={product.name} className="h-16 w-12 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-semibold text-white">{product.name}</p>
                      <p className="text-[11px] text-white/45">{product.size} · Qty {quantity}</p>
                      <div className="mt-auto flex items-center gap-2">
                        <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} className="text-xs text-white/50 hover:text-gold">−</button>
                        <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} className="text-xs text-white/50 hover:text-gold">+</button>
                        <button type="button" onClick={() => removeFromCart(product.id)} className="ml-auto text-white/40 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gold">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mt-5 border-t border-white/10 pt-5">
                {coupon ? (
                  <div className="flex items-center justify-between rounded-lg bg-gold/10 px-3 py-2 text-xs">
                    <span className="flex items-center gap-1.5 text-gold"><Tag className="h-3.5 w-3.5" /> {coupon}</span>
                    <button type="button" onClick={removeCoupon} className="text-white/50 hover:text-red-400">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={tryCoupon} className="flex gap-2">
                    <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="input-lux !py-2 text-xs" />
                    <button type="submit" className="btn-outline !px-4 !py-2 text-xs">Apply</button>
                  </form>
                )}
                {couponError && <p className="mt-1 text-[11px] text-red-400">{couponError}</p>}
                <p className="mt-2 text-[10px] text-white/40">Try: ZOYAN10 · LUXE15 · GOLD20</p>
              </div>

              <div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm">
                <div className="flex justify-between text-white/60"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-white/60"><span>Shipping</span><span>{cartSubtotal >= 150 ? "Free" : "$12.00"}</span></div>
                {discount > 0 && <div className="flex justify-between text-gold"><span>Discount</span><span>−${discount.toFixed(2)}</span></div>}
                <div className="flex justify-between border-t border-white/10 pt-3 font-display text-lg font-semibold text-white">
                  <span>Total</span><span>${(total + (cartSubtotal >= 150 ? 0 : 12)).toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="btn-gold mt-6 w-full">
                <Lock className="h-4 w-4" /> Place Order <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-[10px] text-white/40">Secure 256-bit SSL encryption</p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
