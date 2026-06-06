import { useLocale, useTranslations } from 'next-intl';
import { Mail, MapPin, Linkedin, Instagram, Github } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { Container } from '@/components/ui/Container';
import { getLocalizedServices } from '@/content/services';

const CONTACT_EMAIL = 'hello@swissdigiai.ch';

const SOCIALS = [
  { href: 'https://www.linkedin.com/company/swissdigiai', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.instagram.com/swissdigiai', label: 'Instagram', Icon: Instagram },
  { href: 'https://github.com/swissdigiai', label: 'GitHub', Icon: Github },
];

export function Footer() {
  const t = useTranslations('Footer');
  const tn = useTranslations('Nav');
  const locale = useLocale();
  const services = getLocalizedServices(locale);
  const year = new Date().getFullYear();

  const companyLinks = [
    { href: '/about', label: tn('about') },
    { href: '/work', label: tn('work') },
    { href: '/pricing', label: tn('pricing') },
    { href: '/blog', label: tn('blog') },
    { href: '/contact', label: tn('contact') },
  ];

  const legalLinks = [
    { href: '/legal/privacy', label: t('privacy') },
    { href: '/legal/imprint', label: t('imprint') },
    { href: '/legal/terms', label: t('terms') },
  ];

  return (
    <footer className="bg-navy text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="SwissDigiAI — home">
              <Logo tone="light" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{t('tagline')}</p>
            <div className="mt-6 max-w-sm">
              <p className="text-sm font-medium text-white">{t('newsletterTitle')}</p>
              <p className="mb-3 mt-1 text-sm text-white/55">{t('newsletterBody')}</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <FooterCol title={t('company')} links={companyLinks} />
            <FooterCol
              title={t('servicesTitle')}
              links={services.map((s) => ({
                href: `/services/${s.slug}`,
                label: s.title,
              }))}
            />
            <FooterCol title={t('legalTitle')} links={legalLinks} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
              {t('contactTitle')}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan" aria-hidden />
                {t('office')}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan" aria-hidden />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-cyan hover:text-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>© {year} SwissDigiAI.</p>
          <p className="text-white/40">Designed &amp; built in Switzerland 🇨🇭</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-white/50">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
