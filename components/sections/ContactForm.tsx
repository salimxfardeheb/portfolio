"use client";

import { useState, type FormEvent } from "react";
import { WHATSAPP_NUMBER } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

type Fields = {
  name: string;
  phone: string;
  need: string;
  message: string;
  website: string; // champ piège anti-spam, invisible pour les humains
};

const labelClass = "caps flex flex-col gap-2 text-dim";
const fieldClass =
  "border-0 border-b border-iron bg-transparent py-3 text-base font-normal normal-case tracking-normal text-cream placeholder:text-hint focus:border-cream focus:outline-none";

function readFields(form: HTMLFormElement): Fields {
  const data = new FormData(form);
  const get = (key: string) => String(data.get(key) ?? "").trim();
  return {
    name: get("name"),
    phone: get("phone"),
    need: get("need"),
    message: get("message"),
    website: get("website"),
  };
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function ContactForm({
  selectLabel,
  options,
  messagePlaceholder,
  source,
}: {
  selectLabel: string;
  options: string[];
  messagePlaceholder: string;
  /** Page d'origine, ajoutée au message pour savoir d'où vient la demande. */
  source: string;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Bouton principal : ouvre WhatsApp avec la demande pré-remplie.
  function sendWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = readFields(event.currentTarget);
    if (!fields.name) {
      setStatus({ kind: "error", message: "Indiquez votre nom." });
      return;
    }
    const lines = [
      `Bonjour, je suis ${fields.name}.`,
      `${selectLabel} : ${fields.need}`,
      fields.message,
      `(Demande envoyée depuis la page ${source})`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    setStatus({ kind: "idle" });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Bouton secondaire : envoie la demande par email via le Worker (/api/contact).
  async function sendEmail(form: HTMLFormElement) {
    const fields = readFields(form);
    if (!fields.name) {
      setStatus({ kind: "error", message: "Indiquez votre nom." });
      return;
    }
    if (!isValidPhone(fields.phone)) {
      setStatus({
        kind: "error",
        message: "Indiquez un numéro de téléphone valide pour que nous puissions vous rappeler.",
      });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, source }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error ?? "Envoi impossible");
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "L’envoi par email a échoué. Réessayez ou écrivez-nous directement sur WhatsApp.",
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={sendWhatsApp} noValidate className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
      <div className="flex flex-wrap gap-5">
        <label className={`${labelClass} flex-[1_1_220px]`}>
          Nom
          <input
            type="text"
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Votre nom"
            className={fieldClass}
          />
        </label>
        <label className={`${labelClass} flex-[1_1_220px]`}>
          Téléphone / WhatsApp
          <input
            type="tel"
            name="phone"
            maxLength={20}
            autoComplete="tel"
            inputMode="tel"
            placeholder="05 / 06 / 07 …"
            className={fieldClass}
          />
        </label>
      </div>
      <label className={labelClass}>
        {selectLabel}
        <select name="need" defaultValue={options[0]} className={`${fieldClass} bg-ink`}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Message
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
      </label>
      {/* Champ piège : laissé vide par les humains, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className={buttonClass("inverse", "cursor-pointer px-[26px]")}>
          Envoyer sur WhatsApp ↗
        </button>
        <button
          type="button"
          disabled={sending}
          onClick={(event) => {
            const form = event.currentTarget.form;
            if (form) void sendEmail(form);
          }}
          className={buttonClass("inverse-outline", "cursor-pointer px-[26px] disabled:cursor-wait disabled:opacity-60")}
        >
          {sending ? "Envoi…" : "Envoyer par email"}
        </button>
      </div>

      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {status.kind === "sent" && (
          <span className="text-cream">Demande envoyée. Nous revenons vers vous rapidement.</span>
        )}
        {status.kind === "error" && <span className="text-accent-soft">{status.message}</span>}
      </p>
    </form>
  );
}
