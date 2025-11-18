<h1 align="center">Cubos Movies — API (NestJS)</h1>

API REST em NestJS para o desafio Fullstack da Cubos Tecnologia. Implementa autenticação JWT, CRUD de filmes com filtros/paginação, upload de pôster para storage S3‑compatível (MinIO) e integração com PostgreSQL via Prisma.

> Dica: use este README junto com o README da raiz do monorepo para subir os serviços do Docker (Postgres e MinIO) rapidamente.

## Stack

- NestJS 10, TypeScript
- Prisma ORM + PostgreSQL
- JWT (Passport)
- AWS SDK S3 (compatível com MinIO)

## Funcionalidades

- Registro e login de usuário (`/auth/register`, `/auth/login`)
- Autorização via Bearer Token (JWT)
- Filmes: criar, listar (com filtros), detalhar, atualizar e deletar (`/movies`)
- Filtros: busca textual, duração mínima/máxima, período por data, e gênero
- Paginação: `page` e `limit` (default 1 e 10)
- Upload de pôster (`/movies/upload-poster`) com validação de tamanho/tipo

## Variáveis de ambiente

Crie um arquivo `.env` na pasta `api/` baseado em `.env.example`.

Obrigatórias:

- `DATABASE_URL`: conexão do Prisma, ex.: `postgresql://USER:PASS@localhost:5432/movie_db`
- `JWT_SECRET`: segredo do JWT
- `PORT`: porta da API (ex.: `3000`)
- `FRONTEND_URL`: origem permitida no CORS (ex.: `http://localhost:5173`)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: credenciais MinIO
- `AWS_ENDPOINT`: ex.: `http://localhost:9000`
- `AWS_BUCKET`: nome do bucket para armazenar pôsteres

## Subindo dependências (Docker)

No diretório raiz do repositório, crie `.env` a partir de `.env.example` e suba os serviços:

```bash
docker compose up -d
```

Serviços:
- PostgreSQL em `localhost:5432`
- MinIO API `http://localhost:9000` e Console `http://localhost:9001`

No Console do MinIO (porta 9001), autentique com `MINIO_USER`/`MINIO_PASSWORD` do `.env` da raiz e crie o bucket definido em `AWS_BUCKET`.

## Instalação

```bash
cd api
npm install

# Gera o client do Prisma e aplica migrações
npx prisma generate
npx prisma migrate dev --name init
```

## Execução

```bash
# desenvolvimento com watch
npm run start:dev

# produção (após build)
npm run build
npm run start:prod
```

API padrão: `http://localhost:3000`

## Rotas principais

- `POST /auth/register` – cria usuário
- `POST /auth/login` – retorna `{ access_token }`
- `GET /movies` – lista com filtros: `search`, `minDuration`, `maxDuration`, `startDate`, `endDate`, `genre`, `page`, `limit`
- `GET /movies/:id` – detalhes do filme (somente do usuário criador)
- `POST /movies` – cria filme (body conforme DTO)
- `PATCH /movies/:id` – edita filme (somente do usuário criador)
- `DELETE /movies/:id` – exclui filme (somente do usuário criador)
- `POST /movies/upload-poster` – `multipart/form-data` com campo `poster` (png/jpg até 2MB). Retorna `{ url: "<key>" }` a ser salvo no filme.

Autorização: inclua `Authorization: Bearer <token>` (obtido em `/auth/login`).

## Notas sobre requisitos do desafio

- Filtros obrigatórios (duração e data) e mais um extra (gênero) foram implementados.
- Paginação com 10 itens por página por padrão.
- Permissões: visualizar/editar/excluir restritos ao usuário criador.
- Upload de pôster via MinIO (S3‑compatível). URLs de leitura temporárias são geradas quando necessário.

## Troubleshooting

- Erro de CORS: verifique `FRONTEND_URL` no `.env` e se o front está na URL correta.
- Erro ao subir pôster: confirme `AWS_ENDPOINT`, credenciais e se o bucket existe no MinIO.
- Erro de banco: confira `DATABASE_URL` e se o Postgres do Docker está rodando.
