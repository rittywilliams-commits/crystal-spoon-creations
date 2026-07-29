import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Crystal Love" },
      { name: "description", content: "Sign in or create a Crystal Love account to track orders, save favourites and unlock rewards." },
      { property: "og:title", content: "Sign in — Crystal Love" },
      { property: "og:description", content: "Sign in or register with Crystal Love." },
    ],
  }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <PageShell eyebrow={mode === "login" ? "Welcome back" : "Join us"} title={mode === "login" ? "Sign in to Crystal Love." : "Create your Crystal Love account."} intro="Track orders, save favourites and earn loyalty points on every parfait.">
      <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-lux">
        <div className="flex gap-2 rounded-full bg-cream-deep p-1 text-sm font-semibold">
          {(["login", "register"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`flex-1 rounded-full py-2 transition-colors ${mode === m ? "bg-ink text-cream" : "text-foreground/70"}`}>
              {m === "login" ? "Sign in" : "Register"}
            </button>
          ))}
        </div>
        <form className="mt-6 space-y-4">
          {mode === "register" && <Field label="Full name" />}
          <Field label="Email" type="email" />
          <Field label="Password" type="password" />
          {mode === "register" && <Field label="Phone" />}
          <Link to="/account" className="mt-2 flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream">
            {mode === "login" ? "Sign in" : "Create account"}
          </Link>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing you agree to our terms and privacy policy.
        </p>
      </div>
    </PageShell>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium">{label}</span>
      <input type={type} className="w-full rounded-2xl border border-border bg-cream-deep/50 p-3.5 outline-none focus:border-royal" />
    </label>
  );
}
