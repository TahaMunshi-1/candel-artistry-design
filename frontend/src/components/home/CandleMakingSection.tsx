import { Link } from "react-router";
import { BotanicalPetal, FloralCorner } from "../decor/BotanicalAssets";
import { DiamondMark } from "../decor/Ornaments";
import { images } from "../../constants/images";

export default function CandleMakingSection() {
  return (
    <>
      {/* SECTION 1: THE ART OF CANDLE MAKING */}
      <section
        id="candle-making"
        className="relative overflow-hidden py-16 md:py-20 lg:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 25% 35%, #7a1824 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, #4a0a10 0%, transparent 50%), linear-gradient(165deg, #6b1420 0%, #5c1018 42%, #3a080c 100%)",
        }}
        aria-labelledby="candle-making-heading"
      >
        <FloralCorner
          corner="tl"
          className="absolute left-0 top-0 w-[min(180px,24vw)] opacity-[0.28] hidden md:block z-[1] brightness-110 pointer-events-none"
        />
        <FloralCorner
          corner="br"
          className="absolute right-0 bottom-0 w-[min(180px,24vw)] opacity-[0.24] hidden md:block z-[1] brightness-110 pointer-events-none"
        />
        <BotanicalPetal
          className="absolute -left-4 top-[32%] h-40 opacity-[0.3] hidden lg:block brightness-125 pointer-events-none"
          rotate={-12}
        />

        <div className="container-editorial relative z-[2] w-full">
          {/* 2-Column Layout: Left is smaller (~40%), Right is bigger (~60%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.38fr] xl:grid-cols-[1fr_1.45fr] gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content (Smaller) */}
            <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-gold/80 mb-2.5">
                <span className="h-px w-6 bg-gold/50" />
                <p className="text-eyebrow !text-[#E8D4A8] !tracking-[0.28em]">
                  Atelier Craftsmanship
                </p>
                <span className="h-px w-6 bg-gold/50" />
              </div>

              <h2
                id="candle-making-heading"
                className="font-serif text-[clamp(1.75rem,3.2vw,2.65rem)] uppercase text-[#FBF8F2] tracking-[0.08em] leading-[1.12] drop-shadow-[0_2px_12px_rgba(26,4,8,0.5)] font-light"
              >
                The Art of <br className="hidden sm:inline" /> Candle Making
              </h2>

              <p className="mt-3 font-serif italic text-[1.05rem] md:text-[1.15rem] text-[#F3E5D0] leading-snug">
                Crafted by Hand. Perfected by Process.
              </p>

              <div className="mt-4 space-y-3 font-serif text-[0.88rem] md:text-[0.94rem] leading-relaxed text-[#D8C19A]/95">
                <p>
                  Each Candle Artistry Design candle is hand-filled in small batches using the finest Coconut Apricot Wax on the market. Our meticulous quality process pairs jar geometry with precision-calibrated wicks and optimal pouring temperatures.
                </p>
                <p className="italic text-[#EAE0D0]">
                  “Because exceptional candles are not simply made. They are crafted with intention.”
                </p>
              </div>

              {/* 4 Craft Pillars */}
              <div className="mt-6 grid grid-cols-2 gap-3.5 text-left">
                <div className="rounded-xl bg-[#45090e]/70 border border-[#b99a68]/35 p-3">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                    <span>✦</span> <span>Premium Wax</span>
                  </div>
                  <p className="mt-1 text-[0.74rem] text-[#e0d3c1] leading-tight">
                    Pure Coconut Apricot & Soy wax for a velvety, clean burn.
                  </p>
                </div>
                <div className="rounded-xl bg-[#45090e]/70 border border-[#b99a68]/35 p-3">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                    <span>✦</span> <span>Wick Selection</span>
                  </div>
                  <p className="mt-1 text-[0.74rem] text-[#e0d3c1] leading-tight">
                    Lead-free cotton wicks chosen for optimal melt pools.
                  </p>
                </div>
                <div className="rounded-xl bg-[#45090e]/70 border border-[#b99a68]/35 p-3">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                    <span>✦</span> <span>Precision Pouring</span>
                  </div>
                  <p className="mt-1 text-[0.74rem] text-[#e0d3c1] leading-tight">
                    Hand-poured at exact temperature for a smooth top.
                  </p>
                </div>
                <div className="rounded-xl bg-[#45090e]/70 border border-[#b99a68]/35 p-3">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                    <span>✦</span> <span>Small Batches</span>
                  </div>
                  <p className="mt-1 text-[0.74rem] text-[#e0d3c1] leading-tight">
                    Artisan care poured into every single vessel.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/candles"
                  className="outline-btn !border-[#D8C19A] !text-[#FBF8F2] hover:!bg-[#D8C19A]/15 hover:!border-[#F5EBD8] shadow-sm"
                >
                  Discover the Collections <span className="arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Right Media (Bigger) — Master Artwork Poster */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <figure className="group relative w-full max-w-[620px] rounded-2xl overflow-hidden border border-gold/50 shadow-[0_24px_60px_rgba(20,5,8,0.55)] ring-1 ring-gold/40 bg-[#3a080c]">
                <img
                  src={images.candleMakingArt}
                  alt="The Art of Candle Making — Master Atelier Hand Pouring by Candle Artistry Design"
                  className="w-full h-auto object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = images.pouring;
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-2xl" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CANDLE TESTING */}
      <section
        id="candle-testing"
        className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-[#140b0d] text-[#FBF8F2]"
        aria-labelledby="candle-testing-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            background:
              "radial-gradient(ellipse at 80% 30%, #5c1018 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #3a1510 0%, transparent 50%)",
          }}
          aria-hidden
        />
        <FloralCorner
          corner="tr"
          className="absolute right-0 top-0 w-[min(180px,24vw)] opacity-[0.22] hidden md:block z-[1] brightness-110 pointer-events-none"
        />
        <FloralCorner
          corner="bl"
          className="absolute left-0 bottom-0 w-[min(160px,20vw)] opacity-[0.22] hidden md:block z-[1] brightness-110 pointer-events-none"
        />

        <div className="container-editorial relative z-[2] w-full">
          {/* 2-Column Layout: Left is smaller (~40%), Right is bigger (~60%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.38fr] xl:grid-cols-[1fr_1.45fr] gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content (Smaller) */}
            <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-gold/80 mb-2.5">
                <span className="h-px w-6 bg-gold/50" />
                <p className="text-eyebrow !text-[#E8D4A8] !tracking-[0.28em]">
                  Quality Assurance
                </p>
                <span className="h-px w-6 bg-gold/50" />
              </div>

              <h2
                id="candle-testing-heading"
                className="font-serif text-[clamp(1.75rem,3.2vw,2.65rem)] uppercase text-[#FBF8F2] tracking-[0.08em] leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-light"
              >
                Candle Testing
              </h2>

              <p className="mt-3 font-serif italic text-[1.05rem] md:text-[1.15rem] text-[#F3E5D0] leading-snug">
                A Better Candle Begins Here. Test, Refine, Perfect, Repeat.
              </p>

              <div className="mt-4 space-y-3 font-serif text-[0.88rem] md:text-[0.94rem] leading-relaxed text-[#D8C19A]/95">
                <p>
                  Testing is not a shortcut — it&apos;s our uncompromising commitment to quality. We test every element so that each candle you light delivers a safe, consistent, and extraordinary experience.
                </p>
              </div>

              {/* 5-Step Process List */}
              <div className="mt-6 space-y-2.5 text-left">
                {[
                  {
                    num: "1",
                    title: "Fragrance Evaluation",
                    desc: "Tested for cold throw and hot throw to ensure true, rich scent.",
                  },
                  {
                    num: "2",
                    title: "Wick Calibration",
                    desc: "Multiple wick gauges tested for clean flame height and even pools.",
                  },
                  {
                    num: "3",
                    title: "Burn Performance",
                    desc: "Burned over multiple cycles to evaluate melt pool, burn time, and soot prevention.",
                  },
                  {
                    num: "4",
                    title: "Temperature Monitoring",
                    desc: "Thermal imaging and infrared checks for safe, consistent vessel temperatures.",
                  },
                  {
                    num: "5",
                    title: "Final Approval",
                    desc: "Only candles meeting our highest safety and aesthetic standards reach your home.",
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-3 rounded-xl bg-[#201014]/70 border border-[#b99a68]/30 p-2.5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/25 border border-gold/60 text-[0.65rem] font-bold text-gold">
                      {step.num}
                    </span>
                    <div>
                      <strong className="block font-serif text-[0.8rem] uppercase tracking-wider text-[#FBF8F2]">
                        {step.title}
                      </strong>
                      <span className="text-[0.74rem] text-[#D8C19A]/85 leading-snug">
                        {step.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center lg:justify-start gap-3 text-gold">
                <div className="h-px w-10 bg-gold/45" />
                <DiamondMark className="h-1.5 w-1.5 shrink-0" />
                <span className="font-serif text-[0.74rem] uppercase tracking-[0.2em] text-[#E8D4A8]">
                  Artfully Created • Intentionally Lit
                </span>
                <DiamondMark className="h-1.5 w-1.5 shrink-0" />
                <div className="h-px w-10 bg-gold/45" />
              </div>
            </div>

            {/* Right Media (Bigger) — Master Testing Artwork Poster */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <figure className="group relative w-full max-w-[620px] rounded-2xl overflow-hidden border border-gold/50 shadow-[0_24px_60px_rgba(0,0,0,0.65)] ring-1 ring-gold/40 bg-[#1e0e12]">
                <img
                  src={images.candleTestingArt}
                  alt="Candle Testing — A Better Candle Begins Here by Candle Artistry Design"
                  className="w-full h-auto object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = images.testing;
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-2xl" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
