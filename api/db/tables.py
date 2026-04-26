from __future__ import annotations

import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Date, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from api.db.session import Base


class Player(Base):
    __tablename__ = "players"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    team = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    nationality = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    events = relationship("PlayerEvent", back_populates="player", cascade="all, delete")
    predictions = relationship("Prediction", back_populates="player", cascade="all, delete")


class Match(Base):
    __tablename__ = "matches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date = Column(Date, nullable=False)
    home_team = Column(String, nullable=False)
    away_team = Column(String, nullable=False)
    home_score = Column(Integer, nullable=False, default=0)
    away_score = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    events = relationship("PlayerEvent", back_populates="match", cascade="all, delete")
    predictions = relationship("Prediction", back_populates="match", cascade="all, delete")


class PlayerEvent(Base):
    __tablename__ = "player_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    match_id = Column(UUID(as_uuid=True), ForeignKey("matches.id", ondelete="CASCADE"), nullable=False)
    player_id = Column(UUID(as_uuid=True), ForeignKey("players.id", ondelete="CASCADE"), nullable=False)
    minutes_played = Column(Integer, nullable=False, default=0)
    goals = Column(Integer, nullable=False, default=0)
    assists = Column(Integer, nullable=False, default=0)
    shots = Column(Integer, nullable=False, default=0)
    shots_on_target = Column(Integer, nullable=False, default=0)
    passes = Column(Integer, nullable=False, default=0)
    pass_accuracy = Column(Float, nullable=False, default=0.0)
    tackles = Column(Integer, nullable=False, default=0)
    interceptions = Column(Integer, nullable=False, default=0)
    distance_km = Column(Float, nullable=False, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    player = relationship("Player", back_populates="events")
    match = relationship("Match", back_populates="events")


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    player_id = Column(UUID(as_uuid=True), ForeignKey("players.id", ondelete="CASCADE"), nullable=False)
    match_id = Column(UUID(as_uuid=True), ForeignKey("matches.id", ondelete="CASCADE"), nullable=False)
    predicted_rating = Column(Float, nullable=False)
    actual_rating = Column(Float, nullable=True)
    model_version = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    player = relationship("Player", back_populates="predictions")
    match = relationship("Match", back_populates="predictions")
