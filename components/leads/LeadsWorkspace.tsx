"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
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
  // Deep link (e.g. from the follow-up reminder email: /leads?lead=<id>) opens
  // straight into the detail sheet, even if that lead isn't in a loaded column.
  const [selectedLead, setSelectedLead] = useState<Lead | null>(initialSelectedLead);
  const [activeDragLead, setActiveDragLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function findLeadStatus(id: string): LeadStatus | null {
    for (const status of LEAD_STATUSES) {
      if (columns[status].leads.some((l) => l.id === id)) return status;
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
    const sourceStatus = findLeadStatus(leadId);
    if (!sourceStatus || sourceStatus === targetStatus) return;

    const lead = columns[sourceStatus].leads.find((l) => l.id === leadId);
    if (!lead) return;

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

    const res = await updateLeadStatus(leadId, targetStatus);
    if (!res.success) {
      // Revert on failure
      setColumns((prev) => ({
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
      }));
    }
  }

  async function handleLoadMore(status: LeadStatus) {
    setLoadingMore((prev) => ({ ...prev, [status]: true }));
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
    setLoadingMore((prev) => ({ ...prev, [status]: false }));
  }

  function handleStatusChange(id: string, status: LeadStatus) {
    const sourceStatus = findLeadStatus(id);
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
    void updateLeadStatus(id, status);
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
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
                onOpenLead={setSelectedLead}
                onLoadMore={() => handleLoadMore(status)}
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
