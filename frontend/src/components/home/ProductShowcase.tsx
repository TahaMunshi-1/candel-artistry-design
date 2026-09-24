import { useEffect, useRef } from "react";
import { images } from "../../constants/images";
import { BotanicalPetal, FloralCorner } from "../decor/BotanicalAssets";
import { DiamondMark } from "../decor/Ornaments";

const chapters = [
  {
    id: "vampire",
    eyebrow: "Chapter I",
    title: "Vampire Collection",
    line: "Midnight rituals. Velvet shadows. Desire lit.",
    image: images.craftVampire,
    alt: "Vampire Collection — four black glass candles on an ornate gold tray",
    align: "left" as const,
  },
  {
    id: "romance",
    eyebrow: "Chapter II",
    title: "Romance Collection",
    line: "Candlelight. Music. A moment that lingers.",
    image: images.craftRomance,
    alt: "Romance Collection — ivory soy candles with gold lids on leather-bound books",
    align: "right" as const,
  },
  {
    id: "rodeo",
    eyebrow: "Chapter III",
    title: "Rodeo Collection",
    line: "Dust, dusk, and stories told under open sky.",
    image: images.craftRodeo,
    alt: "Rodeo Collection — western-themed candles with velvet and rope",
    align: "left" as const,
  },
  {
    id: "atelier",
    eyebrow: "Chapter IV",
    title: "Atelier Still Life",
    line: "Stories poured in gold light — waiting to be lit.",
    image: images.craftAtelier,
    alt: "Atelier still life — colored glass candles among books, pearls, and roses",
    align: "right" as const,
  },
];

export default function ProductShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll("[data-craft-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="shop"
      className="craft-section relative overflow-hidden bg-ivory"
      aria-labelledby="shop-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 12%, #5c1018 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #b99a68 0%, transparent 42%)",
        }}
        aria-hidden
      />

      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 z-[1] w-[min(200px,32vw)] opacity-[0.34] hidden md:block"
      />
      <FloralCorner
        corner="tr"
        className="absolute right-0 top-0 z-[1] w-[min(200px,32vw)] opacity-[0.34] hidden md:block"
      />
      <FloralCorner
        corner="bl"
        className="absolute left-0 bottom-0 z-[1] w-[min(160px,26vw)] opacity-[0.26] hidden lg:block"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 z-[1] w-[min(160px,26vw)] opacity-[0.26] hidden lg:block"
      />
      <BotanicalPetal
        className="absolute left-0 top-[42%] z-[1] h-40 opacity-[0.26] hidden xl:block"
        rotate={-12}
      />
      <BotanicalPetal
        className="absolute right-0 bottom-[28%] z-[1] h-36 opacity-[0.24] hidden xl:block"
        flip
        rotate={12}
      />

      <div className="container-editorial relative z-[2] pt-8 md:pt-10 lg:pt-12 pb-5 md:pb-6">
        <div
          className="craft-reveal mx-auto max-w-xl text-center"
          data-craft-reveal
          style={{ transitionDelay: "40ms" }}
        >
          <p className="text-eyebrow text-burgundy">The Collection</p>
          <p className="mt-1.5 text-lead text-taupe !text-[0.95rem]">
            Artfully Crafted. Intentionally Lit.
          </p>
          <h2
            id="shop-heading"
            className="mt-3 text-section text-ink tracking-[0.03em]"
          >
            Handcrafted soy candles —
            <br />
            each vessel a story.
          </h2>
          <div className="mt-2.5 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-8 bg-gold/45" />
            <DiamondMark className="h-1.5 w-1.5 shrink-0" />
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <p className="mt-3 text-body text-taupe">
            Four worlds from the atelier — shown exactly as they are meant to
            be seen.
          </p>
        </div>
      </div>

      <div className="relative z-[2] space-y-7 md:space-y-8 lg:space-y-9 pb-10 md:pb-12">
        {chapters.map((ch, i) => (
          <article
            key={ch.id}
            id={ch.id}
            className={`container-editorial craft-chapter craft-reveal ${
              ch.align === "right" ? "craft-chapter--flip" : ""
            }`}
            data-craft-reveal
            style={{ transitionDelay: `${60 + i * 50}ms` }}
          >
            <div className="craft-chapter__media">
              <figure className="craft-frame group m-0">
                <div className="craft-frame__inner relative overflow-hidden bg-champagne">
                  <img
                    src={`${ch.image}?v=craft2`}
                    alt={ch.alt}
                    width={1024}
                    height={768}
                    className="craft-zoom block h-auto w-full aspect-[4/3] object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
            </div>

            <div className="craft-chapter__copy">
              <p className="text-eyebrow text-burgundy/80 !tracking-[0.28em]">
                {ch.eyebrow}
              </p>
              <div className="mt-2 flex items-center gap-3 text-gold/70">
                <div className="h-px w-8 bg-gold/45" />
                <DiamondMark className="h-1.5 w-1.5 shrink-0" />
              </div>
              <h3 className="mt-2 font-serif font-light text-[clamp(1.35rem,2.5vw,1.95rem)] tracking-[0.08em] uppercase text-ink leading-[1.15]">
                {ch.title}
              </h3>
              <p className="mt-2 text-lead text-taupe !text-[0.98rem]">
                {ch.line}
              </p>
              <a
                href={`#${ch.id}`}
                className="mt-3.5 inline-flex items-center gap-2 font-serif text-[0.72rem] tracking-[0.24em] uppercase text-ink border-b border-gold/55 pb-1 transition-colors duration-500 hover:border-burgundy hover:text-burgundy"
              >
                Enter the collection <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
