# Déploiement — salimxfardeheb.com sur Cloudflare Workers

Site statique (`out/`, généré par Next.js) servi par un Worker Cloudflare.
Le Worker n'exécute du code que pour `POST /api/contact` (formulaire → email).
Le projet Vercel reste en place tant que le nouveau site n'est pas vérifié.

## 1. Une seule fois

```bash
npx wrangler login
cp .dev.vars.example .dev.vars        # mettre l'adresse vérifiée dans Email Routing
npx wrangler secret put DESTINATION_EMAIL
```

Prérequis Cloudflare : zone `salimxfardeheb.com` active, Email Routing activé,
adresse de destination **vérifiée**.

## 2. Tester en local

```bash
npm run preview      # build + wrangler dev → http://localhost:8787
```

`wrangler.jsonc` a `"remote": true` sur le binding email : le formulaire envoie un **vrai** email.

## 3. Publier (URL de test)

```bash
npm run build
npm run deploy       # → https://salimxfardeheb.<compte>.workers.dev
```

Vérifier sur cette URL (voir § 5) **avant** de toucher au domaine.

## 4. Brancher le domaine (bascule depuis Vercel)

Aujourd'hui `salimxfardeheb.com` et `www` pointent vers Vercel (enregistrements A
`216.198.79.65` / `64.29.17.x`, nuage gris). Note-les : c'est le retour arrière.

1. **DNS** (dashboard → DNS) : supprimer les enregistrements **A** de `salimxfardeheb.com`
   (apex) et de `www`. Ne pas toucher aux MX, TXT (SPF, Google), CAA.
2. **Domaine personnalisé** : Workers & Pages → `salimxfardeheb` → Settings →
   Domains & Routes → Add → Custom Domain → `salimxfardeheb.com`.
   Cloudflare crée l'enregistrement DNS et le certificat HTTPS.
   (Équivalent dans `wrangler.jsonc`, puis `npm run deploy` :
   `"routes": [{ "pattern": "salimxfardeheb.com", "custom_domain": true }]`.)
3. **www → apex** : un Custom Domain ne couvre que le nom exact.
   - DNS : ajouter `www` en **A** `192.0.2.1`, **Proxied** (nuage orange).
   - Rules → Redirect Rules → modèle « Redirect from WWW to root » (301, garder le chemin
     et la query string).
4. Les CAA existants autorisent déjà Let's Encrypt et Google (pki.goog) : rien à changer.

**Retour arrière** : retirer le Custom Domain, recréer les A vers Vercel (nuage gris).
Vercel n'a pas été modifié, il reprend immédiatement.

## 5. Vérifications après mise en ligne

```bash
D=https://salimxfardeheb.com
for p in / /e-commercants /cafes-restaurants /sitemap.xml /robots.txt; do
  echo "$p $(curl -s -o /dev/null -w '%{http_code}' $D$p)"; done          # 200 partout
for p in /about /portfolio /services /templates /about/x; do
  echo "$p $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' $D$p)"; done   # 301
curl -s -o /dev/null -w '%{http_code}\n' $D/page-inconnue                  # 404
curl -sI https://www.salimxfardeheb.com | grep -i -E '^(HTTP|location)'   # 301 → apex
curl -sI $D | grep -i server                                              # cloudflare (plus Vercel)
```

- [ ] Les 3 pages s'affichent (desktop + mobile), l'effet de points marche sur l'accueil.
- [ ] Formulaire « Envoyer par email » → email reçu ; « Envoyer sur WhatsApp » ouvre la conversation.
- [ ] Email entrant vers `@salimxfardeheb.com` toujours transféré (Email Routing).
- [ ] Google Search Console : soumettre `https://salimxfardeheb.com/sitemap.xml`.
- [ ] Logs : Workers & Pages → `salimxfardeheb` → Observability (erreurs du formulaire = code
      seulement, aucune donnée personnelle).
- [ ] Après quelques jours sans souci : seulement alors, retirer le domaine du projet Vercel.
