import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { CaseThumb } from '@/components/ui/CaseThumb';
import type { CaseStudy } from '@/content/work';

export function WorkCard({ item, priority = false }: { item: CaseStudy; priority?: boolean }) {
  const topMetric = item.results[0];
  return (
    <Link href={`/work/${item.slug}`} className="group block overflow-hidden rounded-2xl border border-line/[0.06] bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <CaseThumb accent={item.accent} image={item.image} label={item.client} priority={priority} />
        <span className="absolute end-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue">{item.categoryLabel}</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{item.client}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{item.summary}</p>
        {topMetric && (
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-ink">{topMetric.value}</span>
            <span className="text-sm text-ink-muted">{topMetric.label}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
