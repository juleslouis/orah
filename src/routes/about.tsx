import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/orah/SiteNav";
import { SiteFooter } from "@/components/orah/SiteFooter";
import { Reveal } from "@/components/orah/Reveal";
import atelier from "@/assets/orah-atelier.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "La Maison — ORAH" },
      {
        name: "description",
        content:
          "ORAH est une maison de Judaïca contemporaine. Mission, vision, valeurs et ateliers.",
      },
      { property: "og:title", content: "La Maison — ORAH" },
      {
        property: "og:description",
        content: "Une maison pensée sur trois générations, pas sur un trimestre.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  {
    n: "I",
    t: "Fidélité",
    d: "À la halakha respectée à la lettre. À la promesse tenue, garantie à vie.",
  },
  {
    n: "II",
    t: "Exigence esthétique",
    d: "Aucun objet n'est joli. Chaque objet est composé comme une pièce d'orfèvrerie.",
  },
  {
    n: "III",
    t: "Transmission",
    d: "La maison se pense sur trois générations, pas sur un trimestre.",
  },
  {
    n: "IV",
    t: "Discrétion",
    d: "La marque ne crie jamais. Elle chuchote — codes du luxe silencieux.",
  },
];

function About() {
  return (
    <div className="bg-paper text-ink">
      <SiteNav />

      <section className="mx-auto max-w-[1200px] px-6 pt-40 pb-24 md:px-12 md:pt-56">
        <Reveal>
          <div className="eyebrow">La Maison</div>
          <h1 className="heading-hero mt-10 text-[44px] md:text-[88px]">
            Fabriquer
            <br />
            <span className="italic text-ink-soft">ce qui restera.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-16 grid gap-16 md:grid-cols-2">
            <p className="body-text">
              ORAH tient dans une conviction simple : un objet à charge
              symbolique forte mérite le même soin qu'une pièce
              d'horlogerie. Les objets rituels ne sont pas des accessoires
              — ce sont des contrats déposés entre les générations.
            </p>
            <p className="body-text">
              Nous travaillons avec trois ateliers. Un à Jérusalem pour le
              laiton, un à Milan pour le bronze coulé, un à Florence pour
              l'argent. Chaque pièce sort d'une main que nous connaissons.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-rule/60 bg-stone/40">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
          <div className="grid gap-16 md:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 120}>
                <div className="font-display text-[14px] tracking-[0.18em] text-brass-deep">
                  — {v.n}
                </div>
                <h3 className="heading-card mt-8 text-[28px] text-ink">
                  {v.t}
                </h3>
                <p className="mt-6 text-[14px] leading-[1.75] text-ink-soft">
                  {v.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="relative h-[80vh] min-h-[560px] overflow-hidden">
          <img
            src={atelier}
            alt="Atelier"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/60 via-transparent to-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 py-32 text-center md:py-48">
        <Reveal>
          <div className="eyebrow">Signature</div>
          <p className="mt-10 font-display text-[28px] italic leading-[1.4] tracking-[-0.01em] text-ink md:text-[36px]">
            « Nous ne fabriquons pas des objets religieux.
            <br />
            Nous fabriquons ce qui restera,
            <br />
            après nous,
            <br />
            entre les mains de ceux qu'on aime. »
          </p>
          <div className="mx-auto mt-10 h-px w-16 rule-gold" />
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
