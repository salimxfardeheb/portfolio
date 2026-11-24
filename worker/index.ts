/**
 * Worker Cloudflare du site.
 *
 * - Les pages statiques (`out/`) sont servies directement par les assets Cloudflare.
 * - Seules les requêtes /api/* exécutent ce code (`run_worker_first` dans wrangler.jsonc).
 * - POST /api/contact envoie la demande du formulaire par email (binding `send_email`,
 *   API structurée `env.EMAIL.send()`), de SENDER_EMAIL vers DESTINATION_EMAIL.
 *
 * - Anti-spam : champ piège `website`, plus Cloudflare Turnstile quand TURNSTILE_SECRET_KEY
 *   est défini (sinon le jeton n'est pas exigé).
 * - Les emails sont en texte brut (pas de HTML) ; les champs d'une ligne sont ramenés
 *   sur une seule ligne pour qu'aucun retour à la ligne n'altère le sujet ou le corps.
 *
 * Aucune donnée personnelle (nom, téléphone, message, adresse) n'est écrite dans les logs.
 * Types : `worker/worker-configuration.d.ts`, généré par `npm run cf-typegen`.
 */

const ALLOWED_ORIGINS = new Set([
  "https://salimxfardeheb.com",
  "https://www.salimxfardeheb.com",
]);

const MAX = { name: 100, phone: 20, email: 254, need: 80, needLabel: 40, message: 2000, page: 60 } as const;
type Field = keyof typeof MAX;

/** Réponses de l'assistant (source "chatbot") : question → réponse. */
const ANSWERS_MAX = { count: 12, question: 120, answer: 2000 } as const;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") return handleContact(request, env);
    if (pathname.startsWith("/api/")) return json({ error: "Introuvable." }, 404);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Méthode non autorisée." }, 405, { Allow: "POST" });
  }

  const contentType = request.headers.get("Content-Type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ error: "Le contenu doit être au format JSON." }, 415);
  }

  // Formulaire du site uniquement : domaine de prod, URL *.workers.dev du Worker, ou local.
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.has(origin) && !isSameHost(origin, request.url)) {
    return json({ error: "Origine refusée." }, 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON invalide." }, 400);
  }
  if (typeof body !== "object" || body === null) {
    return json({ error: "JSON invalide." }, 400);
  }
  const data = body as Record<string, unknown>;

  // Anti-spam : champ caché rempli → on répond OK sans rien envoyer.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ ok: true });
  }

  const str = (key: Field) => (typeof data[key] === "string" ? (data[key] as string).trim() : "");
  // Champs d'une ligne : tout retour à la ligne ou espace multiple devient un seul espace.
  const raw = (key: Field) => (key === "message" ? str(key) : oneLine(str(key)));

  const errors: string[] = [];
  if (!raw("name")) errors.push("Le nom est obligatoire.");
  if (!raw("phone")) errors.push("Le téléphone est obligatoire.");
  for (const key of Object.keys(MAX) as Field[]) {
    if (raw(key).length > MAX[key]) errors.push(`Le champ « ${key} » dépasse ${MAX[key]} caractères.`);
  }
  const phoneDigits = raw("phone").replace(/\D/g, "");
  if (raw("phone") && (phoneDigits.length < 9 || phoneDigits.length > 15)) {
    errors.push("Le numéro de téléphone n'est pas valide.");
  }
  if (raw("email") && !EMAIL_PATTERN.test(raw("email"))) {
    errors.push("L'adresse e-mail n'est pas valide.");
  }

  const fromChatbot = data.source === "chatbot";
  const answers = fromChatbot ? readAnswers(data.answers, errors) : [];
  if (errors.length > 0) return json({ error: errors.join(" ") }, 400);

  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof data.turnstileToken === "string" ? data.turnstileToken : "";
    if (!token || token.length > 2048) {
      return json({ error: "Vérification anti-spam manquante. Rechargez la page et réessayez." }, 400);
    }
    const verified = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get("CF-Connecting-IP"));
    if (!verified) {
      return json({ error: "Vérification anti-spam échouée. Rechargez la page et réessayez." }, 403);
    }
  }

  const name = raw("name");
  const phone = raw("phone");
  const need = raw("need") || "—";
  const needLabel = raw("needLabel") || "Besoin";
  const message = raw("message") || "—";
  const page = raw("page") || "Site";

  if (!env.DESTINATION_EMAIL) {
    console.error("contact: DESTINATION_EMAIL non configuré");
    return json({ error: "Le formulaire n'est pas encore configuré." }, 500);
  }

  const email = raw("email");
  const whatsapp = `Répondre sur WhatsApp : https://wa.me/${toInternational(phoneDigits)}`;

  const text = fromChatbot
    ? [
        `Nouvelle demande envoyée depuis l'assistant, page « ${page} » de salimxfardeheb.com`,
        "Source : chatbot",
        "",
        `Nom : ${name}`,
        `Téléphone / WhatsApp : ${phone}`,
        `E-mail : ${email || "—"}`,
        "",
        "Description :",
        message,
        "",
        "— Réponses données dans l'assistant —",
        ...(answers.length > 0 ? answers.map(([question, answer]) => `• ${question}\n  → ${answer.replace(/\n/g, "\n    ")}`) : ["—"]),
        "",
        whatsapp,
      ].join("\n")
    : [
        `Nouvelle demande depuis la page « ${page} » de salimxfardeheb.com`,
        "Source : formulaire du site",
        "",
        `Nom : ${name}`,
        `Téléphone / WhatsApp : ${phone}`,
        `${needLabel} : ${need}`,
        "",
        "Message :",
        message,
        "",
        whatsapp,
      ].join("\n");

  const subject = fromChatbot
    ? `[Chatbot] Nouvelle demande — ${page} — ${name}`
    : `Nouvelle demande — ${page} — ${name}`;

  try {
    await env.EMAIL.send({
      from: { name: "Formulaire Info Expertise", email: env.SENDER_EMAIL },
      to: env.DESTINATION_EMAIL,
      subject,
      text,
    });
  } catch (error) {
    // Seulement le code d'erreur Cloudflare (ex. E_RECIPIENT_NOT_ALLOWED), jamais le contenu.
    const code = (error as { code?: string } | null)?.code ?? (error as Error | null)?.name ?? "inconnu";
    console.error(`contact: échec de l'envoi (${code})`);
    return json({ error: "L'envoi a échoué. Réessayez plus tard." }, 502);
  }

  return json({ ok: true });
}

