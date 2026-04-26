from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.db.session import get_db
from api.db.tables import Player, Prediction
from api.models.schemas import PredictionRequest, PredictionOut

router = APIRouter(tags=["predictions"])


@router.post("/predict", response_model=PredictionOut, status_code=201)
def predict(body: PredictionRequest, db: Session = Depends(get_db)):
    raise HTTPException(status_code=501, detail="ML model not implemented yet")


@router.get("/predictions/{player_id}", response_model=list[PredictionOut])
def get_predictions(player_id: str, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    return (
        db.query(Prediction)
        .filter(Prediction.player_id == player_id)
        .order_by(Prediction.created_at.desc())
        .all()
    )
