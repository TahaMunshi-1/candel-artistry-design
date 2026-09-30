import { useEffect, useState, type ReactNode } from "react";

type PrologueGateProps = {
  children: ReactNode;
};

/**
 * Full-screen cinematic prologue on every load.
 * Completes via postMessage from /prologue/?embed=1
 */
export default function PrologueGate({ children }: PrologueGateProps) {
  const [done, setDone] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }

    document.documentElement.classList.add("prologue-locked");

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "cad-prologue-complete") {
        setDone(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      document.documentElement.classList.remove("prologue-locked");
    };
  }, [reduced]);

  useEffect(() => {
    if (done) {
      document.documentElement.classList.remove("prologue-locked");
    }
  }, [done]);

  if (done) return <>{children}</>;

  const src = `${import.meta.env.BASE_URL}prologue/index.html?embed=1`;

  return (
    <div className="prologue-gate" role="dialog" aria-label="Cinematic prologue">
      <iframe
        title="A Kingdom in Darkness — Prologue"
        src={src}
        className="prologue-gate__frame"
        allow="autoplay"
      />
    </div>
  );
}
