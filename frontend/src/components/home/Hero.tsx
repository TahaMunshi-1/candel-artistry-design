import { images } from "../../constants/images";

export default function Hero() {
  return (
    <section
      className="relative band-height flex items-center justify-center overflow-hidden bg-[#2a1f1c]"
      aria-label="Hero"
    >
      <div className="absolute inset-0 hero-reveal">
        <img
          src={`${images.hero}?v=clean`}
          alt="Luxury candles, classical bust, and a European castle lake at sunset"
          className="h-full w-full object-cover object-[center_45%]"
        />
        {/* Soft veil — keeps imagery visible while lifting text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, rgba(32,24,22,0.45) 0%, rgba(32,24,22,0.22) 38%, rgba(32,24,22,0.12) 62%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container-editorial w-full px-4 pt-24 md:pt-20 pb-12 text-center">
        <h1 className="fade-up fade-up-delay-1 font-script text-[clamp(3rem,8vw,5.5rem)] leading-[1.05] text-[#FBF6EC] drop-shadow-[0_2px_18px_rgba(32,24,22,0.55)]">
          Moments in Time.
        </h1>

        <div className="mt-5 md:mt-6 mx-auto max-w-md font-serif text-[1rem] md:text-[1.1rem] leading-[1.75] text-[#F0E6D4] fade-up fade-up-delay-2 drop-shadow-[0_1px_10px_rgba(32,24,22,0.5)]">
          <p>Some moments are remembered.</p>
          <p>Some are relived.</p>
          <p>Some can be held in your hands.</p>
        </div>

        <div className="mt-8 md:mt-9 fade-up fade-up-delay-3">
          <a
            href="#experience"
            className="burgundy-btn !bg-[#8B5B58] !border-[#8B5B58] !text-[#FBF8F2] hover:!bg-[#7a4e4b] shadow-[0_4px_20px_rgba(32,24,22,0.35)]"
          >
            Explore the Moments <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
