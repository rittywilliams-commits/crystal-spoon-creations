import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star, Leaf, Sparkles, ShieldCheck, Truck, Heart, MapPin, Plus, Minus } from "lucide-react";
import { useState } from "react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

import founderAsset from "@/assets/founder.jpg.asset.json";
import crystalExoticAsset from "@/assets/crystal-exotic-extra.jpg.asset.json";
import splendaAsset from "@/assets/splenda-parfait.jpg.asset.json";
import duoAsset from "@/assets/duo-parfaits.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crystal Love International — Freshness in Every Spoonful" },
      { name: "description", content: "Premium Greek yoghurt parfaits with fresh fruits, crunchy granola and wholesome ingredients. Order Crystal Exotic Parfaits in Lagos, Nigeria." },
      { property: "og:title", content: "Crystal Love International — Crystal Exotic Parfaits" },
      { property: "og:description", content: "Freshness in every spoonful. Premium parfaits crafted in Lagos." },
      { property: "og:image", content: founderAsset.url },
      { name: "twitter:image", content: founderAsset.url },
    ],
  }),
  component: Home,
});

const PRODUCTS = [
  {
    name: "Crystal Exotic — Extra Special",
    tag: "Signature",
    price: "₦6,500",
    size: "500ml",
    desc: "Greek yoghurt, chia, pomegranate, dragon fruit, almonds & premium granola.",
    rating: 4.9,
    reviews: 214,
    img: crystalExoticAsset.url,
    accent: "royal" as const,
  },
  {
    name: "Splenda Greek Yoghurt Parfait",
    tag: "Bestseller",
    price: "₦4,800",
    size: "500ml",
    desc: "Sweetened Greek yoghurt layered with crunchy granola & fresh banana.",
    rating: 4.8,
    reviews: 176,
    img: splendaAsset.url,
    accent: "berry" as const,
  },
  {
    name: "Splenda Exotic — Premium",
    tag: "New",
    price: "₦5,200",
    size: "350ml",
    desc: "Premium parfait with strawberry compote, cashew & house granola.",
    rating: 4.9,
    reviews: 98,
    img: duoAsset.url,
    accent: "fresh" as const,
  },
];

const REVIEWS = [
  { name: "Adaeze O.", where: "Lekki, Lagos", stars: 5, quote: "Genuinely the freshest parfait I've had in Lagos. The granola is next level." },
  { name: "Tobi A.", where: "Ikeja", stars: 5, quote: "My morning ritual. Clean ingredients, real fruit, and it actually keeps me full." },
  { name: "Chiamaka N.", where: "Victoria Island", stars: 5, quote: "We order these for the whole office every Friday. Everyone lights up." },
  { name: "Musa I.", where: "Abuja", stars: 5, quote: "Beautifully packaged and delivered cold. It feels like a luxury treat." },
];

const FAQS = [
  { q: "How long do parfaits stay fresh?", a: "Our parfaits are made fresh daily and stay best for 3–5 days when kept refrigerated at 2–4°C." },
  { q: "Do you deliver across Lagos?", a: "Yes — we deliver island-wide and mainland, with same-day delivery for orders placed before 12pm." },
  { q: "Are your ingredients healthy?", a: "Every parfait uses real Greek yoghurt, fresh fruit, and house-baked granola. No artificial colours, no fillers." },
  { q: "Can supermarkets stock Crystal Love?", a: "Absolutely. Visit our Wholesale page to apply as a stockist or corporate partner." },
];

