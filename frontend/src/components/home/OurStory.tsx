import { images } from "../../constants/images";

const beats = [
  {
    id: "mother",
    chapter: "I · A Mother’s Light",
    heading: "Held close. Always.",
    body: "Before there were candles and illustrated labels, there was this — a mother’s smile beside her daughter’s. Every scent, every story, every golden detail began as devotion made visible.",
    image: images.familyMotherDaughter,
    alt: "Mother and daughter smiling together, heads leaning close",
    layout: "image-left" as const,
  },
  {
    id: "father",
    chapter: "II · A Father’s Tale",
    heading: "Pages shared. Worlds imagined.",
    body: "Side by side with an open book, a father and daughter lingered in wonder. That is the heart of Candle Artistry Design: storytelling you can hold — romance, mystery, and magic poured into wax and art.",
    image: images.familyFatherDaughter,
    alt: "Father and daughter sharing a book on the sofa, smiling",
    layout: "image-right" as const,
  },
  {
    id: "daughter",
    chapter: "III · The Reason",
    heading: "Their brightest flame.",
    body: "For her, they shaped gardens and daydreams — and a brand where fantasy feels like home. Candle Artistry Design is their kingdom made real: handcrafted light, storybook artistry, and a love that never dimmed.",
    image: images.familyDaughterGarden,
    alt: "Their daughter smiling outdoors in the garden built with love",
    layout: "wide" as const,
  },
];

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="our-story relative overflow-hidden text-[var(--ivory,#f3ebe0)]"
      aria-labelledby="our-story-heading"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(90,40,35,0.28), transparent 42%), linear-gradient(180deg, #030105 0%, #10080a 28%, #0a0608 70%, #030105 100%)",
      }}
    >
      <div className="container-editorial relative z-[1] py-16 md:py-24">
        <header className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <div
            className="mx-auto mb-5 h-px w-20"
            style={{
              background: "linear-gradient(90deg, transparent, #e4d2a8, transparent)",
              boxShadow: "0 0 14px rgba(232,212,168,0.4)",
            }}
            aria-hidden
          />
          <p className="font-[Cinzel,serif] text-[0.62rem] uppercase tracking-[0.36em] text-[#e4d2a8]">
            End of Prologue
          </p>
          <h2
            id="our-story-heading"
            className="mt-3 font-[Cinzel,serif] text-[clamp(1.55rem,3.6vw,2.35rem)] font-medium uppercase leading-tight tracking-[0.12em] text-[#e4d2a8]"
          >
            The Story Behind the Flame
          </h2>
          <p className="mt-5 font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1.05rem,2vw,1.25rem)] font-light italic leading-relaxed text-[rgba(244,235,225,0.82)]">
            The kingdom was never only a fairy tale. It was a love letter — written by
            parents who built a world of beauty for their daughter.
          </p>
        </header>

        <div className="mx-auto flex max-w-5xl flex-col gap-16 md:gap-24">
          {beats.map((beat) => {
            if (beat.layout === "wide") {
              return (
                <article key={beat.id} className="grid gap-6 text-center">
                  <figure className="our-story__frame overflow-hidden">
                    <img
                      src={beat.image}
                      alt={beat.alt}
                      className="h-auto max-h-[min(62vh,520px)] w-full object-cover object-[center_35%]"
                      loading="lazy"
                    />
                  </figure>
                  <div className="mx-auto max-w-xl">
                    <p className="font-[Cinzel,serif] text-[0.58rem] uppercase tracking-[0.34em] text-[#e4d2a8]">
                      {beat.chapter}
                    </p>
                    <h3 className="mt-2 font-[Cinzel,serif] text-[clamp(1.2rem,2.4vw,1.65rem)] font-medium tracking-[0.08em] text-[#f3ebe0]">
                      {beat.heading}
                    </h3>
                    <p className="mt-3 font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1rem,1.7vw,1.12rem)] font-light italic leading-relaxed text-[rgba(244,235,225,0.84)]">
                      {beat.body}
                    </p>
                  </div>
                </article>
              );
            }

            const imageFirst = beat.layout === "image-left";
            return (
              <article
                key={beat.id}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <figure
                  className={`our-story__frame overflow-hidden ${imageFirst ? "" : "md:order-2"}`}
                >
                  <img
                    src={beat.image}
                    alt={beat.alt}
                    className="aspect-[4/3] h-auto w-full object-cover object-[center_30%]"
                    loading="lazy"
                  />
                </figure>
                <div className={imageFirst ? "" : "md:order-1"}>
                  <p className="font-[Cinzel,serif] text-[0.58rem] uppercase tracking-[0.34em] text-[#e4d2a8]">
                    {beat.chapter}
                  </p>
                  <h3 className="mt-2 font-[Cinzel,serif] text-[clamp(1.2rem,2.4vw,1.65rem)] font-medium tracking-[0.08em] text-[#f3ebe0]">
                    {beat.heading}
                  </h3>
                  <p className="mt-3 font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1rem,1.7vw,1.12rem)] font-light italic leading-relaxed text-[rgba(244,235,225,0.84)]">
                    {beat.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="mx-auto mt-16 max-w-lg text-center md:mt-24">
          <div
            className="mx-auto mb-5 h-px w-20"
            style={{
              background: "linear-gradient(90deg, transparent, #e4d2a8, transparent)",
            }}
            aria-hidden
          />
          <p className="font-[Cinzel,serif] text-[clamp(1rem,2vw,1.2rem)] uppercase tracking-[0.28em] text-[#e4d2a8]">
            Candle Artistry Design
          </p>
          <p className="mt-3 font-[Cormorant_Garamond,Georgia,serif] text-[1.1rem] font-light italic text-[rgba(244,235,225,0.78)]">
            Built with love — for the daughter who lit the way.
          </p>
        </footer>
      </div>
    </section>
  );
}
