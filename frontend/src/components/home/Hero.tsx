import { images } from "../../constants/images";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#160f0d] flex items-center justify-center"
      aria-label="Hero Banner"
    >
      {/* Full-bleed ambient backdrop so no black bars appear */}
      <img
        src={images.bannerGif}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center blur-lg brightness-[0.7] scale-110"
      />

      {/* Main banner image with ~30% scaled typography */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src={images.bannerGif}
          alt="Candle Artistry Design — Moments in Time. Some moments are remembered. Some are relived. Some can be held in your hands."
          className="w-full h-full object-cover md:object-contain object-center scale-[0.85] transition-transform duration-500 drop-shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* Subtle vignettes for header and CTA readability */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[rgba(22,15,13,0.7)] via-[rgba(22,15,13,0.2)] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[rgba(22,15,13,0.65)] via-[rgba(22,15,13,0.2)] to-transparent pointer-events-none z-10" />

      {/* CTA Button increased by ~30% */}
      <div className="absolute bottom-6 md:bottom-9 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
        <a
          href="#experience"
          className="burgundy-btn inline-flex items-center gap-3 !bg-[#8B5B58] !border-[#8B5B58] !text-[#FBF8F2] hover:!bg-[#734643] shadow-[0_8px_32px_rgba(0,0,0,0.7)] px-12 md:px-14 py-4 md:py-4.5 rounded-full uppercase tracking-[0.22em] text-[0.95rem] md:text-[1.05rem] font-semibold transition-all hover:scale-105 active:scale-95"
        >
          Explore the Moments <span className="arrow text-lg">→</span>
        </a>
      </div>
    </section>
  );
}
