import { cn } from '@/lib/utils';

type EyebrowProps = {
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
};

/** Small uppercase label that sits above section headings. */
export function Eyebrow({ children, tone = 'light', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]',
        tone === 'dark' ? 'text-cyan' : 'text-blue',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn('h-px w-6', tone === 'dark' ? 'bg-cyan/60' : 'bg-blue/40')}
      />
      {children}
    </span>
  );
}
