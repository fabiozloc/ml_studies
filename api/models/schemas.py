from __future__ import annotations

from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, UUID4


# ── Player ────────────────────────────────────────────────────────────────────

class PlayerBase(BaseModel):
    name: str
    position: str
    team: str
    age: int
    nationality: str


class PlayerCreate(PlayerBase):
    pass


class PlayerOut(PlayerBase):
    id: UUID4
    created_at: datetime

    class Config:
        from_attributes = True


# ── PlayerEvent ───────────────────────────────────────────────────────────────

class PlayerEventBase(BaseModel):
    player_id: UUID4
    minutes_played: int = 0
    goals: int = 0
    assists: int = 0
    shots: int = 0
    shots_on_target: int = 0
    passes: int = 0
    pass_accuracy: float = 0.0
    tackles: int = 0
    interceptions: int = 0
    distance_km: float = 0.0


class PlayerEventCreate(PlayerEventBase):
    pass


class PlayerEventOut(PlayerEventBase):
    id: UUID4
    match_id: UUID4
    created_at: datetime

    class Config:
        from_attributes = True


# ── Match ─────────────────────────────────────────────────────────────────────

class MatchBase(BaseModel):
    date: date
    home_team: str
    away_team: str
    home_score: int = 0
    away_score: int = 0


class MatchCreate(MatchBase):
    events: list[PlayerEventCreate] = []


class MatchOut(MatchBase):
    id: UUID4
    created_at: datetime

    class Config:
        from_attributes = True


# ── Prediction ────────────────────────────────────────────────────────────────

class PredictionRequest(BaseModel):
    player_id: UUID4


class PredictionOut(BaseModel):
    id: UUID4
    player_id: UUID4
    match_id: UUID4
    predicted_rating: float
    actual_rating: Optional[float]
    model_version: str
    created_at: datetime

    class Config:
        from_attributes = True


# ── Player detail (with last 5 events) ───────────────────────────────────────

class PlayerDetail(PlayerOut):
    recent_events: list[PlayerEventOut] = []
