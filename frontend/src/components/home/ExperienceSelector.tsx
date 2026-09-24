import { images } from "../../constants/images";
import { DiamondMark } from "../decor/Ornaments";
import { FloralCorner } from "../decor/BotanicalAssets";

/** New framed artworks (section 2) */
const framedMoments = [
  {
    id: "romance",
    title: "The Romance",
    keywords: "Silk • Roses • Candlelight • Desire",
    image: images.experienceRomance,
    alt: "Victorian couple embracing at a moonlit train station — The Romance",
  },
  {
    id: "mystery",
    title: "The Mystery",
    keywords: "Shadow • Candlelight • Crypt • Intrigue",
    image: images.experienceMystery,
    alt: "Ornate crypt with candlelight and a coffin ajar — The Mystery",
  },
  {
    id: "cabin",
    title: "The Cabin",
    keywords: "Barn • Meadow • Sunset • Home",
    image: images.experienceCabin,
    alt: "Black horse at a rustic barn fence under golden sunset — The Cabin",
  },
  {
    id: "wilderness",
    title: "The Wilderness",
    keywords: "Pine • Mountains • River • Open Sky",
    image: images.experienceWilderness,
    alt: "Man and dog overlooking a mountain valley at sunset — The Wilderness",
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
  const idPrefix = id === "experience" ? "" : `${id}-`;
  const moments = framedMoments;
  const cacheKey = "vivid1";

  return (
    <section
      id={id}
      className="relative band-height flex items-center bg-ivory overflow-hidden [container-type:size]"
      aria-labelledby={headingId}
    >
      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(160px,28vw)] opacity-[0.38] hidden sm:block"
      />
      <FloralCorner
        corner="tr"
        className="absolute right-0 top-0 w-[min(160px,28vw)] opacity-[0.38] hidden sm:block"
      />
      <FloralCorner
        corner="bl"
        className="absolute left-0 bottom-0 w-[min(130px,22vw)] opacity-[0.28] hidden lg:block"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(130px,22vw)] opacity-[0.28] hidden lg:block"
      />

      <img
        src={images.botanical}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[45%] w-auto max-w-[80px] opacity-[0.28] hidden xl:block select-none decor-gold"
      />
      <img
        src={images.botanical}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[45%] w-auto max-w-[80px] opacity-[0.28] hidden xl:block select-none scale-x-[-1] decor-gold"
      />

      <div className="container-editorial relative z-10 w-full py-2 md:py-3 h-full flex flex-col justify-center">
        <header className="mx-auto mb-2.5 md:mb-3 max-w-3xl text-center shrink-0">
          <img
            src={images.botanical}
            alt=""
            aria-hidden
            className="mx-auto mb-2 h-5 w-auto opacity-40 rotate-90 object-contain select-none"
          />
          <p className="text-eyebrow text-burgundy">Moments</p>
          <h2
            id={headingId}
            className="mt-2 text-section text-ink tracking-[0.04em] font-light"
          >
            What moment do you want to experience?
          </h2>
          <div className="mt-2.5 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-10 bg-gold/45" />
            <DiamondMark className="h-1.5 w-1.5 shrink-0" />
            <div className="h-px w-10 bg-gold/45" />
          </div>
        </header>

        <ul className="m-0 grid list-none grid-cols-2 gap-y-3 gap-x-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 p-0 items-end content-center flex-1 min-h-0">
          {moments.map((moment) => (
            <li key={`${idPrefix}${moment.id}`} className="min-w-0 flex justify-center">
              <a
                href={`#${idPrefix}${moment.id}`}
                className="group flex w-full max-w-[270px] flex-col items-center text-center"
              >
                <div
                  className="experience-art relative w-full mx-auto"
                  style={{
                    height: "min(440px, calc(100cqh - 7.5rem))",
                    maxWidth: "min(300px, 100%)",
                  }}
                >
                  <img
                    src={`${moment.image}?v=${cacheKey}`}
                    alt={moment.alt}
                    className="experience-art__img absolute inset-0 h-full w-full object-contain object-center"
                    loading="eager"
                    decoding="async"
                    width={1536}
                    height={2048}
                  />
                  <span className="experience-art__veil" aria-hidden />
                </div>

                <div className="mt-2 w-full px-1">
                  <h3 className="m-0 font-serif text-[0.88rem] md:text-[0.95rem] tracking-[0.18em] uppercase text-ink">
                    {moment.title}
                  </h3>
                  <p className="mt-1.5 mb-0 font-serif italic text-[0.72rem] md:text-[0.78rem] leading-relaxed text-taupe tracking-wide">
                    {moment.keywords}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
