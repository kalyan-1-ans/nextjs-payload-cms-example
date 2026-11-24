# Small Bites

Small Bites is a small food blog used as an example of [Payload CMS](https://payloadcms.com) inside a Next.js app. Editors change the content in Payload. The site reads it from PostgreSQL and renders it.

The Payload config in `src/payload.config.ts` defines:

- **Users**, an auth collection for the admin panel.
- **Recommendations**, a collection of recipes with a slug, meal, timing, and a link to the next recipe.
- **Home** and **About**, globals for the two pages that are not a list of recipes.

Public reads are open. Creating, updating, and deleting content requires a logged-in admin user.

## Local setup

You need [nvm](https://github.com/nvm-sh/nvm), pnpm, and a running PostgreSQL database.

1. Switch to the Node.js version:

   ```bash
   nvm use
   ```

2. Copy the example env file:

   ```bash
   cp .env.example .env
   ```

   `DATABASE_URL` is a Postgres connection string. `PAYLOAD_SECRET` is any long random string used to sign sessions.

3. Install dependencies, load the sample content, and start the dev server:

   ```bash
   pnpm install
   pnpm seed
   pnpm dev
   ```

   `pnpm seed` runs once. It inserts any sample recommendations that are not already in the database, and fills Home and About when those are empty. Restarting the dev server does not run it again.

4. Open the site at [http://localhost:3000](http://localhost:3000). The Payload admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin). The first visit to the admin panel asks you to create an admin user.
