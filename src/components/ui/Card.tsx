import { cn } from '@/lib/utils';

type CardProps = {
  className?: string;
  /** Adds hover lift + shadow for interactive cards. */
  interactive?: boolean;
  tone?: 'light' | 'dark';
  children: React.ReactNode;
};

export function Card({ className, interactive = false, tone = 'light', children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 sm:p-7',
        tone === 'light'
          ? 'border border-line/[0.06] bg-card shadow-soft'
          : 'border border-white/10 bg-white/[0.04] backdrop-blur',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1',
        className,
      )}
    >
      {children}
    </div>
  );
}
