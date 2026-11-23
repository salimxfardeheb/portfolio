// Types minimaux du runtime Workers utilisés par worker/index.ts
// (évite d'ajouter @cloudflare/workers-types pour trois déclarations).

declare module "cloudflare:email" {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string | ReadableStream);
    readonly from: string;
    readonly to: string;
  }
}

interface SendEmail {
  send(message: import("cloudflare:email").EmailMessage): Promise<void>;
}

interface Fetcher {
  fetch(input: Request | string | URL, init?: RequestInit): Promise<Response>;
}
