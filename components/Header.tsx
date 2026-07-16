'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(en|sk)/, '') || '';

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact }
  ];

  return (
    <header className="site-header">
      <div className="container">
        <Link href={`/${locale}`} className="brand">
          <span className="brand-dot" aria-hidden="true" />
          Club Intellectuals
        </Link>
        <nav className="main-nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
              {l.label}
            </Link>
          ))}
          <span className="lang-switch" aria-label="Language">
            <Link href={`/en${rest}`} className={locale === 'en' ? 'on' : ''} lang="en">
              EN
            </Link>
            <Link href={`/sk${rest}`} className={locale === 'sk' ? 'on' : ''} lang="sk">
              SK
            </Link>
          </span>
        </nav>
      </div>
    </header>
  );
}
