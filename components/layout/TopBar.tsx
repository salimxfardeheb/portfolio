import Link from "next/link";
import type { ReactNode } from "react";

/** Bandeau sous la navigation : contexte à gauche, information à droite. */
export function TopBar({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="label flex flex-wrap justify-between gap-3 py-4 text-muted">
      {left}
      {right}
    </div>
  );
}

export function BackHome() {
  return (
    <Link href="/" className="underline underline-offset-4 transition-colors hover:text-ink">
      Retour à l’accueil
    </Link>
  );
}

export function OpenStatus() {
  return <span className="text-ink">Ouverts aux nouveaux projets</span>;
}
