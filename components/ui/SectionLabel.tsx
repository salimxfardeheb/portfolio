/**
 * Intitulé en tête de section, posé sur un filet : « Nos services ».
 * C'est le titre (h2) de la section, sauf avec `as="p"` quand la page n'a pas encore son H1
 * au-dessus (ex. la 404, où l'intitulé précède le titre principal).
 */
export function SectionLabel({
  children,
  id,
  as: Tag = "h2",
}: {
  children: string;
  id?: string;
  as?: "h2" | "p";
}) {
  return (
    <Tag id={id} className="label border-b border-ink pb-4">
      {children}
    </Tag>
  );
}
