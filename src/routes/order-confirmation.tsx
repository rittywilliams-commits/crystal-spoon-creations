import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Crystal Love" },
      { name: "description", content: "Your Crystal Love order is confirmed. Thank you." },
      { property: "og:title", content: "Order Confirmed — Crystal Love" },
      { property: "og:description", content: "Your Crystal Love order is confirmed." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const orderNumber = "CL-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return (
    <PageShell eyebrow="Confirmed" title="Thank you — your parfaits are on the way." intro="We've sent you an email with the receipt and tracking link.">
      <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-10 text-center shadow-lux">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-fresh/15 text-fresh">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Order number</p>
        <p className="mt-1 font-display text-3xl">{orderNumber}</p>
        <p className="mt-6 text-sm text-muted-foreground">Estimated delivery: 30–90 minutes across Lagos.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/account" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream">View order</Link>
          <Link to="/shop" className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold">Continue shopping</Link>
        </div>
      </div>
    </PageShell>
  );
}
