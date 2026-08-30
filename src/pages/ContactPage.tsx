import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, Check, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 py-12 text-center lg:px-10">
        <p className="text-xs uppercase tracking-[0.4em] text-gold/80">Get in Touch</p>
        <h1 className="mt-3 font-display text-5xl font-semibold text-white sm:text-6xl">Contact <span className="gold-text italic">Us</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/55">
          Questions about a fragrance, an order or a custom request? Our team is here to help.
        </p>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-8xl px-5 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Mail, label: "Email", value: "care@zoyanperfumes.com", href: "mailto:care@zoyanperfumes.com" },
            { icon: Phone, label: "Phone", value: "+92 313 2307950", href: "tel:+923132307950" },
            { icon: MapPin, label: "Atelier", value: "12 Rue de la Parfumerie, Paris" },
            { icon: Clock, label: "Hours", value: "Mon–Sat · 9am–7pm CET" },
          ].map((c, i) => (
            <a
              key={c.label}
              href={c.href ?? "#"}
              onClick={(e) => !c.href && e.preventDefault()}
              className="glass-gold group rounded-2xl p-6 text-center animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 transition-all group-hover:scale-110">
                <c.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-gold/70">{c.label}</p>
              <p className="mt-1 text-sm text-white/75">{c.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="mx-auto max-w-8xl px-5 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-3xl border border-white/10 bg-ink-card p-8">
            <h2 className="font-display text-3xl font-semibold text-white">Send a Message</h2>
            <p className="mt-2 text-sm text-white/55">We typically reply within 24 hours.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-lux" />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="input-lux" />
              </div>
              <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="input-lux" />
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message…" className="input-lux resize-none" />
              <button type="submit" className="btn-gold w-full">
                {sent ? <><Check className="h-4 w-4" /> Message Sent</> : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </div>

          {/* Map + WhatsApp */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <iframe
                title="Zoyan Atelier location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.3322%2C48.8615%2C2.3522%2C48.8715&layer=mapnik&marker=48.8665%2C2.3422"
                className="h-80 w-full grayscale-[0.4] contrast-110"
                loading="lazy"
              />
            </div>
            <a
              href="https://wa.me/923132307950"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-3xl border border-green-500/30 bg-green-500/10 p-6 transition-all hover:border-green-500/60"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                  <MessageCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-white">Chat on WhatsApp</p>
                  <p className="text-xs text-white/55">Fastest way to reach us — 9am to 9pm</p>
                </div>
              </div>
              <Send className="h-5 w-5 text-green-400" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
