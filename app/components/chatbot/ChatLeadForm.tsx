"use client";
import React, { useState } from "react";
import { FaPaperPlane, FaSpinner, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { contactLinks } from "@/app/data/chatbot/contact";
import translations, { type Translations } from "@/app/i18n/translations";
import type { LeadDraft } from "@/app/types/chatbot";
import { sendEmail } from "@/app/utils/send-email";

type Field =
  | "name"
  | "email"
  | "phone"
  | "projectType"
  | "budget"
  | "timeline"
  | "description";

type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s().-]{5,}$/;

const TIMELINES = [
  { value: "asap", label: "timelineAsap" },
  { value: "month", label: "timelineMonth" },
  { value: "quarter", label: "timelineQuarter" },
  { value: "open", label: "timelineOpen" },
] as const;

const timelineLabel = (value: string, dict: Translations) =>
  dict.chatbot.form[
    TIMELINES.find((option) => option.value === value)?.label ?? "timelineOpen"
  ];

const fieldClass =
  "w-full rounded-xl border border-black/15 bg-black/[0.02] px-3 py-2 text-[13.5px] text-black placeholder:text-black/40 focus:border-redOrange focus:outline-none";
const labelClass = "text-[11px] uppercase tracking-wider text-black/55";

interface Props {
  /** Answers collected in the qualification branch — used to prefill. */
  lead: LeadDraft;
  /** Called once the message has actually been sent. */
  onSent: () => void;
}

/**
 * Contact form shown at the end of the qualification branch. It posts through
 * the site's existing sendEmail helper (/api/email), so there is no second
 * mail pipeline to maintain.
 */
const ChatLeadForm = ({ lead, onSent }: Props) => {
  const { lang, t } = useLanguage();
  const [values, setValues] = useState<Values>(() => ({
    name: "",
    email: "",
    phone: "",
    projectType: lead.projectType?.[lang] ?? "",
    budget: lead.budget?.[lang] ?? "",
    timeline: "asap",
    description: lead.description ?? "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  const set = (field: Field) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): Errors => {
    const found: Errors = {};
    if (values.name.trim().length < 2) found.name = t.chatbot.form.errorName;
    if (!EMAIL_PATTERN.test(values.email.trim())) found.email = t.chatbot.form.errorEmail;
    if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
      found.phone = t.chatbot.form.errorPhone;
    }
    if (values.description.trim().length < 10) {
      found.description = t.chatbot.form.errorDescription;
    }
    return found;
  };

  /** The brief Salim receives — always in French, whatever the visitor's language. */
  const composeMessage = () =>
    [
      "Demande envoyée depuis l'assistant du portfolio.",
      "",
      `Type de projet : ${values.projectType.trim() || "—"}`,
      `Budget : ${values.budget.trim() || "—"}`,
      `Délai souhaité : ${timelineLabel(values.timeline, translations.fr)}`,
      `Téléphone / WhatsApp : ${values.phone.trim() || "—"}`,
      "",
      "Description :",
      values.description.trim(),
      "",
      "— Réponses données dans le chatbot —",
      `Type : ${lead.projectType?.fr ?? "—"}`,
      `Avancement : ${lead.stage?.fr ?? "—"}`,
      `Priorité : ${lead.priority?.fr ?? "—"}`,
      `Budget : ${lead.budget?.fr ?? "—"}`,
    ].join("\n");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    const { success } = await sendEmail({
      name: values.name.trim(),
      email: values.email.trim(),
      message: composeMessage(),
    });

    if (success) {
      onSent();
      return;
    }
    setStatus("failed");
  };

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`chat-${field}-error`} className="text-[11.5px] text-redOrange">
        {errors[field]}
      </p>
    ) : null;

  const describedBy = (field: Field) => (errors[field] ? `chat-${field}-error` : undefined);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="chat-entry-in flex flex-col gap-3 rounded-xl border border-black/10 bg-black/[0.03] p-3.5"
    >
      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-name">
          {t.chatbot.form.name}
        </label>
        <input
          id="chat-name"
          name="name"
          autoComplete="name"
          className={fieldClass}
          value={values.name}
          onChange={set("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name")}
        />
        {error("name")}
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-email">
          {t.chatbot.form.email}
        </label>
        <input
          id="chat-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          onChange={set("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
        />
        {error("email")}
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-phone">
          {t.chatbot.form.phone}{" "}
          <span className="normal-case tracking-normal text-black/40">
            ({t.chatbot.form.optional})
          </span>
        </label>
        <input
          id="chat-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={fieldClass}
          value={values.phone}
          onChange={set("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy("phone")}
        />
        {error("phone")}
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-projectType">
          {t.chatbot.form.projectType}
        </label>
        <input
          id="chat-projectType"
          name="projectType"
          className={fieldClass}
          value={values.projectType}
          onChange={set("projectType")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-budget">
          {t.chatbot.form.budget}{" "}
          <span className="normal-case tracking-normal text-black/40">
            ({t.chatbot.form.optional})
          </span>
        </label>
        <input
          id="chat-budget"
          name="budget"
          className={fieldClass}
          value={values.budget}
          onChange={set("budget")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-timeline">
          {t.chatbot.form.timeline}
        </label>
        <select
          id="chat-timeline"
          name="timeline"
          className={fieldClass}
          value={values.timeline}
          onChange={set("timeline")}
        >
          {TIMELINES.map((option) => (
            <option key={option.value} value={option.value} className="bg-white">
              {t.chatbot.form[option.label]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="chat-description">
          {t.chatbot.form.description}
        </label>
        <textarea
          id="chat-description"
          name="description"
          rows={4}
          className={`${fieldClass} resize-none`}
          value={values.description}
          onChange={set("description")}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={describedBy("description")}
        />
        {error("description")}
      </div>

      {status === "failed" && (
        <div className="flex flex-col gap-2">
          <p className="text-[12px] text-redOrange">{t.chatbot.form.failed}</p>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-black/20 px-3 py-2 text-[12.5px] font-medium text-black/80 hover:border-redOrange"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-redOrange px-4 py-2.5 text-[13.5px] font-medium text-white transition-transform duration-150 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "sending" ? (
          <>
            <FaSpinner className="animate-spin" />
            {t.chatbot.form.sending}
          </>
        ) : (
          <>
            {t.chatbot.form.submit}
            <FaPaperPlane className="text-[12px]" />
          </>
        )}
      </button>
    </form>
  );
};

export default ChatLeadForm;
