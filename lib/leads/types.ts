export const LEAD_STATUSES = [
  "neu",
  "kontaktiert",
  "antwort_erhalten",
  "termin",
  "angebot",
  "kunde",
  "abgelehnt",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  neu: "Neu",
  kontaktiert: "Kontaktiert",
  antwort_erhalten: "Antwort erhalten",
  termin: "Termin",
  angebot: "Angebot",
  kunde: "Kunde",
  abgelehnt: "Abgelehnt",
};

export interface Lead {
  id: string;
  google_place_id: string | null;
  name: string;
  branche: string | null;
  ort: string | null;
  adresse: string | null;
  telefon: string | null;
  website: string | null;
  google_rating: number | null;
  anzahl_bewertungen: number | null;
  opportunity_score: number | null;
  erreichbar: boolean | null;
  hat_ssl: boolean | null;
  mobile_optimiert: boolean | null;
  pagespeed_score: number | null;
  last_modified: string | null;
  status: LeadStatus;
  notizen: string | null;
  naechstes_followup: string | null;
  zugewiesen_an: string | null;
  erstellt_am: string;
  aktualisiert_am: string;
}

export type LeadSort = "score_desc" | "updated_desc";

export interface LeadFilters {
  statuses: LeadStatus[];
  minScore: number;
  ort: string;
  branche: string;
  sort: LeadSort;
}

export const DEFAULT_FILTERS: LeadFilters = {
  statuses: ["neu"],
  minScore: 50,
  ort: "",
  branche: "",
  sort: "score_desc",
};

export const COLUMN_PAGE_SIZE = 25;

export function scoreTier(score: number | null): "hot" | "warm" | "cold" {
  if (score === null) return "cold";
  if (score >= 80) return "hot";
  if (score >= 50) return "warm";
  return "cold";
}

// The scoring pipeline stores the literal placeholder "KEINE WEBSITE" instead
// of null/empty when a business has no site — treat that as "no website" too.
export function hasWebsite(website: string | null): website is string {
  if (!website) return false;
  const trimmed = website.trim();
  if (!trimmed) return false;
  return trimmed.toUpperCase() !== "KEINE WEBSITE";
}
