import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/orah/SiteNav";
import { SiteFooter } from "@/components/orah/SiteFooter";
import { Reveal } from "@/components/orah/Reveal";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection — ORAH" },
      {
        name: "description",
        content:
          "Découvrez la collection ORAH : hanoukkia, mezouza, argenterie rituelle. Pièces d'orfèvrerie signées et numérotées.",
      },
      { property: "og:title", content: "Collection — ORAH" },
      {
        property: "og:description",
        content: "Pièces d'orfèvrerie rituelle signées et numérotées.",
      },
    ],
    links: [{ rel: "canonical", href: "/collection" }],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  return (
    <div className="bg-paper text-ink">
      <SiteNav />
      <section className="mx-auto max-w-[1440px] px-6 pt-40 md:px-12 md:pt-56">
        <Reveal>
          <div className="eyebrow">Collection — Saison 5785</div>
          <h1 className="heading-hero mt-8 max-w-3xl text-[44px] md:text-[80px]">
            Douze pièces.
            <br />
            <span className="italic text-ink-soft">Une seule main.</span>
          </h1>
          <div className="mt-8 h-px w-16 rule-gold" />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <Link
                to="/produit/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  {p.edition && (
                    <span className="absolute left-4 top-4 bg-paper/80 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink">
                      {p.edition}
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="eyebrow">{p.category}</div>
                    <h3 className="heading-card mt-2 text-[22px] text-ink">
                      {p.name}
                    </h3>
                  </div>
                  <div className="font-display text-[18px] text-ink-soft tabular-nums">
                    {p.price.toLocaleString("fr-FR")} {p.currency}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
