import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { LEAD_STATUS_LABELS, LeadStatus } from "@/lib/leads/types";

// Triggered daily by Vercel Cron (see vercel.json). Requires the env var
// CRON_SECRET to be set in Vercel (Project Settings -> Environment Variables) —
// Vercel automatically sends it as `Authorization: Bearer <CRON_SECRET>` on
// every invocation once that env var exists, no extra config needed.
//
// vercel.json schedules this at "0 5 * * *" (05:00 UTC) = 07:00 Europe/Berlin
// during CEST (late March - late October). Vercel Cron runs on fixed UTC and
// has no DST awareness, so during CET (late October - late March) this fires
// at 06:00 Berlin time instead — one hour early. Adjust the cron schedule
// manually around the DST switches if exact 07:00 local time matters.

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = "m.grabsch@proton.me";
const FROM_EMAIL = "MRG Consulting <onboarding@resend.dev>";
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://mrg-consulting.vercel.app";

interface FollowupLead {
  id: string;
  name: string;
  ort: string | null;
  branche: string | null;
  opportunity_score: number | null;
  status: LeadStatus;
  naechstes_followup: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function buildSummaryEmailHtml(leads: FollowupLead[]): string {
  const rows = leads
    .map(
      (lead) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #f0f0f0">
            <a href="${SITE_URL}/leads?lead=${lead.id}" style="text-decoration:none;color:#1a1a2e">
              <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#1a1a2e">${escapeHtml(lead.name)}</p>
              <p style="margin:0 0 6px;font-size:13px;color:#64748b">
                ${[lead.branche, lead.ort].filter((v): v is string => Boolean(v)).map(escapeHtml).join(" · ") || "–"}
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8">
                Score <b style="color:#1a1a2e">${lead.opportunity_score ?? "–"}</b>
                &nbsp;·&nbsp; Status <b style="color:#1a1a2e">${escapeHtml(LEAD_STATUS_LABELS[lead.status] ?? lead.status)}</b>
                &nbsp;·&nbsp; Follow-up seit ${formatDate(lead.naechstes_followup)}
              </p>
            </a>
          </td>
        </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <tr><td style="background:#080e1f;border-radius:12px 12px 0 0;padding:28px 36px">
          <p style="margin:0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#60a5fa;font-weight:600">Leads-Dashboard</p>
          <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:600">🔔 ${leads.length} überfällige Follow-up${leads.length === 1 ? "" : "s"} heute</h1>
        </td></tr>

        <tr><td style="background:#ffffff;padding:12px 36px">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${rows}
          </table>

          <table cellpadding="0" cellspacing="0" style="margin-top:24px">
            <tr><td>
              <a href="${SITE_URL}/leads"
                 style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px">
                Komplettes Dashboard öffnen
              </a>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="background:#f8fafc;border-radius:0 0 12px 12px;padding:18px 36px;border-top:1px solid #e2e8f0">
          <p style="margin:0;font-size:12px;color:#94a3b8">Automatische tägliche Erinnerung · Leads-Dashboard</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Wrapped so a thrown error (missing env vars, Supabase/Resend network
  // failure) still comes back as a structured JSON response instead of
  // Next.js's generic unhandled-error page — this endpoint has no UI to
  // surface errors in, so the response body is the only diagnostic surface.
  try {
    const supabase = getSupabaseServerClient();
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("leads")
      .select("id, name, ort, branche, opportunity_score, status, naechstes_followup")
      .lte("naechstes_followup", today)
      .not("status", "in", "(kunde,abgelehnt)")
      .order("opportunity_score", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("[cron/followup-check] query failed:", error);
      return NextResponse.json({ ok: false, error: "Query failed" }, { status: 500 });
    }

    const leads = (data ?? []) as FollowupLead[];

    if (leads.length === 0) {
      return NextResponse.json({ ok: true, count: 0 });
    }

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `🔔 ${leads.length} überfällige Follow-ups heute`,
      html: buildSummaryEmailHtml(leads),
    });

    if (sendError) {
      console.error("[cron/followup-check] resend failed:", sendError);
      return NextResponse.json({ ok: false, count: leads.length, error: "Email failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, count: leads.length });
  } catch (err) {
    console.error("[cron/followup-check] unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
