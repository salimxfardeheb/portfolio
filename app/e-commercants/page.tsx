import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LandingHero } from "@/components/sections/LandingHero";
import { Offers } from "@/components/sections/Offers";
import { CareSection } from "@/components/sections/CareSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProjectList } from "@/components/sections/ProjectList";
import { ContactFooter } from "@/components/sections/ContactFooter";
import {
  benefits,
  care,
  contact,
  hero,
  plans,
  plansNote,
  services,
  similarProjects,
} from "@/content/e-commercants";

export const metadata: Metadata = pageMetadata({
  title: "Boutique en ligne sur mesure pour e-commerçants",
  description:
    "Boutique en ligne au design de votre marque : livraison intégrée, administration, Google Sheets et tracking Facebook / TikTok après confirmation.",
  path: "/e-commercants",
});


const nav = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
];

export default function EcommercantsPage() {
  return (
    <>
      <SiteHeader links={nav} />
      <main id="contenu">
        <LandingHero category="E-commerçants" title={hero.title} lead={hero.lead} />
        <Offers plans={plans} note={plansNote} benefits={benefits} />
        <CareSection title={care.title} text={care.text} />

        <section id="services" className="page-x py-24 md:py-[120px]">
          <SectionLabel>Ce que comprend votre boutique</SectionLabel>
          <div className="mt-6">
            <ServicesGrid services={services} border="bottom" />
          </div>
        </section>

        <section id="projets" className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Projets similaires</SectionLabel>
          <ProjectList projects={similarProjects} />
        </section>
      </main>
      <ContactFooter contact={contact} source="E-commerçants" />
    </>
  );
}
