import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/orah/SiteNav";
import { SiteFooter } from "@/components/orah/SiteFooter";
import { Reveal } from "@/components/orah/Reveal";
import hero from "@/assets/orah-hero.jpg";
import atelier from "@/assets/orah-atelier.jpg";
import mezuzah from "@/assets/orah-mezuzah.jpg";
import kiddush from "@/assets/orah-kiddush.jpg";
import look1 from "@/assets/orah-lookbook-1.jpg";
import look2 from "@/assets/orah-lookbook-2.jpg";
import look3 from "@/assets/orah-lookbook-3.jpg";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — ORAH | Judaïca d'orfèvrerie" },
      {
        name: "description",
        content:
          "Trois chapitres, une lumière. Le lookbook ORAH : hanoukkia, mezouza et argenterie rituelle photographiées dans la matière et le geste.",
      },
      { property: "og:title", content: "Lookbook — ORAH" },
      {
        property: "og:description",
        content:
          "Trois chapitres, une lumière. Hanoukkia, mezouza et argenterie rituelle, photographiées dans la matière et le geste.",
      },
    ],
    links: [{ rel: "canonical", href: "/lookbook" }],
  }),
  component: Lookbook,
});

type Plate = { src: string; caption: string; ratio: "portrait" | "landscape" };

type Chapter = {
  id: string;
  numeral: string;
  title: string;
  hebrew: string;
  intro: string;
  cover: string;
  plates: Plate[];
};

const CHAPTERS: Chapter[] = [
  {
    id: "lumiere",
    numeral: "I",
    title: "La lumière",
    hebrew: "אורה",
    intro:
      "Une flamme se pose sur le laiton et le réveille. Rien d'autre n'est nécessaire : la pièce attend l'heure, puis elle donne.",
    cover: look1,
    plates: [
      { src: look1, caption: "Hanoukkia Ner I — laiton massif, patine lente", ratio: "landscape" },
      { src: hero, caption: "Première nuit, atelier de Jérusalem", ratio: "portrait" },
      { src: kiddush, caption: "Reflets — argent 925, intérieur doré", ratio: "portrait" },
    ],
  },
  {
    id: "geste",
    numeral: "II",
    title: "Le geste",
    hebrew: "מעשה",
    intro:
      "Chaque objet passe entre deux mains avant d'entrer dans une maison. Le polissage, la gravure, le poinçon — trois signatures silencieuses.",
    cover: look2,
    plates: [
      { src: look2, caption: "Polissage à la peau de chamois, Milan", ratio: "landscape" },
      { src: atelier, caption: "Établi — outils de frappe, 1911", ratio: "portrait" },
      { src: mezuzah, caption: "Mezouza Shin — gravure à la fraise, or fin", ratio: "portrait" },
    ],
  },
  {
    id: "transmission",
    numeral: "III",
    title: "La transmission",
    hebrew: "מסורה",
    intro:
      "Un objet rituel n'appartient jamais tout à fait à celui qui l'achète. Il est confié, puis remis. La table est le premier musée.",
    cover: look3,
    plates: [
      { src: look3, caption: "Coupe de Kiddouch Havdala — crépuscule, Jérusalem", ratio: "landscape" },
      { src: kiddush, caption: "Contenance rituelle exacte, un reviit", ratio: "portrait" },
      { src: hero, caption: "Neuf branches, une seule intention", ratio: "portrait" },
    ],
  },
];

const ALL_PLATES = CHAPTERS.flatMap((c) =>
  c.plates.map((p) => ({ ...p, chapter: c.title })),
);

