import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

/** Decorative neural-node network — pure SVG/CSS, no JS, aria-hidden. */
function HeroNodes() {
  const nodes = [
    { cx: 12, cy: 22, r: 2.5, d: '0s' },
    { cx: 28, cy: 14, r: 3.5, d: '1.2s' },
    { cx: 44, cy: 30, r: 2, d: '0.6s' },
    { cx: 70, cy: 18, r: 3, d: '1.8s' },
    { cx: 86, cy: 34, r: 2.5, d: '0.3s' },
    { cx: 60, cy: 46, r: 2, d: '2.1s' },
    { cx: 90, cy: 64, r: 3.5, d: '0.9s' },
    { cx: 76, cy: 80, r: 2, d: '1.5s' },
  ];
  const lines = [
    [0, 1],
    [1, 2],
    [2, 5],
    [3, 4],
    [3, 1],
    [4, 6],
    [5, 6],
    [6, 7],
  ] as const;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#36C5F0" strokeWidth="0.15" opacity="0.4">
        {lines.map(([a, b], i) => (
          <line key={i} x1={nodes[a]!.cx} y1={nodes[a]!.cy} x2={nodes[b]!.cx} y2={nodes[b]!.cy} />
        ))}
      </g>
      <g fill="#36C5F0">
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r / 2}
            className="animate-float"
            style={{ animationDelay: n.d }}
          />
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  const t = useTranslations('Home.hero');
  const tc = useTranslations('Common');

  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <HeroNodes />
      {/* soft radial glow top-end */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 end-[-10%] h-[480px] w-[480px] rounded-full bg-cyan/20 blur-3xl"
      />
      <Container className="relative flex min-h-[88vh] flex-col justify-center py-32 lg:py-40">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan backdrop-blur">
            {t('eyebrow')}
          </span>

          <h1 className="mt-6 text-h1 font-semibold text-white">
            {t('titleLead')} <span className="text-gradient">{t('titleHighlight')}</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-body-lg text-white/75">{t('subtitle')}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              analyticsEvent="cta_click"
              analyticsLabel="hero_start_project"
            >
              {tc('startProject')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Button>
            <Button
              href="/work"
              size="lg"
              variant="secondary"
              analyticsEvent="cta_click"
              analyticsLabel="hero_view_work"
            >
              {tc('viewWork')}
            </Button>
          </div>

          <p className="mt-12 text-sm uppercase tracking-wider text-white/40">{t('trust')}</p>
        </div>
      </Container>
    </section>
  );
}
