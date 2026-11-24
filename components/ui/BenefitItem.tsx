import type { Benefit } from "@/content/types";

export function BenefitItem({ index, benefit }: { index: string; benefit: Benefit }) {
  return (
    <div className="flex flex-col gap-3 border-t border-ink py-8">
      <span className="text-[13px] font-medium text-accent-strong">{index}</span>
      <h3 className="text-2xl font-medium leading-[1.15] tracking-[-0.02em]">{benefit.title}</h3>
      <p className="leading-[1.55] text-body">{benefit.text}</p>
    </div>
  );
}
