import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Instagram, Facebook, Clock } from "lucide-react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Crystal Love" },
      { name: "description", content: "Get in touch with Crystal Love International — WhatsApp, phone, email and social channels." },
      { property: "og:title", content: "Contact — Crystal Love" },
      { property: "og:description", content: "Talk to our team by WhatsApp, phone or email." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="We'd love to hear from you."
      intro="Reach out for orders, wholesale, feedback or just to say hi."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <Row icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="+234 800 000 0000" />
          <Row icon={<Phone className="h-5 w-5" />} label="Phone" value="+234 800 000 0000" />
          <Row icon={<Mail className="h-5 w-5" />} label="Email" value="hello@crystallove.ng" />
          <Row icon={<Instagram className="h-5 w-5" />} label="Instagram" value="@crystallove.ng" />
          <Row icon={<Facebook className="h-5 w-5" />} label="Facebook" value="Crystal Love International" />
          <Row icon={<Clock className="h-5 w-5" />} label="Business hours" value="Mon–Sat · 8am – 8pm WAT" />
          <div className="mt-6 rounded-3xl bg-white p-4 shadow-soft">
            <p className="mb-2 text-sm font-semibold">Find us</p>
            <iframe
              title="Crystal Love Lagos map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.35%2C6.42%2C3.55%2C6.55&layer=mapnik"
              className="h-64 w-full rounded-2xl"
            />
          </div>
          <p className="pt-4 text-sm text-muted-foreground">
            Have a question? Try our <Link to="/faq" className="font-semibold text-royal">FAQ</Link> first.
          </p>
        </div>

        <form className="rounded-[2rem] bg-white p-8 shadow-lux">
          <h2 className="font-display text-2xl">Send us a message</h2>
          <div className="mt-6 space-y-4">
            <Field label="Your name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Subject" name="subject" />
            <label className="block text-sm">
              <span className="mb-2 block font-medium">Message</span>
              <textarea name="message" rows={5} className="w-full rounded-2xl border border-border bg-cream-deep/50 p-4 outline-none focus:border-royal" />
            </label>
            <button type="button" className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]">
              Send message
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-royal/10 text-royal">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium">{label}</span>
      <input type={type} name={name} className="w-full rounded-2xl border border-border bg-cream-deep/50 p-3.5 outline-none focus:border-royal" />
    </label>
  );
}
