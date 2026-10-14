import { Link } from "react-router";
import { images } from "../../constants/images";
import { DiamondMark } from "../decor/Ornaments";
import { FloralCorner } from "../decor/BotanicalAssets";

type CollectionShowcase = {
  id: string;
  slug: string;
  chapter: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  scents: string;
  scentPills: string[];
  image: string;
  alt: string;
  badge: string;
  ctaText: string;
};

const collectionsList: CollectionShowcase[] = [
  {
    id: "moments",
    slug: "moments",
    chapter: "Chapter I",
    title: "The Moments Collection",
    eyebrow: "Moments Collection",
    tagline: "Scents That Hold a Feeling — Bright, Tender, Unforgettable.",
    description:
      "Inspired by the most beautiful kind of chaos — love. Infused with sweet pear, citrus blossom, warm amber, and spiced clove, each candle illuminates memories that linger and feelings that stay.",
    scents: "Clove • Sweet Pear • Tangerine • Jasmine • Fresh Pages",
    scentPills: ["Sweet Pear", "Citrus Blossom", "Warm Amber", "Spiced Clove"],
    image: images.collectionMoments,
    alt: "Handcrafted soy candle jars with gold lids — Moments Collection",
    badge: "Signature Blend",
    ctaText: "Explore Moments Collection",
  },
  {
    id: "vampire",
    slug: "vampire",
    chapter: "Chapter II",
    title: "The Vampire Collection",
    eyebrow: "Vampire Collection",
    tagline: "Midnight Rituals. Velvet Shadows. Desire Lit.",
    description:
      "An intoxicating alchemy of smoked oud, blood orange, dark plum, and damask rose housed in sleek obsidian glass vessels with polished gold accents for an unforgettable sensory atmosphere.",
    scents: "Smoked Oud • Blood Orange • Damask Rose • Dark Plum",
    scentPills: ["Smoked Oud", "Blood Orange", "Damask Rose", "Dark Plum"],
    image: images.collectionVampire,
    alt: "Midnight black glass candles with gold lids — Vampire Collection",
    badge: "Midnight Atelier",
    ctaText: "Explore Vampire Collection",
  },
  {
    id: "rodeo",
    slug: "rodeo",
    chapter: "Chapter III",
    title: "The Rodeo Collection",
    eyebrow: "Rodeo Collection",
    tagline: "Dust, Dusk, and Stories Told Under Open Sky.",
    description:
      "Sunlit cedarwood, weathered leather, sweetgrass, and golden birch celebrate the raw elegance of heritage frontiers and golden Western sunsets.",
    scents: "Weathered Leather • Nutmeg • Sunlit Amber • Golden Birch",
    scentPills: ["Weathered Leather", "Sunlit Amber", "Nutmeg", "Golden Birch"],
    image: images.collectionRodeo,
    alt: "Western handcrafted soy candles — Rodeo Collection",
    badge: "Heritage Flame",
    ctaText: "Explore Rodeo Collection",
  },
  {
    id: "essence-of-africa",
    slug: "essence-of-africa",
    chapter: "Chapter IV",
    title: "The Essence of Africa Collection",
    eyebrow: "Essence of Africa",
    tagline: "Distant Lands. Timeless Beauty. Captured in Light.",
    description:
      "Earthy acacia blossoms, golden baobab, wild mint, and warm frankincense transport you across the vibrant landscapes of the African continent.",
    scents: "Acacia Flower • Golden Grass • Baobab Bark • Warm Vanilla",
    scentPills: ["Acacia Flower", "Golden Grass", "Baobab Bark", "Warm Vanilla"],
    image: images.collectionAfrica,
    alt: "Artisan coconut apricot wax candle jars — The Essence of Africa Collection",
    badge: "Botanical Heritage",
    ctaText: "Explore Africa Collection",
  },
  {
    id: "yosemite-valley",
    slug: "yosemite-valley",
    chapter: "Chapter V",
    title: "Yosemite Valley Collection",
    eyebrow: "Yosemite Valley",
    tagline: "Nature's Majesty... Captured in Light.",
    description:
      "Crisp alpine air, pine needles, golden meadows, and ancient sandalwood capture the sublime wonder of granite monoliths and pristine mountain wilderness.",
    scents: "Sandalwood • Alpine Pine • Wild Clover • Fresh Musk",
    scentPills: ["Sandalwood", "Alpine Pine", "Wild Clover", "Crisp Linen"],
    image: images.collectionYosemite,
    alt: "Artisan soy and coconut apricot candles — Yosemite Valley Collection",
    badge: "Wilderness Wonder",
    ctaText: "Explore Yosemite Collection",
  },
];

