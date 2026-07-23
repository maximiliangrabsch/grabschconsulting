"use client";

import { memo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Star, Globe, MapPin, Loader2 } from "lucide-react";
import { hasWebsite, Lead } from "@/lib/leads/types";
import { ScoreBadge } from "./ScoreBadge";

function LeadCardImpl({
  lead,
  onOpen,
  dragDisabled = false,
  pending = false,
}: {
  lead: Lead;
  onOpen: (lead: Lead) => void;
  dragDisabled?: boolean;
  pending?: boolean;
}) {
  // `disabled` while pending: prevents re-dragging a card whose previous move
  // hasn't been confirmed by the server yet, which is what caused the
  // occasional "snaps back" / race-condition feel when dragging fast.
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: lead.id,
    disabled: dragDisabled || pending,
    data: { lead },
  });

  // No `transform` applied here on purpose: the board renders a <DragOverlay>
  // for the actively-dragged card, so this source element must stay put and
  // only dim — applying the drag transform to both caused a visible double
  // motion (the card itself sliding *and* the overlay copy following the
  // cursor), which read as jank/stutter during drag.
  return (
    <div
      ref={setNodeRef}
      {...(dragDisabled || pending ? {} : { ...attributes, ...listeners })}
      onClick={() => !isDragging && !pending && onOpen(lead)}
      className={`group cursor-pointer rounded-xl border border-[#211d19]/10 bg-white/70 p-3.5 shadow-sm transition hover:border-[#d8672f]/40 hover:shadow-md ${
        isDragging ? "opacity-40" : pending ? "opacity-60" : ""
      } ${dragDisabled || pending ? "" : "touch-none"}`}
    >
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-[#211d19]">{lead.name}</p>
        {pending ? <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#5a5248]" /> : <ScoreBadge score={lead.opportunity_score} />}
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#5a5248]">
        {lead.ort ? (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#8c8377]" />
            {lead.ort}
          </span>
        ) : null}
        {lead.branche ? <span className="text-[#5a5248]">· {lead.branche}</span> : null}
      </div>

      <div className="flex items-center justify-between gap-2">
        {lead.google_rating ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#5a5248]">
            <Star className="h-3 w-3 fill-[#8d6f3f] text-[#8d6f3f]" />
            {lead.google_rating.toFixed(1)}
            {lead.anzahl_bewertungen ? (
              <span className="text-[#5a5248]">({lead.anzahl_bewertungen})</span>
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
            className="inline-flex items-center gap-1 text-xs font-medium text-[#1b4f49] hover:text-[#123b37] hover:underline"
          >
            <Globe className="h-3 w-3" />
            Website
          </a>
        ) : (
          <span className="rounded-full border border-[#211d19]/10 bg-[#211d19]/[0.04] px-2 py-0.5 text-[11px] font-medium text-[#5a5248]">
            Keine Website
          </span>
        )}
      </div>
    </div>
  );
}

export const LeadCard = memo(LeadCardImpl);
