# ORAH — Maison de Judaïca de Luxe

> Site vitrine et e-commerce expérientiel pour une maison de Judaïca inspirée par l’esthétique du quiet luxury.

## Aperçu

ORAH est une expérience web immersive conçue comme une maison de luxe : typographies éditoriales, palette ivoire/laiton/encre, animations silencieuses et une navigation qui met en valeur l’objet rituel comme un objet d’art.

## Stack technique

- **Framework** — [TanStack Start](https://tanstack.com/start) (React 19, SSR/SSG, server functions)
- **Styling** — Tailwind CSS v4 avec design tokens sémantiques dans `src/styles.css`
- **Typographies** — Cormorant (titres éditoriaux) + Inter (corps)
- **UI components** — shadcn/ui (Radix + Tailwind)
- **Build tool** — Vite 7
- **Langage** — TypeScript

## Structure du projet

```
public/                 → assets statiques, favicon, manifest
src/
  assets/               → images de la marque (hero, atelier, produits)
  components/
    orah/               → composants métier ORAH (nav, footer, reveal)
    ui/                 → composants shadcn/ui
  data/products.ts       → catalogue produit (mock / seed)
  lib/                   → utilitaires, fonctions serveur
  routes/                → pages TanStack Router
    __root.tsx           → layout racine
    index.tsx            → homepage
    collection.tsx       → grille collection
    produit.$slug.tsx    → fiche produit
    about.tsx            → maison / savoir-faire
    journal.tsx          → magazine éditorial
    contact.tsx          → formulaire de contact
  styles.css             → design system ORAH (tokens, utilitaires, animations)
  router.tsx             → configuration du router
  start.ts               → point d’entrée serveur
```

## Scripts disponibles

```sh
# Lancer le serveur de développement
bun run dev

# Build production
bun run build

# Prévisualiser le build local
bun run preview

# Lint
bun run lint

# Formater
bun run format
```

## Design system

- **Couleurs** : ivoire, laiton doré, pierre froide, encre noire — définies en oklch pour une cohérence perceptuelle.
- **Typographie** : Cormorant Garamond pour les titres, Inter pour le corps et la navigation.
- **Animations** : révélation au scroll, micro-interactions hover, transitions de page fluides.
- **Principes** : silence, espace, matière, lumière.

## Déploiement

Ce projet est conçu pour être déployé sur Lovable Cloud / Edge. Pour le connecter à votre propre infrastructure :

1. Connecter le projet à GitHub depuis l’interface Lovable (Plus → GitHub → Connect project).
2. Chaque modification poussée depuis Lovable ou depuis votre repo local se synchronise automatiquement.
3. Déployer le build statique/Edge sur votre hébergeur préféré (Cloudflare, Vercel, Netlify, etc.).

## Licence

Code propriétaire — ORAH. Tous droits réservés.
