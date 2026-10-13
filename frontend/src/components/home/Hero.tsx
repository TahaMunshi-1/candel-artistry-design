import { images } from "../../constants/images";

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#160f0d] flex items-center justify-center"
      aria-label="Hero Banner"
    >
      {/* Full-bleed hero banner image positioned slightly left so text is centered and candle is on the left */}
      <img
        src={images.bannerGif}
        alt="Candle Artistry Design — Moments in Time. Some moments are remembered. Some are relived. Some can be held in your hands."
        className="absolute inset-0 w-full h-full object-cover object-[60%_center] scale-105 md:scale-[1.18] -translate-x-[4%] md:-translate-x-[7%]"
      />

      {/* Soft top gradient taper for header overlay text readability */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-[rgba(16,8,10,0.45)] via-[rgba(16,8,10,0.15)] to-transparent pointer-events-none z-10" />

      {/* Subtle bottom vignette for CTA readability */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[rgba(22,15,13,0.7)] via-[rgba(22,15,13,0.2)] to-transparent pointer-events-none z-10" />

      {/* CTA Button */}
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
