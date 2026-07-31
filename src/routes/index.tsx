import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/orah/SiteNav";
import { SiteFooter } from "@/components/orah/SiteFooter";
import { Reveal } from "@/components/orah/Reveal";
import { PRODUCTS } from "@/data/products";
import heroImage from "@/assets/orah-hero.jpg";
import atelierImage from "@/assets/orah-atelier.jpg";
import mezuzahImage from "@/assets/orah-mezuzah.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORAH — La lumière qui se transmet" },
      {
        name: "description",
        content:
          "Maison de Judaïca contemporaine. Objets rituels d'orfèvrerie — hanoukkia, mezouza, kiddouch. Conçus avec l'exigence du grand luxe, validés par autorité rabbinique.",
      },
      { property: "og:title", content: "ORAH — La lumière qui se transmet" },
      {
        property: "og:description",
        content:
          "Maison de Judaïca contemporaine. Objets rituels d'orfèvrerie — hanoukkia, mezouza, kiddouch. Conçus avec l'exigence du grand luxe, validés par autorité rabbinique.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="bg-paper text-ink">
      <SiteNav overlay />
      <Hero />
      <Announcement />
      <Manifesto />
      <IconicPieces />
      <Atelier />
      <Ritual />
      <Press />
      <Correspondance />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Hanoukkia en laiton, lumière rasante sur pierre de Jérusalem"
        width={1600}
        height={1808}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-navy/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 pb-24 pt-40 md:px-12">
        <div className="reveal-slow mx-auto max-w-[900px] text-center">
          <div className="text-[26px] font-light uppercase leading-tight tracking-[0.16em] text-paper/60 md:text-[40px]">
            Le monde d'ORAH
          </div>
          <div className="mt-3 font-display text-[34px] italic leading-tight text-brass md:text-[56px]">
            La lumière qui se transmet
          </div>
        </div>

        <div className="reveal-slow mt-24 max-w-xl md:mt-32">
          <div className="eyebrow text-brass">Maison — Fondée 5785</div>
          <h1 className="heading-hero mt-6 text-[34px] text-paper md:text-[52px]">
            Orfèvrerie rituelle
            <br />
            de transmission
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/75">
            Hanoukkia, mezouza, argenterie de kiddouch. Trois ateliers, une
            seule main, trois générations.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/collection" className="btn-pill-light">
              Découvrir la collection
            </Link>
            <Link
              to="/about"
              className="link-underline label text-paper/70 hover:text-paper"
            >
              La maison
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-paper/60 flicker">
        Scroll
      </div>

    </section>
  );
}

