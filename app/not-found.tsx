import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { buttonClass } from "@/components/ui/Button";
import { pages } from "@/content/site";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n’existe pas ou a été déplacée lors de la refonte du site.",
  // Next.js ajoute lui-même <meta name="robots" content="noindex"> sur la 404.
};

export default function NotFound() {
  return (
    <>
      <SiteHeader links={pages.slice(1)} quoteHref="/#contact" />
      <main id="contenu" className="page-x pt-12 pb-24 md:pt-16 md:pb-[120px]">
        <SectionLabel as="p">
          Page introuvable
        </SectionLabel>
        <h1 className="mt-14 max-w-[800px] text-[clamp(40px,5vw,64px)] leading-none font-medium tracking-[-0.04em]">
          Cette page n’existe pas.
        </h1>
        <p className="mt-8 max-w-[460px] leading-[1.55] text-body">
          Elle a peut-être été déplacée lors de la refonte du site. Choisissez une page ci-dessous.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {pages.map((page, i) => (
            <Link key={page.href} href={page.href} className={buttonClass(i === 0 ? "primary" : "outline")}>
              {page.label}
            </Link>
          ))}
        </div>
      </main>
      <footer className="bg-ink pt-6 text-cream">
        <SiteFooter />
      </footer>
    </>
  );
}
