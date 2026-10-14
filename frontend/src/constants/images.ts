/**
 * Client product & brand imagery for Candle Artistry Design.
 * Files live in /public/images — prefix with Vite base for subdirectory hosts.
 */
const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const images = {
  logo: img("logo.png"),
  hero: img("hero.jpg"),
  heroBanner: img("hero-banner.jpg"),
  romance: img("romance.jpg"),
  west: img("west.jpg"),
  mystery: img("mystery.jpg"),
  cabin: img("cabin.jpg"),
  wilderness: img("wilderness.jpg"),
  experience1: img("experience-1.png"),
  experience2: img("experience-2.png"),
  experience3: img("experience-3.png"),
  experience4: img("experience-4.png"),
  experienceRomance: img("experience-romance-vivid.png"),
  experienceMystery: img("experience-mystery-vivid.png"),
  experienceCabin: img("experience-cabin-vivid.png"),
  experienceWilderness: img("experience-wilderness-vivid.png"),
  experienceClassic1: img("experience-classic-1.png"),
  experienceClassic2: img("experience-classic-2.png"),
  experienceClassic3: img("experience-classic-3.png"),
  experienceClassic4: img("experience-classic-4.png"),
  featuredMain: img("featured-main.jpg"),
  featuredRoyalStill: img("featured-royal-still.jpg"),
  featuredStrip1: img("strip-1.jpg"),
  featuredStrip2: img("strip-2.jpg"),
  featuredStrip3: img("strip-3.jpg"),
  artistryBg: img("artistry-bg.jpg"),
  paintings: img("paintings.jpg"),
  candles: img("candles.jpg"),
  cards: img("cards.jpg"),
  cards2: img("cards-2.png"),
  cards3: img("cards-3.png"),
  cards4: img("cards-4.png"),
  pouring: img("pouring.jpg"),
  productsGroup: img("products-group.png"),
  craftRomance: img("craft-romance.jpg"),
  craftRodeo: img("craft-rodeo.jpg"),
  craftVampire: img("craft-vampire.jpg"),
  craftAtelier: img("craft-atelier.jpg"),
  lifestyle: img("lifestyle.png"),
  vampire: img("vampire.png"),
  rodeoDetail: img("rodeo-detail.png"),
  testing: img("testing.png"),
  box: img("box.svg"),
  archBorder: img("decor/arch-border-gold.png"),
  botanical: img("decor/botanical-gold.png"),
  floralCorner: img("decor/floral-corner.png"),
  familyMotherDaughter: img("family/mother-daughter.jpg"),
  familyFatherDaughter: img("family/father-daughter.jpg"),
  familyDaughterGarden: img("family/daughter-garden.jpg"),
  familyKatherineOz: img("family/katherine-oz.jpg"),
  familyKatherineGlinda: img("family/katherine-glinda.jpg"),
  familyStoryFlyer: img("family/our-story-flyer.jpg"),
  bannerGif: img("cad-dancing-flame.gif"),
  heroBannerFinal: img("hero-banner-final.png"),
  collectionAfrica: img("collection-africa.png"),
  collectionYosemite: img("collection-yosemite.png"),
  collectionSignature: img("collection-signature.png"),
  collectionRodeo: img("collection-rodeo.png"),
  collectionMoments: img("collection-moments.png"),
  collectionVampire: img("collection-vampire.png"),
  collectionVampirePoster: img("collection-vampire-poster.png"),
  candleMakingArt: img("candle-making-art.png"),
  candleTestingArt: img("candle-testing-art.png"),
  ourStoryPoster: img("our-story-poster.png"),
  card1: img("card-1.png"),
  card2: img("card-2.png"),
  card3: img("card-3.png"),
  card4: img("card-4.png"),
} as const;

/**
 * Resolves an image URL safely ensuring correct pathing on subdirectory hosts
 * like customdev (`/candel-artistry-design/`) and providing a fallback on failure.
 */
export function resolveImageUrl(src?: string | null, fallback: string = images.candles): string {
  if (!src) return fallback;
  const s = src.trim();
  if (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("data:") ||
    s.startsWith("blob:")
  ) {
    return s;
  }
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

  // If already prefixed with base URL
  if (base && s.startsWith(base)) {
    return s;
  }

  // If starts with /images/ or images/
  if (s.startsWith("/images/")) {
    return `${base}${s}`;
  }
  if (s.startsWith("images/")) {
    return `${base}/${s}`;
  }

  // If subfolder paths like /decor/..., /family/..., or decor/...
  if (s.startsWith("/decor/") || s.startsWith("/family/")) {
    return `${base}/images${s}`;
  }
  if (s.startsWith("decor/") || s.startsWith("family/")) {
    return `${base}/images/${s}`;
  }

  // If bare image filename or relative like "candles.jpg" or "/candles.jpg" (with optional query string)
  if (/\.(jpg|jpeg|png|webp|svg|gif)(\?.*)?$/i.test(s)) {
    const filename = s.replace(/^\//, "");
    return `${base}/images/${filename}`;
  }

  const cleanPath = s.startsWith("/") ? s : `/${s}`;
  return `${base}${cleanPath}`;
}


