import { images } from "../../constants/images";
import { BotanicalPetal, FloralCorner } from "../decor/BotanicalAssets";

/** Romance collection cards — Bailando → Velvet Kiss → Golden Moment */
const strip = [
  {
    src: images.featuredStrip1,
    alt: "Bailando — couple dancing in a sunlit Havana salon",
    label: "Bailando",
  },
  {
    src: images.featuredStrip2,
    alt: "Velvet Kiss — gothic romance portrait",
    label: "Velvet Kiss",
  },
  {
    src: images.featuredStrip3,
    alt: "Golden Moment — mother and child at a toy shop window",
    label: "Golden Moment",
  },
];

const royalBg = "#5c1018";

export default function FeaturedCollection() {
  return (
    <section
      id="featured"
      className="relative band-height flex items-center overflow-hidden [container-type:size]"
      style={{
        background:
          "radial-gradient(ellipse at 28% 35%, #7a1824 0%, transparent 55%), radial-gradient(ellipse at 78% 70%, #4a0a10 0%, transparent 50%), linear-gradient(165deg, #6b1420 0%, #5c1018 42%, #3a080c 100%)",
      }}
      aria-labelledby="featured-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: `url(${images.featuredRoyalStill})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          opacity: 0.42,
          mixBlendMode: "soft-light",
          filter: "saturate(1.05) contrast(1.05)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[58%] hidden md:block"
        aria-hidden
        style={{
          backgroundImage: `url(${images.featuredRoyalStill})`,
          backgroundSize: "cover",
          backgroundPosition: "72% center",
          opacity: 0.28,
          mixBlendMode: "multiply",
          maskImage: "linear-gradient(90deg, transparent 0%, black 35%, black 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 35%, black 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(105deg, rgba(58,8,12,0.55) 0%, rgba(92,16,24,0.25) 38%, rgba(58,8,12,0.45) 100%)",
        }}
      />

      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(200px,32vw)] opacity-[0.28] hidden md:block z-[1] brightness-110"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(180px,28vw)] opacity-[0.24] hidden md:block z-[1] brightness-110"
      />
      <BotanicalPetal
        className="absolute -left-4 top-[28%] h-40 opacity-[0.35] hidden lg:block brightness-125"
        rotate={-12}
      />
      <BotanicalPetal
        className="absolute -right-2 bottom-[22%] h-36 opacity-[0.32] hidden lg:block brightness-125"
        flip
        rotate={18}
      />

      <div className="container-editorial relative z-[2] w-full py-3 md:py-4 h-full flex items-center">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)_minmax(108px,124px)] xl:grid-cols-[auto_minmax(0,1fr)_minmax(116px,132px)] gap-4 lg:gap-5 xl:gap-7 items-center justify-items-center lg:justify-items-start">
          {/* Night Mood — full square art, no crop, sized to the band */}
          <div
            className="group relative mx-auto shrink-0 overflow-hidden rounded-[2px] shadow-[0_20px_50px_rgba(26,4,8,0.45)] ring-1 ring-gold/40"
            style={{
              backgroundColor: royalBg,
              width: "min(520px, calc(100cqh - 2rem))",
              height: "min(520px, calc(100cqh - 2rem))",
              maxWidth: "100%",
            }}
          >
            <img
              src={`${images.featuredMain}?v=royal`}
              alt="Night Mood — romantic candle label artwork by Candle Artistry Design"
              className="img-zoom absolute inset-0 h-full w-full object-contain object-center"
              loading="lazy"
            />
          </div>

          <div className="relative flex flex-col justify-center px-2 sm:px-3 lg:px-5 xl:px-8 py-1">
            <div
              className="hidden lg:block absolute left-0 top-[14%] bottom-[14%] w-px bg-[rgba(216,193,154,0.45)]"
              aria-hidden
            />

            <p className="text-eyebrow !text-[#E8D8C4] text-center lg:text-left">
              Featured Collection
            </p>
            <h2
              id="featured-heading"
              className="mt-2.5 text-section uppercase text-[#FBF8F2] text-center lg:text-left tracking-[0.12em] drop-shadow-[0_2px_12px_rgba(26,4,8,0.45)]"
            >
              The Romance
            </h2>
            <p className="mt-2.5 text-lead text-[#EFE3D2] text-center lg:text-left">
              Candlelight. Music. Someone you love.
            </p>
            <p className="mt-3 max-w-md mx-auto lg:mx-0 text-body text-[#D8C19A]/90 text-center lg:text-left">
              A collection inspired by the most beautiful kind of chaos — love. A
              moment that lingers, a feeling that stays.
            </p>
            <div className="mt-5 text-center lg:text-left">
              <a
                href="#shop"
                className="outline-btn !border-[#D8C19A] !text-[#FBF8F2] hover:!bg-[#D8C19A]/15 hover:!border-[#F5EBD8]"
              >
                Discover this Moment <span className="arrow">→</span>
              </a>
            </div>
          </div>

          {/* Square stack */}
          <div className="hidden lg:flex flex-col gap-2 self-center">
            {strip.map((item) => (
              <a
                key={item.label}
                href="#shop"
                className="group relative aspect-square w-full overflow-hidden rounded-[2px] ring-1 ring-gold/35 shadow-[0_10px_24px_rgba(26,4,8,0.35)] transition-transform duration-500 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                style={{ backgroundColor: royalBg }}
              >
                <img
                  src={`${item.src}?v=royal`}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-2.5">
            {strip.map((item) => (
              <a
                key={item.label}
                href="#shop"
                className="group relative aspect-square overflow-hidden rounded-[2px] ring-1 ring-gold/35"
                style={{ backgroundColor: royalBg }}
              >
                <img
                  src={`${item.src}?v=royal`}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-contain object-center"
                  loading="lazy"
                />
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
