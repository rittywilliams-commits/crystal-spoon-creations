import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Building2, PackageCheck, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale & Distribution — Crystal Love" },
      { name: "description", content: "Become a Crystal Love stockist. Wholesale pricing, minimum order quantities and dedicated support for supermarkets and distributors." },
      { property: "og:title", content: "Wholesale — Crystal Love" },
      { property: "og:description", content: "Supply premium Crystal Exotic Parfaits in your supermarket, store or corporate cafeteria." },
    ],
  }),
  component: Wholesale,
});

function Wholesale() {
  return (
    <PageShell
      eyebrow="Wholesale"
      title="Stock Nigeria's premium parfait brand."
      intro="Partner with Crystal Love to bring fresh, chilled parfaits to your supermarket, café, hotel or corporate cafeteria."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Building2, title: "Become a stockist", body: "Any supermarket, deli or store can apply. We supply cold-chain across Lagos." },
          { icon: PackageCheck, title: "Minimum order", body: "48 units per SKU per delivery. Weekly restocks with dedicated account manager." },
          { icon: TrendingUp, title: "Wholesale pricing", body: "Tiered margins from 20%–35%, plus in-store branding and launch support." },
        ].map((v) => (
          <div key={v.title} className="rounded-3xl bg-white p-7 shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal/10 text-royal"><v.icon className="h-5 w-5" /></span>
            <h3 className="mt-5 font-display text-xl">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>

      <form className="mt-14 rounded-[2rem] bg-white p-8 shadow-lux md:p-12">
        <h2 className="font-display text-3xl">Business enquiry</h2>
        <p className="mt-2 text-sm text-muted-foreground">Fill this in and our wholesale team responds within 1 business day.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Field label="Business / company name" name="company" />
          <Field label="Contact person" name="name" />
          <Field label="Email" name="email" type="email" />
          <Field label="Phone" name="phone" />
          <Field label="City / state" name="city" />
          <Field label="Estimated monthly volume" name="volume" placeholder="e.g. 500 units" />
        </div>
        <label className="mt-5 block text-sm">
          <span className="mb-2 block font-medium">Tell us about your business</span>
          <textarea name="details" rows={4} className="w-full rounded-2xl border border-border bg-cream-deep/50 p-4 outline-none focus:border-royal" />
        </label>
        <button type="button" className="mt-6 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]">
          Submit enquiry
        </button>
      </form>
    </PageShell>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium">{label}</span>
      <input type={type} name={name} placeholder={placeholder} className="w-full rounded-2xl border border-border bg-cream-deep/50 p-3.5 outline-none focus:border-royal" />
    </label>
  );
}
