import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

/** Compact page header band for inner pages. Sits below the fixed header. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line/[0.06] bg-surface pt-28 lg:pt-36">
      <Container className="pb-12 lg:pb-16">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-3xl text-h1">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-body-lg text-ink-muted">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
}
