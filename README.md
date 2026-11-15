# Small Bites

Small Bites is a demo food blog. It exists to show the difference between **server-side rendering (SSR)** and **incremental static regeneration (ISR)** in Next.js, on a site that is mostly static.

Recipes and posts change occasionally, not on every request. That makes the blog a useful place to compare the two modes:

- **SSR** builds the page on the server for every request. Readers always get the latest content, and the server does that work each time.
- **ISR** serves a pre-rendered page and rebuilds it in the background after a set interval, or on demand. Most requests stay as fast as a static page, and published content still catches up.

Content is edited in [Payload CMS](https://payloadcms.com) and stored in PostgreSQL.

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

3. Install dependencies and start the dev server:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Open the site at [http://localhost:3000](http://localhost:3000). The Payload admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin). The first visit to the admin panel asks you to create an admin user.
