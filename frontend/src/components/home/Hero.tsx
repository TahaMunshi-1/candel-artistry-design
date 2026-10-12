import { images } from "../../constants/images";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[calc(100vh-72px)] md:h-[calc(100vh-84px)] min-h-[580px] max-h-[1080px] mt-[72px] md:mt-[84px] overflow-hidden bg-[#160f0d] flex items-center justify-center"
      aria-label="Hero Banner"
    >
      <div className="relative w-full h-full max-w-[1600px] max-h-[1080px] mx-auto overflow-hidden">
        {/* Full-bleed hero banner image fitted to 1600x1080 and dynamically clear of header */}
        <img
          src={images.bannerGif}
          alt="Candle Artistry Design — Moments in Time. Some moments are remembered. Some are relived. Some can be held in your hands."
          className="w-full h-full object-cover object-center"
        />

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
      </div>
    </section>
  );
}
