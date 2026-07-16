import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDict, isLocale } from '@/lib/i18n';
import { getPostBySlug } from '@/lib/supabase';

export const revalidate = 60;

export default async function PostPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = locale === 'sk' && post.title_sk ? post.title_sk : post.title_en;
  const body = locale === 'sk' && post.body_sk ? post.body_sk : post.body_en;
  const date = post.event_date || post.created_at;

  return (
    <div className="container">
      <header className="article-header">
        <p className="eyebrow">{dict.nav[post.type === 'event' ? 'events' : post.type === 'project' ? 'projects' : 'news']}</p>
        <h1>{title}</h1>
        <p className="article-date">
          {new Date(date).toLocaleDateString(locale === 'sk' ? 'sk-SK' : 'en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
      </header>
      {post.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_url} alt="" className="article-cover" />
      )}
      <div className="prose section" style={{ paddingTop: 8 }}>
        {body.split(/\n{2,}/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        {post.external_url && (
          <p>
            <a href={post.external_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {dict.posts.visitSite} ↗
            </a>
          </p>
        )}
        <p>
          <Link href={`/${locale}/news`}>← {dict.posts.back}</Link>
        </p>
      </div>
    </div>
  );
}
