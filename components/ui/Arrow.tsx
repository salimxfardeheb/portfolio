/**
 * Flèche décorative du design (↗ ou ←). Masquée aux lecteurs d'écran, qui liraient sinon
 * « flèche nord-est » ; le libellé du lien suffit.
 */
export function Arrow({ dir = "out" }: { dir?: "out" | "back" }) {
  return <span aria-hidden="true">{dir === "out" ? "↗" : "←"}</span>;
}
