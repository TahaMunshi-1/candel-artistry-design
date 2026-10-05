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
        <p className="text-[0.7rem] tracking-[0.18em] uppercase text-white/50">Commerce</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">CAD Admin</h1>
        <p className="mt-3 text-sm text-white/60">
          Demo console for catalog + store operations. Local browser storage only.
        </p>
        <label className="mt-6 block text-sm text-white/75" htmlFor="admin-pw">
          Password
        </label>
        <input
          id="admin-pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2.5 text-white outline-none focus:border-[#c4a574]"
          autoComplete="current-password"
        />
        {error ? <p className="mt-2 text-sm text-[#f0b4b0]">{error}</p> : null}
        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-[#c4a574] py-2.5 text-sm font-medium text-[#1a0a0c] transition-colors hover:bg-[#e4d2a8]"
        >
          Enter dashboard
        </button>
        <p className="mt-4 text-center text-xs text-white/40">
          Default: <code className="text-white/70">{ADMIN_PASSWORD}</code>
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
    <div className="admin-shell min-h-screen">
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
            <div className="admin-topbar__search">
              <span aria-hidden>⌕</span>
              <input placeholder="Search orders, customers, products…" readOnly />
            </div>
            <div className="admin-topbar__right">
              <span className="admin-pill">Demo mode</span>
              <span className="admin-avatar" aria-hidden>
                AD
              </span>
            </div>
          </header>
          <main className="admin-shell__content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
