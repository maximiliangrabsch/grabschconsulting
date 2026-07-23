import { loginToLeadsDashboard } from "./actions";

export default async function LeadsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#faf6ee" }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-[#211d19]/10 bg-white/70 p-8 shadow-sm">
        <p className="mb-3 inline-flex items-center rounded-full bg-[#c1552a]/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#7d361b]">
          Internes Tool
        </p>
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-[#211d19]">
          Leads-Dashboard
        </h1>

        <form action={loginToLeadsDashboard} className="space-y-4">
          <input type="hidden" name="from" value={from ?? "/leads"} />
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#5a5248]">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full rounded-lg border border-[#211d19]/12 bg-white/70 px-4 py-3 text-sm text-[#211d19] placeholder:text-[#8c8377] transition focus:border-[#d8672f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#e68a56]"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600">Falsches Passwort. Bitte erneut versuchen.</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#c1552a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9f4522]"
          >
            Anmelden
          </button>
        </form>
      </div>
    </main>
  );
}
