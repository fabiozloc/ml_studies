"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { MatchCard } from "@/components/match-card";
import type { Match } from "@/types";

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getMatches()
      .then(setMatches)
      .catch(() => setError("Failed to load matches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-zinc-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Matches</h1>
      {matches.length === 0 ? (
        <p className="text-zinc-400">No matches yet.</p>
      ) : (
        <div className="space-y-3">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      )}
    </div>
  );
}