/** Valide l'objet `answers` du chatbot ; les erreurs sont ajoutées à `errors`. */
function readAnswers(value: unknown, errors: string[]): [string, string][] {
  if (value === undefined) return [];
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push("Les réponses de l'assistant sont invalides.");
    return [];
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > ANSWERS_MAX.count) {
    errors.push("Trop de réponses de l'assistant.");
    return [];
  }
  const answers: [string, string][] = [];
  for (const [question, answer] of entries) {
    const q = oneLine(question.trim());
    const a = typeof answer === "string" ? answer.trim() : "";
    if (!q || !a || q.length > ANSWERS_MAX.question || a.length > ANSWERS_MAX.answer) {
      errors.push("Les réponses de l'assistant sont invalides.");
      return [];
    }
    answers.push([q, a]);
  }
  return answers;
}

/** Vérifie un jeton Turnstile auprès de Cloudflare. Toute erreur réseau = refus. */
async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body: form });
    const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!result.success) {
      // Codes d'erreur Cloudflare uniquement (ex. timeout-or-duplicate), aucune donnée personnelle.
      console.error(`contact: Turnstile refusé (${(result["error-codes"] ?? []).join(", ") || "inconnu"})`);
    }
    return result.success === true;
  } catch {
    console.error("contact: Turnstile injoignable");
    return false;
  }
}

/** Ramène une valeur sur une seule ligne (sujet et lignes « Clé : valeur » de l'email). */
function oneLine(value: string) {
  return value.replace(/\s+/g, " ");
}

function isSameHost(origin: string, requestUrl: string) {
  try {
    return new URL(origin).host === new URL(requestUrl).host;
  } catch {
    return false;
  }
}

/** 0661 23 45 67 (format algérien) → 213661234567 pour un lien wa.me. */
function toInternational(digits: string) {
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return `213${digits.slice(1)}`;
  return digits;
}

function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}
