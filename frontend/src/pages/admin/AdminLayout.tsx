import { useState } from "react";
import { Outlet } from "react-router";
import { ADMIN_PASSWORD, useAdminAuth, useCatalog } from "../../catalog/CatalogContext";
import AdminSidebar from "./AdminSidebar";
import "./admin-shell.css";

function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="admin-shell admin-shell--login flex min-h-screen items-center justify-center px-4">
      <form
        className="admin-login-card w-full max-w-sm p-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!onLogin(password)) {
            setError("Incorrect password");
            return;
          }
          setError("");
        }}
      >
        <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#e4d2a8]">
          Atelier
        </p>
        <h1 className="mt-2 font-display text-2xl tracking-[0.12em] uppercase text-white">
          Admin
        </h1>
        <p className="mt-3 font-serif text-sm text-white/65">
          Frontend-only catalog editor. Changes save in this browser.
        </p>
        <label className="mt-6 block font-serif text-sm text-white/80" htmlFor="admin-pw">
          Password
        </label>
        <input
          id="admin-pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-white/20 bg-black/25 px-3 py-2.5 font-serif text-white outline-none focus:border-[#e4d2a8]"
          autoComplete="current-password"
        />
        {error ? <p className="mt-2 text-sm text-[#f0b4b0]">{error}</p> : null}
        <button
          type="submit"
          className="mt-5 w-full bg-[#b99a68] py-2.5 font-serif text-[0.7rem] tracking-[0.22em] uppercase text-[#1a0a0c] transition-colors hover:bg-[#e4d2a8]"
        >
          Enter
        </button>
        <p className="mt-4 text-center font-serif text-[0.75rem] text-white/45">
          Default: <code className="text-white/80">{ADMIN_PASSWORD}</code>
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
    <div className="admin-shell min-h-screen text-ink">
      <div className="admin-shell__glow" aria-hidden />
      <div className="admin-shell__frame">
        <AdminSidebar
          onLogout={logout}
          onReset={() => {
            if (confirm("Reset catalog to seed data?")) resetCatalog();
          }}
        />
        <div className="admin-shell__main">
          <header className="admin-topbar">
            <div>
              <p className="font-display text-[0.58rem] tracking-[0.28em] uppercase text-gold">
                Candle Artistry Design
              </p>
              <h1 className="mt-1 font-serif text-xl tracking-[0.04em] text-ink md:text-2xl">
                Dashboard
              </h1>
            </div>
            <p className="hidden max-w-xs text-right font-serif text-sm text-taupe sm:block">
              Catalog edits update the shop in this browser.
            </p>
          </header>
          <main className="admin-shell__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
