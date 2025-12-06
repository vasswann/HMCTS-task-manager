# HMCTS Task Manager

A full-stack task management system built as an Nx monorepo. It includes an Express API, a React frontend, PostgreSQL storage with Knex.js, and optional E2E test suites. The codebase follows clear, modular patterns aimed at developers who regularly work on production web applications.

## Description

This repository contains two main applications:

- A backend API in `apps/tasks-api` using **Node.js**, **Express**, **Knex.js**, and **PostgreSQL**.
- A frontend in `apps/tasks-frontend` built with **React**, **Vite**, and **TypeScript**.

Both apps are orchestrated through **Nx**, which provides consistent commands, shared tooling, and a dependency graph for efficient builds and tests.

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/vasswann/HMCTS-task-manager.git
cd HMCTS-task-manager
```

### 2. Install dependencies

```bash
npm install
```

Dependencies are managed through `package.json`.

### 3. Configure environment variables

Create or update a `.env` file in the project root:

```bash
# Backend
API_HOST=localhost
API_PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password   # fallback if not provided
DB_NAME=tasks_db

# Frontend
VITE_API_HOST=localhost
VITE_API_PORT=4000
```

### 4. Set up PostgreSQL

```sql
CREATE DATABASE hmcts_tasks_db;
```

Or via CLI:

```bash
psql -U postgres -c "CREATE DATABASE tasks_db;"
```

Run migrations:

```bash
npx knex migrate:latest --knexfile knexfile.cjs
```

### 5. Run the applications

```bash
npm run dev
```

This starts:

- **tasks-api** on `http://localhost:4000`
- **tasks-frontend** on `http://localhost:5173`

Run separately:

```bash
npx nx serve tasks-api
npx nx serve tasks-frontend
```

---

## Interesting Techniques Used

### Backend

- **Knex.js query builder**: [https://knexjs.org/](https://knexjs.org/)
- **Environment-driven config** using `dotenv`: [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)
- **Express routing & middleware**: [https://expressjs.com/](https://expressjs.com/)

### Frontend

- **React hooks**: [https://react.dev/](https://react.dev/)
- **Fetch API**: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **Vite ES module dev server**: [https://vitejs.dev/](https://vitejs.dev/)

### Workspace & Tooling

- **Nx monorepo orchestration**: [https://nx.dev/](https://nx.dev/)
- **Jest + Vitest**: [https://jestjs.io/](https://jestjs.io/), [https://vitest.dev/](https://vitest.dev/)

---

## Non-Obvious Technologies

- Nx monorepo structure
- Knex + PostgreSQL pairing
- Optional Cypress E2E: [https://www.cypress.io/](https://www.cypress.io/)
- Optional TailwindCSS: [https://tailwindcss.com/](https://tailwindcss.com/)

---

## Project Structure

```text
hmcts-task-manager/
  apps/
    tasks-api/
      src/
      migrations/
    tasks-api-e2e/
    tasks-frontend/
      src/
      public/
    tasks-frontend-e2e/
  knexfile.cjs
  tsconfig.base.json
  nx.json
  package.json
  .env
```

### Directory Notes

- `apps/tasks-api/migrations` — Schema evolution files
- `apps/tasks-frontend/public` — Static browser assets
- `apps/*-e2e` — Optional integration and browser tests
