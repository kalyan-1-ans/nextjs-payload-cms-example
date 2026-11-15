<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Small Bites is a demo food blog. It compares server-side rendering (SSR) and incremental static regeneration (ISR) in Next.js. Content is edited in Payload CMS and stored in PostgreSQL.

## Setup commands

- Switch Node.js: `nvm use` (version is in `.nvmrc`)
- Install dependencies: `pnpm install`
- Start the dev server: `pnpm dev`
- Site: `http://localhost:3000`
- Payload admin: `http://localhost:3000/admin`
- Copy `.env.example` to `.env` before the first run. `DATABASE_URL` is a Postgres connection string.

## Payload

Start with `.agents/skills/payload/SKILL.md`, then use `.agents/skills/payload/reference/` for detailed docs.

## Documentation

Before writing Next.js code, read the matching guide in `node_modules/next/dist/docs/`.

When a library's current docs are needed and the Context7 MCP server is connected, use it instead of training data.

## Testing

This is a demo app. Do not write unit tests or end-to-end tests.

- Do not add or update Vitest, Playwright, or other test files (`*.test.ts`, `*.spec.ts`, `tests/`).
- Do not add test fixtures, test helpers, or test-only dependencies.
- Do not run `pnpm test`. Leave existing tests untouched.
