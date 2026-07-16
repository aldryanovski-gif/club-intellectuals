import { notFound } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import { getDict, isLocale } from '@/lib/i18n';

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDict(params.locale);

  return (
    <div className="container">
      <header className="article-header">
        <p className="eyebrow">{dict.nav.contact}</p>
        <h1>{dict.contact.title}</h1>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '55ch' }}>{dict.contact.lead}</p>
        <p style={{ color: 'var(--ink-soft)' }}>
          📍 {dict.contact.location} · ✉️{' '}
          <a href="mailto:clubintelectuals@gmail.com">clubintelectuals@gmail.com</a>
        </p>
      </header>
      <section className="section" style={{ paddingTop: 8 }}>
        <ContactForm dict={dict} />
      </section>
    </div>
  );
}
