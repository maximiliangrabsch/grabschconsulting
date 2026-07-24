"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ChevronDown, Loader2, Mail, ShieldCheck, ShieldAlert, Smartphone, Gauge, PhoneCall } from "lucide-react";
import { hasWebsite, Lead, LeadStatus, LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/leads/types";
import { sendLeadEmail, updateLeadFollowup, updateLeadNotes, updateLeadStatus } from "@/lib/leads/actions";
import { buildLeadEmailDraft } from "@/lib/leads/email-templates";

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;

function extractEmailFromNotes(notizen: string | null): string {
  if (!notizen) return "";
  const match = notizen.match(EMAIL_RE);
  return match ? match[0] : "";
}

function AuditRow({
  icon,
  label,
  ok,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  ok: boolean | null;
  detail?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#211d19]/[0.06] py-2 last:border-0">
      <span className="flex items-center gap-2 text-sm text-[#5a5248]">
        {icon}
        {label}
      </span>
      <span
        className={`text-sm font-medium ${
          ok === null ? "text-[#5a5248]" : ok ? "text-[#1b4f49]" : "text-[#9f4522]"
        }`}
      >
        {detail ?? (ok === null ? "Unbekannt" : ok ? "Ja" : "Nein")}
      </span>
    </div>
  );
}

export function LeadDetailSheet({
  lead,
  onClose,
  onLeadUpdated,
}: {
  lead: Lead | null;
  onClose: () => void;
  onLeadUpdated: (id: string, patch: Partial<Lead>) => void;
}) {
  return (
    <AnimatePresence>
      {lead ? (
        <LeadDetailPanel key={lead.id} lead={lead} onClose={onClose} onLeadUpdated={onLeadUpdated} />
      ) : null}
    </AnimatePresence>
  );
}

// Keyed by lead.id from the parent so switching leads remounts this panel —
// state (notes draft, compose form, …) initializes fresh per lead without an effect.
function LeadDetailPanel({
  lead,
  onClose,
  onLeadUpdated,
}: {
  lead: Lead;
  onClose: () => void;
  onLeadUpdated: (id: string, patch: Partial<Lead>) => void;
}) {
  const [notes, setNotes] = useState(lead.notizen ?? "");
  const [followup, setFollowup] = useState(lead.naechstes_followup?.slice(0, 10) ?? "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [savingFollowup, setSavingFollowup] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const [composing, setComposing] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleNotesBlur() {
    if (notes === (lead.notizen ?? "")) return;
    setSavingNotes(true);
    try {
      const res = await updateLeadNotes(lead.id, notes);
      if (res.success) onLeadUpdated(lead.id, { notizen: notes });
    } catch (err) {
      console.error("[leads] updateLeadNotes threw:", err);
    } finally {
      // finally, not just after the await: if updateLeadNotes throws instead
      // of resolving {success:false}, this indicator would otherwise spin
      // forever with no feedback.
      setSavingNotes(false);
    }
  }

  async function handleFollowupChange(value: string) {
    setFollowup(value);
    setSavingFollowup(true);
    try {
      const res = await updateLeadFollowup(lead.id, value || null);
      if (res.success) onLeadUpdated(lead.id, { naechstes_followup: value || null });
    } catch (err) {
      console.error("[leads] updateLeadFollowup threw:", err);
    } finally {
      setSavingFollowup(false);
    }
  }

  async function handleStatusSelect(status: LeadStatus) {
    setStatusMenuOpen(false);
    if (status === lead.status) return;
    setSavingStatus(true);
    try {
      const res = await updateLeadStatus(lead.id, status);
      if (res.success) onLeadUpdated(lead.id, { status });
    } catch (err) {
      console.error("[leads] updateLeadStatus threw:", err);
    } finally {
      setSavingStatus(false);
    }
  }

  function openCompose() {
    const draft = buildLeadEmailDraft(lead);
    setSubject(draft.subject);
    setBody(draft.body);
    setRecipient(extractEmailFromNotes(lead.notizen));
    setSendError(null);
    setSendSuccess(false);
    setComposing(true);
  }

  function handleSend() {
    setSendError(null);
    startTransition(async () => {
      try {
        const res = await sendLeadEmail(lead.id, recipient, subject, body);
        if (res.success) {
          setSendSuccess(true);
          // Only reflect the status flip locally if the server actually
          // confirmed it — sendLeadEmail can succeed (email sent) while the
          // secondary status update fails, and we don't want the UI to claim
          // "kontaktiert" when the DB still disagrees.
          if (res.statusUpdated) onLeadUpdated(lead.id, { status: "kontaktiert" });
        } else {
          setSendError(res.message);
        }
      } catch (err) {
        console.error("[leads] sendLeadEmail threw:", err);
        setSendError("E-Mail konnte nicht gesendet werden.");
      }
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#211d19]/30 backdrop-blur-[2px]"
      />
      <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[#211d19]/10 bg-[#faf6ee] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#211d19]/10 px-6 py-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-[#211d19]">{lead.name}</h2>

                <div className="mt-1.5">
                  <button
                    onClick={() => setStatusMenuOpen((v) => !v)}
                    disabled={savingStatus}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#c1552a]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#7d361b] transition hover:bg-[#c1552a]/25 disabled:opacity-60"
                  >
                    {savingStatus ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${statusMenuOpen ? "rotate-180" : ""}`}
                      />
                    )}
                    {LEAD_STATUS_LABELS[lead.status]}
                  </button>

                  {statusMenuOpen ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {LEAD_STATUSES.filter((s) => s !== lead.status).map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusSelect(s)}
                          className="rounded-full border border-[#211d19]/10 bg-white/70 px-2.5 py-1 text-xs font-medium text-[#5a5248] transition hover:border-[#d8672f]/40 hover:bg-white hover:text-[#211d19]"
                        >
                          {LEAD_STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <p className="mt-1.5 text-sm text-[#5a5248]">
                  {[lead.branche, lead.ort].filter(Boolean).join(" · ")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-[#211d19]/10 p-1.5 text-[#5a5248] transition hover:bg-[#211d19]/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-6 px-6 py-5">
              <section className="space-y-1 text-sm text-[#5a5248]">
                {lead.adresse ? <p>{lead.adresse}</p> : null}
                {lead.telefon ? (
                  <p className="flex items-center gap-1.5">
                    <PhoneCall className="h-3.5 w-3.5 text-[#8c8377]" />
                    {lead.telefon}
                  </p>
                ) : null}
                {hasWebsite(lead.website) ? (
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[#1b4f49] hover:underline"
                  >
                    {lead.website}
                  </a>
                ) : (
                  <span className="inline-block rounded-full border border-[#211d19]/10 bg-[#211d19]/[0.04] px-2 py-0.5 text-xs text-[#5a5248]">
                    Keine Website
                  </span>
                )}
              </section>

              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5a5248]">
                  Audit
                </h3>
                <div className="rounded-xl border border-[#211d19]/10 bg-white/60 px-4">
                  <AuditRow
                    icon={
                      lead.erreichbar ? (
                        <ShieldCheck className="h-4 w-4 text-[#2c6b63]" />
                      ) : (
                        <ShieldAlert className="h-4 w-4 text-[#c1552a]" />
                      )
                    }
                    label="Erreichbar"
                    ok={lead.erreichbar}
                  />
                  <AuditRow
                    icon={
                      lead.hat_ssl ? (
                        <ShieldCheck className="h-4 w-4 text-[#2c6b63]" />
                      ) : (
                        <ShieldAlert className="h-4 w-4 text-[#c1552a]" />
                      )
                    }
                    label="SSL"
                    ok={lead.hat_ssl}
                  />
                  <AuditRow
                    icon={<Smartphone className="h-4 w-4 text-[#8c8377]" />}
                    label="Mobile optimiert"
                    ok={lead.mobile_optimiert}
                  />
                  <AuditRow
                    icon={<Gauge className="h-4 w-4 text-[#8c8377]" />}
                    label="PageSpeed"
                    ok={lead.pagespeed_score !== null ? lead.pagespeed_score >= 50 : null}
                    detail={lead.pagespeed_score !== null ? `${lead.pagespeed_score}/100` : undefined}
                  />
                </div>
                {lead.last_modified ? (
                  <p className="mt-1.5 text-xs text-[#5a5248]">
                    Zuletzt geprüft: {new Date(lead.last_modified).toLocaleDateString("de-DE")}
                  </p>
                ) : null}
              </section>

              <section>
                <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[#5a5248]">
                  Notizen
                  {savingNotes ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleNotesBlur}
                  rows={5}
                  placeholder="Freitext-Notizen…"
                  className="w-full resize-none rounded-lg border border-[#211d19]/12 bg-white/70 px-3 py-2.5 text-sm text-[#211d19] placeholder:text-[#8c8377] focus:border-[#d8672f] focus:outline-none focus:ring-1 focus:ring-[#e68a56]"
                />
              </section>

              <section>
                <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[#5a5248]">
                  Nächstes Follow-up
                  {savingFollowup ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                </label>
                <input
                  type="date"
                  value={followup}
                  onChange={(e) => handleFollowupChange(e.target.value)}
                  className="w-full rounded-lg border border-[#211d19]/12 bg-white/70 px-3 py-2 text-sm text-[#211d19] focus:border-[#d8672f] focus:outline-none focus:ring-1 focus:ring-[#e68a56]"
                />
              </section>

              {lead.zugewiesen_an ? (
                <p className="text-xs text-[#5a5248]">Zugewiesen an: {lead.zugewiesen_an}</p>
              ) : null}

              <section className="border-t border-[#211d19]/10 pt-5">
                {!composing ? (
                  <button
                    onClick={openCompose}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c1552a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9f4522]"
                  >
                    <Mail className="h-4 w-4" />
                    E-Mail senden
                  </button>
                ) : (
                  <div className="space-y-3 rounded-xl border border-[#211d19]/10 bg-white/60 p-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#5a5248]">
                        Empfänger-E-Mail
                      </label>
                      <input
                        type="email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="kontakt@unternehmen.de"
                        className="w-full rounded-lg border border-[#211d19]/12 bg-white/80 px-3 py-2 text-sm text-[#211d19] placeholder:text-[#8c8377] focus:border-[#d8672f] focus:outline-none focus:ring-1 focus:ring-[#e68a56]"
                      />
                      <p className="mt-1 text-[11px] text-[#5a5248]">
                        Keine E-Mail im Schema hinterlegt — bitte manuell eintragen (wird aus den
                        Notizen vorausgefüllt, falls dort eine Adresse steht).
                      </p>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#5a5248]">Betreff</label>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-lg border border-[#211d19]/12 bg-white/80 px-3 py-2 text-sm text-[#211d19] focus:border-[#d8672f] focus:outline-none focus:ring-1 focus:ring-[#e68a56]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[#5a5248]">Text</label>
                      <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={8}
                        className="w-full resize-none rounded-lg border border-[#211d19]/12 bg-white/80 px-3 py-2 text-sm text-[#211d19] focus:border-[#d8672f] focus:outline-none focus:ring-1 focus:ring-[#e68a56]"
                      />
                    </div>

                    {sendError ? <p className="text-xs text-red-600">{sendError}</p> : null}
                    {sendSuccess ? (
                      <p className="flex items-center gap-1.5 text-xs font-medium text-[#1b4f49]">
                        <Check className="h-3.5 w-3.5" /> Gesendet — Status auf &quot;Kontaktiert&quot; gesetzt.
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setComposing(false)}
                          className="flex-1 rounded-lg border border-[#211d19]/12 px-3 py-2 text-sm font-medium text-[#5a5248] transition hover:bg-[#211d19]/5"
                        >
                          Abbrechen
                        </button>
                        <button
                          onClick={handleSend}
                          disabled={isPending || !EMAIL_RE.test(recipient)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#c1552a] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#9f4522] disabled:opacity-50"
                        >
                          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                          Senden
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          </motion.aside>
    </>
  );
}
