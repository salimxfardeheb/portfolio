"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { pages, SITE_NAME } from "@/content/site";
import { Turnstile, turnstileEnabled } from "@/components/ui/Turnstile";
import { contactLinks } from "@/app/data/chatbot/contact";
import { collectingNodes } from "@/app/data/chatbot/conversation";
import type { LeadDraft } from "@/app/types/chatbot";

type Field = "name" | "phone" | "email" | "description";
type Values = Record<Field, string> & { website: string };
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/**
 * Algérie : mobile 05/06/07 + 8 chiffres, fixe 0 + 8 chiffres.
 * International : +XX ou 00XX puis 8 à 13 chiffres.
 */
const PHONE_PATTERN = /^(0[5-7]\d{8}|0[2-49]\d{7}|(\+|00)[1-9]\d{7,12})$/;
const MAX_DESCRIPTION = 2000;

const fieldClass =
  "w-full border border-ink bg-paper px-3 py-2 text-[14px] text-ink placeholder:text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent";
const labelClass = "caps text-muted";

interface Props {
  /** Réponses recueillies dans la conversation. */
  lead: LeadDraft;
  /** Appelé une fois la demande réellement envoyée. */
  onSent: () => void;
}

/** Question (première ligne du message) → réponse, dans l'ordre de l'arbre. */
function collectAnswers(lead: LeadDraft): Record<string, string> {
  const answers: Record<string, string> = {};
  for (const node of collectingNodes) {
    const value = node.collect ? lead[node.collect] : lead.description;
    if (value) answers[node.message.split("\n")[0]] = value;
  }
  return answers;
}

/**
 * Formulaire de fin de parcours. Envoie par POST /api/contact (le même Worker
 * que le formulaire du footer), avec `source: "chatbot"` et les réponses du chat.
 */
const ChatLeadForm = ({ lead, onSent }: Props) => {
  const pathname = usePathname();
  const [values, setValues] = useState<Values>(() => ({
    name: "",
    phone: "",
    email: "",
    description: lead.description ?? "",
    website: "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [failure, setFailure] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);

  const set =
    (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): Errors => {
    const found: Errors = {};
    const name = values.name.trim();
    if (name.length < 2 || name.length > 100) found.name = "Indiquez votre nom (2 à 100 caractères).";

    const phone = values.phone.trim().replace(/[\s().-]/g, "");
    if (!phone) found.phone = "Indiquez votre numéro de téléphone.";
    else if (!PHONE_PATTERN.test(phone)) found.phone = "Indiquez un numéro de téléphone valide.";

    const email = values.email.trim();
    if (email && !EMAIL_PATTERN.test(email)) found.email = "Indiquez une adresse e-mail valide.";

    if (values.description.trim().length > MAX_DESCRIPTION) {
      found.description = `${MAX_DESCRIPTION} caractères maximum.`;
    }
    return found;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (turnstileEnabled && !token) {
      setFailure("Vérification anti-spam en cours. Réessayez dans un instant.");
      setStatus("failed");
      return;
    }

    setStatus("sending");
    const page = pages.find((item) => item.href === pathname)?.label ?? SITE_NAME;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          message: values.description.trim(),
          website: values.website,
          page,
          source: "chatbot",
          answers: collectAnswers(lead),
          turnstileToken: token ?? undefined,
        }),
      });
      // Le jeton Turnstile ne sert qu'une fois : en demander un nouveau.
      setResetSignal((n) => n + 1);

      if (response.ok) {
        onSent();
        return;
      }
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      setFailure(
        (response.status < 500 && result?.error) ||
          "L’envoi a échoué. Réessayez ou écrivez-nous directement sur WhatsApp."
      );
    } catch {
      setResetSignal((n) => n + 1);
      setFailure("Connexion impossible. Réessayez ou écrivez-nous directement sur WhatsApp.");
    }
    setStatus("failed");
  };

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`chat-${field}-error`} className="text-[12px] text-accent-strong">
        {errors[field]}
      </p>
    ) : null;

  const a11y = (field: Field) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `chat-${field}-error` : undefined,
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="chat-entry-in relative flex flex-col gap-3 border border-ink bg-paper p-3.5"
    >
      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-name">
          Nom
        </label>
        <input
          id="chat-name"
          name="name"
          autoComplete="name"
          maxLength={100}
          required
          className={fieldClass}
          value={values.name}
          onChange={set("name")}
          {...a11y("name")}
        />
        {error("name")}
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-phone">
          Téléphone / WhatsApp
        </label>
        <input
          id="chat-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          required
          placeholder="05 / 06 / 07 …"
          className={fieldClass}
          value={values.phone}
          onChange={set("phone")}
          {...a11y("phone")}
        />
        {error("phone")}
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-email">
          E-mail <span className="normal-case tracking-normal">(facultatif)</span>
        </label>
        <input
          id="chat-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          className={fieldClass}
          value={values.email}
          onChange={set("email")}
          {...a11y("email")}
        />
        {error("email")}
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-description">
          Description <span className="normal-case tracking-normal">(facultatif)</span>
        </label>
        <textarea
          id="chat-description"
          name="description"
          rows={4}
          maxLength={MAX_DESCRIPTION}
          className={`${fieldClass} resize-none`}
          value={values.description}
          onChange={set("description")}
          {...a11y("description")}
        />
        {error("description")}
      </div>

      {/* Champ piège : laissé vide par les humains, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site web
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </label>
      </div>

      <Turnstile onToken={setToken} resetSignal={resetSignal} />

      {status === "failed" && (
        <div role="alert" className="flex flex-col gap-2">
          <p className="text-[13px] text-accent-strong">{failure}</p>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink px-3 py-2 text-[14px] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-ink px-4 py-2.5 text-[14px] font-medium text-paper transition-opacity duration-150 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
      </button>
    </form>
  );
};

export default ChatLeadForm;
