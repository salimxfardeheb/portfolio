import Link from "next/link";
import { pages, socials, SITE_NAME } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";

const linkClass = "text-cream transition-colors hover:text-accent-soft";

/** Bas de page commun (liens, réseaux, mentions). Le formulaire est rendu au-dessus par ContactSection. */
export function SiteFooter({ note }: { note?: string }) {
  return (
    <>
      <div className="page-x">
        <div className="flex flex-wrap gap-10 border-t border-graphite py-10 text-sm">
          <FooterColumn title="Pages">
            {pages.map((page) => (
              <Link key={page.href} href={page.href} className={linkClass}>
                {page.label}
              </Link>
            ))}
          </FooterColumn>
          <FooterColumn title="Réseaux">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {social.label} <Arrow />
              </a>
            ))}
          </FooterColumn>
          <FooterColumn title="Agence">
            <span>Oran, Algérie</span>
            <span>Projets partout en Algérie</span>
          </FooterColumn>
        </div>
      </div>
      <div className="page-x caps flex flex-wrap justify-between gap-3 pt-5 pb-8 text-dim">
        <span>
          © {new Date().getFullYear()} {SITE_NAME} — Salim Fardeheb, auto-entrepreneur, Oran.
        </span>
        {note && <span>{note}</span>}
      </div>
    </>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-[1_1_200px] flex-col gap-3">
      <span className="caps text-dim">{title}</span>
      {children}
    </div>
  );
}
