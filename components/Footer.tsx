import type { Dictionary } from '@/lib/i18n';

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <span>{dict.footer.tagline}</span>
        <span>
          © {new Date().getFullYear()} {dict.footer.rights} · clubintelectuals@gmail.com
        </span>
      </div>
    </footer>
  );
}
