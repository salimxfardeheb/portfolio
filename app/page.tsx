import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OpenStatus, TopBar } from "@/components/layout/TopBar";
import { DotField } from "@/components/hero/DotField";
import { AccentText } from "@/components/ui/AccentText";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { Segments } from "@/components/sections/Segments";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProjectList } from "@/components/sections/ProjectList";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { team } from "@/content/site";
import { pageMetadata } from "@/content/seo";
import { contact, hero, realisations, segments, services } from "@/content/accueil";

export const metadata: Metadata = pageMetadata({
  title: null,
  description:
    "Agence web à Oran : boutiques en ligne, sites vitrines, menus QR et logiciels de gestion sur mesure pour les commerces en Algérie. Paiement unique, sans abonnement.",
  path: "/",
});

const nav = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Équipe", href: "#equipe" },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader links={nav} />
      <main id="contenu">
        <div className="relative overflow-hidden">
          <DotField />
          <section className="page-x relative z-[1]">
            <TopBar left={<span>Agence web à Oran, Algérie</span>} right={<OpenStatus />} />
            <h1 className="mt-12 max-w-[1000px] text-[clamp(44px,6.4vw,88px)] leading-none font-medium tracking-[-0.04em] md:mt-[72px]">
              <AccentText title={hero.title} />
            </h1>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-8 pb-24 md:mt-[72px]">
              <p className="max-w-[460px] leading-[1.55] text-body">{hero.lead}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#contact">Demander un devis</ButtonLink>
                <ButtonLink href="#solutions" variant="outline">
                  Voir nos offres
                </ButtonLink>
              </div>
            </div>
          </section>
        </div>
        <section id="services" className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Nos services</SectionLabel>
          <p className="my-14 max-w-[760px] text-[clamp(32px,3.6vw,48px)] leading-[1.05] font-medium tracking-[-0.03em]">
            Ce que nous réalisons pour vous
          </p>
          <ServicesGrid services={services} border="top" />
        </section>
        <section id="solutions" className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Pour qui</SectionLabel>
          <p className="mt-14 max-w-[760px] text-[clamp(32px,3.6vw,48px)] leading-[1.05] font-medium tracking-[-0.03em]">
            Une offre adaptée à votre activité
          </p>
          <Segments segments={segments} />
        </section>

        <section id="realisations" className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Réalisations</SectionLabel>
          <ProjectList projects={realisations} />
        </section>

        <section id="equipe" className="page-x pb-[88px]">
          <SectionLabel>Qui sommes-nous</SectionLabel>
          <div className="mt-9 flex flex-wrap items-start gap-x-12 gap-y-8">
            <p className="flex-[1_1_260px] text-2xl leading-[1.15] font-medium tracking-[-0.02em]">
              Une petite équipe, un interlocuteur direct
            </p>
            <div className="flex min-w-0 flex-[999_1_640px] flex-wrap gap-8">
              {team.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <ContactFooter contact={contact} source="Accueil" note="Paiement unique, sans abonnement" />
    </>
  );
}
