import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { images } from "../../constants/images";
import { useCart } from "../../context/CartContext";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import SearchModal from "../shop/SearchModal";
import ProfileModal from "../shop/ProfileModal";

type NavItem = { label: string; to?: string; href?: string };

const rightLinks: NavItem[] = [
  { label: "Candles", to: "/candles" },
  { label: "Paintings", to: "/paintings" },
  { label: "Cards", to: "/greeting-cards" },
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

function NavAnchor({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

type HeaderProps = {
  forceSolid?: boolean;
};

export default function Header({ forceSolid = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(forceSolid);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [storyDropdownOpen, setStoryDropdownOpen] = useState(false);
  const [mobileStoryOpen, setMobileStoryOpen] = useState(false);
  const storyDropdownRef = useRef<HTMLDivElement>(null);

  const { cartCount, openCart } = useCart();
  const { isLoggedIn, openAuthModal } = useCustomerAuth();

  const solid = forceSolid || scrolled || open;

  useEffect(() => {
    if (forceSolid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        storyDropdownRef.current &&
        !storyDropdownRef.current.contains(event.target as Node)
      ) {
        setStoryDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setProfileOpen(true);
    } else {
      openAuthModal("login");
    }
  };

  const navClass = solid
    ? "text-nav nav-link whitespace-nowrap"
    : "text-nav whitespace-nowrap text-[#F5EBD8] hover:text-[#E8D4A8] drop-shadow-[0_1px_6px_rgba(32,24,22,0.65)] transition-colors duration-300";

  const iconClass = solid
    ? "text-ink/75 hover:text-burgundy transition-colors duration-300"
    : "text-[#F5EBD8] hover:text-[#E8D4A8] drop-shadow-[0_1px_6px_rgba(32,24,22,0.65)] transition-colors duration-300";

  return (
    <>
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
              <NavAnchor item={{ label: "Home", to: "/" }} className={navClass} />

              {/* Our Story Dropdown trigger and popup */}
              <div className="relative" ref={storyDropdownRef}>
                <button
                  type="button"
                  onClick={() => setStoryDropdownOpen((v) => !v)}
                  aria-expanded={storyDropdownOpen}
                  className={`${navClass} ${!solid ? "!text-[#F5EBD8] hover:!text-[#E8D4A8]" : "!text-ink hover:!text-burgundy"} inline-flex items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 font-inherit focus:outline-none`}
                >
                  <span>Our Story</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${storyDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Card */}
                {storyDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-3.5 w-[420px] rounded-2xl bg-[#fcf8f2] border border-[#b99a68]/45 p-5 z-50 text-left shadow-[0_22px_60px_rgba(20,10,5,0.32)] animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {/* Decorative arrow pointing up */}
                    <div className="absolute -top-2 left-6 w-3.5 h-3.5 bg-[#fcf8f2] border-t border-l border-[#b99a68]/45 rotate-45" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between border-b border-[#b99a68]/20 pb-2.5 mb-3.5">
                        <div>
                          <p className="font-display text-[0.58rem] uppercase tracking-[0.28em] text-[#b99a68]">
                            Candle Artistry Design
                          </p>
                          <h3 className="font-display text-[1.12rem] font-medium text-[#4a151b] leading-tight mt-0.5">
                            The Story Behind the Flame
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStoryDropdownOpen(false)}
                          className="text-stone-400 hover:text-[#4a151b] text-base p-1 cursor-pointer transition-colors leading-none"
                          aria-label="Close story preview"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex gap-3.5 items-start mb-3.5">
                        <img
                          src={images.familyFatherDaughter}
                          alt="Jeff and Katherine"
                          className="w-20 h-24 object-cover object-[center_20%] rounded-lg border border-[#b99a68]/40 shadow-sm shrink-0"
                        />
                        <div className="text-[0.84rem] text-stone-700 leading-relaxed font-serif">
                          <p className="line-clamp-4">
                            I&apos;m Jeff Fontano, and Candle Artistry Design began with the two greatest influences in my life—my wife, Alda, and our daughter, Katherine. Watching Katherine captivated by the gentle glow of a candle flame turned our passion into an atelier craft.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg bg-[#f5ede0] p-2.5 mb-3.5 border border-[#b99a68]/20 text-[0.76rem] text-stone-700 space-y-1">
                        <div className="flex items-center gap-1.5 text-[#5c1018] font-medium">
                          <span>✧</span> <span>Artfully Crafted • Intentionally Lit</span>
                        </div>
                        <p className="text-stone-600 text-[0.72rem] italic">
                          Impressionist oil paintings brought to candle labels to help provide for Katherine&apos;s future.
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <Link
                          to="/our-story"
                          onClick={() => setStoryDropdownOpen(false)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5c1018] text-[#fcf8f2] hover:bg-[#7a1c25] text-[0.74rem] font-medium tracking-[0.08em] uppercase transition-colors shadow-sm"
                        >
                          Read Full Story →
                        </Link>
                        <a
                          href="/#our-story"
                          onClick={() => setStoryDropdownOpen(false)}
                          className="text-[0.74rem] text-stone-600 hover:text-[#5c1018] underline underline-offset-2 transition-colors font-serif italic"
                        >
                          View Family Photos
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <NavAnchor item={{ label: "Moments", href: "/#experience" }} className={navClass} />
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
                  <NavAnchor key={link.label} item={link} className={navClass} />
                ))}
              </nav>
              <div className={`flex items-center gap-3.5 ${iconClass}`}>
                <button
                  type="button"
                  aria-label="Search"
                  onClick={() => setSearchOpen(true)}
                  className="cursor-pointer hover:scale-110 transition-transform"
                >
                  <IconSearch />
                </button>
                <button
                  type="button"
                  aria-label="Account"
                  onClick={handleAccountClick}
                  className="cursor-pointer hover:scale-110 transition-transform relative"
                >
                  <IconAccount />
                  {isLoggedIn ? (
                    <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-forest ring-1 ring-ivory" />
                  ) : null}
                </button>
                <button
                  type="button"
                  aria-label="Shopping bag"
                  onClick={openCart}
                  className="cursor-pointer hover:scale-110 transition-transform relative"
                >
                  <IconBag />
                  {cartCount > 0 ? (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-burgundy px-1 text-[0.6rem] font-bold text-ivory">
                      {cartCount}
                    </span>
                  ) : null}
                </button>
              </div>
            </div>

            <div className={`lg:hidden flex items-center gap-3 justify-self-end ${iconClass}`}>
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="p-0.5 cursor-pointer"
              >
                <IconSearch />
              </button>
              <button
                type="button"
                aria-label="Account"
                onClick={handleAccountClick}
                className="p-0.5 cursor-pointer relative"
              >
                <IconAccount />
                {isLoggedIn ? (
                  <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-forest ring-1 ring-ivory" />
                ) : null}
              </button>
              <button
                type="button"
                aria-label="Shopping bag"
                onClick={openCart}
                className="p-0.5 cursor-pointer relative"
              >
                <IconBag />
                {cartCount > 0 ? (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-burgundy px-1 text-[0.6rem] font-bold text-ivory">
                    {cartCount}
                  </span>
                ) : null}
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
            <NavAnchor
              item={{ label: "Home", to: "/" }}
              className="text-nav text-ink py-1"
              onClick={() => setOpen(false)}
            />

            {/* Mobile Our Story Accordion */}
            <div className="border-y border-[rgba(185,154,104,0.18)] py-1">
              <button
                type="button"
                onClick={() => setMobileStoryOpen((v) => !v)}
                className="w-full text-nav text-ink py-1 flex items-center justify-between cursor-pointer"
              >
                <span>Our Story</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 ${mobileStoryOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {mobileStoryOpen && (
                <div className="mt-2 mb-2 p-3 rounded-xl bg-[#f5ede0] border border-[#b99a68]/30">
                  <div className="flex gap-3 items-start mb-2.5">
                    <img
                      src={images.familyFatherDaughter}
                      alt="Jeff and Katherine"
                      className="w-16 h-20 object-cover object-[center_20%] rounded-md border border-[#b99a68]/40 shrink-0"
                    />
                    <div className="text-[0.8rem] text-stone-700 leading-snug font-serif">
                      <p className="line-clamp-3">
                        I&apos;m Jeff Fontano. Candle Artistry Design began with my wife Alda and our daughter Katherine, inspired by her captivation with the glow of a candle flame.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      to="/our-story"
                      onClick={() => {
                        setOpen(false);
                        setMobileStoryOpen(false);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5c1018] text-[#fcf8f2] text-[0.7rem] font-medium uppercase tracking-[0.08em]"
                    >
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavAnchor
              item={{ label: "Moments", href: "/#experience" }}
              className="text-nav text-ink py-1"
              onClick={() => setOpen(false)}
            />

            {rightLinks.map((link) => (
              <NavAnchor
                key={link.label}
                item={link}
                className="text-nav text-ink py-1"
                onClick={() => setOpen(false)}
              />
            ))}
            <button
              type="button"
              className="text-nav text-ink text-left py-1 flex items-center gap-2 cursor-pointer"
              aria-label="Search"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
            >
              <IconSearch /> Search
            </button>
          </nav>
        </div>
      </header>

      {/* Global Search and Profile Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