function Announcement() {
  const items = [
    "Fabrication à la main",
    "Certificat de cacherout",
    "Livraison 24–72h",
    "Garantie à vie",
    "Gravure incluse",
    "Emballage scénarisé",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-rule/70 overflow-hidden bg-paper">
      <div className="flex whitespace-nowrap marquee-track py-5">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="mx-10 shrink-0 text-[11px] uppercase tracking-[0.18em] text-ink-muted"
          >
            {t} <span className="ml-10 text-brass">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-32 md:px-12 md:py-48">
      <Reveal>
        <div className="eyebrow">Manifeste — I</div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="heading-section mt-10 text-[36px] text-ink md:text-[64px]">
          Un objet rituel ne se choisit pas
          <br />
          <span className="italic text-ink-soft">comme un accessoire.</span>
          <br />
          Il se transmet.
        </h2>
      </Reveal>
      <Reveal delay={280}>
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
          <p className="body-text measure-wide">
            Il traverse les mariages, les naissances, les shabbats ordinaires
            et les fêtes qui comptent. Il change de mains sans se briser, il
            gagne à vieillir, il finit par appartenir à la famille davantage
            qu'à celui qui l'a acheté.
          </p>
          <p className="body-text measure-wide">
            ORAH existe parce que ces objets méritent la même exigence que
            l'on réserve à une pièce d'horlogerie ou à un bijou de famille —
            la même main, le même silence, la même lumière. Nous ne
            fabriquons pas des objets religieux : nous fabriquons ce qui
            restera.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function IconicPieces() {
  return (
    <section className="border-t border-rule/60 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <div className="eyebrow">Pièces iconiques</div>
              <h2 className="heading-section mt-6 text-[36px] md:text-[56px]">
                Trois objets. <span className="italic text-ink-soft">Trois rites.</span>
              </h2>
            </div>
            <Link
              to="/collection"
              className="link-underline label hidden md:inline-flex text-ink-soft"
            >
              Voir la collection ⟶
            </Link>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 140}>
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
                <div className="mt-3 h-px w-0 bg-brass transition-all duration-1000 group-hover:w-full" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Atelier() {
  return (
    <section className="border-t border-rule/60 bg-stone/40">
      <div className="mx-auto grid max-w-[1440px] gap-0 md:grid-cols-12">
        <div className="relative md:col-span-7 aspect-[4/5] md:aspect-auto md:min-h-[720px] overflow-hidden">
          <img
            src={atelierImage}
            alt="Atelier — polissage à la main"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-24 md:col-span-5 md:px-16 md:py-32">
          <Reveal>
            <div className="max-w-md">
              <div className="eyebrow">Les ateliers</div>
              <h2 className="heading-section mt-8 text-[36px] md:text-[48px]">
                Trois ateliers.
                <br />
                <span className="italic text-ink-soft">Une seule main.</span>
              </h2>
              <p className="body-text mt-8">
                Chaque pièce est confiée à l'un de nos trois ateliers
                partenaires — Jérusalem, Milan, Florence. Une chaîne courte,
                choisie pour l'exigence du geste plutôt que pour l'échelle
                de production.
              </p>
              <Link
                to="/about"
                className="label mt-12 inline-flex items-center gap-4 border-b border-ink/60 pb-2 text-ink hover:text-brass-deep hover:border-brass-deep transition-colors"
              >
                Notre méthode ⟶
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Ritual() {
  return (
    <section className="border-t border-rule/60 mx-auto max-w-[1440px] px-6 py-32 md:px-12 md:py-48">
      <div className="grid gap-16 md:grid-cols-12 md:gap-24">
        <div className="md:col-span-5">
          <Reveal>
            <div className="eyebrow">Journal — Extrait</div>
            <h3 className="heading-section mt-8 text-[32px] md:text-[44px]">
              La mezouza,
              <br />
              <span className="italic text-ink-soft">seuil et promesse.</span>
            </h3>
            <p className="body-text mt-8">
              Ce n'est pas un objet décoratif. C'est un contrat déposé sur
              le montant de la porte — une trace visible d'une promesse
              intérieure. Chaque foyer en porte une. Chaque enfant, un jour,
              apprend à la toucher.
            </p>
            <Link
              to="/journal"
              className="link-underline label mt-12 inline-block text-ink"
            >
              Lire le journal
            </Link>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={200}>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <img
                src={mezuzahImage}
                alt="Pose d'une mezouza sur pierre"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Press() {
  const quotes = [
    {
      q: "Une écriture d'objets d'une justesse rare. ORAH réinvente une catégorie que personne n'osait toucher.",
      s: "Vogue Living",
    },
    {
      q: "Le luxe silencieux appliqué à la transmission. Chaque pièce semble avoir toujours été là.",
      s: "Monocle",
    },
    {
      q: "La maison qui redonne à l'objet rituel sa dignité d'orfèvrerie.",
      s: "Le Figaro",
    },
  ];
  return (
    <section className="border-y border-rule/60 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="eyebrow text-center">Presse</div>
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-12">
          {quotes.map((q, i) => (
            <Reveal key={i} delay={i * 120}>
              <figure className="mx-auto max-w-sm text-center">
                <blockquote className="font-display text-[22px] italic leading-[1.35] tracking-[-0.01em] text-ink md:text-[24px]">
                  “{q.q}”
                </blockquote>
                <figcaption className="mt-8 eyebrow">— {q.s}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Correspondance() {
  return (
    <section className="mx-auto max-w-[900px] px-6 py-32 text-center md:py-48">
      <Reveal>
        <div className="eyebrow">Correspondance</div>
        <h2 className="heading-section mt-10 text-[36px] md:text-[56px]">
          Recevez notre journal,
          <br />
          <span className="italic text-ink-soft">quatre fois par an.</span>
        </h2>
        <p className="body-text mx-auto mt-8 max-w-lg">
          Aucune promotion. Aucune annonce commerciale. Uniquement la
          lumière, l'objet, et le geste.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-14 flex max-w-md items-center border-b border-ink/40 pb-3"
        >
          <input
            type="email"
            placeholder="Votre adresse"
            required
            className="flex-1 bg-transparent text-center text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="submit"
            className="eyebrow ml-4 text-ink hover:text-brass-deep transition-colors"
          >
            Envoyer
          </button>
        </form>
      </Reveal>
    </section>
  );
}
