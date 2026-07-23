import { LEAD_STATUSES, LeadStatus } from "@/lib/leads/types";
import { parseLeadFilters, LeadsSearchParams } from "@/lib/leads/filters";
import { getFilterOptions, getLeadById, getLeadsForColumn, getStatusCounts } from "@/lib/leads/actions";
import { FilterBar } from "@/components/leads/FilterBar";
import { LeadsWorkspace, ColumnState } from "@/components/leads/LeadsWorkspace";
import { logoutFromLeadsDashboard } from "./login/actions";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<LeadsSearchParams>;
}) {
  const params = await searchParams;
  const filters = parseLeadFilters(params);
  const deepLinkedLeadId = Array.isArray(params.lead) ? params.lead[0] : params.lead;

  const [filterOptions, statusCounts, deepLinkedLead, ...columnPages] = await Promise.all([
    getFilterOptions(),
    getStatusCounts(filters),
    deepLinkedLeadId ? getLeadById(deepLinkedLeadId) : Promise.resolve(null),
    ...LEAD_STATUSES.map((status) =>
      filters.statuses.includes(status)
        ? getLeadsForColumn(status, filters, 0)
        : Promise.resolve(null)
    ),
  ]);

  const initialColumns = {} as Record<LeadStatus, ColumnState>;
  LEAD_STATUSES.forEach((status, i) => {
    const page = columnPages[i];
    if (page) {
      initialColumns[status] = { leads: page.leads, total: page.total, hasMore: page.hasMore, loaded: true };
    } else {
      initialColumns[status] = { leads: [], total: statusCounts[status] ?? 0, hasMore: false, loaded: false };
    }
  });

  return (
    <main className="min-h-screen px-4 py-6 md:px-8" style={{ background: "#faf6ee" }}>
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="section-label mb-1 inline-block border-l-2 border-terracotta-500 pl-2 text-xs uppercase tracking-wide text-ink-soft">
              Internes Tool
            </p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">Leads-Dashboard</h1>
          </div>
          <form action={logoutFromLeadsDashboard}>
            <button
              type="submit"
              className="rounded-lg border border-ink/12 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:bg-ink/5"
            >
              Abmelden
            </button>
          </form>
        </div>

        <div className="mb-5">
          <FilterBar filters={filters} filterOptions={filterOptions} />
        </div>

        <LeadsWorkspace
          key={JSON.stringify(filters)}
          filters={filters}
          initialColumns={initialColumns}
          initialSelectedLead={deepLinkedLead}
        />
      </div>
    </main>
  );
}
