import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDict, isLocale, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDict(params.locale);

  return (
    <>
      <Header locale={params.locale} dict={dict} />
      <main>{children}</main>
      <Footer dict={dict} />
    </>
  );
}
