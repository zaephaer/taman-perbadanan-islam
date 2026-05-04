# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## GitHub Sync

The full codebase is automatically mirrored to GitHub:

- **URL**: https://github.com/zaephaer/taman-perbadanan-islam
- **Branch**: `main`
- **Required env var**: `GITHUB_PAT` (already set in Replit Secrets)

### How sync triggers automatically

1. **On every git commit** — `scripts/git-hooks/post-commit` runs `sync-github.sh` in the background after each commit. The hooks path is set via `git config core.hooksPath scripts/git-hooks`.
2. **On every Replit task merge** — `scripts/post-merge.sh` calls `sync-github.sh` as a final step (non-fatal; post-merge succeeds even if sync fails).

### Manual sync

Run directly from the shell:

```bash
bash scripts/sync-github.sh
```

### Re-initializing hooks after a fresh clone

If the git hooks path is ever reset, restore it with:

```bash
git config core.hooksPath scripts/git-hooks
```

This is also run automatically by `scripts/post-merge.sh`.
