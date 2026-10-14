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
    heroImage: images.collectionMoments,
    heroAlt: "Moments Collection master showcase — Bailando, Serengeti Gold, Night Mood, Lady in the Rain, Storied Day",
    products: [
      {
        id: "bailando",
        slug: "bailando",
        name: "Bailando",
        nomenclature: "Clove • Pear • Sugar",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.featuredStrip1,
        alt: "Bailando candle jar",
      },
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
        id: "night-mood",
        slug: "night-mood",
        name: "Night Mood",
        nomenclature: "Jasmine • Dark Amber • Vanilla Bean",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.featuredMain,
        alt: "Night Mood candle jar",
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
        id: "storied-day",
        slug: "storied-day",
        name: "Storied Day",
        nomenclature: "Coffee • Tonka • Amber • Fresh Pages",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.lifestyle,
        alt: "Storied Day candle jar",
      },
    ],
  },
  {
    id: "vampire",
    slug: "vampire",
    title: "Vampire",
    eyebrow: "Collection",
    line: "Midnight rituals. Velvet shadows. Desire lit.",
    heroImage: images.collectionVampire,
    heroAlt: "Vampire Collection master showcase — The Awakening, Velvet Kiss, Crimson Veil, Hypnotic Host",
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
        id: "velvet-kiss",
        slug: "velvet-kiss",
        name: "Velvet Kiss",
        nomenclature: "Black Currant • Damask Rose • Dark Plum",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.featuredStrip2,
        alt: "Velvet Kiss candle jar",
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
      {
        id: "hypnotic-host",
        slug: "hypnotic-host",
        name: "Hypnotic Host",
        nomenclature: "Smoked Oud • Blood Orange • Cedarwood",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.collectionVampire,
        alt: "Hypnotic Host candle jar",
      },
    ],
  },
  {
    id: "rodeo",
    slug: "rodeo",
    title: "Rodeo",
    eyebrow: "Collection",
    line: "Dust, dusk, and stories told under open sky.",
    heroImage: images.collectionRodeo,
    heroAlt: "Rodeo Collection master showcase — Tumbleweed, Home Sweet Home, Leather & Lace, Eight Seconds",
    products: [
      {
        id: "tumbleweed",
        slug: "tumbleweed",
        name: "Tumbleweed",
        nomenclature: "Sagebrush • Sweetgrass • Sunlit Amber",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.west,
        alt: "Tumbleweed candle jar",
      },
      {
        id: "home-sweet-home",
        slug: "home-sweet-home",
        name: "Home Sweet Home",
        nomenclature: "Rose • Cedar Wood • Earth",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.rodeoDetail,
        alt: "Home Sweet Home candle jar",
      },
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
        id: "eight-seconds",
        slug: "eight-seconds",
        name: "Eight Seconds",
        nomenclature: "Weathered Leather • Tobacco Leaf • Golden Birch",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.collectionRodeo,
        alt: "Eight Seconds candle jar",
      },
    ],
  },
  {
    id: "essence-of-africa",
    slug: "essence-of-africa",
    title: "The Essence of Africa",
    eyebrow: "Collection",
    line: "Distant Lands. Timeless Beauty. Captured in Light.",
    heroImage: images.collectionAfrica,
    heroAlt: "The Essence of Africa Collection master showcase — Savannah Dawn, Jambo Light, Indlamu, Sacred Horizon",
    products: [
      {
        id: "savannah-dawn",
        slug: "savannah-dawn",
        name: "Savannah Dawn",
        nomenclature: "Acacia Flower • Amber Sun • Golden Grass",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.collectionAfrica,
        alt: "Savannah Dawn candle jar",
      },
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
      {
        id: "sacred-horizon",
        slug: "sacred-horizon",
        name: "Sacred Horizon",
        nomenclature: "Baobab Bark • Warm Vanilla • Frankincense",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.collectionAfrica,
        alt: "Sacred Horizon candle jar",
      },
    ],
  },
  {
    id: "yosemite-valley",
    slug: "yosemite-valley",
    title: "Yosemite Valley",
    eyebrow: "Collection",
    line: "Nature's Beauty... Captured in Light. Moments inspired by a remarkable place.",
    heroImage: images.collectionYosemite,
    heroAlt: "Yosemite Valley Collection master showcase — Yosemite Might, Winter Silence, Wild Equine",
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
      {
        id: "wild-equine",
        slug: "wild-equine",
        name: "Wild Equine",
        nomenclature: "Golden Meadow • Pine Needle • Wild Clover",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.cabin,
        alt: "Wild Equine candle jar",
      },
    ],
  },
  {
    id: "signature",
    slug: "signature",
    title: "Signature",
    eyebrow: "Collection",
    line: "Timeless Scents. Artfully Inspired. Each candle is a story, a moment, a memory.",
    heroImage: images.collectionSignature,
    heroAlt: "Signature Collection master showcase — Gilded Birch, Golden Moment, Sunday Morning",
    products: [
      {
        id: "gilded-birch",
        slug: "gilded-birch",
        name: "Gilded Birch",
        nomenclature: "Mountain Air • Golden Woods • Crisp Birch",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.collectionSignature,
        alt: "Gilded Birch candle jar",
      },
      {
        id: "golden-moment",
        slug: "golden-moment",
        name: "Golden Moment",
        nomenclature: "Nostalgic Amber • Warm Spices • Honeycomb",
        status: "available",
        price: DEFAULT_CANDLE_PRICE,
        image: images.featuredStrip3,
        alt: "Golden Moment candle jar",
      },
      {
        id: "sunday-morning",
        slug: "sunday-morning",
        name: "Sunday Morning",
        nomenclature: "Soft Florals • Morning Light • Sweet Jasmine",
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

export const oilPaintings: GalleryItem[] = [];

export const greetingCards: GalleryItem[] = [
  {
    id: "card-garden-reverie",
    name: "Garden Reverie",
    image: images.card1,
    alt: "Greeting card — Garden Reverie",
    status: "available",
    price: 12,
    note: "Foil embossed greeting card",
  },
  {
    id: "card-moonlit-raven",
    name: "Moonlit Raven",
    image: images.card2,
    alt: "Greeting card — Moonlit Raven",
    status: "available",
    price: 12,
    note: "Foil embossed greeting card",
  },
  {
    id: "card-lantern-evening",
    name: "Lantern Evening",
    image: images.card3,
    alt: "Greeting card — Lantern Evening",
    status: "available",
    price: 12,
    note: "Foil embossed greeting card",
  },
  {
    id: "card-open-sky",
    name: "Open Sky",
    image: images.card4,
    alt: "Greeting card — Open Sky",
    status: "available",
    price: 12,
    note: "Foil embossed greeting card",
  },
];
