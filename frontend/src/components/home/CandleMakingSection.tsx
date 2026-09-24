import { BotanicalPetal, FloralCorner, PetalAccent } from "../decor/BotanicalAssets";
import { images } from "../../constants/images";

const videoSrc = `${import.meta.env.BASE_URL}videos/candle_spatial2.mp4`;

export default function CandleMakingSection() {
  return (
    <section
      id="story"
      className="relative band-height flex items-center overflow-hidden [container-type:size]"
      style={{
        background:
          "radial-gradient(ellipse at 28% 35%, #7a1824 0%, transparent 55%), radial-gradient(ellipse at 78% 70%, #4a0a10 0%, transparent 50%), linear-gradient(165deg, #6b1420 0%, #5c1018 42%, #3a080c 100%)",
      }}
      aria-labelledby="candle-making-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: `url(${images.featuredRoyalStill})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          opacity: 0.38,
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(105deg, rgba(58,8,12,0.45) 0%, rgba(92,16,24,0.2) 40%, rgba(58,8,12,0.4) 100%)",
        }}
      />

      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(200px,32vw)] opacity-[0.32] hidden md:block z-[1] brightness-110"
      />
      <FloralCorner
        corner="tr"
        className="absolute right-0 top-0 w-[min(200px,32vw)] opacity-[0.32] hidden md:block z-[1] brightness-110"
      />
      <FloralCorner
        corner="bl"
        className="absolute left-0 bottom-0 w-[min(180px,28vw)] opacity-[0.28] hidden lg:block z-[1] brightness-110"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(180px,28vw)] opacity-[0.28] hidden lg:block z-[1] brightness-110"
      />
      <BotanicalPetal
        className="absolute left-0 top-1/3 h-44 opacity-[0.38] hidden xl:block brightness-125"
        rotate={-12}
      />
      <BotanicalPetal
        className="absolute right-2 top-16 h-40 opacity-[0.36] hidden lg:block brightness-125"
        flip
        rotate={12}
      />
      <BotanicalPetal
        className="absolute right-4 bottom-16 h-36 opacity-[0.32] hidden lg:block brightness-125"
        flip
        rotate={-8}
      />
      <PetalAccent className="absolute left-8 bottom-24 h-16 w-auto rotate-90 opacity-40 hidden md:block brightness-125" />

      <div className="container-editorial relative z-[1] w-full py-4 md:py-5 h-full flex items-center justify-center">
        <div className="flex w-full max-w-[980px] flex-col lg:flex-row items-center gap-6 lg:gap-10 xl:gap-12">
          <div
            className="relative shrink-0 overflow-hidden rounded-[2px] ring-1 ring-gold/45 shadow-[0_20px_50px_rgba(26,4,8,0.45)]"
            style={{
              backgroundColor: "#5c1018",
              height: "min(520px, calc(100cqh - 3rem))",
              width: "min(390px, calc((100cqh - 3rem) * 0.75))",
              maxWidth: "100%",
            }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Candle Artistry Design — hand pouring soy wax in the atelier"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>

          <div className="relative min-w-0 w-full max-w-md flex flex-col justify-center text-center lg:text-left lg:pl-8">
            <div
              className="hidden lg:block absolute left-0 top-[14%] bottom-[14%] w-px bg-[rgba(216,193,154,0.45)]"
              aria-hidden
            />

            <p className="text-eyebrow !text-[#E8D8C4]">Candle Making</p>
            <h2
              id="candle-making-heading"
              className="mt-2.5 text-section uppercase text-[#FBF8F2] tracking-[0.12em] leading-[1.1] drop-shadow-[0_2px_12px_rgba(26,4,8,0.45)]"
            >
              Hand Poured. Heart Led.
            </h2>
            <p className="mt-2.5 text-lead text-[#EFE3D2]">
              From the atelier to your table.
            </p>
            <p className="mt-3 text-body text-[#D8C19A]/90">
              From selecting the finest ingredients to the final pour, every candle
              is crafted with intention, care and artistry.
            </p>
            <div className="mt-6">
              <a
                href="#shop"
                className="outline-btn !border-[#D8C19A] !text-[#FBF8F2] hover:!bg-[#D8C19A]/15 hover:!border-[#F5EBD8]"
              >
                Discover the Collection <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
