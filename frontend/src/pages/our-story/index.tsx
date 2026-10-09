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
              I&apos;m Jeff Fontano, and Candle Artistry Design began with the two greatest influences in my life&mdash;my wife, Alda, and our daughter, Katherine.
            </p>
            <p>
              Katherine has special needs, and for many years our focus, drive, and ambition have been to find meaningful ways to enrich her quality of life while building a future that will always provide her with the love, care, and security she deserves.
            </p>
            <p>
              One evening, I watched Katherine become completely captivated by the gentle glow of a candle flame. Watching her that evening made me look differently at something Alda and I had already been doing for some time. Alda and I had been making our own candles, primarily to honor family members who had passed. Candle making was a hobby at first but quickly became a serious endeavor. We found ourselves researching the industry, procuring materials, making small batches, and testing. It became a labor of love.
            </p>
            <p>
              At the same time, I was pursuing my passion for oil painting, specifically Impressionism. For me, the goal has always been to paint the Wow!&mdash;the captivating. To capture a Moment in Time that makes you stop and ask: Who? What? Where? When? How? It isn&apos;t easy, but when someone stops, looks, and begins wondering about the story behind the painting, I know I&apos;ve accomplished what I set out to do.
            </p>

            <h2 className="!mt-12 font-serif text-[1.2rem] font-medium italic tracking-[0.02em] text-royal md:text-[1.35rem]">
              Let&apos;s Connect the Dots!
            </h2>
            <p>
              The Goal is to help provide for Katherine&apos;s quality of life and ongoing care, today and for the future.
            </p>

            <h2 className="!mt-12 font-serif text-[1.2rem] font-medium italic tracking-[0.02em] text-royal md:text-[1.35rem]">
              Candle Artistry Design is Born.
            </h2>
            <p>
              A Brand unlike any other. I took the same approach I use with my paintings and brought it to our candles&mdash;labels designed to make you stop, look, and wonder about the story behind them. Specific Moments In Time. Artfully Crafted and Intentionally Lit!
            </p>

            <h2 className="!mt-12 font-serif text-[1.2rem] font-medium italic tracking-[0.02em] text-royal md:text-[1.35rem]">
              A Niche! Not one, but several.
            </h2>
            <p>
              We did the research. Our Collections were chosen around specific demographics, seasonal activities here in the Central Valley, and yes&mdash;even people&apos;s love for Horror movies!
            </p>
            <p>
              Today, Candle Artistry Design is far more than a candle company. It is my expression as an artist, our promise to Katherine, and something Alda and I hope will help provide for her future. And perhaps, somewhere along the way, one of our candles will become part of a special Moment in your life too.
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
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = images.hero;
                }}
              />
            </figure>

            <div className="grid gap-5 md:gap-6">
              <figure className="story-frame m-0 overflow-hidden ring-1 ring-[rgba(92,16,24,0.18)]">
                <img
                  src={images.familyMotherDaughter}
                  alt="Alda and Katherine smiling together"
                  className="aspect-[4/3] w-full object-cover object-[center_28%]"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = images.hero;
                  }}
                />
              </figure>
              <figure className="story-frame m-0 overflow-hidden ring-1 ring-[rgba(92,16,24,0.18)]">
                {/* Portrait crop — avoid wide banner stretch on Katherine's features */}
                <img
                  src={images.familyDaughterGarden}
                  alt="Katherine outdoors in the garden"
                  className="aspect-[4/5] w-full object-cover object-[18%_18%] md:object-[20%_15%]"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = images.hero;
                  }}
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
