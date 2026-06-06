import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

// Localized 404 — rendered inside the [locale] layout (header/footer/chrome stay).
export default function LocaleNotFound() {
  const t = useTranslations('NotFound');
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="text-7xl font-semibold text-gradient">404</p>
      <h1 className="mt-4 text-h2">{t('title')}</h1>
      <p className="mt-3 max-w-md text-ink-muted">{t('body')}</p>
      <div className="mt-8">
        <Button href="/" size="lg">
          {t('cta')}
        </Button>
      </div>
    </Container>
  );
}
