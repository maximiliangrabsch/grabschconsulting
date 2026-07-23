"use client";

import { useDraggable } from "@dnd-kit/core";
import { Star, Globe, MapPin } from "lucide-react";
import { hasWebsite, Lead } from "@/lib/leads/types";
import { ScoreBadge } from "./ScoreBadge";

export function LeadCard({
  lead,
  onOpen,
  dragDisabled = false,
}: {
  lead: Lead;
  onOpen: (lead: Lead) => void;
  dragDisabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    disabled: dragDisabled,
    data: { lead },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(dragDisabled ? {} : { ...attributes, ...listeners })}
      onClick={() => !isDragging && onOpen(lead)}
      className={`group cursor-pointer rounded-xl border border-ink/10 bg-white/70 p-3.5 shadow-sm transition hover:border-terracotta-400/40 hover:shadow-md ${
        isDragging ? "z-50 opacity-60 shadow-lg" : ""
      } ${dragDisabled ? "" : "touch-none"}`}
    >
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <p className="font-display text-sm font-semibold leading-snug text-ink">{lead.name}</p>
        <ScoreBadge score={lead.opportunity_score} />
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-soft">
        {lead.ort ? (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 text-ink-faint" />
            {lead.ort}
          </span>
        ) : null}
        {lead.branche ? <span className="text-ink-soft">· {lead.branche}</span> : null}
      </div>

      <div className="flex items-center justify-between gap-2">
        {lead.google_rating ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-soft">
            <Star className="h-3 w-3 fill-gold-600 text-gold-600" />
            {lead.google_rating.toFixed(1)}
            {lead.anzahl_bewertungen ? (
              <span className="text-ink-soft">({lead.anzahl_bewertungen})</span>
            ) : null}
          </span>
        ) : (
          <span />
        )}

        {hasWebsite(lead.website) ? (
          <a
            href={lead.website}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-medium text-petrol-600 hover:text-petrol-700 hover:underline"
          >
            <Globe className="h-3 w-3" />
            Website
          </a>
        ) : (
          <span className="rounded-full border border-ink/10 bg-ink/[0.04] px-2 py-0.5 text-[11px] font-medium text-ink-soft">
            Keine Website
          </span>
        )}
      </div>
    </div>
  );
}
