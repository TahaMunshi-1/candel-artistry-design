import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { ADMIN_PASSWORD, useAdminAuth, useCatalog } from "../../catalog/CatalogContext";
import AdminSidebar from "./AdminSidebar";
import "./admin-shell.css";
import "./liquid-glass-kit.css";

function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="admin-shell admin-shell--login">
      <form
        className="admin-login-card liquid-glass liquid-glass-strong"
        onSubmit={(e) => {
          e.preventDefault();
          if (!onLogin(password)) {
            setError("Incorrect password");
            return;
          }
          setError("");
        }}
      >
        <p className="admin-login-kicker">Commerce</p>
        <h1>CAD Admin</h1>
        <p className="admin-login-lead">
          Demo console for catalog + store operations. Local browser storage only.
        </p>

        <div className="admin-login-fields">
          <label htmlFor="admin-pw">Password</label>
          <input
            id="admin-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error ? <p className="admin-login-error">{error}</p> : null}
          <button type="submit" className="admin-login-submit">
            Enter dashboard
          </button>
        </div>

        <p className="admin-login-hint">
          Default: <code>{ADMIN_PASSWORD}</code>
        </p>
      </form>
    </div>
  );
}

export default function AdminLayout() {
  const { authed, login, logout } = useAdminAuth();
  const { resetCatalog } = useCatalog();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px)");
    const onChange = () => {
      if (mq.matches) setNavOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("admin-app");
    document.body.classList.add("admin-app");
    return () => {
      document.documentElement.classList.remove("admin-app");
      document.body.classList.remove("admin-app");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("admin-nav-lock", navOpen);
    return () => document.body.classList.remove("admin-nav-lock");
  }, [navOpen]);

  if (!authed) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className={`admin-shell min-h-screen${navOpen ? " is-nav-open" : ""}`}>
      <div className="admin-shell__frame">
        {/* Backdrop must live in the same stacking context as the sidebar
            so it cannot sit above the drawer and steal tab clicks. */}
        <button
          type="button"
          className="admin-nav-backdrop"
          aria-label="Close navigation"
          tabIndex={navOpen ? 0 : -1}
          onClick={() => setNavOpen(false)}
        />
        <AdminSidebar
          open={navOpen}
          onClose={() => setNavOpen(false)}
          onLogout={logout}
          onReset={() => {
            if (confirm("Reset catalog to seed data?")) resetCatalog();
          }}
        />
        <div className="admin-shell__main">
          <header className="admin-topbar">
            <button
              type="button"
              className="admin-menu-btn"
              aria-label={navOpen ? "Close menu" : "Open menu"}
              aria-expanded={navOpen}
              aria-controls="admin-sidebar"
              onClick={() => setNavOpen((v) => !v)}
            >
              <span className="admin-menu-btn__bars" aria-hidden>
                <i />
                <i />
                <i />
              </span>
            </button>

            <div className="admin-topbar__search liquid-glass-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16.2 16.2 20 20" strokeLinecap="round" />
              </svg>
              <input placeholder="Search orders, products, customers..." readOnly />
            </div>
            <div className="admin-topbar__right">
              <div className="admin-profile-chip liquid-glass-soft">
                <button type="button" className="admin-notify admin-notify--inline" aria-label="Notifications">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4 1.5 5.5 1.5 5.5H5s1.5-1.5 1.5-5.5Z" strokeLinejoin="round" />
                    <path d="M10 18.5a2 2 0 0 0 4 0" strokeLinecap="round" />
                  </svg>
                  <span className="admin-notify__dot" />
                </button>
                <span className="admin-profile-chip__divider" aria-hidden />
                <span className="admin-avatar" aria-hidden>
                  AD
                </span>
                <div className="admin-profile-chip__meta">
                  <strong>Admin</strong>
                  <span>Candle Artistry Design</span>
                </div>
                <span className="admin-profile-chip__caret" aria-hidden>
                  ⌄
                </span>
              </div>
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
