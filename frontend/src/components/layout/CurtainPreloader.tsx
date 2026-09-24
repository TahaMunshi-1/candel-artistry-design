import { useEffect, useState, type ReactNode } from "react";

const MIN_HOLD_MS = 1400;
const OPEN_MS = 1600;

type CurtainPreloaderProps = {
  children: ReactNode;
};

export default function CurtainPreloader({ children }: CurtainPreloaderProps) {
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setGone(true);
      return;
    }

    const started = performance.now();
    let cancelled = false;

    const finishHold = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_HOLD_MS - elapsed);
      window.setTimeout(() => {
        if (cancelled) return;
        setReady(true);
        setOpening(true);
        document.documentElement.classList.add("curtains-open");
        window.setTimeout(() => {
          if (!cancelled) setGone(true);
        }, OPEN_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      finishHold();
    } else {
      window.addEventListener("load", finishHold, { once: true });
    }

    document.documentElement.classList.add("curtains-locked");

    return () => {
      cancelled = true;
      window.removeEventListener("load", finishHold);
      document.documentElement.classList.remove("curtains-locked", "curtains-open");
    };
  }, []);

  useEffect(() => {
    if (gone) {
      document.documentElement.classList.remove("curtains-locked", "curtains-open");
    }
  }, [gone]);

  return (
    <>
      <div
        className={`site-stage${ready ? " is-revealed" : ""}`}
        aria-hidden={!ready}
      >
        {children}
      </div>

      {!gone && (
        <div
          className={`curtain-preloader${opening ? " is-opening" : ""}`}
          role="status"
          aria-live="polite"
          aria-busy={!opening}
          aria-label="Opening Candle Artistry Design"
        >
          <div className="curtain curtain--left" aria-hidden="true">
            <div className="curtain__folds" />
            <div className="curtain__edge" />
          </div>
          <div className="curtain curtain--right" aria-hidden="true">
            <div className="curtain__folds" />
            <div className="curtain__edge" />
          </div>

          <div className="curtain-center">
            <p className="curtain-eyebrow">Artfully Crafted</p>
            <p className="curtain-brand">Candle Artistry Design</p>
            <span className="curtain-rule" />
            <p className="curtain-tag">Intentionally Lit</p>
          </div>

          <div className="curtain-glow" aria-hidden="true" />
        </div>
      )}
    </>
  );
}
