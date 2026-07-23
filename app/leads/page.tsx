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
            <p className="mb-2 inline-flex items-center rounded-full bg-[#c1552a]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#7d361b]">
              Internes Tool
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-[#211d19]">Leads-Dashboard</h1>
          </div>
          <form action={logoutFromLeadsDashboard}>
            <button
              type="submit"
              className="rounded-lg border border-[#211d19]/12 px-3 py-1.5 text-xs font-medium text-[#5a5248] transition hover:bg-[#211d19]/5"
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
