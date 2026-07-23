"use client";

import { useCallback, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { LEAD_STATUSES, Lead, LeadFilters, LeadStatus } from "@/lib/leads/types";
import { getLeadsForColumn, updateLeadStatus } from "@/lib/leads/actions";
import { LeadColumn } from "./LeadColumn";
import { LeadCard } from "./LeadCard";
import { LeadDetailSheet } from "./LeadDetailSheet";
import { MobileLeadList } from "./MobileLeadList";

export interface ColumnState {
  leads: Lead[];
  total: number;
  hasMore: boolean;
  loaded: boolean;
}

export function LeadsWorkspace({
  filters,
  initialColumns,
  initialSelectedLead = null,
}: {
  filters: LeadFilters;
  initialColumns: Record<LeadStatus, ColumnState>;
  initialSelectedLead?: Lead | null;
}) {
  const [columns, setColumns] = useState(initialColumns);
  const [loadingMore, setLoadingMore] = useState<Partial<Record<LeadStatus, boolean>>>({});
  const [selectedLead, setSelectedLead] = useState<Lead | null>(initialSelectedLead);
  const [activeDragLead, setActiveDragLead] = useState<Lead | null>(null);
  // Leads with an in-flight status update. Dragging is disabled on these
  // (see LeadCard) so the same card can't be moved again before its previous
  // move is confirmed — that overlap was the source of the "state snaps
  // back" / race-condition feel when dragging quickly.
  const [pendingLeadIds, setPendingLeadIds] = useState<Set<string>>(new Set());

  // closestCenter (rather than the rectIntersection default) gives much more
  // predictable drop-target resolution against these narrow, tall columns —
  // the default was occasionally resolving to the wrong neighboring column
  // near edges, which read as "falsche Drop-Zone-Erkennung".
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function findLeadStatus(cols: Record<LeadStatus, ColumnState>, id: string): LeadStatus | null {
    for (const status of LEAD_STATUSES) {
      if (cols[status].leads.some((l) => l.id === id)) return status;
    }
    return null;
  }

  function handleDragStart(event: DragStartEvent) {
    const lead = event.active.data.current?.lead as Lead | undefined;
    setActiveDragLead(lead ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveDragLead(null);
    const { active, over } = event;
    if (!over) return;

    const leadId = String(active.id);
    const targetStatus = over.id as LeadStatus;
    const sourceStatus = findLeadStatus(columns, leadId);
    if (!sourceStatus || sourceStatus === targetStatus) return;

    const lead = columns[sourceStatus].leads.find((l) => l.id === leadId);
    if (!lead) return;

    setPendingLeadIds((prev) => new Set(prev).add(leadId));

    // Optimistic move
    setColumns((prev) => ({
      ...prev,
      [sourceStatus]: {
        ...prev[sourceStatus],
        leads: prev[sourceStatus].leads.filter((l) => l.id !== leadId),
        total: Math.max(0, prev[sourceStatus].total - 1),
      },
      [targetStatus]: {
        ...prev[targetStatus],
        leads: [{ ...lead, status: targetStatus }, ...prev[targetStatus].leads],
        total: prev[targetStatus].total + 1,
        loaded: true,
      },
    }));

    let succeeded = false;
    try {
      const res = await updateLeadStatus(leadId, targetStatus);
      succeeded = res.success;
    } catch (err) {
      // Server Action threw instead of resolving — still treat as a failure
      // so the optimistic move gets rolled back instead of silently sticking.
      console.error("[leads] updateLeadStatus threw:", err);
      succeeded = false;
    }

    if (!succeeded) {
      setColumns((prev) => {
        // Only revert if the card is still where we optimistically put it —
        // if a later action already moved it again (e.g. a second drag, or
        // the email-send auto-status-change), reverting here would clobber
        // that newer, already-confirmed state.
        const stillInTarget = prev[targetStatus].leads.some((l) => l.id === leadId);
        if (!stillInTarget) return prev;

        return {
          ...prev,
          [sourceStatus]: {
            ...prev[sourceStatus],
            leads: [lead, ...prev[sourceStatus].leads],
            total: prev[sourceStatus].total + 1,
          },
          [targetStatus]: {
            ...prev[targetStatus],
            leads: prev[targetStatus].leads.filter((l) => l.id !== leadId),
            total: Math.max(0, prev[targetStatus].total - 1),
          },
        };
      });
    }

    setPendingLeadIds((prev) => {
      const next = new Set(prev);
      next.delete(leadId);
      return next;
    });
  }

  const handleLoadMore = useCallback(
    async (status: LeadStatus) => {
      setLoadingMore((prev) => ({ ...prev, [status]: true }));
      try {
        const offset = columns[status].leads.length;
        const page = await getLeadsForColumn(status, filters, offset);
        setColumns((prev) => ({
          ...prev,
          [status]: {
            leads: [...prev[status].leads, ...page.leads],
            total: page.total,
            hasMore: page.hasMore,
            loaded: true,
          },
        }));
      } catch (err) {
        console.error("[leads] getLeadsForColumn failed:", err);
      } finally {
        setLoadingMore((prev) => ({ ...prev, [status]: false }));
      }
    },
    // columns is read fresh via the closure each call; only re-created when
    // filters change, which is what should invalidate this callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  async function handleStatusChange(id: string, status: LeadStatus) {
    const sourceStatus = findLeadStatus(columns, id);
    if (!sourceStatus || sourceStatus === status) return;
    const lead = columns[sourceStatus].leads.find((l) => l.id === id);
    if (!lead) return;

    setColumns((prev) => ({
      ...prev,
      [sourceStatus]: {
        ...prev[sourceStatus],
        leads: prev[sourceStatus].leads.filter((l) => l.id !== id),
        total: Math.max(0, prev[sourceStatus].total - 1),
      },
      [status]: {
        ...prev[status],
        leads: [{ ...lead, status }, ...prev[status].leads],
        total: prev[status].total + 1,
        loaded: true,
      },
    }));

    try {
      const res = await updateLeadStatus(id, status);
      if (!res.success) throw new Error(res.message);
    } catch (err) {
      console.error("[leads] mobile status change failed:", err);
      setColumns((prev) => {
        const stillInTarget = prev[status].leads.some((l) => l.id === id);
        if (!stillInTarget) return prev;
        return {
          ...prev,
          [sourceStatus]: {
            ...prev[sourceStatus],
            leads: [lead, ...prev[sourceStatus].leads],
            total: prev[sourceStatus].total + 1,
          },
          [status]: {
            ...prev[status],
            leads: prev[status].leads.filter((l) => l.id !== id),
            total: Math.max(0, prev[status].total - 1),
          },
        };
      });
    }
  }

  function handleLeadUpdated(id: string, patch: Partial<Lead>) {
    setColumns((prev) => {
      const next = { ...prev };
      for (const status of LEAD_STATUSES) {
        const idx = next[status].leads.findIndex((l) => l.id === id);
        if (idx === -1) continue;

        if (patch.status && patch.status !== status) {
          const lead = { ...next[status].leads[idx], ...patch };
          next[status] = {
            ...next[status],
            leads: next[status].leads.filter((l) => l.id !== id),
            total: Math.max(0, next[status].total - 1),
          };
          next[patch.status] = {
            ...next[patch.status],
            leads: [lead, ...next[patch.status].leads],
            total: next[patch.status].total + 1,
            loaded: true,
          };
        } else {
          const updatedLeads = [...next[status].leads];
          updatedLeads[idx] = { ...updatedLeads[idx], ...patch };
          next[status] = { ...next[status], leads: updatedLeads };
        }
        break;
      }
      return next;
    });

    setSelectedLead((prev) => (prev && prev.id === id ? { ...prev, ...patch } : prev));
  }

  return (
    <>
      {/* Desktop Kanban board */}
      <div className="hidden md:block">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {LEAD_STATUSES.map((status) => (
              <LeadColumn
                key={status}
                status={status}
                leads={columns[status].leads}
                totalCount={columns[status].total}
                hasMore={columns[status].hasMore}
                loaded={columns[status].loaded}
                loadingMore={Boolean(loadingMore[status])}
                pendingLeadIds={pendingLeadIds}
                onOpenLead={setSelectedLead}
                onLoadMore={handleLoadMore}
              />
            ))}
          </div>
          <DragOverlay>
            {activeDragLead ? <LeadCard lead={activeDragLead} onOpen={() => {}} dragDisabled /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Mobile: vertical list with status dropdown instead of drag & drop */}
      <div className="md:hidden">
        <MobileLeadList
          columns={columns}
          loadingMore={loadingMore}
          onOpenLead={setSelectedLead}
          onLoadMore={handleLoadMore}
          onStatusChange={handleStatusChange}
        />
      </div>

      <LeadDetailSheet
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onLeadUpdated={handleLeadUpdated}
      />
    </>
  );
}
