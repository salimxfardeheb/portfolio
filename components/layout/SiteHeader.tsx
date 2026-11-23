import Link from "next/link";
import type { NavLink } from "@/content/site";
import { SITE_NAME } from "@/content/site";

const linkClass = "transition-colors hover:text-accent-strong";

export function SiteHeader({ links }: { links: NavLink[] }) {
  return (
    <header className="sticky top-0 z-10 bg-paper">
      <nav
        aria-label="Navigation principale"
        className="page-x text-[13px] font-medium uppercase tracking-[0.02em]"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-ink py-[18px]">
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
          <a href="#contact" className={linkClass}>
            Demander un devis ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
