import { Tag } from "@/components/ui/Tag";

const TAGS = ["Surveillance", "Connexion sécurisée HTTPS", "Mises à jour de sécurité", "Intervention rapide"];

/** Bandeau crème « Suivi & sécurité ». */
export function CareSection({ title, text }: { title: string; text: string }) {
  return (
    <section aria-labelledby="suivi-title" className="bg-cream">
      <div className="page-x flex flex-wrap items-start gap-12 py-24">
        <div className="min-w-0 flex-[1_1_360px]">
          <span className="caps text-muted">— Suivi &amp; sécurité</span>
          <h2
            id="suivi-title"
            className="mt-5 text-[clamp(30px,3.4vw,44px)] leading-[1.05] font-medium tracking-[-0.03em]"
          >
            {title}
          </h2>
        </div>
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
          <p className="text-[17px] leading-[1.6] text-body">{text}</p>
          <ul className="flex flex-wrap gap-2.5">
            {TAGS.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
