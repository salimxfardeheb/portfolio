import type { Plan } from "@/content/types";
import { ButtonLink } from "./Button";

export function PlanCard({ code, plan }: { code: string; plan: Plan }) {
  const dark = plan.featured;
  return (
    <div
      className={`flex flex-col gap-6 px-6 py-10 sm:px-8 ${
        dark ? "bg-ink text-cream" : "bg-paper text-ink"
      } border-b border-line last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0`}
    >
      <div className={`flex items-baseline justify-between gap-3 ${dark ? "text-dim" : "text-muted"}`}>
        <span className="text-[13px] font-medium">{code}</span>
        <span className="caps">{plan.badge}</span>
      </div>
      <h3 className="text-[40px] font-medium leading-tight tracking-[-0.03em]">{plan.name}</h3>
      <p className={`leading-[1.55] ${dark ? "text-dim" : "text-muted"}`}>{plan.summary}</p>
      <ul className="flex flex-col">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`border-t py-3 text-[15px] leading-[1.45] ${dark ? "border-graphite" : "border-line"}`}
          >
            {feature}
          </li>
        ))}
      </ul>
      <ButtonLink
        href="#contact"
        variant={dark ? "inverse" : "primary"}
        className="mt-auto font-semibold"
      >
        Demander un devis ↗
      </ButtonLink>
    </div>
  );
}
