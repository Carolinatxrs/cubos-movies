# Cubos Movies — Monorepo

Aplicação Fullstack (API + Web) para o desafio técnico da Cubos Tecnologia. O projeto permite cadastrar, listar, filtrar, editar, excluir e visualizar detalhes de filmes, além de realizar upload de pôster em storage S3‑compatível.

- API: NestJS + Prisma + PostgreSQL + JWT + AWS S3 (MinIO)
- Web: React + Vite + TypeScript + Tailwind + React Router + TanStack Query
- Infra local: Docker Compose com PostgreSQL e MinIO

> Dica: leia os READMEs específicos em `api/` e `web/` para detalhes de cada projeto.

## Estrutura

```
├─ api/           # Backend NestJS (Prisma, JWT, S3)
│  ├─ prisma/     # Schema e migrações
│  └─ src/        # Código da aplicação
├─ web/           # Frontend React + Vite
└─ docker-compose.yml  # Postgres + MinIO
```

## Docker Compose (serviços)

`docker-compose.yml` sobe apenas as dependências (banco e storage):

- `postgres` (PostgreSQL 15)
  - Porta: `5432`
  - Variáveis (do arquivo `.env` na raiz): `DB_NAME`, `DB_USER`, `DB_PASSWORD`
  - Volume de dados: `postgres_data`
- `minio` (S3‑compatível)
  - API: `http://localhost:9000`
  - Console (UI): `http://localhost:9001`
  - Variáveis (do arquivo `.env` na raiz): `MINIO_USER`, `MINIO_PASSWORD`
  - Volume de dados: `minio_data`

Arquivo `.env.example` na raiz já traz as chaves esperadas. Copie para `.env` e ajuste valores.

```bash
cp .env.example .env
# edite DB_*, MINIO_* se necessário

docker compose up -d
```

## Variáveis de ambiente (visão geral)

- Raiz (Docker):
  - `DB_USER`, `DB_PASSWORD`, `DB_NAME` – credenciais do Postgres
  - `MINIO_USER`, `MINIO_PASSWORD` – credenciais do MinIO
- API (`api/.env`, ver `api/.env.example`):
  - `DATABASE_URL`, `JWT_SECRET`, `PORT`, `FRONTEND_URL`
  - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT`, `AWS_BUCKET`
- Web (`web/.env`, ver `web/.env.example`):
  - `VITE_API_URL` (ex.: `http://localhost:3000`)

## Passo a passo — Desenvolvimento

1) Suba as dependências com Docker (na raiz):

```bash
cp .env.example .env
# defina DB_*, MINIO_*

docker compose up -d
```

2) Configure e rode a API:

```bash
cd api
cp .env.example .env
# ajuste DATABASE_URL, JWT_SECRET, FRONTEND_URL, AWS_*

npm install
npx prisma generate
npx prisma migrate dev --name init

# No Console do MinIO (http://localhost:9001) crie o bucket definido em AWS_BUCKET

npm run start:dev
# API: http://localhost:3000
```

3) Configure e rode o Web:

```bash
cd web
cp .env.example .env
# defina VITE_API_URL (ex.: http://localhost:3000)

npm install
npm run dev
# Web: http://localhost:5173
```

## URLs úteis

- API: `http://localhost:3000`
- Web (Vite): `http://localhost:5173`
- MinIO Console: `http://localhost:9001` (login com `MINIO_USER`/`MINIO_PASSWORD`)

## Sobre os requisitos do desafio

- Listagem com busca e filtros (duração, período e gênero), paginação (10 itens/página)
- Autenticação (login/cadastro), rotas protegidas no backend
- Permissões: visualizar/editar/excluir apenas pelo usuário criador
- Upload de pôster para MinIO com geração de URL de acesso a partir da API
- Tema claro/escuro no frontend