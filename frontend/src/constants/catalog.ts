import { images } from "./images";

/** Default launch price until client confirms retail. */
export const DEFAULT_CANDLE_PRICE = 24;

export type ProductStatus = "available" | "coming_soon";

export type CandleProduct = {
  id: string;
  slug: string;
  name: string;
  nomenclature: string;
  status: ProductStatus;
  price?: number;
  /** Temporary placeholder until approved jar art arrives */
  image: string;
  alt: string;
};

export type CandleCollection = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  line: string;
  heroImage: string;
  heroAlt: string;
  products: CandleProduct[];
};

export const candleCollections: CandleCollection[] = [
  {
    id: "moments",
    slug: "moments",
    title: "Moments",
    eyebrow: "Collection",
    line: "Scents that hold a feeling — bright, tender, unforgettable.",
    heroImage: images.craftRomance,
    heroAlt: "Moments collection — ivory soy candles with storybook labels",
    products: [
      {
        id: "serengeti-gold",
        slug: "serengeti-gold",
        name: "Serengeti Gold",
        nomenclature: "Tangerine • Orange Peel • Lemon • Pineapple",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.craftRomance,
        alt: "Serengeti Gold candle jar",
      },
      {
        id: "lady-in-the-rain",
        slug: "lady-in-the-rain",
        name: "Lady in the Rain",
        nomenclature: "Lime • Cantaloupe • Bamboo • Green Leaves",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.candles,
        alt: "Lady in the Rain candle jar",
      },
      {
        id: "baliendo",
        slug: "baliendo",
        name: "Baliendo",
        nomenclature: "Clove • Pear • Sugar",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.featuredStrip1,
        alt: "Baliendo candle jar",
      },
    ],
  },
  {
    id: "vampire",
    slug: "vampire",
    title: "Vampire",
    eyebrow: "Collection",
    line: "Midnight rituals. Velvet shadows. Desire lit.",
    heroImage: images.craftVampire,
    heroAlt: "Vampire collection — black glass candles on an ornate gold tray",
    products: [
      {
        id: "the-awakening",
        slug: "the-awakening",
        name: "The Awakening",
        nomenclature: "Oak • Palm • Vanilla",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.craftVampire,
        alt: "The Awakening candle jar",
      },
      {
        id: "crimson-veil",
        slug: "crimson-veil",
        name: "Crimson Veil",
        nomenclature: "Basil • Grapefruit • Rose • Musk",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.vampire,
        alt: "Crimson Veil candle jar",
      },
    ],
  },
  {
    id: "rodeo",
    slug: "rodeo",
    title: "Rodeo",
    eyebrow: "Collection",
    line: "Dust, dusk, and stories told under open sky.",
    heroImage: images.craftRodeo,
    heroAlt: "Rodeo collection — western-themed candles with velvet and rope",
    products: [
      {
        id: "leather-and-lace",
        slug: "leather-and-lace",
        name: "Leather & Lace",
        nomenclature: "Nutmeg • Lemon Zest • Cinnamon",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.craftRodeo,
        alt: "Leather & Lace candle jar",
      },
      {
        id: "home-sweet-home",
        slug: "home-sweet-home",
        name: "Home Sweet Home",
        nomenclature: "Rose • Wood • Earth",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.rodeoDetail,
        alt: "Home Sweet Home candle jar",
      },
    ],
  },
  {
    id: "essence-of-africa",
    slug: "essence-of-africa",
    title: "Essence of Africa",
    eyebrow: "Collection",
    line: "Rhythm, warmth, and light carried from across the savannah.",
    heroImage: images.craftAtelier,
    heroAlt: "Essence of Africa collection — artisan candles among books and roses",
    products: [
      {
        id: "jambo-light",
        slug: "jambo-light",
        name: "Jambo Light",
        nomenclature: "Mint • Green Leaves • Ginger",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.craftAtelier,
        alt: "Jambo Light candle jar",
      },
      {
        id: "indlamu",
        slug: "indlamu",
        name: "Indlamu",
        nomenclature: "Peach • Violet • Sandalwood",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.productsGroup,
        alt: "Indlamu candle jar",
      },
    ],
  },
  {
    id: "yosemite-valley",
    slug: "yosemite-valley",
    title: "Yosemite Valley",
    eyebrow: "Collection",
    line: "Cedar hush, open sky, and quiet winter light.",
    heroImage: images.wilderness,
    heroAlt: "Yosemite Valley collection — wilderness-inspired candle still life",
    products: [
      {
        id: "yosemite-might",
        slug: "yosemite-might",
        name: "Yosemite Might",
        nomenclature: "Sandalwood • Musk • Cedar",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.wilderness,
        alt: "Yosemite Might candle jar",
      },
      {
        id: "winter-silence",
        slug: "winter-silence",
        name: "Winter Silence",
        nomenclature: "Linen • Orange Blossom • Sandalwood",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.experienceWilderness,
        alt: "Winter Silence candle jar",
      },
    ],
  },
  {
    id: "signature",
    slug: "signature",
    title: "Signature",
    eyebrow: "Collection",
    line: "House favorites — amber warmth and Sunday quiet.",
    heroImage: images.featuredMain,
    heroAlt: "Signature collection — featured candle still life",
    products: [
      {
        id: "golden-moments",
        slug: "golden-moments",
        name: "Golden Moments",
        nomenclature: "Amber • Leather • Ginger",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.featuredMain,
        alt: "Golden Moments candle jar",
      },
      {
        id: "sunday-morning",
        slug: "sunday-morning",
        name: "Sunday Morning",
        nomenclature: "Banana • Pear • Green Leaves • Jasmine",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.featuredStrip2,
        alt: "Sunday Morning candle jar",
      },
    ],
  },
];

