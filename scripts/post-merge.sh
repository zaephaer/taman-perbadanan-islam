#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
git config core.hooksPath scripts/git-hooks
bash scripts/sync-github.sh || echo "WARNING: GitHub sync failed. Run 'bash scripts/sync-github.sh' manually to retry." >&2
