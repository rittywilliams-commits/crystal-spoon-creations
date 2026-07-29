import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — Crystal Love" },
      { name: "description", content: "Read what customers across Lagos and Nigeria say about Crystal Exotic and Splenda Parfaits." },
      { property: "og:title", content: "Reviews — Crystal Love" },
      { property: "og:description", content: "800+ five-star reviews from Crystal Love regulars." },
    ],
  }),
  component: Reviews,
});

const REVIEWS = [
  { name: "Adaeze O.", where: "Lekki, Lagos", stars: 5, quote: "Genuinely the freshest parfait I've had in Lagos. The granola is next level." },
  { name: "Tobi A.", where: "Ikeja", stars: 5, quote: "My morning ritual. Clean ingredients, real fruit, and it actually keeps me full." },
  { name: "Chiamaka N.", where: "Victoria Island", stars: 5, quote: "We order these for the whole office every Friday. Everyone lights up." },
  { name: "Musa I.", where: "Abuja", stars: 5, quote: "Beautifully packaged and delivered cold. It feels like a luxury treat." },
  { name: "Ifeoma K.", where: "Ajah", stars: 5, quote: "The Exotic 500ml is worth every naira. Kiwi and dragon fruit — chef's kiss." },
  { name: "Kunle B.", where: "Yaba", stars: 5, quote: "Post-gym breakfast, sorted. Splenda Unsweetened is my go-to." },
  { name: "Ngozi E.", where: "Ikoyi", stars: 5, quote: "My kids ask for these instead of ice cream. Feels like a win." },
  { name: "Emeka R.", where: "Port Harcourt", stars: 5, quote: "Ordered a bulk box for my team — everyone asked where I got them." },
];

function Reviews() {
  return (
    <PageShell
      eyebrow="Loved in Lagos"
      title="Words from our regulars."
      intro="A curated collection of Google, Instagram and direct customer reviews."
    >
      <div className="mt-6 flex items-center gap-2">
        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
        <span className="ml-1 font-semibold">4.9 / 5</span>
        <span className="text-sm text-muted-foreground">· 800+ reviews</span>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex gap-0.5">
              {[...Array(r.stars)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
            </div>
            <blockquote className="mt-4 font-display text-lg leading-snug">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 text-sm">
              <p className="font-semibold">{r.name}</p>
              <p className="text-muted-foreground">{r.where}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </PageShell>
  );
}
