# Ciasullo Media Portal

Landing page for Ciasullo Media that links to various applications.
Maintainer documentation for local development and production deployment.

## Overview

This project is a Next.js app (App Router) that serves the Ciasullo Media Portal UI.

## Tech Stack

- Node.js + npm
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Prerequisites

- Node.js 20.x (recommended; matches the Docker image)
- npm 10+

## Local Development

1. Install dependencies:

	```bash
	npm ci
	```

2. Start the dev server:

	```bash
	npm run dev
	```

3. Open:

	```text
	http://localhost:3000
	```

## Common Commands

- `npm run dev`: Run local development server
- `npm run build`: Build production bundle
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Environment Variables

No required custom environment variables are currently defined in the source code.

Optional runtime variables:

- `NODE_ENV` (use `production` in production)
- `PORT` (default `3000`)
- `HOSTNAME` (default `0.0.0.0` in Docker)

## Production Deployment

You can deploy with Docker (recommended) or directly with Node.

### Option A: Docker (Recommended)

This repo includes a multi-stage Dockerfile that builds a standalone Next.js runtime.

1. Build image:

	```bash
	docker build -t portal:latest .
	```

2. Run container:

	```bash
	docker run -d \
	  --name portal \
	  --restart unless-stopped \
	  -p 3000:3000 \
	  -e NODE_ENV=production \
	  -e PORT=3000 \
	  portal:latest
	```

3. Verify:

	```bash
	docker ps
	docker logs --tail=100 portal
	```

### Option B: Direct Node Runtime

1. Install dependencies:

	```bash
	npm ci
	```

2. Build production output:

	```bash
	npm run build
	```

3. Start service:

	```bash
	NODE_ENV=production PORT=3000 npm run start
	```

Use a process manager (systemd/PM2) and a reverse proxy (Nginx/Caddy/Traefik) for a durable production setup.

## Deployment Checklist

Before deploying:

1. Pull latest changes.
2. Run `npm ci`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Deploy image/process.
6. Check logs and load the app in a browser.

## Adding Apps Correctly

The app list is managed in a single source of truth: `lib/apps.ts`.

To add a new app:

1. Import a Lucide icon in `lib/apps.ts` from `lucide-react`.
2. Add a new object to the `apps` array.
3. Confirm the app appears in the grid, search results, and category filter.
4. Optionally set `featured: true` to show it in the Featured row.

Required fields for each app object (`AppLink`):

- `id`: unique, stable string (do not reuse existing IDs)
- `name`: short display label
- `description`: one concise sentence
- `url`: full absolute URL including `https://`
- `icon`: Lucide icon component (for example, `Video`, `Bot`, `BarChart3`)
- `category`: one of `Work`, `Creative`, `Communication`, `Utilities`
- `accent`: hue value used by the glow color (string value like `"300"`, `"220"`, `"162"`, `"55"`, `"15"`)
- `featured` (optional): set to `true` to include in Featured

Example:

```ts
{
	id: "nextcloud",
	name: "Nextcloud",
	description: "File sync and document collaboration",
	url: "https://nextcloud.ciasullomedia.com",
	icon: Cloud,
	category: "Utilities",
	accent: "220",
	featured: true,
}
```

Validation checklist before commit:

1. `id` is unique in `apps`.
2. URL opens correctly and uses HTTPS.
3. Category is one of the allowed values.
4. Icon is imported and renders.
5. `npm run lint` passes.
6. `npm run build` passes.

## Notes for Maintainers

- The Next.js config uses `output: "standalone"` for container-friendly builds.
- TypeScript build errors are currently ignored in `next.config.mjs`. Keep this in mind during reviews and rely on editor checks/linting to catch issues early.
