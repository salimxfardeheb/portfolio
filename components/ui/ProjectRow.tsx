import type { Project } from "@/content/site";

export function ProjectRow({ code, project }: { code: string; project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-wrap items-start gap-x-8 gap-y-4 border-b border-line py-9"
    >
      <span className="w-14 shrink-0 text-[13px] font-medium text-muted">{code}</span>
      <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-2.5">
        <h3 className="text-[clamp(26px,2.6vw,34px)] font-medium tracking-[-0.03em] transition-colors group-hover:text-accent-strong">
          {project.name}
        </h3>
        <p className="max-w-[560px] leading-[1.55] text-muted">{project.summary}</p>
      </div>
      <span className="caps w-[200px] shrink-0 text-muted">{project.category}</span>
      <span
        aria-hidden="true"
        className="w-6 shrink-0 text-lg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
      <span className="sr-only">(ouvre le site du projet dans un nouvel onglet)</span>
    </a>
  );
}