function Lookbook() {
  const [active, setActive] = useState(CHAPTERS[0].id);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sections = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    Object.values(sections.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback((dir: number) => {
    setLightbox((i) =>
      i === null ? i : (i + dir + ALL_PLATES.length) % ALL_PLATES.length,
    );
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close, step]);

  const openPlate = (src: string) => {
    const idx = ALL_PLATES.findIndex((p) => p.src === src);
    setLightbox(idx < 0 ? 0 : idx);
  };

  return (
    <div className="bg-paper text-ink">
      <SiteNav overlay />

      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={look1}
          alt="Hanoukkia de laiton posée sur un socle de pierre de Jérusalem"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-12 md:pb-28">
          <Reveal>
            <div className="label text-paper/70">Lookbook — Saison V</div>
            <h1 className="heading-hero mt-6 max-w-[16ch] text-[13vw] text-paper md:text-[7.5vw]">
              Trois chapitres, une lumière
            </h1>
            <p className="body-text measure mt-8 text-paper/80">
              Une lecture lente de la collection. La matière, le geste, puis
              ce qui se transmet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Chapter index */}
      <div className="sticky top-0 z-40 border-b border-rule/60 bg-paper/85 backdrop-blur-md">
        <nav
          aria-label="Chapitres du lookbook"
          className="mx-auto flex max-w-[1440px] items-center gap-8 overflow-x-auto px-6 py-4 md:px-12"
        >
          {CHAPTERS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              aria-current={active === c.id ? "true" : undefined}
              className={`label whitespace-nowrap transition-colors duration-500 ${
                active === c.id
                  ? "text-brass-deep"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <span className="font-display mr-2 normal-case tracking-normal">
                {c.numeral}
              </span>
              {c.title}
            </a>
          ))}
          <span className="ml-auto hidden md:block">
            <Link to="/collection" className="link-underline label text-ink-soft">
              Voir la collection
            </Link>
          </span>
        </nav>
      </div>

      {/* Chapters */}
      {CHAPTERS.map((c, ci) => (
        <section
          key={c.id}
          id={c.id}
          ref={(el) => {
            sections.current[c.id] = el;
          }}
          className="scroll-mt-24 border-b border-rule/50 py-24 md:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 md:px-12">
            <Reveal>
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-3">
                  <div className="font-display text-6xl text-brass-deep md:text-7xl">
                    {c.numeral}
                  </div>
                  <div className="mt-3 h-px w-10 rule-gold" />
                  <div className="mt-6 font-display text-2xl text-ink-muted">
                    {c.hebrew}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h2 className="heading-section text-[10vw] md:text-[4.4vw]">
                    {c.title}
                  </h2>
                  <p className="body-text measure-wide mt-6">{c.intro}</p>
                </div>
              </div>
            </Reveal>

            {/* Full-bleed plate */}
            <Reveal delay={120}>
              <button
                type="button"
                onClick={() => openPlate(c.plates[0].src)}
                aria-label={`Agrandir : ${c.plates[0].caption}`}
                className="group mt-16 block w-full overflow-hidden bg-stone"
              >
                <img
                  src={c.plates[0].src}
                  alt={c.plates[0].caption}
                  loading={ci === 0 ? "eager" : "lazy"}
                  width={1600}
                  height={1008}
                  className="h-[60vh] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] md:h-[78vh]"
                />
              </button>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="label text-ink-muted">
                  Planche {c.numeral}.1
                </span>
                <span className="text-sm text-ink-muted">
                  {c.plates[0].caption}
                </span>
              </div>
            </Reveal>

            {/* Diptych */}
            <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-12">
              {c.plates.slice(1).map((p, i) => (
                <Reveal key={p.caption + i} delay={i * 140}>
                  <button
                    type="button"
                    onClick={() => openPlate(p.src)}
                    aria-label={`Agrandir : ${p.caption}`}
                    className="group block w-full overflow-hidden bg-stone"
                  >
                    <img
                      src={p.src}
                      alt={p.caption}
                      loading="lazy"
                      width={1600}
                      height={1008}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </button>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="label text-ink-muted">
                      Planche {c.numeral}.{i + 2}
                    </span>
                    <span className="text-sm text-ink-muted">{p.caption}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Closing */}
      <section className="mx-auto max-w-[1440px] px-6 py-32 text-center md:px-12 md:py-44">
        <Reveal>
          <div className="mx-auto h-px w-10 rule-gold" />
          <p className="heading-section mx-auto mt-10 max-w-[22ch] text-[9vw] italic md:text-[3.6vw]">
            Ce qui est transmis ne s'use pas.
          </p>
          <Link
            to="/collection"
            className="link-underline label mt-12 inline-block text-ink"
          >
            Découvrir les pièces
          </Link>
        </Reveal>
      </section>

      <SiteFooter />

      {/* Fullscreen gallery */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie plein écran"
          className="fixed inset-0 z-[100] flex flex-col bg-ink/97"
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <span className="label text-paper/60">
              {ALL_PLATES[lightbox].chapter} — {lightbox + 1}/{ALL_PLATES.length}
            </span>
            <button
              onClick={close}
              aria-label="Fermer la galerie"
              className="text-paper/70 transition hover:text-paper"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 pb-4 md:px-16">
            <img
              key={ALL_PLATES[lightbox].src + lightbox}
              src={ALL_PLATES[lightbox].src}
              alt={ALL_PLATES[lightbox].caption}
              className="reveal-slow max-h-[76vh] w-auto max-w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-6 px-6 pb-10 md:px-10">
            <button
              onClick={() => step(-1)}
              aria-label="Planche précédente"
              className="label flex items-center gap-3 text-paper/60 transition hover:text-paper"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.25} /> Préc.
            </button>
            <span className="text-center text-sm text-paper/70">
              {ALL_PLATES[lightbox].caption}
            </span>
            <button
              onClick={() => step(1)}
              aria-label="Planche suivante"
              className="label flex items-center gap-3 text-paper/60 transition hover:text-paper"
            >
              Suiv. <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
