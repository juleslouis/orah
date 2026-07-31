import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { OrahEmblem } from "./OrahEmblem";
import menuImage from "@/assets/orah-lookbook-1.jpg";

const LINKS = [
  { to: "/collection", label: "Collection" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "Maison" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav({ overlay = false }: { overlay?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const light = overlay && !scrolled;
  const tone = light ? "text-paper" : "text-ink";
  const toneSoft = light ? "text-paper/70" : "text-ink-muted";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-paper/90 backdrop-blur-md border-b border-rule/70"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3 md:px-12">
          {/* Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`label flex items-center gap-4 ${tone} transition-colors hover:text-brass-deep`}
            aria-label="Ouvrir le menu"
          >
            <span className="flex flex-col gap-[7px]" aria-hidden>
              <span className="block h-[2px] w-7 bg-current" />
              <span className="block h-[2px] w-7 bg-current" />
              <span className="block h-[2px] w-7 bg-current" />
            </span>
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Emblem */}
          <Link
            to="/"
            className="absolute left-1/2 mt-1 flex -translate-x-1/2 flex-col items-center"
            aria-label="ORAH — accueil"
          >
            <OrahEmblem className="h-6 w-6 text-brass" />
            <span className={`mt-2 font-sans text-[13px] font-light leading-none tracking-[0.32em] ${tone} md:text-[15px]`}>
              ORAH
            </span>
            <span className={`mt-1 text-[7px] uppercase tracking-[0.35em] ${toneSoft}`}>
              Jérusalem
            </span>
          </Link>

          {/* Cart */}
          <button
            onClick={openCart}
            aria-label={`Panier, ${totalItems} pièce${totalItems > 1 ? "s" : ""}`}
            className={`flex items-center gap-2 ${tone} transition-colors hover:text-brass-deep`}
          >
            <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.1} />
            <span className="label tabular-nums text-brass-deep">
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      {/* Full overlay menu — manufacture style */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation principale"
          className="fixed inset-0 z-[90] flex"
        >
          <div className="relative z-10 flex w-full flex-col bg-paper px-6 py-5 md:w-[42%] md:px-12">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="text-ink transition-colors hover:text-brass-deep"
              >
                <X className="h-5 w-5" strokeWidth={1.1} />
              </button>
              <OrahEmblem className="h-6 w-6 text-brass" />
              <span className="label border-b border-brass pb-1 text-brass-deep">
                FR
              </span>
            </div>

            <nav className="reveal-slow mt-20 flex flex-col md:mt-28">
              <span className="font-display text-2xl italic text-ink-muted">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Accueil
                </Link>
              </span>
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="group mt-7 flex items-center justify-between border-b border-transparent pb-1 text-[22px] font-light uppercase tracking-[0.12em] text-ink transition-colors hover:text-brass-deep md:text-[26px]"
                >
                  {l.label}
                  <span className="text-brass opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    ›
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-16 text-[11px] uppercase tracking-[0.22em] text-ink-muted">
              Jérusalem · Milano · Firenze
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className="relative hidden flex-1 overflow-hidden md:block"
          >
            <img
              src={menuImage}
              alt=""
              className="h-full w-full scale-105 object-cover blur-[3px]"
            />
            <span className="absolute inset-0 bg-navy/45" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
