/**
 * Étiquette numérotée en tête de section : « 01 —— Nos services ».
 * C'est le titre (h2) de la section, sauf avec `as="p"` quand la page n'a pas encore son H1
 * au-dessus (ex. la 404, où l'étiquette précède le titre principal).
 */
export function SectionLabel({
  index,
  children,
  id,
  as: Tag = "h2",
}: {
  index: string;
  children: string;
  id?: string;
  as?: "h2" | "p";
}) {
  return (
    <Tag id={id} className="caps flex items-center gap-3.5 border-b border-ink pb-3.5">
      <span>{index}</span>
      <span aria-hidden="true" className="h-px w-7 bg-ink" />
      <span>{children}</span>
    </Tag>
  );
}
