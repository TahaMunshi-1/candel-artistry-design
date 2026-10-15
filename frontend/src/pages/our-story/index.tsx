import ShopPageShell from "../../components/shop/ShopPageShell";
import { images } from "../../constants/images";
import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";

export default function OurStoryPage() {
  return (
    <ShopPageShell>
      <article
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(ellipse at 50% 12%, #4e0d16 0%, #30060c 52%, #1e0307 100%)",
        }}
      >
        {/* Subtle decorative floral corners in gold */}
        <FloralCorner
          corner="tl"
          className="absolute left-0 top-0 w-[min(180px,26vw)] opacity-[0.22] hidden sm:block z-[1] brightness-125 pointer-events-none"
        />
        <FloralCorner
          corner="tr"
          className="absolute right-0 top-0 w-[min(180px,26vw)] opacity-[0.22] hidden sm:block z-[1] brightness-125 pointer-events-none"
        />
        <FloralCorner
          corner="bl"
          className="absolute left-0 bottom-0 w-[min(160px,22vw)] opacity-[0.18] hidden lg:block z-[1] brightness-125 pointer-events-none"
        />
        <FloralCorner
          corner="br"
          className="absolute right-0 bottom-0 w-[min(160px,22vw)] opacity-[0.18] hidden lg:block z-[1] brightness-125 pointer-events-none"
        />

        <div className="container-editorial relative z-[2] pt-14 md:pt-20 pb-24 md:pb-32 lg:pb-36">
          {/* Header */}
          <header className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 text-gold/80 mb-3">
              <span className="h-px w-8 bg-gold/50" />
              <p className="font-serif text-[0.68rem] uppercase tracking-[0.32em] text-[#E8D4A8]">
                Candle Artistry Design Co.
              </p>
              <span className="h-px w-8 bg-gold/50" />
            </div>

            <h1 className="font-serif text-[clamp(2.35rem,5.5vw,3.6rem)] font-light uppercase tracking-[0.08em] text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              About Us
            </h1>

            <div className="mt-4 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-14 bg-gold/45" />
              <DiamondMark className="h-2 w-2 text-gold shrink-0" />
              <div className="h-px w-14 bg-gold/45" />
            </div>

            <p className="mt-3.5 font-serif italic text-[1.1rem] md:text-[1.2rem] text-[#F3E5D0] tracking-wide">
              The Story Behind the Flame
            </p>
          </header>

          {/* Story Narrative in Crisp White Text */}
          <div className="mx-auto mt-12 md:mt-16 max-w-3xl space-y-6 font-serif text-[1.05rem] md:text-[1.14rem] leading-[1.85] text-white">
            <p className="text-[1.14rem] md:text-[1.24rem] font-light leading-relaxed text-[#FFFFFF] drop-shadow-xs">
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

            <div className="!my-10 border-l-2 border-gold/70 pl-5 py-1 bg-white/5 rounded-r-xl">
              <h2 className="font-serif text-[1.3rem] md:text-[1.45rem] font-medium text-[#FFFFFF] tracking-[0.03em]">
                Let&apos;s Connect the Dots!
              </h2>
              <p className="mt-2 text-[#F5EBD8] italic text-[1.08rem]">
                The Goal is to help provide for Katherine&apos;s quality of life and ongoing care, today and for the future.
              </p>
            </div>

            <div className="!my-10 border-l-2 border-gold/70 pl-5 py-1 bg-white/5 rounded-r-xl">
              <h2 className="font-serif text-[1.3rem] md:text-[1.45rem] font-medium text-[#FFFFFF] tracking-[0.03em]">
                Candle Artistry Design is Born.
              </h2>
              <p className="mt-2 text-white">
                A Brand unlike any other. I took the same approach I use with my paintings and brought it to our candles&mdash;labels designed to make you stop, look, and wonder about the story behind them. Specific Moments In Time. <span className="text-[#F5EBD8] font-medium italic">Artfully Crafted and Intentionally Lit!</span>
              </p>
            </div>

            <div className="!my-10 border-l-2 border-gold/70 pl-5 py-1 bg-white/5 rounded-r-xl">
              <h2 className="font-serif text-[1.3rem] md:text-[1.45rem] font-medium text-[#FFFFFF] tracking-[0.03em]">
                A Niche! Not one, but several.
              </h2>
              <p className="mt-2 text-white">
                We did the research. Our Collections were chosen around specific demographics, seasonal activities here in the Central Valley, and yes&mdash;even people&apos;s love for Horror movies!
              </p>
            </div>

            <p className="text-[1.08rem] md:text-[1.16rem] leading-relaxed text-[#FFFFFF] pt-2">
              Today, Candle Artistry Design is far more than a candle company. It is my expression as an artist, our promise to Katherine, and something Alda and I hope will help provide for her future. And perhaps, somewhere along the way, one of our candles will become part of a special Moment in your life too.
            </p>
          </div>

          {/* Photo Collage on Dark Maroon */}
          <div className="mx-auto mt-16 md:mt-20 max-w-4xl p-4 sm:p-5 md:p-6 rounded-2xl border border-gold/45 bg-[#200407]/85 shadow-[0_20px_55px_rgba(0,0,0,0.7)] ring-1 ring-gold/30">
            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr] md:gap-5 items-stretch">
              {/* Left: Father and Katherine reading book */}
              <figure className="m-0 overflow-hidden rounded-xl border border-gold/50 shadow-md h-full">
                <img
                  src={images.familyFatherDaughter}
                  alt="Jeff and Katherine sharing a book together"
                  className="h-full w-full object-cover object-[center_25%] min-h-[380px] md:min-h-[520px] transition-transform duration-700 ease-out hover:scale-[1.02]"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = images.hero;
                  }}
                />
              </figure>

              {/* Right: Alda & Katherine on top, two Katherine portraits on bottom */}
              <div className="flex flex-col gap-4 md:gap-5">
                <figure className="m-0 overflow-hidden rounded-xl border border-gold/50 shadow-md">
                  <img
                    src={images.familyMotherDaughter}
                    alt="Alda and Katherine smiling together"
                    className="aspect-[4/3] w-full object-cover object-[center_30%] transition-transform duration-700 ease-out hover:scale-[1.02]"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = images.hero;
                    }}
                  />
                </figure>
                <div className="grid grid-cols-2 gap-3.5 flex-1">
                  <figure className="m-0 overflow-hidden rounded-xl border border-gold/50 shadow-md">
                    <img
                      src={images.familyKatherineOz}
                      alt="Katherine in front of Wizard of Oz poster"
                      className="aspect-[3/4] h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = images.hero;
                      }}
                    />
                  </figure>
                  <figure className="m-0 overflow-hidden rounded-xl border border-gold/50 shadow-md">
                    <img
                      src={images.familyKatherineGlinda}
                      alt="Katherine with Glinda cutout"
                      className="aspect-[3/4] h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
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
            </div>
          </div>

          {/* SPACING ADJUSTED: Generous spacing below picture collage so text is never hidden */}
          <div className="mx-auto mt-16 md:mt-24 pt-4 text-center">
            <div className="inline-flex items-center justify-center gap-3 text-gold/80 mb-3">
              <div className="h-px w-14 bg-gold/50" />
              <DiamondMark className="h-2 w-2 text-gold shrink-0" />
              <div className="h-px w-14 bg-gold/50" />
            </div>

            <p className="font-serif text-[0.88rem] sm:text-[0.98rem] md:text-[1.05rem] uppercase tracking-[0.3em] text-[#E8D4A8] font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              Artfully Crafted • Intentionally Lit
            </p>
            <p className="mt-2.5 font-serif italic text-[0.82rem] md:text-[0.88rem] text-white/80 tracking-widest">
              Coarsegold, California • Handcrafted with Love
            </p>
          </div>
        </div>
      </article>
    </ShopPageShell>
  );
}
