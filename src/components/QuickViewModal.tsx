import { useEffect, useState } from "react";
import { X, Star, ShoppingBag, Heart, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useRouter } from "@/store/RouterContext";
import { useStore } from "@/store/StoreContext";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const { navigate } = useRouter();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setQty(1);
    setActiveImg(0);
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const goProduct = () => {
    navigate({ name: "product", slug: product.slug });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-ink-card shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-gradient-to-b from-white/5 to-transparent p-6">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-16 w-14 overflow-hidden rounded-lg border-2 transition-all ${
                    activeImg === i ? "border-gold" : "border-transparent opacity-60"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">{product.category}</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-white">{product.name}</h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-white/20"}`} />
                ))}
              </div>
              <span className="text-xs text-white/50">{product.rating} · {product.reviewCount} reviews</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65 line-clamp-4">{product.description}</p>

            <div className="mt-4 space-y-1.5 text-xs text-white/55">
              <p><span className="text-gold/80">Top:</span> {product.notes.top.join(", ")}</p>
              <p><span className="text-gold/80">Heart:</span> {product.notes.middle.join(", ")}</p>
              <p><span className="text-gold/80">Base:</span> {product.notes.base.join(", ")}</p>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-3xl font-semibold text-white">${product.price}</span>
              {product.originalPrice && <span className="text-lg text-white/40 line-through">${product.originalPrice}</span>}
              <span className="ml-auto text-xs text-white/50">{product.size}</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-white/15 bg-white/5">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-gold" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center text-sm text-white">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-gold" aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={() => { addToCart(product.id, qty); onClose(); }} className="btn-gold flex-1">
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                  isWishlisted(product.id) ? "border-gold bg-gold text-black" : "border-white/15 text-white hover:border-gold/60 hover:text-gold"
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            <button onClick={goProduct} className="mt-4 text-xs text-gold/80 underline-offset-4 hover:underline">
              View full details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
