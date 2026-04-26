"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PlayerCard } from "@/components/player-card";
import type { Player } from "@/types";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getPlayers()
      .then(setPlayers)
      .catch(() => setError("Failed to load players"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-zinc-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Players</h1>
      {players.length === 0 ? (
        <p className="text-zinc-400">No players yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {players.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      )}
    </div>
  );
}
