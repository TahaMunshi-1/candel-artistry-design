import { Link, NavLink, Outlet } from "react-router";
import { ADMIN_PASSWORD, useAdminAuth, useCatalog } from "../../catalog/CatalogContext";
import { useState } from "react";

const nav = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/candles", label: "Candles" },
  { to: "/admin/paintings", label: "Oil Paintings" },
  { to: "/admin/greeting-cards", label: "Greeting Cards" },
];

function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <form
        className="w-full max-w-sm border border-gold/40 bg-cream p-8 shadow-[0_20px_50px_rgba(64,51,43,0.08)]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!onLogin(password)) {
            setError("Incorrect password");
            return;
          }
          setError("");
        }}
      >
        <p className="text-eyebrow text-burgundy">Atelier</p>
        <h1 className="mt-2 font-display text-2xl tracking-[0.12em] uppercase text-ink">
          Admin
        </h1>
        <p className="mt-3 font-serif text-sm text-taupe">
          Frontend-only catalog editor. Changes save in this browser.
        </p>
        <label className="mt-6 block font-serif text-sm text-ink" htmlFor="admin-pw">
          Password
        </label>
        <input
          id="admin-pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-gold/50 bg-ivory px-3 py-2.5 font-serif text-ink outline-none focus:border-gold"
          autoComplete="current-password"
        />
        {error ? <p className="mt-2 text-sm text-royal">{error}</p> : null}
        <button
          type="submit"
          className="mt-5 w-full bg-gold py-2.5 font-serif text-[0.7rem] tracking-[0.22em] uppercase text-ivory hover:bg-burgundy transition-colors"
        >
          Enter
        </button>
        <p className="mt-4 text-center font-serif text-[0.75rem] text-taupe/80">
          Default: <code className="text-ink">{ADMIN_PASSWORD}</code>
        </p>
      </form>
    </div>
  );
}

export default function AdminLayout() {
  const { authed, login, logout } = useAdminAuth();
  const { resetCatalog } = useCatalog();

  if (!authed) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-[#f3eee6] text-ink">
      <header className="border-b border-gold/30 bg-ivory">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="font-display text-[0.65rem] tracking-[0.28em] uppercase text-gold">
              Candle Artistry Design
            </p>
            <h1 className="font-serif text-xl tracking-[0.06em] text-ink">Catalog Admin</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="font-serif text-[0.72rem] tracking-[0.18em] uppercase text-taupe hover:text-burgundy"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset catalog to seed data?")) resetCatalog();
              }}
              className="font-serif text-[0.72rem] tracking-[0.18em] uppercase text-taupe hover:text-burgundy"
            >
              Reset data
            </button>
            <button
              type="button"
              onClick={logout}
              className="border border-gold/50 px-3 py-1.5 font-serif text-[0.68rem] tracking-[0.18em] uppercase text-ink hover:border-burgundy hover:text-burgundy"
            >
              Log out
            </button>
          </div>
        </div>
        <nav
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 md:px-6"
          aria-label="Admin"
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-2 font-serif text-[0.72rem] tracking-[0.16em] uppercase transition-colors ${
                  isActive
                    ? "bg-burgundy text-ivory"
                    : "text-taupe hover:bg-champagne hover:text-ink"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <Outlet />
      </main>
    </div>
  );
}
