from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from api.db.session import get_db
from api.db.tables import Match, Player, PlayerEvent
from api.models.schemas import MatchCreate, MatchOut

router = APIRouter(prefix="/matches", tags=["matches"])


@router.get("/", response_model=list[MatchOut])
def list_matches(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    offset = (page - 1) * page_size
    return db.query(Match).order_by(Match.date.desc()).offset(offset).limit(page_size).all()


@router.post("/", response_model=MatchOut, status_code=201)
def create_match(body: MatchCreate, db: Session = Depends(get_db)):
    player_ids = {str(e.player_id) for e in body.events}
    existing = {str(p.id) for p in db.query(Player).filter(Player.id.in_(player_ids)).all()}
    missing = player_ids - existing
    if missing:
        raise HTTPException(status_code=404, detail=f"Players not found: {', '.join(missing)}")

    match = Match(
        date=body.date,
        home_team=body.home_team,
        away_team=body.away_team,
        home_score=body.home_score,
        away_score=body.away_score,
    )
    db.add(match)
    db.flush()

    for event_data in body.events:
        event = PlayerEvent(match_id=match.id, **event_data.model_dump())
        db.add(event)

    db.commit()
    db.refresh(match)
    return match
