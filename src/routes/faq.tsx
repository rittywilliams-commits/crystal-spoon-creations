import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Crystal Love" },
      { name: "description", content: "Frequently asked questions about Crystal Love parfaits, delivery, freshness and wholesale." },
      { property: "og:title", content: "FAQ — Crystal Love" },
      { property: "og:description", content: "Everything you need to know about ordering Crystal Love parfaits." },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  { q: "How long do parfaits stay fresh?", a: "Our parfaits are made fresh daily and stay best for 3–5 days when kept refrigerated at 2–4°C." },
  { q: "Do you deliver across Lagos?", a: "Yes — we deliver island-wide and mainland, with same-day delivery for orders placed before 12pm." },
  { q: "Are your ingredients healthy?", a: "Every parfait uses real Greek yoghurt, fresh fruit, and house-baked granola. No artificial colours, no fillers." },
  { q: "Can supermarkets stock Crystal Love?", a: "Absolutely. Visit our Wholesale page to apply as a stockist or corporate partner." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageShell eyebrow="FAQ" title="Questions, answered." intro="Everything you need to know about ordering, freshness and wholesale.">
      <div className="mx-auto max-w-3xl divide-y divide-border rounded-3xl bg-white shadow-soft">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <button key={f.q} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-start justify-between gap-6 p-6 text-left">
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
    </PageShell>
  );
}
