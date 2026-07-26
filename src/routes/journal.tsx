import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/orah/SiteNav";
import { SiteFooter } from "@/components/orah/SiteFooter";
import { Reveal } from "@/components/orah/Reveal";
import mezuzah from "@/assets/orah-mezuzah.jpg";
import kiddush from "@/assets/orah-kiddush.jpg";
import atelier from "@/assets/orah-atelier.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — ORAH" },
      {
        name: "description",
        content:
          "Rites, symboles, ateliers. Le journal ORAH — lecture longue sur l'objet rituel juif contemporain.",
      },
      { property: "og:title", content: "Journal — ORAH" },
      {
        property: "og:description",
        content: "Rites, symboles, ateliers.",
      },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

const ARTICLES = [
  {
    tag: "Rites",
    title: "La mezouza, seuil et promesse",
    excerpt:
      "Un contrat déposé sur le montant de la porte. Une trace visible d'une promesse intérieure.",
    img: mezuzah,
    time: "6 min",
  },
  {
    tag: "Ateliers",
    title: "Florence — trois générations d'argenterie",
    excerpt:
      "Nous entrons dans l'atelier des Bernasconi, qui frappent l'argent depuis 1911.",
    img: atelier,
    time: "12 min",
  },
  {
    tag: "Symboles",
    title: "Kiddouch — la coupe qui contient exactement",
    excerpt:
      "La mesure rituelle du reviit, et pourquoi la contenance d'une coupe n'est jamais accidentelle.",
    img: kiddush,
    time: "8 min",
  },
];

function Journal() {
  return (
    <div className="bg-paper text-ink">
      <SiteNav />
      <section className="mx-auto max-w-[1200px] px-6 pt-40 md:px-12 md:pt-56">
        <Reveal>
          <div className="eyebrow">Journal — Automne 5785</div>
          <h1 className="mt-8 font-display text-[44px] leading-[1] tracking-[-0.02em] md:text-[80px]">
            Rites, symboles,
            <br />
            <span className="italic text-ink-soft">ateliers.</span>
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-16 md:gap-24">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.title} delay={i * 120}>
              <Link
                to="/journal"
                className="group grid gap-8 md:grid-cols-12 md:gap-12"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone md:col-span-7">
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2400ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-center md:col-span-5">
                  <div className="flex items-center gap-6 eyebrow">
                    <span>{a.tag}</span>
                    <span>·</span>
                    <span>{a.time} de lecture</span>
                  </div>
                  <h2 className="mt-6 font-display text-[32px] leading-[1.1] tracking-[-0.015em] md:text-[44px]">
                    {a.title}
                  </h2>
                  <p className="mt-6 text-[15px] leading-[1.8] text-ink-soft">
                    {a.excerpt}
                  </p>
                  <span className="mt-8 link-underline text-[11px] uppercase tracking-[0.28em] text-ink">
                    Lire l'article ⟶
                  </span>
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
