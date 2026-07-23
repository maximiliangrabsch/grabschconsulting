"use client";

import { useDroppable } from "@dnd-kit/core";
import { Lead, LeadStatus, LEAD_STATUS_LABELS } from "@/lib/leads/types";
import { LeadCard } from "./LeadCard";

const STATUS_ACCENT: Record<LeadStatus, string> = {
  neu: "border-t-petrol-400",
  kontaktiert: "border-t-gold-500",
  antwort_erhalten: "border-t-gold-500",
  termin: "border-t-terracotta-400",
  angebot: "border-t-terracotta-500",
  kunde: "border-t-petrol-600",
  abgelehnt: "border-t-ink/20",
};

export function LeadColumn({
  status,
  leads,
  totalCount,
  hasMore,
  loadingMore,
  loaded,
  onOpenLead,
  onLoadMore,
}: {
  status: LeadStatus;
  leads: Lead[];
  totalCount: number;
  hasMore: boolean;
  loadingMore: boolean;
  loaded: boolean;
  onOpenLead: (lead: Lead) => void;
  onLoadMore: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-2xl border border-t-2 bg-cream-alt/60 ${STATUS_ACCENT[status]} ${
        isOver ? "ring-2 ring-terracotta-400/50" : ""
      }`}
    >
      <div className="flex items-center justify-between border-b border-ink/10 px-3.5 py-3">
        <h3 className="text-sm font-semibold text-ink">{LEAD_STATUS_LABELS[status]}</h3>
        <span className="rounded-full bg-ink/[0.06] px-2 py-0.5 text-xs font-medium tabular-nums text-ink-soft">
          {totalCount}
        </span>
      </div>

      <div className="flex min-h-[120px] flex-1 flex-col gap-2 overflow-y-auto p-2.5" style={{ maxHeight: "calc(100vh - 260px)" }}>
        {!loaded ? (
          <button
            onClick={onLoadMore}
            className="rounded-lg border border-dashed border-ink/15 px-3 py-4 text-center text-xs text-ink-soft transition hover:border-terracotta-400/40"
          >
            Nicht geladen — Filter passt {totalCount} Lead{totalCount === 1 ? "" : "s"} nicht an.
            <br />
            Klicken zum Laden.
          </button>
        ) : leads.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-ink-soft">Keine Leads in dieser Spalte.</p>
        ) : (
          leads.map((lead) => <LeadCard key={lead.id} lead={lead} onOpen={onOpenLead} />)
        )}

        {loaded && hasMore ? (
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="mt-1 rounded-lg border border-ink/10 bg-white/60 px-3 py-2 text-xs font-medium text-ink-soft transition hover:border-terracotta-400/40 disabled:opacity-50"
          >
            {loadingMore ? "Lädt…" : `Mehr laden (${leads.length}/${totalCount})`}
          </button>
        ) : null}
      </div>
    </div>
  );
}
