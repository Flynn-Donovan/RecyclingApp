/**
 * BottleBounty logo: bottle + recycling + reward (coin).
 * Flat, rounded, minimal. Use in header and hero.
 */
export default function Logo({ size = 48, showText = true, variant = "light" }) {
  const isLight = variant === "light";
  const fill = isLight ? "#ffffff" : "var(--color-primary)";
  const accent = isLight ? "#facc15" : "var(--color-lime)";
  const textColor = isLight ? "#ffffff" : "var(--color-text)";

  return (
    <div className="logo" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Bottle: body + neck */}
        <rect x="17" y="8" width="14" height="24" rx="4" fill={fill} opacity={isLight ? 0.95 : 1} />
        <rect x="20" y="4" width="8" height="6" rx="2" fill={fill} opacity={isLight ? 0.95 : 1} />
        {/* Recycling arrow (curved) */}
        <path
          d="M12 20a8 8 0 0112-6.5M36 28a8 8 0 01-12 6.5M24 10v6M24 32v6"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
        />
        {/* Coin / reward */}
        <circle cx="38" cy="38" r="6" fill={accent} />
        <text x="38" y="41" textAnchor="middle" fill="#0F766E" fontSize="8" fontWeight="700" fontFamily="system-ui">$</text>
      </svg>
      {showText && (
        <span className="logo__text" style={{ color: textColor, fontWeight: 700, fontSize: size >= 40 ? "1.35rem" : "1.1rem", letterSpacing: "-0.02em" }}>
          BottleBounty
        </span>
      )}
    </div>
  );
}
