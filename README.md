# ⚽ Scout AI: Analisador de Desempenho de Jogadores (pode ser do cruzeiro...)

Projeto de aprendizado que combina backend Python, banco de dados relacional e machine learning usando futebol como domínio.

Feito pro meu docim que quer aprender backend + ML que ela já sabe. Interface simples em Next.js para visualizar tudo.

---

## O que o projeto faz

- Armazena dados de partidas e eventos de jogadoras em um banco PostgreSQL
- Expõe uma API REST em Python (FastAPI) para consultar e ingerir dados
- Roda modelos de ML para prever desempenho de jogadoras
- Exibe tudo num dashboard simples em Next.js (TypeScript)

---

## Estrutura de pastas

```
scout-ai/
├── api/              → Backend FastAPI (Python)
├── ml/               → Modelos de ML (a implementar)
├── web/              → Interface Next.js (TypeScript)
├── db/               → Schema SQL (init.sql)
├── Dockerfile        → Imagem da API
├── docker-compose.yml
└── requirements.txt  → Dependências Python (api + ml compartilham o mesmo venv)
```

---

## Variáveis de ambiente

Copie `.env.example` para `.env` na raiz e ajuste se necessário:

```bash
cp .env.example .env
```

| Variável               | Usado em  | Valor padrão                                    |
| ---------------------- | --------- | ----------------------------------------------- |
| `DATABASE_URL`         | `api/`    | `postgresql://scout:scout@localhost:5432/scoutai` |
| `NEXT_PUBLIC_API_URL`  | `web/`    | `http://localhost:8000`                         |

---

## Como rodar localmente

Cada parte roda em um terminal separado.

**Terminal 1 — banco de dados**
```bash
docker compose up db -d
```

**Terminal 2 — API** (rodar da raiz do projeto)
```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn api.main:app --reload
```

A API fica disponível em `http://localhost:8000`.
Documentação automática: `http://localhost:8000/docs`

**Terminal 3 — frontend**
```bash
cd web
npm install
npm run dev
```

O frontend fica em `http://localhost:3000`.

---

## Stack

| Camada   | Tecnologia                                         |
| -------- | -------------------------------------------------- |
| Frontend | Next.js 14, TypeScript, Tailwind                   |
| Backend  | Python 3.11, FastAPI, SQLAlchemy                   |
| Banco    | PostgreSQL 15                                      |
| ML       | scikit-learn, pandas, (PyTorch na fase avançada)   |
| Deploy   | Vercel (web) · Railway (api + db) · HF Spaces (ml) |

---

## Roteiro de aprendizado

Veja `.claude/SPEC.md` para entender as regras de negócio e `.claude/SKILLS.md` para os padrões de código usados no projeto.
