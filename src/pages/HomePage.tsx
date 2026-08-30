import { useState } from "react";
import { ArrowRight, Sparkles, Star, Quote, Truck, ShieldCheck, Gift, ChevronRight } from "lucide-react";
import { useRouter } from "@/store/RouterContext";
import { useStore } from "@/store/StoreContext";
import { PRODUCTS, CATEGORIES, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { useReveal } from "@/hooks/useReveal";

const HERO_IMG = "https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900";
const STORY_IMG = "https://images.pexels.com/photos/9202860/pexels-photo-9202860.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200";

export default function HomePage() {
  const { navigate } = useRouter();
  const { addToCart } = useStore();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const storyReveal = useReveal<HTMLDivElement>();
  const catReveal = useReveal<HTMLDivElement>();
  const featReveal = useReveal<HTMLDivElement>();
  const testReveal = useReveal<HTMLDivElement>();

  const bestsellers = PRODUCTS.filter((p) => p.badge === "Bestseller" || p.rating >= 4.8).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Luxury perfume" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-8xl flex-col justify-center px-5 lg:px-10">
          <div className="max-w-2xl">
            <div className="animate-fade-up flex items-center gap-2">
              <span className="h-px w-12 bg-gold" />
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Maison de Parfum</span>
            </div>
            <h1 className="animate-fade-up delay-100 mt-5 font-display text-5xl font-semibold leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
              Luxury Fragrances <br /> for <span className="gold-text italic">Every Moment</span>
            </h1>
            <p className="animate-fade-up delay-200 mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              Rare ingredients, master craftsmanship, and timeless artistry — discover a scent that becomes your signature.
            </p>
            <div className="animate-fade-up delay-300 mt-9 flex flex-wrap gap-4">
              <button onClick={() => navigate({ name: "shop" })} className="btn-gold">
                Shop Now <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate({ name: "shop" })} className="btn-outline">
                Explore Collection
              </button>
            </div>

            <div className="animate-fade-up delay-500 mt-12 flex items-center gap-8">
              <div>
                <p className="font-display text-2xl font-semibold text-gold">12+</p>
                <p className="text-xs text-white/50">Signature Scents</p>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <p className="font-display text-2xl font-semibold text-gold">50K+</p>
                <p className="text-xs text-white/50">Happy Clients</p>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <p className="font-display text-2xl font-semibold text-gold">4.9★</p>
                <p className="text-xs text-white/50">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-white/10 bg-ink-soft py-4">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                {["Free Shipping over $150", "Handcrafted in Grasse", "100% Authentic", "30-Day Returns", "Cruelty-Free", "Vegan Formulas"].map((t) => (
                  <span key={t} className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50">
                    <Sparkles className="h-3 w-3 text-gold" /> {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-8xl px-5 py-20 lg:px-10">
        <div ref={catReveal.ref} className={`reveal ${catReveal.visible ? "is-visible" : ""} mb-12 text-center`}>
          <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Explore</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">Shop by Category</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/55">
            From bold masculine ouds to delicate florals — find the fragrance that speaks to you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const product = PRODUCTS.find((p) => p.category === cat.name);
            return (
              <button
                key={cat.name}
                onClick={() => navigate({ name: "shop", category: cat.name })}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {product && (
                  <img src={product.images[0]} alt={cat.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-display text-2xl font-semibold text-white">{cat.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{cat.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Discover <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-8xl px-5 py-12 lg:px-10">
        <div ref={featReveal.ref} className={`reveal ${featReveal.visible ? "is-visible" : ""} mb-10 flex items-end justify-between`}>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Most Loved</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">Bestsellers</h2>
          </div>
          <button onClick={() => navigate({ name: "shop" })} className="hidden items-center gap-1.5 text-sm text-gold hover:gap-2.5 sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      {/* Story / About teaser */}
      <section className="mx-auto max-w-8xl px-5 py-20 lg:px-10">
        <div ref={storyReveal.ref} className={`reveal ${storyReveal.visible ? "is-visible" : ""} grid items-center gap-12 lg:grid-cols-2`}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img src={STORY_IMG} alt="The art of perfumery" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-gold/30 bg-ink/90 p-6 backdrop-blur-md sm:block">
              <p className="font-display text-3xl font-semibold gold-text">10 yrs</p>
              <p className="text-xs text-white/60">of olfactory artistry</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Our Story</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              The Art of <span className="gold-text italic">Scent</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              Zoyan Perfumes was founded on a single belief: that a fragrance is more than a scent — it is a memory, a mood, a moment held in time. Each composition begins in Grasse, the world capital of perfumery, where our master nose blends rare naturals with modern molecules.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              From the first harvest to the final flacon, every step is done by hand with obsessive attention to detail. The result is a collection of fragrances that feel personal, timeless and unmistakably Zoyan.
            </p>
            <button onClick={() => navigate({ name: "about" })} className="btn-outline mt-8">
              Read Our Story <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-y border-white/10 bg-ink-soft">
        <div className="mx-auto grid max-w-8xl gap-6 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {[
            { icon: Truck, title: "Free Worldwide Shipping", desc: "On all orders over $150" },
            { icon: ShieldCheck, title: "100% Authentic", desc: "Directly from the Maison" },
            { icon: Gift, title: "Luxury Gift Wrapping", desc: "Complimentary on every order" },
            { icon: Star, title: "Loved by 50,000+", desc: "A community of connoisseurs" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/5">
                <f.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{f.title}</h4>
                <p className="text-xs text-white/50">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-8xl px-5 py-20 lg:px-10">
        <div ref={testReveal.ref} className={`reveal ${testReveal.visible ? "is-visible" : ""} mb-12 text-center`}>
          <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Whispers</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">From Our Clients</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { name: "Isabella C.", role: "Verified Buyer", text: "Noir Imperial is the most complimented fragrance I've ever owned. It lasts from morning to night and the dry-down is divine." },
            { name: "Rashid A.", role: "Verified Buyer", text: "The Oud Royale is in a league of its own. Rich, deep and incredibly long-lasting. The packaging makes it a perfect gift." },
            { name: "Mei L.", role: "Verified Buyer", text: "Rose Éternelle is now my signature. Soft, romantic and elegant. Zoyan has earned a customer for life." },
          ].map((t, i) => (
            <div key={i} className="glass-gold rounded-2xl p-7 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <Quote className="h-7 w-7 text-gold/60" />
              <p className="mt-4 text-sm leading-relaxed text-white/75">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-semibold text-gold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-gold/70">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
