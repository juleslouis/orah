import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";

const LINKS = [
  { to: "/collection", label: "Collection" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "Maison" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-rule/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
        <nav className="hidden flex-1 items-center gap-10 md:flex">
          {LINKS.slice(0, 2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-underline label text-ink-soft hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="flex flex-col items-center">
          <span className="font-display text-[28px] leading-none tracking-[0.18em] text-ink md:text-[32px]">
            ORAH
          </span>
          <span className="mt-1 h-px w-8 rule-gold" aria-hidden />
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-10 md:flex">
          {LINKS.slice(2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-underline label text-ink-soft hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={openCart}
            aria-label={`Panier, ${totalItems} pièce${totalItems > 1 ? "s" : ""}`}
            className="link-underline label text-ink-soft hover:text-ink transition"
          >
            Panier{" "}
            <span className="ml-1 tabular-nums text-brass-deep">
              ({totalItems})
            </span>
          </button>
        </nav>

        <button
          onClick={openCart}
          className="label md:hidden text-ink"
          aria-label="Ouvrir le panier"
        >
          Panier ({totalItems})
        </button>
      </div>
    </header>
  );
}
