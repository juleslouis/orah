import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule/60 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-4xl tracking-[0.24em] text-ink">
              ORAH
            </div>
            <div className="mt-2 h-px w-10 rule-gold" />
            <p className="mt-8 max-w-sm font-display text-2xl italic leading-tight text-ink-soft">
              La lumière qui se transmet.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">
              Maison de Judaïca contemporaine. Objets d'orfèvrerie rituelle,
              conçus avec l'exigence du grand luxe et validés par autorité
              rabbinique.
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow">Correspondance</div>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              Recevez chaque saison notre journal — sans annonces, sans
              promotions. Uniquement la lumière et l'objet.
            </p>
            <form
              className="mt-6 flex items-center border-b border-ink/30 pb-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre adresse"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
                required
              />
              <button
                type="submit"
                className="eyebrow text-ink hover:text-brass-deep transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">Maison</div>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              {[
                ["Collection", "/collection"],
                ["Journal", "/journal"],
                ["À propos", "/about"],
                ["FAQ", "/faq"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="link-underline hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-rule/60 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            © {new Date().getFullYear()} ORAH — Tous droits réservés
          </div>
          <div className="flex gap-6 text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            <span>Paris · Milano · New York</span>
            <span>Livraison monde entier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
