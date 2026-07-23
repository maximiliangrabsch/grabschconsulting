"use client";

import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Lead, LeadStatus, LEAD_STATUS_LABELS } from "@/lib/leads/types";
import { LeadCard } from "./LeadCard";

const STATUS_ACCENT: Record<LeadStatus, string> = {
  neu: "border-t-[#4a8981]",
  kontaktiert: "border-t-[#b08d57]",
  antwort_erhalten: "border-t-[#b08d57]",
  termin: "border-t-[#d8672f]",
  angebot: "border-t-[#c1552a]",
  kunde: "border-t-[#1b4f49]",
  abgelehnt: "border-t-[#211d19]/20",
};

function LeadColumnImpl({
  status,
  leads,
  totalCount,
  hasMore,
  loadingMore,
  loaded,
  pendingLeadIds,
  onOpenLead,
  onLoadMore,
}: {
  status: LeadStatus;
  leads: Lead[];
  totalCount: number;
  hasMore: boolean;
  loadingMore: boolean;
  loaded: boolean;
  pendingLeadIds: Set<string>;
  onOpenLead: (lead: Lead) => void;
  onLoadMore: (status: LeadStatus) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-2xl border border-t-2 bg-[#f1e9da]/60 ${STATUS_ACCENT[status]} ${
        isOver ? "ring-2 ring-[#d8672f]/50" : ""
      }`}
    >
      <div className="flex items-center justify-between border-b border-[#211d19]/10 px-3.5 py-3">
        <h3 className="text-sm font-semibold text-[#211d19]">{LEAD_STATUS_LABELS[status]}</h3>
        <span className="rounded-full bg-[#211d19]/[0.06] px-2 py-0.5 text-xs font-medium tabular-nums text-[#5a5248]">
          {totalCount}
        </span>
      </div>

      <div className="flex min-h-[120px] flex-1 flex-col gap-2 overflow-y-auto p-2.5" style={{ maxHeight: "calc(100vh - 260px)" }}>
        {!loaded ? (
          <button
            onClick={() => onLoadMore(status)}
            className="rounded-lg border border-dashed border-[#211d19]/15 px-3 py-4 text-center text-xs text-[#5a5248] transition hover:border-[#d8672f]/40"
          >
            Nicht geladen — Filter passt {totalCount} Lead{totalCount === 1 ? "" : "s"} nicht an.
            <br />
            Klicken zum Laden.
          </button>
        ) : leads.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-[#5a5248]">Keine Leads in dieser Spalte.</p>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onOpen={onOpenLead}
              pending={pendingLeadIds.has(lead.id)}
            />
          ))
        )}

        {loaded && hasMore ? (
          <button
            onClick={() => onLoadMore(status)}
            disabled={loadingMore}
            className="mt-1 rounded-lg border border-[#211d19]/10 bg-white/60 px-3 py-2 text-xs font-medium text-[#5a5248] transition hover:border-[#d8672f]/40 disabled:opacity-50"
          >
            {loadingMore ? "Lädt…" : `Mehr laden (${leads.length}/${totalCount})`}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export const LeadColumn = memo(LeadColumnImpl);
