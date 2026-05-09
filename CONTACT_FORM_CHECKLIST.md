# Kontaktformular Email-Integration — Checklist

## Entwicklung (Lokal)
- [ ] `.env.local` erstellt mit `RESEND_API_KEY`
- [ ] `npm install` ausgeführt
- [ ] `npm run dev` startet ohne Fehler
- [ ] API Route antwortet: `./scripts/test-contact-api.sh` → `✅ Test erfolgreich`
- [ ] Formular auf `/contact` ist erreichbar
- [ ] Validierung zeigt Fehler bei leerem Submit
- [ ] E-Mail kommt in m.grabsch@proton.me an
- [ ] Bestätigungs-E-Mail kommt beim Absender an
- [ ] Success-State wird im Formular angezeigt

## Deployment (Vercel)
- [ ] Code gepusht: `git push origin main`
- [ ] `RESEND_API_KEY` in Vercel → Settings → Environment Variables gesetzt
  - [ ] Production ✅
  - [ ] Preview ✅
- [ ] Vercel Deployment ohne Fehler abgeschlossen
- [ ] Live-Test: `./scripts/test-contact-api.sh https://deine-url.vercel.app`
- [ ] Formular auf Live-URL manuell getestet

## Später (Optional)
- [ ] Eigene Domain in Resend verifiziert
- [ ] `FROM_EMAIL` auf `noreply@mrg-consulting.de` geändert
- [ ] Rate-Limiting implementiert (z.B. Upstash)
- [ ] reCAPTCHA v3 integriert
- [ ] Analytics-Events eingebaut
