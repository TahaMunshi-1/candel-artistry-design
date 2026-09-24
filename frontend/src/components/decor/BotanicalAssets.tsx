import { images } from "../../constants/images";

/** Soft antique-gold botanical vine accent */
export function BotanicalPetal({
  className = "",
  flip = false,
  rotate = 0,
}: {
  className?: string;
  flip?: boolean;
  rotate?: number;
}) {
  return (
    <img
      src={images.botanical}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{
        transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`,
      }}
    />
  );
}

/** Small decorative petal cluster for dividers / corners */
export function PetalAccent({ className = "" }: { className?: string }) {
  return (
    <img
      src={images.botanical}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none object-contain opacity-45 ${className}`}
    />
  );
}

/**
 * Vintage floral corner (burgundy blooms + olive leaves).
 * Designed as a top-left L-shape; use flipX / flipY for other corners.
 */
export function FloralCorner({
  className = "",
  corner = "tl",
}: {
  className?: string;
  corner?: "tl" | "tr" | "bl" | "br";
}) {
  const transform =
    corner === "tr"
      ? "scaleX(-1)"
      : corner === "bl"
        ? "scaleY(-1)"
        : corner === "br"
          ? "scale(-1)"
          : undefined;

  return (
    <img
      src={images.floralCorner}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none object-contain ${className}`}
      style={transform ? { transform } : undefined}
    />
  );
}
