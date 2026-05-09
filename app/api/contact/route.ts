import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Rate-limiting: integrate upstash/ratelimit or vercel KV here when ready.
// Example: import { Ratelimit } from "@upstash/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = "m.grabsch@proton.me";
// Must be a verified Resend domain. Use onboarding@resend.dev for testing,
// then switch to e.g. noreply@mrg-consulting.de after domain verification.
const FROM_EMAIL = "MRG Consulting <onboarding@resend.dev>";

const contactSchema = z.object({
  name: z.string().min(2, "Name zu kurz"),
  email: z.string().email("Ungültige E-Mail"),
  company: z.string().optional(),
  role: z.enum([
    "Startup-Gründer",
    "CTO/Tech-Lead",
    "HR/Recruiting",
    "Entwickler auf Jobsuche",
    "Investor",
    "Sonstiges",
  ] as const),
  message: z.string().min(20, "Nachricht zu kurz"),
});

function berlinTimestamp(): string {
  return new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "full",
    timeStyle: "short",
  });
}

// Notification email sent to the site owner
function ownerEmailHtml(data: z.infer<typeof contactSchema>): string {
  const company = data.company ? `<b>${escapeHtml(data.company)}</b>` : "<i>–</i>";
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="background:#080e1f;border-radius:12px 12px 0 0;padding:28px 36px">
          <p style="margin:0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#60a5fa;font-weight:600">MRG Consulting</p>
          <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:600">Neue Kontaktanfrage</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
                <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;font-weight:600">Name</p>
                <p style="margin:0;font-size:15px;color:#1a1a2e;font-weight:500">${escapeHtml(data.name)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
                <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;font-weight:600">E-Mail</p>
                <p style="margin:0;font-size:15px;color:#1a1a2e">${escapeHtml(data.email)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
                <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;font-weight:600">Unternehmen</p>
                <p style="margin:0;font-size:15px;color:#1a1a2e">${company}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
                <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;font-weight:600">Rolle</p>
                <p style="margin:0;font-size:15px;color:#1a1a2e">${escapeHtml(data.role)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0">
                <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;font-weight:600">Nachricht</p>
                <p style="margin:0;font-size:15px;color:#1a1a2e;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</p>
              </td>
            </tr>
          </table>

          <!-- Reply CTA -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px">
            <tr><td>
              <a href="mailto:${escapeHtml(data.email)}?subject=Re: Ihre Anfrage bei MRG Consulting"
                 style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px">
                ↩ Direkt antworten
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-radius:0 0 12px 12px;padding:18px 36px;border-top:1px solid #e2e8f0">
          <p style="margin:0;font-size:12px;color:#94a3b8">${berlinTimestamp()} (Berlin)</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Confirmation email sent to the person who submitted the form
function confirmationEmailHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="background:#080e1f;border-radius:12px 12px 0 0;padding:28px 36px">
          <p style="margin:0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#60a5fa;font-weight:600">MRG Consulting</p>
          <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:600">Wir haben Ihre Nachricht erhalten</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px">
          <p style="margin:0 0 16px;font-size:16px;color:#1a1a2e">Hallo ${escapeHtml(name)},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7">
            vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und melden uns
            <strong style="color:#1a1a2e">innerhalb von 24 Stunden</strong> bei Ihnen.
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.7">
            Falls Sie in der Zwischenzeit Fragen haben, erreichen Sie uns jederzeit direkt unter
            <a href="mailto:${OWNER_EMAIL}" style="color:#2563eb;text-decoration:none">${OWNER_EMAIL}</a>.
          </p>

          <table cellpadding="0" cellspacing="0">
            <tr><td>
              <a href="https://calendly.com/max-developer-consult/30min"
                 style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px">
                Direkttermin buchen
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-radius:0 0 12px 12px;padding:18px 36px;border-top:1px solid #e2e8f0">
          <p style="margin:0 0 4px;font-size:12px;color:#94a3b8">MRG Consulting · Grabsch Consulting OÜ</p>
          <p style="margin:0;font-size:11px;color:#cbd5e1">Bitte nicht auf diese E-Mail antworten.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Prevent XSS in HTML email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  // reCAPTCHA v3: verify token here before processing
  // Analytics: log event to your tracking service here

  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Send both emails in parallel
    const [ownerResult, confirmResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: data.email,
        subject: `Neue Anfrage von ${data.name} (${data.role})`,
        html: ownerEmailHtml(data),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: "Ihre Anfrage bei MRG Consulting",
        html: confirmationEmailHtml(data.name),
      }),
    ]);

    // Database logging: persist ownerResult.data?.id + form data here if needed

    if (ownerResult.error) {
      console.error("[resend] owner email failed:", ownerResult.error);
      return NextResponse.json({ success: false, message: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
    }

    if (confirmResult.error) {
      // Non-fatal: owner was notified, confirmation just failed
      console.warn("[resend] confirmation email failed:", confirmResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("[contact] unexpected error:", error);
    return NextResponse.json({ success: false, message: "Interner Fehler." }, { status: 500 });
  }
}
