import { scoreTier } from "@/lib/leads/types";

// Text colors are chosen for >=4.5:1 contrast against the [#faf6ee] background
// ([#8c8377] and [#8d6f3f] fall short at small/bold sizes — see LeadCard etc.
// for the same rule applied to other dashboard text).
const TIER_STYLES: Record<ReturnType<typeof scoreTier>, string> = {
  hot: "bg-[#c1552a]/15 text-[#7d361b] border-[#c1552a]/30",
  warm: "bg-[#b08d57]/15 text-amber-800 border-[#b08d57]/30",
  cold: "bg-[#211d19]/[0.06] text-[#5a5248] border-[#211d19]/10",
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
