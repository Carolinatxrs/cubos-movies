<h1 align="center">Cubos Movies — Web (React + Vite + TS)</h1>

Frontend do desafio Fullstack da Cubos Tecnologia. Interface responsiva inspirada no Figma, com autenticação, listagem com busca/filtros/paginação, criação/edição de filmes e alternância de tema claro/escuro.

## Stack

- React 19 + Vite + TypeScript
- React Router 7
- React Hook Form + Zod
- TanStack Query
- Tailwind CSS
- Axios

## Funcionalidades

- Autenticação (login/cadastro) com redirecionamento inteligente
- Listagem de filmes (10 por página) com busca dinâmica
- Detalhes do filme (rota preparada)
- Criação/Edição de filme com upload de pôster (via API)
- Permissões: ações restritas ao usuário criador
- Tema claro/escuro com toggle persistido

## Variáveis de ambiente

Crie `.env` na pasta `web/` baseado em `.env.example`:

- `VITE_API_URL`: URL base da API (ex.: `http://localhost:3000`)

## Instalação e execução

```bash
cd web
npm install

# desenvolvimento
npm run dev

# build de produção
npm run build

# pré-visualização do build
npm run preview
```

Front padrão: `http://localhost:5173`

## Integração com a API

- Base URL configurada em `src/services/axios.ts` a partir de `VITE_API_URL`.
- Token JWT é salvo em `localStorage` e enviado como `Authorization: Bearer <token>` automaticamente pelos interceptors.
- Respostas `401` limpam sessão e redirecionam para `/auth/sign-in`.
- Upload de pôster usa `POST /movies/upload-poster` e retorna `{ url: "<key>" }`. Essa `key` deve ser enviada ao criar/editar o filme.

## Estrutura (highlights)

- `src/pages` – páginas (auth, listagem, detalhes, etc.)
- `src/components` – componentes reutilizáveis (cards, inputs, drawer, etc.)
- `src/services` – chamadas à API (auth, movies, axios)
- `src/contexts` – contexto de autenticação e tema
- `src/utils` – utilitários gerais

## Notas sobre requisitos do desafio

- Responsividade e tema claro/escuro implementados conforme o design.
- Filtros obrigatórios (duração e data) e filtro adicional (gênero) disponíveis nos serviços.
- Página de detalhes está preparada e pode ser expandida para exibir todos os campos.

## Troubleshooting

- Erro 401 ao navegar: faça login novamente. Verifique se a API está no endereço definido por `VITE_API_URL`.
- CORS: ajuste `FRONTEND_URL` no `.env` da API para o host/porta do front (ex.: `http://localhost:5173`).