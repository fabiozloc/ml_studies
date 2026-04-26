# SKILLS — Padrões de código do Scout AI

Skills são padrões que o Claude deve seguir ao gerar código neste projeto.
Leia este arquivo junto com o SPEC.md antes de qualquer geração.

---

## SKILL: Rota FastAPI

Sempre que criar uma nova rota, seguir este padrão:

```python
# api/routers/players.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.db.session import get_db
from api.models.schemas import PlayerOut, PlayerCreate

router = APIRouter(prefix="/players", tags=["players"])

@router.get("/", response_model=list[PlayerOut])
def list_players(db: Session = Depends(get_db)):
    # logic here
    pass

@router.get("/{player_id}", response_model=PlayerOut)
def get_player(player_id: str, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player
```

**Regras:**

- Sempre usar `Depends(get_db)` para injetar sessão
- Sempre declarar `response_model` no decorator
- Mensagens de erro do `HTTPException` em inglês
- Nunca retornar objeto ORM direto — o Pydantic serializa via `response_model`

---

## SKILL: Schema Pydantic

```python
# api/models/schemas.py
from pydantic import BaseModel, UUID4
from datetime import datetime

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
```

**Regras:**

- Sempre três classes por entidade: Base, Create, Out
- `from_attributes = True` em todo schema de saída
- UUID como `UUID4` do pydantic, não `str`
- Nomes de campos idênticos aos do SPEC.md

---

## SKILL: Componente Next.js

```tsx
// web/components/PlayerCard.tsx
interface PlayerCardProps {
  name: string;
  position: string;
  team: string;
  rating?: number;
}

export function PlayerCard({ name, position, team, rating }: PlayerCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <h2 className="font-medium text-lg">{name}</h2>
      <p className="text-sm text-zinc-500">
        {position} · {team}
      </p>
      {rating && (
        <span className="text-2xl font-bold">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
```

**Regras:**

- Interface de props sempre explícita logo acima do componente
- Export nomeado (não default) para componentes
- Sem lógica de fetch dentro do componente — dados chegam via props
- Tailwind para estilo, sem CSS modules

---

## SKILL: Fetch centralizado

```typescript
// web/lib/api.ts
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
  getPlayers: () => apiFetch<Player[]>("/players"),
  getPlayer: (id: string) => apiFetch<Player>(`/players/${id}`),
  predict: (playerId: string) =>
    apiFetch<Prediction>("/predict", {
      method: "POST",
      body: JSON.stringify({ player_id: playerId }),
    }),
};
```

**Regras:**

- Todo acesso à API passa por `api.ts`
- Tipagem genérica no `apiFetch<T>` para não usar `any`
- Variável de ambiente para a URL base

---

## SKILL: Tabela SQLAlchemy

```python
# api/db/tables.py
from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from api.db.session import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    team = Column(String, nullable=False)
    age = Column(Integer)
    nationality = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    events = relationship("PlayerEvent", back_populates="player", cascade="all, delete")
```

**Regras:**

- `UUID(as_uuid=True)` com `default=uuid.uuid4`
- `created_at` com `server_default=func.now()` (gerado pelo banco)
- Relacionamentos com `cascade="all, delete"`
- `nullable=False` em todo campo obrigatório
- Nomes de colunas idênticos aos campos do SPEC.md
