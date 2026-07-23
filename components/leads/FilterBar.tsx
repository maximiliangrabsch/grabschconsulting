"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, LeadFilters, LeadStatus } from "@/lib/leads/types";

export function FilterBar({
  filters,
  filterOptions,
}: {
  filters: LeadFilters;
  filterOptions: { orte: string[]; branchen: string[] };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [ort, setOrt] = useState(filters.ort);
  const [branche, setBranche] = useState(filters.branche);
  const [minScore, setMinScore] = useState(filters.minScore);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pushParams(next: Partial<Record<string, string>>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  }

  // Debounce free-text / slider changes so we don't navigate on every keystroke.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      pushParams({ ort, branche, minScore: String(minScore) });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ort, branche, minScore]);

  function toggleStatus(status: LeadStatus) {
    const active = new Set(filters.statuses);
    if (active.has(status)) active.delete(status);
    else active.add(status);
    const next = Array.from(active);
    pushParams({ status: next.length ? next.join(",") : LEAD_STATUSES[0] });
  }

  function setAllStatuses() {
    pushParams({ status: LEAD_STATUSES.join(",") });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white/60 p-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink-soft">Ort</label>
          <input
            list="leads-orte"
            value={ort}
            onChange={(e) => setOrt(e.target.value)}
            placeholder="z. B. München"
            className="w-40 rounded-lg border border-ink/12 bg-white/70 px-3 py-1.5 text-sm text-ink placeholder:text-ink-faint focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-300"
          />
          <datalist id="leads-orte">
            {filterOptions.orte.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink-soft">Branche</label>
          <input
            list="leads-branchen"
            value={branche}
            onChange={(e) => setBranche(e.target.value)}
            placeholder="z. B. Friseur"
            className="w-40 rounded-lg border border-ink/12 bg-white/70 px-3 py-1.5 text-sm text-ink placeholder:text-ink-faint focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-300"
          />
          <datalist id="leads-branchen">
            {filterOptions.branchen.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink-soft">
            Min. Opportunity Score: <span className="tabular-nums text-ink">{minScore}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-40 accent-terracotta-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-ink-soft">Sortierung</label>
          <select
            value={filters.sort}
            onChange={(e) => pushParams({ sort: e.target.value })}
            className="rounded-lg border border-ink/12 bg-white/70 px-3 py-1.5 text-sm text-ink focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-300"
          >
            <option value="score_desc">Opportunity Score ↓</option>
            <option value="updated_desc">Zuletzt aktualisiert ↓</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-medium text-ink-soft">Status:</span>
        {LEAD_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => toggleStatus(status)}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
              filters.statuses.includes(status)
                ? "border-terracotta-500/40 bg-terracotta-500/15 text-terracotta-700"
                : "border-ink/10 bg-white/50 text-ink-soft hover:border-ink/20"
            }`}
          >
            {LEAD_STATUS_LABELS[status]}
          </button>
        ))}
        <button
          onClick={setAllStatuses}
          className="ml-1 rounded-full border border-ink/10 px-2.5 py-1 text-xs font-medium text-petrol-600 hover:bg-petrol-500/10"
        >
          Alle anzeigen
        </button>
      </div>
    </div>
  );
}
