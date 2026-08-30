import { useEffect, useMemo, useRef, useState } from "react";
import { Star, Heart, ShoppingBag, Minus, Plus, Check, Truck, ShieldCheck, RotateCcw, ChevronRight, Quote } from "lucide-react";
import { useRouter } from "@/store/RouterContext";
import { useStore } from "@/store/StoreContext";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import type { Product } from "@/data/products";

export default function ProductDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const product = getProductBySlug(slug);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"notes" | "reviews" | "shipping">("notes");
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [quickView, setQuickView] = useState<Product | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImg(0);
    setQty(1);
    setTab("notes");
  }, [slug]);

  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20 text-center">
        <p className="font-display text-3xl text-white">Fragrance not found</p>
        <button onClick={() => navigate({ name: "shop" })} className="btn-gold">Back to Shop</button>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-8xl px-5 py-4 lg:px-10">
        <nav className="flex items-center gap-2 text-xs text-white/40">
          <button onClick={() => navigate({ name: "home" })} className="hover:text-gold">Home</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => navigate({ name: "shop" })} className="hover:text-gold">Shop</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => navigate({ name: "shop", category: product.category })} className="hover:text-gold">{product.category}</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="mx-auto max-w-8xl px-5 py-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div
              ref={imgRef}
              className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 zoom-lens"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300"
                style={zoom ? { transform: `scale(2)`, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              />
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">{product.badge}</span>
                )}
                {discount > 0 && (
                  <span className="rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">-{discount}%</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-24 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImg === i ? "border-gold" : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:pt-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">{product.brand} · {product.category}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-white sm:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-white/20"}`} />
                ))}
              </div>
              <span className="text-sm text-white/50">{product.rating} · {product.reviewCount} reviews</span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-4xl font-semibold text-white">${product.price}</span>
              {product.originalPrice && <span className="text-xl text-white/40 line-through">${product.originalPrice}</span>}
              <span className="ml-auto rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">{product.size}</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/65">{product.description}</p>

            {/* Notes quick view */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Top Notes", items: product.notes.top },
                { label: "Heart", items: product.notes.middle },
                { label: "Base", items: product.notes.base },
              ].map((n) => (
                <div key={n.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-gold/80">{n.label}</p>
                  <p className="mt-1 text-xs text-white/70">{n.items.join(", ")}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-white/15 bg-white/5">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-white/70 hover:text-gold" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center text-white">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="flex h-12 w-12 items-center justify-center text-white/70 hover:text-gold" aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={() => addToCart(product.id, qty)} className="btn-gold flex-1">
                <ShoppingBag className="h-5 w-5" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
                  wished ? "border-gold bg-gold text-black" : "border-white/15 text-white hover:border-gold/60 hover:text-gold"
                }`}
              >
                <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
              </button>
            </div>

            <p className="mt-3 text-xs text-white/45">
              {product.stock > 0 ? <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-400" /> In stock — {product.stock} available</span> : "Out of stock"}
            </p>

            {/* Trust */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {[
                { icon: Truck, label: "Free shipping over $150" },
                { icon: RotateCcw, label: "30-day returns" },
                { icon: ShieldCheck, label: "100% authentic" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2 text-center">
                  <t.icon className="h-5 w-5 text-gold" />
                  <span className="text-[11px] text-white/55">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="flex gap-6 border-b border-white/10">
            {([
              { key: "notes", label: "Fragrance Notes" },
              { key: "reviews", label: `Reviews (${product.reviewCount})` },
              { key: "shipping", label: "Shipping & Returns" },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative pb-3 text-sm font-medium transition-colors ${
                  tab === t.key ? "text-gold" : "text-white/50 hover:text-white"
                }`}
              >
                {t.label}
                {tab === t.key && <span className="absolute -bottom-px left-0 h-0.5 w-full bg-gold" />}
              </button>
            ))}
          </div>

          <div className="py-8">
            {tab === "notes" && (
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Top Notes", desc: "The first impression — bright and fleeting", items: product.notes.top },
                  { title: "Middle Notes", desc: "The heart of the fragrance", items: product.notes.middle },
                  { title: "Base Notes", desc: "The lasting foundation", items: product.notes.base },
                ].map((n) => (
                  <div key={n.title} className="rounded-2xl border border-white/10 bg-ink-card p-6">
                    <h4 className="font-display text-xl text-gold">{n.title}</h4>
                    <p className="mt-1 text-xs text-white/45">{n.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {n.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/75">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="md:col-span-3">
                  <h4 className="font-display text-xl text-gold">The Story</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{product.story}</p>
                </div>
              </div>
            )}

            {tab === "reviews" && (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="rounded-2xl border border-white/10 bg-ink-card p-6 text-center">
                    <p className="font-display text-5xl font-semibold text-white">{product.rating}</p>
                    <div className="mt-2 flex justify-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`h-5 w-5 ${s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-white/20"}`} />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-white/50">{product.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="space-y-4 lg:col-span-2">
                  {product.reviews.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-white/10 bg-ink-card p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-semibold text-gold">{r.name.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-semibold text-white">{r.name}</p>
                            <p className="text-[11px] text-white/40">{r.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-gold text-gold" : "text-white/20"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 font-display text-base font-semibold text-white">{r.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "shipping" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-ink-card p-6">
                  <Truck className="h-6 w-6 text-gold" />
                  <h4 className="mt-3 font-display text-xl text-white">Shipping</h4>
                  <ul className="mt-3 space-y-2 text-sm text-white/65">
                    <li>Free express shipping on orders over $150</li>
                    <li>Standard delivery: 3–5 business days</li>
                    <li>Express delivery: 1–2 business days</li>
                    <li>International shipping available worldwide</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-ink-card p-6">
                  <RotateCcw className="h-6 w-6 text-gold" />
                  <h4 className="mt-3 font-display text-xl text-white">Returns</h4>
                  <ul className="mt-3 space-y-2 text-sm text-white/65">
                    <li>30-day satisfaction guarantee</li>
                    <li>Free returns on unopened items</li>
                    <li>Refund processed within 5–7 days</li>
                    <li>Contact care@zoyanperfumes.com for assistance</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 font-display text-3xl font-semibold text-white sm:text-4xl">You May Also Love</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
              ))}
            </div>
          </div>
        )}
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
