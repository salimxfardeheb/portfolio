import type { ContactContent } from "@/content/types";
import { AccentText } from "@/components/ui/AccentText";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactForm } from "./ContactForm";

/** Pied de page noir : bloc contact + formulaire, puis liens et mentions. */
export function ContactFooter({
  contact,
  source,
  note,
}: {
  contact: ContactContent;
  source: string;
  note?: string;
}) {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative bg-ink text-cream">
      <div className="page-x flex flex-wrap gap-16 pt-24 pb-[72px] md:pt-[120px]">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
          <span className="caps text-dim">— Contact</span>
          <h2
            id="contact-title"
            className="text-[clamp(36px,4.4vw,60px)] leading-none font-medium tracking-[-0.04em]"
          >
            <AccentText title={contact.title} onDark />
          </h2>
          <p className="max-w-[420px] leading-[1.55] text-dim-light">{contact.lead}</p>
        </div>
        <ContactForm
          selectLabel={contact.selectLabel}
          options={contact.options}
          messagePlaceholder={contact.messagePlaceholder}
          source={source}
        />
      </div>
      <SiteFooter note={note} />
    </footer>
  );
}
