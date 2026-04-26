# ⚽ Scout AI: Analisador de Desempenho de Jogadoras

Projeto de aprendizado que combina backend Python, banco de dados relacional e machine learning usando futebol como domínio.

Feito pro meu docim que quer aprender backend + ML que ela já sabe. Interface simple em Next.js para visualizar tudo.

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
├── web/          → Interface Next.js (TypeScript)
├── api/          → Backend FastAPI (Python)
├── ml/           → Notebooks e modelos de ML
├── db/           → Migrações Alembic
└── .claude/      → Specs e comandos do Claude Code
```

Cada pasta tem seu próprio `README.md` explicando o que vai dentro dela.

---

## Como rodar localmente

```bash
# 1. Sobe o banco de dados
docker compose up -d

# 2. Roda a API
cd api && uvicorn main:app --reload

# 3. Roda o frontend
cd web && npm run dev
```

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
