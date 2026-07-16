import Link from 'next/link';
import type { Post } from '@/lib/supabase';
import type { Dictionary, Locale } from '@/lib/i18n';

function pick(post: Post, locale: Locale, field: 'title' | 'excerpt') {
  const sk = post[`${field}_sk`];
  const en = post[`${field}_en`];
  return locale === 'sk' && sk ? sk : en;
}

export default function PostCard({
  post,
  locale,
  dict
}: {
  post: Post;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = pick(post, locale, 'title');
  const excerpt = pick(post, locale, 'excerpt');
  const href = post.external_url || `/${locale}/news/${post.slug}`;
  const external = Boolean(post.external_url);
  const date = post.event_date || post.created_at;

  return (
    <article className="card">
      {post.cover_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_url} alt="" className="card-cover" loading="lazy" />
      ) : (
        <div className="card-cover-placeholder" aria-hidden="true">
          {title.slice(0, 1)}
        </div>
      )}
      <div className="card-body">
        <span className="card-meta">
          {new Date(date).toLocaleDateString(locale === 'sk' ? 'sk-SK' : 'en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </span>
        <h3>
          {external ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            <Link href={href}>{title}</Link>
          )}
        </h3>
        {excerpt && <p>{excerpt}</p>}
        {external ? (
          <a className="card-more" href={href} target="_blank" rel="noopener noreferrer">
            {dict.posts.visitSite} ↗
          </a>
        ) : (
          <Link className="card-more" href={href}>
            {dict.posts.readMore} →
          </Link>
        )}
      </div>
    </article>
  );
}