type ExperienceSelectorProps = {
  id?: string;
  headingId?: string;
};

export default function ExperienceSelector({
  id = "experience",
  headingId = "experience-heading",
}: ExperienceSelectorProps) {
  return (
    <section
      id={id}
      className="relative flex items-center bg-ivory overflow-hidden py-16 md:py-24 lg:py-28"
      aria-labelledby={headingId}
    >
      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(180px,26vw)] opacity-[0.34] hidden sm:block pointer-events-none"
      />
      <FloralCorner
        corner="tr"
        className="absolute right-0 top-0 w-[min(180px,26vw)] opacity-[0.34] hidden sm:block pointer-events-none"
      />
      <FloralCorner
        corner="bl"
        className="absolute left-0 bottom-0 w-[min(160px,22vw)] opacity-[0.25] hidden lg:block pointer-events-none"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(160px,22vw)] opacity-[0.25] hidden lg:block pointer-events-none"
      />

      <div className="container-editorial relative z-10 w-full">
        {/* Brand Header */}
        <header className="mx-auto mb-14 md:mb-20 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-gold/60" />
            <p className="text-eyebrow text-burgundy !tracking-[0.32em]">
              Candle Artistry Design Co.
            </p>
            <span className="h-px w-6 bg-gold/60" />
          </div>
          <h2
            id={headingId}
            className="text-section text-ink tracking-[0.04em] font-light leading-tight text-[2.2rem] md:text-[2.75rem]"
          >
            What moment do you want to experience?
          </h2>
          <div className="mt-3.5 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-14 bg-gold/45" />
            <DiamondMark className="h-2 w-2 shrink-0" />
            <div className="h-px w-14 bg-gold/45" />
          </div>
          <p className="mt-4 text-body text-taupe max-w-2xl mx-auto text-[0.92rem] md:text-[1rem] leading-relaxed">
            Hand-poured in Coarsegold, CA with pure Coconut Apricot & Soy wax, lead-free cotton wicks, and phthalate-free fine fragrances. Five distinct chapters waiting to be lit.
          </p>
        </header>

        {/* 5 Collections Alternating Zig-Zag Showcase */}
        <div className="space-y-16 md:space-y-24 lg:space-y-28">
          {collectionsList.map((item, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <article
                key={item.id}
                id={`collection-preview-${item.slug}`}
                className="rounded-3xl border border-gold/35 bg-[#fcf9f4] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_12px_36px_rgba(40,25,20,0.06)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_18px_48px_rgba(92,16,24,0.1)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
                  {/* BIG IMAGE CONTAINER */}
                  <div
                    className={`w-full lg:col-span-7 ${
                      isImageLeft ? "order-1" : "order-1 lg:order-2"
                    }`}
                  >
                    <Link
                      to={`/candles/${item.slug}`}
                      className="group relative block aspect-[16/11] sm:aspect-[16/11] md:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-champagne/40 border border-gold/40 shadow-[0_14px_36px_rgba(30,15,10,0.12)] transition-transform duration-700 ease-out hover:scale-[1.01]"
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading={index === 0 ? "eager" : "lazy"}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = images.candles;
                        }}
                      />
                      {/* Gold ring accent overlay */}
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/35 rounded-2xl" />
                      {/* Subtle hover gradient */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(32,15,10,0.35)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Chapter Pill Badge on image */}
                      <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-[0.66rem] font-semibold uppercase tracking-wider text-burgundy shadow-sm border border-gold/25">
                        {item.chapter} • {item.badge}
                      </div>

                      {/* Hover action hint */}
                      <div className="pointer-events-none absolute bottom-4 inset-x-0 flex justify-center opacity-0 transition-all duration-300 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="rounded-full bg-[#5c1018] px-4 py-1.5 font-serif text-[0.68rem] tracking-[0.2em] uppercase text-[#fcf8f2] shadow-md">
                          View Fragrances & Candles →
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* DETAILS & CTA CONTAINER */}
                  <div
                    className={`w-full lg:col-span-5 flex flex-col justify-center text-center lg:text-left ${
                      isImageLeft ? "order-2" : "order-2 lg:order-1"
                    }`}
                  >
                    {/* Eyebrow & Chapter */}
                    <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-2.5">
                      <span className="font-serif text-[0.72rem] uppercase tracking-[0.26em] text-burgundy font-semibold">
                        {item.chapter}
                      </span>
                      <span className="text-gold">•</span>
                      <span className="rounded-full bg-champagne/80 px-2.5 py-0.5 text-[0.62rem] font-medium tracking-wider text-taupe uppercase border border-gold/25">
                        {item.badge}
                      </span>
                    </div>

                    {/* Collection Title */}
                    <h3 className="font-serif text-[1.85rem] sm:text-[2.15rem] md:text-[2.4rem] font-light tracking-[0.04em] uppercase text-ink leading-tight">
                      {item.title}
                    </h3>

                    {/* Tagline */}
                    <p className="mt-2.5 font-serif italic text-[1rem] md:text-[1.08rem] text-burgundy/90 leading-snug">
                      {item.tagline}
                    </p>

                    {/* Gold Divider */}
                    <div className="my-4 flex items-center justify-center lg:justify-start gap-3 text-gold">
                      <div className="h-px w-10 bg-gold/50" />
                      <DiamondMark className="h-1.5 w-1.5 shrink-0" />
                      <div className="h-px w-10 bg-gold/50" />
                    </div>

                    {/* Description Narrative */}
                    <p className="font-serif text-[0.88rem] md:text-[0.94rem] leading-relaxed text-taupe mb-5">
                      {item.description}
                    </p>

                    {/* Scent Pills */}
                    <div className="mb-6">
                      <p className="font-serif text-[0.65rem] uppercase tracking-[0.2em] text-taupe/90 font-semibold mb-2">
                        Key Scent Profiles:
                      </p>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2">
                        {item.scentPills.map((scent) => (
                          <span
                            key={scent}
                            className="rounded-full bg-white/80 border border-gold/30 px-2.5 py-1 text-[0.72rem] font-serif text-ink tracking-wide shadow-2xs"
                          >
                            {scent}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Primary CTA Button */}
                    <div className="pt-1">
                      <Link
                        to={`/candles/${item.slug}`}
                        className="group/btn inline-flex items-center justify-center gap-2.5 rounded-full bg-burgundy px-7 py-3 font-serif text-[0.76rem] font-medium tracking-[0.16em] uppercase text-[#fcf8f2] shadow-sm hover:bg-[#7a1c25] hover:shadow-md transition-all duration-300"
                      >
                        <span>{item.ctaText}</span>
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Bottom Footer Link */}
        <div className="mt-14 md:mt-20 text-center">
          <Link
            to="/candles"
            className="outline-btn !border-burgundy !text-burgundy hover:!bg-burgundy hover:!text-[#FBF8F2] shadow-xs"
          >
            Explore Complete Atelier Catalog <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
