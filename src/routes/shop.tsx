import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Heart } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { CATALOG, formatNaira, type Product } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Parfaits & Yogurts — Crystal Love International" },
      { name: "description", content: "Order Crystal Parfait, Splenda Parfait and Greek, Bulgarian & Lush yoghurts. Handcrafted daily in Lagos." },
      { property: "og:title", content: "Shop — Crystal Love International" },
      { property: "og:description", content: "The full Crystal Love catalog: Crystal Parfait, Splenda Parfait and premium yoghurts." },
    ],
  }),
  component: ShopPage,
});

const BRANDS = ["Crystal Parfait", "Splenda Parfait", "Yogurts"] as const;

function ShopPage() {
  return (
    <PageShell
      eyebrow="Shop"
      title="The full parfait collection."
      intro="Every parfait is layered by hand, each morning, in our Lagos kitchen. Pick your line, pick your size."
    >
      {BRANDS.map((brand) => {
        const items = CATALOG.filter((p) => p.brand === brand);
        return (
          <div key={brand} className="mt-14 first:mt-6">
            <h2 className="font-display text-3xl md:text-4xl">{brand}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      })}
    </PageShell>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [sizeIdx, setSizeIdx] = useState(product.sizes.length - 1);
  const active = product.sizes[sizeIdx];
  const price = useMemo(() => formatNaira(active.price), [active]);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-transform hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
        <img src={active.img ?? product.img} alt={`${product.name} ${active.size}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-soft"
          style={{ background: `var(--${product.accent})` }}
        >
          {product.tier}
        </span>
        <button aria-label="Wishlist" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-colors hover:bg-white">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}
          <span className="ml-1 font-semibold text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <h3 className="mt-2 font-display text-xl">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.map((s, i) => (
            <button
              key={s.size}
              onClick={() => setSizeIdx(i)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                i === sizeIdx
                  ? "border-ink bg-ink text-cream"
                  : "border-border bg-white text-foreground/70 hover:border-ink/40"
              }`}
            >
              {s.size}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl">{price}</p>
            <p className="text-xs text-muted-foreground">{active.size}</p>
          </div>
          <Link to="/cart" className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-cream transition-transform hover:scale-105">
            Add to Cart
          </Link>
        </div>
      </div>
    </article>
  );
}
