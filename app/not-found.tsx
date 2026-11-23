import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { pages } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SiteHeader links={pages.slice(1)} />
      <main className="page-x py-24 md:py-32">
        <p className="caps text-muted">Erreur 404</p>
        <h1 className="mt-6 max-w-[800px] text-[clamp(40px,5vw,64px)] leading-none font-medium tracking-[-0.04em]">
          Cette page <span className="text-accent">n’existe pas</span>.
        </h1>
        <p className="mt-8 max-w-[460px] leading-[1.55] text-body">
          Elle a peut-être été déplacée lors de la refonte du site.
        </p>
        <Link href="/" className={buttonClass("primary", "mt-10")}>
          Retour à l’accueil
        </Link>
      </main>
    </>
  );
}
