import { notFound } from 'next/navigation';
import PostListPage from '@/components/PostListPage';
import { getDict, isLocale } from '@/lib/i18n';

export const revalidate = 60;

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  return (
    <PostListPage
      locale={locale}
      type="news"
      title={dict.posts.newsTitle}
      lead={dict.posts.newsLead}
    />
  );
}
