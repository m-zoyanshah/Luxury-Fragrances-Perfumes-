import { useState } from "react";
import { Heart, Eye, ShoppingBag, Star, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useRouter } from "@/store/RouterContext";
import { useStore } from "@/store/StoreContext";

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: Props) {
  const { navigate } = useRouter();
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const wished = isWishlisted(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const openProduct = () => navigate({ name: "product", slug: product.slug });

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group card-hover relative cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-ink-card"
      onClick={openProduct}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent opacity-60" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.badge && (
            <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label="Wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
            wished ? "bg-gold text-black" : "bg-black/40 text-white hover:bg-gold hover:text-black"
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
        </button>

        {/* Hover actions */}
        <div className="absolute bottom-3 left-3 right-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              added ? "bg-green-500 text-white" : "btn-gold !px-4 !py-2.5 text-xs"
            }`}
          >
            {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingBag className="h-4 w-4" /> Add to Cart</>}
          </button>
          {onQuickView && (
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
              aria-label="Quick view"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all hover:border-gold/60 hover:text-gold"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">{product.category}</p>
        <h3 className="mt-1 font-display text-lg font-semibold text-white transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-3 w-3 ${s <= Math.round(product.rating) ? "fill-gold text-gold" : "text-white/20"}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-white/40">({product.reviewCount})</span>
        </div>
        <div className="mt-3 flex items-end gap-2">
          <span className="font-display text-xl font-semibold text-white">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-white/40 line-through">${product.originalPrice}</span>
          )}
          <span className="ml-auto text-[11px] text-white/40">{product.size}</span>
        </div>
      </div>
    </div>
  );
}
