'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { WorkCard } from './WorkCard';
import { caseStudies } from '@/content/work';
import { services } from '@/content/services';
import { cn } from '@/lib/utils';

export function WorkGrid() {
  const t = useTranslations('Work');
  const [filter, setFilter] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set(caseStudies.map((c) => c.category));
    return Array.from(set);
  }, []);

  const visible = filter === 'all' ? caseStudies : caseStudies.filter((c) => c.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
          {t('filterAll')}
        </FilterChip>
        {categories.map((cat) => (
          <FilterChip key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
            {services[cat].title}
          </FilterChip>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, i) => (
          <WorkCard key={item.slug} item={item} priority={i < 3} />
        ))}
      </div>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition-colors',
        active ? 'bg-blue text-white' : 'bg-surface text-ink/70 hover:bg-ink/5 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
