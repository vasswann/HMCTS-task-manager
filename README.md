# HMCTS Task Manager

A full-stack task management system built as an **Nx monorepo**.  
It includes an Express API, a React frontend, PostgreSQL storage with Knex.js, and full E2E testing using CypressA and Jest.  
The project demonstrates how to structure, test, and run modern production-style applications inside a shared workspace.

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

Run Seed:

```bash
npx knex seed:run --knexfile knexfile.cjs
```

### 5. Run the applications

```bash
npm run dev
```

This starts:

- **tasks-api** on `http://localhost:4000`
- **tasks-frontend** on `http://localhost:4200`

Run separately:

```bash
npx nx serve tasks-api
npx nx serve tasks-frontend
```

Run test

```bash
npx nx e2e tasks-api-e2e --output-style=stream
npx nx e2e tasks-frontend-e2e --output-style=stream
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

- **Nx monorepo structure**: [https://nx.dev/](https://nx.dev/)
- **Jest + Vitest**: [https://jestjs.io/](https://jestjs.io/), [https://vitest.dev/](https://vitest.dev/)
- Knex + PostgreSQL pairing
- Cypress E2E: [https://www.cypress.io/](https://www.cypress.io/)
- TailwindCSS: [https://tailwindcss.com/](https://tailwindcss.com/)
- Jest E2E: [https://jestjs.io/](https://jestjs.io/)

---

## Project Structure

```text
hmcts-task-manager/
  apps/
    tasks-api/
      db/
        migrations/
        seeds/
      src/
        controllers/
          tasks.controller.ts
        daos/
        interfaces/
        lib/
        middleware/
        models/
        routes/
        app.ts
        db.ts
        main.ts
      project.json
      jest.config.cts
      webpack.config.js

    tasks-api-e2e/
      src/
        tasks-api/
          tasks-api.spec.ts
        support/
      jest.config.cjs
      project.json

    tasks-frontend/
      src/
        app/
          api/
            httpClient.ts
            tasksApi.ts
          components/
            layout/
            tasks/
              TaskForm.tsx
              TaskList.tsx
          hooks/
            useTasks.ts
          pages/
            TasksPage.tsx
          types/
            task.ts
          app.tsx
        main.tsx
        styles.css
      index.html
      tailwind.config.js
      vite.config.mts
      project.json

    tasks-frontend-e2e/
      src/
        e2e/
          app.cy.ts
        support/
      cypress.config.ts
      project.json

  knexfile.cjs
  package.json
  nx.json
  tsconfig.base.json
  README.md
  .env
  .gitignore
```
