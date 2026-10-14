import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { images } from "../../constants/images";

type IconName =
  | "home"
  | "orders"
  | "products"
  | "collections"
  | "users"
  | "content"
  | "blog"
  | "discounts"
  | "analytics"
  | "settings";

type NavItem = {
  id: string;
  to: string;
  label: string;
  icon: IconName;
  match: (path: string) => boolean;
};

const navItems: NavItem[] = [
  {
    id: "dashboard",
    to: "/admin",
    label: "Dashboard",
    icon: "home",
    match: (p) => p === "/admin" || p === "/admin/",
  },
  {
    id: "collections",
    to: "/admin/collections",
    label: "Collections",
    icon: "collections",
    match: (p) => p.startsWith("/admin/collections"),
  },
  {
    id: "products",
    to: "/admin/candles",
    label: "Fragrances",
    icon: "products",
    match: (p) => p.startsWith("/admin/candles"),
  },
  {
    id: "greeting-cards",
    to: "/admin/greeting-cards",
    label: "Greeting Cards",
    icon: "blog",
    match: (p) => p.startsWith("/admin/greeting-cards"),
  },
  {
    id: "orders",
    to: "/admin/orders",
    label: "Orders",
    icon: "orders",
    match: (p) => p.startsWith("/admin/orders"),
  },
  {
    id: "customers",
    to: "/admin/customers",
    label: "Customers",
    icon: "users",
    match: (p) => p.startsWith("/admin/customers"),
  },
  {
    id: "discounts",
    to: "/admin/orders",
    label: "Discounts",
    icon: "discounts",
    match: () => false,
  },
  {
    id: "analytics",
    to: "/admin",
    label: "Analytics",
    icon: "analytics",
    match: () => false,
  },
  {
    id: "settings",
    to: "/admin/customers",
    label: "Settings",
    icon: "settings",
    match: () => false,
  },
];

function NavIcon({ name }: { name: IconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.45,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
        </svg>
      );
    case "orders":
      return (
        <svg {...common}>
          <path d="M7 7h12l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H9.2a1.5 1.5 0 0 1-1.5-1.3L6.5 4H4" />
          <path d="M10 11h6M10 15h4" />
        </svg>
      );
    case "products":
      return (
        <svg {...common}>
          <path d="M12 3c.8 1.2.8 2.4 0 3.2-.8-.8-.8-2 0-3.2Z" />
          <path d="M9 9h6v11H9V9Z" />
          <path d="M8 20h8" />
        </svg>
      );
    case "collections":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="7" height="7" rx="1.5" />
          <rect x="13" y="5" width="7" height="7" rx="1.5" />
          <rect x="4" y="14" width="7" height="7" rx="1.5" />
          <rect x="13" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19c1.2-3 3.2-4.5 5.5-4.5S15.3 16 16.5 19" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M17 14.2c1.6.3 2.9 1.4 3.6 3.3" />
        </svg>
      );
    case "content":
      return (
        <svg {...common}>
          <path d="M4 16c2-4 5-8 8-8s4 2 4 4-1.5 3-3 3c-1.2 0-2 .8-2 2v1H6a2 2 0 0 1-2-2Z" />
          <path d="M14 6.5c1.5-1.5 3.5-1.5 4.5-.5s1 3-.5 4.5" />
        </svg>
      );
    case "blog":
      return (
        <svg {...common}>
          <path d="M5 5h10a2 2 0 0 1 2 2v12H7a2 2 0 0 0-2 2V5Z" />
          <path d="M9 9h6M9 13h4" />
        </svg>
      );
    case "discounts":
      return (
        <svg {...common}>
          <path d="M4 12 12 4h5.5A2.5 2.5 0 0 1 20 6.5V12l-8 8-8-8Z" />
          <circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...common}>
          <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </svg>
      );
  }
}

type Pill = { top: number; height: number };

type AdminSidebarProps = {
  open?: boolean;
  onClose?: () => void;
  onLogout: () => void;
  onReset: () => void;
};

export default function AdminSidebar({
  open = false,
  onClose,
  onLogout,
  onReset,
}: AdminSidebarProps) {
  const location = useLocation();
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [activePill, setActivePill] = useState<Pill | null>(null);

  const measure = useCallback((el: HTMLElement | null): Pill | null => {
    const list = listRef.current;
    if (!el || !list) return null;
    const listBox = list.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    return {
      top: box.top - listBox.top + list.scrollTop,
      height: box.height,
    };
  }, []);

  const activeItem =
    navItems.find((n) => n.match(location.pathname)) ?? navItems[0];

  useLayoutEffect(() => {
    setActivePill(measure(itemRefs.current.get(activeItem.id) ?? null));
  }, [activeItem.id, measure, location.pathname]);

  useEffect(() => {
    const onResize = () =>
      setActivePill(measure(itemRefs.current.get(activeItem.id) ?? null));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeItem.id, measure]);

  return (
    <aside
      id="admin-sidebar"
      className={`admin-glass-sidebar${open ? " is-open" : ""}`}
      aria-label="Admin navigation"
    >
      <div className="admin-glass-sidebar__inner glass-sidebar">
        <div className="admin-glass-sidebar__brand">
          <Link to="/" className="admin-glass-sidebar__logo-link" onClick={() => onClose?.()}>
            <img
              src={images.logo}
              alt="Candle Artistry Design Co."
              className="admin-glass-sidebar__logo"
            />
          </Link>
          <button
            type="button"
            className="admin-sidebar-close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="admin-glass-sidebar__rule" aria-hidden />

        <div ref={listRef} className="admin-glass-sidebar__list">
          <div
            className="admin-glass-pill"
            style={{
              transform: `translateY(${activePill?.top ?? 0}px)`,
              height: activePill?.height ?? 44,
              opacity: activePill ? 1 : 0,
            }}
            aria-hidden
          />

          {navItems.map((item) => {
            const isActive = activeItem.id === item.id;
            return (
              <Link
                key={item.id}
                to={item.to}
                ref={(node) => {
                  if (node) itemRefs.current.set(item.id, node);
                  else itemRefs.current.delete(item.id);
                }}
                className={`admin-glass-link glass-nav-item ${isActive ? "is-active active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onClose?.()}
              >
                <span className="admin-glass-link__icon">
                  <NavIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="admin-glass-sidebar__foot">
          <button type="button" className="admin-glass-foot-link" onClick={onReset}>
            Reset catalog
          </button>
          <button type="button" className="admin-glass-foot-btn glass-btn" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
