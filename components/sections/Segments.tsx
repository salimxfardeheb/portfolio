import type { Segment } from "@/content/accueil";
import { ButtonLink } from "@/components/ui/Button";

/** Deux blocs côte à côte (un par public), chacun avec un CTA vers ses offres. */
export function Segments({ segments }: { segments: Segment[] }) {
  return (
    <div className="mt-14 grid gap-px border border-ink bg-ink md:grid-cols-2">
      {segments.map((segment) => (
        <article
          key={segment.id}
          id={segment.id}
          aria-labelledby={`${segment.id}-title`}
          className="flex scroll-mt-24 flex-col gap-6 bg-paper p-7 sm:p-10"
        >
          <span className="label text-muted">{segment.label}</span>
          <h3
            id={`${segment.id}-title`}
            className="text-[clamp(26px,2.6vw,36px)] leading-[1.05] font-medium tracking-[-0.03em]"
          >
            {segment.title}
          </h3>
          <p className="max-w-[460px] leading-[1.55] text-body">{segment.text}</p>
          <ul className="flex flex-col border-t border-line">
            {segment.points.map((point) => (
              <li key={point} className="flex gap-3 border-b border-line py-3 text-body">
                <span aria-hidden="true" className="text-accent">+</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-2">
            <ButtonLink href={segment.href}>
              Voir les offres
            </ButtonLink>
          </div>
        </article>
      ))}
    </div>
  );
}
