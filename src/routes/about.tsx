import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import founderAsset from "@/assets/founder.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Crystal Love International" },
      { name: "description", content: "The story of Crystal Love International — Nigeria's premium home of Crystal Exotic and Splenda Parfaits, handcrafted with fresh Greek yoghurt and real fruit." },
      { property: "og:title", content: "About — Crystal Love International" },
      { property: "og:description", content: "A love letter to healthy indulgence, from a Lagos home kitchen to Nigeria's most premium supermarkets." },
      { property: "og:image", content: founderAsset.url },
      { name: "twitter:image", content: founderAsset.url },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      eyebrow="Our story"
      title="A love letter to healthy indulgence."
      intro="Crystal Love International began in a home kitchen with a simple belief — that healthy food should feel like a treat, not a compromise."
    >
      <div className="grid gap-12 md:grid-cols-5 md:items-start">
        <div className="md:col-span-2">
          <div className="relative overflow-hidden rounded-[2rem] shadow-lux">
            <img src={founderAsset.url} alt="Founder of Crystal Love International" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-3 space-y-6 text-muted-foreground">
          <p>Today, our parfaits are enjoyed by busy professionals, families and children across Lagos, and stocked in some of Nigeria's most loved supermarkets.</p>
          <p>Every jar is layered by hand with fresh Greek yoghurt, house-baked granola, and fruit selected each morning. Never from concentrate, never processed.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card title="Our mission">
              To make wholesome, delicious food a daily ritual — not an occasional treat.
            </Card>
            <Card title="Our vision">
              To be West Africa's most loved premium yoghurt and parfait brand.
            </Card>
            <Card title="Fresh ingredients">
              Real fruit, real yoghurt, real granola. Cold-chain from kitchen to cup.
            </Card>
            <Card title="Innovation">
              New flavours every season — inspired by African fruit and global palates.
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <p className="mt-2 text-sm">{children}</p>
    </div>
  );
}
