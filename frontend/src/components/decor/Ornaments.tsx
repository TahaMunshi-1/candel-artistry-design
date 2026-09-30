export function FloralMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 4c1.2 6.5 4.8 11.2 10.5 14.2C28.8 20 25.2 24.8 24 32c-1.2-7.2-4.8-12-10.5-13.8C19.2 15.2 22.8 10.5 24 4Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M24 16c.6 3.2 2.4 5.5 5.2 7C26.4 24.2 24.6 26.6 24 30c-.6-3.4-2.4-5.8-5.2-7 2.8-1.5 4.6-3.8 5.2-7Z"
        fill="currentColor"
      />
      <circle cx="24" cy="23" r="1.4" fill="currentColor" />
      <path
        d="M24 32v10M20 38h8"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DiamondMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M6 0.8 11.2 6 6 11.2 0.8 6 6 0.8Z" />
    </svg>
  );
}

export function StarMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M8 0.5 8.7 6.2 14.5 8 8.7 9.8 8 15.5 7.3 9.8 1.5 8 7.3 6.2 8 0.5Z" />
    </svg>
  );
}

export function BotanicalFlourish({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M60 310C58 250 42 210 28 170C48 190 58 140 60 90C62 140 72 190 92 170C78 210 62 250 60 310Z"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.45"
      />
      <path
        d="M60 280C55 240 40 220 30 200"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.35"
      />
      <path
        d="M60 240C65 210 80 195 92 180"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.35"
      />
      <ellipse
        cx="34"
        cy="168"
        rx="10"
        ry="5"
        transform="rotate(-35 34 168)"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.4"
      />
      <ellipse
        cx="86"
        cy="168"
        rx="10"
        ry="5"
        transform="rotate(35 86 168)"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.4"
      />
      <ellipse
        cx="42"
        cy="120"
        rx="8"
        ry="4"
        transform="rotate(-28 42 120)"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.35"
      />
      <ellipse
        cx="78"
        cy="120"
        rx="8"
        ry="4"
        transform="rotate(28 78 120)"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.35"
      />
    </svg>
  );
}

export function ArchFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 16C20 10 16 6 12 4M20 16C20 10 24 6 28 4M20 2v6"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="20" cy="1.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function VineTimeline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M40 20C36 80 52 120 40 180C28 240 48 280 40 400"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      {[70, 140, 210, 280, 350].map((y) => (
        <g key={y}>
          <ellipse
            cx="28"
            cy={y}
            rx="11"
            ry="5"
            transform={`rotate(-40 28 ${y})`}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <ellipse
            cx="52"
            cy={y + 18}
            rx="10"
            ry="4.5"
            transform={`rotate(38 52 ${y + 18})`}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.45"
          />
        </g>
      ))}
    </svg>
  );
}
