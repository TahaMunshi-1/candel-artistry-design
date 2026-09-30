import { images } from "../../constants/images";
import { FloralCorner, BotanicalPetal, PetalAccent } from "../decor/BotanicalAssets";
import { DiamondMark } from "../decor/Ornaments";

const greetingCards = [
  {
    id: "card-romance",
    name: "Garden Reverie",
    image: images.experienceClassic4,
    alt: "Greeting card — winged figure in a flower garden at sunset",
  },
  {
    id: "card-mystery",
    name: "Moonlit Raven",
    image: images.experienceClassic2,
    alt: "Greeting card — enchanted forest with lantern and raven",
  },
  {
    id: "card-cabin",
    name: "Lantern Evening",
    image: images.experienceClassic3,
    alt: "Greeting card — moonlit balcony with lantern and roses",
  },
  {
    id: "card-wilderness",
    name: "Open Sky",
    image: images.experienceClassic1,
    alt: "Greeting card — golden-winged figure beneath an open sky",
  },
];

export default function GreetingCardsGallery() {
  return (
    <section
      id="experience-gallery"
      className="relative band-height flex items-center overflow-hidden bg-ivory [container-type:size]"
      aria-labelledby="greeting-cards-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, #5c1018 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(160px,28vw)] opacity-[0.34] hidden md:block"
      />
      <FloralCorner
        corner="tr"
        className="absolute right-0 top-0 w-[min(160px,28vw)] opacity-[0.34] hidden md:block"
      />
      <FloralCorner
        corner="bl"
        className="absolute left-0 bottom-0 w-[min(130px,22vw)] opacity-[0.26] hidden lg:block"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(130px,22vw)] opacity-[0.26] hidden lg:block"
      />
      <BotanicalPetal
        className="absolute left-0 top-[42%] -translate-y-1/2 h-32 opacity-[0.26] hidden xl:block"
        rotate={-10}
      />
      <BotanicalPetal
        className="absolute right-0 top-[42%] -translate-y-1/2 h-32 opacity-[0.26] hidden xl:block"
        flip
        rotate={10}
      />

      <div className="container-editorial relative z-[1] w-full py-2 md:py-3 h-full flex flex-col justify-center">
        <nav
          className="relative mb-2 md:mb-2.5"
          aria-label="Product categories"
        >
          <PetalAccent className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-auto rotate-90 opacity-80 hidden sm:block" />
          <PetalAccent className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-auto -rotate-90 scale-x-[-1] opacity-80 hidden sm:block" />
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="hidden sm:block h-px flex-1 max-w-[100px] bg-gold/40" />
            <DiamondMark className="h-2 w-2 text-gold shrink-0" />
            <p className="font-serif text-[0.62rem] md:text-[0.68rem] tracking-[0.28em] uppercase text-taupe text-center leading-relaxed">
              Candles
              <span className="mx-2 md:mx-3 text-gold">•</span>
              Original Paintings
              <span className="mx-2 md:mx-3 text-gold">•</span>
              Greeting Cards
            </p>
            <DiamondMark className="h-2 w-2 text-gold shrink-0" />
            <div className="hidden sm:block h-px flex-1 max-w-[100px] bg-gold/40" />
          </div>
        </nav>

        <div className="mx-auto mb-2 md:mb-2.5 max-w-xl text-center">
          <p className="text-eyebrow text-burgundy">The Artistry</p>
          <h2
            id="greeting-cards-heading"
            className="mt-2 text-section text-ink tracking-[0.04em]"
          >
            Every moment begins with an image.
          </h2>
          <div className="mt-1.5 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-8 bg-gold/45" />
            <DiamondMark className="h-1.5 w-1.5 shrink-0" />
            <div className="h-px w-8 bg-gold/45" />
          </div>
        </div>

        <ul className="m-0 mx-auto grid w-full list-none grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-2 sm:gap-x-5 lg:gap-x-6 p-0 items-end flex-1 min-h-0 content-center">
          {greetingCards.map((card) => (
            <li key={card.id} className="min-w-0 flex justify-center h-full items-end">
              <a
                href="#shop"
                className="group relative block w-full max-w-[270px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <div
                  className="relative w-full mx-auto transition-transform duration-700 ease-out group-hover:-translate-y-1"
                  style={{
                    height: "min(400px, calc(100cqh - 8.5rem))",
                    maxWidth: "min(270px, 100%)",
                  }}
                >
                  <img
                    src={`${card.image}?v=classic2`}
                    alt={card.alt}
                    className="absolute inset-0 h-full w-full object-contain object-center drop-shadow-[0_14px_28px_rgba(64,51,43,0.18)] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:drop-shadow-[0_20px_36px_rgba(92,16,24,0.22)]"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-serif text-[0.55rem] tracking-[0.28em] uppercase text-[#FBF8F2] bg-[rgba(92,16,24,0.88)] px-2.5 py-1 shadow-sm">
                      View card
                    </span>
                  </div>
                </div>

                <span className="sr-only">{card.name} greeting card</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-2 md:mt-2.5 text-center shrink-0">
          <a
            href="#shop"
            className="outline-btn !border-burgundy !text-burgundy hover:!bg-burgundy hover:!text-[#FBF8F2]"
          >
            Explore the Artistry <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
