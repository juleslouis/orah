import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/orah/SiteNav";
import { SiteFooter } from "@/components/orah/SiteFooter";
import { Reveal } from "@/components/orah/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ORAH" },
      {
        name: "description",
        content:
          "Notre service client répond en 24 heures. Écrivez-nous pour une gravure, une commande particulière ou une visite d'atelier.",
      },
      { property: "og:title", content: "Contact — ORAH" },
      {
        property: "og:description",
        content: "Notre service client répond en 24 heures.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="bg-paper text-ink">
      <SiteNav />
      <section className="mx-auto max-w-[1200px] px-6 pt-40 pb-32 md:px-12 md:pt-56">
        <Reveal>
          <div className="eyebrow">Correspondance</div>
          <h1 className="mt-8 font-display text-[44px] leading-[1] tracking-[-0.02em] md:text-[80px]">
            Écrivez-nous.
          </h1>
          <div className="mt-8 h-px w-16 rule-gold" />
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-24">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[15px] leading-[1.9] text-ink-soft">
                Notre service client répond en vingt-quatre heures. Pour une
                gravure, une commande particulière, ou pour visiter l'un de
                nos ateliers, il suffit d'un mot.
              </p>
              <dl className="mt-16 space-y-8">
                {[
                  ["Correspondance", "maison@orah.com"],
                  ["Presse", "presse@orah.com"],
                  ["Téléphone", "+33 1 84 80 00 00"],
                  ["Adresse", "12 rue du Sentier · Paris 75002"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow">{k}</dt>
                    <dd className="mt-2 font-display text-[20px] text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={160}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-10"
              >
                {[
                  { label: "Nom", type: "text", name: "name" },
                  { label: "Adresse électronique", type: "email", name: "email" },
                  { label: "Objet", type: "text", name: "subject" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="eyebrow" htmlFor={f.name}>
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      type={f.type}
                      name={f.name}
                      className="mt-4 w-full border-b border-ink/30 bg-transparent py-3 text-[15px] text-ink focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="eyebrow" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-4 w-full resize-none border-b border-ink/30 bg-transparent py-3 text-[15px] text-ink focus:border-ink focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="border border-ink bg-ink px-12 py-5 text-[11px] uppercase tracking-[0.32em] text-paper transition-colors duration-500 hover:bg-brass-deep hover:border-brass-deep"
                >
                  Envoyer
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
