import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { getDict, isLocale } from '@/lib/i18n';
import { getPosts, type PostType } from '@/lib/supabase';

export interface PageIntro {
  eyebrow: string;
  heading: string;
  lead1: string;
  lead2: string;
  imageAlt: string;
  features: { icon: string; title: string; text: string }[];
}

export default async function PostListPage({
  locale,
  type,
  title,
  lead,
  intro,
  introImage
}: {
  locale: string;
  type: PostType;
  title: string;
  lead: string;
  intro?: PageIntro;
  introImage?: string;
}) {
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const posts = await getPosts(type);

  return (
    <div className="container">
      <header className="article-header">
        <p className="eyebrow">{title}</p>
        <h1>{title}</h1>
        <p className="lead" style={{ color: 'var(--ink-soft)', maxWidth: '60ch' }}>
          {lead}
        </p>
      </header>
      {intro && introImage && (
        <section className="page-intro">
          <div className="page-intro-grid">
            <div>
              <p className="eyebrow">{intro.eyebrow}</p>
              <h2>{intro.heading}</h2>
              <p>{intro.lead1}</p>
              {intro.lead2 && <p>{intro.lead2}</p>}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={introImage} alt={intro.imageAlt} className="page-intro-visual" />
          </div>
          <div className="intro-features">
            {intro.features.map((f) => (
              <div key={f.title} className="feature">
                <span className="feature-chip" aria-hidden="true">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="section" style={{ paddingTop: 8 }}>
        {posts.length > 0 ? (
          <div className="grid">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} locale={locale} dict={dict} />
            ))}
          </div>
        ) : (
          <p className="empty-note">{dict.posts.empty}</p>
        )}
      </section>
    </div>
  );
}
