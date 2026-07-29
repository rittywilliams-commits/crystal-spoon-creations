import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "The Crystal Love Blog — Healthy Eating in Lagos" },
      { name: "description", content: "Healthy breakfast ideas, benefits of Greek yoghurt, nutrition tips and recipes from Crystal Love." },
      { property: "og:title", content: "Crystal Love Blog" },
      { property: "og:description", content: "Wellness, recipes and stories from Nigeria's premium parfait house." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { title: "5 healthy breakfast ideas for busy Lagos mornings", tag: "Breakfast", excerpt: "Fast, wholesome and delicious — no compromises before your 9am." },
  { title: "The real benefits of Greek yoghurt", tag: "Nutrition", excerpt: "Why Greek yoghurt is a protein powerhouse, and how to get the most from it." },
  { title: "How we build our parfaits", tag: "Behind the scenes", excerpt: "A layer-by-layer look at how a Crystal Exotic is made." },
  { title: "Snacks that don't sabotage your goals", tag: "Wellness", excerpt: "Six snack swaps to keep energy high all afternoon." },
  { title: "African fruit, global palates", tag: "Flavour", excerpt: "The exotic fruits we source right here at home." },
  { title: "Cold-chain from kitchen to cup", tag: "Quality", excerpt: "How we keep every parfait perfect on the way to you." },
];

function Blog() {
  return (
    <PageShell
      eyebrow="Journal"
      title="Stories, recipes and wellness notes."
      intro="Our field notes on healthy eating, Nigerian ingredients, and life at Crystal Love."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <article key={p.title} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-transform hover:-translate-y-1">
            <div className="aspect-[16/10] bg-gradient-to-br from-royal/20 via-berry/15 to-fresh/20" />
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-berry">{p.tag}</span>
              <h3 className="mt-2 font-display text-xl">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <a href="#" className="mt-4 text-sm font-semibold text-royal">Read more →</a>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
