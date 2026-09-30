import { useEffect, useState } from "react";
import { Link } from "react-router";
import { images } from "../../constants/images";

const leftLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "#our-story" },
  { label: "Moments", href: "#experience" },
];

const rightLinks = [
  { label: "Romance", href: "#featured" },
  { label: "Collection", href: "#shop" },
  { label: "The Artistry", href: "#experience-gallery" },
];

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.15" />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconAccount() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.15" />
      <path
        d="M5.5 19.5c1.6-3.2 4-4.8 6.5-4.8s4.9 1.6 6.5 4.8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 8.5h11l-.8 10.2a1.5 1.5 0 0 1-1.5 1.3H8.8a1.5 1.5 0 0 1-1.5-1.3L6.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navClass = solid
    ? "text-nav nav-link whitespace-nowrap"
    : "text-nav whitespace-nowrap text-[#F5EBD8] hover:text-[#E8D4A8] drop-shadow-[0_1px_6px_rgba(32,24,22,0.65)] transition-colors duration-300";

  const iconClass = solid
    ? "text-ink/75 hover:text-burgundy transition-colors duration-300"
    : "text-[#F5EBD8] hover:text-[#E8D4A8] drop-shadow-[0_1px_6px_rgba(32,24,22,0.65)] transition-colors duration-300";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-[rgba(247,241,231,0.96)] backdrop-blur-sm border-b border-[rgba(185,154,104,0.28)]"
          : "bg-gradient-to-b from-[rgba(32,24,22,0.55)] via-[rgba(32,24,22,0.2)] to-transparent border-b border-transparent"
      }`}
    >
      <div className="container-editorial">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 min-h-[72px] md:min-h-[84px] py-3">
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 justify-self-start"
            aria-label="Primary left"
          >
            {leftLinks.map((link) => (
              <a key={link.label} href={link.href} className={navClass}>
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={`lg:hidden justify-self-start p-1 ${solid ? "text-ink" : "text-[#F5EBD8]"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block w-5 h-3.5">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>

          <Link
            to="/"
            className="justify-self-center text-center group"
            onClick={() => setOpen(false)}
          >
            <img
              src={images.logo}
              alt="Candle Artistry Design Co."
              className="mx-auto mb-1.5 h-10 w-10 md:h-12 md:w-12 object-cover rounded-full ring-1 ring-[#E8D4A8]/70"
            />
            <div
              className={`font-serif text-[0.82rem] md:text-[0.92rem] tracking-[0.18em] uppercase leading-none ${
                solid
                  ? "text-ink"
                  : "text-[#FBF6EC] drop-shadow-[0_1px_8px_rgba(32,24,22,0.7)]"
              }`}
            >
              Candle Artistry Design
            </div>
            <div
              className={`mt-1.5 text-[0.55rem] md:text-[0.6rem] tracking-[0.26em] uppercase ${
                solid
                  ? "text-taupe"
                  : "text-[#E8D4A8] drop-shadow-[0_1px_6px_rgba(32,24,22,0.65)]"
              }`}
            >
              Artfully Crafted • Intentionally Lit
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-7 justify-self-end">
            <nav className="flex items-center gap-6 xl:gap-8" aria-label="Primary right">
              {rightLinks.map((link) => (
                <a key={link.label} href={link.href} className={navClass}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className={`flex items-center gap-3.5 ${iconClass}`}>
              <button type="button" aria-label="Search">
                <IconSearch />
              </button>
              <button type="button" aria-label="Account">
                <IconAccount />
              </button>
              <button type="button" aria-label="Shopping bag">
                <IconBag />
              </button>
            </div>
          </div>

          <div className={`lg:hidden flex items-center gap-3 justify-self-end ${iconClass}`}>
            <button type="button" aria-label="Account" className="p-0.5">
              <IconAccount />
            </button>
            <button type="button" aria-label="Shopping bag" className="p-0.5">
              <IconBag />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="container-editorial pb-8 pt-2 flex flex-col gap-5 border-t border-[rgba(185,154,104,0.25)] bg-ivory"
          aria-label="Mobile"
        >
          {[...leftLinks, ...rightLinks].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-nav text-ink py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="text-nav text-ink text-left py-1 flex items-center gap-2"
            aria-label="Search"
          >
            <IconSearch /> Search
          </button>
        </nav>
      </div>
    </header>
  );
}
