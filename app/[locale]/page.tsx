import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { getDict, isLocale } from '@/lib/i18n';
import { getPosts } from '@/lib/supabase';

export const revalidate = 60;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  const [news, projects] = await Promise.all([getPosts('news', 3), getPosts('project', 3)]);

  return (
    <>
      <section className="hero container">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1>
              {dict.hero.title1} <span className="mark">{dict.hero.titleMark}</span> {dict.hero.title2}
            </h1>
            <p className="lead">{dict.hero.lead}</p>
            <div className="btn-row">
              <Link href={`/${locale}/projects`} className="btn btn-primary">
                {dict.hero.ctaProjects}
              </Link>
              <Link href={`/${locale}/about`} className="btn btn-ghost">
                {dict.hero.ctaAbout}
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/visuals/hero-home.jpg" alt={dict.hero.imageAlt} fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="band section">
        <div className="container">
          <h2>{dict.home.whoWeAre}</h2>
          <p style={{ maxWidth: '70ch', opacity: 0.92 }}>{dict.home.whoText}</p>
          <Link href={`/${locale}/about`} className="btn btn-primary">
            {dict.nav.about} →
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>{dict.home.featuredProjects}</h2>
          <Link href={`/${locale}/projects`}>{dict.home.viewAll} →</Link>
        </div>
        {projects.length > 0 ? (
          <div className="grid">
            {projects.map((p) => (
              <PostCard key={p.id} post={p} locale={locale} dict={dict} />
            ))}
          </div>
        ) : (
          <p className="empty-note">{dict.posts.empty}</p>
        )}
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>{dict.home.latestNews}</h2>
          <Link href={`/${locale}/news`}>{dict.home.viewAll} →</Link>
        </div>
        {news.length > 0 ? (
          <div className="grid">
            {news.map((p) => (
              <PostCard key={p.id} post={p} locale={locale} dict={dict} />
            ))}
          </div>
        ) : (
          <p className="empty-note">{dict.posts.empty}</p>
        )}
      </section>

      <section className="quote">
        <blockquote>{dict.home.quote}</blockquote>
        {dict.home.quoteAuthor && <cite>— {dict.home.quoteAuthor}</cite>}
      </section>

      <section className="band section">
        <div className="container">
          <h2>{dict.home.contactTitle}</h2>
          <p style={{ maxWidth: '60ch', opacity: 0.92 }}>{dict.home.contactLead}</p>
          <Link href={`/${locale}/contact`} className="btn btn-primary">
            {dict.nav.contact} →
          </Link>
        </div>
      </section>
    </>
  );
}
