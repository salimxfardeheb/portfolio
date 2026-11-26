import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { optimizedImage, type Project } from "@/app/data/projects/types";

/** Ligne de projet : capture du site, puis secteur, nom et phrase courte. Mène à l'étude de cas. */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group grid grid-cols-1 items-start gap-6 border-b border-line py-9 active:opacity-80 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)_auto] md:gap-10"
    >
      <div className="aspect-[16/10] overflow-hidden border border-line bg-cream transition-colors group-hover:border-ink">
        {/* eslint-disable-next-line @next/next/no-img-element -- export statique, versions déjà générées par npm run images */}
        <img
          src={optimizedImage(project.cover, "sm")}
          srcSet={`${optimizedImage(project.cover, "sm")} 640w, ${optimizedImage(project.cover, "md")} 1280w`}
          sizes="(min-width: 768px) 300px, calc(100vw - 4rem)"
          alt=""
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <span className="label text-muted">{project.category.fr}</span>
        <h3 className="text-[clamp(26px,2.6vw,34px)] font-medium tracking-[-0.03em] [overflow-wrap:break-word] transition-colors group-hover:text-accent-strong">
          {project.name}
        </h3>
        <p className="max-w-[560px] leading-[1.55] text-muted">{project.excerpt.fr}</p>
        <span className="label mt-2 text-ink underline underline-offset-4 md:hidden">Voir le projet</span>
      </div>
      <FiArrowRight
        aria-hidden="true"
        className="mt-1 hidden size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none md:block"
      />
    </Link>
  );
}
