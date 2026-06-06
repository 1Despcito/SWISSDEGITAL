import { cn } from '@/lib/utils';

/**
 * SwissDigiAI brand mark — the hub-and-spoke neural glyph inside the blue→navy
 * gradient tile (matches icon_app from the brand package). Reproduced as crisp
 * SVG so it scales perfectly at any size and works on light or dark backgrounds.
 */
export function LogoMark({ className }: { className?: string }) {
  // Geometry on a 48×48 grid, centred at (24,24).
  const c = 24;
  const card = 11; // cardinal spoke length
  const diag = 9.2; // diagonal spoke offset per axis
  const cardinals = [
    [c, c - card],
    [c, c + card],
    [c - card, c],
    [c + card, c],
  ];
  const diagonals = [
    [c - diag, c - diag],
    [c + diag, c - diag],
    [c - diag, c + diag],
    [c + diag, c + diag],
  ];

  return (
    <svg viewBox="0 0 48 48" className={cn('h-9 w-9', className)} role="img" aria-label="SwissDigiAI">
      <defs>
        <linearGradient id="sdai-tile" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2C74F2" />
          <stop offset="0.55" stopColor="#1A56C4" />
          <stop offset="1" stopColor="#0C2A55" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="46" height="46" rx="12" fill="url(#sdai-tile)" />

      {/* diagonal spokes — light blue */}
      <g stroke="#36C5F0" strokeWidth="1.4" strokeLinecap="round">
        {diagonals.map(([x, y], i) => (
          <line key={i} x1={c} y1={c} x2={x} y2={y} />
        ))}
      </g>
      <g fill="#36C5F0">
        {diagonals.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.7" />
        ))}
      </g>

      {/* cardinal spokes — white */}
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        {cardinals.map(([x, y], i) => (
          <line key={i} x1={c} y1={c} x2={x} y2={y} />
        ))}
      </g>
      <g fill="#fff">
        {cardinals.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.8" />
        ))}
      </g>

      {/* hub */}
      <circle cx={c} cy={c} r="4.2" fill="#fff" />
    </svg>
  );
}

export function Logo({
  tone = 'light',
  className,
  withWordmark = true,
}: {
  /** "light" = for dark backgrounds (white text); "dark" = for light backgrounds. */
  tone?: 'light' | 'dark';
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      {withWordmark && (
        <span
          className={cn(
            'text-lg font-bold tracking-tight',
            tone === 'light' ? 'text-white' : 'text-ink',
          )}
        >
          SwissDigi
          <span className={tone === 'light' ? 'text-cyan' : 'text-blue'}>AI</span>
        </span>
      )}
    </span>
  );
}
