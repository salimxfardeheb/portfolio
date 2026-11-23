import type { Metadata } from "next";
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
} from "@/content/cafes-restaurants";

export const metadata: Metadata = {
  title: "Site et menu QR pour cafés et restaurants",
  description:
    "Le site de votre café ou restaurant avec menu QR et carte de fidélité. Démo gratuite au design de votre établissement, essai 7 jours avant de payer.",
  alternates: { canonical: "/cafes-restaurants" },
};

const nav = [
  { label: "Offres", href: "#offres" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
];

export default function CafesRestaurantsPage() {
  return (
    <>
      <SiteHeader links={nav} />
      <main>
        <LandingHero category="Cafés & restaurants" title={hero.title} lead={hero.lead} />
        <Offers plans={plans} note={plansNote} benefits={benefits} />
        <CareSection title={care.title} text={care.text} />

        <section id="services" className="page-x py-24 md:py-[120px]">
          <SectionLabel index="02">Services principaux</SectionLabel>
          <div className="mt-6">
            <ServicesGrid services={services} border="bottom" />
          </div>
        </section>

        {/* Vide tant que content/cafes-restaurants.ts → similarProjects est vide. */}
        <section id="projets" className="page-x pb-24 md:pb-[120px]">
          <SectionLabel index="03">Projets similaires</SectionLabel>
          <ProjectList projects={similarProjects} />
        </section>
      </main>
      <ContactFooter contact={contact} source="Cafés & restaurants" />
    </>
  );
}
