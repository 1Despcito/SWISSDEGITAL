import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';
export const ogAlt = 'SwissDigiAI — Brands, Websites & AI Systems';

const C = 24;
const CARD = 11;
const DIAG = 9.2;
const cardinals = [
  [C, C - CARD],
  [C, C + CARD],
  [C - CARD, C],
  [C + CARD, C],
];
const diagonals = [
  [C - DIAG, C - DIAG],
  [C + DIAG, C - DIAG],
  [C - DIAG, C + DIAG],
  [C + DIAG, C + DIAG],
];

/** The brand hub-and-spoke glyph (white cardinals + cyan diagonals), no tile. */
function Glyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <g stroke="#36C5F0" strokeWidth="1.4" strokeLinecap="round">
        {diagonals.map(([x, y], i) => (
          <line key={i} x1={C} y1={C} x2={x} y2={y} />
        ))}
      </g>
      {diagonals.map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="1.7" fill="#36C5F0" />
      ))}
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        {cardinals.map(([x, y], i) => (
          <line key={i} x1={C} y1={C} x2={x} y2={y} />
        ))}
      </g>
      {cardinals.map(([x, y], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r="2.8" fill="#fff" />
      ))}
      <circle cx={C} cy={C} r="4.2" fill="#fff" />
    </svg>
  );
}

/** Branded OpenGraph/Twitter card. Shared by the og + twitter image routes. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background:
            'radial-gradient(80% 80% at 85% 10%, rgba(54,197,240,0.25) 0%, rgba(31,111,235,0.12) 35%, transparent 65%), linear-gradient(150deg, #0A1B2E 0%, #0F2A4A 55%, #143D6B 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #2C74F2, #0C2A55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph size={64} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 4, color: '#36C5F0' }}>
            SWISS DIGITAL AGENCY
          </div>
        </div>

        <div style={{ marginTop: 48, fontSize: 76, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
          We build brands, websites & <span style={{ color: '#36C5F0' }}>AI systems</span>.
        </div>

        <div style={{ marginTop: 32, fontSize: 30, color: 'rgba(255,255,255,0.7)' }}>
          Social media · Web & app development · Custom AI · swissdigiai.ch
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
