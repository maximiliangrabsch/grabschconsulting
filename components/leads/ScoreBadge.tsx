import { scoreTier } from "@/lib/leads/types";

// Text colors are chosen for >=4.5:1 contrast against the cream background
// (ink-faint and gold-600 fall short at small/bold sizes — see LeadCard etc.
// for the same rule applied to other dashboard text).
const TIER_STYLES: Record<ReturnType<typeof scoreTier>, string> = {
  hot: "bg-terracotta-500/15 text-terracotta-700 border-terracotta-500/30",
  warm: "bg-gold-500/15 text-amber-800 border-gold-500/30",
  cold: "bg-ink/[0.06] text-ink-soft border-ink/10",
};

export function ScoreBadge({ score }: { score: number | null }) {
  const tier = scoreTier(score);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold tabular-nums ${TIER_STYLES[tier]}`}
      title="Opportunity Score"
    >
      {score ?? "–"}
    </span>
  );
}
