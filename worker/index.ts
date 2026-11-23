/**
 * Worker Cloudflare du site.
 *
 * - Les pages statiques (`out/`) sont servies directement par les assets Cloudflare.
 * - Seules les requêtes /api/* exécutent ce code (`run_worker_first` dans wrangler.jsonc).
 * - POST /api/contact envoie la demande du formulaire par email (binding `send_email`,
 *   API structurée `env.EMAIL.send()`), de SENDER_EMAIL vers DESTINATION_EMAIL.
 *
 * Aucune donnée personnelle (nom, téléphone, message, adresse) n'est écrite dans les logs.
 * Types : `worker/worker-configuration.d.ts`, généré par `npm run cf-typegen`.
 */

const ALLOWED_ORIGINS = new Set([
  "https://salimxfardeheb.com",
  "https://www.salimxfardeheb.com",
]);

const MAX = { name: 100, phone: 20, need: 80, needLabel: 40, message: 2000, page: 60 } as const;
type Field = keyof typeof MAX;

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

  const raw = (key: Field) => (typeof data[key] === "string" ? (data[key] as string).trim() : "");

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
  if (errors.length > 0) return json({ error: errors.join(" ") }, 400);

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

  const text = [
    `Nouvelle demande depuis la page « ${page} » de salimxfardeheb.com`,
    "",
    `Nom : ${name}`,
    `Téléphone / WhatsApp : ${phone}`,
    `${needLabel} : ${need}`,
    "",
    "Message :",
    message,
    "",
    `Répondre sur WhatsApp : https://wa.me/${toInternational(phoneDigits)}`,
  ].join("\n");

  try {
    await env.EMAIL.send({
      from: { name: "Formulaire Info Expertise", email: env.SENDER_EMAIL },
      to: env.DESTINATION_EMAIL,
      subject: `Nouvelle demande — ${page} — ${name}`,
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
