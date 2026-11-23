import type { AccentTitle } from "@/content/types";
import { AccentText } from "@/components/ui/AccentText";
import { BackHome, TopBar } from "@/components/layout/TopBar";

/** En-tête des pages métier (e-commerçants, cafés & restaurants). */
export function LandingHero({
  category,
  title,
  lead,
}: {
  category: string;
  title: AccentTitle;
  lead: string;
}) {
  return (
    <section className="page-x">
      <TopBar left={<BackHome />} right={<span>{category}</span>} />
      <h1 className="mt-12 max-w-[1000px] text-[clamp(42px,5.6vw,76px)] leading-none font-medium tracking-[-0.04em] md:mt-16">
        <AccentText title={title} />
      </h1>
      <p className="mt-10 max-w-[520px] pb-24 leading-[1.55] text-body">{lead}</p>
    </section>
  );
}
