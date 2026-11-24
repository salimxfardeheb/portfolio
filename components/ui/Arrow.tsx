import { FiArrowUpRight } from "react-icons/fi";

/**
 * Flèche « lien externe » des lignes de projet. Masquée aux lecteurs d'écran, qui liraient sinon
 * « flèche nord-est » ; le libellé du lien suffit.
 */
export function Arrow({ className = "" }: { className?: string }) {
  return <FiArrowUpRight aria-hidden="true" className={`size-5 ${className}`.trim()} />;
}
