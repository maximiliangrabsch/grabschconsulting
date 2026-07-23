import { hasWebsite, Lead } from "@/lib/leads/types";

// Plain (non "use server") module: buildLeadEmailDraft is synchronous and
// needs to run in the client compose UI too, which "use server" files disallow.
export function buildLeadEmailDraft(lead: Lead): { subject: string; body: string } {
  if (!hasWebsite(lead.website)) {
    return {
      subject: `${lead.name} – schon online sichtbar für neue Kund:innen?`,
      body: `Hallo ${lead.name}-Team,

bei einer Recherche zu Unternehmen in ${lead.ort ?? "Ihrer Region"} ist mir aufgefallen, dass Sie aktuell (noch) keine eigene Website haben.

Gerade für ${lead.branche ?? "Ihre Branche"} ist eine professionelle Website oft der erste Kontaktpunkt für neue Kund:innen – ${lead.google_rating ? `mit Ihrer starken Bewertung von ${lead.google_rating}★ ${lead.anzahl_bewertungen ? `(${lead.anzahl_bewertungen} Bewertungen) ` : ""}wäre das ein sehr überzeugender Auftritt.` : "das würde Ihre Sichtbarkeit spürbar erhöhen."}

Ich unterstütze lokale Unternehmen dabei, schnell und unkompliziert eine moderne Website aufzusetzen. Hätten Sie Lust auf ein kurzes, unverbindliches Gespräch?

Beste Grüße`,
    };
  }

  const issues: string[] = [];
  if (lead.hat_ssl === false) issues.push("fehlendes SSL-Zertifikat (kein https)");
  if (lead.mobile_optimiert === false) issues.push("keine mobile Optimierung");
  if (lead.pagespeed_score !== null && lead.pagespeed_score < 50) {
    issues.push(`niedriger PageSpeed-Wert (${lead.pagespeed_score}/100)`);
  }

  const issuesText = issues.length
    ? `Bei einem kurzen technischen Check ist mir aufgefallen: ${issues.join(", ")}. Das kann sich spürbar auf Ladezeit, Google-Ranking und die Wahrnehmung bei Kund:innen auswirken.`
    : `Bei einem kurzen Check Ihrer Website habe ich ein paar Ansatzpunkte gesehen, wie sie noch moderner und schneller wirken könnte.`;

  return {
    subject: `${lead.name} – Website-Modernisierung?`,
    body: `Hallo ${lead.name}-Team,

ich habe mir Ihre Website (${lead.website}) kurz angesehen. ${issuesText}

Ich unterstütze Unternehmen wie Ihres dabei, die Website technisch und optisch auf den neuesten Stand zu bringen – schneller, mobilfreundlicher und moderner. Hätten Sie Interesse an einem kurzen, unverbindlichen Gespräch dazu?

Beste Grüße`,
  };
}
