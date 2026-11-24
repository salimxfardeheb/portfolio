import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui/Arrow";

/** Bandeau sous la navigation : contexte à gauche, information à droite. */
export function TopBar({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="caps flex flex-wrap justify-between gap-3 py-4 text-muted">
      {left}
      {right}
    </div>
  );
}

export function BackHome() {
  return (
    <Link href="/" className="transition-colors hover:text-ink">
      <Arrow dir="back" /> Accueil
    </Link>
  );
}

export function OpenStatus() {
  return (
    <span className="flex items-center gap-2 text-ink">
      <span aria-hidden="true" className="size-[7px] rounded-full bg-accent" />
      Ouverts aux nouveaux projets
    </span>
  );
}
