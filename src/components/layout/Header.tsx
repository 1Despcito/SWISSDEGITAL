'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/work', key: 'work' },
  { href: '/pricing', key: 'pricing' },
  { href: '/about', key: 'about' },
  { href: '/blog', key: 'blog' },
] as const;

export function Header() {
  const t = useTranslations('Nav');
  const tc = useTranslations('Common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Only the home page has a dark, full-bleed hero behind the header.
  const overlay = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Solid bar when scrolled OR when the page has no dark hero behind the header.
  const solid = scrolled || !overlay;
  const tone: 'light' | 'dark' = solid ? 'dark' : 'light';

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid
          ? 'border-b border-line/[0.06] bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70'
          : 'bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label="SwissDigiAI — home" className="shrink-0">
          <Logo tone={tone} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  tone === 'light'
                    ? 'text-white/85 hover:bg-white/10 hover:text-white'
                    : 'text-ink/75 hover:bg-ink/5 hover:text-ink',
                  active && (tone === 'light' ? 'text-white' : 'text-blue'),
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle tone={tone} />
          <LanguageSwitcher tone={tone} />
          <Button
            href="/contact"
            size="sm"
            variant={tone === 'light' ? 'secondary' : 'primary'}
            analyticsEvent="cta_click"
            analyticsLabel="header_quote"
          >
            {tc('getQuote')}
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle tone={tone} />
          <LanguageSwitcher tone={tone} />
          <button
            type="button"
            aria-label={menuOpen ? t('close') : t('openMenu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
              tone === 'light' ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/5',
            )}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-line/[0.06] bg-card transition-[max-height] duration-300 lg:hidden',
          menuOpen ? 'max-h-[28rem] border-b' : 'max-h-0',
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-surface"
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-surface"
          >
            {t('contact')}
          </Link>
          <Button
            href="/contact"
            className="mt-2 w-full"
            analyticsEvent="cta_click"
            analyticsLabel="mobile_quote"
          >
            {tc('getQuote')}
          </Button>
        </Container>
      </div>
    </header>
  );
}
