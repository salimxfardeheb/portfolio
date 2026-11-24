/** Bandeau crème « Suivi & sécurité ». */
export function CareSection({ title, text }: { title: string; text: string }) {
  return (
    <section aria-labelledby="suivi-title" className="bg-cream">
      <div className="page-x flex flex-wrap items-start gap-12 py-24">
        <div className="min-w-0 flex-[1_1_360px]">
          <h2
            id="suivi-title"
            className="text-[clamp(30px,3.4vw,44px)] leading-[1.05] font-medium tracking-[-0.03em]"
          >
            {title}
          </h2>
        </div>
        <p className="min-w-0 flex-[1_1_480px] text-[17px] leading-[1.6] text-body">{text}</p>
      </div>
    </section>
  );
}
