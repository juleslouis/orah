import { Link } from "@tanstack/react-router";
import { OrahEmblem } from "./OrahEmblem";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-paper">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <OrahEmblem className="h-8 w-8 text-brass" />
            <div className="mt-5 text-[20px] font-light tracking-[0.34em] text-paper">
              ORAH
            </div>
            <div className="mt-3 h-px w-10 rule-gold" />
            <p className="mt-8 max-w-sm font-display text-2xl italic leading-tight text-brass">
              La lumière qui se transmet.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">
              Maison de Judaïca contemporaine. Objets d'orfèvrerie rituelle,
              conçus avec l'exigence du grand luxe et validés par autorité
              rabbinique.
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow text-brass">Correspondance</div>
            <p className="mt-6 text-sm leading-relaxed text-paper/70">
              Recevez chaque saison notre journal — sans annonces, sans
              promotions. Uniquement la lumière et l'objet.
            </p>
            <form
              className="mt-6 flex items-center border-b border-paper/30 pb-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre adresse"
                className="flex-1 bg-transparent text-sm text-paper placeholder:text-paper/50 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="label text-brass transition-colors hover:text-paper"
              >
                S'inscrire
              </button>
            </form>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-brass">Maison</div>
            <ul className="mt-6 space-y-3 text-sm text-paper/75">
              {[
                ["Collection", "/collection"],
                ["Lookbook", "/lookbook"],
                ["Journal", "/journal"],
                ["À propos", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="link-underline hover:text-paper">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-paper/20 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="text-[11px] uppercase tracking-[0.24em] text-paper/55">
            © {new Date().getFullYear()} ORAH — Tous droits réservés
          </div>
          <div className="flex gap-6 text-[11px] uppercase tracking-[0.24em] text-paper/55">
            <span>Jérusalem · Milano · Firenze</span>
            <span>Livraison monde entier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
