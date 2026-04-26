import Link from "next/link";
import type { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link href={`/players/${player.id}`} className="block">
      <div className="rounded-xl border border-zinc-200 p-4 hover:border-zinc-400 transition-colors">
        <h2 className="font-medium text-lg">{player.name}</h2>
        <p className="text-sm text-zinc-500">
          {player.position} · {player.team}
        </p>
        <p className="text-xs text-zinc-400 mt-1">{player.nationality} · Age {player.age}</p>
      </div>
    </Link>
  );
}
