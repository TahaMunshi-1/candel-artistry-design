import type { ReactNode } from "react";
import { images } from "../../constants/images";

/** Preset image URLs admins can assign until upload exists */
export const IMAGE_OPTIONS = [
  { label: "Craft Romance", value: images.craftRomance },
  { label: "Craft Vampire", value: images.craftVampire },
  { label: "Craft Rodeo", value: images.craftRodeo },
  { label: "Craft Atelier", value: images.craftAtelier },
  { label: "Candles group", value: images.candles },
  { label: "Products group", value: images.productsGroup },
  { label: "Vampire detail", value: images.vampire },
  { label: "Rodeo detail", value: images.rodeoDetail },
  { label: "Featured main", value: images.featuredMain },
  { label: "Strip 1", value: images.featuredStrip1 },
  { label: "Strip 2", value: images.featuredStrip2 },
  { label: "Wilderness", value: images.wilderness },
  { label: "Experience Romance", value: images.experienceRomance },
  { label: "Experience Mystery", value: images.experienceMystery },
  { label: "Experience Cabin", value: images.experienceCabin },
  { label: "Experience Wilderness", value: images.experienceWilderness },
  { label: "Classic 1", value: images.experienceClassic1 },
  { label: "Classic 2", value: images.experienceClassic2 },
  { label: "Classic 3", value: images.experienceClassic3 },
  { label: "Classic 4", value: images.experienceClassic4 },
  { label: "Paintings", value: images.paintings },
  { label: "Cards", value: images.cards },
] as const;

type FieldProps = {
  label: string;
  children: ReactNode;
};

export function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="font-serif text-[0.78rem] tracking-[0.06em] text-taupe">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full border border-gold/45 bg-ivory px-3 py-2 font-serif text-sm text-ink outline-none focus:border-gold";

export const selectClass = inputClass;
