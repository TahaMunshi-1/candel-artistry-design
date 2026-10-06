import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  useAdminAuth,
  useCatalog,
} from "../../catalog/CatalogContext";
import { api } from "../../services/api";
import AdminSidebar from "./AdminSidebar";
import "./admin-shell.css";
import "./liquid-glass-kit.css";

function AdminLogin({
  onLogin,
}: {
  onLogin: (pw: string, email?: string) => Promise<boolean> | boolean;
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!fullName.trim() || !email.trim() || !password.trim()) {
          setError("Please provide your name, email, and password.");
          setLoading(false);
          return;
        }
        await api.signup({
          fullName: fullName.trim(),
          email: email.trim(),
          password: password.trim(),
        });
        setSuccess("Admin account created! Please log in.");
        setIsRegister(false);
      } else {
        const ok = await onLogin(password, email);
        if (!ok) {
          setError("Invalid email or password.");
        }
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell admin-shell--login">
      <form
        className="admin-login-card liquid-glass liquid-glass-strong"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="admin-login-kicker">Commerce Console</p>
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              className={`pb-0.5 border-b-2 font-medium transition-colors ${
                !isRegister
                  ? "border-burgundy text-ink font-semibold"
                  : "border-transparent text-taupe hover:text-ink"
              }`}
              onClick={() => {
                setIsRegister(false);
                setError("");
                setSuccess("");
              }}
            >
              Sign In
            </button>
            <span className="text-taupe">·</span>
            <button
              type="button"
              className={`pb-0.5 border-b-2 font-medium transition-colors ${
                isRegister
                  ? "border-burgundy text-ink font-semibold"
                  : "border-transparent text-taupe hover:text-ink"
              }`}
              onClick={() => {
                setIsRegister(true);
                setError("");
                setSuccess("");
              }}
            >
              Onboard Admin
            </button>
          </div>
        </div>

        <h1>{isRegister ? "Admin Setup" : "CAD Admin"}</h1>
        <p className="admin-login-lead">
          {isRegister
            ? "Create a new administrator profile for store operations."
            : "Sign in to manage catalog, orders, and customer operations."}
        </p>

        <div className="admin-login-fields">
          {isRegister ? (
            <div>
              <label htmlFor="admin-name">Full Name</label>
              <input
                id="admin-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Eleanor Vance"
                required
              />
            </div>
          ) : null}

          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="admin-pw">Password</label>
          <input
            id="admin-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error ? <p className="admin-login-error">{error}</p> : null}
          {success ? (
            <p className="text-[0.82rem] text-forest font-medium">{success}</p>
          ) : null}

          <button type="submit" className="admin-login-submit" disabled={loading}>
            {loading
              ? "Connecting…"
              : isRegister
              ? "Create Admin Profile"
              : "Enter dashboard"}
          </button>
        </div>

        {!isRegister ? (
          <p className="admin-login-hint">
            Default Admin: <code>{ADMIN_EMAIL}</code> / <code>{ADMIN_PASSWORD}</code>
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default function AdminLayout() {
  const { authed, user, login, logout } = useAdminAuth();
  const { resetCatalog, refreshCatalog } = useCatalog();
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

  const initials =
    user?.fullName
      ? user.fullName
          .split(" ")
          .map((n: string) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "AD";

  return (
    <div className={`admin-shell min-h-screen${navOpen ? " is-nav-open" : ""}`}>
      <div className="admin-shell__frame">
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
          onReset={async () => {
            if (confirm("Reset local catalog and refresh from backend?")) {
              resetCatalog();
              await refreshCatalog();
            }
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
              <input placeholder="Search orders, products, customers..." />
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
                  {initials}
                </span>
                <div className="admin-profile-chip__meta">
                  <strong>{user?.fullName || "Admin"}</strong>
                  <span>{user?.email || "Candle Artistry Design"}</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="ml-2 text-[0.7rem] uppercase tracking-wider text-taupe hover:text-burgundy"
                  title="Sign out"
                >
                  Exit
                </button>
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
