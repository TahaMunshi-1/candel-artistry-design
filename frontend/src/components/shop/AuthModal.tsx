import { useState } from "react";
import { useCustomerAuth } from "../../context/CustomerAuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, login, signup } =
    useCustomerAuth();

  const [mode, setMode] = useState<"login" | "signup">(authMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!fullName.trim()) throw new Error("Please enter your name");
        await signup(fullName, email, password);
      } else {
        await login(email, password);
      }
      closeAuthModal();
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gold/40 bg-ivory p-7 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          className="absolute right-5 top-5 rounded-full p-1.5 text-taupe hover:text-burgundy"
          onClick={closeAuthModal}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="text-center">
          <p className="font-serif text-[0.72rem] tracking-[0.25em] uppercase text-burgundy">
            Candle Artistry Design
          </p>
          <h2 className="mt-2 font-serif text-[1.4rem] tracking-[0.04em] text-ink">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-1 text-[0.82rem] text-taupe">
            {mode === "login"
              ? "Sign in to complete your checkout and track orders."
              : "Register to enjoy seamless checkout and exclusive releases."}
          </p>
        </div>

        <div className="mt-6 flex border-b border-gold/25">
          <button
            type="button"
            className={`flex-1 pb-3 text-center font-serif text-[0.82rem] tracking-[0.1em] uppercase transition-colors ${
              mode === "login"
                ? "border-b-2 border-burgundy text-ink font-semibold"
                : "text-taupe hover:text-ink"
            }`}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`flex-1 pb-3 text-center font-serif text-[0.82rem] tracking-[0.1em] uppercase transition-colors ${
              mode === "signup"
                ? "border-b-2 border-burgundy text-ink font-semibold"
                : "text-taupe hover:text-ink"
            }`}
            onClick={() => {
              setMode("signup");
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" ? (
            <div>
              <label className="block text-[0.72rem] font-medium text-taupe uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-gold/40 bg-cream/50 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-gold"
                placeholder="Sofia Nguyen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          ) : null}

          <div>
            <label className="block text-[0.72rem] font-medium text-taupe uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-gold/40 bg-cream/50 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-gold"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[0.72rem] font-medium text-taupe uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-gold/40 bg-cream/50 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-gold"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-burgundy/10 p-2.5 text-center text-xs text-burgundy font-medium">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gold py-3 font-serif text-[0.76rem] tracking-[0.22em] uppercase text-ivory hover:bg-burgundy transition-colors disabled:opacity-50"
          >
            {loading
              ? "Authenticating…"
              : mode === "login"
              ? "Sign In to Continue"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
