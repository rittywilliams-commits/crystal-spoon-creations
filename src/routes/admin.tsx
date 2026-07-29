import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, ShoppingBag, Users, Tag, BarChart3, MapPin, Building2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { CATALOG, formatNaira } from "@/lib/catalog";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Crystal Love" },
      { name: "description", content: "Crystal Love admin dashboard." },
      { property: "og:title", content: "Admin — Crystal Love" },
      { property: "og:description", content: "Crystal Love admin dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const NAV = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "coupons", label: "Coupons", icon: Tag },
  { id: "stores", label: "Store locations", icon: MapPin },
  { id: "wholesale", label: "Wholesale enquiries", icon: Building2 },
] as const;

function Admin() {
  const [tab, setTab] = useState<(typeof NAV)[number]["id"]>("overview");
  return (
    <PageShell eyebrow="Admin" title="Dashboard." intro="Manage products, orders, customers and more.">
      <div className="grid gap-8 md:grid-cols-[260px,1fr]">
        <aside className="h-fit rounded-3xl bg-white p-3 shadow-soft">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${tab === n.id ? "bg-ink text-cream" : "text-foreground/80 hover:bg-cream-deep"}`}>
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </aside>

        <section className="rounded-3xl bg-white p-8 shadow-soft">
          {tab === "overview" && (
            <div>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { l: "Revenue (30d)", v: formatNaira(1_842_500) },
                  { l: "Orders (30d)", v: "312" },
                  { l: "New customers", v: "84" },
                  { l: "Avg. order", v: formatNaira(5_900) },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-cream-deep p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
                    <p className="mt-1 font-display text-2xl">{s.v}</p>
                  </div>
                ))}
              </div>
              <h3 className="mt-10 font-display text-xl">Top products</h3>
              <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
                {CATALOG.slice(0, 5).map((p) => (
                  <li key={p.id} className="flex items-center justify-between p-4">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-sm text-muted-foreground">{p.reviews} sold</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === "orders" && <Table cols={["Order", "Customer", "Total", "Status"]} rows={[
            ["CL-8FQ2X1", "Adaeze O.", formatNaira(11800), "Delivered"],
            ["CL-K3AR8Z", "Tobi A.", formatNaira(6000), "Preparing"],
            ["CL-2M9P0K", "Musa I.", formatNaira(14700), "Out for delivery"],
          ]} />}
          {tab === "products" && <Table cols={["Product", "Brand", "From", "Stock"]} rows={CATALOG.map((p) => [p.name, p.brand, formatNaira(p.sizes[0].price), "100"])} />}
          {tab === "customers" && <Table cols={["Name", "Email", "Orders", "Total spent"]} rows={[
            ["Adaeze O.", "adaeze@example.com", "6", formatNaira(41200)],
            ["Tobi A.", "tobi@example.com", "3", formatNaira(18000)],
            ["Chiamaka N.", "chiamaka@example.com", "12", formatNaira(72400)],
          ]} />}
          {tab === "coupons" && <Table cols={["Code", "Discount", "Status"]} rows={[["HAVEN10", "10%", "Active"], ["WELCOME15", "15%", "Active"]]} />}
          {tab === "stores" && <Table cols={["Store", "City", "Area"]} rows={[["SPAR — Lekki", "Lagos", "Lekki Phase 1"], ["Blenco", "Lagos", "Sangotedo"], ["Prince Ebeano", "Abuja", "Guzape"]]} />}
          {tab === "wholesale" && <Table cols={["Company", "Contact", "City", "Volume"]} rows={[["Fresh Foods Ltd", "hello@freshfoods.ng", "Lagos", "800/mo"], ["OfficeSnack Co", "ops@officesnack.co", "Abuja", "300/mo"]]} />}
        </section>
      </div>
    </PageShell>
  );
}

function Table({ cols, rows }: { cols: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-cream-deep text-left">
          <tr>
            {cols.map((c) => <th key={c} className="p-4 font-semibold">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((cell, j) => <td key={j} className="p-4">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
