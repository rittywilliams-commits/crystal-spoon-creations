import { Instagram, Facebook, MessageCircle, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink font-display text-lg font-bold">C</span>
              <span className="font-display text-xl">Crystal Love</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/70">
              Home of Crystal Exotic Parfaits. Freshness in every spoonful, handcrafted in Lagos.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Shop", links: ["All Parfaits", "Build Your Own", "Gift Orders", "Subscriptions"] },
            { title: "Company", links: ["About Us", "Wholesale", "Stockists", "Blog"] },
            { title: "Support", links: ["Contact", "Order Tracking", "FAQs", "Reviews"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm uppercase tracking-widest text-gold">{col.title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-cream/80">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-gold">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Crystal Love International. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +234 800 000 0000</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> hello@crystallove.ng</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
