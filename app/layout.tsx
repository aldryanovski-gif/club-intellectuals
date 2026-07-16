import type { Metadata } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/manrope';
import './globals.css';

export const metadata: Metadata = {
  title: 'Club Intellectuals',
  description:
    'Club of Intellectuals Association — a Slovak NGO supporting non-formal education and lifelong learning for adults and youth.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
