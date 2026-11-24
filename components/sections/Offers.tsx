import type { Benefit, Plan } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlanCard } from "@/components/ui/PlanCard";
import { BenefitItem } from "@/components/ui/BenefitItem";

/** Section « Nos offres » : 3 cartes, note de paiement, puis 3 bénéfices. */
export function Offers({ plans, note, benefits }: { plans: Plan[]; note: string; benefits: Benefit[] }) {
  return (
    <section id="offres" className="page-x pb-24 md:pb-[120px]">
      <SectionLabel>Nos offres</SectionLabel>
      <div className="mt-12 grid border border-line lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
      <p className="mt-5 text-[13px] leading-normal text-muted">{note}</p>
      <div className="mt-24 grid gap-x-10 md:grid-cols-3">
        {benefits.map((benefit) => (
          <BenefitItem key={benefit.title} benefit={benefit} />
        ))}
      </div>
    </section>
  );
}
