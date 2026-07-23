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

export async function getFilterOptions(): Promise<{ orte: string[]; branchen: string[] }> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from(LEADS_TABLE).select("ort, branche");
  if (error || !data) return { orte: [], branchen: [] };

  const orte = Array.from(new Set(data.map((r) => r.ort).filter(Boolean))).sort() as string[];
  const branchen = Array.from(new Set(data.map((r) => r.branche).filter(Boolean))).sort() as string[];
  return { orte, branchen };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
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
}

export async function updateLeadNotes(id: string, notizen: string) {
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
}

export async function updateLeadFollowup(id: string, naechstes_followup: string | null) {
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

  const supabase = getSupabaseServerClient();
  const { data: lead, error: fetchError } = await supabase
    .from(LEADS_TABLE)
    .select("*")
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

  await supabase
    .from(LEADS_TABLE)
    .update({ status: "kontaktiert", aktualisiert_am: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/leads");
  return { success: true as const };
}
