import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Heart, MapPin, Gift, Users, Repeat } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { formatNaira } from "@/lib/catalog";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Crystal Love" },
      { name: "description", content: "Your Crystal Love account — orders, wishlist, rewards, addresses and subscriptions." },
      { property: "og:title", content: "My Account — Crystal Love" },
      { property: "og:description", content: "Manage your orders, wishlist and rewards." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

const TABS = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "referrals", label: "Referrals", icon: Users },
  { id: "subscriptions", label: "Subscriptions", icon: Repeat },
] as const;

function Account() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("orders");
  return (
    <PageShell eyebrow="My account" title="Welcome back." intro="Manage your orders, favourites, addresses, rewards and subscriptions.">
      <div className="grid gap-8 md:grid-cols-[240px,1fr]">
        <aside className="h-fit rounded-3xl bg-white p-3 shadow-soft">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${tab === t.id ? "bg-ink text-cream" : "text-foreground/80 hover:bg-cream-deep"}`}>
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
          <Link to="/login" className="mt-2 block px-4 py-3 text-xs text-muted-foreground hover:text-berry">Sign out</Link>
        </aside>

        <section className="rounded-3xl bg-white p-8 shadow-soft">
          {tab === "orders" && (
            <div>
              <h2 className="font-display text-2xl">Recent orders</h2>
              <ul className="mt-6 divide-y divide-border">
                {[
                  { id: "CL-8FQ2X1", date: "Jul 24, 2026", total: 11800, status: "Delivered" },
                  { id: "CL-2M9P0K", date: "Jul 12, 2026", total: 6000, status: "Delivered" },
                  { id: "CL-K3AR8Z", date: "Jun 30, 2026", total: 14700, status: "Delivered" },
                ].map((o) => (
                  <li key={o.id} className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-semibold">{o.id}</p>
                      <p className="text-xs text-muted-foreground">{o.date} · {o.status}</p>
                    </div>
                    <p className="font-display text-lg">{formatNaira(o.total)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === "wishlist" && <Empty title="Your wishlist is empty" cta="Browse parfaits" to="/shop" />}
          {tab === "addresses" && <Empty title="No saved addresses yet" cta="Add one at checkout" to="/checkout" />}
          {tab === "rewards" && (
            <div>
              <h2 className="font-display text-2xl">Loyalty rewards</h2>
              <p className="mt-3 text-sm text-muted-foreground">You have <span className="font-display text-royal">240 points</span>. Earn 1 point per ₦100 spent.</p>
              <div className="mt-6 rounded-2xl bg-cream-deep p-6">
                <p className="text-sm font-semibold">Next reward: Free 200ml parfait at 500 points.</p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full" style={{ width: "48%", background: "var(--gradient-brand)" }} />
                </div>
              </div>
            </div>
          )}
          {tab === "referrals" && (
            <div>
              <h2 className="font-display text-2xl">Refer a friend</h2>
              <p className="mt-3 text-sm text-muted-foreground">Share your code — they get 15% off, you get ₦1,500 credit.</p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-cream-deep p-4">
                <code className="flex-1 font-display text-lg">CRYSTAL-YOU15</code>
                <button className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream">Copy</button>
              </div>
            </div>
          )}
          {tab === "subscriptions" && <Empty title="No active subscriptions" cta="Explore subscriptions" to="/shop" />}
        </section>
      </div>
    </PageShell>
  );
}

function Empty({ title, cta, to }: { title: string; cta: string; to: string }) {
  return (
    <div className="py-16 text-center">
      <p className="font-display text-xl">{title}</p>
      <Link to={to} className="mt-4 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream">{cta}</Link>
    </div>
  );
}
