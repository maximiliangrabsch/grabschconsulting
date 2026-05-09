# Deployment Guide — MRG Consulting

## Vercel Deployment

### 1. Environment Variables setzen

Gehe zu: **Vercel Dashboard → Dein Projekt → Settings → Environment Variables**

| Variable | Wert | Umgebungen |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | Production, Preview, Development |

> Tipp: "Production" und "Preview" beide aktivieren, damit auch Preview-Deployments E-Mails senden können.

### 2. Deployment

```bash
# Option A: Automatisch via Git Push
git add .
git commit -m "deploy"
git push origin main   # Vercel deployt automatisch

# Option B: Manuell via CLI
npx vercel --prod
```

### 3. Nach dem Deployment testen

```bash
# Ersetze die URL mit deiner Vercel-URL
./scripts/test-contact-api.sh https://mrg-consulting.vercel.app
```

---

## Lokale Entwicklung

```bash
cp .env.example .env.local   # .env.local befüllen
npm install
npm run dev                   # http://localhost:3000
```

Test:
```bash
./scripts/test-contact-api.sh          # macOS/Linux
.\scripts\test-contact-api.ps1         # Windows PowerShell
```

---

## Resend Domain verifizieren (empfohlen)

1. Gehe zu [resend.com/domains](https://resend.com/domains)
2. Füge deine Domain hinzu (z.B. `mrg-consulting.de`)
3. Setze die DNS-Einträge bei deinem Domain-Anbieter
4. Warte auf Verifizierung (meist 5–30 Minuten)
5. Ändere in [app/api/contact/route.ts](app/api/contact/route.ts):

```ts
// Vorher:
const FROM_EMAIL = "MRG Consulting <onboarding@resend.dev>";

// Nachher:
const FROM_EMAIL = "MRG Consulting <noreply@mrg-consulting.de>";
```

---

## Troubleshooting

| Problem | Ursache | Lösung |
|---|---|---|
| `{"success":false}` | API Key falsch/fehlt | `.env.local` prüfen, Server neu starten |
| E-Mail kommt nicht an | Resend Spam-Filter | Resend Dashboard → Logs prüfen |
| Bestätigung nicht zustellbar | `onboarding@resend.dev` Limits | Domain verifizieren |
| Vercel: API Key not found | Env Var nicht gesetzt | Vercel Settings → Env Variables |

**Resend Logs:** [resend.com/emails](https://resend.com/emails)
