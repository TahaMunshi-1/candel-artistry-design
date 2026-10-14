import { Link } from "react-router";
import { images } from "../../constants/images";
import { DiamondMark } from "../decor/Ornaments";
import { FloralCorner } from "../decor/BotanicalAssets";

const candleMoments = [
  {
    id: "moments",
    slug: "moments",
    title: "The Romance",
    eyebrow: "Moments Collection",
    keywords: "Clove • Sweet Pear • Tangerine • Jasmine",
    image: images.collectionMoments,
    alt: "Handcrafted soy candle jars with gold lids — Moments Collection",
    badge: "Signature Blend",
  },
  {
    id: "vampire",
    slug: "vampire",
    title: "The Vampire",
    eyebrow: "Vampire Collection",
    keywords: "Smoked Oud • Blood Orange • Damask Rose",
    image: images.collectionVampire,
    alt: "Midnight black glass candles with gold lids — Vampire Collection",
    badge: "Midnight Atelier",
  },
  {
    id: "rodeo",
    slug: "rodeo",
    title: "The Rodeo",
    eyebrow: "Rodeo Collection",
    keywords: "Weathered Leather • Nutmeg • Sunlit Amber",
    image: images.collectionRodeo,
    alt: "Western handcrafted soy candles — Rodeo Collection",
    badge: "Heritage Flame",
  },
  {
    id: "africa-yosemite",
    slug: "essence-of-africa",
    title: "The Wilderness",
    eyebrow: "Essence & Yosemite",
    keywords: "Acacia Flower • Sandalwood • Pine • Frankincense",
    image: images.collectionAfrica,
    alt: "Artisan coconut apricot wax candle jars — Africa & Yosemite Collections",
    badge: "Pure Botanicals",
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
      className="relative min-h-[620px] lg:min-h-[700px] flex items-center bg-ivory overflow-hidden py-12 md:py-16"
      aria-labelledby={headingId}
    >
      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(160px,24vw)] opacity-[0.34] hidden sm:block pointer-events-none"
      />
      <FloralCorner
        corner="tr"
        className="absolute right-0 top-0 w-[min(160px,24vw)] opacity-[0.34] hidden sm:block pointer-events-none"
      />
      <FloralCorner
        corner="bl"
        className="absolute left-0 bottom-0 w-[min(130px,20vw)] opacity-[0.25] hidden lg:block pointer-events-none"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(130px,20vw)] opacity-[0.25] hidden lg:block pointer-events-none"
      />

      <div className="container-editorial relative z-10 w-full">
        {/* Brand Header */}
        <header className="mx-auto mb-8 md:mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-gold/60" />
            <p className="text-eyebrow text-burgundy !tracking-[0.32em]">
              Candle Artistry Design Co.
            </p>
            <span className="h-px w-6 bg-gold/60" />
          </div>
          <h2
            id={headingId}
            className="text-section text-ink tracking-[0.04em] font-light leading-tight"
          >
            What moment do you want to experience?
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-12 bg-gold/45" />
            <DiamondMark className="h-2 w-2 shrink-0" />
            <div className="h-px w-12 bg-gold/45" />
          </div>
          <p className="mt-3 text-body text-taupe max-w-2xl mx-auto text-[0.88rem] md:text-[0.96rem] leading-relaxed">
            Hand-poured in Coarsegold, CA with pure Coconut Apricot & Soy wax, lead-free cotton wicks, and phthalate-free fine fragrances. Each vessel holds a story waiting to be lit.
          </p>
        </header>

        {/* 4 Brand Candle Moments Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch">
          {candleMoments.map((moment) => (
            <Link
              key={moment.id}
              to={`/candles/${moment.slug}`}
              className="group relative flex flex-col rounded-2xl border border-gold/35 bg-[#fcf9f4] p-3.5 md:p-4 shadow-[0_8px_24px_rgba(40,25,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_16px_36px_rgba(92,16,24,0.14)]"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="font-serif text-[0.62rem] uppercase tracking-[0.24em] text-burgundy font-medium">
                  {moment.eyebrow}
                </span>
                <span className="rounded-full bg-champagne/80 px-2 py-0.5 text-[0.58rem] font-medium tracking-wider text-taupe uppercase border border-gold/25">
                  {moment.badge}
                </span>
              </div>

              {/* Candle Product Mockup Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-champagne/40 border border-gold/25 flex items-center justify-center">
                <img
                  src={moment.image}
                  alt={moment.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = images.candles;
                  }}
                />
                {/* Subtle Luxury Sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(32,15,10,0.35)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-2.5 inset-x-0 flex justify-center opacity-0 transition-all duration-300 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="rounded-full bg-[#5c1018] px-3 py-1 font-serif text-[0.62rem] tracking-[0.2em] uppercase text-[#fcf8f2] shadow-sm">
                    Enter Collection →
                  </span>
                </div>
              </div>

              {/* Candle Details */}
              <div className="mt-3.5 flex flex-col flex-1 text-center px-1">
                <h3 className="font-serif text-[1.05rem] md:text-[1.12rem] tracking-[0.14em] uppercase text-ink font-medium">
                  {moment.title}
                </h3>
                <p className="mt-1.5 mb-2 font-serif italic text-[0.76rem] md:text-[0.82rem] leading-relaxed text-taupe">
                  {moment.keywords}
                </p>
                <div className="mt-auto pt-2 border-t border-gold/20 flex items-center justify-center gap-1.5 text-[0.7rem] uppercase tracking-wider text-burgundy group-hover:text-gold transition-colors font-medium">
                  <span>Explore Fragrances</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-12 text-center">
          <Link
            to="/candles"
            className="outline-btn !border-burgundy !text-burgundy hover:!bg-burgundy hover:!text-[#FBF8F2] shadow-xs"
          >
            View All 6 Collections <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
