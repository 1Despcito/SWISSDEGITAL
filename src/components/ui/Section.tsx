import { cn } from '@/lib/utils';
import { Container } from './Container';

type SectionProps = {
  id?: string;
  /** Visual theme of the section background. */
  tone?: 'light' | 'cloud' | 'dark' | 'gradient';
  className?: string;
  containerClassName?: string;
  /** Render without the inner Container (full-bleed content). */
  bleed?: boolean;
  children: React.ReactNode;
};

const tones: Record<NonNullable<SectionProps['tone']>, string> = {
  light: 'bg-bg text-ink',
  cloud: 'bg-surface text-ink',
  dark: 'bg-navy text-white',
  gradient: 'bg-hero-gradient text-white',
};

/** Vertical rhythm + background tone wrapper for page sections. */
export function Section({
  id,
  tone = 'light',
  className,
  containerClassName,
  bleed = false,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-28', tones[tone], className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
