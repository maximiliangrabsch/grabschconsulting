"use client";

import { hasWebsite, LEAD_STATUSES, LEAD_STATUS_LABELS, Lead, LeadStatus } from "@/lib/leads/types";
import { ScoreBadge } from "./ScoreBadge";
import { ColumnState } from "./LeadsWorkspace";

export function MobileLeadList({
  columns,
  loadingMore,
  onOpenLead,
  onLoadMore,
  onStatusChange,
}: {
  columns: Record<LeadStatus, ColumnState>;
  loadingMore: Partial<Record<LeadStatus, boolean>>;
  onOpenLead: (lead: Lead) => void;
  onLoadMore: (status: LeadStatus) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}) {
  const allLeads = LEAD_STATUSES.flatMap((status) => columns[status].leads);

  if (allLeads.length === 0) {
    return <p className="py-10 text-center text-sm text-[#5a5248]">Keine Leads für die aktuellen Filter.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {allLeads.map((lead) => (
        <div
          key={lead.id}
          className="rounded-xl border border-[#211d19]/10 bg-white/70 p-4 shadow-sm"
        >
          <div onClick={() => onOpenLead(lead)} className="mb-2 flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-[#211d19]">{lead.name}</p>
              <p className="text-xs text-[#5a5248]">
                {[lead.branche, lead.ort].filter(Boolean).join(" · ")}
              </p>
            </div>
            <ScoreBadge score={lead.opportunity_score} />
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-[#5a5248]">
            {lead.google_rating ? (
              <span>★ {lead.google_rating.toFixed(1)}</span>
            ) : (
              <span />
            )}
            {hasWebsite(lead.website) ? (
              <a href={lead.website} target="_blank" rel="noreferrer" className="text-[#1b4f49] underline">
                Website
              </a>
            ) : (
              <span className="rounded-full border border-[#211d19]/10 bg-[#211d19]/[0.04] px-2 py-0.5 text-[11px] text-[#5a5248]">
                Keine Website
              </span>
            )}
          </div>

          <select
            value={lead.status}
            onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
            className="w-full rounded-lg border border-[#211d19]/12 bg-white/80 px-3 py-2 text-sm text-[#211d19] focus:border-[#d8672f] focus:outline-none focus:ring-1 focus:ring-[#e68a56]"
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {LEAD_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      ))}

      {LEAD_STATUSES.filter((s) => columns[s].hasMore).map((status) => (
        <button
          key={status}
          onClick={() => onLoadMore(status)}
          disabled={Boolean(loadingMore[status])}
          className="rounded-lg border border-[#211d19]/10 bg-white/60 px-3 py-2 text-xs font-medium text-[#5a5248] disabled:opacity-50"
        >
          {loadingMore[status] ? "Lädt…" : `Mehr „${LEAD_STATUS_LABELS[status]}“ laden`}
        </button>
      ))}
    </div>
  );
}
