export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  material: string;
  origin: string;
  image: string;
  edition?: string;
  description: string;
};

import hero from "@/assets/orah-hero.jpg";
import mezuzah from "@/assets/orah-mezuzah.jpg";
import kiddush from "@/assets/orah-kiddush.jpg";

export const PRODUCTS: Product[] = [
  {
    slug: "hanoukkia-ner-i",
    name: "Hanoukkia Ner I",
    category: "Hanoukkia",
    price: 2450,
    currency: "€",
    material: "Laiton massif patiné à la main",
    origin: "Atelier de Jérusalem",
    image: hero,
    edition: "Édition ouverte",
    description:
      "Neuf branches tournées à la main, patine chaude obtenue par oxydation lente. Chaque pièce porte la signature de l'atelier à sa base.",
  },
  {
    slug: "mezouza-shin",
    name: "Mezouza Shin",
    category: "Mezouza",
    price: 380,
    currency: "€",
    material: "Bronze coulé, finition satinée",
    origin: "Atelier de Milan",
    image: mezuzah,
    edition: "Certificat de cacherout inclus",
    description:
      "Un fût cylindrique sobre, coiffé d'un chapiteau ciselé. La lettre שׁ est gravée à la fraise, remplie à l'or fin.",
  },
  {
    slug: "kiddouch-havdala",
    name: "Coupe de Kiddouch Havdala",
    category: "Argenterie",
    price: 890,
    currency: "€",
    material: "Argent massif 925, poinçon de l'atelier",
    origin: "Atelier de Florence",
    image: kiddush,
    edition: "Gravure incluse",
    description:
      "Une coupe à pied haut, contenance rituelle exacte. Le pourtour intérieur est doré pour préserver la couleur du vin.",
  },
];

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);
