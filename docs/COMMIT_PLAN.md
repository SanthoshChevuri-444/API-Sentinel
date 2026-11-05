# API Sentinel — Commit Plan (before tomorrow afternoon)

Keep commits small, coherent, and independently reviewable. Do not make a single giant commit containing the entire project.

## Commit 1 — ERD and decisions

Files:
- `docs/ERD.md`
- `README.md`

Suggested message:

```bash
git add docs/ERD.md README.md
git commit -m "docs: define API Sentinel MVP data model"
```

## Commit 2 — Initial Prisma data model

Files:
- `prisma/schema.prisma`

Suggested message:

```bash
git add prisma/schema.prisma
git commit -m "feat(db): add initial API Sentinel Prisma schema"
```

## Commit 3 — First migration (after DATABASE_URL is configured)

```bash
npx prisma format
npx prisma validate
npx prisma migrate dev --name init_api_sentinel
```

Then inspect the generated migration and commit the schema and migration together:

```bash
git add prisma/schema.prisma prisma/migrations
git commit -m "feat(db): add initial PostgreSQL migration"
```

## Commit 4 — Seed data and basic verification (only if time permits)

Add a small seed dataset with one project, two API services, two consumers, versioned contracts, and registered dependencies. Use mock data only.

```bash
git add prisma/seed.* package.json
 git commit -m "test(db): add API dependency sample data"
```

## Commit 5 — README setup notes

Document prerequisites, `.env` setup using a placeholder (never commit real credentials), schema assumptions, and how to run migrations.

```bash
git add README.md
 git commit -m "docs: document local database setup"
```

## Before each commit

```bash
git status
git diff --check
git diff --staged
```

Never commit `.env`, passwords, access tokens, API secrets, or real incident payloads. Ensure `.gitignore` includes `.env`, `node_modules/`, generated secrets, and local database dumps.
