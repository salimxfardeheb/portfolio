import type { AccentTitle } from "@/content/types";

/** Rend `before` + `accent` + `after` d'une seule couleur : un titre ne change pas de teinte en cours de phrase. */
export function AccentText({ title }: { title: AccentTitle }) {
  return (
    <>
      {title.before}
      {title.accent}
      {title.after}
    </>
  );
}
