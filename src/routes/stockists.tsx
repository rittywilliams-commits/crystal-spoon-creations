import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/stockists")({
  head: () => ({
    meta: [
      { title: "Where to Buy — Crystal Love Stockists" },
      { name: "description", content: "Find Crystal Exotic Parfaits in supermarkets across Lagos and Nigeria — SPAR, Blenco, Jendol, Ebeano and more." },
      { property: "og:title", content: "Stockists — Crystal Love" },
      { property: "og:description", content: "Locate your nearest Crystal Love stockist across Nigeria." },
    ],
  }),
  component: Stockists,
});

const STORES = [
  { name: "Blenco Supermarket", city: "Lagos", area: "Sangotedo" },
  { name: "SPAR — Lekki", city: "Lagos", area: "Lekki Phase 1" },
  { name: "SPAR — Ibadan", city: "Ibadan", area: "Bodija" },
  { name: "Jendol Superstores", city: "Lagos", area: "Egbeda" },
  { name: "UBA Supermarket", city: "Lagos", area: "Surulere" },
  { name: "TQV Supermarket", city: "Lagos", area: "Ikeja" },
  { name: "Super Saver", city: "Lagos", area: "Yaba" },
  { name: "Compra Mart", city: "Lagos", area: "Lekki" },
  { name: "Alvira Mart", city: "Lagos", area: "Ajah" },
  { name: "Berny Supermarket", city: "Lagos", area: "Ikoyi" },
  { name: "Renee Supermarket", city: "Lagos", area: "Victoria Island" },
  { name: "Ebeano Supermarket", city: "Lagos", area: "Lekki Phase 1" },
  { name: "Justrite Superstore", city: "Lagos", area: "Ajah" },
  { name: "Prince Ebeano Supermarket", city: "Abuja", area: "Guzape" },
  { name: "Grand Square Supermarket", city: "Abuja", area: "Jabi" },
  { name: "Next Cash & Carry", city: "Port Harcourt", area: "GRA" },
];

function Stockists() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState<string>("All");
  const cities = ["All", ...Array.from(new Set(STORES.map((s) => s.city)))];
  const filtered = STORES.filter((s) => {
    const matchesQ = !q || (s.name + s.area + s.city).toLowerCase().includes(q.toLowerCase());
    const matchesCity = city === "All" || s.city === city;
    return matchesQ && matchesCity;
  });

  return (
    <PageShell
      eyebrow="Where to buy"
      title="Find Crystal Love near you."
      intro="Crystal Exotic Parfaits are stocked in premium supermarkets across Lagos, Abuja, Ibadan and Port Harcourt."
    >
      <div className="grid gap-8 md:grid-cols-[380px,1fr]">
        <div>
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search store or area"
              className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-royal"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  city === c ? "border-ink bg-ink text-cream" : "border-border bg-white text-foreground/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <ul className="mt-6 divide-y divide-border rounded-3xl bg-white shadow-soft">
            {filtered.map((s) => (
              <li key={s.name + s.area} className="flex items-start gap-3 p-4">
                <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-royal/10 text-royal">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.area}, {s.city}</p>
                </div>
              </li>
            ))}
            {filtered.length === 0 && <li className="p-6 text-sm text-muted-foreground">No stores match your search.</li>}
          </ul>
        </div>
        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] shadow-lux">
          <iframe
            title="Lagos map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=3.15%2C6.35%2C3.75%2C6.7&layer=mapnik"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </PageShell>
  );
}
