import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { formatNaira } from "@/lib/catalog";

export const Route = createFileRoute("/build-your-own")({
  head: () => ({
    meta: [
      { title: "Build Your Own Parfait — Crystal Love" },
      { name: "description", content: "Design your own Crystal Love parfait: pick your cup, yoghurt, granola, fruit, nuts and toppings." },
      { property: "og:title", content: "Build Your Own Parfait — Crystal Love" },
      { property: "og:description", content: "Design your own Crystal Love parfait with live pricing." },
    ],
  }),
  component: BuildYourOwn,
});

const SIZES = [
  { label: "200ml", price: 2200 },
  { label: "350ml", price: 2800 },
  { label: "500ml", price: 3600 },
];
const YOGHURTS = [
  { label: "Greek — Sweetened", price: 0 },
  { label: "Greek — Unsweetened", price: 0 },
  { label: "Bulgarian", price: 200 },
  { label: "Lush", price: -200 },
];
const GRANOLAS = [
  { label: "House granola", price: 0 },
  { label: "Honey oat", price: 150 },
  { label: "Chocolate crunch", price: 250 },
];
const FRUITS = ["Strawberry", "Blueberry", "Raspberry", "Kiwi", "Dragon fruit", "Pomegranate", "Banana"];
const CRUNCH = ["Almonds", "Cashews", "Walnuts", "Chia seeds", "Pumpkin seeds", "Coconut flakes"];
const SWEETENERS = [
  { label: "No sweetener", price: 0 },
  { label: "Honey", price: 100 },
  { label: "Maple syrup", price: 200 },
  { label: "Agave", price: 200 },
];
const EXTRAS = [
  { label: "Extra fruit layer", price: 400 },
  { label: "Extra granola", price: 300 },
  { label: "Nut butter drizzle", price: 350 },
];

function BuildYourOwn() {
  const [size, setSize] = useState(SIZES[2]);
  const [yog, setYog] = useState(YOGHURTS[0]);
  const [gran, setGran] = useState(GRANOLAS[0]);
  const [fruits, setFruits] = useState<string[]>(["Strawberry", "Blueberry"]);
  const [crunch, setCrunch] = useState<string[]>(["Almonds"]);
  const [sweet, setSweet] = useState(SWEETENERS[1]);
  const [extras, setExtras] = useState<string[]>([]);

  const total = useMemo(() => {
    const extrasTotal = EXTRAS.filter((e) => extras.includes(e.label)).reduce((s, e) => s + e.price, 0);
    return size.price + yog.price + gran.price + sweet.price + extrasTotal + fruits.length * 150 + crunch.length * 150;
  }, [size, yog, gran, sweet, fruits, crunch, extras]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <PageShell
      eyebrow="Build your own"
      title="Design your perfect parfait."
      intro="Layer by layer, choice by choice. Live pricing as you go."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr,380px]">
        <div className="space-y-10">
          <Group title="Cup size">
            {SIZES.map((s) => (
              <Chip key={s.label} active={size.label === s.label} onClick={() => setSize(s)}>
                {s.label} · {formatNaira(s.price)}
              </Chip>
            ))}
          </Group>
          <Group title="Yoghurt base">
            {YOGHURTS.map((y) => (
              <Chip key={y.label} active={yog.label === y.label} onClick={() => setYog(y)}>
                {y.label}{y.price !== 0 && ` · ${y.price > 0 ? "+" : ""}${formatNaira(y.price)}`}
              </Chip>
            ))}
          </Group>
          <Group title="Granola">
            {GRANOLAS.map((g) => (
              <Chip key={g.label} active={gran.label === g.label} onClick={() => setGran(g)}>
                {g.label}{g.price ? ` · +${formatNaira(g.price)}` : ""}
              </Chip>
            ))}
          </Group>
          <Group title="Fruits (+₦150 each)">
            {FRUITS.map((f) => (
              <Chip key={f} active={fruits.includes(f)} onClick={() => toggle(fruits, setFruits, f)}>{f}</Chip>
            ))}
          </Group>
          <Group title="Crunch, nuts & seeds (+₦150 each)">
            {CRUNCH.map((c) => (
              <Chip key={c} active={crunch.includes(c)} onClick={() => toggle(crunch, setCrunch, c)}>{c}</Chip>
            ))}
          </Group>
          <Group title="Sweetener">
            {SWEETENERS.map((s) => (
              <Chip key={s.label} active={sweet.label === s.label} onClick={() => setSweet(s)}>
                {s.label}{s.price ? ` · +${formatNaira(s.price)}` : ""}
              </Chip>
            ))}
          </Group>
          <Group title="Extra toppings">
            {EXTRAS.map((e) => (
              <Chip key={e.label} active={extras.includes(e.label)} onClick={() => toggle(extras, setExtras, e.label)}>
                {e.label} · +{formatNaira(e.price)}
              </Chip>
            ))}
          </Group>
        </div>

        <aside className="h-fit rounded-3xl bg-white p-8 shadow-lux lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-berry">Your parfait</p>
          <p className="mt-2 font-display text-2xl">{size.label} · {yog.label.split(" — ")[0]}</p>
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
            <li>Granola: {gran.label}</li>
            <li>Fruits: {fruits.length ? fruits.join(", ") : "none"}</li>
            <li>Crunch: {crunch.length ? crunch.join(", ") : "none"}</li>
            <li>Sweetener: {sweet.label}</li>
            {extras.length > 0 && <li>Extras: {extras.join(", ")}</li>}
          </ul>
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-end justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-3xl">{formatNaira(total)}</span>
            </div>
            <Link to="/cart" className="mt-6 flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]">
              Add to cart
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-xl">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active ? "border-ink bg-ink text-cream" : "border-border bg-white text-foreground/80 hover:border-ink/40"
      }`}
    >
      {children}
    </button>
  );
}
