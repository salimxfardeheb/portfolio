import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ProjectList } from "@/components/sections/ProjectList";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { getProject, portfolioProjects } from "@/app/data/portfolio";
import { optimizedImage } from "@/app/data/projects/types";
import { pageMetadata } from "@/content/seo";
import { contact } from "@/content/realisations";

// Export statique : une page par projet visible (app/data/portfolio.config.ts), aucune autre.
export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    description: project.excerpt.fr,
    path: `/realisations/${project.slug}`,
  });
}


const nav = [
  { label: "Réalisations", href: "/#realisations" },
  { label: "Le projet", href: "#projet" },
  { label: "Captures", href: "#captures" },
];

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const others = portfolioProjects.filter((other) => other.slug !== project.slug).slice(0, 3);
  const facts = [
    { term: "Secteur", value: project.category.fr },
    { term: "Durée", value: project.duration.fr },
    { term: "Notre rôle", value: project.role.fr },
  ];

  return (
    <>
      <SiteHeader links={nav} />
      <main id="contenu">
        <section className="page-x pb-24 md:pb-[120px]">
          <TopBar
            left={
              <Link
                href="/#realisations"
                className="underline underline-offset-4 transition-colors hover:text-ink"
              >
                Toutes nos réalisations
              </Link>
            }
            right={null}
          />
          <h1 className="mt-12 min-w-0 text-[clamp(44px,6.4vw,88px)] leading-none [overflow-wrap:break-word] font-medium tracking-[-0.04em] md:mt-[72px]">
            {project.name}
          </h1>
          <p className="mt-6 max-w-[760px] text-[clamp(22px,2.4vw,32px)] leading-[1.15] tracking-[-0.02em] text-body">
            {project.tagline.fr}
          </p>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-8 md:mt-16">
            <dl className="grid min-w-0 flex-[1_1_560px] grid-cols-1 border-t border-ink sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.term} className="border-b border-line py-4 sm:pr-6">
                  <dt className="label text-muted">{fact.term}</dt>
                  <dd className="mt-1 leading-[1.45]">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3">
              {project.link && (
                <ButtonLink href={project.link} target="_blank" rel="noopener noreferrer">
                  Voir le site en ligne
                  <span className="sr-only">(nouvel onglet)</span>
                </ButtonLink>
              )}
              <ButtonLink href="#contact" variant={project.link ? "outline" : "primary"}>
                Demander un projet similaire
              </ButtonLink>
            </div>
          </div>

          <div className="mt-14 aspect-[16/10] overflow-hidden border border-line bg-cream md:mt-20">
            {/* eslint-disable-next-line @next/next/no-img-element -- export statique, versions déjà générées par npm run images */}
            <img
              src={optimizedImage(project.cover, "md")}
              srcSet={`${optimizedImage(project.cover, "sm")} 640w, ${optimizedImage(project.cover, "md")} 1280w`}
              sizes="(min-width: 1280px) 1216px, calc(100vw - 4rem)"
              alt={`Page d’accueil de ${project.name}`}
              width={1280}
              height={800}
              fetchPriority="high"
              className="size-full object-cover object-top"
            />
          </div>
        </section>

        <section id="projet" className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Le projet</SectionLabel>
          <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            <div>
              <h3 className="label text-muted">Le besoin</h3>
              <p className="mt-4 max-w-[520px] text-[clamp(19px,1.6vw,22px)] leading-[1.4] tracking-[-0.01em]">
                {project.brief.need}
              </p>
            </div>
            <div>
              <h3 className="label text-muted">Notre solution</h3>
              <p className="mt-4 max-w-[520px] text-[clamp(19px,1.6vw,22px)] leading-[1.4] tracking-[-0.01em]">
                {project.brief.solution}
              </p>
            </div>
          </div>
        </section>

        <section className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Points forts</SectionLabel>
          <ul className="grid grid-cols-1 gap-x-16 md:grid-cols-2">
            {project.highlights.fr.slice(0, 4).map((highlight) => (
              <li key={highlight} className="flex gap-4 border-b border-line py-6 leading-[1.5]">
                <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <section id="captures" className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Captures d’écran</SectionLabel>
          <div className="mt-10">
            <ProjectGallery
              groups={project.gallery
                .map((group) => ({ ...group, shots: group.shots.filter((shot) => shot.src !== project.cover) }))
                .filter((group) => group.shots.length > 0)}
            />
          </div>
        </section>

        <section className="page-x pb-24 md:pb-[120px]">
          <SectionLabel>Technologies</SectionLabel>
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </ul>
        </section>

        {others.length > 0 && (
          <section className="page-x pb-24 md:pb-[120px]">
            <SectionLabel>Autres réalisations</SectionLabel>
            <ProjectList projects={others} />
          </section>
        )}
      </main>
      <ContactFooter contact={contact} source={`Réalisation : ${project.name}`} />
    </>
  );
}
