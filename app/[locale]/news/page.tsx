import { notFound } from 'next/navigation';
import PostListPage from '@/components/PostListPage';
import { getDict, isLocale } from '@/lib/i18n';

export const revalidate = 60;

export default function NewsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDict(params.locale);
  return (
    <PostListPage
      locale={params.locale}
      type="news"
      title={dict.posts.newsTitle}
      lead={dict.posts.newsLead}
    />
  );
}
