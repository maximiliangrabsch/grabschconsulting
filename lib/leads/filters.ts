import { DEFAULT_FILTERS, LEAD_STATUSES, LeadFilters, LeadSort, LeadStatus } from "@/lib/leads/types";

export type LeadsSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseLeadFilters(searchParams: LeadsSearchParams): LeadFilters {
  const statusParam = first(searchParams.status);
  const statuses: LeadStatus[] = statusParam
    ? (statusParam
        .split(",")
        .filter((s): s is LeadStatus => (LEAD_STATUSES as readonly string[]).includes(s)))
    : DEFAULT_FILTERS.statuses;

  const minScoreParam = first(searchParams.minScore);
  const minScore = minScoreParam !== undefined ? Number(minScoreParam) : DEFAULT_FILTERS.minScore;

  const sortParam = first(searchParams.sort);
  const sort: LeadSort = sortParam === "updated_desc" ? "updated_desc" : "score_desc";

  return {
    statuses: statuses.length ? statuses : DEFAULT_FILTERS.statuses,
    minScore: Number.isFinite(minScore) ? minScore : DEFAULT_FILTERS.minScore,
    ort: first(searchParams.ort) ?? "",
    branche: first(searchParams.branche) ?? "",
    sort,
  };
}
