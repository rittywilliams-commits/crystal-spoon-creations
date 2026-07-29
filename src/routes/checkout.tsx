import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Wallet, Landmark, Truck, Apple } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { formatNaira } from "@/lib/catalog";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Crystal Love" },
      { name: "description", content: "Secure checkout for Crystal Love parfaits — Paystack, Flutterwave, Stripe, bank transfer and cash on delivery." },
      { property: "og:title", content: "Checkout — Crystal Love" },
      { property: "og:description", content: "Fast, secure checkout." },
    ],
  }),
  component: Checkout,
});

const PAYMENTS = [
  { id: "paystack", label: "Paystack", icon: CreditCard },
  { id: "flutterwave", label: "Flutterwave", icon: CreditCard },
  { id: "stripe", label: "Stripe", icon: CreditCard },
  { id: "bank", label: "Bank transfer", icon: Landmark },
  { id: "cod", label: "Cash on delivery", icon: Wallet },
  { id: "apple", label: "Apple Pay", icon: Apple },
] as const;

function Checkout() {
  const [method, setMethod] = useState<"home_delivery" | "pickup">("home_delivery");
  const [pay, setPay] = useState<(typeof PAYMENTS)[number]["id"]>("paystack");
  const subtotal = 11800;
  const delivery = method === "pickup" ? 0 : 1500;
  const total = subtotal + delivery;

  return (
    <PageShell eyebrow="Checkout" title="Almost there." intro="Delivery, payment, done.">
      <div className="grid gap-10 lg:grid-cols-[1fr,380px]">
        <form className="space-y-8">
          <Section title="Contact">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" />
              <Field label="Phone" />
              <Field label="Email" type="email" />
            </div>
          </Section>

          <Section title="Fulfilment">
            <div className="grid gap-3 sm:grid-cols-2">
              <Radio active={method === "home_delivery"} onClick={() => setMethod("home_delivery")} icon={<Truck className="h-4 w-4" />} label="Home delivery" hint="Same-day across Lagos" />
              <Radio active={method === "pickup"} onClick={() => setMethod("pickup")} icon={<Landmark className="h-4 w-4" />} label="Pickup" hint="From our Lagos kitchen" />
            </div>
            {method === "home_delivery" && (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Delivery address" />
                <Field label="City / area" />
              </div>
            )}
          </Section>

          <Section title="Payment">
            <div className="grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <Radio key={p.id} active={pay === p.id} onClick={() => setPay(p.id)} icon={<p.icon className="h-4 w-4" />} label={p.label} />
              ))}
            </div>
          </Section>

          <Link to="/order-confirmation" className="inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]">
            Place order · {formatNaira(total)}
          </Link>
        </form>

        <aside className="h-fit rounded-3xl bg-white p-8 shadow-lux lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-berry">Order summary</p>
          <div className="mt-4 space-y-2 text-sm">
            <Line label="Subtotal" value={formatNaira(subtotal)} />
            <Line label="Delivery" value={delivery === 0 ? "Free" : formatNaira(delivery)} />
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-3xl">{formatNaira(total)}</span>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-soft">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium">{label}</span>
      <input type={type} className="w-full rounded-2xl border border-border bg-cream-deep/50 p-3.5 outline-none focus:border-royal" />
    </label>
  );
}

function Radio({ active, onClick, icon, label, hint }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; hint?: string }) {
  return (
    <button type="button" onClick={onClick} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${active ? "border-ink bg-cream-deep" : "border-border bg-white hover:border-ink/30"}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-full ${active ? "bg-ink text-cream" : "bg-cream-deep text-royal"}`}>{icon}</span>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </button>
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
