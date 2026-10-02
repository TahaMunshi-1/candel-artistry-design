import ShopPageShell from "../../components/shop/ShopPageShell";
import { images } from "../../constants/images";

/**
 * Client-authored Our Story (Jeff Fontano) — keep Alex's cinematic home section separate.
 * Copy follows upgrade Story.pdf; light web line-length polish only.
 */
export default function OurStoryPage() {
  return (
    <ShopPageShell>
      <article
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(92,16,24,0.06), transparent 42%), linear-gradient(180deg, #fbf8f2 0%, #f7f1e7 55%, #efe3d2 100%)",
        }}
      >
        <div className="container-editorial relative z-[1] py-14 md:py-20">
          <header className="mx-auto max-w-2xl text-center">
            <div
              className="mx-auto mb-5 h-px w-20"
              style={{
                background: "linear-gradient(90deg, transparent, #b99a68, transparent)",
              }}
              aria-hidden
            />
            <h1 className="font-display text-[clamp(2rem,5vw,3.1rem)] font-medium uppercase tracking-[0.14em] text-royal">
              Our Story
            </h1>
            <p className="mt-3 font-display text-[0.62rem] uppercase tracking-[0.36em] text-gold">
              Candle Artistry Design
            </p>
          </header>

          <div className="mx-auto mt-12 max-w-2xl space-y-6 font-serif text-[1.08rem] leading-[1.75] text-ink/90 md:text-[1.15rem]">
            <p>
              Candle Artistry Design began as a family love letter — written by{" "}
              <strong className="font-medium text-royal">Jeff Fontano</strong>, inspired by
              his wife <strong className="font-medium text-royal">Alda</strong>, and lit by
              their daughter <strong className="font-medium text-royal">Katherine</strong>,
              who has special needs.
            </p>

            <h2 className="!mt-12 font-serif text-[1.2rem] font-medium italic tracking-[0.02em] text-royal md:text-[1.35rem]">
              Let&apos;s Connect the Dots!
            </h2>
            <p>
              Watching Katherine&apos;s quiet captivation with a candle flame turned a
              simple hobby into something deeper. What started as warmth on a table became
              a craft — soy candles poured with intention, each vessel carrying a story.
            </p>

            <h2 className="!mt-12 font-serif text-[1.2rem] font-medium italic tracking-[0.02em] text-royal md:text-[1.35rem]">
              Candle Artistry Design is Born.
            </h2>
            <p>
              Jeff is also an Impressionist oil painter. That same eye for light, color,
              and feeling found its way onto the labels — so every candle is{" "}
              <em>Artfully Crafted and Intentionally Lit</em>. The brand exists to build
              beauty you can hold, and to help provide for Katherine&apos;s future quality
              of life.
            </p>

            <h2 className="!mt-12 font-serif text-[1.2rem] font-medium italic tracking-[0.02em] text-royal md:text-[1.35rem]">
              A Brand unlike any other.
            </h2>
            <p>
              Collections are shaped around real moments and passions — romance, mystery,
              open sky, seasonal ritual — so the scent and the image speak as one. This is
              not mass fragrance. It is atelier storytelling in wax and paint.
            </p>

            <h2 className="!mt-12 font-serif text-[1.2rem] font-medium italic tracking-[0.02em] text-royal md:text-[1.35rem]">
              A Niche! Not one, but several.
            </h2>
            <p>
              From horror-inspired evenings to quiet Sundays and wilderness hush, each
              collection invites a different guest to the table. Candle Artistry Design is
              their kingdom made real — handcrafted light, storybook artistry, and a love
              that never dimmed.
            </p>
          </div>

          {/* Photo collage — PDF layout: large left + two stacked right */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-[1.15fr_0.85fr] md:gap-6">
            <figure className="story-frame m-0 overflow-hidden ring-1 ring-[rgba(92,16,24,0.18)]">
              <img
                src={images.familyFatherDaughter}
                alt="Jeff and Katherine sharing a book together"
                className="aspect-[4/5] h-full w-full object-cover object-[center_22%]"
                loading="lazy"
              />
            </figure>

            <div className="grid gap-5 md:gap-6">
              <figure className="story-frame m-0 overflow-hidden ring-1 ring-[rgba(92,16,24,0.18)]">
                <img
                  src={images.familyMotherDaughter}
                  alt="Alda and Katherine smiling together"
                  className="aspect-[4/3] w-full object-cover object-[center_28%]"
                  loading="lazy"
                />
              </figure>
              <figure className="story-frame m-0 overflow-hidden ring-1 ring-[rgba(92,16,24,0.18)]">
                {/* Portrait crop — avoid wide banner stretch on Katherine's features */}
                <img
                  src={images.familyDaughterGarden}
                  alt="Katherine outdoors in the garden"
                  className="aspect-[4/5] w-full object-cover object-[18%_18%] md:object-[20%_15%]"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>

          <p className="mx-auto mt-14 max-w-md text-center font-display text-[0.68rem] uppercase tracking-[0.28em] text-gold">
            Artfully Crafted • Intentionally Lit
          </p>
        </div>
      </article>
    </ShopPageShell>
  );
}
