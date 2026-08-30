import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, Heart, X, Sparkles } from "lucide-react";
import { useRouter } from "@/store/RouterContext";
import { useStore } from "@/store/StoreContext";
import { CATEGORIES } from "@/data/products";

export default function Navbar() {
  const { route, navigate } = useRouter();
  const { cartCount, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [route]);

  const go = (r: Parameters<typeof navigate>[0]) => navigate(r);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    go({ name: "shop" });
  };

  const isActive = (name: string) => route.name === name;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-black/30" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-8xl items-center justify-between px-5 py-4 lg:px-10">
          {/* Logo */}
          <button onClick={() => go({ name: "home" })} className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/5 transition-all duration-500 group-hover:rotate-[18deg]">
              <Sparkles className="h-5 w-5 text-gold" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-wide text-white">
                ZOYAN
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Perfumes</span>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-9 lg:flex">
            {[
              { label: "Home", route: { name: "home" } as const },
              { label: "Shop", route: { name: "shop" } as const },
              { label: "About", route: { name: "about" } as const },
              { label: "Contact", route: { name: "contact" } as const },
            ].map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => go(item.route)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive(item.route.name) ? "text-gold" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive(item.route.name) ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-all hover:bg-white/10 hover:text-gold"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => go({ name: "shop" })}
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-all hover:bg-white/10 hover:text-gold"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-black">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => go({ name: "checkout" })}
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-all hover:bg-white/10 hover:text-gold"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-all hover:bg-white/10 hover:text-gold lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="animate-fade-in border-t border-white/10 bg-ink/95 backdrop-blur-xl">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4 lg:px-10">
              <Search className="h-5 w-5 text-gold/70" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, notes, categories…"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
              <button type="submit" className="btn-gold !px-5 !py-2 text-xs">
                Search
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-ink-soft p-6 pt-24 transition-transform duration-500 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="space-y-1">
            {[
              { label: "Home", route: { name: "home" } as const },
              { label: "Shop", route: { name: "shop" } as const },
              { label: "About", route: { name: "about" } as const },
              { label: "Contact", route: { name: "contact" } as const },
            ].map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => go(item.route)}
                  className={`w-full rounded-xl px-4 py-3 text-left font-display text-lg transition-colors ${
                    isActive(item.route.name) ? "bg-gold/10 text-gold" : "text-white/85 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/70">Categories</p>
            <ul className="space-y-1">
              {CATEGORIES.map((c) => (
                <li key={c.name}>
                  <button
                    onClick={() => go({ name: "shop", category: c.name })}
                    className="w-full rounded-lg px-4 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
