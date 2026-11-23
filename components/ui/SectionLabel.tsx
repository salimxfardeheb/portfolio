/** Étiquette numérotée en tête de section : « 01 —— Nos services ». */
export function SectionLabel({ index, children, id }: { index: string; children: string; id?: string }) {
  return (
    <h2 id={id} className="caps flex items-center gap-3.5 border-b border-ink pb-3.5">
      <span>{index}</span>
      <span aria-hidden="true" className="h-px w-7 bg-ink" />
      <span>{children}</span>
    </h2>
  );
}