export function getCandleCollection(slug: string) {
  return candleCollections.find((c) => c.slug === slug);
}

export type GalleryItem = {
  id: string;
  name: string;
  image: string;
  alt: string;
  status: ProductStatus;
  price?: number;
  note?: string;
};

export const oilPaintings: GalleryItem[] = [
  {
    id: "painting-romance",
    name: "The Romance",
    image: images.experienceRomance,
    alt: "Original oil painting — The Romance",
    status: "available",
    price: 450,
    note: "Original Atelier Canvas",
  },
  {
    id: "painting-mystery",
    name: "The Mystery",
    image: images.experienceMystery,
    alt: "Original oil painting — The Mystery",
    status: "available",
    price: 520,
    note: "Original Atelier Canvas",
  },
  {
    id: "painting-cabin",
    name: "The Cabin",
    image: images.experienceCabin,
    alt: "Original oil painting — The Cabin",
    status: "coming_soon",
    price: 380,
  },
  {
    id: "painting-wilderness",
    name: "The Wilderness",
    image: images.experienceWilderness,
    alt: "Original oil painting — The Wilderness",
    status: "coming_soon",
    price: 490,
  },
];

export const greetingCards: GalleryItem[] = [
  {
    id: "card-garden-reverie",
    name: "Garden Reverie",
    image: images.experienceClassic4,
    alt: "Greeting card — winged figure in a flower garden at sunset",
    status: "available",
    price: 12,
    note: "Foil embossed greeting card",
  },
  {
    id: "card-moonlit-raven",
    name: "Moonlit Raven",
    image: images.experienceClassic2,
    alt: "Greeting card — enchanted forest with lantern and raven",
    status: "available",
    price: 12,
    note: "Foil embossed greeting card",
  },
  {
    id: "card-lantern-evening",
    name: "Lantern Evening",
    image: images.experienceClassic3,
    alt: "Greeting card — moonlit balcony with lantern and roses",
    status: "available",
    price: 12,
    note: "Foil embossed greeting card",
  },
  {
    id: "card-open-sky",
    name: "Open Sky",
    image: images.experienceClassic1,
    alt: "Greeting card — golden-winged figure beneath an open sky",
    status: "coming_soon",
    price: 12,
  },
];
