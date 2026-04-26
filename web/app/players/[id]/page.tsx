"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { PredictionCard } from "@/components/prediction-card";
import type { PlayerDetail, Prediction } from "@/types";

export default function PlayerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<PlayerDetail | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getPlayer(id), api.getPredictions(id)])
      .then(([p, preds]) => {
        setPlayer(p);
        setPredictions(preds);
      })
      .catch(() => setError("Failed to load player"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handlePredict() {
    setPredicting(true);
    try {
      const prediction = await api.predict(id);
      setPredictions((prev) => [prediction, ...prev]);
    } catch {
      setError("Prediction failed");
    } finally {
      setPredicting(false);
    }
  }

  if (loading) return <p className="text-zinc-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!player) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{player.name}</h1>
        <p className="text-zinc-500">
          {player.position} · {player.team} · {player.nationality} · Age {player.age}
        </p>
      </div>

      <button
        onClick={handlePredict}
        disabled={predicting}
        className="rounded-lg bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50"
      >
        {predicting ? "Predicting..." : "Run Prediction"}
      </button>

      {player.recent_events.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Last 5 Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 text-left">
                  <th className="py-2 pr-4">Min</th>
                  <th className="py-2 pr-4">Goals</th>
                  <th className="py-2 pr-4">Assists</th>
                  <th className="py-2 pr-4">Passes</th>
                  <th className="py-2 pr-4">Acc%</th>
                  <th className="py-2 pr-4">Tackles</th>
                  <th className="py-2">Dist km</th>
                </tr>
              </thead>
              <tbody>
                {player.recent_events.map((e) => (
                  <tr key={e.id} className="border-b border-zinc-100">
                    <td className="py-2 pr-4">{e.minutes_played}</td>
                    <td className="py-2 pr-4">{e.goals}</td>
                    <td className="py-2 pr-4">{e.assists}</td>
                    <td className="py-2 pr-4">{e.passes}</td>
                    <td className="py-2 pr-4">{(e.pass_accuracy * 100).toFixed(0)}%</td>
                    <td className="py-2 pr-4">{e.tackles}</td>
                    <td className="py-2">{e.distance_km.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {predictions.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Prediction History</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {predictions.map((pred) => (
              <PredictionCard key={pred.id} prediction={pred} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
