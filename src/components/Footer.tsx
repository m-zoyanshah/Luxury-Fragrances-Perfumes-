import { useState } from "react";
import { Sparkles, Instagram, Facebook, Twitter, Youtube, Send, ArrowUp } from "lucide-react";
import { useRouter } from "@/store/RouterContext";
import { CATEGORIES } from "@/data/products";

export default function Footer() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-soft">
      <div className="mx-auto max-w-8xl px-5 lg:px-10">
        {/* Newsletter */}
        <div className="reveal -mt-px border-b border-white/10 py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Join the <span className="gold-text">Maison</span>
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/60">
                Subscribe for early access to new launches, private sales and the art of fragrance — delivered with care.
              </p>
            </div>
            <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-lux flex-1"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                {subscribed ? "Subscribed!" : "Subscribe"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <button onClick={() => navigate({ name: "home" })} className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
                <Sparkles className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">ZOYAN</span>
                <span className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Perfumes</span>
              </div>
            </button>
            <p className="text-sm leading-relaxed text-white/55">
              Luxury fragrances for every moment. Crafted with rare ingredients and uncompromising artistry since 2014.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold/80">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.name}>
                  <button
                    onClick={() => navigate({ name: "shop", category: c.name })}
                    className="text-white/60 transition-colors hover:text-gold"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold/80">Maison</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => navigate({ name: "about" })} className="text-white/60 transition-colors hover:text-gold">About Us</button></li>
              <li><button onClick={() => navigate({ name: "contact" })} className="text-white/60 transition-colors hover:text-gold">Contact</button></li>
              <li><button onClick={() => navigate({ name: "shop" })} className="text-white/60 transition-colors hover:text-gold">All Products</button></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/60 transition-colors hover:text-gold">Shipping & Returns</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-white/60 transition-colors hover:text-gold">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold/80">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>12 Rue de la Parfumerie</li>
              <li>75001 Paris, France</li>
              <li className="pt-2">
                <a href="tel:+923132307950" className="transition-colors hover:text-gold">+92 313 2307950</a>
              </li>
              <li>
                <a href="mailto:care@zoyanperfumes.com" className="transition-colors hover:text-gold">care@zoyanperfumes.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Zoyan Perfumes. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>Visa</span><span>Mastercard</span><span>Amex</span><span>PayPal</span><span>Stripe</span>
          </div>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-gold/50 hover:text-gold"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
