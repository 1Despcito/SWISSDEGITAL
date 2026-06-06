import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Link } from '@/lib/i18n/navigation';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { posts, getPost, readingMinutes } from '@/content/blog';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const post = getPost(slug, locale);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${post.title} — SwissDigiAI`,
    description: post.excerpt,
  });
}

export default function ArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();
  return <Article slug={slug} />;
}

function Article({ slug }: { slug: string }) {
  const t = useTranslations('Blog');
  const format = useFormatter();
  const post = getPost(slug, useLocale())!;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        path={`/blog/${slug}`}
        datePublished={post.date}
        author={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />

      <section className="border-b border-line/[0.06] bg-surface pt-28 lg:pt-36">
        <Container className="max-w-3xl pb-12">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:underline">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
            {t('backToBlog')}
          </Link>
          <h1 className="mt-6 text-h1">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            {t('by', { author: post.author })} ·{' '}
            {format.dateTime(new Date(post.date), { dateStyle: 'long' })} ·{' '}
            {t('readingTime', { minutes: readingMinutes(post) })}
          </p>
        </Container>
      </section>

      <Section tone="light">
        <article className="mx-auto max-w-3xl space-y-6 text-body-lg text-ink-muted">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      </Section>
    </>
  );
}
