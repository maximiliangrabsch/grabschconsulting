"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import {
  COLUMN_PAGE_SIZE,
  Lead,
  LeadFilters,
  LeadStatus,
} from "@/lib/leads/types";

const LEADS_TABLE = "leads";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyFilters(query: any, filters: LeadFilters, status: LeadStatus) {
  let q = query.eq("status", status).gte("opportunity_score", filters.minScore);
  if (filters.ort.trim()) q = q.ilike("ort", `%${filters.ort.trim()}%`);
  if (filters.branche.trim()) q = q.ilike("branche", `%${filters.branche.trim()}%`);
  return q;
}

export interface ColumnPage {
  leads: Lead[];
  total: number;
  hasMore: boolean;
}

// Fetches a single Kanban column's leads, filtered + paginated server-side.
// Never pulls the full 1543-row table to the client.
export async function getLeadsForColumn(
  status: LeadStatus,
  filters: LeadFilters,
  offset: number = 0
): Promise<ColumnPage> {
  const supabase = getSupabaseServerClient();

  const base = supabase
    .from(LEADS_TABLE)
    .select("*", { count: "exact" });

  const orderColumn = filters.sort === "updated_desc" ? "aktualisiert_am" : "opportunity_score";
  const query = applyFilters(base, filters, status)
    .order(orderColumn, { ascending: false, nullsFirst: false })
    .range(offset, offset + COLUMN_PAGE_SIZE - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("[leads] getLeadsForColumn failed:", error);
    return { leads: [], total: 0, hasMore: false };
  }

  const total = count ?? 0;
  return {
    leads: (data ?? []) as Lead[],
    total,
    hasMore: offset + COLUMN_PAGE_SIZE < total,
  };
}

// Fetches counts for every status in one round-trip (Kanban column headers,
// including statuses currently hidden by the status filter).
export async function getStatusCounts(
  filters: LeadFilters
): Promise<Record<LeadStatus, number>> {
  const supabase = getSupabaseServerClient();
  const statuses: LeadStatus[] = [
    "neu",
    "kontaktiert",
    "antwort_erhalten",
    "termin",
    "angebot",
    "kunde",
    "abgelehnt",
  ];

  const results = await Promise.all(
    statuses.map(async (status) => {
      let q = supabase
        .from(LEADS_TABLE)
        .select("id", { count: "exact", head: true })
        .eq("status", status)
        .gte("opportunity_score", filters.minScore);
      if (filters.ort.trim()) q = q.ilike("ort", `%${filters.ort.trim()}%`);
      if (filters.branche.trim()) q = q.ilike("branche", `%${filters.branche.trim()}%`);
      const { count } = await q;
      return [status, count ?? 0] as const;
    })
  );

  return Object.fromEntries(results) as Record<LeadStatus, number>;
}

// Used to resolve a deep link like /leads?lead=<id> (e.g. from the follow-up
// reminder email) even when that lead isn't in the currently loaded columns.
export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from(LEADS_TABLE).select("*").eq("id", id).single();
  if (error || !data) return null;
  return data as Lead;
}

// Ort/Branche only change when new leads get scraped in, not per dashboard
// interaction — caching avoids re-scanning all 1543 rows on every filter
// tweak (this ran on every keystroke-debounced navigation before).
let filterOptionsCache: { value: { orte: string[]; branchen: string[] }; expiresAt: number } | null = null;
const FILTER_OPTIONS_TTL_MS = 60_000;

export async function getFilterOptions(): Promise<{ orte: string[]; branchen: string[] }> {
  if (filterOptionsCache && filterOptionsCache.expiresAt > Date.now()) {
    return filterOptionsCache.value;
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from(LEADS_TABLE).select("ort, branche");
    if (error || !data) return { orte: [], branchen: [] };

    const orte = Array.from(new Set(data.map((r) => r.ort).filter(Boolean))).sort() as string[];
    const branchen = Array.from(new Set(data.map((r) => r.branche).filter(Boolean))).sort() as string[];
    const value = { orte, branchen };
    filterOptionsCache = { value, expiresAt: Date.now() + FILTER_OPTIONS_TTL_MS };
    return value;
  } catch (err) {
    console.error("[leads] getFilterOptions failed:", err);
    return { orte: [], branchen: [] };
  }
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from(LEADS_TABLE)
      .update({ status, aktualisiert_am: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("[leads] updateLeadStatus failed:", error);
      return { success: false as const, message: "Status konnte nicht aktualisiert werden." };
    }
    revalidatePath("/leads");
    return { success: true as const };
  } catch (err) {
    console.error("[leads] updateLeadStatus threw:", err);
    return { success: false as const, message: "Status konnte nicht aktualisiert werden." };
  }
}

export async function updateLeadNotes(id: string, notizen: string) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from(LEADS_TABLE)
      .update({ notizen, aktualisiert_am: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("[leads] updateLeadNotes failed:", error);
      return { success: false as const, message: "Notizen konnten nicht gespeichert werden." };
    }
    return { success: true as const };
  } catch (err) {
    console.error("[leads] updateLeadNotes threw:", err);
    return { success: false as const, message: "Notizen konnten nicht gespeichert werden." };
  }
}

export async function updateLeadFollowup(id: string, naechstes_followup: string | null) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from(LEADS_TABLE)
      .update({ naechstes_followup, aktualisiert_am: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("[leads] updateLeadFollowup failed:", error);
      return { success: false as const, message: "Follow-up-Datum konnte nicht gespeichert werden." };
    }
    revalidatePath("/leads");
    return { success: true as const };
  } catch (err) {
    console.error("[leads] updateLeadFollowup threw:", err);
    return { success: false as const, message: "Follow-up-Datum konnte nicht gespeichert werden." };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendLeadEmail(
  id: string,
  recipientEmail: string,
  subject: string,
  body: string
) {
  if (!EMAIL_RE.test(recipientEmail)) {
    return { success: false as const, message: "Ungültige E-Mail-Adresse." };
  }

  try {
    const supabase = getSupabaseServerClient();
    // Existence check only — select the smallest possible payload.
    const { data: lead, error: fetchError } = await supabase
      .from(LEADS_TABLE)
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !lead) {
      return { success: false as const, message: "Lead nicht gefunden." };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const html = `<!DOCTYPE html><html lang="de"><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#211d19;line-height:1.6;white-space:pre-wrap">${escapeHtml(
      body
    )}</body></html>`;

    const { error: sendError } = await resend.emails.send({
      from: "MRG Consulting <onboarding@resend.dev>",
      to: recipientEmail,
      subject,
      html,
    });

    if (sendError) {
      console.error("[leads] sendLeadEmail failed:", sendError);
      return { success: false as const, message: "E-Mail konnte nicht gesendet werden." };
    }

    // The email is the point of no return — if this secondary status flip
    // fails, still report success (email did send) but tell the caller the
    // status wasn't confirmed, so it doesn't optimistically show "kontaktiert"
    // when the DB still says otherwise (previously this was unchecked and
    // silently went out of sync with the client's optimistic update).
    const { error: statusError } = await supabase
      .from(LEADS_TABLE)
      .update({ status: "kontaktiert", aktualisiert_am: new Date().toISOString() })
      .eq("id", id);

    if (statusError) {
      console.error("[leads] sendLeadEmail: status update failed:", statusError);
      return { success: true as const, statusUpdated: false as const };
    }

    revalidatePath("/leads");
    return { success: true as const, statusUpdated: true as const };
  } catch (err) {
    console.error("[leads] sendLeadEmail threw:", err);
    return { success: false as const, message: "E-Mail konnte nicht gesendet werden." };
  }
}
