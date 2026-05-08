# Lendsqr Frontend Assessment

A React, TypeScript, and Vite implementation of the Lendsqr frontend assessment.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Sass
- Vitest and Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

If you are using PowerShell and npm is blocked by the execution policy, run:

```bash
npm.cmd run dev
```

Then open:

```text
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Runs TypeScript checks and creates a production build.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run test
```

Runs the test suite with Vitest.

```bash
npm run test:coverage
```

Runs tests with coverage reporting.

```bash
npm run lint
```

Runs ESLint.

## Routes

- `/` - Login page
- `/dashboard` - Dashboard
- `/users` - Users list
- `/users/:id` - User details

## Project Structure

```text
src/
  app/                 Query client setup
  assets/              Shared icon assets
  components/          Reusable UI, layout, and feedback components
  features/            Feature pages and related logic
  layouts/             Application layout shell
  routes/              Route configuration
  services/            API clients and mock data
  store/               Zustand stores
  styles/              Sass styles
  tests/               Test setup and utilities
  types/               Shared TypeScript types
  utils/               Shared helpers
```

## Troubleshooting

If Vite keeps showing an old dependency error after reinstalling packages, stop the dev server with `Ctrl + C` and restart it with:

```bash
npm.cmd run dev -- --force
```

If dependencies become corrupted, remove `node_modules` and reinstall:

```bash
npm install
```
