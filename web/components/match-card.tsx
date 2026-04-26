import type { Match } from "@/types";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <p className="text-xs text-zinc-400 mb-2">{match.date}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium flex-1 text-right">{match.home_team}</span>
        <span className="text-2xl font-bold tabular-nums">
          {match.home_score} – {match.away_score}
        </span>
        <span className="font-medium flex-1">{match.away_team}</span>
      </div>
    </div>
  );
}
