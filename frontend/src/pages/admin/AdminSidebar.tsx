import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
  icon: "home" | "candle" | "paint" | "card";
};

const nav: NavItem[] = [
  { to: "/admin", label: "Overview", end: true, icon: "home" },
  { to: "/admin/candles", label: "Candles", icon: "candle" },
  { to: "/admin/paintings", label: "Paintings", icon: "paint" },
  { to: "/admin/greeting-cards", label: "Cards", icon: "card" },
];

function NavIcon({ name }: { name: NavItem["icon"] }) {
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

type Pill = { top: number; height: number; opacity: number };

type AdminSidebarProps = {
  onLogout: () => void;
  onReset: () => void;
};

/**
 * Floating liquid-glass sidebar.
 * Hover: vertical sliding pill follows cursor between items (ref video, vertical axis).
 * Click/active: darker frosted capsule (reference screenshot).
 */
export default function AdminSidebar({ onLogout, onReset }: AdminSidebarProps) {
  const location = useLocation();
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [hoverPill, setHoverPill] = useState<Pill | null>(null);
  const [activePill, setActivePill] = useState<Pill | null>(null);
  const [ripples, setRipples] = useState<
    { id: number; key: string; x: number; y: number }[]
  >([]);

  const measure = useCallback((el: HTMLElement | null): Pill | null => {
    const list = listRef.current;
    if (!el || !list) return null;
    const listBox = list.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    return {
      top: box.top - listBox.top + list.scrollTop,
      height: box.height,
      opacity: 1,
    };
  }, []);

  const activeKey =
    nav.find((n) =>
      n.end ? location.pathname === n.to : location.pathname.startsWith(n.to),
    )?.to ?? "/admin";

  useLayoutEffect(() => {
    const el = itemRefs.current.get(activeKey) ?? null;
    setActivePill(measure(el));
  }, [activeKey, measure, location.pathname]);

  useEffect(() => {
    const onResize = () => {
      const el = itemRefs.current.get(activeKey) ?? null;
      setActivePill(measure(el));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeKey, measure]);

  const onListMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const list = listRef.current;
    if (!list) return;
    let bestEl: HTMLAnchorElement | null = null;
    let bestDist = Infinity;
    itemRefs.current.forEach((el) => {
      const box = el.getBoundingClientRect();
      const mid = box.top + box.height / 2;
      const dist = Math.abs(e.clientY - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestEl = el;
      }
    });
    if (bestEl) setHoverPill(measure(bestEl));
  };

  const spawnRipple = (key: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const box = el.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((r) => [
      ...r,
      { id, key, x: e.clientX - box.left, y: e.clientY - box.top },
    ]);
    window.setTimeout(() => {
      setRipples((r) => r.filter((x) => x.id !== id));
    }, 650);
  };

  return (
    <aside className="admin-glass-sidebar" aria-label="Admin navigation">
      <div className="admin-glass-sidebar__inner">
        <div className="admin-glass-sidebar__brand">
          <div className="admin-glass-sidebar__mark" aria-hidden>
            C
          </div>
          <div className="min-w-0">
            <p className="truncate font-serif text-[0.95rem] tracking-[0.04em] text-white">
              Candle Admin
            </p>
            <p className="truncate text-[0.62rem] tracking-[0.18em] uppercase text-white/55">
              Catalog
            </p>
          </div>
        </div>

        <div className="admin-glass-sidebar__rule" aria-hidden />

        <div
          ref={listRef}
          className="admin-glass-sidebar__list"
          onMouseMove={onListMove}
          onMouseLeave={() => setHoverPill(null)}
        >
          {/* Sliding hover / liquid follow pill */}
          <div
            className="admin-glass-pill admin-glass-pill--hover"
            style={{
              transform: `translateY(${hoverPill?.top ?? activePill?.top ?? 0}px)`,
              height: hoverPill?.height ?? activePill?.height ?? 44,
              opacity: hoverPill ? 0.55 : 0,
            }}
            aria-hidden
          />
          {/* Active / clicked capsule */}
          <div
            className="admin-glass-pill admin-glass-pill--active"
            style={{
              transform: `translateY(${activePill?.top ?? 0}px)`,
              height: activePill?.height ?? 44,
              opacity: activePill ? 1 : 0,
            }}
            aria-hidden
          />

          {nav.map((item) => (
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
              onMouseEnter={spawnRipple(item.to)}
              onClick={spawnRipple(item.to)}
            >
              <span className="admin-glass-link__icon">
                <NavIcon name={item.icon} />
              </span>
              <span>{item.label}</span>
              {ripples
                .filter((r) => r.key === item.to)
                .map((r) => (
                  <span
                    key={r.id}
                    className="admin-glass-ripple"
                    style={{ left: r.x, top: r.y }}
                  />
                ))}
            </NavLink>
          ))}
        </div>

        <div className="admin-glass-sidebar__foot">
          <Link to="/" className="admin-glass-foot-link">
            View site
          </Link>
          <button type="button" className="admin-glass-foot-link" onClick={onReset}>
            Reset data
          </button>
          <button type="button" className="admin-glass-foot-btn" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
