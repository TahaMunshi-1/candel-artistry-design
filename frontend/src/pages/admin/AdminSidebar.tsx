import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

type IconName =
  | "home"
  | "orders"
  | "users"
  | "candle"
  | "paint"
  | "card";

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
  icon: IconName;
};

type NavSection = { title: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    title: "Main",
    items: [
      { to: "/admin", label: "Dashboard", end: true, icon: "home" },
      { to: "/admin/orders", label: "Orders", icon: "orders" },
      { to: "/admin/customers", label: "Customers", icon: "users" },
    ],
  },
  {
    title: "Catalog",
    items: [
      { to: "/admin/candles", label: "Candles", icon: "candle" },
      { to: "/admin/paintings", label: "Paintings", icon: "paint" },
      { to: "/admin/greeting-cards", label: "Cards", icon: "card" },
    ],
  },
];

const flatNav = sections.flatMap((s) => s.items);

function NavIcon({ name }: { name: IconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
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
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19c1.2-3 3.2-4.5 5.5-4.5S15.3 16 16.5 19" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M17 14.2c1.6.3 2.9 1.4 3.6 3.3" />
        </svg>
      );
    case "candle":
      return (
        <svg {...common}>
          <path d="M12 3c.8 1.2.8 2.4 0 3.2-.8-.8-.8-2 0-3.2Z" />
          <path d="M9 9h6v11H9V9Z" />
          <path d="M8 20h8" />
        </svg>
      );
    case "paint":
      return (
        <svg {...common}>
          <path d="M4 16c2-4 5-8 8-8s4 2 4 4-1.5 3-3 3c-1.2 0-2 .8-2 2v1H6a2 2 0 0 1-2-2Z" />
          <path d="M14 6.5c1.5-1.5 3.5-1.5 4.5-.5s1 3-.5 4.5" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="1.5" />
          <path d="M4 10h16" />
        </svg>
      );
  }
}

type Pill = { top: number; height: number };

type AdminSidebarProps = {
  onLogout: () => void;
  onReset: () => void;
};

export default function AdminSidebar({ onLogout, onReset }: AdminSidebarProps) {
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

  const activeKey =
    flatNav.find((n) =>
      n.end ? location.pathname === n.to : location.pathname.startsWith(n.to),
    )?.to ?? "/admin";

  useLayoutEffect(() => {
    setActivePill(measure(itemRefs.current.get(activeKey) ?? null));
  }, [activeKey, measure, location.pathname]);

  useEffect(() => {
    const onResize = () =>
      setActivePill(measure(itemRefs.current.get(activeKey) ?? null));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeKey, measure]);

  return (
    <aside className="admin-glass-sidebar" aria-label="Admin navigation">
      <div className="admin-glass-sidebar__inner">
        <div className="admin-glass-sidebar__brand">
          <div className="admin-glass-sidebar__mark" aria-hidden>
            C
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.85rem] font-medium text-white">CAD Admin</p>
            <p className="truncate text-[0.65rem] text-white/50">Commerce console</p>
          </div>
        </div>

        <div className="admin-glass-sidebar__rule" aria-hidden />

        <div ref={listRef} className="admin-glass-sidebar__list">
          <div className="admin-glass-sidebar__ambient" aria-hidden />
          <div
            className="admin-glass-pill"
            style={{
              transform: `translateY(${activePill?.top ?? 0}px)`,
              height: activePill?.height ?? 44,
              opacity: activePill ? 1 : 0,
            }}
            aria-hidden
          />

          {sections.map((section) => (
            <div key={section.title} className="admin-nav-section">
              <p className="admin-nav-section__title">{section.title}</p>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  ref={(node) => {
                    if (node) itemRefs.current.set(item.to, node);
                    else itemRefs.current.delete(item.to);
                  }}
                  className={({ isActive }) =>
                    `admin-glass-link ${isActive ? "is-active" : ""}`
                  }
                >
                  <span className="admin-glass-link__icon">
                    <NavIcon name={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        <div className="admin-glass-sidebar__foot">
          <div className="admin-side-profile">
            <span className="admin-avatar admin-avatar--sm" aria-hidden>
              AD
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.85rem] text-white">Admin</p>
              <p className="truncate text-[0.68rem] text-white/45">demo@candle.local</p>
            </div>
          </div>
          <Link to="/" className="admin-glass-foot-link">
            View storefront
          </Link>
          <button type="button" className="admin-glass-foot-link" onClick={onReset}>
            Reset catalog data
          </button>
          <button type="button" className="admin-glass-foot-btn" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
