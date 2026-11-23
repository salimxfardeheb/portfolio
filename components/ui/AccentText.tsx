import type { AccentTitle } from "@/content/types";

/** Rend `before` + `accent` (en couleur) + `after`. La couleur d'accent change selon le fond. */
export function AccentText({ title, onDark = false }: { title: AccentTitle; onDark?: boolean }) {
  return (
    <>
      {title.before}
      <span className={onDark ? "text-accent-soft" : "text-accent"}>{title.accent}</span>
      {title.after}
    </>
  );
}
