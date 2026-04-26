import type {
  Player,
  PlayerCreate,
  PlayerDetail,
  Match,
  MatchCreate,
  Prediction,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  // Players
  getPlayers: () => apiFetch<Player[]>("/players"),
  getPlayer: (id: string) => apiFetch<PlayerDetail>(`/players/${id}`),
  createPlayer: (body: PlayerCreate) =>
    apiFetch<Player>("/players", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // Matches
  getMatches: (page = 1) => apiFetch<Match[]>(`/matches?page=${page}`),
  createMatch: (body: MatchCreate) =>
    apiFetch<Match>("/matches", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // Predictions
  predict: (playerId: string) =>
    apiFetch<Prediction>("/predict", {
      method: "POST",
      body: JSON.stringify({ player_id: playerId }),
    }),
  getPredictions: (playerId: string) =>
    apiFetch<Prediction[]>(`/predictions/${playerId}`),
};
