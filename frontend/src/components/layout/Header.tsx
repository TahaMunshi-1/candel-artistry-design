import { useEffect, useState } from "react";
import { Link } from "react-router";
import { images } from "../../constants/images";
import { useCart } from "../../context/CartContext";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import SearchModal from "../shop/SearchModal";
import ProfileModal from "../shop/ProfileModal";

type NavItem = { label: string; to?: string; href?: string };

const rightLinks: NavItem[] = [
  { label: "Candles", to: "/candles" },
  { label: "Greeting Cards", to: "/greeting-cards" },
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
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-editorial">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 min-h-[72px] md:min-h-[84px] py-3">
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8 justify-self-start"
              aria-label="Primary left"
            >
              <NavAnchor item={{ label: "Home", to: "/" }} className={navClass} />
              <NavAnchor item={{ label: "Shop", to: "/shop" }} className={navClass} />
              <NavAnchor item={{ label: "Collections", to: "/candles" }} className={navClass} />
              <NavAnchor item={{ label: "About Us", to: "/our-story" }} className={navClass} />
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
              className={`justify-self-center text-center group transition-all duration-300 ${
                solid
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none select-none"
              }`}
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

            <NavAnchor
              item={{ label: "Shop", to: "/shop" }}
              className="text-nav text-ink py-1 font-medium"
              onClick={() => setOpen(false)}
            />

            <NavAnchor
              item={{ label: "Collections", to: "/candles" }}
              className="text-nav text-ink py-1"
              onClick={() => setOpen(false)}
            />

            <NavAnchor
              item={{ label: "About Us", to: "/our-story" }}
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
