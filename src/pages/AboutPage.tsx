import { Sparkles, Target, Eye, Award, Leaf, Globe } from "lucide-react";
import { useRouter } from "@/store/RouterContext";
import { useReveal } from "@/hooks/useReveal";

const IMG1 = "https://images.pexels.com/photos/9202860/pexels-photo-9202860.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200";
const IMG2 = "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200";
const IMG3 = "https://images.pexels.com/photos/3774939/pexels-photo-3774939.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200";

export default function AboutPage() {
  const { navigate } = useRouter();
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const r3 = useReveal<HTMLDivElement>();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG1} alt="The art of perfumery" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-5 text-center">
          <div className="animate-fade-up flex items-center gap-2">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Est. 2014 · Grasse, France</span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h1 className="animate-fade-up delay-100 mt-5 font-display text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
            The House of <span className="gold-text italic">Zoyan</span>
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            A maison built on the belief that fragrance is the most intimate form of luxury — invisible, unforgettable and deeply personal.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-8xl px-5 py-20 lg:px-10">
        <div ref={r1.ref} className={`reveal ${r1.visible ? "is-visible" : ""} grid items-center gap-12 lg:grid-cols-2`}>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img src={IMG2} alt="Our collection" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Our Story</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">A Decade of Olfactory Artistry</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/65">
              <p>Zoyan Perfumes was founded in 2014 by a small collective of perfumers, artisans and dreamers who shared one obsession: the pursuit of the perfect scent. Our atelier sits in Grasse, the sun-drenched capital of perfumery on the French Riviera, where jasmine and rose have been cultivated for centuries.</p>
              <p>We began with a single fragrance — Noir Imperial — composed over two years in a tiny studio above a flower market. Today, our collection spans men's, women's, unisex, Arabic, attar and gift sets, but our philosophy has never changed: rare ingredients, patient craftsmanship and an uncompromising standard of beauty.</p>
              <p>Every Zoyan fragrance is composed by hand, aged slowly, and bottled in flacons we design ourselves. We believe luxury should feel personal — not mass-produced. That is why we produce in small batches and never compromise on quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="border-y border-white/10 bg-ink-soft">
        <div className="mx-auto max-w-8xl px-5 py-20 lg:px-10">
          <div ref={r2.ref} className={`reveal ${r2.visible ? "is-visible" : ""} grid gap-8 md:grid-cols-2`}>
            <div className="rounded-3xl border border-white/10 bg-ink-card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/5">
                <Target className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold text-white">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                To craft fragrances that become part of people's lives — scents that mark moments, memories and milestones. We exist to make true luxury accessible without diluting the artistry, ethics or soul behind it.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-ink-card p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/5">
                <Eye className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold text-white">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                To be the most beloved independent fragrance house in the world — recognized not only for the beauty of our scents, but for our integrity, sustainability and devotion to the craft of perfumery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-8xl px-5 py-20 lg:px-10">
        <div ref={r3.ref} className={`reveal ${r3.visible ? "is-visible" : ""} mb-12 text-center`}>
          <p className="text-xs uppercase tracking-[0.4em] text-gold/80">What We Stand For</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">Our Values</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: "Master Craftsmanship", desc: "Every fragrance is composed by a master nose and aged by hand." },
            { icon: Leaf, title: "Sustainable Sourcing", desc: "We partner directly with growers who farm ethically and responsibly." },
            { icon: Globe, title: "Cruelty-Free & Vegan", desc: "Never tested on animals. Always free of animal-derived ingredients." },
            { icon: Sparkles, title: "Rare Ingredients", desc: "We seek out the finest naturals and most refined molecules." },
          ].map((v, i) => (
            <div key={v.title} className="glass-gold rounded-2xl p-7 animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/5">
                <v.icon className="h-5 w-5 text-gold" />
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold text-white">{v.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-8xl px-5 pb-10 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <img src={IMG3} alt="Discover" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
          <div className="relative z-10 flex flex-col items-start gap-5 p-10 sm:p-16">
            <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">Discover Your Signature</h2>
            <p className="max-w-md text-sm text-white/70">Explore our collection and find the fragrance that becomes unmistakably yours.</p>
            <button onClick={() => navigate({ name: "shop" })} className="btn-gold">Shop the Collection</button>
          </div>
        </div>
      </section>
    </div>
  );
}
