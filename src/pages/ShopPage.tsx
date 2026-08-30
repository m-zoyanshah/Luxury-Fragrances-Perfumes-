import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, Check, Star, Heart } from "lucide-react";
import { useRouter } from "@/store/RouterContext";
import { useStore } from "@/store/StoreContext";
import { PRODUCTS, CATEGORIES, type Product, type Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export default function ShopPage() {
  const { route, navigate } = useRouter();
  const { toggleWishlist, isWishlisted } = useStore();
  const [quickView, setQuickView] = useState<Product | null>(null);

  const initialCategory = route.name === "shop" ? route.category : undefined;
  const [selectedCats, setSelectedCats] = useState<Category[]>(() =>
    initialCategory ? [initialCategory as Category] : []
  );
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(350);
  const [sort, setSort] = useState<SortKey>("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (initialCategory) setSelectedCats([initialCategory as Category]);
  }, [initialCategory]);

  const toggleCat = (cat: Category) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= maxPrice);
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          [...p.notes.top, ...p.notes.middle, ...p.notes.base].some((n) => n.toLowerCase().includes(q))
      );
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0)); break;
    }
    return list;
  }, [selectedCats, query, maxPrice, sort]);

  const clearAll = () => {
    setSelectedCats([]);
    setQuery("");
    setMaxPrice(350);
    setSort("featured");
    navigate({ name: "shop" });
  };

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h4 className="mb-3 text-xs uppercase tracking-[0.25em] text-gold/80">Categories</h4>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c.name} className="flex cursor-pointer items-center gap-3 text-sm text-white/70 hover:text-white">
              <span className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
                selectedCats.includes(c.name) ? "border-gold bg-gold text-black" : "border-white/20"
              }`}>
                {selectedCats.includes(c.name) && <Check className="h-3 w-3" />}
              </span>
              <input type="checkbox" checked={selectedCats.includes(c.name)} onChange={() => toggleCat(c.name)} className="sr-only" />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs uppercase tracking-[0.25em] text-gold/80">Price Range</h4>
        <input
          type="range"
          min={50}
          max={350}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <div className="mt-2 flex justify-between text-xs text-white/60">
          <span>$50</span>
          <span className="font-semibold text-gold">Up to ${maxPrice}</span>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs uppercase tracking-[0.25em] text-gold/80">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3].map((r) => (
            <button key={r} className="flex items-center gap-2 text-sm text-white/60 hover:text-gold">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= r ? "fill-gold text-gold" : "text-white/20"}`} />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={clearAll} className="w-full rounded-xl border border-white/15 py-2.5 text-xs text-white/70 hover:border-gold/50 hover:text-gold">
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="pt-28">
      {/* Header */}
      <section className="mx-auto max-w-8xl px-5 pb-8 lg:px-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Collection</p>
          <h1 className="mt-3 font-display text-5xl font-semibold text-white sm:text-6xl">The Shop</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/55">
            Explore our full collection of luxury fragrances. Filter by category, price and more.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="mx-auto max-w-8xl px-5 lg:px-10">
        <div className="flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fragrances or notes…"
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 outline-none focus:border-gold/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs text-white/80 hover:border-gold/50 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white outline-none focus:border-gold/50"
            >
              <option value="featured" className="bg-ink">Featured</option>
              <option value="price-asc" className="bg-ink">Price: Low to High</option>
              <option value="price-desc" className="bg-ink">Price: High to Low</option>
              <option value="rating" className="bg-ink">Top Rated</option>
              <option value="newest" className="bg-ink">Newest</option>
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {selectedCats.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {selectedCats.map((c) => (
              <button
                key={c}
                onClick={() => toggleCat(c)}
                className="flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs text-gold"
              >
                {c} <X className="h-3 w-3" />
              </button>
            ))}
            <span className="text-xs text-white/40">{filtered.length} results</span>
          </div>
        )}
      </section>

      {/* Body */}
      <section className="mx-auto max-w-8xl px-5 py-8 lg:px-10">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-28">{FilterPanel}</div>
          </aside>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-[60] lg:hidden">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-ink-soft p-6 pt-20">
                <button onClick={() => setShowFilters(false)} className="absolute right-4 top-4 text-white/70"><X className="h-5 w-5" /></button>
                <h3 className="mb-6 font-display text-xl text-white">Filters</h3>
                {FilterPanel}
              </div>
            </div>
          )}

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <p className="font-display text-2xl text-white">No fragrances found</p>
                <p className="text-sm text-white/50">Try adjusting your filters or search.</p>
                <button onClick={clearAll} className="btn-outline">Reset filters</button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
