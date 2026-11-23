/**
 * Worker Cloudflare du site.
 * - Les pages statiques (`out/`) sont servies directement par Cloudflare (assets).
 * - Seules les requêtes /api/* passent par ce code (`run_worker_first` dans wrangler.jsonc).
 * - POST /api/contact envoie la demande par email via Email Routing (binding SEND_EMAIL)
 *   vers CONTACT_TO, qui doit être une adresse de destination vérifiée dans Email Routing.
 */
import { EmailMessage } from "cloudflare:email";

interface Env {
  ASSETS: Fetcher;
  SEND_EMAIL: SendEmail;
  /** Secret : `npx wrangler secret put CONTACT_TO` (adresse perso vérifiée). */
  CONTACT_TO: string;
  /** Expéditeur sur le domaine, ex. site@salimxfardeheb.com. */
  CONTACT_FROM: string;
}

const ALLOWED_ORIGINS = new Set([
  "https://salimxfardeheb.com",
  "https://www.salimxfardeheb.com",
]);

const LIMITS = { name: 80, phone: 20, need: 80, message: 2000, source: 60 } as const;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env, url);
    if (url.pathname.startsWith("/api/")) return json({ error: "Introuvable" }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request: Request, env: Env, url: URL): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Méthode non autorisée" }, 405);

  // Accepte le domaine de prod, l'URL workers.dev du Worker et le local.
  const origin = request.headers.get("Origin");
  const sameHost = origin !== null && new URL(origin).host === url.host;
  if (origin && !sameHost && !ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "Origine refusée" }, 403);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Requête invalide" }, 400);
  }

  const field = (key: keyof typeof LIMITS) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, LIMITS[key]) : "";

  // Champ piège rempli : on répond OK sans rien envoyer.
  if (typeof body.website === "string" && body.website.trim() !== "") return json({ ok: true });

  const name = field("name");
  const phone = field("phone");
  const need = field("need");
  const message = field("message");
  const source = field("source");
  const digits = phone.replace(/\D/g, "");

  if (!name) return json({ error: "Nom manquant" }, 400);
  if (digits.length < 9 || digits.length > 15) return json({ error: "Téléphone invalide" }, 400);

  const text = [
    "Nouvelle demande depuis salimxfardeheb.com",
    "",
    `Nom : ${name}`,
    `Téléphone / WhatsApp : ${phone}`,
    `Besoin : ${need || "—"}`,
    `Page : ${source || "—"}`,
    "",
    "Message :",
    message || "—",
    "",
    `WhatsApp direct : https://wa.me/${toInternational(digits)}`,
  ].join("\n");

  try {
    const raw = buildMime({
      from: env.CONTACT_FROM,
      fromName: "Site Info Expertise",
      to: env.CONTACT_TO,
      subject: `Nouvelle demande : ${name} (${need || "contact"})`,
      text,
    });
    await env.SEND_EMAIL.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
  } catch (error) {
    console.error("Envoi email échoué", error);
    return json({ error: "Envoi impossible" }, 502);
  }

  return json({ ok: true });
}

/** 0661… (numéro algérien) → 213661… pour un lien wa.me. */
function toInternational(digits: string) {
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return `213${digits.slice(1)}`;
  return digits;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function base64Utf8(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** En-tête encodé (RFC 2047) pour les accents dans le sujet et le nom. */
function encodeHeader(value: string) {
  return `=?UTF-8?B?${base64Utf8(value)}?=`;
}

function buildMime(mail: { from: string; fromName: string; to: string; subject: string; text: string }) {
  const domain = mail.from.split("@")[1] ?? "localhost";
  const body = base64Utf8(mail.text).replace(/.{1,76}/g, "$&\r\n");
  return [
    `From: ${encodeHeader(mail.fromName)} <${mail.from}>`,
    `To: <${mail.to}>`,
    `Subject: ${encodeHeader(mail.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    body,
  ].join("\r\n");
}
