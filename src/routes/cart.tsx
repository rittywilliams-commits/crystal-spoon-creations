import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { CATALOG, formatNaira } from "@/lib/catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Crystal Love" },
      { name: "description", content: "Review your Crystal Love parfaits before checkout." },
      { property: "og:title", content: "Your Cart — Crystal Love" },
      { property: "og:description", content: "Review your Crystal Love parfaits before checkout." },
    ],
  }),
  component: Cart,
});

type CartRow = { id: string; qty: number };

function Cart() {
  const [rows, setRows] = useState<CartRow[]>([
    { id: "crystal-exotic", qty: 1 },
    { id: "splenda-sweetened", qty: 2 },
  ]);

  const items = rows.map((r) => {
    const p = CATALOG.find((c) => c.id === r.id)!;
    const size = p.sizes[p.sizes.length - 1];
    return { row: r, product: p, size };
  });
  const subtotal = items.reduce((s, i) => s + i.size.price * i.row.qty, 0);
  const delivery = subtotal > 15000 ? 0 : 1500;
  const total = subtotal + delivery;

  const update = (id: string, delta: number) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, qty: Math.max(1, r.qty + delta) } : r)));
  const remove = (id: string) => setRows((rs) => rs.filter((r) => r.id !== id));

  return (
    <PageShell eyebrow="Cart" title="Your basket." intro="Review and checkout in seconds.">
      {items.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
          <p className="font-display text-2xl">Your cart is empty.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          <ul className="space-y-4">
            {items.map(({ row, product, size }) => (
              <li key={row.id} className="flex gap-4 rounded-3xl bg-white p-4 shadow-soft">
                <img src={product.img} alt={product.name} className="h-28 w-28 shrink-0 rounded-2xl object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.tier} · {size.size}</p>
                    </div>
                    <button onClick={() => remove(row.id)} aria-label="Remove" className="text-muted-foreground hover:text-berry">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-border p-1">
                      <button onClick={() => update(row.id, -1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-cream-deep"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm font-semibold">{row.qty}</span>
                      <button onClick={() => update(row.id, 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-cream-deep"><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="font-display text-lg">{formatNaira(size.price * row.qty)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl bg-white p-8 shadow-lux lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-berry">Summary</p>
            <div className="mt-4 space-y-2 text-sm">
              <Line label="Subtotal" value={formatNaira(subtotal)} />
              <Line label="Delivery" value={delivery === 0 ? "Free" : formatNaira(delivery)} />
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-3xl">{formatNaira(total)}</span>
            </div>
            <Link to="/checkout" className="mt-6 flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]">
              Checkout
            </Link>
            <Link to="/shop" className="mt-3 flex w-full items-center justify-center text-sm font-semibold text-royal">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </PageShell>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
