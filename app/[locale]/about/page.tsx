import { notFound } from 'next/navigation';
import { getDict, isLocale } from '@/lib/i18n';

const erasmusProjects = [
  '2015-1-BG01-KA105-013549',
  '2016-1-BG01-KA105-023181',
  '2016-1-BG01-KA105-023436',
  '2016-3-BG01-KA105-035237',
  '2017-3-BG01-KA105-046794',
  '2018-1-BG01-KA204-047980'
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <div className="container">
      <header className="article-header">
        <p className="eyebrow">{dict.nav.about}</p>
        <h1>{dict.about.title}</h1>
      </header>
      <div className="prose section" style={{ paddingTop: 0 }}>
        <p>{dict.about.p1}</p>
        <p>{dict.about.p2}</p>
        <p>{dict.about.p3}</p>
        <p>{dict.about.p4}</p>
        <p>{dict.about.p5}</p>

        <h2>{dict.about.teamTitle}</h2>
        <p>{dict.about.teamText}</p>

        <h2>{dict.about.experienceTitle}</h2>
        <p>{dict.about.experienceText}</p>
        <ul>
          {erasmusProjects.map((code) => (
            <li key={code}>Erasmus+ {code}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
