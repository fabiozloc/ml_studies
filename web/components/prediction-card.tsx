import type { Prediction } from "@/types";

interface PredictionCardProps {
  prediction: Prediction;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const diff =
    prediction.actual_rating !== null
      ? (prediction.actual_rating - prediction.predicted_rating).toFixed(2)
      : null;

  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">Predicted</p>
          <span className="text-2xl font-bold">{prediction.predicted_rating.toFixed(1)}</span>
        </div>
        {prediction.actual_rating !== null && (
          <div className="text-right">
            <p className="text-xs text-zinc-400">Actual</p>
            <span className="text-2xl font-bold">{prediction.actual_rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      {diff !== null && (
        <p className={`text-sm mt-2 ${parseFloat(diff) >= 0 ? "text-green-600" : "text-red-500"}`}>
          Δ {diff}
        </p>
      )}
      <p className="text-xs text-zinc-400 mt-2">{prediction.model_version}</p>
    </div>
  );
}
