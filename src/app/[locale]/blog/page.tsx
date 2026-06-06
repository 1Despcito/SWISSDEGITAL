import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Link } from '@/lib/i18n/navigation';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { LogoMark } from '@/components/layout/Logo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getPosts, readingMinutes } from '@/content/blog';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return buildMetadata({ locale, path: '/blog', title: t('metaTitle'), description: t('metaDescription') });
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <BlogContent />;
}

function BlogContent() {
  const t = useTranslations('Blog');
  const tc = useTranslations('Common');
  const format = useFormatter();
  const posts = getPosts(useLocale());

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Blog', path: '/blog' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <Section tone="light">
        {posts.length === 0 ? (
          <p className="text-center text-body-lg text-ink-muted">{t('empty')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line/[0.06] bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div
                  className="flex aspect-[16/9] items-center justify-center"
                  style={{ backgroundImage: `linear-gradient(135deg, ${post.accent[0]}, ${post.accent[1]})` }}
                >
                  <LogoMark className="h-10 w-10 opacity-90" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-blue">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-ink">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-muted">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-ink-muted">
                    {format.dateTime(new Date(post.date), { dateStyle: 'medium' })} ·{' '}
                    {t('readingTime', { minutes: readingMinutes(post) })}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                    {tc('readMore')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
