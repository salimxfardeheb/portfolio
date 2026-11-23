import type { Benefit, Plan } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlanCard } from "@/components/ui/PlanCard";
import { BenefitItem } from "@/components/ui/BenefitItem";

/** Section « 01 Nos offres » : 3 cartes, note de paiement, puis 3 bénéfices. */
export function Offers({ plans, note, benefits }: { plans: Plan[]; note: string; benefits: Benefit[] }) {
  return (
    <section id="offres" className="page-x pb-24 md:pb-[120px]">
      <SectionLabel index="01">Nos offres</SectionLabel>
      <div className="mt-12 grid border border-line lg:grid-cols-3">
        {plans.map((plan, i) => (
          <PlanCard key={plan.name} code={`P.${String(i + 1).padStart(2, "0")}`} plan={plan} />
        ))}
      </div>
      <p className="mt-5 text-[13px] leading-normal text-muted">{note}</p>
      <div className="mt-24 grid gap-x-10 md:grid-cols-3">
        {benefits.map((benefit, i) => (
          <BenefitItem key={benefit.title} index={String(i + 1).padStart(2, "0")} benefit={benefit} />
        ))}
      </div>
    </section>
  );
}
