export type Position = "goalkeeper" | "defender" | "midfielder" | "forward";

export interface Player {
  id: string;
  name: string;
  position: Position;
  team: string;
  age: number;
  nationality: string;
  created_at: string;
}

export interface PlayerEvent {
  id: string;
  match_id: string;
  player_id: string;
  minutes_played: number;
  goals: number;
  assists: number;
  shots: number;
  shots_on_target: number;
  passes: number;
  pass_accuracy: number;
  tackles: number;
  interceptions: number;
  distance_km: number;
  created_at: string;
}

export interface PlayerDetail extends Player {
  recent_events: PlayerEvent[];
}

export interface Match {
  id: string;
  date: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  created_at: string;
}

export interface Prediction {
  id: string;
  player_id: string;
  match_id: string;
  predicted_rating: number;
  actual_rating: number | null;
  model_version: string;
  created_at: string;
}

export interface PlayerEventCreate {
  player_id: string;
  minutes_played: number;
  goals: number;
  assists: number;
  shots: number;
  shots_on_target: number;
  passes: number;
  pass_accuracy: number;
  tackles: number;
  interceptions: number;
  distance_km: number;
}

export interface MatchCreate {
  date: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  events: PlayerEventCreate[];
}

export interface PlayerCreate {
  name: string;
  position: Position;
  team: string;
  age: number;
  nationality: string;
}
