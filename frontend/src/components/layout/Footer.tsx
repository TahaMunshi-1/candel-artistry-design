import { DiamondMark } from "../decor/Ornaments";
import { images } from "../../constants/images";
import { FloralCorner } from "../decor/BotanicalAssets";

const links = [
  { label: "Our Story", href: "#our-story" },
  { label: "Moments", href: "#experience" },
  { label: "Romance", href: "#featured" },
  { label: "Collection", href: "#shop" },
  { label: "Candle Making", href: "#story" },
  { label: "The Artistry", href: "#experience-gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-[rgba(185,154,104,0.35)] bg-ivory overflow-hidden"
    >
      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(160px,32vw)] opacity-[0.32] hidden sm:block"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(160px,32vw)] opacity-[0.32] hidden sm:block"
      />

      <div className="container-editorial relative z-[1] py-14 md:py-16">
        <div className="text-center max-w-xl mx-auto">
          <img
            src={images.logo}
            alt=""
            className="mx-auto mb-3 h-14 w-14 object-cover rounded-full ring-1 ring-gold/50"
            aria-hidden
          />
          <p className="font-serif text-[0.95rem] tracking-[0.22em] uppercase text-ink">
            Candle Artistry Design
          </p>
          <p className="mt-2 text-[0.58rem] tracking-[0.28em] uppercase text-taupe">
            Artfully Crafted • Intentionally Lit
          </p>

          <nav
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            aria-label="Footer"
          >
            {links.map((link) => (
              <a key={link.label} href={link.href} className="text-nav nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <form
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email for newsletter
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email"
              className="flex-1 min-w-0 border border-gold/50 bg-cream px-4 py-2.5 font-serif text-sm text-ink placeholder:text-taupe/70 outline-none focus:border-gold"
            />
            <button type="submit" className="outline-btn !py-2.5 shrink-0 justify-center">
              Join <span className="arrow">→</span>
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-12 bg-[rgba(185,154,104,0.45)]" />
            <DiamondMark className="h-2 w-2" />
            <div className="h-px w-12 bg-[rgba(185,154,104,0.45)]" />
          </div>

          <p className="mt-6 text-[0.62rem] tracking-[0.22em] uppercase text-taupe/80 font-serif">
            © {new Date().getFullYear()} Candle Artistry Design Co. · Coarsegold, CA
          </p>
        </div>
      </div>
    </footer>
  );
}
