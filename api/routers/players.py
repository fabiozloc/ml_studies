from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.db.session import get_db
from api.db.tables import Player, PlayerEvent
from api.models.schemas import PlayerCreate, PlayerOut, PlayerDetail, PlayerEventOut

router = APIRouter(prefix="/players", tags=["players"])


@router.get("/", response_model=list[PlayerOut])
def list_players(db: Session = Depends(get_db)):
    return db.query(Player).all()


@router.get("/{player_id}", response_model=PlayerDetail)
def get_player(player_id: str, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    recent = (
        db.query(PlayerEvent)
        .filter(PlayerEvent.player_id == player_id)
        .order_by(PlayerEvent.created_at.desc())
        .limit(5)
        .all()
    )

    return PlayerDetail(
        id=player.id,
        name=player.name,
        position=player.position,
        team=player.team,
        age=player.age,
        nationality=player.nationality,
        created_at=player.created_at,
        recent_events=[PlayerEventOut.model_validate(e) for e in recent],
    )


@router.post("/", response_model=PlayerOut, status_code=201)
def create_player(body: PlayerCreate, db: Session = Depends(get_db)):
    player = Player(**body.model_dump())
    db.add(player)
    db.commit()
    db.refresh(player)
    return player
