import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { getDict, isLocale } from '@/lib/i18n';
import { getPosts, type PostType } from '@/lib/supabase';

export default async function PostListPage({
  locale,
  type,
  title,
  lead
}: {
  locale: string;
  type: PostType;
  title: string;
  lead: string;
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
