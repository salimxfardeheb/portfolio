import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "inverse" | "inverse-outline";

const base =
  "inline-flex min-h-12 items-center justify-center px-[22px] py-4 text-[13px] font-medium uppercase tracking-[0.02em] transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-accent-strong",
  outline: "border border-ink bg-paper text-ink hover:bg-ink hover:text-paper",
  inverse: "bg-cream text-ink font-semibold hover:bg-paper",
  "inverse-outline": "border border-iron text-cream hover:border-cream",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
