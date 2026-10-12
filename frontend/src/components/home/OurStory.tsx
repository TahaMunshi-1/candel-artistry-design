import { useState } from "react";
import { Link } from "react-router";
import { images } from "../../constants/images";

const beats = [
  {
    id: "mother",
    chapter: "I · A Mother’s Light",
    heading: "Held close. Always.",
    body: "Before there were candles and illustrated labels, there was this — Alda’s smile beside Katherine’s. Every scent, every story, every golden detail began as devotion made visible.",
    image: images.familyMotherDaughter,
    alt: "Alda and Katherine smiling together, heads leaning close",
    layout: "image-left" as const,
  },
  {
    id: "father",
    chapter: "II · A Father’s Tale",
    heading: "Pages shared. Worlds imagined.",
    body: "Side by side with an open book, Katherine and I lingered in wonder. That is the heart of Candle Artistry Design: storytelling you can hold — romance, mystery, and magic poured into wax and art.",
    image: images.familyFatherDaughter,
    alt: "Jeff and Katherine sharing a book on the sofa, smiling",
    layout: "image-right" as const,
  },
  {
    id: "daughter",
    chapter: "III · The Reason",
    heading: "Our brightest flame.",
    body: "For her, we shaped gardens and daydreams — and a brand where fantasy feels like home. Candle Artistry Design is our kingdom made real: handcrafted light, storybook artistry, and a love that never dimmed.",
    image: images.familyDaughterGarden,
    alt: "Katherine smiling outdoors in the garden built with love",
    layout: "wide" as const,
  },
];

export default function OurStory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="our-story"
      className="our-story relative overflow-hidden text-[var(--ivory,#f3ebe0)] transition-all duration-500"
      aria-labelledby="our-story-heading"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(90,40,35,0.28), transparent 42%), linear-gradient(180deg, #030105 0%, #10080a 28%, #0a0608 70%, #030105 100%)",
      }}
    >
      <div
        className={`container-editorial relative z-[1] transition-all duration-500 ${
          isOpen ? "py-16 md:py-24" : "py-12 md:py-16"
        }`}
      >
        <header className="mx-auto max-w-2xl text-center">
          <div
            className="mx-auto mb-5 h-px w-20"
            style={{
              background: "linear-gradient(90deg, transparent, #e4d2a8, transparent)",
              boxShadow: "0 0 14px rgba(232,212,168,0.4)",
            }}
            aria-hidden
          />
          <p className="font-[Cinzel,serif] text-[0.62rem] uppercase tracking-[0.36em] text-[#e4d2a8]">
            Our Family • Our Heart
          </p>
          <h2
            id="our-story-heading"
            className="mt-3 font-[Cinzel,serif] text-[clamp(1.55rem,3.6vw,2.35rem)] font-medium uppercase leading-tight tracking-[0.12em] text-[#e4d2a8]"
          >
            The Story Behind the Flame
          </h2>

          {/* Interactive dropdown arrow toggle button */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="our-story-dropdown-content"
              className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#e4d2a8]/40 bg-[#160a0d]/90 hover:bg-[#251014] hover:border-[#e4d2a8] text-[#e4d2a8] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <span className="font-[Cinzel,serif] text-[0.68rem] tracking-[0.24em] uppercase font-medium">
                {isOpen ? "Hide Story" : "Reveal Our Story"}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </header>

        {/* Story details and images revealed only when dropdown arrow is toggled open */}
        {isOpen && (
          <div
            id="our-story-dropdown-content"
            className="animate-in fade-in slide-in-from-top-4 duration-500 mt-10 md:mt-12"
          >
            <p className="mx-auto max-w-2xl text-center font-[Cormorant_Garamond,Georgia,serif] text-[clamp(1.05rem,2vw,1.25rem)] font-light italic leading-relaxed text-[rgba(244,235,225,0.82)] mb-14 md:mb-20">
              The kingdom was never only a fairy tale. It is a love letter — written by
              my wife Alda and I, building a world of beauty for our daughter Katherine.
            </p>

        <div className="mx-auto flex max-w-5xl flex-col gap-16 md:gap-24">
          {beats.map((beat) => {
            if (beat.layout === "wide") {
              return (
                <article key={beat.id} className="grid gap-6 text-center">
                  <figure className="our-story__frame mx-auto max-w-md overflow-hidden md:max-w-lg">
                    <img
                      src={beat.image}
                      alt={beat.alt}
                      className="aspect-[4/5] h-auto w-full object-cover object-[18%_18%] md:object-[20%_15%]"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = images.hero;
                      }}
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
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = images.hero;
                    }}
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
          <Link
            to="/our-story"
            className="mt-6 inline-flex items-center gap-2 font-[Cinzel,serif] text-[0.62rem] uppercase tracking-[0.28em] text-[#e4d2a8] border-b border-[#e4d2a8]/50 pb-1 transition-colors hover:text-[#f3ebe0]"
          >
            Read the family story <span aria-hidden>→</span>
          </Link>
        </footer>
          </div>
        )}
      </div>
    </section>
  );
}