function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <WhyCrystal />
      <FounderStory />
      <Reviews />
      <FAQ />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-cream)" }} />
      <div className="pointer-events-none absolute -top-32 -right-32 -z-10 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-brand)" }} />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-14 pb-20 md:grid-cols-2 md:items-center md:gap-16 md:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-royal shadow-soft">
            <Sparkles className="h-3.5 w-3.5" /> Nigeria&apos;s premium parfait house
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            Freshness in <br />
            <span className="text-gradient-brand italic">every spoonful.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Made with premium Greek yoghurt, fresh fruits, crunchy granola and wholesome
            ingredients that delight every bite.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]">
              Order Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#stockists" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/80 px-7 py-4 text-sm font-semibold text-ink backdrop-blur transition-colors hover:bg-white">
              <MapPin className="h-4 w-4" /> Find a Store
            </a>
            <a href="#wholesale" className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-royal underline-offset-4 hover:underline">
              Become a Distributor
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              <span className="ml-1 font-semibold text-foreground">4.9</span>
              <span>· 800+ reviews</span>
            </div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-fresh" /> Same-day Lagos delivery</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-royal/15 via-berry/10 to-fresh/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lux">
            <img
              src={founderAsset.url}
              alt="Founder of Crystal Love International holding a Crystal Exotic parfait"
              className="h-[520px] w-full object-cover md:h-[640px]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/85 p-4 backdrop-blur-lg">
              <div>
                <p className="font-display text-sm font-semibold">Handcrafted daily</p>
                <p className="text-xs text-muted-foreground">Fresh yoghurt · Real fruit · House granola</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink"><Leaf className="h-5 w-5" /></span>
            </div>
          </div>
          <div className="absolute -left-4 top-10 hidden rotate-[-8deg] rounded-2xl bg-white p-3 shadow-lux md:block">
            <img src={crystalExoticAsset.url} alt="Crystal Exotic parfait" className="h-32 w-24 rounded-xl object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Fresh Greek Yoghurt", "House-Baked Granola", "Real Fruit", "No Artificial Colours", "Delivered Cold", "Family Owned"];
  return (
    <div className="border-y border-border/70 bg-white/60 py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {items.map((i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-royal" /> {i}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedProducts() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-berry">Featured</span>
          <h2 className="mt-2 max-w-xl font-display text-4xl md:text-5xl">The parfait collection.</h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-royal">
          Shop all <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PRODUCTS.map((p) => (
          <article key={p.name} className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-transform hover:-translate-y-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
              <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-soft"
                style={{ background: `var(--${p.accent})` }}
              >
                {p.tag}
              </span>
              <button aria-label="Wishlist" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}
                <span className="ml-1 font-semibold text-foreground">{p.rating}</span>
                <span>({p.reviews})</span>
              </div>
              <h3 className="mt-2 font-display text-xl">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-2xl">{p.price}</p>
                  <p className="text-xs text-muted-foreground">{p.size}</p>
                </div>
                <button className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-cream transition-transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyCrystal() {
  const items = [
    { icon: Leaf, title: "Fresh Ingredients", body: "Real fruit and house-baked granola — never from concentrate, never processed." },
    { icon: ShieldCheck, title: "Trusted Quality", body: "Made in a certified kitchen, delivered cold-chain across Lagos and beyond." },
    { icon: Sparkles, title: "Crafted Daily", body: "Small batches, made-to-order, so every spoon tastes like the first." },
    { icon: Heart, title: "Family Loved", body: "Wholesome, low-sugar options the whole family — and every child — will love." },
  ];
  return (
    <section className="bg-cream-deep py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-fresh">Why Crystal Exotic</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Premium, honestly.</h2>
          <p className="mt-4 text-muted-foreground">
            Every jar is a small ritual — layered with intention, made with the kind of ingredients we&apos;d serve our own family.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.title} className="rounded-3xl bg-white p-7 shadow-soft transition-transform hover:-translate-y-1">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal/10 text-royal">
                <i.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderStory() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-5 md:items-center">
        <div className="md:col-span-2">
          <div className="relative overflow-hidden rounded-[2rem] shadow-lux">
            <img src={duoAsset.url} alt="Crystal Exotic and Splenda parfaits" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-royal">Our Story</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            A love letter to healthy indulgence.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Crystal Love International began in a home kitchen with a simple belief — that
            healthy food should feel like a treat, not a compromise. Today, our parfaits are
            enjoyed by busy professionals, families and children across Lagos, and stocked in
            some of Nigeria&apos;s most loved supermarkets.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {[
              { n: "10k+", l: "Parfaits served" },
              { n: "50+", l: "Stockists nationwide" },
              { n: "4.9★", l: "Customer rating" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl text-royal">{s.n}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-royal">
            Read our story <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-royal py-24 text-royal-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Loved in Lagos</span>
            <h2 className="mt-2 max-w-xl font-display text-4xl md:text-5xl">Words from our regulars.</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
            <span className="ml-1 font-semibold">4.9 / 5</span>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="rounded-3xl bg-white/[0.06] p-6 backdrop-blur">
              <div className="flex gap-0.5">
                {[...Array(r.stars)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <blockquote className="mt-4 font-display text-lg leading-snug">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm">
                <p className="font-semibold">{r.name}</p>
                <p className="text-royal-foreground/70">{r.where}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-berry">FAQ</span>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">Questions, answered.</h2>
      </div>
      <div className="mt-12 divide-y divide-border rounded-3xl bg-white shadow-soft">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 p-6 text-left"
            >
              <div>
                <p className="font-display text-lg">{f.q}</p>
                {isOpen && <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>}
              </div>
              <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream-deep text-royal">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16" style={{ background: "var(--gradient-brand)" }}>
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div className="text-white">
            <h3 className="font-display text-3xl md:text-4xl">Join the Crystal Love family.</h3>
            <p className="mt-3 max-w-md text-white/85">
              Get early access to new flavours, seasonal drops, recipes and 10% off your first order.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-full bg-white/95 px-6 py-4 text-sm text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="rounded-full bg-ink px-7 py-4 text-sm font-semibold text-cream transition-transform hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
