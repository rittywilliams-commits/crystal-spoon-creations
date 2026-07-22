import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "Shop", to: "/" },
  { label: "Build Your Own", to: "/" },
  { label: "Wholesale", to: "/" },
  { label: "Stockists", to: "/" },
  { label: "About", to: "/" },
  { label: "Reviews", to: "/" },
  { label: "Blog", to: "/" },
  { label: "Contact", to: "/" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="glass-card mx-3 mt-3 rounded-2xl px-4 py-3 md:mx-6 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-royal text-royal-foreground font-display text-lg font-bold">C</span>
            <span className="hidden font-display text-lg font-semibold tracking-tight sm:block">
              Crystal <span className="text-royal">Love</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} className="transition-colors hover:text-royal">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Account" className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-cream-deep">
              <User className="h-5 w-5" />
            </button>
            <button aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition-transform hover:scale-105">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-berry text-[10px] font-bold text-berry-foreground">2</span>
            </button>
            <button
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-4 flex flex-col gap-3 border-t border-border/60 pt-4 lg:hidden">
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} className="text-sm font-medium" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
