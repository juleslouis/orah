import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/orah/SiteNav";
import { SiteFooter } from "@/components/orah/SiteFooter";
import { Reveal } from "@/components/orah/Reveal";
import { PRODUCTS, productBySlug } from "@/data/products";
import { useState } from "react";

export const Route = createFileRoute("/produit/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p)
      return {
        meta: [
          { title: "Pièce introuvable — ORAH" },
          { name: "robots", content: "noindex" },
        ],
      };
    return {
      meta: [
        { title: `${p.name} — ORAH` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — ORAH` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
});

const TABS = [
  { key: "matiere", label: "Matière" },
  { key: "origine", label: "Origine" },
  { key: "livraison", label: "Livraison" },
  { key: "garantie", label: "Garantie" },
] as const;

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("matiere");
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="bg-paper text-ink">
      <SiteNav />

      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pt-32 pb-24 md:grid-cols-12 md:gap-16 md:px-12 md:pt-40">
        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[product.image, product.image, product.image].map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden bg-stone opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <Reveal>
            <div className="eyebrow">{product.category}</div>
            <h1 className="mt-6 font-display text-[40px] leading-[1] tracking-[-0.015em] md:text-[56px]">
              {product.name}
            </h1>
            <div className="mt-6 h-px w-10 rule-gold" />
            <p className="mt-8 text-[15px] leading-[1.8] text-ink-soft">
              {product.description}
            </p>

            <div className="mt-10 font-display text-[28px] tabular-nums text-ink">
              {product.price.toLocaleString("fr-FR")} {product.currency}
            </div>
            {product.edition && (
              <div className="mt-2 eyebrow text-brass-deep">
                {product.edition}
              </div>
            )}

            <button className="mt-10 w-full border border-ink bg-ink py-5 text-[11px] uppercase tracking-[0.32em] text-paper transition-colors duration-500 hover:bg-brass-deep hover:border-brass-deep">
              Ajouter au panier
            </button>
            <button className="mt-3 w-full border border-ink/30 py-5 text-[11px] uppercase tracking-[0.32em] text-ink transition-colors duration-500 hover:border-ink">
              Demander une gravure
            </button>

            <div className="mt-16 border-t border-rule/60">
              <div className="flex flex-wrap gap-6 border-b border-rule/60 py-4">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`text-[11px] uppercase tracking-[0.28em] transition-colors ${
                      tab === t.key
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="py-8 text-[14px] leading-[1.8] text-ink-soft">
                {tab === "matiere" && product.material}
                {tab === "origine" && product.origin}
                {tab === "livraison" &&
                  "Livraison offerte en 24–72h. Emballage scénarisé, coffret bois signé ORAH."}
                {tab === "garantie" &&
                  "Garantie à vie sur la pièce. Restauration et repolissage inclus."}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-rule/60 mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
        <div className="eyebrow">Pièces associées</div>
        <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
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
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="font-display text-[20px]">{p.name}</h3>
                <div className="font-display text-[16px] text-ink-soft tabular-nums">
                  {p.price.toLocaleString("fr-FR")} {p.currency}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
