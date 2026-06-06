'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AccordionItem = {
  question: string;
  answer: string;
};

/** Accessible FAQ accordion. Pairs with FAQPage JSON-LD on service pages. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line/10 rounded-2xl border border-line/10 bg-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        const headingId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start text-base font-medium text-ink transition-colors hover:text-blue sm:px-6"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    'h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300',
                    isOpen && 'rotate-180 text-blue',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className="px-5 pb-5 text-body-lg text-ink-muted sm:px-6"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
