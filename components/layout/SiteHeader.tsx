import Link from "next/link";
import type { NavLink } from "@/content/site";
import { SITE_NAME } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";

const linkClass = "transition-colors hover:text-accent-strong";

export function SiteHeader({
  links,
  quoteHref = "#contact",
}: {
  links: NavLink[];
  /** Cible du lien « Demander un devis » (la 404 n'a pas de formulaire : "/#contact"). */
  quoteHref?: string;
}) {
  return (
    <header className="sticky top-0 z-10 bg-paper">
      <nav
        aria-label="Navigation principale"
        className="page-x text-sm font-medium"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-ink py-4">
          <Link href="/" className={`font-semibold ${linkClass}`}>
            {SITE_NAME}
          </Link>
          <ul className="order-last flex w-full flex-wrap gap-x-7 gap-y-2 sm:order-none sm:w-auto">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={quoteHref} className={linkClass}>
            Demander un devis <Arrow />
          </a>
        </div>
      </nav>
    </header>
  );
}
