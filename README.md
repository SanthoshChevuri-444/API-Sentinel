# API Sentinel

API Sentinel is a dependency-aware API contract change and incident analysis platform. Its main contribution is mapping detected OpenAPI changes to explicitly registered consumer dependencies and preserving evidence for each impact assessment.

## First deliverables

- `docs/ERD.md` — editable Mermaid ER diagram, entity purposes, and integrity rules.
- `docs/COMMIT_PLAN.md` — proposed small-commit sequence for the initial design and database work.
- `prisma/schema.prisma` — initial PostgreSQL data model using Prisma.

## Data-model scope

The model tracks project-owned API services and versioned contracts; registered consumer services and the API operations/fields they depend on; contract analyses and changes; dependency-specific impact assessments; health-check history and incidents; and audit logs.

The database schema cannot by itself enforce that the compared contracts belong to the same API service or that a consumer and provider belong to the same project. The service layer must validate these conditions before persisting an analysis or dependency.

## Setup notes

1. Create a PostgreSQL database.
2. Configure `DATABASE_URL` in a local `.env` file. Never commit actual credentials.
3. Run `npx prisma format` and `npx prisma validate`.
4. Run `npx prisma migrate dev --name init_api_sentinel` with a compatible Prisma CLI version.

If the course environment uses Prisma 7, check its datasource configuration requirements before running migration commands; this starter schema uses the Prisma 5/6 `url = env("DATABASE_URL")` schema style.

## MVP order

1. Contract registration and version comparison.
2. Dependency registry and impact assessment.
3. Evidence-based report/API endpoints.
4. Health checks and incident grouping.
5. MCP diagnostics and optional dashboard.
# API-Sentinel
